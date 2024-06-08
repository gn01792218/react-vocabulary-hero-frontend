import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
interface Props {
    type?: string
    label?: string,
    description?: string,
    filedName?: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function MyInput({ type, label, description, filedName, value, onChange }: Props) {
    return (
        <div className="w-full max-w-md px-4">
            <Field>
                {
                    label &&
                    <Label className="text-sm/6 font-medium text-white">{label}</Label>
                }
                {
                    description &&
                    <Description className="text-sm/6 text-white/50">{description}</Description>
                }
                {
                    type === 'file' ?
                        <Input
                            type={type}
                            name={filedName}
                            value={value}
                            onChange={onChange}
                            className={clsx(
                                'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )} /> :
                        <Input
                            type={type || 'text'}
                            name={filedName}
                            value={value}
                            onChange={onChange}
                            className={clsx(
                                'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )} />
                }
            </Field>
        </div>
    )
}