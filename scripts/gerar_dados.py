# -*- coding: utf-8 -*-
import json, os
import pandas as pd
import numpy as np

DATA = "data"
os.makedirs("src", exist_ok=True)

def load(name):
    for enc in ("utf-8-sig", "latin-1", "cp1252"):
        try:
            return pd.read_csv(os.path.join(DATA, name), sep=";", encoding=enc, low_memory=False)
        except Exception:
            continue

def tonum(s):
    return pd.to_numeric(s.astype(str).str.replace(",", "."), errors="coerce")

def col(df, sub):
    for c in df.columns:
        if sub in c:
            return c
    return None

out = {}

# ---------------- CLIMA ----------------
clima = load("Cópia de Relatório Horário de 01-11-2025 - 25-02-2026 - GMT - 03h00.csv")
for nm, sub in [("rad","Radiação Solar"),("prec","Precipita"),("wind","Vel do Vento Média"),
                ("tmin","Temp. Mínima"),("tmed","Temp. Média"),("tmax","Temp. Máxima"),
                ("umid","Umidade Rel. Média"),("umidmin","Umidade Rel. Mín."),("raj","Rajada")]:
    clima[nm] = tonum(clima[col(clima, sub)])
clima["dt"] = pd.to_datetime(clima.iloc[:,0].str.split(" / ").str[0], format="%d/%m/%Y - %H:%M", errors="coerce")
clima["dia"] = clima["dt"].dt.date
clima["mes"] = clima["dt"].dt.to_period("M").astype(str)

dia = clima.groupby("dia").agg(
    tmin=("tmin","min"), tmed=("tmed","mean"), tmax=("tmax","max"),
    prec=("prec","sum"), rad=("rad","mean"), umid=("umid","mean"),
    wind=("wind","mean"), raj=("raj","max")).reset_index()

out["clima"] = {
    "inicio": str(clima["dt"].min())[:10], "fim": str(clima["dt"].max())[:10],
    "precip_total_mm": round(float(clima["prec"].sum()),1),
    "precip_por_mes": {str(k): round(float(v),1) for k,v in clima.groupby("mes")["prec"].sum().to_dict().items()},
    "dias_chuva": int((dia["prec"]>0).sum()),
    "dias_sem_chuva": int((dia["prec"]==0).sum()),
    "dias_chuva_total": int((clima.groupby(clima["dia"]).size().iloc[:0]).size),
    "temp_med": round(float(clima["tmed"].mean()),1),
    "temp_max_abs": round(float(clima["tmax"].max()),1),
    "temp_min_abs": round(float(clima["tmin"].min()),1),
    "horas_calor_acima_30": int((clima["tmax"]>30).sum()),
    "horas_calor_acima_35": int((clima["tmax"]>35).sum()),
    "umid_med": round(float(clima["umid"].mean()),1),
    "horas_umid_abaixo_40": int((clima["umidmin"]<40).sum()),
    "rad_med": round(float(clima["rad"].mean()),1),
    "vento_med": round(float(clima["wind"].mean()),1),
    "rajada_max": round(float(clima["raj"].max()),1),
    "serie_diaria": [
        {"d": str(r["dia"]), "tmin": round(r["tmin"],1), "tmed": round(r["tmed"],1),
         "tmax": round(r["tmax"],1), "prec": round(r["prec"],1),
         "rad": round(r["rad"],1), "umid": round(r["umid"],1), "wind": round(r["wind"],1)}
        for r in dia.to_dict("records")
    ],
    "temp_med_por_mes": {str(k): round(float(v),1) for k,v in clima.groupby("mes")["tmed"].mean().to_dict().items()},
    "chuva_extrema_dias": sorted(
        [{"d": str(r["dia"]), "mm": round(r["prec"],1)} for r in dia.to_dict("records") if r["prec"]>=50],
        key=lambda x: -x["mm"]),
}

