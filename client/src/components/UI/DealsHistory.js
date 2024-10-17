import React from 'react';
import { Table, Empty, Typography, Tag, Button, Space } from 'antd';
import { CalendarOutlined, DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { isEmpty } from '../../helpers/isObjEmpty';

const { Title, Text } = Typography;

const DealsHistory = ({ allDeals, role }) => {
    const columns = [
        {
            title: 'Deal Date',
            dataIndex: 'date_added',
            key: 'date_added',
            render: (text) => (
                <Space>
                    <CalendarOutlined />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Venue Name',
            dataIndex: 'venueName',
            key: 'venueName',
        },
        {
            title: 'Event Date',
            dataIndex: 'eventDate',
            key: 'eventDate',
            render: (text) => (
                <Tag color="blue">
                    <CalendarOutlined /> {text}
                </Tag>
            ),
        },
        {
            title: role === 'dealer' ? 'Per Deal Revenue' : 'Bill per Deal',
            dataIndex: 'bill',
            key: 'bill',
            render: (text) => (
                <Space>
                    <DollarOutlined />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" size="small" icon={<InfoCircleOutlined />}>
                    Details
                </Button>
            ),
        },
    ];

    return (
        <div className="deals-history-container">
            <Title level={4}>Last Few Bookings</Title>
            {isEmpty(allDeals) ? (
                <Empty
                    description={
                        <Text type="secondary">
                            {role === 'client'
                                ? "You haven't booked any venues yet"
                                : "Currently you don't have any bookings"}
                        </Text>
                    }
                />
            ) : (
                <Table
                    columns={columns}
                    dataSource={allDeals}
                    rowKey={(record) => record.id || record.date_added}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: true }}
                />
            )}
        </div>
    );
};

export { DealsHistory };