import React from 'react';
import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';

import {Buttonstyles} from '../styles/buttonStyle';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function Button({title, onPress, disabled = false, style, textStyle}: Props) {
  return (
    <TouchableOpacity
      style={[Buttonstyles.button, style, disabled && Buttonstyles.disabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}>
      <Text style={[Buttonstyles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
