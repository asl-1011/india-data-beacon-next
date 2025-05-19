
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, PackageIcon, TruckIcon, UserIcon, CalendarIcon, ArrowRightIcon } from "lucide-react";
import { RecyclingIcon } from "@/components/RecyclingIcon";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="flex-1">
        <main>
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-700 opacity-10"></div>
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent"></div>
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
            </div>
            
            <div className="container mx-auto px-4 py-16 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="mx-auto w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                  <RecyclingIcon className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Turn Waste Into Value With <span className="text-green-600">ScrapCycle</span></h1>
                <p className="text-lg md:text-xl mb-10 text-gray-700">
                  Schedule pickup for your recyclable materials and we'll come to your doorstep.
                  Earn money while helping create a cleaner, more sustainable environment.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="px-8 py-6 bg-green-600 hover:bg-green-700 text-lg"
                    onClick={() => navigate("/register")}
                  >
                    Get Started
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-8 py-6 text-lg"
                    onClick={() => navigate("#how-it-works")}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* How It Works */}
          <section id="how-it-works" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  ScrapCycle makes recycling simple and rewarding in just three easy steps.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PackageIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">1. Gather Your Scrap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600">
                      Collect your paper, metal, plastic, and other recyclable materials. 
                      No need to sort them - we'll handle that for you.
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">2. Schedule a Pickup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600">
                      Book a convenient time for our friendly team to visit your location.
                      Our digital platform makes scheduling easy and flexible.
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TruckIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">3. We Collect & You Earn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600">
                      Our staff will pick up your materials and you'll receive payment based on the type and quantity.
                      Track your environmental impact in real-time.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Materials We Accept */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Materials We Accept</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We accept a wide range of recyclable materials. Turn your waste into wealth while helping the environment.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                {[
                  { name: 'Paper', items: ['Newspaper', 'Cardboard'], image: 'https://images.unsplash.com/photo-1603187021615-f272ec31074e?q=80&w=2940&auto=format&fit=crop' },
                  { name: 'Metal', items: ['Iron', 'Copper'], image: 'https://images.unsplash.com/photo-1605600659453-128bffc9c020?q=80&w=2944&auto=format&fit=crop' },
                  { name: 'Plastic', items: ['Bottles', 'Containers'], image: 'https://images.unsplash.com/photo-1605600659602-870294cdc3a0?q=80&w=2944&auto=format&fit=crop' },
                  { name: 'Books', items: ['Textbooks', 'Notebooks'], image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2971&auto=format&fit=crop' },
                  { name: 'Electronics', items: ['Phones', 'Laptops'], image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2901&auto=format&fit=crop' },
                  { name: 'Others', items: ['Rubber', 'Batteries'], image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2970&auto=format&fit=crop' }
                ].map((category) => (
                  <Card key={category.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="text-sm space-y-1 text-gray-600">
                        {category.items.map(item => (
                          <li key={item}>• {item}</li>
                        ))}
                        <li>• And More...</li>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonials */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join thousands of eco-conscious people who are making a difference with ScrapCycle.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Homeowner",
                    comment: "ScrapCycle makes recycling so convenient. I've earned over $200 in the past 3 months just from my household waste!",
                    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2976&auto=format&fit=crop"
                  },
                  {
                    name: "Michael Chen",
                    role: "Small Business Owner",
                    comment: "As a café owner, we generate a lot of recyclables. ScrapCycle's regular pickup schedule has helped us become a zero-waste business.",
                    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop"
                  },
                  {
                    name: "Emily Rodriguez",
                    role: "Teacher",
                    comment: "I use ScrapCycle for my school's recycling program. The students love tracking our environmental impact through the app!",
                    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop"
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="pt-8 px-8">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">"{testimonial.comment}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* Impact Section */}
          <section className="py-20 bg-green-600 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Environmental Impact</h2>
                <p className="text-lg max-w-2xl mx-auto text-green-50">
                  Together with our users, we're making a real difference to our planet.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  { number: "12,450", label: "kg of Waste Recycled" },
                  { number: "1,890", label: "Trees Saved" },
                  { number: "3.2M", label: "Liters of Water Conserved" },
                  { number: "267", label: "Tons of CO₂ Avoided" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-green-50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-12 text-center text-white shadow-xl">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg mb-8">Join thousands of eco-conscious people who are making a difference while earning money.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="px-8"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-green-600 px-8"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <RecyclingIcon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xl font-bold">ScrapCycle</span>
              </div>
              <p className="text-gray-400 mb-4">
                We're committed to making recycling easy, rewarding, and accessible to everyone.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Materials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Data Processing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p className="flex items-center gap-2 mb-2">
                  <MapPinIcon className="h-4 w-4" /> 123 Recycle St, Green City
                </p>
                <p className="mb-2">Phone: (123) 456-7890</p>
                <p className="mb-4">Email: info@scrapcycle.com</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Contact Support
                </Button>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} ScrapCycle. All rights reserved.</p>
            <p className="mt-2 text-sm">Made with 💚 for a cleaner planet</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
