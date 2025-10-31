import { useEffect } from "react";

export const TestConnection = () => {
  useEffect(() => {
    console.log("🧪 Starting connection test...");

    fetch("http://localhost:5173/continent")
      .then((res) => {
        console.log("📡 Fetch status:", res.status);
        console.log("📡 Fetch ok:", res.ok);
        console.log("📡 Fetch headers:", res.headers);
        return res.text(); // Use text() primeiro para ver o que vem
      })
      .then((data) => {
        console.log("📦 Fetch response data:", data);

        // Tenta converter para JSON se for possível
        try {
          const jsonData = JSON.parse(data);
          console.log("✅ Valid JSON:", jsonData);
        } catch {
          console.log("❌ Not JSON, raw data:", data.substring(0, 200));
        }
      })
      .catch((err) => {
        console.log("💥 Fetch error:", err);
        console.log("💥 Error message:", err.message);
      });
  }, []);

  return (
    <div
      style={{
        border: "2px solid red",
        padding: "10px",
        margin: "10px",
        backgroundColor: "#fff3cd",
      }}
    >
      <h3>🧪 Connection Test Component</h3>
      <p>Check browser console for connection details</p>
    </div>
  );
};
