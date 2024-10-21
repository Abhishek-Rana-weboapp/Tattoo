import { useRef } from "react"
import Loader from "../loader/Loader"
import { useTranslation } from "react-i18next"

const UploadButton = ({children,disabled, handleInput, accept}) => {
    const ref = useRef(null)
    const {t} = useTranslation()
    const handleUploadButton = ()=>{
        ref?.current?.click()
    }
  return (
    <>
    <input
          type="file"
          accept={accept}// Specify allowed file types
          ref={ref}
          multiple
          className="hidden"// Hide the input element
          onChange={handleInput}
        />
        <button
          className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
          onClick={handleUploadButton}
          disabled={disabled}
        >
          {disabled ? <Loader /> : t(children)}
        </button>
        </>
  )
}

export default UploadButton
