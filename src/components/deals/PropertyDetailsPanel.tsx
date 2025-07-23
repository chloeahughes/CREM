import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Calendar,
  Users,
  Square,
  Car,
  Percent,
  DollarSign,
  TrendingUp,
  User,
  Phone,
  Mail,
} from "lucide-react";

interface Deal {
  propertyName: string;
  propertyType: string;
  stage: string;
  keyDates: {
    loiSigned: Date;
    dueDiligenceDeadline: Date;
    inspectionDeadline: Date;
    loanCommitment: Date;
  };
  propertyDetails: {
    squareFootage: number;
    yearBuilt: number;
    lastRenovated: number;
    occupancyRate: number;
    tenants: number;
    parkingSpaces: number;
    leasingContact: string;
  };
  financials: {
    purchasePrice: number;
    pricePerSF: number;
    capRate: number;
    noi: number;
    downPayment: number;
    loanAmount: number;
  };
}

interface PropertyDetailsPanelProps {
  deal: Deal;
}

export function PropertyDetailsPanel({ deal }: PropertyDetailsPanelProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const isDateUrgent = (date: Date) => {
    const now = new Date();
    const daysDiff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 7 && daysDiff >= 0;
  };

  return (
    <div className="p-4 space-y-4">
      {/* Key Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Key Dates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">LOI Signed</span>
            <span className="text-sm font-medium">
              {deal.keyDates.loiSigned.toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">DD Deadline</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {deal.keyDates.dueDiligenceDeadline.toLocaleDateString()}
              </span>
              {isDateUrgent(deal.keyDates.dueDiligenceDeadline) && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Inspection</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {deal.keyDates.inspectionDeadline.toLocaleDateString()}
              </span>
              {isDateUrgent(deal.keyDates.inspectionDeadline) && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Loan Commitment</span>
            <span className="text-sm font-medium">
              {deal.keyDates.loanCommitment.toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Building2 className="h-4 w-4 mr-2" />
            Property Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Square className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Square Feet</span>
              </div>
              <span className="text-sm font-medium">
                {formatNumber(deal.propertyDetails.squareFootage)} SF
              </span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Built</span>
              </div>
              <span className="text-sm font-medium">{deal.propertyDetails.yearBuilt}</span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Renovated</span>
              </div>
              <span className="text-sm font-medium">{deal.propertyDetails.lastRenovated}</span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Car className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Parking</span>
              </div>
              <span className="text-sm font-medium">{deal.propertyDetails.parkingSpaces}</span>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Occupancy Rate</span>
              <span className="text-sm font-medium text-status-completed">
                {deal.propertyDetails.occupancyRate}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Tenants</span>
              <span className="text-sm font-medium">{deal.propertyDetails.tenants}</span>
            </div>
          </div>

          <Separator />
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Leasing Contact</span>
            </div>
            <span className="text-sm font-medium">{deal.propertyDetails.leasingContact}</span>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Purchase Price</span>
              <span className="text-sm font-medium">
                {formatCurrency(deal.financials.purchasePrice)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price/SF</span>
              <span className="text-sm font-medium">
                ${deal.financials.pricePerSF}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cap Rate</span>
              <span className="text-sm font-medium text-status-completed">
                {deal.financials.capRate}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">NOI</span>
              <span className="text-sm font-medium">
                {formatCurrency(deal.financials.noi)}
              </span>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Down Payment</span>
              <span className="text-sm font-medium">
                {formatCurrency(deal.financials.downPayment)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Loan Amount</span>
              <span className="text-sm font-medium">
                {formatCurrency(deal.financials.loanAmount)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button className="w-full text-left text-sm p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            📄 View All Documents
          </button>
          <button className="w-full text-left text-sm p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            📊 Financial Analysis
          </button>
          <button className="w-full text-left text-sm p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            🏗️ Inspection Reports
          </button>
          <button className="w-full text-left text-sm p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            ⚖️ Legal Documents
          </button>
        </CardContent>
      </Card>
    </div>
  );
}