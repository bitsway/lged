
var imageName = "";
var imageName2 = "";
var imageName3 = "";
var imageName4 = "";
var imageName5 = "";

var imagePath1A="";
var imagePath2A="";
var imagePath3A="";
var imagePath4A="";
var imagePath5A="";

var latitude="";
var longitude="";
var upListFlag=0;



function getLocationInfoAch() {		
	var options = { enableHighAccuracy: false};	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);				
	$(".errorChk").html("Confirming location. Please wait.");
}
// onSuccess Geolocation
function onSuccess(position) {	
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}

//---- online 
var apipath="http://a006.yeapps.com/lged/syncmobile/";

//--- local
//var apipath="http://127.0.0.1:8000/lged/syncmobile/";

 url ="";


$(document).ready(function(){
	if (localStorage.synced!='YES'){
			 url = "#pagesync";						
		}else{
			
			if (upListFlag==0){
				$("#ffUpDiv").html(localStorage.upazilaList);	
				upListFlag=1;
			}else{
				$('#ffUpDiv').empty();
				$('#ffUpDiv').append(localStorage.upazilaList).trigger('create');
			}
			
	
			
			url = "#homePage";
		}
	$.mobile.navigate(url);
	
});

function syncBasic() {
					
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorMsg").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorMsg").html("Sync in progress. Please wait...");
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
		
		 	//alert(apipath+'passwordCheck?cid=LGED&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath+'passwordCheck?cid=LGED&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					localStorage.synced=syncResultArray[0];
					if (localStorage.synced=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						localStorage.ffID=syncResultArray[2];
						//localStorage.schoolList=syncResultArray[3];		
						
						localStorage.mobile_no=mobile;
						/*						
						var totalSchoolList=localStorage.schoolList.split('||');
						
						schList=""	
						for (i=0;i<totalSchoolList.length;i++){					
							schListTotal=totalSchoolList[i].split(',')
							schList+="<option value="+encodeURIComponent(schListTotal[1])+">"+schListTotal[0]+"</option>";
						}							
						var rpt_rep_ob=$("#school_list");						
						rpt_rep_ob.empty();
						rpt_rep_ob.append(schList);
						rpt_rep_ob.selectmenu("refresh");
								*/									
						
						$(".errorMsg").html("Sync Successful");
						
						$('#syncBasic').show();
						
						url = "#homePage";
						$.mobile.navigate(url);

					}else{
						
						$(".errorMsg").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
			
		 }//-----/field
			
	}



function menuClick(){
		$(".errorChk").text("");
		$(".sucChk").text("");
		
		$("#btn_take_pic").show();
		$("#btn_ach_lat_long").show();
		
		$('#up_list_search').val('');
		
		url = "#homePage";
		$.mobile.navigate(url);
	
	}
//----------------back button
function backClick(){
	$(".errorChk").text("");
	}


	
//---------------------------Banbeis data page 
var ruralData1="";
var ruralData2="";
var ruralData3="";
var ruralData4A=""
var ruralData4B="";
var ruralData5="";


function ruralV(){
	
	if(localStorage.sync_code==undefined || localStorage.sync_code==""){
			$(".errorChk").text("Required Sync");
			
		}else{
			//alert(apipath+'get_school_list?cid=LGED&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath+'get_school_list?cid=LGED&sync_code='+localStorage.sync_code,
			  success: function(schStr) {
					  schoolList=schStr.split("||");
					  schList="";
					  for (i=0;i<schoolList.length;i++){					
							schListTotal=schoolList[i].split(',')
							schList+="<option value="+encodeURIComponent(schListTotal[1])+">"+schListTotal[0]+"</option>";
						}							
						var rpt_rep_ob=$("#school_list");						
						rpt_rep_ob.empty();
						rpt_rep_ob.append(schList);
						rpt_rep_ob.selectmenu("refresh");			  
					 									  
				  }		  
			});	 		
		
		url="#page1";					
		$.mobile.navigate(url);		
	
}
}

//-----------------
function schoolSelect(){
	$(".error").text("");
	var school_list=$("#school_list").val();
	if(school_list==""){
		$(".error").text("Required School");
	}else{		
		//alert(apipath+'search_school?cid=LGED&school_list='+school_list);
		$.ajax({
			url:apipath+'search_school?cid=LGED&school_code='+school_list,
			success: function(result) {				  
				resultStr=result.split("<fd>");	  	
				 if (resultStr[0]=="Success"){
					  var schoolNameStr=resultStr[1].split("fdfd");	
					  var div_name=schoolNameStr[0];
					  var dist_name=schoolNameStr[1];
					  var up_name=schoolNameStr[2];		
					  var school_code=schoolNameStr[3];
					  var school_name=schoolNameStr[4];
					  
					  $("#division").val(div_name);
					  $("#district").val(dist_name);
					  $("#upzila").val(up_name);
					  $("#ff_id").val(localStorage.ffID);
					  $("#school_id").val(school_code);
					  $("#school_name").val(school_name);
					  
					  url="#page2";					
					  $.mobile.navigate(url);
					  
					}else if (resultStr[0]=="Failed"){
						$(".errorChk").text("Audit report already submitted for this school . Please contact with admin if you think this school in incorrectly flagged.");
											
					} 
				
			  }
		});
	}
		
}


function schoolSearch(){
	
	url="#school_select_page";					
	$.mobile.navigate(url);	
	}


function ruralData1Next(){	
	
		var division=$("#division").val();
		var district=$("#district").val();
		var upzila=$("#upzila").val();
		var ff_id=$("#ff_id").val();
		var semister=$("#semister").val();
		var school_id=$("#school_id").val();
		var school_name=$("#school_name").val();
		var daily_from_time=$("#daily_from_time").val();
		var daily_to_time=$("#daily_to_time").val();
		var total_hour=$("#total_hour").val();
		var visit_date=$("#visit_date").val();
		var school_condition=$("#school_condition").val();
		var close_school=$("#close_school").val();
		var close_school_others=$("#close_school_others").val();
		var next_visit=$("#next_visit").val();
		var visit_date_second=$("#visit_date_second").val();
		var school_condition_second=$("#school_condition_second").val();
		var close_school_second=$("#close_school_second").val();
		var close_school_others_second=$("#close_school_others_second").val();
		
				
		/*if (edu_year=="" || edu_year==0 ){
			$(".errorChk").text("Required Education Year");

		
		}else{*/
			
			
			ruralData1="||division="+division+"||district="+district+"||upzila="+upzila+"||ff_id="+ff_id+"||semister="+semister+"||school_id="+school_id+"||school_name="+school_name+"||daily_from_time="+daily_from_time+"||daily_to_time="+daily_to_time+"||total_hour="+total_hour+"||visit_date="+visit_date+"||school_condition="+school_condition+"||close_school="+close_school+"||close_school_others="+close_school_others+"||next_visit="+next_visit+"||visit_date_second="+visit_date_second+"||school_condition_second="+school_condition_second+"||close_school_second="+close_school_second+"||close_school_others_second="+close_school_others_second;
		
		//alert(ruralData1);
		//}
		$(".errorChk").text("");
		url="#page3";					
		$.mobile.navigate(url);	
	
	}

//===================		
function ruralData2Next(){
	
		
		var school_installation_year=$("#school_installation_year").val();
		var school_address_house=$("#school_address_house").val();
		var school_address_vill=$("#school_address_vill").val();
				
		var school_address_unionName=$("#school_address_unionName").val();
		var distance_school_near_GPS=$("#distance_school_near_GPS").val();
		var school_signboard=$("#school_signboard").val().replace(/\./g, '');
		var international_flag_size=$("#international_flag_size").val();
		var school_house=$("#school_house").val();
		var school_house_others=$("#school_house_others").val();
		var school_type=$("#school_type").val();
		//var par_abs_ano_guar=$("input[name='parrent_absen_another_guardian']:checked").val();
		var school_type_others=$("#school_type_others").val();
		var singing_national_anthem_before_cls_start=$("#singing_national_anthem_before_cls_start").val();		
		var classroom_aayaton_hight=$("#classroom_aayaton_hight").val();
		var classroom_aayaton_width=$("#classroom_aayaton_width").val();
		
		var huse_light_air=$("#huse_light_air").val();
		var classroom_windows=$("#classroom_windows").val();
		var classroom_doors=$("#classroom_doors").val();
		var arsenic_free_water=$("#arsenic_free_water").val();
		var water_distance=$("#water_distance").val();
		var student_useable_toilate=$("#student_useable_toilate").val();
		var benefit_electricity_cls=$("#benefit_electricity_cls").val();
		var seat_arragement_cls=$("#seat_arragement_cls").val();
		var cls_usable_board_draster=$("#cls_usable_board_draster").val();
		var all_student_textbook=$("#all_student_textbook").val();
		var all_student_pen=$("#all_student_pen").val();
		var management_school_calender=$("#management_school_calender").val();
		var management_school_cls_routin=$("#management_school_cls_routin").val();
		var cmc_metting_previous_semister=$("#cmc_metting_previous_semister").val();
		var last_cmc_metting_present_cmc_member=$("#last_cmc_metting_present_cmc_member").val();
		var cmc_selebrate_exchange_gardagin=$("#cmc_selebrate_exchange_gardagin").val();
		var previous_semister_school_anudan_time=$("#previous_semister_school_anudan_time").val();
		
		
		var regStr=/^[a-zA-Z\s]+$/;
		
		/*			
		if(boothNo==""){
			$(".errorChk").text("Required Booth No");
		}else if(appSerialNo==""){
			$(".errorChk").text("Required Application Serial No");
		}else if(appSerialNo.length !=4){
			$(".errorChk").text("Application Serial no maximum 4 digit");
		}else if (student_name=="" ){
			$(".errorChk").text("Required Student Name");
		}else if (!student_name.match(regStr)){
			$(".errorChk").text("Student Name Only Alphabetic Character Allowed");	
		}else if (dob=="" ){
			$(".errorChk").text("Required Date of Birth");		
		}else if (fathers_name=="" ){
			$(".errorChk").text("Required Fathers Name");	
		}else if (!fathers_name.match(regStr)){
			$(".errorChk").text("Father Name Only Alphabetic Character Allowed");		
		}else if (fathers_nid!="" && fathers_nid.length !=13){
			$(".errorChk").text("Fathers Nid maximum 13 digit");	
		}else if (mothers_name=="" ){
			$(".errorChk").text("Required Mothers Name");
		}else if (!mothers_name.match(regStr)){
			$(".errorChk").text("Mother Name Only Alphabetic Character Allowed");		
		}else if (mothers_nid!="" && mothers_nid.length !=13 ){
			$(".errorChk").text("Mothers Nid maximum 13 digit");
		}else if (gen_der=="" ){
			$(".errorChk").text("Required Gender");	
		
		
		}else{*/
				
				ruralData2="||school_installation_year="+school_installation_year+"||school_address_house="+school_address_house+"||school_address_vill="+school_address_vill+"||school_address_unionName="+school_address_unionName+"||distance_school_near_GPS="+distance_school_near_GPS+"||school_signboard="+school_signboard+"||international_flag_size="+international_flag_size+"||school_house="+school_house+"||school_house_others="+school_house_others+"||school_type="+school_type+"||school_type_others="+school_type_others+"||singing_national_anthem_before_cls_start="+singing_national_anthem_before_cls_start+"||classroom_aayaton_hight="+classroom_aayaton_hight+"||classroom_aayaton_width="+classroom_aayaton_width+"||huse_light_air="+huse_light_air+"||classroom_windows="+classroom_windows+"||classroom_doors="+classroom_doors+"||arsenic_free_water="+arsenic_free_water+"||water_distance="+water_distance+"||student_useable_toilate="+student_useable_toilate+"||benefit_electricity_cls="+benefit_electricity_cls+"||seat_arragement_cls="+seat_arragement_cls+"||cls_usable_board_draster="+cls_usable_board_draster+"||all_student_textbook="+all_student_textbook+"||all_student_pen="+all_student_pen+"||management_school_calender="+management_school_calender+"||management_school_cls_routin="+management_school_cls_routin+"||cmc_metting_previous_semister="+cmc_metting_previous_semister+"||last_cmc_metting_present_cmc_member="+last_cmc_metting_present_cmc_member+"||cmc_selebrate_exchange_gardagin="+cmc_selebrate_exchange_gardagin+"||previous_semister_school_anudan_time="+previous_semister_school_anudan_time;	
							
				
				//alert(ruralData2);
						
				$(".errorChk").text("");
				
				url="#page4"
				$.mobile.navigate(url);				
		//}
	
	};


