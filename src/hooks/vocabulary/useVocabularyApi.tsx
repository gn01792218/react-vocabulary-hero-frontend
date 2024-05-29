import { useAxios } from "../useAxios"
import { useAppSelector } from '../../store/hooks'
import { CreateExampleRequest, CreateSentenceRequest, CreateVocabularyRequest, Example, GetExamplesAndSentencesRequest, Vocabulary } from "../../types/vocabulary"
export default function useVocabularyApi(){
    const { fetchData } = useAxios()
    const user = useAppSelector((state)=>state.user.user)
    async function getAllVocabularyRequest(){
        return await fetchData<Vocabulary[]>('/vocabularys','GET')
    }
    async function createVocabularyRequest(payload:CreateVocabularyRequest){
        return await fetchData<Vocabulary>(`/vocabularys/user/${user?.id}`,'POST',{payload})
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
    return {
        //methods
        getAllVocabularyRequest,
        createVocabularyRequest,
        createExampleRequest,
        createSentenceRequest,
        getExampsAndStencesRequest
    }
}