import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import './EditUser.css'
import * as Error from '../../../constants/error';
import { getUser } from '../../../../app/userSlice';


const schema = yup.object().shape({
    shopName: yup.string().required(Error.REQUIRED_PRODUCTNAME),
    fullname: yup.string().required(Error.REQUIRED_CATEGORY),
    phoneNumber: yup.string().required(Error.REQUIRED_ORIGINALPRICE),
    email: yup.string().required(Error.REQUIRED_SALEPRICE),
    provinceName: yup.string().required(Error.REQUIRED_PROVINCE),
    districtName: yup.string().required(Error.REQUIRED_DISTRICT),
    wardName: yup.string().required(Error.REQUIRED_WARD),
    addressInfo: yup.string().required(Error.REQUIRED_ADDRESSINFO),
})

function EditUser() {
    const params = useParams()
    const navigate = useNavigate();
    const user = useSelector(state => state.user);


    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');

    const [provinceId, setProvinceId] = useState(-1);
    const [districtId, setDistrictId] = useState(-1);
    const [wardId, setWardId] = useState(-1);

    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        setProvinceId(user.address?.provinceId);
        setDistrictId(user.address?.districtId);
        setWardId(user.address?.wardId);
        setValue('shopName', user.shopName);
        setValue('fullname', user.fullname);
        setValue('phoneNumber', user.phoneNumber);
        setValue('email', user.email);
        setValue('provinceName', user.address?.provinceName);
        setValue('districtName', user.address?.districtName);
        setValue('wardName', user.address?.wardName);
        setValue('addressInfo', user.address?.addressInfo);
    }, [user])

    useEffect(() => {
        axios.get('https://api.mysupership.vn/v1/partner/areas/province', {})
        .then(res => {
            if(res.data.status === 'Success') {
                const data = res.data.results.map((item) => {
                    return { 
                        id: item.code,
                        name: item.name,
                    }
                })

                setProvinces(data);
            }

        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${user.address.provinceId}`, {})
        .then(res => {
            if(res.data.status === 'Success') {
                const data = res.data.results.map((item) => {
                    return { 
                        id: item.code,
                        name: item.name,
                    }
                })

                setDistricts(data);
            }

        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${user.address.districtId}`, {})
        .then(res => {
            if(res.data.status === 'Success') {
                const data = res.data.results.map((item) => {
                    return { 
                        id: item.code,
                        name: item.name,
                    }
                })

                setWards(data);
            }

        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceId}`, {})
        .then(res => {
            // console.log("district", res.data);
            if(res.data.status === 'Success') {
                const data = res.data.results.map((item) => {
                    return { 
                        id: item.code,
                        name: item.name,
                    }
                })

                setDistricts(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [provinceId])

    useEffect(() => {
        axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtId}`, {})
        .then(res => {
            // console.log("ward", res.data);
            if(res.data.status === 'Success') {
                const data = res.data.results.map((item) => {
                    return { 
                        id: item.code,
                        name: item.name,
                    }
                })

                setWards(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [districtId])

    const callApi = async (base64EncodedImage, data) => {
        setServerError('');
        setServerSuccess('');
        data.image = base64EncodedImage;
        console.log("CALL", base64EncodedImage);
        console.log("CALL", data);
        var token = JSON.parse(localStorage.getItem('TOKEN'));
        console.log(token);
        axios.put(`http://localhost:5000/api/products/edit/${params.id}`,{
            ...data
        },
        {
            headers: {
                token
            }
        })
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                setServerSuccess(res.data.message)
            }
            else {
                setServerError(res.data.message)
            }
        })
        .catch(err => {
            console.log(err);
        })
    };

    const handleProvinceChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setProvinceId(e.target.value);
        setValue('provinceName', e.nativeEvent.target[index].text);

        setDistrictId(-1);
        setValue('districtName', '');

        setWardId(-1);
        setValue('wardName', '');
    }

    const handleDistrictChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setDistrictId(e.target.value);
        setValue('districtName', e.nativeEvent.target[index].text);
    }

    const handleWardChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setWardId(e.target.value);
        setValue('wardName', e.nativeEvent.target[index].text);
    }

    const dispatch = useDispatch();
    

    const handleOnSubmit = (data, e) => {
        e.preventDefault()
        const { fullname, shopName, phoneNumber, email, ...address} = data
        const dataSubmit = {
            fullname,
            shopName,
            phoneNumber,
            email,
            address: {
                ...address,
                provinceId,
                districtId,
                wardId
            }
        }

        setServerError('');
        setServerSuccess('');
        var token = JSON.parse(localStorage.getItem('TOKEN'));
        axios.put(`http://localhost:5000/api/user/change-info`,{
            ...dataSubmit
        },
        {
            headers: {
                token
            }
        })
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                setServerSuccess(res.data.message);

                return axios.post('http://localhost:5000/api/user/token',
                {
                    token
                },
            )
            }
            else {
                setServerError(res.data.message)
            }
        })
        .then(res => {
            console.log(res.data);
            if (res.data.isSuccess) {
                const action = getUser(res.data.data)
                dispatch(action)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <form className="product-list" onSubmit={handleSubmit(handleOnSubmit)}>
            <h1 className='title'>Chỉnh sửa thông tin cửa hàng</h1>
            <Link className="link" to="/user">Thông tin cửa hàng</Link>
            <div className="error-block">
                <span className="form-message font-2 form-message__server form-message--error">{serverError}</span>
                <span className="form-message font-2 form-message__server form-message--success">{serverSuccess}</span>
            </div>
            <div className="mt-15 row no-gutters prodct-add-group">
                <div className="col l-3 l-o-1">
                    <h2 className='prodct-add-label'>Thông tin cửa hàng:</h2>
                </div>
            </div>
            <div className="row no-gutters prodct-add-group">
                <div className="col l-3 l-o-2">
                    <div className="form-group">
                        <label htmlFor="shopName" className="form-label">Tên cửa hàng:</label>
                        <input autoComplete="off" id="shopName" name="shopName" type="text" placeholder="Tên cửa hàng" className="form-control"
                            {...register("shopName", {})}
                        />
                        <span className="form-message">{errors.shopName?.message}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">Số điện thoại:</label>
                        <input autoComplete="off" id="phoneNumber" name="phoneNumber" type="text" placeholder="Số điện thoại" className="form-control"
                            {...register("phoneNumber", {})} 
                        />
                        <span className="form-message">{errors.phoneNumber?.message}</span>
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="stock" className="form-label">Số lượng sản phẩm:</label>
                        <input autoComplete="off" id="stock" name="stock" type="number" placeholder="Số lượng sản phẩm" className="form-control"
                            {...register("stock", {})} 
                        />
                        <span className="form-message">{errors.stock?.message}</span>
                    </div> */}
                </div>
                <div className="col l-3 l-o-1">
                    <div className="form-group">
                        <label htmlFor="fullname" className="form-label">Chủ cửa hàng:</label>
                        <input autoComplete="off" id="fullname" name="fullname" type="text" placeholder="Chủ cửa hàng" className="form-control"
                            {...register("fullname", {})}
                        />
                        <span className="form-message">{errors.fullname?.message}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input autoComplete="off" id="email" name="email" type="email" placeholder="Email" className="form-control"
                            {...register("email", {})} 
                        />
                        <span className="form-message">{errors.email?.message}</span>
                    </div>
                </div>
            </div>

            
            <div className="row no-gutters prodct-add-group">
                <div className="col l-3 l-o-1">
                   <h2 className='prodct-add-label'>Thông tin liên lạc:</h2>
                </div>
            </div>
            <div className="row no-gutters prodct-add-group">
                <div className="col l-3 l-o-2">
                    <div className="form-group">
                        <label htmlFor="province" className="form-label">Tỉnh/Thành Phố:</label>
                        <select name="province" className="price-order form-control" value={provinceId} onChange={handleProvinceChange}>
                            <option value="-1" defaultValue disabled>--Chọn Tỉnh/Thành Phố--</option>
                            {provinces.map((province, index) => {
                                return (<option key={index} value={province.id}>{province.name}</option>)
                            })}
                        </select>
                        <span className="form-message">{errors.provinceName?.message}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ward" className="form-label">Phường/Xã:</label>
                        <select name="ward" className="price-order form-control" value={wardId} onChange={handleWardChange}>
                            <option value="-1">--Chọn Phường/Xã--</option>
                            {wards.map((ward, index) => {
                                return (<option key={index} value={ward.id}>{ward.name}</option>)
                            })}
                        </select>
                        <span className="form-message">{errors.wardName?.message}</span>
                    </div>
                </div>

                <div className="col l-3 l-o-1">
                    <div className="form-group">
                        <label htmlFor="district" className="form-label">Quận/Huyện</label>
                        <select name="district" className="price-order form-control" value={districtId} onChange={handleDistrictChange} >
                            <option value="-1" disabled>--Chọn Quận/Huyện--</option>
                            {districts.map((district, index) => {
                                return (<option key={index} value={district.id}>{district.name}</option>)
                            })}
                        </select>
                        <span className="form-message">{errors.districtName?.message}</span>
                    </div>
                </div>
            </div>

            <div className="row no-gutters prodct-add-group">
                <div className="col l-7 l-o-2">
                    <div className="form-group">
                        <label htmlFor="addressInfo" className="form-label">Địa chỉ/Số nhà:</label>
                        <textarea 
                            autoComplete="off" id="addressInfo" name="addressInfo" type="text" 
                            className="form-control"
                            style={{resize: "none", height: "30px"}}
                            {...register("addressInfo", {})}
                        />
                        <span className="form-message">{errors.addressInfo?.message}</span>
                    </div>
                </div>

                <div className="col l-2 l-o-1">
                    <button className="mt-20 form-submit" type="submit">Lưu lại</button>
                    {/* <button 
                        className=" reset-button form-submit" type="button"
                        onClick={() => {reset(); setFileInputState('');
                        setPreviewSource('');}}
                    >
                        Làm mới
                    </button> */}
                </div>
            </div>
        </form>
    );
}

export default EditUser;