"use client";

import * as React from "react";
import { Plus, Mic, ArrowUp, Sparkles } from "lucide-react";

interface HeroPromptViewProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onSubmitPrompt: (promptText?: string) => void;
  isLoading?: boolean;
}

export function HeroPromptView({
  inputPrompt,
  setInputPrompt,
  onSubmitPrompt,
  isLoading = false,
}: HeroPromptViewProps) {
  const suggestions = [
    "What can you do?",
    "Write missing meta description for my pages",
    "Add alt text to images missing alt text",
    "Fix thin content on my website",
    "Check H1 headings on /home",
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputPrompt.trim() && !isLoading) {
        onSubmitPrompt();
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto w-full text-center my-auto space-y-8 animate-in fade-in duration-300">
      {/* Centered Heading */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white font-sans">
        Where should we begin?
      </h1>

      {/* Floating Pill Input Box */}
      <div className="w-full max-w-2xl">
        <div className="relative flex items-center bg-white dark:bg-[#212121] border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 p-2 pl-4 focus-within:ring-2 focus-within:ring-slate-400 dark:focus-within:ring-slate-700">
          {/* Plus Add Button */}
          <button
            type="button"
            className="h-8 w-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-colors mr-2"
            title="Attach or Add"
          >
            <Plus className="h-5 w-5" />
          </button>

          {/* Prompt Text Input */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none px-2"
          />

          {/* Right Icons: Microphone & Circular Send Button */}
          <div className="flex items-center gap-2 pr-1">
            <button
              type="button"
              className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              title="Voice Input"
            >
              <Mic className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => inputPrompt.trim() && !isLoading && onSubmitPrompt()}
              disabled={!inputPrompt.trim() || isLoading}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                inputPrompt.trim() && !isLoading
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md hover:scale-105"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              }`}
            >
              <ArrowUp className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSubmitPrompt(sug)}
            className="px-4 py-2 bg-slate-100 dark:bg-[#212121] hover:bg-slate-200 dark:hover:bg-[#2a2a2a] text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full border border-slate-200/80 dark:border-slate-800 transition-all shadow-sm hover:scale-105"
          >
            {sug}
          </button>
        ))}
      </div>
    </div>
  );
}
