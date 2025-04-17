
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Upload, Share2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data for charts
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

const statsCards = [
  { title: "Average Steps", value: "9,014", change: "+12%", positive: true },
  { title: "Sleep Quality", value: "7.6/10", change: "+4%", positive: true },
  { title: "Average Mood", value: "8.1/10", change: "-2%", positive: false },
  { title: "Trend Score", value: "87/100", change: "+5%", positive: true },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's your data overview.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-xs flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-1">{stat.change}</span>
                  <span>{stat.positive ? '↑' : '↓'}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Weekly Steps</CardTitle>
            <CardDescription>Your daily step count for the past week</CardDescription>
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
          <CardHeader>
            <CardTitle>Sleep & Mood Correlation</CardTitle>
            <CardDescription>Relationship between your sleep hours and mood</CardDescription>
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
                    activeDot={{ r: 8 }}
                    name="Sleep (hours)"
                  />
                  <Line yAxisId="right" type="monotone" dataKey="mood" stroke="#FF7F50" name="Mood (score)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-brand-purple" />
            </div>
            <h3 className="font-medium mb-2">Upload New Data</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add your latest activity data for updated insights.
            </p>
            <Button asChild className="w-full">
              <Link to="/upload">Upload Data</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-brand-teal/10 flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-brand-teal" />
            </div>
            <h3 className="font-medium mb-2">Share Insights</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your progress with friends or health professionals.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/share">Share Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
              <UserPlus className="h-6 w-6 text-brand-orange" />
            </div>
            <h3 className="font-medium mb-2">Invite Friends</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Invite friends to compare and motivate each other.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/share">Send Invites</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
