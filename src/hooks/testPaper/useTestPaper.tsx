
import { useDispatch } from "react-redux"
import { useAppSelector } from '../../store/hooks'
import { TestPaper, TestPaperCreateRequest, TestPaperCreateRequestForm, TestPaperUpdateRequest } from '../../types/testPaper'
import useTestPaperApi from "./useTestPaperApi"
import { setCurrentTestPaper, setTestPapers } from "../../store/testPaperSlice"
import useUser from "../user/useUser"

export default function useTestPaper() {
    const dispatch = useDispatch()
    const { user } = useUser()
    const {
        createTestPaperRequest,
        getAllTestPaperRequest,
        getTestPaperRequest,
        deleteTestPaperRequest,
        updateTestPaper,
    } = useTestPaperApi()
    const testPapers = useAppSelector((state) => state.testPaper.testPapers)
    const currentTestPaper = useAppSelector((state) => state.testPaper.currentTestPaper)
    const [testPaperFormData, setTestPaperFormData] = useState<TestPaperCreateRequestForm>({
        title: '',
        description: ''
    })
    async function getAllTestPapers() {
        const res = await getAllTestPaperRequest()
        if (res) dispatch(setTestPapers([...res]))
    }
    async function getTestPaper(testPaperId: number) {
        return await getTestPaperRequest(testPaperId)
    }
    async function createTestPaper() {
        if (!user) return alert('請先登入')
        if (!testPaperFormData.title) return alert('請給這個考卷一個名稱!!!')
        const res = await createTestPaperRequest({
            ...testPaperFormData,
        })
        if (!res) return
        resetCreateNoteForm()
        dispatch(setTestPapers([...testPapers, res])) //推到共用的地方去 
    }
    async function deleteTestPaper(testPaperId: number) {
        const deleteObject = await deleteTestPaperRequest(testPaperId)
        if (deleteObject) dispatch(setTestPapers([...testPapers.filter(n => n.id !== deleteObject.id)]))
    }
    function onCreateTestPaperDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setTestPaperFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    async function updateStoreCurrentTestPaper(testPaper: number) {
        const res = await getTestPaper(testPaper)
        console.log('取得testPaper',res)
        if (res) dispatch(setCurrentTestPaper({ ...res }))
    }
    function resetCreateNoteForm() {
        setTestPaperFormData({ ...{ title: '', description: '' } })
    }
    return {
        //data
        testPapers,
        currentTestPaper,
        testPaperFormData,
        //methods
        createTestPaper,
        getAllTestPapers,
        getTestPaper,
        deleteTestPaper,
        updateStoreCurrentTestPaper,
        onCreateTestPaperDataChange,
    }

}


