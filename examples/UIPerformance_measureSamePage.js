const CustomCommands = require('../customCommands.js');

async function main(context, commands) {

    context.host = 'https://google.com'
    
    const custom = new CustomCommands(context, commands)

    try {

        await custom.breakpoint();

        await commands.measure.start('Landing');
        try {
            await commands.navigate(context.host)
        } catch (e) {throw e}
        await commands.measure.stop()

        /*
        To measure action that occures at the same page you need to add additional query parameter to the url
        See:
        https://www.sitespeed.io/documentation/sitespeed.io/scripting#test-the-same-page-multiple-times-within-the-same-run
        */
        await commands.measure.start('Suggestions');
        try {
            await custom.measureSamePage(); // adds timestamp to the url
            await custom.addTextBySelector('sitespeed','input[role="combobox"]');
            await custom.waitBySelector('center [type="submit"]');
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('Search');
        try {
            await custom.clickBySelectorUsingWebdriverAndWait('center [type="submit"]');
        } catch (e) {throw e}
        await commands.measure.stop()


    } catch (e) {
        context.log.error(e)
        await custom.pauseAtError();
    }       
};

module.exports = main;