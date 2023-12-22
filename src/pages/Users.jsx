import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fetch-all-users-info', {
          withCredentials: true,
        });
        setData(response.data.users);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/")
        }
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [data, searchTerm]);

  const handleAuthorityChange = async (event, userId) => {
    try {
      const updatedData = data.map((user) => {
        if (user.id === userId) {
          return { ...user, authority: event.target.value };
        }
        return user;
      });

      await axios.put(`http://localhost:8080/update-user-authority/${userId}`, {
        newAuthority: event.target.value,
      }, {
        withCredentials: true,
      });

      setData(updatedData); // Update the state with the modified data
    } catch (error) {
      console.error('Error updating authority:', error);
    }
  };

  return (
    <div>
      <h1>Users Table</h1>
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Authority</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.username}</td>
              <td>{row.email}</td>
              <td>
                <select value={row.authority} onChange={(event) => handleAuthorityChange(event, row.id)}>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Deactivated">Deactivated</option>
                  {/* Add more options as needed */}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;