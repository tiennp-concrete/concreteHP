<?php
/**
 * Concrete HP Child Theme Functions
 *
 * @package ConcreteChild
 */

// Enqueue parent theme stylesheet
function concrete_child_enqueue_styles() {
    wp_enqueue_style(
        'concrete-child-style',
        get_stylesheet_uri(),
        array( 'concrete-parent-style' ),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'concrete_child_enqueue_styles' );

/**
 * Custom child theme functionality
 */
function concrete_child_setup() {
    // Add supports specific to child theme here
    add_theme_support( 'post-formats', array( 'aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat' ) );
}
add_action( 'after_setup_theme', 'concrete_child_setup' );