# ---------------- FERTILIZACAO ----------------
fert = load("Cópia de LAYER_MAP_FERTILIZATION.csv")
fert["dt"] = pd.to_datetime(fert[col(fert,"Date Time")], format="%d/%m/%Y %H:%M:%S", errors="coerce")
fert["applied"] = tonum(fert[col(fert,"AppliedDos")])
fert["configured"] = tonum(fert[col(fert,"Configured")])
fert["weight"] = tonum(fert[col(fert,"Weight")])
fert["area"] = tonum(fert[col(fert,"Area - ha")])
fert["op"] = fert[col(fert,"operation")]
fert["diff_rel"] = (fert["applied"]/fert["configured"]-1)*100

ops = []
for op, g in fert.groupby("op"):
    ops.append({
        "op": str(op), "n": int(len(g)),
        "aplicada": round(float(g["applied"].mean()),1),
        "configurada": round(float(g["configured"].mean()),1),
        "desvio_pct": round(float(g["apply_"+"diff"].mean()) if False else float((g["applied"].mean()/g["configured"].mean()-1)*100),1),
        "area_ha": round(float(g["area"].sum()),1),
        "peso_kg": round(float(g["weight"].sum()),0),
        "abaixo": int((g["applied"] < g["configured"]*0.9).sum()),
        "ok": int(((g["applied"] >= g["configured"]*0.9) & (g["applied"] <= g["configured"]*1.1)).sum()),
        "acima": int((g["applied"] > g["configured"]*1.1).sum()),
    })
total_abaixo = int((fert["applied"] < fert["configured"]*0.9).sum())
total_ok = int(((fert["applied"]>=fert["configured"]*0.9)&(fert["applied"]<=fert["configured"]*1.1)).sum())
out["fertilizacao"] = {
    "inicio": str(fert["dt"].min())[:10], "fim": str(fert["dt"].max())[:10],
    "total_registros": int(len(fert)),
    "area_total_ha": round(float(fert["area"].sum()),1),
    "peso_total_kg": round(float(fert["weight"].sum()),0),
    "operacoes": ops,
    "total_abaixo": total_abaixo, "total_ok": total_ok,
    "pct_abaixo": round(total_abaixo/len(fert)*100,1),
    "pct_ok": round(total_ok/len(fert)*100,1),
}

# ---------------- ALERTAS / MAQUINAS ----------------
alert = load("Cópia de LAYER_MAP_PARAMETERIZED_ALERT.csv")
alert["dt"] = pd.to_datetime(alert[col(alert,"Date Time")], format="%d/%m/%Y %H:%M:%S", errors="coerce")
alert["Alert"] = alert[col(alert,"Alert")]
alert["Operation"] = alert[col(alert,"Operation")]
alert["Valor"] = tonum(alert[col(alert,"Valor")])

speed = alert[alert["Alert"].str.contains("Velocidade", na=False)]
rot = alert[alert["Alert"].str.contains("Rotação", na=False)]
idle = alert[alert["Alert"].str.contains("Ocioso", na=False)]
out["maquinas"] = {
    "inicio": str(alert["dt"].min())[:10], "fim": str(alert["dt"].max())[:10],
    "alerts": {str(k): int(v) for k,v in alert["Alert"].value_counts().to_dict().items()},
    "alerts_por_op": {str(k): int(v) for k,v in alert["Operation"].value_counts().to_dict().items()},
    "velocidade_med_kmh": round(float(speed["Valor"].mean()),2) if len(speed) else None,
    "rotacao_med_rpm": round(float(rot["Valor"].mean())) if len(rot) else None,
    "vel_por_op": {str(k): round(float(v),2) for k,v in speed.groupby("Operation")["Valor"].mean().to_dict().items()},
    "operacoes": alert["Operation"].value_counts().to_dict(),
}

