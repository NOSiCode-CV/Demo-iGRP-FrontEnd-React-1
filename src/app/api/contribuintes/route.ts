// src/app/api/contribuintes/route.js
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  function generateFakeContribuinte(id: number) {
    return {
      id,
      numero: `C${Math.floor(10000 + Math.random() * 90000)}`,
      nome: [
        'Ministério da Saúde',
        'Banco da África Ocidental',
        'Instituição Privada',
        'Telecomunicações da Guiné-Bissau',
        'Universidade Amílcar Cabral',
      ][Math.floor(Math.random() * 5)],
      dataInicioAtividade: new Date(
        2020 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      )
        .toISOString()
        .split('T')[0],
      estado: ['Ativo', 'Suspenso', 'Cessado'][Math.floor(Math.random() * 3)],
      regime: ['Regime Geral', 'Conta Própria'][Math.floor(Math.random() * 2)],
      estadoJuridico: ['Individual', 'Empresa', 'Instituição'][Math.floor(Math.random() * 3)],
      quantidade_operacoes: Math.floor(Math.random() * 1000),
    };
  }

  const fakeContribuintes = Array.from({ length: 20 }, (_, i) =>
    generateFakeContribuinte(i + 1)
  );

  return NextResponse.json(fakeContribuintes)
}


/*
export async function GET(req: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_USER_MANAGER_API  ?? ""
  
  const session = await serverSession();
  if (!session?.accessToken) {
    const logoutUrl = new URL("/logout", req.nextUrl.origin)
    return NextResponse.redirect(logoutUrl)
  }
  try {
    const response = await fetchFromApi(
      API_URL,
      "/identity/getApps",
      {
        token: session.accessToken,
      }
    )

    const data = await response.json()
    return NextResponse.json(data)

  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch applications" },
      { status: 500 }
    )
  }
}*/