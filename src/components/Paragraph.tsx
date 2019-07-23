import styled from "styled-components";

export const Paragraph = styled.p<{ color?: string }>`
  color: ${({ color }) => color};
`;
