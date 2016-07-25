$(document).ready(function () {

    var table


    function addAppointment(data) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "appointment",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "2612534b-9ccd-ab7e-1f73-659029967199"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function (response) {
            $('.modal.in').modal('hide')
            table.destroy();
            $('#datatable4').empty(); // empty in case the columns change
            getAppointment()
        });

    }

    function deleteAppointment(id) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "appointment/" + id,
            "method": "DELETE",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "28ea8360-5af0-1d11-e595-485a109760f2"
            }
        }

swal({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false
}, function() {
 $.ajax(settings).done(function (response) {
   swal("Deleted!", "Your imaginary file has been deleted.", "success");
            table.destroy();
            $('#datatable4').empty(); // empty in case the columns change
            getAppointment()
        });


});

    }



    function getAppointment() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "appointment",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {



            table = $('#datatable4').DataTable({
                "bDestroy": true,
                'paging': true, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                aaData: response,
                aoColumns: [
                    {
                        mData: 'doc_first_name'
                    },
                    {
                        mData: 'pat_first_name'
                    },
                    {
                        mData: 'appointment_date'
                    },
                    {
                        mRender: function (o) {
                            return '<button class="btn-xs btn btn-danger delete-btn" type="button">Delete</button>';
                        }
                    }
        ]
            });
            $('#datatable4 tbody').on('click', '.delete-btn', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data)
                deleteAppointment(data.app_id)

            });


        });


    }




    $("#addpatient").click(function () {

        $('#myModal').modal().one('shown.bs.modal', function (e) {

    $("#doctor_select").html(doctorSelect)
     $("#patient_select").html(patientSelect)
            $("#savethepatient").off("click").on("click", function(e) {


            var instance = $('#detailform').parsley();
            instance.validate()
                    if(instance.isValid()){
                jsondata = $('#detailform').serializeJSON();
                addAppointment(jsondata)
                }

            })

        })



    })


var doctorSelect=""
 function getDoctor() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "doctor",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {

        for(i=0;i<response.length;i++){
        doctorSelect +="<option value="+response[i].doc_id+">"+response[i].doc_first_name+"</option>"
        }


        })
        }
var patientSelect=""
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
         for(i=0;i<response.length;i++){
        patientSelect +="<option value="+response[i].pat_id+">"+response[i].pat_first_name+"</option>"
        }

                })
        }

getDoctor()
getPatient()
getAppointment()
})