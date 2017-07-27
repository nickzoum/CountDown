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

To use this library you need to add the ```javascript js-timer``` classname to a ```html div``` element and then one of the below classnames based on the functionality you want

- <b>need-date</b> - Simply writes the current time
- <b>countdown</b> - A simple text counting down to 0
- <b>circle-countdown</b> - A circular timer counting down to 0
- <b>bar-countdown</b> - A vertical timer bar showing counting down to 0

## Creating Custom Timers

```javascript
DateTimeExtension.defineAction("insert-classname", {/* add object properties */});
```