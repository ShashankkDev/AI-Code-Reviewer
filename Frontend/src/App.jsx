import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [codePresent, setCodePresent] = useState(false);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ai-code-reviewer-snowy.vercel.app/ai/get-review",
        { code },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response comming frm backend is > ", response.data.review);

      setReview(response.data.review);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Give me a Code Please!!😊");
    }
    setLoading(false);
  }

  function clearCode() {
    setCode("");
    setReview(" Let me know if you need any more help. Happy coding!😊");
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code" style={{ position: "relative" }}>
            {code === "" && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  color: "#888",
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  pointerEvents: "none",
                }}
              >
                Write or Paste your Code here!
              </div>
            )}

            <Editor
              value={code}
              onValueChange={(code) => {
                setCode(code);
                setCodePresent(true);
              }}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
                color: "#fff",
              }}
            />
          </div>
          {codePresent && code && (
            <div onClick={clearCode} className="Clear-btn">
              Clear
            </div>
          )}

          <div onClick={reviewCode} className="review">
            {loading ? "Loading" : "Review"}
          </div>
        </div>

        <div className={`right ${review ? "has-review" : ""}`}>
          {review ? (
            ""
          ) : (
            <div className="hello">Hello! I'm your Code Reviewer Expert!</div>
          )}

          {loading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Analyzing Code...</p>
            </div>
          )}
          {!loading && (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
