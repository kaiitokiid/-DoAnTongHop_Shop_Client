import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './Register.css'
import * as Error from '../../../constants/error';
import { changeStateHeader } from '../../../../app/headerSlice'
import HeaderLogo from '../../../../components/HeaderLogo/HeaderLogo';

const schema = yup.object().shape({
    username: yup.string().required(Error.REQUIRED_USERNAME),
    shopName: yup.string().required(Error.REQUIRED_SHOPNAME),
    industryId: yup.string().required(Error.REQUIRED_INDUSTRY),
    password: yup.string().required(Error.REQUIRED_PASSWORD).min(4, Error.MIN_MAX).max(16, Error.MIN_MAX),
    confirmPassword: yup.string().oneOf([yup.ref("password")], Error.REQUIRED_CONFIRMPASSWORD).required(Error.REQUIRED_CONFIRMPASSWORD).min(4, Error.MIN_MAX).max(16, Error.MIN_MAX),
    fullname: yup.string().required(Error.REQUIRED_FULLNAME),
    phoneNumber: yup.string().required(Error.REQUIRED_PHONENUMBER).matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, Error.REQUIRED_PHONENUMBER),
    email: yup.string().required(Error.REQUIRED_EMAIL),
})

function Login() {
    document.title = 'ToMe - Đăng kí cửa hàng'
    const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');

    useEffect(() => {
        const action = changeStateHeader(false);
        dispatch(action)
        setFocus("fullname")
        return () => dispatch(changeStateHeader(true))
    }, [])

    const [categories, setCategories] = useState([]);
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

    const handleOnSubmit = (data) => {
        console.log(data);
        setServerError('');
        setServerSuccess('');
        axios.post('http://localhost:5000/api/user/shop-register',
            {
                ...data
            },
        )
        .then(res => {
            console.log("Register: ", res.data);
            if(res.data.isSuccess){
                setServerSuccess(res.data.message);
                setFocus("fullname")
                reset()
            }
            else {
                setServerError(res.data.message)
                setFocus("fullname")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <Fragment>
            <HeaderLogo />
            <div className="register-page">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-8"></div>
                        <div className="col l-4">
                            <div className="main-login">
                                <form className="form"
                                    onSubmit={handleSubmit(handleOnSubmit)}
                                >
                                    <h3 className="form-heading">Đăng ký cửa hàng</h3>
                                
                                    <div className="spacer"></div>

                                    <div className="form-group">
                                        <label htmlFor="fullname" className="form-label">Chủ cửa hàng</label>
                                        <input autoComplete="off" id="fullname" name="fullname" type="text" placeholder="Họ và tên chủ cửa hàng" className="form-control"
                                        {...register("fullname", {})}
                                        />
                                        <span className="form-message">{errors.fullname?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                                        <input autoComplete="off" id="phoneNumber" name="phoneNumber" type="text" placeholder="Số điện thoại" className="form-control"
                                        {...register("phoneNumber", {})}
                                        />
                                        <span className="form-message">{errors.phoneNumber?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input autoComplete="off" id="email" name="email" type="email" placeholder="Email" className="form-control"
                                        {...register("email", {})}
                                        />
                                        <span className="form-message">{errors.email?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="shopName" className="form-label">Tên cửa hàng</label>
                                        <input autoComplete="off" id="shopName" name="shopName" type="text" placeholder="Tên cửa hàng" className="form-control"
                                        {...register("shopName", {})}
                                        />
                                        <span className="form-message">{errors.shopName?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="industry" className="form-label">Ngành hàng chính của cửa hàng</label>
                                        <select name="industry" className="industry-regis form-control" {...register("industryId", {})}>
                                            <option value="">--Chọn ngành hàng chính của cửa hàng--</option>
                                            {categories.map((category, index) => {
                                                return (<option key={index} value={category.id}>{category.name}</option>)
                                            })}
                                        </select>
                                        <span className="form-message">{errors.industry?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="username" className="form-label">Tài khoản</label>
                                        <input autoComplete="off" id="username" name="username" type="text" placeholder="Nhập tài khoản" className="form-control"
                                        {...register("username", {})}
                                        />
                                        <span className="form-message">{errors.username?.message}</span>
                                    </div>
                                
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                                        <input autoComplete="off" id="password" name="password" type="password" placeholder="Nhập mật khẩu" className="form-control"
                                        {...register("password", {})}
                                        />
                                        <span className="form-message">{errors.password?.message}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                                        <input autoComplete="off" id="confirmPassword" name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" className="form-control"
                                        {...register("confirmPassword", {})}
                                        />
                                        <span className="form-message">{errors.confirmPassword?.message}</span>
                                    </div>
                                    <span className="form-message form-message--error">{serverError}</span>
                                    <span className="form-message form-message--success">{serverSuccess}</span>
                                
                                    <input type="submit" value="Đăng ký" className="form-submit" />
                                    <p className="form-conf">Bạn đã có tài khoản bán hàng? <Link to="/login">Đăng nhập</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;