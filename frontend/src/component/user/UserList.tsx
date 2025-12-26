import { useUserList } from "../../service/user";
import { changeDateFormat } from "../../utils/dateFormat";

export const UserList = () => {
  const { data, loader, error }: any = useUserList();
  console.log("User List Data:", data);
  
  if (loader) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col mt-4 w-full">
        <div className="flex justify-between items-center">
            <div className="text-left ml-4 mt-4 mb-4"><h2 className="font-bold">User List</h2></div>
            <div className="text-right mt-4 mb-4 mr-4">
                <button className="bg-blue-500 text-white px-2 py-1 rounded-base mr-2" onClick={() => window.location.href = '/add-user'}>Add User</button>
            </div>
        </div>
        <div className="ml-4">
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
                            <button className="bg-blue-500 text-white px-2 py-1 rounded-base mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded-base">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};
