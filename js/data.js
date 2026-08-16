"use strict";
// Dados processados dos CSVs do projeto (Agronomy 4.0) - gerado automaticamente
// Nao editar manualmente. Regenerar com scripts/gerar_dados.py
// Expose como variavel global para compatibilidade de carregamento por <script> classico.
const DATA = {
    "clima": {
        "inicio": "2025-11-01",
        "fim": "2026-02-25",
        "precip_total_mm": 748.2,
        "precip_por_mes": {
            "2025-11": 102.2,
            "2025-12": 320.2,
            "2026-01": 102.4,
            "2026-02": 223.4
        },
        "dias_chuva": 57,
        "dias_sem_chuva": 60,
        "dias_chuva_total": 0,
        "temp_med": 24.1,
        "temp_max_abs": 35.9,
        "temp_min_abs": 13.6,
        "horas_calor_acima_30": 368,
        "horas_calor_acima_35": 7,
        "umid_med": 77.2,
        "horas_umid_abaixo_40": 146,
        "rad_med": 237.9,
        "vento_med": 5.2,
        "rajada_max": 51.5,
        "serie_diaria": [
            {
                "d": "2025-11-01",
                "tmin": 19.1,
                "tmed": 24.0,
                "tmax": 30.4,
                "prec": 0.0,
                "rad": 228.1,
                "umid": 75.9,
                "wind": 6.1
            },
            {
                "d": "2025-11-02",
                "tmin": 17.7,
                "tmed": 20.1,
                "tmax": 23.1,
                "prec": 20.8,
                "rad": 69.0,
                "umid": 95.8,
                "wind": 5.9
            },
            {
                "d": "2025-11-03",
                "tmin": 18.9,
                "tmed": 22.9,
                "tmax": 28.6,
                "prec": 4.0,
                "rad": 217.8,
                "umid": 87.8,
                "wind": 7.9
            },
            {
                "d": "2025-11-04",
                "tmin": 20.8,
                "tmed": 26.2,
                "tmax": 32.1,
                "prec": 0.0,
                "rad": 289.4,
                "umid": 76.0,
                "wind": 6.7
            },
            {
                "d": "2025-11-05",
                "tmin": 18.9,
                "tmed": 21.5,
                "tmax": 25.3,
                "prec": 20.0,
                "rad": 61.0,
                "umid": 93.8,
                "wind": 4.8
            },
            {
                "d": "2025-11-06",
                "tmin": 17.8,
                "tmed": 21.9,
                "tmax": 28.5,
                "prec": 0.2,
                "rad": 266.3,
                "umid": 82.8,
                "wind": 5.8
            },
            {
                "d": "2025-11-07",
                "tmin": 14.9,
                "tmed": 24.0,
                "tmax": 32.2,
                "prec": 0.0,
                "rad": 325.8,
                "umid": 65.6,
                "wind": 7.8
            },
            {
                "d": "2025-11-08",
                "tmin": 18.6,
                "tmed": 21.6,
                "tmax": 26.1,
                "prec": 16.2,
                "rad": 125.0,
                "umid": 89.5,
                "wind": 8.1
            },
            {
                "d": "2025-11-09",
                "tmin": 15.1,
                "tmed": 20.7,
                "tmax": 27.4,
                "prec": 0.0,
                "rad": 342.0,
                "umid": 73.1,
                "wind": 6.2
            },
            {
                "d": "2025-11-10",
                "tmin": 13.6,
                "tmed": 20.2,
                "tmax": 26.9,
                "prec": 0.0,
                "rad": 343.6,
                "umid": 60.7,
                "wind": 7.4
            },
            {
                "d": "2025-11-11",
                "tmin": 14.0,
                "tmed": 22.9,
                "tmax": 30.7,
                "prec": 0.0,
                "rad": 321.1,
                "umid": 60.3,
                "wind": 5.8
            },
            {
                "d": "2025-11-12",
                "tmin": 19.4,
                "tmed": 26.8,
                "tmax": 34.2,
                "prec": 0.0,
                "rad": 329.6,
                "umid": 54.4,
                "wind": 8.5
            },
            {
                "d": "2025-11-13",
                "tmin": 19.0,
                "tmed": 22.6,
                "tmax": 28.1,
                "prec": 11.2,
                "rad": 221.7,
                "umid": 85.5,
                "wind": 5.9
            },
            {
                "d": "2025-11-14",
                "tmin": 20.0,
                "tmed": 21.7,
                "tmax": 23.2,
                "prec": 0.0,
                "rad": 103.3,
                "umid": 87.3,
                "wind": 3.1
            },
            {
                "d": "2025-11-15",
                "tmin": 18.8,
                "tmed": 20.4,
                "tmax": 22.4,
                "prec": 1.2,
                "rad": 79.5,
                "umid": 89.6,
                "wind": 4.4
            },
            {
                "d": "2025-11-16",
                "tmin": 18.6,
                "tmed": 22.1,
                "tmax": 26.9,
                "prec": 1.6,
                "rad": 139.5,
                "umid": 90.9,
                "wind": 4.5
            },
            {
                "d": "2025-11-17",
                "tmin": 18.5,
                "tmed": 21.7,
                "tmax": 24.0,
                "prec": 9.0,
                "rad": 101.6,
                "umid": 95.2,
                "wind": 6.2
            },
            {
                "d": "2025-11-18",
                "tmin": 16.7,
                "tmed": 20.0,
                "tmax": 25.1,
                "prec": 2.6,
                "rad": 197.7,
                "umid": 79.3,
                "wind": 10.2
            },
            {
                "d": "2025-11-19",
                "tmin": 14.0,
                "tmed": 21.4,
                "tmax": 28.1,
                "prec": 0.0,
                "rad": 338.7,
                "umid": 55.2,
                "wind": 4.8
            },
            {
                "d": "2025-11-20",
                "tmin": 16.4,
                "tmed": 22.7,
                "tmax": 28.9,
                "prec": 0.0,
                "rad": 335.4,
                "umid": 53.5,
                "wind": 6.0
            },
            {
                "d": "2025-11-21",
                "tmin": 16.7,
                "tmed": 25.1,
                "tmax": 33.0,
                "prec": 0.0,
                "rad": 336.9,
                "umid": 52.4,
                "wind": 6.2
            },
            {
                "d": "2025-11-22",
                "tmin": 22.4,
                "tmed": 27.9,
                "tmax": 34.0,
                "prec": 0.0,
                "rad": 293.8,
                "umid": 44.4,
                "wind": 5.4
            },
            {
                "d": "2025-11-23",
                "tmin": 18.1,
                "tmed": 24.4,
                "tmax": 31.2,
                "prec": 0.2,
                "rad": 243.5,
                "umid": 72.3,
                "wind": 5.5
            },
            {
                "d": "2025-11-24",
                "tmin": 16.9,
                "tmed": 19.8,
                "tmax": 24.4,
                "prec": 15.2,
                "rad": 175.2,
                "umid": 92.1,
                "wind": 6.8
            },
            {
                "d": "2025-11-25",
                "tmin": 15.0,
                "tmed": 21.2,
                "tmax": 28.1,
                "prec": 0.0,
                "rad": 328.9,
                "umid": 71.9,
                "wind": 4.8
            },
            {
                "d": "2025-11-26",
                "tmin": 16.3,
                "tmed": 22.5,
                "tmax": 28.6,
                "prec": 0.0,
                "rad": 325.3,
                "umid": 59.3,
                "wind": 5.7
            },
            {
                "d": "2025-11-27",
                "tmin": 16.4,
                "tmed": 22.2,
                "tmax": 28.5,
                "prec": 0.0,
                "rad": 335.2,
                "umid": 51.9,
                "wind": 5.2
            },
            {
                "d": "2025-11-28",
                "tmin": 14.9,
                "tmed": 23.3,
                "tmax": 30.6,
                "prec": 0.0,
                "rad": 324.8,
                "umid": 58.0,
                "wind": 4.1
            },
            {
                "d": "2025-11-29",
                "tmin": 21.8,
                "tmed": 27.8,
                "tmax": 34.4,
                "prec": 0.0,
                "rad": 315.6,
                "umid": 43.3,
                "wind": 2.8
            },
            {
                "d": "2025-11-30",
                "tmin": 23.7,
                "tmed": 29.1,
                "tmax": 35.0,
                "prec": 0.0,
                "rad": 300.2,
                "umid": 38.5,
                "wind": 4.7
            },
            {
                "d": "2025-12-01",
                "tmin": 23.5,
                "tmed": 28.2,
                "tmax": 34.0,
                "prec": 0.0,
                "rad": 215.3,
                "umid": 52.4,
                "wind": 4.3
            },
            {
                "d": "2025-12-02",
                "tmin": 21.0,
                "tmed": 24.6,
                "tmax": 30.9,
                "prec": 0.6,
                "rad": 197.6,
                "umid": 76.7,
                "wind": 5.6
            },
            {
                "d": "2025-12-03",
                "tmin": 20.7,
                "tmed": 25.6,
                "tmax": 31.8,
                "prec": 0.0,
                "rad": 229.8,
                "umid": 74.1,
                "wind": 5.6
            },
            {
                "d": "2025-12-04",
                "tmin": 19.7,
                "tmed": 24.2,
                "tmax": 30.9,
                "prec": 0.0,
                "rad": 227.1,
                "umid": 73.2,
                "wind": 4.2
            },
            {
                "d": "2025-12-05",
                "tmin": 17.4,
                "tmed": 25.2,
                "tmax": 34.0,
                "prec": 0.0,
                "rad": 298.9,
                "umid": 61.2,
                "wind": 5.2
            },
            {
                "d": "2025-12-06",
                "tmin": 20.6,
                "tmed": 27.0,
                "tmax": 34.2,
                "prec": 0.0,
                "rad": 283.8,
                "umid": 59.6,
                "wind": 5.9
            },
            {
                "d": "2025-12-07",
                "tmin": 23.0,
                "tmed": 26.4,
                "tmax": 33.5,
                "prec": 0.6,
                "rad": 200.0,
                "umid": 67.5,
                "wind": 4.8
            },
            {
                "d": "2025-12-08",
                "tmin": 20.6,
                "tmed": 25.1,
                "tmax": 29.5,
                "prec": 19.2,
                "rad": 192.6,
                "umid": 76.5,
                "wind": 7.2
            },
            {
                "d": "2025-12-09",
                "tmin": 20.4,
                "tmed": 21.5,
                "tmax": 23.4,
                "prec": 129.4,
                "rad": 47.2,
                "umid": 99.9,
                "wind": 13.4
            },
            {
                "d": "2025-12-10",
                "tmin": 20.4,
                "tmed": 24.0,
                "tmax": 28.6,
                "prec": 0.0,
                "rad": 280.2,
                "umid": 72.5,
                "wind": 11.5
            },
            {
                "d": "2025-12-11",
                "tmin": 18.2,
                "tmed": 24.2,
                "tmax": 29.8,
                "prec": 0.0,
                "rad": 329.7,
                "umid": 66.0,
                "wind": 6.8
            },
            {
                "d": "2025-12-12",
                "tmin": 19.4,
                "tmed": 22.3,
                "tmax": 24.3,
                "prec": 11.8,
                "rad": 62.9,
                "umid": 87.6,
                "wind": 4.5
            },
            {
                "d": "2025-12-13",
                "tmin": 19.0,
                "tmed": 21.1,
                "tmax": 24.4,
                "prec": 53.4,
                "rad": 91.9,
                "umid": 98.2,
                "wind": 6.8
            },
            {
                "d": "2025-12-14",
                "tmin": 18.6,
                "tmed": 21.1,
                "tmax": 23.6,
                "prec": 77.0,
                "rad": 57.9,
                "umid": 99.8,
                "wind": 4.8
            },
            {
                "d": "2025-12-15",
                "tmin": 20.8,
                "tmed": 23.8,
                "tmax": 28.6,
                "prec": 0.2,
                "rad": 219.7,
                "umid": 93.7,
                "wind": 3.9
            },
            {
                "d": "2025-12-16",
                "tmin": 20.8,
                "tmed": 23.4,
                "tmax": 27.2,
                "prec": 0.0,
                "rad": 145.5,
                "umid": 92.3,
                "wind": 5.2
            },
            {
                "d": "2025-12-17",
                "tmin": 17.4,
                "tmed": 21.6,
                "tmax": 26.8,
                "prec": 0.0,
                "rad": 279.1,
                "umid": 80.6,
                "wind": 7.7
            },
            {
                "d": "2025-12-18",
                "tmin": 15.6,
                "tmed": 21.8,
                "tmax": 27.6,
                "prec": 0.0,
                "rad": 238.0,
                "umid": 77.1,
                "wind": 6.7
            },
            {
                "d": "2025-12-19",
                "tmin": 17.6,
                "tmed": 23.7,
                "tmax": 30.4,
                "prec": 0.0,
                "rad": 236.2,
                "umid": 81.8,
                "wind": 5.7
            },
            {
                "d": "2025-12-20",
                "tmin": 20.3,
                "tmed": 24.9,
                "tmax": 30.4,
                "prec": 0.0,
                "rad": 231.1,
                "umid": 80.1,
                "wind": 6.7
            },
            {
                "d": "2025-12-21",
                "tmin": 20.4,
                "tmed": 26.7,
                "tmax": 32.4,
                "prec": 0.0,
                "rad": 302.1,
                "umid": 70.4,
                "wind": 5.6
            },
            {
                "d": "2025-12-22",
                "tmin": 22.7,
                "tmed": 27.8,
                "tmax": 32.9,
                "prec": 0.0,
                "rad": 252.0,
                "umid": 60.4,
                "wind": 6.9
            },
            {
                "d": "2025-12-23",
                "tmin": 23.9,
                "tmed": 28.1,
                "tmax": 32.6,
                "prec": 0.0,
                "rad": 256.0,
                "umid": 54.4,
                "wind": 8.2
            },
            {
                "d": "2025-12-24",
                "tmin": 24.7,
                "tmed": 28.9,
                "tmax": 34.3,
                "prec": 0.0,
                "rad": 289.2,
                "umid": 52.0,
                "wind": 4.0
            },
            {
                "d": "2025-12-25",
                "tmin": 23.2,
                "tmed": 28.8,
                "tmax": 35.3,
                "prec": 0.0,
                "rad": 289.2,
                "umid": 60.3,
                "wind": 2.4
            },
            {
                "d": "2025-12-26",
                "tmin": 22.8,
                "tmed": 29.3,
                "tmax": 35.9,
                "prec": 4.8,
                "rad": 286.7,
                "umid": 59.9,
                "wind": 2.5
            },
            {
                "d": "2025-12-27",
                "tmin": 21.6,
                "tmed": 27.6,
                "tmax": 34.6,
                "prec": 0.4,
                "rad": 280.6,
                "umid": 72.8,
                "wind": 3.7
            },
            {
                "d": "2025-12-28",
                "tmin": 22.5,
                "tmed": 27.2,
                "tmax": 32.6,
                "prec": 2.2,
                "rad": 236.2,
                "umid": 75.3,
                "wind": 3.8
            },
            {
                "d": "2025-12-29",
                "tmin": 20.8,
                "tmed": 25.4,
                "tmax": 33.0,
                "prec": 9.4,
                "rad": 260.8,
                "umid": 82.9,
                "wind": 2.9
            },
            {
                "d": "2025-12-30",
                "tmin": 21.8,
                "tmed": 26.6,
                "tmax": 32.8,
                "prec": 0.0,
                "rad": 254.8,
                "umid": 78.2,
                "wind": 2.9
            },
            {
                "d": "2025-12-31",
                "tmin": 21.4,
                "tmed": 26.2,
                "tmax": 33.6,
                "prec": 11.2,
                "rad": 293.1,
                "umid": 82.3,
                "wind": 3.9
            },
            {
                "d": "2026-01-01",
                "tmin": 20.7,
                "tmed": 24.6,
                "tmax": 31.3,
                "prec": 29.2,
                "rad": 273.5,
                "umid": 87.9,
                "wind": 4.2
            },
            {
                "d": "2026-01-02",
                "tmin": 20.9,
                "tmed": 22.3,
                "tmax": 26.4,
                "prec": 15.8,
                "rad": 104.1,
                "umid": 98.4,
                "wind": 4.8
            },
            {
                "d": "2026-01-03",
                "tmin": 20.5,
                "tmed": 23.7,
                "tmax": 29.0,
                "prec": 0.2,
                "rad": 225.1,
                "umid": 90.3,
                "wind": 2.8
            },
            {
                "d": "2026-01-04",
                "tmin": 20.5,
                "tmed": 25.0,
                "tmax": 31.9,
                "prec": 0.0,
                "rad": 292.2,
                "umid": 80.1,
                "wind": 3.7
            },
            {
                "d": "2026-01-05",
                "tmin": 17.8,
                "tmed": 22.5,
                "tmax": 29.8,
                "prec": 0.0,
                "rad": 305.5,
                "umid": 78.3,
                "wind": 7.9
            },
            {
                "d": "2026-01-06",
                "tmin": 16.9,
                "tmed": 23.3,
                "tmax": 29.8,
                "prec": 0.0,
                "rad": 300.0,
                "umid": 74.2,
                "wind": 5.9
            },
            {
                "d": "2026-01-07",
                "tmin": 19.2,
                "tmed": 24.5,
                "tmax": 30.5,
                "prec": 0.0,
                "rad": 234.9,
                "umid": 77.6,
                "wind": 4.6
            },
            {
                "d": "2026-01-08",
                "tmin": 21.4,
                "tmed": 25.6,
                "tmax": 31.2,
                "prec": 6.0,
                "rad": 274.7,
                "umid": 76.4,
                "wind": 7.9
            },
            {
                "d": "2026-01-09",
                "tmin": 21.5,
                "tmed": 26.2,
                "tmax": 32.5,
                "prec": 0.0,
                "rad": 243.9,
                "umid": 72.3,
                "wind": 6.0
            },
            {
                "d": "2026-01-10",
                "tmin": 19.9,
                "tmed": 24.3,
                "tmax": 32.4,
                "prec": 13.4,
                "rad": 174.8,
                "umid": 82.8,
                "wind": 3.4
            },
            {
                "d": "2026-01-11",
                "tmin": 19.6,
                "tmed": 24.5,
                "tmax": 31.2,
                "prec": 2.8,
                "rad": 267.7,
                "umid": 83.8,
                "wind": 2.9
            },
            {
                "d": "2026-01-12",
                "tmin": 19.4,
                "tmed": 24.5,
                "tmax": 31.0,
                "prec": 7.0,
                "rad": 248.3,
                "umid": 83.6,
                "wind": 3.0
            },
            {
                "d": "2026-01-13",
                "tmin": 18.5,
                "tmed": 22.3,
                "tmax": 29.3,
                "prec": 1.2,
                "rad": 218.2,
                "umid": 90.0,
                "wind": 4.4
            },
            {
                "d": "2026-01-14",
                "tmin": 19.6,
                "tmed": 24.4,
                "tmax": 31.3,
                "prec": 0.2,
                "rad": 294.6,
                "umid": 78.7,
                "wind": 4.7
            },
            {
                "d": "2026-01-15",
                "tmin": 19.7,
                "tmed": 22.2,
                "tmax": 29.1,
                "prec": 8.0,
                "rad": 168.2,
                "umid": 93.2,
                "wind": 4.8
            },
            {
                "d": "2026-01-16",
                "tmin": 19.8,
                "tmed": 23.5,
                "tmax": 30.7,
                "prec": 4.8,
                "rad": 257.3,
                "umid": 89.3,
                "wind": 5.4
            },
            {
                "d": "2026-01-17",
                "tmin": 19.8,
                "tmed": 24.3,
                "tmax": 30.5,
                "prec": 0.2,
                "rad": 257.5,
                "umid": 85.7,
                "wind": 2.2
            },
            {
                "d": "2026-01-18",
                "tmin": 21.1,
                "tmed": 24.6,
                "tmax": 31.2,
                "prec": 2.8,
                "rad": 246.0,
                "umid": 87.6,
                "wind": 3.5
            },
            {
                "d": "2026-01-19",
                "tmin": 20.0,
                "tmed": 24.2,
                "tmax": 30.6,
                "prec": 0.0,
                "rad": 307.6,
                "umid": 81.6,
                "wind": 5.3
            },
            {
                "d": "2026-01-20",
                "tmin": 17.5,
                "tmed": 22.0,
                "tmax": 28.4,
                "prec": 0.0,
                "rad": 331.5,
                "umid": 68.5,
                "wind": 7.8
            },
            {
                "d": "2026-01-21",
                "tmin": 15.4,
                "tmed": 21.2,
                "tmax": 28.9,
                "prec": 0.0,
                "rad": 311.1,
                "umid": 71.4,
                "wind": 6.1
            },
            {
                "d": "2026-01-22",
                "tmin": 15.8,
                "tmed": 21.5,
                "tmax": 29.0,
                "prec": 0.0,
                "rad": 251.3,
                "umid": 70.3,
                "wind": 6.5
            },
            {
                "d": "2026-01-23",
                "tmin": 15.6,
                "tmed": 21.9,
                "tmax": 28.7,
                "prec": 0.0,
                "rad": 285.1,
                "umid": 69.4,
                "wind": 6.5
            },
            {
                "d": "2026-01-24",
                "tmin": 17.3,
                "tmed": 23.5,
                "tmax": 31.3,
                "prec": 0.0,
                "rad": 309.1,
                "umid": 71.4,
                "wind": 5.2
            },
            {
                "d": "2026-01-25",
                "tmin": 17.4,
                "tmed": 24.1,
                "tmax": 32.1,
                "prec": 0.0,
                "rad": 275.9,
                "umid": 69.7,
                "wind": 4.0
            },
            {
                "d": "2026-01-26",
                "tmin": 18.7,
                "tmed": 25.4,
                "tmax": 32.1,
                "prec": 0.0,
                "rad": 240.6,
                "umid": 72.3,
                "wind": 3.9
            },
            {
                "d": "2026-01-27",
                "tmin": 19.9,
                "tmed": 26.5,
                "tmax": 33.5,
                "prec": 0.0,
                "rad": 299.5,
                "umid": 68.2,
                "wind": 3.5
            },
            {
                "d": "2026-01-28",
                "tmin": 19.1,
                "tmed": 24.9,
                "tmax": 31.9,
                "prec": 2.4,
                "rad": 307.5,
                "umid": 77.6,
                "wind": 5.0
            },
            {
                "d": "2026-01-29",
                "tmin": 20.1,
                "tmed": 23.5,
                "tmax": 31.4,
                "prec": 8.4,
                "rad": 233.6,
                "umid": 86.1,
                "wind": 3.6
            },
            {
                "d": "2026-01-30",
                "tmin": 20.2,
                "tmed": 23.6,
                "tmax": 29.4,
                "prec": 0.0,
                "rad": 223.7,
                "umid": 87.6,
                "wind": 3.8
            },
            {
                "d": "2026-01-31",
                "tmin": 20.9,
                "tmed": 26.0,
                "tmax": 32.6,
                "prec": 0.0,
                "rad": 306.9,
                "umid": 75.4,
                "wind": 5.8
            },
            {
                "d": "2026-02-01",
                "tmin": 20.5,
                "tmed": 23.1,
                "tmax": 28.9,
                "prec": 15.2,
                "rad": 132.5,
                "umid": 93.8,
                "wind": 5.8
            },
            {
                "d": "2026-02-02",
                "tmin": 20.4,
                "tmed": 22.2,
                "tmax": 26.2,
                "prec": 8.6,
                "rad": 134.6,
                "umid": 96.6,
                "wind": 3.9
            },
            {
                "d": "2026-02-03",
                "tmin": 20.6,
                "tmed": 22.8,
                "tmax": 26.8,
                "prec": 9.2,
                "rad": 151.2,
                "umid": 96.0,
                "wind": 4.4
            },
            {
                "d": "2026-02-04",
                "tmin": 20.4,
                "tmed": 22.8,
                "tmax": 28.2,
                "prec": 6.6,
                "rad": 161.5,
                "umid": 95.7,
                "wind": 4.5
            },
            {
                "d": "2026-02-05",
                "tmin": 20.2,
                "tmed": 24.2,
                "tmax": 29.7,
                "prec": 3.4,
                "rad": 200.6,
                "umid": 87.0,
                "wind": 2.0
            },
            {
                "d": "2026-02-06",
                "tmin": 19.9,
                "tmed": 25.6,
                "tmax": 31.9,
                "prec": 0.0,
                "rad": 320.9,
                "umid": 72.9,
                "wind": 3.3
            },
            {
                "d": "2026-02-07",
                "tmin": 20.6,
                "tmed": 26.1,
                "tmax": 33.3,
                "prec": 0.0,
                "rad": 275.9,
                "umid": 73.1,
                "wind": 4.6
            },
            {
                "d": "2026-02-08",
                "tmin": 17.4,
                "tmed": 22.7,
                "tmax": 30.2,
                "prec": 91.4,
                "rad": 202.0,
                "umid": 88.7,
                "wind": 6.6
            },
            {
                "d": "2026-02-09",
                "tmin": 18.5,
                "tmed": 22.2,
                "tmax": 28.2,
                "prec": 8.4,
                "rad": 185.6,
                "umid": 90.2,
                "wind": 4.2
            },
            {
                "d": "2026-02-10",
                "tmin": 20.1,
                "tmed": 22.7,
                "tmax": 27.5,
                "prec": 0.6,
                "rad": 213.2,
                "umid": 94.5,
                "wind": 5.4
            },
            {
                "d": "2026-02-11",
                "tmin": 21.1,
                "tmed": 22.7,
                "tmax": 27.3,
                "prec": 22.0,
                "rad": 136.0,
                "umid": 97.4,
                "wind": 7.8
            },
            {
                "d": "2026-02-12",
                "tmin": 21.0,
                "tmed": 24.6,
                "tmax": 30.0,
                "prec": 2.2,
                "rad": 241.9,
                "umid": 86.5,
                "wind": 9.5
            },
            {
                "d": "2026-02-13",
                "tmin": 21.5,
                "tmed": 24.8,
                "tmax": 30.9,
                "prec": 0.4,
                "rad": 205.0,
                "umid": 84.9,
                "wind": 4.6
            },
            {
                "d": "2026-02-14",
                "tmin": 21.2,
                "tmed": 25.6,
                "tmax": 33.7,
                "prec": 13.6,
                "rad": 252.2,
                "umid": 80.6,
                "wind": 3.0
            },
            {
                "d": "2026-02-15",
                "tmin": 21.4,
                "tmed": 26.8,
                "tmax": 33.5,
                "prec": 0.0,
                "rad": 286.8,
                "umid": 74.9,
                "wind": 3.1
            },
            {
                "d": "2026-02-16",
                "tmin": 22.7,
                "tmed": 27.9,
                "tmax": 34.5,
                "prec": 5.4,
                "rad": 257.3,
                "umid": 66.7,
                "wind": 3.0
            },
            {
                "d": "2026-02-17",
                "tmin": 23.8,
                "tmed": 28.6,
                "tmax": 34.3,
                "prec": 0.0,
                "rad": 278.2,
                "umid": 62.0,
                "wind": 2.5
            },
            {
                "d": "2026-02-18",
                "tmin": 22.3,
                "tmed": 25.9,
                "tmax": 32.1,
                "prec": 0.6,
                "rad": 213.4,
                "umid": 76.9,
                "wind": 2.5
            },
            {
                "d": "2026-02-19",
                "tmin": 21.1,
                "tmed": 26.6,
                "tmax": 32.3,
                "prec": 0.0,
                "rad": 247.0,
                "umid": 73.6,
                "wind": 2.2
            },
            {
                "d": "2026-02-20",
                "tmin": 21.8,
                "tmed": 26.4,
                "tmax": 33.6,
                "prec": 0.0,
                "rad": 240.7,
                "umid": 74.0,
                "wind": 4.2
            },
            {
                "d": "2026-02-21",
                "tmin": 20.2,
                "tmed": 24.2,
                "tmax": 31.1,
                "prec": 11.0,
                "rad": 155.4,
                "umid": 84.6,
                "wind": 3.0
            },
            {
                "d": "2026-02-22",
                "tmin": 20.5,
                "tmed": 23.9,
                "tmax": 30.9,
                "prec": 11.0,
                "rad": 227.6,
                "umid": 88.0,
                "wind": 5.3
            },
            {
                "d": "2026-02-23",
                "tmin": 20.0,
                "tmed": 22.8,
                "tmax": 28.0,
                "prec": 13.8,
                "rad": 141.9,
                "umid": 90.8,
                "wind": 4.5
            },
            {
                "d": "2026-02-24",
                "tmin": 20.7,
                "tmed": 24.1,
                "tmax": 29.3,
                "prec": 0.0,
                "rad": 188.0,
                "umid": 89.2,
                "wind": 2.8
            },
            {
                "d": "2026-02-25",
                "tmin": 22.9,
                "tmed": 23.1,
                "tmax": 23.4,
                "prec": 0.0,
                "rad": 0.0,
                "umid": 96.7,
                "wind": 1.4
            }
        ],
        "temp_med_por_mes": {
            "2025-11": 22.9,
            "2025-12": 25.2,
            "2026-01": 23.9,
            "2026-02": 24.6
        },
        "chuva_extrema_dias": [
            {
                "d": "2025-12-09",
                "mm": 129.4
            },
            {
                "d": "2026-02-08",
                "mm": 91.4
            },
            {
                "d": "2025-12-14",
                "mm": 77.0
            },
            {
                "d": "2025-12-13",
                "mm": 53.4
            }
        ]
    },
    "fertilizacao": {
        "inicio": "2025-08-22",
        "fim": "2025-11-17",
        "total_registros": 26616,
        "area_total_ha": 243.5,
        "peso_total_kg": 253068.0,
        "operacoes": [
            {
                "op": "CALAGEM",
                "n": 11473,
                "aplicada": 929.5,
                "configurada": 1452.2,
                "desvio_pct": -36.0,
                "area_ha": 103.4,
                "peso_kg": 118125.0,
                "abaixo": 6647,
                "ok": 4771,
                "acima": 55
            },
            {
                "op": "GESSAGEM",
                "n": 8725,
                "aplicada": 1099.6,
                "configurada": 1429.1,
                "desvio_pct": -23.1,
                "area_ha": 95.2,
                "peso_kg": 122249.0,
                "abaixo": 3396,
                "ok": 5170,
                "acima": 159
            },
            {
                "op": "MEDIÇÃO DE ÁREA",
                "n": 16,
                "aplicada": 807.1,
                "configurada": 1000.0,
                "desvio_pct": -19.3,
                "area_ha": 0.1,
                "peso_kg": 127.0,
                "abaixo": 5,
                "ok": 9,
                "acima": 2
            },
            {
                "op": "PLANTIO MILHO GRÃO",
                "n": 3719,
                "aplicada": 228.3,
                "configurada": 300.0,
                "desvio_pct": -23.9,
                "area_ha": 28.2,
                "peso_kg": 7887.0,
                "abaixo": 1357,
                "ok": 2240,
                "acima": 122
            },
            {
                "op": "PLANTIO MILHO SILAGEM",
                "n": 2378,
                "aplicada": 221.0,
                "configurada": 300.0,
                "desvio_pct": -26.3,
                "area_ha": 14.6,
                "peso_kg": 4102.0,
                "abaixo": 1031,
                "ok": 1253,
                "acima": 94
            },
            {
                "op": "Plantio",
                "n": 295,
                "aplicada": 217.1,
                "configurada": 300.0,
                "desvio_pct": -27.6,
                "area_ha": 2.0,
                "peso_kg": 550.0,
                "abaixo": 127,
                "ok": 160,
                "acima": 8
            }
        ],
        "total_abaixo": 12564,
        "total_ok": 13612,
        "pct_abaixo": 47.2,
        "pct_ok": 51.1
    },
    "maquinas": {
        "inicio": "2025-08-22",
        "fim": "2026-02-25",
        "alerts": {
            "Tempo Máximo de Motor Ocioso": 1890,
            "Velocidade na Operação": 1880,
            "Rotação do Motor em Deslocamento": 46,
            "Velocidade no Deslocamento": 12,
            "Rotação do Motor": 6
        },
        "alerts_por_op": {
            "PLANTIO MILHO GRÃO": 1691,
            "PLANTIO MILHO SILAGEM": 506,
            "MEDIÇÃO DE ÁREA": 451,
            "COLHEITA SILAGEM": 353,
            "CALAGEM": 338,
            "PULVERIZAÇÃO GERAL": 116,
            "ADUBAÇÃO DE COBERTURA (20-00-20)": 56,
            "Plantio": 47,
            "INSETICIDA+HERBICIDA": 37,
            "INSETICIDA + FERTILIZANTE FOLIAR": 24
        },
        "velocidade_med_kmh": 2.01,
        "rotacao_med_rpm": 1936,
        "vel_por_op": {
            "CALAGEM": 2.32,
            "PLANTIO MILHO GRÃO": 2.0,
            "PLANTIO MILHO SILAGEM": 2.0
        },
        "operacoes": {
            "PLANTIO MILHO GRÃO": 1691,
            "PLANTIO MILHO SILAGEM": 506,
            "MEDIÇÃO DE ÁREA": 451,
            "COLHEITA SILAGEM": 353,
            "CALAGEM": 338,
            "PULVERIZAÇÃO GERAL": 116,
            "ADUBAÇÃO DE COBERTURA (20-00-20)": 56,
            "Plantio": 47,
            "INSETICIDA+HERBICIDA": 37,
            "INSETICIDA + FERTILIZANTE FOLIAR": 24
        }
    },
    "pulverizacao": {
        "inicio": "2025-12-03",
        "fim": "2025-12-22",
        "total_registros": 12863,
        "pressao_zero": 12863,
        "pressao_media_psi": 0.0,
        "pressao_max_psi": 0.0,
        "ops": {
            "ADUBAÇÃO DE COBERTURA (20-00-20)": 7649,
            "INSETICIDA + FERTILIZANTE FOLIAR": 4493,
            "PULVERIZAÇÃO GERAL": 721
        },
        "pressao_media_por_op": {
            "ADUBAÇÃO DE COBERTURA (20-00-20)": 0.0,
            "INSETICIDA + FERTILIZANTE FOLIAR": 0.0,
            "PULVERIZAÇÃO GERAL": 0.0
        }
    },
    "pragas": {
        "eventos_total": 2293,
        "insetos_total": 8605,
        "especies": {
            "Cigarrinha": {
                "total": 7808,
                "eventos": 111
            },
            "Helicoverpa": {
                "total": 48,
                "eventos": 39
            },
            "Spodoptera": {
                "total": 747,
                "eventos": 135
            },
            "Vaquinha": {
                "total": 2,
                "eventos": 2
            }
        },
        "serie_diaria": [
            {
                "d": "2026-01-26",
                "count": 157
            },
            {
                "d": "2026-01-27",
                "count": 54
            },
            {
                "d": "2026-01-28",
                "count": 819
            },
            {
                "d": "2026-01-29",
                "count": 1485
            },
            {
                "d": "2026-01-30",
                "count": 1392
            },
            {
                "d": "2026-01-31",
                "count": 8
            },
            {
                "d": "2026-02-01",
                "count": 10
            },
            {
                "d": "2026-02-02",
                "count": 20
            },
            {
                "d": "2026-02-03",
                "count": 25
            },
            {
                "d": "2026-02-04",
                "count": 1867
            },
            {
                "d": "2026-02-05",
                "count": 24
            },
            {
                "d": "2026-02-06",
                "count": 1053
            },
            {
                "d": "2026-02-07",
                "count": 10
            },
            {
                "d": "2026-02-08",
                "count": 11
            },
            {
                "d": "2026-02-09",
                "count": 13
            },
            {
                "d": "2026-02-10",
                "count": 23
            },
            {
                "d": "2026-02-11",
                "count": 415
            },
            {
                "d": "2026-02-12",
                "count": 8
            },
            {
                "d": "2026-02-13",
                "count": 5
            },
            {
                "d": "2026-02-14",
                "count": 1
            },
            {
                "d": "2026-02-15",
                "count": 1
            },
            {
                "d": "2026-02-16",
                "count": 0
            },
            {
                "d": "2026-02-17",
                "count": 0
            },
            {
                "d": "2026-02-18",
                "count": 928
            },
            {
                "d": "2026-02-19",
                "count": 0
            },
            {
                "d": "2026-02-20",
                "count": 122
            },
            {
                "d": "2026-02-21",
                "count": 0
            },
            {
                "d": "2026-02-22",
                "count": 1
            },
            {
                "d": "2026-02-23",
                "count": 3
            },
            {
                "d": "2026-02-24",
                "count": 4
            },
            {
                "d": "2026-02-25",
                "count": 146
            }
        ],
        "nivel_armadilhas": {
            "357209680261654": "-",
            "FARMLAB1": "DAMAGE",
            "FARMLAB4": "-",
            "CIGARRINHA4": "-",
            "CIGARRINHA1": "DAMAGE",
            "FARMLAB3": "ALERT",
            "CIGARRINHA3": "DAMAGE",
            "CIGARRINHA2554": "DAMAGE",
            "CIGARRINHA0749": "DAMAGE",
            "CIGARRINHA2": "DAMAGE",
            "CIGARRINHA8164": "-",
            "CIGARRINHA1654": "LOW",
            "FARMLAB2": "LOW",
            "357209680250749": "LOW",
            "357209680248164": "LOW",
            "357209680252554": "LOW"
        },
        "niveis_contagem": {
            "-": 24,
            "DAMAGE": 21,
            "LOW": 20,
            "ALERT": 5,
            "CONTROL": 2
        }
    },
    "paradas": {
        "motivos": [
            {
                "stopReasonName": "ABASTECIMENTO DE INSUMOS",
                "stopReasonType": "EVENT_TYPE_PRODUCTIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "ABASTECIMENTO",
                "stopReasonType": "EVENT_TYPE_ADMINISTRATIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "AGUARDANDO ÁREA/ORDEM",
                "stopReasonType": "EVENT_TYPE_ADMINISTRATIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "AGUARDANDO CAMINHÃO",
                "stopReasonType": "EVENT_TYPE_PRODUCTIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "AGUARDANDO MECÂNICO",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "AGUARDANDO PEÇA",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "AQUECIMENTO DE MÁQUINA",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "CONDIÇÕES CLIMATICAS",
                "stopReasonType": "EVENT_TYPE_CLIMATE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "ENCALHADO",
                "stopReasonType": "EVENT_TYPE_CLIMATE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "FALTA DE COMBUSTÍVEL/LUBRIFICAÇÃO",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "FALTA DE INSUMO",
                "stopReasonType": "EVENT_TYPE_ADMINISTRATIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "FIM DE TURNO",
                "stopReasonType": "EVENT_TYPE_ADMINISTRATIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "GPS INVÁLIDO",
                "stopReasonType": "EVENT_TYPE_PRODUCTIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "INSUMO EMPEDRADO",
                "stopReasonType": "EVENT_TYPE_PRODUCTIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "LIMPEZA DO SENSOR",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "LIMPEZA",
                "stopReasonType": "EVENT_TYPE_SCHEDULED",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "MANUTENÇÃO NO IMPLEMENTO",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "MANUTENÇÃO DE MÁQUINA",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "MÁQUINA QUEBRADA",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "NECESSIDADES FISIOLÓGICAS",
                "stopReasonType": "EVENT_TYPE_ADMINISTRATIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "REFEIÇÃO",
                "stopReasonType": "EVENT_TYPE_ADMINISTRATIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "REGULAGEM E CALIBRAÇÃO",
                "stopReasonType": "EVENT_TYPE_PRODUCTIVE",
                "stopReasonProductive": false
            },
            {
                "stopReasonName": "DESEMTUPIR LINHA DE ADUBO",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": true
            },
            {
                "stopReasonName": "LIMPEZA CARRINHO",
                "stopReasonType": "EVENT_TYPE_MAINTENANCE",
                "stopReasonProductive": false
            }
        ],
        "atividades": [
            "PLANTIO",
            "ADUBAÇÃO",
            "PULVERIZAÇÃO",
            "COLHEITA",
            "SERVIÇOS GERAIS",
            "PREPARO DE SOLO"
        ]
    }
};
window.DATA = DATA;
