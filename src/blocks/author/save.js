/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { hasEmptyAttributes } from '../../utils/block-helpers';
import fromEntries from '../../js/coblocks-fromEntries';

/**
 * WordPress dependencies
 */
import { RichText, InnerBlocks, getColorClassName, getFontSizeClass } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'name', 'imgUrl', 'biography' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	if ( typeof Object.fromEntries === 'undefined' ) {
		return hasEmptyAttributes( fromEntries( newAttributes ) );
	}

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

const save = ( { className, attributes } ) => {
	const {
		backgroundColor,
		biography,
		customBackgroundColor,
		customTextColor,
		imgUrl,
		name,
		textColor,
		fontSize,
		customFontSize,
	} = attributes;

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const textClass = getColorClassName( 'color', textColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( className, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		[ textClass ]: textClass,
		[ backgroundClass ]: backgroundClass,
		[ fontSizeClass ]: fontSizeClass,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSizeClass ? undefined : customFontSize,
	};

	return isEmpty( attributes ) ? null : (
		<div className={ classes } style={ styles }>
			{ imgUrl && (
				<figure className={ 'wp-block-coblocks-author__avatar' }>
					<img className="wp-block-coblocks-author__avatar-img" src={ imgUrl } alt={ name } />
				</figure>
			) }
			<div className={ 'wp-block-coblocks-author__content' }>
				{ ! RichText.isEmpty( name ) && (
					<RichText.Content
						tagName="span"
						className="wp-block-coblocks-author__name"
						value={ name }
					/>
				) }
				{ ! RichText.isEmpty( biography ) && (
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-author__biography"
						value={ biography }
					/>
				) }
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
