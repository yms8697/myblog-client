import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link, Route } from 'react-router-dom'
import List from '../List/index'
import Editor from '../Editor/index'
import './layout.css'

const { Header, Sider, Content } = Layout

class SiderDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    console.log(this.props)
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/admin/list">
                <Icon type="user" />
                <span>文章列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/editor">
                <Icon type="video-camera" />
                <span>写文章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Route path="/admin/list" component={List} />
            <Route path="/admin/editor" component={Editor} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo
