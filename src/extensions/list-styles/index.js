/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

// Default list style for reset.
registerBlockStyle( 'core/list', {
	name: 'default',
	/* translators: block style */
	label: __( 'Default', 'coblocks' ),
	isDefault: true,
} );

registerBlockStyle( 'core/list', {
	name: 'none',
	/* translators: block style */
	label: __( 'None', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/list', {
	name: 'checkbox',
	/* translators: block style */
	label: __( 'Checkbox', 'coblocks' ),
	isDefault: false,
} );
