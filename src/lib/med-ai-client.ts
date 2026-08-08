/**
 * Med AI API Client - Connects to the Med AI backend for medical report analysis.
 */

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_MED_AI_API_URL || 'http://localhost:3003';

export interface MedAIReport {
  originalDocument: string;
  analysis: string;
}

export interface MedAIResponse {
  success: true;
  report: MedAIReport;
}

export interface MedAIErrorResponse {
  error: string;
}

export async function analyzeMedicalReport(
  file: File,
  onProgress?: (progress: number) => void
): Promise<MedAIResponse> {
  const baseUrl = getApiUrl().replace(/\/$/, '');
  const endpoint = `${baseUrl}/api/upload`;

  const formData = new FormData();
  formData.append('file', file);

  if (onProgress) onProgress(30);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (onProgress) onProgress(80);

  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as MedAIErrorResponse).error || 'Upload failed');
  }

  if (onProgress) onProgress(100);

  return data as MedAIResponse;
}
