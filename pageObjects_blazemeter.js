
const CustomCommands = require('./customCommands.js');

class BasePage{

    constructor(context,commands) {
        this.context = context;
        this.commands = commands;
        this.custom = new CustomCommands(context, commands)
        this.host = context.host
        this.url = ''
      }

      async  navigate(){
        await this.custom.printFromScript(this.constructor.name,"navigate")
        const url = this.url
        await this.commands.navigate(url);
        return this;
    }

    async  clickNotExistingButton(){
        await this.custom.printFromScript(this.constructor.name,"clickNotExistingButton")
        const selector = "button[type=SOME_NOT_EXISTING_BUTTON]"
        await this.custom.clickBySelectorAndWait(selector);
        return this;
    }

    async elementExists(selector){
        return this.custom.elementExists(selector);
    }

    async toString(){
        await this.custom.printFromScript("Current url is: " +this.url)
    }

}


class PageWithCommonElements extends BasePage{
    constructor(context,commands) {
        super(context,commands)
      }

    async openHomePage(){
        await this.custom.printFromScript(this.constructor.name,"openHomePage")
        const text = "Home "
        await this.custom.clickByLinkTextAndWait(text)
        return new HomePage(this.context,this.commands)
    }

    async openCartPage(){
        await this.custom.printFromScript(this.constructor.name,"openCartPage")
        const text = "Cart"
        await this.custom.clickByLinkTextAndWait(text)
        return new CartPage(this.context,this.commands)
    }

    async openAboutUsWindow(){
        await this.custom.printFromScript(this.constructor.name,"openAboutUsWindow")
        const text = "About us"
        const modalWindowWithVideoSelector = '.modal video';
        await this.custom.clickByLinkText(text);
        await this.custom.waitBySelector(modalWindowWithVideoSelector);
        return this;
    }

}


class LandingPage extends PageWithCommonElements{
    constructor(context,commands) {
        super(context,commands)
        this.url = this.host 
      }

}


class HomePage extends PageWithCommonElements{
    constructor(context,commands) {
        super(context,commands)
        this.url = this.host + "/index.html"
      }

    async openPDP(){
        await this.custom.printFromScript(this.constructor.name,"openPDP")
        const productCardSelector = '.card .card-title a';
        await this.custom.clickBySelectorAndWait(productCardSelector);
        return new ProductPage(this.context,this.commands)
    }

    async openCategory_Phones(){
        await this.custom.printFromScript(this.constructor.name,"openCategory_Phones")
        const category = "Phones";
        await this._openCategoryByName(category);
        return this;
    }

    async openCategory_Laptops(){
        await this.custom.printFromScript(this.constructor.name,"openCategory_Laptops")
        const category = "Laptops";
        await this._openCategoryByName(category);
        return this;
    }

    async openCategory_Monitors(){
        await this.custom.printFromScript(this.constructor.name,"openCategory_Monitors")
        const category = "Monitors";
        await this._openCategoryByName(category);
        return this;
    }

    async _openCategoryByName(category){
        await this.custom.printFromScript(this.constructor.name,"_openCategoryByName", category)
        await this.custom.clickByLinkTextAndWait(category)
    }

}

class CartPage extends PageWithCommonElements{
    constructor(context,commands) {
        super(context,commands)
        this.url = this.host + "/cart.html"
      }

    async deleteItem(){
        await this.custom.printFromScript(this.constructor.name,"addToCart")
        const selector = 'a[onclick*=deleteItem]';
        await this.custom.clickBySelectorAndWait(selector)
    }

}

class ProductPage extends PageWithCommonElements{
    constructor(context,commands) {
        super(context,commands)
        this.url = this.host + "/prod.html"
      }

    async addToCart(){
        await this.custom.printFromScript(this.constructor.name,"addToCart")
        const selector = '.btn[onclick*=addToCart]';
        await this.custom.clickBySelector(selector)

        const until =  this.context.selenium.webdriver.until;
        const By =  this.context.selenium.webdriver.By;
        const driver = this.context.selenium.driver

        await driver.wait(until.alertIsPresent(), 3000);
        let alert = await driver.switchTo().alert();
        await alert.accept();
    }

}

module.exports = {
    LandingPage,
    HomePage,
    CartPage,
    ProductPage
}
