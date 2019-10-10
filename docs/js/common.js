"use strict";

const animationDuration = 200;

// hide dropList-ul on click outside
$(document).click(function(event) {
  let $target = $(event.target);

  if (!$target.closest(".dropList").length && $(".dropList").is(":visible")) {
    $(".dropList-ul").slideUp(animationDuration);
  }
});

// dropList hide/show
$(".dropList").click(function(event) {
  let ulList = $(this).find(".dropList-ul")[0];

  $(ulList).slideToggle(animationDuration);
});
