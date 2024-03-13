import React from 'react'

const VerifyMedicalHistory = ({question, questionType, ans, type}) => {
   
    const splitID = type === "sub" ? question.id.toString().split("").join(".") : question.id

  return (
    <>
{/*  here ans received in props is the ans object that corresponds to the question id in the medical history of the client */}
{
    questionType === "YN" && <div className='flex flex-col text-white'>
    <label className={`font-semibold ${type === "sub" && "ml-16"}`}>Q{splitID}: {question.q}</label>
    <label className={`capitalize ${type === "sub" ? "ml-28" : "ml-8"}`}>{ans.ans}</label>
    </div>     
}

{
    questionType === "E" && <div className='flex flex-col text-white'>
    <label className={`font-semibold ${type === "sub" && "ml-10"}`}>Q{splitID}: {question.q}</label>
    <label className={`capitalize ${type === "sub" ? "ml-28" : "ml-8"}`}>{ans.ans}</label>
    </div>     
}

{
    questionType === "NUM" && <div className='flex flex-col text-white'>
    <label className={`font-semibold ${type === "sub" && "ml-16"}`}>Q{splitID}: {question.q}</label>
    <label className={`capitalize ${type === "sub" ? "ml-28" : "ml-8"}`}>{ans.ans}</label>
    </div>     
}

{
    questionType === "YNE" && <div className='flex flex-col text-white'>
    <label className={`font-semibold ${type === "sub" && "ml-16"}`}>Q{splitID}: {question.q}</label>
    <label className={`capitalize ${type === "sub" ? "ml-28" : "ml-8"}`}>{ans.ans}{ans.ans === "yes" ? `, ${ans.explanation}` : ""}</label>
    </div>     
}

{
    questionType === "YNO" && <div className='flex flex-col text-white'>
    <label className={`font-semibold ${type === "sub" && "ml-16"}`}>Q{splitID}:{question.q}</label>
    <label className={`capitalize ${type === "sub" ? "ml-28" : "ml-8"}`}>{ans.ans} {ans.ans === "yes" ? `, ${ans.opt}` : ""}</label>
    </div>     
}

{
    questionType === "YNS" && <div className='flex flex-col text-white'>
            <label className={`font-semibold ${type === "sub" && "ml-16"}`}>Q{splitID}: {question.q}</label>
            <label className={`${type === "sub" ? "ml-28" : "ml-8"}`}>{ans?.ans}</label>
           {
            ans?.ans === "yes" && question.sq.map(question=>{
                console.log("check:" ,ans.sub[question.id])
                return <VerifyMedicalHistory question={question} questionType={questionType} ans={ans.sub[question.id]} type="sub" />
            })
           }
    </div>     
}

    </>
  )
}

export default VerifyMedicalHistory
