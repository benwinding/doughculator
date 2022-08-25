import { Stage1Input, Stage2Input, Stage3Input } from "./stages";

export type CalculatorState = {
  stage1: Pick<Stage1Input, 'hydrationPercent' | 'starterPercent'>;
  stage2: Pick<Stage2Input, 'hydrationPercent' | 'starterPercent'>;
  stage3: Pick<Stage3Input, 'hydrationPercent' | 'starterPercent' | 'saltPercent'>;
  desired_excess_weight_grams: number;
  loaf_weight_grams: number;
  loaf_count: number;
};
