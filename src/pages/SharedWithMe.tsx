import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Search, User, BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon, Filter, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for shared users
const sharedUsers = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: null,
    sharedDate: "2025-04-10",
    datasets: [
      { id: 1, title: "Weekly Step Count", type: "Bar Chart" },
      { id: 2, title: "Sleep Patterns", type: "Line Chart" },
      { id: 3, title: "Mood Distribution", type: "Pie Chart" }
    ]
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    sharedDate: "2025-04-12",
    datasets: [
      { id: 4, title: "Sleep Patterns", type: "Line Chart" },
      { id: 5, title: "Sleep vs Mood", type: "Line Chart" }
    ]
  },
  {
    id: 3,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: null,
    sharedDate: "2025-04-15",
    datasets: [
      { id: 6, title: "Weekly Step Count", type: "Bar Chart" },
      { id: 7, title: "Mood Distribution", type: "Pie Chart" }
    ]
  }
];

// Mock visualization data
const mockStepData = [
  { day: "Mon", steps: 6200 },
  { day: "Tue", steps: 7800 },
  { day: "Wed", steps: 9300 },
  { day: "Thu", steps: 8100 },
  { day: "Fri", steps: 11500 },
  { day: "Sat", steps: 10200 },
  { day: "Sun", steps: 9100 },
];

const mockSleepData = [
  { day: "Mon", sleep: 6.5 },
  { day: "Tue", sleep: 7.2 },
  { day: "Wed", sleep: 8.0 },
  { day: "Thu", sleep: 7.5 },
  { day: "Fri", sleep: 6.8 },
  { day: "Sat", sleep: 8.5 },
  { day: "Sun", sleep: 9.0 },
];

const mockMoodData = [
  { name: "Happy", value: 55 },
  { name: "Neutral", value: 25 },
  { name: "Tired", value: 10 },
  { name: "Stressed", value: 10 },
];

const COLORS = ["#5D3FD3", "#20B2AA", "#FF7F50", "#FFBB28"];

