import{s as c,j as a,L as m}from"./index-f8089f2f.js";import{u as g,a as i,L as h}from"./useGetAllProducts-7d270e15.js";import{P as f}from"./ProductCard-03819617.js";import{T as x}from"./index.esm-8c4cd462.js";import"./index.esm-958adbda.js";import"./useToggle-14269814.js";const j=new Set(["smartphones","laptops","watches","vehicles","lighting"]),y=r=>{const{allProductsArray:t,isError:n,isLoading:o}=g();if(!r||!j.has(r))throw new Error("Category not found!");const l={[r]:t.filter(s=>(s==null?void 0:s.category)===r),vehicles:[...t.filter(s=>(s==null?void 0:s.category)==="motorcycle"),...t.filter(s=>(s==null?void 0:s.category)==="automotive")],watches:[...t.filter(s=>(s==null?void 0:s.category)==="mens-watches"),...t.filter(s=>(s==null?void 0:s.category)==="womens-watches")]}[r];return{isLoading:o,isError:n,productsArray:i(l)}};function N(){const{category:r}=c(),{productsArray:t,isLoading:n}=y(r);if(n)return a.jsx(h,{count:r==="watches"||r==="vehicles"?10:5});const o=t.map(e=>a.jsx(f,{to:`/products/${e==null?void 0:e.category}/${e==null?void 0:e.id}`,image:(e==null?void 0:e.images[1])??"",productItem:i(e)},e==null?void 0:e.id));return a.jsxs("section",{className:"mt-[3rem] lg:mt-[5rem]",children:[a.jsxs("header",{className:"flex items-center justify-center",children:[a.jsx("button",{className:"ml-[3rem] text-[3rem]",children:a.jsx(m,{to:"/",children:a.jsx(x,{})})}),a.jsx("h1",{className:"mx-auto text-center text-[3rem] font-[700] capitalize lg:text-[4rem]",children:r==="lighting"?"Digital Lighting":r})]}),a.jsx("article",{className:"mt-[4rem] px-[3rem]",children:a.jsx("ul",{className:"grid grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center gap-[5rem_2rem]",children:o})})]})}export{N as default};
