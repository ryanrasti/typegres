"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-sql";

interface SyntaxHighlightProps {
  code: string;
  language: "typescript" | "sql";
  className?: string;
}

export function SyntaxHighlight({ code, language, className = "" }: SyntaxHighlightProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const languageClass = language === "typescript" ? "language-typescript" : "language-sql";

  return (
    <pre className={`${className} whitespace-pre-wrap`}>
      <code className={languageClass} dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages[language], language) }} />
    </pre>
  );
}