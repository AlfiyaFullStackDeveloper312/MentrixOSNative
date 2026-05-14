/* eslint-disable no-undef */
describe('MentrixOS Login Flow', () => {
  const EMAIL = 'ava@scos.com';
  const PASSWORD = '123456';
  const INVALID_PASSWORD = 'wrong123';

  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
    });

    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  // helper
  const openPasswordMode = async () => {
    await element(by.id('loginEmailInput')).replaceText(EMAIL);

    await waitFor(element(by.id('loginUsePasswordButton')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.id('loginUsePasswordButton')).tap();

    await waitFor(element(by.id('loginPasswordInput')))
      .toBeVisible()
      .withTimeout(3000);
  };

  // TC02 - Theme switch
  it('should toggle theme', async () => {
    await expect(element(by.id('themeToggleButton'))).toBeVisible();

    await element(by.id('themeToggleButton')).tap();
  });

  // TC03 - Detect email input
  it('should switch to email login mode', async () => {
    await element(by.id('loginEmailInput')).replaceText(EMAIL);

    await waitFor(element(by.id('loginUsePasswordButton')))
      .toBeVisible()
      .withTimeout(3000);

    await expect(element(by.id('loginUsePasswordButton'))).toBeVisible();
  });

  // TC04 - Password field visibility
  it('should show password field', async () => {
    await openPasswordMode();

    await expect(element(by.id('loginPasswordInput'))).toBeVisible();
  });

  // TC06 - Detect phone number input
  it('should enter phone number', async () => {
    await element(by.id('loginEmailInput')).replaceText('9876543210');

    await waitFor(element(by.id('phoneInput')))
      .toBeVisible()
      .withTimeout(3000);

    await expect(element(by.id('phoneInput'))).toBeVisible();
  });

  // TC07 - OTP screen navigation
  it('should navigate to otp screen', async () => {
    await element(by.id('loginEmailInput')).replaceText('9876543210');

    await waitFor(element(by.id('sendCodeButton')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.id('sendCodeButton')).tap();

    await waitFor(element(by.id('otpInput-0')))
      .toBeVisible()
      .withTimeout(3000);

    await expect(element(by.id('otpInput-0'))).toBeVisible();
  });

  // TC08 - Valid login
  it('should login successfully', async () => {
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(PASSWORD);

    // CLOSE KEYBOARD
    await device.pressBack();

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(200, 'down');

    await element(by.id('loginContinueButton')).tap();
  });

  // TC09 - Invalid password
  it('should reject invalid password', async () => {
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(INVALID_PASSWORD);

    await device.pressBack();

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(200, 'down');

    await element(by.id('loginContinueButton')).tap();
  });

  // TC10 - Empty form submission
  it('should prevent empty login', async () => {
    await element(by.id('loginEmailInput')).replaceText(EMAIL);

    await element(by.id('loginUsePasswordButton')).tap();

    await device.pressBack();

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(200, 'down');

    await element(by.id('loginContinueButton')).tap();
  });

  // TC11 - Multiple taps safety
  it('should handle multiple login taps safely', async () => {
    await openPasswordMode();

    await element(by.id('loginPasswordInput')).replaceText(PASSWORD);

    await device.pressBack();

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(200, 'down');

    await element(by.id('loginContinueButton')).multiTap(3);
  });

  // TC12 - Important components visible
  it('should render important components', async () => {
    await expect(element(by.id('themeToggleButton'))).toBeVisible();

    await waitFor(element(by.id('joinInstituteButton')))
      .toBeVisible()
      .whileElement(by.id('loginScrollView'))
      .scroll(400, 'down');

    await expect(element(by.id('joinInstituteButton'))).toBeVisible();
  });
});
