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

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "All Deals", url: "/deals", icon: Building2 },
  { title: "My Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Team Activity", url: "/activity", icon: Activity },
  { title: "Shared Files", url: "/files", icon: FileText },
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
                      <DialogTitle>New Deal (Coming Soon)</DialogTitle>
                    </DialogHeader>
                    <div className="text-muted-foreground">Deal creation form will go here.</div>
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
                      <DialogTitle>Add Task (Coming Soon)</DialogTitle>
                    </DialogHeader>
                    <div className="text-muted-foreground">Task creation form will go here.</div>
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
                      <DialogTitle>Schedule Meeting (Coming Soon)</DialogTitle>
                    </DialogHeader>
                    <div className="text-muted-foreground">Meeting scheduling form will go here.</div>
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