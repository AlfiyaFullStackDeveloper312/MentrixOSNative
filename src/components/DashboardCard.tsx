import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/dashboardCardStyles';

import {useThemeStore} from '../store/themeStore';

interface Props {
  number: string;
  title: string;
  description: string;
  type: 'blue' | 'green' | 'orange' | 'purple';
  testID?: string;
}

const getLightCardStyle = (type: string) => {
  switch (type) {
    case 'blue':
      return {backgroundColor: '#9abae9'};
    case 'green':
      return {backgroundColor: '#c2ebcd'};
    case 'orange':
      return {backgroundColor: '#eccda7'};
    case 'purple':
      return {backgroundColor: '#ccc0fd'};
    default:
      return {backgroundColor: '#c3abff'};
  }
};

const getNumberColor = (type: string) => {
  switch (type) {
    case 'blue':
      return '#2F80ED';
    case 'green':
      return '#27AE60';
    case 'orange':
      return '#F2994A';
    case 'purple':
      return '#9B51E0';
    default:
      return '#000';
  }
};

const DashboardCard = ({number, title, description, type, testID}: Props) => {
  const isDark = useThemeStore(state => state.isDark);

  return (
    <View
      testID={testID}
      style={[
        styles.card,
        isDark
          ? {
              backgroundColor: '#111111',
              borderWidth: 1,
              borderColor: '#2D2D2D',
            }
          : getLightCardStyle(type),
      ]}>
      <Text
        testID={`${testID}-number`}
        style={[styles.number, {color: getNumberColor(type)}]}>
        {number}
      </Text>

      <Text
        testID={`${testID}-title`}
        style={[styles.title, {color: isDark ? '#FFFFFF' : '#333333'}]}>
        {title}
      </Text>

      <Text
        testID={`${testID}-description`}
        style={[styles.description, {color: isDark ? '#A1A1AA' : '#555'}]}>
        {description}
      </Text>
    </View>
  );
};

export default DashboardCard;
