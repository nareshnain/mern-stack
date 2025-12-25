import { useNavigate } from "react-router-dom";

export const AddNewUser = () => {
  const navigate = useNavigate();
  const backToUserList = () => {
    navigate("/users");
  };

  return (
    <div className="flex flex-col mt-4 w-full">
        <div className="flex justify-between items-center">
            <div className="text-left ml-4 mt-4 mb-4"><h2 className="font-bold">Add New User</h2></div>
            <div className="text-right mt-4 mb-4 mr-4">
                <button className="bg-gray-500 text-white px-2 py-1 rounded-base mr-2" onClick={backToUserList}>Back to User List</button>
            </div>
        </div>
        <div className="ml-4">
            <form>
                <div className="mb-4">
                    <label className="block text-body mb-2" htmlFor="firstName">First Name</label>
                    <input className="w-full px-3 py-2 border rounded-base" type="text" id="firstName" name="firstName" />
                </div>
                <div className="mb-4">
                    <label className="block text-body mb-2" htmlFor="lastName">Last Name</label>
                    <input className="w-full px-3 py-2 border rounded-base" type="text" id="lastName" name="lastName" />
                </div>
                <div className="mb-4">
                    <label className="block text-body mb-2" htmlFor="email">Email</label>
                    <input className="w-full px-3 py-2 border rounded-base" type="email" id="email" name="email" />
                </div>
                <div className="mb-4">
                    <label className="block text-body mb-2" htmlFor="role">Role</label>
                    <input className="w-full px-3 py-2 border rounded-base" type="text" id="role" name="role" />
                </div>
                <div className="mb-4">
                    <label className="block text-body mb-2" htmlFor="phone">Phone</label>
                    <input className="w-full px-3 py-2 border rounded-base" type="text" id="phone" name="phone" />
                </div>
                <div className="mb-4">
                    <label className="block text-body mb-2" htmlFor="address">Address</label>
                    <input className="w-full px-3 py-2 border rounded-base" type="text" id="address" name="address" />
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-base" type="submit">Submit</button>
            </form>
        </div>
    </div>
  );
};
