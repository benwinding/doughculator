import React from "react";
import ArrowDownIcon from "@heroicons/react/solid/ArrowDownIcon";
import { CalculatorState } from "./CalculatorState";
import { CalculatorComputedState, useComputedCalculatorState } from "./ComputedState";
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
  const computedFixed = Object.entries(computed || {})
    .reduce((acc, [key, val]) => (acc[key] = (+val).toFixed(0)) && acc, {} as CalculatorComputedState);
  return <div className="py-3 flex flex-col sm:flex-row sm:flex-wrap gap-3">
    <Card title="Stage 1">
      <Table rows={[
        {key: '🌾 Flour', value: computedFixed.stage1_flour_grams + ' g'},
        {key: '💧 Water', value: computedFixed.stage1_water_grams + ' g'},
        {key: '🎬 Starter', value: state.stage1_starter_grams + ' g'},
      ]}/>
      <ArrowDownIcon className="ml-8" width={30} />
      <Table rows={[
        {key: '🟰 Output', value: computedFixed.stage1_output_grams + ' g'},
      ]}/>
    </Card>
    <Card title="Stage 2">
      <Table rows={[
        {key: '🌾 Flour', value: computedFixed.stage2_flour_grams + ' g'},
        {key: '💧 Water', value: computedFixed.stage2_water_grams + ' g'},
        {key: '🎬 Starter', value: state.stage2_starter_grams + ' g'},
      ]}/>
      <ArrowDownIcon className="ml-8" width={30} />
      <Table rows={[
        {key: '🟰 Output', value: computedFixed.stage2_output_grams + ' g'},
      ]}/>
    </Card>
    <Card title="Mixing">
      <Table rows={[
        {key: '🌾 Flour', value: computedFixed.mixing_flour_grams + ' g'},
        {key: '💧 Water', value: computedFixed.mixing_water_grams + ' g'},
        {key: '🧂 Salt', value: computedFixed.mixing_salt_grams + ' g'},
        {key: '🎬 Starter', value: computedFixed.stage2_output_grams + ' g'},
      ]}/>
      <ArrowDownIcon className="ml-8" width={30} />
      <Table rows={[
        {key: '🟰 Output', value: computedFixed.final_dough_weight + ' g'},
      ]}/>
    </Card>
  </div>
}

type Row = { key: string, value: string | number };
function Table(props: {rows: Row[] }) {
  return <table>
    <tbody>
      {props.rows.map(row => <tr key={row.key}>
        <td className="pr-2">{row.key}</td>
        <td className="text-right">{row.value}</td>
      </tr>)}
    </tbody>
  </table>
}

function Card(props: { title: string, children: React.ReactNode }) {
  return <div className="p-3 bg-gray-100 rounded-xl shadow-xl flex flex-col">
    <h1 className="text-2xl">{props.title}</h1>
    {props.children}
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