const SharedWithMe = () => {
  const { toast } = useToast();
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const [activeDataset, setActiveDataset] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Filter users based on search term and filter
  const filteredUsers = sharedUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    
    return matchesSearch && user.datasets.some(dataset => {
      if (filterType === "steps") return dataset.title.toLowerCase().includes("step");
      if (filterType === "sleep") return dataset.title.toLowerCase().includes("sleep");
      if (filterType === "mood") return dataset.title.toLowerCase().includes("mood");
      return false;
    });
  });

  // Handle user card click
  const handleUserSelect = (userId: number) => {
    setActiveUser(userId);
    // Reset active dataset when changing users
    setActiveDataset(null);
  };

  // Get active user data
  const activeUserData = activeUser ? sharedUsers.find(user => user.id === activeUser) : null;

  // Handle dataset selection
  const handleDatasetSelect = (datasetId: number) => {
    setActiveDataset(datasetId);

    toast({
      title: "Dataset loaded",
      description: `Viewing shared dataset from ${activeUserData?.name}`,
    });
  };

  // Render visualization based on dataset type
  const renderVisualization = () => {
    if (!activeUser || !activeDataset) return null;
    
    const user = sharedUsers.find(u => u.id === activeUser);
    if (!user) return null;
    
    const dataset = user.datasets.find(d => d.id === activeDataset);
    if (!dataset) return null;

    switch (dataset.type) {
      case "Bar Chart":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{dataset.title}</CardTitle>
              <CardDescription>Shared by {user.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockStepData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="steps" fill="#5D3FD3" name="Steps" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      
      case "Line Chart":
        if (dataset.title.includes("Sleep vs Mood")) {
          return (
            <Card>
              <CardHeader>
                <CardTitle>{dataset.title}</CardTitle>
                <CardDescription>Shared by {user.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { day: "Mon", sleep: 6.5, mood: 6 },
                        { day: "Tue", sleep: 7.2, mood: 7 },
                        { day: "Wed", sleep: 8.0, mood: 8 },
                        { day: "Thu", sleep: 7.5, mood: 8 },
                        { day: "Fri", sleep: 6.8, mood: 7 },
                        { day: "Sat", sleep: 8.5, mood: 9 },
                        { day: "Sun", sleep: 9.0, mood: 9 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="sleep" stroke="#20B2AA" name="Sleep (hours)" />
                      <Line yAxisId="right" type="monotone" dataKey="mood" stroke="#FF7F50" name="Mood (score)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          );
        } else {
          return (
            <Card>
              <CardHeader>
                <CardTitle>{dataset.title}</CardTitle>
                <CardDescription>Shared by {user.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockSleepData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sleep" stroke="#20B2AA" activeDot={{ r: 8 }} name="Sleep (hours)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          );
        }
      
      case "Pie Chart":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{dataset.title}</CardTitle>
              <CardDescription>Shared by {user.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockMoodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockMoodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shared With Me</h1>
        <p className="text-muted-foreground">
          View and analyze data that others have shared with you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Users who shared data */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>People Sharing With You</CardTitle>
              <CardDescription>
                Select a user to view their shared data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search people..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Data</SelectItem>
                    <SelectItem value="steps">Steps</SelectItem>
                    <SelectItem value="sleep">Sleep</SelectItem>
                    <SelectItem value="mood">Mood</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground/60" />
                  <p>No users match your search</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {filteredUsers.map(user => (
                    <div 
                      key={user.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        activeUser === user.id ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleUserSelect(user.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar || undefined} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{user.name}</h4>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Shared since {user.sharedDate}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {user.datasets.map(dataset => {
                          const TypeIcon = dataset.type.includes("Bar") ? BarChart2 :
                                          dataset.type.includes("Line") ? LineChartIcon : 
                                          PieChartIcon;
                          
                          return (
                            <div key={dataset.id} className="text-xs bg-muted/50 px-2 py-1 rounded-full flex items-center gap-1">
                              <TypeIcon className="h-3 w-3" />
                              <span>{dataset.title.split(' ')[0]}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {!activeUser ? (
            <Card>
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <User className="h-16 w-16 mb-4 text-muted-foreground/30" />
                <h3 className="text-xl font-medium mb-2">Select a user to view shared data</h3>
                <p className="text-muted-foreground max-w-md">
                  Click on a user from the list on the left to view their shared datasets and visualizations
                </p>
              </div>
            </Card>
          ) : (
            <>
              {/* Available datasets */}
              {!activeDataset ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Shared Datasets from {activeUserData?.name}</CardTitle>
                    <CardDescription>
                      Select a dataset to view the visualization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeUserData?.datasets.map(dataset => {
                        let icon = <BarChart2 className="h-8 w-8" />;
                        let bgColor = "bg-brand-purple/10";
                        let textColor = "text-brand-purple";
                        
                        if (dataset.type.includes("Line")) {
                          icon = <LineChartIcon className="h-8 w-8" />;
                          bgColor = "bg-brand-teal/10";
                          textColor = "text-brand-teal";
                        } else if (dataset.type.includes("Pie")) {
                          icon = <PieChartIcon className="h-8 w-8" />;
                          bgColor = "bg-brand-orange/10";
                          textColor = "text-brand-orange";
                        }

                        return (
                          <Button
                            key={dataset.id}
                            variant="outline"
                            className="h-auto p-6 flex flex-col items-center text-center gap-3 hover:bg-background"
                            onClick={() => handleDatasetSelect(dataset.id)}
                          >
                            <div className={`${bgColor} ${textColor} p-4 rounded-full`}>
                              {icon}
                            </div>
                            <div>
                              <h4 className="font-medium">{dataset.title}</h4>
                              <p className="text-xs text-muted-foreground">{dataset.type}</p>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Visualization */}
                  <div className="flex justify-between items-center mb-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveDataset(null)}
                    >
                      Back to Datasets
                    </Button>
                  </div>
                  
                  {renderVisualization()}
                  
                  {/* Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis</CardTitle>
                      <CardDescription>
                        Insights from {activeUserData?.name}'s shared data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Highlights</h4>
                        <p className="text-sm text-muted-foreground">
                          This dataset shows interesting patterns that could provide valuable insights
                          when compared with your own data. Notable trends include higher activity on weekends
                          and a strong correlation between sleep duration and mood scores.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Comparison with Your Data</h4>
                        <p className="text-sm text-muted-foreground">
                          Compared to your patterns, this data shows a 15% higher average step count
                          and slightly better sleep consistency throughout the week.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Actionable Insights</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider adopting similar patterns of activity distribution throughout the week
                          to achieve more balanced wellbeing metrics. The correlation between consistent sleep
                          and improved mood scores is particularly notable.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SharedWithMe;
