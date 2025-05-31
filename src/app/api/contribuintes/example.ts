import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/contribuintes';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar contribuintes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao criar contribuinte' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json(
        { message: 'ID do contribuinte é obrigatório para atualização' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar contribuinte' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'ID do contribuinte é obrigatório para exclusão' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Erro ao excluir contribuinte' },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: 'Contribuinte excluído com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao excluir contribuinte' },
      { status: 500 }
    );
  }
}
