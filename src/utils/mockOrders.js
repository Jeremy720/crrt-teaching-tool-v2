export const mockOrders = [
  {
    modality: "Pre-filter CVVH",
    sodium: 1,
    potassium: 2,
    chloride: 3,
    bicarbonate: 1,
    calcium: 2,
    magnesium: 3,
    phosphorous: 4,
    grossUltraFiltration: 2,
    bloodFlowRate: 1,
    replacementFluidFlowRate: 7,
    saline3Percent: true,
    d5W: false,
    sodiumPhosphate15mmol100ml: true,
    anticoagulation: "Citrate"
  },
  {
    modality: "Pre-filter CVVH",
    sodium: 4,
    potassium: 2,
    chloride: 5,
    bicarbonate: 6,
    calcium: 7,
    magnesium: 5,
    phosphorous: 7,
    grossUltraFiltration: 2,
    bloodFlowRate: 3,
    replacementFluidFlowRate: 2,
    saline3Percent: false,
    d5W: true,
    sodiumPhosphate15mmol100ml: false,
    anticoagulation: "None"
  }
];

export const defaultState = {
  modality: "Pre-filter CVVH",
  sodium: 0,
  potassium: 0,
  chloride: 0,
  bicarbonate: 0,
  calcium: 0,
  magnesium: 0,
  phosphorous: 0,
  grossUltraFiltration: 0,
  bloodFlowRate: 0,
  replacementFluidFlowRate: 0,
  saline3Percent: false,
  d5W: false,
  sodiumPhosphate15mmol100ml: false,
  anticoagulation: "None"
};

export const mockReduxOrdersForModal = {
  "Input/Output": [17, 6, 4.2, 22],
  LaboratoryData: [1, 23, 659, 55.4],
  Vitals: [3, 45, 7, 34],
  Medications: [1, 2, 3, 4]
};

export const mockOrderForMigrationFunctions = {
  fluidDialysateValues: {
    sodium: 135,
    potassium: 2,
    chloride: 100,
    bicarbonate: 20,
    calcium: 2,
    magnesium: 1,
    phosphorous: 1,
    BUN: 0,
    creatinine: 0
  },
  modality: "Pre-filter CVVH",
  anticoagulation: "citrate",
  BFR: 200,
  Qr: 2,
  Qd: 2,
  grossUF: 500,
  timeToNextLabs: 8,
  otherFluidsSaline: false,
  otherFluidsD5W: true,
  otherFluidsSodiumPhosphate: false,
  otherFluidsBolusValue: 20,
  otherFluidsInfusionValue: 2,
  citrateFlowRate: 10,
  caClInfusionRate: 2
};

export const mockLabDataForTests = {
  time: ["Pre-CRRT 1", "Pre-CRRT 2", "10:00 - Day 1"],
  labNum: [-2, -1],
  sodium: [145, 145, 145],
  potassium: [3.6, 3.4, 3.3],
  chloride: [123, 116, 111],
  bicarbonate: [14, 13, 14],
  bun: [44, 48, 48],
  creatinine: [2.27, 3.12, 3.1],
  calcium: [7.7, 7.6, 7.5],
  ionizedCalcium: [0.95, 0.97, 0.99],
  magnesium: [1.7, 1.9, 1.2],
  phosphorous: [4.4, 6.3, 5],
  filtrationFraction: [null, null, 25.2],
  calciumFinalPostFilter: [null, null, "22/6"],
  lactate: [3.3, 6.1, 6.8],
  albumin: [3.1],
  wbc: [29.3, 29.3, 34.5],
  hemoglobin: [9.4, 9.4, 10.7],
  hematocrit: [28.5, 28.5, 32],
  plateletCount: [48, 48, 41],
  ph: [7.07, 7.21],
  pc02: [46, 33, 27],
  granularCasts: ["10-20/LPF"],
  renalEpithelialCasts: ["5-10/HPF"],
  bloodCulture: ["No Growth"],
  urineCulture: ["No Growth"]
};

