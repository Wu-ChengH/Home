import { Table } from 'antd';
import Style from '../index.css';

console.log(2)
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
          <div>
            <h3><i></i>Inbox</h3>
            <p>Your Tickets, Chats, Email</p>
          </div>
          <div className={Style.flexbox}>
            <div className={Style.sett}>
              <button onClick={this.hid.bind(this)} className={Style.btt}>Settings</button>
              <div style={{display:this.state.hid ? 'none' : 'block'}} className={Style.btthid}>
                <div>one</div>
                <div>two</div>
              </div>
            </div>
            <button className={Style.btt}>Help</button>
          </div>
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