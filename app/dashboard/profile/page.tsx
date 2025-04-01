import { UserRoundIcon } from "lucide-react";

export default function Profile() {
    return ( 
    <div className="scroll-styled flex flex-col gap-8 bg-black/30 backdrop-blur-md p-6 border border-conecta-azul text-white rounded-2xl shadow-2xl w-full max-h-[80vh] overflow-y-auto sm:w-2/3 max-w-2xl mx-4 sm:mx-0">
      <div className="flex justify-start items-center bg-conecta-azul p-4 rounded-2xl">
        <h2 className="text-3xl font-thin">Meu Perfil</h2>
      </div>
      <div className="flex gap-4 justify-start items-center bg-black/10 backdrop-blur-md p-4 rounded-2xl">
        <UserRoundIcon 
        className="flex justify-self-center min-w-32 size-32 transition-all text-conecta-azul bg-cinza-2 border-4 border-conecta-azul rounded-full" />
      <div className="flex flex-col justify-center gap-2 items-center mt-4 w-full">
        <div className="flex gap-2 bg-conecta-azul text-2xl text-white font-normal p-2 rounded-lg w-full">
          <p>Nome:</p>
          <div className="flex bg-white text-xl justify-start items-center rounded-full text-black px-4 w-full">
          <p>Nome Sobrenome</p>
          </div>
        </div>
        <div className="flex gap-2 bg-conecta-azul text-2xl text-white font-normal p-2 rounded-lg w-full">
          <p>Email:</p>
          <div className="flex bg-white text-xl justify-start items-center rounded-full text-black px-4 w-full">
          <p>nomesobrenome@email.com</p>
          </div>
        </div>
        <div className="flex gap-2 bg-conecta-azul text-2xl text-white font-normal p-2 rounded-lg w-full">
          <p>Usuário:</p>
          <div className="flex bg-white text-xl justify-start items-center rounded-full text-black px-4 w-full">
          <p>Nomesobrenome</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
  }