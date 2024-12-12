import { NextRequest, NextResponse } from "next/server";
import prisma from "@/common/lib/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Missing 'id' parameter" });
  }

  try {
    const person = await prisma.person.findUnique({
      where: { id: Number(id) },
    });

    if (!person) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: person });
  } catch (error) {
    console.error("Error fetching person:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Missing 'id' parameter" });
  }

  await prisma.person.findUnique({
    where: {
      id: Number(id),
    },
  });

  const {
    firstName,
    lastName,
    email,
    placeOfBirth,
    dateOfBirth,
    gender,
    religion,
    bloodType,
    maritalStatus,
    address,
    rt,
    rw,
    village,
    district,
    city,
    province,
    nationality,
    postalCode,
    phoneNumber,
    idNumber,
    occupation,
    hobby,
  } = await request.json();
  const updatedPerson = await prisma.person.update({
    where: {
      id: Number(id),
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      placeOfBirth: placeOfBirth,
      dateOfBirth: dateOfBirth,
      gender: gender,
      religion: religion,
      bloodType: bloodType,
      maritalStatus: maritalStatus,
      address: address,
      rt: rt,
      rw: rw,
      village: village,
      district: district,
      city: city,
      province: province,
      nationality: nationality,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      idNumber: idNumber,
      occupation: occupation,
      hobby: hobby,
    },
  });

  return NextResponse.json({
    success: true,
    data: updatedPerson,
    message: "Update success",
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({
      success: true,
      error: "Missing 'id' parameter",
    });
  }

  await prisma.person.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ success: true, message: "Delete success" });
}
