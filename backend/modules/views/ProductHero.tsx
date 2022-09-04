import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';

const backgroundImage =
  'https://www.washingtonpost.com/resizer/qpl3oGloLhN6SQh3rIGHBmlC8PI=/arc-anglerfish-washpost-prod-washpost/public/MFKBDNTMW5FLPJNCDIRDTX57JY.jpg';

export default function ProductHero() {
  const { isLoading, loginWithRedirect } = useAuth0();
  if (isLoading) {
    return <button className="btn btn-primary">Loading...</button>;
  }
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Track your carbon footprint today!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        susTrip will help you to track your carbon footprint based on your mode of transportation and travel distance
      </Typography>
      <Box component="form" noValidate onSubmit={loginWithRedirect} sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                
                variant="contained"
                // sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
      </Box>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Travel Green, today!
      </Typography>
    </ProductHeroLayout>
  );
}
