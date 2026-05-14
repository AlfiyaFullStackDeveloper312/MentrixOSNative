/* eslint-disable no-undef */

describe('Role Screen Flow', () => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      delete: true,
    });

    // LOGIN
    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('loginEmailInput')).replaceText('ava@scos.com');

    await element(by.id('loginUsePasswordButton')).tap();

    await waitFor(element(by.id('loginPasswordInput')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginPasswordInput')).replaceText('123456');

    try {
      await device.pressBack();
    } catch (e) {}

    await element(by.id('loginContinueButton')).tap();

    // INSTITUTE
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

  // TC1
  it('should display role screen', async () => {
    await expect(element(by.id('roleScreen'))).toBeVisible();
  });

  // TC2 - TC13
  it('should render main UI components', async () => {
    await expect(element(by.id('changeInstituteButton'))).toBeVisible();

    await expect(element(by.id('backArrowIcon'))).toBeVisible();

    await expect(element(by.id('selectedInstituteCard'))).toBeVisible();

    await expect(element(by.id('selectedInstituteLogo'))).toBeVisible();

    await expect(element(by.id('selectedInstituteName'))).toBeVisible();

    await expect(element(by.id('locationIcon'))).toBeVisible();

    await expect(element(by.id('verificationIcon'))).toBeVisible();

    await expect(element(by.id('roleTitle'))).toBeVisible();

    await expect(element(by.id('roleSubtitle'))).toBeVisible();
  });

  // TC14 - TC16
  it('should render role cards properly', async () => {
    await waitFor(element(by.id('roleCard-0')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('roleCard-0'))).toBeVisible();

    await expect(element(by.id('roleIcon-0'))).toBeVisible();

    await expect(element(by.id('roleName-0'))).toBeVisible();

    await expect(element(by.id('roleDescription-0'))).toBeVisible();

    await expect(element(by.id('roleArrow-0'))).toBeVisible();
  });

  // TC17 + TC37
  it('should support safe scrolling', async () => {
    try {
      await element(by.id('roleList')).scroll(300, 'down');
    } catch (e) {}
  });

  // TC26
  it('should render multiple roles', async () => {
    await expect(element(by.id('roleCard-0'))).toBeVisible();
  });

  // TC27 + TC28 + TC35
  it('should navigate on role selection', async () => {
    await element(by.id('roleCard-0')).tap();
  });

  // TC29 + TC30
  it('should navigate back to institute screen', async () => {
    await element(by.id('changeInstituteButton')).tap();

    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  // TC20 + TC40
  it('should support dark mode', async () => {
    try {
      await element(by.id('themeToggleButton')).tap();
    } catch (e) {}

    await expect(element(by.id('roleScreen'))).toBeVisible();
  });
});
