import { GoogleGenerativeAI } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.MODEL_ID;

export async function POST(request) {
    try {
        const formData = await request.formData();
        const pageContent = formData.get("pageContent");

        const generationConfig = {
            temperature: 0.2,
            topP: 1,
            topK: 40,
            maxOutputTokens: 2048,
        };
        
        const model = ai.getGenerativeModel({
            model: modelName,
            generationConfig: generationConfig,
        });

        // Build a chat session with system message
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
                                Anda adalah PageNarrator, asisten AI yang merangkum konten halaman web dalam Bahasa Indonesia.

                                # TUGAS
                                - Gunakan Bahasa Indonesia setiap saat
                                - Jangan pernah berikan emoji atau semacamnya, hanya murni teks saja
                                - Buat narasi singkat dan jelas dari konten halaman
                                - Fokus pada informasi paling penting
                                - Gunakan bahasa yang natural dan komunikatif, namun tetap formal
                                - Jawaban maksimal 2–4 kalimat
                                - Hanya kembalikan narasi, tanpa penjelasan tambahan
                            `.trim()
                        }
                    ]
                }
            ]
        });

        const prompt = `Silakan buat narasi singkat yang merangkum konten halaman berikut:\n\n${pageContent}\n\nBalas hanya dengan narasi saja.`;

        const result = await chat.sendMessage(prompt);
        const response = await result.response;

        return Response.json({ 
            data: response.text(),
            success: true 
        });

    } catch (error) {
        console.error("Gemini Narrator API error:", error);
        return Response.json({ 
            error: error.message, 
            success: false 
        }, { status: 500 });
    }
}
