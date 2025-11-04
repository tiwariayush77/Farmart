'use server';

/**
 * @fileOverview Implements an AI flow to provide market intelligence for agricultural trading.
 *
 * - getMarketIntelligence: Fetches AI-driven market predictions.
 * - MarketIntelligenceInput: Input schema for the flow.
 * - MarketIntelligenceOutput: Output schema for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MarketIntelligenceInputSchema = z.object({
  crop: z.string().describe('The crop for which to get market intelligence.'),
  location: z.string().describe('The location for localized market data.'),
});
export type MarketIntelligenceInput = z.infer<typeof MarketIntelligenceInputSchema>;

const MarketIntelligenceOutputSchema = z.object({
  prediction: z.string().describe('The AI-driven market prediction and recommendation in Hindi.'),
  currentPrice: z.number().describe('The current market price for the crop.'),
  predictedPrice: z.number().describe("The AI-predicted price for the next day."),
});
export type MarketIntelligenceOutput = z.infer<typeof MarketIntelligenceOutputSchema>;

export async function getMarketIntelligence(input: MarketIntelligenceInput): Promise<MarketIntelligenceOutput> {
  return marketIntelligenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketIntelligencePrompt',
  input: { schema: MarketIntelligenceInputSchema },
  output: { schema: MarketIntelligenceOutputSchema },
  prompt: `You are an expert agricultural market analyst for the FarMart platform in India.

  The user wants market intelligence for the following:
  - Crop: {{{crop}}}
  - Location: {{{location}}}

  Based on simulated market data, provide a compelling, urgent-sounding AI recommendation in Hindi about whether today is a good day to sell.
  - Create a short, impactful prediction. For example: "गेहूं बेचने का आज सबसे अच्छा दिन! कल कीमत ₹150 गिर सकती है"
  - Generate a realistic current price for the crop.
  - Generate a realistic predicted price for tomorrow that reflects your prediction (e.g., if you predict a drop, the price should be lower).

  Format the output as a JSON object with 'prediction', 'currentPrice', and 'predictedPrice' fields.
  Example for a price drop:
  {
    "prediction": "गेहूं बेचने का आज सबसे अच्छा दिन! कल कीमत ₹150 गिर सकती है",
    "currentPrice": 2800,
    "predictedPrice": 2650
  }
  Example for a price rise:
  {
    "prediction": "गेहूं अभी न बेचें! कल कीमत ₹200 बढ़ सकती है",
    "currentPrice": 2800,
    "predictedPrice": 3000
  }
`,
});

const marketIntelligenceFlow = ai.defineFlow(
  {
    name: 'marketIntelligenceFlow',
    inputSchema: MarketIntelligenceInputSchema,
    outputSchema: MarketIntelligenceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
