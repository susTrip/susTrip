import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { calcSum } from './Trips'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Emissions() {
  const emission = calcSum()
  return (
    <React.Fragment>
      <Title>Monthly Emission</Title>
      <Typography component="p" variant="h5">
      {`${emission} Kg CO2e`}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 3 September, 2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Monthly Emission
        </Link>
      </div>
    </React.Fragment>
  );
}