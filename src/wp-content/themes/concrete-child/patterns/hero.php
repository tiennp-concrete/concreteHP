<?php
/**
 * Hero Block Pattern
 */
return array(
	'title'      => __( 'Hero Section', 'concrete-child' ),
	'description' => __( 'A hero banner with title, subtitle, and CTA buttons', 'concrete-child' ),
	'categories' => array( 'concrete', 'hero' ),
	'content'    => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":"120px 40px"},"color":{"background":"var:preset|color|primary-dark"}},"textColor":"white"} -->
<div class="wp-block-group has-white-color has-text-color has-primary-dark-background-color has-background alignfull" style="padding:120px 40px">
	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"64px","fontWeight":"700"}}} -->
	<h2 class="has-text-align-center" style="font-size:64px;font-weight:700">Welcome to Our Studio</h2>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"24px"}}} -->
	<p class="has-text-align-center" style="font-size:24px">Create digital experiences that matter</p>
	<!-- /wp:paragraph -->
	
	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
	<div class="wp-block-buttons">
		<!-- wp:button {"backgroundColor":"accent-orange"} -->
		<div class="wp-block-button"><a class="wp-block-button__link has-accent-orange-background-color has-background" href="#">Explore Services</a></div>
		<!-- /wp:button -->
		
		<!-- wp:button {"backgroundColor":"white","textColor":"primary-dark"} -->
		<div class="wp-block-button"><a class="wp-block-button__link has-primary-dark-color has-white-background-color has-text-color has-background" href="#">View Projects</a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->
</div>
<!-- /wp:group -->',
);
