import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  MessageSquare,
  Paperclip,
  Plus,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  tags: string[];
  attachments: number;
  comments: number;
  dealPhase: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

interface KanbanBoardProps {
  dealId: string;
}

// Mock data - this would come from Supabase
const mockColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-gray-100",
    tasks: [
      {
        id: "1",
        title: "Review Purchase Agreement",
        description: "Review and markup the draft purchase agreement from seller's counsel",
        assignee: "Sarah Johnson",
        dueDate: new Date("2024-02-20"),
        priority: "high",
        status: "todo",
        tags: ["Legal", "Purchase Agreement"],
        attachments: 2,
        comments: 3,
        dealPhase: "Legal Review",
      },
      {
        id: "2",
        title: "Environmental Site Assessment",
        description: "Commission Phase I ESA from certified environmental consultant",
        assignee: "Mike Chen",
        dueDate: new Date("2024-02-25"),
        priority: "urgent",
        status: "todo",
        tags: ["Environmental", "Due Diligence"],
        attachments: 0,
        comments: 1,
        dealPhase: "Environmental Review",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-blue-100",
    tasks: [
      {
        id: "3",
        title: "Property Survey Review",
        description: "Review ALTA survey and identify any boundary issues",
        assignee: "Emily Davis",
        dueDate: new Date("2024-02-22"),
        priority: "medium",
        status: "in-progress",
        tags: ["Survey", "Title"],
        attachments: 5,
        comments: 7,
        dealPhase: "Title Review",
      },
      {
        id: "4",
        title: "Lease Abstraction",
        description: "Abstract all tenant leases and create summary report",
        assignee: "Robert Kim",
        dueDate: new Date("2024-02-28"),
        priority: "high",
        status: "in-progress",
        tags: ["Leasing", "Analysis"],
        attachments: 15,
        comments: 2,
        dealPhase: "Leasing Review",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "bg-yellow-100",
    tasks: [
      {
        id: "5",
        title: "Financial Model Validation",
        description: "Validate underwriting assumptions with actual lease data",
        assignee: "Sarah Johnson",
        dueDate: new Date("2024-02-21"),
        priority: "high",
        status: "review",
        tags: ["Financial", "Underwriting"],
        attachments: 3,
        comments: 5,
        dealPhase: "Financial Analysis",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    color: "bg-green-100",
    tasks: [
      {
        id: "6",
        title: "Property Inspection",
        description: "Complete professional property inspection",
        assignee: "Mike Chen",
        dueDate: new Date("2024-02-15"),
        priority: "medium",
        status: "completed",
        tags: ["Inspection", "Physical"],
        attachments: 8,
        comments: 4,
        dealPhase: "Physical Review",
      },
      {
        id: "7",
        title: "Title Insurance Application",
        description: "Submit title insurance application to underwriter",
        assignee: "Emily Davis",
        dueDate: new Date("2024-02-18"),
        priority: "medium",
        status: "completed",
        tags: ["Title", "Insurance"],
        attachments: 2,
        comments: 1,
        dealPhase: "Title Review",
      },
    ],
  },
];

const priorityConfig = {
  low: { color: "bg-gray-200 text-gray-700", icon: Clock },
  medium: { color: "bg-blue-200 text-blue-700", icon: Clock },
  high: { color: "bg-orange-200 text-orange-700", icon: AlertTriangle },
  urgent: { color: "bg-red-200 text-red-700", icon: AlertTriangle },
};

function TaskCard({ task }: { task: Task }) {
  const priority = priorityConfig[task.priority];
  const isOverdue = new Date() > task.dueDate;
  const isDueSoon = !isOverdue && 
    Math.ceil((task.dueDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)) <= 3;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
          <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
        
        {task.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {task.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Priority & Due Date */}
        <div className="flex items-center justify-between mb-3">
          <Badge className={cn("text-xs", priority.color)}>
            <priority.icon className="h-3 w-3 mr-1" />
            {task.priority}
          </Badge>
          
          <div className={cn(
            "text-xs flex items-center",
            isOverdue && "text-status-urgent font-medium",
            isDueSoon && "text-status-pending font-medium"
          )}>
            <Calendar className="h-3 w-3 mr-1" />
            {task.dueDate.toLocaleDateString()}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {task.attachments > 0 && (
              <div className="flex items-center text-muted-foreground">
                <Paperclip className="h-3 w-3 mr-1" />
                <span className="text-xs">{task.attachments}</span>
              </div>
            )}
            
            {task.comments > 0 && (
              <div className="flex items-center text-muted-foreground">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span className="text-xs">{task.comments}</span>
              </div>
            )}
          </div>

          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {getInitials(task.assignee)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Deal Phase */}
        <div className="mt-2 pt-2 border-t">
          <span className="text-xs text-muted-foreground">{task.dealPhase}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function KanbanBoard({ dealId }: KanbanBoardProps) {
  const [columns, setColumns] = useState(mockColumns);

  return (
    <div className="h-full bg-background-subtle p-6">
      <div className="grid grid-cols-4 gap-6 h-full">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={cn("w-3 h-3 rounded-full", column.color)} />
                <h3 className="font-semibold text-sm">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {column.tasks.length}
                </Badge>
              </div>
              
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {/* Add Task Button */}
              <Button
                variant="ghost"
                className="w-full h-16 border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}