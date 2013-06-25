$(document).ready(function() {

	// create some variables
	var presetID, device, aspect, version, timeoutID;
	version = '0.9';

	//create some functions

	function load_URL(newurl) {
		// this will reload iframe no matter what the domain is...
		device.html('<iframe id="viewport" src="'+newurl+'"><p>Your browser does not support iframes.</p></iframe>');
	}
	
	function set_device_size(new_width, new_height) { 
		device.animate({width: new_width, height: new_height},200,"linear", function(){write_wxh();});
	}

	function set_aspect(new_aspect) {
		aspect = (isNaN(new_aspect)) ? 1 : new_aspect%2;
		// $('#presets_menu ul').removeClass('active');
		// $('#menu_'+aspect).addClass('active');
		$('#presets_menu').removeClass('aspect_0 aspect_1');
		$('#presets_menu').addClass('aspect_'+aspect);
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
		$('#presets_menu ul li').removeClass('active');
		$('#presetline_'+id).addClass('active');
	}
	
	function write_wxh() {  
		size = device.width()+'x'+device.height();
		$('#resolution').text(size);
		$('#wxh').text(size); 
	}

	function toggle_scrollbars() {
		if(! navigator.userAgent.match(/webkit/i)) {
			bootbox.alert('Sorry, hiding scrollbars is only available for <a href="http://en.wikipedia.org/wiki/WebKit">WebKit browsers</a>.<br/>We recommend you try using <a href="www.google.com/chrome/">Chrome</a>.');
			return;
		}	
		$('#device').toggleClass('hide_scrollbar');
		device.html(device.html()); // a nasty trick to reload the iframe
	}

	function close_preset_menu() {
		$('#presets_menu').slideUp();
	}

	// thank you http://css-tricks.com/snippets/javascript/get-url-variables/
	function getQueryVariable(variable)
	{
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] == variable){return pair[1];}
		}
		return(false);
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
		info_text = $("#info_text").html();
		bootbox.alert(info_text);
	});

	$('#faq_btn').click( function(e){
		bootbox.alert($("#faq_text").html());
	});


	$('#menu_btn').click( function(e){
		e.preventDefault();
		if($('#presets_menu').is(":visible")) {
			close_preset_menu();
		} else {
			$('#presets_menu').slideDown();
		}
	});

	$('#menu_btn, #presets_menu').mouseleave( function(e){
		timeoutID = setTimeout(close_preset_menu,800);
	});

	$('#rotate a').click( function(e){ 
		e.preventDefault();
		set_device_size(device.height(),device.width()); 
		set_aspect(Math.abs(aspect-1));
	});

	$('#menu_btn, #presets_menu').mouseenter( function(e){
		clearTimeout(timeoutID);
	});

	$('.preset_down').click( function(e) { e.preventDefault();set_preset(--presetID); });
	$('.preset_up').click( function(e) { e.preventDefault();set_preset(++presetID); });
	
	$('#scrollbars a').click( function(e) { e.preventDefault();toggle_scrollbars(); });


	/* basic initialization */
	device = $('#device');	
	aspect = 1;

	if(window.chrome) { $('#chrome_plug').hide(); }

	// setup preset menus
	var preset_menus = ['',''];

	var menu_wxh = '<ul id="menu_0" class="active">';
	var menu_hxw = '<ul id="menu_1">';
	for (var i=0;i<presets.length;i++) {

		menu_wxh += '<li id="presetline_'+i+'">';
		menu_wxh += '<a href="#" data-presetid="'+i+'">'+presets[i].abbr+' : ';
		menu_wxh += '<div class="aspect_1">'+presets[i].height+'x'+presets[i].width+'</div>';
		menu_wxh += '<div class="aspect_0">'+presets[i].width+'x'+presets[i].height+'</div>';
		menu_wxh += '</a>';
		menu_wxh += '</li>';
	}
	menu_wxh += '</ul>';
	menu_hxw += '</ul>';

	$('#presets_menu').html(menu_wxh+menu_hxw);
	$('#menu_btn').show();

	$('#version').text('v'+version);

	// check GET for url, size and aspect
	url = getQueryVariable('url');
	if( !url ) { 
		url = $('#URL').val(); 
	} else {
		if(url.substring(0,4)!='http') { url = 'http://'+url; }
		$('#URL').val(url);
	}
	presetID = parseInt(getQueryVariable('size'));
	presetID = (isNaN(presetID)) ? 1 : presetID % presets.length;
	aspect = parseInt(getQueryVariable('aspect'));

	$('#presets_menu a').click( function(e){ 
		e.preventDefault();
		set_preset($(this).data('presetid'));
		$('#presets_menu').slideUp();
	});	

	set_preset(presetID);
	set_aspect(aspect);
	load_URL(url); 

});

var presets = [
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
];
