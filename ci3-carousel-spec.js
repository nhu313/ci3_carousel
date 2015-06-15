(function ($) {
  'use strict';

  describe('Ci3 Carousel', function() {
    var DIV = '<div class="carousel">'
              + '<div class="item" id="item1"></div>'
              + '<div class="item" id="item2"></div>'
              + '<div class="item" id="item3"></div>'
              + '<div class="item" id="item4"></div>'
            + '</div>';

    it('has a default duration', function() {
      expect($.fn.ci3.defaults.duration).toEqual(5);
    });

    it('is chainable', function() {
      expect($('.carousel').ci3().hasClass('carousel')).toBe(true);
    });

    describe('initialize', function() {
      it('sets the active', function() {
        expect($('#item1').hasClass('active')).toBe(true);
      });

      it('sets the prev', function() {
        expect($('#item4').hasClass('prev')).toBe(true);
      });

      it('sets the next', function() {
        expect($('#item2').hasClass('next')).toBe(true);
      });
    });

    describe('on next item click', function() {
      beforeEach(function () {
        $('.next').click();
      });

      it ('sets clicked item as active', function() {
        expect($('#item2').hasClass('active')).toBe(true);
      });

      it ('sets next item', function() {
        expect($('#item3').hasClass('next')).toBe(true);
      });

      it ('sets current active as previous item', function() {
        expect($('#item1').hasClass('prev')).toBe(true);
      });
    });

    describe('on previous item click', function() {
      beforeEach(function () {
        $('.prev').click();
      });

      it ('sets clicked item as active', function() {
        expect($('#item4').hasClass('active')).toBe(true);
      });

      it ('sets current item as next item', function() {
        expect($('#item1').hasClass('next')).toBe(true);
      });

      it ('sets previous item', function() {
        expect($('#item3').hasClass('prev')).toBe(true);
      });
    });

    describe('on next item click when active item is the last item', function() {
      beforeEach(function () {
        $('.prev').click(); //make last item active item
        $('.next').click();
      });

      it ('sets first item as active', function() {
        expect($('#item1').hasClass('active')).toBe(true);
      });

      it ('sets next item', function() {
        expect($('#item2').hasClass('next')).toBe(true);
      });

      it ('sets prev item as the last item in the list', function() {
        expect($('#item4').hasClass('prev')).toBe(true);
      });
    });

    describe('autorotate', function() {
      it('does not go to the next item time is less than the duration', function() {
        jasmine.clock().tick(4000);
        expect($('#item1').hasClass('active')).toBe(true);
      });

      it('goes to the next item after default time', function() {
        jasmine.clock().tick(5000);
        expect($('#item2').hasClass('active')).toBe(true);
      });

      it('goes to the next item after default time', function() {
        $('.carousel').ci3({
          duration: 3
        });
        
        jasmine.clock().tick(3000);
        expect($('#item2').hasClass('active')).toBe(true);
      });
    });

    function verifyClassCount() {
      expect($('.active').length).toEqual(1);
      expect($('.prev').length).toEqual(1);
      expect($('.next').length).toEqual(1);      
    }

    beforeEach(function () {
      jasmine.clock().install();
      $(DIV).appendTo('body');
      $('.carousel').ci3();
    });

    afterEach(function () {
      verifyClassCount();
      $(".carousel").remove();
      jasmine.clock().uninstall();
    });

  });
}(jQuery));