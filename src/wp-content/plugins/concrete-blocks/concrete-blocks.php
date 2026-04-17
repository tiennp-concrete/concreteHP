<?php
/**
 * Plugin Name:       Concrete Blocks
 * Description:       Custom Gutenberg blocks for Concrete HP theme.
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            ConcreteHP
 * License:           GPL-2.0-or-later
 * Text Domain:       concrete-blocks
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    $manifest = __DIR__ . '/build/blocks-manifest.php';
    $build_dir = __DIR__ . '/build';

    if (file_exists($manifest) && function_exists('wp_register_block_types_from_metadata_collection')) {
        wp_register_block_types_from_metadata_collection($build_dir, $manifest);
        return;
    }

    if (is_dir($build_dir)) {
        foreach (scandir($build_dir) as $entry) {
            if ($entry === '.' || $entry === '..') continue;
            $block_json = $build_dir . '/' . $entry . '/block.json';
            if (file_exists($block_json)) {
                register_block_type($block_json);
            }
        }
    }
});
