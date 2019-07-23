import React from "react";
import styled from "styled-components";

const RotateIconView: React.FC = props => (
  <svg
    width="37px"
    height="29px"
    id="Vrstva_2"
    data-name="Vrstva 2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 37.03 29.35"
    {...props}
  >
    <title>Prohodit Lokace</title>
    <path d="M36.6,8.89a1.1,1.1,0,0,0-1.54.19l-2.14,2.76A14.67,14.67,0,0,0,5.39,8.13a1.1,1.1,0,1,0,2,1,12.48,12.48,0,0,1,23.4,3.11L27.87,10a1.1,1.1,0,0,0-1.35,1.74l4.92,3.82.11.06a1.05,1.05,0,0,0,.17.09,1.09,1.09,0,0,0,.34.07h.11a1.09,1.09,0,0,0,.38-.09,2.64,2.64,0,0,0,.36-.27l.07-.05,3.82-4.92A1.1,1.1,0,0,0,36.6,8.89Z" />
    <path d="M31.23,19.59a1.1,1.1,0,0,0-1.47.51,12.47,12.47,0,0,1-23.47-3l2.87,2.23a1.1,1.1,0,0,0,1.35-1.74L5.59,13.76A1.1,1.1,0,0,0,4.05,14L.23,18.87A1.1,1.1,0,0,0,2,20.22l2.15-2.77a14.67,14.67,0,0,0,27.62,3.62A1.1,1.1,0,0,0,31.23,19.59Z" />
  </svg>
);

export const RotateIcon = styled(RotateIconView)`
  transition: 0.3s;
  :hover {
    transform: rotate(180deg);
  }
  path {
    fill: white;
  }
`;
