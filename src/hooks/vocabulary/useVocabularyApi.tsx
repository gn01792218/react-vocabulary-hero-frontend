import { useAxios } from "../useAxios"
import { useAppSelector } from '../../store/hooks'
import { CreateExampleRequest, CreateSentenceRequest, CreateVocabularyFromNoteRequest, CreateVocabularyRequest, Example, GetExamplesAndSentencesRequest, Vocabulary } from "../../types/vocabulary"
export default function useVocabularyApi(){
    const { fetchData } = useAxios()
    const user = useAppSelector((state)=>state.user.user)
    async function getAllVocabularyRequest(){
        return await fetchData<Vocabulary[]>('/vocabularys','GET')
    }
    async function getAllVocabularyIncludeExampleRequest(){
        return await fetchData<Vocabulary[]>('/vocabularys/examples','GET')
    }
    async function getAllVocabularyIncludeAllRelationshipRequest(){
        return await fetchData<Vocabulary[]>('/vocabularys/all','GET')
    }
    async function createVocabularyRequest(payload:CreateVocabularyRequest){
        return await fetchData<Vocabulary>('/vocabularys/user','POST',{payload})
    }
    async function createVocabularyFromNoteRequest(payload:CreateVocabularyFromNoteRequest){
        return await fetchData<Vocabulary>('/vocabularys/note','POST',{payload})
    }
    async function createExampleRequest(vocabularyId:number,payload:CreateExampleRequest){
        return await fetchData<Example>(`/examples/vocabulary/${vocabularyId}`,'POST',{payload})
    }   
     async function createSentenceRequest(exampleId:number,vocabularyId:number,payload:CreateSentenceRequest){
        return await fetchData<Example>(`/sentences/${exampleId}/${vocabularyId}`,'POST',{payload})
    }   
    async function getExampsAndStencesRequest(payload:GetExamplesAndSentencesRequest){
        return await fetchData<Vocabulary>(`/vocabularys/${payload.vocabularyId}/examples/stences`,'GET')
    }
    async function deleteVocabularyRequest(vocabularyId:number){
        return await fetchData<Example>(`/vocabularys/${vocabularyId}`,'DELETE')
    }  
    async function deleteExampleRequest(exampleId:number){
        return await fetchData<Example>(`/examples/${exampleId}`,'DELETE')
    }  
    async function deleteSentenceRequest(sentence:number){
        return await fetchData<Example>(`/sentences/${sentence}`,'DELETE')
    }  
    return {
        //methods
        getAllVocabularyRequest,
        getAllVocabularyIncludeExampleRequest,
        getAllVocabularyIncludeAllRelationshipRequest,
        createVocabularyRequest,
        createVocabularyFromNoteRequest,
        createExampleRequest,
        createSentenceRequest,
        getExampsAndStencesRequest,
        deleteVocabularyRequest,
        deleteExampleRequest,
        deleteSentenceRequest
    }
}