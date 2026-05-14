import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import RoleCard from '../components/RoleCard';
import Header from '../components/Header';
import RoleScreenStyle from '../styles/roleSelectStyle';

import {useThemeStore} from '../store/themeStore';
import {lightColors, darkColors} from '../theme/colors';

interface Role {
  role_name: string;
  role_logo?: string;
}

interface Institute {
  inst_id: string;
  name: string;
  inst_logo: string;
  inst_location: string;
  roles: Role[];
}

const RolesScreen = () => {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const institute: Institute | undefined = route.params?.institute;

  const institutes = route.params?.institutes;

  const isDark = useThemeStore(state => state.isDark);

  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    if (!institute) {
      navigation.navigate('InstituteList');
      return;
    }

    if (institute.roles?.length === 1) {
      navigation.navigate('Dashboard', {
        role: institute.roles[0],
        institute,
      });
    }
  }, [institute, navigation]);

  if (!institute || !institute.roles) {
    return null;
  }

  const handleSelect = (role: Role) => {
    navigation.navigate('Dashboard', {
      role,
      institute,
    });
  };

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View
      testID="roleScreen"
      style={[
        RoleScreenStyle.container,
        {
          backgroundColor: isDark ? '#101010' : '#F2F2F2',
        },
      ]}>
      {/* HEADER */}
      <Header isDark={isDark} onLogout={handleLogout} />

      {/* CHANGE INSTITUTE */}
      <TouchableOpacity
        testID="changeInstituteButton"
        activeOpacity={0.7}
        style={[
          RoleScreenStyle.changeBtn,
          {
            backgroundColor: isDark ? '#181818' : '#FFFFFF',

            borderColor: isDark ? '#2D2D2D' : '#E2E8F0',
          },
        ]}
        onPress={() =>
          navigation.navigate('InstituteList', {
            institutes,
          })
        }>
        <Image
          testID="backArrowIcon"
          source={require('../assets/backarrow.png')}
          style={[
            RoleScreenStyle.backIcon,
            {
              tintColor: isDark ? '#FFFFFF' : '#163A63',
            },
          ]}
        />

        <Text
          testID="changeInstituteText"
          style={[
            RoleScreenStyle.changeText,
            {
              color: isDark ? '#FFFFFF' : '#163A63',
            },
          ]}>
          Change Institute
        </Text>
      </TouchableOpacity>

      {/* INSTITUTE CARD */}
      <View
        testID="selectedInstituteCard"
        style={[
          RoleScreenStyle.instCard,
          {
            backgroundColor: isDark ? '#181818' : '#E0ECFF',

            borderColor: isDark ? '#2D2D2D' : '#B6C6E3',
          },
        ]}>
        <Image
          testID="selectedInstituteLogo"
          source={{uri: institute.inst_logo}}
          style={RoleScreenStyle.logo}
        />

        <View style={{flex: 1}}>
          <Text
            testID="selectedInstituteName"
            style={[
              RoleScreenStyle.instName,
              {
                color: isDark ? '#FFFFFF' : '#163A63',
              },
            ]}>
            {institute.name}
          </Text>

          <View style={RoleScreenStyle.locationRow}>
            <Image
              testID="locationIcon"
              source={require('../assets/location.png')}
              style={RoleScreenStyle.locationIcon}
            />

            <Text
              testID="selectedInstituteLocation"
              style={[
                RoleScreenStyle.location,
                {
                  color: isDark ? '#A1A1AA' : '#6B7280',
                },
              ]}>
              {institute.inst_location}
            </Text>
          </View>
        </View>

        <Image
          testID="verificationIcon"
          source={require('../assets/select.png')}
          style={RoleScreenStyle.verifyIcon}
        />
      </View>

      {/* TITLE */}
      <Text
        testID="roleTitle"
        style={[
          RoleScreenStyle.title,
          {
            color: isDark ? '#FFFFFF' : '#163A63',
          },
        ]}>
        Choose Your Role
      </Text>

      {/* SUBTITLE */}
      <Text
        testID="roleSubtitle"
        style={[
          RoleScreenStyle.subtitle,
          {
            color: isDark ? '#A1A1AA' : '#6B7280',

            lineHeight: 22,
          },
        ]}>
        {`Select how you’d like to access\n${institute.name}`}
      </Text>

      {/* ROLE LIST */}
      <FlatList
        testID="roleList"
        data={institute.roles}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({item, index}) => (
          <RoleCard
            index={index}
            name={item.role_name}
            onPress={() => handleSelect(item)}
          />
        )}
        ListEmptyComponent={
          <Text
            testID="emptyRoleText"
            style={{
              textAlign: 'center',
              marginTop: 30,
              color: colors.gray,
            }}>
            No roles available
          </Text>
        }
      />

      {/* FOOTER */}
      <Text
        testID="footerText"
        style={[
          RoleScreenStyle.footer,
          {
            color: isDark ? '#A1A1AA' : '#6B7280',
          },
        ]}>
        Can't find your role? Contact your institute administrator or email us
        at{' '}
        <Text
          testID="supportEmail"
          selectable
          accessibilityLabel="supportEmail"
          style={{color: '#2F6BFF'}}>
          support@schoolcoreos.com
        </Text>
      </Text>
    </View>
  );
};

export default RolesScreen;
