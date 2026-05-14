import React from 'react';
import {View, Text, FlatList, Image, TextInput} from 'react-native';

import {
  RouteProp,
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import {RootStackParamList} from '../navigation/AppNavigator';
import InstituteCard from '../components/InstituteCard';
import Header from '../components/Header';
import {getItem} from '../utils/storage';

import {useThemeStore} from '../store/themeStore';
import {lightColors, darkColors} from '../theme/colors';
import getStyles from '../styles/instituteScreenStyle';

type RouteType = RouteProp<RootStackParamList, 'InstituteList'>;

function InstituteListScreen() {
  const route = useRoute<RouteType>();

  const institutes = route.params?.institutes || [];

  const navigation = useNavigation<any>();

  const {isDark} = useThemeStore();

  const colors = isDark ? darkColors : lightColors;

  const styles = getStyles(colors);

  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const [searchText, setSearchText] = React.useState('');

  const [userName, setUserName] = React.useState('User');

  useFocusEffect(
    React.useCallback(() => {
      try {
        const user = getItem<any>('user');

        const name = user?.full_name || user?.name || user?.email || 'User';

        const firstName = name.split(' ')[0];

        setUserName(firstName);
      } catch (err) {
        console.log('Error loading user:', err);
      }
    }, []),
  );

  const filteredInstitutes = institutes.filter(item =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const handleInstitutePress = (item: any) => {
    setSelectedId(item.institute_id);

    navigation.navigate('SelectRole', {
      institute: item,
      institutes,
    });
  };

  const renderInstitute = ({item, index}: any) => (
    <InstituteCard
      index={index}
      name={item.name}
      instLogo={item.inst_logo}
      instlocation={item.inst_location}
      type={item.type}
      isSelected={selectedId === item.institute_id}
      onPress={() => handleInstitutePress(item)}
    />
  );

  return (
    <View testID="instituteScreen" style={styles.container}>
      <Header isDark={isDark} onLogout={handleLogout} />

      <Text testID="welcomeText" style={styles.title}>
        Hi, {userName} !👋
      </Text>

      <Text testID="subtitleText" style={styles.subtitle}>
        Select your institute to access your personalized dashboard
      </Text>

      {institutes.length >= 3 && (
        <View testID="searchBox" style={styles.searchBox}>
          <Image
            testID="searchIcon"
            source={require('../assets/search.png')}
            style={[styles.searchIcon, {tintColor: colors.gray}]}
          />

          <TextInput
            testID="searchInput"
            placeholder="Search your institute..."
            placeholderTextColor={colors.gray}
            style={[styles.input, {color: colors.text}]}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      )}

      <FlatList
        testID="instituteList"
        data={filteredInstitutes}
        keyExtractor={item => item.institute_id.toString()}
        renderItem={renderInstitute}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          <Text
            testID="emptyInstituteText"
            style={{
              textAlign: 'center',
              marginTop: 30,
              color: colors.gray,
            }}>
            No institutes found
          </Text>
        }
      />

      <Text testID="footerText" style={styles.footer}>
        Can't find your institute? Contact your institute administrator or email
        us at{' '}
        <Text
          selectable
          accessibilityLabel="supportEmail"
          testID="supportEmail"
          style={{color: colors.secondary}}>
          support@schoolcoreos.com
        </Text>
      </Text>
    </View>
  );
}

export default InstituteListScreen;
