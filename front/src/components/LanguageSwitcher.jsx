import { useTranslation } from 'react-i18next'

const lngs = {
  en: { nativeName: 'English' },
  fr: { nativeName: 'Français' },
}

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  return (
    <div>
    {Object.keys(lngs).map((lng) => (
      <button
        type="submit"
        key={lng}
        onClick={() => i18n.changeLanguage(lng)}
        disabled={i18n.resolvedLanguage === lng}>
        {lngs[lng].nativeName}
      </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
