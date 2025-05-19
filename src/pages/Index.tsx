
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ScraperForm from "@/components/ScraperForm";
import ScraperResults from "@/components/ScraperResults";
import StatsCards from "@/components/StatsCards";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 flex-1">
        <Header />
        
        <main className="p-6">
          <StatsCards />
          
          <Tabs defaultValue="scrapers" className="mb-6">
            <TabsList>
              <TabsTrigger value="scrapers">Active Scrapers</TabsTrigger>
              <TabsTrigger value="create">Create New</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scrapers" className="mt-4">
              <ScraperResults />
            </TabsContent>
            
            <TabsContent value="create" className="mt-4">
              <ScraperForm />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-4">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-medium mb-4">Scraper Settings</h3>
                <p className="text-gray-500">Configure global settings for all scrapers here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
