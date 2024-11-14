import React, { useState } from 'react';
import { Form, Input, Button, Radio, Row, Col, Spin, Typography, Modal, Progress, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from '../actions/register.actions';
import { getOTP } from '../actions/otp.actions';

const { Title, Text } = Typography;

const Signup = () => {
    const [form] = Form.useForm();
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const auth = useSelector((state) => state.auth);
    const registrationStatus = useSelector((state) => state.registrationStatus);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const otp = await dispatch(getOTP(values.email));
            values.otp = otp?.otp;
            notification.success({
                message: 'OTP Sent',
                description: `An OTP has been sent to ${values.email}. You will be redirected to verify it.`,
                duration: 5,
            });
            setTimeout(() => {
                history.push('/verify-user', { values });
            }, 2000);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to send OTP. Please try again.',
                duration: 5,
            });
        } finally {
            setLoading(false);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 6) strength += 20;
        if (password.match(/[a-z]+/)) strength += 20;
        if (password.match(/[A-Z]+/)) strength += 20;
        if (password.match(/[0-9]+/)) strength += 20;
        if (password.match(/[$@#&!]+/)) strength += 20;
        setPasswordStrength(strength);
    };

    if (auth.authenticate) {
        return <Redirect to={'/'} />;
    }

    if (registrationStatus.loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Title level={2}>Saving your info 🎉</Title>
                <Spin size="large" className="mt-4" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <Title level={2} className="text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </Title>
                    <Text className="mt-2 text-center text-sm text-gray-600 block">
                        Or{' '}
                        <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                            sign in to your existing account
                        </a>
                    </Text>
                </div>
                <Form
                    form={form}
                    name="signup_form"
                    layout="vertical"
                    onFinish={onFinish}
                    className="mt-8 space-y-6"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: 'Please enter your first name!' }]}
                            >
                                <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="First Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Please enter your last name!' }]}
                            >
                                <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Last Name" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="contactNumber"
                        rules={[
                            { required: true, message: 'Please enter your contact number!' },
                            { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit number!' }
                        ]}
                    >
                        <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="Mobile No" />
                    </Form.Item>

                    <Form.Item
                        name="userType"
                        rules={[{ required: true, message: 'Please select a user type!' }]}
                    >
                        <Radio.Group className="flex justify-center space-x-4">
                            <Radio.Button value="client">Client</Radio.Button>
                            <Radio.Button value="dealer">Dealer</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email Address" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Password"
                            onChange={(e) => calculatePasswordStrength(e.target.value)}
                        />
                    </Form.Item>

                    <div className="mb-4">
                        <Progress
                            percent={passwordStrength}
                            strokeColor={{
                                '0%': '#ff4d4f',
                                '50%': '#faad14',
                                '100%': '#52c41a',
                            }}
                            showInfo={false}
                        />
                        <Text className="text-xs text-gray-500">
                            Password strength: {passwordStrength >= 80 ? 'Strong' : passwordStrength >= 40 ? 'Medium' : 'Weak'}
                        </Text>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-12 text-lg font-semibold rounded-md"
                            loading={loading}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Signup;