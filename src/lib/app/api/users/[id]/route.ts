// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

async function getAuthManager(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token de autenticação não fornecido.");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (decoded.role !== UserRole.MANAGER) {
      throw new Error("Acesso não autorizado. Apenas Gerentes.");
    }
    return decoded;
  } catch (error) {
    throw new Error("Token inválido ou expirado.");
  }
}
