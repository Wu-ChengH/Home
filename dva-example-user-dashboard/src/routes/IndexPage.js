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

function IndexPage(props) {
  return (
    <div>
      <Header />
      <MainLayout location={props.location}>
        <Layout className={Style.backImg}>
          <Content className={Style.noBack} style={{  width: "1000px", margin: "0 auto"}}>
            <Layout className={Style.noBack} style={{ padding: '24px 0'}}>
              <Sider width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                  className={Style.noBack}
                >
                  <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                    <Menu.Item key="/users">
                      <Link to='/users'>users</Link>
                    </Menu.Item>
                    <Menu.Item key="/Inbox">
                      <Link to='/Inbox'>Inbox</Link>
                    </Menu.Item>
                    <Menu.Item key="/Chart">
                      <Link to='/Chart'>Charts</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content className={Style.bor} style={{ padding: '0 24px', minHeight: 280 }}>
                 {props.children}
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

IndexPage.propTypes = {
};

export default connect()(IndexPage);
