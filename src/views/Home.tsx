import useAuth from '../hooks/auth/useAuth'
import useUser from '../hooks/user/useUser'
import useVocabulary from '../hooks/vocabulary/useVocabulary'
function Home() {
    const { getAllUser } = useUser()
    const { refreshAccessToken } = useAuth()
    const { vocabularys, vocabularyFormData, exampleFormData, sentenceFormData, createVocabulary, onCreateVocabularyDataChange, onCreateExampleDataChange, onCreateSentenceDataChange } = useVocabulary()
    
    return (
        <div className=''>
            <h1>歡迎來到單字救星</h1>
            <header className="">
                <button onClick={getAllUser}>取得所有玩家列表</button>
                <button onClick={refreshAccessToken}>取得新Token</button>
            </header>
            <section>
                
            </section>
            <button onClick={createVocabulary}>新增單字</button>
            <section>
                <input type="text" name="spelling" value={vocabularyFormData?.spelling} onChange={onCreateVocabularyDataChange} placeholder='請輸入英文單字'/>
                <input type="text" name="pronunciation" value={vocabularyFormData?.pronunciation} onChange={onCreateVocabularyDataChange} placeholder='請輸入發音'/>
                <input type="text" name="definition" value={exampleFormData.definition} onChange={onCreateExampleDataChange} placeholder='請輸入單字解釋'/>
                <input type="text" name="en" value={sentenceFormData?.en} onChange={onCreateSentenceDataChange} placeholder='請輸入單字的例句英文'/>
                <input type="text" name="zh" value={sentenceFormData?.zh} onChange={onCreateSentenceDataChange} placeholder='請輸入單字的例句中文'/>
            </section>
            {
            vocabularys.map((v)=>{
                return (
                    <p>
                        {v.spelling} { v.pronunciation}
                    </p>
                )
            })
            }
        </div>
    )
}
export default Home