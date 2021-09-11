import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import {
  Buttons,
  Container,
  CurrentEpisode,
  EmptyPlayer,
  EmptySlider,
  Footer,
  ToggleButton,
  PlayButton,
  Progress,
  SliderContainer,
} from "./styles";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

import { usePlayer } from "../../contexts/player";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

const Player = () => {
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    hasNext,
    hasPrevious,
    isLooping,
    isShuffling,
    togglePlay,
    playNext,
    playPrevious,
    toggleLoop,
    toggleShuffle,
  } = usePlayer();

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

  const selectAudioTime = (amount: number) => {
    audioRef.current!.currentTime = amount;
    setProgress(amount);
  };

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

      <Footer>
        <Progress empty={episode ? false : true}>
          <span>{convertDurationToTimeString(progress)}</span>
          <SliderContainer>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
                onChange={selectAudioTime}
              />
            ) : (
              <EmptySlider></EmptySlider>
            )}
          </SliderContainer>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </Progress>

        <Buttons>
          <ToggleButton
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            active={isShuffling}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />;
          </ToggleButton>
          <button
            type="button"
            disabled={!episode || !hasPrevious}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />;
          </button>
          <PlayButton disabled={!episode} onClick={() => togglePlay()}>
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </PlayButton>
          <button
            type="button"
            disabled={!episode || (!isShuffling && !hasNext)}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Tocar Próxima" />;
          </button>
          <ToggleButton
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
            active={isLooping}
          >
            <img src="/repeat.svg" alt="Repetir" />;
          </ToggleButton>
        </Buttons>
      </Footer>

      {episode && (
        <audio
          onPlay={() => togglePlay(true)}
          onPause={() => togglePlay(false)}
          onEnded={() => {
            playNext();
            setProgress(0);
          }}
          onTimeUpdate={(event) => {
            setProgress(Math.floor(event.currentTarget.currentTime));
          }}
          ref={audioRef}
          src={episode.url}
          autoPlay
          loop={isLooping && !isShuffling}
          onLoadedMetadata={() => (audioRef.current!.currentTime = 0)}
        />
      )}
    </Container>
  );
};

export { Player };
