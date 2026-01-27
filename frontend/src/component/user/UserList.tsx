
import { Suspense, use, useEffect, useState } from "react";
import { changeDateFormat } from "../../utils/dateFormat";
import { deleteUserById, fetchUserList } from "../../service/user";

export const UserList = () => {
  // const data = use(fetchUserList()); // comment due to error
  const [data, setData] = useState<any[]>([]);

  const fetchUserData = async () => {
    const response = await fetchUserList();
    if (response && !response.error) {
        setData(response);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateUser = (userId: string) => {
    window.location.href = `/add-user?userId=${userId}`;
  };

  const deleteUser = async(userId: string) => {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      await deleteUserById(userId);
      fetchUserData();
    }
  };
  
  return (
    <div className="flex flex-col mt-4 w-full">
        <div className="flex" style={{width:'100%'}}>
            <div className="" style={{width:'20%'}}><h2 className="font-bold">User List</h2></div>
            <div className="" style={{width:'80%'}}>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-base mr-2" onClick={() => window.location.href = '/add-user'}>Add User</button>
            </div>
        </div>
        <div className="ml-4">
            <Suspense fallback={<div>Loading...</div>}>
                <table>
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Firest Name</th>
                            <th className="px-4 py-2 border">Last Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Role</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Address</th>
                            <th className="px-4 py-2 border">Created At</th>
                            <th className="px-4 py-2 border">Updated At</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data?.map((user: any) => (
                        <tr>
                            <td className="px-4 py-2 border">{user.firstName}</td>
                            <td className="px-4 py-2 border">{user.lastName}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.role}</td>
                            <td className="px-4 py-2 border">{user.phone}</td>
                            <td className="px-4 py-2 border">{user.address}</td>
                            <td className="px-4 py-2 border">{changeDateFormat(user.createdAt)}</td>
                            <td className="px-4 py-2 border">{changeDateFormat(user.updatedAt)}</td>
                            <td className="px-4 py-2 border">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded-base mr-2" onClick={() => {
                                    updateUser(user._id);
                                }}>Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded-base" onClick={() => {
                                    deleteUser(user._id);
                                }}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </Suspense>
        </div>
    </div>
  );
};
