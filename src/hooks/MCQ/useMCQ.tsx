
import { useDispatch } from "react-redux"
import { useAppSelector } from '../../store/hooks'
import { MCQQuestion, MCQQuestionCreateRequest, MCQQuestionUpdateRequest, MCQQuestionCreateRequestForm } from '../../types/MCQ'
import useMCQApi from "./useMCQApi"
import { setCurrentMCQQuestion, setMCQs } from "../../store/mCQSlice"
import useUser from "../user/useUser"

export default function useMCQ() {
    const dispatch = useDispatch()
    const { user } = useUser()
    const {
        createRequest,
        getAllRequest,
        getByIdRequest,
        deleteRequest,
        updateRequest,
    } = useMCQApi()
    const MCQs = useAppSelector((state) => state.MCQ.MCQs)
    const currentMCQQuestion = useAppSelector((state) => state.MCQ.currentMCQQuestion)
    const [MCQQuestionFormData, setMCQQuestionFormData] = useState<MCQQuestionCreateRequestForm>({
        question: '',
        solutions: [],
        share: true,
        tags: [],
        options: []
    })
    async function getAll() {
        const res = await getAllRequest()
        if (res) dispatch(setMCQs([...res]))
    }
    async function getById(testPaperId: number) {
        return await getByIdRequest(testPaperId)
    }
    async function create(test_paper_id: number) {
        if (!user) return alert('請先登入')
        if (!MCQQuestionFormData.question) return alert('請輸入題目內容!!!')
        const res = await createRequest({
            ...MCQQuestionFormData,
            test_paper_id
        })
        if (!res) return
        resetCreateMCQQuestionForm()
        dispatch(setMCQs([...MCQs, res])) //推到共用的地方去 
    }
    async function deleteById(testPaperId: number) {
        const deleteObject = await deleteRequest(testPaperId)
        if (deleteObject) dispatch(setMCQs([...MCQs.filter(n => n.id !== deleteObject.id)]))
    }
    function onCreateMCQQuestionDataChange(e: React.ChangeEvent<HTMLInputElement | HTMLButtonElement>) {
        const { name, value } = e.target;
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    function onSwitchChange(fieldName: string, checked: boolean) {
        console.log(fieldName)
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            [fieldName]: checked
        }));
        console.log(checked)
    }
    async function updateStoreCurrent(testPaper: number) {
        const res = await getById(testPaper)
        console.log('取得MCQ', res)
        if (res) dispatch(setCurrentMCQQuestion({ ...res }))
    }
    function resetCreateMCQQuestionForm() {
        setMCQQuestionFormData({
            ...{
                question: '',
                solutions: [],
                tags: [],
                share: true,
                options: []
            }
        })
    }
    return {
        //data
        MCQs,
        currentMCQQuestion,
        MCQQuestionFormData,
        //methods
        create,
        getAll,
        getById,
        deleteById,
        updateStoreCurrent,
        onCreateMCQQuestionDataChange,
        onSwitchChange
    }

}


