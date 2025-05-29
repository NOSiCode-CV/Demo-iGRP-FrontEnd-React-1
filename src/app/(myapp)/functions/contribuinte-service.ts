// lib/api.js

export async function fetchContribuintes(search = '') {
 const res = await fetch('/api/contribuintes');

  if (!res.ok) throw new Error('Erro ao buscar dados');

  const raw = await res.json();

  const filtered = raw.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.numero.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    list: filtered,
    options: filtered.map((c) => ({
      value: c.id,
      label: `${c.entidade} - ${c.codigo}`,
    })),
    total: filtered.length,
    message:
      filtered.length > 0 ? 'Dados carregados com sucesso' : 'Nenhum contribuinte encontrado',
  };
}
