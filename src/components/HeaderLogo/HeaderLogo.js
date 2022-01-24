import { Link } from 'react-router-dom';
import "./HeaderLogo.css";


function HeaderLogo() {

    return (
        <header className="headerLogo">
            <img src={require(`../../assets/ToMe-white.png`).default} alt="logo" />
        </header>
    );
}

export default HeaderLogo;