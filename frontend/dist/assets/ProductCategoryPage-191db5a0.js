import{d as g,b as i,e as h,j as r,L as m}from"./index-6cc12db6.js";import{u as f,L as x}from"./useGetAllProducts-f6872e61.js";import{P as j}from"./ProductCard-80eb1ed6.js";import{T as u}from"./index.esm-d8024422.js";import"./useToggle-5855b515.js";const y={"/wishlist":"WishList page still under construction","/contact":"Contact page still under construction","/checkout":"Checkout page still under construction"},w=new Set(["smartphones","laptops","watches","vehicles","lighting"]),P=a=>{const n=g().pathname,{allProductsArray:t,isError:o,isLoading:e}=f();if(!a||!w.has(a))throw new Error(y[n]??"Category not found!");const c={[a]:t.filter(s=>(s==null?void 0:s.category)===a),vehicles:[...t.filter(s=>(s==null?void 0:s.category)==="motorcycle"),...t.filter(s=>(s==null?void 0:s.category)==="automotive")],watches:[...t.filter(s=>(s==null?void 0:s.category)==="mens-watches"),...t.filter(s=>(s==null?void 0:s.category)==="womens-watches")]},l=i(c[a]);return{isLoading:e,isError:o,productsArray:l}};function A(){const{category:a}=h(),{productsArray:n,isLoading:t}=P(a);if(t)return r.jsx(x,{count:a==="watches"||a==="vehicles"?10:5});const o=n.map(e=>r.jsx(j,{to:`/${e==null?void 0:e.category}/${e==null?void 0:e.id}`,image:(e==null?void 0:e.images[1])??"",product:i(e)},e==null?void 0:e.id));return r.jsxs("section",{className:"mt-[3rem] lg:mt-[5rem]",children:[r.jsxs("header",{className:"flex items-center justify-center",children:[r.jsx("button",{className:"ml-[3rem] text-[3rem]",children:r.jsx(m,{to:"/",children:r.jsx(u,{})})}),r.jsx("h1",{className:"mx-auto text-center text-[3rem] font-[700] capitalize lg:text-[4rem]",children:a==="lighting"?"Digital Lighting":a})]}),r.jsx("article",{className:"mt-[4rem] px-[3rem]",children:r.jsx("ul",{className:"grid grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center gap-[5rem_2rem]",children:o})})]})}export{A as default};
