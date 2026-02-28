import { GoogleGenAI, Type } from "@google/genai";
import { Lesson } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateCourseStep(language: string, step: number): Promise<Lesson> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate step ${step} of a 100-step introductory course for the programming language: ${language}. 
    The step should include a title, a brief explanation in Markdown, a code template for the student to complete or run, and the expected output.
    Focus on core concepts. Step 1 is usually "Hello World" or "Basics".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER },
          title: { type: Type.STRING },
          content: { type: Type.STRING, description: "Markdown explanation" },
          codeTemplate: { type: Type.STRING, description: "Initial code for simulator" },
          expectedOutput: { type: Type.STRING, description: "What the code should produce" },
        },
        required: ["step", "title", "content", "codeTemplate"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw e;
  }
}

export async function explainITTopic(topic: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Explain the IT topic: "${topic}" in a way that is very simple to understand, even for a non-technical person. 
    Use a neat and proper structure with Markdown. 
    
    Follow this structure:
    1. **The Big Picture**: A 1-2 sentence high-level summary using a simple analogy.
    2. **What is it?**: A clear, jargon-free definition.
    3. **How it Works (Simple Version)**: Explain the core mechanism using a real-world comparison.
    4. **Why it Matters**: The practical benefit or importance of this topic.
    5. **Key Takeaway**: A single sentence to remember.
    
    Keep the tone friendly, encouraging, and professional. Avoid dense blocks of text; use bullet points for readability.`,
  });
  return response.text || "No explanation available.";
}

export async function searchTopics(query: string): Promise<{id: string, title: string, category: string, summary: string}[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Search for IT topics related to "${query}". Return a list of 5 relevant topics with their category and a short summary.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            category: { type: Type.STRING },
            summary: { type: Type.STRING },
          },
          required: ["id", "title", "category", "summary"],
        },
      },
    },
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return [];
  }
}
