// import {StyleSheet} from 'react-native';

// export const getStyles = (isTablet: boolean, colors: any) => {
//   return StyleSheet.create({
//     // ----scroll
//     scroll: {
//       // flexGrow: 1,
//       // backgroundColor: colors.background,
//       flexGrow: 1,
//       backgroundColor: colors.background,
//       justifyContent: 'center',
//     },
//     // -----------container
//     container: {
//       // flex: 1,
//       // minHeight: '100%',
//       // paddingHorizontal: 20,
//       // paddingTop: 10,
//       // paddingBottom: 20,

//     },
//     wrapper: {
//       flex: 1,
//       width: '100%',
//       alignItems: 'center', // ⭐ centers the card
//       paddingHorizontal: isTablet ? 40 : 20,
//     },

//     topBar: {
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       marginTop: 10,
//       marginBottom: 20,
//     },

//     iconBox: {
//       marginLeft: 10,
//       padding: 8,
//       backgroundColor: colors.card,
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: colors.inputborder,
//     },

//     icon: {
//       width: 20,
//       height: 20,
//       tintColor: colors.text,
//       resizeMode: 'contain',
//     },
//     // ---------logo---------------
//     logo: {
//       // width: 80,
//       // height: 80,
//       // alignSelf: 'center',
//       // marginBottom: 14,
//       // resizeMode: 'contain',
//       width: isTablet ? 120 : 80,
//       height: isTablet ? 120 : 80,
//       alignSelf: 'center',
//       marginBottom: 14,
//       resizeMode: 'contain',
//     },
//     // ----title
//     title: {
//       // fontSize: 28,
//       fontSize: isTablet ? 34 : 28,
//       fontWeight: '700',
//       textAlign: 'center',
//       color: colors.text,
//       marginBottom: 10,
//     },

//     titleBlue: {
//       color: '#2F80ED',
//     },

//     subtitle: {
//       textAlign: 'center',
//       color: colors.text,
//       marginTop: 8,
//       fontSize: 16,
//       fontWeight: '600',
//       lineHeight: 24,
//     },

//     highlight1: {
//       color: '#FF7A00',
//       fontWeight: '700',
//     },

//     highlight2: {
//       color: '#6C4DFF',
//       fontWeight: '700',
//     },

//     subtext: {
//       textAlign: 'center',
//       color: colors.gray,
//       marginTop: 10,
//       marginBottom: 28,
//       fontSize: 15,
//       lineHeight: 22,
//     },

//     operatingText: {
//       color: colors.text,
//       fontWeight: '600',
//     },

//     // INPUT
//     inputBox: {
//       backgroundColor: colors.card,
//       height: 52,
//       paddingHorizontal: 15,
//       borderRadius: 10,
//       marginTop: 10,
//       borderWidth: 1,
//       borderColor: colors.inputborder,
//       color: colors.text,
//     },

//     phoneRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },

//     flagBox: {
//       padding: 10,
//       backgroundColor: colors.card,
//       borderRadius: 10,
//       marginRight: 10,
//       borderWidth: 1,
//       borderColor: colors.inputborder,
//     },

//     phoneInputBox: {
//       flex: 1,
//       backgroundColor: colors.card,
//       height: 52,
//       paddingHorizontal: 15,
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: colors.inputborder,
//       color: colors.text,
//     },

//     sendBtn: {
//       backgroundColor: colors.primary,
//       height: 52,
//       borderRadius: 10,
//       marginTop: 15,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },

//     sendText: {
//       color: '#fff',
//       fontWeight: '600',
//       fontSize: 16,
//     },
//     // ----button
//     buttonRow: {
//       // flexDirection: 'row',
//       // justifyContent: 'space-between',
//       // marginTop: 15,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginTop: 15,
//       gap: isTablet ? 20 : 10,
//     },

//     halfBtn: {
//       width: '48%',
//       backgroundColor: colors.primary,
//       height: 52,
//       borderRadius: 10,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },

