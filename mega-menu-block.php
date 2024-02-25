<?php

/**
 * Plugin Name:       Mega Menu Block
 * Description:       An interactive block with the Interactivity API
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mega-menu-block
 *
 * @package           create-block
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function mega_menu_block_mega_menu_block_block_init()
{
	register_block_type_from_metadata(__DIR__ . '/build');
}
add_action('init', 'mega_menu_block_mega_menu_block_block_init');

function mega_menu_template_part_areas(array $areas)
{
	$areas[] = [
		'area' => 'menu',
		'area_tag' => 'div',
		'description' => __('Menu templates are used to create sections for a mega menu.', 'mega-menu-block'),
		'icon' => 'layout',
		'label' => __('Menu', 'mega-menu-block'),
	];

	return $areas;
}
add_filter('default_wp_template_part_areas', 'mega_menu_template_part_areas');
