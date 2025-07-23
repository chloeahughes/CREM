import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DealCardProps {
  deal: {
    id: string;
    propertyName: string;
    address: string;
    propertyType: string;
    stage: 'loi' | 'due-diligence' | 'underwriting' | 'closing';
    dealValue: number;
    targetCloseDate: Date;
    daysUntilClose: number;
    leadContact: string;
    tasksCompleted: number;
    totalTasks: number;
    urgentTasks: number;
    team: string[];
  };
  onClick?: () => void;
}

const stageConfig = {
  loi: {
    label: "LOI",
    color: "bg-stage-loi",
    icon: Clock,
  },
  "due-diligence": {
    label: "Due Diligence",
    color: "bg-stage-due-diligence",
    icon: AlertTriangle,
  },
  underwriting: {
    label: "Underwriting",
    color: "bg-stage-underwriting",
    icon: DollarSign,
  },
  closing: {
    label: "Closing",
    color: "bg-stage-closing",
    icon: CheckCircle,
  },
};

export function DealCard({ deal, onClick }: DealCardProps) {
  const stage = stageConfig[deal.stage];
  const progressPercentage = (deal.tasksCompleted / deal.totalTasks) * 100;
  
  const isUrgent = deal.daysUntilClose <= 7;
  const hasOverdueTasks = deal.urgentTasks > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        isUrgent && "ring-2 ring-status-urgent ring-opacity-50",
        hasOverdueTasks && "border-status-urgent"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-lg">{deal.propertyName}</h3>
              {isUrgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              {deal.address}
            </div>
            
            <Badge variant="secondary" className="text-xs">
              {deal.propertyType}
            </Badge>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <Badge className={cn("text-white", stage.color)}>
              <stage.icon className="h-3 w-3 mr-1" />
              {stage.label}
            </Badge>
            <div className="text-right">
              <p className="text-sm font-medium">{formatCurrency(deal.dealValue)}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Task Progress</span>
            <span className="text-sm text-muted-foreground">
              {deal.tasksCompleted}/{deal.totalTasks}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Close Date</p>
              <p className="font-medium">
                {deal.targetCloseDate.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className={cn(
              "h-4 w-4",
              isUrgent ? "text-status-urgent" : "text-muted-foreground"
            )} />
            <div>
              <p className="text-muted-foreground">Days Left</p>
              <p className={cn(
                "font-medium",
                isUrgent && "text-status-urgent"
              )}>
                {deal.daysUntilClose} days
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Lead Contact</p>
              <p className="font-medium">{deal.leadContact}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <AlertTriangle className={cn(
              "h-4 w-4",
              hasOverdueTasks ? "text-status-urgent" : "text-muted-foreground"
            )} />
            <div>
              <p className="text-muted-foreground">Urgent Tasks</p>
              <p className={cn(
                "font-medium",
                hasOverdueTasks && "text-status-urgent"
              )}>
                {deal.urgentTasks}
              </p>
            </div>
          </div>
        </div>

        {/* Team Avatars */}
        {deal.team.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Team</span>
              <div className="flex -space-x-2">
                {deal.team.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center border-2 border-background"
                  >
                    {member.charAt(0)}
                  </div>
                ))}
                {deal.team.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center border-2 border-background">
                    +{deal.team.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Deal Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}