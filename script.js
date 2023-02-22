function loadScript(src,callback){
  
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(callback)script.onload=callback;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.src = src;
}


loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBzO-kFoyPTj9B6TpYNhsMMxb49bi6LPXg&callback=initialize');


function initialize() {
	
	var contentString = '<div id="map-content">'+
      '<h1>Casa Del Sol</h1>'+
	    '<h4>135 Acalanes Drive, Sunnyvale CA 94086</h4>' +
	    '</div>';
		
    var mapOptions = {
          zoom: 13,
          center: new google.maps.LatLng(37.384558, -122.056735),
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	
    map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);
	
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	var marker = new google.maps.Marker({
          position: mapOptions.center,
          map: map,
          title: 'Hello World!'
	});
	
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});
	
	// OPEN INFO WINDOW ONLOAD
	infowindow.open(map, marker);
  }
	
function log(str){
  document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('['+new Date().getTime()+']\n'+str+'\n\n'));
}

// TEST
var sliderObjects = [];
createSliderObjects();

function plusDivs(obj, n) {
  var parentDiv = $(obj).parent();
  var matchedDiv;
  $.each(sliderObjects, function(i, item) {
    if ($(parentDiv[0]).attr('id') == $(item).attr('id')) {
      matchedDiv = item;
      return false;
    }
  });
  matchedDiv.slideIndex=matchedDiv.slideIndex+n;
  showDivs(matchedDiv, matchedDiv.slideIndex);
}

function createSliderObjects() {
  var sliderDivs = $('.slider');
  $.each(sliderDivs, function(i, item) {
    var obj = {};
    obj.id = $(item).attr('id');
    obj.divContent = item;
    obj.slideIndex = 1;
    obj.slideContents = $(item).find('.mySlides');
    showDivs(obj, 1);
    sliderObjects.push(obj);
  });
}

function showDivs(divObject, n) {
  debugger;
  var i;
  if (n > divObject.slideContents.length) {
    divObject.slideIndex = 1
  }
  if (n < 1) {
    divObject.slideIndex = divObject.slideContents.length
  }
  for (i = 0; i < divObject.slideContents.length; i++) {
    divObject.slideContents[i].style.display = "none";
  }
  divObject.slideContents[divObject.slideIndex - 1].style.display = "block";
}