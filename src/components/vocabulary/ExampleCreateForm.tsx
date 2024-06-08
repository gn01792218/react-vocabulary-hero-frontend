import useVocabulary from '../../hooks/vocabulary/useVocabulary'
interface Props{
    vocabularyId:number,
    onCreateSuccess:Function
}
function ExampleCreateForm({vocabularyId, onCreateSuccess}:Props) {
    const {
        exampleFormData,
        onCreateExampleDataChange,
        createExample
    } = useVocabulary()
    async function handleClick(){
        await createExample(vocabularyId)
        onCreateSuccess()
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
            <button className='border-2 border-green-900' onClick={handleClick}>確認</button>
        </div>
    )
}
export default ExampleCreateForm