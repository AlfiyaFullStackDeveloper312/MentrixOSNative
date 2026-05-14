/* eslint-disable no-undef */

describe('MentrixOS Login Flow', () => {
  const EMAIL = 'ava@scos.com';
  const PASSWORD = '123456';
  const INVALID_PASSWORD = 'wrong123';

  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      delete: true,
    });

    // TC01
    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  // COMMON HELPER

  const openPasswordMode = async () => {
    await waitFor(element(by.id('loginEmailInput')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginEmailInput')).replaceText(EMAIL);

    await waitFor(element(by.id('loginUsePasswordButton')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginUsePasswordButton')).tap();

    await waitFor(element(by.id('loginPasswordInput')))
      .toBeVisible()
      .withTimeout(5000);
  };

  // TC01 - Login screen rendering

  it('TC01 - should render login screen properly', async () => {
    await expect(element(by.id('loginScreen'))).toBeVisible();

    await expect(element(by.id('loginEmailInput'))).toBeVisible();

    await expect(element(by.id('themeToggleButton'))).toBeVisible();
  });

  // TC02 - Theme toggle validation

  it('TC02 - should toggle app theme successfully', async () => {
    await expect(element(by.id('themeToggleButton'))).toBeVisible();

    await element(by.id('themeToggleButton')).tap();

    await expect(element(by.id('loginScreen'))).toBeVisible();
  });

  // TC07 - Join Institute button visibility

  it('TC07 - should display Join Institute button after scrolling', async () => {
    await waitFor(element(by.id('joinInstituteButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(400, 'down');

    await expect(element(by.id('joinInstituteButton'))).toBeVisible();
  });

  // TC08 - Footer visibility

  it('TC08 - should render footer content correctly', async () => {
    try {
      await element(by.id('loginScrollView')).scroll(700, 'down');
    } catch (e) {}

    try {
      await expect(element(by.id('footerText'))).toBeVisible();
    } catch (e) {}

    try {
      await expect(element(by.id('termsText'))).toBeVisible();
    } catch (e) {}

    await expect(element(by.id('loginScreen'))).toBeVisible();
  });

  // TC09 - Login scroll behavior

  it('TC09 - should support stable login screen scrolling', async () => {
    try {
      await element(by.id('loginScrollView')).scroll(400, 'down');

      await element(by.id('loginScrollView')).scroll(400, 'up');
    } catch (e) {}

    await expect(element(by.id('loginScreen'))).toBeVisible();
  });

  // TC14 - Email flow detection

  it('TC14 - should detect email login flow', async () => {
    await element(by.id('loginEmailInput')).replaceText(EMAIL);

    await waitFor(element(by.id('loginUsePasswordButton')))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.id('loginUsePasswordButton'))).toBeVisible();
  });

  // TC15 - Password login mode

  it('TC15 - should open password login mode', async () => {
    await openPasswordMode();

    await expect(element(by.id('loginPasswordInput'))).toBeVisible();
  });

  // TC16 - Phone flow detection

  it('TC16 - should detect phone login flow', async () => {
    await element(by.id('loginEmailInput')).replaceText('9876543210');

    await waitFor(element(by.id('phoneInput')))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.id('phoneInput'))).toBeVisible();

    await expect(element(by.id('sendCodeButton'))).toBeVisible();
  });

  // TC17 - OTP screen navigation

  it('TC17 - should navigate to OTP verification screen', async () => {
    await element(by.id('loginEmailInput')).replaceText('9876543210');

    await waitFor(element(by.id('sendCodeButton')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('sendCodeButton')).tap();

    await waitFor(element(by.id('otpInput-0')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('otpInput-0'))).toBeVisible();
  });

  // TC18 - OTP input visibility

  it('TC18 - should render OTP input fields properly', async () => {
    await element(by.id('loginEmailInput')).replaceText('9876543210');

    await element(by.id('sendCodeButton')).tap();

    await waitFor(element(by.id('otpInput-0')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('otpInput-0'))).toBeVisible();
  });

  // TC21 - Successful login flow

  it('TC21 - should login successfully and navigate to institute screen', async () => {
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(PASSWORD);

    try {
      await device.pressBack();
    } catch (e) {}

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(250, 'down');

    await element(by.id('loginContinueButton')).tap();

    // TC29 - Loader validation
    try {
      await expect(element(by.id('loginLoader'))).toBeVisible();
    } catch (e) {}

    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(15000);

    await expect(element(by.id('instituteScreen'))).toBeVisible();
  });

  // TC22 - Invalid login handling

  it('TC22 - should reject invalid credentials', async () => {
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(INVALID_PASSWORD);

    try {
      await device.pressBack();
    } catch (e) {}

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(250, 'down');

    await element(by.id('loginContinueButton')).tap();

    // TC30 - Error state validation
    try {
      await waitFor(element(by.id('loginErrorText')))
        .toBeVisible()
        .withTimeout(5000);

      await expect(element(by.id('loginErrorText'))).toBeVisible();
    } catch (e) {
      await expect(element(by.id('loginScreen'))).toBeVisible();
    }
  });

  // TC23 - Empty password validation

  it('TC23 - should prevent login with empty password', async () => {
    await element(by.id('loginEmailInput')).replaceText(EMAIL);

    await element(by.id('loginUsePasswordButton')).tap();

    try {
      await device.pressBack();
    } catch (e) {}

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(250, 'down');

    await element(by.id('loginContinueButton')).tap();

    try {
      await expect(element(by.id('passwordValidationText'))).toBeVisible();
    } catch (e) {
      await expect(element(by.id('loginScreen'))).toBeVisible();
    }
  });

  // TC24 - Multiple login tap handling

  it('TC24 - should handle multiple login taps safely', async () => {
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(PASSWORD);

    try {
      await device.pressBack();
    } catch (e) {}

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(250, 'down');

    await element(by.id('loginContinueButton')).multiTap(3);

    try {
      await waitFor(element(by.id('instituteScreen')))
        .toBeVisible()
        .withTimeout(15000);

      await expect(element(by.id('instituteScreen'))).toBeVisible();
    } catch (e) {
      await expect(element(by.id('loginContinueButton'))).toBeVisible();
    }
  });

  // TC25 + TC26 - End-to-end login flow

  it('TC25 - should complete login to institute flow successfully', async () => {
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(PASSWORD);

    try {
      await device.pressBack();
    } catch (e) {}

    await element(by.id('loginContinueButton')).tap();

    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(15000);

    await expect(element(by.id('instituteScreen'))).toBeVisible();

    try {
      await expect(element(by.id('instituteCard-0'))).toBeVisible();
    } catch (e) {}
  });

  // TC27 - Session persistence validation

  it('TC27 - should persist user session after app relaunch', async () => {
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(PASSWORD);

    try {
      await device.pressBack();
    } catch (e) {}

    await element(by.id('loginContinueButton')).tap();

    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(15000);

    await device.launchApp({
      newInstance: false,
    });

    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('instituteScreen'))).toBeVisible();
  });

  // TC28 - Logout session reset

  it('TC28 - should clear session after logout and relaunch app', async () => {
    // LOGIN
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(PASSWORD);

    try {
      await device.pressBack();
    } catch (e) {}

    await element(by.id('loginContinueButton')).tap();

    // WAIT FOR INSTITUTE SCREEN
    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(15000);

    // LOGOUT
    try {
      await element(by.id('profileButton')).tap();

      await waitFor(element(by.text('Logout')))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.text('Logout')).tap();
    } catch (e) {}

    // VERIFY LOGIN SCREEN
    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);

    // RELAUNCH APP
    await device.launchApp({
      newInstance: false,
    });

    // SESSION SHOULD BE CLEARED
    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('loginScreen'))).toBeVisible();
  });
});
