// // main.js
// const profileBtn = document.getElementById("profileBtn");
// const teamBtn = document.getElementById("teamBtn");
// const output = document.getElementById("output");
// const loader = document.getElementById("loader");
// const summary = document.getElementById("summary");

// async function fetchData(endpoint) {
//   loader.style.display = "block";
//   output.textContent = "";
//   summary.innerHTML = "";

//   try {
//     const res = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`);
//     if (!res.ok) throw new Error("Server Error");
//     const data = await res.json();

//     // ✅ Extract LLM tool output from backend
//     const toolData = data?.[0]?.args || data?.tool_calls?.[0]?.args || data;
//     output.textContent = JSON.stringify(toolData, null, 2);

//     // 🧠 Highlight best matches visually
//     if (toolData.rankings && toolData.scores) {
//       const highlightHTML = [];
//       const keys = Object.keys(toolData.rankings);

//       // Detect type: Profile → Team or Team → Profile
//       const firstKey = keys[0];
//       const firstVal = toolData.rankings[firstKey][0];
//       const isProfileToTeam = !firstKey.startsWith("Team");

//       if (isProfileToTeam) {
//         highlightHTML.push(`<h2>🏆 Best Team per Person</h2><ul>`);
//         for (const person in toolData.rankings) {
//           const bestTeam = toolData.rankings[person][0];
//           highlightHTML.push(`<li><strong>${person}</strong> → ${bestTeam}</li>`);
//         }
//         highlightHTML.push(`</ul>`);
//       } else {
//         highlightHTML.push(`<h2>🏆 Best Person per Team</h2><ul>`);
//         for (const team in toolData.rankings) {
//           const bestPerson = toolData.rankings[team][0];
//           highlightHTML.push(`<li><strong>${team}</strong> → ${bestPerson}</li>`);
//         }
//         highlightHTML.push(`</ul>`);
//       }

//       summary.innerHTML = highlightHTML.join("");
//     }
//   } catch (err) {
//     output.textContent = "❌ " + err.message;
//   } finally {
//     loader.style.display = "none";
//   }
// }

// profileBtn.addEventListener("click", () => fetchData("/api/profile-rank"));
// teamBtn.addEventListener("click", () => fetchData("/api/team-rank"));

// Auto-switch between localhost and production backend
const API_BASE =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://ucs503p-202526odd-nullptr.onrender.com";

// Helper: GET with cookies
async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Helper: POST with JSON
async function apiPost(path, data = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Helper: PUT with JSON (Add this to main.js)
async function apiPut(path, data = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT", // 👈 Changed method
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
// ...

// Google login
function loginWithGoogle() {
  window.location.href = `${API_BASE}/api/auth/google`;
}

// Logout
async function logout() {
  await apiPost("/api/auth/logout");
  window.location.href = "/frontend/login.html";
}
