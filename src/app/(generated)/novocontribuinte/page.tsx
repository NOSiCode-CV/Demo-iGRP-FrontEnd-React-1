'use client'


import { useState, useEffect, useRef } from 'react';
import { cn } from '@igrp/igrp-framework-react-design-system';
import { IGRPPageHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPButton } from "@igrp/igrp-framework-react-design-system";
import { IGRPForm } from "@igrp/igrp-framework-react-design-system";
import { IGRPFormHandle } from "@igrp/igrp-framework-react-design-system";
import { z } from "zod";
import { IGRPCard } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPHeadline } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardContent } from "@igrp/igrp-framework-react-design-system";
import { IGRPInputText } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardFooter } from "@igrp/igrp-framework-react-design-system";
import { useRouter } from "next/navigation";
import {onSubmitForm} from '@/app/(myapp)/functions/page-service'


export default function PageNovocontribuinteComponent() {

  
  const form1 = z.object({
    nome: z.string().optional()
})

type Form1ZodType = typeof form1;

const initForm1: z.infer<Form1ZodType> = {
    nome: ""
}


  const [contentFormform1, setContentFormform1] = useState<z.infer<any>>(initForm1);
  const formform1Ref = useRef<IGRPFormHandle<z.infer<Form1ZodType>> | null>(null);
  
const [showFilter, setShowFilter] = useState<boolean>(true);

const router = useRouter()

useEffect(()=>{
   // setSelectcombobox1Options([ { value: '1', label: 'Ativo' }]);
   // setSelectselect1Options([ { value: '1', label: 'Ativo' }]);

},[])

function goTolistaDeContribuintes (): void {
  router.push("listadecontribuintes");
}


  return (
<div className={ cn('page','mx-auto px-4 space-y-6','block',)}   >
	<div className={ cn('section',' space-x-3 space-y-3',)}   >
	<IGRPPageHeader
  title="Novo Contribuinte"
  variant="h3"
  className={ cn() }
>
  <div className="flex items-center gap-2">
    <IGRPButton
  variant="outline"
  size="default"
  showIcon={ true }
  className={ cn() }
  onClick={ () => goTolistaDeContribuintes() }
>
  Voltar
</IGRPButton>

    <IGRPButton
  variant="default"
  size="default"
  className={ cn() }
  onClick={ () => formform1Ref.current?.submit() }
>
  Save
</IGRPButton>

</div>
</IGRPPageHeader>

<IGRPForm
  schema={ form1 }
  validationMode="onBlur"
  gridClassName="flex flex-col"
formRef={ formform1Ref }
  className={ cn() }
  onSubmit={ onSubmitForm }
  defaultValues={ contentFormform1 }
>
  <>
  <IGRPCard
  className={ cn() }
  
>
  <IGRPCardHeader
  className={ cn() }
  
>
  <IGRPHeadline
  title="Informacoes do Contribuinte"
  variant="h5"
  className={ cn() }
>
</IGRPHeadline>

</IGRPCardHeader>
  <IGRPCardContent
  className={ cn('space-x-3','space-y-3',) }
  
>
  { showFilter && (<div className={ cn('grid','grid-cols-4',' gap-4',)}   >
	<IGRPInputText
  name="nome"
placeholder=""
  label="Nome"
  className={ cn('col-span-1',) }
  
/></div>)}
</IGRPCardContent>
  <IGRPCardFooter
  className={ cn() }
  
>
</IGRPCardFooter>
</IGRPCard>
</>
</IGRPForm></div></div>
  );
}
