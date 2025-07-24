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
import { useAppDemo } from '../components/AppDemoContext';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { useMemo } from 'react';
import { differenceInCalendarDays, parseISO } from 'date-fns';

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
  const { deals, tasks, users } = useAppDemo();
  const today = new Date();
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">All Deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map(deal => {
          const dealTasks = tasks.filter(t => t.project === deal.name);
          const completed = dealTasks.filter(t => t.status === 'Complete').length;
          const daysToClose = differenceInCalendarDays(parseISO(deal.expectedClose), today);
          const lead = users.find(u => u.name === deal.leadContact);
          return (
            <div key={deal.id} className="bg-muted rounded-lg shadow p-6 flex flex-col justify-between">
              <div>
                <div className="text-lg font-semibold mb-1">{deal.name}</div>
                <div className="text-sm text-muted-foreground mb-2">{deal.address}</div>
                <div className="flex gap-2 mb-2">
                  <Badge>{deal.type}</Badge>
                  <Badge variant="secondary">{deal.status}</Badge>
                </div>
                <div className="text-sm mb-2">Value: <span className="font-medium">${deal.value.toLocaleString()}</span></div>
                <div className="text-sm mb-2">Days to Close: <span className="font-medium">{daysToClose}</span></div>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar name={lead?.name || deal.leadContact} size="xs" />
                  <span className="text-sm">Lead: {deal.leadContact}</span>
                </div>
                <div className="text-sm mb-2">Task Progress: <span className="font-medium">{completed}/{dealTasks.length}</span> tasks complete</div>
              </div>
              <Button className="mt-4 w-full" variant="outline">View Deal Workspace</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
