import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { URL_DEV } from "../constant/Constant";

const Memberlist = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    await axios
      .get(URL_DEV + "GetAllMember")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteMember = async (params) => {
    await axios
      .delete(URL_DEV + "DeleteMember?request=" + params)
      .then(() => {
        toast.success("Member Registered", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        fetchData();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="py-1 bg-blueGray-50">
      <ToastContainer />
      <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-10">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Action
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ID
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Place & Date of Birth
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Phone
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Address
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Province
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    City
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Gender
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Job
                  </th>
                  <th className="px-6  align-middle border border-solid border-gray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        <button
                          onClick={() => {
                            navigate("/edit", { state: { id: item.id } });
                          }}
                          className="mr-2 cursor-pointer bg-green-400 text-white px-2 py-1 rounded-lg shadow-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteMember(item.id);
                          }}
                          className="cursor-pointer bg-red-400 text-white px-2 py-1 rounded-lg shadow-md"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.id}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.place_of_birth}, {item.date_of_birth}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.phone_number}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.address}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.province}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.city}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.gender}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.job}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memberlist;
