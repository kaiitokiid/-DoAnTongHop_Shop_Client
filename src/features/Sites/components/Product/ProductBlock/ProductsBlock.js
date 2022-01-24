import React from 'react';
import { Link } from 'react-router-dom';
import './ProductsBlock.css';

function ProductsBlock(props) {
    const { product } = props;
    console.log(product);

    return (
        <Link to={`/${product.brand}/${product.name}`} className="col l-2-4" >
            <div className="home-product">
                <div className="home-product__img" style={{ backgroundImage: "url(https://cf.shopee.vn/file/d99bae6a331c6552d944345e1df175c2)" }}></div>
                <h4 className="home-product__name">{product.name}</h4>

                <div className="home-product__price-box">
                    <span className="home-product__price">{product.price}</span>
                    <span className="home-product__price-sale">{product.price}</span>
                </div>

                <div className="home-product__action-box">
                    {/* <!-- Heart --> */}
                    <span className="home-product__heart home-product__heart--active">
                        <i className="home-product__heart-icon far fa-heart"></i>
                        <i className="home-product__heart-icon--active fas fa-heart"></i>
                    </span>
                    {/* <!-- Rank --> */}
                    <span className="home-product__rank">
                        <i className="home-product__rank-icon--active fas fa-star"></i>
                        <i className="home-product__rank-icon--active fas fa-star"></i>
                        <i className="home-product__rank-icon--active fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </span>
                    <span className="home-product__sold">88 đã bán</span>
                </div>

                <div className="home-product__brand-box">
                    <span className="home-product__brand">Samsung</span>
                    <span className="home-product__origin">Hàn Quốc</span>
                </div>

                <div className="home-product__favorite">
                    <i className="fas fa-check"></i>
                    <span>Yêu thích</span>
                </div>

                <div className="home-product__sale-off">
                    <span className="home-product__sale-off-percent">10%</span>
                    <span className="home-product__sale-off-label">GIẢM</span>
                </div>
            </div>
        </Link>
    );

}

export default ProductsBlock;