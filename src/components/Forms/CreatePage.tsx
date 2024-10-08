'use client'
import CreateForm from '@/components/Forms/CreateForm'
import CardContainer from '@/components/ui/CardContainer'
import { createFormModel, createOptionFormModel, PollCreateRequest } from '@/lib/models'
import React, { useEffect, useState } from 'react'
import CreateOptions from './CreateOptions'
import AlertDialogPop from '../ui/AlertDialogPop'
import { useRouter } from 'next/navigation'

const formValueDefault: createFormModel = {
    title: "",
    type: "image",
    style: "vote",
    genre: 'OTHER',
    additionalField: 3,
    image: undefined,
}


const CreatePage = () => {
    const [step, setStep] = useState(0); // 0 for poll options, 1 for questions making
    const [formValue, setFormValue] = useState<createFormModel>(formValueDefault);
    const [pending, setPending] = useState(false);
    const [currentType, setCurrentType] = useState(formValueDefault.type);
    const [showChangeAlert, setShowChangeAlert] = useState(false);
    const router = useRouter();

    const [options, setOptions] = useState<createOptionFormModel[]>(Array.from({ length: 64 }).map((el, index) => ({ title: `${index + 1}`, source: 'image', src: 'https://randomwordgenerator.com/img/picture-generator/dragon-2099840_640.jpg', })));

    const updateFormValue = (values: createFormModel) => {
        setFormValue(values);
        setStep(1);
    }


    const onBackHandler = (options: createOptionFormModel[]) => {
        setOptions(options)
        setStep(0);
    }

    const createPoll = async (options: createOptionFormModel[], token: string) => {
        const body: PollCreateRequest = {
            options,
            formData: formValue,
            captchaToken: token
        }
        setPending(true);
        const res = await fetch('/api/poll', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        if (!res.ok) {
            setPending(false);

        }
        else router.push(`/${data}`);
    }

    useEffect(() => {

        if (formValue.type != currentType) {
            if (options.length == 0) {
                // match types
                setCurrentType(formValue.type);
            }
            // activate alert
            else setShowChangeAlert(true);
        }
    }, [formValue, currentType, options])

    const onCancelChangeTypeHandler = () => {
        // change the type back.
        setFormValue(prev => {
            const copy: createFormModel = JSON.parse(JSON.stringify(prev));
            copy.type = currentType;
            return copy;
        })
        // dismiss alert
        setShowChangeAlert(false);
    }
    const onContinueChangeTypeHandler = () => {
        // reset option and change current type to new one.
        setShowChangeAlert(false);
        setCurrentType(formValue.type);
        setOptions([]);
    }

    return (
        <CardContainer className='h-max w-full overflow-hidden'>
            {step == 0 ? <CreateForm formValue={formValue} submitHandler={updateFormValue} />
                :
                <CreateOptions top={formValue.style === 'vote' ? formValue.additionalField as number : 0} pending={pending} showOrder={formValue.additionalField === 'order'} key={options.length} type={formValue.type} formStyle={formValue.style} onBack={onBackHandler} onCreate={createPoll} initialOptions={options} />
            }
            {showChangeAlert && <AlertDialogPop title={`Change type from ${currentType} to ${formValue.type}?`} message='all the options will be gone !' onCancel={onCancelChangeTypeHandler} onContinue={onContinueChangeTypeHandler} />}
        </CardContainer>
    )
}

export default CreatePage