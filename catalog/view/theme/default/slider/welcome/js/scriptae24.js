var footerTime;
$(document).ready(function($) {
  //remove error when out off focus
  $(".required").parents("div").click(function(){ 
    if($(".required").hasClass('error'))$(".required").removeClass("error");
  });
  //end
/* Cross browser placeholder for input,textarea,and password */
  var input = document.createElement("input");
    if(('placeholder' in input)==false) { 
		$('[placeholder]').focus(function() {
			var i = $(this);
			if(i.val() == i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type='password';
				}			
			}
		}).blur(function() {
			var i = $(this);	
			if(i.val() == '' || i.val() == i.attr('placeholder')) {
				if(this.type=='password') {
					i.addClass('password');
					this.type='text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var i = $(this);
				if(i.val() == i.attr('placeholder'))
					i.val('');
			})
		});
	}
  /* / Cross browser placeholder for input,textarea,and password */
	//put footer at the bottom if have small content
	footerTime = setTimeout(function(){
		putFooterBottom();
	},2000);
	//fix select style
	fix_select();
	//fix input style
	fix_input();
	//footer fix
	  putFooterBottom();
	$(window).scroll(function () {
	  putFooterBottom();
	});
	$(window).resize(function () {
	  putFooterBottom();
	});	
	$("#prevslide").click(function () {
	  putFooterBottom();
	});	
	$("#nextslide").click(function () {
	  putFooterBottom();
	});	
	//fix select style
	fix_select();
	//fix input style
	fix_input();
	
	//trigger popup
	$(".popup_trigger").click(function (event) {
	  var popup_content = $(this).attr("popup_content");
	  if( typeof popup_content == "undefined")
      popup_content = $(this).attr('data-popup-content');
	  
	  if($(".popup").hasClass("active")==false){
	    $(".popup#"+popup_content).addClass("active");
	  }
	  $(".popup.active").fadeOut(function() {
	    $(".popup.active").removeClass("active");
	    $(".popup#"+popup_content).fadeIn();
	    $(".popup#"+popup_content).addClass("active");
	  });
	  $("body").css("overflow","auto");
	});
	//End trigger popup
	
	$(".popup .popup_wrap").click(function (event) {
	 event.stopPropagation();
	});
	$(".popup").click(function () {
	  $(".popup").fadeOut();
	  $("body").css("overflow","auto");
	  $(".popup").removeClass("active");
	  $(".required").removeClass("error");
	  $(".login_notification").hide();
	});
	$(".popup_close").click(function () {
	  $(".popup").fadeOut();
	  $("body").css("overflow","auto");
	  $(".popup").removeClass("active");
	  $(".required").removeClass("error");
	  $(".login_notification").hide();
	});
	$('.required_trigger').click(function(){
		if(!check_form($(this))) return false;
	});
	
	$('#code_form').keydown(function(e) {
	  var code = e.keyCode || e.which; 
	  if (code  == 13) {     
	    $("#show_register_welcome").click();
	    return false;
	  }
	});

	$("#show_register_welcome, #show_register_welcome_m").click(function (event) {
		var code=$("#registration_code").val();
		if(code==""){
			$("#notif_code").parents(".notification_area").show();			
			$("#notif_code").html('Please Insert Your Code');
		}
		else{
			$.ajax({
				type: "POST",
				url: base_url+'registrationwithcode/check',
				data:{code:code},
				dataType :'json',
				success: function(response){				
					if(response.message == 'success'){
						$('#invite_code').val(response.code);
						if($("#show_register_welcome").is(":visible")==true){
							$("#show_sign_up").click();
						}else if($("#code_link_m").is(":visible")==true){
							$("#code_form").submit();
						}
					}else{
			            $("#notif_code").parents(".notification_area").show();	
						$("#notif_code").html('Invalid Code');
					}
				}
					
				
			});	
		}
	});

	var code = getParameterByName("c");
	if(code != "")
	{
		if($("#show_register_welcome").is(":visible")==true){
			$("#show_register_welcome").trigger('click');
		}else if($("#code_link_m").is(":visible")==true){
			$("#show_register_welcome_m").trigger('click');
		}
	}

	$("#show_register").click(function (event) {
	    $("#reserve_notif").show();
		var email=$("#email_reserve").val();
		if(email==""){
		    $('.loading').hide();			
			$("#notif_reserve").html('Please insert your email');
		}else if(validate_email(email)==false){		
		    $('.loading').hide();		
			$("#notif_reserve").html('Please enter a valid email address');
		}
		else{
			$.ajax({
				type: "POST",
				url: base_url+'registration/rsvp',
				data:{email:email},
				dataType :'json',
				success: function(response){	
					if(response.message == 'success'){
						top.location = base_url+'welcome/thankyou';
					}else{
					    $('.loading').hide();	
						$("#notif_reserve").html('Please try again');
					}
				}
					
				
			});	
		}
	});
});
//function fix select style
function fix_select(){
	/*select option*/
	if($('select').length > 0) {
	  
	    $('select').each(function(){
	      if($(this).parents().hasClass("select")==false){	
			$(this).wrap('<div class="select" />');
			
			$(this).parent().prepend('<span>' + $(this).children("option").filter(":selected").text() + '</span>');
		  }
			
		});
		$('select').change(function(){
			$(this).prev().text($(this).children("option").filter(":selected").text());
		});
	}
}
//function fix select style
function fix_input(){
	$("input[type='text']").each(function(){
	  if($(this).parents().hasClass("input_wrapper")==false){
		$(this).wrap('<div class="input_wrapper" />');
      }
	});
	$("input[type='password']").each(function(){
	  if($(this).parents().hasClass("input_wrapper")==false){
		$(this).wrap('<div class="input_wrapper" />');
      }
	}); 
	$("textarea").each(function(){
	  if($(this).parents().hasClass("input_wrapper")==false){
		$(this).wrap('<div class="input_wrapper" />');
	  }
	});
}
function check_form(button){
	var state = true;
	button.parents('form').find('.required').each(function(){
		if($(this).is("input,select,textarea")){
		  
		  	if($(this).val() == "") {
				if(!$(this).hasClass('error')){
					if($(this).is("select")){
					  $(this).parents(".select").children().addClass('required error');
					} else {
					  $(this).addClass('error');
					}
				}
				state = false;
			} else {
				if($(this).is("select")){
				  $(this).parents(".select").children().removeClass('required error');
				} else {
				  $(this).removeClass('error');
				}
			}
			$(this).change(function(){
				if($(this).val() == "") {
					if(!$(this).hasClass('error')){
						if($(this).is("select")){
						  $(this).parents(".select").children().addClass('required error');
						} else {
						  $(this).addClass('error');
						}
					}
					state = false;
				} else {
					if($(this).is("select")){
					  $(this).parents(".select").children().removeClass('required error');
					} else {
					  $(this).removeClass('error');
					}
				}
			});
		}
	});
	
	return state;
}

