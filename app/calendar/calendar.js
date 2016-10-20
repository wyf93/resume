//简易万年历
var Calendar = function () {
	var self =this;
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.init();
	document.querySelector('.prev').onclick =function () {
		self.prev();
	}
	document.querySelector('.next').onclick =function () {
		self.next();
	}
}

Calendar.prototype = {
	//判断是否是闰年
	isRun: function (year) {
		if((year%4==0&&year%100!=0)||(year%400==0)) {
			return true;
		}
		else{
			return false;
		}
	},
	//根据年份月份返回该月总天数
	getMonthDays: function (year, month) {
		var days = 31;
		switch(month) {
			case 4:
			case 6:
			case 9:
			case 11:
				days = 30;
				break;
			case 2:
				if(this.isRun(year)) {
					days = 29;
				}
				else {
					days = 28;
				}
				break;
		}
		return days;
	},
	//计算给定年份月份计算这个月第一天距离1900-1-1过了多少天
	getTotalDays: function (year, month) {
		var totalDays = 0;
		for(var i = 1900; i < year; i++) {
			if(this.isRun(i)) {
				totalDays += 366;
			}
			else {
				totalDays += 365;
			}
		}
		for(var i = 1; i < month; i++) {
			totalDays += this.getMonthDays(year, i);
		}
		return totalDays;
	},
	init: function () {
		document.querySelector('.year').innerHTML = this.year + '年';
		document.querySelector('.month').innerHTML = this.month + '月';

		var day; //这个月的第一天是星期几
		var totalDays; //这个月的第一天距离1900-1-1多少天（星期一）
		var monthDays; //这个月的总天数

		monthDays = this.getMonthDays(this.year, this.month);
		totalDays = this.getTotalDays(this.year, this.month);
		day = totalDays%7 + 1;
		if(day ===7) {
			day = 0;
		}
		for(var i = 0; i < document.querySelectorAll('td').length; i++) {
			document.querySelectorAll('td')[i].innerHTML = '';
		}
		for(var i = 1; i <= monthDays; i++) {
			document.querySelectorAll('td')[day].innerHTML = i;
			day++;
		}	
	},
	prev: function () {
		this.month -= 1;
		if(this.month === 0) {
			this.year -= 1;
			this.month = 12;
		}
		this.init();
	},
	next: function () {
		this.month += 1;
		if(this.month === 13) {
			this.year += 1;
			this.month = 1;
		}
		this.init();
	}
}