<?php
/**
 * Concrete HP Child Theme Functions
 *
 * @package ConcreteChild
 */

/**
 * Enqueue front-end styles and scripts.
 */
function concrete_child_enqueue_styles() {
    $theme_dir  = get_stylesheet_directory();
    $main_css   = $theme_dir . '/assets/css/main.css';
    $theme_js   = $theme_dir . '/theme.js';
    $version    = file_exists( $main_css ) ? filemtime( $main_css ) : wp_get_theme()->get( 'Version' );
    $js_version = file_exists( $theme_js ) ? filemtime( $theme_js ) : $version;

    // Google Fonts: Roboto + Noto Sans
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Noto+Sans:wght@400;700&display=swap',
        array(),
        null
    );

    // Main compiled CSS
    wp_enqueue_style(
        'concrete-child-main',
        get_stylesheet_directory_uri() . '/assets/css/main.css',
        array( 'google-fonts' ),
        $version
    );

    // Fallback style.css (for WordPress theme recognition)
    wp_enqueue_style(
        'concrete-child-style',
        get_stylesheet_uri(),
        array( 'concrete-child-main' ),
        $version
    );

    // Theme JS (sticky header)
    wp_enqueue_script(
        'concrete-child-script',
        get_stylesheet_directory_uri() . '/theme.js',
        array(),
        $js_version,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'concrete_child_enqueue_styles' );

/**
 * Theme setup.
 *
 * The block editor picks up main.css via add_editor_style(). WordPress
 * auto-prefixes every selector with `.editor-styles-wrapper` so the rules
 * apply only inside the editor iframe.
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
    add_editor_style( array(
        'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Noto+Sans:wght@400;700&display=swap',
        'assets/css/main.css',
        'editor-style.css',
    ) );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'wp-block-styles' );

    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'concrete-child' ),
        'footer'  => __( 'Footer Menu', 'concrete-child' ),
    ) );
}
add_action( 'after_setup_theme', 'concrete_child_setup' );

/**
 * Inject BrowserSync client for live-reload when WP_DEBUG is on.
 * Requires `npm run dev` (or `npm run serve`) running on host port 3000.
 *
 * `enqueue_block_assets` covers both the frontend AND the Site Editor iframe
 * (where `wp_footer` / `admin_footer` do not reliably fire).
 */
function concrete_child_browsersync_inject() {
    if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
        return;
    }
    wp_enqueue_script(
        'concrete-browsersync',
        'http://localhost:3000/browser-sync/browser-sync-client.js',
        array(),
        null,
        array( 'in_footer' => true, 'strategy' => 'async' )
    );
}
add_action( 'wp_enqueue_scripts',         'concrete_child_browsersync_inject' );
add_action( 'admin_enqueue_scripts',      'concrete_child_browsersync_inject' );
add_action( 'enqueue_block_assets',       'concrete_child_browsersync_inject' );
add_action( 'enqueue_block_editor_assets','concrete_child_browsersync_inject' );

/**
 * Register custom Gutenberg blocks built under blocks/build.
 */
function concrete_child_register_blocks() {
    $build_dir = get_stylesheet_directory() . '/blocks/build';
    $manifest  = $build_dir . '/blocks-manifest.php';

    if ( file_exists( $manifest ) && function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
        wp_register_block_types_from_metadata_collection( $build_dir, $manifest );
        return;
    }

    if ( ! is_dir( $build_dir ) ) {
        return;
    }

    foreach ( scandir( $build_dir ) as $entry ) {
        if ( '.' === $entry || '..' === $entry ) {
            continue;
        }
        $block_json = $build_dir . '/' . $entry . '/block.json';
        if ( file_exists( $block_json ) ) {
            register_block_type( $block_json );
        }
    }
}
add_action( 'init', 'concrete_child_register_blocks' );