//put footer at the bottom if have small content
function putFooterBottom(){
	var minHeight = parseFloat($('html').height());
	var windowHeight = parseFloat($(window).height());
	if(minHeight < windowHeight) {
		$('.footer').addClass('fixed');
	} else {
		if($('.footer').hasClass('fixed')) $('.footer').removeClass('fixed');
	}
	clearTimeout(footerTime);
}
//end

// Combine from main.js

function number_format(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    var price = x1 + x2;
    if(session_cur =='USD' && price.indexOf('.') === -1)
    {
      var fix_price = price+".00";
    }else {
      var fix_price = price;
    }
    return fix_price;
}

function check_leap_year(year){
	if(year%4 == 0){
		if(year%100 != 0){
			return true;
		}
		else{
			if(year%400 == 0)
				return true;
			else
				return false;
			}
		}
	return false;
}

function number_digits(number) {
    number += '';
    var x = number.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2 + ',-';
}
function login_submit(){
	$("#login_notif").show();
	$("#loader_login").html('<img src="'+base_url+'misc/holiday/img/ajax-loader.gif" />');
	var email=$("#email_login").val();
	var password=$("#password_login").val();
	if(email==""){
		$("#loader_login").html('');	
		$("#notif_login").html('Email must be filled');
		//$("#login_notif").show();
	}
	else if(validate_email(email)==false){			
		$("#loader_login").html('');	
		$("#notif_login").html('Please enter a valid email address');
		//$("#login_notif").show();	
	}
	else if(password==""){			
		$("#loader_login").html('');	
		$("#notif_login").html('Password must be filled');
		//$("#login_notif").show();	
	}
	else{
		$("#notif_login").html('')

		$.ajax({
			type: "POST",
			url: base_url + 'login/process/true',
			data: $("#login_form").serialize(),	
			success: function(temp){				
				if(temp==1){
					if(typeof proceed_checkout == 'undefined'){
						//location.reload();

						if($('#ref').val() != "")
			            {
			            	$("#login_form").attr({'action': $('#ref').val() });
			            	
			            }
			            $("#login_form").submit();
					} else {
						if_login = true;
						$("#btn-book").click();
						show_loading();					
					}//
				}
				else{
					$("#loader_login").html('');	
					$("#notif_login").html('Invalid email and password');
					//alert('login failed');
				}
			}
		});	
	}	
}

