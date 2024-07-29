import { useAxios } from "../useAxios"
import { MCQQuestion, MCQQuestionCreateRequest, MCQQuestionUpdateRequest } from "../../types/MCQ"
export default function useNoteApi(){
    const { fetchData } = useAxios()
    async function getAllRequest(){
        return await fetchData<MCQQuestion[]>('/MCQs','GET')
    }
    async function getUserAllRequest(){
        return await fetchData<MCQQuestion[]>('/MCQs/userAll','GET')
    }
    async function getByIdRequest(id:number){
        return await fetchData<MCQQuestion>(`/MCQs/${id}`, "GET")
    }
    async function createRequest(payload:MCQQuestionCreateRequest){
        return await fetchData<MCQQuestion>(`/MCQs`,'POST',{payload})
    }
    async function deleteRequest(id:number){
        return await fetchData<MCQQuestion>(`/MCQs/${id}`,"DELETE")
    }
    async function updateRequest(id:number, payload:MCQQuestionUpdateRequest){
        return await fetchData<MCQQuestion>(`/MCQs/${id}`,"PUT", {payload})
    }
    return {
        //methods
        getAllRequest,
        getUserAllRequest,
        getByIdRequest,
        createRequest,
        deleteRequest,
        updateRequest,
    }
}