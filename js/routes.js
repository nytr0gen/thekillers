var DEFAULT_ROUTE = 'acasa';

var $page = $('.page');
var currentRoute = DEFAULT_ROUTE;

$(window).bind('hashchange', function() {
    // parse hash
    var hash = location.hash;
    if (hash.length > 1) {
        hash = hash.slice(1);
    }

    var route = hash.match(/^\/([a-z]+)/);
    if (route == null) {
        // goto default page
        route = DEFAULT_ROUTE;
    } else {
        route = route[1];
    }

    var scrollToID = hash.match(/#(.+)$/);
    if (scrollToID != null) {
        scrollToID = scrollToID[1];
    }

    $page.removeClass('page--' + currentRoute)
        .addClass('page--loading');

    $.ajax('./pages/' + route + '.html')
        .done(function(data) {
            // if exists show it
            currentRoute = route;

            $page.html(data)
                .removeClass('page--loading')
                .addClass('page--' + route);

            if (scrollToID) {
                var $scrollToID = $('#' + scrollToID);
                if ($scrollToID.length == 1) {
                    $('html, body').animate({
                        scrollTop: $scrollToID.offset().top
                    }, 400);
                }
            }
        })
        .fail(function() {
            // if it doesnt exists show 404
            currentRoute = '404';

            $page.removeClass('page--loading')
                .addClass('page--404');
        })
        .always(function() {

        });


    // TODO parse route, ajax through it.
    // if empty show default page
});

$(window).trigger('hashchange');
