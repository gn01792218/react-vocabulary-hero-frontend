import { useAxios } from "../useAxios"
import { Note, NoteCreateRequest } from "../../types/note"
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
    return {
        //methods
        getAllNotesRequest,
        createNoteRequest,
        deleteNoteRequest,
        getNoteIncludeVocabularyRequest
    }
}