import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import Header from 'layouts/profile/components/Header'
import SuiButton from 'components/SuiButton'
import api from '../../services/api'
import './style.css'
import { ToastContainer, toast } from 'react-toastify'
import FileBase64 from 'react-file-base64'
import { borderColor } from '@mui/material/node_modules/@mui/system'
import moment from 'moment'

function Overview() {
  const initialState = {
    day: '',
    date: '',
    time: '',
  }
  const [user, setUser] = useState(initialState)
  const [drSlots, setDrSlots] = useState()
  console.log(drSlots)
  const handleInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { date, time, day } = user
    try {
      const res = await api.put(
        `api/doctor/slots`,
        {
          day: day,
          time: time,
          date: date,
        },
        {
          headers: {
            'x-auth-token': JSON.parse(window.localStorage.getItem('token')),
          },
        }
      )
      if (res.status == 200) {
        toast('Your Slot has been Added', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        // window.location = "/profile";
        // alert("Successfully updated the profile");
        // toast("Your Profile has been updated", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      }
    } catch (error) {
      alert(JSON.stringify(error?.response?.data))
    }
  }
  useEffect(async () => {
    if (JSON.parse(window.localStorage.getItem('type')) == 'doctor') {
      try {
        const res = await api.get(
          `api/doctor/id/${JSON.parse(localStorage.getItem('userData'))._id}`,
          {
            headers: {
              'x-auth-token': JSON.parse(window.localStorage.getItem('token')),
            },
          }
        )
        if (res) {
          setDrSlots(res.data.slots)
        }
      } catch (error) {}
    }
  }, [drSlots])
  const deleteSlot = async (slot_id) => {
    try {
      const res = await api.delete(
        `api/doctor/slots/${slot_id}/${
          JSON.parse(localStorage.getItem('userData'))._id
        }`,
        {
          headers: {
            'x-auth-token': JSON.parse(window.localStorage.getItem('token')),
          },
        }
      )
      if (res) {
        toast('Your Slot has been Deleted', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        // window.location = "/profile";
        // alert("Successfully updated the profile");
        // toast("Your Profile has been updated", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      }
    } catch (error) {
      alert(JSON.stringify(error?.response?.data))
    }
  }
  return (
    <DashboardLayout>
      <Header />
      <Card sx={{ mt: 5 }}>
        <div className='row bg-white p-5' style={{ borderRadius: '2rem' }}>
          <div className='row '>
            <div className='col-2'>
              <div className='row mb-3'>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Add Slot
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className='row mb-2'>
                <div className='col-12'>
                  <span
                    style={{
                      color: 'transparent',
                    }}
                  >
                    Profile Detail
                  </span>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='weight' className='m-2'>
                      Date
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='date'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='date'
                      value={user.date}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12 mt-4'>
                    <label htmlFor='age' className='m-2'>
                      Day
                    </label>
                    <br />
                    <select
                      value={user.day}
                      onChange={handleInputs}
                      name='day'
                      id='day'
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        height: '35px',
                        borderColor: '#D3D3D3',
                      }}
                    >
                      <option value='Monday'>Monday</option>
                      <option value='Tuesday'>Tuesday</option>
                      <option value='Wednesday'>Wednesday</option>
                      <option value='Thursday'>Thursday</option>
                      <option value='Friday'>Friday</option>
                      <option value='Saturday'>Saturday</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='row mb-2'>
                <div className='col-12'>
                  <span
                    style={{
                      color: 'transparent',
                    }}
                  >
                    Profile Detail
                  </span>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='height' className='m-2'>
                      Time
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='time'
                      placeholder='Enter time as 10:30-11:00 OR 10-11'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='time'
                      value={user.time}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='row'>
                <div className='col-12'>
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: 'transparent',
                    }}
                  >
                    Profile Detail
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-2'></div>
            <div className='col-5'>
              <div className='row'>
                <div className='col-12'>
                  <SuiButton
                    variant='gradient'
                    color='dark'
                    size='medium'
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save Changes
                  </SuiButton>
                </div>
              </div>
            </div>
            <div className='col-5'></div>
          </div>
          <div class='mt-5'>
            <div class='table-responsive'>
              <h3>SLOTS</h3>

              <table class='table '>
                <thead>
                  <tr>
                    <th colspan='2'>#</th>
                    <th>Meeting Day</th>
                    <th>Meeting Time</th>
                    <th>Meeting Date</th>
                  </tr>
                </thead>
                <tbody>
                  {drSlots?.map((meeting, index) => {
                    return (
                      <tr>
                        <td colspan='2'>
                          <h6>{index + 1}</h6>
                        </td>

                        <td>
                          {meeting.day}
                          <br />
                        </td>
                        <td class='font-weight-bold'>{meeting.time}</td>
                        <td>{moment(meeting?.date).format('DD/MM/YYYY')}</td>
                        <td class='font-weight-bold'>
                          <SuiButton
                            variant='gradient'
                            color='dark'
                            size='medium'
                            onClick={() => {
                              deleteSlot(meeting._id)
                            }}
                          >
                            Delete Slot
                          </SuiButton>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <ToastContainer />
    </DashboardLayout>
  )
}

export default Overview
