/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
const { attributes } = metadata;

const deprecatedIframeEmbed = ( { attributes } ) => {
	const {
		address,
		height,
		lat,
		lng,
		skin,
		zoom,
		iconSize,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
	} = attributes;

	const backgroundStyles = {
		minHeight: height ? height + 'px' : undefined,
	};

	const mapAttributes = {
		address,
		lat,
		lng,
		skin,
		zoom,
		iconSize,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
	};

	const attr = Object.keys( mapAttributes )
		.map( ( key ) => `/q${ key }/q:/q${ mapAttributes[ key ] }/q` )
		.join( '||' );

	const dataMap = { 'data-map-attr': attr };

	return <div style={ backgroundStyles } { ...dataMap } />;
};

const deprecatedUserLocale = ( { attributes } ) => {
	const {
		address,
		height,
		lat,
		lng,
		skin,
		zoom,
		iconSize,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
		hasApiKey,
	} = attributes;

	const backgroundStyles = {
		minHeight: height ? height + 'px' : undefined,
	};

	const mapAttributes = {
		address,
		lat,
		lng,
		skin,
		zoom,
		iconSize,
		mapTypeControl,
		zoomControl,
		streetViewControl,
		fullscreenControl,
	};

	const attr = Object.keys( mapAttributes )
		.map( ( key ) => `/q${ key }/q:/q${ mapAttributes[ key ] }/q` )
		.join( '||' );

	const dataMap = { 'data-map-attr': attr };

	return (
		<div style={ backgroundStyles } { ...dataMap }>
			{ ! hasApiKey && (
				<iframe
					title={ __( 'Google Map', 'coblocks' ) }
					frameBorder="0"
					style={ { width: '100%', minHeight: height + 'px' } }
					src={
						'https://www.google.com/maps?q=' +
						encodeURIComponent( address ) +
						'&language=ja&output=embed&hl=%s&z=' +
						zoom
					}
				/>
			) }
		</div>
	);
};

const deprecated = [
	{
		attributes,
		save: deprecatedIframeEmbed,
	},
	{
		attributes,
		save: deprecatedUserLocale,
	},
];

export default deprecated;
