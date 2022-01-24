
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Header.css";
import { removeUser, getUser } from '../../app/userSlice';


function Header() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('TOKEN'));
        axios.post('http://localhost:5000/api/user/token',
            {
                token
            },
        )
            .then(res => {
                console.log(res.data);
                if (res.data.isSuccess) {
                    const action = getUser(res.data.data)
                    dispatch(action)
                }
                else {
                    navigate("/");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/')
    }

    return (
        <header className="header">
            <div></div>
            <div className="header-logo">
                <img src={require(`../../assets/ToMe-green.png`).default} alt="logo" />
            </div>
            <div className="header__shop">
                <i className="shop_icon fas fa-store"></i>
                <span className="header__shopname">{user.shopName}</span>
                <i className="fas fa-angle-down"></i>

                <div className="header__shop-down">
                    <header className="header__shop-down-header">
                        <i className="header__shop-icon-down fas fa-store"></i>
                        <div className="header__shop-info-down">
                            <div className="header__shop-fullname-down">{user.fullname}</div>
                            <div className="header__shop-email-down">{user.email}</div>
                        </div>
                    </header>
                    <ul className="header__shop-list">
                        <li className="header__shop-item">
                            <Link className="header__shop-item-link" to="/user">
                                <i className="header__shop-item-icon far fa-user"></i>
                                <span className="header__shop-item-name">Thông tin cửa hàng</span>
                            </Link>
                        </li>

                        <li className="header__shop-item">
                            <Link className="header__shop-item-link" to="/user/change-password">
                                <i className="header__shop-item-icon fas fa-pen"></i>
                                <span className="header__shop-item-name">Đổi mật khẩu</span>
                            </Link>
                        </li>

                        <li className="header__shop-item header__shop-item__footer">
                            <i className="header__shop-item-icon header__shop-icon__logout fas fa-power-off"></i>
                            <span onClick={handleLogout} id="header__shop-name__logout" className="header__shop-item-name">Đăng xuất</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;