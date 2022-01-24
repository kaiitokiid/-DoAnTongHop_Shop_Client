import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

import './UserProfile.css';
import ProfileTab from '../../../../components/ProfileTab/ProfileTab';

function UserProfile(props) {
    const user = useSelector(state => state.user);
    console.log(user);
    const accountInfo = {
        title: "Thông tin tài khoản",
        items: [
            {
                name: "Email",
                value: user.email
            },
            {
                name: "ID tài khoản",
                value: user._id
            },
            {
                name: "Tài khoản đăng nhập",
                value: user.username
            },
        ]
    }

    const [storeInfo, setStoreInfo] = useState({
        title: "Thông tin cửa hàng",
        items: [
            {
                name: "Tên cửa hàng",
                value: user.shopName
            },
            {
                name: "Chủ cửa hàng",
                value: user.fullname
            },
            {
                name: "Số điện thoại",
                value: user.phoneNumber
            },
            {
                name: "Loại sản phẩm chính",
                value: "Điện thoại - Máy tính bảng"
            },
        ]
    })

    const contactInfo = {
        title: "Thông tin liên lạc",
        items: [
            {
                name: "Tỉnh/Thành phố",
                value: !user.address ? "Chưa có địa chỉ" : user.address.provinceName
            },
            {
                name: "Quận/Huyện",
                value: !user.address ? "Chưa có địa chỉ" : user.address.districtName
            },
            {
                name: "Xã/Phường",
                value: !user.address ? "Chưa có địa chỉ" : user.address.wardName
            },
            {
                name: "Địa chỉ",
                value: !user.address ? "Chưa có địa chỉ" : user.address.addressInfo
            },
        ]
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/categories/${user.industryId}`, {})
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                const newItems = storeInfo.items;
                console.log(newItems);
                newItems[3].value = res.data.data.name;

                setStoreInfo({...storeInfo, items: newItems})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <div className="user-profile">
            <div className="title-2 mb-20">Thông tin cửa hàng</div>
            <div className="row no-gutters">
                <div className="col l-3">
                    <img className="user-profile-image" src={user.image?.path} alt={user.image?.path} />
                    <div className="user-profile__btn-change-image">
                        <button to="/user/edit" className=" form-submit">Chỉnh sửa logo cửa hàng</button>
                    </div>
                </div>
                <div className="col l-9">
                    <div className="user-profile__btn-change-info">
                        <Link to="/user/edit" className=" form-submit">Chỉnh sửa thông tin cửa hàng</Link>
                    </div>
                    <ProfileTab profileTab={accountInfo}/>
                    <ProfileTab profileTab={storeInfo}/>
                    <ProfileTab profileTab={contactInfo}/>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;