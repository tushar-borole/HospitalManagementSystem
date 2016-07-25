$(document).ready(function () {

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "common",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
  $('#patientcount').text(response.patient)
  $('#doctorcount').text(response.doctor)
  $('#appointmentcount').text(response.appointment)
});


})