# ---------------- PULVERIZACAO ----------------
spray = load("Cópia de LAYER_MAP_SPRAY_PRESSURE.csv")
spray["dt"] = pd.to_datetime(spray[col(spray,"Date Time")], format="%d/%m/%Y %H:%M:%S", errors="coerce")
spray["P"] = tonum(spray[col(spray,"Pressure - psi")])
spray["Operation"] = spray[col(spray,"Operation")]
out["pulverizacao"] = {
    "inicio": str(spray["dt"].min())[:10], "fim": str(spray["dt"].max())[:10],
    "total_registros": int(len(spray)),
    "pressao_zero": int((spray["P"]==0).sum()),
    "pressao_media_psi": round(float(spray["P"].mean()),2),
    "pressao_max_psi": round(float(spray["P"].max()),2),
    "ops": {str(k): int(v) for k,v in spray["Operation"].value_counts().to_dict().items()},
    "pressao_media_por_op": {str(k): round(float(v),2) for k,v in spray.groupby("Operation")["P"].mean().to_dict().items()},
}

# ---------------- PRAGAS / ARMADILHAS ----------------
te = load("Cópia de traps_events.csv")
def parse_count(s):
    m = re.search(r"(\d+)\s+([A-Za-z]+)", str(s))
    if m: return int(m.group(1)), m.group(2)
    return 0, None
import re
parsed = te["detection"].map(parse_count)
te["num"] = [p[0] for p in parsed]
te["sp"] = [p[1] for p in parsed]
te["createdAt"] = pd.to_datetime(te["createdAt"], errors="coerce")
te["dia"] = te["createdAt"].dt.date

sp_sum = {}
for sp, g in te[te["num"]>0].groupby("sp"):
    sp_sum[str(sp)] = {"total": int(g["num"].sum()), "eventos": int(len(g))}

serie = sorted([{"d": str(k), "count": int(v)} for k,v in te.groupby("dia")["num"].sum().to_dict().items()], key=lambda x: x["d"])

td = load("Cópia de traps_data.csv")
td["pestCount"] = tonum(td[col(td,"pestCount")])
# nivel por armadilha (mais recente)
td["createdAt"] = pd.to_datetime(td[col(td,"createdAt")], errors="coerce")
td = td.sort_values("createdAt")
level = {}
for _, r in td.dropna(subset=[col(td,"trapInfestationLevel")]).iterrows():
    level[str(r[col(td,"trapCode")])] = str(r[col(td,"trapInfestationLevel")])

out["pragas"] = {
    "eventos_total": int(len(te)),
    "insetos_total": int(te["num"].sum()),
    "especies": sp_sum,
    "serie_diaria": serie,
    "nivel_armadilhas": level,
    "niveis_contagem": {str(k): int(v) for k,v in td[col(td,"trapInfestationLevel")].value_counts().to_dict().items()},
}

# ---------------- STOP REASONS ----------------
sr = load("Cópia de stop_reasons.csv")
sra = load("Cópia de stop_reasons_activities.csv")
def pick(df, subs):
    for c in df.columns:
        for s in subs:
            if s in c: return c
    return df.columns[-1]
out["paradas"] = {
    "motivos": sr[[pick(sr,["stopReasonName"]), pick(sr,["stopReasonType"]), pick(sr,["stopReasonProductive"])]].drop_duplicates().to_dict("records"),
    "atividades": sra[pick(sra,["agriculturalActivityName"])].drop_duplicates().tolist(),
}

# write classic-script JS-compatible TS (works when opened directly via file://)
lines = ["// Dados processados dos CSVs do projeto (Agronomy 4.0) - gerado automaticamente",
         "// Nao editar manualmente. Regenerar com scripts/gerar_dados.py",
         "// Expose como variavel global para compatibilidade de carregamento por <script> classico.",
         "const DATA = " + json.dumps(out, ensure_ascii=False, indent=1) + ";",
         "(window as any).DATA = DATA;"]
with open("src/data.ts", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("OK - src/data.ts gerado. Tamanho:", os.path.getsize("src/data.ts"), "bytes")
print("Chaves:", list(out.keys()))
print("Resumo pragas:", out["pragas"]["especies"])
print("Niveis:", out["pragas"]["niveis_contagem"])
print("Clima, chuva extrema:", out["clima"]["chuva_extrema_dias"])
print("Fert ops:", [(o["op"], o["desvio_pct"]) for o in out["fertilizacao"]["operacoes"]])