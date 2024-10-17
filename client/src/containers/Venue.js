import React, { useState, useEffect } from 'react';
import { Layout, Spin, Card, Typography, Tag, Descriptions, Button, Rate, Modal, Input, message, Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPublicURL } from '../urlConfig';
import BookingModel from '../components/UI/BookingModel';
import { CalendarOutlined, EnvironmentOutlined, DollarOutlined, UserOutlined, PhoneOutlined, CommentOutlined } from '@ant-design/icons';
import { Layout as Layout2 } from '../components/Layout/index.layout';
const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const VenuePage = () => {
    document.title = "PlaceofSpace | Venue Details";
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false)
    const auth = useSelector(state => state.auth);
    const [bookingModalShow, setBookingModalShow] = useState(false);
    const [feedbackModalShow, setFeedbackModalShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const oneVenueInfo = useSelector(state => state.oneVenueInfo);
    const { _id, venueName, description, address, location, category, price, venuePictures, ownerInfo, ownerId } = oneVenueInfo.venue;

    useEffect(() => {
        // Add animation classes after component mount
        const elements = document.querySelectorAll('.animate-fade-in');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('opacity-100');
            }, index * 100);
        });
    }, []);
    // useEffect(() => {
    //     setisLoading(oneVenueInfo.loading)
    //     console.log(isLoading)
    // }, [oneVenueInfo.loading])

    // if (oneVenueInfo.loading) {
    //     return (
    //         <Layout2>
    //        
    //         </Layout2>
    //     );
    // }

    if (oneVenueInfo.venue._id === '') {
        return <Redirect to="/" />;
    }

    const handleFeedbackSubmit = () => {
        // Implement your feedback submission logic here
        message.success('Thank you for your feedback!');
        setFeedbackModalShow(false);
    };

    return (
        <Layout2>
            {!isLoading ? <Layout>
                <Content className="p-4 md:p-8 bg-gray-100 min-h-screen">
                    <Card className="w-full max-w-6xl mx-auto shadow-lg animate-fade-in opacity-0 transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Carousel autoplay className="rounded-lg overflow-hidden shadow-md">
                                    {venuePictures.map((pic, index) => (
                                        <div key={index}>
                                            <img
                                                src={getPublicURL(pic.img)}
                                                alt={`${venueName} ${index + 1}`}
                                                className="w-full h-64 object-cover"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                                <Card className="animate-fade-in opacity-0">
                                    <Descriptions title="Venue Details" bordered column={1}>
                                        <Descriptions.Item label={<><CalendarOutlined className="mr-2" />Category</>}>{category}</Descriptions.Item>
                                        <Descriptions.Item label={<><EnvironmentOutlined className="mr-2" />Location</>}>{location}</Descriptions.Item>
                                        <Descriptions.Item label={<><EnvironmentOutlined className="mr-2" />Address</>}>{address}</Descriptions.Item>
                                        <Descriptions.Item label={<><DollarOutlined className="mr-2" />Price</>}>₹{price} per event</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <div className="animate-fade-in opacity-0">
                                    <Title level={2}>{venueName}</Title>
                                    <Tag color="blue">{category}</Tag>
                                </div>

                                <Paragraph className="animate-fade-in opacity-0">{description}</Paragraph>

                                <div className="animate-fade-in opacity-0">
                                    <Title level={4}>Rating</Title>
                                    <Rate allowHalf value={rating} onChange={setRating} />
                                </div>

                                <Card title="Dealer Information" className="animate-fade-in opacity-0">
                                    <p><UserOutlined className="mr-2" />{auth.token ? ownerInfo.ownerName : 'Login to see the dealer details'}</p>
                                    {auth.token && <p><PhoneOutlined className="mr-2" />{ownerInfo.contactNumber}</p>}
                                </Card>

                                {auth.user.role === "client" && (
                                    <div className="space-y-4 animate-fade-in opacity-0">
                                        <Button type="primary" onClick={() => setBookingModalShow(true)} block size="large">
                                            Book Now
                                        </Button>
                                        <Button onClick={() => setFeedbackModalShow(true)} block size="large" icon={<CommentOutlined />}>
                                            Give Feedback
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>

                    <BookingModel
                        _id={_id}
                        venueName={venueName}
                        price={price}
                        category={category}
                        address={address}
                        location={location}
                        ownerId={ownerId}
                        show={bookingModalShow}
                        onHide={() => setBookingModalShow(false)}
                    />

                    {/* <Modal
                        title="Give Feedback"
                        visible={feedbackModalShow}
                        onOk={handleFeedbackSubmit}
                        onCancel={() => setFeedbackModalShow(false)}
                    >
                        <div className="space-y-4">
                            <div>
                                <Text>Your Rating:</Text>
                                <Rate value={rating} onChange={setRating} />
                            </div>
                            <div>
                                <Text>Your Feedback:</Text>
                                <TextArea rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                            </div>
                        </div>
                    </Modal> */}
                </Content>
            </Layout> : <Layout2>
                <Content className="flex items-center justify-center min-h-screen">
                    <Spin size="large" />
                </Content></Layout2>}

        </Layout2>
    );
}

export default VenuePage;