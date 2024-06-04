import useNote from '../../hooks/note/useNote'
import MyInput from '../MyInput'
function NoteCreateForm() {
    const {
        noteFormData,
        createNote,
        onCreateNoteDataChange,
    } = useNote()
    return (
        <section className='border-2'>
            <div>
                <MyInput label='筆記名稱' description='請輸入筆記的名稱' filedName="title" value={noteFormData.title} onChange={onCreateNoteDataChange} />  
                <MyInput label='筆記描述' description='請輸入筆記的描述' filedName="description" value={noteFormData.description} onChange={onCreateNoteDataChange} />  
            </div>
            <button className='border-green-200 border-2 p-3' onClick={createNote}>建立筆記</button>
        </section>
    )
}
export default NoteCreateForm