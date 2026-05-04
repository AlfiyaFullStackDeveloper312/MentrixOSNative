import {StyleSheet} from 'react-native';

const dashboardCardStyles = StyleSheet.create({
  card: {
    width: '47%',
    minHeight: 150,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },

  number: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },

  description: {
    fontSize: 13,
    color: '#555',
  },
});

export default dashboardCardStyles;
