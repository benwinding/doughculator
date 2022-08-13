import React from "react";
import { CalculatorState } from "./CalculatorState";
import { memoize } from "lodash";

export type CalculatorComputedState = {
  stage1: {
    flour_grams: number;
    water_grams: number;
    combined_flour_water_grams: number;
    output_grams: number;
  }
  stage2: {
    flour_grams: number;
    water_grams: number;
    combined_flour_water_grams: number;
    output_grams: number;
  }
  mixing: {
    flour_grams: number;
    water_grams: number;
    combined_flour_water_grams: number;
    salt_grams: number;
  }
  final_dough_weight: number;
}

export function useComputedCalculatorState(state: CalculatorState): CalculatorComputedState | undefined {
  const [computed, setComputed] = React.useState<CalculatorComputedState>();

  React.useEffect(() => {
    const s = {...state};
    s.hydartion_percent = toPercent(s.hydartion_percent);
    s.salt_percent = toPercent(s.salt_percent);
    s.mixing_percent = toPercent(s.mixing_percent);
    setComputed({
      stage1: {
        flour_grams: calc_stage1_flour_grams(s),
        water_grams: calc_stage1_water_grams(s),
        combined_flour_water_grams: calc_stage1_combined_flour_water_grams(s),
        output_grams: calc_stage1_output_grams(s),
      },
      stage2: {
        flour_grams: calc_stage2_flour_grams(s),
        water_grams: calc_stage2_water_grams(s),
        combined_flour_water_grams: calc_stage2_combined_flour_water_grams(s),
        output_grams: calc_stage2_output_grams(s),
      },
      mixing: {
        flour_grams: calc_mixing_flour_grams(s),
        water_grams: calc_mixing_water_grams(s),
        combined_flour_water_grams: calc_mixing_combined_flour_water_grams(s),
        salt_grams: calc_mixing_salt_grams(s),
      },
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
