import useNote from '../../hooks/note/useNote'
import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyModal from '../MyModal'
interface Props {
    noteId: number
}
function VocabularyCreateFormFromNote({ noteId }: Props) {
    const {
        vocabularyFormData,
        exampleFormData,
        sentenceFormData,
        createVocabulary,
        onCreateVocabularyDataChange,
        onCreateExampleDataChange,
        onCreateSentenceDataChange,
        getAllVocabularyIncludeAllRelationship
    } = useVocabulary()
    const { updateStoreCurrentNote } = useNote()
    const [open, setOpen] = useState(false)
    async function onSubmit() {
        const vocabulary =  await createVocabulary(noteId)
        if(!vocabulary) return 
        await updateStoreCurrentNote(noteId)
        getAllVocabularyIncludeAllRelationship()  //為了更新checkbox的單字列表
        setOpen(false)
    }
    return (
        <>
            <MyModal open={open} backdrop={true} onClose={() => setOpen(false)} title='新增單字'>
                <section className='border-2 pt-5'>
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
                    <MyButton label='+建立單字' style='bg-blue-200 text-black my-5 block mx-auto' onClick={onSubmit}/>
                </section>
            </MyModal>
            <MyButton label='+添加單字' style='bg-red-200' onClick={()=>setOpen(true)}/>
        </>
    )
}
export default VocabularyCreateFormFromNote