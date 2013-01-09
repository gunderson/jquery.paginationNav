(function( $ ){

  $.fn.paginationNav = function(options) {
    self = this;
    this.defaultSettings = {
        numPages: 0,
        pageNumber: -1,
        direction: 1,
        visibleNums: 5,
        currentPosition: null,
        showPrev: true,
        showNext: true,
        showFirst: true,
        showLast: true
    };
    $.extend(this, this.defaultSettings);
    $.extend(this, options);

    /*--------------------------------------------------*/

    this.setPage = function(pageNumber) {
        pageNumber = parseInt(pageNumber,10);
        if (this.pageNumber != pageNumber){
            //keep the pageNumber within range of this.numPages
            pageNumber %= this.numPages + 1;

            //loop if pageNumber is negative
            if (pageNumber < 0){
                pageNumber += this.numPages;
            }

            this.direction = (pageNumber - this.pageNumber > 0) ? 1 : -1;

            //build display
            this.rebuild(pageNumber);

            //tell the world what you've done
            this.trigger("setPage", {pageNumber:pageNumber, direction: this.direction});
        }
    };

    /*--------------------------------------------------*/

    this.rebuild = function(pageNumber) {

        this.pageNumber = pageNumber || 0;
        var currentPosition = this.currentPosition || Math.floor(this.visibleNums * 0.5);
        var visiblePrev = visiblePrev || currentPosition;
        var visibleNext = visibleNext || this.visibleNums - currentPosition - 1;
        var showPrev = showPrev || this.showPrev;
        var showNext = showNext || this.showNext;
        var showFirst = showFirst || this.showFirst;
        var showLast = showLast || this.showLast;


        var startNumber = this.pageNumber - visiblePrev;
        if (startNumber <= 0) {
            visibleNext -= startNumber;
            startNumber = 0;
        }

        var endNumber = this.pageNumber + visibleNext;
        if (endNumber >= this.numPages) {
            endNumber = this.numPages - 1;
            visiblePrev += visibleNext
            startNumber = Math.max(0, this.numPages - (visiblePrev) - 1);
        }

        var html = "";
        if (this.numPages > 0) {
            for (var i = startNumber; i <= endNumber; i++) {
                html += this.makeNumberDisplay(i, this.pageNumber);
            }

            if (showFirst && this.pageNumber - visiblePrev > 0) {
                html = this.makeNumberDisplay(0, this.pageNumber) + " ... " + html;
            }

            if (showLast && this.pageNumber + visibleNext < this.numPages) {
                html = html + " ... " + this.makeNumberDisplay(this.numPages, this.pageNumber);
            }
        }

        this.html(html);
        //Set Events
        this.find(".pageNumber").each(function(i, item){
            $item = $(item);
            $item.click(function(){
                $(this).trigger('changePageClick', $(this).data('pagenumber'));
            });
            $item.on('changePageClick', self.handleNumberClick);
        });
    };

    /*--------------------------------------------------*/

    this.handleNumberClick = function(event, pageNumber){
        self.setPage.call(self, [parseInt(pageNumber,10), true]);
    };

    /*--------------------------------------------------*/

    this.makeNumberDisplay = function(index, pageNumber) {
        var classNames = 'pageNumber' + ((index == pageNumber) ? " active" : "");
        var displayText = (index + 1);
        var html = '<div class="' + classNames + '" data-pagenumber="'+index+'">' + displayText + '</div>';
        return html;
    };

    /*--------------------------------------------------*/

    this.nextPage = function() {
        if (this.pageNumber + 1 < this.numPages) {
            this.setPage(this.pageNumber + 1);
        }
    };

    /*--------------------------------------------------*/

    this.prevPage = function() {
        if (this.pageNumber - 1 >= 0) {
            this.setPage(this.pageNumber - 1);
        }
    };
    this.setPage(0);
    return this;
  };
})( jQuery );