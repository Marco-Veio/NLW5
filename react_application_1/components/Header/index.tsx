import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import Link from "next/link";

import { Container } from "./styles";

const Header = () => {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", { locale: ptBR });
  return (
    <Container>
      <Link href={"/"}>
        <button>
          <img src="/logo.svg" alt="Podcastr" />
        </button>
      </Link>
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </Container>
  );
};

export { Header };
