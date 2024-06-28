import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Topbar from '../common/Topbar';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../utils/ApiService';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function DashboardBook() {
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookData();
  }, []);

  const getBookData = async () => {
    try {
      let res = await ApiService.get('/Formik_Task_json');
      if (res.status === 200) {
        setBookData(res.data);
      }
    } catch (error) {
      alert('Data fetch failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await ApiService.delete(`/Formik_Task_json/${id}`);
      if (res.status === 200) {
        getBookData();
      }
    } catch (error) {
      alert('Data removal failed');
    }
  };

  const renderCards = () => {
    return bookData.map((e, i) => (
      <Col key={i} xs={12} md={6} className='mb-3'>
        <Card style={{
            boxShadow: 'rgba(0, 0, 0, 0.0) 0px 54px 55px, rgba(0, 0, 0, 0.0) 0px -12px 30px, rgba(0, 0, 0, 0.0) 0px 4px 6px, rgba(0, 0, 0, 0.0) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
              }}>          
            <Card.Body>
            <Card.Text>
              <strong>TITLE :</strong> {e.title}
            </Card.Text>
            <Card.Text>
              <strong>AUTHOR NAME :</strong> {e.author}
            </Card.Text>
            <Card.Text>
              <strong>ISBN NO :</strong> {e.isbnNum}
            </Card.Text>
            <Card.Text>
              <strong>DESCRIPTION :</strong> {e.description}
            </Card.Text>
            <Card.Text>
              <strong>PUBLISHED AT :</strong> {e.date}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-center justify-content-end">
            <Button variant='success' onClick={() => navigate(`/edit-book/${e.id}`)}>
              EDIT
            </Button>
            &nbsp;
            <Button variant='danger' onClick={() => handleDelete(e.id)}>
              DELETE
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <Topbar /><br/>
      <Container className="d-flex justify-content-center align-items-center flex-column" >
        <Button className='mt-3' variant='secondary' onClick={() => navigate(`/add-book`)}>
          ADD BOOK
        </Button>
      </Container><br/>
      <Container>      
        <Row className='mt-3'>{renderCards()}</Row>
      </Container>
      

    </>
  );
}

export default DashboardBook;