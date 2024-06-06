import { useAxios } from "../useAxios"
import { Note, NoteCreateRequest, NoteUpdateRequest, NoteVocabularysUpdateRequest } from "../../types/note"
export default function useNoteApi(){
    const { fetchData } = useAxios()
    async function getAllNotesRequest(){
        return await fetchData<Note[]>('/notes','GET')
    }
    async function createNoteRequest(payload:NoteCreateRequest){
        return await fetchData<Note>(`/notes/user`,'POST',{payload})
    }
    async function deleteNoteRequest(noteId:number){
        return await fetchData<Note>(`/notes/${noteId}`,"DELETE")
    }
    async function getNoteIncludeVocabularyRequest(noteId:number){
        return await fetchData<Note>(`/notes/${noteId}`, "GET")
    }
    async function updateNote(noteId:number, payload:NoteUpdateRequest){
        return await fetchData<Note>(`/notes/${noteId}`,"PUT", {payload})
    }
    async function updateNoteVocabularys(noteId:number, payload:NoteVocabularysUpdateRequest){
        return await fetchData<Note>(`/notes/${noteId}/vocabularys`,"PUT", {payload})
    }
    return {
        //methods
        getAllNotesRequest,
        createNoteRequest,
        deleteNoteRequest,
        getNoteIncludeVocabularyRequest,
        updateNote,
        updateNoteVocabularys
    }
}