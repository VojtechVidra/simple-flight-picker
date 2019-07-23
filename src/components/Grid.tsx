import styled from "styled-components";

interface Props {
  container?: boolean;
  flex?: string | number;
  padding?: string;
  justify?: string;
  align?: string;
  wrap?: string;
  basis?: string;
}

export const Grid = styled.div<Props>`
  display: ${({ container }) => (container ? "flex" : "initial")};
  flex: ${({ flex }) => flex};
  padding: ${({ padding }) => padding};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  flex-wrap: ${({ wrap }) => wrap};
  flex-basis: ${({ basis }) => basis};
`;
