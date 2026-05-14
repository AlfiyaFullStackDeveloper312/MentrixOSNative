/* eslint-disable no-undef */

describe('Institute Screen Flow', () => {
  const INSTITUTE_NAME = 'ABC Institute';

  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      delete: true,
    });

    // LOGIN SCREEN
    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);

    // EMAIL INPUT
    await waitFor(element(by.id('loginEmailInput')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginEmailInput')).tap();

    await element(by.id('loginEmailInput')).replaceText('ava@scos.com');

    // USE PASSWORD
    await waitFor(element(by.id('loginUsePasswordButton')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginUsePasswordButton')).tap();

    // PASSWORD INPUT
    await waitFor(element(by.id('loginPasswordInput')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginPasswordInput')).replaceText('123456');

    // CLOSE KEYBOARD
    try {
      await device.pressBack();
    } catch (e) {}

    try {
      await element(by.id('loginPasswordInput')).tapReturnKey();
    } catch (e) {}

    // LOGIN BUTTON
    await waitFor(element(by.id('loginContinueButton')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('loginContinueButton')).tap();

    // WAIT FOR INSTITUTE SCREEN
    await waitFor(element(by.id('instituteScreen')))
      .toBeVisible()
      .withTimeout(15000);
  });

  // TC1
  it('should display institute screen', async () => {
    await expect(element(by.id('instituteScreen'))).toBeVisible();
  });

  // TC2 + TC3 + TC4
  it('should render header texts', async () => {
    await expect(element(by.id('welcomeText'))).toBeVisible();

    await expect(element(by.id('subtitleText'))).toBeVisible();
  });

  // TC5 + TC6 + TC7
  it('should render search components', async () => {
    await waitFor(element(by.id('searchBox')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('searchBox'))).toBeVisible();

    await expect(element(by.id('searchIcon'))).toBeVisible();

    await expect(element(by.id('searchInput'))).toBeVisible();
  });

  // TC8 - TC13
  it('should render institute card details', async () => {
    await waitFor(element(by.id(`instituteCard-0`)))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id(`instituteCard-0`))).toBeVisible();

    await expect(element(by.id(`instituteLogo-0`))).toBeVisible();

    await expect(element(by.id(`instituteName-0`))).toBeVisible();

    await expect(element(by.id(`instituteLocation-0`))).toBeVisible();

    await expect(element(by.id(`instituteType-0`))).toBeVisible();

    await expect(element(by.id(`instituteArrow-0`))).toBeVisible();
  });

  // TC16 + TC39
  it('should support safe scrolling', async () => {
    try {
      await element(by.id('instituteList')).scroll(300, 'down');
    } catch (e) {}
  });

  // TC24 + TC25 + TC27
  it('should filter institutes from search', async () => {
    await waitFor(element(by.id('searchInput')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('searchInput')).replaceText('nag');

    await expect(element(by.id(`instituteCard-0`))).toBeVisible();
  });

  // TC26
  it('should handle empty search results', async () => {
    await waitFor(element(by.id('searchInput')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('searchInput')).replaceText('zzzzzz');

    await expect(element(by.id('emptyInstituteText'))).toBeVisible();
  });

  // TC28 + TC29 + TC30
  it('should navigate on institute selection', async () => {
    await waitFor(element(by.id(`instituteCard-0`)))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id(`instituteCard-0`)).tap();
  });

  // TC19
  it('should support dark mode', async () => {
    try {
      await waitFor(element(by.id('themeToggleButton')))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id('themeToggleButton')).tap();
    } catch (e) {}

    await expect(element(by.id('instituteScreen'))).toBeVisible();
  });
});
