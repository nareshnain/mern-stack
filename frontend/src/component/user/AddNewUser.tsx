import { useActionState, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createNewUser, fetchUserById } from '../../service/user';

export const AddNewUser = () => {
  const queryString = window.location.search
  const defaultFormData = {
    _id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
    phone: '',
    address: ''
  };
  const [userData, setUserData] = useState(defaultFormData);
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState(createNewUser, defaultFormData);
  const params = new URLSearchParams(queryString);
  const userId = params.get('userId');

  useEffect(() => {
    if (userId) {
        // If userId is present, we can fetch user data to prefill the form (not implemented here)
        const fetchUserData = async () => {
            const response = await fetchUserById(userId);
            if (response && !response.error) {
                setUserData(response);
            }
        };
        fetchUserData();
    }
  }, [userId]);
  
  useEffect(() => {
    if (state?.user?._id) {
      navigate("/users");
    }
  }, [ state ]);
    
  const backToUserList = () => {
    navigate("/users");
  };

  return (
    <div className="flex flex-col mt-4 w-full">
        {state?.error && <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-base">{state.error}</div>}
        <div className="flex justify-between items-center">
            <div className="text-left ml-4 mt-4 mb-4"><h2 className="font-bold">Add New User</h2></div>
            <div className="text-right mt-4 mb-4 mr-4">
                <button className="bg-gray-500 text-white px-2 py-1 rounded-base mr-2" onClick={backToUserList}>Back to User List</button>
            </div>
        </div>
        <div className="ml-4">
        <form action={formAction}>
            <div>
                <input type="hidden" name="_id" value={userData?._id || ''} />
            </div>
            <div className="mb-4">
                <label htmlFor="">First Name</label>
                <input type='text' name={"firstName"} required defaultValue={userData?.firstName || ''} />
            </div>
            <div className="mb-4">
                <label htmlFor="">Last Name</label>
                <input type='text' name={"lastName"} required defaultValue={userData?.lastName || ''} />
            </div>
            <div className="mb-4">
                <label htmlFor="">User Name</label>
                <input type='text' name={"username"} required defaultValue={userData?.username || ''} />
            </div>
            <div className="mb-4">
                <label htmlFor="">Email</label>
                <input type='email' name={"email"} required defaultValue={userData?.email || ''} />
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="role">Select Role</label>
                <select name={"role"} className="w-full px-3 py-2 border rounded-base" required defaultValue={userData?.role || ''}>
                    <option value="">Select Role</option>
                    <option value="user" selected={userData?.role === "user"}>User</option>
                    <option value="admin" selected={userData?.role === "admin"}>Admin</option>
                    <option value="customer" selected={userData?.role === "customer"}>Customer</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="phone">Phone</label>
                <input type='number' className="w-full px-3 py-2 border rounded-base" name={"phone"} required defaultValue={userData?.phone || ''} />
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="address">Address</label>
                <input className="w-full px-3 py-2 border rounded-base" type="text" id="address" name={"address"} defaultValue={userData?.address || ''} />
            </div>
            <input disabled={isPending} className="bg-green-500 text-white px-4 py-2 rounded-base" type="submit" value={"Submit"} />
        </form>
        </div>
    </div>
  );
};
