import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
            login: 'Log in',
            login_loading: 'Logging in...',
            login_success_toast: 'Login successful! 🎉',
            login_fail_toast: 'Login failed',
            register: 'Sign up',
            register_loading: 'Signing up...',
            register_success_toast: 'User created successfully! 🎉',
            register_fail_toast: 'Sign up failed',
            invalid_response: 'Network error or invalid response',
            username: 'Username',
            email: 'Email address',
            password: 'Password',
            password_confirm: 'Confirm password',
        }
      },
      fr: {
        translation: {
            login: 'Me connecter',
            login_loading: 'Connexion...',
            login_success_toast: 'Connexion réussi! 🎉',
            login_fail_toast: 'Connexion échouée',
            register: 'Créer mon compte',
            register_loading: 'Création...',
            register_success_toast: 'Utilisateur créé! 🎉',
            register_fail_toast: 'Création de compte échouée',
            invalid_response: 'Problème de connectivité ou réponse invalide',
            username: 'Nom d\'utilisateur',
            email: 'Adresse email',
            password: 'Mot de passe',
            password_confirm: 'Confirmer le mot de passe',
        }
      },
    },
  })