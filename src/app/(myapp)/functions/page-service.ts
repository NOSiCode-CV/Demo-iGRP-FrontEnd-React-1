type LoadPageArgs = {
  setSelectcombobox1Options?: (options: any[]) => void;
  setContentFormform1?: (updater: (prev: any) => any) => void;
  setContentTabletable1?: (data: any[]) => void;
  setDropdownFiltertableDropdownFilter1Options?: (options: any[]) => void;
  setFacetedFiltertableFacetedFilter1Options?: (options: any[]) => void;
  setSelectFiltertableSelectFilter1Options?: (options: any[]) => void;
  setSelectcombobox2Options?: (options: any[]) => void;
  setStatstatsCard1Value?: (value: string | number) => void;
  setStatstatsCard4Value?: (value: string | number) => void;
  setStatstatsCard3Value?: (value: string | number) => void;
  setStatstatsCard2Value?: (value: string | number) => void;
  inputSearchinputSearch1Value?: string;
};

const loadPage = async (args: LoadPageArgs) => {
  try {
    // Simula chamada API para o combobox
    const comboboxData = await new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { value: '1', label: 'Opção 1' },
          { value: '2', label: 'Opção 2' },
          { value: '3', label: 'Opção 3' },
        ]);
      }, 1000);
    });

    // Atualiza os estados
    args.setSelectcombobox2Options?.(comboboxData);
    args.setContentFormform1?.((prev) => ({
      ...prev,
      inputText1: 'Conteúdo do formulário',
      inputDatePicker1: new Date(),
    }));
  } catch (error) {
    console.error('Erro no loadPage:', error);
    throw error;
  }
};

const loadPageList = async (args: LoadPageArgs) => {
  try {
    const comboboxData = await new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { value: '1', label: 'Opção 1' },
          { value: '2', label: 'Opção 2' },
          { value: '3', label: 'Opção 3' },
        ]);
      }, 1000);
    });

    const fakePages: any[] = Array.from({ length: 15 }, (_, index) => ({
      tableTextCell2: `C${Math.floor(10000 + Math.random() * 90000)}`,
      tableTextCell1: [
        'Ministério da Saúde',
        'Banco da África Ocidental',
        'Instituição Privada',
        'Telecomunicações da Guiné-Bissau',
        'Universidade Amílcar Cabral',
      ][Math.floor(Math.random() * 5)],
      tableDateCell1: new Date(
        2020 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      )
        .toISOString()
        .split('T')[0],
      tableBadgeCell3: ['Ativo', 'Suspenso', 'Cessado'][Math.floor(Math.random() * 3)],
      tableBadgeCell1: ['Regime Geral', 'Conta Própria'][Math.floor(Math.random() * 2)],
      tableBadgeCell2: ['Individual', 'Empresa', 'Instituição'][Math.floor(Math.random() * 3)],
      tableAmountCell1: Math.floor(Math.random() * 1000),
    }));

    const filteredData = fakePages.filter((data) => {
      return data.tableTextCell1
        .toLowerCase()
        .includes(args?.inputSearchinputSearch1Value?.toLowerCase() || '');
    });

    args.setContentTabletable1?.(filteredData);

    args.setDropdownFiltertableDropdownFilter1Options?.(comboboxData);
    args.setFacetedFiltertableFacetedFilter1Options?.(comboboxData);
    args.setSelectFiltertableSelectFilter1Options?.(comboboxData);
    args.setSelectcombobox2Options?.(comboboxData);

    const totalGeral = filteredData.length;
    const totalAtivos = filteredData.filter((c) => c.tableBadgeCell3 === 'Ativo').length;
    const totalRegimeGeral = filteredData.filter(
      (c) => c.tableBadgeCell1 === 'Regime Geral',
    ).length;
    const totalContaPropria = filteredData.filter(
      (c) => c.tableBadgeCell1 === 'Conta Própria',
    ).length;

    args.setStatstatsCard1Value?.(totalGeral);
    args.setStatstatsCard4Value?.(totalAtivos);
    args.setStatstatsCard3Value?.(totalRegimeGeral);
    args.setStatstatsCard2Value?.(totalContaPropria);
  } catch (error) {
    console.error('Erro no loadPage:', error);
    throw error;
  }
};

const onSubmitForm = async (values: any) => {
  console.log('Formulário enviado:', values);
};

function getStatusBadge(contribuinte?: any): {
  iconName?: string;
  bgClass?: string;
  textClass?: string;
  label?: string;
  className?: string;
} {
  if (!contribuinte) return {};
  const bgClass =
    contribuinte.tableBadgeCell3 === 'Ativo'
      ? 'bg-green-100 text-green-800 hover:bg-green-100'
      : contribuinte.tableBadgeCell3 === 'Suspenso'
        ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
        : 'bg-red-100 text-red-800 hover:bg-red-100';

  const label = contribuinte.tableBadgeCell3;
  return { label, bgClass };
}

export { loadPage, onSubmitForm, loadPageList, getStatusBadge };
