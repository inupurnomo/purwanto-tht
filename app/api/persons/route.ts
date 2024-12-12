import { NextResponse } from "next/server";
import prisma from "@/common/lib/prisma";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // Parse query parameters
  const pages = parseInt(searchParams.get("pages") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "10", 10);
  const sortColumn = searchParams.get("sortColumn") || "updatedAt";
  const sortDirection = searchParams.get("sortDirection") || "desc";
  const globalFilter = searchParams.get("globalFilter") || "";

  try {
    // Apply filter, sorting, and pagination
    const totalRecords = await prisma.person.count({
      where: {
        OR: [
          { firstName: { contains: globalFilter, mode: "insensitive" } },
          { lastName: { contains: globalFilter, mode: "insensitive" } },
          { email: { contains: globalFilter, mode: "insensitive" } },
        ],
      },
    });

    const person = await prisma.person.findMany({
      where: {
        OR: [
          { firstName: { contains: globalFilter, mode: "insensitive" } },
          { lastName: { contains: globalFilter, mode: "insensitive" } },
          { email: { contains: globalFilter, mode: "insensitive" } },
        ],
      },
      orderBy: {
        [sortColumn]: sortDirection,
      },
      skip: (pages - 1) * perPage,
      take: perPage,
    });

    const personWithStatus = person.map((p) => ({
      ...p,
      status: Object.values(p).every((value) => value),
    }));

    // Return the paginated response
    return NextResponse.json({
      success: true,
      data: personWithStatus,
      meta: {
        currentPage: pages,
        perPage: perPage,
        totalRecords: totalRecords,
        totalPages: Math.ceil(totalRecords / perPage),
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
