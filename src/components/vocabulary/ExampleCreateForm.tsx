import useVocabulary from '../../hooks/vocabulary/useVocabulary'
interface Props{
    vocabularyId:number
    onSuccess:Function
}
function ExampleCreateForm({vocabularyId, onSuccess}:Props) {
    const {
        exampleFormData,
        onCreateExampleDataChange,
        createExample,
        updateCurrentVocabulary
    } = useVocabulary()

    async function onClick(){
       await createExample(vocabularyId)
       await updateCurrentVocabulary()
       onSuccess()
    }
    return (
        <div>
            <input 
            className='block'
            type="text" 
            name="definition" 
            value={exampleFormData.definition} 
            onChange={onCreateExampleDataChange} 
            placeholder='請輸入單字解釋' 
            />
            <button className='border-2 border-green-900' onClick={onClick}>確認</button>
        </div>
    )
}
export default ExampleCreateForm