import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Emissions() {
  return (
    <React.Fragment>
      <Title>Recent Emission</Title>
      <Typography component="p" variant="h4">
        3,024.00 kt
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 4 September, 2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Monthly Emission
        </Link>
      </div>
    </React.Fragment>
  );
}