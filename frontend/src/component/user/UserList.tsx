export const UserList = () => {
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
                    <tr>
                        <td className="px-4 py-2 border">John</td>
                        <td className="px-4 py-2 border">Doe</td>
                        <td className="px-4 py-2 border">john@example.com</td>
                        <td className="px-4 py-2 border">Admin</td>
                        <td className="px-4 py-2 border">123-456-7890</td>
                        <td className="px-4 py-2 border">123 Main St, City, Country</td>
                        <td className="px-4 py-2 border">2023-10-01</td>
                        <td className="px-4 py-2 border">2023-10-05</td>
                        <td className="px-4 py-2 border">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded-base mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded-base">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
};
