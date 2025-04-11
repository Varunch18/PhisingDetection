
"use client";

import { analyzeURL } from "@/ai/flows/analyze-url";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const URLAnalysis = () => {
  const [url, setUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyzeURL = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeURL({ url });
      setAnalysisResult(result);
      toast({
        title: result.isSafe ? "URL is Safe" : "URL is Potentially Unsafe",
        description: result.explanation,
      });
    } catch (error: any) {
      console.error("Error analyzing URL:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to analyze URL.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-4 rounded-lg shadow-md bg-white mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">URL Analysis</CardTitle>
        <CardDescription className="text-gray-700">Analyze URLs for suspicious patterns and reputation.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input
          type="url"
          placeholder="Enter URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded-md p-2 text-gray-700 focus:ring-phishguard-accent"
        />
        <Button onClick={handleAnalyzeURL} disabled={isLoading} className="bg-phishguard-accent text-phishguard-primary hover:bg-red-600">
           {isLoading ? "Analyzing..." : "Analyze URL"}
        </Button>

        {analysisResult && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Analysis Result:</h3>
            <p className="text-gray-700">Is Safe: {analysisResult.isSafe ? "Yes" : "No"}</p>
            <p className="text-gray-700">Risk Level: {analysisResult.riskLevel}</p>
            <p className="text-gray-700">Explanation: {analysisResult.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default URLAnalysis;
