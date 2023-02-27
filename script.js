// Redirects mobile users to the index thus preventing them from navigating to the desktop layout
if (screen.width <= 699) {
  document.location = "index.html";
}


function loadScript(src,callback){
  
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(callback)script.onload=callback;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.src = src;
}


loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBzO-kFoyPTj9B6TpYNhsMMxb49bi6LPXg&callback=initialize');

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Google Map 
function initialize() {
	
	var contentString = '<div id="map-content">'+
      '<h1>CASA DEL SOL</h1>'+
	    '<h4>135 Acalanes Drive, Sunnyvale CA 94086</h4>' +
	    '</div>';
		
    var mapOptions = {
          zoom: 13,
          center: new google.maps.LatLng(37.384558, -122.056735),
          mapTypeControl: false,
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

// Slideshow 
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


// Enlarge image for mobile
function showImage(imgName) {
  document.getElementById('largeImg').src = imgName;
  showLargeImagePanel();
  // Disable scrolling
  document.querySelector("body").style.overflow = "hidden";
  unselectAll();
}
function showLargeImagePanel() {
  document.getElementById('largeImgPanel').style.visibility = 'visible';
}
function unselectAll() {
  if(document.selection) document.selection.empty();
  if(window.getSelection) window.getSelection().removeAllRanges();
}
function hideMe(obj) {
  obj.style.visibility = 'hidden';
  // Enable scrolling
  document.querySelector("body").style.overflow = "auto";
}