function sign_up_submit(){
	
	$("#sign_up_notif").show();	
	$("#loader_get_invite").html('<img src="'+base_url+'/misc/holiday/img/ajax-loader.gif" />');
	var name=$("#name_registration").val();
	var last_name=$("#last_name_registration").val();
	var email=$("#emails_registration").val();
	if(name==""){			
		$("#loader_get_invite").html('');	
		$("#notif_get_invite").html('First name must be filled');
		//$("#sign_up_notif").show();	
	}
	else if(last_name==""){			
		$("#loader_get_invite").html('');	
		$("#notif_get_invite").html('Last name must be filled');
		//$("#sign_up_notif").show();	
	}
	else if(email==""){
		$("#loader_get_invite").html('');	
		$("#notif_get_invite").html('Email must be filled');
		//$("#sign_up_notif").show();
	}
	else if(validate_email(email)==false){			
		$("#loader_get_invite").html('');	
		$("#notif_get_invite").html('Please enter a valid email address');
		//$("#sign_up_notif").show();	
	}
	else{
		$("#notif_get_invite").html('');
		//$("#sign_up_notif").hide();
		$.ajax({
		   type: "POST",
		   url: base_url+'registration/check_email_registered',
		   data: 'email='+email,			  
		   success: function(temp){				
				if(temp==1){	
					//registered
					$("#notif_get_invite").html('Email has been registered');
					//$("#sign_up_notif").show();		
					$("#loader_get_invite").html('');	
				}
				else{
					$("#notif_get_invite").html('');
					//$("#loader_get_invite").html('');		
					$("#register_form").attr('action',base_url+'registration/process');
					$.ajax({
					   type: "POST",
					   url: $("#register_form").attr('action'),
					   data: $("#register_form").serialize(),			  
					   success: function(temp){		
						    if(temp==1){
						    	$("#loader_get_invite").html('');
						    	$("#name_registration").val('');
						    	$("#last_name_registration").val('');
						    	$("#emails_registration").val('');
								$("#show_sign_up_complete").click();
								$("#notif_get_invite").html('Thank you for registering. You should receive a confirmation email soon.');
							}else{
								$("#loader_get_invite").html('');	
								$("#notif_get_invite").html('Email has been registered');
							}
					   }
					});	
				}
		   }
		});	
	}	
}

