import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  origin: string,
  destination: string,
  distance: number,
  mode: string,
  emission: number,
) {
  return { id, date, name, origin, destination, distance, mode, emission };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Roadtrip 101',
    'Philadelphia, PA',
    'New York, NY',
    312.44,
    'Amtrak',
    1234,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Origin</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell align="right">Emission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.origin}</TableCell>
              <TableCell>{row.destination}</TableCell>
              <TableCell>{`${row.distance} km`}</TableCell>
              <TableCell>{row.mode}</TableCell>
              <TableCell align="right">{`${row.emission} kt`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more trips
      </Link>
    </React.Fragment>
  );
}