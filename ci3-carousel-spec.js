(function ($) {
  'use strict';

  describe('Ci3 Carousel', function() {
    var DIV = '<div class="carousel">'
              + '<div class="item" id="item1"></div>'
              + '<div class="item" id="item2"></div>'
              + '<div class="item" id="item3"></div>'
              + '<div class="item" id="item4"></div>'
            + '</div>';

    describe('initialize', function() {
      beforeEach(function () {
        $('.carousel').ci3();
      });

      it('has a default duration', function() {
        expect($.fn.ci3.defaults.duration).toEqual(4);
      });

      it('default auto is true', function() {
        expect($.fn.ci3.defaults.auto).toBe(true);
      });

      it('is chainable', function() {
        expect($('.carousel').ci3().hasClass('carousel')).toBe(true);
      });
    });

    describe('initialize', function() {
      beforeEach(function () {
        $('.carousel').ci3();
      });

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
        $('.carousel').ci3();
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
        $('.carousel').ci3();
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
        $('.carousel').ci3();
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
      var DEFAULT_DURATION = $.fn.ci3.defaults.duration * 1000;

      it('does not go to the next item time is less than the duration', function() {
        $('.carousel').ci3();
        jasmine.clock().tick(DEFAULT_DURATION - 100);
        expect($('#item1').hasClass('active')).toBe(true);
      });

      it('goes to the next item after default time', function() {
        $('.carousel').ci3();
        jasmine.clock().tick(DEFAULT_DURATION);
        expect($('#item2').hasClass('active')).toBe(true);
      });

      it('goes to the next item after user set duration', function() {
        $('.carousel').ci3({
          duration: 3
        });
        
        jasmine.clock().tick(3000);
        expect($('#item2').hasClass('active')).toBe(true);
      });


      it('does not auto rotate when auto is false', function() {
        $('.carousel').ci3({
          auto: false
        });

        jasmine.clock().tick(DEFAULT_DURATION);
        expect($('#item1').hasClass('active')).toBe(true);
        expect($('#item2').hasClass('active')).toBe(false);
      });

      it('reset auto rotate time on user click', function() {
        $('.carousel').ci3({
          auto: true
        });
        
        var half_duration = DEFAULT_DURATION/2;
        
        jasmine.clock().tick(half_duration);
        $('.next').click();
        jasmine.clock().tick(half_duration);
        expect($('#item2').hasClass('active')).toBe(true);

        jasmine.clock().tick(DEFAULT_DURATION);
        expect($('#item3').hasClass('active')).toBe(true);
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
    });

    afterEach(function () {
      verifyClassCount();
      $(".carousel").remove();
      jasmine.clock().uninstall();
    });

  });
}(jQuery));