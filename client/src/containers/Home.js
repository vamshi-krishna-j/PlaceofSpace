// import React, { useEffect } from 'react';
// import Layout from '../components/Layout/index.layout';
// import VenueCard from '../components/UI/VenueCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { getVenues } from '../actions/venue.actions';
// import { isEmpty } from '../helpers/isObjEmpty';
// import { Carousel, InputGroup, FormControl } from 'react-bootstrap'; // Added InputGroup for search
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are applied

// function Home() {
//     document.title = "PlaceofSpace | Home";
//     const allVenuesInfo = useSelector(state => state.allVenuesInfo);
//     const auth = useSelector(state => state.auth);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getVenues());
//     }, [dispatch]);

//     if (allVenuesInfo.loading) {
//         return (
//             <Layout>
//                 <div className="flex flex-col justify-center items-center mt-16">
//                     <h1 className="text-2xl font-semibold mb-4">Getting all venues 🎉</h1>
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
//                 </div>
//             </Layout>
//         );
//     }

//     // Placeholder images for the carousel
//     const placeholderImages = [
//         "https://via.placeholder.com/800x400.png?text=Venue+1",
//         "https://via.placeholder.com/800x400.png?text=Venue+2",
//         "https://via.placeholder.com/800x400.png?text=Venue+3",
//         "https://via.placeholder.com/800x400.png?text=Venue+4",
//         "https://via.placeholder.com/800x400.png?text=Venue+5"
//     ];

//     return (
//         <Layout>
//             <div className="container mx-auto px-4 py-8">
//                 {/* Search Bar */}
//                 <InputGroup className="mb-4">
//                     <FormControl
//                         placeholder="Search for venues..."
//                         aria-label="Search for venues"
//                     />
//                 </InputGroup>

//                 {/* Carousel Section */}
//                 <Carousel className="mb-8" interval={3000} controls={true} indicators={true}>
//                     {placeholderImages.map((imgSrc, index) => (
//                         <Carousel.Item key={index}>
//                             <img
//                                 className="d-block w-100"
//                                 src={imgSrc}
//                                 alt={`Venue ${index + 1}`}
//                                 style={{ height: '400px', objectFit: 'cover' }}
//                             />
//                             <Carousel.Caption>
//                                 <h3>Featured Venue {index + 1}</h3>
//                                 <p>Explore the best features of this venue.</p>
//                             </Carousel.Caption>
//                         </Carousel.Item>
//                     ))}
//                 </Carousel>

//                 {/* Popular Venues Section */}
//                 <h2 className="text-2xl font-semibold mb-4">Popular Venues</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {
//                         isEmpty(allVenuesInfo.allVenues) ? (
//                             <div className="col-span-full text-center mt-16">
//                                 <h1 className="text-2xl font-semibold text-gray-600">
//                                     No Venues currently 😢
//                                     <br />
//                                     Check again after some time
//                                 </h1>
//                             </div>
//                         ) : (
//                             allVenuesInfo.allVenues.map((venue) => {
//                                 const { _id, venueName, address, location, category, price, venuePictures, ownerId } = venue;
//                                 return (
//                                     <VenueCard
//                                         key={_id}
//                                         img1={venuePictures[0]?.img}
//                                         img2={venuePictures[1]?.img}
//                                         venueName={venueName}
//                                         _id={_id}
//                                         userId={auth.user._id}
//                                         category={category}
//                                         address={address}
//                                         location={location}
//                                         price={price}
//                                         ownerId={ownerId}
//                                         style={{ width: "100%", height: "auto" }}
//                                     />
//                                 );
//                             })
//                         )
//                     }
//                 </div>
//             </div>
//         </Layout>
//     );
// }
// const heroImages = [
//     "https://images.squarespace-cdn.com/content/v1/60da576b8b440e12699c9263/1650354559198-U58EM4C8OL0QIVOW3CSN/Ovation.jpg?format=1500w",
//     "https://images.squarespace-cdn.com/content/v1/60da576b8b440e12699c9263/1650354559198-U58EM4C8OL0QIVOW3CSN/Ovation.jpg?format=1500w",
//     "https://images.squarespace-cdn.com/content/v1/60da576b8b440e12699c9263/1650354559198-U58EM4C8OL0QIVOW3CSN/Ovation.jpg?format=1500w",
// ];

