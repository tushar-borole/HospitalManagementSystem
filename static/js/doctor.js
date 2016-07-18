function addDoctor(){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:5000/doctor",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "9dd0073d-e110-7f84-5373-9f6482ba1e53"
  },
  "processData": false,
  "data": "{\n  \"doc_first_name\": \"Tushar\",\n  \"doc_last_name\": \"posst\",\n  \"doc_ph_no\": \"posst\",\n  \"doc_address\": \"posst\"\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

}

function deleteDoctor(){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:5000/doctor/1",
  "method": "DELETE",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "c280f47a-7df0-cc6d-c8df-3be99bd12c10"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
}

function updateDoctor(){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:5000/doctor/1",
  "method": "PUT",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "8d7ffcf4-1073-a9c9-94c2-0f1d070117fa"
  },
  "processData": false,
  "data": "{\n  \"doc_first_name\": \"satish\",\n  \"doc_last_name\": \"posst\",\n  \"doc_ph_no\": \"posst\",\n  \"doc_address\": \"posst\"\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
}

function getDoctor(){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://127.0.0.1:5000/doctor",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "b7985cc2-f120-5bfc-1bec-76019e4e04a4"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
}