function ruralData3Next(){
				
		var education_allowance_receipt=$("input[name='education_allowance_receipt']:checked").val();
		var education_allowance_receipt_date=$("#education_allowance_receipt_date").val();
		var education_allowance_not_receipt=$("#education_allowance_not_receipt").val();
		var education_allowance_receipt_delay=$("#education_allowance_receipt_delay").val();
		var education_aundan_receipt=$("input[name='education_aundan_receipt']:checked").val();
		var education_aundan_receipt_date=$("#education_aundan_receipt_date").val();
		var education_aundan_not_receipt=$("#education_aundan_not_receipt").val();
		var education_aundan_receipt_delay=$("#education_aundan_receipt_delay").val();
		var school_necessary_rec_conservation_trank=$("#school_necessary_rec_conservation_trank").val();
		var cmc_metting_log_register=$("#cmc_metting_log_register").val();
		
		var cash_register=$("#cash_register").val();
		var school_visit_register=$("#school_visit_register").val();
		var school_aundan_expense_cashMemo=$("#school_aundan_expense_cashMemo").val();
		var check_book=$("#check_book").val();
		var previous_semister_ACF=$("#previous_semister_ACF").val();
		var student_attendence_register=$("#student_attendence_register").val();
		var repair_expense=$("#repair_expense").val();
		var repair_expense_others=$("#repair_expense_others").val();
		var expense_prove=$("#expense_prove").val();
		
		var chief_executive_officer_month1=$("#chief_executive_officer_month1").val();
		var chief_executive_officer_month2=$("#chief_executive_officer_month2").val();
		var chief_executive_officer_month3=$("#chief_executive_officer_month3").val();
		var chief_executive_officer_month4=$("#chief_executive_officer_month4").val();
		var chief_executive_officer_month5=$("#chief_executive_officer_month5").val();
		var chief_executive_officer_month6=$("#chief_executive_officer_month6").val();
		
		var up_education_officer_month1=$("#up_education_officer_month1").val();
		var up_education_officer_month2=$("#up_education_officer_month2").val();
		var up_education_officer_month3=$("#up_education_officer_month3").val();
		var up_education_officer_month4=$("#up_education_officer_month4").val();
		var up_education_officer_month5=$("#up_education_officer_month5").val();
		var up_education_officer_month6=$("#up_education_officer_month6").val();
		
		var training_co_ordinator_month1=$("#training_co_ordinator_month1").val();
		var training_co_ordinator_month2=$("#training_co_ordinator_month2").val();
		var training_co_ordinator_month3=$("#training_co_ordinator_month3").val();
		var training_co_ordinator_month4=$("#training_co_ordinator_month4").val();
		var training_co_ordinator_month5=$("#training_co_ordinator_month5").val();
		var training_co_ordinator_month6=$("#training_co_ordinator_month6").val();
		
		var assistant_up_education_officer_month1=$("#assistant_up_education_officer_month1").val();
		var assistant_up_education_officer_month2=$("#assistant_up_education_officer_month2").val();
		var assistant_up_education_officer_month3=$("#assistant_up_education_officer_month3").val();
		var assistant_up_education_officer_month4=$("#assistant_up_education_officer_month4").val();
		var assistant_up_education_officer_month5=$("#assistant_up_education_officer_month5").val();
		var assistant_up_education_officer_month6=$("#assistant_up_education_officer_month6").val();
				
		var assistant_teacher_month1=$("#assistant_teacher_month1").val();
		var assistant_teacher_month2=$("#assistant_teacher_month2").val();
		var assistant_teacher_month3=$("#assistant_teacher_month3").val();
		var assistant_teacher_month4=$("#assistant_teacher_month4").val();
		var assistant_teacher_month5=$("#assistant_teacher_month5").val();
		var assistant_teacher_month6=$("#assistant_teacher_month6").val();
		
		var mobile_pool_teacher_month1=$("#mobile_pool_teacher_month1").val();
		var mobile_pool_teacher_month2=$("#mobile_pool_teacher_month2").val();
		var mobile_pool_teacher_month3=$("#mobile_pool_teacher_month3").val();
		var mobile_pool_teacher_month4=$("#mobile_pool_teacher_month4").val();
		var mobile_pool_teacher_month5=$("#mobile_pool_teacher_month5").val();
		var mobile_pool_teacher_month6=$("#mobile_pool_teacher_month6").val();
		
		var others_month1=$("#others_month1").val();
		var others_month2=$("#others_month2").val();
		var others_month3=$("#others_month3").val();
		var others_month4=$("#others_month4").val();
		var others_month5=$("#others_month5").val();
		var others_month6=$("#others_month6").val();
		
		
		var regStr=/^[a-zA-Z\s]+$/;
		
					
			ruralData3="||education_allowance_receipt="+education_allowance_receipt+"||education_allowance_receipt_date="+education_allowance_receipt_date+"||education_allowance_not_receipt="+education_allowance_not_receipt+"||education_allowance_receipt_delay="+education_allowance_receipt_delay+"||education_aundan_receipt="+education_aundan_receipt+"||education_aundan_receipt_date="+education_aundan_receipt_date+"||education_aundan_not_receipt="+education_aundan_not_receipt+"||education_aundan_receipt_delay="+education_aundan_receipt_delay+"||school_necessary_rec_conservation_trank="+school_necessary_rec_conservation_trank+"||cmc_metting_log_register="+cmc_metting_log_register+"||cash_register="+cash_register+"||school_visit_register="+school_visit_register+"||school_aundan_expense_cashMemo="+school_aundan_expense_cashMemo+"||check_book="+check_book+"||previous_semister_ACF="+previous_semister_ACF+"||student_attendence_register="+student_attendence_register+"||repair_expense="+repair_expense+"||repair_expense_others="+repair_expense_others+"||expense_prove="+expense_prove+"||chief_executive_officer_month1="+chief_executive_officer_month1+"||chief_executive_officer_month2="+chief_executive_officer_month2+"||chief_executive_officer_month3="+chief_executive_officer_month3+"||chief_executive_officer_month4="+chief_executive_officer_month4+"||chief_executive_officer_month5="+chief_executive_officer_month5+"||chief_executive_officer_month6="+chief_executive_officer_month6+"||up_education_officer_month1="+up_education_officer_month1+"||up_education_officer_month2="+up_education_officer_month2+"||up_education_officer_month3="+up_education_officer_month3+"||up_education_officer_month4="+up_education_officer_month4+"||up_education_officer_month5="+up_education_officer_month5+"||up_education_officer_month6="+up_education_officer_month6+"||training_co_ordinator_month1="+training_co_ordinator_month1+"||training_co_ordinator_month2="+training_co_ordinator_month2+"||training_co_ordinator_month3="+training_co_ordinator_month3+"||training_co_ordinator_month4="+training_co_ordinator_month4+"||training_co_ordinator_month5="+training_co_ordinator_month5+"||training_co_ordinator_month6="+training_co_ordinator_month6+"||assistant_up_education_officer_month1="+assistant_up_education_officer_month1+"||assistant_up_education_officer_month2="+assistant_up_education_officer_month2+"||assistant_up_education_officer_month3="+assistant_up_education_officer_month3+"||assistant_up_education_officer_month4="+assistant_up_education_officer_month4+"||assistant_up_education_officer_month5="+assistant_up_education_officer_month5+"||assistant_up_education_officer_month6="+assistant_up_education_officer_month6+"||assistant_teacher_month1="+assistant_teacher_month1+"||assistant_teacher_month2="+assistant_teacher_month2+"||assistant_teacher_month3="+assistant_teacher_month3+"||assistant_teacher_month4="+assistant_teacher_month4+"||assistant_teacher_month5="+assistant_teacher_month5+"||assistant_teacher_month6="+assistant_teacher_month6+"||mobile_pool_teacher_month1="+mobile_pool_teacher_month1+"||mobile_pool_teacher_month2="+mobile_pool_teacher_month2+"||mobile_pool_teacher_month3="+mobile_pool_teacher_month3+"||mobile_pool_teacher_month4="+mobile_pool_teacher_month4+"||mobile_pool_teacher_month5="+mobile_pool_teacher_month5+"||mobile_pool_teacher_month6="+mobile_pool_teacher_month6+"||others_month1="+others_month1+"||others_month2="+others_month2+"||others_month3="+others_month3+"||others_month4="+others_month4+"||others_month5="+others_month5+"||others_month6="+others_month6
			
			//alert(ruralData3);
				
			$(".errorChk").text("");
			url="#page5";
			$.mobile.navigate(url);
			
		 // } 
		
}


