"use client";
import { PersonTypes } from "@/common/types/Person";

import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { DebounceInput } from "react-debounce-input";

import { TableColumn, SortOrder } from "react-data-table-component";
import Loading from "@/components/Loading";

export default function Home() {
  // const person = await fetchPersons(); // Fetching the posts from the database.
  const dateOptions: Intl.DateTimeFormatOptions = {
    // Options for formatting dates.
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async (
    pages: number,
    perPage: number,
    sortColumn: string,
    sortDirection: string,
    globalFilter: string
  ) => {
    const response = await axios.get(`/api/persons`, {
      params: {
        page: pages,
        pageSize: perPage,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        globalFilter: globalFilter,
      },
    });

    setData(response?.data?.data);
    setTotalRows(response?.data?.meta?.totalRecords);

    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`/api/person/${id}`);
      if (response.status === 200) {
        alert("Person deleted successfully");
        window.location.reload();
      } else {
        alert("Failed to delete person");
      }
    } catch (error) {
      console.error("Error deleting person:", error);
      alert("An error occurred while deleting the person");
    }
  };

  const columns: TableColumn<PersonTypes>[] = useMemo(
    () => [
      {
        id: "id",
        name: "ID",
        selector: (row: PersonTypes) => row.id ?? "",
        sortable: true,
      },
      {
        id: "firstName",
        name: "First Name",
        selector: (row: PersonTypes) => row.firstName ?? "",
        sortable: true,
      },
      {
        id: "lastName",
        name: "Last Name",
        selector: (row: PersonTypes) => row.lastName ?? "",
        sortable: true,
      },
      {
        id: "email",
        name: "Email",
        // selector: (row: PersonTypes) => row.email ?? '',
        cell: (row: PersonTypes) => {
          return row.email ?? "";
        },
        sortable: true,
      },
      {
        id: "createdAt",
        name: "Created At",
        sortable: false,
        cell: (row: PersonTypes) => {
          return row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", dateOptions)
            : "";
        },
      },
      {
        id: "status",
        name: "Status",
        sortable: false,
        cell: (row: PersonTypes) => {
          return row.status ? "Lengkap" : "Belum Lengkap";
        },
      },
      {
        id: "action",
        name: "Action",
        sortable: false,
        cell: (row: PersonTypes) => {
          return (
            <div className="flex flex-col">
              <Link
                href={`/${row.id}/view`}
                className="hover:text-blue-500 duration-300"
              >
                View
              </Link>
              <Link
                href={`/${row.id}/edit`}
                className="hover:text-yellow-500 duration-300"
              >
                Edit
              </Link>
              <div
                className="cursor-pointer text-red-500 hover:text-red-900 duration-300"
                onClick={() => handleDelete(Number(row.id))}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setPage(page);
  };

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
  };

  const handleSortChange = (
    column: TableColumn<PersonTypes>,
    sortDirection: SortOrder
  ) => {
    setSortColumn(column.id as string);
    setSortDirection(sortDirection);
  };

  useEffect(() => {
    fetchData(page, perPage, sortColumn, sortDirection, globalFilter);
  }, [page, perPage, sortColumn, sortDirection, globalFilter]);

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="flex min-h-screen flex-col items-start p-8">
      <div className="mb-4 border">
        <Link href="/add" className="bg-blue-300 px-4 py-2 rounded">
          Add Person
        </Link>
      </div>
      <DebounceInput
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4"
        placeholder="Search..."
        minLength={1}
        debounceTimeout={500}
        onChange={(event) => handleGlobalFilterChange(event.target.value)}
      />

      <div className="rounded-lg border w-full shadow-md overflow-x-auto">
        <DataTable
          title="Data"
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          sortServer
          onSort={handleSortChange}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
    </main>
  );
}
