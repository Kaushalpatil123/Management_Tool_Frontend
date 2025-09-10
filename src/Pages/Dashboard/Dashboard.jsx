import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MainDashboard from './MainDashboard'

const Dashboard = () => {
    return (
        <div className='flex'>
            <div className='w-[20%] h-screen bg-amber-500'><Sidebar /></div>
            <div className='w-[80%] h-screen bg-blue-700'><MainDashboard /></div>
        </div>
    )
}

export default Dashboard