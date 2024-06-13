import useVocabularyApi from '../vocabulary/useVocabularyApi'
import { useDispatch } from "react-redux"
import { setCurrentVocabulary, setVocabularys } from "../../store/vocabularySlice"
import { useAppSelector } from '../../store/hooks'
import { CreateExampleRequest, CreateSentenceRequest, CreateVocabularyRequest, Example, Vocabulary } from '../../types/vocabulary'
import useNote from '../note/useNote'
import { setCurrentNote } from '../../store/noteSlice'

export default function useVocabulary() {
    const dispatch = useDispatch()
    const {
        getExampsAndStencesRequest,
        getAllVocabularyRequest,
        getAllVocabularyIncludeExampleRequest,
        getAllVocabularyIncludeAllRelationshipRequest,
        createVocabularyRequest,
        createVocabularyFromNoteRequest,
        createExampleRequest,
        createSentenceRequest,
        deleteVocabularyRequest,
        deleteExampleRequest,
        deleteSentenceRequest
    } = useVocabularyApi()
    const vocabularys = useAppSelector((state) => state.vocabulary.vocabularys)
    const currentVocabulary = useAppSelector((state) => state.vocabulary.currentVocabulary)
    const [vocabularyFormData, setVocabularyFormData] = useState<CreateVocabularyRequest>({
        spelling: '',
        pronunciation: ''
    })
    const [exampleFormData, setExampleFormData] = useState<CreateExampleRequest>({
        definition: ''
    })
    const [sentenceFormData, setSentenceFormData] = useState<CreateSentenceRequest>({
        en: '',
        zh: ''
    })

    async function getAllVocabulary() {
        const vocabularys = await getAllVocabularyRequest()
        if (vocabularys) dispatch(setVocabularys([...vocabularys]))
    }
    async function getAllVocabularyIncludeExample() {
        const vocabularys = await getAllVocabularyIncludeExampleRequest()
        if (vocabularys) dispatch(setVocabularys([...vocabularys]))
    }
    async function getAllVocabularyIncludeAllRelationship() {
        const vocabularys = await getAllVocabularyIncludeAllRelationshipRequest()
        console.log(vocabularys)
        if (vocabularys) dispatch(setVocabularys([...vocabularys]))
    }
    async function createVocabulary(noteId?: number) {
        if (!vocabularyFormData.spelling) return alert('請填寫單字!!!')
        if (!exampleFormData.definition) return alert('請填寫解釋!')
        let vocabulary:Vocabulary | undefined
        if(noteId) vocabulary = await createVocabularyFromNoteRequest({ ...vocabularyFormData, noteId })
        else vocabulary = await createVocabularyRequest(vocabularyFormData) 
        if (!vocabulary) return console.log('建立單字失敗!')
        dispatch(setVocabularys([...vocabularys, vocabulary])) //推到共用的地方去 
        const example = await createExample(vocabulary.id)
        if (!example) return console.log('example創建出了問題')
        if (!sentenceFormData.en) return console.log('沒有填寫句子，不建立句子')
        const stence = await createStence(example.id, vocabulary.id)
        if (!stence) return console.log('建立句子失敗')
        resetCreateFormData()
        return vocabulary
    }
    async function createExample(vocabularyId: number) {
        return await createExampleRequest(vocabularyId, exampleFormData)
    }
    async function createStence(exampleId: number, vocabularyId: number) {
        return await createSentenceRequest(exampleId, vocabularyId, sentenceFormData)
    }

    async function getVocabularyIncludeExamplesAndStences(vocabularyId: number) {
        return await getExampsAndStencesRequest({ vocabularyId })
    }
    async function deleteVocabulary(vocabularyId: number) {
        const deleteObject = await deleteVocabularyRequest(vocabularyId)
        if (!deleteObject) return null
        return deleteObject
    }
    function updateStoreVocabularys(deleteObject: Vocabulary) {
        const newVocabularyList = vocabularys.filter(v => v.id !== deleteObject.id)
        dispatch(setVocabularys([...newVocabularyList]))
    }
    async function deleteExample(exampleId: number) {
        await deleteExampleRequest(exampleId)
    }
    async function deleteSentence(sentenceId: number) {
        await deleteSentenceRequest(sentenceId)
        updateCurrentVocabulary()
    }
    async function updateCurrentVocabulary() {
        if (!currentVocabulary) return console.log('currentVocabulary丟失')
        const vocabulary = await getVocabularyIncludeExamplesAndStences(currentVocabulary?.id)
        if (vocabulary) dispatch(setCurrentVocabulary(vocabulary))
    }
    function onCreateVocabularyDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setVocabularyFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    function onCreateExampleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setExampleFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    function onCreateSentenceDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setSentenceFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    function resetCreateFormData() {
        setVocabularyFormData({...{spelling: '', pronunciation: ''}})
        setExampleFormData({...{definition: ''}})
        setSentenceFormData({...{en:'', zh:''}})
    }
    return {
        //data
        vocabularys,
        currentVocabulary,
        vocabularyFormData,
        exampleFormData,
        sentenceFormData,
        //methods
        createVocabulary,
        createExample,
        createStence,
        getAllVocabulary,
        getAllVocabularyIncludeExample,
        getAllVocabularyIncludeAllRelationship,
        getVocabularyIncludeExamplesAndStences,
        deleteVocabulary,
        deleteExample,
        deleteSentence,
        onCreateVocabularyDataChange,
        onCreateExampleDataChange,
        onCreateSentenceDataChange,
        updateCurrentVocabulary,
        updateStoreVocabularys
    }
}


