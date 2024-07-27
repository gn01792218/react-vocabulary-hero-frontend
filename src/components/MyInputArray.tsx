import MyInput from "./MyInput"
interface Props {
    title:string
    targetArrayData:Array<any>
    addInput:()=>void
    removeInput:(index:number)=>void
    onChange:(e: React.ChangeEvent<HTMLInputElement>,index: number) =>void
}
export default function MyInputArray({title, targetArrayData, addInput, removeInput, onChange}:Props) {
    return (
        <div>
            <div className='flex'>
                <button onClick={addInput}>{title}</button>
            </div>
            {
                targetArrayData.map((i, index) => {
                    return (
                        <div className='flex justify-between'>
                            <MyInput value={i} onChange={(e) => onChange(e, index)} />
                            <button onClick={() => removeInput(index)}>-移除</button>
                        </div>
                    )
                })
            }
        </div>
    )
}