import { Table } from 'antd';

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


function Inbox() {
  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  )
}
export default Inbox;