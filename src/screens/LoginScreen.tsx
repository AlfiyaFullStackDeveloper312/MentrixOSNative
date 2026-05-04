import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';

import {getStyles} from '../styles/loginStyles';
import {loginApi} from '../services/authService';
import {getInstitutes} from '../services/instituteService';
import {setItem} from '../utils/storage';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore} from '../store/themeStore';
import {lightColors, darkColors} from '../theme/colors';

function LoginScreen() {
  const navigation = useNavigation<any>();

  const [showPasswordField, setShowPasswordField] = useState(false);
  const {width} = useWindowDimensions();
  const isTablet = width >= 768;

  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  // THEME
  const {isDark, toggleTheme} = useThemeStore();
  const colors = isDark ? darkColors : lightColors;
  const styles = getStyles(isTablet, colors);

  const [step, setStep] = useState<'input' | 'phone' | 'otp' | 'email'>(
    'input',
  );

  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text.slice(-1); // only 1 digit
    setOtp(updatedOtp);
  };

  const handleInputChange = (text: string) => {
    setValue(text);

    if (/^\d+$/.test(text) && text.length > 0) {
      setStep('phone');

      setTimeout(() => {
        phoneRef.current?.focus();
      }, 100);
    } else if (text.length > 0) {
      setStep('email');

      setTimeout(() => {
        emailRef.current?.focus();
      }, 100);
    } else {
      setStep('input');
      setShowPasswordField(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!value || !password) {
      alert('Enter email and password');
      return;
    }

    try {
      setLoading(true);

      const response = await loginApi({
        email: value,
        password,
      });

      const token = response?.pre_context_token;
      if (!token) throw new Error('Token missing');

      await setItem('token', token);
      await setItem('user', response.user);

      const res = await getInstitutes(token);

      navigation.replace('InstituteList', {
        institutes: res.data,
      });
    } catch (err) {
      console.log('LOGIN ERROR:', err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.background}}
      edges={['top']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          {/* TOP ICONS */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.iconBox}>
              <Image
                source={require('../assets/alert.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={toggleTheme}>
              <Image
                source={
                  isDark
                    ? require('../assets/whitemode.png')
                    : require('../assets/darkmode.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* LOGO */}
          <Image
            source={
              isDark
                ? require('../assets/logowhite.png')
                : require('../assets/logodark.png')
            }
            style={styles.logo}
          />

          {/* HEADER */}
          <Text style={styles.title}>
            Mentrix<Text style={styles.titleBlue}>OS</Text>
          </Text>

          <Text style={styles.subtitle}>
            MentrixOS = <Text style={styles.highlight1}>Mentor</Text> + Matrix +{' '}
            <Text style={styles.highlight2}>Metrics</Text>
          </Text>

          <Text style={styles.subtext}>
            combined into one{' '}
            <Text style={styles.operatingText}>Operating System</Text> for your
            institute
          </Text>

          {/* INPUT */}
          {step === 'input' && (
            <TextInput
              placeholder="Phone or Email"
              placeholderTextColor={colors.gray}
              value={value}
              onChangeText={handleInputChange}
              autoFocus={true}
              style={[styles.inputBox, {color: colors.text}]}
            />
          )}

          {/* PHONE */}
          {step === 'phone' && (
            <>
              <View style={styles.phoneRow}>
                <View style={styles.flagBox}>
                  <Text style={{color: colors.text}}>🇮🇳 +91</Text>
                </View>

                <TextInput
                  ref={phoneRef}
                  value={value}
                  onChangeText={handleInputChange}
                  keyboardType="number-pad"
                  autoFocus={true}
                  style={[styles.phoneInputBox, {color: colors.text}]}
                />
              </View>

              <TouchableOpacity
                style={styles.sendBtn}
                onPress={() => setStep('otp')}>
                <Text style={styles.sendText}>Send Code</Text>
              </TouchableOpacity>
            </>
          )}

          {/* OTP */}
          {step === 'otp' && (
            <>
              <Text style={styles.otpTitle}>Enter 6-digit code</Text>

              <View style={styles.otpRow}>
                {[0, 1, 2, 3, 4, 5].map((_, index) => (
                  <TextInput
                    key={index}
                    value={otp[index]}
                    onChangeText={text => handleOtpChange(text, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.otpBox}
                    textAlign="center"
                  />
                ))}
              </View>

              <Text style={styles.resendText}>
                Didn’t get Code?{' '}
                <Text style={styles.resendLink}>Resend Code</Text>
              </Text>

              <TouchableOpacity style={styles.sendBtn}>
                <Text style={styles.sendText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}

          {/* EMAIL */}
          {step === 'email' && (
            <>
              <TextInput
                ref={emailRef}
                placeholder="Email"
                placeholderTextColor={colors.gray}
                value={value}
                onChangeText={handleInputChange}
                autoFocus={true}
                style={[styles.inputBox, {color: colors.text}]}
              />

              {!showPasswordField ? (
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.halfBtn}>
                    <Text style={styles.sendText}>Send Code</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.halfBtn}
                    onPress={() => {
                      setShowPasswordField(true);
                    }}>
                    <Text style={styles.sendText}>Use Password</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={colors.gray}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={[styles.inputBox, {color: colors.text}]}
                  />

                  <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sendBtn}
                    onPress={handleEmailLogin}>
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.sendText}>Continue</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </>
          )}

          {/* OR + JOIN */}
          {step !== 'otp' && (
            <>
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity style={styles.joinButton}>
                <Image
                  source={
                    isDark
                      ? require('../assets/joininstitutewhite.png')
                      : require('../assets/joininstitute.png')
                  }
                  style={styles.joinIcon}
                />

                <Text style={styles.joinText}>Join Institute</Text>
              </TouchableOpacity>
            </>
          )}

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Easy-to-Use, End-to-End</Text>
            <Text style={styles.footerSub}>
              Smart AI SaaS for Your Institute
            </Text>

            <View style={styles.setupBox}>
              <Text style={styles.setupText}>Don’t have an institute yet?</Text>
              <Text style={styles.setupLink}>Setup Institute →</Text>
            </View>

            <Text style={styles.terms}>By continuing, you agree to our</Text>
            <Text style={styles.link}>Terms & Privacy Policy</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;

// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   useWindowDimensions,
//   TextInput,
//   Image,
//   ActivityIndicator,
// } from 'react-native';

// import {getStyles} from '../styles/loginStyles';
// import {loginApi} from '../services/authService';
// import {getInstitutes} from '../services/instituteService';
// import {setItem} from '../utils/storage';
// import {useNavigation} from '@react-navigation/native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {useThemeStore} from '../store/themeStore';
// import {lightColors, darkColors} from '../theme/colors';

// function LoginScreen() {
//   const navigation = useNavigation<any>();

//   const [showPasswordField, setShowPasswordField] = useState(false);
//   const {width} = useWindowDimensions();
//   const isTablet = width >= 768;

//   const phoneRef = useRef<TextInput>(null);
//   const emailRef = useRef<TextInput>(null);

//   // THEME
//   const {isDark, toggleTheme} = useThemeStore();
//   const colors = isDark ? darkColors : lightColors;
//   const styles = getStyles(isTablet, colors);

//   const [step, setStep] = useState<'input' | 'phone' | 'otp' | 'email'>(
//     'input',
//   );

//   const [value, setValue] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   // OTP
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);

//   const handleOtpChange = (text: string, index: number) => {
//     const updatedOtp = [...otp];
//     updatedOtp[index] = text.slice(-1); // only 1 digit
//     setOtp(updatedOtp);
//   };

//   const handleInputChange = (text: string) => {
//     setValue(text);

//     if (/^\d+$/.test(text) && text.length > 0) {
//       setStep('phone');

//       setTimeout(() => {
//         phoneRef.current?.focus();
//       }, 100);
//     } else if (text.length > 0) {
//       setStep('email');

//       setTimeout(() => {
//         emailRef.current?.focus();
//       }, 100);
//     } else {
//       setStep('input');
//       setShowPasswordField(false);
//     }
//   };

//   const handleEmailLogin = async () => {
//     if (!value || !password) {
//       alert('Enter email and password');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await loginApi({
//         email: value,
//         password,
//       });

//       const token = response?.pre_context_token;
//       if (!token) throw new Error('Token missing');

//       await setItem('token', token);
//       await setItem('user', response.user);

//       const res = await getInstitutes(token);

//       navigation.replace('InstituteList', {
//         institutes: res.data,
//       });
//     } catch (err) {
//       console.log('LOGIN ERROR:', err);
//       alert('Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView
//       style={{flex: 1, backgroundColor: colors.background}}
//       edges={['top']}>
//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scroll}>
//         <View style={styles.container}>
//           {/* TOP ICONS */}
//           <View style={styles.topBar}>
//             <TouchableOpacity style={styles.iconBox}>
//               <Image
//                 source={require('../assets/alert.png')}
//                 style={styles.icon}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.iconBox} onPress={toggleTheme}>
//               <Image
//                 source={
//                   isDark
//                     ? require('../assets/whitemode.png')
//                     : require('../assets/darkmode.png')
//                 }
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           </View>

//           {/* LOGO */}
//           <Image
//             source={
//               isDark
//                 ? require('../assets/logowhite.png')
//                 : require('../assets/logodark.png')
//             }
//             style={styles.logo}
//           />

//           {/* HEADER */}
//           <Text style={styles.title}>
//             Mentrix<Text style={styles.titleBlue}>OS</Text>
//           </Text>

//           <Text style={styles.subtitle}>
//             MentrixOS = <Text style={styles.highlight1}>Mentor</Text> + Matrix +{' '}
//             <Text style={styles.highlight2}>Metrics</Text>
//           </Text>

//           <Text style={styles.subtext}>
//             combined into one{' '}
//             <Text style={styles.operatingText}>Operating System</Text> for your
//             institute
//           </Text>

//           {/* INPUT */}
//           {step === 'input' && (
//             <TextInput
//               placeholder="Phone or Email"
//               placeholderTextColor={colors.gray}
//               value={value}
//               onChangeText={handleInputChange}
//               autoFocus={true}
//               style={[styles.inputBox, {color: colors.text}]}
//             />
//           )}

//           {/* PHONE */}
//           {step === 'phone' && (
//             <>
//               <View style={styles.phoneRow}>
//                 <View style={styles.flagBox}>
//                   <Text style={{color: colors.text}}>🇮🇳 +91</Text>
//                 </View>

//                 <TextInput
//                   ref={phoneRef}
//                   value={value}
//                   onChangeText={handleInputChange}
//                   keyboardType="number-pad"
//                   autoFocus={true}
//                   style={[styles.phoneInputBox, {color: colors.text}]}
//                 />
//               </View>

//               <TouchableOpacity
//                 style={styles.sendBtn}
//                 onPress={() => setStep('otp')}>
//                 <Text style={styles.sendText}>Send Code</Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {/* OTP */}
//           {step === 'otp' && (
//             <>
//               <Text style={styles.otpTitle}>Enter 6-digit code</Text>

//               <View style={styles.otpRow}>
//                 {[0, 1, 2, 3, 4, 5].map((_, index) => (
//                   <TextInput
//                     key={index}
//                     value={otp[index]}
//                     onChangeText={text => handleOtpChange(text, index)}
//                     keyboardType="number-pad"
//                     maxLength={1}
//                     style={styles.otpBox}
//                     textAlign="center"
//                   />
//                 ))}
//               </View>

//               <Text style={styles.resendText}>
//                 Didn’t get Code?{' '}
//                 <Text style={styles.resendLink}>Resend Code</Text>
//               </Text>

//               <TouchableOpacity style={styles.sendBtn}>
//                 <Text style={styles.sendText}>Continue</Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {/* EMAIL */}
//           {step === 'email' && (
//             <>
//               <TextInput
//                 ref={emailRef}
//                 placeholder="Email"
//                 placeholderTextColor={colors.gray}
//                 value={value}
//                 onChangeText={handleInputChange}
//                 autoFocus={true}
//                 style={[styles.inputBox, {color: colors.text}]}
//               />

//               {!showPasswordField ? (
//                 <View style={styles.buttonRow}>
//                   <TouchableOpacity style={styles.halfBtn}>
//                     <Text style={styles.sendText}>Send Code</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.halfBtn}
//                     onPress={() => {
//                       setShowPasswordField(true);
//                     }}>
//                     <Text style={styles.sendText}>Use Password</Text>
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <>
//                   <TextInput
//                     placeholder="Password"
//                     placeholderTextColor={colors.gray}
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={true}
//                     style={[styles.inputBox, {color: colors.text}]}
//                   />

//                   <TouchableOpacity>
//                     <Text style={styles.forgotText}>Forgot Password</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.sendBtn}
//                     onPress={handleEmailLogin}>
//                     {loading ? (
//                       <ActivityIndicator color="#fff" />
//                     ) : (
//                       <Text style={styles.sendText}>Continue</Text>
//                     )}
//                   </TouchableOpacity>
//                 </>
//               )}
//             </>
//           )}

//           {/* OR + JOIN */}
//           {step !== 'otp' && (
//             <>
//               <View style={styles.orContainer}>
//                 <View style={styles.line} />
//                 <Text style={styles.orText}>OR</Text>
//                 <View style={styles.line} />
//               </View>

//               <TouchableOpacity style={styles.joinButton}>
//                 <Image
//                   source={
//                     isDark
//                       ? require('../assets/joininstitutewhite.png')
//                       : require('../assets/joininstitute.png')
//                   }
//                   style={styles.joinIcon}
//                 />

//                 <Text style={styles.joinText}>Join Institute</Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {/* FOOTER */}
//           <View style={styles.footer}>
//             <Text style={styles.footerTitle}>Easy-to-Use, End-to-End</Text>
//             <Text style={styles.footerSub}>
//               Smart AI SaaS for Your Institute
//             </Text>

//             <View style={styles.setupBox}>
//               <Text style={styles.setupText}>Don’t have an institute yet?</Text>
//               <Text style={styles.setupLink}>Setup Institute →</Text>
//             </View>

//             <Text style={styles.terms}>By continuing, you agree to our</Text>
//             <Text style={styles.link}>Terms & Privacy Policy</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default LoginScreen;
