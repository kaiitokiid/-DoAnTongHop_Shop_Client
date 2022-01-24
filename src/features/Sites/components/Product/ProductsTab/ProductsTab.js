import React from 'react';
import { Fragment } from 'react';
import ProductsBlock from '../ProductBlock/ProductsBlock';
import './ProductsTab.css';

function ProductsTab(props) {
    const { productTab } = props;

    const showProductsBlock = (products) => {
        var result = null;

        result = products.map((product, index) => {
            return (
                <ProductsBlock product={product} key={index} />
            );
        })

        return result;
    }

    return (
        <Fragment>
            <div className="productTab-container" >
                <div className="title">
                    <div>
                        {productTab.title}
                    </div>
                </div>

                <div className="row">
                    {showProductsBlock(productTab.products)}
                </div>
            </div>
        </Fragment>

    );
}

export default ProductsTab;