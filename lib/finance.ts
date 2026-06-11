/**
 * Lokale Finanzmathematik – keine APIs, keine Live-Daten.
 * Alle Berechnungen sind deterministisch und laufen im Browser.
 */

export interface SimulationInput {
  startCapital: number;
  monthlyRate: number;
  years: number;
  annualReturn: number; // in Prozent, z. B. 7
}

export interface YearPoint {
  year: number;
  invested: number;
  pessimistic: number;
  expected: number;
  optimistic: number;
}

/** Endwert mit monatlicher Verzinsung und monatlicher Sparrate. */
export function futureValue(
  startCapital: number,
  monthlyRate: number,
  years: number,
  annualReturnPct: number
): number {
  const r = annualReturnPct / 100 / 12;
  const n = years * 12;
  if (r === 0) return startCapital + monthlyRate * n;
  const growthFactor = Math.pow(1 + r, n);
  return startCapital * growthFactor + monthlyRate * ((growthFactor - 1) / r);
}

/** Jahresreihe für drei Szenarien (erwartet, ±2 Prozentpunkte). */
export function buildSeries(input: SimulationInput): YearPoint[] {
  const points: YearPoint[] = [];
  for (let year = 0; year <= input.years; year++) {
    points.push({
      year,
      invested: input.startCapital + input.monthlyRate * 12 * year,
      pessimistic: Math.round(
        futureValue(input.startCapital, input.monthlyRate, year, Math.max(input.annualReturn - 2, 0))
      ),
      expected: Math.round(
        futureValue(input.startCapital, input.monthlyRate, year, input.annualReturn)
      ),
      optimistic: Math.round(
        futureValue(input.startCapital, input.monthlyRate, year, input.annualReturn + 2)
      ),
    });
  }
  return points;
}

export interface RiskInput {
  risk: number; // 1–10
  diversification: number; // 1–10
  horizonYears: number; // 1–40
}

export interface RiskPoint {
  year: number;
  low: number;
  mid: number;
  high: number;
}

/**
 * Modellhafter Rendite-Korridor: höheres Risiko hebt die erwartete Rendite
 * und verbreitert die Schwankungsbreite; Diversifikation verengt sie.
 * Rein illustrativ – keine Marktdaten.
 */
export function buildRiskCorridor(input: RiskInput): RiskPoint[] {
  const expectedReturn = 0.02 + input.risk * 0.007; // 2,7 % bis 9 %
  const volatility = (0.04 + input.risk * 0.022) * (1.35 - input.diversification * 0.07);
  const points: RiskPoint[] = [];
  for (let year = 0; year <= input.horizonYears; year++) {
    const mid = 10000 * Math.pow(1 + expectedReturn, year);
    const spread = volatility * Math.sqrt(year);
    points.push({
      year,
      low: Math.round(mid * Math.exp(-1.4 * spread)),
      mid: Math.round(mid),
      high: Math.round(mid * Math.exp(1.1 * spread)),
    });
  }
  return points;
}

export function riskProfileLabel(input: RiskInput): string {
  const score =
    input.risk * 0.6 + (10 - input.diversification) * 0.25 + (input.horizonYears < 10 ? 2 : 0);
  if (score <= 3.5) return "Defensiv";
  if (score <= 5.5) return "Ausgewogen";
  if (score <= 7.5) return "Wachstumsorientiert";
  return "Spekulativ";
}
