import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Home.css'
import ProfileTab from '../../../../components/ProfileTab/ProfileTab';
import { useSelector } from 'react-redux';

function Home(props) {
    document.title = 'ToMe - Trang chủ cửa hàng';

    const user = useSelector(state => state.user)

    const [todos, setTodos] = useState({
        title: "Những việc cần làm:",
        items: [
            {
                name: "Bạn có 3 đơn hàng cần được xác nhận",
                value: <Link to="/order">Danh sách đơn hàng</Link>
            },
            {
                name: "Bạn có 10 đơn hàng cần được giao",
                value: ""
            },
        ]
    })

    const month = new Date().getMonth() + 1;

    const [orders, setOrders] = useState({
        title: `Hiệu quả kinh doanh tháng ${month}:`,
        items: [
            {
                name: "Doanh thu tháng này",
                value: "30.500.000 đ"
            },
            {
                name: "Đơn hàng",
                value: "27 đơn"
            },
        ]
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/api/orders/count-confirm/${user._id}`, {})
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                const newItems = [
                    {
                        name: `Bạn có ${res.data.countConfirm} đơn hàng cần được tiếp nhận`,
                        value: <Link to="/order">Danh sách đơn hàng</Link>
                    },
                    {
                        name: `Bạn có ${res.data.countDelivery} đơn hàng cần được giao`,
                        value: ""
                    },
                ]

                setTodos({...todos, items: newItems})
            }
        })
        .catch(err => {
            // console.log(err);
        })
    }, [user])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/orders/count-order-month/${user._id}`, {})
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                const newItems = [
                    {
                        name: "Doanh thu",
                        value: `${res.data.turnover.toLocaleString("vi")} đ`
                    },
                    {
                        name: "Số đơn hàng",
                        value: `${res.data.countOrder.toLocaleString("vi")} đơn`
                    },
                ]

                console.log(newItems);

                setOrders({...orders, items: newItems})
            }
        })
        .catch(err => {
            // console.log(err);
        })
    }, [user])

    return (
        <Fragment>
            <div className="title-2 mb-20">Trang chủ</div>

            <div className="row no-gutters mt-20">
                <div className="col l-10 l-o-1">
                    {/* <div className="user-profile__btn-change-info">
                        <Link to="/user/edit" className=" form-submit">Chỉnh sửa thông tin cửa hàng</Link>
                    </div>
                    <ProfileTab profileTab={accountInfo}/>
                    <ProfileTab profileTab={storeInfo}/> */}
                    <ProfileTab profileTab={todos}/>
                    <ProfileTab profileTab={orders}/>
                    {/* <ProfileTab profileTab={shipInfo}/> */}
                </div>
            </div>
        </Fragment>
    );
}

export default Home;