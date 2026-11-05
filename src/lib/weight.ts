export const WEIGHT_STEP_GRAMS = 250;
export const MIN_WEIGHT_GRAMS = 250;

export function isWeightUnit(unit: string): boolean {
  return unit.trim().toLowerCase() === 'kg';
}

export function normalizeWeightQuantity(quantity: number, stockGrams?: number): number {
  const normalized = Number.isFinite(quantity) ? Math.floor(quantity / WEIGHT_STEP_GRAMS) * WEIGHT_STEP_GRAMS : MIN_WEIGHT_GRAMS;
  const lowerBounded = Math.max(MIN_WEIGHT_GRAMS, normalized);
  return stockGrams ? Math.min(lowerBounded, stockGrams) : lowerBounded;
}

export function kilogramsFromGrams(quantityGrams: number): number {
  return quantityGrams / 1000;
}

export function gramsFromKilograms(quantityKilograms: number): number {
  return Math.round(quantityKilograms * 1000);
}

export function formatWeight(quantityGrams: number): string {
  if (quantityGrams < 1000) return `${quantityGrams} g`;
  const kilograms = quantityGrams / 1000;
  return `${Number.isInteger(kilograms) ? kilograms : kilograms.toFixed(2).replace(/0$/, '')} kg`;
}

export function weightLineTotal(pricePerKg: number, quantityGrams: number): number {
  return Math.round(pricePerKg * kilogramsFromGrams(quantityGrams) * 100) / 100;
}
