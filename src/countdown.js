var DateTimeExtension = (function MainModuleIIFE(javascript, newEvent) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var lowerCallBackEvent = newEvent("callback");
    var capitalCallBackEvent = newEvent("callBack");
    var actionList = [];
    var publicApi = {
        dateToString: dateToString,
        defineAction: defineAction
    };

    var RefreshAble = {
        refresh: function refresh() {
            if (this.isActive) this.doAction(dateToString(this.getDate(), this.dateFormat));
        },
        init: function init(elem) {
            var self = this;
            this.elem = elem;
            this.isActive = true;
            if (elem.removeJsTimeListener) elem.removeJsTimeListener();
            elem.removeJsTimeListener = function () { self.isActive = false; }
            this.refreshTimer = elem.getAttribute("js-time-refresh");
            this.countDown = elem.getAttribute("js-time-start-at");
            this.dateFormat = elem.getAttribute("js-time-format");
            this.initTime();
            this.refresh();
        },
        doAction: function doAction(dateContext) {
            // Default Implementation
        },
        onCallBack: function onCallBack() {
            this.executeCallBack(this.elem);
        },
        setText: function setText(text) {
            this.elem.innerText = text;
        },
        setHtml: function setHtml(text) {
            this.elem.innerHTML = text;
        },
        getDate: function getDate() {
            return this.dateTime;
        },
        initTime: function initTime() {
            this.dateTime = new Date();
        },
        executeCallBack: executeCallBack
    }

    RefreshAble.init.cannotBeOverridden = true;
    RefreshAble.setText.cannotBeOverridden = true;
    RefreshAble.setHtml.cannotBeOverridden = true;
    RefreshAble.refresh.cannotBeOverridden = true;
    RefreshAble.executeCallBack.cannotBeOverridden = true;

    RefreshAble.getDate.cannotBeOverridden = false;
    RefreshAble.initTime.cannotBeOverridden = false;
    RefreshAble.doAction.cannotBeOverridden = false;
    RefreshAble.onCallBack.cannotBeOverridden = false;

    /**
     * Custom toString method for dates
     * @param {Date} date - date object
     * @param {string} format - string format
     * @returns {string}
     */
    function dateToString(date, format) {
        date = date instanceof Date && date.valueOf() >= 0 ? date : new Date();
        format = format && (typeof format === "string") ? format : "HH:mm dd/MM/yy";
        var fs = (date.getSeconds()) + date.getMinutes() * 60;
        var year = String(date.getFullYear());
        var month = String(date.getMonth() + 1);
        var monthDate = String(date.getDate());
        var day = String(date.getDay());
        var weekDay = weekDays[day];
        var fullMonth = months[month - 1];
        var hour = date.getHours();
        var hour12 = String(hour % 12);
        var hour24 = String(hour);
        var min = String(date.getMinutes());
        var sec = String(date.getSeconds());
        return massReplace(format,
            [
                { regex: /EEEE/g, text: weekDay },
                { regex: /FME/g, text: fullMonth },
                { regex: /EEE/g, text: weekDay.substring(0, 3) },
                { regex: /FMS/g, text: fullMonth.substring(0, 3) },
                { regex: /yy/g, text: shortenText(year, 2, 2) },
                { regex: /MM/g, text: shortenText(month, 2, 2) },
                { regex: /dd/g, text: shortenText(monthDate, 2, 2) },
                { regex: /hh/g, text: shortenText(hour12, 2) },
                { regex: /HH/g, text: shortenText(hour24, 2) },
                { regex: /mm/g, text: shortenText(min, 2, 2) },
                { regex: /ss/g, text: shortenText(sec, 2) },
                { regex: /M/g, text: month },
                { regex: /d/g, text: monthDate },
                { regex: /E/g, text: shortenText(day, -1, 1) },
                { regex: /y/g, text: year },
                { regex: /h/g, text: hour12 },
                { regex: /H/g, text: hour24 },
                { regex: /fs/g, text: fs },
                { regex: /m/g, text: min },
                { regex: /s/g, text: sec }
            ]
        );
    }

    /**
     * Does complex regex replacements
     * @param {string} text
     * @param {Array<{regex: RegExp, text: string}>} regexList
     * @returns {string}
     */
    function massReplace(text, regexList) {
        for (var index = 0; index < regexList.length; index++) {
            text = text.replace(regexList[index].regex, "{" + index + "}");
        }
        for (var index = 0; index < regexList.length; index++) {
            text = text.replace("{" + index + "}", regexList[index].text);
        }
        return text;
    }


    /**
     * Controls the size of a text
     * @param {string} text - text
     * @param {number} [min=] - min size
     * @param {number} [max=] - max size
     * @returns {string}
     */
    function shortenText(text, min = -1, max = -1) {
        if (min != -1) {
            var diff = min - text.length;
            if (diff > 0) {
                var extra = "";
                for (var index = 0; index < diff; index++) {
                    extra += "0";
                }
                text = extra + text;
            }
        }
        if (max != -1) {
            if (max > text.length) {
                text = text.substring(0, max - 1);
            }
        }
        return text;
    }

    function executeCallBack(elem) {
        try {
            elem.dispatchEvent(lowerCallBackEvent);
            elem.dispatchEvent(capitalCallBackEvent);
            callBackEval(elem.getAttribute("oncallback"));
        } catch (err) {
            console.error(err);
        }
    }

    function defineAction(id, action) {
        var actionFound = false, index = 0;
        while (!actionFound && index < actionList.length) {
            actionFound = actionList[index++].id === id;
        }
        if (actionFound === false) {
            var newTemplate = Object.create(RefreshAble);
            for (var key in action) {
                if (RefreshAble[key] && RefreshAble[key].cannotBeOverridden) throw new Error("Property '" + key + "' can not be overridden");
                else if (typeof action[key] === "function") newTemplate[key] = action[key];
                else throw new Error("Property '" + key + "' is not a function");
            }
            actionList.push({
                action: newTemplate,
                id: id
            });
        }
    }

    function callBackEval(text) {
        if (typeof text === "string") {
            text = text.trim();
            if (text.length > 0) {
                if (text.startsWith("var") || text.startsWith("function")) {
                    throw new Error("Illegal Action: Creation of new var or function in callBack attribute.");
                } else {
                    text = text.replace(/[(].{0,}/, "");
                    var callBackFunc = javascript[text];
                    if (typeof callBackFunc === "function") callBackFunc();
                    else throw new Error("Function '" + text + "' was not found.");
                }
            }
        }
    }

    function onActionDone(event) {
        var elem = event.target;
        var list = elem.classList;
        var length = list.length;
        if (!list.contains("js-time")) return;
        for (var index = 0; index < length; index++) {
            var className = list.item(index);
            var action = actionList.find(
                function (action) {
                    return className == action.id;
                });
            if (action) {
                var newAction = Object.create(action.action);
                newAction.init(elem);
                break;
            }
        }
    }

    document.addEventListener("animationstart", onActionDone, false);
    document.addEventListener("MSAnimationStart", onActionDone, false);
    document.addEventListener("webkitAnimationStart", onActionDone, false);

    return publicApi;
})(window, function (name) { var event = document.createEvent('Event'); event.initEvent(name, true, false); return event; });

