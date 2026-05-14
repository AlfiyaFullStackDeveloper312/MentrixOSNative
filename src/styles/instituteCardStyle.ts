import {StyleSheet} from 'react-native';
const getStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      marginBottom: 14,
      marginHorizontal: 16,
      borderRadius: 18,
      borderWidth: 1,
      elevation: 2,
    },

    left: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },

    logo: {
      width: 60,
      height: 58,
      borderRadius: 12,
      marginRight: 12,
    },

    name: {
      fontSize: 16,
      fontWeight: '600',
    },

    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },

    locationIcon: {
      width: 16,
      height: 16,
      marginRight: 4,
    },

    location: {
      fontSize: 14,
    },

    rightRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    badgeContainer: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      marginRight: 10,
    },

    badgeText: {
      fontSize: 13,
      fontWeight: '500',
    },

    arrowBox: {
      width: 36,
      height: 36,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
    },

    arrowIcon: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },
  });

export default getStyles;
