import {StyleSheet} from 'react-native';

const Dashboardstyle = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  menuBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },

  brand: {
    fontSize: 18,
    fontWeight: '700',
  },

  avatar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },

  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
  },

  highlight: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2F80ED',
    marginTop: 5,
  },
});

export default Dashboardstyle;
