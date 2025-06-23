import { OpenAIMessage } from '../types';

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface UsageData {
  count: number;
  timestamp: number;
}

const checkIPLimit = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const userIP = data.ip;
    
    const usageData = localStorage.getItem('essayGeneratorUsage') || '{}';
    const usage: Record<string, UsageData> = JSON.parse(usageData);
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    
    if (usage[userIP]) {
      const timeSinceLastUse = now - usage[userIP].timestamp;
      
      if (timeSinceLastUse >= ONE_DAY) {
        usage[userIP] = {
          count: 1,
          timestamp: now
        };
        localStorage.setItem('essayGeneratorUsage', JSON.stringify(usage));
        return true;
      }
      
      if (usage[userIP].count >= 1) {
        const hoursRemaining = Math.ceil((ONE_DAY - timeSinceLastUse) / (60 * 60 * 1000));
        throw new Error(`You have reached the daily limit. Please try again in ${hoursRemaining} hours.`);
      }
    }
    
    usage[userIP] = {
      count: 1,
      timestamp: now
    };
    localStorage.setItem('essayGeneratorUsage', JSON.stringify(usage));
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    console.error('Error checking IP limit:', error);
    return true;
  }
};

export const generateEssay = async (
  topic: string, 
  additionalDetails: string
): Promise<string> => {
  try {
    const canGenerate = await checkIPLimit();
    if (!canGenerate) {
      throw new Error('You have reached the maximum number of essays allowed per IP address.');
    }

    const prompt = `Generate a creative, engaging title for an essay about ${topic}, then write a 1500-word essay that demonstrates authentic human writing qualities. Start with the title in a # heading format.

${additionalDetails ? `Consider these additional details: ${additionalDetails}` : ''}

ESSAY STRUCTURE:
Title:
Create an engaging, specific title that captures the essence of the topic
Format it as "# [Your Creative Title Here]"

Introduction:
Begin with a thought-provoking observation or question about ${topic}
Include a personal reflection or anecdote related to ${topic} that shows genuine interest
Present a thesis that offers your unique perspective on ${topic}

Body Paragraphs:
Vary sentence structure dramatically between paragraphs (mix short, punchy sentences with longer, complex ones)
Incorporate 1-2 personal insights or experiences relevant to ${topic}
Use unexpected metaphors or analogies to explain complex aspects of ${topic}
Present counterarguments with genuine consideration rather than dismissal
Include moments of ambiguity or uncertainty where appropriate ("While the data suggests X, the human element remains harder to quantify")

Conclusion:
Revisit your opening reflection with deeper insight
Acknowledge limitations in your analysis
End with a thoughtful implication or question that extends beyond the immediate topic

WRITING TECHNIQUES:
Structural Variation:
Alternate between simple and complex sentences
Occasionally use intentional fragments for emphasis
Vary paragraph lengths unpredictably
Reduce use of present participial clauses (e.g., "Running quickly, he...")

Authentic Voice:
Include subjective assessments ("This approach seems particularly valuable because...")
Show your reasoning process rather than just conclusions
Use first-person perspective occasionally if appropriate for the assignment
Incorporate a specific personal anecdote or observation

Linguistic Complexity:
Connect ideas with varied transitions beyond mechanical connectors
Draw unexpected connections between concepts
Use domain-specific vocabulary naturally but not excessively
Avoid overly consistent word distribution patterns

Human Elements:
Express appropriate emotion or ethical considerations about ${topic}
Acknowledge multiple perspectives with genuine consideration
Reference how your thinking on ${topic} has evolved
Include a specific example or case study that illustrates your point with human detail`;

    const messages: OpenAIMessage[] = [
      { role: 'user', content: prompt }
    ];

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1',
        messages: messages,
        temperature: 0.7,
        max_tokens: 8000,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.5
      })
    };

    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate essay');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in generateEssay:', error);
    throw error;
  }
};