"use client";

import { useState, useEffect } from "react";
import { Text, TextCursorInput } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TextSizeType = "sm" | "base" | "lg" | "xl";

export default function AccessibilityControls() {
  const sizes: TextSizeType[] = ["sm", "base", "lg", "xl"];
  const [currentSize, setCurrentSize] = useState<TextSizeType>("base");

  useEffect(() => {
    const sizeClasses: Record<TextSizeType, string> = {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    document.body.classList.remove(...Object.values(sizeClasses));
    document.body.classList.add(sizeClasses[currentSize]);
  }, [currentSize]);

  const changeSize = () => {
    const currentIndex = sizes.indexOf(currentSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setCurrentSize(sizes[nextIndex]);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={changeSize} aria-label="Change text size">
            <Text className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change Text Size</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
