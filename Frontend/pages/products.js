import React from 'react';
import Link from 'next/link'
const Products = (props) => {
  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">PRODUCTS LIST</h1>
              <div className="h-1 w-20 bg-pink-800 rounded"></div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {props.products.data.map((item, index) => (
              <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img className="h-70 rounded m-auto mb-8" src={item.attributes.Image.data && item.attributes.Image.data.attributes.name} alt="content"/>
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{item.attributes.category}</h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item.attributes.Title}</h2>
                  <div className={`bg-${item.attributes.color}-800 w-6 h-6 rounded-full`}></div>
                  <p className="leading-relaxed text-base">{item.attributes.Description}</p>
                  <Link href={'/product/${item.attributes.slug}'}><button className="my-2 text-white bg-pink-800 border-0 py-2 px-4 focus:outline-none hover:bg-pink-800 rounded text-sm">Buy Now</button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  let headers ={Authorization: "Bearer edbf08c3f54ebbd3e2c5ff50cd6853a0dd4c929b7c29f92a4768ef9668f3aa14871d6c70130fe80240b8616b7e8234b8da0c8afaf3d0e5a1f662c27845d98e5a1de935e58ee83ee5066df2e3f91556bc7f4e9bbfa61c7145bc31a941ad99026c8f436967fbc3ba955057892bf2f2dec3ab44b9dfdf9e5ce9d9a64aace2fca1bf"};
  let a = await fetch("http://localhost:1337/api/products?populate=*", {headers: headers});
  let products = await a.json();
  console.log(products);
  return { 
    props: { products: products },
  };
}

export default Products;
