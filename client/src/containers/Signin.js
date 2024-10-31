import React, { useState } from 'react';
import { Layout } from '../components/Layout/index.layout';
import { Button, Card, Row, Col, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LoginModel } from '../components/UI/LoginModel';

// Images
import client_signin from '../assets/images/client-signin.svg';
import dealer_signin from '../assets/images/dealer-signin.svg';

const { Title } = Typography;

const Signin = () => {
    document.title = "PlaceofSpace | Sign In";
    const [userModalShow, setUserModalShow] = useState(false);
    const [dealerModalShow, setDealerModalShow] = useState(false);

    const auth = useSelector(state => state.auth);
    if (auth.authenticate) {
        return <Redirect to='/' />;
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
                <Title level={2} className="text-gray-800 mb-8 text-center">
                    ✨ Choose Your Log In Option ✨
                </Title>
                <Row gutter={[24, 24]} className="w-full max-w-screen-md">
                    <Col xs={24} sm={12} className="flex justify-center">
                        <Card
                            hoverable
                            cover={<img alt="client signin" src={client_signin} className="p-6" />}
                            className="w-full max-w-xs rounded-lg shadow-lg bg-white border border-gray-200"
                            style={{ transition: 'transform 0.3s', transform: 'scale(1.05)' }}
                        >
                            <Button
                                type="primary"
                                block
                                onClick={() => setUserModalShow(true)}
                                className="mt-4 rounded-md"
                                size="large"
                            >
                                Client / User
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} className="flex justify-center">
                        <Card
                            hoverable
                            cover={<img alt="dealer signin" src={dealer_signin} className="p-6" />}
                            className="w-full max-w-xs rounded-lg shadow-lg bg-white border border-gray-200"
                            style={{ transition: 'transform 0.3s', transform: 'scale(1.05)' }}
                        >
                            <Button
                                type="primary"
                                block
                                onClick={() => setDealerModalShow(true)}
                                className="mt-4 rounded-md"
                                size="large"
                            >
                                Dealer / Renter
                            </Button>
                        </Card>
                    </Col>
                </Row>

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
