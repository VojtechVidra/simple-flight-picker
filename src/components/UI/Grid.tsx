import styled from "styled-components";

interface Props {
  container?: boolean;
  flex?: string | number;
  padding?: string;
}

export const Grid = styled.div<Props>`
  display: ${({ container }) => (container ? "flex" : "initial")};
  flex: ${({ flex }) => flex};
  padding: ${({ padding }) => padding};
`;
