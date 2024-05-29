import useVocabulary from '../../hooks/vocabulary/useVocabulary'
interface Props{
    vocabularyId:number,
    exampleId:number,
    onSuccess:Function
}
function SentenceCreateForm({vocabularyId, exampleId, onSuccess}:Props) {
    const {
        sentenceFormData,
        onCreateSentenceDataChange,
        createExampleStence,
        updateCurrentVocabulary
    } = useVocabulary()
    async function onClick(){
        await createExampleStence(exampleId,vocabularyId)
        await updateCurrentVocabulary()
        onSuccess()
    }
    return (
        <div>
            <input 
            className='block'
            type="text" 
            name="en" 
            value={sentenceFormData?.en} 
            onChange={onCreateSentenceDataChange} 
            placeholder='請輸入單字的例句英文' 
            />
            <input 
            className='block'
            type="text" 
            name="zh" 
            value={sentenceFormData?.zh} 
            onChange={onCreateSentenceDataChange} 
            placeholder='請輸入單字的例句中文' 
            />
            <button className="border-2 border-green-900" onClick={onClick}>確認</button>
        </div>
    )
}
export default SentenceCreateForm