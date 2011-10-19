---
layout: calendar
title: BBC Youth Calendar
---
<div id="calendar"></div>

<script>
$(function() {

  $('#calendar').fullCalendar({
    events: 'https://www.google.com/calendar/feeds/1052e6nhrb7jeog2bb8q43lqcc%40group.calendar.google.com/public/basic'
  });

});
</script>