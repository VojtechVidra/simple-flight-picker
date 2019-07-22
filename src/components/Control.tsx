import React from "react";
import { ControlProps } from "react-select/src/components/Control";
import styled, { css } from "styled-components";

const controlBoxShadow = css`
  box-shadow: rgba(5, 15, 34, 0.45) 0px 0px 54px 0px;
`;

const StyledControl = styled.div<{ focused: boolean }>`
  display: flex;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  padding: 20px 15px 0;
  font-size: 18px;

  :hover {
    ${controlBoxShadow}
  }
  ${({ focused }) => `
    ${focused && controlBoxShadow}
  `}
`;

const StyledControlLabel = styled.div<{ active: boolean }>`
  position: absolute;
  top: ${({ active }) => (active ? "10px" : "24px")};
  line-height: 1;
  font-size: ${({ active }) => (active ? "12px" : "16px")};
  transition: all 0.2s;
  color: #646b78;
`;

export function Control<T>(props: ControlProps<T>) {
  const {
    children,
    innerRef,
    innerProps,
    hasValue,
    isFocused,
    selectProps: { placeholder }
  } = props;
  return (
    <StyledControl focused={isFocused} ref={innerRef} {...innerProps}>
      <StyledControlLabel active={hasValue || isFocused}>{placeholder}</StyledControlLabel>
      {children}
    </StyledControl>
  );
}
