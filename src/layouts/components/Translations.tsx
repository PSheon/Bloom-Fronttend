// ** Third-Party Imports
import { useTranslation } from 'react-i18next'

interface Props {
  text: string
}

const Translations = ({ text }: Props) => {
  // ** Hooks
  const { t } = useTranslation()

  return <>{`${t(text)}`}</>
}

export default Translations
