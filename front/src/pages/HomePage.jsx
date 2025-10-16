import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Input from "../components/Input"
import { useAuth } from '../hooks/auth'

export default function HomePage() {
  const { reset, register, handleSubmit } = useForm()
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <form>
        <h1>Profile:</h1>
        <Input label={t('username')} type="username" placeholder={user.name} required {...register("name")} />
      </form>
    </div>
  )
}
