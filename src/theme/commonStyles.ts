import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },
});
