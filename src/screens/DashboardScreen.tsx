import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import Dashboardstyle from '../styles/dashboardStyle';
import DashboardCard from '../components/DashboardCard';
import DashboardHeader from '../components/DashboardHeader';

import {useThemeStore} from '../store/themeStore';

interface Role {
  role_name: string;
}

const DashboardScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const institute = route.params?.institute;
  const role: Role | undefined = route.params?.role;

  const isDark = useThemeStore(state => state.isDark);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? '#101010' : '#F2F2F2',
      }}>
      <ScrollView
        contentContainerStyle={Dashboardstyle.container}
        showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <DashboardHeader isDark={isDark} onLogout={handleLogout} />

        {/* TITLE */}
        <View style={Dashboardstyle.titleContainer}>
          <Text
            style={[
              Dashboardstyle.title,
              {color: isDark ? '#FFFFFF' : '#333333'},
            ]}>
            Welcome to {institute?.name}
          </Text>

          <Text style={Dashboardstyle.highlight}>{role?.role_name} Panel!</Text>
        </View>

        {/* CARDS */}
        <View style={Dashboardstyle.cardContainer}>
          <DashboardCard
            number="08"
            title="Active Institutes"
            description="Institutes actively operating and using the platform."
            type="blue"
          />
          <DashboardCard
            number="05"
            title="Inactive Institutes"
            description="Institutes currently inactive in system."
            type="green"
          />
          <DashboardCard
            number="15+"
            title="Total Modules"
            description="Features enabling workflows."
            type="orange"
          />
          <DashboardCard
            number="1.2K"
            title="Total Users"
            description="Registered users across institutes."
            type="purple"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
