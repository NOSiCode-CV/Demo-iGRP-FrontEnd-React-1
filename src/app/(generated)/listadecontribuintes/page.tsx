'use client'


import { useState, useEffect, useRef } from 'react';
import { cn } from '@igrp/igrp-framework-react-design-system';
import { IGRPPageHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPButton } from "@igrp/igrp-framework-react-design-system";
import { IGRPStatsCard } from "@igrp/igrp-framework-react-design-system";
import { IGRPInputSearch } from "@igrp/igrp-framework-react-design-system";
import { IGRPSeparator } from "@igrp/igrp-framework-react-design-system";
import { IGRPCombobox } from "@igrp/igrp-framework-react-design-system";
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTable } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableFacetedFilterFn , IGRPDataTableDateRangeFilterFn } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableHeaderSortToggle, IGRPDataTableHeaderSortDropdown, IGRPDataTableHeaderRowsSelect } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableCellCheckbox } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableCellBadge } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableRowAction } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableDropdownMenu } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableDropdownMenuModal } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableDropdownMenuAlert } from "@igrp/igrp-framework-react-design-system";
import {loadPageList} from '@/app/(myapp)/functions/page-service'
import {fetchContribuintes} from '@/app/(myapp)/functions/contribuinte-service'
import { useRouter } from "next/navigation";
import {getStatusBadge} from '@/app/(myapp)/functions/page-service'


export default function PageListadecontribuintesComponent() {

  
  type Table1 = {
    tableCheckboxCell1: string;
    numero: string;
    nome: string;
    regime: string;
    dataInicioAtividade: string;
    estadoJuridico: string;
    estado: string;
}

  const [statstatsCard1Value, setStatstatsCard1Value] = useState<string | number>(0);
  const [statstatsCard4Value, setStatstatsCard4Value] = useState<string | number>(0);
  const [statstatsCard3Value, setStatstatsCard3Value] = useState<string | number>(0);
  const [statstatsCard2Value, setStatstatsCard2Value] = useState<string | number>(0);
  const [inputSearchinputSearch1Value, setInputSearchinputSearch1Value] = useState<string>(undefined);
  const [selectcombobox2Options, setSelectcombobox2Options] = useState<IGRPOptionsProps[]>([]);
  const [selectcombobox3Options, setSelectcombobox3Options] = useState<IGRPOptionsProps[]>([]);
  const [selectcombobox1Options, setSelectcombobox1Options] = useState<IGRPOptionsProps[]>([]);
  const [contentTabletable1, setContentTabletable1] = useState<Table1[]>([]);
  
  
const [showFilter, setShowFilter] = useState<boolean>(false);

const router = useRouter()

// begin fnCode Carrega os dados quando o componente monta
const [loading, setLoading] = useState(false)
useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const {list} = await fetchContribuintes(inputSearchinputSearch1Value); // toda a lógica está aqui
      setContentTabletable1(list)

      /*   setList(data.list);
        setOptions(data.options);
        setTotal(data.total);
        setMessage(data.message); */
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [inputSearchinputSearch1Value]);
//endfetchContribuintes();

