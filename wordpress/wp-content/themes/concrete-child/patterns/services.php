<?php
/**
 * Services Block Pattern
 */
return array(
	'title'       => __( 'Services Section', 'concrete-child' ),
	'description' => __( 'Three-column services showcase', 'concrete-child' ),
	'categories'  => array( 'concrete', 'services' ),
	'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":"100px 40px"}}} -->
<div class="wp-block-group alignfull" style="padding:100px 40px">
	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"48px"}}} -->
	<h2 class="has-text-align-center" style="font-size:48px">Our Services</h2>
	<!-- /wp:heading -->
	
	<!-- wp:columns {"align":"wide"} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"style":{"spacing":{"padding":"50px 30px"},"border":{"radius":"12px"},"color":{"background":"var:preset|color|bg-light"}}} -->
			<div class="wp-block-group has-bg-light-background-color has-background" style="border-radius:12px;padding:50px 30px">
				<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"48px"}}} -->
				<p class="has-text-align-center" style="font-size:48px">💡</p>
				<!-- /wp:paragraph -->
				
				<!-- wp:heading {"textAlign":"center","level":3} -->
				<h3 class="has-text-align-center">Creative Design</h3>
				<!-- /wp:heading -->
				
				<!-- wp:paragraph {"align":"center","textColor":"text-light"} -->
				<p class="has-text-align-center has-text-light-color has-text-color">Stunning visual design that captures attention and engages your audience</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
		
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"style":{"spacing":{"padding":"50px 30px"},"border":{"radius":"12px"},"color":{"background":"var:preset|color|bg-light"}}} -->
			<div class="wp-block-group has-bg-light-background-color has-background" style="border-radius:12px;padding:50px 30px">
				<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"48px"}}} -->
				<p class="has-text-align-center" style="font-size:48px">⚙️</p>
				<!-- /wp:paragraph -->
				
				<!-- wp:heading {"textAlign":"center","level":3} -->
				<h3 class="has-text-align-center">Engineering</h3>
				<!-- /wp:heading -->
				
				<!-- wp:paragraph {"align":"center","textColor":"text-light"} -->
				<p class="has-text-align-center has-text-light-color has-text-color">Robust technology solutions built with best practices and scalability</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
		
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"style":{"spacing":{"padding":"50px 30px"},"border":{"radius":"12px"},"color":{"background":"var:preset|color|bg-light"}}} -->
			<div class="wp-block-group has-bg-light-background-color has-background" style="border-radius:12px;padding:50px 30px">
				<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"48px"}}} -->
				<p class="has-text-align-center" style="font-size:48px">🚀</p>
				<!-- /wp:paragraph -->
				
				<!-- wp:heading {"textAlign":"center","level":3} -->
				<h3 class="has-text-align-center">Innovation</h3>
				<!-- /wp:heading -->
				
				<!-- wp:paragraph {"align":"center","textColor":"text-light"} -->
				<p class="has-text-align-center has-text-light-color has-text-color">Cutting-edge solutions that push boundaries and create breakthrough experiences</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
);
