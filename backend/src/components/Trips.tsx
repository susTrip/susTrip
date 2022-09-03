import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useQuery, useMutation } from '../../convex/_generated/react'


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const trips = useQuery("trip") || []
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
          {trips.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.date}</TableCell>
              <TableCell>{t.title}</TableCell>
              <TableCell>{t.origin}</TableCell>
              <TableCell>{t.destination}</TableCell>
              <TableCell>{`${t.distance} km`}</TableCell>
              <TableCell>{t.mode}</TableCell>
              <TableCell align="right">{`${t.emission} kt`}</TableCell>
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