function sign_up_with_code(){
	$("#sign_up_now_notif").show();	
	$("#loader_sign_up_now").html('<img src="'+base_url+'/misc/holiday/img/ajax-loader.gif" />');
	var name=$("#name").val();
	var last_name=$("#last_name").val();
	var email=$("#emails").val();
	var password=$("#password").val();
	var password2=$("#password2").val();
	if(name==""){			
		$("#loader_sign_up_now").html('');	
		$("#notif_sign_up_now").html('First name must be filled');
		//$("#sign_up_now_notif").show();	
	}
	else if(last_name==""){			
		$("#loader_sign_up_now").html('');	
		$("#notif_sign_up_now").html('Last name must be filled');
		//$("#sign_up_now_notif").show();	
	}
	else if(email==""){
		$("#loader_sign_up_now").html('');	
		$("#notif_sign_up_now").html('Email must be filled');
		//$("#sign_up_now_notif").show();
	}
	else if(validate_email(email)==false){			
		$("#loader_sign_up_now").html('');	
		$("#notif_sign_up_now").html('Please enter a valid email address');
		//$("#sign_up_now_notif").show();	
	}
	else if(password==""){			
		$("#loader_sign_up_now").html('');	
		$("#notif_sign_up_now").html('Password must be filled');
		//$("#sign_up_now_notif").show();	
	}
	else if(password2==""){			
		$("#loader_sign_up_now").html('');	
		$("#notif_sign_up_now").html('Confirm Password must be filled');
		//$("#sign_up_now_notif").show();	
	}
	else if(password2!=password){			
		$("#loader_sign_up_now").html('');	
		$("#notif_sign_up_now").html('Password and Confirm Password must be the same value');
		//$("#sign_up_now_notif").show();	
	}
	else if(password.length<6){			
		$("#loader_sign_up_now").html('');	
		$("#notif_sign_up_now").html('Password must be minimum 6 characters');
		//$("#sign_up_now_notif").show();	
	}
	else{
		$("#notif_sign_up_now").html('');
		//$("#sign_up_now_notif").hide();
		$.ajax({
		   type: "POST",
		   url: base_url+'registrationwithcode/check_email_registered',
		   data: 'email='+email,			  
		   success: function(temp){				
				if(temp==1){	
					//registered
					$("#notif_sign_up_now").html('Email has been registered');
					//$("#sign_up_now_notif").show();		
					$("#loader_sign_up_now").html('');	
				}
				else{
					$("#notif_sign_up_now").html('');
					//$("#loader_sign_up_now").html('');		
					$("#register_now_form").attr('action',base_url+'registrationwithcode/process');
					$.ajax({
					   type: "POST",
					   url: $("#register_now_form").attr('action'),
					   data: $("#register_now_form").serialize(),			  
					   success: function(temp){				
							if(temp==1){									
								//alert('Registration Complete, Your now member of bobobobo.com');
								//window.location = base_url+'home';
								if(getParameterByName('r') != "")
								{
									var ref = getParameterByName('r');
									window.location = decodeURIComponent(ref);
								}
								else
								{
									window.location = base_url+'home';
								}
							}
							else{									
								$("#loader_sign_up_now").html('');	
								$("#notif_sign_up_now").html('Code has been used');
							}
					   }
					});	
				}
		   }
		});	
	}	
}

function get_user_password(flag){
	$("#notif_get_password").html('<img src="'+base_url+'/misc/holiday/img/ajax-loader.gif" />');
	var password=$("#new_password1").val();
	var password2=$("#new_password2").val();
	
	if(password==""){			
		$("#notif_get_password").html('Password must be filled');
		//$("#sign_up_now_notif").show();	
	}
	else if(password2==""){			
		$("#notif_get_password").html('Confirm Password must be filled');
		//$("#sign_up_now_notif").show();	
	}
	else if(password2!=password){			
		$("#notif_get_password").html('Password and Confirm Password must be the same value');
		//$("#sign_up_now_notif").show();	
	}
	else if(password.length<6){			
		$("#notif_get_password").html('Password must be minimum 6 characters');
		//$("#sign_up_now_notif").show();	
	}
	else{
		$("#notif_get_password").html('');
		if(flag == 0){
			$("#password_form").attr('action',base_url+'registration/confirm_registration');
		}else{
			$("#password_form").attr('action',base_url+'forgotpassword/new_password');
		}
		//$("#sign_up_now_notif").hide();
		$.ajax({
		   type: "POST",
		   url: $("#password_form").attr('action'),
		   data: $("#password_form").serialize(),		  
		   success: function(temp){				
				if(temp==1){	
					window.location = base_url+'home';
				}
				else{
					$("#notif_get_password").html('Sorry, Please try again');
				}
		   }
		});	
	}	
}

function forgot_submit(){
	
	var email=$("#email_forgot").val();
	if(email==""){
		$("#notif_forgot_password").html('Email must be filled');
	}
	else{
		$("#notif_forgot_password").html('<img src="'+base_url+'/misc/holiday/img/ajax-loader.gif" />');
		//$("#sign_up_notif").hide();
		$.ajax({
		   type: "POST",
		   url: base_url+'forgotpassword/index',
		   data: 'email='+email,			  
		   success: function(temp){	
			    if(temp == 2){
			    	$("#notif_forgot_password").html('We\'re sorry, we cannot find the email address you entered.');
			    }else if(temp == 1){
			    	$("#notif_forgot_password").html('');
			    	$("#show_forgot_complete").click();
			    	//$("#notif_forgot_password").html('An email with instructions to reset your password has been sent to your inbox.');
			    	$("#notif_forgot_password").html('An email with instructions to reset your password has been sent to your email.');
			    	$("#email_forgot").val("");
			    }else{
			    	$("#notif_forgot_password").html('Sorry, please try again because we cannot send email to you.');
			    }
		   }
		});	
	}	
}

