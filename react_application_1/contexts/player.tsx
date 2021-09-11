import { createContext, ReactNode, useContext, useState } from "react";

import { IEpisode } from "../interfaces/episodes";
type IPlayer = {
  episodeList: IEpisode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  isShuffling: boolean;

  play: (episode: IEpisode) => void;
  playList: (list: IEpisode[], index: number) => void;
  togglePlay: (state?: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
};
type IProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as IPlayer);

export default function PlayerContextProvider({ children }: IProps) {
  const [episodeList, setEpisodeList] = useState([] as IEpisode[]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = currentEpisodeIndex + 1 < episodeList.length;

  const play = (episode: IEpisode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const playList = (list: IEpisode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = (state: boolean = !isPlaying) => {
    setIsPlaying(state);
  };

  const playNext = () => {
    if (isShuffling) {
      setCurrentEpisodeIndex(Math.floor(Math.random() * episodeList.length));
    } else {
      if (hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      } else {
        clearPlayerState();
      }
    }
  };

  const playPrevious = () => {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const clearPlayerState = () => {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  };

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffling,
        play,
        playList,
        togglePlay,
        playNext,
        playPrevious,
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
