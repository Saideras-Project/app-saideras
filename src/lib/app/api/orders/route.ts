import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getAuth } from "../api/authUtils";
export async function POST(req: NextRequest) {
  const auth = await getAuth(req);
  if (auth.error) return auth.error;
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!["GARCOM", "MANAGER"].includes(auth.user.role)) {
    return NextResponse.json({ error: "Forbidden: Apenas GARCOM ou MANAGER" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { table } = body;

    if (!table) {
      return NextResponse.json(
        { error: "Table é obrigatório" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        table,
        waiterId: auth.user.id,
        status: "OPEN",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
