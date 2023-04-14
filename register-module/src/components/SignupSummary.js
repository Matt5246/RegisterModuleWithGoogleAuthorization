import React from 'react';
import { Modal } from 'react-bootstrap';
import { Form, Card, Button, Alert } from 'react-bootstrap';
export default function SignupSummary({data, show, handleClose, handleConfirm, error}) {
  const {email, nip, phone, role} = data;
  function handleSubmit(e){
    e.preventDefault();
    handleConfirm(data);
  }
  return (
    <Card className="card-style">
        <Card.Body>
            <Form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Registration Summary</h2>
            {email && <p><strong>Email: </strong> {email}</p>}
            {nip && <p><strong>NIP: </strong> {nip}</p>}
            {phone && <p><strong>Phone: </strong> {phone}</p>}
            {role && <p><strong>Role: </strong> {role}</p>}
            {error && <p className="text-danger">{error}</p>}
            <Button className="w-100 mt-3 button-text" variant="secondary" onClick={handleClose}>Edit</Button>
            <Button className="w-100 mt-3 button-text" variant="primary" type='submit'>Confirm</Button>
            </Form>
        </Card.Body>
    </Card>
  );
}