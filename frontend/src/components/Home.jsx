import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
import Switch from 'react-switch';
import { AuthContext } from '../context/AuthContext';
import formatDate from '../utilities/DateFormat';
// import handleDelete from '../utilities/HandleDelete';
import handleStatusToggle from '../utilities/HandleStatusToggle';
import handleDeleteAll from '../utilities/HandleDeleteAll';
import handleStatusToggleAll from '../utilities/HandleStatusToggleAll';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLockOpen, faLock, faTrashCan } from "@fortawesome/free-solid-svg-icons"


function Home() {
  const [data, setData] = useState([]);
  const {currentUser, dispatch} = useContext(AuthContext);
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
    setSelectedRows((prev) => {
      if (prev.length === data.length) {
        return [];
      } else {
        const allIds = data.map((userdata) => userdata.id);
        console.log([...prev, ...allIds]);
        return [...prev, ...allIds];
      }
    });
  };

  // useEffect(() => {
  //   // axios.get('http://localhost:8081/')
  //   axios.get('https://firstdb.cdsygs0ao1t2.eu-north-1.rds.amazonaws.com/')
  //   .then(res => setData(res.data))
  //   .catch(err => console.log(err));
  // }, [])

  useEffect(() => {
    axios.get('http://firstdb.cdsygs0ao1t2.eu-north-1.rds.amazonaws.com/')
      .then((res) => {
        setData(res.data);
        console.log(res.data); // Corrected the log statement
      })
      .catch((err) => {
        console.log(err);
        console.error('AxiosError:', err); // Corrected the log statement
      });
  }, []);


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
        <div className='d-flex justify-content-end align-items-center pt-4'>
          {currentUser &&
            <h4 className="text-primary me-4">Hello, {currentUser.name ? currentUser.name.toUpperCase() : findUserByEmail(currentUser.email, data)?.name.toUpperCase()}!
            </h4>}
          <button className='btn btn-danger' onClick={handleLogout}>Logout
          </button>
        </div>
        <div className='d-flex vh-100 justify-content-center align-items-start pt-5'>
          <div className='w-100 bg-white rounded p-3 shadow p-3 mb-5 bg-body rounded'>
            <h2 className='text-center mt-4'>User Accounts</h2>
            <hr className="mt-5 mx-5" />
            <div className='p-4'>
              <button className='btn btn-danger mx-2' onClick={ () => handleDeleteAll(selectedRows) }> <FontAwesomeIcon icon={faTrashCan} /></button>
              <button className='btn btn-primary' onClick={ () => handleStatusToggleAll(selectedRows, data) }><FontAwesomeIcon icon={faLock} /> / <FontAwesomeIcon icon={faLockOpen} /></button>
            </div>
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
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((userdata, index) => {
                  return <tr key={index}>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => handleRowSelect(userdata.id)}
                        checked={isSelected(userdata.id)}
                      />
                    </td>
                    <td className="text-left">{userdata.id}</td>
                    <td className="text-left">{userdata.name}</td>
                    <td className="text-left">{userdata.email}</td>
                    <td className="text-left">{formatDate(userdata.login, true)}</td>
                    <td className="text-left">{formatDate(userdata.created_at)}</td>
                    <td className="d-flex align-items-center" style={{ minHeight: '55px' }}>
                      <Switch
                        onChange={() => handleStatusToggle(userdata.id, userdata.status)}
                        checked={userdata.status === 1}
                        offColor='#DC3545'
                        onColor='#28A745'
                      />
                      <span style={{ marginLeft: '5px' }}>
                        {userdata.status === 1 ? 'Active' : userdata.status === 0 ? 'Blocked' : ''}
                      </span>
                    </td>
                    {/* <td>
                      <button className='btn btn-sm btn-danger rounded-4' onClick={ () => handleDelete(userdata.id)}>Delete</button>
                    </td> */}
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function findUserByEmail(email, data) {
  return data.find(userdata => userdata.email === email);
}

export default Home
