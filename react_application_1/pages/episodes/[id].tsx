import { GetStaticPaths, GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import Head from "next/head";

import type { IEpisode } from "../../interfaces/episodes";

import api from "../../services/api";

import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

import Image from "next/image";
import {
  Container,
  Description,
  ThumbnailContainer,
} from "../../styles/episodes";
import { usePlayer } from "../../contexts/player";
import React from "react";

type EpisodeProps = {
  episode: IEpisode;
};

export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer();

  return (
    <Container>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <ThumbnailContainer>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </ThumbnailContainer>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <Description dangerouslySetInnerHTML={{ __html: episode.description }} />
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("/episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const paths = await data.map((episode: IEpisode) => {
    return {
      params: {
        id: episode.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = ctx.params;

  const { data } = await api.get(`/episodes/${params!.id}`);

  data.publishedAt = format(parseISO(data.published_at), "d MMM yy", {
    locale: ptBR,
  });
  data.duration = data.file.duration;
  data.durationAsString = convertDurationToTimeString(data.file.duration);
  data.url = data.file.url;

  return {
    props: {
      episode: data,
    },
    revalidate: 24 * 60 * 60,
  };
};
