import { Link } from 'react-router-dom'
import styles from './SideBarMenu.module.css'


const SideBarMenu = () =>{
    const options = ['account', 'events', 'friends']
    return(
        <ul className={styles.SideBarMenu}>
            {options.map((option) =>{
                    return <li className={styles.Option}><Link key={option} to={`/profile/:userId/${option}`}>
                        {option.toUpperCase()}
                    </Link></li>
                })}
            <li styles={styles.Option}><Link key='logout' to={'/login'}>LOGOUT</Link></li>
        </ul>
    );
}

export default SideBarMenu