//     forgotText: {
//       alignSelf: 'flex-end',
//       marginTop: 12,
//       color: '#0073FF',
//       fontSize: 14,
//       textDecorationLine: 'underline',
//     },

//     otpTitle: {
//       fontSize: 18,
//       fontWeight: '500',
//       color: colors.text,
//       marginTop: 20,
//       marginBottom: 20,
//     },

//     otpRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 20,
//     },
//     // ------otp
//     otpBox: {
//       // width: 48,
//       width: isTablet ? 60 : 48,
//       height: 52,
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: colors.inputborder,
//       backgroundColor: colors.card,
//       fontSize: 18,
//       color: colors.text,
//       // outlineStyle: 'none',
//     },

//     resendText: {
//       fontSize: 15,
//       color: colors.text,
//       marginBottom: 15,
//       alignSelf: 'flex-start',
//     },

//     resendLink: {
//       color: '#2F80ED',
//       fontWeight: '600',
//     },

//     orContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginVertical: 28,
//     },

//     line: {
//       flex: 1,
//       height: 1,
//       backgroundColor: colors.inputborder,
//     },

//     orText: {
//       marginHorizontal: 10,
//       color: colors.gray,
//       fontWeight: '600',
//     },

//     joinButton: {
//       backgroundColor: colors.card,
//       padding: 15,
//       borderRadius: 12,
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexDirection: 'row',
//       borderWidth: 1,
//       borderColor: colors.inputborder,
//     },

//     joinIcon: {
//       width: 20,
//       height: 20,
//       marginRight: 8,
//       resizeMode: 'contain',
//     },

//     joinText: {
//       color: colors.text,
//       fontWeight: '600',
//       fontSize: 16,
//     },

//     footer: {
//       marginTop: 40,
//       marginBottom: 20,
//       alignItems: 'center',
//     },

//     footerTitle: {
//       fontWeight: '700',
//       color: colors.cardsubtext,
//       fontSize: 16,
//       marginBottom: 6,
//       textAlign: 'center',
//     },

//     footerSub: {
//       color: colors.gray,
//       marginBottom: 20,
//       fontSize: 15,
//       textAlign: 'center',
//     },

//     setupBox: {
//       backgroundColor: colors.card,
//       padding: 18,
//       borderRadius: 16,
//       width: '100%',
//       marginBottom: 20,
//     },

//     setupText: {
//       color: colors.gray,
//       fontSize: 15,
//       marginBottom: 5,
//     },

//     setupLink: {
//       color: '#007AFF',
//       marginTop: 5,
//       fontWeight: '600',
//       fontSize: 16,
//     },

//     terms: {
//       color: colors.gray,
//       fontSize: 13,
//       textAlign: 'center',
//       marginBottom: 4,
//     },

//     link: {
//       color: '#2F80ED',
//       fontSize: 13,
//       textAlign: 'center',
//     },
//   });
// };

import {StyleSheet} from 'react-native';

