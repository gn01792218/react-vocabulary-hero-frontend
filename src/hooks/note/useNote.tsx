
import { useDispatch } from "react-redux"
import { useAppSelector } from '../../store/hooks'
import { Note, NoteCreateRequest, NoteUpdateRequest, NoteVocabularysUpdateRequest } from '../../types/note'
import useNoteApi from "./useNoteApi"
import { setCurrentNote, setNotes } from "../../store/noteSlice"

export default function useNote() {
    const dispatch = useDispatch()
    const {
        createNoteRequest,
        getAllNotesRequest,
        getNoteIncludeVocabularyRequest,
        deleteNoteRequest,
        updateNote,
        updateNoteVocabularys
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
    async function getNote(noteId: number) {
        return await getNoteIncludeVocabularyRequest(noteId)
    }
    async function createNote() {
        if (!noteFormData.title) return alert('請給這個筆記一個名稱!!!')
        const note = await createNoteRequest(noteFormData)
        if (!note) return
        resetCreateNoteForm()
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
    async function addVocabularyToNote(note: Note, payload: NoteVocabularysUpdateRequest) {
        payload.ids = pushNewIdListToOriginList(note, payload.ids)
        const updateNote = await updateNoteVocabularys(note.id, payload)
        if (updateNote) dispatch(setCurrentNote(updateNote))
    }
    async function removeVocabularyFromNote(noteId: number, vocabularyId:number) {
        const note = await getNoteIncludeVocabularyRequest(noteId)
        if(!note) return console.log('找不到該note')
        const vocabularys_id = note.vocabularys.filter(v=>v.id !== vocabularyId).map(v=>v.id)
        const updateNote = await updateNoteVocabularys(note.id, {ids: vocabularys_id})
        if(updateNote) dispatch(setCurrentNote(updateNote))
    }
    async function updateStoreCurrentNote(noteId:number) {
        const note = await getNote(noteId)
        if(note) dispatch(setCurrentNote({...note}))
    }

    function pushNewIdListToOriginList(targetObject: Note, payload: number[]) {
        const originVocabularyIdList = targetObject.vocabularys.map(v => v.id)
        originVocabularyIdList.push(...payload)
        return originVocabularyIdList
    }
    function resetCreateNoteForm(){
        setNoteFormData({...{ title: '',description: ''}})
    }
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
        updateStoreCurrentNote,
        onCreateNoteDataChange,
        removeVocabularyFromNote,
        addVocabularyToNote
    }

}


