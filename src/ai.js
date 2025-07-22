import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function getRecipeFromAI(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    const prompt = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page, format as clean Markdown suitable for ReactMarkdown rendering, start directly with the recipe title as an H2 header and don't mention and description.
 Here is the task: generate a recipe using the following ingredients: ${ingredientsString}`;

    try {
        const result = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }]
        });

        const response = await result.response;
        return response.text();
    } catch (err) {
        console.error("Gemini API error:", err);
        return "Error generating recipe.";
    }
}
