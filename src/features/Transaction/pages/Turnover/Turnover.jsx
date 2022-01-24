import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './Turnover.css';

function Turnover() {
    document.title = 'ToMe - Doanh thu'
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        keyword: '',
        minPrice: '',
        maxPrice: '',
        priceOrder: 0,
        kindOfTransaction: '',
        status: '3',
        startDate: '',
        endDate: '',
    });


    const [orders, setOrders] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [turnover, setTurnover] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleReset = () => {
        setParam({...param, keyword: '',minPrice: '',maxPrice: '',priceOrder: 0,kindOfTransaction: '',status: '3'});
        setIsSubmit(!isSubmit);
    }

    const handlePage = (n) => {
        if(param.page + n !== 0 && param.page + n <= totalPage) {
            setParam({...param, page: param.page + n});
            setIsSubmit(!isSubmit);
        }
    }

    function daysInMonth(iMonth, iYear) {
        return new Date(iYear, iMonth, 0).getDate();
    }

    useEffect(() => {
        
        const year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        
        if(month < 10) {
            month = `0${month}`
        }
        var lastDayOfMonth = daysInMonth(month, year);
        
        const startDate = `${year}-${month}-01`;
        const endDate = `${year}-${month}-${lastDayOfMonth}`;

        console.log(startDate, endDate);

        setParam({...param, startDate, endDate})
        setIsSubmit(!isSubmit)
    }, [])

    console.log(param);

    // get orders
    useEffect(() => {
        const url = `http://localhost:5000/api/transaction/get-turnover/${user._id}?page=${param.page}&pageSize=${param.pageSize}&keyword=${param.keyword}&minPrice=${param.minPrice}&maxPrice=${param.maxPrice}&priceOrder=${param.priceOrder}&kindOfTransaction=${param.kindOfTransaction}&status=${param.status}&startDate=${param.startDate}&endDate=${param.endDate}`;
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
                setOrders(res.data.data)
                setTotalPage(res.data.totalPage)
                setTurnover(res.data.turnover)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [isSubmit])

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('/');
    }

    function showTransaction(tran) {
        if(tran == '1')
            return "Thanh toán Momo"
        else {
            return "Thanh toán khi nhận hàng"
        }
    }

    function showStatus(status) {
        switch(status) {
            case 0: return <span className='label label-warning'>Chờ xác nhận</span>
            case 1: return <span className='label label-success'>Đã nhận</span>
            case 2: return <span className='label label-info '>Đang giao hàng</span>
            case 3: return <span className='label label-primary '>Đã giao hàng</span>
            case 9:  return <span className='label label-danger'>Đã hủy</span>
            default:
                return 'default'
        }
    }

    return (
        <div className="product-list">
            <h1 className='title'>Doanh thu</h1>
            {/* <div className="row no-gutters control-group">
                <label htmlFor="min-price" className="ml-10 mr-10 form-label label-turnover">Thời gian: Từ</label>
                <div className="col l-2 search-input-wrap">
                    <input 
                    value={param.startDate} 
                    onChange={(e) => setParam({...param, startDate: e.target.value})}  
                    required
                    type="date" className="search-input form-control" placeholder="Ngày bắt đầu" 
                    />
                </div>
                <label htmlFor="min-price" className="ml-10 mr-10 form-label label-turnover">Đến</label>
                
                <div className="col l-2 search-input-wrap">
                    <input 
                        value={param.endDate}
                        min={param.startDate} 
                        onChange={(e) => setParam({...param, endDate: e.target.value})} 
                        required
                        type="date" className="search-input form-control" placeholder="Ngày bắt đầu" 
                    />
                </div>
            </div> */}
            <div className="row no-gutters control-group">
                <label htmlFor="min-price" className="ml-10 mr-10 form-label label-turnover">Thời gian: Từ</label>
                <div className="col l-2 search-input-wrap">
                    <input 
                    value={param.startDate} 
                    onChange={(e) => setParam({...param, startDate: e.target.value})}  
                    required
                    type="date" className="search-input form-control" placeholder="Ngày bắt đầu" 
                    />
                </div>
                <label htmlFor="min-price" className="ml-10 mr-10 form-label label-turnover">Đến</label>
                
                <div className="col l-2 search-input-wrap">
                    <input 
                        value={param.endDate}
                        min={param.startDate} 
                        onChange={(e) => setParam({...param, endDate: e.target.value})} 
                        required
                        type="date" className="search-input form-control" placeholder="Ngày bắt đầu" 
                    />
                </div>
                {/* <div className="col l-2 search-input-wrap">
                    <input value={param.keyword} onChange={(e) => setParam({...param, keyword: e.target.value})} type="text" className="search-input form-control" placeholder="Mã đơn hàng..." />
                </div> */}

                <div className="col l-2 category-filter">
                    <select value={param.kindOfTransaction} onChange={(e) => setParam({...param, kindOfTransaction: e.target.value})} className="price-order form-control">
                        <option value="">--Hình thức thanh toán--</option>
                        <option value="0">Thanh toán khi nhận hàng</option>
                        <option value="1">Thanh toán Momo</option>
                    </select>
                {/* </div>

                <div className="col l-1 isblock-filter"> */}
                    {/* <select value={param.status} onChange={(e) => setParam({...param, status: e.target.value})} className="price-order form-control">
                        <option value="">--Trạng thái--</option>
                        <option value="0">Chờ xác nhận</option>
                        <option value="1">Đã xác nhận</option>
                        <option value="2">Đang giao hàng</option>
                        <option value="3">Đã giao hàng</option>
                        <option value="9">Đã hủy</option>
                    </select> */}
                </div>
                <button onClick={() => setIsSubmit(!isSubmit)} className="btn form-submit" type="button">Lọc dữ liệu</button>
                <button 
                    onClick={handleReset} 
                    className="btn reset-button form-submit" type="button"
                >
                    Làm mới
                </button>
            </div>
            <div className="row no-gutters control-group">
                <div className='get-turnover'>
                    Tổng doanh thu: {turnover.toLocaleString('vi')} đồng
                </div>
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
                            <th style={{width: "180px"}}>Mã đơn hàng</th>
                            <th style={{width: "250px"}}>Tên khách hàng</th>
                            <th className="align-right" style={{width: "200px"}}>Tổng giá đơn hàng</th>
                            <th className="align-right">Ngày đặt hàng</th>
                            <th className="align-right">Phương thức thanh toán</th>
                            <th className="align-right">Trạng thái</th>
                            <th style={{width: "150px"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!orders || Object.keys(orders).length === 0 ? (
                            <tr>
                                <td colSpan="9">
                                    <i className="fas fa-box-open"></i>
                                    Không có đơn hàng nào phù hợp
                                </td>
                            </tr>
                        ) : orders.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td className='order-list-padding'>{order._id}</td>
                                    <td>{order.username}</td>
                                    <td className="align-right">{order.totalPrice.toLocaleString("vi")} đ</td>
                                    <td className="align-right">{formatDate(order.createdAt)}</td>
                                    <td className="align-right">{showTransaction(order.kindOfTransaction)}</td>
                                    <td className="align-right">{showStatus(order.status)}</td>
                                    <td className='text-center'>
                                        <Link to={`/order/${order._id}` }className="btn my-btn btn_info">Chi tiết</Link>
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

export default Turnover;