import { useState } from 'react'

const AddDkp = () => {
  const [xmlData, setXmlData] = useState('')
  const [jsonData, setJsonData] = useState(null)

  const handleXmlChange = (e) => {
    console.log(e.target.value)
    setXmlData(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('esto es XML ==>', typeof xmlData)
    try {
      const response = await fetch('http://localhost:3001/dkps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: xmlData })
      })
      const result = await response.json()
      setJsonData(result)
    } catch (error) {
      console.error('Error converting XML to JSON:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={xmlData}
          onChange={handleXmlChange}
          rows='10'
          cols='50'
          placeholder='Pega tu XML aquí'
        />
        <button type='submit'>Convertir a JSON</button>
      </form>
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  )
}

export default AddDkp
