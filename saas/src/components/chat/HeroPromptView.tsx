"use client";

import * as React from "react";
import { Plus, ArrowUp, ImageIcon, PenTool, Globe, Download, X } from "lucide-react";

interface HeroPromptViewProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onSubmitPrompt: (promptText?: string) => void;
  onOpenConnectModal?: () => void;
  isLoading?: boolean;
  selectedImage?: { name: string; dataUrl: string } | null;
  onSelectImage?: (img: { name: string; dataUrl: string } | null) => void;
}

export function HeroPromptView({
  inputPrompt,
  setInputPrompt,
  onSubmitPrompt,
  onOpenConnectModal,
  isLoading = false,
  selectedImage,
  onSelectImage,
}: HeroPromptViewProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const suggestions = [
    { icon: ImageIcon, label: "Add image ALT text to missing images", prompt: "Add alt text to images missing alt text" },
    { icon: PenTool, label: "Write missing meta description for my pages", prompt: "Write missing meta description for my pages" },
    { icon: Globe, label: "Fix thin content and structural H1 headings", prompt: "Fix thin content on my website" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((inputPrompt.trim() || selectedImage) && !isLoading) {
        onSubmitPrompt();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSelectImage?.({
          name: file.name,
          dataUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPlugin = () => {
    window.location.href = "/api/plugin/download";
    setMenuOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto w-full my-auto space-y-8 animate-in fade-in duration-300">
      {/* Centered Heading */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white font-sans text-center">
        Where should we begin?
      </h1>

      {/* Floating Input Pill Box */}
      <div className="w-full max-w-2xl relative space-y-2">
        {/* Selected Image Thumbnail Badge */}
        {selectedImage && (
          <div className="flex items-center gap-2 p-2 px-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-2xl w-fit text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm animate-in fade-in">
            <img src={selectedImage.dataUrl} alt="Upload preview" className="h-7 w-7 rounded-lg object-cover border border-indigo-300 dark:border-indigo-700" />
            <span className="truncate max-w-[180px]">{selectedImage.name}</span>
            <button
              type="button"
              onClick={() => onSelectImage?.(null)}
              className="p-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors ml-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <div className="relative flex items-center bg-white dark:bg-[#212121] border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 p-2 pl-3 focus-within:ring-2 focus-within:ring-indigo-500">
          {/* Plus Add Button with Context Menu */}
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="h-9 w-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-colors mr-1 shrink-0"
              title="Add or Connect Website"
            >
              <Plus className="h-5 w-5" />
            </button>

            {/* Desktop Image File Attachment Icon */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-9 w-9 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-colors mr-2 shrink-0"
              title="Attach Image from Desktop"
            >
              <ImageIcon className="h-5 w-5" />
            </button>

            {/* Plus Context Menu Popup */}
            {menuOpen && (
              <div className="absolute left-0 bottom-12 w-60 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenConnectModal?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-xl transition-colors text-left"
                >
                  <Plus className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  Connect New Website
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPlugin}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] rounded-xl transition-colors text-left"
                >
                  <Download className="h-4 w-4 text-slate-500" />
                  Download WP-AI Connector Plugin
                </button>
              </div>
            )}
          </div>

          {/* Prompt Text Input */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedImage ? `Add instructions for ${selectedImage.name}...` : "Ask anything..."}
            disabled={isLoading}
            className="flex-1 bg-transparent text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none px-2 selection:bg-indigo-500 selection:text-white"
          />

          {/* Right Action Control: Circular Blue Send Button */}
          <div className="flex items-center pr-1 shrink-0">
            <button
              type="button"
              onClick={() => (inputPrompt.trim() || selectedImage) && !isLoading && onSubmitPrompt()}
              disabled={(!inputPrompt.trim() && !selectedImage) || isLoading}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                (inputPrompt.trim() || selectedImage) && !isLoading
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md hover:scale-105"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              }`}
            >
              <ArrowUp className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
        {suggestions.map((item, index) => {
          const IconComp = item.icon;
          return (
            <button
              key={index}
              onClick={() => setInputPrompt(item.prompt)}
              className="flex flex-col items-start p-4 rounded-2xl bg-slate-50 dark:bg-[#1a1a1a] hover:bg-slate-100 dark:hover:bg-[#242424] border border-slate-200/80 dark:border-slate-800 transition-all duration-200 text-left group shadow-sm hover:shadow"
            >
              <IconComp className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
