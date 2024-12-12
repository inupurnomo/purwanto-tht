import { NextRequest, NextResponse } from "next/server";
import prisma from "@/common/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
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
  } = body;

  const existingPerson = await prisma.person.findFirst({
    where: { email },
  });

  if (existingPerson) {
    return NextResponse.json(
      {
        success: 0,
        message: "Email is already registered.",
      },
      { status: 400 }
    );
  }

  const newPerson = await prisma.person.create({
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
    success: 1,
    message: "create success",
    data: newPerson,
  });
}
