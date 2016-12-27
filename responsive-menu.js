(function($) {
  $.fn.extend({
    accordion: function(options) {
      var defaults = {
        accordion: 'true',
        speed: 300
        
      };
      var opts = $.extend(defaults, options);
      var $this = $(this);
      $this.find("li").each(function() {
        if ($(this).find("ul").size() != 0) {
          $(this).find("a:first").after("<span></span>");

        }
      });
      $this.find("li span").click(function() {
        if ($(this).parent().find("ul").size() != 0) {
          if (opts.accordion) {
            //Do nothing when the list is open
            if (!$(this).parent().find("ul").is(':visible')) {
              parents = $(this).parent().parents("ul");
              visible = $this.find("ul:visible");
              visible.each(function(visibleIndex) {
                var close = true;
                parents.each(function(parentIndex) {
                  if (parents[parentIndex] == visible[visibleIndex]) {
                    close = false;
                    return false;
                  }
                });
                if (close) {
                  if ($(this).parent().find("ul") != visible[visibleIndex]) {
                    $(visible[visibleIndex]).slideUp(opts.speed, function() {
                      $(this).parent("li").find("span:first");
                    });
                  }
                }
              });
            }
          }
          if ($(this).parent().find("ul:first").is(":visible")) {
            $(this).parent().find("ul:first").slideUp(opts.speed, function() {
              $(this).parent("li").find("span:first").delay(opts.speed);
            });
          } else {
            $(this).parent().find("ul:first").slideDown(opts.speed, function() {
              $(this).parent("li").find("span:first").delay(opts.speed);
            });
          }
        }
      });
    }
  });
})(jQuery);