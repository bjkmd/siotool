const CustomCommands = require('./customCommands.js');
const {
    LandingPage
  } = require('./pageObjects_blazemeter.js');
async function main(context, commands) {

    context.host = 'https://google.com'

    const landingPage = new LandingPage(context, commands);
    

    const custom = new CustomCommands(context, commands)

    try {

        await custom.breakpoint();

        await commands.measure.start('01_LandingPage');
        try {
            await landingPage.navigate();
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('Search');
        try {
            await landingPage.search();
        } catch (e) {throw e}
        await commands.measure.stop()

       
        await custom.breakpoint();

    } catch (e) {
        context.log.error(e)
        await custom.pauseAtError();
    }       
};

module.exports = main;