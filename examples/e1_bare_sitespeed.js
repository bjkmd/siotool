async function main(context, commands) {

    const host = 'https://google.com'
    
    try {
        await commands.measure.start('Landing');
        try {
            await commands.navigate(host)
        } catch (e) {throw e}
        await commands.measure.stop()


        await commands.measure.start('Search');
        try {
            await commands.addText.bySelector('sitespeed','input[role="combobox"]');
            await commands.click.bySelectorAndWait('center [type="submit"]');
        } catch (e) {throw e}
        await commands.measure.stop()


    } catch (e) {
        context.log.error(e)
    }       
};

module.exports = main;