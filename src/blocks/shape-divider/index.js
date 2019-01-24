/**
 * External dependencies
 */
import classnames from 'classnames';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { getColorClassName } = wp.editor;

/**
 * Block constants
 */
const name = 'shape-divider';

const title = __( 'Shape Divider' );

const icon = icons.shapeDivider;

const keywords = [
	__( 'hr' ),
	__( 'separator' ),
	__( 'shape' ),
];

const blockAttributes = {
	align: {
		type: 'string',
		default: 'full',
	},
	height: {
		type: 'number',
		default: 100,
	},
	heightAlt: {
		type: 'number',
		default: 50,
	},
	verticalFlip: {
		type: 'boolean',
		default: false,
	},
	horizontalFlip: {
		type: 'boolean',
		default: false,
	},
	color: {
		type: 'string',
	},
	customColor: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	noBottomMargin: {
		type: 'boolean',
		default: true,
	},
	noTopMargin: {
		type: 'boolean',
		default: true,
	},
};

const settings = {

	title: title,

	description: __( 'Add a shape divider to visually distinquish page sections.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	styles: [
		{ name: 'wavy', label: __( 'Wavy' ), isDefault: true },
		{ name: 'hills', label: __( 'Hills' ) },
		{ name: 'waves', label: __( 'Waves' ) },
		{ name: 'angled', label: __( 'Angled' ) },
		{ name: 'sloped', label: __( 'Sloped' ) },
		{ name: 'rounded', label: __( 'Rounded' ) },
		{ name: 'triangle', label: __( 'Triangle' ) },
		{ name: 'pointed', label: __( 'Pointed' ) },
	],

	transforms: {
		from: [
			// Default.
			...[ ':divider', ':top-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }` );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						verticalFlip: true,
					} );
				},
			},
			// Waves.
			...[ ':waves-divider', ':waves-angled-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-waves',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-waves-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-waves',
						verticalFlip: true,
					} );
				},
			},
			// Sloped.
			...[ ':sloped-divider', ':top-sloped-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-sloped',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-sloped-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-sloped',
						verticalFlip: true,
					} );
				},
			},
			// Sloped.
			...[ ':rounded-divider', ':top-rounded-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-rounded',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-rounded-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-rounded',
						verticalFlip: true,
					} );
				},
			},
			// Angled.
			...[ ':angled-divider', ':top-angled-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-angled',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-angled-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-angled',
						verticalFlip: true,
					} );
				},
			},
			// Triangle.
			...[ ':triangle-divider', ':top-triangle-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-triangle',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-triangle-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-triangle',
						verticalFlip: true,
					} );
				},
			},
			// Pointed.
			...[ ':pointed-divider', ':top-pointed-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-pointed',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-pointed-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-pointed',
						verticalFlip: true,
					} );
				},
			},
			// Hills.
			...[ ':hills-divider', ':top-hills-divider' ].map( ( prefix ) => ( {
				type: 'prefix',
				prefix,
				transform() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-hills',
					} );
				},
			} ) ),
			{
				type: 'prefix',
				prefix: ':bottom-hills-divider',
				transform: function() {
					return createBlock( `coblocks/${ name }`, {
						className: 'is-style-hills',
						verticalFlip: true,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { height } ) => createBlock( `coblocks/${ name }`, {
					height: height,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'coblocks/dynamic-separator' ],
				transform: ( { height } ) => createBlock( `coblocks/${ name }`, {
					height: height,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => createBlock( `coblocks/${ name }` ),
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { height } ) => createBlock( 'core/spacer', {
					height: height,
				} ),
			},
		],
	},

	edit: Edit,

	save() {
		return null;
	},

	// save( { attributes, className } ) {

	// 	const {
	// 		color,
	// 		customColor,
	// 		height,
			// verticalFlip,
			// horizontalFlip,
			// backgroundColor,
			// customBackgroundColor,
	// 	} = attributes;

	// 	const colorClass = getColorClassName( 'color', color );

	// 	const classes = classnames(
	// 		className, {
	// 		'has-text-color': color || customColor,
	// 		[ colorClass ]: colorClass,
	// 	} );

	// 	const styles = {
	// 		color: colorClass ? undefined : customColor,
	// 		height: height ? height + 'px' : undefined,
	// 	};

	// 	return (
	// 		<hr className={ classes } style={ styles }></hr>
	// 	);
	// },
};

export { name, title, icon, settings };
