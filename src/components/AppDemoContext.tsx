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
  { id: 'd1', name: '123 Market Street', address: '123 Market Street, San Francisco, CA', type: 'Office', value: 18500000, status: 'Due Diligence', expectedClose: '2025-08-15', leadContact: 'Sarah Johnson', team: ['Sarah Johnson', 'Chloe Hughes', 'Noah Lee'] },
  { id: 'd2', name: 'Tower Plaza', address: '456 Tower Ave, San Jose, CA', type: 'Mixed Use', value: 32000000, status: 'LOI', expectedClose: '2025-09-01', leadContact: 'Chloe Hughes', team: ['Chloe Hughes', 'Robert Kim', 'Noah Lee'] },
  { id: 'd3', name: 'Riverside Office', address: '789 Riverside Dr, Sacramento, CA', type: 'Office', value: 21000000, status: 'Underwriting', expectedClose: '2025-07-30', leadContact: 'Robert Kim', team: ['Robert Kim', 'Sarah Johnson'] },
  { id: 'd4', name: 'Parkside Logistics Center', address: '8410 Grand Avenue, Oakland, CA', type: 'Industrial', value: 42000000, status: 'LOI', expectedClose: '2025-10-15', leadContact: 'Sarah Johnson', team: ['Chloe Hughes', 'Robert Kim', 'Noah Lee'] },
];

const initialTasks: Task[] = [
  { id: 't1', name: 'Submit Environmental Report', assignee: 'Sarah Johnson', dueDate: '2025-07-21', project: 'Tower Plaza', status: 'Complete', description: '', platform: 'Excel' },
  { id: 't2', name: 'Confirm Title Insurance', assignee: 'Noah Lee', dueDate: '2025-07-22', project: '123 Market Street', status: 'In Progress', dependencies: ['Submit LOI'], description: '', platform: 'Google Docs' },
  { id: 't3', name: 'Review Lease Terms', assignee: 'Robert Kim', dueDate: '2025-07-25', project: 'Riverside Office', status: 'Open', description: '', platform: 'Notion' },
  { id: 't4', name: 'Draft PSA (Purchase Sale Agreement)', assignee: 'Robert Kim', dueDate: '2025-08-05', project: 'Tower Plaza', status: 'Open', dependencies: ['Submit LOI'], description: 'Coordinate with legal to draft and circulate PSA for review.', platform: 'Google Docs' },
];

const initialActivities: Activity[] = [
  { id: 'a1', type: 'complete', user: 'Sarah Johnson', message: '✔️ Sarah Johnson completed “Submit Environmental Report” (Tower Plaza)', timestamp: '2025-07-21T10:00:00Z', relatedDeal: 'Tower Plaza', relatedTask: 'Submit Environmental Report' },
  { id: 'a2', type: 'reassign', user: 'Chloe Hughes', message: '🔄 Chloe reassigned “Confirm Title Insurance” to Noah (123 Market Street)', timestamp: '2025-07-20T15:00:00Z', relatedDeal: '123 Market Street', relatedTask: 'Confirm Title Insurance' },
  { id: 'a3', type: 'create', user: 'Robert Kim', message: '📝 Robert created a new task “Review Lease Terms” (Riverside Office)', timestamp: '2025-07-19T09:30:00Z', relatedDeal: 'Riverside Office', relatedTask: 'Review Lease Terms' },
  { id: 'a4', type: 'upload', user: 'Sarah Johnson', message: '📎 Uploaded “LOI_TowerPlaza.pdf” to Shared Files', timestamp: '2025-07-18T16:45:00Z', relatedDeal: 'Tower Plaza', fileType: 'PDF' },
  { id: 'a5', type: 'create', user: 'Chloe Hughes', message: '📅 Scheduled “Kickoff Call – Riverside Office” for July 25 at 10:00 AM', timestamp: '2025-07-17T08:00:00Z', relatedDeal: 'Riverside Office' },
];

const initialFiles: FileItem[] = [
  { id: 'f1', name: 'LOI_TowerPlaza.pdf', type: 'PDF', uploadDate: '2025-07-21', deal: 'Tower Plaza', uploader: 'Sarah Johnson' },
  { id: 'f2', name: 'RentRoll_MarketSt.xlsx', type: 'Excel', uploadDate: '2025-07-20', deal: '123 Market Street', uploader: 'Chloe Hughes' },
  { id: 'f3', name: 'EnvReport_Riverside.docx', type: 'DOCX', uploadDate: '2025-07-19', deal: 'Riverside Office', uploader: 'Robert Kim' },
  { id: 'f4', name: 'PSA_Draft_TowerPlaza.docx', type: 'DOCX', uploadDate: '2025-07-18', deal: 'Tower Plaza', uploader: 'Noah Lee' },
  { id: 'f5', name: 'TitleInsurance_123Market.pdf', type: 'PDF', uploadDate: '2025-07-17', deal: '123 Market Street', uploader: 'Sarah Johnson' },
  { id: 'f6', name: 'Parkside_OM.pdf', type: 'PDF', uploadDate: '2025-07-16', deal: 'Parkside Logistics Center', uploader: 'Chloe Hughes' },
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