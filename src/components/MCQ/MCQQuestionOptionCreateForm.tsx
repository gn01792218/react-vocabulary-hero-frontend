import { MCQQuestionOptionCreateFormData } from "../../types/MCQ"
import MyInput from "../MyInput"
import MyArraySwitch from "../MyArraySwitch"
interface Props {
    optionsData: MCQQuestionOptionCreateFormData[]
    addInput: () => void
    removeInput: (index: number) => void
    onOptionContentChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onOptionIsAnswerChange: (index: number, checked: boolean) => void
}
function MCQQuestionOptionCreateForm({ optionsData, addInput, removeInput, onOptionContentChange, onOptionIsAnswerChange }: Props) {
    return (
        <>
            <div>
                <div className='flex'>
                    <button onClick={addInput}>+增加選項</button>
                </div>
                {
                    optionsData?.map((option, index) => {
                        return (
                            <div className='flex justify-between mb-2' key={index}>
                                <div className="w-[200px]">
                                    <MyInput value={option.content} onChange={(e) => onOptionContentChange(e, index)} />
                                </div>
                                <MyArraySwitch label="正解?" index={index} checked={option.is_answer} onChange={onOptionIsAnswerChange} />
                                <button className="text-red-500" onClick={() => removeInput(index)}>-移除</button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default MCQQuestionOptionCreateForm