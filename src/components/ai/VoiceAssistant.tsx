"use client";

import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/hooks/useSettings";
import { voiceAssistantQueries, type VoiceAssistantQueriesOutput } from "@/ai/flows/voice-assistant-queries";
import { Bot, Loader2, Send, CornerDownLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VoiceAssistant({ children }: { children: ReactNode }) {
  const { t } = useSettings();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VoiceAssistantQueriesOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);
    try {
      const response = await voiceAssistantQueries({ query });
      setResult(response);
    } catch (error) {
      console.error("Voice assistant error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response from the AI assistant.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="text-primary"/>
            {t('voice_modal_title')}
          </DialogTitle>
          <DialogDescription>{t('voice_modal_description')}</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('voice_modal_placeholder')}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !query.trim()}>
                {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                <span className="sr-only">Submit</span>
              </Button>
            </div>
          </form>
          
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin text-primary" />
            </div>
          )}

          {result && (
            <div className="p-4 bg-muted/50 rounded-lg text-sm">
                <p>{result.answer}</p>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
                Press <CornerDownLeft className="w-3 h-3"/> to ask.
            </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
