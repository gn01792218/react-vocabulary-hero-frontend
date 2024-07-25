import useMCQ from '../../hooks/MCQ/useMCQ'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyModal from '../MyModal'
import MySwitch from '../MySwitch'
interface Props {
    testPaperId: number,
}
function MCQQuestionCreateForm({ testPaperId }: Props) {
    const {
        MCQQuestionFormData,
        create,
        onCreateMCQQuestionDataChange,
        onSwitchChange
    } = useMCQ()
    const [open, setOpen] = useState(false)
    async function onSubmit() {
        await create(testPaperId)
        setOpen(false)
    }
    return (
        <>
            <MyModal open={open} backdrop={true} title='建立選擇題' onClose={() => setOpen(false)}>
                <section className='border-2'>
                    <div>
                        <MyInput label='題目' description='請輸入題目敘述' filedName="question" value={MCQQuestionFormData.question} onChange={onCreateMCQQuestionDataChange} />
                        <MySwitch
                            label='分享題目'
                            filedName='share'
                            checked={MCQQuestionFormData.share}
                            onChange={onSwitchChange}
                        />
                    </div>
                    <button className='border-green-200 border-2 p-3' onClick={onSubmit}>建立</button>
                </section>
            </MyModal>
            <MyButton label='+建立選擇題' style='bg-red-200' onClick={() => setOpen(true)} />
        </>
    )
}
export default MCQQuestionCreateForm