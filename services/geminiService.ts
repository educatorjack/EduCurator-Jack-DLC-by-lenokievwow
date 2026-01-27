
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, AnalysisData } from "../types";

const JACK_SYSTEM_INSTRUCTION = `
You are "EduCuratorJack," a passionate and insightful Deep Learning Curator. Your goal is to help students go beyond simple translation and achieve a "Deep Understanding" of texts based on the 2022 Revised Curriculum's core competencies (Critical Thinking, Communication). You are friendly, encouraging, and professional.

Level Names (MUST USE THESE EXACT NAMES):
- Level 1. 어휘 안내자
- Level 2. 문법 코치
- Level 3. 주제 토론가
- Level 4. 논리 분석가
- Level 5. 심화 탐험가

Constraints:
- Language: Always explain in Korean, but keep English for the source text and specific examples.
- Tone: Use polite, encouraging honorifics (e.g., "해볼까요?", "이 부분은 정말 중요해요!").
- Visuals: Use Emojis for each level: 📘 Level 1, 🛠️ Level 2, 🎙️ Level 3, 📊 Level 4, 🚀 Level 5.
- Formatting: 
  1. For the "content" field in Analysis, you MUST use Numbered Lists (1., 2., 3.) for each key point. Do NOT use bullet points (- or *).
  2. Put a double line break (\n\n) between different numbered items to ensure clear separation.
  3. Ensure each numbered point starts on a completely new line.
  4. Make it look like a well-organized, easy-to-read study guide.
`;

export const getAnalysis = async (text: string): Promise<AnalysisData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this text using the 5-Level Deep Learning Analysis. 
    Provide the result in a structured JSON format with an introduction and then data for each of the 5 levels. 
    Use the exact titles: "Level 1. 어휘 안내자", "Level 2. 문법 코치", "Level 3. 주제 토론가", "Level 4. 논리 분석가", "Level 5. 심화 탐험가".
    In the "content" for each level, use Numbered Lists (1., 2., 3. ...) instead of bullet points.
    Ensure there is a double line break between each numbered point so the text is not cramped.
    \n\n Text: ${text}`,
    config: {
      systemInstruction: JACK_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          introduction: { type: Type.STRING },
          levels: {
            type: Type.OBJECT,
            properties: {
              wordGuide: {
                type: Type.OBJECT,
                properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, emoji: { type: Type.STRING } },
                required: ["title", "content", "emoji"]
              },
              grammarCoach: {
                type: Type.OBJECT,
                properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, emoji: { type: Type.STRING } },
                required: ["title", "content", "emoji"]
              },
              critic: {
                type: Type.OBJECT,
                properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, emoji: { type: Type.STRING } },
                required: ["title", "content", "emoji"]
              },
              analyst: {
                type: Type.OBJECT,
                properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, emoji: { type: Type.STRING } },
                required: ["title", "content", "emoji"]
              },
              explorer: {
                type: Type.OBJECT,
                properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, emoji: { type: Type.STRING } },
                required: ["title", "content", "emoji"]
              }
            },
            required: ["wordGuide", "grammarCoach", "critic", "analyst", "explorer"]
          }
        },
        required: ["introduction", "levels"]
      }
    },
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse analysis JSON", e);
    throw e;
  }
};

export const getRoleHelp = async (roleName: string, text: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `I am acting as the "${roleName}" (one of the 5-Levels) for the provided text.
    Please provide hints, discussion materials, and a script SPECIFICALLY for this level.
    Use Numbered Lists (1., 2., 3.) and double line breaks for maximum readability.
    
    Text: ${text}`,
    config: {
      systemInstruction: JACK_SYSTEM_INSTRUCTION,
      temperature: 0.8,
    },
  });
  return response.text || "도움말을 생성하지 못했습니다.";
};

export const getQuiz = async (text: string): Promise<QuizQuestion[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the provided text, generate exactly 5 quiz questions (one for each of the 5 levels). 
    
    Level 1: Vocabulary, Level 2: Grammar, Level 3: Subject/Topic, Level 4: Logic/Argument, Level 5: Deep Exploration.
    
    The questions should be a mix of multiple-choice and short-answer. 
    IMPORTANT for short-answer questions: 
    1. Append "(서술형)" to the end of the question text.
    2. Set the "options" field to an empty array [] or omit it.
    
    Text: \n\n ${text}`,
    config: {
      systemInstruction: JACK_SYSTEM_INSTRUCTION + "\nReturn the response in a structured JSON format. Ensure at least 2 questions are short-answer (서술형).",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            answer: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["question", "answer", "explanation"],
        },
      },
    },
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse quiz JSON", e);
    return [];
  }
};
