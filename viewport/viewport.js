$(document).ready(function() {

	var timeoutID, presetID, url, device, aspect, scrollbars;
	var settings;

	function load_URL(newurl) {
		// this will reload iframe no matter what the domain is...
		device.html('<iframe id="viewport" src="'+newurl+'"><p>Your browser does not support iframes.</p></iframe>');
	}
	
	function hide_menu() { $('#menu').slideUp(300); }
	
	function set_device_size(width, height) { 
		device.width(width); device.height(height);
		write_wxh(); 
	}
	
	function set_preset(id) {
		id = ((id+presets.length) % presets.length);
		if(aspect){
			set_device_size(presets[id].height, presets[id].width); 
		} else {
			set_device_size(presets[id].width, presets[id].height); 
		}
		presetID=id;
		$('#label').text(presets[id].label);
		document.cookie="preset=" + presetID;
	}
	
	function write_wxh() {  
		size = device.width()+'x'+device.height();
		$('#resolution').text(size);
		$('#wxh').text(size); 
	}

	function toggle_scrollbars() {
		if(! navigator.userAgent.match(/webkit/i)){
			alert('Sorry, hiding scrollbars is only available for webkit browsers. Maybe you should try using Chrome.');
			return;
		}	
		scrollbars=(scrollbars==0);
		$('#device').toggleClass('hide_scrollbar');
		device.html(device.html()); // a nasty trick to reload the iframe
		$('#scrollbars a span').html(scrollbars ? '&#9673;' : '&#9678;' );
	}

	$("#URL").keyup(function (e) {
		if (e.keyCode == 13) {
			load_URL($('#URL').val());
		}
	});


	$('#reload').click( function(e){ 
		$('#URL').val($('iframe').attr('src'));
		load_URL($('#URL').val()); 
	});

	$('#aspect a').click( function(e){ 
		e.preventDefault();
		set_device_size(device.height(),device.width()); 
		aspect=(aspect==0); 
	});

	$('#presets #down').click( function(e) { e.preventDefault();set_preset(--presetID); });
	$('#presets #up').click( function(e) { e.preventDefault();set_preset(++presetID); });
	$('#scrollbars a').click( function(e) { e.preventDefault();toggle_scrollbars(); });

	$('#controls').mouseleave( function(e){ 
		timeoutID = window.setTimeout( hide_menu, 1500);
	});
	$('#controls').mouseenter( function(e){
		window.clearTimeout(timeoutID);
		if($('#menu').is(':hidden')) { $('#menu').slideDown(200); }
	});

	device = $('#device');
	presetID = 1;
	aspect = 1;
	set_preset(presetID);

	load_URL($('#URL').val()); 

	$('#controls').mouseleave();
	
});

var presets = eval([
	{ 'width': 240,  'height': 320,  'label':'QVGA - Common Low Resolution' },
	{ 'width': 320,  'height': 480,  'label':'HVGA - iPhone 3, 3G' },
	{ 'width': 360,  'height': 640,  'label':'nHD - Nokia N8, N97, E7 and X6' },
	{ 'width': 480,  'height': 640,  'label':'VGA - Blackberry Torch 9810' },
	{ 'width': 480,  'height': 800,  'label':'WVGA - Samsung Galaxy I, S, SL, W' },
	{ 'width': 600,  'height': 800,  'label':'SVGA - 800x600' },
	{ 'width': 640,  'height': 960,  'label':'DVGA - iPhone 4, 4S' },
	{ 'width': 600,  'height': 1024, 'label':'WSVGA - Kindle Fire, Galaxy Tab' },
	{ 'width': 768,  'height': 1024, 'label':'XGA - iPad (1, 2, Mini)' },	
	{ 'width': 640,  'height': 1136, 'label':'iPhone 5' },
	{ 'width': 720,  'height': 1280, 'label':'HD / WXGA - 720p TV' },
	{ 'width': 1024, 'height': 1280, 'label':'SXGA - Standard 4:3 desktop' },
	{ 'width': 1200, 'height': 1600, 'label':'XUGA - Large 4:3 desktop' },
	{ 'width': 1536, 'height': 2048, 'label':'QXGA - iPad 3 (retina)' },
]);
