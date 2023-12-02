import React, {useState} from 'react';
import {
    BookOutlined,
    FileOutlined
} from '@ant-design/icons';
import {Layout, Menu, theme, Badge} from 'antd';
import {Link, useSearchParams} from "react-router-dom";
import {Game} from "./components/game";

const {Header, Content, Footer} = Layout;

const App: React.FC = () => {
    const [params] = useSearchParams()
    const page = params.get('game') || 'page1'
    const {
        token: {
            colorBgContainer,
        },
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
        <Layout className="layout" style={{height: 'inherit', overflow: 'auto'}}>
            <Header style={{display: 'flex', alignItems: 'center', padding: '0', justifyContent: 'center'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    inlineCollapsed={false}
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
            </Header>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                }}
            >
                <div
                    style={{
                        padding: '0 30px 30px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '10px'
                    }}>
                    <Badge count={incorrectAnswersCount} showZero/>
                    <Badge count={correctAnswersCount} showZero color='#52c41a'/>
                </div>
                <Game page={page} onChange={onChange}/>
            </Content>
            <Footer style={{padding: '0 16px 24px 16px', textAlign: 'center'}}>By Khikmatjon with love</Footer>
        </Layout>
    );
};

export default App;
