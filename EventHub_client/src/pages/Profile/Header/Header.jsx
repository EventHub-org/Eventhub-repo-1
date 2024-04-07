import ProfileInfo from '../../../components/ProfileInfo/ProfileInfo'
import styles from './Header.module.css'

const Header = () => {
    return(
        <div className={styles.Header}>
            <div className={styles.Logo}>Logo</div>
            <ProfileInfo nickname={"Nickname"} email={"Email@gmail.com"} onProfileClick={null}/>
        </div>
    );
}

export default Header