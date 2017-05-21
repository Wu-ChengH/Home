import {Menu} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import Style from '../index.css';
const Icon = require('uxcore-icon');
import 'uxcore/assets/iconfont.css';
import 'uxcore/assets/orange.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            hid:true,
            hidUpload:true
        }
    }
    handleClick = (e) =>{
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    hid() {
      this.setState({
        hid:!this.state.hid
      })
    }
    hidUpload() {
      this.setState({
        hidUpload:!this.state.hidUpload
      })
    }
    render() {
        return ( 
            <div>
                <div className={Style.headBigBox}>
                    <div className={Style.headBox}>
                        <div className={Style.headUser}>
                            <Icon name="ren" />
                            John Alex
                            <div style={{paddingTop:"5px",position: "absolute",top: 40,left: 0}}>
                                <div className={Style.userTool}>
                                    <span></span>
                                    <Icon name="ren" />
                                    <Icon name="zidingyilie" />
                                    <Icon name="xinwen1" />
                                    <Icon name="shezhi" />
                                    <Icon name="dingding" />
                                </div>
                            </div>
                        </div>
                        <ul className={Style.headTool}>
                            <li onClick={this.hid.bind(this)} className={Style.hoveWhite}>
                                <Icon name="wendang1" />
                                <span>Pages</span>
                                <div style={{display:this.state.hid ? 'none' : 'block'}} className={Style.btthid}>
                                  <div className={Style.hoveWhite}>
                                    403 Forbidden
                                  </div>
                                  <div className={Style.hoveWhite}>
                                    404 Not Found
                                  </div>
                                </div>
                            </li>
                            <li className={Style.hoveWhite}>
                                <Icon name="youxiang-full" />
                                <span>Inbox</span>
                            </li>
                            <li onClick={this.hidUpload.bind(this)} className={Style.hoveWhite}>
                                <Icon name="shangchuan" />
                                <span>Upload</span>
                                <div style={{display:this.state.hidUpload ? 'none' : 'block'}} className={Style.btthid}>
                                  <div className={Style.hoveWhite}>
                                    <Icon name="zengjia1" />
                                    New File
                                  </div>
                                  <div className={Style.hoveWhite}>
                                    <Icon name="lianjie" />
                                    Files Left
                                  </div>
                                  <div className={Style.hoveWhite}>
                                    <Icon name="xinwen1" />
                                    Browse Files
                                  </div>
                                </div>
                            </li>
                            <li className={Style.hoveWhite}>
                                <Icon name="shezhi" />
                                <span>Settings</span>
                            </li>
                            <li className={Style.hoveWhite}>
                                <Icon name="sousuo" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={Style.borBack}></div>
                <div className={Style.headBox}>
                    <img src="http://demo.cssmoban.com/cssthemes3/cpts_161_bet/Images/kanrisha_logo.png" alt=""/>
                    <div className={Style.flexbox + " "+ Style.circle}>
                        <div className={Style.maxCircle}>
                            <div className={Style.minCircle}>
                                <span className={Style.dollar}></span>
                            </div>
                        </div>
                        <div className={Style.maxCircle}>
                            <div className={Style.minCircle}>
                                <span className={Style.delivery}></span>
                            </div>
                        </div>
                        <div className={Style.maxCircle}>
                            <div className={Style.minCircle}>
                                <span className={Style.support}></span>
                            </div>
                        </div>
                        <div className={Style.maxCircle}>
                            <div className={Style.minCircle}>
                                <span className={Style.statistic}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}