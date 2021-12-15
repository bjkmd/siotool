# Toolset for sitespeed.io

### Main features

- Intensive logging
```log
INFO: Start to measure 01_LandingPage
INFO: [+++ LOG +++]  LandingPage navigate
INFO: Navigating to url https://www.demoblaze.com iteration 1
INFO: Start to measure 02_CartPage_empty
INFO: [+++ LOG +++]  LandingPage openCartPage
INFO: [+++ LOG +++]  clickByLinkTextAndWait Cart
INFO: [+++ LOG +++]  LandingPage clickNotExistingButton
INFO: [+++ LOG +++]  clickBySelectorAndWait button[type=SOME_NOT_EXISTING_BUTTON]
ERROR: Could not click using selector button[type=SOME_NOT_EXISTING_BUTTON]
INFO: Start to measure 03_HomePage
INFO: [+++ LOG +++]  CartPage openHomePage
INFO: [+++ LOG +++]  clickByLinkTextAndWait Home
```

- Creating [screenshot](https://www.sitespeed.io/documentation/sitespeed.io/scripting/#screenshot) on error 

- Using of page object pattern

```js
await homePage.openCartPage();
await cartPage.deleteItem();
```

- Breakpoints (only when running npm-based version)

```js
await custom.breakpoint();
```
```log
INFO: [+++ LOG +++]  ====== BREAKPOINT ENABLED ======

INFO: [+++ LOG +++]  
                Select elements: 
                    $x("some_xpath")
                    $$("some_css_selector")
                    document.querySelector('some_css_selector')
                Click element:
                    document.querySelector('some_css_selector').click()
                Xpath: https://devhints.io/xpath
                    //*[contains(text(), “Some text”)]
                CSS: https://www.w3schools.com/cssref/css_selectors.asp
                    a[onclick*=somePartialText]
INFO: [+++ LOG +++]  ==== Press ENTER to proceed ====

INFO: [+++ LOG +++]  Proceeded...
INFO: Start to measure 01_LandingPage
INFO: [+++ LOG +++]  LandingPage navigate

```

- Measuring actions at the same page using ```custom.measureSamePage()```

```js

await commands.measure.start('SomePage');
try {
    await somePage.navigate();
} catch (e) {throw e}
await commands.measure.stop();

await commands.measure.start('SomePage_applyFilter');
try {
    await custom.measureSamePage();
    await somePage.applyFilter();
} catch (e) {throw e}
await commands.measure.stop();  

```


- Customizable html report 

[Sitespeed.io configuring html output](https://www.sitespeed.io/documentation/sitespeed.io/configure-html/) 

```json
 "html": {
    "showScript": true,
    "pageSummaryMetrics": [
      "timings.LastVisualChange",
      "timings.VisualComplete99",
      "timings.backEndTime",
      "transferSize.total",
      "transferSize.javascript",
      "transferSize.image"
    ]
  },
```

### Running the script

#### Docker run

```
docker run  --rm -v ${PWD}:/sitespeed.io  \sitespeedio/sitespeed.io:20.6.2   UIPerformance_blazemeter.js  --config sitespeedConfig.json
```


#### Npm based version

```
npm install -g sitespeed.io
```


```
sitespeed.io  UIPerformance_blazemeter.js --config sitespeedConfig.json 
```


### Useful Resources
- [Sitespeed.io scripting](https://www.sitespeed.io/documentation/sitespeed.io/scripting)
- [Webdriver documentation](https://www.selenium.dev/documentation/webdriver/)
- [CSS selectors reference w3schools](https://www.w3schools.com/cssref/css_selectors.asp)
- [Xpath cheatsheet](https://devhints.io/xpath)
- [Xpath operators w3schools](https://www.w3schools.com/xml/xpath_operators.asp)

