"use client";

import { Highlight, themes } from "prism-react-renderer";

interface SyntaxHighlightProps {
  code: string;
  language: "typescript" | "sql";
  className?: string;
}

export function SyntaxHighlight({ code, language, className = "" }: SyntaxHighlightProps) {
  return (
    <Highlight
      theme={themes.vsDark}
      code={code.trim()}
      language={language}
    >
      {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre 
          className={`${highlightClassName} ${className} text-sm font-mono overflow-x-auto`} 
          style={{ 
            ...style, 
            background: 'transparent',
            margin: 0,
            padding: 0,
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}