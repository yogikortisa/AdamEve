var footerTime;
$(document).ready(function($) {
/* Cross browser placeholder for input,textarea,and password */
  $.support.placeholder = false;
  test = document.createElement('input');
  if('placeholder' in test) $.support.placeholder = true;

  if(!$.support.placeholder) { 
	var active = document.activeElement;
	$(':text').focus(function () {
		if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
			$(this).val('').removeClass('hasPlaceholder');
		}
	}).blur(function () {
		if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
			$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
		}
	});
	$(':text').blur();
	$(active).focus();
	$('form').submit(function () {
		$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
	});
  }

  if(!$.support.placeholder) {
    var active = document.activeElement;
    $('textarea').focus(function () {
      if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
        $(this).val('').removeClass('hasPlaceholder');
      }
    }).blur(function () {
      if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
        $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
      }
    });
    $('textarea').blur();
    $(active).focus();
    $('form').submit(function () {
      $(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
    });
  }
  if(!$.support.placeholder) {
    var active = document.activeElement;
    $(':password').focus(function () {
      if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
        $(this).val('').removeClass('hasPlaceholder');
      }
    }).blur(function () {
      if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
        $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
      }
    });
    $(':password').blur();
    $(active).focus();
    $('form').submit(function () {
      $(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
    });
  }
  /* / Cross browser placeholder for input,textarea,and password */
//fix select style
fix_select();
//fix input style
fix_input();

