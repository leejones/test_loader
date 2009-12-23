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
            // TODO poll the iframe to determine when the test is done
            setTimeout(function() {
    					if ($('#' + iframe_id).contents().find("#qunit-banner").hasClass("qunit-pass")) {
    						$results.append('<div class="pass"><a href="#' + iframe_id + '" class="result">pass</a></div>');
    					}
    					else {					
    						$results.append('<div class="fail"><a href="#' + iframe_id + '" class="result">fail</a></div>');
    					}
            }, 200);
  				});
        }
			});
      $("#results").click(function(el) {
        $target = $(el.originalTarget);
        if ($target.is('a.result')) {
          $("#sandbox").show();
          $($target.attr('href')).css({height : '500px', width : '100%', border : 'solid 3px #CCCCCC'}).toggle();
        }
      });
      $("#cross_domain_sandbox").append('<a href="#" class="expand">Expand All</a>');
      $("#cross_domain_sandbox a.expand").click(function(el) {
        $("iframe", "#cross_domain_sandbox").css({height : '500px', width : '100%', border : 'solid 3px #CCCCCC', overflow : 'auto'});
        return false;
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