function ruralData4Next(){
		
		var v_LC_reg_tea_pre=$("#visit_LC_regu_teacher_present").val();//change
		var reg_tea_inst_tea_name=$("#regu_tea_instead_teacher_name").val();//change
		var reg_tea_inst_tea_type=$("#regu_tea_instead_teacher_type").val();//change
		var tea_rep_appo_office=$("#teacher_replaced_appointment_office").val();//change
		var v_dis_id_card_tea=$("#visit_display_id_card_teacher").val();//change
		var dis_tea_house_to_sch=$("#distance_teacher_house_to_school").val();//change
		var pre_semr_schl_tea_trai=$("#previous_semister_school_teacher_training").val();//change
		var cls_atte_stu=$("#class_attendence_students").val();//change
		var v_day_atte_stu_boys=$("#visit_day_attendence_students_boys").val();//change
		var v_day_atte_stu_girls=$("#visit_day_attendence_students_girls").val();//change
		var v_day_atte_stu_total=$("#visit_day_attendence_students_total").val();//change
		var pre_sem_total_sch=$("#previous_semister_total_school_dibos").val();//change
		
		//35 fields
		var col1=$("#lc_profile_studentID_three_digit1").val();
		var stu1=$("input[name='classroom_present_student1']:checked").val();
		var image_match1=$("input[name='image_match1']:checked").val();
		var name_match1=$("input[name='name_match1']:checked").val();
		var gender_match1=$("input[name='gender_match1']:checked").val();
		var school_dress1=$("input[name='school_dress1']:checked").val();
		var school_idCard1=$("input[name='school_idCard1']:checked").val();
		var pre_sem_edu_allow1=$("input[name='previous_semister_edu_allowance1']:checked").val();
		var edu_ot_sch1=$("input[name='education_other_school1']:checked").val();
		var student_abcent1=$("#student_abcent1").val();
		var pre1=$("#previous_semister_total_present1").val();
		var rec_num1=$("#previous_semister_recived_number1").val();
			
		var col2=$("#lc_profile_studentID_three_digit2").val();
		var stu2=$("input[name='classroom_present_student2']:checked").val();
		var image_match2=$("input[name='image_match2']:checked").val();
		var name_match2=$("input[name='name_match2']:checked").val();
		var gender_match2=$("input[name='gender_match2']:checked").val();
		var school_dress2=$("input[name='school_dress2']:checked").val();
		var school_idCard2=$("input[name='school_idCard2']:checked").val();
		var pre_sem_edu_allow2=$("input[name='previous_semister_edu_allowance2']:checked").val();
		var edu_ot_sch2=$("input[name='education_other_school2']:checked").val();
		var student_abcent2=$("#student_abcent2").val();
		var pre2=$("#previous_semister_total_present2").val();
		var rec_num2=$("#previous_semister_recived_number2").val();
		
		var col3=$("#lc_profile_studentID_three_digit3").val();
		var stu3=$("input[name='classroom_present_student3']:checked").val();
		var image_match3=$("input[name='image_match3']:checked").val();
		var name_match3=$("input[name='name_match3']:checked").val();
		var gender_match3=$("input[name='gender_match3']:checked").val();
		var school_dress3=$("input[name='school_dress3']:checked").val();
		var school_idCard3=$("input[name='school_idCard3']:checked").val();
		var pre_sem_edu_allow3=$("input[name='previous_semister_edu_allowance3']:checked").val();
		var edu_ot_sch3=$("input[name='education_other_school3']:checked").val();
		var student_abcent3=$("#student_abcent3").val();
		var pre3=$("#previous_semister_total_present3").val();
		var rec_num3=$("#previous_semister_recived_number3").val();
		
		var col4=$("#lc_profile_studentID_three_digit3").val();
		var stu4=$("input[name='classroom_present_student4']:checked").val();
		var image_match4=$("input[name='image_match4']:checked").val();
		var name_match4=$("input[name='name_match4']:checked").val();
		var gender_match4=$("input[name='gender_match4']:checked").val();
		var school_dress4=$("input[name='school_dress4']:checked").val();
		var school_idCard4=$("input[name='school_idCard4']:checked").val();
		var pre_sem_edu_allow4=$("input[name='previous_semister_edu_allowance4']:checked").val();
		var edu_ot_sch4=$("input[name='education_other_school4']:checked").val();
		var student_abcent4=$("#student_abcent4").val();
		var pre4=$("#previous_semister_total_present4").val();
		var rec_num4=$("#previous_semister_recived_number4").val();
		
		var col5=$("#lc_profile_studentID_three_digit5").val();
		var stu5=$("input[name='classroom_present_student5']:checked").val();
		var image_match5=$("input[name='image_match5']:checked").val();
		var name_match5=$("input[name='name_match5']:checked").val();
		var gender_match5=$("input[name='gender_match5']:checked").val();
		var school_dress5=$("input[name='school_dress5']:checked").val();
		var school_idCard5=$("input[name='school_idCard5']:checked").val();
		var pre_sem_edu_allow5=$("input[name='previous_semister_edu_allowance5']:checked").val();
		var edu_ot_sch5=$("input[name='education_other_school5']:checked").val();
		var student_abcent5=$("#student_abcent5").val();
		var pre5=$("#previous_semister_total_present5").val();
		var rec_num5=$("#previous_semister_recived_number5").val();
		
		var col6=$("#lc_profile_studentID_three_digit6").val();
		var stu6=$("input[name='classroom_present_student6']:checked").val();
		var image_match6=$("input[name='image_match6']:checked").val();
		var name_match6=$("input[name='name_match6']:checked").val();
		var gender_match6=$("input[name='gender_match6']:checked").val();
		var school_dress6=$("input[name='school_dress6']:checked").val();
		var school_idCard6=$("input[name='school_idCard6']:checked").val();
		var pre_sem_edu_allow6=$("input[name='previous_semister_edu_allowance6']:checked").val();
		var edu_ot_sch6=$("input[name='education_other_school6']:checked").val();
		var student_abcent6=$("#student_abcent6").val();
		var pre6=$("#previous_semister_total_present6").val();
		var rec_num6=$("#previous_semister_recived_number6").val();
		
		var col7=$("#lc_profile_studentID_three_digit7").val();
		var stu7=$("input[name='classroom_present_student7']:checked").val();
		var image_match7=$("input[name='image_match7']:checked").val();
		var name_match7=$("input[name='name_match7']:checked").val();
		var gender_match7=$("input[name='gender_match7']:checked").val();
		var school_dress7=$("input[name='school_dress7']:checked").val();
		var school_idCard7=$("input[name='school_idCard7']:checked").val();
		var pre_sem_edu_allow7=$("input[name='previous_semister_edu_allowance7']:checked").val();
		var edu_ot_sch7=$("input[name='education_other_school7']:checked").val();
		var student_abcent7=$("#student_abcent7").val();
		var pre7=$("#previous_semister_total_present7").val();
		var rec_num7=$("#previous_semister_recived_number7").val();
		
		var col8=$("#lc_profile_studentID_three_digit8").val();
		var stu8=$("input[name='classroom_present_student8']:checked").val();
		var image_match8=$("input[name='image_match8']:checked").val();
		var name_match8=$("input[name='name_match8']:checked").val();
		var gender_match8=$("input[name='gender_match8']:checked").val();
		var school_dress8=$("input[name='school_dress8']:checked").val();
		var school_idCard8=$("input[name='school_idCard8']:checked").val();
		var pre_sem_edu_allow8=$("input[name='previous_semister_edu_allowance8']:checked").val();
		var edu_ot_sch8=$("input[name='education_other_school8']:checked").val();
		var student_abcent8=$("#student_abcent8").val();
		var pre8=$("#previous_semister_total_present8").val();
		var rec_num8=$("#previous_semister_recived_number8").val();
		
		var col9=$("#lc_profile_studentID_three_digit9").val();
		var stu9=$("input[name='classroom_present_student9']:checked").val();
		var image_match9=$("input[name='image_match9']:checked").val();
		var name_match9=$("input[name='name_match9']:checked").val();
		var gender_match9=$("input[name='gender_match9']:checked").val();
		var school_dress9=$("input[name='school_dress9']:checked").val();
		var school_idCard9=$("input[name='school_idCard9']:checked").val();
		var pre_sem_edu_allow9=$("input[name='previous_semister_edu_allowance9']:checked").val();
		var edu_ot_sch9=$("input[name='education_other_school9']:checked").val();
		var student_abcent9=$("#student_abcent9").val();
		var pre9=$("#previous_semister_total_present9").val();
		var rec_num9=$("#previous_semister_recived_number9").val();
		
		var col10=$("#lc_profile_studentID_three_digit10").val();
		var stu10=$("input[name='classroom_present_student10']:checked").val();
		var image_match10=$("input[name='image_match10']:checked").val();
		var name_match10=$("input[name='name_match10']:checked").val();
		var gender_match10=$("input[name='gender_match10']:checked").val();
		var school_dress10=$("input[name='school_dress10']:checked").val();
		var school_idCard10=$("input[name='school_idCard10']:checked").val();
		var pre_sem_edu_allow10=$("input[name='previous_semister_edu_allowance10']:checked").val();
		var edu_ot_sch10=$("input[name='education_other_school10']:checked").val();
		var student_abcent10=$("#student_abcent10").val();
		var pre10=$("#previous_semister_total_present10").val();
		var rec_num10=$("#previous_semister_recived_number10").val();
		
		var col11=$("#lc_profile_studentID_three_digit11").val();
		var stu11=$("input[name='classroom_present_student11']:checked").val();
		var image_match11=$("input[name='image_match11']:checked").val();
		var name_match11=$("input[name='name_match11']:checked").val();
		var gender_match11=$("input[name='gender_match11']:checked").val();
		var school_dress11=$("input[name='school_dress11']:checked").val();
		var school_idCard11=$("input[name='school_idCard11']:checked").val();
		var pre_sem_edu_allow11=$("input[name='previous_semister_edu_allowance11']:checked").val();
		var edu_ot_sch11=$("input[name='education_other_school11']:checked").val();
		var student_abcent11=$("#student_abcent11").val();
		var pre11=$("#previous_semister_total_present11").val();
		var rec_num11=$("#previous_semister_recived_number11").val();
		
		var col12=$("#lc_profile_studentID_three_digit12").val();
		var stu12=$("input[name='classroom_present_student12']:checked").val();
		var image_match12=$("input[name='image_match12']:checked").val();
		var name_match12=$("input[name='name_match12']:checked").val();
		var gender_match12=$("input[name='gender_match12']:checked").val();
		var school_dress12=$("input[name='school_dress12']:checked").val();
		var school_idCard12=$("input[name='school_idCard12']:checked").val();
		var pre_sem_edu_allow12=$("input[name='previous_semister_edu_allowance12']:checked").val();
		var edu_ot_sch12=$("input[name='education_other_school12']:checked").val();
		var student_abcent12=$("#student_abcent12").val();
		var pre12=$("#previous_semister_total_present12").val();
		var rec_num12=$("#previous_semister_recived_number12").val();
		
		var col13=$("#lc_profile_studentID_three_digit13").val();
		var stu13=$("input[name='classroom_present_student13']:checked").val();
		var image_match13=$("input[name='image_match13']:checked").val();
		var name_match13=$("input[name='name_match13']:checked").val();
		var gender_match13=$("input[name='gender_match13']:checked").val();
		var school_dress13=$("input[name='school_dress13']:checked").val();
		var school_idCard13=$("input[name='school_idCard13']:checked").val();
		var pre_sem_edu_allow13=$("input[name='previous_semister_edu_allowance13']:checked").val();
		var edu_ot_sch13=$("input[name='education_other_school13']:checked").val();
		var student_abcent13=$("#student_abcent13").val();
		var pre13=$("#previous_semister_total_present13").val();
		var rec_num13=$("#previous_semister_recived_number13").val();
		
		var col14=$("#lc_profile_studentID_three_digit14").val();
		var stu14=$("input[name='classroom_present_student14']:checked").val();
		var image_match14=$("input[name='image_match14']:checked").val();
		var name_match14=$("input[name='name_match14']:checked").val();
		var gender_match14=$("input[name='gender_match14']:checked").val();
		var school_dress14=$("input[name='school_dress14']:checked").val();
		var school_idCard14=$("input[name='school_idCard14']:checked").val();
		var pre_sem_edu_allow14=$("input[name='previous_semister_edu_allowance14']:checked").val();
		var edu_ot_sch14=$("input[name='education_other_school14']:checked").val();
		var student_abcent14=$("#student_abcent14").val();
		var pre14=$("#previous_semister_total_present14").val();
		var rec_num14=$("#previous_semister_recived_number14").val();
		
		var col15=$("#lc_profile_studentID_three_digit15").val();
		var stu15=$("input[name='classroom_present_student15']:checked").val();
		var image_match15=$("input[name='image_match15']:checked").val();
		var name_match15=$("input[name='name_match15']:checked").val();
		var gender_match15=$("input[name='gender_match15']:checked").val();
		var school_dress15=$("input[name='school_dress15']:checked").val();
		var school_idCard15=$("input[name='school_idCard15']:checked").val();
		var pre_sem_edu_allow15=$("input[name='previous_semister_edu_allowance15']:checked").val();
		var edu_ot_sch15=$("input[name='education_other_school15']:checked").val();
		var student_abcent15=$("#student_abcent15").val();
		var pre15=$("#previous_semister_total_present15").val();
		var rec_num15=$("#previous_semister_recived_number15").val();
		
		var col16=$("#lc_profile_studentID_three_digit16").val();
		var stu16=$("input[name='classroom_present_student16']:checked").val();
		var image_match16=$("input[name='image_match16']:checked").val();
		var name_match16=$("input[name='name_match16']:checked").val();
		var gender_match16=$("input[name='gender_match16']:checked").val();
		var school_dress16=$("input[name='school_dress16']:checked").val();
		var school_idCard16=$("input[name='school_idCard16']:checked").val();
		var pre_sem_edu_allow16=$("input[name='previous_semister_edu_allowance16']:checked").val();
		var edu_ot_sch16=$("input[name='education_other_school16']:checked").val();
		var student_abcent16=$("#student_abcent16").val();
		var pre16=$("#previous_semister_total_present16").val();
		var rec_num16=$("#previous_semister_recived_number16").val();
		
		var col17=$("#lc_profile_studentID_three_digit17").val();
		var stu17=$("input[name='classroom_present_student17']:checked").val();
		var image_match17=$("input[name='image_match17']:checked").val();
		var name_match17=$("input[name='name_match17']:checked").val();
		var gender_match17=$("input[name='gender_match17']:checked").val();
		var school_dress17=$("input[name='school_dress17']:checked").val();
		var school_idCard17=$("input[name='school_idCard17']:checked").val();
		var pre_sem_edu_allow17=$("input[name='previous_semister_edu_allowance17']:checked").val();
		var edu_ot_sch17=$("input[name='education_other_school17']:checked").val();
		var student_abcent17=$("#student_abcent17").val();
		var pre17=$("#previous_semister_total_present17").val();
		var rec_num17=$("#previous_semister_recived_number17").val();
		
		var col18=$("#lc_profile_studentID_three_digit18").val();
		var stu18=$("input[name='classroom_present_student18']:checked").val();
		var image_match18=$("input[name='image_match18']:checked").val();
		var name_match18=$("input[name='name_match18']:checked").val();
		var gender_match18=$("input[name='gender_match18']:checked").val();
		var school_dress18=$("input[name='school_dress18']:checked").val();
		var school_idCard18=$("input[name='school_idCard18']:checked").val();
		var pre_sem_edu_allow18=$("input[name='previous_semister_edu_allowance18']:checked").val();
		var edu_ot_sch18=$("input[name='education_other_school18']:checked").val();
		var student_abcent18=$("#student_abcent18").val();
		var pre18=$("#previous_semister_total_present18").val();
		var rec_num18=$("#previous_semister_recived_number18").val();
		
		var col19=$("#lc_profile_studentID_three_digit19").val();
		var stu19=$("input[name='classroom_present_student19']:checked").val();
		var image_match19=$("input[name='image_match19']:checked").val();
		var name_match19=$("input[name='name_match19']:checked").val();
		var gender_match19=$("input[name='gender_match19']:checked").val();
		var school_dress19=$("input[name='school_dress19']:checked").val();
		var school_idCard19=$("input[name='school_idCard19']:checked").val();
		var pre_sem_edu_allow19=$("input[name='previous_semister_edu_allowance19']:checked").val();
		var edu_ot_sch19=$("input[name='education_other_school19']:checked").val();
		var student_abcent19=$("#student_abcent19").val();
		var pre19=$("#previous_semister_total_present19").val();
		var rec_num19=$("#previous_semister_recived_number19").val();
		
		var col20=$("#lc_profile_studentID_three_digit20").val();
		var stu20=$("input[name='classroom_present_student20']:checked").val();
		var image_match20=$("input[name='image_match20']:checked").val();
		var name_match20=$("input[name='name_match20']:checked").val();
		var gender_match20=$("input[name='gender_match20']:checked").val();
		var school_dress20=$("input[name='school_dress20']:checked").val();
		var school_idCard20=$("input[name='school_idCard20']:checked").val();
		var pre_sem_edu_allow20=$("input[name='previous_semister_edu_allowance20']:checked").val();
		var edu_ot_sch20=$("input[name='education_other_school20']:checked").val();
		var student_abcent20=$("#student_abcent20").val();
		var pre20=$("#previous_semister_total_present20").val();
		var rec_num20=$("#previous_semister_recived_number20").val();
		
		var col21=$("#lc_profile_studentID_three_digit21").val();
		var stu21=$("input[name='classroom_present_student21']:checked").val();
		var image_match21=$("input[name='image_match21']:checked").val();
		var name_match21=$("input[name='name_match21']:checked").val();
		var gender_match21=$("input[name='gender_match21']:checked").val();
		var school_dress21=$("input[name='school_dress21']:checked").val();
		var school_idCard21=$("input[name='school_idCard21']:checked").val();
		var pre_sem_edu_allow21=$("input[name='previous_semister_edu_allowance21']:checked").val();
		var edu_ot_sch21=$("input[name='education_other_school21']:checked").val();
		var student_abcent21=$("#student_abcent21").val();
		var pre21=$("#previous_semister_total_present21").val();
		var rec_num21=$("#previous_semister_recived_number21").val();
		
		var col22=$("#lc_profile_studentID_three_digit22").val();
		var stu22=$("input[name='classroom_present_student22']:checked").val();
		var image_match22=$("input[name='image_match22']:checked").val();
		var name_match22=$("input[name='name_match22']:checked").val();
		var gender_match22=$("input[name='gender_match22']:checked").val();
		var school_dress22=$("input[name='school_dress22']:checked").val();
		var school_idCard22=$("input[name='school_idCard22']:checked").val();
		var pre_sem_edu_allow22=$("input[name='previous_semister_edu_allowance22']:checked").val();
		var edu_ot_sch22=$("input[name='education_other_school22']:checked").val();
		var student_abcent22=$("#student_abcent22").val();
		var pre22=$("#previous_semister_total_present22").val();
		var rec_num22=$("#previous_semister_recived_number22").val();
		
		var col23=$("#lc_profile_studentID_three_digit23").val();
		var stu23=$("input[name='classroom_present_student23']:checked").val();
		var image_match23=$("input[name='image_match23']:checked").val();
		var name_match23=$("input[name='name_match23']:checked").val();
		var gender_match23=$("input[name='gender_match23']:checked").val();
		var school_dress23=$("input[name='school_dress23']:checked").val();
		var school_idCard23=$("input[name='school_idCard23']:checked").val();
		var pre_sem_edu_allow23=$("input[name='previous_semister_edu_allowance23']:checked").val();
		var edu_ot_sch23=$("input[name='education_other_school23']:checked").val();
		var student_abcent23=$("#student_abcent23").val();
		var pre23=$("#previous_semister_total_present23").val();
		var rec_num23=$("#previous_semister_recived_number23").val();
		
		var col24=$("#lc_profile_studentID_three_digit24").val();
		var stu24=$("input[name='classroom_present_student24']:checked").val();
		var image_match24=$("input[name='image_match24']:checked").val();
		var name_match24=$("input[name='name_match24']:checked").val();
		var gender_match24=$("input[name='gender_match24']:checked").val();
		var school_dress24=$("input[name='school_dress24']:checked").val();
		var school_idCard24=$("input[name='school_idCard24']:checked").val();
		var pre_sem_edu_allow24=$("input[name='previous_semister_edu_allowance24']:checked").val();
		var edu_ot_sch24=$("input[name='education_other_school24']:checked").val();
		var student_abcent24=$("#student_abcent24").val();
		var pre24=$("#previous_semister_total_present24").val();
		var rec_num24=$("#previous_semister_recived_number24").val();
		
		var col25=$("#lc_profile_studentID_three_digit25").val();
		var stu25=$("input[name='classroom_present_student25']:checked").val();
		var image_match25=$("input[name='image_match25']:checked").val();
		var name_match25=$("input[name='name_match25']:checked").val();
		var gender_match25=$("input[name='gender_match25']:checked").val();
		var school_dress25=$("input[name='school_dress25']:checked").val();
		var school_idCard25=$("input[name='school_idCard25']:checked").val();
		var pre_sem_edu_allow25=$("input[name='previous_semister_edu_allowance25']:checked").val();
		var edu_ot_sch25=$("input[name='education_other_school25']:checked").val();
		var student_abcent25=$("#student_abcent25").val();
		var pre25=$("#previous_semister_total_present25").val();
		var rec_num25=$("#previous_semister_recived_number25").val();
		
		var col26=$("#lc_profile_studentID_three_digit26").val();
		var stu26=$("input[name='classroom_present_student26']:checked").val();
		var image_match26=$("input[name='image_match26']:checked").val();
		var name_match26=$("input[name='name_match26']:checked").val();
		var gender_match26=$("input[name='gender_match26']:checked").val();
		var school_dress26=$("input[name='school_dress26']:checked").val();
		var school_idCard26=$("input[name='school_idCard26']:checked").val();
		var pre_sem_edu_allow26=$("input[name='previous_semister_edu_allowance26']:checked").val();
		var edu_ot_sch26=$("input[name='education_other_school26']:checked").val();
		var student_abcent26=$("#student_abcent26").val();
		var pre26=$("#previous_semister_total_present26").val();
		var rec_num26=$("#previous_semister_recived_number26").val();
		
		var col27=$("#lc_profile_studentID_three_digit27").val();
		var stu27=$("input[name='classroom_present_student27']:checked").val();
		var image_match27=$("input[name='image_match27']:checked").val();
		var name_match27=$("input[name='name_match27']:checked").val();
		var gender_match27=$("input[name='gender_match27']:checked").val();
		var school_dress27=$("input[name='school_dress27']:checked").val();
		var school_idCard27=$("input[name='school_idCard27']:checked").val();
		var pre_sem_edu_allow27=$("input[name='previous_semister_edu_allowance27']:checked").val();
		var edu_ot_sch27=$("input[name='education_other_school27']:checked").val();
		var student_abcent27=$("#student_abcent27").val();
		var pre27=$("#previous_semister_total_present27").val();
		var rec_num27=$("#previous_semister_recived_number27").val();
		
		var col28=$("#lc_profile_studentID_three_digit28").val();
		var stu28=$("input[name='classroom_present_student28']:checked").val();
		var image_match28=$("input[name='image_match28']:checked").val();
		var name_match28=$("input[name='name_match28']:checked").val();
		var gender_match28=$("input[name='gender_match28']:checked").val();
		var school_dress28=$("input[name='school_dress28']:checked").val();
		var school_idCard28=$("input[name='school_idCard28']:checked").val();
		var pre_sem_edu_allow28=$("input[name='previous_semister_edu_allowance28']:checked").val();
		var edu_ot_sch28=$("input[name='education_other_school28']:checked").val();
		var student_abcent28=$("#student_abcent28").val();
		var pre28=$("#previous_semister_total_present28").val();
		var rec_num28=$("#previous_semister_recived_number28").val();
		
		var col29=$("#lc_profile_studentID_three_digit29").val();
		var stu29=$("input[name='classroom_present_student29']:checked").val();
		var image_match29=$("input[name='image_match29']:checked").val();
		var name_match29=$("input[name='name_match29']:checked").val();
		var gender_match29=$("input[name='gender_match29']:checked").val();
		var school_dress29=$("input[name='school_dress29']:checked").val();
		var school_idCard29=$("input[name='school_idCard29']:checked").val();
		var pre_sem_edu_allow29=$("input[name='previous_semister_edu_allowance29']:checked").val();
		var edu_ot_sch29=$("input[name='education_other_school29']:checked").val();
		var student_abcent29=$("#student_abcent29").val();
		var pre29=$("#previous_semister_total_present29").val();
		var rec_num29=$("#previous_semister_recived_number29").val();
		
		var col30=$("#lc_profile_studentID_three_digit30").val();
		var stu30=$("input[name='classroom_present_student30']:checked").val();
		var image_match30=$("input[name='image_match30']:checked").val();
		var name_match30=$("input[name='name_match30']:checked").val();
		var gender_match30=$("input[name='gender_match30']:checked").val();
		var school_dress30=$("input[name='school_dress30']:checked").val();
		var school_idCard30=$("input[name='school_idCard30']:checked").val();
		var pre_sem_edu_allow30=$("input[name='previous_semister_edu_allowance30']:checked").val();
		var edu_ot_sch30=$("input[name='education_other_school30']:checked").val();
		var student_abcent30=$("#student_abcent30").val();
		var pre30=$("#previous_semister_total_present30").val();
		var rec_num30=$("#previous_semister_recived_number30").val();
		
		var col31=$("#lc_profile_studentID_three_digit31").val();
		var stu31=$("input[name='classroom_present_student31']:checked").val();
		var image_match31=$("input[name='image_match31']:checked").val();
		var name_match31=$("input[name='name_match31']:checked").val();
		var gender_match31=$("input[name='gender_match31']:checked").val();
		var school_dress31=$("input[name='school_dress31']:checked").val();
		var school_idCard31=$("input[name='school_idCard31']:checked").val();
		var pre_sem_edu_allow31=$("input[name='previous_semister_edu_allowance31']:checked").val();
		var edu_ot_sch31=$("input[name='education_other_school31']:checked").val();
		var student_abcent31=$("#student_abcent31").val();
		var pre31=$("#previous_semister_total_present31").val();
		var rec_num31=$("#previous_semister_recived_number31").val();
		
		var col32=$("#lc_profile_studentID_three_digit32").val();
		var stu32=$("input[name='classroom_present_student32']:checked").val();
		var image_match32=$("input[name='image_match32']:checked").val();
		var name_match32=$("input[name='name_match32']:checked").val();
		var gender_match32=$("input[name='gender_match32']:checked").val();
		var school_dress32=$("input[name='school_dress32']:checked").val();
		var school_idCard32=$("input[name='school_idCard32']:checked").val();
		var pre_sem_edu_allow32=$("input[name='previous_semister_edu_allowance32']:checked").val();
		var edu_ot_sch32=$("input[name='education_other_school32']:checked").val();
		var student_abcent32=$("#student_abcent32").val();
		var pre32=$("#previous_semister_total_present32").val();
		var rec_num32=$("#previous_semister_recived_number32").val();
		
		var col33=$("#lc_profile_studentID_three_digit33").val();
		var stu33=$("input[name='classroom_present_student33']:checked").val();
		var image_match33=$("input[name='image_match33']:checked").val();
		var name_match33=$("input[name='name_match33']:checked").val();
		var gender_match33=$("input[name='gender_match33']:checked").val();
		var school_dress33=$("input[name='school_dress33']:checked").val();
		var school_idCard33=$("input[name='school_idCard33']:checked").val();
		var pre_sem_edu_allow33=$("input[name='previous_semister_edu_allowance33']:checked").val();
		var edu_ot_sch33=$("input[name='education_other_school33']:checked").val();
		var student_abcent33=$("#student_abcent33").val();
		var pre33=$("#previous_semister_total_present33").val();
		var rec_num33=$("#previous_semister_recived_number33").val();
		
		var col34=$("#lc_profile_studentID_three_digit34").val();
		var stu34=$("input[name='classroom_present_student34']:checked").val();
		var image_match34=$("input[name='image_match34']:checked").val();
		var name_match34=$("input[name='name_match34']:checked").val();
		var gender_match34=$("input[name='gender_match34']:checked").val();
		var school_dress34=$("input[name='school_dress34']:checked").val();
		var school_idCard34=$("input[name='school_idCard34']:checked").val();
		var pre_sem_edu_allow34=$("input[name='previous_semister_edu_allowance34']:checked").val();
		var edu_ot_sch34=$("input[name='education_other_school34']:checked").val();
		var student_abcent34=$("#student_abcent34").val();
		var pre34=$("#previous_semister_total_present34").val();
		var rec_num34=$("#previous_semister_recived_number34").val();
		
		var col35=$("#lc_profile_studentID_three_digit35").val();
		var stu35=$("input[name='classroom_present_student35']:checked").val();
		var image_match35=$("input[name='image_match35']:checked").val();
		var name_match35=$("input[name='name_match35']:checked").val();
		var gender_match35=$("input[name='gender_match35']:checked").val();
		var school_dress35=$("input[name='school_dress35']:checked").val();
		var school_idCard35=$("input[name='school_idCard35']:checked").val();
		var pre_sem_edu_allow35=$("input[name='previous_semister_edu_allowance35']:checked").val();
		var edu_ot_sch35=$("input[name='education_other_school35']:checked").val();//change
		var student_abcent35=$("#student_abcent35").val();
		var pre35=$("#previous_semister_total_present35").val();
		var rec_num35=$("#previous_semister_recived_number35").val();//change
		
		var lc_name_ot_match_stu=$("#lc_profile_name_not_match_student").val();//change
		var lc_image_not_match_st=$("#lc_profile_image_not_match_student").val();//change
		var pre_semi_exam_gov_pri_sch=$("#previous_semister_exam_gov_primary_school").val();//change
		var pre_sem_exam_reg_stu=$("#previous_semister_exam_register_student").val();//change
		var marriage_abandonment_boys=$("#marriage_abandonment_boys").val();
		var marriage_abandonment_girls=$("#marriage_abandonment_girls").val();
		var marriage_abandonment_total=$("#marriage_abandonment_total").val();
		
			
			ruralData4A="||v_LC_reg_tea_pre="+v_LC_reg_tea_pre+"||reg_tea_inst_tea_name="+reg_tea_inst_tea_name+"||reg_tea_inst_tea_type="+reg_tea_inst_tea_type+"||tea_rep_appo_office="+tea_rep_appo_office+"||v_dis_id_card_tea="+v_dis_id_card_tea+"||dis_tea_house_to_sch="+dis_tea_house_to_sch+"||pre_semr_schl_tea_trai="+pre_semr_schl_tea_trai+"||cls_atte_stu="+cls_atte_stu+"||v_day_atte_stu_boys="+v_day_atte_stu_boys+"||v_day_atte_stu_girls="+v_day_atte_stu_girls+"||v_day_atte_stu_total="+v_day_atte_stu_total+"||pre_sem_total_sch="+pre_sem_total_sch+"||col1="+col1+"||stu1="+stu1+"||image_match1="+image_match1+"||name_match1="+name_match1+"||gender_match1="+gender_match1+"||school_dress1="+school_dress1+"||school_idCard1="+school_idCard1+"||pre_sem_edu_allow1="+pre_sem_edu_allow1+"||edu_ot_sch1="+edu_ot_sch1+"||student_abcent1="+student_abcent1+"||pre1="+pre1+"||rec_num1="+rec_num1+"||col2="+col2+"||stu2="+stu2+"||image_match2="+image_match2+"||name_match2="+name_match2+"||gender_match2="+gender_match2+"||school_dress2="+school_dress2+"||school_idCard2="+school_idCard2+"||pre_sem_edu_allow2="+pre_sem_edu_allow2+"||edu_ot_sch2="+edu_ot_sch2+"||student_abcent2="+student_abcent2+"||pre2="+pre2+"||rec_num2="+rec_num2+"||col3="+col3+"||stu3="+stu3+"||image_match3="+image_match3+"||name_match3="+name_match3+"||gender_match3="+gender_match3+"||school_dress3="+school_dress3+"||school_idCard3="+school_idCard3+"||pre_sem_edu_allow3="+pre_sem_edu_allow3+"||edu_ot_sch3="+edu_ot_sch3+"||student_abcent3="+student_abcent3+"||pre3="+pre3+"||rec_num3="+rec_num3+"||col4="+col4+"||stu4="+stu4+"||image_match4="+image_match4+"||name_match4="+name_match4+"||gender_match4="+gender_match4+"||school_dress4="+school_dress4+"||school_idCard4="+school_idCard4+"||pre_sem_edu_allow4="+pre_sem_edu_allow4+"||edu_ot_sch4="+edu_ot_sch4+"||student_abcent4="+student_abcent4+"||pre4="+pre4+"||rec_num4="+rec_num4+"||col5="+col5+"||stu5="+stu5+"||image_match5="+image_match5+"||name_match5="+name_match5+"||gender_match5="+gender_match5+"||school_dress5="+school_dress5+"||school_idCard5="+school_idCard5+"||pre_sem_edu_allow5="+pre_sem_edu_allow5+"||edu_ot_sch5="+edu_ot_sch5+"||student_abcent5="+student_abcent5+"||pre5="+pre5+"||rec_num5="+rec_num5+"||col6="+col6+"||stu6="+stu6+"||image_match6="+image_match6+"||name_match6="+name_match6+"||gender_match6="+gender_match6+"||school_dress6="+school_dress6+"||school_idCard6="+school_idCard6+"||pre_sem_edu_allow6="+pre_sem_edu_allow6+"||edu_ot_sch6="+edu_ot_sch6+"||student_abcent6="+student_abcent6+"||pre6="+pre6+"||rec_num6="+rec_num6+"||col7="+col7+"||stu7="+stu7+"||image_match7="+image_match7+"||name_match7="+name_match7+"||gender_match7="+gender_match7+"||school_dress7="+school_dress7+"||school_idCard7="+school_idCard7+"||pre_sem_edu_allow7="+pre_sem_edu_allow7+"||edu_ot_sch7="+edu_ot_sch7+"||student_abcent7="+student_abcent7+"||pre7="+pre7+"||rec_num7="+rec_num7+"||col8="+col8+"||stu8="+stu8+"||image_match8="+image_match8+"||name_match8="+name_match8+"||gender_match8="+gender_match8+"||school_dress8="+school_dress8+"||school_idCard8="+school_idCard8+"||pre_sem_edu_allow8="+pre_sem_edu_allow8+"||edu_ot_sch8="+edu_ot_sch8+"||student_abcent8="+student_abcent8+"||pre8="+pre8+"||rec_num8="+rec_num8+"||col9="+col9+"||stu9="+stu9+"||image_match9="+image_match9+"||name_match9="+name_match9+"||gender_match9="+gender_match9+"||school_dress9="+school_dress9+"||school_idCard9="+school_idCard9+"||pre_sem_edu_allow9="+pre_sem_edu_allow9+"||edu_ot_sch9="+edu_ot_sch9+"||student_abcent9="+student_abcent9+"||pre9="+pre9+"||rec_num9="+rec_num9+"||col10="+col10+"||stu10="+stu10+"||image_match10="+image_match10+"||name_match10="+name_match10+"||gender_match10="+gender_match10+"||school_dress10="+school_dress10+"||school_idCard10="+school_idCard10+"||pre_sem_edu_allow10="+pre_sem_edu_allow10+"||edu_ot_sch10="+edu_ot_sch10+"||student_abcent10="+student_abcent10+"||pre10="+pre10+"||rec_num10="+rec_num10+"||col11="+col11+"||stu11="+stu11+"||image_match11="+image_match11+"||name_match11="+name_match11+"||gender_match11="+gender_match11+"||school_dress11="+school_dress11+"||school_idCard11="+school_idCard11+"||pre_sem_edu_allow11="+pre_sem_edu_allow11+"||edu_ot_sch11="+edu_ot_sch11+"||student_abcent11="+student_abcent11+"||pre11="+pre11+"||rec_num11="+rec_num11+"||col12="+col12+"||stu12="+stu12+"||image_match12="+image_match12+"||name_match12="+name_match12+"||gender_match12="+gender_match12+"||school_dress12="+school_dress12+"||school_idCard12="+school_idCard12+"||pre_sem_edu_allow12="+pre_sem_edu_allow12+"||edu_ot_sch12="+edu_ot_sch12+"||student_abcent12="+student_abcent12+"||pre12="+pre12+"||rec_num12="+rec_num12+"||col13="+col13+"||stu13="+stu13+"||image_match13="+image_match13+"||name_match13="+name_match13+"||gender_match13="+gender_match13+"||school_dress13="+school_dress13+"||school_idCard13="+school_idCard13+"||pre_sem_edu_allow13="+pre_sem_edu_allow13+"||edu_ot_sch13="+edu_ot_sch13+"||student_abcent13="+student_abcent13+"||pre13="+pre13+"||rec_num13="+rec_num13+"||col14="+col14+"||stu14="+stu14+"||image_match14="+image_match14+"||name_match14="+name_match14+"||gender_match14="+gender_match14+"||school_dress14="+school_dress14+"||school_idCard14="+school_idCard14+"||pre_sem_edu_allow14="+pre_sem_edu_allow14+"||edu_ot_sch14="+edu_ot_sch14+"||student_abcent14="+student_abcent14+"||pre14="+pre14+"||rec_num14="+rec_num14+"||col15="+col15+"||stu15="+stu15+"||image_match15="+image_match15+"||name_match15="+name_match15+"||gender_match15="+gender_match15+"||school_dress15="+school_dress15+"||school_idCard15="+school_idCard15+"||pre_sem_edu_allow15="+pre_sem_edu_allow15+"||edu_ot_sch15="+edu_ot_sch15+"||student_abcent15="+student_abcent15+"||pre15="+pre15+"||rec_num15="+rec_num15+"||col16="+col16+"||stu16="+stu16+"||image_match16="+image_match16+"||name_match16="+name_match16+"||gender_match16="+gender_match16+"||school_dress16="+school_dress16+"||school_idCard16="+school_idCard16+"||pre_sem_edu_allow16="+pre_sem_edu_allow16+"||edu_ot_sch16="+edu_ot_sch16+"||student_abcent16="+student_abcent16+"||pre16="+pre16+"||rec_num16="+rec_num16+"||col17="+col17+"||stu17="+stu17+"||image_match17="+image_match17+"||name_match17="+name_match17+"||gender_match17="+gender_match17+"||school_dress17="+school_dress17+"||school_idCard17="+school_idCard17+"||pre_sem_edu_allow17="+pre_sem_edu_allow17+"||edu_ot_sch17="+edu_ot_sch17+"||student_abcent17="+student_abcent17+"||pre17="+pre17+"||rec_num17="+rec_num17;
			
			ruralData4B="||col18="+col18+"||stu18="+stu18+"||image_match18="+image_match18+"||name_match18="+name_match18+"||gender_match18="+gender_match18+"||school_dress18="+school_dress18+"||school_idCard18="+school_idCard18+"||pre_sem_edu_allow18="+pre_sem_edu_allow18+"||edu_ot_sch18="+edu_ot_sch18+"||student_abcent18="+student_abcent18+"||pre18="+pre18+"||rec_num18="+rec_num18+"||col19="+col19+"||stu19="+stu19+"||image_match19="+image_match19+"||name_match19="+name_match19+"||gender_match19="+gender_match19+"||school_dress19="+school_dress19+"||school_idCard19="+school_idCard19+"||pre_sem_edu_allow19="+pre_sem_edu_allow19+"||edu_ot_sch19="+edu_ot_sch19+"||student_abcent19="+student_abcent19+"||pre19="+pre19+"||rec_num19="+rec_num19+"||col20="+col20+"||stu20="+stu20+"||image_match20="+image_match20+"||name_match20="+name_match20+"||gender_match20="+gender_match20+"||school_dress20="+school_dress20+"||school_idCard20="+school_idCard20+"||pre_sem_edu_allow20="+pre_sem_edu_allow20+"||edu_ot_sch20="+edu_ot_sch20+"||student_abcent20="+student_abcent20+"||pre20="+pre20+"||rec_num20="+rec_num20+"||col21="+col21+"||stu21="+stu21+"||image_match21="+image_match21+"||name_match21="+name_match21+"||gender_match21="+gender_match21+"||school_dress21="+school_dress21+"||school_idCard21="+school_idCard21+"||pre_sem_edu_allow21="+pre_sem_edu_allow21+"||edu_ot_sch21="+edu_ot_sch21+"||student_abcent21="+student_abcent21+"||pre21="+pre21+"||rec_num21="+rec_num21+"||col22="+col22+"||stu22="+stu22+"||image_match22="+image_match22+"||name_match22="+name_match22+"||gender_match22="+gender_match22+"||school_dress22="+school_dress22+"||school_idCard22="+school_idCard22+"||pre_sem_edu_allow22="+pre_sem_edu_allow22+"||edu_ot_sch22="+edu_ot_sch22+"||student_abcent22="+student_abcent22+"||pre22="+pre22+"||rec_num22="+rec_num22+"||col23="+col23+"||stu23="+stu23+"||image_match23="+image_match23+"||name_match23="+name_match23+"||gender_match23="+gender_match23+"||school_dress23="+school_dress23+"||school_idCard23="+school_idCard23+"||pre_sem_edu_allow23="+pre_sem_edu_allow23+"||edu_ot_sch23="+edu_ot_sch23+"||student_abcent23="+student_abcent23+"||pre23="+pre23+"||rec_num23="+rec_num23+"||col24="+col24+"||stu24="+stu24+"||image_match24="+image_match24+"||name_match24="+name_match24+"||gender_match24="+gender_match24+"||school_dress24="+school_dress24+"||school_idCard24="+school_idCard24+"||pre_sem_edu_allow24="+pre_sem_edu_allow24+"||edu_ot_sch24="+edu_ot_sch24+"||student_abcent24="+student_abcent24+"||pre24="+pre24+"||rec_num24="+rec_num24+"||col25="+col25+"||stu25="+stu25+"||image_match25="+image_match25+"||name_match25="+name_match25+"||gender_match25="+gender_match25+"||school_dress25="+school_dress25+"||school_idCard25="+school_idCard25+"||pre_sem_edu_allow25="+pre_sem_edu_allow25+"||edu_ot_sch25="+edu_ot_sch25+"||student_abcent25="+student_abcent25+"||pre25="+pre25+"||rec_num25="+rec_num25+"||col26="+col26+"||stu26="+stu26+"||image_match26="+image_match26+"||name_match26="+name_match26+"||gender_match26="+gender_match26+"||school_dress26="+school_dress26+"||school_idCard26="+school_idCard26+"||pre_sem_edu_allow26="+pre_sem_edu_allow26+"||edu_ot_sch26="+edu_ot_sch26+"||student_abcent26="+student_abcent26+"||pre26="+pre26+"||rec_num26="+rec_num26+"||col27="+col27+"||stu27="+stu27+"||image_match27="+image_match27+"||name_match27="+name_match27+"||gender_match27="+gender_match27+"||school_dress27="+school_dress27+"||school_idCard27="+school_idCard27+"||pre_sem_edu_allow27="+pre_sem_edu_allow27+"||edu_ot_sch27="+edu_ot_sch27+"||student_abcent27="+student_abcent27+"||pre27="+pre27+"||rec_num27="+rec_num27+"||col28="+col28+"||stu28="+stu28+"||image_match28="+image_match28+"||name_match28="+name_match28+"||gender_match28="+gender_match28+"||school_dress28="+school_dress28+"||school_idCard28="+school_idCard28+"||pre_sem_edu_allow28="+pre_sem_edu_allow28+"||edu_ot_sch28="+edu_ot_sch28+"||student_abcent28="+student_abcent28+"||pre28="+pre28+"||rec_num28="+rec_num28+"||col29="+col29+"||stu29="+stu29+"||image_match29="+image_match29+"||name_match29="+name_match29+"||gender_match29="+gender_match29+"||school_dress29="+school_dress29+"||school_idCard29="+school_idCard29+"||pre_sem_edu_allow29="+pre_sem_edu_allow29+"||edu_ot_sch29="+edu_ot_sch29+"||student_abcent29="+student_abcent29+"||pre29="+pre29+"||rec_num29="+rec_num29+"||col30="+col30+"||stu30="+stu30+"||image_match30="+image_match30+"||name_match30="+name_match30+"||gender_match30="+gender_match30+"||school_dress30="+school_dress30+"||school_idCard30="+school_idCard30+"||pre_sem_edu_allow30="+pre_sem_edu_allow30+"||edu_ot_sch30="+edu_ot_sch30+"||student_abcent30="+student_abcent30+"||pre30="+pre30+"||rec_num30="+rec_num30+"||col31="+col31+"||stu31="+stu31+"||image_match31="+image_match31+"||name_match31="+name_match31+"||gender_match31="+gender_match31+"||school_dress31="+school_dress31+"||school_idCard31="+school_idCard31+"||pre_sem_edu_allow31="+pre_sem_edu_allow31+"||edu_ot_sch31="+edu_ot_sch31+"||student_abcent31="+student_abcent31+"||pre31="+pre31+"||rec_num31="+rec_num31+"||col32="+col32+"||stu32="+stu32+"||image_match32="+image_match32+"||name_match32="+name_match32+"||gender_match32="+gender_match32+"||school_dress32="+school_dress32+"||school_idCard32="+school_idCard32+"||pre_sem_edu_allow32="+pre_sem_edu_allow32+"||edu_ot_sch32="+edu_ot_sch32+"||student_abcent32="+student_abcent32+"||pre32="+pre32+"||rec_num32="+rec_num32+"||col33="+col33+"||stu33="+stu33+"||image_match33="+image_match33+"||name_match33="+name_match33+"||gender_match33="+gender_match33+"||school_dress33="+school_dress33+"||school_idCard33="+school_idCard33+"||pre_sem_edu_allow33="+pre_sem_edu_allow33+"||edu_ot_sch33="+edu_ot_sch33+"||student_abcent33="+student_abcent33+"||pre33="+pre33+"||rec_num33="+rec_num33+"||col34="+col34+"||stu34="+stu34+"||image_match34="+image_match34+"||name_match34="+name_match34+"||gender_match34="+gender_match34+"||school_dress34="+school_dress34+"||school_idCard34="+school_idCard34+"||pre_sem_edu_allow34="+pre_sem_edu_allow34+"||edu_ot_sch34="+edu_ot_sch34+"||student_abcent34="+student_abcent34+"||pre34="+pre34+"||rec_num34="+rec_num34+"||col35="+col35+"||stu35="+stu35+"||image_match35="+image_match35+"||name_match35="+name_match35+"||gender_match35="+gender_match35+"||school_dress35="+school_dress35+"||school_idCard35="+school_idCard35+"||pre_sem_edu_allow35="+pre_sem_edu_allow35+"||edu_ot_sch35="+edu_ot_sch35+"||student_abcent35="+student_abcent35+"||pre35="+pre35+"||rec_num35="+rec_num35+"||lc_name_ot_match_stu="+lc_name_ot_match_stu+"||lc_image_not_match_st="+lc_image_not_match_st+"||pre_semi_exam_gov_pri_sch="+pre_semi_exam_gov_pri_sch+"||pre_sem_exam_reg_stu="+pre_sem_exam_reg_stu+"||marriage_abandonment_boys="+marriage_abandonment_boys+"||marriage_abandonment_girls="+marriage_abandonment_girls+"||marriage_abandonment_total="+marriage_abandonment_total;
			
			//alert(ruralData4);
			
			$(".errorChk").text("");
							
			 url="#page6";	
			
			$.mobile.navigate(url);
			
		  //} 
	
	};
	
	
