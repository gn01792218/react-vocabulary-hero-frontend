import useVocabulary from '../../hooks/vocabulary/useVocabulary'
interface Props{
    vocabularyId:number,
    exampleId:number,
    onCreateSuccess:Function
}
function SentenceCreateForm({exampleId, vocabularyId, onCreateSuccess}:Props) {
    const {
        createStence,
        sentenceFormData,
        onCreateSentenceDataChange,
    } = useVocabulary()
    async function handleClick(){
        await createStence(exampleId, vocabularyId)
        onCreateSuccess()
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
            <button className="border-2 border-green-900" onClick={handleClick}>確認</button>
        </div>
    )
}
export default SentenceCreateForm