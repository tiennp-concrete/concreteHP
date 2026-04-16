<?php
/**
 * Culture Section Block Pattern
 */
return array(
	'title'       => __( 'Culture Section', 'concrete-child' ),
	'description' => __( 'Showcase company culture with glassmorphism design', 'concrete-child' ),
	'categories'  => array( 'concrete', 'culture' ),
	'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":"100px 40px"},"color":{"background":"var:preset|color|primary-light"}}} -->
<div class="wp-block-group has-primary-light-background-color has-background alignfull" style="padding:100px 40px">
	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"48px"}}} -->
	<h2 class="has-text-align-center" style="font-size:48px">Our Culture</h2>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"18px"},"spacing":{"margin":{"bottom":"60px"}}}} -->
	<p class="has-text-align-center" style="font-size:18px;margin-bottom:60px">Innovation, creativity, and collaboration at the heart of everything we do</p>
	<!-- /wp:paragraph -->
	
	<!-- wp:columns {"align":"wide"} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"width":"50%"} -->
		<div class="wp-block-column" style="flex-basis:50%">
			<!-- wp:image {"sizeSlug":"large"} -->
			<figure class="wp-block-image size-large"><img src="https://via.placeholder.com/400x400?text=Culture+1" alt="" /></figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->
		
		<!-- wp:column {"width":"50%"} -->
		<div class="wp-block-column" style="flex-basis:50%">
			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"32px"}}} -->
			<h3 style="font-size:32px">Collaborative Environment</h3>
			<!-- /wp:heading -->
			
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"18px"},"spacing":{"margin":{"bottom":"30px"}}}} -->
			<p style="font-size:18px;margin-bottom:30px">We believe in fostering an environment where every team member feels valued and heard. Our collaborative approach ensures that diverse perspectives drive innovation.</p>
			<!-- /wp:paragraph -->
			
			<!-- wp:list -->
			<ul><li>Open communication</li><li>Continuous learning</li><li>Team development</li><li>Work-life balance</li></ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
);
