import {StyleSheet} from 'react-native';

const LogoutButtonStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },

  logoutBtn: {
    backgroundColor: '#c84747',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  cancelText: {
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default LogoutButtonStyle;
