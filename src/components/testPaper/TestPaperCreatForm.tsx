import useTestPage from '../../hooks/testPaper/useTestPaper'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyModal from '../MyModal'
import MySwitch from '../MySwitch'
function TestPaperCreateForm() {
    const {
        testPaperFormData,
        createTestPaper,
        onCreateTestPaperDataChange,
        onSwitchChange
    } = useTestPage()
    const [open, setOpen] = useState(false)
    async function onSubmit() {
        await createTestPaper()
        setOpen(false)
    }
    return (
        <>
            <MyModal title="建立考卷" open={open} onClose={() => setOpen(false)} backdrop={true}>
                <section className='border-2 bg-gray-500 text-white'>
                    <MySwitch
                        label='是否分享試卷?'
                        description=''
                        filedName='share'
                        checked={testPaperFormData.share}
                        onChange={onSwitchChange}
                    />
                    <div>
                        <MyInput label='考卷名稱' description='請輸入考卷的名稱' filedName="title" value={testPaperFormData.title} onChange={onCreateTestPaperDataChange} />
                        <MyInput label='考卷描述' description='請輸入考卷的描述' filedName="description" value={testPaperFormData.description} onChange={onCreateTestPaperDataChange} />
                    </div>
                    <button className='border-green-200 border-2 p-3' onClick={onSubmit}>建立</button>
                </section>
            </MyModal>
            <MyButton label='+建立考卷' style='bg-gray-200' onClick={() => setOpen(true)} />
        </>
    )
}
export default TestPaperCreateForm