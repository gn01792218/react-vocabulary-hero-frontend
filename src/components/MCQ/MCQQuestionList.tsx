import useUser from "../../hooks/user/useUser"
import { MCQQuestion } from "../../types/MCQ"

interface Props {
    MCQQuestions: MCQQuestion[]
    showAllAnswer?: boolean
    showAllSolution?: boolean
}
function MCQQuestionList({ MCQQuestions, showAllAnswer, showAllSolution }: Props) {
    const { user } = useUser()
    return (
        <ul>
            {
                MCQQuestions.filter(question => (question.share || question.user_id === user?.id)).map((question, index) => {
                    return (
                        <li className="mb-2" key={question.id}>
                            <div className="flex">
                                <span className="mr-1">{index + 1}.</span>
                                <p>{question.question}</p>
                            </div>
                            <ul>
                                {
                                    question.options?.map((option, index) => {
                                        return (
                                            <li className="flex items-center" key={option.id}>
                                                <span className="mr-1">({index + 1})</span>
                                                <p className="mr-1">{option.content}</p>
                                                {
                                                    option.is_answer && showAllAnswer ? <p className="text-rose-500 text-xs">正解</p> : ''
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {
                                showAllSolution &&
                                <section className="bg-pink-300">
                                    <p>解析 : </p>
                                    <ul>
                                        {
                                            question.solutions.map(solution => {
                                                return (
                                                    <li>
                                                        <p>{solution}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </section>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default MCQQuestionList