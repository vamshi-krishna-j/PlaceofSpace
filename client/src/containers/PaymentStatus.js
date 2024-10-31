import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Result, Button, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, HomeOutlined } from '@ant-design/icons';
import { paymentSuccess, paymentCanceled } from '../actions/checkout.actions';

const PaymentStatus = () => {
    const dispatch = useDispatch();
    const [checkoutStatus, setCheckoutStatus] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const dealId = JSON.parse(localStorage.getItem("dealId"));

        if (query.get("success")) {
            dispatch(paymentSuccess(dealId));
            setCheckoutStatus("success");
        } else if (query.get("canceled")) {
            dispatch(paymentCanceled(dealId));
            setCheckoutStatus("error");
        }

        localStorage.removeItem("dealId");
    }, [dispatch]);

    if (checkoutStatus === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <Result
                    status={checkoutStatus}
                    icon={checkoutStatus === "success" ? <CheckCircleOutlined className="text-green-500 text-6xl" /> : <CloseCircleOutlined className="text-red-500 text-6xl" />}
                    title={
                        <h2 className={`text-2xl font-bold ${checkoutStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                            {checkoutStatus === "success" ? "Booking Confirmed!" : "Booking Failed"}
                        </h2>
                    }
                    subTitle={
                        <p className="text-gray-600 mt-2">
                            {checkoutStatus === "success"
                                ? "Your venue has been successfully booked. We look forward to hosting your event!"
                                : "We're sorry, but there was an issue with your booking. Please try again or contact support."}
                        </p>
                    }
                    extra={[
                        <Link to="/" key="home">
                            <Button type="primary" icon={<HomeOutlined />} size="large" className="mt-4">
                                Return to Home
                            </Button>
                        </Link>
                    ]}
                />
            </div>
        </div>
    );
};

export { PaymentStatus };