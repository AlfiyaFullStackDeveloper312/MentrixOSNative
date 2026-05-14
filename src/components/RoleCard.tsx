import React from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';

import RoleCardstyles from '../styles/roleCardStyle';

import {useThemeStore} from '../store/themeStore';

import {lightColors, darkColors} from '../theme/colors';

interface Props {
  index: number;
  name: string;
  onPress: () => void;
  isSelected?: boolean;
}

const RoleCard: React.FC<Props> = ({
  index,
  name,
  onPress,
  isSelected = false,
}) => {
  const isDark = useThemeStore(state => state.isDark);

  const colors = isDark ? darkColors : lightColors;

  const getDescription = () => {
    if (name === 'Administrator') {
      return 'Full system access';
    }

    if (name === 'Principal') {
      return 'Institute oversight';
    }

    if (name === 'Trainer') {
      return 'Student access';
    }

    return 'Access role features';
  };

  const getIcon = () => {
    if (name === 'Administrator') {
      return require('../assets/admin.png');
    }

    if (name === 'Principal') {
      return require('../assets/principle.png');
    }

    if (name === 'Trainer') {
      return require('../assets/teacher.png');
    }

    return require('../assets/admin.png');
  };

  return (
    <TouchableOpacity
      testID={`roleCard-${index}`}
      style={[
        RoleCardstyles.card,
        {
          backgroundColor: isDark ? '#181818' : '#FFFFFF',

          borderWidth: isSelected ? 2 : 0,

          borderColor: isSelected ? '#2F6BFF' : 'transparent',

          elevation: isSelected ? 6 : 2,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* LEFT */}
      <View style={RoleCardstyles.left}>
        <Image
          testID={`roleIcon-${index}`}
          source={getIcon()}
          style={RoleCardstyles.icon}
        />

        <View>
          <Text
            testID={`roleName-${index}`}
            style={[
              RoleCardstyles.name,
              {
                color: colors.text,
              },
            ]}>
            {name}
          </Text>

          <Text
            testID={`roleDescription-${index}`}
            style={[
              RoleCardstyles.desc,
              {
                color: colors.gray,
              },
            ]}>
            {getDescription()}
          </Text>
        </View>
      </View>

      {/* RIGHT */}
      <View
        testID={`roleArrow-${index}`}
        style={[
          RoleCardstyles.arrowBox,
          {
            backgroundColor: isDark ? '#282828' : '#F7FAFC',

            borderColor: isSelected
              ? '#2F6BFF'
              : isDark
              ? '#323131'
              : '#d3cfcf',

            borderWidth: 1,
          },
        ]}>
        <Image
          source={require('../assets/arrowwhite.png')}
          style={[
            RoleCardstyles.arrowIcon,
            {
              tintColor: isSelected
                ? '#2F71FE'
                : isDark
                ? '#FFFFFF'
                : '#163A63',
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RoleCard;
