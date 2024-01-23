import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  id: string;
}

//GET POR ID
export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!note) {
      return NextResponse.json(
        { message: `Note ${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Error) {
      //esto se usa para que no de error TS
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

//DELETE
export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = params;
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });
    // Verifico si existe la nota primero
    if (!note) {
      return NextResponse.json(
        { message: `Note ${id} not found` },
        { status: 404 }
      );
    }

    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: `Note ${id} deleted` });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

//PUT
export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = params;
  const { title, content } = await request.json();
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!note) {
      return NextResponse.json({ message: `Note ${id} not found` });
    }
    const newNote = await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newNote);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
