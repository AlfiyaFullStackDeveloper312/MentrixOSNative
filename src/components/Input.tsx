import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {InputStyles} from '../styles/inputStyle';

type Props = TextInputProps;

function Input({style, ...props}: Props) {
  return (
    <TextInput
      style={[InputStyles.input, style]}
      placeholderTextColor="#888888"
      {...props}
    />
  );
}

export default Input;
