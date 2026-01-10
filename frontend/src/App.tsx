'use client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Sidebar } from './component/common/sidebar';
import { UserList } from './component/user/UserList';
import { AddNewUser } from './component/user/AddNewUser';
import ChatRoom from './component/chatroom';
import VideoCall from './component/videocall/VideoCall';
import { ContactAddress } from './component/address/ContactAddress';
import { UseActionState } from './component/user/UseActionState';

function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{width:'100%'}} className="flex gap-4 bg-neutral-primary-light min-h-screen">
          <div style={{width:'20%', float:'left'}} className='flex-1 w-15'><Sidebar /></div>
          <div style={{width:'80%', float:'right'}} className="flex-1 w-85">
            <div className="p-4 border-1 border-default border-dashed rounded-base">
                <Routes>
                  <Route path="/" element={<ChatRoom />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/add-user" element={<AddNewUser />} />
                  <Route path="/chatroom" element={<ChatRoom />} />
                  <Route path="/videocall" element={<VideoCall />} />
                  <Route path="/contact-address" element={<ContactAddress />} />
                  <Route path="/use-action-state" element={<UseActionState />} />
                  <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
