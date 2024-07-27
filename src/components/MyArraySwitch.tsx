import { Switch, Label, Field } from '@headlessui/react'
interface Props {
    label: string
    description?: string
    checked: boolean
    index:number
    onChange: (index: number, checked: boolean) => void
}
export default function MySwitch({ label, description, onChange, checked,index }: Props) {
    return (
        <Field>
            <div className='flex'>
            <Label>{label}{checked}</Label>
            {
                checked ? <p className='text-green-500'>是</p> : <p className='text-red-300'>否</p>
            }
            </div>
            {
                description &&
                <p className="text-sm">{description}</p>
            }
            <Switch
                checked={checked}
                onChange={(checked) => onChange(index, checked)}
                className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
            >
                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
        </Field>

    )
}