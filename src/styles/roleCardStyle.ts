// import {StyleSheet} from 'react-native';

// const RoleCardstyles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     marginBottom: 14,
//     borderRadius: 16,
//     elevation: 2,
//   },

//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   icon: {
//     width: 29,
//     height: 29,
//     marginRight: 12,
//     resizeMode: 'contain',
//   },

//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   desc: {
//     fontSize: 12,
//     marginTop: 3,
//   },

//   arrowBox: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//   },

//   arrowIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
// });

// export default RoleCardstyles;
import {StyleSheet} from 'react-native';

const RoleCardstyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 18,
    paddingHorizontal: 16,

    marginBottom: 16,
    borderRadius: 20,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: 34,
    height: 34,
    marginRight: 14,
    resizeMode: 'contain',
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  desc: {
    fontSize: 14,
    marginTop: 4,
  },

  arrowBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

export default RoleCardstyles;
