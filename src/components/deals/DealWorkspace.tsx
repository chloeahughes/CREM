import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { KanbanBoard } from "./KanbanBoard";
import { PropertyDetailsPanel } from "./PropertyDetailsPanel";

interface DealWorkspaceProps {
  dealId: string;
}

// Mock data - this would come from Supabase
const mockDeal = {
  id: "123-market-st",
  propertyName: "123 Market Street Office Building",
  address: "123 Market Street, San Francisco, CA 94105",
  propertyType: "Office",
  stage: "due-diligence" as const,
  dealValue: 85000000,
  targetCloseDate: new Date("2024-03-15"),
  daysUntilClose: 23,
  leadContact: "Sarah Johnson",
  tasksCompleted: 18,
  totalTasks: 34,
  urgentTasks: 3,
  team: ["Sarah Johnson", "Mike Chen", "Emily Davis", "Robert Kim"],
  keyDates: {
    loiSigned: new Date("2024-01-10"),
    dueDiligenceDeadline: new Date("2024-02-28"),
    inspectionDeadline: new Date("2024-02-25"),
    loanCommitment: new Date("2024-03-05"),
  },
  propertyDetails: {
    squareFootage: 125000,
    yearBuilt: 1985,
    lastRenovated: 2018,
    occupancyRate: 92,
    tenants: 15,
    parkingSpaces: 250,
    leasingContact: "Jennifer Wu",
  },
  financials: {
    purchasePrice: 85000000,
    pricePerSF: 680,
    capRate: 5.2,
    noi: 4420000,
    downPayment: 25500000,
    loanAmount: 59500000,
  },
};

export function DealWorkspace({ dealId }: DealWorkspaceProps) {
  const [activeView, setActiveView] = useState<"kanban" | "timeline" | "docs">("kanban");
  const deal = mockDeal; // In real app, fetch from Supabase based on dealId

  const progressPercentage = (deal.tasksCompleted / deal.totalTasks) * 100;

  return (
    <div className="h-full bg-background-subtle">
      {/* Property Header */}
      <div className="bg-background border-b border-border p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Building2 className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">{deal.propertyName}</h1>
              <Badge className="bg-stage-due-diligence text-white">
                Due Diligence
              </Badge>
            </div>
            
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              {deal.address}
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Deal Value</p>
                <p className="text-lg font-semibold">
                  ${(deal.dealValue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Close Date</p>
                <p className="text-lg font-semibold">
                  {deal.targetCloseDate.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="text-lg font-semibold text-status-urgent">
                  {deal.daysUntilClose} days
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Task Progress</p>
                <div className="flex items-center space-x-2">
                  <Progress value={progressPercentage} className="flex-1 h-2" />
                  <span className="text-sm font-medium">
                    {deal.tasksCompleted}/{deal.totalTasks}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {deal.team.slice(0, 4).map((member, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center border-2 border-background"
                >
                  {member.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Manage Team
            </Button>
            
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full">
        {/* Property Details Sidebar */}
        <div className="w-80 bg-background border-r border-border overflow-y-auto">
          <PropertyDetailsPanel deal={deal} />
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col">
          {/* View Tabs */}
          <div className="bg-background border-b border-border px-6 py-3">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveView("kanban")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeView === "kanban"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Task Board
              </button>
              <button
                onClick={() => setActiveView("timeline")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeView === "timeline"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setActiveView("docs")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeView === "docs"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Documents
              </button>

              <div className="ml-auto">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeView === "kanban" && <KanbanBoard dealId={dealId} />}
            {activeView === "timeline" && (
              <div className="p-6 text-center text-muted-foreground">
                Timeline view coming soon...
              </div>
            )}
            {activeView === "docs" && (
              <div className="p-6 text-center text-muted-foreground">
                Document management coming soon...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}