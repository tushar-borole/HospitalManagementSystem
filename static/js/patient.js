$(document).ready(function(){



function addPatient() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://127.0.0.1:5000/patient",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "2612534b-9ccd-ab7e-1f73-659029967199"
        },
        "processData": false,
        "data": "{\n  \"pat_first_name\": \"posst\",\n  \"pat_last_name\": \"posst\",\n  \"pat_insurance_no\": \"posst\",\n  \"pat_ph_no\": \"posst\",\n  \"pat_address\": \"posst\"\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

}

function deletePatient() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "patient",
        "method": "DELETE",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });


}

function updatePatient() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "patient/2",
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": "{\n  \"pat_first_name\": \"Tushar\",\n  \"pat_last_name\": \"posst\",\n  \"pat_insurance_no\": \"posst\",\n  \"pat_ph_no\": \"posst\",\n  \"pat_address\": \"posst\"\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });


}

function getPatient() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "patient",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

$.ajax(settings).done(function (response) {
         var table=$('#datatable4').DataTable({
        'paging':   true,  // Table pagination
        'ordering': true,  // Column ordering
        'info':     true,  // Bottom left status text
        aaData:response,
        aoColumns: [
          { mData: 'pat_first_name' },
          { mData: 'pat_last_name' },
          { mData: 'pat_insurance_no' },
          { mData: 'pat_address' },
          { mData: 'pat_ph_no' },
           {mRender: function (o) { return '<button class="btn-xs btn btn-info" type="button">Edit</button>'; }},
           {mRender: function (o) { return '<button class="btn-xs btn btn-danger delete-btn" type="button">Delete</button>'; }}
        ]
    });
    $('#datatable4 tbody').on( 'click', '.delete-btn', function () {
          var data = table.row( $(this).parents('tr') ).data();
          console.log(data)
    });
});


}


getPatient()

})