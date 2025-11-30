'use server';
/**
 * @fileOverview A flow for generating audiobook chapters from text using Text-to-Speech.
 *
 * - generateAudiobookChapter - A function that takes text and returns a WAV audio data URI.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';
import wav from 'wav';

// Helper function to convert PCM audio buffer to WAV base64 string
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const GenerateAudiobookChapterOutputSchema = z.object({
  media: z.string().describe('The base64 encoded WAV audio data URI.'),
});

// The main exported function that clients will call
export async function generateAudiobookChapter(
  text: string
): Promise<z.infer<typeof GenerateAudiobookChapterOutputSchema>> {
  return generateAudiobookChapterFlow(text);
}

// The Genkit flow definition
const generateAudiobookChapterFlow = ai.defineFlow(
  {
    name: 'generateAudiobookChapterFlow',
    inputSchema: z.string(),
    outputSchema: GenerateAudiobookChapterOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // A pleasant voice
          },
        },
      },
      prompt: query,
    });

    if (!media) {
      throw new Error('No media was returned from the text-to-speech model.');
    }

    // The model returns PCM data, we need to convert it to a WAV file
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);
    
    return {
      media: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
