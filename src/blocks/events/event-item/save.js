/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
import { RichText, getColorClassName } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'title', 'description', 'eventDay', 'eventMonth', 'eventYear', 'eventTime', 'eventLocation' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

export default function save( { className, attributes } ) {
	const {
		customTextColor,
		description,
		eventDay,
		eventLocation,
		eventMonth,
		eventTime,
		eventYear,
		pageNum,
		textColor,
		title,
	} = attributes;

	const colorClass = getColorClassName( 'color', textColor );

	const classes = classnames( className, {
		'has-text-color': textColor || customTextColor,
		[ colorClass ]: colorClass,
	} );

	return isEmpty( attributes ) ? null : (
		<div
			className={ classes }
			data-page={ String( pageNum ) }
			style={ { color: colorClass ? undefined : customTextColor } }
		>
			<div className="wp-block-coblocks-events__date">
				<RichText.Content
					tagName="span"
					className="wp-block-coblocks-events__day"
					value={ eventDay }
				/>
				<div>
					<RichText.Content
						value={ eventMonth }
						tagName="span"
						className="wp-block-coblocks-events__month"
					/>
					<RichText.Content
						value={ eventYear }
						tagName="span"
						className="wp-block-coblocks-events__year"
					/>
				</div>
			</div>
			<div className="wp-block-coblocks-events__content">
				<RichText.Content
					value={ title }
					tagName="span"
					className="wp-block-coblocks-events__title"
				/>
				<RichText.Content
					value={ description }
					tagName="span"
					className="wp-block-coblocks-events__description"
					itemprop="description"
				/>
			</div>
			<div className="wp-block-coblocks-events__details">
				<RichText.Content
					value={ eventTime }
					tagName="span"
					className="wp-block-coblocks-events__time"
				/>
				<RichText.Content
					value={ eventLocation }
					tagName="span"
					className="wp-block-coblocks-events__location"
				/>
			</div>
		</div>
	);
}
