const CustomCommands = require('../customCommands.js');

async function main(context, commands) {

    const host = 'https://google.com'
    
    const custom = new CustomCommands(context, commands)

    try {

        await custom.breakpoint();

        await commands.measure.start('Landing');
        try {
            await commands.navigate(host)
        } catch (e) {throw e}
        await commands.measure.stop()

        

        
        await commands.measure.start('Search');
        try {
            await custom.addTextBySelector('sitespeed','input[role="combobox"]');
            await custom.clickBySelectorAndWait('center [type="submit"]');
        } catch (e) {throw e}
        await commands.measure.stop()


    } catch (e) {
        context.log.error(e)
        await custom.pauseAtError();
    }       
};

module.exports = main;