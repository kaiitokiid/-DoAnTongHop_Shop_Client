import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './Login.css';
import * as Error from '../../../constants/error';
import { changeStateHeader } from '../../../../app/headerSlice'
import { getUser } from '../../../../app/userSlice'
import HeaderLogo from '../../../../components/HeaderLogo/HeaderLogo';

const schema = yup.object().shape({
    username: yup.string().required(Error.REQUIRED_USERNAME),
    password: yup.string().required(Error.REQUIRED_PASSWORD).min(4, Error.MIN_MAX).max(16, Error.MIN_MAX),
    // confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required().min(4).max(16),
})

function Login() {
    document.title = 'ToMe - Đăng nhập cửa hàng'
    const { register, handleSubmit, setFocus, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [serverError, setServerError] = useState('');

    useEffect(() => {
        document.title = "ToMe - Đăng nhập cho kênh bán hàng"
        const action = changeStateHeader(false);
        dispatch(action)
        setFocus("username")
        return () => dispatch(changeStateHeader(true))
    }, [])

    const handleOnSubmit = (data) => {
        console.log(data);
        setServerError('');
        axios.post('http://localhost:5000/api/user/shop-login',
            {
                username: data.username,
                password: data.password
            },
        )
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                localStorage.setItem('TOKEN', JSON.stringify(res.data.token));
                const action = getUser(res.data.user)
                dispatch(action)
                navigate('/home')
            }
            else {
                setServerError(res.data.message)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <Fragment>
            <HeaderLogo />
            <div className="login-page">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-8">
                            {/* Chào mừng đến với kênh bán hàng của ToMe */}
                        </div>
                        <div className="col l-4">
                            <div className="main-login">
                                <form className="form"
                                    onSubmit={handleSubmit(handleOnSubmit)}
                                >
                                    <h3 className="form-heading">Đăng nhập</h3>
                                
                                    <div className="spacer"></div>
                                
                                    <div className="form-group">
                                        <label htmlFor="username" className="form-label">Tài khoản</label>
                                        <input autoComplete="off" id="fullname" name="username" type="text" placeholder="Nhập tài khoản" className="form-control"
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
                                    <span className="form-message__server">{serverError}</span>
                                
                                    <input type="submit" value="Đăng nhập" className="form-submit" />
                                    <p className="form-conf">Bạn chưa có tài khoản bán hàng? <Link to="/register">Đăng ký</Link></p>
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