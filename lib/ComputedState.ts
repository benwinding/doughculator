import React from "react";
import { CalculatorState } from "./CalculatorState";
import { memoize } from "lodash";

export class CalculatorComputedState {
  stage1_flour_grams: number;
  stage1_water_grams: number;
  stage1_combined_flour_water_grams: number;
  stage1_output_grams: number;

  stage2_flour_grams: number;
  stage2_water_grams: number;
  stage2_combined_flour_water_grams: number;
  stage2_output_grams: number;

  mixing_flour_grams: number;
  mixing_water_grams: number;
  mixing_salt_grams: number;
  mixing_combined_flour_water_grams: number;

  final_dough_weight: number;
}

export function useComputedCalculatorState(state: CalculatorState): CalculatorComputedState {
  const [computed, setComputed] = React.useState<CalculatorComputedState>();

  React.useEffect(() => {
    const s = {...state};
    s.hydartion_percent = toPercent(s.hydartion_percent);
    s.salt_percent = toPercent(s.salt_percent);
    s.mixing_percent = toPercent(s.mixing_percent);
    setComputed({
      stage1_flour_grams: calc_stage1_flour_grams(s),
      stage1_water_grams: calc_stage1_water_grams(s),
      stage1_combined_flour_water_grams: calc_stage1_combined_flour_water_grams(s),
      stage1_output_grams: calc_stage1_output_grams(s),
      stage2_flour_grams: calc_stage2_flour_grams(s),
      stage2_water_grams: calc_stage2_water_grams(s),
      stage2_combined_flour_water_grams: calc_stage2_combined_flour_water_grams(s),
      stage2_output_grams: calc_stage2_output_grams(s),
      mixing_flour_grams: calc_mixing_flour_grams(s),
      mixing_water_grams: calc_mixing_water_grams(s),
      mixing_salt_grams: calc_mixing_salt_grams(s),
      mixing_combined_flour_water_grams: calc_mixing_combined_flour_water_grams(s),
      final_dough_weight: calc_final_dough_weight(s),
    })
  }, [state]);

  return computed;
}

const calc_stage1_flour_grams = memoize(function (state: CalculatorState): number {
  return calc_stage1_combined_flour_water_grams(state) / (1 + state.hydartion_percent);
})
const calc_stage1_water_grams = memoize(function (state: CalculatorState): number {
  return calc_stage1_combined_flour_water_grams(state) * state.hydartion_percent / (1 + state.hydartion_percent);
})
const calc_stage1_combined_flour_water_grams = memoize(function (state: CalculatorState): number {
  return calc_stage1_output_grams(state) - state.stage1_starter_grams;
})
const calc_stage1_output_grams = memoize(function (state: CalculatorState): number {
  return state.stage1_starter_grams + state.stage1_excess_grams;
})
const calc_stage2_flour_grams = memoize(function (state: CalculatorState): number {
  return calc_stage2_combined_flour_water_grams(state) / (1 + state.hydartion_percent);
})
const calc_stage2_water_grams = memoize(function (state: CalculatorState): number {
  return calc_stage2_combined_flour_water_grams(state) * state.hydartion_percent / (1 + state.hydartion_percent);
})
const calc_stage2_combined_flour_water_grams = memoize(function (state: CalculatorState): number {
  return calc_stage2_output_grams(state) - calc_stage1_output_grams(state);
})
const calc_stage2_output_grams = memoize(function (state: CalculatorState): number {
  return state.mixing_percent * calc_final_dough_weight(state);
})
const calc_mixing_flour_grams = memoize(function (state: CalculatorState): number {
  return calc_mixing_combined_flour_water_grams(state) / (1 + state.hydartion_percent);
})
const calc_mixing_water_grams = memoize(function (state: CalculatorState): number {
  return calc_mixing_combined_flour_water_grams(state) * state.hydartion_percent / (1 + state.hydartion_percent);
})
const calc_mixing_combined_flour_water_grams = memoize(function (state: CalculatorState): number {
  return calc_final_dough_weight(state) - calc_mixing_salt_grams(state) - calc_stage2_output_grams(state);
})
const calc_mixing_salt_grams = memoize(function (state: CalculatorState): number {
  return state.salt_percent * calc_final_dough_weight(state);
})
const calc_final_dough_weight = memoize(function (state: CalculatorState): number {
  return state.loaf_weight_grams * state.loaf_count;
})

function toPercent(num: number): number {
  return num / 100;
}
