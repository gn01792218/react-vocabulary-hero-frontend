import useMCQ from "../../hooks/MCQ/useMCQ"
import useUser from "../../hooks/user/useUser"
import { MCQQuestion, MCQQuestionOption } from "../../types/MCQ"

function UserMCQQuestionList() {
    const { user } = useUser()
    const { getAll, deleteById, MCQs } = useMCQ()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        if (!MCQs.length) await getAll()
    }

    return (
        <section>
            <p className="text-green-500">--------------公開的試題-------------</p>
            <ul>
                {
                    MCQs.filter((question: MCQQuestion) => ((question?.user_id === user?.id) && question.share)).map((question: MCQQuestion, index: number) => {
                        return (
                            <li className="mb-2 flex items-start justify-between" key={question?.id}>
                                <div>
                                    <div className="flex">
                                        <span className="mr-1">{index + 1}.</span>
                                        <p>{question.question}</p>
                                    </div>
                                    <ul>
                                        {
                                            question.options?.map((option: MCQQuestionOption, index: number) => {
                                                return (
                                                    <li className="flex items-center" key={option.id}>
                                                        <span className="mr-1">({index + 1})</span>
                                                        <p className="mr-1">{option.content}</p>
                                                        {
                                                            option.is_answer ? <p className="text-rose-500 text-xs">正解</p> : ''
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <button className="text-red-500" onClick={() => deleteById(question?.id)}>-刪除此題</button>
                            </li>
                        )
                    })
                }
            </ul>
            <p className="mt-2 text-gray-400">-------------未公開的試題-------------</p>
               <ul>
                {
                    MCQs.filter((question: MCQQuestion) => ((question?.user_id === user?.id) && !question.share)).map((question: MCQQuestion, index: number) => {
                        return (
                            <li className="mb-2 flex items-start justify-between" key={question?.id}>
                                <div>
                                    <div className="flex">
                                        <span className="mr-1">{index + 1}.</span>
                                        <p>{question.question}</p>
                                    </div>
                                    <ul>
                                        {
                                            question.options?.map((option: MCQQuestionOption, index: number) => {
                                                return (
                                                    <li className="flex items-center" key={option.id}>
                                                        <span className="mr-1">({index + 1})</span>
                                                        <p className="mr-1">{option.content}</p>
                                                        {
                                                            option.is_answer ? <p className="text-rose-500 text-xs">正解</p> : ''
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <button className="text-red-500" onClick={() => deleteById(question?.id)}>-刪除此題</button>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}
export default UserMCQQuestionList