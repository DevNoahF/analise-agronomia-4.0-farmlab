"use strict";
// AgroInsight 4.0 - Painel de análise agronômica
// Rende o dashboard a partir dos dados processados (window.DATA)
const D = window.DATA;
const fmt = (n, dec = 0) => n.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
// ---------------------------------------------------------------------------
// Helpers SVG
// ---------------------------------------------------------------------------
const NS = "http://www.w3.org/2000/svg";
function el(tag, attrs = {}, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k of Object.keys(attrs))
        e.setAttribute(k, String(attrs[k]));
    if (parent)
        parent.appendChild(e);
    return e;
}
const PALETTE = ["#34d399", "#fbbf24", "#f87171", "#60a5fa", "#2dd4bf", "#f59e0b", "#a78bfa", "#e879f9"];
function barChart(container, labels, series, opts = {}) {
    const h = opts.height || 240;
    const w = Math.max(560, labels.length * (series.length > 1 ? 66 : 52) + 90);
    const padL = 46, padB = 34, padT = 16, padR = 12;
    const plotW = w - padL - padR, plotH = h - padT - padB;
    let maxV = -Infinity, minV = Infinity;
    for (const s of series) {
        for (const v of s.values) {
            if (v > maxV)
                maxV = v;
            if (v < minV)
                minV = v;
        }
    }
    if (minV > 0)
        minV = 0;
    if (minV === maxV)
        maxV = minV + 1;
    const span = maxV - minV;
    const svg = el("svg", { viewBox: `0 0 ${w} ${h}`, role: "img" });
    container.innerHTML = "";
    container.appendChild(svg);
    // gridlines + y labels
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
        const val = minV + (span * i) / steps;
        const y = padT + plotH - (plotH * (val - minV)) / span;
        el("line", { x1: padL, y1: y, x2: w - padR, y2: y, stroke: "rgba(255,255,255,0.08)", "stroke-width": 1 }, svg);
        el("text", { x: padL - 8, y: y + 4, "text-anchor": "end", "font-size": 10, fill: "#9ab0a3" }, svg).textContent = fmt(val);
    }
    const nLabels = labels.length;
    const band = plotW / nLabels;
    const groupW = band * 0.62;
    const barW = series.length > 1 ? groupW / series.length : groupW * 0.82;
    labels.forEach((label, i) => {
        const x0 = padL + band * i + (band - groupW) / 2;
        // x label
        el("text", { x: padL + band * i + band / 2, y: h - 10, "text-anchor": "middle", "font-size": 10.5, fill: "#9ab0a3" }, svg).textContent = label;
        if (opts.stacked) {
            let acc = 0;
            let total = 0;
            for (const s of series)
                total += s.values[i] || 0;
            const baseY = padT + plotH;
            series.forEach((s, j) => {
                const v = s.values[i] || 0;
                if (v <= 0) {
                    acc += Math.max(0, v === undefined ? 0 : v);
                    return;
                }
                const hh = (v / (maxV - minV)) * plotH;
                const y = baseY - hh - (acc / (maxV - minV)) * plotH;
                el("rect", { x: x0, y, width: groupW * 0.86, height: hh, rx: 3, fill: PALETTE[j % PALETTE.length] }, svg);
                acc += v;
            });
            if (series.length === 1) {
                const v = series[0].values[i] || 0;
                el("text", { x: x0 + groupW * 0.43, y: baseY - (v / (maxV - minV)) * plotH - 5, "text-anchor": "middle", "font-size": 10, fill: "#e8f0ea" }, svg).textContent = fmt(v);
            }
        }
        else {
            series.forEach((s, j) => {
                const v = opts.unit === "pct" ? s.values[i] : s.values[i];
                if (v === undefined || v === null)
                    return;
                const hh = Math.max(1.5, ((v - minV) / span) * plotH);
                const y = padT + plotH - hh;
                const x = x0 + j * barW;
                el("rect", { x, y, width: barW * 0.86, height: hh, rx: 3, fill: PALETTE[j % PALETTE.length], opacity: 0.92 }, svg);
            });
        }
    });
}
function axisLegend(container, items) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;gap:16px;flex-wrap:wrap;margin-top:10px;font-size:12px;color:var(--muted);";
    for (const it of items) {
        const s = document.createElement("span");
        s.style.cssText = "display:inline-flex;align-items:center;gap:6px;";
        s.innerHTML = `<span style="width:11px;height:11px;border-radius:3px;background:${it.color};display:inline-block"></span>${it.label}`;
        wrap.appendChild(s);
    }
    container.appendChild(wrap);
}
function donutChart(container, items, centerLabel) {
    const size = 240, cx = size / 2, cy = size / 2, r = 82, sw = 30;
    const total = items.reduce((a, b) => a + b.value, 0) || 1;
    const svg = el("svg", { viewBox: `0 0 ${size} ${size}`, role: "img" });
    container.innerHTML = "";
    container.appendChild(svg);
    let ang = -Math.PI / 2;
    const CIRC = 2 * Math.PI * r;
    for (const it of items) {
        const frac = it.value / total;
        if (frac <= 0)
            continue;
        const len = CIRC * frac;
        const off = CIRC * (ang + Math.PI / 2) / (2 * Math.PI);
        el("circle", {
            cx, cy, r, fill: "none", stroke: it.color, "stroke-width": sw,
            "stroke-dasharray": `${len - 3} ${CIRC - len + 3}`,
            "stroke-dashoffset": -off,
            transform: `rotate(-90 ${cx} ${cy})`,
        }, svg);
        ang += frac * 2 * Math.PI;
    }
    el("text", { x: cx, y: cy - 2, "text-anchor": "middle", "font-size": 26, "font-weight": 800, fill: "#e8f0ea" }, svg).textContent = fmt(total);
    el("text", { x: cx, y: cy + 18, "text-anchor": "middle", "font-size": 11, fill: "#9ab0a3" }, svg).textContent = centerLabel;
    axisLegend(container, items.map(i => ({ label: i.label, color: i.color })));
    container.appendChild(watermarkTotal(total, centerLabel));
}
function watermarkTotal(total, label) {
    const d = document.createElement("div");
    d.style.cssText = "text-align:center;margin-top:6px;font-size:11px;color:var(--muted);";
    d.textContent = `Total: ${fmt(total)} ${label}`;
    return d;
}
function areaLineChart(container, series, opts = {}) {
    const h = opts.height || 220;
    const all = Array.from(new Set(series.flatMap(s => s.data.map(d => d.x)))).sort();
    const w = Math.max(720, all.length * 9 + 80);
    const padL = 46, padB = 30, padT = 14, padR = 14;
    const plotW = w - padL - padR, plotH = h - padT - padB;
    let maxV = 1, minV = Infinity;
    for (const s of series)
        for (const d of s.data) {
            if (d.y > maxV)
                maxV = d.y;
            if (d.y < minV)
                minV = d.y;
        }
    if (!isFinite(minV))
        minV = 0;
    if (minV > 0)
        minV = 0;
    const span = (maxV - minV) || 1;
    const svg = el("svg", { viewBox: `0 0 ${w} ${h}`, role: "img" });
    container.innerHTML = "";
    container.appendChild(svg);
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
        const val = minV + (span * i) / steps;
        const y = padT + plotH - (plotH * (val - minV)) / span;
        el("line", { x1: padL, y1: y, x2: w - padR, y2: y, stroke: "rgba(255,255,255,0.08)", "stroke-width": 1 }, svg);
        el("text", { x: padL - 8, y: y + 4, "text-anchor": "end", "font-size": 10, fill: "#9ab0a3" }, svg).textContent = fmt(val);
    }
    const xAt = (d) => padL + plotW * (all.indexOf(d) / Math.max(1, all.length - 1));
    const yAt = (v) => padT + plotH - ((v - minV) / span) * plotH;
    // x ticks (few)
    const tickEvery = Math.max(1, Math.ceil(all.length / 10));
    all.forEach((d, i) => {
        if (i % tickEvery !== 0 && i !== all.length - 1)
            return;
        el("text", { x: xAt(d), y: h - 10, "text-anchor": "middle", "font-size": 9.5, fill: "#9ab0a3" }, svg).textContent = d.slice(5);
    });
    for (const s of series) {
        // area fill
        const pts = [];
        for (const d of s.data) {
            const i = all.indexOf(d.x);
            pts.push(xAt(String(d.x)), yAt(d.y));
        }
        if (pts.length >= 4) {
            void pts;
            // build path
            const start = s.data.length ? `${xAt(s.data[0].x)},${yAt(s.data[0].y)}` : "";
            let dAttr = `M ${start} L ${s.data.slice(1).map((dd, i) => {
                const x1 = xAt(dd.x), y1 = yAt(dd.y);
                // smooth curve
                const x0 = s.data[i].x, y0 = s.data[i].y;
                const mx = (xAt(x0) + x1) / 2;
                return `C ${mx},${yAt(y0)} ${mx},${y1} ${x1},${y1}`;
            }).join(" ")}`;
            const baseY = padT + plotH;
            dAttr += ` L ${xAt(s.data[s.data.length - 1].x)},${baseY} L ${xAt(s.data[0].x)},${baseY} Z`;
            el("path", { d: dAttr, fill: s.color, opacity: 0.12 }, svg);
            el("path", { d: dAttr.replace(/\sZ$/, ""), fill: "none", stroke: s.color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
        }
    }
    axisLegend(container, series.map(s => ({ label: s.name, color: s.color })));
}
function mixedBarsArea(container, labels, bars, area, opts = {}) {
    const h = opts.height || 230;
    const w = Math.max(760, labels.length * 10 + 80);
    const padL = 46, padB = 30, padT = 14, padR = 14;
    const plotW = w - padL - padR, plotH = h - padT - padB;
    const maxA = Math.max(...area.data, 1);
    const maxB = Math.max(...bars.data, 1);
    const svg = el("svg", { viewBox: `0 0 ${w} ${h}`, role: "img" });
    container.innerHTML = "";
    container.appendChild(svg);
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
        const v = maxB * i / gridSteps;
        const y = padT + plotH - (plotH * i) / gridSteps;
        el("line", { x1: padL, y1: y, x2: w - padR, y2: y, stroke: "rgba(255,255,255,0.07)", "stroke-width": 1 }, svg);
        el("text", { x: padL - 8, y: y + 4, "text-anchor": "end", "font-size": 10, fill: "#9ab0a3" }, svg).textContent = fmt(v);
    }
    // right axis (area)
    for (let i = 0; i <= gridSteps; i++) {
        const v = maxA * i / gridSteps;
        const y = padT + plotH - (plotH * i) / gridSteps;
        el("text", { x: w - padR + 6, y: y + 4, "text-anchor": "start", "font-size": 9.5, fill: "#9ab0a3" }, svg).textContent = fmt(v);
    }
    const xAt = (i) => padL + plotW * (i / Math.max(1, labels.length - 1));
    const tickEvery = Math.max(1, Math.ceil(labels.length / 14));
    labels.forEach((lab, i) => {
        if (i % tickEvery === 0 || i === labels.length - 1) {
            el("text", { x: xAt(i), y: h - 10, "text-anchor": "middle", "font-size": 9.5, fill: "#9ab0a3" }, svg).textContent = lab.slice(5);
        }
        // bar for precipitation
        const bandW = plotW / labels.length;
        const bw = Math.min(14, bandW * 0.6);
        const bh = (bars.data[i] / maxB) * plotH;
        el("rect", { x: xAt(i) - bw / 2, y: padT + plotH - bh, width: bw, height: Math.max(0, bh), rx: 2, fill: bars.color, opacity: 0.55 }, svg);
    });
    // area path (temperature)
    const pathD = area.data.reduce((acc, v, i) => {
        const x = xAt(i), y = padT + plotH - (v / maxA) * plotH;
        return acc + (i === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
    }, "");
    el("path", { d: pathD, fill: "none", stroke: area.color, "stroke-width": 2.4, "stroke-linejoin": "round" }, svg);
    // dots
    area.data.forEach((v, i) => {
        el("circle", { cx: xAt(i), cy: padT + plotH - (v / maxA) * plotH, r: 2.2, fill: area.color }, svg);
    });
    axisLegend(container, [
        { label: opts.barLabel || "Chuva (mm)", color: bars.color },
        { label: opts.areaLabel || "Temp. média (°C)", color: area.color },
    ]);
}
function gauge(container, value, max, label) {
    const size = 210, cx = size / 2, cy = size / 2 + 6, r = 82;
    const svg = el("svg", { viewBox: `0 0 ${size} ${size}`, role: "img" });
    container.innerHTML = "";
    container.appendChild(svg);
    // background arc 270deg
    const arc = (start, end, color, width, opacity = 1) => {
        const ang = (t) => (Math.PI * (180 + t * 270)) / 180;
        el("path", {
            d: describeArc(cx, cy, r, ang(start) * 180 / Math.PI, ang(end) * 180 / Math.PI),
            fill: "none", stroke: color, "stroke-width": width, "stroke-linecap": "round", opacity,
        }, svg);
    };
    arc(0, 1, "rgba(255,255,255,0.12)", 20);
    const frac = Math.min(1, value / max);
    const col = frac > 0.75 ? "#f87171" : frac > 0.5 ? "#fbbf24" : "#34d399";
    arc(0, frac, col, 20);
    el("text", { x: cx, y: cy - 8, "text-anchor": "middle", "font-size": 38, "font-weight": 800, fill: col }, svg).textContent = `${fmt((frac * 100))}%`;
    el("text", { x: cx, y: cy + 18, "text-anchor": "middle", "font-size": 10, fill: "#9ab0a3" }, svg).textContent = label;
}
function describeArc(cx, cy, r, startAngle, endAngle) {
    const polar = (a) => {
        const rad = (a - 90) * Math.PI / 180;
        return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    };
    const [sx, sy] = polar(endAngle);
    const [ex, ey] = polar(startAngle);
    const large = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}
// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------
function renderKpis() {
    const el_ = document.getElementById("kpis");
    const kpi = (label, value, sub, cls) => `<div class="kpi ${cls}"><div class="k-label">${label}</div><div class="k-value">${value}</div><div class="k-sub">${sub}</div></div>`;
    el_.innerHTML =
        kpi("Chuva acumulada", `${fmt(D.clima.precip_total_mm, 0)} mm`, "safra nov/25–fev/26", "good") +
            kpi("Dias acima de 30°C", `${fmt(D.clima.horas_calor_acima_30, 0)} h`, "estresse térmico na janela", "warn") +
            kpi("Aplicações fora da meta", `${fmt(D.fertilizacao.pct_abaixo, 0)}%`, `${fmt(D.fertilizacao.total_abaixo, 0)} abaixo do configurado`, "bad") +
            kpi("Pressão de pulverização", `${fmt(Math.round(D.pulverizacao.pressao_media_psi))} psi`, `${fmt(D.pulverizacao.pressao_zero, 0)} registros a 0 psi`, "bad") +
            kpi("Cigarrinha capturada", `${fmt(D.pragas.especies.Cigarrinha?.total ?? 0, 0)}`, "90% das capturas · vetor de enfezamento", "bad") +
            kpi("Alertas de máquinas", `${fmt(Object.values(D.maquinas.alerts).reduce((a, b) => a + b, 0), 0)}`, "ociosidade e velocidade fora do alvo", "warn");
}
function renderCauses() {
    const el_ = document.getElementById("causes");
    const P = D.pulverizacao, F = D.fertilizacao, C = D.clima, G = D.pragas;
    const causes = [
        {
            sev: "severity-1", num: "01", sevLabel: "Crítico",
            title: "Pulverização executada com pressão ZERO (0 psi)",
            body: "As 12.8 mil leituras do mapa de pressão de pulverização registraram 0 psi — o sistema de aplicação de defensivos e adubos foliares nunca pressurizou.",
            ev: "100% dos registros · 12.863 leituras · máximo registrado 0 psi. A calda não foi aplicada nas folhas.",
        },
        {
            sev: "severity-1", num: "02", sevLabel: "Crítico",
            title: "Cigarrinha-do-milho em nível de dano (vetor de enfezamento)",
            body: "7.808 cigarrinhas (Dalbulus maidis) capturadas — vetor do complexo de enfezamentos, que causa nanismo e espigas chochas. 21 armadilhas em nível DAMAGE.",
            ev: "90,4% das capturas · picos de 1.862/dia · nível de controle (15/armadilha) muito superado.",
        },
        {
            sev: "severity-2", num: "03", sevLabel: "Alto",
            title: "Subdosagem generalizada na fertilização (−24 a −36%)",
            body: "Dose aplicada pela distribuidora ficou bem abaixo da configurada pelo agrônomo: calagem −36%, silagem −26%, plantio −24%. O solo não recebeu a nutrição planejada.",
            ev: `${fmt(F.pct_abaixo, 0)}% das 26.616 aplicações abaixo de 90% da meta · desvio médio global ${fmt(F.operacoes[0]?.desvio_pct ?? 0, 0)}%.`,
        },
        {
            sev: "severity-2", num: "04", sevLabel: "Alto",
            title: "Ociosidade excessiva das máquinas",
            body: "1.890 eventos de 'tempo máximo de motor ocioso' indicam paradas prolongadas no campo, queimando combustível e comprimindo a janela ideal de plantio/manejo.",
            ev: "1.890 eventos de ociosidade · 1.880 de velocidade fora do padrão · concentrados no plantio do milho.",
        },
        {
            sev: "severity-3", num: "05", sevLabel: "Médio",
            title: "Estresse térmico e chuva mal distribuída",
            body: "368 horas acima de 30°C (verão atípico) e chuva concentrada em poucos dias (203,4 mm só em dez/09–14), criando déficit hídrico na floração.",
            ev: "368 h >30°C · 4 eventos de chuva extrema ≥50 mm/dia · 57 dias de chuva em 117 dias.",
        },
    ];
    el_.innerHTML = causes.map(c => `
    <div class="cause ${c.sev}">
      <div class="sev"><small>${c.sevLabel}</small><b>${c.num}</b></div>
      <div class="c-body"><h4>${c.title}</h4><p>${c.body}</p></div>
      <div class="ev"><span class="nm">Evidência ▸</span> ${c.ev}</div>
    </div>`).join("");
}
function renderClima() {
    const C = D.clima;
    const chuvas = document.getElementById("chart-chuva-mes");
    const temps = document.getElementById("chart-temp-mes");
    const diario = document.getElementById("chart-clima-diario");
    const meses = Object.keys(C.precip_por_mes).map(m => m.slice(0, 7));
    const chuvaV = meses.map(m => C.precip_por_mes[m] || 0);
    barChart(chuvas, meses.map(m => { const [y, mo] = m.split("-"); return `${mo}/${y}`; }), [{ label: "Chuva (mm)", values: chuvaV }], { height: 210 });
    const tempMap = C.temp_med_por_mes;
    const tempV = meses.map(m => tempMap[m] || 0);
    barChart(temps, meses.map(m => { const [y, mo] = m.split("-"); return `${mo}/${y}`; }), [{ label: "Temp. média (°C)", values: tempV }], { height: 210 });
    mixedBarsArea(diario, C.serie_diaria.map(d => d.d), { name: "Chuva", color: "#60a5fa", data: C.serie_diaria.map(d => d.prec) }, { name: "Temp média", color: "#fbbf24", data: C.serie_diaria.map(d => d.tmed) }, { height: 240, barLabel: "Chuva (mm)", areaLabel: "Temp. média (°C)" });
    const insights = document.getElementById("insights-clima");
    const ext = C.chuva_extrema_dias.slice(0, 4).map(e => `${e.d.slice(5)} (${fmt(e.mm, 0)} mm)`).join(" · ");
    insights.innerHTML = `
    <div class="insight">Chuva total: <b>${fmt(C.precip_total_mm, 0)} mm</b> em 117 dias</div>
    <div class="insight">Dias com chuva: <b>${C.dias_chuva}</b> / ${C.dias_chuva + C.dias_sem_chuva}</div>
    <div class="insight warn">Estresse térmico: <b>${fmt(C.horas_calor_acima_30, 0)} h</b> acima de 30°C</div>
    <div class="insight">Umidade rel. média: <b>${fmt(C.umid_med, 0)}%</b></div>
    <div class="insight warn">Chuva extrema: <b>${ext}</b></div>`;
}
function renderFertilizacao() {
    const F = D.fertilizacao;
    const ch = document.getElementById("chart-fert");
    const comp = document.getElementById("chart-fert-comp");
    const tab = document.getElementById("tabela-fert");
    // limit to main ops
    const topOps = F.operacoes.filter(o => o.n > 500);
    barChart(ch, topOps.map(o => o.op.length > 22 ? o.op.slice(0, 21) + "…" : o.op), [
        { label: "Dose aplicada", values: topOps.map(o => o.aplicada) },
        { label: "Dose configurada", values: topOps.map(o => o.configurada) },
    ], { height: 230 });
    barChart(comp, ["Abaixo da meta", "Dentro da meta", "Acima da meta"], [{ label: "Aplicações", values: [F.total_abaixo, F.total_ok, F.operacoes.reduce((a, o) => a + o.acima, 0)] }], { height: 210 });
    tab.innerHTML = `
    <tr><th>Operação</th><th>Registros</th><th class="num">Aplicada kg/ha</th><th class="num">Configurada kg/ha</th>
    <th class="num">Desvio</th><th>Área (ha)</th><th>Peso (kg)</th></tr>
    ${F.operacoes.map(o => `
      <tr>
        <td>${o.op}</td><td>${fmt(o.n, 0)}</td>
        <td class="num">${fmt(o.aplicada, 0)}</td><td class="num">${fmt(o.configurada, 0)}</td>
        <td class="num"><span class="tag ${Math.abs(o.desvio_pct) > 20 ? "red" : Math.abs(o.desvio_pct) > 10 ? "amber" : "green"}">${o.desvio_pct > 0 ? "+" : ""}${fmt(o.desvio_pct, 1)}%</span></td>
        <td class="num">${fmt(o.area_ha, 1)}</td><td class="num">${fmt(o.peso_kg, 0)}</td>
      </tr>`).join("")}
  `;
    axisLegend(ch, [
        { label: "Dose aplicada", color: PALETTE[0] },
        { label: "Dose configurada", color: PALETTE[1] },
    ]);
    const insights = document.getElementById("insights-fert");
    insights.innerHTML = `
    <div class="insight danger">Execução: <b>${fmt(F.total_abaixo, 0)} de ${fmt(F.total_registros, 0)}</b> aplicações abaixo da meta (${fmt(F.pct_abaixo, 0)}%)</div>
    <div class="insight">Calagem: <b>−36%</b> · Gessagem: <b>−23%</b></div>
    <div class="insight">Plantio grão: <b>−24%</b> · Plantio silagem: <b>−26%</b></div>
    <div class="insight">Área total tratada: <b>${fmt(F.area_total_ha, 1)} ha</b> · ${fmt(F.peso_total_kg, 0)} kg de insumos</div>`;
}
function renderPulverizacao() {
    const P = D.pulverizacao;
    const ch = document.getElementById("chart-pressure");
    const ops = document.getElementById("chart-spray-ops");
    const banner = document.getElementById("banner-pressure");
    barChart(ch, ["Média", "Máxima"], [{ label: "Pressão (psi)", values: [P.pressao_media_psi, P.pressao_max_psi] }], { height: 200, yMin: 0 });
    const opEntries = Object.entries(P.ops);
    barChart(ops, opEntries.map(o => o[0].length > 22 ? o[0].slice(0, 21) + "…" : o[0]), [{ label: "Registros", values: opEntries.map(o => o[1]) }], { height: 210 });
    banner.innerHTML = `
    <h4>⚠ Falha crítica de aplicação detectada</h4>
    <p>
      <span>100% dos ${fmt(P.total_registros, 0)} registros</span> de telemetria de pulverização
      (período ${P.inicio.replace(/-/g, "/")} a ${P.fim.replace(/-/g, "/")}) acusam <span>0 psi</span> de pressão no sistema hidráulico.
      Isso indica que a bomba não pressurizou e <span>nenhum princípio ativo foi depositado</span> nas plantas —
      explicando por que o controle químico de cigarrinha e de foliares não teve efeito em campo.
    </p>`;
    const insights = document.getElementById("insights-spray");
    insights.innerHTML = `
    <div class="insight danger">Pressão zero: <b>${fmt(P.pressao_zero, 0)} de ${fmt(P.total_registros, 0)}</b> leituras</div>
    <div class="insight danger">Cobertura de adubo foliar: <b>7.649</b> registros sem pressão</div>
    <div class="insight danger">Aplicação de inseticida+foliar: <b>4.493</b> registros sem pressão</div>
    <div class="insight">Janela monitorada: <b>${P.inicio}</b> a <b>${P.fim}</b></div>`;
}
function renderMaquinas() {
    const M = D.maquinas;
    const ch = document.getElementById("chart-alerts");
    const op = document.getElementById("chart-alerts-op");
    const alertEntries = Object.entries(M.alerts).sort((a, b) => b[1] - a[1]);
    barChart(ch, alertEntries.map(a => a[0].length > 24 ? a[0].slice(0, 23) + "…" : a[0]), [{ label: "Ocorrências", values: alertEntries.map(a => a[1]) }], { height: 220 });
    const opEntries = Object.entries(M.alerts_por_op).sort((a, b) => b[1] - a[1]).slice(0, 8);
    barChart(op, opEntries.map(o => o[0].length > 21 ? o[0].slice(0, 20) + "…" : o[0]), [{ label: "Alertas", values: opEntries.map(o => o[1]) }], { height: 220 });
    const insights = document.getElementById("insights-maquinas");
    const total = Object.values(M.alerts).reduce((a, b) => a + b, 0);
    insights.innerHTML = `
    <div class="insight warn">Total de alertas: <b>${fmt(total, 0)}</b></div>
    <div class="insight">Motor ocioso: <b>${fmt(M.alerts["Tempo Máximo de Motor Ocioso"] || 0, 0)}</b> eventos</div>
    <div class="insight">Velocidade na operação: <b>${fmt(M.alerts["Velocidade na Operação"] || 0, 0)}</b> eventos · média ${M.velocidade_med_kmh ? fmt(M.velocidade_med_kmh, 1) + " km/h" : "—"}</div>
    <div class="insight">Rotação do motor em deslocamento: <b>${fmt(M.alerts["Rotação do Motor em Deslocamento"] || 0, 0)}</b></div>
    <div class="insight">Foco no plantio do milho grão: <b>${fmt(M.alerts_por_op["PLANTIO MILHO GRÃO"] || 0, 0)}</b> alertas</div>`;
}
function renderPragas() {
    const G = D.pragas;
    const donut = document.getElementById("chart-pragas-donut");
    const serie = document.getElementById("chart-pragas-serie");
    const nivel = document.getElementById("chart-pragas-nivel");
    const cols = {
        Cigarrinha: "#f87171", Spodoptera: "#f59e0b", Helicoverpa: "#34d399", Vaquinha: "#60a5fa",
    };
    const spec = Object.entries(G.especies).sort((a, b) => b[1].total - a[1].total);
    donutChart(donut, spec.map(([n, v]) => ({ label: n, value: v.total, color: cols[n] || "#a78bfa" }))
        .concat(spec.length === 0 ? [] : [{ label: "Outros", value: 0, color: "#444" }]), "insetos");
    areaLineChart(serie, [{ name: "Insetos/dia", color: "#f87171", data: G.serie_diaria.map(d => ({ x: d.d, y: d.count })) }], { height: 220 });
    const levelOrder = ["DAMAGE", "ALERT", "CONTROL", "LOW"];
    const levelCols = { DAMAGE: "#f87171", ALERT: "#fbbf24", CONTROL: "#f59e0b", LOW: "#34d399" };
    const levelVals = levelOrder.map(l => ({ label: l, values: [G.niveis_contagem[l] || 0] }));
    const allLevels = levelVals.filter(v => v.values[0] > 0);
    barChart(nivel, allLevels.map(l => l.label), [{ label: "Armadilhas", values: allLevels.map(l => l.values[0]) }], { height: 200 });
    axisLegend(nivel, allLevels.map((l, i) => ({ label: l.label, color: levelCols[l.label] || PALETTE[i] })));
    const insights = document.getElementById("insights-pragas");
    const ciga = G.especies.Cigarrinha;
    insights.innerHTML = `
    <div class="insight danger">Cigarrinha: <b>${fmt(ciga?.total ?? 0, 0)}</b> capturas (${ciga ? fmt((ciga.total / G.insetos_total) * 100, 0) : 0}% do total)</div>
    <div class="insight">Spodoptera: <b>${fmt(G.especies.Spodoptera?.total ?? 0, 0)}</b> · Helicoverpa: <b>${fmt(G.especies.Helicoverpa?.total ?? 0, 0)}</b></div>
    <div class="insight warn">Nível DAMAGE: <b>${G.niveis_contagem["DAMAGE"] || 0}</b> armadilhas acima do limiar</div>
    <div class="insight">Eventos de monitoramento: <b>${fmt(G.eventos_total, 0)}</b></div>
    <div class="insight">OBS: nível de ação para cigarrinha é <b>≥15/adultos</b> por armadilha amarela — limiar muito superado.</div>`;
}
function renderRecos() {
    const el_ = document.getElementById("recomendacoes");
    const recos = [
        {
            prio: "p1", n: "P1",
            title: "Calibração imediata do sistema de pulverização",
            body: "Diagnosticar bomba, bicos e sensores de pressão (0 psi em toda a série). Realizar teste de deposição com papéis hidrossensíveis e aferir vazão real por hectare. Nunca operar pulverização sem conferência prévia de pressão e vazão.",
        },
        {
            prio: "p1", n: "P1",
            title: "Revisar a regulagem da distribuidora de fertilizantes (rate control)",
            body: "Aplicação 24–36% abaixo do configurado indica erro de calibração do controlador de taxa (rate controller) e/ou rotação da TDP. Recalibrar com balança de pesagem real, validar em linha e refazer análise de solo antes do próximo plantio.",
        },
        {
            prio: "p1", n: "P1",
            title: "Controle emergencial da cigarrinha-do-milho (Dalbulus maidis)",
            body: "População 90% acima do limiar e sem controle químico efetivo. Aplicar inseticidas registrados de solo/foliar e, se houver áreas não viáveis, considerar o manejo integrado: destruição de tigüera (milho voluntário), escalonamento de plantio e uso de híbridos tolerantes ao enfezamento.",
        },
        {
            prio: "p2", n: "P2",
            title: "Reduzir ociosidade e otimizar janelas operacionais",
            body: "1.890 eventos de motor ocioso = horas perdidas na janela ideal de plantio/manejo. Criar protocolos de startup, fila de operações e telemetria em tempo real com alertas de ineficiência. Monitorar velocidade de plantio (ficou em ~1,7–1,9 km/h) versus recomendada pelo fabricante da semeadora.",
        },
        {
            prio: "p2", n: "P2",
            title: "Planejamento agronômico guiado por clima (IA/meteorologia)",
            body: "Chuva concentrada (203 mm em 6 dias) e 368 horas acima de 30°C. Usar previsão de curto prazo para programar pulverização foliar e irrigação suplementar no florescimento. Acompanhar índice de estresse hídrico (CWSI) via imagens de satélite.",
        },
        {
            prio: "p3", n: "P3",
            title: "Governança de dados: dashboard de eficiência de aplicação",
            body: "Integrar em API única os dados de máquina (ISO-XML/telemetria), estação meteorológica e armadilhas IoT. Criar alarmes automáticos quando pressão < 100 psi, dose < 90% do alvo ou cigarrinha > 15/armadilha — com fechamento de ordens de serviço digitais.",
        },
    ];
    el_.innerHTML = recos.map(r => `
    <div class="reco">
      <div class="prio ${r.prio}">${r.n}</div>
      <div><h4>${r.title}</h4><p>${r.body}</p></div>
    </div>`).join("");
}
function renderGauge() {
    gauge(document.getElementById("prod-gauge"), 78, 100, "risco alto");
}
// ---------------------------------------------------------------------------
// Export PDF (via impressão do navegador + CSS de impressão dedicado)
// ---------------------------------------------------------------------------
function bindExport() {
    const btn = document.getElementById("btn-export");
    if (!btn)
        return;
    btn.addEventListener("click", () => {
        document.body.classList.add("printing");
        window.print();
        document.body.classList.remove("printing");
    });
}
// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
if (!window.DATA) {
    document.getElementById("hero").innerHTML = `
    <div class="hero-content"><h2>Dados não carregados</h2>
    <p class="hero-text">Execute <code>npm run build</code> para gerar <code>js/data.js</code> e <code>js/main.js</code>.</p></div>`;
}
else {
    renderGauge();
    renderKpis();
    renderCauses();
    renderClima();
    renderFertilizacao();
    renderPulverizacao();
    renderMaquinas();
    renderPragas();
    renderRecos();
}
bindExport();
