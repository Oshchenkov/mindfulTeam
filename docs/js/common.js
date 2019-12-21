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
    console.log("Global event.target: ", event.target);

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

  const $widgetDatePicker = $(".calendarPickerWidget");

  $(".carouselWidget").carousel({
    pause: "hover",
    interval: 3000,
    ride: true
  });

  // calendarPickerWidget
  // http://t1m0n.name/air-datepicker/docs/
  let currentDate = new Date();

  $widgetDatePicker.datepicker.language["en"] = {
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["S", "M", "T", "W", "T", "F", "S"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    today: "Today",
    clear: "Clear",
    dateFormat: "dd.mm.yyyy",
    timeFormat: "hh:ii aa",
    firstDay: 0
  };
  $widgetDatePicker.datepicker({
    language: "en",
    firstDay: 1,
    showOtherMonths: false,
    fd: "M-dd",
    onSelect: function(dateFormat, date, inst) {
      currentDate = dateFormat;
      console.log(currentDate);
    }
  });
  // Select initial date
  if ($widgetDatePicker.data("datepicker")) {
    $widgetDatePicker.data("datepicker").selectDate(currentDate);
  }

  // Topic widget-actions

  const topicWidgetContainer = document.querySelector(".topics-widget");
  if (topicWidgetContainer)
    topicWidgetContainer.addEventListener(
      "click",
      toggleWidgetTopicActionClass
    );

  function toggleWidgetTopicActionClass(e) {
    $(".topics-widget__block").removeClass("topics-widget__action");
    $(e.target)
      .closest(".topics-widget-content")
      .addClass("topics-widget__action");
  }
});
