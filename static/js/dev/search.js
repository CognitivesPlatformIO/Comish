var SearchController = (function ($) {
    return {
        listing: function () {
            SearchController.Listing.init();
        }
    };
}(jQuery));

SearchController.Listing = (function ($) {

    var attachEvents = function () {
        
        $('.loadMoreArticles').on('click', function(e){
            e.preventDefault();
            var btnObj = $(this);
            $.fn.Ajax_LoadSearchArticles({
                'search': $('input.header__search-text').val(),
                onSuccess: function(data, textStatus, jqXHR){
                    if(data.articles.length < 20) {
                        $(btnObj).css('display', 'none');
                    }
                },
                beforeSend: function(jqXHR, settings){
                    $(btnObj).html("Please wait...");
                },
                onComplete: function(jqXHR, textStatus){
                    $(btnObj).html("Load More");
                }
            });
        });

    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));