function ruralData5Next(){
			
		var headmaster_name=$("#headmaster_name").val();
		var headmaster_mobileNo=$("#headmaster_mobileNo").val();
		var headmaster_opinion=$("#headmaster_opinion").val();
		var mobile_pool_teacher_name=$("#mobile_pool_teacher_name").val();
		var mobile_pool_teacher_mobileNo=$("#mobile_pool_teacher_mobileNo").val();
		var mobile_pool_teacher_opinion=$("#mobile_pool_teacher_opinion").val();
		var school_teacher_name=$("#school_teacher_name").val();
		var school_teacher_mobileNo=$("#school_teacher_mobileNo").val();
		var school_teacher_opinion=$("#school_teacher_opinion").val();
		
		
			ruralData5="||headmaster_name="+headmaster_name+"||headmaster_mobileNo="+headmaster_mobileNo+"||headmaster_opinion="+headmaster_opinion+"||mobile_pool_teacher_name="+mobile_pool_teacher_name+"||mobile_pool_teacher_mobileNo="+mobile_pool_teacher_mobileNo+"||mobile_pool_teacher_opinion="+mobile_pool_teacher_opinion+"||school_teacher_name="+school_teacher_name+"||school_teacher_mobileNo="+school_teacher_mobileNo+"||school_teacher_opinion="+school_teacher_opinion;
			
			//alert(ruralData5);
			
			$(".errorChk").text("");
							
			 url="#page7";	
			
			$.mobile.navigate(url);
			
		 // } 
	
	};	
	
	
	
		

