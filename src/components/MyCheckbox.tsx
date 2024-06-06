import { Checkbox, Description, Field, Label } from '@headlessui/react'
interface Props{
    label:string
    description:string
    onChecked:Function
    onDisChecked:Function
}
export default function MyCheckbox({label, description, onChecked, onDisChecked}:Props) {
  const [enabled, setEnabled] = useState(false)
  function handleChange(checked:boolean){
    if(checked) onChecked()
    else onDisChecked()
    setEnabled(checked)
  }
  return (
    <Field className='w-full'>
      <Label>{label}</Label>
      <Description>{description}</Description>
      <Checkbox
        checked={enabled}
        onChange={handleChange}
        className="group block size-1 rounded border bg-white data-[checked]:bg-blue-500"
      >
        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Checkbox>
    </Field>
  )
}