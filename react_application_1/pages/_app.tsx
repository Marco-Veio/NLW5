import type { AppProps } from "next/app";
import { useState } from "react";

import "../styles/global.scss";
import { Container } from "../styles/app";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import { IEpisode } from "../interfaces/episodes";

import { PlayerContext } from "../contexts/player";

function MyApp({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState([] as IEpisode[]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (episode: IEpisode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const togglePlay = (state: boolean = !isPlaying) => {
    setIsPlaying(state);
  };

  return (
    <PlayerContext.Provider
      value={{ episodeList, currentEpisodeIndex, isPlaying, play, togglePlay }}
    >
      <Container>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </Container>
    </PlayerContext.Provider>
  );
}

export default MyApp;
