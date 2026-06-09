import { Link } from 'react-router-dom'

const MenuOptions = ({ isOpen, toggleMenu }) => {
    return (
        <div className={'menu-container d-flex' + (isOpen ? ' menu-container--open' : '')} onClick={() => toggleMenu()}>
            <div className='menu-container_button'>
                <div className='dot'></div>
                <div className='dot static'></div>
                <div className='dot'></div>
            </div>
            <nav className={'menu-container_content text-center' + (isOpen ? ' d-block' : ' d-none')}>
                <Link to='/historical'>Historial</Link>
            </nav>
        </div>
    )
}

export default MenuOptions