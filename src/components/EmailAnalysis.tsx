
"use client";

import { analyzeEmailContent } from "@/ai/flows/analyze-email-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const EmailAnalysis = () => {
  const [emailContent, setEmailContent] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyzeEmail = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeEmailContent({ emailContent });
      setAnalysisResult(result);
      toast({
        title: result.isPhishing ? "Phishing Detected" : "No Phishing Detected",
        description: result.explanation,
      });
    } catch (error: any) {
      console.error("Error analyzing email:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to analyze email.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-4 rounded-lg shadow-md bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Email Analysis</CardTitle>
        <CardDescription className="text-gray-700">Analyze email content for phishing indicators.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Textarea
          placeholder="Paste email content here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          className="border rounded-md p-2 text-gray-700 focus:ring-phishguard-accent"
        />
        <Button onClick={handleAnalyzeEmail} disabled={isLoading} className="bg-phishguard-accent text-phishguard-primary hover:bg-red-600">
          {isLoading ? "Analyzing..." : "Analyze Email"}
        </Button>

        {analysisResult && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Analysis Result:</h3>
            <p className="text-gray-700">
              Is Phishing: {analysisResult.isPhishing ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">Risk Level: {analysisResult.riskLevel}</p>
            <p className="text-gray-700">Explanation: {analysisResult.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailAnalysis;
