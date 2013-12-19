function mode(array) {
    if (array.length == 0) {
    	return null;
    }
    var modeMap = {};
    var maxEl = array[0];
    var maxCount = 1;
    for (var i = 0; i < array.length; i++) {
    	var el = array[i];
    	if (modeMap[el] == null) {
    		modeMap[el] = 1;
        } else {
    		modeMap[el]++;
        }	
    	if (modeMap[el] > maxCount) {
    		maxEl = el;
    		maxCount = modeMap[el];
    	}
    }
    return maxEl;
}

function getDates() {
    var dates = [];
    var currentDate = new Date();
    for (var i = -1; i <= 5; i++) {
        dates[i+1] = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000));
    }
    return dates;
}