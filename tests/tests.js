$(document).ready(function() {
	test("Basic jQuery plugin functionality", function() {
		ok(
			$('#test_results').test_loader(),
			"Should respond as jQuery plugin"
		);
	});
	
	test("Determine if URL is on same domain", function() {
		ok(
			$.is_cross_domain('http://google.com/test.js'),
			"Should verify as cross domain"
		);

		ok(
			$.is_cross_domain('http://subdomain.' + window.location.hostname),
			"Should verify as cross domain"
		);

		ok(
			!($.is_cross_domain('http://' + window.location.hostname + '/tests/a_set_of_tests.js')),
			"Should verify as same domain"
		);
	});
	

		asyncTest("Should create iframes for each link with href as src attribute", function() {

				var links =		'<div id="tests" style="display:none">';
						links +=		'<ul id="testing_urls">';
						links +=			'<li><a href="http://' + window.location.hostname + '/tests/foo.js">Foo</a></li>';
						links +=			'<li><a href="http://' + window.location.hostname + '/tests/bar.js">Bar</a></li>';
						links	+=			'<li><a href="http://' + window.location.hostname + '/tests/baz.js">Baz</a></li>';
						links +=		'</ul>';
						links +=	'</div>';
				$('body').append(links);

				$('#testing_urls').test_loader();
				
			setTimeout(function() {
				var expected = [
					'http://' + window.location.hostname + '/tests/foo.js',
					'http://' + window.location.hostname + '/tests/bar.js',
					'http://' + window.location.hostname + '/tests/baz.js'
				];
				var result = $('iframe').map(function() {return $(this).attr('src');}).get();
				same(
					result,
					expected,
					"Should create iframes with source same as links"
				);
				start();

				$('iframe, #tests').remove();

			}, 250);

		});
});
