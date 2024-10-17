import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOneVenue } from '../../actions/venue.actions';
import { getPublicURL } from '../../urlConfig';
import { ImgsCard } from './ImgsCard';
import { useDispatch, useSelector } from 'react-redux';
import BookingModel from './BookingModel';

const VenueCard = (props) => {
    const [bookingModalShow, setBookingModalShow] = useState(false);
    const { img1, img2, category, venueName, ownerId, _id, price, location, address, style, isDelete } = props;

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const getVenueInfo = () => {
        dispatch(getOneVenue(_id));
    };

    return (
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={getPublicURL(img1)}
                    alt="venue picture"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Card Content */}
            <div className="p-4">
                {/* Category */}
                <h6 className="text-sm text-gray-500">{category}</h6>

                {/* Venue Name and Price */}
                <div className="flex justify-between items-center mt-2">
                    <h5 className="text-lg font-semibold text-gray-800 truncate">{venueName}</h5>
                    <h5 className="text-lg font-semibold text-green-500">₹ {price}</h5>
                </div>

                {/* Location and Address */}
                <p className="text-sm text-gray-600 truncate mt-2">{location}, {address}</p>

                {/* Buttons */}
                <div className="mt-4 flex justify-between items-center">
                    <Link to={`/venue/${_id}`}>
                        <button
                            onClick={getVenueInfo}
                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
                        >
                            View Details
                        </button>
                    </Link>

                    {/* Conditional Buttons for Delete and Booking */}
                    {isDelete ? (
                        <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition">
                            Delete
                        </button>
                    ) : (
                        auth.user.role !== 'dealer' && (
                            <button
                                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition"
                                onClick={() => setBookingModalShow(true)}
                            >
                                Book
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* Booking Modal */}
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
        </div >
    );
};

export default VenueCard;