$(document).ready(function($) {
	$("#sign_up_btn").click(function(){
		sign_up_submit();
	});
	
	$("#sign_up_now_btn").click(function(){
		sign_up_with_code();
	});
	
	$("#forgot_password_btn").click(function(){
		forgot_submit();
	});
	
	$("#get_password").click(function(){
		get_user_password(0);
	});
	
	$("#get_reset_password").click(function(){
		get_user_password(1);
	});
	
	$(".fbShare").click(function(){		
		var url_to_open=$(this).attr('url');
		var txt=$(this).attr('txt');	
		var width = 900; 	
		var height = 550;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		window.open(url_to_open, "Tweet", 'height=350,width=700,left=' + left + ',top=' + top + ',screenX=' + left + ',screenY=' + top);
		return false;
	});
	
	$(".twShare").click(function(){	
		var url=$(this).attr('url');
		var txt=$(this).attr('txt');		
		var url_to_open='http://twitter.com/share?url=&text='+txt;
		
		
		var width = 900; 	
		var height = 550;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		window.open(url_to_open, "Tweet", 'height=350,width=700,left=' + left + ',top=' + top + ',screenX=' + left + ',screenY=' + top);
		return false;
	});
	
	if($("#login_form").length>0){
		$("#login_btn").click(function(e){
			e.preventDefault();
			login_submit();
		});
		
		$("#email_login").keypress(function(event){
			if(event.which == 13){
				login_submit();
			}	
		});
		$("#password_login").keypress(function(event){
			if(event.which == 13){
				login_submit();
			}	
		});
	}
	
	$("#login_fb_button").click(function(){		
		$("#login_notif").show();
		$("#loader_login").html('<img src="'+base_url+'misc/holiday/img/ajax-loader.gif" />');	
	});
	
    $("#add_to_cart_btn a.button").click(function(){
       
        if( ($(".sku_size").length && !$(".sku_selected").length) || ($("#sku_color").length && $("#sku_color").val() == "" ) ||  ($("#product_qty").length && $("#product_qty").val() == "" ) ){
        	$(this).attr("data-tooltip","Please select your item options");
            return false
        }
        
        
		show_loading();
		sku_id=$("#sku_id").val();
		if(sku_id!=""){
			$.ajax({
				type: "POST",
				url: $("#add_to_cart_form").attr('action'),
				data: $("#add_to_cart_form").serialize(),	
				dataType: 'json',
				success: function(temp){
					switch(temp.status)
					{
					case 1:
						//$("#total_cart_item").html('('+temp.total_item+')');	
						//$("#my_cart_status").html(temp.html);	
						set_panel();
						hide_loading();
						//$(".shoppingcart_status").addClass('open');
					    break;
					case 2:
						hide_loading();
						$('#quantity_error_messages').html('We do not have the additional items you requested');
						$('#popup_message_error').click();
					  break;
					case 3:
						hide_loading();
						$('#quantity_error_messages').html('The item you requested is out of stock');
						$('#popup_message_error').click();
						break;
					case 4:
						hide_loading();
						$('#quantity_error_messages').html('The quantity you requested is not valid');
						$('#popup_message_error').click();
					  break;
					default:
						hide_loading();
						$('#quantity_error_messages').html('The item you requested is out of stock');
						$('#popup_message_error').click();
						break;
					}
					
				}
			});	
		}
		else{
			hide_loading();
			$('#quantity_error_messages').html('The item you requested is not valid');
		}
	});
	
	$("#shipping_address_btn").click(function(){
		if(!check_form($(this))) return false;
		$("#shipping_address_form").submit();	
	});
	$("#save_n_continue_btn").click(function(){
	  if($('input[name="user_address_id"]').is(':checked')==false){
	    $(this).attr("data-tooltip","Please complete your shipping address above");
	    return false;
	  }
	  $("#shipping_address_selection_form").submit();	
	});
	
	//myaccount	
	$("#month").change(function(){
		var month=parseInt($(this).val());
		var year=parseInt($("#year").val());
		if(year>0 && month>0){
			if(month==2){
				if(check_leap_year(year)==true)end_date=30;
				else end_date=29;
				
				$("#date").html('').append('<option value="0">Select Date</option>');
				for(i=1;i<end_date;i++){
					$("#date").append('<option value="'+i+'">'+i+'</option>');	
				}
			}
			else{
				if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)
				end_date=32;
				else
				end_date=31;
				
				$("#date").html('').append('<option value="0">Select Date</option>');
				for(i=1;i<end_date;i++){
					$("#date").append('<option value="'+i+'">'+i+'</option>');	
				}			
			}
		}
		else
			return false;
	});
	
	
	$("#year").change(function(){
		var month=parseInt($("#month").val());
		var year=parseInt($(this).val());
		if(year>0 && month>0){	
			if(month==2){
				if(check_leap_year(year)==true)end_date=30;
				else end_date=29;
				
				$("#date").html('').append('<option value="0">Select Date</option>');	
				for(i=1;i<end_date;i++){
					$("#date").append('<option value="'+i+'">'+i+'</option>');	
				}
			}
			else{
				if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)
				end_date=32;
				else
				end_date=31;
				
				$("#date").html('').append('<option value="0">Select Date</option>');
				for(i=1;i<end_date;i++){
					$("#date").append('<option value="'+i+'">'+i+'</option>');	
				}			
			}
		}
		else 
			return false;
	});
	$("#my_profile_btn").click(function(){
		if(!check_form($(this))) return false;
		$("#my_profile_form").submit();	
	});
	
	$("#change_password_btn").click(function(){
		var old_password=$("#old_password").val();
		var new_password=$("#new_password").val();
		var confirm_new_password=$("#confirm_new_password").val();	
		
		old_password=old_password.toLowerCase();
		new_password=new_password.toLowerCase();
		confirm_new_password=confirm_new_password.toLowerCase();
		
		if(old_password=="" && new_password=="" && confirm_new_password==""){
			$("#notif_change_password").show();
			$("#notif_chg").html('All fields must be filled');
		}
		else if(confirm_new_password!=new_password){
			$("#notif_change_password").show();
			$("#notif_chg").html('New password and confirm new password do not match');
		}
		else if(old_password.length<6){
			$("#notif_change_password").show();
			$("#notif_chg").html('Old password must be minimum 6 characters');
		}
		else if(new_password.length<6){
			$("#notif_change_password").show();
			$("#notif_chg").html('New password must be minimum 6 characters');
		}
		else{
			$("#change_password_form").submit();	
		}
	});
	$('#shipping_content .edit_shipping').click(function(event){
	  event.preventDefault(); 
	$('#shipping_content #shipping_home').hide();
	$('#shipping_content .checkout_content_item_el_box_title').hide();
	$('#shipping_content .checkout_content_item_el_box_ship').hide();
	
	$.ajax({
			dataType: "json",
			type: "POST",
			url: base_url+'user/get_address/'+$(this).attr('rel'),
			success: function(data){
				$("#shipping_edit_form #id").val(data.id);
				$("#shipping_edit_form #first_name").val(data.first_name);
				$("#shipping_edit_form #last_name").val(data.last_name);
				$("#shipping_edit_form #street_address").val(data.address);
				$("#shipping_edit_form #street_address_2").val(data.address_2);
				$("#shipping_edit_form #city").val(data.city);
				$("#shipping_edit_form #state_region").val(data.state_region);
				$("#shipping_edit_form #postal_code").val(data.postal_code);
				$("#shipping_edit_form #phone").val(data.phone);
				
				if(data.default_address==1){
					$("#shipping_edit_form #default_shipping").attr('checked','checked');
				}
				
				if(data.html != ''){
					$("#shipping_edit_form #address_state_region").html(data.html);
				}
				if(data.html2 != ''){
					$("#shipping_edit_form #address_country").html(data.html2);
				}
				fix_select();				
			}
		});	 
		
	$('#shipping_content #shipping_edit_form').slideToggle('slow');
	$('#shipping_content #shipping_form').hide();
	});
	
	
	$('#myaccount_myaddressbook .edit_address').click(function(event){
	  event.preventDefault(); 
	$('#myaccount_myaddressbook .myaccount_content_item_el_box_title').hide();
	$('#myaccount_myaddressbook .myaccount_content_item_el_box_address').hide();
	
	$.ajax({
		dataType: "json",
		type: "POST",
		url: base_url+'user/get_address/'+$(this).attr('rel'),
		success: function(data){
			$("#shipping_address_form_edit #id").val(data.id);
			$("#shipping_address_form_edit #first_name").val(data.first_name);
			$("#shipping_address_form_edit #last_name").val(data.last_name);
			$("#shipping_address_form_edit #street_address").val(data.address);
			$("#shipping_address_form_edit #street_address_2").val(data.address_2);
			$("#shipping_address_form_edit #city").val(data.city);
			$("#shipping_address_form_edit #state_region").val(data.state_region);
			$("#shipping_address_form_edit #postal_code").val(data.postal_code);
			$("#shipping_address_form_edit #phone").val(data.phone);
			if(data.default_address==1){
				$("#shipping_address_form_edit #default_shipping").attr('checked','checked');
			}
			
			$("#shipping_address_form_edit #country_"+data.country).attr('selected','selected');
			if(data.html != ''){
				$("#shipping_address_form_edit #address_state_region").html(data.html);
			}
			if(data.html2 != ''){
				$("#shipping_address_form_edit #address_country").html(data.html2);
			}
			fix_select();
		}
	});		
	$('#myaccount_myaddressbook #addressbook_edit_form').slideToggle('slow');
	});
	
	
	
	$("#shipping_address_edit_btn").click(function(){
		if(!check_form($(this))) return false;
		$("#shipping_address_form_edit").submit();	
	});
	
	
	$("#save_n_continue_btn_payment").click(function(){
		$("#payment_selection_form").submit();	
	});
	
	$("#name_asc").click(function(){
		$("#order_type").val('ASC');
		$("#order_by").val('name');
		$("#filtering_form").submit();
	});
	
	$("#name_desc").click(function(){
		$("#order_type").val('DESC');
		$("#order_by").val('name');
		$("#filtering_form").submit();
	});
	
	$("#price_high").click(function(){
		$("#order_type").val('DESC');
		$("#order_by").val('price');
		$("#filtering_form").submit();
	});
	
	$("#price_low").click(function(){
		$("#order_type").val('ASC');
		$("#order_by").val('price');
		$("#filtering_form").submit();
	});
	
	
	$("#newest").click(function(){
		$("#order_type").val('DESC');
		$("#order_by").val('product_id');
		$("#filtering_form").submit();
	});
	
	$("#oldest").click(function(){
		$("#order_type").val('ASC');
		$("#order_by").val('product_id');
		$("#filtering_form").submit();
	});
	
	$("#wish_list_link").click(function(){
		window.location=base_url+'my_account/go_to_wish_list';
	});
	
	$(".wishlist_btn").live('click',function(){
		var status="";
        var img=$(this).attr('image');
        if($(this).attr('type')=='product'){
                                         
            var url= $(this).attr('link');
            var title= $(this).attr('name');
            var type= $(this).attr('type');
            var ref_id= $(this).attr('ref_id');            
            $.ajax({
                type: "POST",
                url: base_url+'main/get_image/product/'+$(this).attr('ref_id')+"/all/01/365/251",
                dataType: "JSON",
                success: function(result){
                    img=result[0];
                    $.ajax({
                        type: "POST",
                        url: base_url+'my_account/add_to_wishlist/',
                        data: "url="+url+'&title='+title+'&type='+type+'&ref_id='+ref_id+'&image='+img,
                        dataType: "JSON",
                        success: function(result){
                            if(result.status!=1)
                                
                                $('#wislist_confirmation #wislisht_message').html(result.msg);   
                                $('#wislist_trigger').click();               
                                status=result.status;
                        }
                    });    
                }
            });    
        }
        else{
                $.ajax({
                    type: "POST",
                    url: base_url+'my_account/add_to_wishlist/',
                    data: "url="+$(this).attr('link')+'&title='+$(this).attr('name')+'&type='+$(this).attr('type')+'&ref_id='+$(this).attr('ref_id')+'&subtitle='+$(this).attr('subtitle')+'&image='+img+'&cls='+$(this).attr('cls'),
                    dataType: "JSON",
                    success: function(result){
                        if(result.status!=1)
                            
                            $('#wislist_confirmation #wislisht_message').html(result.msg);   
                            $('#wislist_trigger').click();                   
                            status=result.status;
                    }
                });    
            
        }
	
		if(status==0 && session_logged_in>0){
			$(this).removeClass("wishlist_btn");
			$(this).addClass("active");
		}
		return false;		
	});
	
	$("#shipping_address_form_edit select[name='country']").live('change',function() {
		if($(this).val() == 1){
			$.ajax({
				dataType: "json",
				type: "POST",
				url: base_url+'user/get_shipping_state/'+$(this).val(),
				success: function(data){
					$("#shipping_address_form_edit #address_state_region").html(data.html);
					fix_select();				
				}
			});	
		}else{
			$("#shipping_address_form_edit #address_state_region").html('<input type=\"text\" id=\"state_region\" name=\"state_region\"  placeholder=\"Your province/state\"/>');
			fix_input();	
		}
		// check input ($(this).val()) for validity here
	});
	
	$("#shipping_address_form select[name='country']").change( function() {
		if($(this).val() == 1){
			$.ajax({
				dataType: "json",
				type: "POST",
				url: base_url+'user/get_shipping_state/'+$(this).val(),
				success: function(data){
					$("#shipping_address_form #new_state_region").html(data.html);
					fix_select();				
				}
			});	
		}else{
			$("#shipping_address_form #new_state_region").html('<input type=\"text\" id=\"state_region\" name=\"state_region\" placeholder=\"Your province/state\" />');
			fix_input();	
		}
		// check input ($(this).val()) for validity here
	});
	
	//get state date when country selected
	$(".change_get_state").change( function() {
	  var get_country = $(this).val();
	  var get_elm_name = $(this).attr("name");
	  var get_elm_id = $(this).attr("id");
	  var elm = $(this);
	  if(elm.attr("name")=='billing_country' && get_country=='ID'){
	    get_country='ID_1';
	  }
		if(get_country == 1 || get_country == 'ID' || get_country == 'ID_1'){
			$.ajax({
				dataType: "json",
				type: "POST",
				url: base_url+'user/get_shipping_state/'+get_country,
				success: function(data){
					elm.parents("form").find(".state_area").html(data.html);
					fix_select();				
				}
			});	
		}else{
		  if(get_elm_name=='country' && get_elm_id=='bill_to_address_country'){
		    $(this).parents("form").find(".state_area").html('<input type=\"text\"  id="state_region" name="state" value="" class="required" placeholder=\"Your province/state\" />');
		  }else if(get_elm_name=='billing_country'){
		    $(this).parents("form").find(".state_area").html('<input type=\"text\"  id="billing_state_region" name="billing_state_region" value="" class="required" placeholder=\"Your province/state\" />');
		  }else{
		    $(this).parents("form").find(".state_area").html('<input type=\"text\"  name="state_region" value="" class="required" placeholder=\"Your province/state\" />');
		  }
	      fix_input();				
	    }
		// check input ($(this).val()) for validity here
	}).trigger('change');;
	//end
	
	$("#share_to_btn").click(function(){
		total_filled=0;
		$(".target_email_list").each(function(){
			total_filled++;
		});	
		
		if(total_filled>0){
			$.ajax({
				type: "POST",
				url: base_url+'home/share_to_email',
				data: $("#share_to_email_form").serialize(),	
				success: function(){				alert('Email Sent');
					//if(result=='success')alert('Email Sent');
					//else alert('Email sending failed');
				}
			});	
		}
	});
});

