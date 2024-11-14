import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Typography } from 'antd';
import { MailOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { userlogin } from '../../actions/auth.actions';
import { useSelector, useDispatch } from 'react-redux';

const { Text } = Typography;

const LoginModel = ({ show, onHide, title, userType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleLogin = (values) => {
        const user = { email: values.email, password: values.password };
        dispatch(userlogin(user, userType));

    };

    useEffect(() => {
        if (auth.message) {
            setErrorMessage(auth.message);
        }
    }, [auth.message]);

    return (
        <Modal
            visible={show}
            onCancel={onHide}
            footer={null}
            title={<Text className="text-lg font-semibold">{title}</Text>}
            centered
            width={450}
            closeIcon={<CloseCircleOutlined style={{ fontSize: '16px' }} />}
            className="rounded-lg shadow-lg"
        >
            <Form
                name="login_form"
                layout="vertical"
                onFinish={handleLogin}
                className="space-y-4"
                initialValues={{ email, password }}
            >
                <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input
                        placeholder="Enter email"
                        prefix={<MailOutlined className="text-gray-400" />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md"
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password
                        placeholder="Enter password"
                        prefix={<LockOutlined className="text-gray-400" />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-md"
                    />
                </Form.Item>

                {errorMessage && (
                    <Text type="danger" className="block text-center mb-2">
                        {errorMessage}
                    </Text>
                )}

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        icon={<LockOutlined />}
                        className="rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export { LoginModel };
