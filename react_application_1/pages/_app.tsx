import type { AppProps } from "next/app";

import "../styles/global.scss";
import { Container } from "../styles/app";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import PlayerContextProvider from "../contexts/player";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerContextProvider>
      <Container>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </Container>
    </PlayerContextProvider>
  );
}

export default MyApp;
