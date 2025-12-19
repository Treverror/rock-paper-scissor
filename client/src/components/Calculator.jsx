import { useState, useMemo } from "react";
import { LOGO } from "../data/CalculatorArt";

const OPS = ["+", "-", "*", "/"];

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [current, setCurrent] = useState("");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [history, setHistory] = useState([]);

  const pretty = useMemo(() => {
    return current !== "" ? current : display;
  }, [current, display]);

  function pushHistory(line) {
    setHistory((h) => [line, ...h].slice(0, 12));
  }

  function toNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function compute(a, b, operation) {
    if (operation === "+") return a + b;
    if (operation === "-") return a - b;
    if (operation === "*") return a * b;
    if (operation === "/") return a / b;
    return b;
  }

  function inputDigit(d) {
    setCurrent((c) => {
      if (d === "." && c.includes(".")) return c;
      if (c === "0" && d !== ".") return d;
      return c + d;
    });
  }

  function clearAll() {
    setDisplay("0");
    setCurrent("");
    setPrev(null);
    setOp(null);
    setHistory([]);
  }

  function backspace() {
    setCurrent((c) => (c.length <= 1 ? "" : c.slice(0, -1)));
  }

  function chooseOp(nextOp) {
    const curNum = current !== "" ? toNumber(current) : null;

    // If we hav no prev yet, store current as prev and set op
    if (prev === null) {
      const start = curNum !== null ? curNum : toNumber(display);
      setPrev(start);
      setCurrent("");
      setOp(nextOp);
      return;
    }

    // If we already have prev + op and user typed a current number, compute partial
    if (op && curNum !== null) {
      const result = compute(prev, curNum, op);
      setDisplay(String(result));
      setPrev(result);
      setCurrent("");
      setOp(nextOp);
      return;
    }

    // Otherwise just replace operation
    setOp(nextOp);
  }

  function equals() {
    const curNum = current !== "" ? toNumber(current) : toNumber(display);

    if (prev === null || !op) {
      setDisplay(String(curNum));
      setCurrent("");
      return;
    }

    const result = compute(prev, curNum, op);

    const line = `${prev} ${op} ${curNum} = ${result}`;
    pushHistory(line);

    setDisplay(String(result));
    setPrev(result);
    setCurrent("");
    setOp(null);
  }

  return (
    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <pre
        style={{
          margin: "0.1rem",
          fontFamily: "monospace",
          fontSize: 10,
          lineHeight: 1.1,
          whiteSpace: "pre",
          marginBottom: 12,
        }}
      >
        {LOGO}
      </pre>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12,
          padding: "10px 12px",
          display: "grid",
          gap: 12,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            padding: "10px 12px",
            fontFamily: "monospace",
            fontSize: 24,
            textAlign: "right",
            overflow: "hidden",
          }}
        >
          {pretty}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: 12 }}
        >
          {/* keypad */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
            }}
          >
            {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((d) => (
              <button key={d} onClick={() => inputDigit(d)} style={btn}>
                {d}
              </button>
            ))}
            <button onClick={() => inputDigit(".")} style={btn}>
              .
            </button>
            <button onClick={() => inputDigit("0")} style={btn}>
              0
            </button>
            <button onClick={equals} style={{ ...btn, fontWeight: 700 }}>
              =
            </button>
          </div>

          {/* ops */}
          <div style={{ display: "grid", gap: 10 }}>
            {OPS.map((s) => (
              <button
                key={s}
                onClick={() => chooseOp(s)}
                style={{
                  ...btn,
                  fontWeight: 700,
                  outline:
                    op === s ? "2px solid rgba(255,255,255,0.35)" : "none",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button onClick={backspace} style={btn}>
            ⌫
          </button>
          <button onClick={clearAll} style={{ ...btn, flex: 1 }}>
            Clear
          </button>
        </div>

        {history.length > 0 && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.15)",
              paddingTop: 10,
              fontFamily: "monospace",
              fontSize: 12,
              opacity: 0.9,
            }}
          >
            <div style={{ marginBottom: 6, fontWeight: 700 }}>History</div>
            {history.map((h, i) => (
              <div key={i}>{h}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const btn = {
  padding: "12px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.06)",
  color: "inherit",
  cursor: "pointer",
};
