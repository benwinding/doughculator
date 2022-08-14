import React from "react";
import ArrowDownIcon from "@heroicons/react/solid/ArrowDownIcon";
import { CalculatorState } from "./CalculatorState";
import { CalculatorComputedState, useComputedCalculatorState } from "./ComputedState";
import { InputPercent, InputGrams, InputLoafCount, InputRange } from "./forms/Input";
import { TabItem, Tabs } from "./Tabs";
import { round } from "lodash";

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
  const computed = useComputedCalculatorState(state)

  const tabs: TabItem[] = [
    { label: 'Options', content: <CalculatorOptions s={state} setState={setState} /> },
    { label: 'Advanced', content: <CalculatorAdvancedOptions s={state} setState={setState} /> },
    { label: 'JSON', content: <pre>{JSON.stringify(state, null, 2)}</pre> },
  ]

  const Arrow = <div className="flex justify-center my-4">
    <ArrowDownIcon width={30} className="text-gray-600"/>
  </div>;

  return <div className="p-3">
    <Tabs tabs={tabs} />
    {Arrow}
    <div className="sm:flex justify-center">
      <OutputProperties state={state} computed={computed}/>
    </div>
    {Arrow}
    <div className="flex py-6">
      <Loaves state={state} computed={computed}/>
    </div>
  </div>
}

function Loaves(props: {state: CalculatorState, computed: CalculatorComputedState}) {
  const loaves = new Array(props.state.loaf_count).fill(0);
  const w = props.state.loaf_weight_grams;

  return <div className="flex gap-3 flex-shrink-0 flex-wrap w-full justify-center">
    {loaves.map((_, index) => <div key={index} style={{fontSize: w / 30, padding: w / 30 }} className="bg-orange-100 rounded-3xl flex-shrink-0 flex flex-col items-center">
      <span>Loaf {index + 1}</span>
      <span className="text-gray-500 text-xs">{props.state.loaf_weight_grams} g</span>
    </div>)}
  </div>
}

function OutputProperties({state, computed}: {state: CalculatorState, computed: CalculatorComputedState}) {
  const Arrow = <ArrowDownIcon className="ml-8 my-3 text-gray-600" width={30} />
  return <div className="py-3 flex flex-col sm:flex-row sm:flex-wrap gap-3">
    <Card title="Stage 1">
      <Table rows={[
        {key: '🌾 Flour', value: round(computed?.stage1?.flour_grams) + ' g'},
        {key: '💧 Water', value: round(computed?.stage1?.water_grams) + ' g'},
        {key: '🎬 Starter', value: round(state.stage1_starter_grams) + ' g'},
      ]}/>
      {Arrow}
      <Table rows={[
        {key: '🟰 Output', value: round(computed?.stage1?.output_grams) + ' g'},
      ]}/>
    </Card>
    <Card title="Stage 2">
      <Table rows={[
        {key: '🌾 Flour', value: round(computed?.stage2?.flour_grams) + ' g'},
        {key: '💧 Water', value: round(computed?.stage2?.water_grams) + ' g'},
        {key: '🎬 Starter', value: round(state.stage2_starter_grams) + ' g'},
      ]}/>
      {Arrow}
      <Table rows={[
        {key: '🟰 Output', value: round(computed?.stage2?.output_grams) + ' g'},
      ]}/>
    </Card>
    <Card title="Mixing">
      <Table rows={[
        {key: '🌾 Flour', value: round(computed?.mixing?.flour_grams) + ' g'},
        {key: '💧 Water', value: round(computed?.mixing?.water_grams) + ' g'},
        {key: '🧂 Salt', value: round(computed?.mixing?.salt_grams) + ' g'},
        {key: '🎬 Starter', value: round(computed?.stage2?.output_grams) + ' g'},
      ]}/>
      {Arrow}
      <Table rows={[
        {key: '🟰 Output', value: round(computed?.final_dough_weight) + ' g'},
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

  const loafSuffix = s.loaf_count === 1 ? 'loaf' : 'loaves';

  return <div className="w-full flex flex-col sm:flex-row gap-3">
    <div className="sm:w-1/2">
      <Heading>Weight</Heading>
      <InputRange fixedTo={0} min={100} max={1000} step={1} value={s.loaf_weight_grams} onChange={v => setPar({loaf_weight_grams: v})} label="Loaf weight" suffix="g"/>
      <InputRange fixedTo={0} min={1} max={20} step={1} value={s.loaf_count} onChange={v => setPar({loaf_count: v})} label="Loaf count" suffix={loafSuffix}/>
    </div>
    <div className="sm:w-1/2">
      <Heading>Percentages</Heading>
      <InputRange fixedTo={0} value={s.hydartion_percent} onChange={v => setPar({hydartion_percent: v})} label="Hydration % (Water/Flour)" suffix="%"/>
      <InputRange fixedTo={0} value={s.mixing_percent} onChange={v => setPar({mixing_percent: v})} label="Mixing % (Levain/Weight)" suffix="%"/>
    </div>
  </div>
}

function CalculatorAdvancedOptions({s, setState}: { s: CalculatorState, setState: (s: CalculatorState) => void }) {
  const setPar = (partialState: Partial<CalculatorState>) => setState({ ...s, ...partialState });

  return <div>
    <Heading>Percentages</Heading>
    <InputPercent value={s.hydartion_percent} onChange={v => setPar({hydartion_percent: v})} label="Hydration % (Water/Flour)" />
    <InputPercent value={s.mixing_percent} onChange={v => setPar({mixing_percent: v})} label="Mixing % (Levain/Weight)" />
    <InputPercent value={s.salt_percent} onChange={v => setPar({salt_percent: v})} label="Salt Percent" />
    <Heading>Weights</Heading>
    <InputGrams value={s.stage1_excess_grams} onChange={v => setPar({stage1_excess_grams: v})} label="Excess (From Stage 1)" />
    <InputGrams value={s.loaf_weight_grams} onChange={v => setPar({loaf_weight_grams: v})} label="Loaf weight" />
    <InputLoafCount value={s.loaf_count} onChange={v => setPar({loaf_count: v})} label="Loaf count" />
    <Heading>Weather Determined</Heading>
    <InputGrams value={s.stage1_starter_grams} onChange={v => setPar({stage1_starter_grams: v})} label="Stage 1 Starter" />
    <InputGrams value={s.stage2_starter_grams} onChange={v => setPar({stage2_starter_grams: v})} label="Stage 2 Starter" />
  </div>
}

function Heading(props: { children: React.ReactNode }) {
  return <h3 className="text-black italic my-4">{props.children}</h3>
}
