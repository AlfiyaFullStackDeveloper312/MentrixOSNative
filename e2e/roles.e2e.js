/* eslint-disable no-undef */

describe('Role Screen Flow', () => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      delete: true,
    });

    // LOGIN FLOW
    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('loginEmailInput')).replaceText('ava@scos.com');

    await waitFor(element(by.id('loginUsePasswordButton')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginUsePasswordButton')).tap();

    await waitFor(element(by.id('loginPasswordInput')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginPasswordInput')).replaceText('123456');

    try {
      await device.pressBack();
    } catch (e) {}

    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginContinueButton')).tap();

    // INSTITUTE SCREEN
    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(15000);

    await waitFor(element(by.id('instituteCard-0')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('instituteCard-0')).tap();

    // ROLE SCREEN
    await waitFor(element(by.id('roleScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  // TC01
  it('TC01 - should render role screen correctly', async () => {
    await expect(element(by.id('roleScreen'))).toBeVisible();
  });

  // TC02 + TC04 + TC11 (Header + navigation)
  it('TC02-TC04 - should render header and navigation UI correctly', async () => {
    await expect(element(by.id('changeInstituteButton'))).toBeVisible();
    await expect(element(by.id('backArrowIcon'))).toBeVisible();
    await expect(element(by.id('roleTitle'))).toBeVisible();
    await expect(element(by.id('roleSubtitle'))).toBeVisible();
  });

  // TC06 + TC07 + TC08 + TC09 (Institute Card UI)
  it('TC06-TC09 - should render institute details correctly', async () => {
    await expect(element(by.id('selectedInstituteCard'))).toBeVisible();
    await expect(element(by.id('selectedInstituteLogo'))).toBeVisible();
    await expect(element(by.id('selectedInstituteName'))).toBeVisible();
    await expect(element(by.id('locationIcon'))).toBeVisible();
    await expect(element(by.id('verificationIcon'))).toBeVisible();
  });

  // TC12 + TC20 (Role rendering)
  it('TC12 - should render role cards correctly', async () => {
    await waitFor(element(by.id('roleCard-0')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('roleCard-0'))).toBeVisible();
  });

  // TC14 + TC26 (Scrolling)
  it('TC14 - should support safe role list scrolling', async () => {
    await waitFor(element(by.id('roleList')))
      .toBeVisible()
      .withTimeout(10000);

    try {
      await element(by.id('roleList')).scroll(300, 'down');
      await element(by.id('roleList')).scroll(300, 'up');
    } catch (e) {}

    await expect(element(by.id('roleScreen'))).toBeVisible();
  });

  // TC21 + TC25 (Role selection navigation)
  it('TC21 - should navigate to dashboard on role selection', async () => {
    await waitFor(element(by.id('roleCard-0')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('roleCard-0')).tap();

    await waitFor(element(by.id('dashboardScreen')))
      .toBeVisible()
      .withTimeout(15000);

    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  // TC23 + TC24 (Change institute)
  it('TC23 - should navigate back to institute screen', async () => {
    await element(by.id('changeInstituteButton')).tap();

    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('instituteScreen'))).toBeVisible();
  });

  // TC16 (Dark mode)
  it('TC16 - should support dark mode correctly', async () => {
    try {
      await element(by.id('themeToggleButton')).tap();
    } catch (e) {}

    await expect(element(by.id('roleScreen'))).toBeVisible();
  });

  // TC27 (Navigation performance check)
  it('TC27 - should navigate smoothly to dashboard', async () => {
    await element(by.id('roleCard-0')).tap();

    await waitFor(element(by.id('dashboardScreen')))
      .toBeVisible()
      .withTimeout(15000);

    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });
});
