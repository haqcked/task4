import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
import Switch from 'react-switch';
import { AuthContext } from '../context/AuthContext';
import formatDate from '../utilities/DateFormat';
import handleDelete from '../utilities/HandleDelete';
import handleStatusToggle from '../utilities/HandleStatusToggle';
import handleDeleteAll from '../utilities/HandleDeleteAll';
import handleStatusToggleAll from '../utilities/HandleStatusToggleAll';



function Home() {
  const [ data, setData ] = useState([])
  const {currentUser, dispatch} = useContext(AuthContext)
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (id) => {
    const isSelected = selectedRows.includes(id);
    setSelectedRows((prev) => {
      const updatedState = isSelected
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];
      console.log(updatedState);
      return updatedState;
    });
  };

  const isSelected = (id) => {
    return selectedRows.includes(id);
  };

  const selectAllRows = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      const allIds = data.map((user) => user.id);
      setSelectedRows((prev) => {
        console.log([...prev, ...allIds]);
        return [...prev, ...allIds];
      });
    }
    console.log(selectedRows);
  };

  useEffect(() => {
    axios.get('http://localhost:8081/')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully!',
      showConfirmButton: false,
      timer: 2000
    });
  };

  return (
    <div>
      <div className='container'>
        <div className=' d-flex justify-content-end align-items-center pt-4'>
          {currentUser && <div className="text-primary me-4">Welcome, {currentUser.name ? currentUser.name.toUpperCase() : findUserByEmail(currentUser.email, data)?.name.toUpperCase()}!</div>}
          <button className='btn btn-danger' onClick={handleLogout}>Logout
          </button>
        </div>
        <div className='d-flex vh-100 justify-content-center align-items-start pt-5'>
          <div className='w-100 bg-white rounded p-3 shadow p-3 mb-5 bg-body rounded'>
            <h2>User Accounts</h2>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <button className='btn btn-danger' onClick={ () => handleDeleteAll(selectedRows) }>Delete</button>
              <button className='btn btn-primary' onClick={ () => handleStatusToggleAll(selectedRows) }>Change Status</button>
              <table className='table'>
              <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: 'white' }}>
                  <tr>
                    <th>
                      <input className="form-check-input" type="checkbox" onChange={selectAllRows} />
                  </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Last Login</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((users, index) => {
                    return <tr key={index}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={() => handleRowSelect(users.id)}
                          checked={isSelected(users.id)}
                        />
                      </td>
                      <td className="text-left">{users.id}</td>
                      <td className="text-left">{users.name}</td>
                      <td className="text-left">{users.email}</td>
                      <td className="text-left">{formatDate(users.login, true)}</td>
                      <td className="text-left">{formatDate(users.created_at)}</td>
                      <td className="d-flex align-items-center" style={{ minHeight: '55px' }}>
                        <Switch
                          onChange={() => handleStatusToggle(users.id, users.status)}
                          checked={users.status === 1}
                          offColor='#DC3545'
                          onColor='#28A745'
                        />
                        <span style={{ marginLeft: '5px' }}>
                          {users.status === 1 ? 'Active' : users.status === 0 ? 'Blocked' : ''}
                        </span>
                      </td>
                      <td>
                        <button className='btn btn-sm btn-danger rounded-4' onClick={ () => handleDelete(users.id)}>Delete</button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function findUserByEmail(email, data) {
  return data.find(user => user.email === email);
}

export default Home
