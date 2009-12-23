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
						links +=			'<li><a href="http://' + window.location.hostname + '/tests/mock_tests/pass.html">Foo</a></li>';
						links +=			'<li><a href="http://' + window.location.hostname + '/tests/mock_tests/pass.html">Bar</a></li>';
						links	+=			'<li><a href="http://' + window.location.hostname + '/tests/mock_tests/fail.html">Baz</a></li>';
						links +=		'</ul>';
						links +=	'</div>';
				$('body').append(links);

				$('#testing_urls').test_loader();
				
			setTimeout(function() {
				var expected = [
					'http://' + window.location.hostname + '/tests/mock_tests/pass.html',
					'http://' + window.location.hostname + '/tests/mock_tests/pass.html',
					'http://' + window.location.hostname + '/tests/mock_tests/fail.html'
				];
				var result = $('iframe').map(function() {return $(this).attr('src');}).get();
				same(
					result,
					expected,
					"Should create iframes with source same as links"
				);
				
				var expected = ['pass', 'pass', 'fail'];
				var result = $('iframe').map(function() {
					if ($(this).contents().find('#qunit-banner').hasClass('qunit-pass')) {
						return 'pass';
					}
					return 'fail';
				}).get();
				same(
					result,
					expected,
					"Should be able to pull back pass/fail data"
				);
				start();

				$('iframe, #tests').remove();

			}, 250);

		});
});
