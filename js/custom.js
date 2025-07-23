$(document).ready(function () {
  $("#asideToggleBtn,#asideToggleBtn2").click(function () {
    $(".asideBarToggle").toggleClass("custom-translate-x-full");
    $(".bg-summit-blue-light").toggleClass("removeMarginFromMain");
    $("#asideToggleBtn img").toggleClass("arrowRotate");
    $("#teacher-reports-content").toggleClass("teacher-report-main-margin");
    $(".districtsettingsMain").toggleClass("removeMarginFromMain");
    var asideVal = $("aside").width();
    if ($(".teacher-report-main-margin")[0]) {
      $("#summit-table-holder").width($("main").width() - 42);
    } else {
      $("#summit-table-holder").width($("main").width() - asideVal - 42);
    }
  });

  $("#asideStudentPLPToggleBtn").click(function () {
    $(".plpasideBarToggle").toggleClass("plp-custom-translate-x-full");
    $(".plpasideBarToggle").toggleClass("mr-5");
    $(".bg-summit-blue-light").toggleClass("removeMarginFromMain");
    $("#asideStudentPLPToggleBtn img").toggleClass("arrowRotate");
    $("#student-plp-content").toggleClass("student-plp-main-margin");
    $(".districtsettingsMain").toggleClass("removeMarginFromMain");
  });


  $(function () {
    $("#summit-table-holder").width($("main").width() - $("aside").width() - 42);
  });

  $("#modalclose3").click(function () {
    $("#videoplayer3").attr("src", $("#videoplayer3").attr("src"));
  });
  $("#modalclose2").click(function () {
    $('#mp4player')[0].pause();
  });
  $(".aside-button").click(function () {
    $(this).toggleClass("asideRotate")
  });

  $(".half-circle-progress").each(function () {

    var $bar = $(this).find(".half-circle-bar");
    var $val = $(this).find("span.half-circle-percent");
    var perc = parseInt($val.text(), 10);

    $({ p: 0 }).animate({ p: perc }, {
      duration: 1000,
      easing: "swing",
      step: function (p) {
        $bar.css({
          transform: "rotate(" + (45 + (p * 1.8)) + "deg)", // 100%=180° so: ° = % * 1.8
          // 45 is to add the needed rotation to have the green borders at the bottom
        });
        $val.text(p | 0);
      }
    });
  });

  $("#defaultModal").modal.isVisible();

  $('.parent-accordian-container').each(function () {
    const $container = $(this);
    const key = $container.data('key'); // e.g. 'accordion_boy'
    const $table = $container.closest('table');
    const fullCookieKey = `accordion_${key}_activeIndexes`;

    const headers = $(`.parent-accordian-container[data-key="${key}"]`)
      .closest(`table`)
      .find('.accordion-header');

    // Restore state from cookie
    const savedIndexesStr = getCookie(fullCookieKey);
    let openIndexes = savedIndexesStr ? savedIndexesStr.split(',').map(Number) : [];

    // If no state saved, open index 0
    if (openIndexes.length === 0 && headers.length > 0) {
      openIndexes = [0];
    }

    // Open saved (or default) accordions
    headers.each(function (i) {
      if (openIndexes.includes(i)) {
        const $icon = $(this).find('.accordion-icon');
        $container.addClass('accordion-open');
        let $next = $(this).next();
        while ($next.length && $next.hasClass('accordion-content')) {
          $next.show();
          $next = $next.next();
        }
      } else {
        const $icon = $(this).find('.accordion-icon');
        $container.removeClass('accordion-open');
        $icon.addClass('rotate-180');
        $container.addClass('accordion-close');
        let $next = $(this).next();
        while ($next.length && $next.hasClass('accordion-content')) {
          $next.hide();
          $next = $next.next();
        }

      }
    });

    // Click handler for toggling
    headers.each(function (i) {
      $(this).click(function () {
        const isOpen = openIndexes.includes(i);

        // Toggle current header
        const $icon = $(this).find('.accordion-icon');
        let $next = $(this).next();
        while ($next.length && $next.hasClass('accordion-content')) {
          if (isOpen) {
            $next.hide();
          } else {
            $next.show();
          }
          $next = $next.next();
        }

        // Update icon
        if (isOpen) {
          $container.removeClass('accordion-open');
          $icon.addClass('rotate-180');
          $container.addClass('accordion-close');
          openIndexes = openIndexes.filter(index => index !== i);
        } else {
          $container.addClass('accordion-open');
          $icon.removeClass('rotate-180');
          $container.removeClass('accordion-close');
          openIndexes.push(i);
        }

        // Save updated state
        setCookie(fullCookieKey, openIndexes.join(','));
      });
    });
  });
});
