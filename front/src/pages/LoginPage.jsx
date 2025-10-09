import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast';
import Input from "../components/Input"
import Button from "../components/Button"
import { useUser } from "../contexts/UserContext"
import { authenticate } from "../hooks/auth"

const LoginPage = () => {
  const { reset, register, handleSubmit } = useForm();
  const { setUserData } = useUser();
  const [loading, setLoading] = useState(false);
  const [wantsToLogin, setWantsToLogin] = useState(true);

  const onSubmit = async (formData) => {
    setLoading(true);
    const result = await authenticate(formData, wantsToLogin, setUserData);
    console.log(result)
    if (!result.success)
      toast.error(result.error);
    else
      toast.success(wantsToLogin ? 'Login successful! 🎉' : 'User created successfully! 🎉');
    setLoading(false);
  }

  return (
    <div className="h-full p-8">
      <div className="relative z-10 h-full flex justify-between items-center transition-all">
        <h1 className="text-7xl font-extrabold text-primary flex">
          <span className="-ml-1 -rotate-4">Z</span>
          <span className="-ml-1 mt-4 rotate-12">o</span>
          <span className="-ml-1 -rotate-5">m</span>
          <span className="-ml-1 rotate-13">b</span>
          <span className="-ml-1 mt-3 -rotate-8">i</span>
          <span className="-ml-1 rotate-10">c</span>
          <span className="-ml-1 -rotate-15">i</span>
          <span className="-ml-1 rotate-8">d</span>
          <span className="-ml-1 -rotate-9">e</span>
        </h1>
        {wantsToLogin ?
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-lg max-w-[40%] py-12 px-4 bg-primary rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold mb-4 ">Me connecter</h1>
            <Input label="Adresse email" type="email" placeholder="john.doe@example.com" required {...register("email")} />
            <Input label="Mot de passe" type="password" placeholder="password" required {...register("password")} />
            <div className="flex flex-col">
              <Button type="submit" disabled={loading}>{loading ? 'Connexion...' : 'Me connecter'}</Button>
              <button type="button" disabled={loading} className="text-xs text-start mt-1" onClick={() => { reset(); setWantsToLogin(old => !old) }}>Créer mon compte</button>
            </div>
          </form>
          :
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-lg max-w-[40%] py-12 px-4 bg-white rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold mb-4 ">Créer mon compte</h1>
            <Input label="Nom d'utilisateur" type="username" placeholder="John Doe" required {...register("name")} />
            <Input label="Adresse email" type="email" placeholder="john.doe@example.com" required {...register("email")} />
            <Input label="Mot de passe" type="password" placeholder="password" required {...register("password")} />
            <Input label="Répeter le mot de passe" type="password" placeholder="password" required {...register("passwordConfirm")} />
            <div className="flex flex-col">
              <Button type="submit" disabled={loading}>{loading ? 'Création...' : 'Créer mon compte'}</Button>
              <button type="button" disabled={loading} className="text-xs text-start mt-1" onClick={() => { reset(); setWantsToLogin(old => !old) }}>Me connecter</button>
            </div>
          </form>
        }
      </div>
      <img
        src="https://images.unsplash.com/photo-1679590060902-3556e64a676f?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute top-0 left-0 h-full w-screen object-cover"
      />
      <div className="bg-black opacity-50 absolute top-0 left-0 w-screen h-screen"></div>
    </div>
  )
}

export default LoginPage;
