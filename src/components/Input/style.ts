import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

type InputProps = {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
};

export const Input = styled.div<InputProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #fa3734;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `}

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  span {
    color: #f4ede8;
    background: #fa3734;

    &:before {
      border-color: #fa3734 transparent;
    }
  }
`;
