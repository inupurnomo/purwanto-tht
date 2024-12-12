"use client";
import React, { useEffect, useState } from "react";
import { PersonTypes } from "@/common/types/Person";
import Link from "next/link";
import axios from "axios";
import Loading from "@/components/Loading";

interface ParamsProps {
  params: {
    id: string;
  };
}

const ViewPage = ({ params }: ParamsProps) => {
  const { id } = params;

  const [loading, setLoading] = useState<boolean>(true);

  const [person, setPerson] = useState<PersonTypes | null>(null);
  const [fetchFail, setFetchFail] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/person/${id}`);
      if (response.data.success) {
        setPerson(response?.data?.data);
      }
      setFetchFail(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchFail(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (fetchFail) {
    return (
      <div>
        <div>Person not found.</div>
        Back to{" "}
        <Link href={"/"} className="text-blue-700 font-semibold">
          Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex min-h-screen flex-col items-start p-8">
      <h1 className="text-3xl font-bold">View Person</h1>
      <form className="w-full bg-white p-6 rounded-lg shadow-md">
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
              value={person?.firstName ?? ''}
              readOnly
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
              value={person?.lastName ?? ''}
              readOnly
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
              value={person?.placeOfBirth ?? ''}
              readOnly
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
              value={person?.dateOfBirth ?? ''}
              readOnly
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
              value={person?.gender ?? ''}
              readOnly
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
              value={person?.religion ?? ''}
              readOnly
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
              value={person?.bloodType ?? ''}
              readOnly
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
              value={person?.maritalStatus ?? ''}
              readOnly
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
              value={person?.address ?? ''}
              readOnly
            />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                RT
              </label>
              <input
                type="number"
                name="rt"
                id="rt"
                className="border border-gray-300 p-2 w-full rounded-md"
                maxLength={3}
                value={person?.rt ?? ''}
                readOnly
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                RW
              </label>
              <input
                type="number"
                name="rw"
                id="rw"
                className="border border-gray-300 p-2 w-full rounded-md"
                maxLength={3}
                value={person?.rw ?? ''}
                readOnly
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
              value={person?.village ?? ''}
              readOnly
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
              value={person?.district ?? ''}
              readOnly
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
              value={person?.city ?? ''}
              readOnly
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
              value={person?.province ?? ''}
              readOnly
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
              value={person?.nationality ?? ''}
              readOnly
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
              value={person?.postalCode ?? ''}
              readOnly
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
              pattern="\d*"
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                (e.target as HTMLInputElement).value = (
                  e.target as HTMLInputElement
                ).value.replace(/[^0-9]/g, "");
              }}
              value={person?.phoneNumber ?? ""}
              readOnly
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
              value={person?.email ?? ''} 
              readOnly
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
              value={person?.idNumber ?? ''} 
              readOnly
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
              value={person?.occupation ?? ''} 
              readOnly
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
              value={person?.hobby ?? ''} 
              readOnly
            />
          </div>
        </div>

        <div className="mt-4">
          <Link href={"/"}>
            <button className="bg-slate-50 text-black p-2 rounded-md w-full hover:bg-slate-100 border mt-4">
              Home
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
};
export default ViewPage;
