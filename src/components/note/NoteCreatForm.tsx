import useNote from '../../hooks/note/useNote'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyModal from '../MyModal'
function NoteCreateForm() {
    const {
        noteFormData,
        createNote,
        onCreateNoteDataChange,
    } = useNote()
    const [open, setOpen] = useState(false)
    async function onSubmit(){
        await createNote()
        setOpen(false)
    }
    return (
        <>
            <MyModal title="建立筆記" open={open} onClose={() => setOpen(false)} backdrop={true}>
                <section className='border-2 bg-gray-500 text-white'>
                    <div>
                        <MyInput label='筆記名稱' description='請輸入筆記的名稱' filedName="title" value={noteFormData.title} onChange={onCreateNoteDataChange} />
                        <MyInput label='筆記描述' description='請輸入筆記的描述' filedName="description" value={noteFormData.description} onChange={onCreateNoteDataChange} />
                    </div>
                    <button className='border-green-200 border-2 p-3' onClick={onSubmit}>建立筆記</button>
                </section>
            </MyModal>
            <MyButton label='+建立筆記' style='bg-gray-200' onClick={()=>setOpen(true)}/>
        </>
    )
}
export default NoteCreateForm