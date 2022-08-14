import React from "react";
import ArrowRightIcon from "@heroicons/react/solid/ArrowRightIcon";
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

  return <div className="p-3">
    <Tabs tabs={tabs} />
    <ArrowDownAcross className="p-6 px-10" height="140px" width="100%" />
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1">
        <OutputProperties state={state} computed={computed} />
      </div>
    </div>
  </div>
}

function OutputProperties({ state, computed }: { state: CalculatorState, computed: CalculatorComputedState }) {
  return <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-start">
    <div className="flex items-center gap-3">
      <Card title="Stage 1">
        <Table rows={[
          { key: '🌾 Flour', value: round(computed?.stage1?.flour_grams) + ' g' },
          { key: '💧 Water', value: round(computed?.stage1?.water_grams) + ' g' },
          { key: '🎬 Starter', value: round(state.stage1_starter_grams) + ' g' },
        ]} />
      </Card>
      <TotalArrow weight={computed?.stage1?.output_grams} />
    </div>
    <div className="flex items-center gap-3">
      <Card title="Stage 2">
        <Table rows={[
          { key: '🌾 Flour', value: round(computed?.stage2?.flour_grams) + ' g' },
          { key: '💧 Water', value: round(computed?.stage2?.water_grams) + ' g' },
          { key: '🎬 Starter', value: round(state.stage2_starter_grams) + ' g' },
        ]} />
      </Card>
      <TotalArrow weight={computed?.stage2?.output_grams} />
    </div>
    <div className="flex items-center gap-3">
      <Card title="Mixing">
        <Table rows={[
          { key: '🌾 Flour', value: round(computed?.mixing?.flour_grams) + ' g' },
          { key: '💧 Water', value: round(computed?.mixing?.water_grams) + ' g' },
          { key: '🧂 Salt', value: round(computed?.mixing?.salt_grams) + ' g' },
          { key: '🎬 Starter', value: round(computed?.stage2?.output_grams) + ' g' },
        ]} />
      </Card>
      <TotalArrow weight={computed?.final_dough_weight} />
    </div>
    <Card title="Output">
      <Table rows={[
          { key: '🍞 ' + loafSuffix(state.loaf_count), value: `${round(state.loaf_count)} x ${round(state.loaf_weight_grams)} g` },
      ]} />
      <Loaves state={state} computed={computed} />
    </Card>
  </div>
}

function Loaves(props: { state: CalculatorState, computed: CalculatorComputedState }) {
  const count = props.state.loaf_count;
  const loaves = new Array(count).fill(0).map((_, index) => count - index - 1);
  return <div className="grid grid-cols-2 gap-2 mt-2">
    {loaves.map((index) => <Loaf key={index} weight={props.state.loaf_weight_grams}/>)}
  </div>
}

function Loaf({weight}: {weight: number}) {
  const fontSize = 15 + 10 * ( (weight - 100) / 1000 );
  return <div style={{ fontSize: fontSize }} className="bg-orange-100 rounded-xl flex-shrink-0 flex flex-col items-center shadow-xl">
    <span>Loaf</span>
    <span className="text-gray-500 text-xs">{weight} g</span>
  </div>
}

function TotalArrow(props: {weight: number}) {
  return <div className="flex flex-col items-center">
    <ArrowRightIcon className="text-gray-600" width={30} />
    <span className="whitespace-nowrap">{round(props.weight) + ' g'}</span>
  </div>
}

type Row = { key: string, value: string | number };
function Table(props: { rows: Row[] }) {
  return <table>
    <tbody>
      {props.rows.map(row => <tr key={row.key}>
        <td className="pr-2 whitespace-nowrap">{row.key}</td>
        <td className="text-right whitespace-nowrap">{row.value}</td>
      </tr>)}
    </tbody>
  </table>
}

function Card(props: { title?: string, children: React.ReactNode }) {
  return <div className="p-3 bg-gray-100 rounded-xl shadow-xl flex flex-col">
    {props.title && <h1 className="text-2xl">{props.title}</h1>}
    {props.children}
  </div>
}

