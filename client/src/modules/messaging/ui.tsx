"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Mail, Edit, MailOpen } from "lucide-react";
import { useState } from "react";

type Message = {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
};

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Tech Co",
      subject: "Interview Invitation",
      preview: "We'd like to invite you for an interview...",
      timestamp: "10:30 AM",
      read: false,
    },
    {
      id: 2,
      sender: "StartUp Inc",
      subject: "Application Update",
      preview: "Thank you for your application. We wanted to inform you...",
      timestamp: "Yesterday",
      read: true,
    },
    {
      id: 3,
      sender: "Dream Jobs",
      subject: "New Job Matches",
      preview: "Based on your profile, we've found new job matches...",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: 4,
      sender: "Recruiter Jane",
      subject: "Exciting Opportunity",
      preview:
        "I came across your profile and I have an exciting opportunity...",
      timestamp: "3 days ago",
      read: false,
    },
  ]);

  const toggleRead = (id: number) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, read: !msg.read } : msg,
      ),
    );
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Inbox</h1>
        <Button className="flex items-center gap-2">
          <Edit size={18} />
          Compose
        </Button>
      </div>

      <div className="rounded-lg bg-card shadow">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 border-b p-4 last:border-b-0 ${message.read ? "bg-background" : "bg-primary/5"}`}
          >
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <h2
                  className={`font-semibold ${message.read ? "text-foreground" : "text-primary"}`}
                >
                  {message.sender}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {message.timestamp}
                </span>
              </div>
              <h3 className="mb-1 text-sm font-medium">{message.subject}</h3>
              <p className="text-sm text-muted-foreground">{message.preview}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleRead(message.id)}
              >
                {message.read ? <MailOpen size={18} /> : <Mail size={18} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMessage(message.id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          Your inbox is empty
        </div>
      )}
    </div>
  );
}
