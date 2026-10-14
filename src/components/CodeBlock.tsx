import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  showLineNumbers = true,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const cleanLang = language.toLowerCase().replace('c++', 'cpp').trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const highlightCode = () => {
    const prismLang = Prism.languages[cleanLang] || Prism.languages.javascript || Prism.languages.clike;
    if (prismLang) {
      try {
        return Prism.highlight(code, prismLang, cleanLang);
      } catch {
        return code;
      }
    }
    return code;
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`relative group rounded-lg overflow-hidden border border-slate-800 bg-slate-950/80 my-3 font-mono text-xs sm:text-sm ${className}`}>
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-slate-800/80 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 uppercase tracking-wider text-[11px] font-semibold text-slate-300">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          title="Copy code to clipboard"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-3 overflow-x-auto text-slate-200 leading-relaxed max-h-[450px]">
        {showLineNumbers ? (
          <div className="table w-full">
            {lines.map((line, idx) => (
              <div key={idx} className="table-row hover:bg-slate-900/40">
                <span className="table-cell select-none pr-4 text-right text-slate-600 text-xs w-8">
                  {idx + 1}
                </span>
                <span
                  className="table-cell whitespace-pre"
                  dangerouslySetInnerHTML={{
                    __html: Prism.languages[cleanLang]
                      ? Prism.highlight(line, Prism.languages[cleanLang], cleanLang)
                      : line || ' ',
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <pre className="whitespace-pre">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightCode(),
              }}
            />
          </pre>
        )}
      </div>
    </div>
  );
};
