import React, { useEffect, useState } from 'react';
import { Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../actions/register.actions';
const OTPAuthentication = ({ onSubmit, resendOTP }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch()
    const location = useLocation()
    const { values } = location.state || {};



    const handleSubmit = async () => {
        if (otp.length !== 6) {
            message.error('Please enter a 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            console.log(values)
            dispatch(userRegister(values));
            message.success('OTP verified successfully');
            history.push("/login")
            setOtp('');
        } catch (error) {
            console.log(error)
            message.error('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            await resendOTP();
            message.info('New OTP sent to your registered mobile number');
        } catch (error) {
            message.error('Failed to resend OTP. Please try again later.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">OTP Authentication</h2>
            <div className="mb-4">
                <Input
                    prefix={<LockOutlined className="text-gray-400" />}
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
                Verify OTP
            </Button>
            <div className="mt-4 text-center">
                <Button type="link" onClick={handleResend} className="text-blue-500 hover:text-blue-600">
                    Resend OTP
                </Button>
            </div>
        </div>
    );
};

export default OTPAuthentication;