function onClicknovoContribuinte (): void {
  router.push("novocontribuinte");
}


  return (
<div className={ cn('page','mx-auto px-4 space-y-6',)}   >
	<div className={ cn('section',' space-x-3 space-y-6',)}   >
	<IGRPPageHeader
  title="Contribuiente"
  description="Gerencie os contribuintes do sistema de segurança social"
  variant="h3"
  className={ cn() }
>
  <div className="flex items-center gap-2">
    <IGRPButton
  variant="secondary"
  size="default"
  showIcon={ true }
  iconName="Plus"
  className={ cn() }
  onClick={ () => onClicknovoContribuinte() }
>
  Novo
</IGRPButton>

    <IGRPButton
  variant="default"
  size="default"
  showIcon={ true }
  iconName="Plus"
  className={ cn() }
  
>
  Adição Rápida
</IGRPButton>

</div>
</IGRPPageHeader>

<div className={ cn('grid','grid-cols-4',' gap-4',)}   >
	<IGRPStatsCard
  variant="info"
  title="Total Geral"
  border={ true }
  borderPosition="top"
  showIcon={ true }
  iconName="Building"
  
  value={ statstatsCard1Value }
  className={ cn() }
>
</IGRPStatsCard>
<IGRPStatsCard
  variant="success"
  title="Total Ativos"
  border={ true }
  borderPosition="top"
  showIcon={ true }
  iconName="CircleCheckBig"
  
  value={ statstatsCard4Value }
  className={ cn() }
>
</IGRPStatsCard>
<IGRPStatsCard
  variant="indigo"
  title="Total Regime Geral"
  border={ true }
  borderPosition="top"
  showIcon={ true }
  iconName="Briefcase"
  
  value={ statstatsCard3Value }
  className={ cn() }
>
</IGRPStatsCard>
<IGRPStatsCard
  variant="warning"
  title="Total Conta Própria"
  border={ true }
  borderPosition="top"
  showIcon={ true }
  iconName="UsersRound"
  
  value={ statstatsCard2Value }
  className={ cn() }
>
</IGRPStatsCard></div>
<div className={ cn('flex flex-col flex-nowrap items-stretch justify-start gap-3','mt- mr- mb- my- pt-4 pr-4 pb-4 pl-4 px-4 py-4','overflow-visible',' shadow-sm border rounded-sm',)}   >
	<div className={ cn('block',' space-y-3',)}   >
	<div className={ cn('flex','flex flex-row flex-wrap items-stretch justify-start gap-2',)}   >
	<div className={ cn(' flex-1 min-w-[240px]',)}   >
	<IGRPInputSearch
  name="inputSearch1"
placeholder="Pesquisar contribuintes..."
  startIcon="Search"
  submitIcon="ArrowRight"
  className={ cn() }
  
setValueChange={ setInputSearchinputSearch1Value
 }
  value={ inputSearchinputSearch1Value }
/></div>
<div className={ cn('flex','flex flex-row flex-nowrap items-center justify-start gap-2',)}   >
	<IGRPButton
  variant="outline"
  size="default"
  showIcon={ true }
  iconName="SlidersHorizontal"
  className={ cn() }
  onClick={ ()=>setShowFilter(!showFilter)
 }
>
  Filtros
</IGRPButton>

<IGRPButton
  variant="outline"
  size="icon"
  showIcon={ true }
  iconName="Download"
  className={ cn() }
  
>
  Button
</IGRPButton>

<IGRPButton
  variant="outline"
  size="icon"
  iconName="Upload"
  className={ cn() }
  
>
  Button
</IGRPButton>

<IGRPButton
  variant="outline"
  size="icon"
  showIcon={ true }
  iconName="RefreshCcw"
  className={ cn() }
  
>
  Button
</IGRPButton>
</div></div>
{ showFilter && (<IGRPSeparator
  orientation="horizontal"
  className={ cn('my-3',) }
/>)}
{ showFilter && (<div className={ cn('grid','grid-cols-3',' gap-4',)}   >
	<IGRPCombobox
  name="combobox2"
  placeholder="Select an option..."
  label="Estatuto Jurídico"
  selectLabel="No option found"
  className={ cn('',) }
  
  value={ undefined }
options={ selectcombobox2Options }
/>
<IGRPCombobox
  name="combobox3"
  placeholder="Select an option..."
  label="Regime"
  selectLabel="No option found"
  className={ cn('',) }
  
  value={ undefined }
options={ selectcombobox3Options }
/>
<IGRPCombobox
  name="combobox1"
  placeholder="Select an option..."
  label="Setor de Atividade"
  selectLabel="No option found"
  className={ cn('',) }
  
  value={ undefined }
options={ selectcombobox1Options }
/></div>)}
<div className={ cn('flex','flex flex-row flex-nowrap items-stretch justify-end gap-2',)}   >
	<IGRPButton
  variant="outline"
  size="default"
  showIcon={ true }
  iconName="X"
  className={ cn() }
  
>
  Limpar Filtros
</IGRPButton>
</div></div>
<IGRPDataTable<Table1, Table1>
  showPagination={ false }
  className={ cn() }
  columns={
    [
        {
          header: ({ table }) => <IGRPDataTableHeaderRowsSelect table={table} title=" " />
,accessorKey: 'tableCheckboxCell1',
          cell: ({ row }) => {
          return <IGRPDataTableCellCheckbox
  row={ row }
>
</IGRPDataTableCellCheckbox>
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Numero" />)
,accessorKey: 'numero',
          cell: ({ row }) => {
          return row.getValue("numero")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Nome" />)
,accessorKey: 'nome',
          cell: ({ row }) => {
          return row.getValue("nome")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Regime" />)
,accessorKey: 'regime',
          cell: ({ row }) => {
          const rowData = row.original;


return <IGRPDataTableCellBadge
  label={ row.original.regime }
  variant="soft"
className={ "" }
>

</IGRPDataTableCellBadge>
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Data Inicio Actividade'
,accessorKey: 'dataInicioAtividade',
          cell: ({ row }) => {
          return row.getValue("dataInicioAtividade")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Estado Juridico" />)
,accessorKey: 'estadoJuridico',
          cell: ({ row }) => {
          const rowData = row.original;


return <IGRPDataTableCellBadge
  label={ row.original.estadoJuridico }
  variant="soft"
className={ "" }
>

</IGRPDataTableCellBadge>
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Estado" />)
,accessorKey: 'estado',
          cell: ({ row }) => {
          const rowData = row.original;

const { iconName, bgClass, textClass, label, className } = getStatusBadge(rowData);

return <IGRPDataTableCellBadge
  label={ label ?? row.original.estado }
  variant="soft"
className={ `${bgClass} ${textClass} ${className}` }
>

</IGRPDataTableCellBadge>
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Actions'
,accessorKey: 'tableActionListCell1',
          enableHiding: false,cell: ({ row }) => {
          const rowData = row.original;

return (
<IGRPDataTableRowAction>
  <IGRPDataTableDropdownMenu
  items={
    [
      {
        component: IGRPDataTableDropdownMenuModal,
        props: {
          title: "Visualizar",labelTrigger: "Visualizar",icon: "Eye",variant: "default",showIcon: true,showCancel: true,labelCancel: "Cancel",variantCancel: "default",showConfirm: true,labelConfirm: "Confirm",variantConfirm: "default",}
      },
      {
        component: IGRPDataTableDropdownMenuModal,
        props: {
          labelTrigger: "Editar",icon: "TestTubeDiagonal",variant: "default",showIcon: true,showCancel: true,labelCancel: "Cancel",variantCancel: "default",showConfirm: true,labelConfirm: "Confirm",variantConfirm: "default",}
      },
      {
        component: IGRPDataTableDropdownMenuAlert,
        props: {
          title: "Cessar",labelTrigger: "Cessar",icon: "Trash2",variant: "default",showIcon: true,showCancel: true,labelCancel: "Cancel",variantCancel: "default",showConfirm: true,labelConfirm: "Confirm",variantConfirm: "default",}
      },
]
  }
>
</IGRPDataTableDropdownMenu>
</IGRPDataTableRowAction>
);
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
]
  }
  clientFilters={
    [
    ]
  }
  
  data={ contentTabletable1 }
/></div></div></div>
  );
}