export const mockInputOutputData = {
  fentanyl: [
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5
  ],
  vasopressin: [
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    6
  ],
  cisatracurium: [
    20,
    20,
    20,
    20,
    25,
    25,
    30,
    30,
    30,
    30,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    14,
    14,
    14,
    14,
    10,
    7,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    2,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  midazolam: [
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    2,
    2,
    2,
    2,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    2,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  norepinephrine: [
    350,
    350,
    350,
    350,
    350,
    350,
    150,
    150,
    150,
    150,
    115,
    115,
    115,
    115,
    150,
    150,
    150,
    150,
    90,
    90,
    90,
    90,
    90,
    90,
    90,
    90,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    10,
    10,
    10,
    10,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    20,
    20,
    40,
    40,
    40,
    40,
    40,
    60,
    60,
    60,
    60,
    60,
    60,
    80,
    80,
    80,
    80,
    100
  ],
  normalSalineBolus: [
    0,
    8000,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1000,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  normalSalineCarrier: [
    40,
    40,
    40,
    40,
    40,
    40,
    10,
    10,
    10,
    10,
    22,
    23,
    21,
    20,
    80,
    75,
    77,
    70,
    5,
    5,
    5,
    5,
    8,
    7,
    9,
    6,
    7,
    8,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6
  ],
  meropenem: [
    55,
    17,
    55,
    17,
    38,
    30,
    30,
    57.5,
    17,
    12,
    45,
    30,
    34,
    26,
    30,
    15,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36,
    36
  ],
  levofloxacin: [
    150,
    0,
    150,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    150,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    150,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  calciumGluconate: [
    0,
    0,
    0,
    0,
    0,
    140,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  albumin: [
    0,
    0,
    0,
    0,
    500,
    0,
    0,
    0,
    0,
    500,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  vancomycin: [
    0,
    0,
    0,
    0,
    0,
    0,
    70,
    180,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    70,
    180,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    70,
    180,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    70,
    180,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  tubeFeeds: [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    40,
    40,
    40,
    40,
    40,
    50,
    50,
    50,
    50,
    50,
    50,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80
  ],
  total: [
    631,
    8443,
    631,
    443,
    969,
    601,
    306,
    443.5,
    223,
    718,
    220,
    206,
    208,
    239,
    338,
    318,
    341,
    334,
    219,
    219,
    219,
    219,
    222,
    221,
    253,
    400,
    211,
    212,
    210,
    210,
    280,
    390,
    210,
    210,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    172,
    172,
    172,
    172,
    168,
    165,
    155,
    305,
    155,
    155,
    145,
    143,
    143,
    143,
    203,
    313,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    133,
    155,
    155,
    175,
    1173,
    173,
    173,
    243,
    379,
    199,
    199,
    199,
    199,
    199,
    219,
    219,
    219,
    219,
    233
  ],
  previousSixHourTotal: [
    null,
    null,
    631,
    1074,
    2043,
    2644,
    2950,
    3393.5,
    2985.5,
    3260.5,
    2511.5,
    2116.5,
    2018.5,
    1814,
    1929,
    1529,
    1650,
    1778,
    1789,
    1769,
    1650,
    1551,
    1432,
    1319,
    1353,
    1534,
    1526,
    1519,
    1507,
    1496,
    1523,
    1513,
    1512,
    1510,
    1500,
    1490,
    1410,
    1220,
    1210,
    1200,
    1200,
    1200,
    1172,
    1144,
    1116,
    1088,
    1056,
    1021,
    1004,
    1137,
    1120,
    1103,
    1080,
    1058,
    1046,
    884,
    932,
    1090,
    1078,
    1068,
    1058,
    1048,
    978,
    798,
    798,
    798,
    798,
    798,
    798,
    798,
    798,
    798,
    798,
    798,
    820,
    842,
    884,
    1924,
    1964,
    2004,
    2092,
    2316,
    2340,
    1366,
    1392,
    1418,
    1374,
    1214,
    1234,
    1254,
    1274,
    1308
  ],
  citrate: [null, null],
  calciumChloride: [null, null],
  totalInput: [null, null, 718, 220, 206],
  ultrafiltration: [null, null, 0, 0, 0],
  totalOutput: [null, null, 0, 0, 0],
  netInputOutput: [null, null, 718, 220, 206],
  cumulativeInputOutput: [null, null, 718, 938, 1144]
};

export const mockNewInputOutput = {
  totalInput: [718, 220, 206, 208, 239, 338],
  ultrafiltration: [0, 0, 0, 0, 500, 500],
  totalOutput: [0, 0, 0, 0, 500, 500],
  netInputOutput: [718, 220, 206],
  cumulativeInputOutput: [718, 938, 1144, 1350, 1556],
  citrate: [],
  calciumChloride: []
};
// export default { mockOrders, defaultState, mockReduxOrdersForModal, mockOrderForMigrationFunctions };
