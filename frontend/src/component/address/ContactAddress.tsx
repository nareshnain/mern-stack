import React, { useState } from 'react';

export const ContactAddress = () => {
  const [addresses, setAddresses] = useState<any>([{
    address: ""
  }]);

  const addAddressField = () => {
    setAddresses([...addresses, { address: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Addresses:", addresses);
  };


  return (<div>
        <form action="" method="post" className="mt-4" onSubmit={handleSubmit}>
            <div>Contact Address</div>
            {addresses?.map((addr: any, index: number) => {
                console.log("Rendering address field:", index, addr);
                return (
                <div key={index} className="mt-4">
                <h1>Address {index + 1}</h1>
                <input type="text" name={`address${index}`} onChange={(e) => {
                  const newAddresses = [...addresses];
                  newAddresses[index].address = e.target.value;
                  setAddresses(newAddresses);
                }} placeholder="Enter your contact address" className="border border-gray-300 rounded-base p-2 w-full mt-2"/>
                {addresses?.length > 1 && <button className="mt-2 ml-2 bg-red-500 text-white px-2 py-1 rounded-base" onClick={() => {
                  const newAddresses = [...addresses];
                  newAddresses.splice(index, 1);
                  setAddresses(newAddresses);
                }}>Remove Address</button>}
            </div>);
            }
            )}
            <div>
                <button className="mt-2 ml-2" onClick={addAddressField}>Add More Address</button>
            </div>
            <div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-base mt-4">Save Address</button>
            </div>
    </form>
    </div>
  )
}
