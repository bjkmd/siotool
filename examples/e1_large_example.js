module.exports = async function(context, commands) {
    try {
        await commands.cache.clear();
    //	await commands.wait.byTime(20000);
        const webdriver = context.selenium.webdriver;
        const driver = context.selenium.driver;
    
    /*FUNCTION SECTION*/
    const rate = async () => {
        try{
                let questionElements = await commands.js.run('return (document.getElementsByClassName("form-stars__label").length)');
                console.log("questions = " + questionElements);
                let step;
                for (step = 1; step < (questionElements+1); step++) {
                    console.log("questionsRun = " + step);
                    console.log("string = " + "/html/body/app-root/div/div/div/app-logged-page/div/div[2]/app-session-holder/app-complete-session/section/app-container/div/div/app-white-block/div/div/div/app-rate-session/div/form/div["+step+"]/app-rating/div/app-stars/div/div/div/div[5]/app-icon/i");
                    await commands.click.byXpath("/html/body/app-root/div/div/div/app-logged-page/div/div[2]/app-session-holder/app-complete-session/section/app-container/div/div/app-white-block/div/div/div/app-rate-session/div/form/div["+step+"]/app-rating/div/app-stars/div/div/div/div[5]/app-icon/i");
                    await commands.wait.byTime(1000);
                    }
        }
        catch(e){console.log(e)}
    }
    // 0. LOGIN
        await commands.measure.start('00.LoginPage');
        await commands.wait.byPageToComplete();
    
        await commands.measure.stop();
        await commands.wait.byTime(3000);
    
        await commands.wait.bySelector(".cookies-disclaimer__close");
    
        await commands.click.bySelectorAndWait(".cookies-disclaimer__close");
        //await commands.click.byLinkTextAndWait('Close');
        //await commands.click.byClassNameAndWait('btn');
        //await commands.measure.stop();
        await commands.wait.byTime(3000);
        await commands.wait.bySelector("input[id=email]",15000);
    
        //await commands.wait.byTime(1000);

    
        //await commands.measure.start('01.InsertEmail');
        await commands.click.bySelectorAndWait("button[type=submit]");
        await commands.wait.bySelector("input[id=password]",15000);
        //await commands.wait.byPageToComplete();
       //await commands.measure.stop();
        await commands.wait.bySelector("button[type=submit]",15000);
        await commands.measure.start('01.SignIn');
        await commands.click.bySelectorAndWait("button[type=submit]");
        await commands.wait.byPageToComplete();
        await commands.measure.stop();
        await commands.wait.byTime(3000);
    
        //rating all completed sessions
        let rateExists = await commands.js.run('return (document.querySelector(".rate-session__form-row") != null)');
        let i=0;
        console.log(rateExists);
        let rateTrName = "02.Rate";
            while (rateExists){
                i++;
                //rate();
                let questionElements = await commands.js.run('return (document.getElementsByClassName("form-stars__label").length)');
                console.log("questions = " + questionElements);
                let step;
                for (step = 1; step < (questionElements+1); step++) {
                    console.log("questionsRun = " + step);
                    console.log("string = " + "/html/body/app-root/div/div/div/app-logged-page/div/div[2]/app-session-holder/app-complete-session/section/app-container/div/div/app-white-block/div/div/div/app-rate-session/div/form/div["+step+"]/app-rating/div/app-stars/div/div/div/div[5]/app-icon/i");
                    await commands.click.byXpath("/html/body/app-root/div/div/div/app-logged-page/div/div[2]/app-session-holder/app-complete-session/section/app-container/div/div/app-white-block/div/div/div/app-rate-session/div/form/div["+step+"]/app-rating/div/app-stars/div/div/div/div[5]/app-icon/i");
                    await commands.wait.byTime(1000);
                    }
    
                rateTrNameNew = rateTrName + "_" + i;
                await commands.measure.start(rateTrNameNew);
                await commands.click.bySelectorAndWait(".btn--big");
                await commands.wait.byPageToComplete();
                await commands.measure.stop();
                await commands.wait.byTime(3000);
    
                await commands.click.byLinkTextAndWait('Home');
                await commands.wait.byPageToComplete();
                rateExists = await commands.js.run('return (document.querySelector(".rate-session__form-row") != null)');
                console.log("loop = " + i + "with rateExists = " + rateExists);
    
                }
    
    
        await commands.measure.start('03.Help');
        await commands.click.byLinkTextAndWait('Help');
        await commands.wait.byPageToComplete();
    
        await commands.wait.bySelector(".help__header-labels-title",30000);
        await commands.measure.stop();
        await commands.wait.byTime(3000);
    
        await commands.measure.start('04.Home');
        await commands.click.byLinkTextAndWait('Home');
        await commands.wait.byPageToComplete();
    
        //await commands.wait.bySelector(".help__header-labels-title",30000);
        await commands.measure.stop();
        await commands.wait.byTime(3000);
    
        //Xpath : //span[text()='Payment Partner']
    
        //Xpath : //span[@class='tile-name ng-binding']
    
        //Xpath : //span[contains(@class,'tile-name')]
    
        //Xpath : //span[contains(@class,'ng-binding')]
    
        //Xpath : //span[contains(@class,'tile-name') and text()='Payment Partner']
    
        //await commands.wait.byXpath("//a[contains(@href, '/command/')]", this.maxTime);
    
        //CssPath : span[class='tile-name ng-binding']
        await commands.measure.start('05.View All');
        await commands.click.byXpath("//span[text()='View All']");
        await commands.wait.byPageToComplete();
    
        //await commands.wait.bySelector(".help__header-labels-title",30000);
        await commands.measure.stop();
        await commands.wait.byTime(3000);
    
        /*await commands.measure.start('06.Book another session');
        await commands.click.byXpath("//button[contains(., 'session')]");
        await commands.wait.byPageToComplete();
        await commands.measure.stop();
        await commands.wait.byTime(3000);
    
        let askAssistanceExists = await commands.js.run("return (document.querySelector('.btn--secondary') != null)");
        console.log("askAssistanceExists = "+askAssistanceExists);
    
            if (askAssistanceExists){
                await commands.measure.start('06.01.Choose book myself');
                await commands.click.byXpath("//button[contains(., 'now')]");
                //await commands.click.bySelectorAndWait(".btn--secondary");
                //await commands.wait.bySelector(".book-session-calendar__calendar-item-content",30000);
                await commands.wait.byPageToComplete();
                await commands.measure.stop();
                await commands.wait.byTime(3000);
            }
    
        //await commands.click.byXpath("//span[@class=='book-session-calendar__calendar-item-content']");  //choose slot
    
        await commands.click.bySelector('.book-session-calendar__calendar-item-content');  //choose slot
    
        await commands.measure.start('07.Book session');
        await commands.click.bySelectorAndWait(".btn--primary");
        await commands.wait.byPageToComplete();
    
        //await commands.wait.bySelector(".help__header-labels-title",30000);
        await commands.measure.stop();
        await commands.wait.byTime(3000);
    
        await commands.measure.start('08.Continue after book');
        await commands.click.bySelectorAndWait(".btn--primary");
        await commands.wait.byPageToComplete();
    
        //await commands.wait.bySelector(".help__header-labels-title",30000);
        await commands.measure.stop();
        await commands.wait.byTime(3000);*/
    
            //Xpath : //span[contains(@class,'tile-name') and text()='Payment Partner']
    
 
    
        } catch (e) {
    }
    };