import { createContext } from "react";

import { IEpisode } from "../interfaces/episodes";
type IPlayer = {
  episodeList: IEpisode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;

  play: (episode: IEpisode) => void;
  togglePlay: (state?: boolean) => void;
};

export const PlayerContext = createContext({} as IPlayer);
