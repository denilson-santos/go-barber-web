import React, { ButtonHTMLAttributes } from 'react';

import * as Style from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Style.Button type="button" {...rest}>
    {children}
  </Style.Button>
);

export default Button;
