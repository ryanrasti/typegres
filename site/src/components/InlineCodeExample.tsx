'use client'

import { Highlight, themes } from 'prism-react-renderer'

interface InlineCodeExampleProps {
  code: string
  language?: string
}

export function InlineCodeExample({ code, language = 'typescript' }: InlineCodeExampleProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 text-sm overflow-x-auto`} style={style}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}