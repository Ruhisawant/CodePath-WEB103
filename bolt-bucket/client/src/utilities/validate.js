export function validateCombo({ model, exteriorColor, wheels, interior, package: pkg }) {
  if (pkg === 'Offroad' && wheels !== 'All-Terrain') {
    return 'Offroad package requires All-Terrain wheels.'
  }
  if (model === 'Classic' && exteriorColor === 'Neon Green') {
    return 'Classic model is not available in Neon Green.'
  }
  return null
}

export default { validateCombo }