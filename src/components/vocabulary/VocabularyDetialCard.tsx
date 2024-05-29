import { Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./Example"

interface Props {
    vocabulary: Vocabulary | undefined
}
function VocabularyDetailCard({ vocabulary }: Props) {
    return (
        <div className='border-red-200 border-2 p-5'>
            <div>
                <p>{vocabulary?.spelling} {vocabulary?.pronunciation}</p>
                <ul>
                    {
                        vocabulary?.examples.map((example,index) => {
                            return (
                                <div>
                                    <span>{index+1}</span>
                                    <ExampleCard example={example} />
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