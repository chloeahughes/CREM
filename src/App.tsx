import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DealWorkspacePage from "./pages/DealWorkspacePage";
import { AppDemoProvider, useAppDemo } from './components/AppDemoContext';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './components/ui/table';
import { Badge } from './components/ui/badge';
import { Avatar } from './components/ui/avatar';

function Placeholder({ title }: { title: string }) {
  return <div className="p-10 text-center text-2xl text-muted-foreground">{title} (Coming Soon)</div>;
}

const AllDeals = () => <Placeholder title="All Deals" />;
const MyTasks = () => {
  const { tasks, users } = useAppDemo();
  const getUser = (name: string) => users.find(u => u.name === name);
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Tasks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => {
            const user = getUser(task.assignee);
            return (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar name={user?.name || task.assignee} src={user?.avatarUrl} size="sm" />
                    <span>{user?.name || task.assignee}</span>
                  </div>
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell><Badge>{task.project}</Badge></TableCell>
                <TableCell>
                  <Badge variant={
                    task.status === 'Complete' ? 'success' :
                    task.status === 'In Progress' ? 'secondary' :
                    'default'
                  }>
                    {task.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
const TeamActivity = () => <Placeholder title="Team Activity" />;
const SharedFiles = () => <Placeholder title="Shared Files" />;

const queryClient = new QueryClient();

const App = () => (
  <AppDemoProvider>
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
  </AppDemoProvider>
);

export default App;
