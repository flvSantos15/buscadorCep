import { useState } from 'react'
import api from './services/api'

import { FiSearch } from 'react-icons/fi'
import './styles.css'

export default function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function handleSearch() {
    if (input === '') {
      alert('Please enter a valid CEP!')
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)

    } catch (err) {
      alert('Ops! Erro ao buscar.')
    }
    setInput('')
  }
  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>

      <div className='containerInput'>
        <input
          type='text'
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>Endereço: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>

        </main>
      )}
    </div>
  );
}
