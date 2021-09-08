import styled from "styled-components";

import { IFooter } from "./interfaces";

export const Container = styled.div`
  width: 26.5rem;
  height: 100vh;
  padding: 3rem 4rem;

  background: var(--purple-500);
  color: var(--white);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }
`;

export const Footer = styled.div<IFooter>`
  align-self: stretch;
  opacity: ${(props) => (props.empty ? 0.5 : 1)};
`;

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 20rem;
  padding: 4rem;

  border: 1.5px dashed var(--purple-300);
  border-radius: 1.5rem;
  background: linear-gradient(
    143.8deg,
    rgba(145, 100, 250, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }
`;

export const Slider = styled.div`
  flex: 1;
`;
export const EmptySlider = styled.div`
  width: 100%;
  height: 4px;
  background: var(--purple-300);
  border-radius: 2px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1.5rem;

  button {
    background: transparent;
    border: 0;
    font-size: 0;
  }
`;

export const PlayButton = styled.button`
  width: 4rem !important;
  height: 4rem !important;
  border-radius: 1rem !important;
  background: var(--purple-400) !important;
`;
