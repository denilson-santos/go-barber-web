import { useField } from '@unform/core';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { FiAlertCircle } from 'react-icons/fi';

import * as Style from './style';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  containerStyle?: {
    [key: string]: number | string;
  };
  icon?: React.ComponentType<IconBaseProps>;
};

const Input: React.FC<InputProps> = ({
  name,
  containerStyle,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFilled(Boolean(inputRef.current?.value));
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Style.Input
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={Boolean(error)}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Style.Error title={error}>
          <FiAlertCircle color="#fa3734" size={20} />
        </Style.Error>
      )}
    </Style.Input>
  );
};

export default Input;
