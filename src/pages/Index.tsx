
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Upload, Share2, LineChart, PieChart, Lock, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white">
      {/* Header/Navigation */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-brand-purple p-1.5 rounded text-white">
              <BarChart2 className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl text-brand-purple">DataWhisper</span>
          </div>
          <div className="space-x-4">
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
                Understand your personal data with powerful visualizations
              </h1>
              <p className="text-xl text-muted-foreground">
                Upload, analyze, and selectively share your personal data with DataWhisper's intuitive analytics platform.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-medium">
                  <Link to="/register">
                    Start for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Sign in</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="bg-white rounded-xl shadow-xl p-6 border relative overflow-hidden">
                <div className="animate-pulse-light absolute -top-16 -right-16 w-32 h-32 bg-brand-purple/10 rounded-full"></div>
                <div className="animate-pulse-light absolute -bottom-8 -left-8 w-24 h-24 bg-brand-teal/10 rounded-full"></div>
                <img 
                  src="https://source.unsplash.com/random/800x600/?dashboard" 
                  alt="Dashboard Preview" 
                  className="rounded-lg border shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              DataWhisper makes it easy to gain insights from your personal data in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md card-hover">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Upload Your Data</h3>
                <p className="text-muted-foreground">
                  Easily upload CSV files or manually enter your personal data through our intuitive interface.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md card-hover">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-brand-teal/10 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-brand-teal" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Visualize Patterns</h3>
                <p className="text-muted-foreground">
                  Our analytics engine automatically generates insightful charts and trends from your data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md card-hover">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Selectively Share</h3>
                <p className="text-muted-foreground">
                  Choose specific visualizations to share with trusted friends or healthcare providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visualization Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Visualization Tools</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your raw data into meaningful insights with our advanced visualization tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md mb-4 flex items-center justify-center h-48">
                <BarChart2 className="h-24 w-24 text-brand-purple/70" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bar & Column Charts</h3>
              <p className="text-muted-foreground">
                Perfect for comparing values across categories and time periods.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md mb-4 flex items-center justify-center h-48">
                <LineChart className="h-24 w-24 text-brand-teal/70" />
              </div>
              <h3 className="text-xl font-bold mb-2">Line & Area Charts</h3>
              <p className="text-muted-foreground">
                Visualize trends and changes in your data over time with smooth curves.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md mb-4 flex items-center justify-center h-48">
                <PieChart className="h-24 w-24 text-brand-orange/70" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pie & Donut Charts</h3>
              <p className="text-muted-foreground">
                Show proportions and percentages for better understanding of distributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-xl shadow-md border relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand-purple/5 rounded-full"></div>
                <Lock className="h-16 w-16 text-brand-purple mb-6" />
                <h3 className="text-2xl font-bold mb-4">Your Data, Your Control</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <p>End-to-end encryption protects your sensitive information</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <p>Granular sharing controls let you decide exactly who sees what</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <p>Export or delete your data anytime with just a few clicks</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold">Security & Privacy by Design</h2>
              <p className="text-xl text-muted-foreground">
                We built DataWhisper with your privacy as our top priority. Your personal data remains under your control at all times.
              </p>
              <p className="text-muted-foreground">
                Advanced security measures protect your information, while our intuitive sharing tools give you the power to share only what you want, with exactly who you choose.
              </p>
              <Button asChild className="mt-4">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-brand-purple text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to unlock insights from your data?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are visualizing and understanding their personal data with DataWhisper.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-medium">
            <Link to="/register">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-brand-purple p-1 rounded text-white">
                <BarChart2 className="h-4 w-4" />
              </div>
              <span className="font-bold">DataWhisper</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 DataWhisper. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Simple check icon component
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default Index;
