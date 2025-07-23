import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DealWorkspacePage from "./pages/DealWorkspacePage";

function Placeholder({ title }: { title: string }) {
  return <div className="p-10 text-center text-2xl text-muted-foreground">{title} (Coming Soon)</div>;
}

const AllDeals = () => <Placeholder title="All Deals" />;
const MyTasks = () => <Placeholder title="My Tasks" />;
const TeamActivity = () => <Placeholder title="Team Activity" />;
const SharedFiles = () => <Placeholder title="Shared Files" />;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/deals" element={<AllDeals />} />
          <Route path="/tasks" element={<MyTasks />} />
          <Route path="/activity" element={<TeamActivity />} />
          <Route path="/files" element={<SharedFiles />} />
          <Route path="/deals/:dealId" element={<DealWorkspacePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
