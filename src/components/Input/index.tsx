import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';

import * as Style from './style';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ComponentType<IconBaseProps>;
};

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Style.Input>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Style.Input>
);

export default Input;
