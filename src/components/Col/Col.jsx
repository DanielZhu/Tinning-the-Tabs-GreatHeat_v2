'use strict'

// Import stylus files
import './style.styl'

// Import libs
import React, {Component, PropTypes} from 'react'

import ColTimeSlot from '../ColTimeSlot/colTimeSlot';
import queryTabsInCurrentWindow from '../../mocks/queryTabsInCurrentWindow';

export default class Col extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  dateFormat(date, format) {
    date = date.replace(/-/g, "/");
    format = format || 'yyyy-MM-dd';

    switch (typeof date) {
      case 'string':
        date = parseInt(date, 10);
      case 'number':
        date = new Date(date);
      break;
    }

    if (!date instanceof Date) {
      date = new Date();
    }

    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))
        );
      }
    }

    return format;
  }
  calcWeekCountPassedOnNatural(timestamp) {
    let todaySlot = {
      start: new Date(this.dateFormat(Date.now().toString(), 'yyyy-MM-dd 00:00:00')).getTime(),
      end: new Date(this.dateFormat(Date.now().toString(), 'yyyy-MM-dd 23:59:59')).getTime()
    };
    let yesterdayTimestamp = (Date.now() - 24 * 60 * 60 * 1000).toString();
    let yesterdaySlot = {
      start: new Date(this.dateFormat(yesterdayTimestamp, 'yyyy-MM-dd 00:00:00')).getTime(),
      end: new Date(this.dateFormat(yesterdayTimestamp, 'yyyy-MM-dd 23:59:59')).getTime()
    };

    let timeAgo;
    let weekLengthStamp = 7 * 24 * 60 * 60 * 1000;

    let weeksAgo  = Math.abs(Math.floor((Date.now() - timestamp)/ weekLengthStamp));

    if (weeksAgo < 1) {
      if ((timestamp >= todaySlot.start && timestamp <= todaySlot.end)
        || (timestamp >= yesterdaySlot.start && timestamp <= yesterdaySlot.end)) {
        // Today || Yesterday
        timeAgo = this.calcTime(timestamp);
      }
      else {
        timeAgo = this.calcTime(timestamp);
      }
    }
    else {
      // years or weeks
      if (weeksAgo / 52 > 1) {
        timeAgo = {value: (weeksAgo / 52).toFixed(1), unit: 'year'};
      }
      else {
        timeAgo = {value: weeksAgo, unit: 'week'};
      }
    }

    return timeAgo;
  }
  calcTime(timestamp) {
    let timeDiff = {value: '...', unit: ''};
    // timestamp *= 1000;

    let now = Date.now();
    let diffTotal = now - timestamp;

    let preDiffByDay = diffTotal / (24 * 60 * 60 * 1000);
    let diffByDay = preDiffByDay >= 1 ? Math.floor(preDiffByDay) : 0;
    diffTotal -= (preDiffByDay >= 1 ? diffByDay * 24 * 60 * 60 * 1000 : 0);

    let preDiffByHour = diffTotal / (60 * 60 * 1000);
    let diffByHour = preDiffByHour >= 1 ? Math.floor(preDiffByHour) : 0;
    diffTotal -= (preDiffByHour >= 1 ? diffByHour * 60 * 60 * 1000 : 0);

    let preDiffByMinute = diffTotal / (60 * 1000);
    let diffByMinute = preDiffByMinute >= 1 ? Math.floor(preDiffByMinute) : 0;
    diffTotal -= (preDiffByMinute >= 1 ? diffByMinute * 60 * 1000 : 0);

    let preDiffBySecond = diffTotal / 1000;
    let diffBySecond = preDiffBySecond >= 1 ? Math.floor(preDiffBySecond) : 0;
    diffTotal -= (preDiffBySecond >= 1 ? diffBySecond * 1000 : 0);

    if (diffByDay > 0) {
      timeDiff = {value: diffByDay, unit: 'day'};
      if (diffByDay === 1) {
        timeDiff.label = 'Yesterday';
      }
    }
    else {
      if (diffByHour > 0) {
        timeDiff = {value: diffByHour, unit: 'hour'};
      }
      else if (diffByMinute > 0) {
        timeDiff = {value: diffByMinute, unit: 'minute'};
      }
      else if (diffBySecond > 0) {
        timeDiff = {value: diffBySecond, unit: 'second'};
      }
      timeDiff.label = 'Today';
    }

    return timeDiff;
  }
  splitItemByTimeSlog() {
    let tinnedWindows = queryTabsInCurrentWindow;
    let timeSlots = {};

    for (let win of tinnedWindows) {
      let timeAgo = this.calcWeekCountPassedOnNatural(win.createdAt);
      if (timeSlots.hasOwnProperty(this.transUnitForTimeAgo(timeAgo))) {
        timeSlots[this.transUnitForTimeAgo(timeAgo)].tinnedList.push(win);
      }
      else {
        timeSlots[this.transUnitForTimeAgo(timeAgo)] = {timeAgo: timeAgo, tinnedList: []};
        timeSlots[this.transUnitForTimeAgo(timeAgo)].tinnedList.push(win);
      }
    }

    /* timeSlots
    {
      0.1: {
        timeAgo: {value: x, unit: x},
        tinnedList: [winObj, winObj, winObj...]
      },
      3: {
        timeAgo: {value: x, unit: x},
        tinnedList: [winObj, winObj, winObj...]
      }
    }*/
    return timeSlots;
  }
  transUnitForTimeAgo(timeAgo) {
    return timeAgo.label ? timeAgo.label : timeAgo.value + ' ' + timeAgo.unit + (timeAgo.value > 1 ? 's' : '');
  }
  render() {
    let timeSlots = this.splitItemByTimeSlog();
    let timeSlotList = [];
    for (let timeAgo in timeSlots) {
      timeSlotList.push(<ColTimeSlot data={timeSlots[timeAgo]} key={timeAgo} />);
    }
    return (
      <div className='col-container'>
        {timeSlotList}
      </div>
    );
  }
}
