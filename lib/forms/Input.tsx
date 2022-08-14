import { isNumber } from "lodash";
import React from "react";
import { useId } from "./useId";

type MaxMinStep = {
  max?: number,
  min?: number,
  step?: number,
}

type InputProps = {
  label: string,
  value?: number,
  onChange?: (val: number) => void
} & MaxMinStep;

export function InputGrams(props: InputProps) {
  return <InputNumber {...props} suffix="g" />
}

export function InputPercent(props: InputProps) {
  return <InputNumber min={0} max={100} {...props} suffix="%" offsetRight={30} />
}

export function InputLoafCount(props: InputProps) {
  const suffix = props.value === 1 ? 'loaf' : 'loaves'
  return <InputNumber {...props} suffix={suffix} offsetRight={50} />
}

export function InputRange(props: InputProps & { decimals?: number, suffix?: string }) {
  const id = useId(props.label);
  const value = props.value.toFixed(isNumber(props.decimals) ? props.decimals : 0);
  const onChange = (val: string) => {
    const float = +parseFloat(val).toFixed(2);
    props.onChange?.(float);
  }
  return <div className="relative">
    <label htmlFor={id} className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      <div>{props.label}</div>
      <div>{value} {props.suffix}</div>
    </label>
    <input id={id} type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
    </input>
  </div>
}

function InputNumber(props: InputProps & { suffix: string, offsetRight?: number }) {
  const id = useId(props.label);
  const value = props.value.toFixed(2);

  const onChange = (val: string) => {
    const float = +parseFloat(val).toFixed(2);
    props.onChange?.(float);
  }
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="number"
          name={id}
          id={id}
          min={props.min}
          max={props.max}
          step={props.step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm pr-3 border-gray-300 rounded-md text-right"
          style={{ paddingRight: props.offsetRight }}
          placeholder="0"
          aria-describedby="input-suffix"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm" id="input-suffix">
            {props.suffix}
          </span>
        </div>
      </div>
    </div>
  )
}