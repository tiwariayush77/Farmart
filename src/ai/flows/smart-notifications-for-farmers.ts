'use server';

/**
 * @fileOverview Implements the SmartNotificationsForFarmers flow, which provides users with relevant weather updates, market trends, and farming tips.
 *
 * - `getSmartNotifications` - A function that retrieves smart notifications for farmers.
 * - `SmartNotificationsInput` - The input type for the `getSmartNotifications` function, including location.
 * - `SmartNotificationsOutput` - The return type for the `getSmartNotifications` function, containing the notifications.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartNotificationsInputSchema = z.object({
  location: z
    .string()
    .describe('The location of the farmer to get localized notifications.'),
});
export type SmartNotificationsInput = z.infer<typeof SmartNotificationsInputSchema>;

const SmartNotificationsOutputSchema = z.object({
  weatherUpdate: z.string().describe('A summary of the current weather conditions and forecast.'),
  marketTrends: z.string().describe('A summary of relevant market trends for crops in the area.'),
  farmingTips: z.string().describe('Practical farming tips relevant to the current season and location.'),
  aiSuggestion: z.object({
    heading: z.string().describe("Heading for the AI suggestion card."),
    advice: z.string().describe("Context-aware farming advice."),
    prediction: z.string().describe("AI prediction for future action."),
  }).describe("AI powered smart suggestion for the user.")
});
export type SmartNotificationsOutput = z.infer<typeof SmartNotificationsOutputSchema>;

export async function getSmartNotifications(input: SmartNotificationsInput): Promise<SmartNotificationsOutput> {
  return smartNotificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartNotificationsPrompt',
  input: {schema: SmartNotificationsInputSchema},
  output: {schema: SmartNotificationsOutputSchema},
  prompt: `You are an AI assistant providing smart notifications to farmers in India. Your responses should be in Hindi.

  Provide relevant weather updates, market trends, and farming tips based on the farmer's location.

  Location: {{{location}}}

  Also provide an "AI-Powered Smart Suggestion". This should include a heading, a piece of context-aware farming advice for today, and a prediction for a future farming activity.
  For example:
  - Heading: "🤖 आज का स्मार्ट सुझाव"
  - Advice: "मौसम के अनुसार आज गेहूं में हल्की सिंचाई करें।"
  - Prediction: "AI Prediction: 3 दिन बाद छिड़काव का समय है।"

  Format the output as a JSON object with 'weatherUpdate', 'marketTrends', 'farmingTips', and 'aiSuggestion' fields.
`,
});

const smartNotificationsFlow = ai.defineFlow(
  {
    name: 'smartNotificationsFlow',
    inputSchema: SmartNotificationsInputSchema,
    outputSchema: SmartNotificationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
