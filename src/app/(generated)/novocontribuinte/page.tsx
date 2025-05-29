'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@igrp/igrp-framework-react-design-system';
import { IGRPPageHeader } from '@igrp/igrp-framework-react-design-system';
import { IGRPButton } from '@igrp/igrp-framework-react-design-system';
import { IGRPForm } from '@igrp/igrp-framework-react-design-system';
import { IGRPFormHandle } from '@igrp/igrp-framework-react-design-system';
import { z } from 'zod';
import { HeadlineCustom } from '@/app/(myapp)/components/shared-ui';
import { useRouter } from 'next/navigation';
import { onSubmitForm } from '@/app/(myapp)/functions/page-service';

export default function PageNovocontribuinteComponent() {
  const form1 = z.object({
    combobox1: z.string().optional(),
    select1: z.string().optional(),
    inputText1: z.string().optional(),
  });

  type Form1ZodType = z.infer<typeof form1>;

  const initForm1: Form1ZodType = {
    combobox1: '',
    select1: '',
    inputText1: '',
  };

  const [contentFormform1, setContentFormform1] = useState<Form1ZodType>(initForm1);
  const formform1Ref = useRef<IGRPFormHandle<Form1ZodType> | null>(null);

  const [showFilter, setShowFilter] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    // setSelectcombobox1Options([ { value: '1', label: 'Ativo' }]);
    // setSelectselect1Options([ { value: '1', label: 'Ativo' }]);
  }, []);

  function goTolistaDeContribuintes(): void {
    router.push('listadecontribuintes');
  }

  return (
    <div className={cn('page', 'mx-auto px-4 space-y-6', 'block')}>
      <div className={cn('section', ' space-x-3 space-y-3')}>
        <IGRPPageHeader
          title="Novo Contribuinte"
          description="Page Description"
          variant="h3"
          className={cn()}
        >
          <div className="flex items-center gap-2">
            <IGRPButton
              variant="outline"
              size="default"
              showIcon={true}
              className={cn()}
              onClick={() => goTolistaDeContribuintes()}
            >
              Voltar
            </IGRPButton>

            <IGRPButton
              variant="default"
              size="default"
              className={cn()}
              onClick={() => formform1Ref.current?.submit()}
            >
              Save
            </IGRPButton>
          </div>
        </IGRPPageHeader>

        <IGRPForm
          schema={form1}
          validationMode="onBlur"
          gridClassName="flex flex-col"
          formRef={formform1Ref}
          className={cn()}
          onSubmit={onSubmitForm}
          defaultValues={contentFormform1}
        >
          <>
            {showFilter && (
              <div className={cn('grid', 'grid-cols-4', ' gap-4')}>
                <HeadlineCustom
                  Icon={'Plus'}
                  title={'Ttitle'}
                  description={'Description'}
                  className={undefined}
                ></HeadlineCustom>
              </div>
            )}
          </>
        </IGRPForm>
      </div>
    </div>
  );
}
