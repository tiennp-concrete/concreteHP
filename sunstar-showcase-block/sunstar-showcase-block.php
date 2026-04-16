<?php
/**
 * Plugin Name: Sunstar Showcase Block
 * Description: Custom Gutenberg block with a modern corporate showcase layout inspired by Sun Asterisk design.
 * Version: 1.0.0
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Author: ConcreteHP
 * Text Domain: sunstar-showcase-block
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SUNSTAR_SHOWCASE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SUNSTAR_SHOWCASE_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Register Gutenberg blocks from build directory
 */
function sunstar_showcase_block_init() {
    register_block_type(SUNSTAR_SHOWCASE_PLUGIN_DIR . 'build');
}
add_action('init', 'sunstar_showcase_block_init');
