var DEFAULT_ROUTE = 'acasa';

var $page = $('.page');
var $pageAjax = $page.find('.page__ajax');
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
        scrollToID = scrollToID[0];
    }

    $page.removeClass('page--ajax')
        .removeClass('page--' + currentRoute)
        .addClass('page--loading');

    $.ajax('./pages/' + route + '.html')
        .done(function(data) {
            setTimeout(function() {
                // if exists show it
                currentRoute = route;

                $page.removeClass('page--loading')
                    .addClass('page--ajax')
                    .addClass('page--' + route);

                $pageAjax.html(data);

                if (scrollToID) {
                    var $scrollToID = $(scrollToID);
                    if ($scrollToID.length == 1) {
                        $('html, body').animate({
                            scrollTop: $scrollToID.offset().top
                        }, 400);
                    }
                }
            }, 600);
        })
        .fail(function() {
            // if it doesnt exists show 404
            currentRoute = '404';

            $page.removeClass('page--loading')
                .addClass('page--404');
        });
});

$(window).trigger('hashchange');
