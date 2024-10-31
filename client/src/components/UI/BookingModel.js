import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, DatePicker, TimePicker, Alert, Spin, Input, Typography, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from '../../helpers/axios';
import dayjs from 'dayjs';

const { Text } = Typography;

const BookingModal = (props) => {
    const { _id, venueName, price, category, location, address, ownerId, show: visible, onHide } = props;
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);
    const auth = useSelector(state => state.auth);
    const [dealsDate, setDealsDate] = useState([]);
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        const getDeals = async () => {
            try {
                const response = await axios.get(`/venueDeals/${_id}`);
                console.log(response.data.deals)
                setDeals(response.data.deals);
                setDealsDate(response.data.deals.map(deal => dayjs(deal.eventDate)));
                setBookedSlots(response.data.deals.map(deal => ({
                    eventStartTime: deal.eventStartTime,
                    eventEndTime: deal.eventEndTime,
                    eventDate: deal.eventDate
                })));
            } catch (e) {
                console.log(e);
                message.error(e.message);
            }
        };
        if (visible) {
            getDeals();
        }
    }, [visible, _id]);

    useEffect(() => {
        if (date) {
            fetchBookedSlots(date);
        }
    }, [date, _id]);

    const fetchBookedSlots = async (selectedDate) => {
        try {
            const res = await axios.get(`/bookedSlots?venueId=${_id}&date=${selectedDate.format('YYYY-MM-DD')}`);
            if (res.status === 200) {
                setBookedSlots(res.data.bookedSlots);
            }
        } catch (error) {
            console.error("Error fetching booked slots:", error);
            message.error("Failed to fetch booked slots. Please try again.");
        }
    };

    const disabledDate = (current) => {
        const today = dayjs().startOf('day');
        return current.isBefore(today);
    };

    const isTimeSlotAvailable = (selectedDate, start, end) => {
        start = moment(start, 'hh:mm A');
        end = moment(end, 'hh:mm A');

        return !bookedSlots.some(slot => {
            if (moment(slot.eventDate).format('YYYY-MM-DD') !== selectedDate.format('YYYY-MM-DD')) {
                return false;
            }

            const slotStart = moment(slot.eventStartTime, 'hh:mm A');
            const slotEnd = moment(slot.eventEndTime, 'hh:mm A');

            return (
                (start.isSameOrAfter(slotStart) && start.isBefore(slotEnd)) ||
                (end.isAfter(slotStart) && end.isSameOrBefore(slotEnd)) ||
                (start.isSameOrBefore(slotStart) && end.isSameOrAfter(slotEnd))
            );
        });
    };

    const handleBooking = async () => {
        if (!auth.authenticate) {
            window.location.href = '/signin';
            return;
        }

        const startTime2 = startTime.format("hh:mm A");
        const endTime2 = endTime.format("hh:mm A");

        if (!isTimeSlotAvailable(date, startTime2, endTime2)) {
            setError('This time slot is already booked. Please choose a different time.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const res = await axios.post(`/checkout`, {
                venueId: _id,
                venueName,
                venueOwnerId: ownerId,
                bill: price,
                eventDate: date.format('YYYY-MM-DD'),
                eventStartTime: startTime.format('hh:mm A'),
                eventEndTime: endTime.format('hh:mm A')
            });

            if (res.status === 400) {
                setError(res.data.message);
            } else {
                localStorage.setItem('dealId', JSON.stringify(res.data.dealId));
                window.location.href = res.data.url;
            }
        } catch (err) {
            setError('Failed to complete booking. Try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            open={visible}
            onCancel={onHide}
            title="Booking Details 📝"
            footer={null}
            centered
            destroyOnClose
        >
            <Form layout="vertical" className="space-y-4">
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError('')}
                        className="mb-4"
                    />
                )}

                <Text strong type="secondary" className="block mb-2">
                    Note: Contact the owner before booking.
                </Text>

                <Form.Item label="Event Date" className="mb-4">
                    <DatePicker
                        className="w-full"
                        value={date}
                        onChange={(value) => setDate(value)}
                        disabledDate={disabledDate}
                    />
                </Form.Item>

                <Form.Item label="Event Time" className="mb-4">
                    <Row gutter={8}>
                        <Col span={12}>
                            <TimePicker
                                className="w-full"
                                value={startTime}
                                onChange={(value) => setStartTime(value)}
                                format="hh:mm A"
                                use12Hours
                                placeholder="Start Time"
                                suffixIcon={<ClockCircleOutlined />}
                            />
                        </Col>
                        <Col span={12}>
                            <TimePicker
                                className="w-full"
                                value={endTime}
                                onChange={(value) => setEndTime(value)}
                                format="hh:mm A"
                                use12Hours
                                placeholder="End Time"
                                suffixIcon={<ClockCircleOutlined />}
                            />
                        </Col>
                    </Row>
                </Form.Item>

                <Row gutter={16} className="mb-4">
                    <Col span={12}>
                        <Form.Item label="Venue Name">
                            <Input value={venueName} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Category">
                            <Input value={category} readOnly />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} className="mb-4">
                    <Col span={12}>
                        <Form.Item label="Location">
                            <Input value={location} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Address">
                            <Input value={address} readOnly />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Bill" className="mb-4">
                    <Input value={price} readOnly suffix="INR" />
                </Form.Item>

                {bookedSlots.length > 0 && (
                    <Alert
                        message={
                            <div>
                                <strong>Already booked times for {date?.format('YYYY-MM-DD')}:</strong>
                                <ul className="list-disc pl-5 mt-2">
                                    {bookedSlots.map((slot, index) => (
                                        <li key={index}>{`${slot.eventStartTime} - ${slot.eventEndTime}`}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                        type="warning"
                        showIcon
                        className="mb-4"
                    />
                )}

                <div className="text-center">
                    <Button
                        type="primary"
                        onClick={handleBooking}
                        loading={isLoading}
                        disabled={!date || !startTime || !endTime || moment(startTime).isAfter(moment(endTime))}
                        className="w-full"
                    >
                        {isLoading ? (
                            <Spin size="small" className="mr-2" />
                        ) : (
                            'Proceed to Payment'
                        )}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default BookingModal;