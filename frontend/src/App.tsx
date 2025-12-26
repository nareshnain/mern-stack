import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Sidebar } from './component/common/sidebar';
import { UserList } from './component/user/UserList';
import { AddNewUser } from './component/user/AddNewUser';
import ChatRoom from './component/chatroom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Sidebar />
          <div className="p-4 sm:ml-64">
            <div className="p-4 border-1 border-default border-dashed rounded-base">
                <Routes>
                  <Route path="/" element={<ChatRoom />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/add-user" element={<AddNewUser />} />
                  <Route path="/chatroom" element={<ChatRoom />} />
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
