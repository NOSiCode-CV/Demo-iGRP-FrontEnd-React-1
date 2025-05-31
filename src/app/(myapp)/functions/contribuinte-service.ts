// lib/api.js

// GET all (com filtro opcional)
export async function fetchContribuintes(search = '') {
  const res = await fetch('/api/contribuintes');
  if (!res.ok) throw new Error('Erro ao buscar dados');

  const raw = await res.json();

  const filtered = raw.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.numero.toLowerCase().includes(search.toLowerCase())
  );

  return {
    list: filtered,
    options: filtered.map((c) => ({
      value: c.id,
      label: `${c.nome} - ${c.numero}`, // Corrigido para usar campos existentes
    })),
    total: filtered.length,
    message:
      filtered.length > 0
        ? 'Dados carregados com sucesso'
        : 'Nenhum contribuinte encontrado',
  };
}

// GET by ID
export async function fetchContribuinteById(id: number) {
  const res = await fetch(`/api/contribuintes?id=${id}`);
  if (!res.ok) throw new Error('Erro ao buscar contribuinte');
  return await res.json();
}

// POST: criar novo contribuinte
export async function createContribuinte(data: any) {
  const res = await fetch('/api/contribuintes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Erro ao criar contribuinte');
  return await res.json();
}

// PUT: atualizar contribuinte
export async function updateContribuinte(id: number, data: any) {
  const res = await fetch(`/api/contribuintes?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Erro ao atualizar contribuinte');
  return await res.json();
}

// DELETE: remover contribuinte
export async function deleteContribuinte(id: number) {
  const res = await fetch(`/api/contribuintes?id=${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Erro ao remover contribuinte');
  return await res.json();
}