(function ActionDefinitionsIIFE(define) {
    define("need-date", {
        doAction: function doAction(dateContext) {
            this.setText(dateContext);
        }, initTime: function initTime() {
            var self = this;
            this.refreshTimer = parseFloat(!isNaN(this.refreshTimer) ? isNaN(this.refreshTimer) :  0);
            this.dateFormat = this.dateFormat || "HH:mm dd/MM/yy";
            if (this.refreshTimer !== 0) setInterval(function () {
                self.refresh.call(self);
            }, this.refreshTimer * 1000);
        }
    });
    define("circle-countdown", {
        doAction: function doAction() {
            var duration = this.refreshTimer * 2;
            var iterations = Math.ceil(this.countDown / duration);
            var text = "<div class='circle center' style='animation-duration: " + duration + "s; animation-iteration-count: " + iterations + ";'>" +
                "<div class='js-time countdown' js-time-format=" + this.dateFormat + " js-time-start-at='" + this.countDown + "' js-time-refresh='" + this.refreshTimer + "'></div>" +
                "<div class='countdown-left'></div>" +
                "<div class='countdown-right'></div>" +
                "</div>";
            this.setHtml(text);
        }, initTime: function initTime() {
            this.dateFormat = this.dateFormat || "fs";
            this.countDown = parseFloat(this.countDown || 20);
            this.refreshTimer = parseFloat(!isNaN(this.refreshTimer) ? isNaN(this.refreshTimer) :  1);
        }
    });
    define("bar-countdown", {
        doAction: function doAction() {
            var text = "<div class='bar-countdown-back' style='animation-duration: " + this.countDown + "s;'></div>" +
                "<div class='js-time countdown' js-time-format='" + this.dateFormat + "' js-time-start-at='" + this.countDown + "' js-time-refresh='" + this.refreshTimer + "'></div>";
            this.setHtml(text);
        }, initTime: function initTime() {
            this.refreshTimer = parseFloat(!isNaN(this.refreshTimer) ? isNaN(this.refreshTimer) :  1);
            this.countDown = parseFloat(this.countDown || 20);
            this.dateFormat = this.dateFormat || "fs";
        }
    });
    define("countdown", {
        doAction: function doAction(dateContext) {
            this.setText(dateContext);
        },
        onLoop: function onLoop() {
            var diff = this.msCountDown + this.startTime - Date.now();
            this.dateTime = new Date(diff);
            if (diff <= 0) {
                this.dateTime = new Date(0);
                this.isComplete = true;
            }
            this.refresh();
            if (this.isComplete) {
                clearInterval(this.intervalId);
                this.onCallBack();
            }
        },
        onCallBack: function onCallBack() {
            this.executeCallBack(this.elem.parentElement.parentElement);
        },
        initTime: function initTime() {
            this.countDown = parseFloat(this.countDown || 20);
            this.msCountDown = this.countDown * 1000;
            this.refreshTimer = parseFloat(!isNaN(this.refreshTimer) ? isNaN(this.refreshTimer) :  1);
            this.dateTime = new Date(this.msCountDown);
            this.dateFormat = this.dateFormat || "fs";
            this.startTime = Date.now() + 100;
            this.isComplete = false;
            var self = this;
            this.intervalId = setInterval(function () {
                self.onLoop.call(self);
            }, this.refreshTimer * 1000);
        }
    });
})(window.DateTimeExtension.defineAction);