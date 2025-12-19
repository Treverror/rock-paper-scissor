import { useMemo, useState } from "react";
import { CAESAR_LOGO } from "../data/CaesarCipherArt";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function caesar(text, shift, mode) {
  const n = ALPHABET.length;
  const s = ((shift % n) + n) % n;

  // decode = shift backwards
  const dir = mode === "decode" ? -1 : 1;

  let out = "";
  for (const ch of text) {
    const lower = ch.toLowerCase();
    const idx = ALPHABET.indexOf(lower);

    if (idx === -1) {
      out += ch;
      continue;
    }

    const newIdx = (idx + dir * s + n) % n;
    const mapped = ALPHABET[newIdx];

    out += ch === lower ? mapped : mapped.toUpperCase();
  }
  return out;
}

function CaesarCipher() {
  const [mode, setMode] = useState("encode");
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);

  const result = useMemo(() => {
    if (!text) return "";
    return caesar(text, Number(shift) || 0, mode);
  }, [text, shift, mode]);

  function handleClear() {
    setText("");
  }

  function handleSwap() {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
  }

  return (
    <div
      style={{
        maxWidth: 700,
      }}
    >
      <pre
        style={{
          fontFamily: "monospace",
          fontSize: "10px",
          lineHeight: "1.1",
          whiteSpace: "pre",
          color: "#22c55e",
          marginBottom: 16,
        }}
      >
        {CAESAR_LOGO}
      </pre>
      <h2 style={{ marginBottom: 8 }}> Cipher</h2>
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBotton: 12 }}
      >
        <button
          onClick={() => setMode("encode")}
          style={{ fontWeight: mode === "encode" ? "700" : "400" }}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          style={{ fontWeight: mode === "decode" ? "700" : "400" }}
        >
          Decode
        </button>
        <button onClick={handleSwap}>Swap</button>
        <button onClick={handleClear}>Clear</button>

        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Shift:
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            style={{ widows: 80 }}
          />
        </label>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        <label>
          <div style={{ marginBottom: 6 }}>Your message:</div>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message... (symbols/spaces stay the same)"
            style={{ width: "100%" }}
          ></textarea>
        </label>
        <label>
          <div style={{ marginBottom: 6 }}>
            Result ({mode === "encode" ? "encoded" : "decoded"}):
          </div>
          <textarea
            rows={4}
            value={result}
            readOnly
            style={{ width: "100%" }}
          />
        </label>
      </div>
    </div>
  );
}

export default CaesarCipher;
