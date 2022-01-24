import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './ChangePassword.css'
import * as Error from '../../../constants/error';

const schema = yup.object().shape({
    name: yup.string().required(Error.REQUIRED_PRODUCTNAME),
    categoryId: yup.string().required(Error.REQUIRED_CATEGORY),
    originalPrice: yup.string().required(Error.REQUIRED_ORIGINALPRICE),
    salePrice: yup.string().required(Error.REQUIRED_SALEPRICE),
    image: yup.string().required(Error.REQUIRED_IMAGE),
    branch: yup.string().required(Error.REQUIRED_BRANCH),
    originCountry: yup.string().required(Error.REQUIRED_ORIGINCOUNTRY),
    otherInfo: yup.string().required(Error.REQUIRED_OTHERINFO),
    stock: yup.string().required(Error.REQUIRED_STOCK),
    // confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required().min(4).max(16),
})

function ChangePassword() {
    const { register, handleSubmit, setValue, reset, setFocus, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');

    const [categories, setCategories] = useState([]);
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        setValue('image', e.target.value);
        console.log(e.target.value);
        console.log(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

 
    useEffect(() => {
        setFocus('name');
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

    const callApi = async (base64EncodedImage, data) => {
        setServerError('');
        setServerSuccess('');
        console.log('uploadImage: ', base64EncodedImage);
        data.image = base64EncodedImage;
        console.log(data);
        var token = JSON.parse(localStorage.getItem('TOKEN'));
        console.log(token);
        axios.post('http://localhost:5000/api/products/create',{
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
                // reset({
                //     name : ''
                // });
                setSelectedFile('file');
                setFileInputState('');
                setPreviewSource('');
                setValue('name', '');
                setValue('categoryId', '');
                setValue('originalPrice', '');
                setValue('salePrice', '');
                setValue('branch', '');
                setValue('originCountry', '');
                setValue('otherInfo', '');
                setValue('stock', '');
                setValue('image', '');
            }
            else {
                setServerError(res.data.message)
            }
        })
        .catch(err => {
            console.log(err);
        })
    };

    const handleOnSubmit = (data, e) => {
        console.log(data);
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            console.log(reader.result);
            callApi(reader.result, data);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    }

    return (
        <form className="product-list" onSubmit={handleSubmit(handleOnSubmit)}>
            <h1 className='title'>Thay đổi mật khẩu</h1>
            <Link className="link" to="/user">Thông tin cửa hàng</Link>
            <div className="error-block">
                <span className="form-message font-2 form-message__server form-message--error">{serverError}</span>
                <span className="form-message font-2 form-message__server form-message--success">{serverSuccess}</span>
            </div>
            <div className="mt-15 row no-gutters prodct-add-group">
                <div className="col l-3 l-o-1">
                </div>
            </div>
            <div className="row no-gutters prodct-add-group">
                <div className="col l-3 l-o-2">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Mật khẩu cũ:</label>
                        <input autoComplete="off" id="name" name="name" type="text" placeholder="Mật khẩu cũ" className="form-control"
                            {...register("name", {})}
                        />
                        <span className="form-message">{errors.name?.message}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="originalPrice" className="form-label">Mật khẩu mới:</label>
                        <input autoComplete="off" id="originalPrice" name="originalPrice" type="text" placeholder="Mật khẩu mới" className="form-control"
                            {...register("originalPrice", {})} 
                        />
                        <span className="form-message">{errors.originalPrice?.message}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock" className="form-label">Nhập lại mật khẩu mới:</label>
                        <input autoComplete="off" id="stock" name="stock" type="text" placeholder="Nhập lại mật khẩu mới" className="form-control"
                            {...register("stock", {})} 
                        />
                        <span className="form-message">{errors.stock?.message}</span>
                    </div>

                    <div className="form-group">
                        <button className="mt-20 form-submit" type="submit">Lưu</button>
                    </div>

                </div>
            </div>
        </form>
    );
}

export default ChangePassword;