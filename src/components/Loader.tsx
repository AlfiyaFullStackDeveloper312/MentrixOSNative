// import React from 'react';
// import {View, ActivityIndicator, StyleSheet} from 'react-native';

// function Loader() {
//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" />
//     </View>
//   );
// }
// export default Loader;
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {LoaderStyles} from '../styles/loaderStyles';

function Loader() {
  return (
    <View style={LoaderStyles.container}>
      <ActivityIndicator size="large" color="#083819" />
    </View>
  );
}

export default Loader;