function check_form(button){
	var state = true;
	button.parents('form, .validate_form').find('.required').each(function(){
		if($(this).is("input,select,textarea")){
		  
		  
			if($(this).val() == "") {
				if(!$(this).hasClass('error')){
					if($(this).is("select")){
					  $(this).parents(".select").children().addClass('required error');
					} else {
					  $(this).addClass('error');
					}
				}
				state = false;
			} else {
				if($(this).is("select")){
				  $(this).parents(".select").children().removeClass('required error');
				} else {
				  $(this).removeClass('error');
				}
			}
			$(this).change(function(){
				if($(this).val() == "") {
					if(!$(this).hasClass('error')){
						if($(this).is("select")){
						  $(this).parents(".select").children().addClass('required error');
						} else {
						  $(this).addClass('error');
						}
					}
					state = false;
				} else {
					if($(this).is("select")){
					  $(this).parents(".select").children().removeClass('required error');
					} else {
					  $(this).removeClass('error');
					}
				}
			});
		}
	});
	
	return state;
}

function clear_form(){
	$('.required').each(function(){
		if($(this).is("input,select,textarea")){
			if($(this).is("select")){
				$(this).parent().parent().parent().find('.error-message').remove();
			} else {
				$(this).parent().find('.error-message').remove();
			}
			$(this).removeClass('error');
		}
	});
}

function validate_email(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
} 

function go_register(dest) {
  window.location.href = dest;
} 
