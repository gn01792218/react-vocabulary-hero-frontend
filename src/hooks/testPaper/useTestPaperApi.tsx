import { useAxios } from "../useAxios"
import { TestPaper, TestPaperCreateRequest, TestPaperUpdateRequest } from "../../types/testPaper"
export default function useNoteApi(){
    const { fetchData } = useAxios()
    async function getAllTestPaperRequest(){
        return await fetchData<TestPaper[]>('/testPapers','GET')
    }
    async function getTestPaperRequest(testPaperId:number){
        return await fetchData<TestPaper>(`/testPapers/${testPaperId}`, "GET")
    }
    async function createTestPaperRequest(payload:TestPaperCreateRequest){
        return await fetchData<TestPaper>(`/testPapers`,'POST',{payload})
    }
    async function deleteTestPaperRequest(testPaperId:number){
        return await fetchData<TestPaper>(`/testPapers/${testPaperId}`,"DELETE")
    }
    async function updateTestPaper(testPaperId:number, payload:TestPaperUpdateRequest){
        return await fetchData<TestPaper>(`/testPapers/${testPaperId}`,"PUT", {payload})
    }
    return {
        //methods
        getAllTestPaperRequest,
        getTestPaperRequest,
        createTestPaperRequest,
        deleteTestPaperRequest,
        updateTestPaper,
    }
}