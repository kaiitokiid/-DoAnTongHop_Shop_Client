import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import './OrderDetail.css';
import ProfileTab from '../../../../components/ProfileTab/ProfileTab';

function OrderDetail() {
    document.title = 'ToMe - Chi tiết đơn hàng';
    const params = useParams();

    const [isSubmit, setIsSubmit] = useState(false);


    const [products, setProducts] = useState([]);
    const [serverMessage, setServerMessage] = useState('');
    const [status, setStatus] = useState();
    const [statusList, setStatusList] = useState();

    const [accountInfo, setAccountInfo] = useState({
        title: "Thông tin khách hàng",
        items: [
            {
                name: "Tên khách hàng",
                value: ""
            },
            {
                name: "Số điện thoại",
                value: ""
            },
        ]
    })

    const [shipInfo, setShipInfo] = useState({
        title: "Thông tin giao hàng",
        items: [
            {
                name: "Tỉnh/Thành Phố",
                value: ""
            },
            {
                name: "Quận/Huyện",
                value: ""
            },
            {
                name: "Phường/Xã",
                value: ""
            },
            {
                name: "Địa chỉ",
                value: ""
            },
            {
                name: "Hình thức thanh toán",
                value: ""
            },

        ]
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/api/orders/get-order-by-id/${params.id}`, {})
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                setProducts(res.data.data.products)

                let accItems = [
                    {
                        name: "Tên khách hàng",
                        value: res.data.data.username
                    },
                    {
                        name: "Số điện thoại",
                        value: res.data.data.phoneNumber
                    },
                ]
                setAccountInfo({...accountInfo, items: accItems});

                let shipItems = [
                    {
                        name: "Tỉnh/Thành Phố",
                        value: res.data.data.address.provinceName
                    },
                    {
                        name: "Quận/Huyện",
                        value: res.data.data.address.districtName
                    },
                    {
                        name: "Phường/Xã",
                        value: res.data.data.address.wardName
                    },
                    {
                        name: "Địa chỉ",
                        value: res.data.data.address.addressInfo
                    },
                    {
                        name: "Hình thức thanh toán",
                        value: showTransaction(res.data.data.kindOfTransaction)
                    },
                ]

                setShipInfo({...shipInfo, items: shipItems});
                setStatus(res.data.data.status);
                setStatusList(res.data.data.status);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [isSubmit])

    function showTransaction(tran) {
        if(tran == '1')
            return "Thanh toán Momo"
        else {
            return "Thanh toán khi nhận hàng"
        }
    }

    function showStatus(status) {
        let result = [];

        switch(status) {
            case 0: result.push(  <option  key={0} value='0'>Chờ xác nhận</option>)
            case 1: result.push(  <option key={1} value='1'>Đã nhận</option>)
            case 2: result.push(  <option key={2} value='2'>Đang giao hàng</option>)
            case 3: result.push(  <option key={3} value='3'>Đã giao hàng</option>)
                    break;
            case 9:   <option value=''>Đã hủy</option>
                break;
            default:
                break;
        }
        return result;
    }

    function handleSubmit(e) {
        e.preventDefault()

        axios.post(`http://localhost:5000/api/orders/change-state/${params.id}`, {status})
        .then(res => {
            if(res.data.isSuccess){
                setServerMessage(res.data.message);
                setIsSubmit(!isSubmit);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="order-detail">
            <div className="title-2 mb-20">Chi tiết đơn hàng: {params.id}</div>
            {/* <h1 className='title'>Chi tiết đơn hàng: 0987654321</h1> */}
            <Link className="link" to="/order">Danh sách đơn hàng</Link>
            <div className="row no-gutters mt-20">
                <div className="col l-7 l-o-1">
                    {/* <div className="user-profile__btn-change-info">
                        <Link to="/user/edit" className=" form-submit">Chỉnh sửa thông tin cửa hàng</Link>
                    </div>
                    <ProfileTab profileTab={accountInfo}/>
                    <ProfileTab profileTab={storeInfo}/> */}
                    <ProfileTab profileTab={accountInfo}/>
                    <ProfileTab profileTab={shipInfo}/>
                </div>

                { status !== 9 &&
                <div className="col l-2 l-o-1">
                    <div className='status'>Trạng thái đơn hàng</div>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}  className="w-100 form-control">
                        {showStatus(statusList)}
                    </select>
                    <button onClick={handleSubmit} type='button' className="form-submit">Lưu trạng thái</button>
                    <div className='order-detail__mes form-message form-message--success'>{serverMessage}</div>
                </div>
                }
            </div>
            <h2>Danh sách sản phẩm:</h2>
            <div className="row no-gutters product-table">
                <table id="customers">
                    <thead>
                        <tr>
                            <th style={{width: "180px"}}>Mã sản phẩm</th>
                            <th style={{width: "150px", textAlign: "center"}}>Hình ảnh sản phẩm</th>
                            <th style={{width: "300px", textAlign: "center"}}>Tên sản phẩm</th>
                            <th className="align-right" style={{width: "300px"}}>Giá bán</th>
                            <th className="align-right">Số lượng</th>
                            <th className="align-right">Thành tiền</th>
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
                                    <td className="align-right">{product.salePrice.toLocaleString("vi")} đ</td>
                                    <td className="align-right">{product.quantity.toLocaleString("vi")} sản phẩm</td>
                                    <td className="align-right">{(product.salePrice * product.quantity).toLocaleString("vi")} đ</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;