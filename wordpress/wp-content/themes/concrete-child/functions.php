<?php
/**
 * Concrete HP Child Theme Functions - Sun* Asterisk style
 *
 * @package ConcreteChild
 */

/**
 * Enqueue styles and scripts
 */
function concrete_child_enqueue_styles() {
    $version = wp_get_theme()->get( 'Version' );

    // Google Fonts: Roboto + Noto Sans
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Noto+Sans:wght@400;700&display=swap',
        array(),
        null
    );

    // Animate.css
    wp_enqueue_style(
        'animate-css',
        'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        array(),
        '4.1.1'
    );

    // Main compiled CSS
    wp_enqueue_style(
        'concrete-child-main',
        get_stylesheet_directory_uri() . '/assets/css/main.css',
        array( 'google-fonts', 'animate-css' ),
        $version
    );

    // Fallback style.css (for WordPress theme recognition)
    wp_enqueue_style(
        'concrete-child-style',
        get_stylesheet_uri(),
        array( 'concrete-child-main' ),
        $version
    );

    // Navigation CSS
    wp_enqueue_style(
        'concrete-child-navigation',
        get_stylesheet_directory_uri() . '/navigation.css',
        array( 'concrete-child-main' ),
        $version
    );

    // Particles.js
    wp_enqueue_script(
        'particles-js',
        'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js',
        array(),
        '2.0.0',
        true
    );

    // WOW.js
    wp_enqueue_script(
        'wow-js',
        'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js',
        array(),
        '1.1.2',
        true
    );

    // Theme JS
    wp_enqueue_script(
        'concrete-child-script',
        get_stylesheet_directory_uri() . '/theme.js',
        array( 'particles-js', 'wow-js' ),
        $version,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'concrete_child_enqueue_styles' );

/**
 * Theme setup
 */
function concrete_child_setup() {
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );
    add_theme_support( 'custom-logo', array(
        'height'      => 80,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'title-tag' );
    add_theme_support( 'editor-styles' );
    add_editor_style( 'editor-style.css' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'wp-block-styles' );

    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'concrete-child' ),
        'footer'  => __( 'Footer Menu', 'concrete-child' ),
    ) );
}
add_action( 'after_setup_theme', 'concrete_child_setup' );

/**
 * Register sidebars
 */
function concrete_child_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Primary Sidebar', 'concrete-child' ),
        'id'            => 'primary-sidebar',
        'description'   => __( 'Main sidebar for pages and posts', 'concrete-child' ),
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'concrete_child_widgets_init' );

/**
 * Fallback menu when no menu is assigned
 */
function concrete_child_fallback_menu() {
    $home = esc_url( home_url( '/' ) );
    echo '<ul id="primary-menu">';
    echo '<li><a href="' . $home . '">' . __( 'Home', 'concrete-child' ) . '</a></li>';
    echo '<li><a href="' . $home . '#business">' . __( 'Services', 'concrete-child' ) . '</a></li>';
    echo '<li><a href="' . $home . '#projects">' . __( 'Projects', 'concrete-child' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/careers' ) ) . '">' . __( 'Careers', 'concrete-child' ) . '</a></li>';
    echo '<li><a href="' . $home . '#environment">' . __( 'Environment', 'concrete-child' ) . '</a></li>';
    echo '<li><a href="' . $home . '#news">' . __( 'News', 'concrete-child' ) . '</a></li>';
    echo '</ul>';
}

/**
 * Custom template tags
 */
function concrete_child_posted_on() {
    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
    if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
        $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';
    }
    printf(
        $time_string,
        esc_attr( get_the_date( 'c' ) ),
        esc_html( get_the_date() )
    );
}
