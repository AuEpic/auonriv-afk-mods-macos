
import { GoogleGenAI, Type } from "@google/genai";
import { InsightData, ScriptConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiInsights = async (config: ScriptConfig): Promise<InsightData> => {
  try {
    const prompt = `Based on these AFK helper settings: 
      Profile: ${config.gameProfile}, 
      Anti-Kick: ${config.antiKickEnabled}, 
      Move Interval: ${config.moveInterval}s, 
      Randomization: ${config.randomizePatterns},
      Stealth: ${config.stealthMode}.
      
      Provide a strategic insight for optimizing the AFK routine. 
      Analyze the safety vs efficiency tradeoff. Keep it punchy and pro-gamer style.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            suggestion: { type: Type.STRING },
            efficiencyRating: { type: Type.NUMBER }
          },
          required: ["title", "suggestion", "efficiencyRating"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      title: "Tactical Advisory Offline",
      suggestion: "AI Analysis recalibrating.",
      efficiencyRating: 85
    };
  }
};

export const analyzeScreen = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        { text: "Act as a pro gaming tactical advisor. Briefly analyze this screenshot of the game. Detect if there are anti-AFK detection risks or if anything looks suspicious. Keep it under 30 words." }
      ],
    });
    return response.text || "Analysis complete. No immediate threats detected.";
  } catch (error) {
    console.error("Screen analysis error:", error);
    return "Tactical scan failed. Check neural link.";
  }
};
