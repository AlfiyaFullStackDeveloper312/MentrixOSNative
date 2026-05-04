import {StyleSheet} from 'react-native';

const HeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 36,
    height: 36,
    marginRight: 10,
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

export default HeaderStyles;
