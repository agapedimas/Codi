import { GoogleGenerativeAI } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.MODEL_ID;
const language = 'Indonesia';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const audioTranscript = formData.get('audioTranscript');
        const codeToModify = formData.get('codeToModify');
        
        const generationConfig = {
            temperature: 0.2,
            topP: 1,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    snippet: {
                        type: "array",
                        items: { type: "string" },
                        description: "Preview of all suggested code options"
                    },
                    desc: {
                        type: "array",
                        items: { type: "string" },
                        description: "Description of all suggested code options"
                    },
                    0: {
                        type: "object",
                        properties: {
                            changes: {
                                type: "object",
                                properties: {
                                    removed: {
                                        type: "object",
                                        properties: {
                                            lines: {
                                                type: "array",
                                                items: { type: "number" }
                                            }
                                        },
                                        required: ["lines"]
                                    },
                                    added: {
                                        type: "object",
                                        properties: {
                                            codes: {
                                                type: "array",
                                                items: { type: "string" }
                                            }
                                        },
                                        required: ["codes"]
                                    }
                                },
                                required: ["removed", "added"]
                            }
                        },
                        required: ["changes"]
                    },
                    1: {
                        type: "object",
                        properties: {
                            changes: {
                                type: "object",
                                properties: {
                                    removed: {
                                        type: "object",
                                        properties: {
                                            lines: {
                                                type: "array",
                                                items: { type: "number" }
                                            }
                                        },
                                        required: ["lines"]
                                    },
                                    added: {
                                        type: "object",
                                        properties: {
                                            codes: {
                                                type: "array",
                                                items: { type: "string" }
                                            }
                                        },
                                        required: ["codes"]
                                    }
                                },
                                required: ["removed", "added"]
                            }
                        },
                        required: ["changes"]
                    },
                    2: {
                        type: "object",
                        properties: {
                            changes: {
                                type: "object",
                                properties: {
                                    removed: {
                                        type: "object",
                                        properties: {
                                            lines: {
                                                type: "array",
                                                items: { type: "number" }
                                            }
                                        },
                                        required: ["lines"]
                                    },
                                    added: {
                                        type: "object",
                                        properties: {
                                            codes: {
                                                type: "array",
                                                items: { type: "string" }
                                            }
                                        },
                                        required: ["codes"]
                                    }
                                },
                                required: ["removed", "added"]
                            }
                        },
                        required: ["changes"]
                    },
                    3: {
                        type: "object",
                        properties: {
                            changes: {
                                type: "object",
                                properties: {
                                    removed: {
                                        type: "object",
                                        properties: {
                                            lines: {
                                                type: "array",
                                                items: { type: "number" }
                                            }
                                        },
                                        required: ["lines"]
                                    },
                                    added: {
                                        type: "object",
                                        properties: {
                                            codes: {
                                                type: "array",
                                                items: { type: "string" }
                                            }
                                        },
                                        required: ["codes"]
                                    }
                                },
                                required: ["removed", "added"]
                            }
                        },
                        required: ["changes"]
                    }
                },
                required: ["snippet"]
            }
        };

        const model = ai.getGenerativeModel({
            model: modelName,
            generationConfig,
            systemInstruction: {
                role: "You are CodeAssist, a specialized coding assistant that converts verbal programming concepts into executable code, with outputs in strict JSON format only.",
                content: `
                    # CRITICAL: OUTPUT FORMAT REQUIREMENTS
                    LinesToBeRemoved = {"removed": {"lines":[3,4,5]}}
                    CodesToBeAdded = {"added": {"codes":["code_line_1", "code_line_2", ...]}}
                    Snippet = giving simple preview of all suggested code

                    # FINAL STRUCTURE:
                    {
                    "snippet": ["suggestion1", "suggestion2", "suggestion3", ...],
                    "desc": ["description1", "description2", "description3", ...],
                    "0": {
                        "changes": {
                        "removed": { "lines": [ ... ] },
                        "added": { "codes": [ ... ] }
                        }
                    },
                    "1": {
                        "changes": {
                        "removed": { "lines": [ ... ] },
                        "added": { "codes": [ ... ] }
                        }
                    },
                    "2": {
                        "changes": {
                        "removed": { "lines": [ ... ] },
                        "added": { "codes": [ ... ] }
                        }
                    },
                    "3": {
                        "changes": {
                        "removed": { "lines": [ ... ] },
                        "added": { "codes": [ ... ] }
                        }
                    }
                    }

                    # RULES:
                    - Your ENTIRE response must be ONLY valid, parseable JSON.
                    - DO NOT explain or wrap the output in any text.
                    - All snippets should be combined in one "snippet" array at the top level.
                    - Use clear indentation.
                    - All modifications must be listed in the "changes" section.
                    - Use numeric keys (0, 1, 2, 3) for different options.
                    - Provide up to 4 different options when possible.
                `
            }
        });

        // Build prompt
        let prompt = "Generate code modifications from the user's request:\n\n";

        if (audioTranscript && audioTranscript.trim() !== "") {
            prompt += `AUDIO TRANSCRIPT:\n${audioTranscript}\n\n`;
        }

        if (codeToModify && codeToModify.trim() !== "") {
            prompt += `CODE TO MODIFY:\n${codeToModify}\n\n`;
        }

        prompt += `Please return only the modified code suggestions as JSON.`

        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;

        try {
            const text = response.text();
            const parsed = JSON.parse(text);
        
            // Verify the new format has at least the snippet array and one option
            if (!Array.isArray(parsed.snippet) || (!parsed[0] && !parsed[1] && !parsed[2] && !parsed[3])) {
                throw new Error("Invalid format: expected snippet array and at least one numeric option");
            }
        
            return Response.json({
                data: parsed,
                success: true
            });
        } catch (parseError) {
            console.error("JSON parsing error:", parseError);
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