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
				$('body').append('<iframe src="' + url + '" id="iframe' + index + '" style="display:none"></iframe>');
				$("iframe#iframe"+index).load(function() {
					if ($(this).contents().find('#qunit-banner').hasClass('qunit-pass')) {
						$results.append('pass ');
					}
					else {					
						$results.append('fail ');
					}
				});
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