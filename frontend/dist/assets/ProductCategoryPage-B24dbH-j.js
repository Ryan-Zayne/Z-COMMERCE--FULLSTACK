import{a as o,b as c,q as g,j as r,P as h,c as m,I as x}from"./index-DRUeGeKh.js";import{L as f}from"./LoadingSkeleton-B0JlpqyN.js";const y=new Set(["smartphones","laptops","watches","vehicles","lighting"]),P=a=>{const{allProductsArray:t,isError:n,isPending:l}=o();if(!a||!y.has(a))throw new Error("Category not found!");const i=new Map([]).set(a,t.filter(e=>(e==null?void 0:e.category)===a)).set("vehicles",[...t.filter(e=>(e==null?void 0:e.category)==="motorcycle"),...t.filter(e=>(e==null?void 0:e.category)==="automotive")]).set("watches",[...t.filter(e=>(e==null?void 0:e.category)==="mens-watches"),...t.filter(e=>(e==null?void 0:e.category)==="womens-watches")]).get(a);return{isPending:l,isError:n,productsArray:c(i)}};function d(){const{category:a}=g(),{productsArray:t,isPending:n}=P(a);if(n)return r.jsx(f,{count:a==="watches"||a==="vehicles"?10:5});const l=t.map(s=>r.jsx(h,{link:`/products/${s==null?void 0:s.category}/${s==null?void 0:s.id}`,image:(s==null?void 0:s.images[1])??"",productItem:c(s)},s==null?void 0:s.id));return r.jsxs("section",{className:"mt-[3rem] lg:mt-[5rem]",children:[r.jsxs("header",{className:"flex items-center justify-center",children:[r.jsx("button",{className:"ml-[3rem] text-[3rem]",children:r.jsx(m,{to:"/",children:r.jsx(x,{icon:"typcn:arrow-back"})})}),r.jsx("h1",{className:"mx-auto text-center text-[3rem] font-[700] capitalize lg:text-[4rem]",children:a==="lighting"?"Digital Lighting":a})]}),r.jsx("article",{className:"mt-[4rem] px-[3rem]",children:r.jsx("ul",{className:`grid grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center\r
						gap-[5rem_2rem]`,children:l})})]})}export{d as default};
