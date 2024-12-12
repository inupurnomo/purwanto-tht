import type { Person } from "@prisma/client"; // Importing the Post type from the Prisma client library.
import { db } from "@/db";
import { notFound } from "next/navigation"; // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchPersons(): Promise<Person[]> {
  // Function to fetch all posts from the database.
  return await db.person.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchPersonById(id: number): Promise<Person | null> {
  // Function to fetch a single post by its ID.
  const person = await db.person.findFirst({
    where: {
      id,
    },
  });

  if (!person) {
    notFound(); // If the post is not found, a 404 error is thrown.
  }

  return person;
}
