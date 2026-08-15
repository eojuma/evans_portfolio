import { useEffect, useState } from "react";

const COMMAND = "curl api.evans.dev/me";

const RESPONSE_LINES = [
  { key: "name", value: "Evans Juma" },
  { key: "role", value: "Backend Software Engineer" },
  { key: "location", value: "Kisumu, Kenya" },
  { key: "status", value: "available" },
  { key: "stack", value: '["Go", "PostgreSQL", "Docker"]', isRaw: true },
];

/**
 * Renders a small terminal panel that types out a curl command,
 * then reveals a JSON response line by line. Respects
 * prefers-reduced-motion by rendering the final state immediately.
 */
export const TerminalIntro = () => {
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [typedCommand, setTypedCommand] = useState(reducedMotion ? COMMAND : "");
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? RESPONSE_LINES.length : 0);
  const [showCursor, setShowCursor] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex += 1;
      setTypedCommand(COMMAND.slice(0, charIndex));
      if (charIndex >= COMMAND.length) {
        clearInterval(typeInterval);
        setShowCursor(false);
        let lineIndex = 0;
        const lineInterval = setInterval(() => {
          lineIndex += 1;
          setVisibleLines(lineIndex);
          if (lineIndex >= RESPONSE_LINES.length) {
            clearInterval(lineInterval);
          }
        }, 180);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [reducedMotion]);

  return (
    <div className="terminal">
      <div className="terminal-titlebar">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-label">zsh</span>
      </div>
      <div className="terminal-body">
        <span className="terminal-prompt">$ </span>
        <span className="terminal-command">{typedCommand}</span>
        {showCursor && <span className="terminal-cursor" />}
        {typedCommand === COMMAND && (
          <>
            {"\n"}
            <span className="terminal-punct">{"{"}</span>
            {"\n"}
            {RESPONSE_LINES.slice(0, visibleLines).map((line, i) => (
              <span key={line.key}>
                {"  "}
                <span className="terminal-key">"{line.key}"</span>
                <span className="terminal-punct">: </span>
                <span className="terminal-string">
                  {line.isRaw ? line.value : `"${line.value}"`}
                </span>
                {i < RESPONSE_LINES.length - 1 ? (
                  <span className="terminal-punct">,</span>
                ) : (
                  ""
                )}
                {"\n"}
              </span>
            ))}
            {visibleLines === RESPONSE_LINES.length && (
              <span className="terminal-punct">{"}"}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
