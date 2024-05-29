import useVocabularyApi from '../vocabulary/useVocabularyApi'
import { useDispatch } from "react-redux"
import { setVocabularys } from "../../store/vocabularySlice"
import { useAppSelector } from '../../store/hooks'
import { CreateExampleRequest, CreateSentenceRequest, CreateVocabularyRequest, Vocabulary } from '../../types/vocabulary'

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
        console.log(vocabularyFormData)
        const vocabulary = await createVocabularyRequest(vocabularyFormData)
        dispatch(setVocabularys([...vocabularys, vocabulary]))
        await createVocabularyExampleAndSentence(vocabulary.id)
    }
    async function createVocabularyExampleAndSentence(vocabularyId: number){
        const example = await createExampleRequest(vocabularyId, exampleFormData)
        const sentence = await createSentenceRequest(example.id,vocabularyId, sentenceFormData)
    }
    async function getExamplesAndStences(vocabularyId:number){
        return await getExampsAndStencesRequest({vocabularyId})
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
        vocabularyFormData,
        exampleFormData,
        sentenceFormData,
        //methods
        createVocabulary,
        getAllVocabulary,
        getExamplesAndStences,
        onCreateVocabularyDataChange,
        onCreateExampleDataChange,
        onCreateSentenceDataChange,
    }
}


