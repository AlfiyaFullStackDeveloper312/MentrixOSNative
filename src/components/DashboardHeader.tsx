import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import DashboardHeaderStyles from '../styles/dashboardheaderStyle';
import LogoutButton from './LogoutBtn';
import {getItem} from '../utils/storage';

const DashboardHeader = ({
  isDark = false,
  onLogout,
  onMenuPress,
}: {
  isDark?: boolean;
  onLogout?: () => void;
  onMenuPress?: () => void;
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const storedUser = getItem<any>('user');

  let userName =
    storedUser?.full_name || storedUser?.name || storedUser?.email || 'User';

  if (userName.includes('@')) {
    userName = userName.split('@')[0];
  }

  const userInitial = userName.charAt(0).toUpperCase();

  // SAFE MODAL OPEN
  const handleProfilePress = () => {
    if (showLogoutModal) {
      return;
    }

    setShowLogoutModal(true);
  };

  // SAFE LOGOUT
  const handleLogoutPress = () => {
    setShowLogoutModal(false);

    setTimeout(() => {
      onLogout?.();
    }, 300);
  };

  return (
    <SafeAreaView
      testID="dashboardHeader"
      edges={['top']}
      style={{
        backgroundColor: isDark ? '#0D0D0D' : '#FFFFFF',
      }}>
      <View
        style={[
          DashboardHeaderStyles.container,
          {
            backgroundColor: isDark ? '#0D0D0D' : '#FFFFFF',
            borderBottomColor: isDark ? '#1F1F1F' : '#E5E5E5',
          },
        ]}>
        {/* LEFT */}
        <View style={DashboardHeaderStyles.left}>
          {/* MENU */}
          <TouchableOpacity
            testID="menuButton"
            onPress={onMenuPress}
            activeOpacity={0.7}
            style={[
              DashboardHeaderStyles.menuButton,
              {
                backgroundColor: isDark ? '#313131' : '#F2F2F7',
                borderColor: isDark ? '#2A2A2A' : '#E2E2E7',
              },
            ]}>
            <Image
              testID="menuIcon"
              source={
                isDark
                  ? require('../assets/menulight.png')
                  : require('../assets/menudark.jpg')
              }
              style={{
                width: isDark ? 24 : 20,
                height: isDark ? 24 : 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

          {/* LOGO */}
          <Image
            testID="dashboardLogo"
            source={
              isDark
                ? require('../assets/logowhite.png')
                : require('../assets/logodark.png')
            }
            style={DashboardHeaderStyles.logo}
          />

          {/* TITLE */}
          <Text
            testID="dashboardHeaderTitle"
            style={DashboardHeaderStyles.title}>
            <Text style={{color: isDark ? '#FFFFFF' : '#000000'}}>Mentrix</Text>

            <Text style={{color: '#007AFF'}}>OS</Text>
          </Text>
        </View>

        {/* PROFILE */}
        <TouchableOpacity
          testID="profileButton"
          onPress={handleProfilePress}
          activeOpacity={0.7}
          style={[
            DashboardHeaderStyles.profileCircle,
            {
              backgroundColor: isDark ? '#010A13' : '#FFFFFF',
              borderColor: isDark ? '#2A2A2A' : '#E2E2E7',
            },
          ]}>
          <Text
            testID="profileInitial"
            style={{
              color: isDark ? '#FFFFFF' : '#163A63',
              fontWeight: '600',
            }}>
            {userInitial}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT MODAL */}
      <LogoutButton
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onLogout={handleLogoutPress}
      />
    </SafeAreaView>
  );
};

export default DashboardHeader;
