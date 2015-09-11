var schedule;

// Load the JSON file
loadJSON('http://gvsuliblabs.com//hours-patch/',
	function(data) { schedule = data; },
	function(xhr) { console.error(xhr); }
);

// What is it right now?
var todayNow = getCurrentTime();
var todayDay = getDayName(todayNow);
var nowHoursMin = getHoursMin(todayNow);

for (var key in schedule) {
	  	if (schedule.hasOwnProperty(key)) {
	  		if(key === todayDay) { // This is today
	  			
	  			if(schedule[key] != 'Closed') {
	  				
	  				// Calculate whether the library is open or not
	  				var scheduleTimes = schedule[key].split(' - ');
	  				var openingTime = convertTimeFormat(scheduleTimes[0]);
	  				var closingTime = convertTimeFormat(scheduleTimes[1]);
					// Is the closing time past midnight? Is it before closing?
					// This is when we want to make the change.


					if((closingTime < openingTime) && (closingTime > nowHoursMin)) {
						// Format closing time
						closingTime = closingTime.replace(/\b0+/g, '');
						close = closingTime.split(':');
						closeM = scheduleTimes[1].split(' ');
						var message = '<strong>Mary Idema Pew</strong> <br />is open until ' + close[0] + closeM[1].toLowerCase();
						console.log(message);

					} 
	  			}
	  			
	  		}
	  	}
}

function padTime(time) {
	return parseInt(time) >= 10 ? time : "0" + time;
}

function getHoursMin(time) {
	var b = new Date(time);
	var h = b.getHours();
	var formattedTime = h + ':' + padTime(b.getMinutes());
	return formattedTime;
}

function getCurrentTime() {
	var today = new Date();  
	var localoffset = -(today.getTimezoneOffset()/60);
	var destoffset = -4; // EST
	var offset = destoffset-localoffset;
	var d = new Date( new Date().getTime() + offset * 3600 * 1000)
	return d;
}

function getDayName(time) {
	var a = new Date(time);
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var dayOfWeek = days[a.getDay()]
	return dayOfWeek;
}

function convertTimeFormat(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    return(padTime(hours) + ":" + padTime(minutes));
}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
