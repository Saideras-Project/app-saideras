import { NextResponse, NextRequest } from 'next/server';
import { prisma } from "./../../../../lib/prisma";
import { Prisma } from '@prisma/client';

interface Params {
  id: string;
}

export async function getOneSupplier(request: NextRequest, context: { params: Params }) {
  const { id } = context.params;

  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json(supplier);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
