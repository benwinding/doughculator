import React from "react";
import { CalculatorState } from "./models/CalculatorState";
import { CalculateStage1, CalculateStage2, Invert_GetFinalWeightGrams, Stage1Output, Stage2Output, Stage3Output } from "./models/stages";

export type CalculatorComputedState = {
  stage1: Stage1Output;
  stage2: Stage2Output;
  stage3: Stage3Output;
  final_dough_weight_g: number;
}

export function useComputedCalculatorState(state: CalculatorState): CalculatorComputedState | undefined {
  const [computed, setComputed] = React.useState<CalculatorComputedState>();

  React.useEffect(() => {
    const stage3out = Invert_GetFinalWeightGrams(state.loaf_weight_grams * state.loaf_count, state.stage3);
    const stage2out = CalculateStage2({
      desiredWeight: stage3out.starter_g,
      hydrationPercent: state.stage2.hydrationPercent,
      starterPercent: state.stage2.starterPercent,
    });
    const stage1out = CalculateStage1({
      desiredWeight: stage2out.starter_g + state.desired_excess_weight_grams,
      hydrationPercent: state.stage1.hydrationPercent,
      starterPercent: state.stage1.starterPercent,
    });
    setComputed({
      final_dough_weight_g: state.loaf_weight_grams,
      stage3: stage3out,
      stage2: stage2out,
      stage1: stage1out,
    })
  }, [state]);

  return computed;
}

