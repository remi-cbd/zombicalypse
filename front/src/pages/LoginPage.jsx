import { useForm } from "react-hook-form"
import Input from "../components/Input"
import Button from "../components/Button"
import { useState } from "react"

const LoginPage = () => {
  const [wantsToLogin, setWantsToLogin] = useState(true)
  const { register, handleSubmit } = useForm()

  const onSubmit = (e) => {
    const URL = wantsToLogin ? "/auth/login" : "/auth/register"
    console.log(e)
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-lg max-w-[40%] py-12 px-4 bg-white rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold mb-4 ">{wantsToLogin ? "Me connecter" : "Créer mon compte"}</h1>
          <Input label="Adresse email" type="email" placeholder="john.doe@example.com" {...register("email")} />
          <Input label="Mot de passe" type="password" placeholder="p@ssw0rd" {...register("password")} />
          {!wantsToLogin && <Input label="Répeter le mot de passe" type="passwordConfirm" placeholder="p@ssw0rd" {...register("password")} />}
          <div className="flex flex-col">
            <Button type="submit">{wantsToLogin ? "Me connecter" : "Créer mon compte"}</Button>
            <button className="text-xs text-start mt-1" onClick={() => setWantsToLogin(old => !old)}>{wantsToLogin ? "Créer mon compte" : "Me connecter"}</button>
          </div>
        </form>
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
