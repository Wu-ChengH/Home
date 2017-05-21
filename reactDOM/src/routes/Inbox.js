import { Table } from 'antd';
import Style from '../index.css';
const Icon = require('uxcore-icon');
import 'uxcore/assets/iconfont.css';
import 'uxcore/assets/orange.css';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  width: '15%',
}, {
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
  width: '45%',
}, {
  title: 'Priority',
  dataIndex: 'priority',
  key: 'priority',
  width: '20%'
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status'
}];

const data = [{
  id: '#2882',
  title: 'I Can\'t Remember My Password',
  priority: 'High',
  status: 'Open',
},{
  id: '#2799',
  title: 'My Account Was Hacked',
  priority: 'Low',
  status: 'Open',
},{
  id: '#2889',
  title: 'I Can\'t Remember My Password',
  priority: 'High',
  status: 'Open',
},{
  id: '#2397',
  title: 'My Account Was Hacked',
  priority: 'Low',
  status: 'Open',
},{
  id: '#9826',
  title: 'I Can\'t Remember My Password',
  priority: 'High',
  status: 'Open',
},{
  id: '#8951',
  title: 'My Account Was Hacked',
  priority: 'Low',
  status: 'Open',
},{
  id: '#2838',
  title: 'I Can\'t Remember My Password',
  priority: 'High',
  status: 'Open',
},{
  id: '#279',
  title: 'My Account Was Hacked',
  priority: 'Low',
  status: 'Open',
},{
  id: '#889',
  title: 'I Can\'t Remember My Password',
  priority: 'High',
  status: 'Open',
},{
  id: '#797',
  title: 'My Account Was Hacked',
  priority: 'Low',
  status: 'Open',
},{
  id: '#2896',
  title: 'I Can\'t Remember My Password',
  priority: 'High',
  status: 'Open',
},{
  id: '#2981',
  title: 'My Account Was Hacked',
  priority: 'Low',
  status: 'Open',
}];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};


class Inbox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hid:true
    }
  }
  hid() {
    this.setState({
      hid:!this.state.hid
    })
  }
  render(){
    return (
      <div className={Style.Inbox}>
        <div className={Style.inboxHead}>
          <div className={Style.tit}>
            <h3><Icon name="youxiang-full" />Inbox</h3>
            <p>Your Tickets, Chats, Email</p>
          </div>
          <div className={Style.flexbox}>
            <div className={Style.sett}>
              <div className={Style.btt}>
                <Icon name="shezhi" />
                Settings
                <div className={Style.hidclick} onClick={this.hid.bind(this)}>
                  <b></b>
                </div>
              </div>
              <div style={{display:this.state.hid ? 'none' : 'block'}} className={Style.btthid}>
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
            </div>
            <div className={Style.btt}>
              <Icon name="xiaolian-line" />
              Help
            </div>
          </div>
        </div>
        <div className={Style.parting}>
          <span></span>
        </div>
        <div className={Style.Ticket}>
          <div className={Style.ticket}>Ticket Table</div>
          <div className={Style.search + " " + Style.flexbox}>
            <div>Search: <input type="text" /></div>
            <div>Show entries <button>10</button></div>
          </div>
        </div>
        <Table rowSelection={rowSelection} className={Style.bG} columns={columns} dataSource={data} />
      </div>
    )
  }
  
}
export default Inbox;