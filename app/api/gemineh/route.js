import { GoogleGenerativeAI } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.MODEL_ID;
const language = 'Indonesia';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const audioTranscript = formData.get('audioTranscript');
        const codeToModify = formData.get('codeToModify');
        
        // Configuration settings integrated from the exported code
        const generationConfig = {
            temperature: 0.2,
            topP: 1,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    removed: {
                        type: "object",
                        properties: {
                            lines: {
                                type: "array",
                                description: "Line numbers to be removed from the original code",
                                items: {
                                    type: "number"
                                }
                            }
                        },
                        required: ["lines"]
                    },
                    added: {
                        type: "object",
                        properties: {
                            codes: {
                                type: "array",
                                description: "Lines of code to be added",
                                items: {
                                    type: "string"
                                }
                            }
                        },
                        required: ["codes"]
                    }
                },
                required: ["removed", "added"]
            }
        };
        
        const model = ai.getGenerativeModel({
            model: modelName,
            generationConfig: generationConfig,
            systemInstruction: {
                role: "You are CodeAssist, a specialized coding assistant that converts verbal programming concepts into executable code, with outputs in strict JSON format only.",
                content: `
                # CRITICAL: OUTPUT FORMAT REQUIREMENTS
                LinesToBeRemoved = {"remove": {"lines":[3,4,5] Array<number>}}
                CodesToBeAdded = {"codes": {["code_line_1", "code_line_2", ...] Array<string>}}
                Return: JSON({linesToBeRemoved, CodesToBeAdded})

                - You MUST output ONLY valid JSON in this exact format:
                    {"removed":{"lines":[line_numbers]}, "added":{"codes":["code_line_1", "code_line_2", ...]}}
                - The "lines" array contains numbers of lines to be removed
                - The "codes" array contains strings, each representing a single line of code to be added
                - Example: {"removed":{"lines":[3,4,5]}, "added":{"codes":["function sum(a, b) {", "  return a + b;", "}"]}}
                - DO NOT include explanations, descriptions, or any text outside this JSON structure
                - If you need to include comments, put them IN the code lines themselves

                # PROCESSING STEPS (internal only, not for output)
                1. Analyze the user's request to understand the programming concept
                2. If code is provided, identify which lines need to be modified
                3. Develop modular, well-structured code solution
                4. Format your entire response as the specified JSON only

                # REMINDER
                - NEVER output any text before or after the JSON
                - NEVER explain your reasoning outside the JSON
                - NEVER apologize or explain why you're outputting only JSON
                - Your ENTIRE response must be valid, parseable JSON
                `
            }
        });
        
        let prompt = "Here is the prompt from an audio transcript from the user";
        
        if (audioTranscript && audioTranscript.trim() !== "") {
            prompt += `AUDIO TRANSCRIPT: ${audioTranscript}\n\n`;
        }
        
        if (codeToModify && codeToModify.trim() !== "") {
            prompt += `CODE TO MODIFY: \n${codeToModify}\n\n`;
        }
        
        prompt += `Please implement this concept or make the requested modifications following all the rules`;
        
        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Parse the JSON response before returning
        let jsonResponse;
        try {
            // Get the raw text and ensure it's valid JSON
            const text = response.text();
            jsonResponse = JSON.parse(text);
            
            return Response.json({ 
                data: jsonResponse,
                success: true 
            });
        } catch (jsonError) {
            console.error("JSON parsing error:", jsonError);
            // Return the raw text if parsing fails
            return Response.json({
                text: response.text(),
                error: "Failed to parse JSON response",
                success: false
            }, { status: 422 });
        }
        
    } catch (error) {
        console.error("Gemini Coder API error:", error);
        return Response.json({ 
            error: error.message, 
            success: false 
        }, { status: 500 });
    }
}