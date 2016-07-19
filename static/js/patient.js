$(document).ready(function () {

    var table


    function addPatient(data) {

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
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function (response) {
           $('.modal.in').modal('hide')
             table.destroy();
            $('#datatable4').empty(); // empty in case the columns change
            getPatient()
        });

    }

    function deletePatient(id) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://127.0.0.1:5000/patient/" + id,
            "method": "DELETE",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "28ea8360-5af0-1d11-e595-485a109760f2"
            }
        }

        $.ajax(settings).done(function (response) {
            table.destroy();
            $('#datatable4').empty(); // empty in case the columns change
            getPatient()
        });

    }

    function updatePatient(data) {
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
            "data": JSON.strigify(data)
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



            table = $('#datatable4').DataTable({
                "bDestroy": true,
                'paging': true, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                aaData: response,
                aoColumns: [
                    {
                        mData: 'pat_first_name'
                    },
                    {
                        mData: 'pat_last_name'
                    },
                    {
                        mData: 'pat_insurance_no'
                    },
                    {
                        mData: 'pat_address'
                    },
                    {
                        mData: 'pat_ph_no'
                    },
                    {
                        mRender: function (o) {
                            return '<button class="btn-xs btn btn-info btn-edit" type="button">Edit</button>';
                        }
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
                deletePatient(data.pat_id)

            });
            $('#datatable4 tbody').on('click', '.btn-edit', function () {
                $('#myModal').modal()
                $('#myModal').on('shown.bs.modal', function (e) {
                    // do something...
                })

                addPatient()

            });

        });


    }


    getPatient()

    $("#addpatient").click(function () {
        $('#myModal').modal()
        $('#myModal').on('shown.bs.modal', function (e) {

            $("#savethepatient").click(function () {
                jsondata=$('#detailform').serializeJSON();
                console.log(jsondata)
                addPatient(jsondata)

            })


        })



    })

})