import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './ProductList.css';

function ProductList() {
    document.title = 'ToMe - Danh sách sản phẩm'
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        keyword: '',
        minPrice: '',
        maxPrice: '',
        priceOrder: 0,
        categoryId: 0,
        isLock: '',
    });
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [isSubmit, setIsSubmit] = useState(false);

    const handleReset = () => {
        setParam({...param, keyword: '',minPrice: '',maxPrice: '',priceOrder: 0,categoryId: 0,isLock: ''});
        setIsSubmit(!isSubmit);
    }

    const handleDeleteProduct = (id, name) => {
        const result = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" không?`);

        if(result) {
            var token = JSON.parse(localStorage.getItem('TOKEN'));
            axios.delete(`http://localhost:5000/api/products/delete/${id}`, {
                headers: {
                    token
                }
            })
            .then(res => {
                if(res.data.isSuccess){
                    setIsSubmit(!isSubmit);
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const handlePage = (n) => {
        if(param.page + n !== 0 && param.page + n <= totalPage) {
            setParam({...param, page: param.page + n});
            setIsSubmit(!isSubmit);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/categories/', {})
        .then(res => {
            if(res.data.isSuccess){
                const data = res.data.data.map((item) => {
                    return { 
                        name: item.name,
                        id: item._id
                    }
                })

                setCategories(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        const url = `http://localhost:5000/api/products/shop-product-for-shop/${user._id}?page=${param.page}&pageSize=${param.pageSize}&keyword=${param.keyword}&minPrice=${param.minPrice}&maxPrice=${param.maxPrice}&priceOrder=${param.priceOrder}&categoryId=${param.categoryId}&isLock=${param.isLock}`;
        var token = JSON.parse(localStorage.getItem('TOKEN'));
        
        axios.get(url,{
            headers: {
                token
            }
        })
        .then(res => {
            console.log(res.data);
            if(res.data.isToken === false){
                navigate("/");
            }
            if(res.data.isSuccess){
                setProducts(res.data.data)
                setTotalPage(res.data.totalPage)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [isSubmit])

    return (
        <div className="product-list">
            <h1 className='title'>Danh sách sản phẩm</h1>
            <Link className="link" to="/product/create">Thêm mới sản phẩm</Link>
            <div className="row no-gutters control-group">
                <div className="col l-2 search-input-wrap">
                    <input value={param.keyword} onChange={(e) => setParam({...param, keyword: e.target.value})} type="text" className="search-input form-control" placeholder="Nhập thông tin cần tìm..." />
                </div>

                <div className="col l-5 price-filter">
                    <select  value={param.priceOrder} onChange={(e) => setParam({...param, priceOrder: e.target.value})} className="price-order form-control">
                        <option value="0">--Chọn giá--</option>
                        <option value="1">Thấp đến cao</option>
                        <option value="-1">Cao đến thấp</option>
                    </select>
                    <label htmlFor="min-price" className="ml-10 form-label">Giá từ:</label>
                    <input 
                        value={param.minPrice.toLocaleString("vi")} 
                        onChange={(e) => setParam({...param, minPrice: e.target.value})} 
                        type="number" id="min-price" 
                        className="price-input align-right form-control" 
                        placeholder="Giá bán thấp nhất" 
                    />
                    <label htmlFor="max-price" className="form-label">Đến</label>
                    <input 
                        value={param.maxPrice} 
                        onChange={(e) => setParam({...param, maxPrice: e.target.value})} 
                        type="number" id="max-price" 
                        className="price-input align-right form-control" 
                        placeholder="Giá bán cao nhất" 
                    />
                </div>

                <div className="col l-2 category-filter">
                    <select value={param.categoryId} onChange={(e) => setParam({...param, categoryId: e.target.value})} className="price-order form-control">
                        <option value="">--Chọn loại sản phẩm--</option>
                        {categories.map((category, index) => {
                            return (<option key={index} value={category.id}>{category.name}</option>)
                        })}
                    </select>
                </div>

                <div className="col l-1 isblock-filter">
                    <select value={param.isLock} onChange={(e) => setParam({...param, isLock: e.target.value})} className="price-order form-control">
                        <option value="">--Khác--</option>
                        <option value="true">Khóa</option>
                        <option value="false">Không khóa</option>
                    </select>
                </div>
                <button onClick={() => setIsSubmit(!isSubmit)} className="btn form-submit" type="button">Tìm kiếm</button>
                <button 
                    onClick={handleReset} 
                    className="btn reset-button form-submit" type="button"
                >
                    Làm mới
                </button>
            </div>

            <div className="row no-gutters page-control">
                <span onClick={() => handlePage(-1)} className="btn-page">
                    <i className="fas fa-angle-left"></i>
                </span>
                <span className="page">{param.page}/{totalPage}</span>
                <span onClick={() => handlePage(1)} className="btn-page">
                    <i className="fas fa-angle-right"></i>
                </span>
            </div>

            <div className="row no-gutters product-table">
                <table id="customers">
                    <thead>
                        <tr>
                            <th style={{width: "180px"}}>Mã sản phẩm</th>
                            <th style={{width: "150px", textAlign: "center"}}>Hình ảnh sản phẩm</th>
                            <th style={{width: "311px"}}>Tên sản phẩm</th>
                            <th className="align-right">Giá nhập</th>
                            <th className="align-right">Giá bán</th>
                            <th style={{width: "150px"}} className="align-right">Số lượng</th>
                            <th style={{width: "116px"}} className="align-right">Tổng lượt xem</th>
                            <th style={{width: "115px"}}>Khóa</th>
                            <th style={{width: "120px"}}></th>
                            <th style={{width: "150px"}}></th>
                            <th style={{width: "200px"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!products || Object.keys(products).length === 0 ? (
                            <tr>
                                <td colSpan="9">
                                    <i className="fas fa-box-open"></i>
                                    Không có sản phẩm nào phù hợp
                                </td>
                            </tr>
                        ) : products.map(product => {
                            return (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>
                                        <img className="product-table__img" src={product.image.path} alt={product.name}/>
                                    </td>
                                    <td>{product.name}</td>
                                    <td className="align-right">{product.originalPrice.toLocaleString("vi")} đ</td>
                                    <td className="align-right">{product.salePrice.toLocaleString("vi")} đ</td>
                                    <td className="align-right">{product.stock.toLocaleString("vi")} sản phẩm</td>
                                    <td className="align-right">{product.viewcount.toLocaleString("vi")} lượt</td>
                                    <td>{!product.isLock ? '' : 'Đã bị khóa'}</td>
                                    <td>
                                        <Link to={`/product/${product._id}` }className="btn my-btn btn_info">Chi tiết</Link>
                                    </td>
                                    <td>
                                        <Link to={`/product/stock/${product._id}` }className="btn my-btn">Nhập hàng</Link>
                                    </td>
                                    <td>
                                        {/* <Link to={`/product/edit/${product._id}` }className="btn form-submit btn_edit">Nhập hàng</Link> */}
                                        <Link to={`/product/edit/${product._id}` }className="btn form-submit btn_edit">Sửa</Link>
                                        <button onClick={() => handleDeleteProduct(product._id, product.name)} className="btn form-submit btn_danger">Xóa</button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <div className="row no-gutters page-control">
                    <span onClick={() => handlePage(-1)} className="btn-page">
                        <i className="fas fa-angle-left"></i>
                    </span>
                    <span className="page">{param.page}/{totalPage}</span>
                    <span onClick={() => handlePage(1)} className="btn-page">
                        <i className="fas fa-angle-right"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductList;