import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './CreateProduct.css'
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

function CreateProduct() {
    document.title = 'ToMe - Thêm mới sản phẩm'
    const { register, handleSubmit, setValue, reset, setFocus, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');

    
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

    const [categories, setCategories] = useState([]);
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
            <h1 className='title'>Thêm mới sản phẩm</h1>
            <Link className="link" to="/product">Danh sách sản phẩm</Link>
            <div className="error-block">
                <span className="form-message font-2 form-message__server form-message--error">{serverError}</span>
                <span className="form-message font-2 form-message__server form-message--success">{serverSuccess}</span>
            </div>
            <div className="mt-15 row no-gutters prodct-add-group">
                <div className="col l-3 l-o-1">
                    <h2 className='prodct-add-label'>Thông tin sản phẩm:</h2>
                </div>
            </div>
            <div className="row no-gutters prodct-add-group">
                <div className="col l-3 l-o-2">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Tên sản phẩm:</label>
                        <input autoComplete="off" id="name" name="name" type="text" placeholder="Tên sản phẩm" className="form-control"
                            {...register("name", {})}
                        />
                        <span className="form-message">{errors.name?.message}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="originalPrice" className="form-label">Giá nhập hàng:</label>
                        <input autoComplete="off" id="originalPrice" name="originalPrice" type="number" placeholder="Giá nhập hàng" className="form-control"
                            {...register("originalPrice", {})} 
                        />
                        <span className="form-message">{errors.originalPrice?.message}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock" className="form-label">Số lượng sản phẩm:</label>
                        <input autoComplete="off" id="stock" name="stock" type="number" placeholder="Số lượng sản phẩm" className="form-control"
                            {...register("stock", {})} 
                        />
                        <span className="form-message">{errors.stock?.message}</span>
                    </div>
                </div>
                <div className="col l-3 l-o-1">
                    <div className="form-group">
                        <label htmlFor="categoryId" className="form-label">Loại sản phẩm:</label>
                        <select name="categoryId" className="price-order form-control" {...register("categoryId", {})}>
                            <option value="">--Chọn loại sản phẩm--</option>
                            {categories.map((category, index) => {
                                return (<option key={index} value={category.id}>{category.name}</option>)
                            })}
                        </select>
                        <span className="form-message">{errors.categoryId?.message}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="salePrice" className="form-label">Giá bán hàng:</label>
                        <input autoComplete="off" id="salePrice" name="salePrice" type="number" placeholder="Giá bán hàng" className="form-control"
                            {...register("salePrice", {})} 
                        />
                        <span className="form-message">{errors.salePrice?.message}</span>
                    </div>
                </div>

                
            </div>

            <div className="row no-gutters prodct-add-group">
                <div className="col l-3 l-o-2">
                    <div className="form-group">
                        <label htmlFor="image" className="form-label">Hình ảnh sản phẩm:</label>
                        <input autoComplete="off" id="image" name="image" type="file"className="form-control"
                            onChange={handleFileInputChange}
                            value={fileInputState}
                            // {...register("image", {})}
                        />
                        <span className="form-message">{errors.image?.message}</span>
                    </div>
                </div>
                <div className="col l-3 l-o-1">
                    <div className="form-group show-product-image">
                        {previewSource && (
                            <img
                                src={previewSource}
                                alt="chosen"
                                style={{ height: '300px', objectFit: "contain" }}
                            />
                        )}
                    </div>
                </div>
            </div>
            
            <div className="row no-gutters prodct-add-group">
                <div className="col l-3 l-o-1">
                   <h2 className='prodct-add-label'>Mô tả sản phẩm:</h2>
                </div>
            </div>
            <div className="row no-gutters prodct-add-group">
                <div className="col l-3 l-o-2">
                    <div className="form-group">
                        <label htmlFor="branch" className="form-label">Thương hiệu:</label>
                        <input autoComplete="off" id="branch" name="branch" type="text" placeholder="Thương hiệu" className="form-control"
                            {...register("branch", {})} 
                        />
                        <span className="form-message">{errors.branch?.message}</span>
                    </div>
                </div>

                <div className="col l-3 l-o-1">
                    <div className="form-group">
                        <label htmlFor="originCountry" className="form-label">Xuất xứ:</label>
                        <input autoComplete="off" id="originCountry" name="originCountry" type="text" placeholder="Xuất xứ" className="form-control"
                            {...register("originCountry", {})} 
                        />
                        <span className="form-message">{errors.originCountry?.message}</span>
                    </div>
                </div>
            </div>

            <div className="row no-gutters prodct-add-group">
                <div className="col l-7 l-o-2">
                    <div className="form-group">
                        <label htmlFor="ortherInfo" className="form-label">Mô tả thêm về sản phẩm:</label>
                        <textarea 
                            autoComplete="off" id="ortherInfo" 
                            rows="10" name="otherInfo" type="text" 
                            className="form-control"
                            style={{resize: "none", height: "150px"}}
                            {...register("otherInfo", {})}
                        />
                        <span className="form-message">{errors.otherInfo?.message}</span>
                    </div>
                </div>

                <div className="col l-2 l-o-1">
                    <button className="mt-20 form-submit" type="submit">Thêm mới sản phẩm</button>
                    <button 
                        className=" reset-button form-submit" type="button"
                        onClick={() => {reset(); setFileInputState('');
                        setPreviewSource('');}}
                    >
                        Làm mới
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CreateProduct;