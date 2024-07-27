import useUser from "../../hooks/user/useUser"
import { MCQQuestion} from "../../types/MCQ"

interface Props {
    MCQQuestions: MCQQuestion[]
    
}
function MCQQuestionList({ MCQQuestions }: Props) {
    const { user } = useUser()
    return (
       <ul>
            {
                MCQQuestions.filter(question=>(question.share || question.user_id === user?.id)).map((question,index)=>{
                    return (
                        <li className="mb-2">
                            <div className="flex">
                                <span className="mr-1">{index+1}.</span>
                                <p>{question.question}</p>
                            </div>
                            <ul>
                                {
                                    question.options.map((option,index)=>{
                                        return (
                                            <li className="flex items-center">
                                                <span className="mr-1">({index+1})</span>
                                                <p className="mr-1">{option.content}</p>
                                                {
                                                    option.is_answer?<p className="text-rose-500 text-xs">正解</p>:''
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                    )
                })
            }
       </ul>
    )
}
export default MCQQuestionList