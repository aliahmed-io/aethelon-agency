const targetList = await fetch("http://127.0.0.1:9222/json").then((response) => response.json());
const target = targetList.find((entry) => entry.type === "page" && entry.webSocketDebuggerUrl);
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";

if (!target) {
  throw new Error("No browser page is available for transition verification.");
}

const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
let sequence = 0;

function send(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

async function evaluate(expression, awaitPromise = false) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

await send("Page.enable");
const reducedMotion = process.env.REDUCED_MOTION === "1";
if (reducedMotion) {
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
}
if (process.env.MOBILE === "1") {
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
}
await send("Page.navigate", { url: `${baseUrl}/` });
await new Promise((resolve) => setTimeout(resolve, 1300));

const documentRoot = await send("DOM.getDocument", { depth: 1 });
const workLinks = await send("DOM.querySelectorAll", {
  nodeId: documentRoot.root.nodeId,
  selector: 'a[href="/work"]',
});

let box;
let selectedNodeId;
for (const nodeId of workLinks.nodeIds) {
  try {
    const candidate = await send("DOM.getBoxModel", { nodeId });
    if (candidate.model.width > 0 && candidate.model.height > 0) {
      box = candidate;
      selectedNodeId = nodeId;
      break;
    }
  } catch {
    // Hidden navigation links have no box model at the mobile breakpoint.
  }
}

if (!box) {
  throw new Error("The primary Work link was not found for transition verification.");
}

if (process.env.MOBILE === "1" && selectedNodeId) {
  await send("DOM.scrollIntoViewIfNeeded", { nodeId: selectedNodeId, center: true });
  await new Promise((resolve) => setTimeout(resolve, 100));
  box = await send("DOM.getBoxModel", { nodeId: selectedNodeId });
}

const content = box.model.content;
const x = (content[0] + content[2]) / 2;
const y = (content[1] + content[5]) / 2;

const prepared = await evaluate(`(() => {
  const transition = document.querySelector('.route-transition');
  if (!transition) return { ok: false, reason: 'transition shell not found' };
  window.__aethelonTransitionEvents = [];
  const capture = () => window.__aethelonTransitionEvents.push({
    at: performance.now(),
    className: transition.className,
    variant: transition.dataset.variant || '',
    loading: document.documentElement.dataset.routeLoading || '',
    pathname: window.location.pathname,
  });
  new MutationObserver(capture).observe(transition, {
    attributes: true,
    attributeFilter: ['class', 'data-variant'],
  });
  new MutationObserver(capture).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-route-loading'],
  });
  capture();
  return {
    ok: true,
    className: transition.className,
    variant: transition.dataset.variant,
    loading: document.documentElement.dataset.routeLoading,
  };
})()`);

await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });

const inFlight = await evaluate(`(async () => {
  await new Promise((resolve) => setTimeout(resolve, 70));
  const transition = document.querySelector('.route-transition');
  return {
    className: transition?.className || '',
    variant: transition?.dataset.variant || '',
    loading: document.documentElement.dataset.routeLoading || '',
    pathname: window.location.pathname,
  };
})()`, true);

const settled = await evaluate(`(async () => {
  await new Promise((resolve) => setTimeout(resolve, 380));
  const transition = document.querySelector('.route-transition');
  return {
    className: transition?.className || '',
    variant: transition?.dataset.variant || '',
    loading: document.documentElement.dataset.routeLoading || '',
    pathname: window.location.pathname,
  };
})()`, true);

const observation = {
  prepared,
  inFlight,
  settled,
  events: await evaluate("window.__aethelonTransitionEvents || []"),
  reducedMotionOverlayDisplay: reducedMotion
    ? await evaluate("getComputedStyle(document.querySelector('.route-transition')).display")
    : "not-requested",
};

console.log(JSON.stringify(observation, null, 2));
if (process.env.MOBILE === "1") {
  await send("Emulation.clearDeviceMetricsOverride");
}
if (reducedMotion) {
  await send("Emulation.setEmulatedMedia", { features: [] });
}
socket.close();
