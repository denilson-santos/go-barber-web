import React, { ButtonHTMLAttributes } from 'react';

import * as Style from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Style.Button type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Style.Button>
);

export default Button;