function ruralDataSubmit(){
		//$("#btn_rural_submit").hide();
		
		var d = new Date();	
		var get_time=d.getTime();		

		
		latitude=$("#ach_lat").val();
		longitude=$("#ach_long").val();
		
		 image1=$("#image1").val();
		 image2=$("#image2").val();
		 image3=$("#image3").val();
		 image4=$("#image4").val();
		 image5=$("#image5").val();
		
		
		if (latitude==undefined || latitude==''){
			latitude=0;
			}
		if (longitude==undefined || longitude==''){
			longitude=0;
			}
		//---------------
		//image1 start	
		//------------------------------------image 1					
		//imagePath1A="test"					
		if (imagePath1A!=""){							
			$(".errorChk").text("Syncing photo 1..");
			imageName = localStorage.mobile_no+"_"+get_time+".jpg";					
			uploadPhotoAch(imagePath1A, imageName);						
		}
	
		//syncData();		
	}

function getAchivementImage1() {
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true});		
}

function onSuccessA(imageURI) {		
    var image = document.getElementById('myImageA');
    image.src = imageURI;
	imagePath1A = imageURI;	
	$("#image1").val(imagePath1A);
	
}

function onFailA(message) {
	imagePath1A="";
    alert('Failed because: ' + message);
}

function uploadPhotoAch(imageURI, imageName) { 	
	//winAchInfoPmt();
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
	
	options.chunkedMode = false;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://107.167.187.177/lged_image/syncmobile_lged/fileUploaderLged/"),winAchInfo,onfail,options);
	
}
//image1 end

