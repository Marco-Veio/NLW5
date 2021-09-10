import { useContext, useEffect, useRef } from "react";

import Image from "next/image";
import {
  Buttons,
  Container,
  CurrentEpisode,
  EmptyPlayer,
  EmptySlider,
  Footer,
  PlayButton,
  Progress,
  SliderContainer,
} from "./styles";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

import { PlayerContext } from "../../contexts/player";

const Player = () => {
  const { episodeList, currentEpisodeIndex, isPlaying, togglePlay } =
    useContext(PlayerContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <Container>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <CurrentEpisode>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </CurrentEpisode>
      ) : (
        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>
      )}

      <Footer empty={episode ? false : true}>
        <Progress>
          <span>00:00</span>
          <SliderContainer>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <EmptySlider></EmptySlider>
            )}
          </SliderContainer>
          <span>00:00</span>
        </Progress>

        <Buttons>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />;
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />;
          </button>
          <PlayButton disabled={!episode} onClick={() => togglePlay()}>
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </PlayButton>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar Próxima" />;
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />;
          </button>
        </Buttons>
      </Footer>

      {episode && (
        <audio
          onPlay={() => togglePlay(true)}
          onPause={() => togglePlay(false)}
          ref={audioRef}
          src={episode.url}
          autoPlay
        />
      )}
    </Container>
  );
};

export { Player };
