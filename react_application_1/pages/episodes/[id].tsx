import { GetStaticPaths, GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { IEpisode } from "../../interfaces/episodes";

import api from "../../services/api";

import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

import Image from "next/image";
import {
  Container,
  Description,
  ThumbnailContainer,
} from "../../styles/episodes";

type EpisodeProps = {
  episode: IEpisode;
};

export default function Episode({ episode }: EpisodeProps) {
  return (
    <Container>
      <ThumbnailContainer>
        <button type="button">
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button">
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
  return {
    paths: [],
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