//-----------------------image 2
function winAchInfo(r) {	
	//$(".errorChk").text('Image 1 upload Successful. Syncing image 2...');
	
	var d = new Date();	
	var get_time=d.getTime();
		
	//imagePath2A="test2"
	if (imagePath2A!=""){							
		$(".errorChk").text("Syncing photo 2..");
		imageName2 = localStorage.mobile_no+"_"+get_time+".jpg";
				
		uploadPhoto2Ach(imagePath2A, imageName2);
		//$("#btn_rural_submit").show();		
	}
	
}

function onfail(r) {
	$(".errorChk").text('File upload Failed. Please check internet connection.');
	$("#btn_rural_submit").show();
}


function getAchivementImage2() { 
	navigator.camera.getPicture(onSuccess2A, onFail2A, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });		
}

function onSuccess2A(imageURI) {	
    var image = document.getElementById('myImageB');
    image.src = imageURI;
	imagePath2A = imageURI;	
	$("#image2").val(imagePath2A);
	
}

function onFail2A(message) { 
	imagePath2A="";
    alert('Failed because: ' + message);
}


function uploadPhoto2Ach(imageURI, imageName2) { 	
	//winComInfo2();
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName2;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
	
	options.chunkedMode = false;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://107.167.187.177/lged_image/syncmobile_lged/fileUploaderLged/"),winComInfo2,onfail2,options);
	
}

