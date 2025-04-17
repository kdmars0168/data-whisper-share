import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle2, XCircle, Share as ShareIcon, User, Mail, BarChart2, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Switch } from "@/components/ui/switch";

// Mock data
const sharedWith = [
  { id: 1, name: "Jane Smith", email: "jane@example.com", dateShared: "2025-04-10", status: "Viewed" },
  { id: 2, name: "John Doe", email: "john@example.com", dateShared: "2025-04-12", status: "Pending" },
  { id: 3, name: "Sarah Wilson", email: "sarah@example.com", dateShared: "2025-04-15", status: "Accepted" }
];

const sharedVisualizations = [
  { id: 1, title: "Weekly Step Count", type: "Bar Chart", dateCreated: "2025-04-05", shared: true },
  { id: 2, title: "Sleep Patterns", type: "Line Chart", dateCreated: "2025-04-08", shared: true },
  { id: 3, title: "Mood Distribution", type: "Pie Chart", dateCreated: "2025-04-12", shared: false },
  { id: 4, title: "Sleep vs Mood", type: "Line Chart", dateCreated: "2025-04-15", shared: true }
];

const contacts = [
  { id: 1, name: "Jane Smith", email: "jane@example.com" },
  { id: 2, name: "John Doe", email: "john@example.com" },
  { id: 3, name: "Sarah Wilson", email: "sarah@example.com" },
  { id: 4, name: "Michael Brown", email: "michael@example.com" },
  { id: 5, name: "Emily Jones", email: "emily@example.com" }
];

const SharePage = () => {
  const { toast } = useToast();
  const [selectedVisualizations, setSelectedVisualizations] = useState<number[]>([1, 2]); // Default selected
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [shareMessage, setShareMessage] = useState("I'd like to share my data insights with you. Check out these visualizations.");

  const handleVisualizationToggle = (id: number) => {
    setSelectedVisualizations(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleContactToggle = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddEmail = () => {
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if already in contacts
    const exists = contacts.some(contact => contact.email === emailInput);
    if (exists) {
      toast({
        title: "Contact exists",
        description: "This email is already in your contacts list.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would add to the database
    toast({
      title: "Contact added",
      description: `${emailInput} has been added to your contacts.`,
    });
    setEmailInput("");
  };

  const handleShare = () => {
    if (selectedVisualizations.length === 0) {
      toast({
        title: "No visualizations selected",
        description: "Please select at least one visualization to share.",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedContacts.length === 0) {
      toast({
        title: "No recipients selected",
        description: "Please select at least one recipient.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would create sharing permissions
    toast({
      title: "Data shared successfully",
      description: `Your visualizations have been shared with ${selectedContacts.length} recipient(s).`,
    });
    
    // Reset selections after sharing
    setSelectedContacts([]);
  };

  const handleRevokeAccess = (id: number) => {
    toast({
      title: "Access revoked",
      description: `You've revoked access for ${sharedWith.find(user => user.id === id)?.name}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Share Your Data</h1>
        <p className="text-muted-foreground">
          Securely share your visualizations with specific people.
        </p>
      </div>

      <Tabs defaultValue="share" className="space-y-8">
        <TabsList>
          <TabsTrigger value="share">Share Data</TabsTrigger>
          <TabsTrigger value="manage">Manage Shared Data</TabsTrigger>
        </TabsList>

        <TabsContent value="share" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Visualizations to Share</CardTitle>
              <CardDescription>
                Choose which charts and insights you want to share
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedVisualizations.map((viz) => (
                  <div key={viz.id} className="flex items-center space-x-4 py-2 border-b">
                    <Checkbox 
                      id={`viz-${viz.id}`} 
                      checked={selectedVisualizations.includes(viz.id)}
                      onCheckedChange={() => handleVisualizationToggle(viz.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        {viz.type.includes("Bar") && <BarChart2 className="h-4 w-4 mr-2 text-brand-purple" />}
                        {viz.type.includes("Line") && <Clock className="h-4 w-4 mr-2 text-brand-teal" />}
                        {viz.type.includes("Pie") && <Calendar className="h-4 w-4 mr-2 text-brand-orange" />}
                        <Label htmlFor={`viz-${viz.id}`} className="font-medium cursor-pointer">{viz.title}</Label>
                      </div>
                      <p className="text-xs text-muted-foreground">{viz.type} · Created {viz.dateCreated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Recipients</CardTitle>
              <CardDescription>
                Choose people to share your selected visualizations with
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="Add new recipient by email" 
                    type="email" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <Button onClick={handleAddEmail}>Add</Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="p-3 bg-muted/50 border-b">
                    <h3 className="text-sm font-medium">Your Contacts</h3>
                  </div>
                  <div className="divide-y">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="flex items-center space-x-4 p-3">
                        <Checkbox 
                          id={`contact-${contact.id}`} 
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={() => handleContactToggle(contact.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={`contact-${contact.id}`} className="font-medium cursor-pointer">{contact.name}</Label>
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="share-message">Personalized Message (Optional)</Label>
                <Input 
                  id="share-message" 
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Selected: {selectedVisualizations.length} visualizations, {selectedContacts.length} recipients
              </div>
              <Button onClick={handleShare} disabled={selectedVisualizations.length === 0 || selectedContacts.length === 0}>
                <ShareIcon className="mr-2 h-4 w-4" />
                Share Now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>People With Access</CardTitle>
              <CardDescription>
                Manage who can see your shared visualizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Shared Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sharedWith.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {person.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {person.email}
                        </div>
                      </TableCell>
                      <TableCell>{person.dateShared}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {person.status === "Viewed" && (
                            <><CheckCircle2 className="h-4 w-4 text-yellow-500" /> Viewed</>
                          )}
                          {person.status === "Accepted" && (
                            <><CheckCircle2 className="h-4 w-4 text-green-500" /> Accepted</>
                          )}
                          {person.status === "Pending" && (
                            <><AlertCircle className="h-4 w-4 text-muted-foreground" /> Pending</>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive/80"
                          onClick={() => handleRevokeAccess(person.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visualization Sharing Status</CardTitle>
              <CardDescription>
                Manage which visualizations are shared
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visualization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Shared</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sharedVisualizations.map((viz) => (
                    <TableRow key={viz.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {viz.type.includes("Bar") && <BarChart2 className="h-4 w-4 text-brand-purple" />}
                          {viz.type.includes("Line") && <Clock className="h-4 w-4 text-brand-teal" />}
                          {viz.type.includes("Pie") && <Calendar className="h-4 w-4 text-brand-orange" />}
                          {viz.title}
                        </div>
                      </TableCell>
                      <TableCell>{viz.type}</TableCell>
                      <TableCell>{viz.dateCreated}</TableCell>
                      <TableCell>
                        <Switch 
                          checked={viz.shared}
                          onCheckedChange={() => {
                            toast({
                              title: viz.shared ? "Sharing disabled" : "Sharing enabled",
                              description: `${viz.title} is now ${viz.shared ? "private" : "shared"}.`
                            });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SharePage;
