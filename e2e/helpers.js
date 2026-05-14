const {device, element, by, waitFor, expect} = require('detox');

const VALID_PASSWORD = '123456';

const USERS = {
  validUser: {
    email: 'ava@scos.com',
    password: VALID_PASSWORD,
  },

  wrongPassword: {
    email: 'ava@scos.com',
    password: 'wrong123',
  },

  unknownUser: {
    email: 'unknown@scos.com',
    password: 'random123',
  },

  phoneUser: {
    phone: '9876543210',
  },
};

// Launch fresh app
async function launchFresh() {
  await device.launchApp({
    newInstance: true,
    delete: true,
    permissions: {notifications: 'YES'},
  });

  await waitFor(element(by.id('loginScreen')))
    .toBeVisible()
    .withTimeout(10000);
}

// Enter email and open password flow
async function choosePasswordLogin(email) {
  await element(by.id('loginInput')).tap();

  await element(by.id('loginInput')).replaceText(email);

  await waitFor(element(by.id('usePasswordButton')))
    .toBeVisible()
    .withTimeout(5000);

  await element(by.id('usePasswordButton')).tap();

  await waitFor(element(by.id('passwordInput')))
    .toBeVisible()
    .withTimeout(5000);
}

// Enter password and continue
async function submitPassword(password) {
  await element(by.id('passwordInput')).tap();

  await element(by.id('passwordInput')).replaceText(password);

  await element(by.id('continueButton')).tap();
}

// Complete login
async function loginAs(user) {
  await choosePasswordLogin(user.email);

  await submitPassword(user.password);
}

// Phone flow
async function enterPhone(phone) {
  await element(by.id('loginInput')).tap();

  await element(by.id('loginInput')).replaceText(phone);

  await waitFor(element(by.id('sendCodeButton')))
    .toBeVisible()
    .withTimeout(5000);
}

// Open OTP screen
async function openOtpScreen(phone) {
  await enterPhone(phone);

  await element(by.id('sendCodeButton')).tap();

  await waitFor(element(by.id('otpScreen')))
    .toBeVisible()
    .withTimeout(5000);
}

// Verify dashboard/institute screen
async function waitForHomeScreen() {
  try {
    await waitFor(element(by.id('instituteListScreen')))
      .toBeVisible()
      .withTimeout(15000);

    return 'InstituteList';
  } catch (e) {
    await waitFor(element(by.id('dashboardScreen')))
      .toBeVisible()
      .withTimeout(15000);

    return 'Dashboard';
  }
}

// Theme switch
async function toggleTheme() {
  await element(by.id('themeToggle')).tap();
}

// Scroll login page
async function scrollLoginScreen() {
  await element(by.id('loginScrollView')).swipe('up', 'fast', 0.7);

  await element(by.id('loginScrollView')).swipe('down', 'fast', 0.7);
}

module.exports = {
  USERS,
  launchFresh,
  choosePasswordLogin,
  submitPassword,
  loginAs,
  enterPhone,
  openOtpScreen,
  waitForHomeScreen,
  toggleTheme,
  scrollLoginScreen,
};
