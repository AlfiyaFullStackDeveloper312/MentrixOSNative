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

  // HEME FIX
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
        institute: institute,
      });
    }
  }, [institute, navigation]);

  if (!institute || !institute.roles) return null;

  const handleSelect = (role: Role) => {
    navigation.navigate('Dashboard', {role, institute});
  };

  const handleLogout = () => {
    navigation.replace('Login');
  };
  return (
    <View
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
            institutes: institutes,
          })
        }>
        <Image
          source={require('../assets/backarrow.png')}
          style={[
            RoleScreenStyle.backIcon,
            {tintColor: isDark ? '#FFFFFF' : '#163A63'},
          ]}
        />

        <Text
          style={[
            RoleScreenStyle.changeText,
            {color: isDark ? '#FFFFFF' : '#163A63'},
          ]}>
          Change Institute
        </Text>
      </TouchableOpacity>

      {/* INSTITUTE CARD */}
      <View
        style={[
          RoleScreenStyle.instCard,
          {
            backgroundColor: isDark ? '#181818' : '#E0ECFF',
            borderColor: isDark ? '#2D2D2D' : '#B6C6E3',
          },
        ]}>
        <Image
          source={{uri: institute.inst_logo}}
          style={RoleScreenStyle.logo}
        />

        <View style={{flex: 1}}>
          <Text
            style={[
              RoleScreenStyle.instName,
              {color: isDark ? '#FFFFFF' : '#163A63'},
            ]}>
            {institute.name}
          </Text>

          <View style={RoleScreenStyle.locationRow}>
            <Image
              source={require('../assets/location.png')}
              style={RoleScreenStyle.locationIcon}
            />
            <Text
              style={[
                RoleScreenStyle.location,
                {color: isDark ? '#A1A1AA' : '#6B7280'},
              ]}>
              {institute.inst_location}
            </Text>
          </View>
        </View>

        <Image
          source={require('../assets/select.png')}
          style={RoleScreenStyle.verifyIcon}
        />
      </View>

      {/* TITLE */}
      <Text
        style={[
          RoleScreenStyle.title,
          {color: isDark ? '#FFFFFF' : '#163A63'},
        ]}>
        Choose Your Role
      </Text>

      {/* SUBTITLE */}
      <Text
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
        data={institute.roles}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <RoleCard name={item.role_name} onPress={() => handleSelect(item)} />
        )}
      />

      {/* FOOTER */}
      <Text
        style={[
          RoleScreenStyle.footer,
          {color: isDark ? '#A1A1AA' : '#6B7280'},
        ]}>
        Can't find your role? Contact your institute administrator or email us
        at
        <Text style={{color: '#2F6BFF'}}> support@schoolcoreos.com</Text>
      </Text>
    </View>
  );
};

export default RolesScreen;
