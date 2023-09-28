import{g as j,r as w,h as p,j as e,m as _,n as y,B as x,L as g,o as C,p as i,A as I,l as P,u as k,a as L,C as c,t as A,q as S,I as D,e as B,b as h,c as F}from"./index-6cc12db6.js";import{u as H,S as T,L as q}from"./useGetAllProducts-f6872e61.js";import{u as E}from"./useToggle-5855b515.js";import{T as M}from"./index.esm-d8024422.js";import{u}from"./useElementList-7c7083bf.js";const W=new Set([1,2,4,5,6,7,8,9,10,61,62,63,64,65,66,67,68,69,70,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]),O=s=>{const{isError:a,isLoading:t,allProductsArray:o}=H();if(!W.has(Number(s)))throw new Error("Product not found!");const r=o.find(m=>(m==null?void 0:m.id)===Number(s));return{isError:a,isLoading:t,productItem:r}};function Q({productItem:s}){const a=j(n=>n.cart).find(n=>n.id===s.id),[t,o]=w.useState((a==null?void 0:a.quantity)??0),{addToCart:r,decreaseProductQuantity:m,removeProductFromCart:l}=p(),d=s.stock-t,f=()=>{if(t<=s.stock){if(r(s),o(n=>n+1),t===0){i.dismiss("toastId-removed"),i.success("Product added successfully",{id:"toastId-added"});return}i.dismiss("toastId-added"),i.success("Item quantity has been updated",{id:"toastId-updated"})}},v=()=>{const n=N=>N-1;t>0&&(o(n),m(s),i.dismiss("toastId-added"),i.success("Item quantity has been updated",{id:"toastId-updated"})),n(t)===0&&(l(s),i.dismiss("toastId-added"),i.dismiss("toastId-updated"),i.success("Product was removed from cart",{id:"toastId-removed"}))},b=()=>{if(r(s),o(n=>n+1),t===0){i.success("Product added successfully");return}i.success("Item quantity has been updated",{id:"toastId"})};return e.jsxs("article",{className:"mt-[2.5rem] flex max-w-[46rem] flex-col max-md:mx-auto md:mt-0 lg:gap-[2rem] lg:pb-[0.5rem]",children:[e.jsxs("div",{className:"flex items-center justify-between lg:w-[90%]",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-[2.5rem] font-[600] lg:text-[3.4rem]",children:s.brand}),e.jsx(T,{className:"mt-[0.4rem] text-[1.6rem]",rating:s.rating,text:"reviews"})]}),e.jsxs("p",{className:"text-[2.3rem] font-[500] lg:text-[3rem]",children:[e.jsx("sup",{children:"$"}),s.price,e.jsx("sup",{children:".00"})]})]}),e.jsxs("div",{className:"mt-[2rem]",children:[e.jsx("h2",{className:"text-[2.5rem] font-[600] lg:text-[3.4rem]",children:"Description"}),e.jsx("p",{className:"mt-[0.4rem] text-[1.5rem] font-[300] lg:text-[1.55rem]",children:s.description})]}),e.jsxs("div",{className:"mt-[3.5rem] flex items-center gap-[4rem] md:mt-[4.5rem] lg:gap-[6rem]",children:[e.jsxs("div",{className:"flex w-[14rem] items-center justify-between rounded-[4rem] bg-carousel-btn p-[0.6rem_1.1rem] text-[2.3rem] font-[600] md:w-[17rem] md:text-[2.6rem] ",children:[e.jsx("button",{className:"active:scale-[1.2]",disabled:t===0,onClick:v,children:e.jsx(_,{})}),e.jsx("p",{className:"font-roboto",children:t}),e.jsx("button",{className:"active:scale-[1.2]",disabled:t===s.stock,onClick:f,children:e.jsx(y,{})})]}),e.jsxs("div",{className:"whitespace-nowrap",children:[e.jsxs("p",{className:"text-[1.4rem] font-[300] tracking-wide md:text-[1.7rem]",children:["Only",e.jsx("span",{className:"inline-block min-w-[3.8rem] text-center text-[1.8rem] font-[500] text-[hsl(43,67%,50%)]",children:d}),"Items Left"]}),e.jsxs("span",{className:"font-[500]",children:["Don't miss it","!"]})]})]}),e.jsxs("div",{className:"mt-[4rem] flex gap-[3rem] font-[500] md:mt-auto md:justify-between",children:[e.jsx(x,{theme:"secondary",variant:"shop",className:"w-[15rem] p-[1rem_0] transition-[transform] duration-[200ms] ease-in-out  [box-shadow:0_0_0_1.3px_var(--color-secondary)] hover:scale-[1.1] hover:bg-heading hover:text-primary hover:box-shadow-[0_0_0_1.3px_var(--color-secondary)] active:scale-[1.1] lg:w-[20rem]",children:e.jsx(g,{to:"/checkout",children:"Buy Now"})}),e.jsxs(x,{theme:"ghost",variant:"shop",className:"w-[15rem] p-[1rem_0] transition-[transform] duration-[200ms] ease-in-out [box-shadow:0_0_0_1.3px_var(--color-primary)] hover:scale-[1.1] hover:bg-heading hover:text-primary hover:box-shadow-[0_0_0_1.3px_var(--color-secondary)] active:scale-[1.17] lg:w-[20rem]",onClick:b,children:[e.jsx(C,{className:"mr-[1rem] text-[2rem]"}),e.jsx("p",{children:"Add to Cart"})]})]})]})}function R({productItem:s}){const a=j(d=>d.wishList),{toggleAddToWishList:t}=p(),o=a.some(d=>d.id===s.id),[r,m]=E(()=>o),l=()=>{m(),t(s)};return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"text-[3rem]",children:e.jsx(g,{to:"/",children:e.jsx(M,{})})}),e.jsx("h1",{className:"text-center font-roboto text-[2.7rem] font-600 capitalize lg:text-[3.8rem]",children:s.title}),e.jsx("button",{className:"rounded-[50%] bg-primary p-[0.7rem]",onClick:l,children:r?e.jsx(I,{className:"scale-[1.16] text-[2.1rem] text-heading active:scale-[1.23]"}):e.jsx(P,{className:"text-[2.1rem] text-carousel-dot hover:text-heading active:scale-[1.23]"})})]})}function G(){const s=k(r=>r.isDarkMode),a=L(r=>r.slideImages),{For:t}=u(),{For:o}=u();return e.jsx("article",{className:"h-[35rem] w-[min(100%,50rem)] max-md:mx-auto md:h-full",children:e.jsxs(c,{as:"div",innerClassName:A("rounded-[0.7rem]",s&&"max-lg:[box-shadow:0_0_3px_0.1px_var(--carousel-dot)]"),arrowIcon:e.jsx(S,{}),leftBtnClasses:"p-[0.7rem_0.4rem] text-[1.7rem] md:text-[2rem] ",rightBtnClasses:"p-[0.7rem_0.4rem] text-[1.7rem] md:text-[2rem]",children:[e.jsx(c.ItemWrapper,{className:"brightness-[0.65]",children:e.jsx(t,{each:a,render:r=>e.jsx(c.Item,{children:e.jsx(D,{isDynamicImage:!0,src:r})},r)})}),e.jsx(c.IndicatorWrapper,{children:e.jsx(o,{each:a,render:(r,m)=>e.jsx(c.Indicator,{index:m,className:"bg-[hsl(198,14%,14%)] hover:bg-[hsl(220,62%,31%)] hover:box-shadow-[0_0_5px_hsl(220,62%,31%)]",onActiveClassName:"p-[0.4rem] w-[0.6rem] bg-[hsl(220,62%,31%)]"},r)})})]})})}function V(){const{productId:s}=B(),{isLoading:a,productItem:t}=O(s);return a?e.jsx(q,{itemDescription:!0}):e.jsxs("section",{className:"p-[1rem_2rem_3rem] lg:pt-[3rem]",children:[e.jsx("header",{className:"mx-[0.5rem] flex items-center justify-between lg:mx-[3rem]",children:e.jsx(R,{productItem:h(t)})}),e.jsxs("div",{className:"mt-[3rem] md:mt-[4.5rem] md:flex md:h-[47rem] md:justify-around md:gap-[4rem] md:px-[1rem] lg:mt-[6rem] lg:gap-[8rem]",children:[e.jsx(F,{slideImages:(t==null?void 0:t.images)??[],children:e.jsx(G,{})}),e.jsx(Q,{productItem:h(t)})]})]})}export{V as default};
