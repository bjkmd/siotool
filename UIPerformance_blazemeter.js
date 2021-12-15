const CustomCommands = require('./customCommands.js');
const {
    LandingPage,
    HomePage,
    CartPage,
    ProductPage
  } = require('./pageObjects_blazemeter.js');

async function main(context, commands) {

    context.host = 'https://www.demoblaze.com'
    
    const landingPage = new LandingPage(context, commands);
    const homePage = new HomePage(context, commands);
    const cartPage = new CartPage(context, commands);
    const productPage = new ProductPage(context, commands);

    const custom = new CustomCommands(context, commands)

    try {

        await custom.breakpoint();

        await commands.measure.start('01_LandingPage');
        try {
            await landingPage.navigate();
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('02_CartPage_empty');
        try {
            await landingPage.openCartPage();
            await landingPage.clickNotExistingButton();
        } catch (e) {}
        await commands.measure.stop();

        await commands.measure.start('03_HomePage');
        try {
            await cartPage.openHomePage();
        } catch (e) {throw e}
        await commands.measure.stop();

        await commands.measure.start('04_HomePage_Laptops');
        try {
            await homePage.openCategory_Laptops();
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('05_HomePage_Monitors');
        try {
            await homePage.openCategory_Monitors();
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('06_HomePage_Phones');
        try {
            await homePage.openCategory_Phones();
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('07_ProductPage');
        try {
            await homePage.openPDP();
        } catch (e) {throw e}
        await commands.measure.stop()

        await(await(await(await
            productPage.openHomePage())
            .openCategory_Laptops())
            .openPDP())
            .addToCart();

        await(await(await(await
            productPage.openHomePage())
            .openCategory_Monitors())
            .openPDP())
            .addToCart();

        await(await(await(await
            productPage.openHomePage())
            .openCategory_Phones())
            .openPDP())
            .addToCart();

        await commands.measure.start('08_CartPage_full');
        try {
            await homePage.openCartPage();
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('09_CartPage_delete_1');
        try {
            await cartPage.deleteItem();
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('10_CartPage_delete_2');
        try {
            await cartPage.deleteItem();
        } catch (e) {throw e}
        await commands.measure.stop()

        await custom.breakpoint();

    } catch (e) {
        context.log.error(e)
        await custom.pauseAtError();
    }       
};

module.exports = main;