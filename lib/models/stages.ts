export type Stage1Input = {
  desiredWeight: number,
  hydrationPercent: number,
  starterPercent: number,
};
export type Stage1Output = {
  flour_g: number;
  starter_g: number;
  water_g: number;
}
export function CalculateStage1(opts: Stage1Input): Stage1Output {
  const flour_g = opts.desiredWeight / (1 + opts.starterPercent + opts.hydrationPercent);
  return {
    flour_g,
    starter_g: flour_g * opts.starterPercent,
    water_g: flour_g * opts.hydrationPercent,
  }
}

export type Stage2Input = {
  desiredWeight: number,
  hydrationPercent: number,
  starterPercent: number,
};
export type Stage2Output = {
  flour_g: number;
  starter_g: number;
  water_g: number;
}
export function CalculateStage2(opts: Stage2Input): Stage2Output {
  const flour_g = opts.desiredWeight / (1 + opts.starterPercent + opts.hydrationPercent);
  return {
    flour_g,
    starter_g: flour_g * opts.starterPercent,
    water_g: flour_g * opts.hydrationPercent,
  }
}

export type Stage3Input = {
  desiredWeight: number,
  hydrationPercent: number,
  starterPercent: number,
  saltPercent: number,
};
export type Stage3Output = {
  flour_g: number;
  starter_g: number;
  water_g: number;
  salt_g: number;
}
export function CalculateStage3(opts: Stage3Input): Stage3Output {
  const flour_g = opts.desiredWeight / (1 + opts.starterPercent + opts.hydrationPercent + opts.saltPercent);
  return {
    flour_g,
    starter_g: flour_g * opts.starterPercent,
    water_g: flour_g * opts.hydrationPercent,
    salt_g: flour_g * opts.saltPercent,
  }
}

export function GetFinalWeightGrams(stage3: Stage3Output): number {
  return stage3.flour_g + stage3.water_g + stage3.starter_g + stage3.salt_g;
}

// export function Invert_CalculateStage1(opts: Stage1Output): Stage1Input {
//   return {
//     desiredWeight: opts.flour_g + opts.starter_g + opts.water_g,
//     starterPercent: opts.starter_g / opts.flour_g,
//     hydrationPercent: opts.water_g / opts.flour_g,
//   }
// }
export function Invert_CalculateStage2(opts: Stage2Output): Stage2Input {
  return {
    desiredWeight: opts.flour_g + opts.starter_g + opts.water_g,
    starterPercent: opts.starter_g / opts.flour_g,
    hydrationPercent: opts.water_g / opts.flour_g,
  }
}
export function Invert_CalculateStage3(opts: Stage3Output): Stage3Input {
  return {
    desiredWeight: opts.flour_g + opts.starter_g + opts.water_g + opts.salt_g,
    starterPercent: opts.starter_g / opts.flour_g,
    hydrationPercent: opts.water_g / opts.flour_g,
    saltPercent: opts.salt_g / opts.flour_g,
  }
}

export function Invert_GetFinalWeightGrams(loafWeight: number, stage3: Pick<Stage3Input, 'hydrationPercent' | 'saltPercent' | 'starterPercent'>): Stage3Output {
  const flourG = loafWeight / ( 1 + stage3.hydrationPercent + stage3.starterPercent + stage3.saltPercent );
  return {
    flour_g: flourG,
    starter_g: flourG * stage3.starterPercent,
    water_g: flourG * stage3.hydrationPercent,
    salt_g: flourG * stage3.saltPercent,
  }
}
