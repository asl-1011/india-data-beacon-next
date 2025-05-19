
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Download, 
  ExternalLink, 
  MoreHorizontal, 
  PlayCircle, 
  StopCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockScrapers = [
  {
    id: 1,
    name: "Amazon Product Listings",
    url: "https://amazon.com/products",
    lastRun: "2023-05-18 14:30:22",
    status: "active",
    results: 1243
  },
  {
    id: 2,
    name: "Competitor Price Tracker",
    url: "https://competitor.com/pricing",
    lastRun: "2023-05-17 09:15:05",
    status: "completed",
    results: 568
  },
  {
    id: 3,
    name: "News Article Scraper",
    url: "https://news-site.com/technology",
    lastRun: "2023-05-16 23:42:17",
    status: "paused",
    results: 89
  }
];

const ScraperResults = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-scraper-50 flex flex-row items-center justify-between">
        <CardTitle>Recent Scrapers</CardTitle>
        <Button variant="outline" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Results</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockScrapers.map((scraper) => (
                <TableRow key={scraper.id}>
                  <TableCell className="font-medium">{scraper.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    <div className="flex items-center space-x-1">
                      <span className="truncate">{scraper.url}</span>
                      <ExternalLink size={14} className="text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell>{scraper.lastRun}</TableCell>
                  <TableCell>
                    <Badge variant={
                      scraper.status === "active" ? "default" :
                      scraper.status === "completed" ? "secondary" : "outline"
                    } className={
                      scraper.status === "active" ? "bg-green-500" :
                      scraper.status === "completed" ? "bg-blue-500" : ""
                    }>
                      {scraper.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{scraper.results.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {scraper.status === "active" ? 
                          <StopCircle size={16} className="text-red-500" /> : 
                          <PlayCircle size={16} className="text-green-500" />
                        }
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScraperResults;
