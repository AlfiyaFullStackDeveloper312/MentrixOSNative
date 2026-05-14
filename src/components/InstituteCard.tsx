import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import getStyles from '../styles/instituteCardStyle';

import {useThemeStore} from '../store/themeStore';
import {lightColors, darkColors} from '../theme/colors';

interface Props {
  index: number;
  name: string;
  instLogo: string;
  instlocation?: string;
  type?: string;
  onPress: () => void;
  isSelected?: boolean;
}

const InstituteCard: React.FC<Props> = ({
  index,
  name,
  instLogo,
  instlocation,
  type,
  onPress,
  isSelected = false,
}) => {
  const isDark = useThemeStore(state => state.isDark);

  const colors = isDark ? darkColors : lightColors;

  const styles = getStyles(colors);

  return (
    <TouchableOpacity
      testID={`instituteCard-${index}`}
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#181818' : colors.card,

          borderWidth: isSelected ? 2 : 1,

          borderColor: isSelected ? '#5286f6' : isDark ? '#2D2D2D' : '#E5E7EB',

          elevation: isSelected ? 4 : 2,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* LEFT */}
      <View style={styles.left}>
        <Image
          testID={`instituteLogo-${index}`}
          source={{uri: instLogo}}
          style={styles.logo}
        />

        <View style={{flex: 1, marginRight: 8}}>
          {/* NAME */}
          <Text
            testID={`instituteName-${index}`}
            numberOfLines={1}
            style={[
              styles.name,
              {
                color: isDark ? '#FFFFFF' : colors.text,
              },
            ]}>
            {name}
          </Text>

          {/* LOCATION */}
          {instlocation && (
            <View style={styles.locationRow}>
              <Image
                source={require('../assets/location.png')}
                style={[
                  styles.locationIcon,
                  {
                    tintColor: isDark ? '#A1A1AA' : colors.gray,
                  },
                ]}
              />

              <Text
                testID={`instituteLocation-${index}`}
                numberOfLines={1}
                style={[
                  styles.location,
                  {
                    color: isDark ? '#A1A1AA' : colors.gray,
                  },
                ]}>
                {instlocation}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* RIGHT */}
      <View style={styles.rightRow}>
        {/* TYPE */}
        {type && (
          <View
            style={[
              styles.badgeContainer,
              {
                backgroundColor: isDark ? '#181818' : colors.card,
              },
            ]}>
            <Text
              testID={`instituteType-${index}`}
              style={[
                styles.badgeText,
                {
                  color: isDark ? '#B0B0B0' : colors.type,
                },
              ]}>
              {type}
            </Text>
          </View>
        )}

        {/* ARROW */}
        <View
          testID={`instituteArrow-${index}`}
          style={[
            styles.arrowBox,
            {
              backgroundColor: isDark ? '#1F1F1F' : '#F7FAFC',

              borderColor: isSelected
                ? '#2F71FE'
                : isDark
                ? '#2D2D2D'
                : '#E5E7EB',
            },
          ]}>
          <Image
            source={require('../assets/arrowwhite.png')}
            style={[
              styles.arrowIcon,
              {
                tintColor: isSelected
                  ? '#5286f6'
                  : isDark
                  ? '#FFFFFF'
                  : '#163A63',
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InstituteCard;
