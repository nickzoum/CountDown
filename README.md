<p align="center">
  <h2 align="center">CountDown</h3>
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

## Creating Custom Timers

```javascript
DateTimeExtension.defineAction("your-custom-classname", {/* your custom object properties */});
```