//-----------------------image 3
function winComInfo2(r) {	
	//$(".errorChk").text('Image 2 upload successfull. Syncing image 3...');
	
	var d = new Date();	
	var get_time=d.getTime();
		
	//imagePath3A="test3"
	if (imagePath3A!=""){							
		$(".errorChk").text("Syncing photo 3..");
		imageName3 = localStorage.mobile_no+"_"+get_time+".jpg";
				
		uploadPhoto3Ach(imagePath3A, imageName3);
		//$("#btn_rural_submit").show();		
	}
	
}

function onfail2(r) {
	$(".errorChk").text('File upload Failed. Please check internet connection.');
	$("#btn_rural_submit").show();
}


function getAchivementImage3() { 
	navigator.camera.getPicture(onSuccess3A, onFail3A, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });		
}

function onSuccess3A(imageURI) {	
    var image = document.getElementById('myImageC');
    image.src = imageURI;
	imagePath3A = imageURI;	
	$("#image3").val(imagePath3A);
	
}

function onFail3A(message) { 
	imagePath3A="";
    alert('Failed because: ' + message);
}


function uploadPhoto3Ach(imageURI, imageName3) { 	
	//winComInfo2();
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName3;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
	
	options.chunkedMode = false;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://107.167.187.177/lged_image/syncmobile_lged/fileUploaderLged/"),winComInfo3,onfail3,options);
	
}

