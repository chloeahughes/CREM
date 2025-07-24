import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: string;
};

export type Deal = {
  id: string;
  name: string;
  address: string;
  type: string;
  value: number;
  status: string;
  expectedClose: string;
  leadContact: string;
  team: string[];
};

export type Task = {
  id: string;
  name: string;
  assignee: string;
  dueDate: string;
  project: string;
  status: 'Open' | 'In Progress' | 'Complete';
  dependencies?: string[];
  description?: string;
  platform?: string;
};

export type Activity = {
  id: string;
  type: 'complete' | 'create' | 'reassign' | 'upload';
  user: string;
  message: string;
  timestamp: string;
  relatedDeal?: string;
  relatedTask?: string;
  fileType?: string;
};

export type FileItem = {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  deal: string;
  uploader: string;
};

export type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  project: string;
  attendees: string[];
  location: string;
};

// Demo Data
const initialUsers: User[] = [
  { id: '1', name: 'Sarah Johnson', avatarUrl: '', role: 'Acquisitions' },
  { id: '2', name: 'Robert Kim', avatarUrl: '', role: 'Analyst' },
  { id: '3', name: 'Chloe Hughes', avatarUrl: '', role: 'Manager' },
  { id: '4', name: 'Noah Lee', avatarUrl: '', role: 'Legal' },
];

const initialDeals: Deal[] = [
  { id: 'd1', name: '123 Market St', address: '123 Market St', type: 'Office', value: 12000000, status: 'LOI', expectedClose: '2024-08-15', leadContact: 'Sarah Johnson', team: ['Sarah Johnson', 'Robert Kim'] },
  { id: 'd2', name: 'Tower Plaza', address: '456 Tower Ave', type: 'Mixed Use', value: 25000000, status: 'Due Diligence', expectedClose: '2024-09-01', leadContact: 'Chloe Hughes', team: ['Chloe Hughes', 'Noah Lee'] },
  { id: 'd3', name: 'Riverside Office', address: '789 Riverside Dr', type: 'Office', value: 18000000, status: 'Underwriting', expectedClose: '2024-07-30', leadContact: 'Robert Kim', team: ['Robert Kim', 'Sarah Johnson'] },
];

const initialTasks: Task[] = [
  { id: 't1', name: 'Upload Due Diligence Docs', assignee: 'Sarah Johnson', dueDate: '2024-07-20', project: 'Tower Plaza', status: 'Complete', description: '', platform: 'Excel' },
  { id: 't2', name: 'Schedule Environmental Inspection', assignee: 'Robert Kim', dueDate: '2024-07-22', project: '123 Market St', status: 'Open', description: '', platform: 'Google Sheets' },
  { id: 't3', name: 'Finalize Term Sheet', assignee: 'Noah Lee', dueDate: '2024-07-25', project: 'Riverside Office', status: 'In Progress', description: '', platform: 'Notion' },
];

const initialActivities: Activity[] = [
  { id: 'a1', type: 'complete', user: 'Sarah Johnson', message: '✔️ Sarah Johnson completed "Upload Due Diligence Docs" (Tower Plaza)', timestamp: '2024-07-18T10:00:00Z', relatedDeal: 'Tower Plaza', relatedTask: 'Upload Due Diligence Docs' },
  { id: 'a2', type: 'create', user: 'Robert Kim', message: '📝 Robert Kim created new task "Schedule Environmental Inspection"', timestamp: '2024-07-17T14:30:00Z', relatedDeal: '123 Market St', relatedTask: 'Schedule Environmental Inspection' },
  { id: 'a3', type: 'reassign', user: 'System', message: '🔁 Task "Finalize Term Sheet" was reassigned from Chloe to Noah', timestamp: '2024-07-16T09:00:00Z', relatedDeal: 'Riverside Office', relatedTask: 'Finalize Term Sheet' },
  { id: 'a4', type: 'upload', user: 'Sarah Johnson', message: '📎 Lease Abstract (Excel) uploaded to 123 Market St', timestamp: '2024-07-15T16:45:00Z', relatedDeal: '123 Market St', fileType: 'Excel' },
];

const initialFiles: FileItem[] = [
  { id: 'f1', name: 'LOI_Draft.pdf', type: 'PDF', uploadDate: '2024-07-10', deal: '123 Market St', uploader: 'Sarah Johnson' },
  { id: 'f2', name: 'Lease_Abstract.xlsx', type: 'Excel', uploadDate: '2024-07-12', deal: '123 Market St', uploader: 'Sarah Johnson' },
  { id: 'f3', name: 'Env_Report.docx', type: 'DOCX', uploadDate: '2024-07-13', deal: 'Tower Plaza', uploader: 'Robert Kim' },
];

const initialMeetings: Meeting[] = [
  { id: 'm1', title: 'Kickoff Call – 123 Market St', date: '2024-07-25', time: '10:00', project: '123 Market St', attendees: ['Sarah Johnson', 'Robert Kim'], location: 'Zoom' },
  { id: 'm2', title: 'Legal Review – Tower Plaza', date: '2024-07-26', time: '15:00', project: 'Tower Plaza', attendees: ['Chloe Hughes', 'Noah Lee'], location: 'Tower Plaza Conf Room' },
  { id: 'm3', title: 'Financing Review – Riverside Office', date: '2024-07-28', time: '09:30', project: 'Riverside Office', attendees: ['Robert Kim', 'Sarah Johnson'], location: 'Zoom' },
];

// Context
interface AppDemoContextType {
  users: User[];
  deals: Deal[];
  tasks: Task[];
  activities: Activity[];
  files: FileItem[];
  meetings: Meeting[];
  addTask: (task: Omit<Task, 'id'>) => void;
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  addFile: (file: Omit<FileItem, 'id'>) => void;
  addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
}

const AppDemoContext = createContext<AppDemoContextType | undefined>(undefined);

export const useAppDemo = () => {
  const ctx = useContext(AppDemoContext);
  if (!ctx) throw new Error('useAppDemo must be used within AppDemoProvider');
  return ctx;
};

export function AppDemoProvider({ children }: { children: ReactNode }) {
  const [users] = useState<User[]>(initialUsers);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);

  // Add functions
  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks((prev) => [...prev, { ...task, id: `t${prev.length + 1}` }]);
  };
  const addDeal = (deal: Omit<Deal, 'id'>) => {
    setDeals((prev) => [...prev, { ...deal, id: `d${prev.length + 1}` }]);
  };
  const addActivity = (activity: Omit<Activity, 'id'>) => {
    setActivities((prev) => [...prev, { ...activity, id: `a${prev.length + 1}` }]);
  };
  const addFile = (file: Omit<FileItem, 'id'>) => {
    setFiles((prev) => [...prev, { ...file, id: `f${prev.length + 1}` }]);
  };
  const addMeeting = (meeting: Omit<Meeting, 'id'>) => {
    setMeetings((prev) => [...prev, { ...meeting, id: `m${prev.length + 1}` }]);
  };

  return (
    <AppDemoContext.Provider
      value={{ users, deals, tasks, activities, files, meetings, addTask, addDeal, addActivity, addFile, addMeeting }}
    >
      {children}
    </AppDemoContext.Provider>
  );
} 