import {
  Buttons,
  Container,
  EmptyPlayer,
  EmptySlider,
  Footer,
  PlayButton,
  Progress,
  Slider,
} from "./styles";

const Player = () => {
  return (
    <Container>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </EmptyPlayer>

      <Footer>
        <Progress>
          <span>00:00</span>
          <Slider>
            <EmptySlider></EmptySlider>
          </Slider>
          <span>00:00</span>
        </Progress>

        <Buttons>
          <button type="button">
            <img src="/shuffle.svg" alt="Embaralhar" />;
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Tocar anterior" />;
          </button>
          <PlayButton>
            <img src="/play.svg" alt="Tocar" />
          </PlayButton>
          <button type="button">
            <img src="/play-next.svg" alt="Tocar Próxima" />;
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repetir" />;
          </button>
        </Buttons>
      </Footer>
    </Container>
  );
};

export { Player };
