
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Globe, AlertCircle, Clock } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Active Scrapers"
        value="8"
        description="3 running now"
        icon={<Globe className="h-6 w-6 text-blue-500" />}
        trend={+15}
      />
      <StatCard
        title="Total Records"
        value="24,531"
        description="Last 30 days"
        icon={<Database className="h-6 w-6 text-green-500" />}
        trend={+32}
      />
      <StatCard
        title="Failed Jobs"
        value="2"
        description="Last 24 hours"
        icon={<AlertCircle className="h-6 w-6 text-red-500" />}
        trend={-50}
        trendDirection="down"
      />
      <StatCard
        title="Avg. Duration"
        value="2m 14s"
        description="Per scraper job"
        icon={<Clock className="h-6 w-6 text-purple-500" />}
        trend={-12}
        trendDirection="down"
        goodDirection="down"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: number;
  trendDirection?: "up" | "down";
  goodDirection?: "up" | "down";
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendDirection = "up", 
  goodDirection = "up" 
}: StatCardProps) => {
  const isPositiveTrend = 
    (goodDirection === "up" && trendDirection === "up") || 
    (goodDirection === "down" && trendDirection === "down");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className={`text-xs flex items-center ${
            isPositiveTrend ? "text-green-500" : "text-red-500"
          }`}>
            <span>{Math.abs(trend)}%</span>
            <svg
              className={`h-3 w-3 ml-1 ${trendDirection === "down" ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCards;
