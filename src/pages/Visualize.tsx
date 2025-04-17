
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data
const weeklyData = [
  { day: "Mon", steps: 7500, sleep: 7.5, mood: 8 },
  { day: "Tue", steps: 8200, sleep: 6.5, mood: 7 },
  { day: "Wed", steps: 9100, sleep: 8, mood: 9 },
  { day: "Thu", steps: 6800, sleep: 7, mood: 6 },
  { day: "Fri", steps: 10200, sleep: 6, mood: 8 },
  { day: "Sat", steps: 11500, sleep: 8.5, mood: 9 },
  { day: "Sun", steps: 9800, sleep: 9, mood: 10 },
];

const monthlyData = [
  { name: "Week 1", steps: 52000, sleep: 49, mood: 7.5 },
  { name: "Week 2", steps: 58000, sleep: 52, mood: 8 },
  { name: "Week 3", steps: 49000, sleep: 47, mood: 6.5 },
  { name: "Week 4", steps: 61000, sleep: 51, mood: 8.5 },
];

const moodData = [
  { name: "Happy", value: 45 },
  { name: "Neutral", value: 30 },
  { name: "Tired", value: 15 },
  { name: "Stressed", value: 10 },
];

const COLORS = ["#5D3FD3", "#20B2AA", "#FF7F50", "#FFBB28"];

const Visualize = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("week");

  const handleShare = (chartName: string) => {
    toast({
      title: "Chart shared",
      description: `${chartName} has been added to your share list.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Visualizations & Analysis</h1>
        <p className="text-muted-foreground">Explore detailed insights from your personal data.</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All Data</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select 
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Daily</SelectItem>
            <SelectItem value="week">Weekly</SelectItem>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="year">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Daily Step Count</CardTitle>
              <CardDescription>Your steps over the last week</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleShare("Daily Step Count Chart")}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
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

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Sleep Patterns</CardTitle>
              <CardDescription>Hours of sleep per day</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleShare("Sleep Patterns Chart")}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
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

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Mood Distribution</CardTitle>
              <CardDescription>Breakdown of your recorded moods</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleShare("Mood Distribution Chart")}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {moodData.map((entry, index) => (
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

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Sleep vs Mood Correlation</CardTitle>
              <CardDescription>How sleep affects your mood</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleShare("Sleep-Mood Correlation Chart")}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sleep"
                    stroke="#20B2AA"
                    name="Sleep (hours)"
                  />
                  <Line yAxisId="right" type="monotone" dataKey="mood" stroke="#FF7F50" name="Mood (score)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
          <CardDescription>Key insights from your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Steps Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Your average daily step count is <span className="font-medium">9,014 steps</span>, 
              which is <span className="text-green-600">12% higher</span> than last week. 
              You're most active on Saturdays, and least active on Thursdays.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Sleep Patterns</h4>
            <p className="text-sm text-muted-foreground">
              You're averaging <span className="font-medium">7.5 hours</span> of sleep per night, 
              which is within the recommended range. Your sleep quality appears to drop 
              midweek, with improvements on weekends.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Mood Correlations</h4>
            <p className="text-sm text-muted-foreground">
              There's a strong positive correlation between your sleep duration and mood. 
              Days with 8+ hours of sleep consistently show higher mood scores. 
              Physical activity also appears to have a positive impact on your mood.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Recommendations</h4>
            <p className="text-sm text-muted-foreground">
              Based on your data, maintaining consistent sleep patterns and a minimum of 
              8,000 steps daily could help optimize your overall wellbeing. Consider 
              increasing activity on Thursdays to balance your weekly activity levels.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Visualize;
