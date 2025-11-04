'use server';

/**
 * @fileOverview Implements AI-driven search suggestions for agricultural information and localized weather updates.
 *
 * - aiEnhancedSearch - A function that handles the AI-enhanced search process.
 * - AiEnhancedSearchInput - The input type for the aiEnhancedSearch function.
 * - AiEnhancedSearchOutput - The return type for the aiEnhancedSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiEnhancedSearchInputSchema = z.object({
  query: z.string().describe('The search query entered by the user.'),
  location: z.string().optional().describe('The user\u2019s location, if available.'),
});
export type AiEnhancedSearchInput = z.infer<typeof AiEnhancedSearchInputSchema>;

const AiEnhancedSearchOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A list of AI-driven search suggestions.')
  ).describe('AI-driven search suggestions based on the query.'),
  weatherUpdate: z.string().optional().describe('Localized weather update based on the query and location.'),
});
export type AiEnhancedSearchOutput = z.infer<typeof AiEnhancedSearchOutputSchema>;

export async function aiEnhancedSearch(input: AiEnhancedSearchInput): Promise<AiEnhancedSearchOutput> {
  return aiEnhancedSearchFlow(input);
}

const aiEnhancedSearchPrompt = ai.definePrompt({
  name: 'aiEnhancedSearchPrompt',
  input: {schema: AiEnhancedSearchInputSchema},
  output: {schema: AiEnhancedSearchOutputSchema},
  prompt: `You are an AI assistant designed to provide helpful search suggestions for an agricultural platform called FarMart.

  The user has entered the following query: {{{query}}}
  {{#if location}}
  The user's location is: {{{location}}}
  {{/if}}

  Generate a list of relevant search suggestions that would help the user find the information they are looking for.
  {{#if location}}
  Also, provide a brief, localized weather update based on the query and the user's location.
  {{/if}}

  Format your response as a JSON object with "suggestions" (an array of strings) and "weatherUpdate" (a string, optional) fields.
`,
});

const aiEnhancedSearchFlow = ai.defineFlow(
  {
    name: 'aiEnhancedSearchFlow',
    inputSchema: AiEnhancedSearchInputSchema,
    outputSchema: AiEnhancedSearchOutputSchema,
  },
  async input => {
    const {output} = await aiEnhancedSearchPrompt(input);
    return output!;
  }
);
