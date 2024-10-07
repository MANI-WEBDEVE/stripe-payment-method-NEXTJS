"use client";
import Card from "@/app/components/Card";
import productStore from "@/api/productStore.json";

export default function Home() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -mb-10 text-center">
            {productStore.map((cur, index) => (
              <Card data={cur} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
