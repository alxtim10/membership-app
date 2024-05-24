import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { URL_DEV } from "../constant/Constant";

const EditMember = () => {
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();

  const baseRequest = {
    id: 0,
    name: "",
    place_of_birth: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    address: "",
    province: "",
    city: "",
    gender: "",
    job: "",
    status: "",
  };
  const [request, setRequest] = useState(baseRequest);

  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);

  const fetchMember = async () => {
    await axios
      .get(URL_DEV + "GetMemberDetailById?member_id=" + id)
      .then((response) => {
        setRequest(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const fetchProvince = async () => {
    await axios
      .get(URL_DEV + "GetAllProvince")
      .then((response) => {
        setProvinceData([{ id: 0, name: "Select" }, ...response.data]);
        let item = response.data.find((val) => val.name == request.province);
        setSelectedProvince(item.id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchCity = async () => {
    await axios
      .get(URL_DEV + "GetAllCity?province_id=" + selectedProvince)
      .then((response) => {
        setCityData([
          { id: 0, province_id: 0, name: "Select" },
          ...response.data,
        ]);
        let item = response.data.find((val) => val.name == request.city);
        setSelectedCity(item.id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const editMember = async (params) => {
    await axios
      .put(URL_DEV + "EditMember", params)
      .then(() => {
        toast.success("Member Edited", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (id != null) {
      fetchMember();
    }
  }, [id]);

  useEffect(() => {
    if (request.province != "") {
      fetchProvince();
    }
  }, [request.province]);

  useEffect(() => {
    if (selectedProvince != 0) {
      fetchCity();
    }
  }, [selectedProvince]);

  const handleSubmit = () => {
    if (
      request.name != "" &&
      request.place_of_birth != "" &&
      request.date_of_birth != "" &&
      request.phone_number != "" &&
      request.email != "" &&
      request.province != "" &&
      (request.city != "" || selectedCity != 0) &&
      request.address != "" &&
      request.job != "" &&
      request.status != "" &&
      request.gender != ""
    ) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const validateEmail = regex.test(request.email);

      if (validateEmail) {
        editMember(request);
      } else {
        toast.error("Invalid Email", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Please Fill All Fields", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <section className="flex items-center justify-center mt-2">
      <ToastContainer />
      <div className="lg:w-1/2">
        <h1 className="text-lg text-center font-outfit font-bold">
          Member Registration
        </h1>
        <div className="relative h-11 w-full min-w-[200px] mt-5">
          <input
            placeholder=""
            className="peer h-full w-full rounded-md border bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-200  focus:border-2 focus:border-blue-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => {
              setRequest((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            value={request.name}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Name
          </label>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="relative h-11 w-full min-w-[200px] mt-4">
            <input
              placeholder=""
              className="peer h-full w-full rounded-md border bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-200  focus:border-2 focus:border-blue-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e) => {
                setRequest((prev) => ({
                  ...prev,
                  place_of_birth: e.target.value,
                }));
              }}
              value={request.place_of_birth}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Place of Birth
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px] mt-4">
            <input
              placeholder=""
              type="date"
              className="peer h-full w-full rounded-md border bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-200 focus:border-2 focus:border-blue-200 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e) => {
                setRequest((prev) => ({
                  ...prev,
                  date_of_birth: e.target.value,
                }));
              }}
              defaultValue={request.date_of_birth}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Date of Birth
            </label>
          </div>
        </div>
        <div className="relative h-11 w-full min-w-[200px] mt-5">
          <input
            placeholder=""
            className="peer h-full w-full rounded-md border bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-200  focus:border-2 focus:border-blue-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            type="number"
            onChange={(e) => {
              setRequest((prev) => ({
                ...prev,
                phone_number: e.target.value,
              }));
            }}
            value={request.phone_number}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Phone
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px] mt-5">
          <input
            placeholder=""
            type="email"
            className="peer h-full w-full rounded-md border bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-200  focus:border-2 focus:border-blue-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => {
              setRequest((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            value={request.email}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Email
          </label>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex flex-col items-start justify-center w-full mt-4 gap-2">
            <label className="text-md font-outfit font-bold ml-1">
              Province
            </label>
            <select
              value={selectedProvince}
              className="text-sm font-semibold outline-none rounded-md w-full p-3 bg-white border border-blue-200"
              onChange={(e) => {
                let item = provinceData.find((val) => val.id == e.target.value);
                setSelectedProvince(item.id);
                setRequest((prev) => ({
                  ...prev,
                  province: item.name,
                }));
              }}
            >
              {provinceData.map((item, i) => {
                return (
                  <option
                    key={i}
                    value={item.id}
                    className="py-3 text-sm font-semibold"
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col items-start justify-center w-full mt-4 gap-2">
            <label className="text-md font-outfit font-bold ml-1">City</label>
            <select
              value={selectedCity}
              className="text-sm font-semibold outline-none rounded-md w-full p-3 bg-white border border-blue-200"
              onChange={(e) => {
                let item = cityData.find((val) => val.id == e.target.value);
                setRequest((prev) => ({
                  ...prev,
                  city: item.name,
                }));
                setSelectedCity(item.id);
              }}
            >
              {cityData.map((item, i) => {
                return (
                  <option
                    key={i}
                    value={item.id}
                    onClick={() => {
                      setRequest((prev) => ({
                        ...prev,
                        city: item.name,
                      }));
                    }}
                    className="text-sm font-semibold"
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full mt-4 gap-2">
          <label className="text-md font-outfit font-bold ml-1">Address</label>
          <textarea
            rows="4"
            cols="30"
            className="p-3 outline-none focus:border-blue-700 transition-all border border-blue-200 w-full"
            onChange={(e) => {
              setRequest((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
            value={request.address}
          ></textarea>
        </div>

        <div className="flex flex-col items-start justify-center w-full mt-4 gap-2">
          <label className="text-md font-outfit font-bold ml-1">Job</label>
          <select
            value={request.job}
            className="text-sm font-semibold outline-none rounded-md w-full p-3 bg-white border border-blue-200"
            onChange={(e) => {
              setRequest((prev) => ({
                ...prev,
                job: e.target.value,
              }));
            }}
          >
            <option value={""} className="py-3 text-sm font-semibold">
              Select
            </option>
            <option value={"Guru"} className="py-3 text-sm font-semibold">
              Guru
            </option>
            <option value={"PNS"} className="py-3 text-sm font-semibold">
              PNS
            </option>
            <option value={"Arsitek"} className="py-3 text-sm font-semibold">
              Arsitek
            </option>
            <option value={"Dokter"} className="py-3 text-sm font-semibold">
              Dokter
            </option>
          </select>
        </div>
        <div className="flex flex-col items-start justify-center w-full mt-4 gap-2">
          <label className="text-md font-outfit font-bold ml-1">Status</label>
          <select
            value={request.status}
            className="text-sm font-semibold outline-none rounded-md w-full p-3 bg-white border border-blue-200"
            onChange={(e) => {
              setRequest((prev) => ({
                ...prev,
                status: e.target.value,
              }));
            }}
          >
            <option value={""} className="py-3 text-sm font-semibold">
              Select
            </option>
            <option value={"Single"} className="py-3 text-sm font-semibold">
              Single
            </option>
            <option value={"Married"} className="py-3 text-sm font-semibold">
              Married
            </option>
          </select>
        </div>
        <div className="flex flex-col items-start justify-center w-full mt-4 gap-2">
          <label className="text-md font-outfit font-bold ml-1">Gender</label>
          <div className="flex items-center justify-center gap-10">
            <label className="block text-gray-700 font-bold mb-2">
              <input
                type="checkbox"
                checked={request.gender == "Male"}
                onChange={() => {
                  setRequest((prev) => ({
                    ...prev,
                    gender: "Male",
                  }));
                }}
                className="mr-2 leading-tight"
              />
              Man
            </label>
            <label className="block text-gray-700 font-bold mb-2">
              <input
                type="checkbox"
                checked={request.gender == "Female"}
                onChange={() => {
                  setRequest((prev) => ({
                    ...prev,
                    gender: "Female",
                  }));
                }}
                className="mr-2 leading-tight"
              />
              Woman
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <button
            onClick={handleSubmit}
            className="border px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditMember;
