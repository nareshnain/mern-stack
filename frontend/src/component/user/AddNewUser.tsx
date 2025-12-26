import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

export const AddNewUser = () => {
  const navigate = useNavigate();
    const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  
  const onSubmit = (data: any) => console.log(data);
  
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <input
                    {...register("firstName", { required: true })}
                    aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
                <input
                    {...register("lastName", { required: true })}
                    aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
                <input
                    {...register("email", { required: "Email Address is required" })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="role">Select Role</label>
                <select {...register("role", { required: true })} className="w-full px-3 py-2 border rounded-base">
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </select>
                {errors.role && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="phone">Phone</label>
                <input className="w-full px-3 py-2 border rounded-base" {...register("phone", { required: true })} />
                {errors.phone && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
                <label className="block text-body mb-2" htmlFor="address">Address</label>
                <input className="w-full px-3 py-2 border rounded-base" type="text" id="address" name="address" />
            </div>
            
            <input className="bg-green-500 text-white px-4 py-2 rounded-base" type="submit" value={"Submit"} />
        </form>
        </div>
    </div>
  );
};
