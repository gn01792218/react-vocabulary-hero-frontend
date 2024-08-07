
import { useDispatch } from "react-redux"
import { useAppSelector } from '../../store/hooks'
import { MCQQuestionCreateRequestForm } from '../../types/MCQ'
import { TestPaper, TestPaperMCQsUpdateRequest } from "../../types/testPaper"
import useMCQApi from "./useMCQApi"
import useUser from "../user/useUser"
import useTestPaper from "../testPaper/useTestPaper"
import useTestPaperApi from "../testPaper/useTestPaperApi"
import { setCurrentMCQQuestion, setMCQs } from "../../store/MCQSlice"
import { setCurrentTestPaper } from "../../store/testPaperSlice"

export default function useMCQ() {
    const dispatch = useDispatch()
    const { user } = useUser()
    const {
        currentTestPaper
    } = useTestPaper()
    const {
        updateTestPaperMCQs
    } = useTestPaperApi()
    const {
        createRequest,
        getAllRequest,
        getUserAllRequest,
        getByIdRequest,
        deleteRequest,
        updateRequest,
    } = useMCQApi()
    const MCQQuestionOptionsInitNumber = 4
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
    async function getUserAll() {
        return await getUserAllRequest()
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
        if (!res) return alert('請求發生錯誤')
        if (!currentTestPaper) return alert('內部資料錯誤 : 找不到currentTestPaper')
        dispatch(setMCQs([...MCQs, res])) //推到共用的地方去 
        dispatch(setCurrentTestPaper({
            ...currentTestPaper,
            MCQs: [...currentTestPaper.MCQs, res]
        }))
        resetCreateMCQQuestionForm()
    }
    async function deleteById(testPaperId: number) {
        const deleteObject = await deleteRequest(testPaperId)
        if (deleteObject) dispatch(setMCQs([...MCQs.filter(n => n.id !== deleteObject.id)]))
    }
    async function addMCQQuestionToTestPaper(testPaper: TestPaper, payload: TestPaperMCQsUpdateRequest) {
        payload.ids = pushNewIdListToOriginList(testPaper, payload.ids)
        const updateData = await updateTestPaperMCQs(testPaper.id, payload)
        if (updateData) dispatch(setCurrentTestPaper(updateData))
    }
    function onCreateMCQQuestionDataChange(e: React.ChangeEvent<HTMLInputElement | HTMLButtonElement>) {
        const { name, value } = e.target;
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    function onMCQQuestionFormDataSolutionsChange(
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const { value } = e.target;
        MCQQuestionFormData.solutions[index] = value
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            solutions: [...MCQQuestionFormData.solutions]
        }));
    }
    function onMCQQuestionFormDataTagsChange(
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const { value } = e.target;
        MCQQuestionFormData.tags[index] = value
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            tags: [...MCQQuestionFormData.tags]
        }));
    }
    function onSwitchChange(fieldName: string, checked: boolean) {
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            [fieldName]: checked
        }));
    }
    async function updateStoreCurrent(testPaper: number) {
        const res = await getById(testPaper)
        if (res) dispatch(setCurrentMCQQuestion({ ...res }))
    }
    function resetCreateMCQQuestionForm() {
        MCQQuestionFormData.options.length = 0 //先讓選項歸0
        initMCQoptions()
        setMCQQuestionFormData({
            ...{
                question: '',
                solutions: [],
                tags: [],
                share: true,
                options: MCQQuestionFormData.options
            }
        })
    }
    function addSolutionForm() {
        MCQQuestionFormData.solutions.push("")
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            solutions: [...MCQQuestionFormData.solutions]
        }));
    }
    function removeSolution(index: number) {
        MCQQuestionFormData.solutions.splice(index, 1)
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            solutions: [...MCQQuestionFormData.solutions]
        }));
    }
    function addTagsForm() {
        MCQQuestionFormData.tags.push("")
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            tags: [...MCQQuestionFormData.tags]
        }));
    }
    function removeTags(index: number) {
        MCQQuestionFormData.tags.splice(index, 1)
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            tags: [...MCQQuestionFormData.tags]
        }));
    }
    function addOptionForm() {
        MCQQuestionFormData.options.push({ content: "", is_answer: false })
        setMCQQuestionFormData(prevState => ({ ...prevState, options: [...MCQQuestionFormData.options] }))
    }
    function removeOption(index: number) {
        MCQQuestionFormData.options.splice(index, 1)
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            tags: [...MCQQuestionFormData.tags]
        }));
    }
    function onMCQQuestionOptionContentChange(
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const { value } = e.target;
        MCQQuestionFormData.options[index].content = value
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            options: [...MCQQuestionFormData.options]
        }));
    }
    function onMCCQQuestionOptionIsAnswerSwitchChange(index: number, checked: boolean) {
        MCQQuestionFormData.options[index].is_answer = checked
        setMCQQuestionFormData(prevState => ({
            ...prevState,
            options: [...MCQQuestionFormData.options]
        }));
    }
    function pushNewIdListToOriginList(targetObject: TestPaper, payload: number[]) {
        const originVocabularyIdList = targetObject.MCQs.map(v => v.id)
        originVocabularyIdList.push(...payload)
        return originVocabularyIdList
    }
    function initMCQoptions() {
        //添加四個題目選項input
        for (let i = 0; i < MCQQuestionOptionsInitNumber; i++) {
            MCQQuestionFormData.options.push({ content: "", is_answer: false })
        }
    }
    return {
        //data
        MCQs,
        currentMCQQuestion,
        MCQQuestionFormData,
        //methods
        create,
        getAll,
        getUserAll,
        getById,
        deleteById,
        addMCQQuestionToTestPaper,
        updateStoreCurrent,
        onCreateMCQQuestionDataChange,
        onMCQQuestionFormDataSolutionsChange,
        onMCQQuestionFormDataTagsChange,
        onMCQQuestionOptionContentChange,
        onSwitchChange,
        onMCCQQuestionOptionIsAnswerSwitchChange,
        addSolutionForm,
        removeSolution,
        addTagsForm,
        removeTags,
        addOptionForm,
        removeOption,
        initMCQoptions,
        setMCQQuestionFormData
    }

}


