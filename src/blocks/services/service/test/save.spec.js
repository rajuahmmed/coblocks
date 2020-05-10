/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( name, () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should render', () => {
		block.attributes.imageUrl = 'https://website.com/wp-content/uploads/1234/56/image.jpg';
		block.attributes.imageAlt = 'alt text';
		block.attributes.focalPoint = { x: 100, y: 0 };
		block.attributes.showCta = 1;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'src="https://website.com/wp-content/uploads/1234/56/image.jpg"' );
		expect( serializedBlock ).toContain( 'alt="alt text"' );
		expect( serializedBlock ).toContain( 'style="object-position:10000% 0%"' );
		expect( serializedBlock ).toContain( '"showCta":1' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
