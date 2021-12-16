var len;
var id1;
var id;
var depId = new Array();
var a = [];
var locId = new Array();
var b = [];
var val1;
$(document).ready(function(){
    //GETTING DETAILS FROM DEPARTMENT TABLE-----------------------------------------------------------------
    allPersonnel();
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            if(result.status.name == "ok") {
                console.log(result);
                    var str1 = '';
                    for(var i=0; i<result.data.length;i++){
                        str1 += '<tr>';
                        str1 += '<td>' + result.data[i].name+ '</td>';
                        str1 += '<td>' + result.data[i].Location+ '</td>';
                        str1 += '</tr>'
                    }
                    $('#tables').html(str1);
                for (var i = 0; i <result.data.length; i++) {
                    var elem = $("<option></option>");
                     elem.attr("value",result.data[i].id);
                     elem.text(result.data[i].name);
                     elem.appendTo($("#pers-edit-dep"));
                    var elem1 = $("<option></option>");
                    elem1.attr("value",result.data[i].id);
                    elem1.text(result.data[i].name);
                     elem1.appendTo($("#pers-add-dept"));
                     var elem2 = $("<option></option>");
                     elem2.attr("value",result.data[i].id);
                     elem2.text(result.data[i].name);
                      elem2.appendTo($("#del-dep"));
                  } 
            }
        },
            error: function(jqXHR, textStatus, errorThrown) {
				// your error code
				console.log('error while getting department data');
			}
     });
     //TO GET ALL DEPARTMENT DETAILS WITH ID TO FILL THE INFORMATION ABOUT EMPLOYEE-----------------------
     function allPersonnel()
     {$.ajax({
        url: "libs/php/getAll.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            //console.log(JSON.stringify(result));
            
            if(result.status.name == "ok"){
                var str = '';
                for(var i=0; i<result.data.length; i++){
                    len = result.data.length;
                    depId.push((JSON.parse(result.data[i].deptid)));
                            var fn = result.data[i].firstName;
                            var ln = result.data[i].lastName;
                            var email = result.data[i].email;
                            var jobTitle = result.data[i].jobTitle;
                            var firstLetter = ln[0].toUpperCase();
                            if(i == 0){
                                var fLetter = firstLetter;
                            } else {
                                if (firstLetter == fLetter){
                                    firstLetter = '';
                                } else {
                                    fLetter = firstLetter;
                                }
                            }
                            if (firstLetter) {
                                str += '<div class = "row fs-4 start-0 " >' + firstLetter + '</div>';
                            }
                            str += '<div class = "col-sm-4" id="' + 'a' + i + '">';
                            str += '<div class="row">';
                            str += '<div class="col-sm-2 fs-5 fw-bold text-light " id="btn-container">' +
                                '<button type="button"  class="btn rounded-circle btn-circle btn-md btn-primary but1" data-bs-toggle="modal" data-bs-target="#edit"  id="' + 'b' + i + '">' + fn[0] + ln[0] + '</button>' + '</div>';
                            str += '<div class="col-sm-2 ">';
                            str += '<div class="row fs-5 ">' + ln + ', ' + fn + '</div>';
                            str += '<div class="row fs-6 fst-italic ">' + email + '</div>';
                            str += '</div>';
                            str += '</div>';
                            str += '</div>';
                }
                console.log(depId[53]);
                for(var i=0; i< depId.length; i++){
                    //console.log(i);
                    if(a.indexOf(depId[i]) == -1){
                        console.log(a.indexOf(depId[i]));
                        a.push(depId[i]);
                    }
                };
                console.log(a);
                str += '<br><br><hr><h5> Total No.:  ' + len + '</h5><hr><br><br>';
                str += '<button type = "button" id="add-btn" class="btn btn-primary" title="add"> <i class="fas fa-plus"></i></button>';
                // <!-- ADD BUTTON POSITION FIXED------------------------------------------- -->
                // <button type="button" id="add-btn" class="btn btn-primary" title="add"><i class="fas fa-plus circle"></i>
                // </button>
                $('#nav-pers').html(str);
                $('.but1').click(function(){
                    id1 = this.id.substring(1);
                    id = result.data[id1].id;
                    $('#pers-edit-first').val(result.data[id1].firstName);
                    $('#pers-edit-last').val(result.data[id1].lastName);
                    $('#pers-edit-email').val(result.data[id1].email);
                    $('#pers-edit-job').val(result.data[id1].jobTitle);
                    $('#pers-edit-dep').val(result.data[id1].deptid);
                });
                $('#edit-btn').on('click',function(){
                    $('#submit-edit').prop("disabled", false);
                    $('#pers-edit-first').prop("disabled", false);
                    $('#pers-edit-last').prop("disabled", false);
                    $('#pers-edit-email').prop("disabled", false);
                    $('#pers-edit-job').prop("disabled", false);
                    $('#pers-edit-dep').prop("disabled", false);
                })
                $('#canc').on('click',function(){
                    $('#pers-edit-first').prop("disabled", true);
                    $('#pers-edit-last').prop("disabled", true);
                    $('#pers-edit-email').prop("disabled", true);
                    $('#pers-edit-job').prop("disabled", true);
                    $('#pers-edit-dep').prop("disabled", true);
                })
                $('#add-btn').click(function() {
                    $('#add').modal('show');
                });
            }
            $('#formdd').on("submit", function(){
                for(var i=0; i<a.length;i++){
                    console.log(i);
                    if(a[i] == $('#del-dep').val()){
                        alert('data cant be deleted');
                        break;
                    } else {
                        // alert('hey');
                        $.ajax({
                            url: "libs/php/deleteDepartmentByID.php",
                            type: 'POST',
                            data: {
                                id: $('#del-dep').val(),
                            },
                            success: function(result){
                                if(result.status.name == "ok"){
                                    alert('Department deleted successfully');
                                    setTimeout('window.location.reload();');
                                }
                            } 
                        });
                        break;
                    }
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('error while getting all data about personnel');
        }
    });}
    //UPDATING DATA IN PERSONNEL DATABASE AFTER CLICKING ON EDIT BUTTON-----------------------------------
    $('#submit-edit').click(function() {
        var fName = $('#pers-edit-first').val();
        var lName = $('#pers-edit-last').val();
        var eMail = $('#pers-edit-email').val();
        var job = $('#pers-edit-job').val();
        var dept = $('#pers-edit-dep').val();
        $.ajax({
            url: "libs/php/updatePersonnel.php",
            type: 'POST',
            data: {
                firstName: fName,
                lastName: lName,
                eMail: eMail,
                job: job,
                dept: dept,
                ID: id,
            },
            success: function(result) {
                if(result.status.name == "ok"){
                    alert('Data has been updated');
                    setTimeout('window.location.reload();');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
                console.log('error while getting updating personnel data');
            }
        })
    });
    //DELETING DATA FROM PERSONNEL DATABASE--------------------------------------------------------------------
    $('#del-btn').click(function() {    
        $.ajax({
            url: "libs/php/deletePersonnel.php",
            type: 'POST',
            data: {
                id: id,
            },
            success: function(result) {
                if(result.status.name == "ok"){
                    alert('data has been deleted');
                    setTimeout('window.location.reload();');
                }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // your error code
                    console.log('error while deleting data about personnel');
                }
        });
    });  
    //GETTING DETAILS ABOUT LOCATIONS----------------------------------------------------------------------
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            var str2 ='';
            if(result.status.name == "ok") {
                console.log(result);
                for(var i=0; i<result.data.length; i++){
                    str2 += '<tr>' 
                    str2 += '<td>'+ result.data[i].name + '</td>';
                    str2 += '</tr>'
                }
                $('#tables1').html(str2);
                for (var i = 0; i <result.data.length; i++) {
                    locId.push(JSON.parse(result.data[i].id));
                    var elem = $("<option></option>");
                     elem.attr("value",result.data[i].id);
                     elem.text(result.data[i].name);
                     elem.appendTo($("#add-dloc"));
                     var elem1 = $("<option></option>");
                     elem1.attr("value", result.data[i].id);
                     elem1.text(result.data[i].name);
                     elem1.appendTo($('#del-loc'));
                }
            }
            console.log(locId);
            $('#formll').on("submit", function(){
                for(var i=0; i<locId.length;i++){
                    if(locId[i] == $('#del-loc').val()){
                        alert('data cant be deleted');
                        break;
                    } else {
                        // alert('hey');
                        $.ajax({
                            url: "libs/php/deleteLocationById.php",
                            type: 'POST',
                            data: {
                                id: $('#del-loc').val(),
                            },
                            success: function(result){
                                alert('Location deleted successfully');
                                if(result.status.name == "ok"){
                                    alert('Location deleted successfully');
                                    setTimeout('window.location.reload();');
                                }
                            } 
                        });
                        break;
                    }
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('error while getting locations');
        }
     });
    //AJAX FOR INSERTING PERSONNEL DATA-----------------------------------------------------------------
    $('#formss').on("submit",function() {    
    $.ajax({
        url: "libs/php/insertPersonnel.php",
        type: 'POST',
        data: {
            firstName: $('#pers-add-first').val(),
            lastName: $('#pers-add-last').val(),
            jobTitle: $('#pers-add-job').val(),
            email: $('#pers-add-email').val(),
            departmentID: $('#pers-add-dept').val(),
        },
        success: function(result) {
            console.log('hey');
            if(result.status.name == "ok"){
                alert('data has been inserted');
                setTimeout('window.location.reload();');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log($('#pers-add-dept').val());
            console.log('error while inserting personnel details');
        }
    });
    });
    //ADDING DEPARTMENT------------------------------------------------------------------------
    $('#add-btn1').click(function() {
        $('#add-deptm').modal('show');
    });
    $('#form1').on("submit", function(){
        $.ajax({
            url: "libs/php/insertDepartment.php",
            type: 'POST',
            data: {
                name: $('#dept-add').val(),
                locationID: $('#add-dloc').val(),
            },
            success: function(result){
                if(result.status.name == "ok"){
                    alert('Department added successfully');
                    setTimeout('window.location.reload();');
                }
            } 
        })
    })
    //ADDING LOCATION------------------------------------------------------------------------------------
    $('#add-btn2').click(function() {
        $('#add-locm').modal('show');
    });
    $('#form2').on("submit", function(){
        $.ajax({
            url: "libs/php/insertLocation.php",
            type: 'POST',
            data: {
                name: $('#loc-add').val(),
            },
            success: function(result){
                if(result.status.name == "ok"){
                    alert('Location added successfully');
                    setTimeout('window.location.reload();');
                }
            } 
        })
    })
    //DELETING DEPARTMENT--------------------------------------------------------------------------
    $('#del-btn1').click(function() {
        $('#del-deptm').modal('show');
    });
    //DELETING LOCATION----->
    $('#del-btn2').click(function() {
        $('#del-loctm').modal('show');
    });
    $('#search-val').keyup(function(){
        var type = $(".active");
        var typeId = type[1].id;
        if(typeId == "nav-loc"){
            searchLocation();
        } 
        else if(typeId == "nav-pers") {
            searchPersonnel();
        }        
        else if(typeId == "nav-dept") {
            searchDept();
        }
    });
    function searchLocation(){
        $.ajax({
            url: "libs/php/searchLocation.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: $('#search-val').val(),
            },
            success: function(result){
                console.log(result);
                var str3 = '';
                if(result.status.name == "ok"){
                    if(result.data.length == 0) {
                        $('#tables1').html('Data not found')
                    }
                    for(var i=0; i<result.data.length; i++){
                            str3 += '<tr>' 
                            str3 += '<td>'+ result.data[i].name + '</td>';
                            str3 += '</tr>'
                            $('#tables1').html(str3);
                    }
                }
            },
        });
    }
    function searchPersonnel(){
       if($('#search-val').val() != '')
        {$.ajax({
            url: "libs/php/searchPersonnel.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: $('#search-val').val(),
            },
            success: function(result){
                console.log(result);
                var str3 = '';
                if(result.status.name == "ok"){
                    if(result.data.length == 0) {
                        $('#nav-pers').html('Data not found')
                    }
                    for(var i=0; i<result.data.length; i++){
                        var fn = result.data[i].firstName;
                        var ln = result.data[i].lastName;
                        var email = result.data[i].email;
                        
                        str3 += '<div class = "col-sm-4" id="' + 'a' + i + '">';
                        str3 += '<div class="row">';
                        str3 += '<div class="col-sm-2 fs-5 fw-bold text-light " id="btn-container">' +
                            '<button type="button"  class="btn rounded-circle btn-circle btn-md btn-primary but1" data-bs-toggle="modal" data-bs-target="#edit"  id="' + 'b' + i + '">' + fn[0] + ln[0] + '</button>' + '</div>';
                        str3 += '<div class="col-sm-2 ">';
                        str3 += '<div class="row fs-5 ">' + ln + ', ' + fn + '</div>';
                        str3 += '<div class="row fs-6 fst-italic ">' + email + '</div>';
                        str3 += '</div>';
                        str3 += '</div>';
                        str3 += '</div>';
                        $('#nav-pers').html(str3);
                    }
                }
            },
        });}
        else {
            allPersonnel();
        }
    }
    function searchDept(){
        $.ajax({
            url: "libs/php/searchDepartment.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: $('#search-val').val(),
            },
            success: function(result){
                console.log(result);
                var str3 = '';
                if(result.status.name == "ok"){
                    if(result.data.length == 0) {
                        $('#tables').html('Data not found')
                    }
                    for(var i=0; i<result.data.length; i++){
                            str3 += '<tr>' 
                            str3 += '<td>'+ result.data[i].name + '</td>';
                            str3 += '<td>' + result.data[i].Location+ '</td>';
                            str3 += '</tr>'
                            $('#tables').html(str3);
                    }
                }
            },
        });
    }
})

