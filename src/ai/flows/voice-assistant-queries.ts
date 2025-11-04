'use server';

/**
 * @fileOverview Voice assistant queries flow.
 *
 * - voiceAssistantQueries - A function that takes a user query and returns an answer.
 * - VoiceAssistantQueriesInput - The input type for the voiceAssistantQueries function.
 * - VoiceAssistantQueriesOutput - The return type for the voiceAssistantQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceAssistantQueriesInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type VoiceAssistantQueriesInput = z.infer<typeof VoiceAssistantQueriesInputSchema>;

const VoiceAssistantQueriesOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type VoiceAssistantQueriesOutput = z.infer<typeof VoiceAssistantQueriesOutputSchema>;

export async function voiceAssistantQueries(input: VoiceAssistantQueriesInput): Promise<VoiceAssistantQueriesOutput> {
  return voiceAssistantQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceAssistantQueriesPrompt',
  input: {schema: VoiceAssistantQueriesInputSchema},
  output: {schema: VoiceAssistantQueriesOutputSchema},
  prompt: `You are a helpful voice assistant that provides information about weather and agriculture.

  Answer the following question: {{{query}}}`,
});

const voiceAssistantQueriesFlow = ai.defineFlow(
  {
    name: 'voiceAssistantQueriesFlow',
    inputSchema: VoiceAssistantQueriesInputSchema,
    outputSchema: VoiceAssistantQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
