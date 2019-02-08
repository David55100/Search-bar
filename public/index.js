function domReady () {
    const INDEX_SEARCH_BAR= '#index-search-bar';

    // test objext for append img
    const testObj = {
        tags: "rose, flower, petal",
        webformatHeight: 426,
        webformatURL: "https://pixabay.com/get/ea35b70c2afc053ed1584d05fb1d4797e673e1dc1fb40c4090f4c87fa3eab7bfdd_640.jpg",
        webformatWidth: 640
        };
    // function that appends img to page from pixabay
    //imgObj - type objext
    function appendImg (imgObj) {
        const htmlTemplate =
        '<div class="img-card card" style="width: 18rem;">' +
            '<img src=" '+ imgObj.webformatURL + '" class="card-img-top" alt="">' +
            '<div class="card-body">' +
                '<h5 class="card-title">'+ imgObj.tags +' </h5>' +
            ' </div>' +
        ' </div> ' ;
        $('#img-container').append(htmlTemplate);
    }
    function buildCompleteURL (searchValue) {
        const baseURL = "https://pixabay.com/api/?key=11543965-f6e2978fef636fd1b42938a33";
        const imageType = "&image_type=photo";
        const searchTerm = '&q=' + searchValue;
        return baseURL + searchTerm + imageType;
    }
    function successSeachBarAjax(data) {
        // console log your data from tje api
        $('#data') .text('Success! You got ' + data.totalHits + ' hits!');
        $('#data') .css('color', 'green');
        $('#img-container').empty();
        for (let i = 0; i < data.hits.length; i++) {
            const element = data.hits[i];
            appendImg(element);
        }
    }
    function errorHandlerSearch(err) {
        if(err.status === 404) {
        $('#errors') .text('Bad Url');
        $('#errors') .css('color', 'red');
    }
  }
    // Listener for search key
    // Should fire ajax call on enter key
    function serachBarListener (event) {
        // Add if block for enter key
        if (event.keyCode === 13) {
            $.ajax( buildCompleteURL($(this).val()), {
             success: successSeachBarAjax,
        error: errorHandlerSearch
    });
        }
    }

    // Listeners attacked on Dom ready
    $(INDEX_SEARCH_BAR).on('keyup', serachBarListener);
}
$(document).ready(domReady)