/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'core/button' , 'core/shortcode' ];
const TEMPLATE = [ [ 'core/button', { placeholder: __( 'Buy Now', 'coblocks' ) } ] ];

/**
 * Block edit function
 */
class Edit extends Component {
	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props;

		const {
			amount,
			currency,
			features,
			title,
			placeholder,
		} = attributes;

		const formattingControls = [ 'bold', 'italic', 'strikethrough' ];

		return (
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div
					className={ classnames(
						className, {
							'has-background': backgroundColor.color,
							'has-text-color': textColor.color,
							[ backgroundColor.class ]: backgroundColor.class,
							[ textColor.class ]: textColor.class,
						}
					) }
					style={ {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					} }
				>
					<RichText
						tagName="span"
						className="wp-block-coblocks-pricing-table-item__title"
						onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
						value={ title }
						placeholder={ placeholder || __( 'Plan A', 'coblocks' ) }
						formattingControls={ formattingControls }
						keepPlaceholderOnFocus
					/>
					<div className="wp-block-coblocks-pricing-table-item__price-wrapper">
						<RichText
							tagName="span"
							className="wp-block-coblocks-pricing-table-item__currency"
							onChange={ ( nextCurrency ) => setAttributes( { currency: nextCurrency } ) }
							value={ currency }
							placeholder={ __( '$', 'coblocks' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>
						<RichText
							tagName="span"
							className="wp-block-coblocks-pricing-table-item__amount"
							onChange={ ( nextAmount ) => setAttributes( { amount: nextAmount } ) }
							value={ amount }
							placeholder="99"
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>
					</div>
					<RichText
						tagName="ul"
						multiline="li"
						className="wp-block-coblocks-pricing-table-item__features"
						onChange={ ( nextFeatures ) => setAttributes( { features: nextFeatures } ) }
						value={ features }
						placeholder={ __( 'Add features', 'coblocks' ) }
						keepPlaceholderOnFocus
					/>
					<InnerBlocks
						template={ TEMPLATE }
						templateLock={ false }
						allowedBlocks={ ALLOWED_BLOCKS }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( Edit );
