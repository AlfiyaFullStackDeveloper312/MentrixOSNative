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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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
    updatedOtp[index] = text.slice(-1);
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
        email: value.trim(),
        password,
      });

      const token = response?.pre_context_token;

      if (!token) {
        throw new Error('Token missing');
      }

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
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      edges={['top']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            testID="loginScrollView"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scroll,
              {
                paddingBottom: 120,
              },
            ]}>
            <View
              testID="loginScreen"
              collapsable={false}
              style={styles.container}>
              {/* TOP BAR */}
              <View style={styles.topBar}>
                <TouchableOpacity testID="alertButton" style={styles.iconBox}>
                  <Image
                    source={require('../assets/alert.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  testID="themeToggleButton"
                  style={styles.iconBox}
                  onPress={toggleTheme}>
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
                testID="logoImage"
                source={
                  isDark
                    ? require('../assets/logowhite.png')
                    : require('../assets/logodark.png')
                }
                style={styles.logo}
              />

              {/* HEADER */}
              <Text testID="titleText" style={styles.title}>
                Mentrix<Text style={styles.titleBlue}>OS</Text>
              </Text>

              <Text testID="subtitleText" style={styles.subtitle}>
                MentrixOS = <Text style={styles.highlight1}>Mentor</Text> +
                Matrix + <Text style={styles.highlight2}>Metrics</Text>
              </Text>

              <Text style={styles.subtext}>
                combined into one{' '}
                <Text style={styles.operatingText}>Operating System</Text> for
                your institute
              </Text>

              {/* INPUT */}
              {step === 'input' && (
                <TextInput
                  testID="loginEmailInput"
                  placeholder="Phone or Email"
                  placeholderTextColor={colors.gray}
                  value={value}
                  onChangeText={handleInputChange}
                  autoFocus={true}
                  returnKeyType="done"
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
                      testID="phoneInput"
                      ref={phoneRef}
                      value={value}
                      onChangeText={handleInputChange}
                      keyboardType="number-pad"
                      autoFocus={true}
                      returnKeyType="done"
                      style={[styles.phoneInputBox, {color: colors.text}]}
                    />
                  </View>

                  <TouchableOpacity
                    testID="sendCodeButton"
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
                        testID={`otpInput-${index}`}
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

                  <TouchableOpacity
                    testID="otpContinueButton"
                    style={styles.sendBtn}>
                    <Text style={styles.sendText}>Continue</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* EMAIL */}
              {step === 'email' && (
                <>
                  <TextInput
                    testID="loginEmailInput"
                    ref={emailRef}
                    placeholder="Email"
                    placeholderTextColor={colors.gray}
                    value={value}
                    onChangeText={handleInputChange}
                    autoFocus={true}
                    returnKeyType="done"
                    style={[styles.inputBox, {color: colors.text}]}
                  />

                  {!showPasswordField ? (
                    <View style={styles.buttonRow}>
                      <TouchableOpacity
                        testID="emailSendCodeButton"
                        style={styles.halfBtn}>
                        <Text style={styles.sendText}>Send Code</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        testID="loginUsePasswordButton"
                        style={styles.halfBtn}
                        onPress={() => setShowPasswordField(true)}>
                        <Text style={styles.sendText}>Use Password</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <TextInput
                        testID="loginPasswordInput"
                        placeholder="Password"
                        placeholderTextColor={colors.gray}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        returnKeyType="done"
                        style={[styles.inputBox, {color: colors.text}]}
                      />

                      <TouchableOpacity testID="forgotPasswordButton">
                        <Text style={styles.forgotText}>Forgot Password</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        testID="loginContinueButton"
                        disabled={loading}
                        style={[styles.sendBtn, loading && {opacity: 0.7}]}
                        onPress={handleEmailLogin}>
                        {loading ? (
                          <ActivityIndicator testID="loader" color="#fff" />
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

                  <TouchableOpacity
                    testID="joinInstituteButton"
                    style={styles.joinButton}>
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
              <View testID="footerSection" style={styles.footer}>
                <Text style={styles.footerTitle}>Easy-to-Use, End-to-End</Text>

                <Text style={styles.footerSub}>
                  Smart AI SaaS for Your Institute
                </Text>

                <View style={styles.setupBox}>
                  <Text style={styles.setupText}>
                    Don’t have an institute yet?
                  </Text>

                  <Text style={styles.setupLink}>Setup Institute →</Text>
                </View>

                <Text style={styles.terms}>
                  By continuing, you agree to our
                </Text>

                <Text testID="termsPolicyText" style={styles.link}>
                  Terms & Privacy Policy
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default LoginScreen;
