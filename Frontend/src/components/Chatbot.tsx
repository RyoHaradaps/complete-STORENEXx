import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send } from "lucide-react";
import { useChatbotStore } from "@/store/chatbotStore";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { messages, sendMessage } = useChatbotStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setIsLoading(true);

    try {
      await sendMessage(userMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </Button>

      {/* Chatbot Card */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-2xl flex flex-col z-50 h-[500px] rounded-lg overflow-hidden animate-slide-up bg-white">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">STORENEX AI</h3>
              <p className="text-sm opacity-90">We're here to help</p>
            </div>
            <Button
              className="text-white hover:bg-blue-700 rounded-full p-2 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          {/* Messages Section */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded-lg shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end rounded-br-none"
                    : "bg-gray-200 text-gray-800 self-start rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-200 text-gray-800 self-start rounded-bl-none max-w-[80%] p-3 rounded-lg shadow-md">
                Typing...
              </div>
            )}
          </div>

          {/* Input Section */}
          <form
            onSubmit={handleSendMessage}
            className="border-t p-4 flex gap-2 bg-white"
          >
            <Textarea
              placeholder="Type your message..."
              className="resize-none flex-1 min-h-[50px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 rounded-lg p-3"
              disabled={isLoading}
            >
              <Send size={20} />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};