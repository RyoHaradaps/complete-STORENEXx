
export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export type SendMessageAction = (message: string) => void;