export const getStyles = (isTablet: boolean, colors: any) => {
  return StyleSheet.create({
    // ----scroll
    scroll: {
      // flexGrow: 1,
      // backgroundColor: colors.background,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    // -----------container
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: isTablet ? 60 : 20, // more breathing space on iPad
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: isTablet ? 30 : 20,

      // spacing from screen edges
      marginHorizontal: isTablet ? 20 : 0,
      marginTop: 20,

      // shadow (for iPad look)
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    wrapper: {
      flex: 1,
      width: '100%',
      alignItems: 'center', // ⭐ centers the card
      paddingHorizontal: isTablet ? 40 : 20,
    },

    topBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      marginBottom: 20,
    },

    iconBox: {
      marginLeft: 10,
      padding: 8,
      backgroundColor: colors.card,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.inputborder,
    },

    icon: {
      width: 20,
      height: 20,
      tintColor: colors.text,
      resizeMode: 'contain',
    },
    // ---------logo---------------
    logo: {
      // width: 80,
      // height: 80,
      // alignSelf: 'center',
      // marginBottom: 14,
      // resizeMode: 'contain',
      width: isTablet ? 120 : 80,
      height: isTablet ? 120 : 80,
      alignSelf: 'center',
      marginBottom: 14,
      resizeMode: 'contain',
    },
    // ----title
    title: {
      // fontSize: 28,
      fontSize: isTablet ? 34 : 28,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.text,
      marginBottom: 10,
    },

    titleBlue: {
      color: '#2F80ED',
    },

    subtitle: {
      textAlign: 'center',
      color: colors.text,
      marginTop: 8,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },

    highlight1: {
      color: '#FF7A00',
      fontWeight: '700',
    },

    highlight2: {
      color: '#6C4DFF',
      fontWeight: '700',
    },

    subtext: {
      textAlign: 'center',
      color: colors.gray,
      marginTop: 10,
      marginBottom: 28,
      fontSize: 15,
      lineHeight: 22,
    },

    operatingText: {
      color: colors.text,
      fontWeight: '600',
    },

    // INPUT
    inputBox: {
      backgroundColor: colors.card,
      height: 52,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginTop: 10,
      borderWidth: 1,
      borderColor: colors.inputborder,
      color: colors.text,
    },

    phoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    flagBox: {
      padding: 10,
      backgroundColor: colors.card,
      borderRadius: 10,
      marginRight: 10,
      borderWidth: 1,
      borderColor: colors.inputborder,
    },

    phoneInputBox: {
      flex: 1,
      backgroundColor: colors.card,
      height: 52,
      paddingHorizontal: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.inputborder,
      color: colors.text,
    },

    sendBtn: {
      backgroundColor: colors.primary,
      height: 52,
      borderRadius: 10,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },

    sendText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    // ----button
    buttonRow: {
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      gap: isTablet ? 20 : 10,
    },

    halfBtn: {
      width: '48%',
      backgroundColor: colors.primary,
      height: 52,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    forgotText: {
      alignSelf: 'flex-end',
      marginTop: 12,
      color: '#0073FF',
      fontSize: 14,
      textDecorationLine: 'underline',
    },

    otpTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.text,
      marginTop: 20,
      marginBottom: 20,
    },

    otpRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    // ------otp
    otpBox: {
      // width: 48,
      width: isTablet ? 60 : 48,
      height: 52,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.inputborder,
      backgroundColor: colors.card,
      fontSize: 18,
      color: colors.text,
      // outlineStyle: 'none',
    },

    resendText: {
      fontSize: 15,
      color: colors.text,
      marginBottom: 15,
      alignSelf: 'flex-start',
    },

    resendLink: {
      color: '#2F80ED',
      fontWeight: '600',
    },

    orContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 28,
    },

    line: {
      flex: 1,
      height: 1,
      backgroundColor: colors.inputborder,
    },

    orText: {
      marginHorizontal: 10,
      color: colors.gray,
      fontWeight: '600',
    },

    joinButton: {
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.inputborder,
    },

    joinIcon: {
      width: 20,
      height: 20,
      marginRight: 8,
      resizeMode: 'contain',
    },

    joinText: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 16,
    },

    footer: {
      marginTop: 40,
      marginBottom: 20,
      alignItems: 'center',
    },

    footerTitle: {
      fontWeight: '700',
      color: colors.cardsubtext,
      fontSize: 16,
      marginBottom: 6,
      textAlign: 'center',
    },

    footerSub: {
      color: colors.gray,
      marginBottom: 20,
      fontSize: 15,
      textAlign: 'center',
    },

    setupBox: {
      backgroundColor: colors.card,
      padding: 18,
      borderRadius: 16,
      width: '100%',
      marginBottom: 20,
    },

    setupText: {
      color: colors.gray,
      fontSize: 15,
      marginBottom: 5,
    },

    setupLink: {
      color: '#007AFF',
      marginTop: 5,
      fontWeight: '600',
      fontSize: 16,
    },

    terms: {
      color: colors.gray,
      fontSize: 13,
      textAlign: 'center',
      marginBottom: 4,
    },

    link: {
      color: '#2F80ED',
      fontSize: 13,
      textAlign: 'center',
    },
  });
};
