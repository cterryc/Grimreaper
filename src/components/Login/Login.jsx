import { useState } from 'react'
import { API } from '../../views/Home/DkpsTable/DkpsTable.service'
import './Login.css'
import { useNavigate } from 'react-router'
import { objectPost } from '../../helpers/objetPost'
// import { useDispatch } from 'react-redux'

const Login = ({ setShowAddDkp }) => {
  const [inputValue, setInputValue] = useState({
    user: '',
    password: ''
  })
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const onSubmitForm = async (e) => {
    e.preventDefault()
    const response = await fetch(`${API}/login`, objectPost(inputValue))
    const result = await response.json()
    if (result.response) {
      setShowAddDkp(result.response)
      navigate('/')
    }
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

  return (
    <div className='login'>
      <form className='login-form' onSubmit={onSubmitForm}>
        <div className='login-input'>
          <label htmlFor=''>User:</label>
          <input id='user' type='text' onChange={handleOnChange} />
        </div>
        <div className='login-input'>
          <label htmlFor=''>Password:</label>
          <input id='password' type='password' onChange={handleOnChange} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
