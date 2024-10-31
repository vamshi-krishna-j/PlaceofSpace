import React, { useState } from 'react';
import { Layout } from '../components/Layout/index.layout';
import { Form, Input, Button, Radio, Row, Col, Spin, Typography, Modal } from 'antd';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from '../actions/register.actions';

const { Title, Text } = Typography;

const Signup = () => {
    document.title = "PlaceOfSpace | Sign Up";
    const [form] = Form.useForm();
    const [messageModalShow, setMessageModalShow] = useState(false);

    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);
    const registrationStatus = useSelector((state) => state.registrationStatus);

    const onFinish = (values) => {
        dispatch(userRegister(values));
        setMessageModalShow(true);
    };

    if (auth.authenticate) {
        return <Redirect to={'/'} />;
    }

    if (registrationStatus.loading) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-screen text-center mt-16">
                    <Title level={2}>Saving your info 🎉</Title>
                    <Spin size="large" className="mt-4" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Modal
                visible={messageModalShow}
                onCancel={() => setMessageModalShow(false)}
                footer={null}
                centered
            >
                <Text>{registrationStatus.message}</Text>
            </Modal>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
                <Title level={2} className="text-center">SIGN UP 📝</Title>
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <Form
                        form={form}
                        name="signup_form"
                        layout="vertical"
                        onFinish={onFinish}
                        className="space-y-4"
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="First Name"
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                                >
                                    <Input placeholder="First Name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Last Name"
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please enter your last name!' }]}
                                >
                                    <Input placeholder="Last Name" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Contact Number"
                            name="contactNumber"
                            rules={[
                                { required: true, message: 'Please enter your contact number!' },
                                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit number!' }
                            ]}
                        >
                            <Input placeholder="Mobile No" />
                        </Form.Item>

                        <Form.Item
                            label="User Type"
                            name="userType"
                            rules={[{ required: true, message: 'Please select a user type!' }]}
                        >
                            <Radio.Group>
                                <Radio value="client">Client</Radio>
                                <Radio value="dealer">Dealer</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item className="flex space-x-4">
                            <Button type="primary" htmlType="submit" block className="rounded-md">
                                Sign Up
                            </Button>
                            <Button htmlType="reset" className="rounded-md">
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
