// main.js
const profileBtn = document.getElementById("profileBtn");
const teamBtn = document.getElementById("teamBtn");
const output = document.getElementById("output");
const loader = document.getElementById("loader");
const summary = document.getElementById("summary");

async function fetchData(endpoint) {
  loader.style.display = "block";
  output.textContent = "";
  summary.innerHTML = "";

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error("Server Error");
    const data = await res.json();

    // ✅ Extract LLM tool output from backend
    const toolData = data?.[0]?.args || data?.tool_calls?.[0]?.args || data;
    output.textContent = JSON.stringify(toolData, null, 2);

    // 🧠 Highlight best matches visually
    if (toolData.rankings && toolData.scores) {
      const highlightHTML = [];
      const keys = Object.keys(toolData.rankings);

      // Detect type: Profile → Team or Team → Profile
      const firstKey = keys[0];
      const firstVal = toolData.rankings[firstKey][0];
      const isProfileToTeam = !firstKey.startsWith("Team");

      if (isProfileToTeam) {
        highlightHTML.push(`<h2>🏆 Best Team per Person</h2><ul>`);
        for (const person in toolData.rankings) {
          const bestTeam = toolData.rankings[person][0];
          highlightHTML.push(`<li><strong>${person}</strong> → ${bestTeam}</li>`);
        }
        highlightHTML.push(`</ul>`);
      } else {
        highlightHTML.push(`<h2>🏆 Best Person per Team</h2><ul>`);
        for (const team in toolData.rankings) {
          const bestPerson = toolData.rankings[team][0];
          highlightHTML.push(`<li><strong>${team}</strong> → ${bestPerson}</li>`);
        }
        highlightHTML.push(`</ul>`);
      }

      summary.innerHTML = highlightHTML.join("");
    }
  } catch (err) {
    output.textContent = "❌ " + err.message;
  } finally {
    loader.style.display = "none";
  }
}

profileBtn.addEventListener("click", () => fetchData("/api/profile-rank"));
teamBtn.addEventListener("click", () => fetchData("/api/team-rank"));
