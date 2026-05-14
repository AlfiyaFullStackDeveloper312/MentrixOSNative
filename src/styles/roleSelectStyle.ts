import {StyleSheet} from 'react-native';

const RoleScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // 🔘 Change Institute Button
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',

    paddingVertical: 12,
    paddingHorizontal: 18,

    borderRadius: 30,
    borderWidth: 1,

    marginTop: 14,
    marginBottom: 20,
  },

  backIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    resizeMode: 'contain',
  },

  changeText: {
    fontSize: 15,
    fontWeight: '600',
  },

  // 🏫 Institute Card
  instCard: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 16,
    borderRadius: 20,
    borderWidth: 1,

    marginBottom: 22,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 14,
  },

  instName: {
    fontSize: 17,
    fontWeight: '600',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    resizeMode: 'contain',
  },

  location: {
    fontSize: 13,
  },

  verifyIcon: {
    width: 26,
    height: 26,
    marginLeft: 10,
    resizeMode: 'contain',
  },

  // 🧠 Title
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 6,
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 22,
  },

  // 📜 Footer
  footer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 50,
    paddingHorizontal: 10,
    lineHeight: 18,
  },
});

export default RoleScreenStyle;
