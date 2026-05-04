import {StyleSheet} from 'react-native';
import {lightColors} from '../theme/colors';
import {typography} from '../theme/typography';

export const InputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#3fb927',
    padding: 14,
    borderRadius: 10,
    backgroundColor: lightColors.card,
    color: lightColors.text,
    ...typography.body,
  },
});
