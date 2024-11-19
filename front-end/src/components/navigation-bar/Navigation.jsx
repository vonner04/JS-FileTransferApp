import React from 'react'
import { TfiMenu, TfiHome, TfiShare, TfiTime, TfiFolder, TfiSettings } from "react-icons/tfi";

function Navigation() {
  return (
    <div className ="fixed top-0 left-0 h-screen w-52 m-0 grid grid-rows-[auto,1fr,auto] items-start bg-primary-background text-primary-text text-xl">
      {/* Menu Icon */}
      <div className='flex flex-row justify-center'> 
      <TfiMenu className="sidebar-icon mt-4 "/>
      </div>
      
      {/* Links*/}
      <div className='flex flex-col gap-y-8 mt-4'>
        <div className='flex flex-row items-center space-x-4'>
          <TfiHome className='sidebar-icon left-1'></TfiHome><span>Home</span></div>
        <div className='flex flex-row items-center space-x-4'>
          <TfiShare className='sidebar-icon left-1'></TfiShare><span>File Transfer</span></div>
        <div className='flex flex-row items-center space-x-4'>
          <TfiTime className='sidebar-icon left-1'></TfiTime><span>Recent Transfer</span></div>
        <div className='flex flex-row items-center space-x-4'>
          <TfiFolder className='sidebar-icon left-1'></TfiFolder><span>My Files</span>
        </div>
      </div>
     
      <div className='flex flex-row items-center space-x-4 mb-4'>
        <TfiSettings className='sidebar-icon left-1'></TfiSettings><span>Account Settings</span></div>
    </div>
  )
}

export default Navigation
