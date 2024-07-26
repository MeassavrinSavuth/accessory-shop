import React, { useState, useRef, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const DataTable = ({ data, onDelete }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const searchRef = useRef();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    const searchTerm = searchRef.current.value.toLowerCase();
    const filtered = data.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.price.toString().includes(searchTerm) ||
      item.quantity.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleSort = (direction) => {
    setSortConfig({ key: 'price', direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  return (
    <Container>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          ref={searchRef}
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
          <i className="bi bi-search"></i>
        </Button>
        <Button variant="outline-secondary" onClick={() => handleSort('ascending')}>
          <i className="bi bi-arrow-up"></i>
        </Button>
        <Button variant="outline-secondary" onClick={() => handleSort('descending')}>
          <i className="bi bi-arrow-down"></i>
        </Button>
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>Product Name</th>
            <th>Price {sortConfig.key === 'price' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.uniqueId}>
              <td>
                <i
                  className="bi bi-trash"
                  style={{ cursor: 'pointer', color: 'red', fontSize: '1.2em' }}
                  title="Delete"
                  onClick={() => onDelete(item.uniqueId)}
                ></i>
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataTable;