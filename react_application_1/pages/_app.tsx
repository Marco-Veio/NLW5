import type { AppProps } from "next/app";

import "../styles/global.scss";
import { Container } from "../styles/app";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

      <Player />
    </Container>
  );
}

export default MyApp;
