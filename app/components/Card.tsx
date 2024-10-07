"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
const Card = ({ data }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const checkOutButton = async () => {
        try {
            const resposne = await axios.post("/api/payment", {name:data.title, price:data.price})
            const valData = await resposne.data
            console.log({valData})

            window.location.href = valData.url
        } catch (error) {
            
        }
    }
  return (
    <div className="sm:w-1/2 mb-10 px-4">
      <div className="rounded-lg h-64 overflow-hidden">
        <Image
          alt="content"
          className="object-cover object-center h-full w-full"
          width={500}
          height={500}
          src={`${data.image}`}
        />
      </div>
      <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
        {data.title}
      </h2>
      <p className="leading-relaxed text-base">{data.description}</p>
      <button onClick={checkOutButton} className="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
       {isLoading ? "Loading": <span>pay:{data.price}</span>} 
      </button>
    </div>
  );
};
export default Card;
