
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User, Lock, Bell, Shield, Download, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Profile = () => {
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data export initiated",
      description: "Your data export is being prepared. You'll receive an email when it's ready.",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-sm text-muted-foreground">Member since April 2025</p>
                </div>
                <Button variant="outline" className="w-full">Change Photo</Button>
              </div>

              <div className="mt-8 space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Stats</h3>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm">Data Points</span>
                  <span className="text-sm font-medium">1,245</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm">Visualizations</span>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm">Shared With</span>
                  <span className="text-sm font-medium">3 people</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm">Last Upload</span>
                  <span className="text-sm font-medium">April 15, 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-2/3">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>Update your basic profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" defaultValue="Fitness enthusiast tracking my health journey." />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleChangePassword}>Update Password</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label>Two-Factor Authentication</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Secure your account with two-factor authentication.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label>Email Notifications</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Summary</Label>
                      <p className="text-sm text-muted-foreground">
                        Get a weekly summary of your data and insights.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Shared Data Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications when someone views your shared data.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Data</CardTitle>
                  <CardDescription>Manage your personal data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">Export Your Data</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Download a complete copy of your personal data.
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleExportData}>Export</Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                        <span className="font-medium">Delete Account</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data.
                      </p>
                    </div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
