import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

const NavBar = () => {
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    return (
        <nav className='navbar'>
            <div className='navbar_menu d-flex justify-between'>
                <div className='navbar_menu_links'>
                    <Logo />
                    <Link className='navbar_menu_link' to='/detail/market'>
                        <div>Super</div>
                        <div className={isActive('/detail/market') ? 'underline' : ''} />
                    </Link>
                    <Link className='navbar_menu_link' to='/detail/fuel'>
                        <div>Combustible</div>
                        <div className={isActive('/detail/fuel') ? 'underline' : ''} />
                    </Link>
                    <Link className='navbar_menu_link' to='/detail/others'>
                        <div>Otros</div>
                        <div className={isActive('/detail/others') ? 'underline' : ''} />
                    </Link>
                </div>
                <Link to='/historical' className='navbar_menu_link history'>
                    <div className='d-flex align-center'>
                        <span className="material-icons">history</span>
                    </div>
                    <div className={isActive('/historical') ? 'underline' : ''} />
                </Link>
			</div>
        </nav>
    )
}

export default NavBar
