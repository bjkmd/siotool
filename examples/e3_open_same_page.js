async function main(context, commands) {

    const host = 'https://google.com'
    
    try {
        await commands.wait.byTime(10000)

        await commands.measure.start('Landing');
        try {
            await commands.navigate(host)
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('Suggestions');
        try {
            // const script = 'history.pushState({}, "", `${document.URL}?SamePageMeasurementTimestamp=${Date.now()}`)'
            // await commands.js.run(script);
            await commands.addText.bySelector('sitespeed','input[role="combobox"]');
            await commands.wait.bySelector('center [type="submit"]');
        } catch (e) {throw e}
        await commands.measure.stop()

        await commands.measure.start('Search');
        try {
            const submitButtonSelector = 'center [type="submit"]'
            await commands.click.bySelectorAndWait(submitButtonSelector);
        } catch (e) {throw e}
        await commands.measure.stop()


    } catch (e) {
        context.log.error(e)
    }       
};

module.exports = main;