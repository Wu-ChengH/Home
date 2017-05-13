import {Menu,Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import Style from '../index.css';

export default class App extends React.Component {
    state = {
        current: 'mail',
    }
    handleClick = (e) =>{
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return ( 
            <div>
                <div className={Style.headBigBox}>
                    <div className={Style.headBox}>
                        <div className={Style.headUser}>
                            <i></i>
                            
                            John Alex
                        </div>
                        <ul className={Style.headTool}>
                            <li>
                                <i></i>
                                Pages
                            </li>
                            <li>
                                <i></i>
                                Inbox
                            </li>
                            <li>
                                <i></i>
                                Upload
                            </li>
                            <li>
                                <i></i>
                                Settings
                            </li>
                            <li>
                                <i></i>
                                big
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={Style.headBox}>
                    <img src="http://demo.cssmoban.com/cssthemes3/cpts_161_bet/Images/kanrisha_logo.png" alt=""/>
                    <div className={Style}>
                        <span className="button-wrap">
                            <button className="button button-circle">
                              <i className="fa fa-cloud"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}