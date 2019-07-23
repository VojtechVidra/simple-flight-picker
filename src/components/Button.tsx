import styled from "styled-components";

export const Button = styled.button<{ onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; hidden?: boolean }>`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: block;
  :focus {
    outline: none;
  }

  visibility: ${({ hidden }) => (hidden ? "hidden" : "initial")};
`;
