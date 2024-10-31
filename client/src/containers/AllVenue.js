'use client'

import React, { useEffect, useState } from 'react'
import { Layout, Input, Button, Spin, Typography, Row, Col, Select, Slider, Card, Pagination } from 'antd'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getVenues } from '../actions/venue.actions'
import { isEmpty } from '../helpers/isObjEmpty'
import VenueCard from '../components/UI/VenueCard'
import { Layout as Layout2 } from '../components/Layout/index.layout'
import categories from '../assets/data/categories'
const { Content, Sider } = Layout
const { Title, Paragraph } = Typography
const { Option } = Select

export default function AllVenue() {
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState([0, 1000000])
    const [filteredVenues, setFilteredVenues] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [venuesPerPage] = useState(9)
    const allVenuesInfo = useSelector((state) => state.allVenuesInfo)
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    console.log(allVenuesInfo)
    useEffect(() => {
        document.title = "PlaceofSpace | Venues"
        dispatch(getVenues())
    }, [dispatch])

    useEffect(() => {
        if (!isEmpty(allVenuesInfo.allVenues)) {
            filterVenues()
        }
    }, [allVenuesInfo.allVenues, searchTerm, category, priceRange])

    const filterVenues = () => {
        let filtered = allVenuesInfo.allVenues.filter((venue) => {
            const matchesSearch = venue.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                venue.address.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = category === '' || venue.category === category
            const matchesPrice = venue.price >= priceRange[0] && venue.price <= priceRange[1]
            return matchesSearch && matchesCategory && matchesPrice
        })
        setFilteredVenues(filtered)
        setCurrentPage(1)
    }

    const indexOfLastVenue = currentPage * venuesPerPage
    const indexOfFirstVenue = indexOfLastVenue - venuesPerPage
    const currentVenues = filteredVenues.slice(indexOfFirstVenue, indexOfLastVenue)

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

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
                <Sider width={300} theme="light" className="p-4 overflow-y-auto" breakpoint="lg" collapsedWidth="0">
                    <Title level={4} className="mb-4">Filters</Title>
                    <Input
                        placeholder="Search venues..."
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4"
                    />
                    <Select
                        placeholder="Select category"
                        style={{ width: '100%' }}
                        onChange={(value) => setCategory(value)}
                        className="mb-4"
                    >
                        <Option value="">All Categories</Option>
                        {/* <Option value="Wedding">Wedding</Option>
                        <Option value="Corporate">Corporate</Option>
                        <Option value="Party">Party</Option>
                        <Option value="Conference">Conference</Option>
                        <Option value="Exhibition">Exhibition</Option> */}
                        {
                            categories.map((category) => {
                                return (
                                    <option value={category}>{category}</option>
                                )
                            })
                        }
                    </Select>
                    <Paragraph>Price Range</Paragraph>
                    <Slider
                        range
                        min={0}
                        max={1000000}
                        defaultValue={priceRange}
                        onChange={(value) => setPriceRange(value)}
                    />
                    <Paragraph className="mt-2">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                    </Paragraph>
                    <Button
                        type="primary"
                        icon={<FilterOutlined />}
                        onClick={filterVenues}
                        className="mt-4 w-full"
                    >
                        Apply Filters
                    </Button>
                </Sider>
                <Layout>
                    <Content className="p-8">
                        <Title level={2} className="mb-8">Explore Venues</Title>
                        <Row gutter={[24, 24]}>
                            {isEmpty(currentVenues) ? (
                                <Col span={24}>
                                    <Card>
                                        <Paragraph className="text-center text-gray-600">
                                            No venues match your search criteria. Please try adjusting your filters.
                                        </Paragraph>
                                    </Card>
                                </Col>
                            ) : (
                                currentVenues.map((venue) => (
                                    <Col key={venue._id} xs={24} sm={12} lg={8}>
                                        <VenueCard
                                            img1={venue.venuePictures[0]?.img}
                                            img2={venue.venuePictures[1]?.img}
                                            venueName={venue.venueName}
                                            _id={venue._id}
                                            userId={auth.user?._id}
                                            category={venue.category}
                                            address={venue.address}
                                            location={venue.location}
                                            price={venue.price}
                                            ownerId={venue.ownerId}
                                        />
                                    </Col>
                                ))
                            )}
                        </Row>
                        {!isEmpty(filteredVenues) && (
                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    current={currentPage}
                                    total={filteredVenues.length}
                                    pageSize={venuesPerPage}
                                    onChange={onPageChange}
                                    showSizeChanger={false}
                                />
                            </div>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout2>
    )
}