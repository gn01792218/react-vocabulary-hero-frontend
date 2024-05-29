import useVocabulary from '../../hooks/vocabulary/useVocabulary'
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
    return (
        <section>
            <div>
                <input type="text" name="spelling" value={vocabularyFormData?.spelling} onChange={onCreateVocabularyDataChange} placeholder='請輸入英文單字' />
                <input type="text" name="pronunciation" value={vocabularyFormData?.pronunciation} onChange={onCreateVocabularyDataChange} placeholder='請輸入發音' />
            </div>
            <div>
                <input type="text" name="definition" value={exampleFormData.definition} onChange={onCreateExampleDataChange} placeholder='請輸入單字解釋' />
            </div>
            <div>
                <input type="text" name="en" value={sentenceFormData?.en} onChange={onCreateSentenceDataChange} placeholder='請輸入單字的例句英文' />
                <input type="text" name="zh" value={sentenceFormData?.zh} onChange={onCreateSentenceDataChange} placeholder='請輸入單字的例句中文' />
            </div>
            <button className='border-green-200 border-2 p-3' onClick={createVocabulary}>新增單字</button>
        </section>
    )
}
export default VocabularyCreateForm