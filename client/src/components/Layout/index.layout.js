import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Layout as Layout1, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { signout } from '../../actions/auth.actions';
import { userInfo } from '../../actions/userInfo.actions';
import { getOwnerVenues } from '../../actions/venue.actions';
import getDeals from '../../actions/dealsHistory.actions';

const { Header, Content } = Layout1;

export const Layout = ({ children }) => {
    const auth = useSelector(state => state.auth);
    const serverStatus = useSelector(state => state.serverStatus);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const logout = () => {
        console.log("signout");
        dispatch(signout());
    };

    const getUserInfo = () => {
        const { _id, role } = auth.user;
        dispatch(userInfo(_id, role));
        if (role === 'dealer') {
            dispatch(getOwnerVenues(_id));
        }
        dispatch(getDeals(role, _id));
    };

    const refresh = () => {
        window.location.reload();
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />} onClick={getUserInfo}>
                <Link to={`/profile/${auth.user._id}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                Sign Out
            </Menu.Item>
        </Menu>
    );

    if (serverStatus.message === null) {
        return (
            <Layout1 className="min-h-screen">
                <Header className="flex items-center justify-between bg-white shadow-md px-4">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            PlaceofSpace
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {auth.authenticate ? (
                            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                                <Button type="text" className="flex items-center">
                                    <Avatar
                                        size="small"
                                        className="mr-2"
                                        style={{ backgroundColor: '#1890ff' }}
                                        icon={<UserOutlined />}
                                    />
                                    <span className="hidden md:inline uppercase">{auth.user.firstName}</span>
                                </Button>
                            </Dropdown>
                        ) : (
                            <div className="space-x-4">
                                <NavLink
                                    to="/signin"
                                    className="text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md transition duration-300 ease-in-out"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300 ease-in-out"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>
                </Header>
                <Content className="p-6">{children}</Content>
            </Layout1>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold mb-4">{serverStatus.message}</h1>
                <Button type="primary" onClick={refresh}>
                    Refresh this page
                </Button>
            </div>
        );
    }
};
