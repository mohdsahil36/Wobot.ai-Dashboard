import Logo from '../../assets/BrandLogo.svg';
import classes from './PageLogo.module.css';

export default function PageLogo(){
    return (
        <div className={classes.pageLogo}>
            <img src={Logo} alt="Brand Logo" className={classes.logo}/>
        </div>
    )
}