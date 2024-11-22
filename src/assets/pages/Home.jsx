import React from 'react'
import DocList from '../components/DocList'
import {  useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div>
    <h1 className='text-center fw-bold mt-5 mb-5'>Welcome to Doc App</h1>
    <div className='d-flex justify-content-center'><button onClick={() => navigate('/add')} className='btn btn-info text-center mb-5'> Add New Document </button></div>
    <DocList />
  </div>
  )
}


export default Home