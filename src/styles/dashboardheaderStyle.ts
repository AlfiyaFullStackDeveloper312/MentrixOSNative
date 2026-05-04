import {StyleSheet} from 'react-native';

const DashboardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,

    borderBottomWidth: 1,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
  },

  logo: {
    width: 36,
    height: 36,
    marginRight: 12,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
  },

  profileCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  logoutContainer: {
    position: 'absolute',
    top: 70,
    right: 16,
    zIndex: 10,
  },
});

export default DashboardHeaderStyles;
