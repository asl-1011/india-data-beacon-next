
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CalendarIcon, MapPinIcon } from "lucide-react";

// Material categories and their subtypes
const materialCategories = [
  { 
    name: "Paper", 
    subtypes: ["Newspaper", "Cardboard", "Magazines", "Office Paper", "Other Paper"] 
  },
  { 
    name: "Metal", 
    subtypes: ["Iron", "Copper", "Aluminum", "Steel", "Other Metal"] 
  },
  { 
    name: "Plastic", 
    subtypes: ["Bottles", "Containers", "Packaging", "Bags", "Other Plastic"] 
  },
  { 
    name: "Books", 
    subtypes: ["Textbooks", "Notebooks", "Fiction", "Non-fiction", "Other Books"] 
  },
  { 
    name: "Electronics", 
    subtypes: ["Phones", "Laptops", "Tablets", "Appliances", "Other Electronics"] 
  },
  { 
    name: "Others", 
    subtypes: ["Rubber", "Batteries", "Glass", "Cloth", "Miscellaneous"] 
  }
];

interface FormValues {
  materialCategory: string;
  materialSubtype: string;
  quantity: string;
  quantityUnit: "kg" | "pieces";
  pickupDate: string;
  pickupTimeSlot: string;
  address: string;
  city: string;
  postalCode: string;
  instructions: string;
}

const SellerNewPickup = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableSubtypes, setAvailableSubtypes] = useState<string[]>([]);

  const form = useForm<FormValues>({
    defaultValues: {
      materialCategory: "",
      materialSubtype: "",
      quantity: "",
      quantityUnit: "kg",
      pickupDate: "",
      pickupTimeSlot: "",
      address: "",
      city: "",
      postalCode: "",
      instructions: ""
    }
  });

  // When category changes, update available subtypes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const foundCategory = materialCategories.find(c => c.name === category);
    setAvailableSubtypes(foundCategory ? foundCategory.subtypes : []);
    form.setValue("materialSubtype", ""); // Reset subtype when category changes
  };

  const onSubmit = (data: FormValues) => {
    // This would normally send a request to your API
    console.log("Form data:", data);
    toast({
      title: "Pickup Scheduled",
      description: "Your pickup request has been submitted successfully.",
    });
    // Reset form
    form.reset();
    setSelectedCategory("");
    setAvailableSubtypes([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole="seller" userName="John Smith" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Schedule a New Pickup</h1>
          <p className="text-gray-600">Fill out the form below to schedule a pickup for your scrap materials.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Details</CardTitle>
                <CardDescription>
                  Provide information about the materials you want to recycle.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Material Category */}
                      <FormField
                        control={form.control}
                        name="materialCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Material Category</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleCategoryChange(e.target.value);
                                }}
                              >
                                <option value="">Select category</option>
                                {materialCategories.map((category) => (
                                  <option key={category.name} value={category.name}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Material Subtype */}
                      <FormField
                        control={form.control}
                        name="materialSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Material Subtype</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={!selectedCategory}
                                {...field}
                              >
                                <option value="">Select subtype</option>
                                {availableSubtypes.map((subtype) => (
                                  <option key={subtype} value={subtype}>
                                    {subtype}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Quantity */}
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Approximate Quantity</FormLabel>
                            <FormControl>
                              <div className="flex space-x-2">
                                <Input
                                  type="number"
                                  placeholder="Quantity"
                                  className="flex-1"
                                  {...field}
                                />
                                <select
                                  className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                  {...form.register("quantityUnit")}
                                >
                                  <option value="kg">kg</option>
                                  <option value="pieces">pieces</option>
                                </select>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Upload Image - Would be implemented with proper upload functionality */}
                      <FormItem>
                        <FormLabel>Upload Image (Optional)</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" />
                        </FormControl>
                        <FormDescription>
                          Upload an image of your scrap materials.
                        </FormDescription>
                      </FormItem>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pickup Date */}
                      <FormField
                        control={form.control}
                        name="pickupDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pickup Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <Input 
                                  type="date" 
                                  className="pl-10"
                                  min={new Date().toISOString().split('T')[0]}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Pickup Time Slot */}
                      <FormField
                        control={form.control}
                        name="pickupTimeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time Slot</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                {...field}
                              >
                                <option value="">Select time slot</option>
                                <option value="morning">Morning (8 AM - 12 PM)</option>
                                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                <option value="evening">Evening (4 PM - 8 PM)</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Address Section */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <MapPinIcon className="mr-2 h-5 w-5" />
                        Pickup Address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Street Address */}
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* City */}
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Anytown" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Postal Code */}
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <FormField
                      control={form.control}
                      name="instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Additional details about pickup location, access instructions, etc."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit">Schedule Pickup</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">✓</span>
                    <span>Sort materials by type for faster processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">✓</span>
                    <span>Ensure electronics are free from personal data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">✓</span>
                    <span>Clean containers to avoid contamination</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">✓</span>
                    <span>Be present at the scheduled pickup time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">✓</span>
                    <span>Place materials in an accessible location</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium">Paper</h4>
                    <p className="text-muted-foreground">$0.10 - $0.25 per kg</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Metal</h4>
                    <p className="text-muted-foreground">$0.50 - $5.00 per kg (varies by type)</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Plastic</h4>
                    <p className="text-muted-foreground">$0.15 - $0.30 per kg</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Electronics</h4>
                    <p className="text-muted-foreground">Pricing varies based on condition</p>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    *Final pricing determined at pickup based on material quality and market rates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact our support team for assistance with scheduling your pickup.
                </p>
                <Button variant="outline" className="w-full">Contact Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerNewPickup;
