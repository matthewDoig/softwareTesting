const fs = require("fs");
const path = require("path");

const input = process.argv[2] || "evidence/performance-under-load.json";
const output = process.argv[3] || "evidence/performance-under-load-summary.md";

const raw = JSON.parse(fs.readFileSync(input, "utf8"));
const agg = raw.aggregate || {};
const counters = agg.counters || {};
const rates = agg.rates || {};
const sums = agg.summaries || {};

const totalRequests = counters["http.requests"] ?? 0;
const totalErrors = counters["http.errors"] ?? 0;
const successRate = totalRequests
  ? (totalRequests - totalErrors) / totalRequests
  : 0;

const SUCCESS_THRESHOLD = 0.98;
const passed = successRate >= SUCCESS_THRESHOLD;

const rt = sums["http.response_time"] || {};

function ms(x) {
  return x === undefined ? "n/a" : `${x} ms`;
}
function pct(x) {
  return `${(x * 100).toFixed(2)}%`;
}

// Per-endpoint metrics (because metrics-by-endpoint is enabled)
const endpointStats = Object.entries(sums)
  .filter(([k]) => k.startsWith("plugins.metrics-by-endpoint.response_time."))
  .map(([k, v]) => ({
    name: k.replace("plugins.metrics-by-endpoint.response_time.", ""),
    count: v.count ?? 0,
    mean: v.mean,
    p95: v.p95,
    p99: v.p99,
    max: v.max
  }))
  .sort((a, b) => b.count - a.count);

// ---- Markdown output ----
let md = "";

md += `# Performance Under Load — Summary\n\n`;
md += `**Result:** ${passed ? "✅ PASS" : "❌ FAIL"}\n\n`;
md += `**Success rate:** ${pct(successRate)} `;
md += `(threshold ≥ ${pct(SUCCESS_THRESHOLD)})\n\n`;
md += `---\n\n`;

md += `## Overall statistics\n`;
md += `- Total requests: **${totalRequests}**\n`;
md += `- Failed requests: **${totalErrors}**\n`;
md += `- Approx. request rate: **${rates["http.request_rate"] ?? "n/a"} req/s**\n\n`;

md += `## Latency (http.response_time)\n`;
md += `- p50: ${ms(rt.p50)}\n`;
md += `- p95: ${ms(rt.p95)}\n`;
md += `- p99: ${ms(rt.p99)}\n`;
md += `- max: ${ms(rt.max)}\n\n`;

md += `## Per-endpoint latency (by request name)\n\n`;
md += `| Endpoint | Count | Mean | p95 | p99 | Max |\n`;
md += `|---|---:|---:|---:|---:|---:|\n`;

for (const e of endpointStats) {
  md += `| ${e.name} | ${e.count} | ${ms(e.mean)} | ${ms(e.p95)} | ${ms(e.p99)} | ${ms(e.max)} |\n`;
}

// Write output
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, md);
console.log(`Wrote ${output}`);
