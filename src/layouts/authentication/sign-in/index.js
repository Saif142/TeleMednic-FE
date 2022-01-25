import { useState } from 'react'
import { Link } from 'react-router-dom'
import Switch from '@mui/material/Switch'
// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import Checkbox from '@mui/material/Checkbox'
// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'
// Images
import curved9 from 'assets/images/curved-images/bg.jpg'
import api from '../../../services/api'
import { useHistory } from 'react-router-dom'
function SignIn() {
  const history = useHistory()
  const [rememberMe, setRememberMe] = useState(true)
  const handleSetRememberMe = () => setRememberMe(!rememberMe)
  const initialState = {
    email: '',
    password: '',
  }
  const [isDoctor, setIsDoctor] = useState(false)
  const [isPatient, setIsPatient] = useState(false)
  const [user, setUser] = useState(initialState)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  // const [notVerifed, setnotVerifed] = useState("");

  const handleInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const handleDoctorAccount = () => {
    setIsDoctor(true)
    setIsPatient(false)
  }

  const handlePatientAccount = () => {
    setIsPatient(true)
    setIsDoctor(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    var userType = ''
    if (isPatient) userType = 'patient'
    else if (isDoctor) userType = 'doctor'
    else alert('Please select userType')
    const { email, password } = user
    try {
      const res = await api.post('/api/auth', {
        email: email,
        password: password,
        type: userType,
      })
      if (res.status === 200) {
        localStorage.setItem('token', JSON.stringify(res.data.token))
        localStorage.setItem('type', JSON.stringify(res.data.type))
        localStorage.setItem('userData', JSON.stringify(res.data.userData))

        // localStorage.setItem('userData', JSON.stringify(res.data.payload))
        // history.push("/dashboard");
        // window.location.reload();
        // history.push('/profile')
        window.location = '/profile'
      }
    } catch (error) {
      if (error?.response?.data?.message == 'No User Exist With This Email') {
        setEmailError('No User Exist With This Email')
      }
      if (error?.response?.data?.message == 'Invalid Password') {
        setPasswordError('Invalid Password')
      }
    }
    // }
  }
  return (
    <CoverLayout
      title='Welcome back'
      description='Enter your email and password to sign in'
      image={curved9}
    >
      <SuiBox component='form' role='form'>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography
              component='label'
              variant='caption'
              fontWeight='bold'
            >
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type='email'
            placeholder='Email'
            id='email'
            name='email'
            value={user.email}
            onChange={handleInputs}
          />
          {emailError ? <p style={{ color: 'red' }}>{emailError}</p> : ''}
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography
              component='label'
              variant='caption'
              fontWeight='bold'
            >
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type='password'
            placeholder='Password'
            id='password'
            name='password'
            onChange={handleInputs}
            value={user.password}
          />
          {passwordError ? <p style={{ color: 'red' }}>{passwordError}</p> : ''}
        </SuiBox>
        <SuiBox display='flex' alignItems='center'>
          {/* <SuiTypography
            variant='button'
            fontWeight='regular'
            sx={{ cursor: 'poiner', userSelect: 'none' }}
          >
            User Type
          </SuiTypography> */}
          <SuiBox display='flex' alignItems='center'>
            <Checkbox onClick={handleDoctorAccount} />
            <SuiTypography
              variant='button'
              fontWeight='regular'
              // onClick={handleSetAgremment}
              sx={{ cursor: 'poiner', userSelect: 'none' }}
            >
              Doctor{' '}
            </SuiTypography>
            <Checkbox
              onClick={handlePatientAccount}
              sx={{ marginLeft: '70px' }}
            />
            <SuiTypography
              variant='button'
              fontWeight='regular'
              // onClick={handleSetAgremment}
              sx={{ cursor: 'poiner', userSelect: 'none' }}
            >
              Patient{' '}
            </SuiTypography>
          </SuiBox>

          {/* <Switch
          // checked={rememberMe} onChange={handleSetRememberMe}
          /> */}
          {/* <SuiTypography
            variant='button'
            fontWeight='regular'
            // onClick={handleSetRememberMe}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            &nbsp;&nbsp;Remember me
          </SuiTypography> */}
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton
            variant='gradient'
            color='info'
            fullWidth
            onClick={handleSubmit}
          >
            sign in
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign='center'>
          <SuiTypography variant='button' color='text' fontWeight='regular'>
            Don&apos;t have an account?{' '}
            <SuiTypography
              component={Link}
              // to='/authentication/sign-up'
              variant='button'
              color='info'
              fontWeight='medium'
              textGradient
              onClick={() => {
                window.location = '/signup'
              }}
            >
              Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  )
}

export default SignIn
