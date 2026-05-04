import {StyleSheet} from 'react-native';
import {lightColors} from '../theme/colors';
import {typography} from '../theme/typography';

export const Buttonstyles = StyleSheet.create({
  button: {
    backgroundColor: lightColors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    ...typography.buttonText,
  },

  disabled: {
    opacity: 0.5,
  },
});
