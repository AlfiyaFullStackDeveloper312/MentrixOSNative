import React from 'react';
import {View, Text, ScrollView} from 'react-native';
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
      testID="dashboardScreen"
      style={{
        flex: 1,
        backgroundColor: isDark ? '#101010' : '#F2F2F2',
      }}>
      <ScrollView
        testID="dashboardScroll"
        contentContainerStyle={Dashboardstyle.container}
        showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <DashboardHeader isDark={isDark} onLogout={handleLogout} />

        {/* TITLE */}
        <View
          testID="dashboardTitleSection"
          style={Dashboardstyle.titleContainer}>
          <Text
            testID="dashboardWelcomeText"
            style={[
              Dashboardstyle.title,
              {color: isDark ? '#FFFFFF' : '#333333'},
            ]}>
            Welcome to {institute?.name}
          </Text>

          <Text testID="dashboardRoleText" style={Dashboardstyle.highlight}>
            {role?.role_name} Panel!
          </Text>
        </View>

        {/* CARDS */}
        <View
          testID="dashboardCardsContainer"
          style={Dashboardstyle.cardContainer}>
          <DashboardCard
            testID="activeInstitutesCard"
            number="08"
            title="Active Institutes"
            description="Institutes actively operating and using the platform."
            type="blue"
          />

          <DashboardCard
            testID="inactiveInstitutesCard"
            number="05"
            title="Inactive Institutes"
            description="Institutes currently inactive in system."
            type="green"
          />

          <DashboardCard
            testID="totalModulesCard"
            number="15+"
            title="Total Modules"
            description="Features enabling workflows."
            type="orange"
          />

          <DashboardCard
            testID="totalUsersCard"
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
