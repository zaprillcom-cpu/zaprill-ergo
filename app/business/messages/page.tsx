'use client';

import React, { useState } from 'react';
import { Send, User, Building2, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

export default function BusinessMessagesPage() {
  const { state, sendMessage } = useZaprillStore();
  const [inputText, setInputText] = useState('');
  const threadId = 'th-aarav-harbourdesk';

  const threadMessages = state.messages.filter((m) => m.threadId === threadId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(threadId, 'talent-aarav-mehta', inputText.trim());
    setInputText('');
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Candidate Communications</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct simulated message thread with Aarav Mehta (Financial Analyst Candidate).
          </p>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col h-[580px]">
          {/* Thread Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={state.talent[0].avatar}
                alt="Aarav Mehta"
                className="w-9 h-9 rounded-xl object-cover border"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Aarav Mehta</h3>
                <p className="text-[11px] text-slate-500">
                  Candidate for: <strong>Financial & Operations Analyst</strong> (94% Match)
                </p>
              </div>
            </div>
            <span className="text-[11px] text-teal-700 font-semibold px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200">
              Assessment Verified
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {threadMessages.map((msg) => {
              const isBiz = msg.senderRole === 'business';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBiz ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-700">{msg.senderName}</span>
                    <span>•</span>
                    <span>{formatDate(msg.timestamp)}</span>
                  </div>
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isBiz
                        ? 'bg-indigo-600 text-white rounded-tr-xs'
                        : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Send interview invite or feedback to Aarav Mehta..."
              className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <Button variant="primary" size="md" type="submit" disabled={!inputText.trim()}>
              <Send className="w-4 h-4 mr-1" />
              Send
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
