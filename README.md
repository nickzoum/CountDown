<p align="center">
  <h1 align="center">CountDown</h3>
  <p align="center">An JavaScript library that shows and manage time</p>
</p>

## Table of Contents

- [Intro](#intro)
- [What's included](#whats-included)
- [Showing simple timers](#showing-simple-timers)
- [Creating Custom Timers](#creating-custom-timers)

## Intro

CountDown is a simple JavaScript & CSS library that allows you to more easily use timers, countdowns and show the time

## What's included

What you will find in the src folder

```
src/
├── countdown.css
└── countdown.js
```

What you will find in the examples folder

```
examples/
└── basic/
    ├── countdown.css
    ├── countdown.js
    ├── index.html
    └── icon.ico
```

## Showing simple timers

To use this library you need to add the ```js-timer``` classname to a ```div``` element and then one of the below classnames based on the functionality you want

- <b>need-date</b> - Simply writes the current time
- <b>countdown</b> - A simple text counting down to 0
- <b>circle-countdown</b> - A circular timer counting down to 0
- <b>bar-countdown</b> - A vertical timer bar showing counting down to 0

You can also set some properties on each of the elements

- <b>js-time-format</b> - Sets the format of the time, default is ```HH:mm dd/MM/yy``` (use custom ```fs``` for full seconds, which is default for countdowns)
- <b>js-time-start-at</b> - This is used for countdowns, it sets the start time in seconds, default is 20
- <b>js-time-refresh</b> - How often the timer needs to refresh in seconds, default is 1

Finally you can also add EventListeners for when the countdown reaches zero, by doing
```javascript
element.addEventListener("callback", function () { console.log("Timer done"); });
element.addEventListener("callBack", function () { console.log("Timer done"); });
```
You can do it with html but you will have to set a global parameterless function
```html
<div class="js-time countdown" oncallback="testMethod"></div>
<script>function testMethod(){ console.log("Timer done"); }</script>
```
## Creating Custom Timers



```javascript
DateTimeExtension.defineAction("your-custom-classname", {/* your custom object properties */});
```
Here is a list of all the existing functions you can override

```javascript
/**
 * Gets the current date of the object
 * @returns {Date}
 */
function getDate(): Date
/**
 * Sets the time to now
 * @returns {void}
 */
function initTime(): void
/**
 * This function is called every time the refresh function is triggered
 * @param {string} [dateContext=] - the date in string format 
 * @returns {void}
 */
function doAction(dateContext: string): void
/**
 * This function fires the call back event
 * @returns {void}
 */
function onCallBack(): void
```

Here is a list of all the existing functions that you can use but cannot be overriden

```javascript
/**
 * Sets the text of the element using innerText
 * @param {string} text
 * @returns {void}
 */
function setText(text: string): void
/**
 * Sets the time of the element using innerHTML
 * @param {string} text
 * @returns {void}
 */
function setHtml(text: string): void
/**
 * To be called when the element needs to be refreshed
 * @returns {void}
 */
function refresh(): void
/**
 * This function fires the call back event on a an element
 * @param {HTMLElement} element
 * @returns {void}
 */
function executeCallBack(element: HTMLElement): void
```

Here are all of the existing properties that you can use

 - <b>refreshTimer</b> - How often the timer should refresh (seconds)
 - <b>countDown</b> - Start time of countdown (seconds)
 - <b>dateFormat</b> - ToString format of the date
 - <b>elem</b> - The htmlelement of the timer

For example here is a simple timer that shows the time and changes color every second
```javascript
DateTimeExtension.defineAction("color-date", {
  doAction: function doAction(dateContext) {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    this.setHtml("<span style='color: rgb(" + red + ", " + green + ", " + blue + ")'>" + dateContext + "</span>");
  }, initTime: function initTime() {
    var self = this;
    this.refreshTimer = parseFloat(this.refreshTimer || 1);
    this.dateFormat = this.dateFormat || "HH:mm dd/MM/yy";
    if (this.refreshTimer !== 0) setInterval(function () {
      self.refresh.call(self);
    }, this.refreshTimer * 1000);
  }
});
```