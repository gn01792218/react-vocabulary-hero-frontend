
import { useDispatch } from "react-redux"
import { useAppSelector } from '../../store/hooks'
import { NoteCreateRequest } from '../../types/note'
import useNoteApi from "./useNoteApi"
import { setCurrentNote, setNotes } from "../../store/noteSlice"

export default function useNote() {
    const dispatch = useDispatch()
    const {
        createNoteRequest,
        getAllNotesRequest,
        getNoteIncludeVocabularyRequest,
        deleteNoteRequest
    } = useNoteApi()
    const notes = useAppSelector((state) => state.note.notes)
    const currentNote = useAppSelector((state) => state.note.currentNote)
    const [noteFormData, setNoteFormData] = useState<NoteCreateRequest>({
        title: '',
        description: ''
    })
    async function getAllNotes() {
        const notes = await getAllNotesRequest()
        if (notes) dispatch(setNotes([...notes]))
    }
    async function getNote(noteId:number) {
        const note = await getNoteIncludeVocabularyRequest(noteId)
        if(note) dispatch(setCurrentNote(note))
    }
    async function createNote() {
        if (!noteFormData.title) return alert('請給這個筆記一個名稱!!!')
        const note = await createNoteRequest(noteFormData)
        if (!note) return
        dispatch(setNotes([...notes, note])) //推到共用的地方去 
    }
    async function deleteNote(noteId: number) {
        const deleteNote = await deleteNoteRequest(noteId)
        if (deleteNote) dispatch(setNotes([...notes.filter(n => n.id !== deleteNote.id)]))
    }
    function onCreateNoteDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setNoteFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return {
        //data
        notes,
        currentNote,
        noteFormData,
        //methods
        createNote,
        getAllNotes,
        getNote,
        deleteNote,
        onCreateNoteDataChange
    }
}


