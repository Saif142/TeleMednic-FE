import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import Header from 'layouts/profile/components/Header'
import SuiButton from 'components/SuiButton'
import api from '../../services/api'
import './style.css'
import FileBase64 from 'react-file-base64'
import { WindowSharp } from '@mui/icons-material'
import common_avatar from 'assets/images/common_avatar.jpeg'

function Overview() {
  const initialState = {
    blood: '',
    height: '',
    weight: '',
    avatar: '',
    age: '',
  }

  const [user, setUser] = useState(initialState)
  const [imgUrl, setImgUrl] = useState(common_avatar)
  const handleInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { weight, blood, height, age } = user
    try {
      const res = await api.post(
        `api/profile`,
        {
          weight: weight,
          blood: blood,
          height: height,
          avatar: imgUrl,
          age: age,
        },
        {
          headers: {
            'x-auth-token': JSON.parse(window.localStorage.getItem('token')),
          },
        }
      )
      if (res.status == 200) {
        window.location = '/profile'
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
                  Create Profile
                </span>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img
                    src={imgUrl}
                    alt=''
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 'auto',
                    }}
                  ></img>
                </div>
              </div>
              <div className='row mt-3'>
                <div>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => setImgUrl(base64)}
                  />
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='row mb-2'>
                <div className='col-12'>
                  <span
                    style={{
                      // fontSize: "20px",
                      // fontWeight: "bold",
                      // display: "none",
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
                      Weight
                    </label>
                    <input
                      type='number'
                      min='60'
                      max='120'
                      className='form-control'
                      id='weight'
                      placeholder='Enter Weight (kg)'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='weight'
                      value={user.weight}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='age' className='m-2'>
                      Age
                    </label>
                    <input
                      type='number'
                      min='1'
                      max='100'
                      className='form-control'
                      id='age'
                      placeholder='Enter age'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='age'
                      value={user.age}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='row mb-2'>
                <div className='col-12'>
                  <span
                    style={{
                      // fontSize: "20px",
                      // fontWeight: "bold",
                      // display: "none",
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
                      Height{' '}
                    </label>
                    <input
                      type='number'
                      min='150'
                      max='250'
                      className='form-control'
                      id='height'
                      placeholder='Enter height (cm)'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='height'
                      value={user.height}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='blood' className='m-2'>
                      Blood
                    </label>
                    <select
                      value={user.blood}
                      onChange={handleInputs}
                      name='blood'
                      id='blood'
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        height: '35px',
                        borderColor: '#D3D3D3',
                      }}
                    >
                      <option value=''>Select Blood</option>
                      <option value='A+'>A+</option>
                      <option value='A-'>A-</option>
                      <option value='B+'>B+</option>
                      <option value='B-'>B-</option>
                      <option value='AB+'>AB+</option>
                      <option value='AB-'>AB-</option>
                      <option value='O+'>O+</option>
                      <option value='O-'>O-</option>
                    </select>
                    {/* <input
                      type='text'
                      className='form-control'
                      id='blood'
                      placeholder='Enter Blood'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='blood'
                      value={user.blood}
                      onChange={handleInputs}
                    /> */}
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
        </div>
      </Card>

      {/* <Footer /> */}
    </DashboardLayout>
  )
}

export default Overview
