import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import Head from "next/head";

import type { GetStaticProps } from "next";
import type { IEpisode } from "../interfaces/episodes";

import api from "../services/api";

import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import Image from "next/image";
import {
  AllEpisodes,
  Container,
  EpisodeDetails,
  LatestEpisodes,
} from "../styles/index";

import { usePlayer } from "../contexts/player";

type HomeProps = {
  latestEpisodes: IEpisode[];
  allEpisodes: IEpisode[];
};

const Home = ({ latestEpisodes, allEpisodes }: HomeProps) => {
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <Container>
      <Head>
        <title>Home | Podcastr</title>
      </Head>
      <LatestEpisodes>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  objectFit="cover"
                  src={episode.thumbnail}
                  alt={episode.title}
                />

                <EpisodeDetails>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </EpisodeDetails>

                <button
                  type="button"
                  onClick={() => playList(episodeList, index)}
                >
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            );
          })}
        </ul>
      </LatestEpisodes>

      <AllEpisodes>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </thead>

          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        playList(episodeList, index + latestEpisodes.length)
                      }
                    >
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AllEpisodes>
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode: IEpisode) => {
    episode.publishedAt = format(parseISO(episode.published_at), "d MMM yy", {
      locale: ptBR,
    });
    episode.duration = episode.file.duration;
    episode.durationAsString = convertDurationToTimeString(
      episode.file.duration
    );
    episode.url = episode.file.url;
    return episode;
  });

  return {
    props: {
      latestEpisodes: episodes.slice(0, 2),
      allEpisodes: episodes.slice(2, episodes.length),
    },
    revalidate: 24 * 60 * 60,
  };
};
