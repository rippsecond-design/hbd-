export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  tag?: string;
  rotation?: number;
}

export interface FunFact {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

export interface WishMessage {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}
