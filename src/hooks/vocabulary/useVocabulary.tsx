import useVocabularyApi from '../vocabulary/useVocabularyApi'
import { useDispatch } from "react-redux"
import { setCurrentVocabulary, setVocabularys } from "../../store/vocabularySlice"
import { useAppSelector } from '../../store/hooks'
import { CreateExampleRequest, CreateSentenceRequest, CreateVocabularyRequest, Example, Vocabulary } from '../../types/vocabulary'
import { setEnvironmentData } from 'worker_threads'

export default function useVocabulary() {
    const dispatch = useDispatch()
    const { 
        getExampsAndStencesRequest,
        getAllVocabularyRequest, 
        createVocabularyRequest, 
        createExampleRequest, 
        createSentenceRequest 
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
        dispatch(setVocabularys(vocabularys))
    }
    async function createVocabulary() {
        if(!vocabularyFormData.spelling) return alert('請填寫單字!!!')
        if(!exampleFormData.definition) return alert('請填寫解釋!')
        const vocabulary = await createVocabularyRequest(vocabularyFormData)
        dispatch(setVocabularys([...vocabularys, vocabulary])) //推到共用的地方去 
        const example = await createVocabularyExample(vocabulary.id)
        if(!sentenceFormData.en) return console.log('沒有填寫句子，不建立句子')
        createExampleStence(example.id, vocabulary.id)
    }
    async function createVocabularyExample(vocabularyId: number){
        return await createExampleRequest(vocabularyId, exampleFormData)
    }
    async function createExampleStence(exampleId: number, vocabularyId: number) {
        return await createSentenceRequest(exampleId, vocabularyId, sentenceFormData)
    }

    async function getVocabularyIncludeExamplesAndStences(vocabularyId:number){
        return await getExampsAndStencesRequest({vocabularyId})
    }
    async function updateCurrentVocabulary(){
        if(!currentVocabulary) return console.log('currentVocabulary丟失')
        const vocabulary = await getVocabularyIncludeExamplesAndStences(currentVocabulary?.id)
        dispatch(setCurrentVocabulary(vocabulary))
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
    return {
        //data
        vocabularys,
        currentVocabulary,
        vocabularyFormData,
        exampleFormData,
        sentenceFormData,
        //methods
        createVocabulary,
        createVocabularyExample,
        createExampleStence,
        getAllVocabulary,
        getExamplesAndStences: getVocabularyIncludeExamplesAndStences,
        onCreateVocabularyDataChange,
        onCreateExampleDataChange,
        onCreateSentenceDataChange,
        updateCurrentVocabulary
    }
}


