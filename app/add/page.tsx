"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PersonTypes } from "@/common/types/Person";
import Link from "next/link";

const CreatePage = () => {
  const route = useRouter();
  const [person, setPerson] = useState<PersonTypes>({
    firstName: "",
    lastName: "",
    email: "",
    placeOfBirth: "",
    dateOfBirth: "",
    gender: "",
    religion: "",
    bloodType: "",
    maritalStatus: "",
    address: "",
    rt: "",
    rw: "",
    village: "",
    district: "",
    city: "",
    province: "",
    nationality: "",
    postalCode: "",
    phoneNumber: "",
    idNumber: "",
    occupation: "",
    hobby: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerson((prevPerson) => ({
      ...prevPerson, // Menyalin state sebelumnya
      [name]: value, // Memperbarui properti yang relevan
    }));
  };

  const saveData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (person.firstName != "" && person.lastName != "") {
      const data = {
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        placeOfBirth: person.placeOfBirth,
        dateOfBirth: person.dateOfBirth,
        gender: person.gender,
        religion: person.religion,
        bloodType: person.bloodType,
        maritalStatus: person.maritalStatus,
        address: person.address,
        rt: person.rt,
        rw: person.rw,
        village: person.village,
        district: person.district,
        city: person.city,
        province: person.province,
        nationality: person.nationality,
        postalCode: person.postalCode,
        phoneNumber: person.phoneNumber,
        idNumber: person.idNumber,
        occupation: person.occupation,
        hobby: person.hobby,
      };
      fetch(`/api/person`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
            route.push("/");
          } else {
            alert(data.message);
          }
        });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-8">
      <h1 className="text-3xl font-bold">Add Person</h1>
      <form
        onSubmit={saveData}
        className="w-full bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Place of Birth
            </label>
            <input
              type="text"
              name="placeOfBirth"
              id="placeOfBirth"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              id="gender"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Religion
            </label>
            <input
              type="text"
              name="religion"
              id="religion"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Type
            </label>
            <input
              type="text"
              name="bloodType"
              id="bloodType"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <input
              type="text"
              name="maritalStatus"
              id="maritalStatus"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                RT
              </label>
              <input
                type="number"
                name="rt"
                id="rt"
                className="border border-gray-300 p-2 w-full rounded-md"
                maxLength={3}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                RW
              </label>
              <input
                type="number"
                name="rw"
                id="rw"
                className="border border-gray-300 p-2 w-full rounded-md"
                maxLength={3}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Village
            </label>
            <input
              type="text"
              name="village"
              id="village"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              name="district"
              id="district"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Province
            </label>
            <input
              type="text"
              name="province"
              id="province"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              id="nationality"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, "");
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID Number
            </label>
            <input
              type="text"
              name="idNumber"
              id="idNumber"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hobby
            </label>
            <input
              type="text"
              name="hobby"
              id="hobby"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="Submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 duration-300 cursor-pointer"
          />
          <Link href={"/"}>
            <button className="bg-slate-50 text-black p-2 rounded-md w-full hover:bg-slate-100 border mt-4">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
};
export default CreatePage;
