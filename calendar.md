---
layout: calendar
title: BBC Youth Calendar
---
<div id="calendar"></div>

<script>
$(function() {

  $('#calendar').fullCalendar({
    eventSources:[
      {
        url: 'https://www.google.com/calendar/feeds/1052e6nhrb7jeog2bb8q43lqcc%40group.calendar.google.com/public/basic',
        color: '#0069D6'
      },

      {
        url: 'https://www.google.com/calendar/feeds/k8jcm7tk694h59ksv7k3fq4h8o%40group.calendar.google.com/public/basic',
        color: '#57A957'
      }
    ]
  });

});
</script>