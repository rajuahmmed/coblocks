/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'prefix',
			prefix: ':card',
			transform() {
				return createBlock( metadata.name );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { alt, url, id } ) => (
				createBlock( metadata.name, {
					mediaAlt: alt,
					mediaId: id,
					mediaUrl: url,
					mediaType: 'image',
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'core/video' ],
			transform: ( { src, id } ) => (
				createBlock( metadata.name, {
					mediaId: id,
					mediaUrl: src,
					mediaType: 'video',
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'core/media-text' ],
			transform: ( { mediaAlt, mediaUrl, mediaId, mediaType, mediaPosition } ) => (
				createBlock( metadata.name, {
					mediaAlt,
					mediaId,
					mediaUrl,
					mediaType,
					mediaPosition,
				} )
			),
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/image' ],
			isMatch: ( { mediaType, mediaUrl } ) => {
				return ! mediaUrl || mediaType === 'image';
			},
			transform: ( { mediaAlt, mediaId, mediaUrl } ) => {
				return createBlock( 'core/image', {
					alt: mediaAlt,
					id: mediaId,
					url: mediaUrl,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/video' ],
			isMatch: ( { mediaType, mediaUrl } ) => {
				return ! mediaUrl || mediaType === 'video';
			},
			transform: ( { mediaId, mediaUrl } ) => {
				return createBlock( 'core/video', {
					id: mediaId,
					src: mediaUrl,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/media-text' ],
			transform: ( { mediaAlt, mediaUrl, mediaId, mediaType, mediaPosition } ) => (
				createBlock( 'core/media-text', {
					mediaAlt,
					mediaId,
					mediaUrl,
					mediaType,
					mediaPosition,
				} )
			),
		},
	],
};

export default transforms;
