/* Smoke test: roda data.js + main.js dentro de um JSDOM e valida a renderização. */
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const root = __dirname + "/..";
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const dom = new JSDOM(html, { runScripts: "outside-only", pretendToBeVisual: true, url: "http://localhost/" });
const { window } = dom;

const errors = [];
window.addEventListener("error", (e) => errors.push("window error: " + e.message));

try {
  window.eval(fs.readFileSync(path.join(root, "js", "data.js"), "utf8"));
} catch (e) { errors.push("data.js: " + e.message); }

try {
  window.eval(fs.readFileSync(path.join(root, "js", "main.js"), "utf8"));
} catch (e) { errors.push("main.js: " + e.message); }

const ids = ["prod-gauge", "kpis", "causes", "chart-chuva-mes", "chart-temp-mes", "chart-clima-diario",
  "chart-fert", "chart-fert-comp", "tabela-fert", "chart-pressure", "chart-spray-ops", "banner-pressure",
  "chart-alerts", "chart-alerts-op", "chart-pragas-donut", "chart-pragas-serie", "chart-pragas-nivel",
  "recomendacoes", "insights-clima", "insights-fert", "insights-spray", "insights-maquinas", "insights-pragas"];

let failCount = 0;
for (const id of ids) {
  const el = window.document.getElementById(id);
  if (!el) { console.log("MISSING #" + id); failCount++; continue; }
  const childCount = el.children ? el.children.length : 0;
  const hasSvg = !!el.querySelector("svg");
  const text = (el.textContent || "").trim().length;
  if (childCount === 0 && !hasSvg && text === 0 && id !== "prod-gauge") {
    console.log("EMPTY #" + id); failCount++;
  } else {
    console.log(`OK   #${id} (children=${childCount}, svg=${hasSvg}, text=${text})`);
  }
}

if (errors.length) {
  console.log("\nERROS CAPTURADOS:");
  for (const e of errors) console.log(" -", e);
  process.exit(1);
} else {
  console.log("\nSem erros de execução.");
  if (failCount) process.exit(1);
  console.log("SMOKE TEST PASS");
}