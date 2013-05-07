$(document).ready(function() {

	// create some variables
	var timeoutID, presetID, url, device, aspect, scrollbars;

	//create some functions

	function load_URL(newurl) {
		// this will reload iframe no matter what the domain is...
		device.html('<iframe id="viewport" src="'+newurl+'"><p>Your browser does not support iframes.</p></iframe>');
	}
	
	function hide_menu() { $('#menu').slideUp(300); }
	
	function set_device_size(new_width, new_height) { 
		device.animate({width: new_width, height: new_height},200,"linear", function(){write_wxh();});
		//device.width(new_width); device.height(new_height);
		//write_wxh(); 
	}
	
	function set_preset(id) {
		id = ((id+presets.length) % presets.length);
		if(aspect){
			set_device_size(presets[id].height, presets[id].width); 
		} else {
			set_device_size(presets[id].width, presets[id].height); 
		}
		presetID=id;
		$('#abbr').text(presets[id].abbr);
		$('#description').text(presets[id].desc);
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


	// bind some events

	$("#URL").keyup(function (e) {
		if (e.keyCode == 13) { load_URL($('#URL').val()); }
	});

	$('#reload_btn').click( function(e){ 
		$('#URL').val($('iframe').attr('src'));
		load_URL($('#URL').val()); 
	});

	$('#info_btn').click( function(e){
		bootbox.alert(about_text);
	});

	$('#aspect a').click( function(e){ 
		e.preventDefault();
		set_device_size(device.height(),device.width()); 
		aspect=(aspect==0); 
	});

	$('#rotate a').click( function(e){ 
		e.preventDefault();
		set_device_size(device.height(),device.width()); 
		aspect=(aspect==0); 
	});	

	$('.preset_down').click( function(e) { e.preventDefault();set_preset(--presetID); });
	$('.preset_up').click( function(e) { e.preventDefault();set_preset(++presetID); });
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
	{ 'width': 240,  'height': 320,  'abbr':'QVGA', 'desc':'Common Low Resolution' },
	{ 'width': 320,  'height': 480,  'abbr':'HVGA', 'desc':'iPhone 3, 3G' },
	{ 'width': 360,  'height': 640,  'abbr':'nHD', 'desc':'Nokia N8, N97, E7 and X6' },
	{ 'width': 480,  'height': 640,  'abbr':'VGA', 'desc':'Blackberry Torch 9810' },
	{ 'width': 480,  'height': 800,  'abbr':'WVGA', 'desc':'Samsung Galaxy I, S, SL, W' },
	{ 'width': 600,  'height': 800,  'abbr':'SVGA', 'desc':'Small 4:3 tablet/desktop' },
	{ 'width': 640,  'height': 960,  'abbr':'DVGA', 'desc':'iPhone 4, 4S' },
	{ 'width': 600,  'height': 1024, 'abbr':'WSVGA', 'desc':'Kindle Fire, Galaxy Tab' },
	{ 'width': 768,  'height': 1024, 'abbr':'XGA', 'desc':'iPad (1, 2, Mini)' },	
	{ 'width': 640,  'height': 1136, 'abbr':'iPhone 5', 'desc':'iPhone 5' },
	{ 'width': 720,  'height': 1280, 'abbr':'HD / WXGA', 'desc':'720p TV' },
	{ 'width': 1024, 'height': 1280, 'abbr':'SXGA', 'desc':'Standard 4:3 desktop' },
	{ 'width': 1200, 'height': 1600, 'abbr':'XUGA', 'desc':'Large 4:3 desktop' },
	{ 'width': 1536, 'height': 2048, 'abbr':'QXGA', 'desc':'iPad 3 (retina)' },
]);

var about_text = '<h3>Welcome to Viewport</h3> ' +
	'<p><em>A simplified way to test responsive website layouts at common resolutions.</em></p> '+
	'<p>Recently I\'ve been doing some responsive design work and found that checking screen resolutions was a bit painful. '+
	' Dragging the window size works adequately for watching responsive styles "step-down", but it\'s tricky so get it pixel perfect and my browser windows won\'t go smaller than 400px wide.</p> '+
	'<p>I couldn\'t find any free simple tools to do what I wanted (including hiding the scrollbar), so I decided to build my own. This is what I made - I found it to be quite useful and I hope you will too.</p>' +
	'<p><small>Browser specific features: Webkit browsers allow you to hide the scrollbar if you wish (Chrome and Safari). I recommend you use Chrome because Safari\'s iframes tend to misbehave for me. '+
	' I don\'t recommend using this on a mobile device, but feel free to try it.</small></p>' +
	' <p><small><em>This webpage is provided as is with no explicit or implied guarantees for the accuracy of results or the provision of any service whatsoever. Individual results may vary. Thank you very much and good night.</em></small></p>  ';