$(".nav.dropdown .dropdown-menu").click(function (event) {
  event.stopPropagation();
});
 
  //add guest hotel checkout
  $("#add_guest_trigger").click(function (event) {
    event.preventDefault();
    $("#guest_area").append('<div class="del_guest"><span class="ico_remove"></span></div><div class="row-fluid"><div class="span2"><div class="row-fluid"><div class="span12"><select name="gender"><option value="">Mr.</option><option value="">Mrs.</option></select></div></div></div><div class="span5"><div class="row-fluid"><div class="span12"><input type="text" id="first_name" name="first_name" value="" /></div></div></div><div class="span5"><div class="row-fluid"><div class="span12"><input type="text" id="first_name" name="first_name" value="" /></div></div></div></div>');
    //fix select style
    fix_select();
    fix_input();
    //end
  });
  //end
  
  //remove guest hotel checkout
  $(".del_guest").live("click", function(){
	$(this).next().remove();
    $(this).remove();
	
	if($("#add_more_name").length>0){
		//validate if this is on voucher page
		var total_guest=parseInt($("#total_guest").val());
		total_guest--;
		$("#total_guest").val(total_guest);
		if(total_guest<3){
			$(".add_guest_row").show();
		}
	}
  });  
  //end
  //add guest voucher checkout
	$("#add_more_name").click(function(event){
		event.preventDefault();
		var total_guest=parseInt($("#total_guest").val());
		if(total_guest<3){
			//$("#guest_list").append('<input type="text" name="guest_name[]" class="guest_name" value="" />');
			$("#guest_area").append('<div class="del_guest"><span class="ico_remove"></span></div><div class="row-fluid"><div class="span12"><div class="row-fluid"><div class="span12"><input type="text" name="guest_name[]" class="guest_name" value="" /></div></div></div></div>');
			total_guest++;
			$("#total_guest").val(total_guest);
			
			if(total_guest==3){
				$(".add_guest_row").hide();
			}
		}
	});
  //end
  
  
  // tooltip
    $('.tooltip-fade').tooltip({
      selector: "a[rel=tooltip]"
    });
  //end

  //thumbnail click
  if($('.slideshow_item ul li').length > 0){
	  var caption = $(".slideshow_item ul li.active").attr("caption");
	  if (caption.length > 1){
	    $("#slideshow_text_caption").text(caption);		
	  }
	  $(".slideshow_item ul li:first").addClass("first");
  }
  $(".thumb").click(function () {
   //$(".slideshow_item ul li.first").removeClass("first");
   var img_selected = $(this).attr("rel");
    //window.clearInterval(img_autoslide);
	$(".slideshow_item li.active").fadeOut(function(){
		$(".slideshow_item li.active").removeClass("active");
     $(".slideshow_item li img[src$='"+img_selected+"']").parents("li").addClass("active").fadeIn();
     var pos = $(".slideshow_item ul li.active").attr("pos");
     $("#slideshow_text_number").text(pos);		
     var caption = $(".slideshow_item ul li.active").attr("caption");
     if (caption.length > 1){
      $("#slideshow_text_caption").text(caption);		
     }				
    });
  }); 
  //Images Click
  $(".slideshow_item img.slideshow_image").click(function () {
    //window.clearInterval(img_autoslide);
    if($(".slideshow_item ul li:last").hasClass("active")){
      $(".slideshow_item ul li:last").fadeOut(function(){
		$(".slideshow_item ul li:last").removeClass("active");
        $(".slideshow_item ul li:first").addClass("active").fadeIn();
        var first = "1";	
		$("#slideshow_text_number").text(first);
		var caption = $(".slideshow_item ul li.active").attr("caption");
		if (caption.length > 1){
		  $("#slideshow_text_caption").text(caption);		
		}				
      });
    }
    else{
      $(".slideshow_item ul li.active").fadeOut(function(){
        $(this).removeClass("active").next().addClass("active").fadeIn();
        var pos = $(".slideshow_item ul li.active").attr("pos");
		$("#slideshow_text_number").text(pos);	
		var caption = $(".slideshow_item ul li.active").attr("caption");
		if (caption.length > 1){
		  $("#slideshow_text_caption").text(caption);		
		}				
      });
    }
    return false;
  });
  //end
  // Next controls
  $("#next").click(function(){
    //window.clearInterval(img_autoslide);
    if($(".slideshow_item ul li:last").hasClass("active")){
      $(".slideshow_item ul li:last").fadeOut(function(){
        $(".slideshow_item ul li:last").removeClass("active");
        $(".slideshow_item ul li:first").addClass("active").fadeIn();
        var pos = $(".slideshow_item ul li.active").attr("pos");
		$("#slideshow_text_number").text(pos);		
		var caption = $(".slideshow_item ul li.active").attr("caption");
		if (caption.length > 1){
		  $("#slideshow_text_caption").text(caption);		
		}	
      });
    }
    else{
      $(".slideshow_item ul li.active").fadeOut(function(){
        $(this).removeClass("active").next().addClass("active").fadeIn();
        var pos = $(".slideshow_item ul li.active").attr("pos");
		$("#slideshow_text_number").text(pos);	
		var caption = $(".slideshow_item ul li.active").attr("caption");
		if (caption.length > 1){
		  $("#slideshow_text_caption").text(caption);		
		}			
      });
    }
    return false;
  });
	
  // Previous controls
  $("#prev").click(function(){
    //window.clearInterval(img_autoslide);
    if($(".slideshow_item ul li:first").hasClass("active")){
      $(".slideshow_item ul li:first").fadeOut(function(){
        $(".slideshow_item ul li:first").removeClass("active");
        $(".slideshow_item ul li:last").addClass("active").fadeIn();
        var pos = $(".slideshow_item ul li.active").attr("pos");
        $("#slideshow_text_number").text(pos);		
        var caption = $(".slideshow_item ul li.active").attr("caption");
        if (caption.length > 1){
          $("#slideshow_text_caption").text(caption);		
        }
      });
    }
    else{
      $(".slideshow_item ul li.active").fadeOut(function(){
        $(this).removeClass("active").prev().addClass("active").fadeIn();
        var pos = $(".slideshow_item ul li.active").attr("pos");
		$("#slideshow_text_number").text(pos);	
		var caption = $(".slideshow_item ul li.active").attr("caption");
		if (caption.length > 1){
		  $("#slideshow_text_caption").text(caption);		
		}		
      });
    }
    return false;
  });
  //end
  
  //Checkout Menu
	$(".checkout_content_item_menu_ship").click(function (event) {
	  if($(this).hasClass('disable')==true)return false;
      event.preventDefault(); 
      $(this).addClass("active");
      $(".checkout_content_item_menu_pay").removeClass("active");	
      $(".checkout_content_item_menu_rev").removeClass("active");
	  $('#shipping_home').show();	
	  $('#shipping_content').show();	
	  $('#payment_content').hide();	
	  $('#review_content').hide();	
      $('#shipping_content .checkout_content_item_el_box_title').show();
      $('#shipping_content .checkout_content_item_el_box_ship').show();
      $('#shipping_form').hide();
	  $('#shipping_edit_form').hide();
      $('.checkout_content_item_menu_sub_el a.button').removeClass('pink');
      $('.checkout_content_item_menu_sub_el a.button').addClass('disable');
      $('#payment_form_home_button').removeAttr("data-tooltip");	
    });
	$(".checkout_content_item_menu_pay").click(function (event) {
	  if($(this).hasClass('disable')==true)return false;
      event.preventDefault(); 
      $(this).addClass("active");
      $(".checkout_content_item_menu_rev").removeClass("active");	
      $(".checkout_content_item_menu_ship").removeClass("active");	
      $(".payment_item_row input:radio[name='payment']").removeAttr("checked");
      $(".payment_item_row input:radio[name='payment_bobobobo']").removeAttr("checked");
	  $('#shipping_content').hide();
	  $('#payment_form_klik').hide();	
	  $('#payment_form_cc').hide();
	  $('#payment_content').show();	
	  $('#payment_home').show();	
	  $('#payment_form_home').show();	
	  $('#review_content').hide();	
      $('#payment_content .checkout_content_item_el_box_title').show();
      $('#payment_content .checkout_content_item_el_box_pay').show();
      $('#payment_edit_form').hide();
      $("#credit_card_payment").hide();	
      $("#sas_payment").hide();	
      $('#veritrans_payment').hide();	
  	  $('#payment_form_veritrans').hide();
      $('#payment_content #payment_selection_form').show();	
      $("#klikbca_payment").hide();
      $("#bank_payment").hide();
      $('.checkout_content_item_menu_sub_el a.button').removeClass('pink');
      $('.checkout_content_item_menu_sub_el a.button').addClass('disable');
      $('#payment_form_home_button').removeAttr("data-tooltip");
      $('#payment_form_home').attr('action',base_url+'shop/select_payment_detail');	
    });
	$(".checkout_content_item_menu_rev").click(function (event) {
	  if($(this).hasClass('disable')==true)return false;
      event.preventDefault(); 
      $(this).addClass("active");
      $(".checkout_content_item_menu_pay").removeClass("active");	
      $(".checkout_content_item_menu_ship").removeClass("active");	
	  $('#shipping_content').hide();	
	  $('#payment_content').hide();	
	  $('#review_content').show();	
      $('#review_form').show();
      $('.checkout_content_item_menu_sub_el a.button').addClass('pink');
      $('.checkout_content_item_menu_sub_el a.button').removeClass('disable');
      $('#payment_form_home_button').removeAttr("data-tooltip");	
    });
	
    var shipping = $('.checkout_content_item_menu_ship').hasClass("active");
	if(shipping == true){
	  $('#shipping_content').show();
	}
	var payment = $('.checkout_content_item_menu_pay').hasClass("active");
	if(payment == true){
	  $('#payment_content').show();
	}
	var review = $('.checkout_content_item_menu_rev').hasClass("active");
	if(review == true){
	  $('#review_content').show();
	}
  //end
  
  //checkout show add shipping
  $('#shipping_content #add_shipping, #shipping_content #add_shipping_m').click(function(event){
      event.preventDefault(); 
    $('#shipping_content #shipping_home').hide();
    $('#shipping_content #shipping_form').show();
  });
  $('#shipping_content #cancel_shipping').click(function(event){
      event.preventDefault(); 
      clear_form();
    $('#shipping_content #shipping_edit_form').hide();
    $('#shipping_content #shipping_form').hide();
    $('#shipping_content #shipping_home').show();
    $('#shipping_home').show();	
    $('#shipping_content').show();	
    $('#shipping_content .checkout_content_item_el_box_title').show();
    $('#shipping_content .checkout_content_item_el_box_ship').show();
  });
  //end
  //checkout show add payment
  $('#payment_content #add_payment').click(function(event){
      event.preventDefault(); 
    $('#payment_content #add_payment_box').hide();
    $('#payment_content #payment_selection_form').hide();
    $('#payment_empty_add_button').hide();
    $('#payment_form_cc').show();
  });
  $('#payment_content #cancel_payment, #payment_content .cancel_payment').click(function(event){
      event.preventDefault(); 
    $('#payment_content #payment_edit_form').hide();
    $('#payment_content #veritrans_payment').hide();
    $('#payment_content #payment_edit_form').hide();
    $('#payment_content #payment_home').show();
    $('#payment_content #payment_selection_form').show();
    $('#payment_content #payment_form_cc').hide();
    $('#payment_content #sas_payment').hide();
    $('#payment_content #payment_form_klik').hide();
    $('#payment_content #bank_payment').hide();
    $(".payment_item_row input:radio[name='payment']").removeAttr("checked");
    $(".payment_item_row input:radio[name='payment_bobobobo']").removeAttr("checked");
    $("#payment_item").show();
    $("#credit_card_payment").hide();
    $("#sas_payment").hide();
    $('#payment_form_home').show();	
    $('#payment_form_home .checkout_content_item_el_box_bottom').show();	
  });
  //end
  //checkout show edit shipping
  /*$('#shipping_content #edit_shipping').click(function(event){
      event.preventDefault(); 
    $('#shipping_content .checkout_content_item_el_box_title').hide();
    $('#shipping_content .checkout_content_item_el_box_ship').hide();
    $('#shipping_content #shipping_edit_form').slideToggle('slow');
    $('#shipping_content #shipping_form').hide();
  });*/
  //end
  //checkout show edit payment
  $('#payment_content #edit_payment').click(function(event){
      event.preventDefault(); 
    $('#payment_content #payment_home').hide();
    $('#payment_content #payment_edit_form').show();
  });
  //end
  //myaccount show add address
  $('#myaccount_myaddressbook #add_address').click(function(event){
      event.preventDefault(); 
    console.log("asdf");
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_title').hide();
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_address').hide();
    $('#myaccount_myaddressbook #payment_add_form').hide();
    $('#myaccount_myaddressbook #payment_edit_form').hide();	
    $('#myaccount_myaddressbook #addressbook_form').slideToggle('slow',function() {
	  $("html").getNiceScroll().resize(); //refresh scroll when content update with ajax
	  $(window).scroll();
    });
  });
  $('#myaccount_myaddressbook #cancel_address').click(function(event){
      event.preventDefault(); 
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_title').show();
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_address').show();
    $('#myaccount_myaddressbook #payment_add_form').hide();
    $('#myaccount_myaddressbook #payment_edit_form').hide();
    $('#myaccount_myaddressbook #addressbook_form').slideToggle('up');
  });
  //end//myaccount show edit address
  /*$('#myaccount_myaddressbook #edit_address').click(function(event){
      event.preventDefault(); 
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_title').hide();
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_address').hide();
    $('#myaccount_myaddressbook #addressbook_edit_form').slideToggle('slow');
  });*/
  $('#myaccount_myaddressbook #cancel_edit_address').click(function(event){
      event.preventDefault(); 
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_title').show();
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_address').show();
    $('#myaccount_myaddressbook #payment_add_form').hide();
    $('#myaccount_myaddressbook #payment_edit_form').hide();
    $('#myaccount_myaddressbook #addressbook_edit_form').slideToggle('up');
  });
  //end
  
  //myaccount show add address
  $('#myaccount_myaddressbook #add_payment').click(function(event){
      event.preventDefault(); 
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_title').hide();
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_address').hide();
    $('#myaccount_myaddressbook #addressbook_form').hide();
    $('#myaccount_myaddressbook #addressbook_edit_form').hide();
    $('#myaccount_myaddressbook #div-payment-cc').slideToggle('slow');
  });
  $('#myaccount_myaddressbook #cancel_address').click(function(event){
      event.preventDefault(); 
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_title').show();
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_address').show();
    $('#myaccount_myaddressbook #addressbook_form').hide();
    $('#myaccount_myaddressbook #addressbook_edit_form').hide();
    $('#myaccount_myaddressbook #div-payment-cc').slideToggle('up');
  });
  //end//myaccount show edit address
  /*$('#myaccount_myaddressbook #edit_address').click(function(event){
      event.preventDefault(); 
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_title').hide();
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_address').hide();
    $('#myaccount_myaddressbook #addressbook_edit_form').slideToggle('slow');
  });*/
  $('#myaccount_myaddressbook #cancel_edit_address').click(function(event){
      event.preventDefault(); 
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_title').show();
    $('#myaccount_myaddressbook .myaccount_content_item_el_box_address').show();
    $('#myaccount_myaddressbook #addressbook_form').hide();
    $('#myaccount_myaddressbook #addressbook_edit_form').hide();
    $('#myaccount_myaddressbook #payment_edit_form').slideToggle('up');
  });
  //end
  
  $('.payment_item #payment_cc').click(function(event){
      event.preventDefault(); 
    $("#payment_item").hide();
    $("#klikbca_payment").hide();
    $("#klikpay_payment").hide();
	$('#payment_form_cc').hide();	
	$('#payment_form_home').hide();
	$('#veritrans_payment').hide();	
	$('#payment_form_veritrans').hide();
	$('#sas_payment').hide();	
	$('#payment_form_sas').hide();
	$("#credit_card_payment").show();
	$("#payment_content #add_payment_box").show();
	$('#payment_empty_add_button').show();
	$("payment_selection_form_button").removeAttr("data-tooltip");	
  });	
  $('.payment_item #payment_klikbca').click(function(event){
      event.preventDefault(); 
    $("#payment_item").hide();
	$("#credit_card_payment").hide();	
	$("#sas_payment").hide();
	$("#klikbca_payment").show();
	$("#klikpay_payment").hide();
	$('#payment_form_klik').show();	
	$('#payment_form_home').hide();
	$('#veritrans_payment').hide();	
	$('#payment_form_veritrans').hide();
	$('#payment_form_klik_button').removeAttr("data-tooltip");
  });
  $('.payment_item #payment_veritrans').click(function(event){
      event.preventDefault(); 
    $("#payment_item").hide();
	$("#credit_card_payment").hide();
	$("#sas_payment").hide();	
	$("#klikbca_payment").hide();
	$("#klikpay_payment").hide();
	$('#payment_form_klik').hide();	
	$('#payment_form_home').hide();
	$('#veritrans_payment').show();	
	$('#payment_form_veritrans').show();
	$('#payment_form_klik_button').removeAttr("data-tooltip");
	$('#sas_payment').hide();	
	$('#payment_form_sas').hide();
  });
  $('.payment_item #payment_sas').click(function(event){
      $('#payment_form_home').attr('action',base_url+'shop/select_sas_payment');
      $('#payment_form_home_button').removeAttr("data-tooltip");
  });
  $('.payment_item #payment_bank_transfer').click(function(event){
      $('#payment_form_home').attr('action',base_url+'shop/select_bank_payment');
      $('#payment_form_home_button').removeAttr("data-tooltip");
  });
  $('.payment_item #payment_klikpay').click(function(event){
	$("#credit_card_payment").hide();	
	$("#klikbca_payment").hide();
	$("#payment_content .checkout_content_item_el_box_bottom").show();
	if($('.payment_item input[name="payment"]:checked', '#payment_form_home').val()!=''){
	  $("#payment_content .checkout_content_item_el_box_bottom").show();
	  $('#payment_form_home_button').removeAttr("data-tooltip");	
	}	
  });
  $('#payment_form_home_button').click(function(event){
    if($('.payment_item input[name="payment_bobobobo"]').is(':checked')==true){
      if($('#sas_payment').is(':hidden')==false)if(!check_form($(this))) return false;
      $(this).parents('form').find(".acc_container:hidden").remove();
      $(this).parents('form').submit();
      $(this).removeAttr("data-tooltip");	
      
    } else {
      $(this).attr("data-tooltip","Select payment method above");
      
    }
  });
  $('#klikbca_username').keyup(function(event){
    if($(this).val().length > 0){
      $('#payment_form_klik_button').removeAttr("data-tooltip");	
    }
  });
  $('#payment_form_klik_button').click(function(event){
    if($('#payment_form_klik input#klikbca_username').val().length > 0){
      $(this).parents('form').submit();
      $(this).removeAttr("data-tooltip");	
    } else {
      $(this).attr("data-tooltip","Please insert your klikBCA username");
    }
  });
  $('#payment_form_veritrans_button').click(function(event){
  	  if(!check_form($(this))) return false;
	  $(this).parents('form').submit();
  });
  $('#payment_form_sas_button').click(function(event){
  	  if(!check_form($(this))) return false;
	  $(this).parents('form').submit();
  });
  $('#payment_form_bank_transfer_button').click(function(event){
  	  $(this).parents('form').submit();
  });
  $('#payment_id').click(function(event){
    if($(this).val().length > 0){
      $('#payment_selection_form_button').removeAttr("data-tooltip");	
    }
  });  
  $('#payment_selection_form_button').click(function(event){
    if($('#payment_selection_form input[name="payment_id"]').is(':checked')==true){
      $(this).parents('form').submit();
      $(this).removeAttr("data-tooltip");	
    } else {
      $(this).attr("data-tooltip","Select credit card above");
    }
  });
    $('#payment_selection_bank_button').click(function(event){
      $(this).parents('form').submit();
      $(this).removeAttr("data-tooltip");	
  });
  //checkout hotel add card
  $('.checkout_form #add_card_button').click(function(event){
      event.preventDefault(); 
    $(".checkout_form .checkout_card_row_item").hide();
    $('.checkout_form #add_card_form').show();
  });
  //end
  //checkout hotel edit card
  $('.checkout_form #edit_card_button').click(function(event){
      event.preventDefault(); 
    $('.checkout_form .checkout_card_row_item').hide();
    $('.checkout_form #edit_card_form').show();
  });
  $('.checkout_form #edit_card_cancel').click(function(event){
      event.preventDefault(); 
    $('.checkout_form #edit_card_form').hide();
    $('.checkout_form .checkout_card_row_item').show();
  });
  //end
  $( ".datepicker_mode_max_today" ).datepicker({ dateFormat: 'dd/mm/yy',maxDate: '0' }); 
  $( ".datepicker_mode" ).datepicker({ dateFormat: 'dd/mm/yy' }); 
  $( ".datepicker_mode_min_today" ).datepicker({ dateFormat: 'dd/mm/yy',minDate: new Date() });
  $( ".datepickerIn" ).datepicker({
    dateformat: "dd/mm/yyyy",
    minDate: new Date(),
    onSelect: function(dateText, inst) {
      $("#checkin").attr("value",dateText);
      var datepart = dateText.split("/");
      if(datepart[0]=='01'){
        var month = "JAN";
      }else if(datepart[0]=='02'){
        var month = "FEB";
      }else if(datepart[0]=='03'){
        var month = "MAR";
      }else if(datepart[0]=='04'){
        var month = "APR";
      }else if(datepart[0]=='05'){
        var month = "MAY";
      }else if(datepart[0]=='06'){
        var month = "JUN";
      }else if(datepart[0]=='07'){
        var month = "JUL";
      }else if(datepart[0]=='08'){
        var month = "AUG";
      }else if(datepart[0]=='09'){
        var month = "SEP";
      }else if(datepart[0]=='10'){
        var month = "OCT";
      }else if(datepart[0]=='11'){
        var month = "NOV";
      }else if(datepart[0]=='12'){
        var month = "DEC";
      }
      var dateshow = datepart[1]+" "+month+" "+datepart[2];
      $("#checkin_date").html("check in <b>"+dateshow+"</b>");
      var checkIn = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
      if (checkIn) {
        checkIn.setDate(checkIn.getDate() + 1);
      }
      $.datepicker._clearDate('.datepickerOut');
      $('.datepickerOut').datepicker('option', {
        minDate: checkIn
      });
      $(".datepickerOut").datepicker("refresh");
      $(".datepickerOut .ui-state-disabled .ui-state-default:last").addClass("ui-state-highlight");
      $(this).parent().parent().children().removeClass("here"); 
      $(this).parent().slideUp();
      $(this).parent().parent().next().children().addClass("active here").click();
    }
  });
  $( ".datepickerOut" ).datepicker({
    dateformat: "dd/mm/yyyy",
    minDate: new Date(),
    onSelect: function(dateText, inst) {
      $("#checkout").attr("value",dateText);
      var datepart = dateText.split("/");
      if(datepart[0]=='01'){
        var month = "JAN";
      }else if(datepart[0]=='02'){
        var month = "FEB";
      }else if(datepart[0]=='03'){
        var month = "MAR";
      }else if(datepart[0]=='04'){
        var month = "APR";
      }else if(datepart[0]=='05'){
        var month = "MAY";
      }else if(datepart[0]=='06'){
        var month = "JUN";
      }else if(datepart[0]=='07'){
        var month = "JUL";
      }else if(datepart[0]=='08'){
        var month = "AUG";
      }else if(datepart[0]=='09'){
        var month = "SEP";
      }else if(datepart[0]=='10'){
        var month = "OCT";
      }else if(datepart[0]=='11'){
        var month = "NOV";
      }else if(datepart[0]=='12'){
        var month = "DEC";
      }
      var dateshow = datepart[1]+" "+month+" "+datepart[2];
      $("#checkout_date").html("check out <b>"+dateshow+"</b>");
      $(this).parent().parent().children().removeClass("here"); 
      $(this).parent().slideUp();
      $(this).parent().parent().next().children().addClass("active here").click();
    }
  });
  $(".datepickerOut .ui-state-disabled .ui-state-default:last").live().addClass("ui-state-highlight");
  //end

  //toggle menu right
  //Set default open/close settings
  $('.acc_container').hide(); //Hide/close all containers
  $('.acc_container').find(".ui-state-active").removeClass("ui-state-active");
  $('.acc_container').find(".ui-state-hover").removeClass("ui-state-hover");
  if($('.acc_container').hasClass('hide_first')==false){
    $('.acc_trigger:first').addClass('active').next().show(); //Add "active" class to first trigger, then show/open the immediate next container
  }
  if ($('.acc_trigger:first .ui-icon-carat-1-s').length > 0){
    $(".active .title_header .ui-icon").attr(
      'class', 
      $(".active .title_header .ui-icon").attr('class').replace('-s', '-n')
      );
  }
  //On Click
  $('.acc_trigger').live('click',function(){  
   if($(this).attr("id")=="checkin_trigger"){
     $("#checkin_date").text("select check in date");
     $("#checkout_date").text("select check out date");
     $("#checkin").attr("value","");
     $("#checkout").attr("value","");
   }
   if($(this).attr("id")=="checkout_trigger"){
     $("#checkout_date").text("select check out date");
     $("#checkout").attr("value","");
   }
   if($(this).hasClass("active")==true || $(this).hasClass("hotel_panel")==false)
   {
    if( $(this).next().is(':hidden') ) { //If immediate next container is closed...
	  if ($('.acc_trigger .ui-icon-carat-1-n').length){
        //set arrow to up
        $(".active .title_header .ui-icon").attr(
          'class', 
          $(".active .title_header .ui-icon").attr('class').replace('-n', '-s')
          );
        //end
	  }
	  $('.acc_trigger').removeClass('here');
	  $('.ico_warning').remove(); 
	  $(this).addClass('here');
      $('.acc_trigger').removeClass('active').next().slideUp(); //Remove all .acc_trigger classes and slide up the immediate next container
      $(this).toggleClass('active').next().slideDown().find(".ui-state-hover").removeClass("ui-state-hover"); //Add .acc_trigger class to clicked trigger and slide down the immediate next container
	  if($(this).next().find(".hasDatepicker").hasClass("datepickerIn")==true){
	    $(this).next().find(".ui-state-active").removeClass("ui-state-active");
	  }else if($(this).next().find(".hasDatepicker").hasClass("datepickerOut")==true){
	    $(this).next().find(".ui-state-disabled .ui-state-default:last").addClass("ui-state-highlight");
	    $(this).next().find(".ui-state-active").removeClass("ui-state-active");
	  }	  
	  $("#btn-book").removeAttr("data-tooltip");
      var ids = $(this).attr("id");
	  if(ids=="checkout_trigger"){
	    $("#checkin_trigger").addClass("active");
	  }else if(ids=="room_trigger"){
	    $("#checkin_trigger").addClass("active");
	    $("#checkout_trigger").addClass("active");
	  }else if(ids=="checkin_trigger"){
	    $("#checkout_trigger").removeClass("active");
	    $("#room_trigger").removeClass("active");
	  }else if(ids=="departure_trigger"){
	    $("#departure_trigger").addClass("active");
	  }else if(ids=="package_trigger"){
	    $("#departure_trigger").addClass("active");
	  }
    }
    //set arrow to down
    $(this).find('.ui-icon').attr(
      'class', 
      $(this).find('.ui-icon').attr('class').replace('-s', '-n')
      );
    //
    return false; //Prevent the browser jump to the link anchor
   }
  });
  //end
  //product detail link tab
  $(".sub-menu ul li a").click(function (event) {
   if($(this).hasClass("external_link")==false){
    event.preventDefault(); 
    $(".sub-menu ul li").removeClass("active");
    $(this).parent().addClass("active");
    var tab_id = $(this).attr("id");
    $(".content.active").removeClass("active");
    $("#content_"+tab_id).addClass("active");	
    $('body').find('#testIframe').each(function () {
      $frame = $(this);
      $frame.height($frame.get(0).contentWindow.document.body.scrollHeight)
      $frame.contents().find('a').each(function () {
        $(this).bind('click',function () {
          $frame.height($frame.get(0).contentWindow.document.body.scrollHeight)
        })
      })
    });
   }
  });
  $(window).resize(function (event) {
    $('body').find('#testIframe').each(function () {
      $(this).height($(this).get(0).contentWindow.document.body.scrollHeight)
    });
  });
  $("html").click(function () {
     $("#share_text").removeClass("pink");
   });
  $("#share_text").click(function (event) {
    event.preventDefault(); 
    if($(".nav.dropdown").hasClass("open")){
      $("#share_text").removeClass("pink");
    }else{
      $("#share_text").removeClass("pink");
    }			
  });
  //end

  //gray image center
    $('.gray_circle .gray_circle_content .gray_circle_content_text').each(function(){
	  var text_height = $(this).height();
	  var margin_top = 0 - (text_height / 2);
	  $(this).css("margin-top",margin_top);
    });
	//when windows resize
    var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
    };
    })();

    var lastWidth = $(window).width();
    $(window).resize(function () {
      if($(window).width()!=lastWidth){
	  $('.gray_circle .gray_circle_content .gray_circle_content_text').each(function(){
	  var text_height = $(this).height();
	  var margin_top = 0 - (text_height / 2);
	  $(this).css("margin-top",margin_top);
    });
	  }
	});
  //end
  
  //crop image center
  if ($('.image_circle img').length > 0){
    $('.image_circle img').each(function(){
      var image_width = $(this).width();
      var image_height = $(this).height();

      var original_aspect = image_width / image_height;
      var output_w = "234";
      var output_h = "234";
      var thumb_aspect = output_w / output_h;

      if( original_aspect >= thumb_aspect ){
		
        // If image is wider than thumbnail (in aspect ratio sense)
        var new_height = output_h;
        var ratio = image_height / output_h;
        var new_width = image_width / ratio;
        var margin_width = 0 - (new_width - output_w) / 2;
        $(this).css("height", new_height);
        $(this).css("margin-left", margin_width);
      }

      if( thumb_aspect >= original_aspect ){

        // If the thumbnail is wider than the image
        var new_width = output_w;
        var ratio = image_width / output_w;
        var new_height = image_height / ratio;
        var margin_height = 0 - (new_height - output_h) / 2;
        $(this).css("width", new_width);
        $(this).css("margin-top", margin_height);
      }
    });
  }
  //end
  
  $(window).load(function(){
 
    //when windows resize
    var waitForFinalEvent = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
          clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
      };
    })();

  });
  //end
  //trigger popup
  $(".popup_trigger").live('click',function (event) {
    var popup_content = $(this).attr("popup_content");
    if($(".popup").hasClass("active")==false){
      $(".popup#"+popup_content).addClass("active");
    }
    $(".popup.active").fadeOut(function() {
      $(".popup.active").removeClass("active");
      $(".popup#"+popup_content).fadeIn();
      $(".popup#"+popup_content).addClass("active");
    });
    $("body").css("overflow","auto");
    return false;
  });
  $(".popup_trigger").click(function (event) {
    var popup_content = $(this).attr("popup_content");
    
    if($(".popup").hasClass("active")==false){
      $(".popup#"+popup_content).addClass("active");
    }
    $(".popup.active").fadeOut(function() {
      $(".popup.active").removeClass("active");
      $(".popup#"+popup_content).fadeIn();
      $(".popup#"+popup_content).addClass("active");
    });
    $("body").css("overflow","auto");
    return false;
  });
  //End trigger popup
  //trigger menu
  $(".menu_trigger").live('click',function (event) {
    var menu_content = $(this).attr("menu_content");
      $(".menu_trigger.active").removeClass("active");
      $(this).addClass("active");
      $(".menu_trigger[menu_content='"+menu_content+"']").addClass("active");
      $(".menu_content.active").removeClass("active");
      $(".menu_content#"+menu_content).addClass("active");
      
    return false;
  });
  $(".menu_trigger").click(function (event) {
    var menu_content = $(this).attr("menu_content");
      $(".menu_trigger.active").removeClass("active");
      $(this).addClass("active");
      $(".menu_trigger[menu_content='"+menu_content+"']").addClass("active");
      $(".menu_content.active").removeClass("active");
      $(".menu_content#"+menu_content).addClass("active");
      
    return false;
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
    $(".login_notification span, #sign_up_notif span, span#notif_forgot_password").html("&nbsp;");
  });
  $(".popup_close").click(function () {
    $(".popup").fadeOut();
    $("body").css("overflow","auto");
    $(".popup").removeClass("active");
    $(".required").removeClass("error");
    $(".login_notification span, #sign_up_notif span, span#notif_forgot_password").html("&nbsp;");
  });
  $('.required_trigger').click(function(){
  	if(!check_form($(this))) return false;
  });
  $("#show_register_welcome").click(function (event) {
	    var code=$("#code_register").val();
		if(code==""){			
			$("#register_code_error").html('Please Insert Your Code');
		}
		else{
			$.ajax({
				type: "POST",
				url: base_url+'registrationwithcode/check',
				data:{code:code},
				dataType :'json',
				success: function(response){				
					if(response.message == 'success'){
						$("#popup_signup").html(response.html);	
						$("#popup_login").fadeOut();
					    $("#popup_term").fadeOut();
					    $(".popup_wrap").animate({'max-width': '-='+300+''}, 700, function(){
					      $("#popup_signup").fadeIn();
					    });
					}else{
						$("#register_code_error").html('Invalid Code');
					}
				}
					
				
			});	
		}
  });
  //end
  
  nice = $("html").niceScroll({
    scrollspeed: 80, 
    mousescrollstep: 20, 
    bouncescroll: true
  });
	
  //Back to top button
  function checkoffset() {
	  if($('.backtotop').offset().top + $('.backtotop').height() >= $('footer').offset().top - 10) {
		  $('.backtotop').css('position','absolute');
		  $('.backtotop').css('z-index','999');
		  }
		if($(document).scrollTop() + window.innerHeight < $('footer').offset().top)
			$('.backtotop').css('position','fixed');
	}
  $(window).scroll(function () {
	
    if ($(this).scrollTop() > 100) {
		$('.backtotop').fadeIn();
	} else {
		$('.backtotop').fadeOut();
	}
    checkoffset();
    putFooterBottom();
  });
  $('.backtotop').click(function(){
	$('html, body').animate({scrollTop:0}, 'slow');
  });
  //end 
  
  /* Dynamic dropdown category shop */
  $(".dropdown_category").mouseenter(function () {
    var target = $(this).attr('target');
    
    $("#"+target).show();
  });
  $(".dropdown_category").mouseleave(function () {
    var target = $(this).attr('target');
    
    $("#"+target).hide();
  });
  /* End */

  //put footer at the bottom if have small content
  footerTime = setTimeout(function(){
	putFooterBottom();
  },2000);
  //end
  
  //banner vertical center
  banner_v_center();
  //end

    //load panel member
    set_panel();

  //remove error when out off focus
  $(".required").parents("div").click(function(){ 
    if($(".required").hasClass('error'))$(".required").removeClass("error");
  });
  //end

