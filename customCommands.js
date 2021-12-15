
class CustomCommands{
    constructor(context,commands) {
        this.context = context;
        this.commands = commands;
        this.webdriver = this.context.selenium.webdriver;
        this.driver = this.context.selenium.driver
      }
      
      async  waitBySelector(selector){
            this.printFromScript("waitBySelector", selector);
            try {
                await this.commands.wait.bySelector(selector);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "waitBySelector "+e.message);
                throw(e);
            }
        }
      async  waitByXpath(xpath){
            this.printFromScript("waitByXpath", xpath);
            try {
                await this.commands.wait.byXpath(xpath);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "waitByXpath "+e.message);
                throw(e);
            }
        }
        
        async  clickBySelector(selector){
            this.printFromScript("clickBySelector", selector);
            try {
                await this.commands.click.bySelector(selector);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickBySelector "+e.message);
                throw(e);
            }
        }

        async  clickBySelectorAndWait(selector){
            this.printFromScript("clickBySelectorAndWait", selector);
            try {
                await this.commands.click.bySelectorAndWait(selector);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickBySelectorAndWait "+e.message);
                throw(e);
            }
        }

        async  clickBySelectorUsingWebdriver(selector){
            this.printFromScript("clickBySelectorUsingWebdriver", selector);
            try {
                const actions = this.driver.actions();
                const nav = this.driver.findElement(this.webdriver.By.css(selector));
                await this.printFromScript("Element: ", nav);
                await actions.click(nav).perform()
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickBySelectorUsingWebdriver "+e.message);
                throw(e);
            }
        }

        async  clickBySelectorUsingWebdriverAndWait(selector){
            this.printFromScript("clickBySelectorUsingWebdriverAndWait", selector);
            try {
                const actions = this.driver.actions();
                const nav = this.driver.findElement(this.webdriver.By.css(selector));
                await this.printFromScript("Element: ", nav);
                await actions.click(nav).perform();
                await this.commands.wait.byPageToComplete();
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickBySelectorUsingWebdriverAndWait "+e.message);
                throw(e);
            }
        }

        async  clickOnWebElementUsingWebdriver(webElement){
            this.printFromScript("clickOnWebElementUsingWebdriver", webElement);
            try {
               await webElement.click();
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickOnWebElementUsingWebdriver "+e.message);
                throw(e);
            }
        }

        async  findElementsBySelector(selector){
            this.printFromScript("findElementsBySelector", selector);
            try {
                await this.waitBySelector(selector)
                return this.driver.findElements(this.webdriver.By.css(selector));
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "findElementsBySelector "+e.message);
                throw(e);
            }
        }

        async  clickByXpath(xpath){
            this.printFromScript("clickByXpath", xpath);
            try {
                await this.commands.click.byXpath(xpath);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickByXpath "+e.message);
                throw(e);
            }
        }

        async  clickByXpathAndWait(xpath){
            this.printFromScript("clickByXpathAndWait", xpath);
            try {
                await this.commands.click.byXpathAndWait(xpath);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickByXpathAndWait "+e.message);
                throw(e);
            }
        }

        async  clickByLinkText(text){
            this.printFromScript("clickByLinkText", text);
            try {
                await this.commands.click.byLinkText(text);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickByLinkText "+e.message);
                throw(e);
            }
        }

        async  clickByLinkTextAndWait(text){
            this.printFromScript("clickByLinkTextAndWait", text);
            try {
                await this.commands.click.byLinkTextAndWait(text);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "clickByLinkTextAndWait "+e.message);
                throw(e);
            }
        }

        async  addTextBySelector(text, selector){
            this.printFromScript("addTextBySelector", selector, text);
            try {
                await this.commands.addText.bySelector(text, selector);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "addTextBySelector "+e.message);
                throw(e);
            }
        }

        async  runJavascript(script){
            this.printFromScript("runJavascript", script);
            try {
                await this.commands.js.run(script);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "runJavascript "+e.message);
                throw(e);
            }
        }

        async  measureSamePage(){
            this.printFromScript(this.constructor.name,"measureSamePage");
            try {
                const script = 'history.pushState({}, "", `${document.URL}?SamePageMeasurementTimestamp=${Date.now()}`)'
                await this.runJavascript(script);
            } catch (e) {
                this.reportErrorAndTakeScreenshot("ERROR: "+
                "measureSamePage "+e.message);
                throw(e);
            }
        }

        async  elementExists(selector){
            this.printFromScript("elementExistsCheck", selector);
            const exists = await this.commands.js.run('return (document.querySelector("'+selector+'") != null) ');
            this.printFromScript("elementExistsCheck ","Does exist?", exists);
            return exists;
        }
        
        async  printFromScript(...args){
            this.context.log.info('[+++ LOG +++] ',...args);
        }

        async  pauseAtError(){

            if (!await this.isRunningInsideDocker()) {
                await this.printFromScript("========","PAUSE AT ERROR","========")
                await this.breakpoint();
            }
        }

        async  breakpoint(){

            const keypress = async () => {
                process.stdin.setRawMode = true
                return new Promise(resolve => process.stdin.once('data', () => {
                    process.stdin.setRawMode = false
                  resolve()
                }))
              }
            
            if (!await this.isRunningInsideDocker()) {
                await this.printFromScript("======","BREAKPOINT ENABLED","======")
                console.trace();
                const message = `
                Select elements: 
                    $x("some_xpath")
                    $$("some_css_selector")
                    document.querySelector('some_css_selector')
                Click element:
                    document.querySelector('some_css_selector').click()
                Xpath: https://devhints.io/xpath
                    //*[contains(text(), “Some text”)]
                CSS: https://www.w3schools.com/cssref/css_selectors.asp
                    a[onclick*=somePartialText]`
                await this.printFromScript(message);
                await this.printFromScript("====","Press ENTER to proceed","====");
                await keypress();
                await this.printFromScript("Proceeded...");
            }
           
        }

        async reportErrorAndTakeScreenshot(errorMessage){
            await this.reportError(errorMessage)  
            await this.commands.screenshot.take("ERROR_Screenshot")
            
        }

        async isRunningInsideDocker(){
            return this.context.options.docker;
        }

        async reportError(errorMessage){
            await this.commands.error(errorMessage)  
        }




        

}

module.exports = CustomCommands;
