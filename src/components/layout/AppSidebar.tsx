import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Building2,
  CheckSquare,
  Activity,
  FileText,
  Search,
  Plus,
  Home,
  Users,
  Calendar,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppDemo } from '../AppDemoContext';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "All Deals", url: "/deals", icon: Building2 },
  { title: "My Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Team Activity", url: "/activity", icon: Activity },
  { title: "Shared Files", url: "/files", icon: FileText },
  { title: "Schedule Meeting", url: "/calendar", icon: Calendar },
];

const quickActions = [
  { title: "New Deal", url: "/deals/new", icon: Plus },
  { title: "Add Task", url: "/tasks/new", icon: CheckSquare },
  { title: "Schedule Meeting", url: "/calendar", icon: Calendar },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewDeal, setShowNewDeal] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showScheduleMeeting, setShowScheduleMeeting] = useState(false);

  const { users, deals, tasks, addTask, addDeal, addMeeting } = useAppDemo();
  const [taskForm, setTaskForm] = useState({
    name: '',
    assignee: '',
    dueDate: '',
    project: '',
    dependencies: [],
    description: '',
    platform: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formError, setFormError] = useState('');

  const [dealForm, setDealForm] = useState({
    name: '',
    address: '',
    type: '',
    value: '',
    status: '',
    expectedClose: '',
    leadContact: '',
    team: [],
  });
  const [dealFormError, setDealFormError] = useState('');
  const [showDealDatePicker, setShowDealDatePicker] = useState(false);

  const [meetingForm, setMeetingForm] = useState({
    title: '',
    date: '',
    time: '',
    project: '',
    attendees: [],
    location: '',
  });
  const [meetingFormError, setMeetingFormError] = useState('');
  const [showMeetingDatePicker, setShowMeetingDatePicker] = useState(false);

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;

  const getNavClasses = (active: boolean) =>
    active
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border">
        <div className="p-4">
          {!isCollapsed && (
            <>
              <h1 className="text-xl font-bold text-primary">Deal Room</h1>
              <p className="text-sm text-muted-foreground">CRE Task Management</p>
            </>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search deals, tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="grid grid-cols-1 gap-2 px-4">
                <Dialog open={showNewDeal} onOpenChange={setShowNewDeal}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => setShowNewDeal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Deal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Deal</DialogTitle>
                    </DialogHeader>
                    <form
                      className="space-y-4"
                      onSubmit={e => {
                        e.preventDefault();
                        if (!dealForm.name || !dealForm.address || !dealForm.type || !dealForm.value || !dealForm.status || !dealForm.expectedClose || !dealForm.leadContact) {
                          setDealFormError('Please fill in all required fields.');
                          return;
                        }
                        addDeal({
                          name: dealForm.name,
                          address: dealForm.address,
                          type: dealForm.type,
                          value: Number(dealForm.value),
                          status: dealForm.status,
                          expectedClose: dealForm.expectedClose,
                          leadContact: dealForm.leadContact,
                          team: dealForm.team,
                        });
                        setDealForm({ name: '', address: '', type: '', value: '', status: '', expectedClose: '', leadContact: '', team: [] });
                        setShowNewDeal(false);
                        setDealFormError('');
                      }}
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">Deal Name *</label>
                        <Input
                          value={dealForm.name}
                          onChange={e => setDealForm(f => ({ ...f, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Property Address *</label>
                        <Input
                          value={dealForm.address}
                          onChange={e => setDealForm(f => ({ ...f, address: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Property Type *</label>
                        <Select
                          value={dealForm.type}
                          onValueChange={v => setDealForm(f => ({ ...f, type: v }))}
                        >
                          <option value="" disabled>Select type</option>
                          <option value="Office">Office</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Mixed Use">Mixed Use</option>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Deal Value ($) *</label>
                        <Input
                          type="number"
                          value={dealForm.value}
                          onChange={e => setDealForm(f => ({ ...f, value: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Status *</label>
                        <Select
                          value={dealForm.status}
                          onValueChange={v => setDealForm(f => ({ ...f, status: v }))}
                        >
                          <option value="" disabled>Select status</option>
                          <option value="LOI">LOI</option>
                          <option value="Underwriting">Underwriting</option>
                          <option value="Due Diligence">Due Diligence</option>
                          <option value="Closing">Closing</option>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Expected Close Date *</label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={dealForm.expectedClose}
                            readOnly
                            onClick={() => setShowDealDatePicker(v => !v)}
                            placeholder="Select date"
                            className="cursor-pointer"
                            required
                          />
                          <Button type="button" variant="ghost" size="icon" onClick={() => setShowDealDatePicker(v => !v)}>
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        {showDealDatePicker && (
                          <div className="z-10 bg-background border rounded shadow p-2 mt-2">
                            <Calendar
                              mode="single"
                              selected={dealForm.expectedClose ? new Date(dealForm.expectedClose) : undefined}
                              onSelect={date => {
                                setDealForm(f => ({ ...f, expectedClose: date ? date.toISOString().slice(0, 10) : '' }));
                                setShowDealDatePicker(false);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Lead Contact *</label>
                        <Select
                          value={dealForm.leadContact}
                          onValueChange={v => setDealForm(f => ({ ...f, leadContact: v }))}
                        >
                          <option value="" disabled>Select lead</option>
                          {users.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Team Members</label>
                        <Select
                          multiple
                          value={dealForm.team}
                          onValueChange={v => setDealForm(f => ({ ...f, team: v }))}
                        >
                          {users.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                          ))}
                        </Select>
                      </div>
                      {dealFormError && <div className="text-red-500 text-sm">{dealFormError}</div>}
                      <Button type="submit" className="w-full mt-2">Create Deal</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => setShowAddTask(true)}
                    >
                      <CheckSquare className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Task</DialogTitle>
                    </DialogHeader>
                    <form
                      className="space-y-4"
                      onSubmit={e => {
                        e.preventDefault();
                        if (!taskForm.name || !taskForm.assignee || !taskForm.dueDate || !taskForm.project) {
                          setFormError('Please fill in all required fields.');
                          return;
                        }
                        addTask({
                          name: taskForm.name,
                          assignee: taskForm.assignee,
                          dueDate: taskForm.dueDate,
                          project: taskForm.project,
                          status: 'Open',
                          dependencies: taskForm.dependencies,
                          description: taskForm.description,
                          platform: taskForm.platform,
                        });
                        setTaskForm({ name: '', assignee: '', dueDate: '', project: '', dependencies: [], description: '', platform: '' });
                        setShowAddTask(false);
                        setFormError('');
                      }}
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">Task Name *</label>
                        <Input
                          value={taskForm.name}
                          onChange={e => setTaskForm(f => ({ ...f, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Assignee *</label>
                        <Select
                          value={taskForm.assignee}
                          onValueChange={v => setTaskForm(f => ({ ...f, assignee: v }))}
                        >
                          <option value="" disabled>Select assignee</option>
                          {users.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Due Date *</label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={taskForm.dueDate ? format(new Date(taskForm.dueDate), 'yyyy-MM-dd') : ''}
                            readOnly
                            onClick={() => setShowDatePicker(v => !v)}
                            placeholder="Select date"
                            className="cursor-pointer"
                            required
                          />
                          <Button type="button" variant="ghost" size="icon" onClick={() => setShowDatePicker(v => !v)}>
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        {showDatePicker && (
                          <div className="z-10 bg-background border rounded shadow p-2 mt-2">
                            <Calendar
                              mode="single"
                              selected={taskForm.dueDate ? new Date(taskForm.dueDate) : undefined}
                              onSelect={date => {
                                setTaskForm(f => ({ ...f, dueDate: date ? date.toISOString().slice(0, 10) : '' }));
                                setShowDatePicker(false);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Projects *</label>
                        <Select
                          value={taskForm.project}
                          onValueChange={v => setTaskForm(f => ({ ...f, project: v }))}
                        >
                          <option value="" disabled>Select project</option>
                          {deals.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Dependencies</label>
                        <Select
                          multiple
                          value={taskForm.dependencies}
                          onValueChange={v => setTaskForm(f => ({ ...f, dependencies: v }))}
                        >
                          {tasks.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea
                          value={taskForm.description}
                          onChange={e => setTaskForm(f => ({ ...f, description: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Platform</label>
                        <Select
                          value={taskForm.platform}
                          onValueChange={v => setTaskForm(f => ({ ...f, platform: v }))}
                        >
                          <option value="">Select platform</option>
                          <option value="Excel">Excel</option>
                          <option value="Google Sheets">Google Sheets</option>
                          <option value="Notion">Notion</option>
                          <option value="Upload Custom">Upload Custom</option>
                        </Select>
                      </div>
                      {formError && <div className="text-red-500 text-sm">{formError}</div>}
                      <Button type="submit" className="w-full mt-2">Create Task</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog open={showScheduleMeeting} onOpenChange={setShowScheduleMeeting}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => setShowScheduleMeeting(true)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Meeting</DialogTitle>
                    </DialogHeader>
                    <form
                      className="space-y-4"
                      onSubmit={e => {
                        e.preventDefault();
                        if (!meetingForm.title || !meetingForm.date || !meetingForm.time || !meetingForm.project) {
                          setMeetingFormError('Please fill in all required fields.');
                          return;
                        }
                        addMeeting({
                          title: meetingForm.title,
                          date: meetingForm.date,
                          time: meetingForm.time,
                          project: meetingForm.project,
                          attendees: meetingForm.attendees,
                          location: meetingForm.location,
                        });
                        setMeetingForm({ title: '', date: '', time: '', project: '', attendees: [], location: '' });
                        setShowScheduleMeeting(false);
                        setMeetingFormError('');
                      }}
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <Input
                          value={meetingForm.title}
                          onChange={e => setMeetingForm(f => ({ ...f, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Date *</label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={meetingForm.date}
                            readOnly
                            onClick={() => setShowMeetingDatePicker(v => !v)}
                            placeholder="Select date"
                            className="cursor-pointer"
                            required
                          />
                          <Button type="button" variant="ghost" size="icon" onClick={() => setShowMeetingDatePicker(v => !v)}>
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        {showMeetingDatePicker && (
                          <div className="z-10 bg-background border rounded shadow p-2 mt-2">
                            <ReactCalendar
                              value={meetingForm.date ? new Date(meetingForm.date) : undefined}
                              onChange={date => {
                                if (Array.isArray(date)) return;
                                setMeetingForm(f => ({ ...f, date: date ? date.toISOString().slice(0, 10) : '' }));
                                setShowMeetingDatePicker(false);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Time *</label>
                        <Input
                          type="time"
                          value={meetingForm.time}
                          onChange={e => setMeetingForm(f => ({ ...f, time: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Project *</label>
                        <Select
                          value={meetingForm.project}
                          onValueChange={v => setMeetingForm(f => ({ ...f, project: v }))}
                        >
                          <option value="" disabled>Select project</option>
                          {deals.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Attendees</label>
                        <Select
                          multiple
                          value={meetingForm.attendees}
                          onValueChange={v => setMeetingForm(f => ({ ...f, attendees: v }))}
                        >
                          {users.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Location/Zoom Link</label>
                        <Input
                          value={meetingForm.location}
                          onChange={e => setMeetingForm(f => ({ ...f, location: e.target.value }))}
                        />
                      </div>
                      {meetingFormError && <div className="text-red-500 text-sm">{meetingFormError}</div>}
                      <Button type="submit" className="w-full mt-2">Create Meeting</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClasses(isActive(item.url))}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Deals */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Recent Deals</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/deals/123-market-st" className="text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>123 Market St</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/deals/tower-plaza" className="text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>Tower Plaza</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/deals/riverside-office" className="text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>Riverside Office</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <div className="p-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Acquisitions</p>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          )}
          {isCollapsed && (
            <Button variant="ghost" size="icon" className="w-full">
              <Users className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}