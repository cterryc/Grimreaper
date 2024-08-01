import { useState } from 'react'
// import { API } from '../../views/Home/DkpsTable/DkpsTable.service'
import './Register.css'
import { useNavigate } from 'react-router'
// import { objectPost } from '../../helpers/objetPost'
import { useDispatch } from 'react-redux'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
// import { registerUser } from '../../redux/actions/actionsregister'

const Register = ({ _setShowAddDkp }) => {
  const [showPass, setShowPass] = useState({
    showpass: false,
    showrepeat: false
  })
  const [inputValue, setInputValue] = useState({
    user: '',
    password: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmitForm = async (e) => {
    e.preventDefault()
    // dispatch(registerUser(inputValue))
    // const response = await fetch(`${API}/register`, objectPost(inputValue))
    // const result = await response.json()
    // if (result.response) {
    //   setShowAddDkp(result.response)
    //   navigate('/')
    // }
  }

  const handleOnChange = (e) => {
    if (e.target.id === 'user') {
      setInputValue({
        ...inputValue,
        user: e.target.value
      })
    } else {
      setInputValue({
        ...inputValue,
        password: e.target.value
      })
    }
  }

  const handleShowPassword = (e) => {
    console.log(e.currentTarget.id)
    const show = e.currentTarget.id
    if (show === 'showpass') {
      setShowPass({
        ...showPass,
        showpass: !showPass.showpass
      })
    } else {
      setShowPass({
        ...showPass,
        showrepeat: !showPass.showrepeat
      })
    }
    // setShowPass(!showPass)
  }

  return (
    <div className='register'>
      <form className='register-form' onSubmit={onSubmitForm}>
        <div className='register-input'>
          <label htmlFor=''>User:</label>
          <input id='user' type='text' onChange={handleOnChange} />
        </div>
        <div className='register-input'>
          <label htmlFor=''>Password:</label>
          <input
            id='password'
            type={showPass.showpass ? 'text' : 'password'}
            onChange={handleOnChange}
          />
          <div
            id='showpass'
            onClick={handleShowPassword}
            className='register-showpass-container'
          >
            {showPass.showpass ? (
              <FaRegEye className='register-showPass' />
            ) : (
              <FaRegEyeSlash className='register-showPass' />
            )}
          </div>
        </div>
        <div className='register-input'>
          <label htmlFor=''>Repeat Password:</label>
          <input
            id='repeatPassword'
            type={showPass.showrepeat ? 'text' : 'password'}
            onChange={handleOnChange}
          />
          <div
            id='showrepeat'
            onClick={handleShowPassword}
            className='register-showpass-container'
          >
            {showPass.showrepeat ? (
              <FaRegEye className='register-showPass' />
            ) : (
              <FaRegEyeSlash className='register-showPass' />
            )}
          </div>
        </div>
        <div className='register-input'>
          <label htmlFor=''>Gmail or Outlook:</label>
          <input id='email' type='email' onChange={handleOnChange} />
        </div>
        <div className='register-input'>
          <label htmlFor=''>Invite Code:</label>
          <input id='inviteCode' type='text' onChange={handleOnChange} />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
