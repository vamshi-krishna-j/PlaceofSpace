import React, { useState, useEffect } from 'react';
import { Layout, Spin, Card, Typography, Tag, Descriptions, List, Avatar, Button, Rate, Modal, Input, message, Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPublicURL } from '../urlConfig';
import BookingModel from '../components/UI/BookingModel';
import { CalendarOutlined, EnvironmentOutlined, DollarOutlined, UserOutlined, PhoneOutlined, CommentOutlined } from '@ant-design/icons';
import { Layout as Layout2 } from '../components/Layout/index.layout';
import { addReview, getAllReview, getRating, getUserReview } from '../actions/review.actions';
const axios = require('axios')
const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const VenuePage = () => {
    document.title = "PlaceofSpace | Venue Details";
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false)
    const [allReviews, setAllReviews] = useState([])
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
    useEffect(() => {
        const fun = async () => {
            try {


                const response = await dispatch(getAllReview(_id || ''))
                const avgRating = await dispatch(getRating(_id))
                const userReview = await dispatch(getUserReview(auth.user._id))

                setAllReviews(response.reviews)
                setRating(avgRating.averageRating)
            }
            catch (e) {
                console.log(e)
            }
        }
        fun()
    }, [dispatch])

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

    const handleFeedbackSubmit = async () => {
        // Implement your feedback submission logic here
        console.log(rating, feedback)
        console.log(auth)
        const user_id = auth?.user?._id;
        const payload = { rating, feedback, user_id, _id }
        console.log(payload)
        const response = dispatch(addReview(payload))
        console.log(response)
        message.success('Thank you for your feedback!');
        setFeedbackModalShow(false);
    };
    const ReviewSection = ({ reviews }) => {
        { console.log(reviews) }
        return (
            <Card className="mt-8 animate-fade-in opacity-0">
                <Title level={3} className="mb-4">Customer Reviews</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={(review) => (
                        <List.Item className="border-b border-gray-200 last:border-b-0">
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={
                                    <div className="flex items-center justify-between">
                                        <Text strong>{review.user.firstName}</Text>
                                        <Rate disabled defaultValue={review.rating} className="text-sm" />
                                    </div>
                                }
                                description={
                                    <div className="mt-2">
                                        <Text className="text-gray-600">{review.reviewText}</Text>
                                        <Text className="block mt-2 text-xs text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </Text>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        );
    };
    return (
        <Layout2>
            {!isLoading ? <Layout>

                <Content className="p-4 md:p-8 bg-gray-100 min-h-screen">
                    {/* <ReviewSection reviews={allReviews} />
                     */}


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
                                    <Rate disabled={true} allowHalf value={rating} onChange={setRating} />
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
                    <Card className="mt-8 animate-fade-in opacity-0">
                        <Title level={3} className="mb-4">Customer Reviews</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={allReviews}
                            renderItem={(review) => (
                                <List.Item className="border-b border-gray-200 last:border-b-0">
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<UserOutlined />} />}
                                        title={
                                            <div className="flex items-center justify-between">
                                                <Text strong>{review.user.firstName}</Text>
                                                <Rate disabled defaultValue={review.rating} className="text-sm" />
                                            </div>
                                        }
                                        description={
                                            <div className="mt-2">
                                                <Text className="text-gray-600">{review.reviewText}</Text>
                                                <Text className="block mt-2 text-xs text-gray-400">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
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

                    <Modal
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
                    </Modal>

                </Content>
            </Layout> : <Layout2>
                <Content className="flex items-center justify-center min-h-screen">
                    <Spin size="large" />
                </Content></Layout2>
            }

        </Layout2>
    );
}

export default VenuePage;