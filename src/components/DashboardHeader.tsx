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

  return (
    <SafeAreaView
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
        {/* LEFT SECTION */}
        <View style={DashboardHeaderStyles.left}>
          {/* MENU BUTTON */}
          <TouchableOpacity
            onPress={onMenuPress}
            style={[
              DashboardHeaderStyles.menuButton,
              {
                backgroundColor: isDark ? '#313131' : '#F2F2F7',
                borderColor: isDark ? '#2A2A2A' : '#E2E2E7',
              },
            ]}>
            <Image
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
            source={
              isDark
                ? require('../assets/logowhite.png')
                : require('../assets/logodark.png')
            }
            style={DashboardHeaderStyles.logo}
          />

          {/* TITLE */}
          <Text style={DashboardHeaderStyles.title}>
            <Text style={{color: isDark ? '#FFFFFF' : '#000000'}}>Mentrix</Text>
            <Text style={{color: '#007AFF'}}>OS</Text>
          </Text>
        </View>

        {/* PROFILE */}
        <TouchableOpacity
          onPress={() => setShowLogoutModal(true)}
          style={[
            DashboardHeaderStyles.profileCircle,
            {
              backgroundColor: isDark ? '#010A13' : '#FFFFFF',
              borderColor: isDark ? '#2A2A2A' : '#E2E2E7',
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

      {/* LOGOUT MODAL */}
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

export default DashboardHeader;
