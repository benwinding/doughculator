import React from "react";
import ArrowRightIcon from "@heroicons/react/solid/ArrowRightIcon";
import { CalculatorState } from "./models/CalculatorState";
import { CalculatorComputedState, useComputedCalculatorState } from "./ComputedState";
import { InputPercent, InputRange } from "./forms/Input";
import { TabItem, Tabs } from "./Tabs";
import { round } from "lodash";
import { SummerDefault2Loaf } from "./models/default-states";

function DefaultCalculatorState(): CalculatorState {
  return SummerDefault2Loaf();
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
        {state && computed && <OutputProperties state={state} computed={computed} />}
      </div>
    </div>
  </div>
}

function OutputProperties({ state, computed }: { state: CalculatorState, computed: CalculatorComputedState }) {
  const cs1 = computed.stage1;
  const cs1_total = cs1.flour_g + cs1.starter_g + cs1.water_g;
  const cs2 = computed.stage2;
  const cs2_total = cs2.flour_g + cs2.starter_g + cs2.water_g;
  const cs3 = computed.stage3;
  const cs3_total = cs3.flour_g + cs3.starter_g + cs3.water_g + cs3.salt_g;

  function r(input: number, precision?: number): string {
    return round(input, precision).toLocaleString() + ' g';
  }

  return <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-start">
    <div className="flex items-center gap-3">
      <Card title="Stage 1">
        <Table rows={[
          { key: '🌾 Flour', value: r(cs1.flour_g, 1)},
          { key: '💧 Water', value: r(cs1.water_g, 1)},
          { key: '🎬 Starter', value: r(cs1.starter_g, 1)},
        ]} />
      </Card>
      <TotalArrow weight={r(cs1_total, 1)} icon="🎬" />
    </div>
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-3">
        <Card title="Stage 2">
          <Table rows={[
            { key: '🌾 Flour', value: r(cs2.flour_g)},
            { key: '💧 Water', value: r(cs2.water_g)},
            { key: '🎬 Starter', value: r(cs2.starter_g, 1)},
          ]} />
        </Card>
        <Card title="Excess">
          <Table rows={[
            { key: '🎬 Starter', value: r(state.desired_excess_weight_grams)},
          ]} />
        </Card>
      </div>
      <TotalArrow weight={r(cs2_total)} icon="🎬" />
    </div>
    <div className="flex items-center gap-3">
      <Card title="Stage 3">
        <Table rows={[
          { key: '🌾 Flour', value: r(cs3.flour_g)},
          { key: '💧 Water', value: r(cs3.water_g)},
          { key: '🧂 Salt', value: r(cs3.salt_g)},
          { key: '🎬 Starter', value: r(cs3.starter_g)},
        ]} />
      </Card>
      <TotalArrow weight={r(cs3_total)} icon="🍞" />
    </div>
    <Card title="Output">
      <Table rows={[
          { key: '🍞 ' + loafSuffix(state.loaf_count), value: `${round(state.loaf_count)} x ${r(state.loaf_weight_grams)}` },
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

function TotalArrow(props: {weight: string, icon: string}) {
  return <div className="flex flex-col items-center">
    <ArrowRightIcon className="text-gray-600" width={30} />
    <span className="whitespace-nowrap font-mono text-sm">{props.icon} {props.weight}</span>
  </div>
}

type Row = { key: string, value: string | number };
function Table(props: { rows: Row[] }) {
  return <table>
    <tbody>
      {props.rows.map(row => <tr key={row.key}>
        <td className="pr-2 whitespace-nowrap">{row.key}</td>
        <td className="text-right whitespace-nowrap font-mono text-sm">{row.value}</td>
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

function CalculatorOptions({ s, setState }: { s: CalculatorState, setState: React.Dispatch<React.SetStateAction<CalculatorState>> }) {
  return <div className="mt-3"><Card><div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-3">
    <div>
      <Heading>Stage 1</Heading>
      <InputPercent
        value={s.stage1.hydrationPercent}
        onChange={v => setState(s => { s.stage1.hydrationPercent = v; return {...s}; })}
        label="Hydration % (Water/Flour)"
      />
      <InputPercent
        value={s.stage1.starterPercent}
        onChange={v => setState(s => { s.stage1.starterPercent = v; return {...s}; })}
        label="Starter % (Starter/Flour)"
      />
    </div>
    <div>
      <Heading>Stage 2</Heading>
      <InputPercent
        value={s.stage2.hydrationPercent}
        onChange={v => setState(s => { s.stage2.hydrationPercent = v; return {...s}; })}
        label="Hydration % (Water/Flour)"
      />
      <InputPercent
        value={s.stage2.starterPercent}
        onChange={v => setState(s => { s.stage2.starterPercent = v; return {...s}; })}
        label="Starter % (Starter/Flour)"
      />
      <InputRange min={0} max={50} step={1} value={s.desired_excess_weight_grams} onChange={v => setState({ ...s, desired_excess_weight_grams: v })} label="Excess starter weight" suffix="g" />
    </div>
    <div>
      <Heading>Stage 3</Heading>
      <InputPercent
        value={s.stage3.hydrationPercent}
        onChange={v => setState(s => { s.stage3.hydrationPercent = v; return {...s}; })}
        label="Hydration % (Water/Flour)"
      />
      <InputPercent
        value={s.stage3.starterPercent}
        onChange={v => setState(s => { s.stage3.starterPercent = v; return {...s}; })}
        label="Starter % (Starter/Flour)"
      />
      <InputPercent
        value={s.stage3.saltPercent}
        onChange={v => setState(s => { s.stage3.saltPercent = v; return {...s}; })}
        label="Starter % (Salt/Flour)"
      />
    </div>
    <div>
      <Heading>Weight</Heading>
      <InputRange min={100} max={1000} step={1} value={s.loaf_weight_grams} onChange={v => setState({ ...s, loaf_weight_grams: v })} label="Loaf weight" suffix="g" />
      <InputRange min={1} max={20} step={1} value={s.loaf_count} onChange={v => setState({ ...s, loaf_count: v })} label="Loaf count" suffix={loafSuffix(s.loaf_count)} />
    </div>
  </div></Card></div>
}

function CalculatorAdvancedOptions({ s, setState }: { s: CalculatorState, setState: React.Dispatch<React.SetStateAction<CalculatorState>> }) {
  const setPar = (partialState: Partial<CalculatorState>) => setState({ ...s, ...partialState });

  return <div>
    {/* <Heading>Percentages</Heading> */}
    {/* <InputPercent value={s.hydartion_percent} onChange={v => setPar({ hydartion_percent: v })} label="Hydration % (Water/Flour)" />
    <InputPercent value={s.mixing_percent} onChange={v => setPar({ mixing_percent: v })} label="Mixing % (Levain/Weight)" />
    <InputPercent value={s.salt_percent} onChange={v => setPar({ salt_percent: v })} label="Salt Percent" />
    <Heading>Weights</Heading>
    <InputGrams value={s.stage1_excess_g} onChange={v => setPar({ stage1_excess_g: v })} label="Excess (From Stage 1)" />
    <InputGrams value={s.loaf_weight_g} onChange={v => setPar({ loaf_weight_g: v })} label="Loaf weight" />
    <InputLoafCount value={s.loaf_count} onChange={v => setPar({ loaf_count: v })} label="Loaf count" />
    <Heading>Weather Determined</Heading>
    <InputGrams value={s.stage1_starter_g} onChange={v => setPar({ stage1_starter_g: v })} label="Stage 1 Starter" />
    <InputGrams value={s.stage2_starter_g} onChange={v => setPar({ stage2_starter_g: v })} label="Stage 2 Starter" /> */}
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
