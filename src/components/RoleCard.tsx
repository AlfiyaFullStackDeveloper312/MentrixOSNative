//   // ICONS FROM ASSETS (NO EMOJI)
//   const getIcon = () => {
//     switch (name) {
//       case 'Admin':
//       case 'Super Admin':
//         return require('../assets/admin.png');
//       case 'Institute Admin':
//         return require('../assets/principle.png');
//       case 'Trainer':
//         return require('../assets/teacher.png');
//       case 'Student':
//         return require('../assets/parents.png');
//       default:
//         return require('../assets/admin.png');
//     }
//   };

//   return (
//     <TouchableOpacity
//       style={[
//         RoleCardstyles.card,
//         {backgroundColor: isDark ? '#111827' : '#FFFFFF'},
//       ]}
//       onPress={onPress}>
//       {/* LEFT */}
//       <View style={RoleCardstyles.left}>
//         <Image source={getIcon()} style={RoleCardstyles.icon} />

//         <View>
//           <Text
//             style={[
//               RoleCardstyles.name,
//               {color: isDark ? '#FFFFFF' : '#163A63'},
//             ]}>
//             {name}
//           </Text>

//           <Text
//             style={[
//               RoleCardstyles.desc,
//               {color: isDark ? '#9CA3AF' : '#7A869A'},
//             ]}>
//             {getDescription()}
//           </Text>
//         </View>
//       </View>

//       {/* RIGHT */}
//       <View
//         style={[
//           RoleCardstyles.arrowBox,
//           {
//             backgroundColor: isDark ? '#1F2937' : '#F7FAFC',
//             borderColor: isDark ? '#374151' : '#dcdfe5',
//           },
//         ]}>
//         <Image
//           source={require('../assets/arrowwhite.png')}
//           style={RoleCardstyles.arrowIcon}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default RoleCard;
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import RoleCardstyles from '../styles/roleCardStyle';

import {useThemeStore} from '../store/themeStore';
import {lightColors, darkColors} from '../theme/colors';

interface Props {
  name: string;
  onPress: () => void;
  isSelected?: boolean;
}

const RoleCard: React.FC<Props> = ({name, onPress, isSelected = false}) => {
  const isDark = useThemeStore(state => state.isDark);
  const colors = isDark ? darkColors : lightColors;

  const getDescription = () => {
    if (name === 'Administrator') return 'Full system access';
    if (name === 'Principal') return 'Institute oversight';
    if (name === 'Trainer') return 'Student access';
    return 'Access role features';
  };

  const getIcon = () => {
    if (name === 'Administrator') return require('../assets/admin.png');
    if (name === 'Principal') return require('../assets/principle.png');
    if (name === 'Trainer') return require('../assets/teacher.png');
    return require('../assets/admin.png');
  };

  return (
    <TouchableOpacity
      style={[
        RoleCardstyles.card,
        {
          backgroundColor: isDark ? '#181818' : '#FFFFFF',

          //  Selected Border
          borderWidth: isSelected ? 2 : 0,
          borderColor: isSelected ? '#2F6BFF' : 'transparent',

          elevation: isSelected ? 6 : 2,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* LEFT */}
      <View style={RoleCardstyles.left}>
        <Image source={getIcon()} style={RoleCardstyles.icon} />

        <View>
          <Text style={[RoleCardstyles.name, {color: colors.text}]}>
            {name}
          </Text>

          <Text style={[RoleCardstyles.desc, {color: colors.gray}]}>
            {getDescription()}
          </Text>
        </View>
      </View>

      {/* RIGHT */}
      <View
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
