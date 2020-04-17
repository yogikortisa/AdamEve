<!--<div class="slideshow">
  <div id="slideshow<?php echo $module; ?>" class="nivoSlider" style="width: <?php echo $width; ?>px; height: <?php echo $height; ?>px;">
    <?php foreach ($banners as $banner) { ?>
    <?php if ($banner['link']) { ?>
    <a href="<?php echo $banner['link']; ?>"><img src="<?php echo $banner['image']; ?>" width="999px" alt="<?php echo $banner['title']; ?>" /></a>
    <?php } else { ?>
    <img src="<?php echo $banner['image']; ?>" alt="<?php echo $banner['title']; ?>" />
    <?php } ?>
    <?php } ?>
  </div>
</div>
<script type="text/javascript"><!--
$(document).ready(function() {
	$('#slideshow<?php echo $module; ?>').nivoSlider();
});
--><!--</script> -->

	
	<div class="row-fluid top_nav ">
	  <div class="span12">
	   <div class="logo_area nav dropdown">
		<a href="index.html">
		  <div class="logo">B</div>
		</a>
		
	   </div>
	     			  <div class="top-right">
				<div class="holiday_search">
				  <form class='search_hotel' id='form-search' name='form-search' method='get' action="http://www.bobobobo.com/search/searching">
                    <input id='main_search' name='main_search' type="text" placeholder="Search" />                    
				  </form>
				</div>
			  </div>
	      			      </div>
	</div>
      <!-- <span class="klik">klik</span> -->
      <div class="row-fluid clearfix main_menu_ajax_container">
        <div style="" class="span12 main_menu_ajax_content">
		  <div class="sub">
		    <!--<div class="main_menu_ajax_close">
		      <span class="ico_remove"></span>
		    </div>-->
		  </div>
        </div>
      </div>
    <div class="clear"></div>
        
    <script>
    jQuery(function($) {
     var get_w = $(window).width();
     var get_h = $(window).width()/2.88;
     $('#landing_slide').bjqs({
      animtype      : 'slide',
      height        : 1000,
      width         : 2560,
      nexttext         : 'Next', // Text for 'next' button (can use HTML)
      prevtext         : 'Prev', // Text for 'previous' button (can use HTML)
      animspeed     : 4000, // the delay between each slide
      automatic        : true, // automatic
      nexttext         : '<span class="ico_slideshow_r"></span>', // Text for 'next' button (can use HTML)
      prevtext         : '<span class="ico_slideshow_l"></span>', // Text for 'previous' button (can use HTML)
      usecaptions    : false, // show captions for images using the image title tag
      showmarkers     : false, // Show individual slide markers
      centermarkers : false, // Center markers horizontally
      hoverpause    : false, // pause the slider on hover
      responsive    : true
     });
     $(window).trigger('resize');
    });
    </script>
        	    <div class="landing_full nav dropdown">
		  <div class="row-fluid">
	        <div class="span12">
	          <div id="landing_slide" class="flexslider">
		        <ul class="bjqs">
		        		          			          			          <li><a href="image/adameve/av1.png"><img src="image/adameve/av1.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av2.png"><img src="image/adameve/av2.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av3.png"><img src="image/adameve/av3.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av4.png"><img src="image/adameve/av4.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av5.png"><img src="image/adameve/av5.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av6.png"><img src="image/adameve/av6.png" /></a></li>
																						  <li><a href="image/adameve/av7.png"><img src="image/adameve/av7.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av8.png"><img src="image/adameve/av8.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av9.png"><img src="image/adameve/av9.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av10.png"><img src="image/adameve/av10.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av11.png"><img src="image/adameve/av11.png" /></a></li>
																						  <li><a href="image/adameve/av10.png"><img src="image/adameve/av10.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av11.png"><img src="image/adameve/av11.png" /></a></li>
																						  <li><a href="image/adameve/av12.png"><img src="image/adameve/av12.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av13.png"><img src="image/adameve/av13.png" /></a></li>
																						  <li><a href="image/adameve/av14.png"><img src="image/adameve/av14.png" /></a></li>
		          		        		          			          			          <li><a href="image/adameve/av15.png"><img src="image/adameve/av15.png" /></a></li>
																						  <li><a href="image/adameve/av16.png"><img src="image/adameve/av16.png" /></a></li>
		          		         
		        </ul>
		          <!-- the player -->
			      <!--<div class="flowplayer" data-swf="misc/holiday/js/flowplayer/flowplayer.swf" data-ratio="0.417">
			         <video autobuffer autoplay loop>
			            <source type="video/mp4" src="misc/holiday/video/landing_page.mp4"/>
			         </video>
			      </div>-->
			  </div>
			</div>
		  </div>
		  
	    </div> 
	   	    	
      <!--Back to top button-->
      	<div class="backtotop-wrapper">
          <div class="backtotop tooltip-fade">
            <a href="javascript:void(0)" rel='tooltip' data-placement='left' data-original-title='back to top'>
              <span class="ico_back_to_top"></span>
            </a>
          </div>
        </div>
      <!--END-->
        
