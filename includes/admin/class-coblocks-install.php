<?php
/**
 * Run on plugin install
 *
 * @package   CoBlocks
 * @author    Rich Tabor & Jeffrey Carandang from CoBlocks
 * @link      https://coblocks.com
 * @license   http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * CoBlocks_Install Class
 */
class CoBlocks_Install {

	/**
	 * Constructor
	 */
	public function __construct() {
		register_activation_hook( COBLOCKS_PLUGIN_FILE, array( $this, 'register_defaults' ) );
	}

	/*
	 * Register plugin defaults
	 */
	function register_defaults() {
		if ( is_admin() ) {
			if ( ! get_option( 'coblocks_date_installed' ) ) {
				add_option( 'coblocks_date_installed', date( 'Y-m-d h:i:s' ) );
			}
		}
	}
}

return new CoBlocks_Install();