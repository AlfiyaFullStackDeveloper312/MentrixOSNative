import {StyleSheet} from 'react-native';

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.isDark ? '#181818' : colors.background,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 10,
    },

    logoText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },

    profileCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },

    profileText: {
      fontWeight: '600',
      color: colors.text,
    },

    title: {
      fontSize: 26,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.text,
      marginTop: 10,
    },

    subtitle: {
      textAlign: 'center',
      color: colors.gray,
      marginHorizontal: 20,
      marginTop: 8,
      marginBottom: 16,
    },

    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      marginHorizontal: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.gray,
      marginBottom: 10,
    },

    searchIcon: {
      width: 30,
      height: 30,
      marginRight: 8,
    },

    input: {
      flex: 1,
      height: 45,
      color: colors.text,
    },

    footer: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.gray,
      padding: 16,
      marginBottom: 60,
    },
  });

export default getStyles;
