import { useTranslation } from 'react-i18next'

const TranslationWrapper = ({text}) => {
    const {t} = useTranslation()
  return (
    <span>
        {t(text)}
    </span>
  )
}
export default TranslationWrapper
