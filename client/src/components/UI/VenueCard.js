import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Tag, Typography, Space } from 'antd';
import { EyeOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { getOneVenue } from '../../actions/venue.actions';
import { getPublicURL } from '../../urlConfig';
import BookingModel from './BookingModel';
const { Meta } = Card;
const { Text, Title } = Typography;

const VenueCard = (props) => {
    const [bookingModalShow, setBookingModalShow] = useState(false);
    const { img1, category, venueName, ownerId, _id, price, location, address, isDelete } = props;

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const hist = useHistory()

    const getVenueInfo = async () => {
        await dispatch(getOneVenue(_id));

        hist.push(`/venue/${_id}`)

    };

    return (
        <Card
            hoverable
            className="w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-xl"
            cover={
                <div className="relative h-48 overflow-hidden">
                    <img
                        alt={`${venueName} venue`}
                        src={getPublicURL(img1)}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <Tag color="blue" className="absolute top-2 left-2">
                        {category}
                    </Tag>
                </div>
            }
            actions={[

                <Button onClick={getVenueInfo} key="view" type="primary" icon={<EyeOutlined />} className="bg-blue-500 hover:bg-blue-600">
                    View Details

                </Button>,
                isDelete ? (
                    <Button key="delete" type="primary" danger icon={<DeleteOutlined />}>
                        Delete
                    </Button>
                ) : (
                    auth.user.role !== 'dealer' && (
                        <Button
                            key="book"
                            type="primary"
                            icon={<CalendarOutlined />}
                            onClick={() => setBookingModalShow(true)}
                            className="bg-green-500 hover:bg-green-600"
                        >
                            Book
                        </Button>
                    )
                )
            ]}
        >
            <Meta
                title={
                    <Space className="w-full justify-between">
                        <Title level={4} className="m-0 truncate max-w-[70%]">{venueName}</Title>
                        <Text strong className="text-green-500">₹ {price}</Text>
                    </Space>
                }
                description={
                    <Space direction="vertical" className="w-full">
                        <Text className="text-gray-500 truncate">{location}, {address}</Text>
                    </Space>
                }
            />
            <BookingModel
                _id={_id}
                venueName={venueName}
                price={price}
                category={category}
                address={address}
                location={location}
                show={bookingModalShow}
                ownerId={ownerId}
                onHide={() => setBookingModalShow(false)}
            />
        </Card>
    );
};

export default VenueCard;