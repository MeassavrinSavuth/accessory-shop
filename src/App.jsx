import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DataTable from './components/DataTable';
import productList from './accessory-product.json';

function App() {
  const productRef = useRef();
  const quantityRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);
  const [nextUniqueId, setNextUniqueId] = useState(1);

  const handleProductChanged = (e) => {
    const pid = parseInt(e.target.value);
    const product = productList.find((p) => p.id === pid);
    setPrice(product.price);
  };

  const handleAdd = () => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find((p) => p.id === pid);
    const q = parseInt(quantityRef.current.value);
    const newItem = {
      ...product,
      quantity: q,
      uniqueId: nextUniqueId
    };
    setSelectedItems(prevItems => [...prevItems, newItem]);
    setNextUniqueId(prevId => prevId + 1);
  };

  const handleDelete = (uniqueId) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.uniqueId !== uniqueId));
  };

  return (
    <Container>
      <Row className="my-4">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Form>
            <Form.Group controlId="inputProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Select ref={productRef} onChange={handleProductChanged}>
                {productList.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="inputPrice" className="my-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="inputQuantity" className="my-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                defaultValue={1}
                ref={quantityRef}
              />
            </Form.Group>

            <Button variant="success" onClick={handleAdd}>
              Add
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="my-4">
        <Col xs={12}>
          <DataTable data={selectedItems} onDelete={handleDelete} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
