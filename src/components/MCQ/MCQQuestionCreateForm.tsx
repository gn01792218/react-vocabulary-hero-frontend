import useMCQ from '../../hooks/MCQ/useMCQ'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyInputArray from '../MyInputArray'
import MyModal from '../MyModal'
import MySwitch from '../MySwitch'
import MCQQuestionOptionCreateForm from './MCQQuestionOptionCreateForm'
interface Props {
    testPaperId: number,
}
function MCQQuestionCreateForm({ testPaperId }: Props) {
    const {
        MCQQuestionFormData,
        create,
        onCreateMCQQuestionDataChange,
        onMCQQuestionFormDataSolutionsChange,
        onMCQQuestionFormDataTagsChange,
        onMCQQuestionOptionContentChange,
        onSwitchChange,
        onMCCQQuestionOptionIsAnswerSwitchChange,
        addSolutionForm,
        removeSolution,
        addTagsForm,
        removeTags,
        addOptionForm,
        removeOption,
        initMCQoptions,
        setMCQQuestionFormData
    } = useMCQ()
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        initMCQoptions()
        setMCQQuestionFormData({
            ...{
                question: '',
                solutions: [],
                tags: [],
                share: true,
                options: MCQQuestionFormData.options
            }
        })
    },[])
    async function onSubmit() {
        //檢查沒有選項就不建立
        if(!MCQQuestionFormData.question) return alert('請撰寫題目敘述')
        if(!MCQQuestionFormData.options.length) return alert('請為題目建立選項!')
        if(!checkOptionsHaveAtLestOneAnswer()) return alert('請設置一個正確答案!')
        if(!MCQQuestionFormData.options.every(o=>o.content)) return alert('不能有選項是空白的')
        await create(testPaperId)
        setOpen(false)
    }
    function checkOptionsHaveAtLestOneAnswer(){
        return MCQQuestionFormData.options.some(option=>option.is_answer)
    }
    return (
        <>
            <MyModal open={open} backdrop={true} title='建立選擇題' onClose={() => setOpen(false)}>
                <section className='border-2'>
                    <div>
                        <MyInput label='題目' description='請輸入題目敘述' filedName="question" value={MCQQuestionFormData.question} onChange={onCreateMCQQuestionDataChange} />
                        <MySwitch
                            label='分享題目 : '
                            description='和別的使用者分享此題目'
                            filedName='share'
                            checked={MCQQuestionFormData.share}
                            onChange={onSwitchChange}
                        />
                        -----------------------
                        <MCQQuestionOptionCreateForm optionsData={MCQQuestionFormData.options} addInput={addOptionForm} removeInput={removeOption} onOptionContentChange={onMCQQuestionOptionContentChange} onOptionIsAnswerChange={onMCCQQuestionOptionIsAnswerSwitchChange}/>
                        -----------------------
                        <MyInputArray title='+解析' targetArrayData={MCQQuestionFormData.solutions} addInput={addSolutionForm} removeInput={removeSolution} onChange={onMCQQuestionFormDataSolutionsChange}/>
                        --------------------
                        <MyInputArray title='+tag' targetArrayData={MCQQuestionFormData.tags} addInput={addTagsForm} removeInput={removeTags} onChange={onMCQQuestionFormDataTagsChange}/>
                    </div>
                    <button className='border-green-200 border-2 p-3' onClick={onSubmit}>建立</button>
                </section>
            </MyModal>
            <MyButton label='+建立選擇題' style='bg-red-200' onClick={() => setOpen(true)} />
        </>
    )
}
export default MCQQuestionCreateForm