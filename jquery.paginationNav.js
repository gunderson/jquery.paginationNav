(function( $ ){

  $.fn.paginationNav = function(options) {
    self = this;
    this.defaultSettings = {
        numPages: 0,
        pageNumber: -1,
        transitionFrom: 1,
        visiblePrev: 2,
        visibleNext: 2,
        showPrev: true,
        showNext: true,
        showFirst: true,
        showLast: true,
        loop: false
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

            if (pageNumber - this.pageNumber < 0){
                this.transitionFrom = -1;
            } else {
                this.transitionFrom = 1;
            }

            //build display
            this.rebuild(pageNumber);

            //tell the world what you've done
            this.trigger("setPage", {pageNumber:pageNumber, transitionFrom: this.transitionFrom});
        }
    };

    /*--------------------------------------------------*/

    this.rebuild = function(pageNumber, visiblePrev, visibleNext, showPrev, showNext, showFirst, showLast) {

        this.pageNumber = pageNumber || 0;
        visiblePrev = visiblePrev || this.defaultSettings.visiblePrev;
        visibleNext = visibleNext || this.defaultSettings.visibleNext;
        showPrev = showPrev || this.defaultSettings.showPrev;
        showNext = showNext || this.defaultSettings.showNext;
        showFirst = showFirst || this.defaultSettings.showFirst;
        showLast = showLast || this.defaultSettings.showLast;

        var startNumber = this.pageNumber - visiblePrev;
        if (startNumber <= 0) {
            visibleNext -= startNumber;
            startNumber = 0;
        }

        var endNumber = this.pageNumber + visibleNext;
        if (endNumber >= this.numPages) {
            endNumber = this.numPages;
            startNumber = this.numPages - (visiblePrev + visibleNext);
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
        if (this.pageNumber + 1 < this.numPages || this.loop) {
            this.setPage(this.pageNumber + 1);
        }
    };

    /*--------------------------------------------------*/

    this.prevPage = function() {
        if (this.pageNumber - 1 >= 0 || this.loop) {
            this.setPage(this.pageNumber - 1);
        }
    };
    this.setPage(0);
    return this;
  };
})( jQuery );