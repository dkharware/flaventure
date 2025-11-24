
'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Bot } from "lucide-react"
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type ResumeAnalysisOutput } from "@/lib/ai-schemas";

interface ResumeAnalysisSheetProps {
  analysis: ResumeAnalysisOutput | null;
  isOpen: boolean;
  onClose: () => void;
}

const ScoreChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={200}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
    </RadarChart>
  </ResponsiveContainer>
);

export function ResumeAnalysisSheet({ analysis, isOpen, onClose }: ResumeAnalysisSheetProps) {

  const chartData = analysis ? [
    { subject: "ATS Score", score: analysis.atsScore, fullMark: 100 },
    { subject: "Keyword Match", score: analysis.keywordMatchScore, fullMark: 100 },
  ] : [];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl font-headline">
            <Bot /> Resume Analysis
          </SheetTitle>
          <SheetDescription>
            Here's an AI-powered breakdown of your resume's effectiveness.
          </SheetDescription>
        </SheetHeader>
        {analysis ? (
          <div className="mt-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Overall Scores</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScoreChart data={chartData} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Checks & Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                        {analysis.grammarCheck.passed ? <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" /> : <AlertCircle className="h-5 w-5 text-orange-500 mt-1" />}
                        <div>
                            <h4 className="font-semibold">Grammar Check</h4>
                            <p className="text-sm text-muted-foreground">{analysis.grammarCheck.feedback}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        {analysis.formattingCheck.passed ? <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" /> : <AlertCircle className="h-5 w-5 text-orange-500 mt-1" />}
                        <div>
                            <h4 className="font-semibold">Formatting Check</h4>
                            <p className="text-sm text-muted-foreground">{analysis.formattingCheck.feedback}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle className="text-lg">Suggestions for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                        {analysis.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
        ) : (
          <div className="mt-6 text-center text-muted-foreground">
            <p>No analysis data available. Please try generating the analysis again.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
