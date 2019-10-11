"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const animationDuration = 200;
  const $dropList = $(".dropList");
  const $dropListUl = $(".dropList-ul");
  const $sidebar = $(".sidebarNavContainer");
  const $sidebarBtn = $(".sidebarNavContainer-button");

  // hide  on click outside
  document.addEventListener("click", event => {
    const $target = $(event.target);
    console.log("event.target: ", event.target);

    //dropList-ul
    if (!$target.closest($dropList).length && $dropList.is(":visible")) {
      $dropListUl.slideUp(animationDuration);
    }

    // Sidebar
    if (
      !$target.closest($sidebar).length &&
      !$target.closest($sidebarBtn).length &&
      $($sidebar).is(":visible")
    ) {
      $sidebar.slideUp(animationDuration);
      $sidebarBtn.slideDown(animationDuration);
    }
  });

  // dropList hide/show
  $dropList.click(event => {
    const ulList = $(event.currentTarget).find($dropListUl)[0];

    $(ulList).slideToggle(animationDuration);
  });

  // Show Sidebar
  $sidebarBtn.click(event => {
    $sidebar.slideDown(animationDuration);
    if ($sidebar.is(":visible")) {
      $sidebarBtn.slideUp(animationDuration);
    }
  });

  // Bootstrap carousel settings
  $(".carouselWidget").carousel({
    pause: "hover",
    interval: 2000,
    ride: true
  });
});