/*Facebook Share*/    
$(".fb_share").click(function () {
  var data_name = $(this).attr('data-name');
  var data_link = $(this).attr('data-link');
  var data_picture = $(this).attr('data-picture');
  if(data_picture==''){
	   var data_picture = $(this).parents("html").find('.content_img').attr('src');
  }
  var data_caption = $(this).attr('data-caption');
  var data_description = $(this).attr('data-description');
  fb_share(data_name,data_link,data_picture,data_caption,data_description);
});
function fb_share(data_name,data_link,data_picture,data_caption,data_description){
	FB.ui({
      method: 'feed',
      name: data_name,
      link: data_link,
      picture: data_picture,
      caption: data_caption,
      description: data_description
    },
    function(response) {
        /*if !(response && response.post_id) {
            alert('Post was not published. '+response);
        }*/
    }
 );   
}
/*End Facebook Share*/ 

});

//load panel member
function set_panel(){
    $.ajax({
        type: "GET",
        url: base_url+'config/set_panel/',
        dataType :'html',
        success: function(result){
            $('.panel-member #panel-member-content').html(result);

            $(".currency").click(function(){
                var url= base_url+'config/set_currency/';
                $.ajax({
                    type: "POST",
                    url : url,
                    data: "&currency="+$(this).html(),
                    success: function(data) {
                        location.reload();
                    }
                });
            });
        }
        ,error: function(msg){
            //alert(msg);
        }
    });
}
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
//put footer at the bottom if have small content
function putFooterBottom(){
	var minHeight = parseFloat($('html').height());
	var windowHeight = parseFloat($(window).height());
	if(minHeight < windowHeight) {
		$('footer').addClass('fixed');
	} else {
		if($('footer').hasClass('fixed')) $('footer').removeClass('fixed');
	}
	clearTimeout(footerTime);
}
//end

