(function($){
	$.fn.test_loader = function() {
		return this.each(function() {
			var $container = $(this);
			var $links = $('a', this);
			$links.each(function(index, link) {
				$link = $(link);
				var url = $link.attr('href');
				var title = $link.text();
				var $iframe = $('body').append('<iframe src="' + url + '" style="display:none"></iframe>');
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