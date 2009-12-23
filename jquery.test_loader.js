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
  				
				  $('#sandbox').append('<iframe src="' + iframe_source + '" id="iframe' + index + '"></iframe>');


          $("iframe#iframe"+index).load(function() {
          // TODO poll the iframe to determine when the test is done
            setTimeout(function() {
    					if ($("iframe#iframe"+index).contents().find("#qunit-banner").hasClass("qunit-pass")) {
    						$results.append('<div class="pass">pass</div>');
    					}
    					else {					
    						$results.append('<div class="fail">fail</div>');
    					}
            }, 200);
  				});
        }
			});
		});
	};
	
	$.is_cross_domain = function(url) {
		var domain = window.location.hostname;
		var url_domain;
		var domain_tester = /(?:https?:\/\/)(.*\..*?)(?:\/)/;
		if (domain_tester.test(url)) {
			url_domain = url.match(domain_tester)[1];
		}
		return (url_domain == domain)? false : true;
	};
})(jQuery);