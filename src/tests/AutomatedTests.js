const { Builder, By, Key, utill, until } = require("selenium-webdriver");
async function createMarketTest() {
  let driver = new Builder().forBrowser("chrome").build();
  driver.get("http://localhost:3000");
  try {
    await driver.findElement(By.id("navbar-toggle")).click();
    let enterLoginPage = await driver.wait(
      until.elementLocated(By.linkText("Logowanie"))
    );
    enterLoginPage.click();

    let startTypingLogin = await driver.wait(
      until.elementLocated(By.name("username"))
    );
    startTypingLogin.sendKeys("moderator");
    await driver.findElement(By.name("password")).sendKeys("moderator123");
    await driver.findElement(By.id("loginButton")).click();

    let enterCreateMarketForm = await driver.wait(
      until.elementLocated(By.id("addNewMarket"))
    );
    enterCreateMarketForm.click();

    let startTypingMarketTopic = await driver.wait(
      until.elementLocated(By.name("topic"))
    );
    startTypingMarketTopic.sendKeys("New market");
    await driver.findElement(By.name("endDate")).sendKeys("01-01-2021");
    await driver.findElement(By.name("category")).click();
    await driver.findElement(By.id("GOSPODARKA")).click();
    await driver.findElement(By.id("description")).clear();
    await driver.findElement(By.id("description")).sendKeys("Description");
    await driver.findElement(By.id("createMarketButton")).click();

    let enterBetTitle = await driver.wait(
      until.elementLocated(By.name("title"))
    );
    enterBetTitle.sendKeys("NewBet");
    await driver.findElement(By.name("yesPrice")).sendKeys(0.5);
    await driver.findElement(By.name("noPrice")).sendKeys(0.5);
    await driver.findElement(By.name("shares")).clear();
    await driver.findElement(By.name("shares")).sendKeys(20000);
    await driver.findElement(By.id("addBetButton")).click();

    let confirmBets = await driver.wait(
      until.elementLocated(By.id("confirmBetsButton"))
    );
    confirmBets.click();
    await (await driver).sleep(2000);
    await driver.executeScript("window.scrollBy(0,200);");
  } catch (err) {
    handleFailure(err, driver);
  }
}

async function changePassword() {
  let driver = new Builder().forBrowser("chrome").build();
  driver.get("http://localhost:3000");
  try {
    await driver.findElement(By.id("navbar-toggle")).click();
    let enterLoginPage = await driver.wait(
      until.elementLocated(By.linkText("Logowanie"))
    );
    enterLoginPage.click();
    let startTypingLogin = await driver.wait(
      until.elementLocated(By.name("username"))
    );
    startTypingLogin.sendKeys("RynkoznawcaWojtek");
    await driver.findElement(By.name("password")).sendKeys("wojtek1234");
    await driver.findElement(By.id("loginButton")).click();

    let enterChangePasswordForm = await driver.wait(
      until.elementLocated(By.id("openEditPasswordButton"))
    );
    enterChangePasswordForm.click();

    let startTypingOldPassword = await driver.wait(
      until.elementLocated(By.name("oldPassword"))
    );
    startTypingOldPassword.sendKeys("wojtek1234");

    await driver.findElement(By.name("newPassword")).sendKeys("wojtek12345");
    await driver
      .findElement(By.name("repeatedNewPassword"))
      .sendKeys("wojtek12345");

    await driver.findElement(By.id("submitNewPassword")).click();

    let loginWithNewPassword = await driver.wait(
      until.elementLocated(By.name("username"))
    );
    loginWithNewPassword.sendKeys("RynkoznawcaWojtek");
    await driver.findElement(By.name("password")).sendKeys("wojtek12345");
    await driver.findElement(By.id("loginButton")).click();
  } catch (err) {
    handleFailure(err, driver);
  }
}

function handleFailure(err, driver) {
  console.error("Something went wrong!\n", err.stack, "\n");
  driver.quit();
}

changePassword();
// createMarketTest();
// buyShares()
