//  * Copyright (c) 2009 Lee Jones
//  * Licensed under the MIT Lisense

(function($){
	$.fn.test_loader = function() {
		return this.each(function() {
			$('body').append('<div id="results"></div>');
			$results = $("#results");
			var $container = $(this);
			var $links = $('a', this);
			$links.each(function(index, link) {
				$link = $(link);
				var url = $link.attr('href');
				var title = $link.text();
        var current_date = new Date();
        var current_time = current_date.getTime();        
        var iframe_source = url + '?time=' + current_time + '#qunit-banner';
        if ($.is_cross_domain(url)) {
  				if (!$('#cross_domain_sandbox').length) {
  				  $('body').append('<div id="cross_domain_sandbox"></div>');
  				};
  				
  				$('#cross_domain_sandbox').append('<div class="boxed-test"><iframe src="' + iframe_source + '" id="iframe' + index + '"></iframe></div>');
        }
        else {
  				if (!$('#sandbox').length) {
  				  $('body').append('<div id="sandbox"></div>');
  				};
  				
				  $('#sandbox').hide().append('<iframe src="' + iframe_source + '" id="iframe' + index + '"></iframe>');

          $("iframe#iframe"+index).hide().load(function() {
            var iframe_id = "iframe" + index;
						var max_polls = 100;
						var polls = 0;
						
						function poll_for_result(selector) {
							return $(selector).contents().find("#qunit-testresult").length;
						}
						
						var poller = setInterval(function() {
							polls++;
							if (poll_for_result('#' + iframe_id) || polls >= max_polls) {
								clearInterval(poller);
	    					if ($('#' + iframe_id).contents().find("#qunit-banner").hasClass("qunit-pass")) {
	    						$results.append('<div class="pass"><a href="#' + iframe_id + '" class="result">pass</a></div>');
	    					}
	    					else {					
	    						$results.append('<div class="fail"><a href="#' + iframe_id + '" class="result">fail</a></div>');
	    					}
							}
						}, 250);

  				});
        }
			});

      $("#results").click(function(el) {
        $target = $(el.originalTarget);
        if ($target.is('a.result')) {
          $("#sandbox").show();
          $($target.attr('href')).css({height : '500px', width : '100%', border : 'solid 3px #CCCCCC'}).toggle();
          return false;
        }
      });

      $("#cross_domain_sandbox").append('<a href="#" class="expand">Expand All</a>');
      $("#cross_domain_sandbox a.expand").click(function(el) {
        $("iframe", "#cross_domain_sandbox").css({height : '500px', width : '100%', border : 'solid 3px #CCCCCC', overflow : 'auto'});
        return false;
      });
      
      var styles = '';
      styles += '<style type="text/css" media="screen">';
    	styles +=   '#results {';
    	styles +=     'clear:both;';		
    	styles +=     'float: left;';
    	styles +=     'width: 100%;';		
    	styles +=   '}';
    	styles +=   '#cross_domain_sandbox {';
    	styles +=     'float: left;';
    	styles +=     'clear: both;';		
    	styles +=     'width: 100%;';		
    	styles +=   '}';
    	styles +=   'iframe {';
    	styles +=     'height: 5px;';
    	styles +=     'overflow: hidden;';
    	styles +=     'border: none;';
    	styles +=     'width: 600px;';	
    	styles +=   '}';
    	styles +=   '.pass a, .fail a {';
    	styles +=     'width: 50px;';	
    	styles +=     'height: 50px;';		
    	styles +=     'margin: 5px;';
    	styles +=     'float: left;';		
    	styles +=   '}';
    	styles +=   '.pass a {';
    	styles +=     'background-color: #C6E746;';
    	styles +=     'color: #C6E746;';
    	styles +=   '}';
    	styles +=   '.fail a {';
    	styles +=     'background-color: #EE5757;';
    	styles +=     'color: #EE5757;';
    	styles +=   '}';
    	styles += '</style>';
		$('body').append(styles);
		});
	};

	$.fn.build_test_list = function(options) {
		return this.each(function() {
			var $container = $(this);
			var settings = {};
			var defaults = {};
			$.extend(settings, defaults, options);
			var li_list = '';
			$.each(settings.test_files, function(index, test_file) {
				url = (window.location.protocol || 'http:') + '//';
				if (test_file.subdomain != '') {
					url += test_file.subdomain + '.';
				}
				url += window.location.hostname;
				url += test_file.filepath;
				li_list += '<li><a href="' + url + '">' + test_file.title + '</a></li>';
			});
			$container.append(li_list);
		});
	};
	
	$.is_cross_domain = function(url) {
		var domain = window.location.hostname;
		var url_domain;
		var domain_tester = /(?:https?:\/\/)(.*\..*?)(?:\/)/;
    var root_path = /^\//;
    if (root_path.test(url)) {
      url_domain = domain;
    }
		else if (domain_tester.test(url)) {
			url_domain = url.match(domain_tester)[1];
		}
		return (url_domain == domain)? false : true;
	};
})(jQuery);