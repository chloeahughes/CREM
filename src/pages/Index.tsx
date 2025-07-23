import { AppLayout } from "@/components/layout/AppLayout";
import { DealCard } from "@/components/deals/DealCard";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

const mockDeals = [
  {
    id: "123-market-st",
    propertyName: "123 Market Street",
    address: "123 Market St, San Francisco, CA",
    propertyType: "Office",
    stage: "due-diligence" as const,
    dealValue: 85000000,
    targetCloseDate: new Date("2024-03-15"),
    daysUntilClose: 23,
    leadContact: "Sarah Johnson",
    tasksCompleted: 18,
    totalTasks: 34,
    urgentTasks: 3,
    team: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
  },
  {
    id: "tower-plaza",
    propertyName: "Tower Plaza",
    address: "456 Financial District, SF, CA",
    propertyType: "Mixed Use",
    stage: "underwriting" as const,
    dealValue: 120000000,
    targetCloseDate: new Date("2024-04-30"),
    daysUntilClose: 67,
    leadContact: "Robert Kim",
    tasksCompleted: 8,
    totalTasks: 28,
    urgentTasks: 1,
    team: ["Robert Kim", "Jennifer Wu"],
  },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Deal Dashboard</h1>
            <p className="text-muted-foreground">Manage your commercial real estate transactions</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search deals..." className="pl-10" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <DropdownMenuLabel>Filter Deals</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Deal Stage: LOI, Due Diligence, Underwriting, Closing</DropdownMenuItem>
              <DropdownMenuItem>Property Type: Office, Industrial, Mixed Use</DropdownMenuItem>
              <DropdownMenuItem>
                Days to Close:
                <div className="px-2 py-1">
                  <Slider min={0} max={120} defaultValue={[0, 120]} step={1} />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>Lead Contact: Sarah Johnson, Robert Kim, etc.</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDeals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onClick={() => window.location.href = `/deals/${deal.id}`}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
