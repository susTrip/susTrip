import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { calcSum } from './Trips'


// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}
const data = [
  createData('0', 0),
  createData('3rd', 45),
  createData('6th', 90),
  createData('9th', 102),
  createData('12th', 130),
  createData('15th', undefined),
  createData('18th', undefined),
  createData('21th', undefined),
  createData('24th', undefined),
  createData('27th', undefined),
  createData('30th', undefined),
  
];

export default function Chart() {

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Monthly Emission Chart</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Kilo Grams (Kg)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}