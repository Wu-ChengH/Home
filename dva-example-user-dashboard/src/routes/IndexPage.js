import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
// import Data from './IndexPageData'

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
// const { rowSelection, columns, data} = Data;
import UsersComponent from '../components/Users/Users';
import Header from './Header';

import Style from '../index.css';

class IndexPage extends React.Component {  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <MainLayout location={this.props.location}>
          <Layout className={Style.backImg}>
            <Content className={Style.noBack} style={{  width: "1000px", margin: "0 auto"}}>
              <Layout className={Style.noBack} style={{ padding: '24px 0'}}>
                <Sider style={{height:"100%", background:"none"}} width={200}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    className={Style.sider}
                  >
                    <Menu.Item className={Style.subMenu + " " +Style.userMenu + " " + (this.props.location.pathname == "/users" ? Style.menuBack: " ")} key="/users">
                      <Link to='/users'>
                        <h3>Dashboard</h3>
                        <p>General Info</p>
                      </Link>
                    </Menu.Item>
                    <Menu.Item className={Style.subMenu + " " +Style.inboxMenu + " " + (this.props.location.pathname == "/Inbox" ? Style.menuBack: " ")} key="/Inbox">
                      <Link to='/Inbox'>
                        <h3>Inbox</h3>
                        <p>Your Messages</p>
                      </Link>
                    </Menu.Item>
                    <Menu.Item className={Style.subMenu + " " +Style.charMenu + " " + (this.props.location.pathname == "/Chart" ? Style.menuBack: " ")} key="/Chart">
                      <Link to='/Chart'>
                        <h3>Charts</h3>
                        <p>Visual Data</p>
                      </Link>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Content className={Style.backcont} style={{ padding: '0 24px', minHeight: 480, overflow: 'hidden'}}>
                   {this.props.children}
                </Content>
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </MainLayout>
      </div>
    );
  }
}

export default connect()(IndexPage);
