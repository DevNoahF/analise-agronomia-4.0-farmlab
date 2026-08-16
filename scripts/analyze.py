# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np
import json, os, re

DATA = "data"
OUT = "scripts/out"
os.makedirs(OUT, exist_ok=True)

def load(name):
    path = os.path.join(DATA, name)
    for enc in ("utf-8-sig", "latin-1", "cp1252"):
        try:
            return pd.read_csv(path, sep=";", encoding=enc, low_memory=False)
        except Exception:
            continue
    return None

def dump(obj, name):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1, default=str)

results = {}

# ================= CLIMA =================
clima = load("Cópia de Relatório Horário de 01-11-2025 - 25-02-2026 - GMT - 03h00.csv")
cols = clima.columns.tolist()
CI = {c: i for i, c in enumerate(cols)}
def col(sub):
    for c, i in CI.items():
        if sub in c:
            return i
    return None

def tonum(series):
    return pd.to_numeric(series.astype(str).str.replace(",", "."), errors="coerce")

rad_i, prec_i, wind_i, tmin_i, tmed_i, tmax_i = [col(s) for s in
    ("Radiação", "Precipita", "Vel do Vento Média", "Temp. Mínima", "Temp. Média", "Temp. Máxima")]
umid_med_i = col("Umidade Rel. Média")
raj_i = col("Rajada")
eto_i = col("Evapotranspira")

for i, nm in [(rad_i,"rad"),(prec_i,"prec"),(wind_i,"wind"),(tmin_i,"tmin"),(tmed_i,"tmed"),(tmax_i,"tmax"),(umid_med_i,"umid"),(raj_i,"raj"),(eto_i,"eto")]:
    clima[nm] = tonum(clima.iloc[:, i])

clima["dt"] = pd.to_datetime(clima.iloc[:, 0].str.split(" / ").str[0], format="%d/%m/%Y - %H:%M", errors="coerce")
clima["dia"] = clima["dt"].dt.date

dia = clima.groupby("dia").agg(
    tmin=("tmin","min"), tmed=("tmed","mean"), tmax=("tmax","max"),
    prec=("prec","sum"), rad=("rad","mean"), umid=("umid","mean"),
    wind=("wind","mean"), raj=("raj","max"), eto=("eto","sum")).reset_index()

results["clima"] = {
    "shape": list(clima.shape),
    "inicio": str(clima["dt"].min()),
    "fim": str(clima["dt"].max()),
    "total_mm": float(clima["prec"].sum()),
    "dias": len(dia),
    "dias_chuva": int((dia["prec"]>0).sum()),
    "precipitacao_media_hora": float(clima["prec"].mean()),
    "tmed_media": float(clima["tmed"].mean()),
    "tmax_media": float(clima["tmax"].mean()),
    "tmin_media": float(clima["tmin"].mean()),
    "umid_media": float(clima["umid"].mean()),
    "rad_media": float(clima["rad"].mean()),
    "vento_medio": float(clima["wind"].mean()),
    "eto_total": float(dia["eto"].sum()),
    "temp_acima_30": int((clima["tmax"]>30).sum()),
    "umid_abaixo_30": int((clima["tmin"]<30).sum()),
    "chuvas_por_mes": {str(k): v for k, v in clima.groupby(clima["dt"].dt.to_period("M"))["prec"].sum().to_dict().items()},
    "dias": dia.to_dict(orient="records"),
}

# ================= FERTILIZACAO =================
fert = load("Cópia de LAYER_MAP_FERTILIZATION.csv")
fcols = fert.columns.tolist()
def fcol(sub):
    for c in fcols:
        if sub in c:
            return c
    return None
fert["dt"] = pd.to_datetime(fert[fcol("Date Time")], format="%d/%m/%Y %H:%M:%S", errors="coerce")
fert["AppliedDos"] = pd.to_numeric(fert[fcol("AppliedDos")], errors="coerce")
fert["Configured"] = pd.to_numeric(fert[fcol("Configured")], errors="coerce")
fert["Weight"] = pd.to_numeric(fert[fcol("Weight")], errors="coerce")
fert["Area"] = pd.to_numeric(fert[fcol("Area - ha")], errors="coerce")
fert["diff"] = fert["AppliedDos"] - fert["Configured"]

res_fert = {
    "shape": list(fert.shape),
    "inicio": str(fert["dt"].min()),
    "fim": str(fert["dt"].max()),
    "operações": fert[fcol("operation")].value_counts().to_dict(),
    "area_total_ha": float(fert["Area"].sum()),
    "peso_total_kg": float(fert["Weight"].sum()),
    "dose_aplicada_media": float(fert["AppliedDos"].mean()),
    "dose_configurada_media": float(fert["Configured"].mean()),
    "aplicacoes_abaixo_config": int((fert["diff"] < -1).sum()),
    "aplicacoes_acima_config": int((fert["diff"] > 1).sum()),
    "aplicacoes_ok": int((fert["diff"].abs() <= 1).sum()),
    "media_diff_por_op": fert.groupby(fcol("operation"))["diff"].mean().to_dict(),
    "doses_op": fert.groupby(fcol("operation")).agg(
        applied=("AppliedDos","mean"), configured=("Configured","mean"), n=("AppliedDos","count")).to_dict(orient="records"),
}
# serialize op names as list of records
res_fert["doses_op_list"] = fert.groupby(fcol("operation")).agg(
    applied=("AppliedDos", "mean"), configured=("Configured", "mean"), n=("AppliedDos", "count")
).reset_index().rename(columns={fcol("operation"): "op"}).to_dict(orient="records")
tro = fert[fcol("operation")].value_counts()
res_fert["ops_list"] = [{"op": k, "n": int(v)} for k, v in tro.items()]
results["fertilizacao"] = res_fert

