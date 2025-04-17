
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload as UploadIcon, FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DashboardLayout from "@/components/layout/DashboardLayout";

const manualFormSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  steps: z.coerce.number().min(0, { message: "Steps must be a positive number" }),
  sleep: z.coerce.number().min(0, { message: "Sleep hours must be a positive number" }).max(24, { message: "Sleep hours cannot exceed 24" }),
  mood: z.string().min(1, { message: "Mood is required" }),
});

const Upload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof manualFormSchema>>({
    resolver: zodResolver(manualFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      steps: 0,
      sleep: 0,
      mood: "",
    },
  });

  const onSubmitManual = (values: z.infer<typeof manualFormSchema>) => {
    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Data submitted",
        description: "Your manual entry has been recorded successfully.",
      });
      navigate("/visualize");
      setIsUploading(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      toast({
        title: "File uploaded",
        description: `Successfully uploaded ${selectedFile.name}`,
      });
      navigate("/visualize");
      setIsUploading(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Your Data</h1>
          <p className="text-muted-foreground">
            Add your personal data to visualize trends and patterns.
          </p>
        </div>

        <Tabs defaultValue="file" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>
                  Upload your data in CSV format for analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Import Format</AlertTitle>
                  <AlertDescription>
                    Your CSV should include: date, steps, sleep_hours, and mood columns.
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleFileSubmit} className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:bg-muted/10 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      disabled={isUploading}
                    />
                    <label 
                      htmlFor="file-upload" 
                      className="w-full h-full cursor-pointer flex flex-col items-center justify-center"
                    >
                      <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                      {selectedFile ? (
                        <>
                          <p className="text-sm font-medium">Selected file: {selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium">Click to select a CSV file</p>
                          <p className="text-xs text-muted-foreground">or drag and drop</p>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={!selectedFile || isUploading}>
                      {isUploading ? (
                        <>Uploading...</>
                      ) : (
                        <>
                          <UploadIcon className="mr-2 h-4 w-4" />
                          Upload Data
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="text-center text-xs text-muted-foreground">
              <p>
                Prefer to use a template? <span className="text-brand-purple cursor-pointer">Download template CSV</span>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Manual Data Entry</CardTitle>
                <CardDescription>
                  Enter your personal data for a specific day manually.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form 
                    onSubmit={form.handleSubmit(onSubmitManual)} 
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} disabled={isUploading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="steps"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Steps</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="8000" 
                                {...field} 
                                disabled={isUploading} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sleep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sleep (hours)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.5" 
                                placeholder="7.5" 
                                {...field} 
                                disabled={isUploading} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="mood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mood</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Happy" 
                              {...field} 
                              disabled={isUploading} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isUploading}>
                        {isUploading ? "Saving..." : "Save Data"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