function loafSuffix(count: number) {
  return count === 1 ? 'loaf' : 'loaves';
}

function CalculatorOptions({ s, setState }: { s: CalculatorState, setState: (s: CalculatorState) => void }) {
  const setPar = (partialState: Partial<CalculatorState>) => setState({ ...s, ...partialState });

  return <div className="mt-3"><Card><div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div>
      <Heading>Weight</Heading>
      <InputRange min={100} max={1000} step={1} value={s.loaf_weight_grams} onChange={v => setPar({ loaf_weight_grams: v })} label="Loaf weight" suffix="g" />
      <InputRange min={1} max={20} step={1} value={s.loaf_count} onChange={v => setPar({ loaf_count: v })} label="Loaf count" suffix={loafSuffix(s.loaf_count)} />
    </div>
    <div>
      <Heading>Percentages</Heading>
      <InputRange value={s.hydartion_percent} onChange={v => setPar({ hydartion_percent: v })} label="Hydration % (Water/Flour)" suffix="%" />
    </div>
    <div>
      <Heading>Percentages</Heading>
      <InputRange value={s.hydartion_percent} onChange={v => setPar({ hydartion_percent: v })} label="Hydration % (Water/Flour)" suffix="%" />
      <InputRange value={s.mixing_percent} onChange={v => setPar({ mixing_percent: v })} label="Mixing % (Levain/Weight)" suffix="%" />
    </div>
  </div></Card></div>
}

function CalculatorAdvancedOptions({ s, setState }: { s: CalculatorState, setState: (s: CalculatorState) => void }) {
  const setPar = (partialState: Partial<CalculatorState>) => setState({ ...s, ...partialState });

  return <div>
    <Heading>Percentages</Heading>
    <InputPercent value={s.hydartion_percent} onChange={v => setPar({ hydartion_percent: v })} label="Hydration % (Water/Flour)" />
    <InputPercent value={s.mixing_percent} onChange={v => setPar({ mixing_percent: v })} label="Mixing % (Levain/Weight)" />
    <InputPercent value={s.salt_percent} onChange={v => setPar({ salt_percent: v })} label="Salt Percent" />
    <Heading>Weights</Heading>
    <InputGrams value={s.stage1_excess_grams} onChange={v => setPar({ stage1_excess_grams: v })} label="Excess (From Stage 1)" />
    <InputGrams value={s.loaf_weight_grams} onChange={v => setPar({ loaf_weight_grams: v })} label="Loaf weight" />
    <InputLoafCount value={s.loaf_count} onChange={v => setPar({ loaf_count: v })} label="Loaf count" />
    <Heading>Weather Determined</Heading>
    <InputGrams value={s.stage1_starter_grams} onChange={v => setPar({ stage1_starter_grams: v })} label="Stage 1 Starter" />
    <InputGrams value={s.stage2_starter_grams} onChange={v => setPar({ stage2_starter_grams: v })} label="Stage 2 Starter" />
  </div>
}

function Heading(props: { children: React.ReactNode }) {
  return <h3 className="text-black italic mb-4">{props.children}</h3>
}

function ArrowDownAcross(props: { width?: string, height?: string, className?: string }) {
  return <svg className={props.className}  preserveAspectRatio="none"  xmlns="http://www.w3.org/2000/svg" version="1.1" width={props.width} height={props.height} viewBox="-0.5 -0.5 288 80">
    <defs /><g><path d="M 286 1 Q 286 51 146 41 Q 6 31 6 70.9" fill="none" stroke="rgb(0, 0, 0)" strokeWidth="2" strokeMiterlimit="10" pointerEvents="stroke" /><path d="M 6 77.65 L 1.5 68.65 L 6 70.9 L 10.5 68.65 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" strokeWidth="3" strokeMiterlimit="10" pointerEvents="all" /></g>
  </svg>;
}
