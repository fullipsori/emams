"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as _ from "lodash";

const colors = d3.interpolateCool;
const format = d3.timeFormat("%d");

interface XAxisProps {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  scale: d3.AxisScale<number | { valueOf(): number }>;
}

const XAxis: React.FC<XAxisProps> = ({
  top,
  bottom,
  left,
  right,
  height,
  scale,
}) => {
  const axis = useRef<SVGGElement | null>(null);

  useEffect(() => {
    d3.select(axis.current!).call(
      d3.axisBottom(scale).tickFormat((d: any) => format(d) as string)
    );
  }, [scale]);

  return (
    <g
      className="axis x"
      ref={axis}
      transform={`translate(${left}, ${height - bottom})`}
    />
  );
};

interface YAxisProps {
  top: number;
  bottom: number;
  left: number;
  right: number;
  scale: d3.AxisScale<number | { valueOf(): number }>;
}

const YAxis: React.FC<YAxisProps> = ({ top, bottom, left, right, scale }) => {
  const axis = useRef<SVGGElement | null>(null);

  useEffect(() => {
    d3.select(axis.current!).call(d3.axisLeft(scale) as any);
  }, [scale]);

  return (
    <g className="axis y" ref={axis} transform={`translate(${left}, ${top})`} />
  );
};

interface PathProps {
  index: number;
  area: d3.Area<[number, number]>;
  data: any[];
  prev: any[];
  x: any;
  y: d3.ScaleLinear<
    number | { valueOf(): number },
    number | { valueOf(): number }
  >;
  height: number;
  top: number;
  bottom: number;
}

const Path: React.FC<PathProps> = ({
  index,
  area,
  data,
  prev,
  x,
  y,
  height,
  top,
  bottom,
}) => {
  const interpolator = d3.interpolate(prev, data);
  const pathD = area(interpolator(1)) || undefined;
  return (
    <g className="area">
      <path d={pathD} fill={colors(index / 10)} stroke={colors(index / 10)} />
    </g>
  );
};

interface AreaProps {
  data: any[];
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const AreaChart2: React.FC<AreaProps> = (props) => {
  const generateData = (length = 10, set = 10) =>
    d3.range(set).map((series, index) => ({
      series: index,
      data: d3.range(length).map((d, i) => ({
        date: new Date(2019, 2, i + 1),
        value: Math.random() * 100,
      })),
    }));

  const [data, setData] = useState(generateData());

  const changeData = () => {
    setData(generateData());
  };

  const aggregation = data.reduce((acc: any, arr: any) => {
    const customizer = (objValue: any, srcValue: any) => ({
      ...objValue,
      ...srcValue,
      [arr.series]: srcValue.value,
      value: objValue ? objValue.value + srcValue.value : srcValue.value,
    });

    return _.mergeWith(acc, arr.data, customizer);
  }, []);

  const x = d3
    .scaleTime()
    .range([0, props.width - props.left - props.right])
    .domain(d3.extent(aggregation, (d: any) => d.date) as [any, any]);

  const y = d3
    .scaleLinear()
    .range([props.height - props.top - props.bottom, 0])
    .domain([0, d3.max(aggregation, (d: any) => d.value) as any]);

  const keys = props.data.map((d) => d.series);

  const stack = d3
    .stack()
    .keys(keys)
    .value((d, key) => d[key]);

  const dataset = stack(aggregation);
  const cache = useRef(dataset);

  const area = (d: any, series: number) =>
    d3
      .area()
      .curve(d3.curveMonotoneX)
      .x((d, i) => x((dataset[series][i].data as any).date))
      .y0((d, i) => y(d[0]))
      .y1((d, i) => y(d[1]));

  useEffect(() => {
    cache.current = dataset;
  });

  return (
    <>
      <div>
        <div>
          <button onClick={changeData}>Transform</button>
        </div>
        <svg width={props.width} height={props.height}>
          <XAxis
            scale={x}
            top={props.top}
            bottom={props.bottom}
            left={props.left}
            right={props.right}
            height={props.height}
          />
          <YAxis
            scale={y}
            top={props.top}
            bottom={props.bottom}
            left={props.left}
            right={props.right}
          />
          <g transform={`translate(${props.left}, ${props.top})`}>
            {dataset.map((d, i) => (
              <Path
                key={i}
                index={i}
                area={area(d, i) as d3.Area<[number, number]>}
                data={d}
                prev={cache.current[i]}
                x={x}
                y={y}
                top={props.top}
                bottom={props.bottom}
                height={props.height}
              />
            ))}
          </g>
        </svg>
      </div>
    </>
  );
};

export default AreaChart2;
