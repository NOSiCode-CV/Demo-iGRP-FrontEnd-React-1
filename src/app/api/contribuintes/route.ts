// src/app/api/contribuintes/route.js
import { NextRequest, NextResponse } from 'next/server';

let contribuintes = Array.from({ length: 20 }, (_, i) => generateFakeContribuinte(i + 1));

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

// GET: retorna todos ou um por ID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const contribuinte = contribuintes.find((c) => c.id === parseInt(id));
    if (!contribuinte) {
      return NextResponse.json({ error: 'Contribuinte não encontrado' }, { status: 404 });
    }
    return NextResponse.json(contribuinte);
  }

  return NextResponse.json(contribuintes);
}

// POST: cria novo contribuinte
export async function POST(req: NextRequest) {
  const data = await req.json();
  const newId = contribuintes.length ? Math.max(...contribuintes.map((c) => c.id)) + 1 : 1;

  const newContribuinte = {
    id: newId,
    ...data,
    dataInicioAtividade: data.dataInicioAtividade || new Date().toISOString().split('T')[0],
    quantidade_operacoes: data.quantidade_operacoes || 0,
  };

  contribuintes.push(newContribuinte);
  return NextResponse.json(newContribuinte, { status: 201 });
}

// PUT: atualiza um contribuinte por ID
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id'));
  const data = await req.json();

  const index = contribuintes.findIndex((c) => c.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Contribuinte não encontrado' }, { status: 404 });
  }

  contribuintes[index] = {
    ...contribuintes[index],
    ...data,
  };

  return NextResponse.json(contribuintes[index]);
}

// DELETE: remove um contribuinte por ID
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id'));

  const index = contribuintes.findIndex((c) => c.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Contribuinte não encontrado' }, { status: 404 });
  }

  contribuintes.splice(index, 1);
  return NextResponse.json({ message: 'Contribuinte removido com sucesso' });
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
