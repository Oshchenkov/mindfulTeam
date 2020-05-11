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

  const langSettings = {
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

  $(".carouselWidget").carousel({
    pause: "hover",
    interval: 3000,
    ride: true
  });

  // calendarPickerWidget
  // http://t1m0n.name/air-datepicker/docs/
  let currentDate = new Date();

  $widgetDatePicker.datepicker.language["en"] = langSettings;
  $widgetDatePicker.datepicker({
    language: "en",
    firstDay: 1,
    showOtherMonths: false,
    fd: "M-dd",
    onSelect: function (dateFormat, date, inst) {
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

  // Modal Date Picker

  const $modalDatePicker = $("#modal_date_picker");
  const $modalDatePickerInput = $("#modal_date_picker-input");

  $modalDatePicker.datepicker({
    language: 'en',
    timepicker		: true,
    autoclose 		: true,
    classes: "modal-datepicker",
    onSelect: function (fd, d, picker) {
      $modalDatePickerInput.val(fd);
      console.log(fd, d,picker );
    },
    onShow: function (dp, animationCompleted) {
      $modalDatePickerInput.val(dp);
      if (!animationCompleted) {
        console.log('start showing')
      } else {
        console.log('finished showing')
      }
    },
    onHide: function (dp, animationCompleted) {
      if (!animationCompleted) {
        console.log('start hiding')
      } else {
        console.log('finished hiding')
      }
    }
  })

  // Tool tips

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  $(function () {
    $('[data-show="tooltip"]').tooltip('show')
  })

  //
  // Dropdown list
  //

  let x, i, j, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("select-mt");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */


    
    a = document.createElement("DIV");
    a.setAttribute("class", "select-mt__selected select-mt__default");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-mt__items select-mt__hide");
    for (j = 1; j < selElmnt.length; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;

          h.classList.remove("select-mt__default");
          
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("select-mt__same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "select-mt__same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);

    

    if (selElmnt.disabled){
      a.classList.add("select-mt__disabled");
    } else{
      a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-mt__hide");
        this.classList.toggle("select-mt__arrow-active");
      });
    }
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    let x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-mt__items");
    y = document.getElementsByClassName("select-mt__selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-mt__arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-mt__hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);

});



