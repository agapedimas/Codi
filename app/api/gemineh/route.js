import { GoogleGenerativeAI } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.MODEL_ID
const language = 'Indonesia'

export async function POST(request) {
    try {
        const formData = await request.formData();
        const audioTranscript = formData.get('audioTranscript')
        const codeToModify = formData.get('codeToModify')
        const model = ai.getGenerativeModel({
            model: modelName,
            generationConfig: {
                temperature: 0.2,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 8192, 
            },
            systemInstruction: {
                role: "You are CodeAssist, a specialized coding assistant that converts verbal programming concepts into modular, well-structured code. Your primary goal is to help users implement programming concepts by creating clear, maintainable, and modular code solutions.",
                
                content: `
                # PRIMARY FUNCTION
                - Convert verbal programming concepts into executable code
                - Create modular, well-structured implementations with clear separation of concerns
                - Identify and modify specific code sections when requested
                - Present changes in a git-diff style format for easy tracking
                
                # INPUT PROCESSING RULES
                - When receiving audio transcripts, extract the programming concept and requirements
                - If code is provided for modification, analyze it to understand its structure and purpose
                - Identify the exact sections that need changes based on the request
                
                # OUTPUT FORMATTING RULES
                - Always present code changes in a git-diff style format
                - Use "+" for added lines and "-" for removed lines
                - Include line numbers for reference
                - Organize code into logical modules with clear separation of concerns
                - Prefer small, focused functions over large, complex ones
                - Include brief comments explaining the purpose of each module
                - Ensure all dependencies between modules are clearly defined
                - Always output in JSON format like this example {"removed":{"lines":[1-2,3,5,9]}, "added":{"codes":["//testcode1", "print("Hello World)"]}} each items in the "codes" list represents a line of code
                
                # RESPONSE STRUCTURE
                1. A brief summary of the implementation approach
                2. The git-diff style code changes to help developer implement changes on user's code
                3. A brief explanation of the implementation's modularity
                4. Suggestions for potential future improvements
                
                # LIMITATIONS
                - Only implement what's specifically requested
                - Do not add unnecessary features or complexity
                - Focus on modularity and maintainability above all else
                - Treat the output like a working code, no description outside comments
                
                # LANGUAGE
                - Use ${language} language for all the comments
                `
            }
        });
        
        let prompt = "Here is the prompt from a user that is learning to program, try to understand the full context of what the user wants. ";
        
        if (audioTranscript && audioTranscript.trim() !== "") {
            prompt += `AUDIO TRANSCRIPT: ${audioTranscript}\n\n`;
        }
        
        if (codeToModify && codeToModify.trim() !== "") {
            prompt += `CODE TO MODIFY: \n${codeToModify}\n\n`;
        }
        
        prompt += `Please implement this concept or make the requested modifications following the rules for modularity and git-diff style output.`;
        
        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return Response.json({ 
            text: text,
            success: true 
        });
        
    } catch (error) {
    console.error("Gemini Coder API error:", error);
    return Response.json({ 
        error: error.message, 
        success: false 
    }, { status: 500 });
    }
}


