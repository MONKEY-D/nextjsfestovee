"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  FaStore,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaUpload,
} from "react-icons/fa";

export default function YourShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">Your Shop</h1>
        <p className="text-sm text-muted-foreground mt-1">
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Image & Status */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg">Shop Visual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-36 w-36">
                <AvatarImage
                  src="/images/shop-placeholder.png"
                  alt="Shop image"
                />
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>

              <div className="w-full text-center">
                <input
                  id="shop-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="shop-image"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-muted text-sm cursor-pointer"
                >
                  <FaUpload className="h-4 w-4" />
                  Upload shop image
                </label>
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended: 1200x800px, JPG/PNG. Max 5MB
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Visibility</h3>
                  <p className="text-xs text-muted-foreground">
                    Show your shop on public listings.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div>
                <h3 className="text-sm font-medium">Shop Badge</h3>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Badge>Verified</Badge>
                  <Badge>Express</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle column - Basic Info (wider) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shop-name">Shop name</Label>
                  <Input id="shop-name" placeholder="e.g. Acme Wholesale" />
                </div>

                <div>
                  <Label htmlFor="shop-phone">Phone</Label>
                  <Input id="shop-phone" placeholder="+1 (555) 123-4567" />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="shop-address">Address</Label>
                  <Input
                    id="shop-address"
                    placeholder="Street, City, State, ZIP"
                  />
                </div>

                <div>
                  <Label htmlFor="shop-email">Email</Label>
                  <Input id="shop-email" placeholder="contact@yourshop.com" />
                </div>

                <div>
                  <Label htmlFor="shop-website">Website</Label>
                  <Input
                    id="shop-website"
                    placeholder="https://yourshop.example"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost">Cancel</Button>
              <Button className="ml-3">Save basic info</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Business Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="shop-gstin">GST / VAT ID</Label>
                  <Input id="shop-gstin" placeholder="Optional" />
                </div>

                <div>
                  <Label htmlFor="shop-tin">Tax jurisdiction</Label>
                  <Input id="shop-tin" placeholder="State / Region" />
                </div>

                <div>
                  <Label htmlFor="shop-tz">Timezone</Label>
                  <Input id="shop-tz" placeholder="e.g. Asia/Kolkata" />
                </div>

                <div className="md:col-span-3">
                  <Label htmlFor="shop-description">Description</Label>
                  <Textarea
                    id="shop-description"
                    rows={4}
                    placeholder="Short description about your shop and offerings"
                  />
                </div>

                <div className="md:col-span-3">
                  <Label>Opening Hours</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {["Mon-Fri", "Sat", "Sun", "Holidays"].map((d) => (
                      <div key={d} className="p-3 border rounded">
                        <div className="text-sm font-medium">{d}</div>
                        <div className="text-xs text-muted-foreground">
                          09:00 — 18:00
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost">Cancel</Button>
              <Button className="ml-3">Save business details</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery & Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="delivery" className="w-full">
                <TabsList>
                  <TabsTrigger value="delivery">Delivery Zones</TabsTrigger>
                  <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                </TabsList>

                <TabsContent value="delivery" className="mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Local city</div>
                        <div className="text-xs text-muted-foreground">
                          Up to 50km
                        </div>
                      </div>
                      <div className="text-sm">₹50.00</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Statewide</div>
                        <div className="text-xs text-muted-foreground">
                          Larger deliveries
                        </div>
                      </div>
                      <div className="text-sm">₹150.00</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="payment" className="mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Bank Transfer</div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Net Terms</div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Card Payments</div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save delivery & payment</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Social & Contact Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="shop-facebook">Facebook</Label>
                <Input
                  id="shop-facebook"
                  placeholder="https://facebook.com/yourshop"
                />
              </div>
              <div>
                <Label htmlFor="shop-linkedin">LinkedIn</Label>
                <Input
                  id="shop-linkedin"
                  placeholder="https://linkedin.com/company/yourshop"
                />
              </div>
              <div>
                <Label htmlFor="shop-whatsapp">WhatsApp</Label>
                <Input id="shop-whatsapp" placeholder="+91 99999 99999" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Last updated: —</div>
            <div>
              <Button variant="ghost">Discard changes</Button>
              <Button className="ml-3">Save all</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
