import { useState } from 'react'
import { API } from '../../views/Home/DkpsTable/DkpsTable.service'
import Swal from 'sweetalert2'
import './AddDkp.css'

const AddDkp = ({ setButtonShowAddDkp }) => {
  const [xmlData, setXmlData] = useState('')
  const [jsonData, setJsonData] = useState(false)

  const handleXmlChange = (e) => {
    console.log(e.target.value)
    setXmlData(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // await Swal.fire('DKPs update successful', 'Continue', 'success')
    // await Swal.fire({
    //   title: 'DKPs update successfull',
    //   icon: 'success',
    //   confirmButtonText: 'Continue',
    //   allowOutsideClick: false
    // })
    setJsonData(true)
    try {
      const response = await fetch(`${API}/dkps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: xmlData })
      })
      const result = await response.json()
      console.log('esto es result ==>', result)
      if (!result.error) {
        await Swal.fire({
          title: 'DKPs update successfull',
          icon: 'success',
          confirmButtonText: 'Continue',
          allowOutsideClick: false
        })
        setJsonData(false)
      } else {
        await Swal.fire({
          title: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Try again',
          allowOutsideClick: false
        })
        setJsonData(false)
      }
    } catch (error) {
      console.log(error)
      await Swal.fire({
        title: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Try again',
        allowOutsideClick: false
      })
      setJsonData(false)
    }
  }

  return (
    <div className='AddDkp'>
      <div style={{ position: 'fixed' }} onClick={(e) => e.stopPropagation()}>
        <form className='add-dkp-form' onSubmit={handleSubmit}>
          <textarea
            className='add-dkp-textarea'
            value={xmlData}
            onChange={handleXmlChange}
            rows='10'
            cols='50'
            placeholder='Pega tu XML aquí'
          />
          {!jsonData ? (
            <button className='addDkp-button' type='submit'>
              Update Dkp
            </button>
          ) : (
            <button className='addDkp-button-loader' type='submit' disabled>
              <span className='addDkp-loader'></span>
            </button>
          )}
        </form>
        <button
          onClick={() => setButtonShowAddDkp(false)}
          className='addDkp-closed-button'
        >
          <div>
            <div className='arrow'>
              <div className='line'></div>
              <div className='line'></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default AddDkp
