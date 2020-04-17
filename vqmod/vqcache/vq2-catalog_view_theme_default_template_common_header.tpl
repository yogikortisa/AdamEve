<!DOCTYPE html>
<html dir="<?php echo $direction; ?>" lang="<?php echo $lang; ?>">
<head>
<meta charset="UTF-8" />
<title><?php echo $title; ?></title>
<base href="<?php echo $base; ?>" />
<?php if ($description) { ?>
<meta name="description" content="<?php echo $description; ?>" />
<?php } ?>
<?php if ($keywords) { ?>
<meta name="keywords" content="<?php echo $keywords; ?>" />
<?php } ?>
<?php if ($icon) { ?>
<link href="<?php echo $icon; ?>" rel="icon" />
<?php } ?>
<?php foreach ($links as $link) { ?>
<link href="<?php echo $link['href']; ?>" rel="<?php echo $link['rel']; ?>" />
<?php } ?>
<link rel="stylesheet" type="text/css" href="catalog/view/theme/default/stylesheet/stylesheet.css" />
<?php foreach ($styles as $style) { ?>
<link rel="<?php echo $style['rel']; ?>" type="text/css" href="<?php echo $style['href']; ?>" media="<?php echo $style['media']; ?>" />
<?php } ?>
<script type="text/javascript" src="catalog/view/javascript/jquery/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="catalog/view/javascript/jquery/ui/jquery-ui-1.8.16.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="catalog/view/javascript/jquery/ui/themes/ui-lightness/jquery-ui-1.8.16.custom.css" />
<script type="text/javascript" src="catalog/view/javascript/common.js"></script>
<?php foreach ($scripts as $script) { ?>
<script type="text/javascript" src="<?php echo $script; ?>"></script>
<?php } ?>

<!-- Slider Disini -->
<link href="catalog/view/theme/default/slider/css/style8915.css?v=42" rel="stylesheet"><link href="catalog/view/theme/default/slider/css/jquery-ui-1.9.1.custom.css" rel="stylesheet"><link href="catalog/view/theme/default/slider/css/bjqs.css" rel="stylesheet"><link href="catalog/view/theme/default/slider/js/autocomplete/jquery.autocomplete.css" rel="stylesheet">    
    <script languange="javascript">
      var base_url='index.html';
      window.session_cur = 'IDR';
      window.session_logged_in = '';
    </script>
    <script src="catalog/view/theme/default/slider/js/jquery.js"></script><script src="catalog/view/theme/default/slider/js/jquery.nicescroll.js"></script><script src="catalog/view/theme/default/slider/js/bootstrap.min.js"></script><script src="catalog/view/theme/default/slider/js/jquery-ui-1.9.1.custom.js"></script><script src="catalog/view/theme/default/slider/js/base64.js"></script><script src="catalog/view/theme/default/slider/js/hammer.js"></script><script src="catalog/view/theme/default/slider/js/jquery.specialevent.hammer.js"></script><script src="catalog/view/theme/default/slider/js/bjqs-1.3.min.js"></script><script src="catalog/view/theme/default/slider/js/script4c33.js?v=32"></script><script src="catalog/view/theme/default/slider/js/autocomplete/jquery.autocomplete.js"></script><script src="catalog/view/theme/default/slider/js/jquery.imagesloaded.min.js"></script><script src="catalog/view/theme/default/slider/js/jquery.tmpl.min.js"></script>
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <script src="http://scottjehl.github.com/Respond/respond.src.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="catalog/view/theme/default/slider/img/bobobobo_ico.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="welcomed0a3.html">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="welcome779a.html">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="welcome9bd0.html">
    <link rel="apple-touch-icon-precomposed" href="welcomecaeb.html">
    <script type="text/javascript" src="../use.typekit.net/abn1gia.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  	<script type="text/javascript">
  	
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-38199595-1']);
	  _gaq.push(['_setDomainName', 'bobobobo.com']);
	  _gaq.push(['_setCampNameKey', 'utm_name']);
	  _gaq.push(['_trackPageview']);

	</script>
<!-- Finish Slider -->
<!--[if IE 7]> 
<link rel="stylesheet" type="text/css" href="catalog/view/theme/default/stylesheet/ie7.css" />
<![endif]-->
<!--[if lt IE 7]>
<link rel="stylesheet" type="text/css" href="catalog/view/theme/default/stylesheet/ie6.css" />
<script type="text/javascript" src="catalog/view/javascript/DD_belatedPNG_0.0.8a-min.js"></script>
<script type="text/javascript">
DD_belatedPNG.fix('#logo img');
</script>
<![endif]-->
<?php if ($stores) { ?>
<script type="text/javascript"><!--
$(document).ready(function() {
<?php foreach ($stores as $store) { ?>
$('body').prepend('<iframe src="<?php echo $store; ?>" style="display: none;"></iframe>');
<?php } ?>
});
//--></script>
<?php } ?>
<?php echo $google_analytics; ?>
<link href="catalog/view/javascript/jquery/cloud-zoom/cloud-zoom.css" rel="stylesheet" type="text/css" />
<script type="text/JavaScript" src="catalog/view/javascript/jquery/cloud-zoom/cloud-zoom.1.0.2.js"></script>
</head>
<body>
<!-- Oprek -->



<!-- Oprek -->
<div id="container">
<div id="header">
	<div class="menutop"><?php echo $cart; ?><?php echo $currency; ?>
		<li><a href="#">SHOP</a></li>
        <li><font color="#FFFFFF">|</font></li>
    	<li><a href="#">HOLIDAY</a></li>
        <li><font color="#FFFFFF">|</font></li>
    	<li><a href="#">TREATS</a></li>
    </div>
    <div id="welcome">
    <?php if (!$logged) { ?>
    <?php echo $text_welcome; ?>
    <?php } else { ?>
    <?php echo $text_logged; ?>
    <?php } ?>
  </div>
	
</div>
  
  
  
  
  <!--<div class="links"><a href="<?php echo $home; ?>"><?php echo $text_home; ?></a><a href="<?php echo $wishlist; ?>" id="wishlist-total"><?php echo $text_wishlist; ?></a><a href="<?php echo $account; ?>"><?php echo $text_account; ?></a><a href="<?php echo $shopping_cart; ?>"><?php echo $text_shopping_cart; ?></a><a href="<?php echo $checkout; ?>"><?php echo $text_checkout; ?></a></div>
-->
<?php if ($categories) { ?>
<div id="menu">
  
</div>
<?php } ?>
<?php if ($error) { ?>
    
    <div class="warning"><?php echo $error ?><img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>
    
<?php } ?>
<div id="notification"></div>
