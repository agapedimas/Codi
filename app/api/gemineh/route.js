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
            responseMimeType: "application/json"
        };
            
        const model = ai.getGenerativeModel({
            model: modelName,
            generationConfig,
            systemInstruction: {
            role: "You are CodeAssist, a specialized coding assistant that converts verbal programming concepts into executable code, with outputs in strict JSON format only.",
            content: `
                # CRITICAL: OUTPUT FORMAT REQUIREMENTS
                
                Your response must follow this three-phase modification structure:
                
                1. REMOVAL PHASE: Specify line numbers to remove (0-indexed)
                2. CHANGE PHASE: Modify existing lines with new code
                3. ADD PHASE: Add new lines of code at specific positions
                
                # FINAL STRUCTURE:
                {
                "suggestions": [
                    {
                    "snippet": "Brief preview of the solution",
                    "description": "Detailed explanation of the approach",
                    "modifications": {
                        "remove": [5, 6, 7],      // Phase 1: Lines to remove (0-indexed)
                        "change": {               // Phase 2: Lines to modify
                        "2": "const x = 10;",
                        "8": "return result;"
                        },
                        "add": {                  // Phase 3: Lines to add
                        "3": "const y = 20;",   // Add after line 3
                        "9": "console.log(result);"
                        }
                    }
                    },
                    {
                    "snippet": "Alternative solution approach",
                    "description": "Different approach to solve the problem",
                    "modifications": {
                        "remove": [],
                        "change": {},
                        "add": {}
                    }
                    }
                    // Up to 4 suggestions
                ]
                }
                
                # RULES:
                - GIVE DESCRIPTION in INDONESIAN LANGUAGE, explain shortly and concisely IN MAXIMUM OF 10 WORDS
                - Your ENTIRE response must be ONLY valid, parseable JSON.
                - DO NOT include explanations outside the JSON structure.
                - Process modifications in order: first remove lines, then change existing lines, then add new lines.
                - Line numbers are 0-indexed.
                - Provide 1 to 4 different solutions when possible (TRY TO MAKE IT POSSIBLE).
                - Each suggestion must include all three phases (remove, change, add) even if some are empty arrays/objects.
                - Always format the response with the exact structure shown above.
                - The "change" and "add" objects should have string keys (line numbers) and string values (code content).
                - When deleting all rows, try to remember the context how many row there are in the code by counting the backslash-n character
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

        prompt += `Please return only the modified code suggestions as JSON with this structure, and provide the description with indonesian language:
        {
        "suggestions": [
            {
            "snippet": "Brief code preview",
            "description": "What this solution does", //ALWAYS IMPLEMENT IN INDONESIAN LANGUAGE AND 12 WORDS MAXIMUM
            "modifications": {
                "remove": [5, 6, 7],
                "change": {
                "2": "const x = 10;",
                "8": "return result;"
                },
                "add": {
                "3": "const y = 20;",
                "9": "console.log(result);"
                }
            }
            }
        ]
        }`;

        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;

        try {
            const text = response.text();
            const parsed = JSON.parse(text);
        
            return Response.json({
                data: parsed,
                success: true
            });
        } catch (parseError) {
            // console.error("JSON parsing error:", parseError);
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