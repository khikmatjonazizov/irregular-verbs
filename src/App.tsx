import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BookOutlined,
    FileOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Badge} from 'antd';
import {Link, useSearchParams} from "react-router-dom";
import {Game} from "./components/game";
import {} from "antd/lib/layout/layout";

const {Header, Sider, Content, Footer} = Layout;

const App: React.FC = () => {
    const [params] = useSearchParams()
    const page = params.get('game') || 'page1'

    const [collapsed, setCollapsed] = useState(() => window.innerWidth <= 800);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [incorrectAnswersCount, setIncorrectAnswersCount] =
        useState(0)
    const [correctAnswersCount, setCorrectAnswersCount] =
        useState(0)

    const onChange = (correctAnswersCount: number, incorrectAnswersCount: number) => {
        setCorrectAnswersCount(correctAnswersCount)
        setIncorrectAnswersCount(incorrectAnswersCount)
    }

    return (
        <Layout style={{height: 'inherit'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[page]}
                    items={[
                        {
                            key: 'page1',
                            icon: <Link to="/"><FileOutlined/></Link>,
                            label: 'Page 1',
                        },
                        {
                            key: 'page2',
                            icon: <Link to="/?game=page2"><FileOutlined/></Link>,
                            label: 'Page 2',
                        },
                        {
                            key: 'all',
                            icon: <Link to="/?game=all"><BookOutlined/></Link>,
                            label: 'All',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div
                        style={{
                            paddingRight: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                        <Badge count={incorrectAnswersCount} showZero/>
                        <Badge count={correctAnswersCount} showZero color='#52c41a'/>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Game page={page} onChange={onChange} />
                </Content>
                <Footer style={{padding: '0 16px 24px 16px'}}>By Khikmatjon with love</Footer>
            </Layout>
        </Layout>
    );
};

export default App;
