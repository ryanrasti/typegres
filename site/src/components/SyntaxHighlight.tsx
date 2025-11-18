"use client";

import { Highlight, themes } from "prism-react-renderer";

interface SyntaxHighlightProps {
  code: string;
  language: "typescript" | "sql" | "tsx" | "javascript";
  className?: string;
  diff?: boolean;
}

export function SyntaxHighlight({ code, language, className = "", diff = false }: SyntaxHighlightProps) {
  if (diff) {
    const lines = code.split('\n');
    const processedLines = lines.map(line => {
      if (line.trim().startsWith('// -')) {
        return { type: 'removed' as const, content: line.replace(/^(\s*)\/\/\s*-\s*/, '$1') };
      } else if (line.trim().startsWith('// +')) {
        return { type: 'added' as const, content: line.replace(/^(\s*)\/\/\s*\+\s*/, '$1') };
      }
      return { type: 'normal' as const, content: line };
    });

    const processedCode = processedLines.map(l => l.content).join('\n');

    return (
      <Highlight
        theme={themes.vsDark}
        code={processedCode.trim()}
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
            {tokens.map((line, i) => {
              const lineType = processedLines[i]?.type || 'normal';
              const lineProps = getLineProps({ line });
              
              let bgColor = 'transparent';
              if (lineType === 'removed') {
                bgColor = 'rgba(239, 68, 68, 0.3)'; // red-500 with higher opacity
              } else if (lineType === 'added') {
                bgColor = 'rgba(34, 197, 94, 0.3)'; // green-500 with higher opacity
              }

              return (
                <div 
                  key={i} 
                  {...lineProps}
                  style={{
                    ...lineProps.style,
                    backgroundColor: bgColor,
                  }}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    );
  }

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