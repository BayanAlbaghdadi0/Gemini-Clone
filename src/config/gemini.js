// const API_Key = "AIzaSyBgWtPe8eK2oKo3Ch4pKPy4z8s4FZ_e5yM";
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyBgWtPe8eK2oKo3Ch4pKPy4z8s4FZ_e5yM";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
  try {
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text()
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export default run;
