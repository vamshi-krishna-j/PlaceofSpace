import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Spin, Button, Typography, Card, Tabs, Statistic } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import VenueCard from '../components/UI/VenueCard';
import { DealsHistory } from '../components/UI/DealsHistory';
import { isEmpty } from '../helpers/isObjEmpty';
import AddVenueModel from '../components/UI/AddVenueModel';
import getDeals from '../actions/dealsHistory.actions';
import { Layout as Layout2 } from '../components/Layout/index.layout';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProfilePage = () => {
    document.title = "PlaceofSpace | Profile";
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const userInfo = useSelector(state => state.userInfo);
    const ownerVenues = useSelector(state => state.ownerVenues);
    const deals = useSelector(state => state.deals);

    const [addVenueModalShow, setAddVenueModalShow] = useState(false);

    useEffect(() => {
        dispatch(getDeals());
    }, [dispatch]);

    if (auth.token === null) {
        return <Redirect to={'/'} />;
    }

    if (userInfo.loading) {
        return (
            <Layout>
                <Content style={{ padding: '50px', textAlign: 'center' }}>
                    <Spin size="large" />
                    <Title level={2} style={{ marginTop: '20px' }}>Getting your info...</Title>
                </Content>
            </Layout>
        );
    }

    const { fullName, email, contactNumber, role, username, createdAt } = userInfo.user;

    const ProfileInfo = () => (
        <Card>
            <Title level={3}>{fullName}</Title>
            <Text type="secondary">{role.charAt(0).toUpperCase() + role.slice(1)}</Text>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <UserOutlined /> {username}
                </Col>
                <Col span={24}>
                    <MailOutlined /> {email}
                </Col>
                <Col span={24}>
                    <PhoneOutlined /> {contactNumber}
                </Col>
                <Col span={24}>
                    <CalendarOutlined /> Joined on {new Date(createdAt).toLocaleDateString()}
                </Col>
            </Row>
        </Card>
    );

    const Statistics = () => (
        <Card>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Total Bookings" value={deals.allDeals.length} />
                </Col>
                <Col span={12}>
                    <Statistic title="Venues Owned" value={ownerVenues.allvenues.length} />
                </Col>
            </Row>
        </Card>
    );

    const VenuesList = () => (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setAddVenueModalShow(true)}
                style={{ marginBottom: '20px' }}
            >
                New Venue
            </Button>
            <Row gutter={[24, 24]}>
                {isEmpty(ownerVenues.allvenues) ? (
                    <Col span={24}>
                        <Text type="secondary">Currently you don't have any venues to rent 😢</Text>
                    </Col>
                ) : (
                    ownerVenues.allvenues.map((venue) => (
                        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={venue._id}>
                            <div className="h-full w-full">
                                <VenueCard
                                    img1={venue.venuePictures[0].img}
                                    img2={venue.venuePictures[1]?.img}
                                    venueName={venue.venueName}
                                    _id={venue._id}
                                    category={venue.category}
                                    address={venue.address}
                                    location={venue.location}
                                    price={venue.price}
                                    isDelete={true}
                                />
                            </div>
                        </Col>
                    ))
                )}
            </Row>
        </>
    );

    return (
        <Layout2>
            <Layout>
                <Content style={{ padding: '50px' }}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={8}>
                            <ProfileInfo />
                            <div style={{ marginTop: '20px' }}>
                                {auth?.user?.role == 'dealer' && <Statistics />}
                            </div>
                        </Col>
                        <Col xs={24} md={16}>
                            <Card>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab={<span><CalendarOutlined />Bookings</span>} key="1">
                                        <DealsHistory role={role} allDeals={deals.allDeals} />
                                    </TabPane>
                                    {role === 'dealer' && (
                                        <TabPane tab={<span><HomeOutlined />My Venues</span>} key="2">
                                            <VenuesList />
                                        </TabPane>
                                    )}
                                </Tabs>
                            </Card>
                        </Col>
                    </Row>
                    <AddVenueModel
                        visible={addVenueModalShow}
                        onCancel={() => setAddVenueModalShow(false)}
                    />
                </Content>
            </Layout>
        </Layout2>
    );
};

export default ProfilePage;