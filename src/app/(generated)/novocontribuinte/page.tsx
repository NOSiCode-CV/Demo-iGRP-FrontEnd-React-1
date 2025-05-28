'use client'


import { useState, useEffect, useRef } from 'react';
import { cn } from '@igrp/igrp-framework-react-design-system';
import { IGRPPageHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPButton } from "@igrp/igrp-framework-react-design-system";
import { IGRPForm } from "@igrp/igrp-framework-react-design-system";
import { IGRPFormHandle } from "@igrp/igrp-framework-react-design-system";
import { z } from "zod";
import { IGRPDatePickerRange } from "@igrp/igrp-framework-react-design-system";
import { DateRange } from "@igrp/igrp-framework-react-design-system";
import { IGRPRadioGroup } from "@igrp/igrp-framework-react-design-system";
import { IGRPCombobox } from "@igrp/igrp-framework-react-design-system";
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { IGRPSelect } from "@igrp/igrp-framework-react-design-system";
import { IGRPInputText } from "@igrp/igrp-framework-react-design-system";
import {onSubmitForm} from '@/app/(myapp)/functions/page-service'


export default function PageNovocontribuinteComponent() {

  
  const form1 = z.object({
    combobox1: z.string().optional(),
    select1: z.string().optional(),
    inputText1: z.string().optional()
})

type Form1ZodType = typeof form1;

const initForm1: z.infer<Form1ZodType> = {
    combobox1: "",
    select1: "",
    inputText1: ""
}


  const [contentFormform1, setContentFormform1] = useState<z.infer<any>>(initForm1);
  const [radioradio1Options, setRadioradio1Options] = useState<IGRPOptionsProps[]>([]);
  const [selectcombobox1Options, setSelectcombobox1Options] = useState<IGRPOptionsProps[]>([]);
  const [selectselect1Options, setSelectselect1Options] = useState<IGRPOptionsProps[]>([]);
  const formform1Ref = useRef<IGRPFormHandle<z.infer<Form1ZodType>> | null>(null);
  
useEffect(()=>{
    setSelectcombobox1Options([ { value: '1', label: 'Ativo' }]);
    setSelectselect1Options([ { value: '1', label: 'Ativo' }]);

},[])


  return (
<div className={ cn('page','mx-auto px-4 space-y-6','block',)}   >
	<div className={ cn('section',' space-x-3 space-y-3',)}   >
	<IGRPPageHeader
  title="Page Title"
  description="Page Description"
  variant="h3"
  className={ cn() }
>
  <div className="flex items-center gap-2">
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
  <div className={ cn('grid','grid-cols-4',' gap-4',)}   >
	<IGRPDatePickerRange
  placeholder="Enter the date"
  dateFormat="dd/MM/yyyy"
  iconPlacement="start"
  className={ cn() }
/>
<IGRPRadioGroup
  name="radio1"
  dir="ltr"
  orientation="vertical"
  variant="default"
  size="md"
  gridSize="default"
  className={ cn() }
  
  value={ undefined }
options={ radioradio1Options }
/>
<IGRPCombobox
  name="combobox1"
  placeholder="Select an option..."
  label="Combobox Input"
  selectLabel="No option found"
  gridSize="full"
  showSearch = { true }
  className={ cn() }
  
  value={ undefined }
options={ selectcombobox1Options }
/>
<IGRPSelect
  name="select1"
  placeholder="Select an option..."
  label="Select Input"
  selectLabel="No option found"
  className={ cn() }
  
  value={ undefined }
options={ selectselect1Options }
/>
<IGRPInputText
  name="inputText1"
placeholder=""
  label="Input Text"
  className={ cn('w-[9px] h-[9px] overflow-visible',) }
  
/></div>
</>
</IGRPForm></div></div>
  );
}
