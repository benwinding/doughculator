import { CalculatorState } from "./CalculatorState";

export function EasyDefault1Loaf(): CalculatorState {
  return {
    stage1: { hydrationPercent: 0.5, starterPercent: 0.5 },
    stage2: { hydrationPercent: 0.5, starterPercent: 0.5 },
    stage3: { hydrationPercent: 0.5, starterPercent: 0.5, saltPercent: 0.5 },
    desired_excess_weight_grams: 50,
    loaf_weight_grams: 1000,
    loaf_count: 1,
  }
}

export function SummerDefault2Loaf(): CalculatorState {
  return {
    stage1: { hydrationPercent: 0.80, starterPercent: 0.12 },
    stage2: { hydrationPercent: 0.744, starterPercent: 0.05 },
    stage3: { hydrationPercent: 0.75, starterPercent: 0.5859375, saltPercent: 0.0234375 },
    desired_excess_weight_grams: 50,
    loaf_weight_grams: 750,
    loaf_count: 2,
  }
}
export function SummerDefault1Loaf(): CalculatorState {
  return OneLoafify(SummerDefault2Loaf());
}

export function WinterDefault2Loaf(): CalculatorState {
  return {
    stage1: { hydrationPercent: 0.80, starterPercent: 0.50 },
    stage2: { hydrationPercent: 0.744, starterPercent: 0.20 },
    stage3: { hydrationPercent: 0.75, starterPercent: 0.5859375, saltPercent: 0.0234375 },
    desired_excess_weight_grams: 50,
    loaf_weight_grams: 750,
    loaf_count: 2,
  }
}
export function WinterDefault1Loaf(): CalculatorState {
  return OneLoafify(WinterDefault2Loaf());
}

function OneLoafify(s: CalculatorState): CalculatorState {
  const n = s.loaf_count;
  return {
    stage1: { ...s.stage1 },
    stage2: { ...s.stage2 },
    stage3: { ...s.stage3 },
    desired_excess_weight_grams: s.desired_excess_weight_grams,
    loaf_weight_grams: s.loaf_weight_grams,
    loaf_count: 1,
  }
}