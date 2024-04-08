import { Link } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuUsers } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import getIdFromToken from '../../../jwt/getIdFromToken'
import styles from './SideBarMenu.module.css';


const SideBarMenu = () =>{
    const userId = getIdFromToken();

    const options = [
        { name: 'account', icon: <FiUser /> },
        { name: 'events', icon: <HiOutlineLocationMarker /> },
        { name: 'friends', icon: <LuUsers /> }
    ];
    
    return(
        <ul className={styles.SideBarMenu}>
            {options.map((option) =>{
                    return <li className={styles.Option}><Link className={styles.Link} key={option} to={`/profile/${userId}/${option.name}`}>
                        {option.icon} {option.name[0].toUpperCase() + option.name.slice(1)}
                    </Link></li>
                })}
            <li className={styles.Option}><Link className={styles.Link} key='logout' to={'/login'}><FiLogOut /> Logout</Link></li>
        </ul>
    );
}

export default SideBarMenu