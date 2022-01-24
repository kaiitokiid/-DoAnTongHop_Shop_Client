import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-3">
                            <label className="footer__label">Giới thiệu</label>
                            <ul className="footer__list">
                                <li><Link to="/"><i className="fas fa-address-card"></i> Về tôi</Link></li>
                                <li>
                                    <i className="fas fa-map-marker"></i>
                                    &nbsp;
                                    <p style={{ display: "inline-block" }}>Phường Tân Phú, TP. Thủ Đức, <br></br>TP. Hồ Chí Minh</p>
                                </li>
                                <li>
                                    <i className="fas fa-mobile"></i>&nbsp;&nbsp;0369.87.86.75
                                </li>
                                <li>
                                    <i className="far fa-envelope"> </i>&nbsp;12a1nguyenquocbao1412@gmail.com
                                </li>
                                <li>
                                    <i className="fab fa-facebook-square"></i>facebook.com/NguyenQuocBao1412/
                                </li>
                            </ul>
                        </div>

                        <div className="col l-3">
                            <label className="footer__label">Hỗ trợ khách hàng</label>
                            <ul className="footer__list">
                                <li>
                                    <Link to="/">Kiểm tra đơn hàng</Link>
                                </li>
                                <li>
                                    <Link to="/">Điều khoản sử dụng</Link>
                                </li>
                                <li>
                                    <Link to="/">Chính sách bảo hành</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col l-3 thanhtoan">
                            <label className="footer__label">Phương thức thanh toán</label>
                            <ul className="footer__list">
                                <li>
                                    <img src="https://laz-img-cdn.alicdn.com/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" alt="Icon-MoMo" />
                                </li>
                                <li>
                                    <img src="https://laz-img-cdn.alicdn.com/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" alt="Icon-MoMo" />
                                </li>
                                <li>
                                    <img src="https://laz-img-cdn.alicdn.com/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" alt="Icon-MoMo" />
                                </li>
                                <li>
                                    <img src="https://laz-img-cdn.alicdn.com/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" alt="Icon-MoMo" />
                                </li>
                                <li>
                                    <img src="https://laz-img-cdn.alicdn.com/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" alt="Icon-MoMo" />
                                </li>
                                <li>
                                    <img src="https://laz-img-cdn.alicdn.com/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" alt="Icon-MoMo" />
                                </li>
                            </ul>
                        </div>

                        <div className="col l-3">
                            <label className="footer__label">Địa chỉ</label>
                            <ul className="footer__list">
                                <i className="fas fa-map-marker"></i>
                                &nbsp;
                                <p style={{ display: "inline-block" }}>Đại học Công Nghệ Tp Hồ Chí Minh</p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;