# ================= ALERTAS =====================
alert = load("Cópia de LAYER_MAP_PARAMETERIZED_ALERT.csv")
acols = alert.columns.tolist()
def acol(sub):
    for c in acols:
        if sub in c:
            return c
    return None
alert["dt"] = pd.to_datetime(alert[acol("Date Time")], format="%d/%m/%Y %H:%M:%S", errors="coerce")
alert["Valor"] = pd.to_numeric(alert[acol("Valor")], errors="coerce")
alert["Duration"] = pd.to_numeric(alert[acol("Duration")], errors="coerce")
results["alertas"] = {
    "shape": list(alert.shape),
    "inicio": str(alert["dt"].min()),
    "fim": str(alert["dt"].max()),
    "alerts": alert[acol("Alert")].value_counts().to_dict(),
    "operations": alert[acol("Operation")].value_counts().to_dict(),
    "stop_reasons": alert[acol("Reason for stopping")].value_counts().to_dict(),
    "total_stop_reasons": int(alert[acol("Reason for stopping")].notna().sum()),
    "alert_por_op": {str(k): {str(k2): v2 for k2, v2 in v.items()} for k, v in alert.groupby(acol("Operation"))[acol("Alert")].value_counts().unstack(fill_value=0).to_dict().items()},
}

# ================= SPRAY PRESSURE ==============
spray = load("Cópia de LAYER_MAP_SPRAY_PRESSURE.csv")
scols = spray.columns.tolist()
def scol(sub):
    for c in scols:
        if sub in c:
            return c
    return None
spray["dt"] = pd.to_datetime(spray[scol("Date Time")], format="%d/%m/%Y %H:%M:%S", errors="coerce")
spray["Pressure"] = pd.to_numeric(spray[scol("Pressure - psi")], errors="coerce")
spray["Machine"] = spray[scol("Machine")].astype(str)
results["pulverizacao"] = {
    "shape": list(spray.shape),
    "inicio": str(spray["dt"].min()),
    "fim": str(spray["dt"].max()),
    "pressao_media_psi": float(spray["Pressure"].mean()),
    "pressao_min_psi": float(spray["Pressure"].min()),
    "pressao_max_psi": float(spray["Pressure"].max()),
    "pressao_zero": int((spray["Pressure"]==0).sum()),
    "pressao_abaixo_100": int((spray["Pressure"]<100).sum()),
    "pressao_abaixo_150": int((spray["Pressure"]<150).sum()),
    "pressao_media_por_op": spray.groupby(scol("Operation"))["Pressure"].mean().to_dict(),
    "ops": spray[scol("Operation")].value_counts().to_dict(),
}

# ================= PESTES / ARMADILHAS ==========
trl = load("Cópia de traps_list.csv")
td = load("Cópia de traps_data.csv")
te = load("Cópia de traps_events.csv")

def parse_count(s):
    s = str(s)
    m = re.search(r"(\d+)\s+([A-Za-z]+)", s)
    if m:
        return int(m.group(1)), m.group(2)
    return 0, None

te["num"], te["sp"] = zip(*te["detection"].map(parse_count))
te["createdAt"] = pd.to_datetime(te["createdAt"], errors="coerce")
te["dia"] = te["createdAt"].dt.date

results["pragas"] = {
    "traps": trl[["code","type","plot","status"]].to_dict(orient="records"),
    "traps_dados": td[["trapCode","pestCount","trapInfestationLevel","trapStatus","primaryPest","culture"]].to_dict(orient="records"),
    "eventos_total": int(len(te)),
    "pestCount_total": int(te["pestCount"].sum()),
    "eventos_por_dia": {str(k): int(v) for k, v in te.groupby("dia")["pestCount"].sum().astype(int).to_dict().items()},
    "species_contagem": te.groupby("sp")["num"].agg(["count","sum"]).to_dict(orient="index"),
    "pragas_list": load("Cópia de pest_list.csv").to_dict(orient="records"),
    "pragas_detalhes": load("Cópia de pest_details.csv")[["namePopular","classification","damage","control","alert","culture"]].to_dict(orient="records"),
}

# ================= STOP REASONS ================
sr = load("Cópia de stop_reasons.csv")
sra = load("Cópia de stop_reasons_activities.csv")
join_col = "idStopReason" if "idStopReason" in sra.columns else sra.columns[-1]
results["paradas"] = {
    "resumo": sr[["stopReasonNumber","stopReasonName","stopReasonType","stopReasonProductive"]].to_dict(orient="records"),
    "atividades": sra.to_dict(orient="records"),
}

dump(results, "analysis.json")
print("OK. Arquivos:", len(results))
for k in results:
    print("-", k, "keys:", len(results[k]))