import{a as l,j as s,b as m,P as n,c as t,d as x}from"./index-lIOFo7X1.js";import{T as j}from"./index.esm-gP9kqLDb.js";function g(){const{isPending:a,allProductsArray:r}=l();if(a)return s.jsx(m,{count:10});const i=r.map(e=>s.jsx(n,{link:`${e==null?void 0:e.category}/${e==null?void 0:e.id}`,image:(e==null?void 0:e.images[1])??"",productItem:t(e)},e==null?void 0:e.id));return s.jsxs("section",{className:"mt-[3rem]",children:[s.jsxs("header",{className:"flex flex-row-reverse items-center justify-center px-[3rem]",children:[s.jsx("h1",{className:"mx-auto text-[3rem] font-[700] lg:text-[4rem]",children:"All Products"}),s.jsx("button",{className:"text-[3rem]",children:s.jsx(x,{to:"/",children:s.jsx(j,{})})})]}),s.jsx("article",{className:"mt-[8rem] px-[3rem]",children:s.jsx("ul",{className:"grid grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center gap-[5rem_2rem]",children:i})})]})}export{g as default};
