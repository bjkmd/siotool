# Toolset for sitespeedio



### Executing program

* Docker run

```
docker run  --rm -v ${PWD}:/sitespeed.io  \sitespeedio/sitespeed.io:20.6.2   UIPerformance_blazemeter.js  --config sitespeedConfig.json
```


* Npm based version

```
npm install -g sitespeed.io
```


```
sitespeed.io  UIPerformance_blazemeter.js -n 1  --config sitespeedConfig.json 
```


Useful Resources
* [Sitespeed.io scripting](https://www.sitespeed.io/documentation/sitespeed.io/scripting)
* [Sitespeed.io configuring html output](https://www.sitespeed.io/documentation/sitespeed.io/configure-html/) 
* [Webdriver documentation](https://www.selenium.dev/documentation/webdriver/)
* [CSS selectors reference w3schools](https://www.w3schools.com/cssref/css_selectors.asp)
* [Xpath cheatsheet](https://devhints.io/xpath)
* [Xpath operators w3schools](https://www.w3schools.com/xml/xpath_operators.asp)

