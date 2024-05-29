import { Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./ExampleCard"
import ExampleCreateForm from "./ExampleCreateForm"

interface Props {
    vocabulary: Vocabulary | undefined
}
function VocabularyDetailCard({ vocabulary }: Props) {
    const [openCreateExampleForm, setOpenCreateExampleForm] = useState(false)
    return (
        <div className='border-red-200 border-2 p-5'>
            <div>
                <p>{vocabulary?.spelling} {vocabulary?.pronunciation}</p>
                <button className="border-2 border-green-500" onClick={()=>setOpenCreateExampleForm(!openCreateExampleForm)}>+添加解釋</button>
                {
                    (openCreateExampleForm && vocabulary?.id) && 
                    <ExampleCreateForm vocabularyId={vocabulary?.id} onSuccess={()=>setOpenCreateExampleForm(false)}/>
                }
                <ul>
                    {
                        vocabulary?.examples.map((example,index) => {
                            return (
                                <div key={example.id}>
                                    <span>{index+1}</span>
                                    <ExampleCard withCreateForm={true} vocabularyId={vocabulary.id} example={example} />
                                </div>
                            )
                        })
                    }
                </ul>
            </div> 
        </div>
    )
}
export default VocabularyDetailCard