'use server';
/**
 * @fileOverview Analyzes email content for phishing indicators.
 *
 * - analyzeEmailContent - Analyzes email content for phishing indicators.
 * - AnalyzeEmailInput - The input type for the analyzeEmailContent function.
 * - AnalyzeEmailOutput - The return type for the analyzeEmailContent function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeEmailInputSchema = z.object({
  emailContent: z.string().describe('The content of the email to analyze.'),
});
export type AnalyzeEmailInput = z.infer<typeof AnalyzeEmailInputSchema>;

const AnalyzeEmailOutputSchema = z.object({
  isPhishing: z.boolean().describe('Whether the email is classified as phishing or not.'),
  riskLevel: z.enum(['low', 'medium', 'high']).describe('The risk level associated with the email.'),
  explanation: z.string().describe('An explanation of why the email was classified as phishing or not.'),
});
export type AnalyzeEmailOutput = z.infer<typeof AnalyzeEmailOutputSchema>;

export async function analyzeEmailContent(input: AnalyzeEmailInput): Promise<AnalyzeEmailOutput> {
  return analyzeEmailContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeEmailContentPrompt',
  input: {
    schema: z.object({
      emailContent: z.string().describe('The content of the email to analyze.'),
    }),
  },
  output: {
    schema: z.object({
      isPhishing: z.boolean().describe('Whether the email is classified as phishing or not.'),
      riskLevel: z.enum(['low', 'medium', 'high']).describe('The risk level associated with the email.'),
      explanation: z.string().describe('An explanation of why the email was classified as phishing or not.'),
    }),
  },
  prompt: `You are an AI expert in detecting phishing emails.

  Analyze the email content provided and determine if it is a phishing attempt.
  Consider factors such as suspicious links, unusual sender addresses, urgent requests,
  and grammatical errors.

  Email Content: {{{emailContent}}}
  \n
  Based on your analysis, classify the email as phishing or not, and provide a risk level (low, medium, high)
  along with an explanation for your classification.
  `,
});

const analyzeEmailContentFlow = ai.defineFlow<
  typeof AnalyzeEmailInputSchema,
  typeof AnalyzeEmailOutputSchema
>(
  {
    name: 'analyzeEmailContentFlow',
    inputSchema: AnalyzeEmailInputSchema,
    outputSchema: AnalyzeEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
