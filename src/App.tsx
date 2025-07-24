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
import { Activity as ActivityIcon, CheckSquare, FileText, Users, RefreshCw } from 'lucide-react';
import { useAppDemo } from './components/AppDemoContext';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { FileText, FileSpreadsheet, FileWord, FilePdf } from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Avatar } from './components/ui/avatar';
import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
const TeamActivity = () => {
  const { activities, users } = useAppDemo();
  const getUser = (name) => users.find(u => u.name === name);
  const iconForType = (type) => {
    switch (type) {
      case 'complete': return <CheckSquare className="text-green-600" />;
      case 'create': return <ActivityIcon className="text-blue-600" />;
      case 'reassign': return <RefreshCw className="text-yellow-600" />;
      case 'upload': return <FileText className="text-purple-600" />;
      default: return <Users />;
    }
  };
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Team Activity</h2>
      <div className="space-y-4">
        {[...activities].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(activity => {
          const user = getUser(activity.user);
          return (
            <div key={activity.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg shadow-sm">
              <div>{iconForType(activity.type)}</div>
              <Avatar name={user?.name || activity.user} src={user?.avatarUrl} size="sm" />
              <div className="flex-1">
                <div className="font-medium text-sm">{activity.message}</div>
                <div className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const fileIcon = (type) => {
  switch (type) {
    case 'PDF': return <FilePdf className="text-red-600" />;
    case 'Excel': return <FileSpreadsheet className="text-green-600" />;
    case 'DOCX': return <FileWord className="text-blue-600" />;
    default: return <FileText />;
  }
};

const SharedFiles = () => {
  const { files, users, deals } = useAppDemo();
  const [preview, setPreview] = useState(null);
  const getUser = (name) => users.find(u => u.name === name);
  const getDeal = (name) => deals.find(d => d.name === name);
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shared Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map(file => (
          <Dialog key={file.id} open={preview === file.id} onOpenChange={open => setPreview(open ? file.id : null)}>
            <DialogTrigger asChild>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg shadow-sm cursor-pointer hover:bg-accent">
                <div>{fileIcon(file.type)}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{file.name}</div>
                  <div className="text-xs text-muted-foreground">Uploaded {file.uploadDate}</div>
                  <div className="flex gap-2 mt-1">
                    <Badge>{file.deal}</Badge>
                    <span className="text-xs flex items-center gap-1"><Avatar name={file.uploader} size="xs" /> {file.uploader}</span>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Preview: {file.name}</DialogTitle>
              </DialogHeader>
              <div className="text-center py-8">
                {fileIcon(file.type)}
                <div className="mt-4 text-lg font-semibold">{file.name}</div>
                <div className="text-sm text-muted-foreground">Type: {file.type}</div>
                <div className="text-sm text-muted-foreground">Linked Deal: {file.deal}</div>
                <div className="text-sm text-muted-foreground">Uploader: {file.uploader}</div>
                <div className="text-sm text-muted-foreground">Uploaded: {file.uploadDate}</div>
                <div className="mt-4 text-xs text-muted-foreground">(Preview not available in demo)</div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

const ScheduleMeetingPage = () => {
  const { meetings, users, deals } = useAppDemo();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const meetingsByDate = meetings.reduce((acc, m) => {
    acc[m.date] = acc[m.date] || [];
    acc[m.date].push(m);
    return acc;
  }, {});
  const formatDate = (date) => date.toISOString().slice(0, 10);
  const todayMeetings = meetingsByDate[formatDate(selectedDate)] || [];
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Schedule & Meetings</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <ReactCalendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileContent={({ date, view }) => {
              const hasMeeting = meetingsByDate[formatDate(date)];
              return hasMeeting ? <span className="block w-2 h-2 bg-primary rounded-full mx-auto mt-1" /> : null;
            }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Meetings on {selectedDate.toLocaleDateString()}</h3>
          {todayMeetings.length === 0 && <div className="text-muted-foreground text-sm">No meetings scheduled.</div>}
          <div className="space-y-4">
            {todayMeetings.map(meeting => (
              <div key={meeting.id} className="p-4 bg-muted rounded-lg shadow-sm">
                <div className="font-medium text-base">{meeting.title}</div>
                <div className="text-sm text-muted-foreground">{meeting.time} &bull; <Badge>{meeting.project}</Badge></div>
                <div className="text-xs mt-1">Location: {meeting.location}</div>
                <div className="flex gap-2 mt-2">
                  {meeting.attendees.map(name => {
                    const user = users.find(u => u.name === name);
                    return <Avatar key={name} name={user?.name || name} src={user?.avatarUrl} size="xs" />;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
            <Route path="/calendar" element={<ScheduleMeetingPage />} />
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