// export default Home;

'use client'

import React, { useEffect, useState } from 'react'
import { Layout, Input, Button, Spin, Carousel, Typography, Row, Col } from 'antd'
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getVenues } from '../actions/venue.actions'
import { isEmpty } from '../helpers/isObjEmpty'
import VenueCard from '../components/UI/VenueCard'
import { Layout as Layout2 } from '../components/Layout/index.layout'
import { Link } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const { Title, Paragraph } = Typography

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const allVenuesInfo = useSelector((state) => state.allVenuesInfo)
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "PlaceofSpace | Home"
        dispatch(getVenues())
    }, [dispatch])

    const heroImages = [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ]

    if (allVenuesInfo.loading) {
        return (
            <Layout className="min-h-screen">
                <div className="flex flex-col justify-center items-center h-screen">
                    <Spin size="large" />
                    <h2 className="mt-4 text-xl">Loading venues...</h2>
                </div>
            </Layout>
        )
    }

    return (
        <Layout2>
            <Layout className="min-h-screen">
                <Content>
                    {/* Hero Section */}
                    <Carousel autoplay effect="fade" className="h-[600px]">
                        {heroImages.map((image, index) => (
                            <div key={index} className="h-[600px]">
                                <div
                                    className="h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${image})` }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <div className="text-center text-white px-4">
                                            <Title level={1} className="text-5xl font-bold mb-4 text-white animate-fade-in-down">
                                                Find Your Perfect Event Space
                                            </Title>
                                            <Paragraph className="text-xl mb-8 text-white animate-fade-in-up">
                                                Discover unique venues for any occasion
                                            </Paragraph>
                                            <div className="animate-fade-in">
                                                <Input
                                                    size="large"
                                                    placeholder="Search for venues..."
                                                    prefix={<SearchOutlined />}
                                                    className="w-full max-w-md"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>

                    {/* Popular Venues Section */}
                    <div className="container mx-auto px-4 py-16">
                        <Title level={2} className="text-3xl font-bold mb-8 text-center">
                            Popular Venues
                        </Title>
                        <Row gutter={[24, 24]}>
                            {isEmpty(allVenuesInfo.allVenues) ? (
                                <Col span={24}>
                                    <div className="text-center">
                                        <Paragraph className="text-xl text-gray-600">
                                            No venues available at the moment. Please check back later.
                                        </Paragraph>
                                    </div>
                                </Col>
                            ) : (
                                allVenuesInfo.allVenues.slice(0, 6).map((venue) => (
                                    <Col key={venue._id} xs={24} sm={12} lg={8}>
                                        <div className="transform transition duration-500 hover:scale-105">
                                            <VenueCard
                                                img1={venue.venuePictures[0]?.img}
                                                img2={venue.venuePictures[1]?.img}
                                                venueName={venue.venueName}
                                                _id={venue._id}
                                                userId={auth.user._id}
                                                category={venue.category}
                                                address={venue.address}
                                                location={venue.location}
                                                price={venue.price}
                                                ownerId={venue.ownerId}
                                            />
                                        </div>
                                    </Col>
                                ))
                            )}
                        </Row>
                        <div className="text-center mt-12">
                            <Link to={`/allvenues`}>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<ArrowRightOutlined />}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    View More Venues
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Call to Action Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-white">
                        <div className="container mx-auto px-4 text-center">
                            <Title level={2} className="text-3xl font-bold mb-4 text-white">
                                Ready to Host Your Event?
                            </Title>
                            <Paragraph className="text-xl mb-8 text-white">
                                Join PlaceofSpace and start booking amazing venues today!
                            </Paragraph>
                            <Button
                                type="primary"
                                size="large"
                                className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-700 border-none transition duration-300 ease-in-out transform hover:scale-105"
                                icon={<ArrowRightOutlined />}
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </Content>
                <Footer className="text-center">
                    PlaceofSpace © {new Date().getFullYear()} - All Rights Reserved
                </Footer>
            </Layout>
        </Layout2>
    )
}