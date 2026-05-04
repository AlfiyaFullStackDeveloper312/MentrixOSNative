import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import HeaderStyles from '../styles/headerStyle';
import LogoutButton from './LogoutBtn';
import {lightColors, darkColors} from '../theme/colors';
import {getItem} from '../utils/storage';

const Header = ({
  isDark = false,
  onLogout,
}: {
  isDark?: boolean;
  onLogout?: () => void;
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  //  GET USER
  const storedUser = getItem<any>('user');

  //  FIXED NAME LOGIC
  const userName =
    storedUser?.full_name || storedUser?.name || storedUser?.email || 'User';

  if (userName.includes('@')) {
    userName = userName.split('@')[0];
  }

  const userInitial = userName.charAt(0).toUpperCase();

  const theme = isDark ? darkColors : lightColors;

  const handleProfilePress = () => {
    setShowLogoutModal(true);
  };

  return (
    <SafeAreaView edges={['top']} style={{backgroundColor: theme.background}}>
      <View
        style={[HeaderStyles.container, {backgroundColor: theme.background}]}>
        {/* LEFT */}
        <View style={HeaderStyles.left}>
          <Image
            source={
              isDark
                ? require('../assets/logowhite.png')
                : require('../assets/logodark.png')
            }
            style={HeaderStyles.logo}
          />

          <Text style={HeaderStyles.title}>
            <Text style={{color: theme.text}}>Mentrix</Text>
            <Text style={{color: '#007AFF'}}>OS</Text>
          </Text>
        </View>

        {/* PROFILE */}
        <TouchableOpacity
          onPress={handleProfilePress}
          style={[
            HeaderStyles.profileCircle,
            {
              backgroundColor: isDark ? '#010A13' : '#FFFFFF',
              borderColor: isDark ? '#2A2A2A' : '#E2E2E7',
              borderWidth: 1,
            },
          ]}>
          <Text
            style={{
              color: isDark ? '#FFFFFF' : '#163A63',
              fontWeight: '600',
            }}>
            {userInitial}
          </Text>
        </TouchableOpacity>
      </View>

      <LogoutButton
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onLogout={() => {
          setShowLogoutModal(false);
          onLogout?.();
        }}
      />
    </SafeAreaView>
  );
};

export default Header;
