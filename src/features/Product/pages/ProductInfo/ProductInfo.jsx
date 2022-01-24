import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'; 
import axios from 'axios';

import './ProductInfo.css';
import ProfileTab from '../../../../components/ProfileTab/ProfileTab';

function ProductInfo(props) {
    document.title = 'ToMe - Chi tiết sản phẩm'
    const params = useParams();
    const [product, setProduct] = useState({});
    console.log(product);

    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/products/${params.id}`
        )
        .then(res => {
            if(res.data.isSuccess){
                console.log("res.data", res.data);
                document.title= 'ToMe - ' + res.data.data.name;
                setProduct({...res.data.data})
            }
        })
        .catch(err => {
            console.log(err);
            // navigate("/not-found")
        })
    }, [])


    let productInfo;
    let productDesc;
    let productStatus;

    if (product.length  !== 0)
    {
        productInfo = {
            title: "Thông tin sản phẩm",
            items: [
                {
                    name: "Mã sản phẩm",
                    value: product._id
                },
                {
                    name: "Tên sản phẩm",
                    value: product.name
                },
                {
                    name: "Loại sản phẩm",
                    value: "Giày dép - nữ"
                },
                {
                    name: "Giá nhập hàng",
                    value: product?.originalPrice?.toLocaleString("vi") + " đ"
                },
                {
                    name: "Giá bán hàng",
                    value: product?.salePrice?.toLocaleString("vi") + " đ"
                },
                {
                    name: "Số lượng sản phẩm còn",
                    value: product.stock + " sản phẩm"
                },
            ]
        }
    
        productDesc = {
            title: "Mô tả sản phẩm",
            items: [
                {
                    name: "Thương hiệu",
                    value: product.branch
                },
                {
                    name: "Xuất xứ",
                    value: product.originCountry
                },
                {
                    name: "Mô tả thêm",
                    value: product.otherInfo
                },
            ]
        }
        productStatus = {
            title: "Trạng thái sản phẩm",
            items: [
                {
                    name: "Khóa",
                    value: product.isLock ? 'Đã bị khóa' : 'Không khóa'
                },
                {
                    name: "Ghi chú",
                    value: product.notice
                },

            ]
        }
    }

    return (
        <div className="user-profile">
            <div className="title-2 mb-20">Thông tin sản phẩm</div>
                <div className="row no-gutters">
                    <div className="col l-3">
                        <img className="user-profile-image" src={product?.image?.path} alt="hình ảnh sản phẩm" />
                        {/* <div className="user-profile__btn-change-image">
                            <button to="/user/edit" className=" form-submit">Chỉnh sửa logo cửa hàng</button>
                        </div> */}
                    </div>
                    <div className="col l-9">
                        <div className="user-profile__btn-change-info">
                            <Link to={"/product/edit/" + product._id} className="form-submit">Chỉnh sửa sản phẩm</Link>
                        </div>
                        <ProfileTab profileTab={productInfo}/>
                        <ProfileTab profileTab={productDesc}/>
                        <ProfileTab profileTab={productStatus}/>
                    </div>
                </div>
        </div>
    );
}

export default ProductInfo;