//title vertical center
 function banner_v_center(){
 //banner full content center
  $('#banner_content .title_wrap').each(function(){
	  var get_height = $(this).height(); 
	  var margin_height = 0 - ( get_height / 2 );
	  $(this).css("margin-top",margin_height);
    });
	//when windows resize
    var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
    };
    })();

    var lastWidth = $(window).width();
    $(window).resize(function () {
      if($(window).width()!=lastWidth){
	   $('#banner_content .title_wrap').each(function(){
	  var get_height = $(this).height(); 
	  var margin_height = 0 - ( get_height / 2 );
	  $(this).css("margin-top",margin_height);
    });
	  }
	});
  }
  //end

function fix_thumb(obj) {
  //thumbnail image
    var w_area = $("ul.thumbs").width();
      var image_width = $(obj).width();
      var image_height = $(obj).height();
      var src = $(obj).attr("src");
      var original_aspect = image_width / image_height;
      if($(obj).parents(".navigation-container").hasClass("big_thumb")==true){
        var cons_s = (w_area-71)/8;
      }else{
        var cons_s = (w_area-46)/10;
      }
      var output_w = cons_s;
      var output_h = cons_s;
	  var thumb_aspect = output_w / output_h;

      if( original_aspect >= thumb_aspect ){
		
        // If image is wider than thumbnail (in aspect ratio sense)
        var new_height = output_h;
        var ratio = image_height / output_h;
        var new_width = image_width / ratio;
        var margin_width = 0 - (new_width - output_w) / 2;
        $(obj).css("height", new_height);
        $(obj).css("margin-left", margin_width);
		$(".navigation-container #thumbs a.thumb").css("width", output_w);
		$(".navigation-container #thumbs a.thumb").css("height", output_h);
		
      }

      else if( thumb_aspect >= original_aspect ){
        // If the thumbnail is wider than the image
        var new_width = output_w;
        var ratio = image_width / output_w;
        var new_height = image_height / ratio;
        var margin_height = 0 - (new_height - output_h) / 2;
		$(".navigation-container #thumbs a.thumb").css("width", output_w);
		$(".navigation-container #thumbs a.thumb").css("height", output_h);
        $(obj).css("width", new_width);
        $(obj).css("margin-top", margin_height);
      }
  }
  //end

function show_loading(){
	$('.show_loading').show();
}


function hide_loading(){
	$('.show_loading').hide();
}      
    
function remove_number_format(n)
{
    return n.replace(/\,/g,'');
}    
    
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

function promo_load_images(element)
{
  $(element).each(function()
  {
    var param = $(this).attr('tag');
    var p=param.split("!@");
    var hotel_id = p[0];
    var image = base_url+'/holiday/hotel_main_image'+'/'+hotel_id ;
    var el = $("#img"+hotel_id);
    var img = $("<img id='img"+hotel_id+"' />").attr('src', image)
    .load(function() {
        if (this.complete && typeof this.naturalWidth != "undefined" && this.naturalWidth != 0) {
            $(el).replaceWith(img);
            fix_image(img, "1.8");
        }
    });
  });
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
    $("#email_login").addClass("error");
		//$("#login_notif").show();
	}
	else if(validate_email(email)==false){			
		$("#loader_login").html('');	
		$("#notif_login").html('Please enter a valid email address');
    $("#email_login").addClass("error");
		//$("#login_notif").show();	
	}
	else if(password==""){			
		$("#loader_login").html('');	
		$("#notif_login").html('Password must be filled');
    $("#password_login").addClass("error");
		//$("#login_notif").show();	
	}
	else{
		$("#notif_login").html('');
		$("#login_form").attr('action',base_url+'login/process');
		$.ajax({
			type: "POST",
      url: base_url + 'login/process/true',
			data: $("#login_form").serialize(),	
			success: function(temp){				
				if(temp==1){
					if(typeof proceed_checkout == 'undefined'){
						if(des_page != ""){
              //location.reload();
              $("#login_form").removeAttr('onSubmit');
              $("#login_form").attr('action', des_page);
            }else{
              $("#login_form").removeAttr('onSubmit');
              $("#login_form").attr('action', base_url+'home');
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
	$("#loader_sign_up").html('<img src="'+base_url+'/misc/holiday/img/ajax-loader.gif" />');
	var name=$("#name").val();
	var last_name=$("#last_name").val();
	var email=$("#emails").val();
	var password=$("#password").val();
	var password2=$("#password2").val();
	if(name==""){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('First name must be filled');
    $("#name").addClass("error");
		//$("#sign_up_notif").show();	
	}
	else if(last_name==""){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Last name must be filled');
    $("#last_name").addClass("error");
		//$("#sign_up_notif").show();	
	}
	else if(email==""){
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Email must be filled');
    $("#emails").addClass("error");
		//$("#sign_up_notif").show();
	}
	else if(validate_email(email)==false){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Please enter a valid email address');
    $("#emails").addClass("error");
		//$("#sign_up_notif").show();	
	}
	else if(password==""){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Password must be filled');
    $("#password").addClass("error");
		//$("#sign_up_notif").show();	
	}
	else if(password2==""){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Confirm Password must be filled');
    $("#password2").addClass("error");
		//$("#sign_up_notif").show();	
	}
	else if(password2!=password){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Password and Confirm Password must be the same value');
    $("#password").addClass("error");
    $("#password2").addClass("error");
		//$("#sign_up_notif").show();	
	}
	else if(password.length<6){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Password must be minimum 6 characters');
    $("#password").addClass("error");
		//$("#sign_up_notif").show();	
	}
	else{
		$("#notif_sign_up").html('');
		//$("#sign_up_notif").hide();
		$.ajax({
		   type: "POST",
		   url: base_url+'registration/ajax_check_email_registered',
		   data: 'email='+email,			  
		   success: function(temp){				
				if(temp==1){	
					//registered
					$("#notif_sign_up").html('Email has been registered');
					//$("#sign_up_notif").show();		
					$("#loader_sign_up").html('');	
				}
				else{
					$("#notif_sign_up").html('');
					//$("#loader_sign_up").html('');		
					$("#register_form").attr('action',base_url+'registration/process');
					$.ajax({
					   type: "POST",
					   url: $("#register_form").attr('action'),
					   data: $("#register_form").serialize(),			  
					   success: function(temp){				
							if(temp==1){									
								//alert('Registration Complete, You can login Now');
								//$("#sign_up_notif").hide();	
								//$("#loader_sign_up").html('');	
								//$("#register_form")[0].reset();
								//location.reload();
								if(typeof proceed_checkout == 'undefined'){
									location.reload();
								} else {
									if_login = true;
									$("#btn-book").click();
									show_loading();					
								}
							}
							else{									
								$("#loader_sign_up").html('');	
								$("#notif_sign_up").html('Email has been registered');
							}
					   }
					});	
				}
		   }
		});	
	}	
}

function sign_up_with_code(){
	$("#sign_up_notif").show();	
	$("#loader_sign_up").html('<img src="'+base_url+'/misc/holiday/img/ajax-loader.gif" />');
	var name=$("#name").val();
	var last_name=$("#last_name").val();
	var email=$("#emails").val();
	var password=$("#password").val();
	var password2=$("#password2").val();
	if(name==""){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('First name must be filled');
		//$("#sign_up_notif").show();	
	}
	else if(last_name==""){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Last name must be filled');
		//$("#sign_up_notif").show();	
	}
	else if(email==""){
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Email must be filled');
		//$("#sign_up_notif").show();
	}
	else if(validate_email(email)==false){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Please enter a valid email address');
		//$("#sign_up_notif").show();	
	}
	else if(password==""){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Password must be filled');
		//$("#sign_up_notif").show();	
	}
	else if(password2==""){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Confirm Password must be filled');
		//$("#sign_up_notif").show();	
	}
	else if(password2!=password){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Password and Confirm Password must be the same value');
		//$("#sign_up_notif").show();	
	}
	else if(password.length<6){			
		$("#loader_sign_up").html('');	
		$("#notif_sign_up").html('Password must be minimum 6 characters');
		//$("#sign_up_notif").show();	
	}
	else{
		$("#notif_sign_up").html('');
		//$("#sign_up_notif").hide();
		$.ajax({
		   type: "POST",
		   url: base_url+'registrationwithcode/check_email_registered',
		   data: 'email='+email,			  
		   success: function(temp){				
				if(temp==1){	
					//registered
					$("#notif_sign_up").html('Email has been registered');
					//$("#sign_up_notif").show();		
					$("#loader_sign_up").html('');	
				}
				else{
					$("#notif_sign_up").html('');
					//$("#loader_sign_up").html('');		
					$("#register_form").attr('action',base_url+'registrationwithcode/process');
					$.ajax({
					   type: "POST",
					   url: $("#register_form").attr('action'),
					   data: $("#register_form").serialize(),			  
					   success: function(temp){				
							if(temp==1){									
                if(des_page != ""){
                  var ref = des_page;
                  window.location = decodeURIComponent(ref);
                }
                else
                {
                  window.location = base_url+'home';
                }
							}
							else{									
								$("#loader_sign_up").html('');	
								$("#notif_sign_up").html('Code has been used');
							}
					   }
					});	
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
			    	$("#notif_forgot_password").html('An email with instructions to reset your password has been sent to your inbox.');
			    }else{
			    	$("#notif_forgot_password").html('Sorry, please try again because we cannot send email to you.');
			    }
		   }
		});	
	}	
}

$(document).ready(function($) {
	$("#sign_up_btn").click(function(){
		if(typeof proceed_checkout == 'undefined'){
			sign_up_with_code();
		} else {
			sign_up_submit();
		}
	});
	
	$("#forgot_password_btn").click(function(){
		forgot_submit();
	});
	
	//Facebook Javascript SDK
	  window.fbAsyncInit = function() {
	    // init the FB JS SDK
	    FB.init({
	      appId      : '188986141268408',                        // App ID from the app dashboard
	      channelUrl : '//bobobobo.com/channel.php', // Channel file for x-domain comms
	      status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
	    });
	
	    // Additional initialization code such as adding Event Listeners goes here
	  };
	
	  // Load the SDK asynchronously
	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/all.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));
	   
	//End Facebook Javascript SDK
	 
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
		var url=$(this).attr('data-url');
		if(!url){
			var url=$(this).attr('txt');
		}
		var txt=$(this).attr('data-text');	
		var via=$(this).attr('data-via');	
		var related=$(this).attr('data-related');	
		var url_to_open='http://twitter.com/share?url='+url+'&text='+txt+'&via='+via;
		
		
		var width = 900; 	
		var height = 550;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		window.open(url_to_open, "Tweet", 'height=350,width=700,left=' + left + ',top=' + top + ',screenX=' + left + ',screenY=' + top);
		return false;
	});
	
	//Pinterest share
    (function(d){
        var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
        p.type = 'text/javascript';
        p.async = true;
        p.src = '//assets.pinterest.com/js/pinit.js';
        f.parentNode.insertBefore(p, f);
    }(document));
    //end
	
	if($("#login_form").length>0){
		$("#login_btn").click(function(){
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
	  if($('input[name="user_address_id"]:visible').is(':checked')==false){
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
	$("#my_profile_sharing_btn").click(function(){
		$("#content_email .ico_loading").show();
	    $("#content_email #notif_email").html('');
		if(!check_form($(this))){
		     $("#content_email .ico_loading").hide();
			 return false;
		}
	    var input_length = $(".target_email_list").length;
	    var valid = 0;
		total_filled=0;
		$(".target_email_list").each(function(){
			total_filled++;
			if(validate_email($(this).val())==false){
		      $("#content_email .ico_loading").hide();	
		      $("#content_email #notif_email").html('Please enter a valid email address');
	        }else{		
		      valid++;  
	        }
		});	
		if((total_filled>0) && (valid==input_length)){
		  $("#my_profile_form").submit();	
          $("#content_email .ico_loading").hide();	
          $("#content_email #notif_email").html('Thank you for sharing');	
		}
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
	  $('#myaccount_myaddressbook #addressbook_edit_form').slideToggle('slow',function() {
		$("html").getNiceScroll().resize(); //refresh scroll when content update with ajax
	    $(window).scroll();
	  });
	});
  
  if($(".hotel_promo_list .swipethis:not(.hide) .thehotelean").length != 0)
  {
    promo_load_images($(".hotel_promo_list .swipethis:not(.hide) .thehotelean"));
  }
  
	$('.hotel_promo_list .button_more_promo_trigger').on('click',
      function(){
        var area = $(this).parents(".hotel_promo_list").find(".span4.item.swipethis.landscape.hide");
        promo_load_images(area.find(".thehotelean"));
        area.removeClass("hide");
        $(this).parents(".button_more").remove();
      });
	
	$("#shipping_address_edit_btn").click(function(){
		if(!check_form($(this))) return false;
		$("#shipping_address_form_edit").submit();	
	});
	$('.hotel_promo_list .button_more_promo_trigger').hover(function() {
      $(this).find("img:last").fadeToggle("fast");
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
	}).trigger('change');
	//end
      /* function add email address share */
		$("#email_trigger").click(function (event) {
		  add_email_share(5,"text");
		});
	  /* End */
	  /* function delete email address share */
		$(".del_email").live('click',function (event) {
	      $(this).parents(".email_area_row").children(".input_wrapper").remove();
	      $(this).remove();
	      $("#content_email #notif_email").html("");
	    });
	  /* End */
	/* function button share via email */
	$("#share_to_btn").click(function(){
	    $("#content_email .ico_loading").show();
	    $("#content_email #notif_email").html('');
	    var input_length = $(".target_email_list").length;
	    var valid = 0;
		total_filled=0;
		$(".target_email_list").each(function(){
			total_filled++;
			if(validate_email($(this).val())==false){
		      $("#content_email .ico_loading").hide();	
		      $("#content_email #notif_email").html('Please enter a valid email address');
	        }else{		
		      valid++;  
	        }
		});	
		if((total_filled>0) && (valid==input_length)){
			$.ajax({
				type: "POST",
				url: base_url+'home/share_to_email',
				data: $("#share_to_email_form").serialize(),	
				success: function(result){				
					//alert('Email Sent');
					if(result=='success'){
				      $("#content_email .ico_loading").hide();	
				      $("#content_email #notif_email").html('Thank you for sharing');
				      $("#content_email input.target_email_list").val("");
					}else{
				      $("#content_email .ico_loading").hide();	
				      $("#content_email #notif_email").html('Sorry, please try again');
					}
					//else alert('Email sending failed');
				}
			});	
		}
	});
	/* End */
});

/*add input email*/
function add_email_share(limit,type){ 
  var no = $("#content_email").find(".target_email_list").length;
  var limit_email = limit;
  var type_email = type;
  if(no<limit){
  $("#email_area").append($('<div class="email_area_row"><input type="text" name="target_email[]" placeholder="Email Address" class="required target_email_list"><div class="del_email"><span class="ico_remove"></span></div></div>'));
  //fix input style
  fix_input();
  //end
  }else{
    if(type=='popup'){
	  $('#invite_trigger').click(); 
  	  return false;
    }else{
      $("#content_email #notif_email").html("Sorry, you are only allowed to send 5 emails"); 
    }
  }
}
/*end add input email*/
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
function fix_image_item(obj,ratio_n){
	 var image_width = $(obj).width(); //get image width
     var image_height = $(obj).height(); //get image height
     //console.log("resize "+obj.attr('id')+" w:"+image_width+" h:"+image_height);
     var src = $(obj).attr("src"); //get image height
     var size = $(obj).parents('.swipethis').hasClass("portrait"); //get orientation image
     var output_w = $(obj).parents('.swipethis').width(); //get space available width
     if(size == true){ //if orientation portrait
       var orientation = "portrait"; //set orientation to portrait
     }else{ //if orientation landscape
       var orientation = "landscape"; //set orientation to landscape
     }
     if(orientation == "portrait"){ //condition for landscape orientation
       var output_h = output_w * ratio_n ; //set height to 1.4 space available width
       $(obj).css("max-width", "none"); // set css max-width to none
       var img_a = image_height / image_width; // get image ratio height to width, for detect image near square shape
       if(img_a < ratio_n && img_a > 1){ //condition for image portrait near square shape
       //console.log("little port on portrait");
       //if image near to square shape but ratio not greater than 1.4, image height will set to available space and width resize to fit ratio. Then we need to adjust margin left position to keep image crop center.
         var ratio_h = output_h / image_height; //get ratio of height available and image height
         var img_w = image_width * ratio_h; //get width image fit with ratio
         var margin_width = 0 - (img_w - output_w) / 2; //count margin width for left gap, so that image can crop fit to space
         $(obj).css("height", output_h); //set image height
     	   if($(obj).parents('.swipethis').hasClass("slideshow_item")==true){
           $(obj).parents('.slideshow_item.swipethis').css("height", output_h); //set container height in to fit height
           $(obj).parents('.slideshow_item.swipethis').css("min-height", "0"); //set min height in auto
           $(obj).parents('.image_resize').css("display", "none"); //set first display to none
         }
         $(obj).parents('.image_resize').css("height", output_h); //set container height in to fit height
         $(obj).addClass("resized");
         $(obj).parents('.image_resize').css("min-height", "0");
         $(obj).parents('.image_resize').css("max-height", "none");
         $(obj).css("margin-left", margin_width); //set margin left
     	 $(obj).css("visibility","visible"); //show image when load finished
     	 $(obj).css("display","block"); //show image when load finished
       }else if(image_width == image_height){ //condition for image width same as image height or its square shape
       //console.log("sq on portrait");
       //if image is square shape, image height will set to available space and width will resize according to height. Then we need to adjust margin left position to keep image crop center.
         var margin_width = 0 - (output_h - output_w) / 2; //count margin width for left gap, so that image can crop fit to space
         $(obj).css("height", output_h); //set image height
     	   if($(obj).parents('.swipethis').hasClass("slideshow_item")==true){
           $(obj).parents('.slideshow_item.swipethis').css("height", output_h); //set container height in to fit height
           $(obj).parents('.slideshow_item.swipethis').css("min-height", "0"); //set min height in auto
           $(obj).parents('.image_resize').css("display", "none"); //set first display to none
         }
         $(obj).parents('.image_resize').css("height", output_h);//set container height in to fit height
         $(obj).parents('.image_resize').css("min-height", "0");
         $(obj).parents('.image_resize').css("max-height", "none");
         $(obj).addClass("resized");
         $(obj).css("margin-left", margin_width);//set margin left
     	 $(obj).css("visibility","visible"); //show image when load finished
     	 $(obj).css("display","block"); //show image when load finished
       }else if(image_width > image_height){ //condition for image width wider than image height or its landscape image
         //console.log("land on portrait");
         //if image is landscape, image height will set to available space and width will resize according to height. Then we need to adjust margin left position to keep image crop center.
         var ratio = image_height / output_h; //get width ratio
         var new_width = image_width / ratio; //get fit image height according to ratio
         var margin_width = 0 - (new_width - output_w) / 2; //count margin height for top gap, so that image can crop fit to space
         var margin_height = 0 - ($(obj).height() - output_h) / 2; //count margin height for top gap, so that image can crop fit to space
         $(obj).css("height", output_h); //set image height
     	   if($(obj).parents('.swipethis').hasClass("slideshow_item")==true){
           $(obj).parents('.slideshow_item.swipethis').css("height", output_h); //set container height in to fit height
           $(obj).parents('.slideshow_item.swipethis').css("min-height", "0"); //set min height in auto
           $(obj).parents('.image_resize').css("display", "none"); //set first display to none
         }
         $(obj).parents('.image_resize').css("height", output_h);//set container height in to fit height
         $(obj).parents('.image_resize').css("min-height", "0");
         $(obj).parents('.image_resize').css("max-height", "none");
         $(obj).addClass("resized");
         $(obj).css("margin-left", margin_width); //set margin left
     	 $(obj).css("visibility","visible"); //show image when load finished
     	 $(obj).css("display","block"); //show image when load finished
       }else if(image_width < image_height && img_a >= ratio_n){ //condition for image width not wider than image height or its portrait image
       //console.log("port on portrait");
         //if image is portrait and image ratio is greater than 1.4, image width will set to available space and height will resize according to width. Then we need to adjust margin top position to keep image crop center.
         var ratio = image_width / output_w; //get width ratio
         var new_height = image_height / ratio; //get fit image height according to ratio
         var margin_height = 0 - (new_height - output_h) / 2; //count margin height for top gap, so that image can crop fit to space
         $(obj).css("width", output_w); //set image width
     	   if($(obj).parents('.swipethis').hasClass("slideshow_item")==true){
           $(obj).parents('.slideshow_item.swipethis').css("height", output_h); //set container height in to fit height
           $(obj).parents('.slideshow_item.swipethis').css("min-height", "0"); //set min height in auto
           $(obj).parents('.image_resize').css("display", "none"); //set first display to none
         }
         $(obj).parents('.image_resize').css("height", output_h);//set container height in to fit height
         $(obj).parents('.image_resize').css("min-height", "0");
         $(obj).parents('.image_resize').css("max-height", "none");
         $(obj).addClass("resized");
         $(obj).css("margin-top", margin_height);//set margin top
     	 $(obj).css("visibility","visible"); //show image when load finished
     	 $(obj).css("display","block"); //show image when load finished
       }
     }
     else if(orientation == "landscape"){ //condition for landscape orientation
       var output_h = output_w / ratio_n ; //set height to 1.4 space available width
       $(obj).css("max-width", "none"); // set css max-width to none
       var img_a = image_width / image_height; // get image ratio width to height, for detect image near square shape
       if(img_a < ratio_n && img_a > 1){ //condition for image landscape near square shape
       //console.log("little land on landscape");
       //if image near to square shape but ratio not greater than 1.4, image width will set to available space and height resize to fit ratio. Then we need to adjust margin top position to keep image crop center.
         var ratio_w = output_w / image_width; //get ratio of width available and image width
         var img_h = image_height * ratio_w; //get height image fit with ratio
         var margin_height = 0 - (img_h - output_h) / 2; //count margin height for top gap, so that image can crop fit to space
         $(obj).css("width", output_w); //set image width
     	   if($(obj).parents('.swipethis').hasClass("slideshow_item")==true){
           $(obj).parents('.slideshow_item.swipethis').css("height", output_h); //set container height in to fit height
           $(obj).parents('.slideshow_item.swipethis').css("min-height", "0"); //set min height in auto
           $(obj).parents('.image_resize').css("display", "none"); //set first display to none
         }
         if($(obj).parents('.image_resize').hasClass("slide_up_item")==true){
           $(obj).parents('.image_resize').animate({
             height: output_h
           },500,function()
           {
              $(obj).parents('.swipethis').find(".ico_loading").hide();
              $(obj).fadeIn(); //show image when load finished
              $(obj).css("display","block"); //show image when load finished
              $(obj).parents('.image_resize').removeClass('slide_up_item');
           });
         }else
         {
            $(obj).parents('.swipethis').find(".ico_loading").hide();
            $(obj).parents('.image_resize').css("height", output_h);
            $(obj).css("visibility","visible"); //show image when load finished
            $(obj).css("display","block"); //show image when load finished
         }
         $(obj).parents('.image_resize').css("min-height", "0");
         $(obj).parents('.image_resize').css("max-height", "none");
         $(obj).addClass("resized");
         $(obj).css("margin-top", margin_height);//set margin top
     	 //$(obj).css("visibility","visible"); //show image when load finished
     	 //$(obj).css("display","block"); //show image when load finished
     	 $(obj).parents('.info_wrap').find('.hotel_promo_list_disc_area').show();
       }else if(image_width == image_height){ //condition for image width same as image height or its square shape
       //console.log("sq on landscape");
       //if image is square shape, image width will set to available space and height will resize according to width. Then we need to adjust margin top position to keep image crop center.
         var margin_height = 0 - (output_w - output_h) / 2; //count margin height for top gap, so that image can crop fit to space
         $(obj).css("width", output_w); //set image width according to space available
     	   if($(obj).parents('.swipethis').hasClass("slideshow_item")==true){
           $(obj).parents('.slideshow_item.swipethis').css("height", output_h); //set container height in to fit height
           $(obj).parents('.slideshow_item.swipethis').css("min-height", "0"); //set min height in auto
           $(obj).parents('.image_resize').css("display", "none"); //set first display to none
         }
         if($(obj).parents('.image_resize').hasClass("slide_up_item")==true){
           $(obj).parents('.image_resize').animate({
             height: output_h
           },500,function()
           {
              $(obj).parents('.swipethis').find(".ico_loading").hide();
              $(obj).fadeIn(); //show image when load finished
              $(obj).css("display","block"); //show image when load finished
              $(obj).parents('.image_resize').removeClass('slide_up_item');
           });
         }else
         {
            $(obj).parents('.swipethis').find(".ico_loading").hide();
            $(obj).parents('.image_resize').css("height", output_h);
            $(obj).css("visibility","visible"); //show image when load finished
            $(obj).css("display","block"); //show image when load finished
         }
         $(obj).parents('.image_resize').css("min-height", "0");
         $(obj).parents('.image_resize').css("max-height", "none");
         $(obj).addClass("resized");
         $(obj).css("margin-top", margin_height);//set margin top
     	 //$(obj).css("visibility","visible"); //show image when load finished
     	// $(obj).css("display","block"); //show image when load finished
     	 $(obj).parents('.info_wrap').find('.hotel_promo_list_disc_area').show();
       }else if(image_width < image_height){ //condition for image width not wider than image height or its portrait image
       //console.log("port on landscape");
         var get_rat_height = output_w / image_width;
     	   var get_height = image_height * get_rat_height;
     	   var margin_height = 0 - (get_height - output_h) / 2; //count margin height for top gap, so that image can crop fit to space
         $(obj).css("width", output_w); //set image width
     	   if($(obj).parents('.swipethis').hasClass("slideshow_item")==true){
           $(obj).parents('.slideshow_item.swipethis').css("height", output_h); //set container height in to fit height
           $(obj).parents('.slideshow_item.swipethis').css("min-height", "0"); //set min height in auto
           $(obj).parents('.image_resize').css("display", "none"); //set first display to none
         }
         if($(obj).parents('.image_resize').hasClass("slide_up_item")==true){
           $(obj).parents('.image_resize').animate({
             height: output_h
           },500,function()
           {
              $(obj).parents('.swipethis').find(".ico_loading").hide();
              $(obj).fadeIn(); //show image when load finished
              $(obj).css("display","block"); //show image when load finished
              $(obj).parents('.image_resize').removeClass('slide_up_item');
           });
         }else
         {
            $(obj).parents('.swipethis').find(".ico_loading").hide();
            $(obj).parents('.image_resize').css("height", output_h);
            $(obj).css("visibility","visible"); //show image when load finished
            $(obj).css("display","block"); //show image when load finished
         }
         $(obj).parents('.image_resize').css("min-height", "0");
         $(obj).parents('.image_resize').css("max-height", "none");
         $(obj).addClass("resized");
         $(obj).css("margin-top", margin_height);//set margin top
     	 //$(obj).css("visibility","visible"); //show image when load finished
     	 //$(obj).css("display","block"); //show image when load finished
     	 $(obj).parents('.info_wrap').find('.hotel_promo_list_disc_area').show();
       }else if(image_width > image_height && img_a >= ratio_n){ //condition for image width wider than image height or its landscape image
       //console.log("land on landscape");
         //if image is landscape and image ratio is greater than 1.4, image height will set to available space and width will resize according to height. Then we need to adjust margin left position to keep image crop center.
          var ratio_h = output_h / image_height; //get ratio of height available and image height
          var img_w = image_width * ratio_h; //get width image fit with ratio
          var margin_width = 0 - (img_w - output_w) / 2; //count margin width for left gap, so that image can crop fit to space
          $(obj).css("height", output_h); //set image height
     	 if($(obj).parents('.swipethis').hasClass("slideshow_item")==true){
           $(obj).parents('.slideshow_item.swipethis').css("height", output_h); //set container height in to fit height
           $(obj).parents('.slideshow_item.swipethis').css("min-height", "0"); //set min height in auto
           $(obj).parents('.image_resize').css("display", "none"); //set first display to none
         }
         if($(obj).parents('.image_resize').hasClass("slide_up_item")==true){
           $(obj).parents('.image_resize').animate({
             height: output_h
           },500,function()
           {
              $(obj).parents('.swipethis').find(".ico_loading").hide();
              $(obj).fadeIn(); //show image when load finished
              $(obj).css("display","block"); //show image when load finished
              $(obj).parents('.image_resize').removeClass('slide_up_item');
           });
         }else
         {
            $(obj).parents('.swipethis').find(".ico_loading").hide();
            $(obj).parents('.image_resize').css("height", output_h);
            $(obj).css("visibility","visible"); //show image when load finished
            $(obj).css("display","block"); //show image when load finished
         }
         $(obj).parents('.image_resize').css("min-height", "0");
         $(obj).parents('.image_resize').css("max-height", "none");
         $(obj).addClass("resized");
         $(obj).css("margin-left", margin_width); //set margin left
     	 //$(obj).css("visibility","visible"); //show image when load finished
     	 //$(obj).css("display","block"); //show image when load finished
     	 $(obj).parents('.info_wrap').find('.hotel_promo_list_disc_area').show();
       }
     }
}   
function fix_image(obj,ratio_n){
 var resized = $(obj).hasClass("resized");
  if(resized==false){
    obj.imagesLoaded(function( $images, $proper, $broken ) {
      $proper.each(function(){
        fix_image_item(obj,ratio_n);
        
      });
    });
  }
}
