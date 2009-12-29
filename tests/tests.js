$(document).ready(function() {
  $.setup_links = function(options) {
    var settings = {};
    var defaults = {
      element_id : 'tests',
      links : [
        { href : 'http://' + window.location.hostname + '/tests/mock_tests/pass.html', title : 'Foo' },
  			{ href : 'http://' + window.location.hostname + '/tests/mock_tests/pass.html', title : 'Bar' }, 
  			{ href : 'http://' + window.location.hostname + '/tests/mock_tests/fail.html', title : 'Baz' }	
      ]
    };
    $.extend(settings, defaults, options);

    var link_list = '';
    
    $.each(settings.links, function(index, element){
      link_list += '<li><a href="' + element.href +'">' + element.title + '</a></li>';
    });

		var links =		'<div id="'+ settings.element_id + '" style="display:none">';
				links +=		'<ul id="testing_urls">';
				links +=      link_list;
				links +=		'</ul>';
				links +=	'</div>';
		$('body').append(links);  
		
		return $('#' + settings.element_id);
  };
  
  $.teardown_links = function(options) {
    var settings = {};
    var defaults = { element_id : 'tests' };
    $.extend(settings, defaults, options);
    $('#' + settings.element_id).remove();
  };
  
  $.teardown = function() {
    $("#sandbox, #results, #cross_domain_sandbox").remove();
    $.teardown_links();
  };

	test("Basic jQuery plugin functionality", function() {
		ok(
			$('#test_results').test_loader(),
			"Should respond as jQuery plugin"
		);
	});
	
	test("Determine if URL is on same domain", function() {
    ok(
      !($.is_cross_domain('/local/file/path.html')),
      "Should varify as same domain"
    );

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

		$.setup_links().test_loader();
			
		setTimeout(function() {
			var expected = [
				'http://' + window.location.hostname + '/tests/mock_tests/pass.html',
				'http://' + window.location.hostname + '/tests/mock_tests/pass.html',
				'http://' + window.location.hostname + '/tests/mock_tests/fail.html'
			];
			
			$.each(expected, function(index, iframe) {
        var src = $('#iframe' + index).attr('src');
        var url_matcher = new RegExp('^' + expected[index]);
        ok(
          url_matcher.test(expected[index]),
          "Should create iframe with source url that starts with " + expected[index]
        );
			});
			
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
			
			var result = $("#results").text();
			expected = "passpassfail";
			equal(
				result,
				expected,
				"Should display results"
			);

			start();
		  $.teardown();
		}, 500);
	});
	
	asyncTest("Should load cross domain requests in visible iFrame", function() {
	  var options = {
	    links : [
  	    { href : 'http://subdomain1.' + window.location.pathname, title : 'subdomain1' },
  	    { href : 'http://subdomain2.' + window.location.pathname, title : 'subdomain2' }
	    ]
	  };
	  $.setup_links(options).test_loader();
	  
	  setTimeout(function(){
  	  $.each(options.links, function(index, element) {
  	    ok(
  	      $('#iframe' + index).is(':visible'),
  	      "Cross domain tests should be visible"
  	    );
  	  });
  	  start();  
  	  $.teardown();
	  }, 500);
	  
	});
});
