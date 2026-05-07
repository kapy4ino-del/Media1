import type { AnalysisResult } from "../types";

export const MODEL_ID = "gemini-3.1-pro-preview";

export const analyzeArticle = async (
  content: string,
  isUrl: boolean,
  mimeType?: string,
): Promise<AnalysisResult> => {
  const response = await fetch('/.netlify/functions/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, isUrl, mimeType }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || 'Analysis request failed.');
  }

  return payload as AnalysisResult;
};
