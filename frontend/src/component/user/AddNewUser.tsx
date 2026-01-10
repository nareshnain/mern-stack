import { useActionState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createNewUser } from '../../service/user';

export const AddNewUser = () => {
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState(createNewUser, {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
    phone: '',
    address: ''
  });

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
            <div className="mb-4">
                <label htmlFor="">First Name</label>
                <input type='text' name={"firstName"} required />
            </div>
            <div className="mb-4">
                <label htmlFor="">Last Name</label>
                <input type='text' name={"lastName"} required />
            </div>
            <div className="mb-4">
                <label htmlFor="">User Name</label>
                <input type='text' name={"username"} required />
            </div>
            <div className="mb-4">
                <label htmlFor="">Email</label>
                <input type='email' name={"email"} required />
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="role">Select Role</label>
                <select name={"role"} className="w-full px-3 py-2 border rounded-base" required>
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="phone">Phone</label>
                <input type='number' className="w-full px-3 py-2 border rounded-base" name={"phone"} required />
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="address">Address</label>
                <input className="w-full px-3 py-2 border rounded-base" type="text" id="address" name={"address"} />
            </div>
            <input disabled={isPending} className="bg-green-500 text-white px-4 py-2 rounded-base" type="submit" value={"Submit"} />
        </form>
        </div>
    </div>
  );
};