//-----------------------image 4
function winComInfo3(r) {	
	//$(".errorChk").text('Image 3 upload successfull. Syncing image 4 ...');
	
	var d = new Date();	
	var get_time=d.getTime();
		
	//imagePath4A="test4"
	if (imagePath4A!=""){							
		$(".errorChk").text("Syncing photo 4..");
		imageName4 = localStorage.mobile_no+"_"+get_time+".jpg";
				
		uploadPhoto4Ach(imagePath4A, imageName4);
		//$("#btn_rural_submit").show();		
	}
	
}

function onfail3(r) {
	$(".errorChk").text('File upload Failed. Please check internet connection.');
	$("#btn_rural_submit").show();
}


function getAchivementImage4() { 
	navigator.camera.getPicture(onSuccess4A, onFail4A, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });		
}

function onSuccess4A(imageURI) {	
    var image = document.getElementById('myImageD');
    image.src = imageURI;
	imagePath4A = imageURI;	
	$("#image4").val(imagePath4A);
	
}

function onFail4A(message) { 
	imagePath4A="";
    alert('Failed because: ' + message);
}


function uploadPhoto4Ach(imageURI, imageName4) { 	
	//winComInfo2();
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName4;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
	
	options.chunkedMode = false;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://107.167.187.177/lged_image/syncmobile_lged/fileUploaderLged/"),winComInfo4,onfail4,options);
	
}

//-----------------------image 5
function winComInfo4(r) {	
	//$(".errorChk").text('Image 4 upload successfull. Syncing image 5 ...');
	
	var d = new Date();	
	var get_time=d.getTime();
		
	//imagePath5A="test5"
	if (imagePath5A!=""){							
		$(".errorChk").text("Syncing photo 5..");
		imageName5 = localStorage.mobile_no+"_"+get_time+".jpg";
				
		uploadPhoto5Ach(imagePath5A, imageName5);
		//$("#btn_rural_submit").show();		
	}
	
}

function onfail4(r) {
	$(".errorChk").text('File upload Failed. Please check internet connection.');
	$("#btn_rural_submit").show();
}


function getAchivementImage5() { 
	navigator.camera.getPicture(onSuccess5A, onFail5A, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });		
}

function onSuccess5A(imageURI) {	
    var image = document.getElementById('myImageE');
    image.src = imageURI;
	imagePath5A = imageURI;	
	$("#image5").val(imagePath5A);
	
}

function onFail5A(message) { 
	imagePath5A="";
    alert('Failed because: ' + message);
}


function uploadPhoto5Ach(imageURI, imageName5) { 	
	//winComInfo2();
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName5;
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
	
	options.chunkedMode = false;

    var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://107.167.187.177/lged_image/syncmobile_lged/fileUploaderLged/"),winComInfo5,onfail5,options);
	
}

function winComInfo5(r) {
	$(".errorChk").text('Image 5 upload successfull. Syncing Data ...');
	syncData();
}

function onfail5(r) {
	$("#errorChk").text('File upload Failed. Syncing Data...');
	syncData();
}


function syncData(){	
			var school_id=$("#school_id").val();
			
			//alert(apipath+"rural_data_submit?cid=LGED&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+'&school_id='+school_id+'&image1='+imageName+'&image2='+imageName2+'&image3='+imageName3+'&image4='+imageName4+'&image5='+imageName5+'&latitude='+latitude+'&longitude='+longitude+"&ruralData1="+ruralData1+"&ruralData2="+ruralData2+"&ruralData3="+ruralData3+"&ruralData5="+ruralData5);
			$.ajax({
					type: 'POST',
					url:apipath+"rural_data_submit?cid=LGED&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+'&school_id='+school_id+'&image1='+imageName+'&image2='+imageName2+'&image3='+imageName3+'&image4='+imageName4+'&image5='+imageName5+'&latitude='+latitude+'&longitude='+longitude+"&ruralData1="+encodeURIComponent(ruralData1)+"&ruralData2="+encodeURIComponent(ruralData2)+"&ruralData3="+encodeURIComponent(ruralData3)+"&ruralData5="+encodeURIComponent(ruralData5),
					
					success: function(result) {
					   if(result!=''){
						   syncData_2(result)
						   }
					   
					   }});
						
		}

function syncData_2(sl){	
			var school_id=$("#school_id").val();
			//alert(apipath+'rural_data_submit_2?&sl='+sl+'&school_id='+school_id+'&tempText='+encodeURIComponent(ruralData4A));
			$.ajax({
					type: 'POST',
					url:apipath+'rural_data_submit_2?&sl='+sl+'&school_id='+school_id+'&tempText='+encodeURIComponent(ruralData4A),
					   
					   success: function(result1) {
					   if(result1!=''){
						   syncData_3(result1)
						   }
					   
					   }});

}


function syncData_3(sl){	
			var school_id=$("#school_id").val();
			//alert(apipath+'rural_data_submit_3?&sl='+sl+'&school_id='+school_id+'&tempText2='+encodeURIComponent(ruralData4B));
			$.ajax({
					type: 'POST',
					url:apipath+'rural_data_submit_3?&sl='+sl+'&school_id='+school_id+'&tempText2='+encodeURIComponent(ruralData4B),
					   
					   success: function(result) {
						
						if(result=='Success'){							
							
							//--------------
							$("#division").val("");
							$("#district").val("");
							$("#upzila").val("");
							$("#ff_id").val("");
							$("#school_id").val("");
							$("#school_name").val("");
							
							
							$(".sucChk").text('Successfully Submitted');
							$(".errorChk").text("");
							$("#btn_rural_submit").hide();						
						}else{
							$(".errorChk").text('Unauthorized Access');																	
							$("#btn_rural_submit").show();
							}
							
					   }//end result
			});//end ajax

}


function exit() {
navigator.app.exitApp();
//navigator.device.exitApp();
}
