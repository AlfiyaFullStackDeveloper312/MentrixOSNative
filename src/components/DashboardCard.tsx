import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/dashboardCardStyles';

import {useThemeStore} from '../store/themeStore';

interface Props {
  number: string;
  title: string;
  description: string;
  type: 'blue' | 'green' | 'orange' | 'purple';
}

//  Light Background Colors (UNCHANGED)
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

// Number Colors (SAME FOR BOTH THEMES)
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

const DashboardCard = ({number, title, description, type}: Props) => {
  const isDark = useThemeStore(state => state.isDark);

  return (
    <View
      style={[
        styles.card,

        // Theme based background
        isDark
          ? {
              backgroundColor: '#111111',
              borderWidth: 1,
              borderColor: '#2D2D2D',
            }
          : getLightCardStyle(type),
      ]}>
      {/* NUMBER */}
      <Text style={[styles.number, {color: getNumberColor(type)}]}>
        {number}
      </Text>

      {/* TITLE */}
      <Text style={[styles.title, {color: isDark ? '#FFFFFF' : '#333333'}]}>
        {title}
      </Text>

      {/* DESCRIPTION */}
      <Text style={[styles.description, {color: isDark ? '#A1A1AA' : '#555'}]}>
        {description}
      </Text>
    </View>
  );
};

export default DashboardCard;
