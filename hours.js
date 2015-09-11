var currentTime = getCurrentTime();

// Get current time in EST
function getCurrentTime() {
	var today = new Date();  
	var localoffset = -(today.getTimezoneOffset()/60);
	var destoffset = -4; // EST
	var offset = destoffset-localoffset;
	var d = new Date( new Date().getTime() + offset * 3600 * 1000)
	console.log(d);
	return d;
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

function convertTimestampDay(timestamp) {
	var a = new Date(timestamp*1000);
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var dayOfWeek = days[a.getDay()]
	return dayOfWeek;
}

function convertTimestamp(timestamp) {
	var date = new Date(timestamp*1000);
	var hours = date.getHours();
	var dd = "AM"
	var h = hours;
    if (h >= 12) {
        h = hours-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
	var minutes = "0" + date.getMinutes();
	var formattedTime = h + ':' + minutes.substr(-2) + ' ' + dd;
	return formattedTime;
}
