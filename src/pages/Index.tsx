import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, PackageIcon, TruckIcon, UserIcon, CalendarIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">ScrapCycle</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Schedule pickup for your recyclable materials and we'll come to your doorstep.
              Turn your waste into wealth while helping the environment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="px-6">Get Started</Button>
              <Button size="lg" variant="outline" className="px-6">Learn More</Button>
            </div>
          </section>
          
          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PackageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>1. Gather Your Scrap</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Collect your paper, metal, plastic, and other recyclable materials.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>2. Schedule a Pickup</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Book a convenient time for our team to visit your location.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TruckIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>3. We Collect & You Earn</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our staff will pick up your materials and you'll receive payment based on the type and quantity.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Materials We Accept */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Materials We Accept</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Paper', items: ['Newspaper', 'Cardboard'] },
                { name: 'Metal', items: ['Iron', 'Copper'] },
                { name: 'Plastic', items: ['Bottles', 'Containers'] },
                { name: 'Books', items: ['Textbooks', 'Notebooks'] },
                { name: 'Electronics', items: ['Phones', 'Laptops'] },
                { name: 'Others', items: ['Rubber', 'Batteries'] }
              ].map((category) => (
                <Card key={category.name} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="text-sm space-y-1">
                      {category.items.map(item => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* CTA */}
          <section className="bg-primary text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">Join thousands of eco-conscious people who are making a difference.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="px-6">Sign Up</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-6">
                Learn More
              </Button>
            </div>
          </section>
        </main>
      </div>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ScrapCycle</h3>
              <p className="text-gray-300">
                We're committed to making recycling easy and rewarding.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-300">
                <p className="flex items-center gap-2 mb-2">
                  <MapPinIcon className="h-4 w-4" /> 123 Recycle St, Green City
                </p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@scrapcycle.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} ScrapCycle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
