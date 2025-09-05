import React from 'react'
import Image from "next/image";
const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-[#F3EFEA] font-body px-6">
    {/* Icono */}
    <div className=" mb-6 flex flex-col items-center justify-center gap-9 ">
    <Image
        src="/assets/hero-image.png"
        alt="Logo Hibou"
        width={500}
        height={500}
        priority
      />
  
    </div>

    {/* Título */}
    <h1 className="text-4xl md:text-6xl font-bold text-[#5C4B6C] mb-4">
      L’Odyssée du Hibou
    </h1>

    {/* Subtítulo */}
    <p className="text-lg md:text-xl text-[#4B2E4B] max-w-2xl">
    J’accompagne avec bienveillance et amour l’Humain en métamorphose. 
    </p>

    {/* Botón */}
    <a
      href="#tirages"
      className="mt-8 px-6 py-3 bg-[#5C4B6C] text-white rounded-full shadow-lg hover:bg-[#A57C8C] transition-colors duration-300"
    >
      Découvrir les tirages
    </a>
  </section>
  )
}

export default HeroSection