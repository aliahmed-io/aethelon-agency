import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Site from "./pages/Site";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/" component={Site} />
            <Route path="/work" component={Site} />
            <Route path="/work/:slug" component={Site} />
            <Route path="/services" component={Site} />
            <Route path="/about" component={Site} />
            <Route path="/insights" component={Site} />
            <Route path="/contact" component={Site} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
