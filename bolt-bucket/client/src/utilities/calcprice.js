// Basic pricing logic; tweak values as desired
export const basePrices = {
  Classic: 22000,
  Sport: 30000,
  Premium: 40000
}

export const optionPrices = {
  exteriorColor: {
    Red: 0,
    Blue: 0,
    Black: 500,
    'Neon Green': 1000
  },
  wheels: {
    Standard: 0,
    Performance: 1500,
    'All-Terrain': 1200
  },
  interior: {
    Black: 0,
    Tan: 400,
    White: 700
  },
  package: {
    Tech: 1500,
    Comfort: 1200,
    Offroad: 1800
  }
}

export function calcTotal({ model, exteriorColor, wheels, interior, package: pkg }) {
  const base = basePrices[model] ?? 0
  const extras =
    (optionPrices.exteriorColor[exteriorColor] ?? 0) +
    (optionPrices.wheels[wheels] ?? 0) +
    (optionPrices.interior[interior] ?? 0) +
    (optionPrices.package[pkg] ?? 0)
  return Math.round((base + extras) * 100) / 100
}
