import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout/index.layout';
import { Button, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LoginModel } from '../components/UI/LoginModel';
import { UserOutlined, ShopOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Signin = () => {
    const [userModalShow, setUserModalShow] = useState(false);
    const [dealerModalShow, setDealerModalShow] = useState(false);

    const auth = useSelector(state => state.auth);

    useEffect(() => {
        document.title = "PlaceofSpace | Sign In";
    }, []);

    if (auth.authenticate) {
        return <Redirect to='/' />;
    }

    return (
        <Layout>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full space-y-8">
                    <div className="text-center">
                        <Title level={1} className="text-white text-5xl font-extrabold mb-2">
                            Welcome to PlaceofSpace
                        </Title>
                        <p className="text-2xl text-blue-100">Choose Your Sign In Option</p>
                    </div>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-8">
                        <div className="w-full sm:w-1/2 max-w-sm">
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
                                <div className="bg-blue-500 p-6 flex justify-center items-center">
                                    <UserOutlined className="text-white text-6xl" />
                                </div>
                                <div className="p-8">
                                    <Title level={3} className="text-center text-gray-800 mb-4">Client / User</Title>
                                    <p className="text-gray-600 text-center mb-6">Access your personal account and explore available spaces</p>
                                    <Button
                                        type="primary"
                                        block
                                        size="large"
                                        onClick={() => setUserModalShow(true)}
                                        className="h-12 text-lg font-semibold rounded-full bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
                                    >
                                        Sign In as Client
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 max-w-sm">
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
                                <div className="bg-purple-500 p-6 flex justify-center items-center">
                                    <ShopOutlined className="text-white text-6xl" />
                                </div>
                                <div className="p-8">
                                    <Title level={3} className="text-center text-gray-800 mb-4">Dealer / Renter</Title>
                                    <p className="text-gray-600 text-center mb-6">Manage your properties and connect with potential clients</p>
                                    <Button
                                        type="primary"
                                        block
                                        size="large"
                                        onClick={() => setDealerModalShow(true)}
                                        className="h-12 text-lg font-semibold rounded-full bg-purple-500 hover:bg-purple-600 border-purple-500 hover:border-purple-600"
                                    >
                                        Sign In as Dealer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LoginModel
                    show={userModalShow}
                    onHide={() => setUserModalShow(false)}
                    title="🛑 User / Client Sign In"
                    userType="client"
                />
                <LoginModel
                    show={dealerModalShow}
                    onHide={() => setDealerModalShow(false)}
                    title="🛑 Dealer / Renter Sign In"
                    userType="dealer"
                />
            </div>
        </Layout>
    );
};

export default Signin;