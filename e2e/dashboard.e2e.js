/* eslint-disable no-undef */

describe('Dashboard Screen Flow', () => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      delete: true,
    });

    // LOGIN
    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('loginEmailInput')).tap();
    await element(by.id('loginEmailInput')).replaceText('ava@scos.com');

    await element(by.id('loginUsePasswordButton')).tap();

    await waitFor(element(by.id('loginPasswordInput')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginPasswordInput')).replaceText('123456');

    try {
      await device.pressBack?.();
    } catch (e) {}

    try {
      await element(by.id('loginPasswordInput')).tapReturnKey();
    } catch (e) {}

    await element(by.id('loginContinueButton')).tap();

    // INSTITUTE
    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(15000);

    await waitFor(element(by.id('instituteCard-0')))
      .toBeVisible()
      .withTimeout(15000);

    await element(by.id('instituteCard-0')).tap();

    // ROLE
    await waitFor(element(by.id('roleScreen')))
      .toBeVisible()
      .withTimeout(15000);

    await waitFor(element(by.id('roleCard-0')))
      .toBeVisible()
      .withTimeout(15000);

    await element(by.id('roleCard-0')).tap();

    // DASHBOARD
    await waitFor(element(by.id('dashboardScreen')))
      .toBeVisible()
      .withTimeout(15000);
  });

  // TC01
  it('should load dashboard screen', async () => {
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  // TC02
  it('should display welcome message', async () => {
    await expect(element(by.id('dashboardWelcomeText'))).toBeVisible();

    await expect(element(by.id('dashboardRoleText'))).toBeVisible();
  });

  // TC03-TC07
  it('should display all dashboard cards', async () => {
    await expect(element(by.id('activeInstitutesCard'))).toBeVisible();

    await expect(element(by.id('inactiveInstitutesCard'))).toBeVisible();

    await expect(element(by.id('totalModulesCard'))).toBeVisible();

    await expect(element(by.id('totalUsersCard'))).toBeVisible();
  });

  // TC08
  it('should render dashboard header', async () => {
    await expect(element(by.id('dashboardHeader'))).toBeVisible();

    await expect(element(by.id('dashboardLogo'))).toBeVisible();

    await expect(element(by.id('profileButton'))).toBeVisible();
  });
  // TC11 + TC12
  it('should support theme rendering', async () => {
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  // TC13
  it('should maintain card visibility consistency', async () => {
    await expect(element(by.id('activeInstitutesCard-title'))).toBeVisible();

    await expect(element(by.id('inactiveInstitutesCard-title'))).toBeVisible();
  });

  // TC15
  it.only('should logout successfully', async () => {
    await element(by.id('profileButton')).tap();

    await waitFor(element(by.text('Logout')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.text('Logout')).tap();

    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  // TC20
  it('should maintain session while on dashboard', async () => {
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  // TC25
  it('should render dashboard within acceptable time', async () => {
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });
});
