/*global chrome: false, storage: false, console: false, IScroll: false, Handlebars: false; */
"use strict";

// Copyright (c) 2016 Zhu Meng-Dan(Daniel). All rights reserved.

chrome.windows.getLastFocused({populate: true}, (currentWindow) => {
 console.log(JSON.stringify(currentWindow));
});
