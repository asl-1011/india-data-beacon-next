
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Sliders } from "lucide-react";

const ScraperForm = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-scraper-50">
        <div className="flex items-center space-x-2">
          <Globe size={20} className="text-scraper-500" />
          <CardTitle>Create New Scraper</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Scraper Name</label>
              <Input id="name" placeholder="E-commerce Product Scraper" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium">Target URL</label>
              <Input id="url" placeholder="https://example.com/products" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="selector" className="text-sm font-medium">CSS Selector</label>
                <Input id="selector" placeholder=".product-item" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="frequency" className="text-sm font-medium">Frequency</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Advanced Options</label>
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sliders size={16} className="text-scraper-500" />
                    <span className="text-sm">Configure advanced settings</span>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">Notes</label>
              <Textarea id="notes" placeholder="Add any notes or descriptions about this scraper" rows={3} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-3 bg-gray-50">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-scraper-600 hover:bg-scraper-700">Create Scraper</Button>
      </CardFooter>
    </Card>
  );
};

export default ScraperForm;
