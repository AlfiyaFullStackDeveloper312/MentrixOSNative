import {useWindowDimensions} from 'react-native';

export const useResponsive = () => {
  const {width, height} = useWindowDimensions();

  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isLargeTablet = width >= 1024;

  return {width, height, isMobile, isTablet, isLargeTablet};
};
