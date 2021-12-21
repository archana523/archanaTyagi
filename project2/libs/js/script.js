var len;
var id1;
var id;
var depId = new Array();
var a = [];
var locId = new Array();
var b = [];
var val1;
var idd1;
var id2;
$(document).ready(function(){
    allPersonnel();
    allDepartment();
    allLocation();
    $('#refresh').click(function() {
    	allPersonnel();
     })
  	$('#nav-dept-tab').click(function(){
    $('#filter').hide();
     $('#refresh').hide();
    })
  	$('#nav-pers-tab').click(function(){
    $('#filter').show();
      $('#refresh').show();
    })
      	$('#filter-dep').hide();
        $('#filter-loc').hide();
  	$('#nav-loc-tab').click(function(){
    	$('#filter').hide();
      	$('#refresh').hide();
    })
  //FILTER PERSONNAL ON BASIS OF DEPARTMENT-------------------------------------------------------------------------------------------------
  	$('#filter').click(function() {
    	$('#filter-dl').modal('show');
    })
  	$('#depf-btn').click(function(){
    	$('#filter-dep').show();
          	$('#filter-loc').hide();	
      $('#subb').click(function(){$.ajax({
        	url: "libs/php/filterPersonnel",
          	type: 'POST',
          	dataType: 'json',
          	success: function(result){
              	var id = $('#filter-dep1').val();
             	 var str = '';
            	for(var i=0; i<result.data.length; i++){
                  //console.log(result);
                  if(result.data[i].deptid == id){
                			var fn = result.data[i].firstName;
                            var ln = result.data[i].lastName;
                            var email = result.data[i].email;
                            var jobTitle = result.data[i].jobTitle;
                            var firstLetter = ln[0].toUpperCase();
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
                }
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
            },
        })
      	 $('#filter-dl').modal('hide');
       })
     })
    //FILTER PERSONNAL ON BASIS OF LOCATION--------------------------------------------------------------------------------------
  	$('#locf-btn').click(function(){
    	$('#filter-loc').show();
        $('#filter-dep').hide();
      	 $('#subb').click(function(){$.ajax({
        	url: "libs/php/filterPersonnel",
          	type: 'POST',
          	dataType: 'json',
          	success: function(result){
              	var id = $('#filter-loc1').val();
             	 var str = '';
            	for(var i=0; i<result.data.length; i++){
                  //console.log(result);
                  if(result.data[i].locid == id){
                			var fn = result.data[i].firstName;
                            var ln = result.data[i].lastName;
                            var email = result.data[i].email;
                            var jobTitle = result.data[i].jobTitle;
                            var firstLetter = ln[0].toUpperCase();
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
                }
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
            },
        })
      	 $('#filter-dl').modal('hide');
       })
    })
  	
    //GETTING DETAILS FROM DEPARTMENT TABLE-----------------------------------------------------------------
    function allDepartment()
    {$.ajax({
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
                        str1 += '<td>'+ '<button type = "button" class="btn btn-primary but2" title="editd" data-bs-toggle="modal" data-bs-target="#editdd" id="t'+ i +'">'+'<i class="fas fa-edit"></i></button>' + '</td>';
                        str1 += '</tr>';
                    }
                    $('#tables').html(str1);
                    $('.but2').click(function() {
                        var idd = this.id.substring(1);
                        idd1 = result.data[idd].id;
                        console.log(idd);
                        $('#dept-edit').val(result.data[idd].name);
                        $('#edit-dept').val(result.data[idd].locationID);
                    })
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
                  var elem3 = $("<option></option>");
                     elem3.attr("value",result.data[i].id);
                     elem3.text(result.data[i].name);
                      elem3.appendTo($("#filter-dep1"));
                  } 
            }
        },
            error: function(jqXHR, textStatus, errorThrown) {
				// your error code
				console.log('error while getting department data');
			}
     });}
     //TO GET ALL DEPARTMENT DETAILS WITH ID TO FILL THE INFORMATION ABOUT EMPLOYEE----------------------------------------------------------
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
                for(var i=0; i< depId.length; i++){
                    if(a.indexOf(depId[i]) == -1){
                        a.push(depId[i]);
                    }
                };
                str += '<br><br><hr><h5> Total No.:  ' + len + '</h5><hr><br><br>';
                str += '<button type = "button" id="add-btn" class="btn btn-primary" title="add"> <i class="fas fa-plus"></i></button>';
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
              //  if(result.status.name == "ok"){
                    $('#edit').modal('hide');
                    $('#msg').modal('show');
                    $('#alert').html('Data updated');
                    allPersonnel();
                        $('#submit-edit').prop("disabled", true);
                        $('#pers-edit-first').prop("disabled", true);
                        $('#pers-edit-last').prop("disabled", true);
                        $('#pers-edit-email').prop("disabled", true);
                        $('#pers-edit-job').prop("disabled", true);
                        $('#pers-edit-dep').prop("disabled", true);
               // }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
                console.log('error while getting updating personnel data');
            }
        })
    });
    //EDITING DATA IN DEPARTMENT DATA..............................................................................
    $('#formed').on("submit", function() {
        $.ajax({
            url: "libs/php/updateDepartment.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name:$('#dept-edit').val(),
                locationID: $('#edit-dept').val(),
                id: idd1,
            },
            success: function(result) {
                if (result.status.name == "ok"){
                    $('#editdd').modal('hide');
                    $('#msg').modal('show');
                    $('#alert').html('Department data updated');
                    $('#pers-edit-dep').html('');
                    allDepartment();
                }
            }
        })
    });
    //EDITING DATA IN LOCATION DATA ..................................................................................
         $('#formel').on("submit", function() {
            $.ajax({
                url: "libs/php/updateLocation.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    name:$('#loc-edit').val(),
                    id: id2,
                },
                success: function(result) {
                    if (result.status.name == "ok"){
                        $('#editll').modal('hide');
                        $('#msg').modal('show');
                        $('#alert').html('Location data updated');
                        $('#add-dloc').html('');
                        $('#del-dep').html('');
                      	$('#del-loc').html('');
                        $('#pers-edit-dep').html('');
                        allLocation();
                        allDepartment();
                        allPersonnel();
                    }
                }
            })
        });
    //DELETING DATA FROM PERSONNEL DATABASE--------------------------------------------------------------------
    $('#del-btn').click(function() {    
        $.ajax({
            url: "libs/php/deletePersonnel.php",
            type: 'POST',
          	dataType: 'json',
            data: {
                id: id,
            },
            success: function(result) {
                if(result.status.name == "ok"){
                    $('#edit').modal('hide');
                    $('#msg').modal('show');
                    $('#alert').html('Data deleted');
                    allPersonnel();
                }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // your error code
                    console.log('error while deleting data about personnel');
                }
        });
    });  
    //GETTING DETAILS ABOUT LOCATIONS----------------------------------------------------------------------
    function allLocation()
    {$.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            var str2 ='';
            if(result.status.name == "ok") {
                console.log(result);
                for(var i=0; i<result.data.length; i++){
                    str2 += '<tr>' 
                    str2 += '<td>'+ result.data[i].name + '</td>'
                    str2 += '<td>'+ '<button type = "button" class="btn btn-primary but3" title="editp" data-bs-toggle="modal" data-bs-target="#editll" id="l'+ i +'">'+'<i class="fas fa-edit"></i></button>' + '</td>';
                    str2 += '</tr>'
                }
                $('#tables1').html(str2);
                $('.but3').click(function() {
                    var idp = this.id.substring(1);
                    console.log(idp);
                    id2 = result.data[idp].id;
                    $('#loc-edit').val(result.data[idp].name);
                })
                for (var i = 0; i <result.data.length; i++) {
                    //locId.push(JSON.parse(result.data[i].id));
                    var elem = $("<option></option>");
                     elem.attr("value",result.data[i].id);
                     elem.text(result.data[i].name);
                     elem.appendTo($("#add-dloc"));
                     var elem1 = $("<option></option>");
                     elem1.attr("value", result.data[i].id);
                     elem1.text(result.data[i].name);
                     elem1.appendTo($('#del-loc'));
                     var elem3 = $("<option></option>");
                      elem3.attr("value",result.data[i].id);
                      elem3.text(result.data[i].name);
                       elem3.appendTo($("#edit-dept"));
                  var elem2 = $("<option></option>");
                     elem2.attr("value",result.data[i].id);
                     elem2.text(result.data[i].name);
                      elem2.appendTo($("#filter-loc1"));
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('error while getting locations');
        }
     });}
    //AJAX FOR ADDING PERSONNEL DATA-----------------------------------------------------------------
    $('#formss').on("submit",function() {    
    $.ajax({
        url: "libs/php/insertPersonnel.php",
        type: 'POST',
        dataType: 'json',
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
                $('#add').modal('hide');
                $('#msg').modal('show');
                $('#alert').html('Personnel data added');
                $('#formss')[0].reset();
                allPersonnel();
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
                //if(result.status.name == "ok"){
                   $('#add-deptm').modal('hide');
                   $('#msg').modal('show');
                   $('#alert').html('Department added');
                   $('#dept-add').html('');
                   $('#add-dloc').html('');
              	   $('#del-dep').html('');
                   $('#pers-edit-dep').html('');
                   allDepartment();
                //}
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
                console.log($('#loc-add').val());
               // if(result.status.name == "ok"){
                    $('#add-locm').modal('hide');
                    $('#msg').modal('show');
                    $('#alert').html('Location added successfuly');
                    $('#loc-add').html('');
              		$('#del-loc').html('');
                    $('#add-dloc').html('');
                    allLocation();
              	    allDepartment();
                //}
            } 
        })
    })
    //DELETING DEPARTMENT--------------------------------------------------------------------------
    $('#del-btn1').click(function() {
        $('#del-deptm').modal('show');
    });
    $('#formdd').on("submit", function(){
        var idd = $('#del-dep').val();
            $.ajax({
                url: "libs/php/countDepartmentById.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: idd,
                },
                success: function(result) {
                    if(result.status.name == "ok"){
                        console.log(result.data[0].deptCount);
                        if(result.data[0].deptCount == 0){
                            $.ajax({
                                url: "libs/php/deleteDepartmentByID.php",
                                type: 'POST',
                                data: {
                                    id: idd,
                                },
                                success: function(result){
                                    //if(result.status.name == "ok"){
                                        $('#del-deptm').modal('hide');
                                        $('#msg').modal('show');
                                        $('#alert').html('Department data deleted');
                                        $("#del-dep").html('');
                                  		$('#pers-edit-dep').html('');
                                        allDepartment();
                                   // }
                                } 
                            });
                        } else {
                            $('#del-deptm').modal('hide');
                            $('#msg').modal('show');
                            $('#alert').html('Department has Dependancy, Data cannot be deleted');
                        }
                    }
                }
            })
    });
    //DELETING LOCATION----->
    $('#del-btn2').click(function() {
        $('#del-loctm').modal('show');
    });
    console.log(locId);
    $('#formll').on("submit", function(){
        var idl = $('#del-loc').val();
        $.ajax({
            url: "libs/php/countLocationById.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: idl,
            },
            success: function(result) {
                if(result.status.name == "ok"){
                    console.log(result.data[0].locCount);
                    if(result.data[0].locCount == 0){
                        $.ajax({
                            url: "libs/php/deleteLocationById.php",
                            type: 'POST',
                            data: {
                                id: idl,
                            },
                            success: function(result){
                                $('#del-loctm').modal('hide');
                                $('#msg').modal('show');
                                $('#alert').html('Location data deleted');
                                $('#del-loc').html('');
                                $('#add-dloc').html('');
                                allLocation();
                            } 
                        });
                    } else {
                        $('#del-loctm').modal('hide');
                        $('#msg').modal('show');
                        $('#alert').html('Location has Dependancy, Data cannot be deleted');
                    }
                }
            }
        });
    });
    //READING VALUES BEING ENTERED IN SEARCH INPUT---------------------------------------------------------
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
    //FUNCTION FOR SEARCHING LOCATION-------------------------------------------------------------------------------
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
    //FUNCTION FOR SEARCHING PERSONNEL--------------------------------------------------------------------
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
    //FUNCTION FOR SEARCHING DEPARTMENT---------------------------------------------------------------
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

