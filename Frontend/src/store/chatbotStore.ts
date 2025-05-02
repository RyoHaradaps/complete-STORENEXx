import { create } from "zustand";
import { ChatMessage } from "@/types/chat";

interface ChatbotStore {
  messages: ChatMessage[];
  sendMessage: (message: string) => Promise<void>;
}

const predefinedResponses: Record<string, string> = {
  greeting: "Hi there! Welcome to STORENEX. How can I help you today?",
  productInfo: "STORENEX offers quality products across electronics, furniture, home decor, and more. Is there anything specific you are looking for?",
  pricing: "Our products range from ₹2,299.99 to ₹65,999.99, with options for every budget.",
  shipping: "We offer free shipping on all orders over 500rs. Standard delivery takes 2-3 business days, and express shipping options are available.",
  returns: "STORENEX has a 30-day return policy. If you are not satisfied with your purchase, you can return it for a full refund.",
  discount: "Use code WELCOME15 for 15% off your first STORENEX purchase!",
  help: "I am here to help! You can ask me about our products, shipping, returns, or anything else about STORENEX.",
};

export const useChatbotStore = create<ChatbotStore>((set) => ({
  messages: [
    {
      text: "Hello! How can I help you with your shopping today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ],

  sendMessage: async (message: string) => {
    // Add the user's message to the chat
    const userMessage: ChatMessage = {
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
    }));

    // Check for predefined responses
    const lowerCaseMessage = message.toLowerCase();
    for (const [key, value] of Object.entries(predefinedResponses)) {
      if (lowerCaseMessage.includes(key)) {
        const botMessage: ChatMessage = {
          text: value,
          sender: "bot",
          timestamp: new Date(),
        };

        set((state) => ({
          messages: [...state.messages, botMessage],
        }));
        return; // Exit early if a predefined response is found
      }
    }

    // If no predefined response is found, send the message to the API
    try {
      const apiUrl = "http://localhost:11434/api/generate"; // Ollama's default local API endpoint
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2", // Specify the Llama model
          prompt: `You are an AI chatbot. Answer the following question: ${message}`,
        }),
      });

      console.log("Raw API Response:", response);

      // Process the response as a stream of JSON objects
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let botResponse = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        console.log("Chunk:", chunk);

        // Split the chunk into individual JSON objects
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");
        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.response) {
              botResponse += json.response;
            }
          } catch (error) {
            console.error("Error parsing JSON line:", error, line);
          }
        }
      }

      console.log("Final Bot Response:", botResponse);

      // Add the bot's response to the chat
      const botMessage: ChatMessage = {
        text: botResponse || "No response from the API.",
        sender: "bot",
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, botMessage],
      }));
    } catch (error) {
      console.error("Error fetching response from API:", error);

      // Add a fallback bot message in case of an error
      const fallbackMessage: ChatMessage = {
        text: "Sorry, I couldn't process your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, fallbackMessage],
      }));
    }
  },
}));