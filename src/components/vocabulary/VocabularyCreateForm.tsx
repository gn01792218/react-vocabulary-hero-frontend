import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyModal from '../MyModal'
function VocabularyCreateForm() {
    const {
        vocabularyFormData,
        exampleFormData,
        sentenceFormData,
        createVocabulary,
        onCreateVocabularyDataChange,
        onCreateExampleDataChange,
        onCreateSentenceDataChange
    } = useVocabulary()
    const [ open, setOpen ] = useState(false)
    async function onSubmit(){
        await createVocabulary()
        setOpen(false)
    }
    return (
        <>
            <MyModal open={open} backdrop={true} title='建立單字' onClose={()=>setOpen(false)}>
                <section className='border-2'>
                    <div>
                        <MyInput label='單字' description='請輸入這個單字' filedName="spelling" value={vocabularyFormData.spelling} onChange={onCreateVocabularyDataChange} />
                        <MyInput label='發音' description='請輸入單字發音' filedName="pronunciation" value={vocabularyFormData.pronunciation} onChange={onCreateVocabularyDataChange} />
                    </div>
                    <div>
                        <MyInput label='定義' description='請輸入單字定義' filedName="definition" value={exampleFormData.definition} onChange={onCreateExampleDataChange} />
                    </div>
                    <div>
                        <MyInput label='例句' description='請輸入例句' filedName="en" value={sentenceFormData.en} onChange={onCreateSentenceDataChange} />
                        <MyInput label='例句翻譯' description='請輸入例句翻譯' filedName="zh" value={sentenceFormData.zh} onChange={onCreateSentenceDataChange} />
                    </div>
                    <button className='border-green-200 border-2 p-3' onClick={onSubmit}>建立新單字</button>
                </section>
            </MyModal>
            <MyButton label='+建立單字' style='bg-red-200' onClick={()=>setOpen(true)}/>
        </>
    )
}
export default VocabularyCreateForm