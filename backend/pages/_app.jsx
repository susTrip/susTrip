import '../styles/globals.css'

import { ConvexProvider, ConvexReactClient } from 'convex/react'
import clientConfig from "../convex/_generated/clientConfig";
import convexConfig from "../convex.json";
import App, { Login } from "./index.jsx";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";

const convex = new ConvexReactClient(clientConfig);
const authInfo = convexConfig.authInfo[0];

function MyApp({ Component, pageProps }) {
  return (
    <ConvexProviderWithAuth0 client={convex} authInfo={authInfo} loggedOut={<Login />}>
        <Component {...pageProps} />
    </ConvexProviderWithAuth0>
  )
}

export default MyApp
