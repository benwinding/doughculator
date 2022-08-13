import React from "react";
import { CalculatorState } from "./CalculatorState";
import { useComputedCalculatorState } from "./ComputedState";
import { InputPercent, InputGrams, InputLoafCount, InputRange } from "./forms/Input";
import { TabItem, Tabs } from "./Tabs";

function DefaultCalculatorState(): CalculatorState {
  return {
    hydartion_percent: 75,
    mixing_percent: 25,
    salt_percent: 1,
    stage1_excess_grams: 20,
    loaf_weight_grams: 755,
    loaf_count: 2,
    stage1_starter_grams: 5,
    stage2_starter_grams: 5,
  }
}

export function Calculator() {
  const [state, setState] = React.useState(DefaultCalculatorState());

  const tabs: TabItem[] = [
    { label: 'Options', content: <CalculatorOptions s={state} setState={setState} /> },
    { label: 'Advanced', content: <CalculatorAdvancedOptions s={state} setState={setState} /> },
    { label: 'JSON', content: <pre>{JSON.stringify(state, null, 2)}</pre> },
  ]

  return <div>
    <Tabs tabs={tabs} />
    <OutputProperties state={state} />
  </div>
}

function OutputProperties({state}: {state: CalculatorState}) {
  const computed = useComputedCalculatorState(state)
  const computedFixed = Object.entries(computed || {}).reduce((acc, [key, val]) => (acc[key] = (+val).toFixed(2)) && acc, {})
  return <div>
    <pre>{JSON.stringify(computedFixed, null, 2)}</pre>
  </div>
}

function CalculatorOptions({s, setState}: { s: CalculatorState, setState: (s: CalculatorState) => void }) {
  const setPar = (partialState: Partial<CalculatorState>) => setState({ ...s, ...partialState });

  return <div>
    <p className="text-black italic my-4">Percentages</p>
    <InputRange value={s.hydartion_percent} onChange={v => setPar({hydartion_percent: v})} label="Hydration % (Water/Flour)" />
    <InputRange value={s.mixing_percent} onChange={v => setPar({mixing_percent: v})} label="Mixing % (Levain/Weight)" />
    <InputRange value={s.salt_percent} onChange={v => setPar({salt_percent: v})} label="Salt Percent" />
  </div>
}

function CalculatorAdvancedOptions({s, setState}: { s: CalculatorState, setState: (s: CalculatorState) => void }) {
  const setPar = (partialState: Partial<CalculatorState>) => setState({ ...s, ...partialState });

  return <div>
    <p className="text-black italic my-4">Percentages</p>
    <InputPercent value={s.hydartion_percent} onChange={v => setPar({hydartion_percent: v})} label="Hydration % (Water/Flour)" />
    <InputPercent value={s.mixing_percent} onChange={v => setPar({mixing_percent: v})} label="Mixing % (Levain/Weight)" />
    <InputPercent value={s.salt_percent} onChange={v => setPar({salt_percent: v})} label="Salt Percent" />
    <p className="text-black italic my-4">Weights</p>
    <InputGrams value={s.stage1_excess_grams} onChange={v => setPar({stage1_excess_grams: v})} label="Excess (From Stage 1)" />
    <InputGrams value={s.loaf_weight_grams} onChange={v => setPar({loaf_weight_grams: v})} label="Loaf weight" />
    <InputLoafCount value={s.loaf_count} onChange={v => setPar({loaf_count: v})} label="Loaf count" />
    <p className="text-black italic my-4">Weather Determined</p>
    <InputGrams value={s.stage1_starter_grams} onChange={v => setPar({stage1_starter_grams: v})} label="Stage 1 Starter" />
    <InputGrams value={s.stage2_starter_grams} onChange={v => setPar({stage2_starter_grams: v})} label="Stage 2 Starter" />
  </div>
}
