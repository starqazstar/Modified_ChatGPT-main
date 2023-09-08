
import { Pezzo, PezzoOpenAI } from "@pezzo/client";

// Initialize the Pezzo client
export const pezzo = new Pezzo({
  apiKey: "pez_0f24ac89970c61040b21c1274679c539",
  projectId: "clm4npg1e000ovw0h18072sco",
  environment: "Production", // Your desired environment
});

// Initialize the PezzoOpenAI client
const openai = new PezzoOpenAI(pezzo);

// Fetch the prompt from Pezzo
const prompt = await pezzo.getPrompt("工作SOP");

// Use the OpenAI API as you normally would
const response = await openai.chat.completions.create(prompt);
