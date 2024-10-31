import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVenue } from '../../actions/venue.actions';
import categories from '../../assets/data/categories';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Modal from 'antd/es/modal/Modal';
import Input from './Input';

const AddVenueModel = (props) => {
    const dispatch = useDispatch();
    const addVenueStatus = useSelector(state => state.addVenueStatus);

    const [venueName, setVenueName] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [venuePictures, setVenuePictures] = useState([]);
    const [messageModalShow, setMessageModalShow] = useState(false);

    const handleVenuePictures = (e) => {
        setVenuePictures([
            ...venuePictures,
            e.target.files[0]
        ])
    }

    const saveVenue = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('venueName', venueName);
        form.append('location', location);
        form.append('address', address);
        form.append('description', description);
        form.append('price', price);
        form.append('category', category);
console.log(venuePictures)
        for (let picture of venuePictures) {
            form.append('venuePicture', picture);
        }
        console.log(form);

        dispatch(addVenue(form));   
        setMessageModalShow(true);
      
        props.onCancel(false)   
    }
    return (
        <Modal
            open={props.visible}
            title={<span className="text-2xl font-bold">🏛️ Add New Venue</span>}
            onCancel={props.onCancel}
            footer={null}
            width={800}
            className="rounded-lg shadow-lg"
        >
            <Form onSubmit={saveVenue}>
                <Row>
                    <Col md={6}>
                        <Input
                            label='Venue Name'
                            type='text'
                            placeholder='Name of venue'
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                        />
                    </Col>
                    <Col md={6}>
                        <Input
                            label='Location'
                            type='text'
                            placeholder='Location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Col>
                </Row>
                <Input
                    label='Address'
                    type='text'
                    placeholder='Area, Street Name'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='Keep it under 30 words'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Row>
                    <Col md={6}>
                        <Input
                            label='Price'
                            type='number'
                            placeholder='Price in Indian Rupee'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <select class="form-select" value={category} required onChange={(e) => setCategory(e.target.value)}>
                                <option selected>-Select-</option>
                                {
                                    categories.map((category) => {
                                        return (
                                            <option value={category}>{category}</option>
                                        )
                                    })
                                }
                            </select>
                        </Form.Group>
                    </Col>
                </Row>

                <div class="mb-3">
                    <label for="formFile" class="form-label">Venue Pictures</label>
                    <input class="form-control" type="file" id="formFile" onChange={handleVenuePictures} />
                </div>
                <p>Uploaded pictures will display here -</p>

                {
                    venuePictures.length > 0 ?
                        venuePictures.map((picture) => {
                            return (
                                <p className="text-muted">{picture.name}</p>
                            )
                        }) : null
                }

                <Button variant="success" type="submit" style={{ marginRight: '10px' }} onClick={props.onHide}>Add +</Button>
                <Button variant="danger" type="reset" style={{ marginLeft: '10px' }}>Reset</Button>
            </Form>
        </Modal>
    );
};

export default AddVenueModel;