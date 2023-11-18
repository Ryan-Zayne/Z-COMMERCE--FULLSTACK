import{r as o,c as g,u as D,j as e,L as Z,B,G as Q,I}from"./index-f8089f2f.js";import{u as h}from"./index.esm-958adbda.js";import{C as l}from"./Carousel-2aba18f2.js";import{u as v,a as d,L as x}from"./useGetAllProducts-7d270e15.js";import{P as f}from"./ProductCard-03819617.js";import"./useCallbackRef-c864c2ca.js";import"./useToggle-14269814.js";class H extends Error{constructor(s){super(s),this.name="ELementError"}}const J=t=>{const s=t&&"animation-none";return[{targetElement:"heading",animationClass:g("animate-fade-in-down",s)},{targetElement:"button",animationClass:g("animate-fade-in-up",s)},{targetElement:"paragraph",animationClass:g("animate-fade-in-up-2",s)}]},u=(t={})=>{const{stopAnimation:s=!1,elementsInfo:A=J(s)}=t,r=o.useRef({}),n=o.useCallback(()=>{var m;for(const{targetElement:c,animationClass:k}of A){if(!r.current[c])throw new H(`"${c}" element does not exist`);(m=r.current[c])==null||m.classList.add(k)}},[A]),i=o.useCallback(()=>{var m;for(const{targetElement:c,animationClass:k}of A)(m=r.current[c])==null||m.addEventListener("animationend",()=>{var b;(b=r.current[c])==null||b.classList.remove(k)})},[A]),a=o.useCallback(()=>{n(),i()},[n,i]);return{animatedElements:r.current,handleElementsAnimation:a}},p=[{title:"SmartPhones",path:"products/smartphones",image:"https://res.cloudinary.com/djvestif4/image/upload/v1685436586/smartphone-transformed_jbfngh_t4v6hj.webp",imageAspectRatio:"aspect-[0.83]",bg_light:"bg-orange-400",bg_dark:"bg-[hsl(27,96%,33%)]"},{title:"Laptops",path:"products/laptops",image:"https://res.cloudinary.com/djvestif4/image/upload/v1685436585/laptop-transformed_dhamlu_dmts1f.webp",imageAspectRatio:"aspect-[1.33]",bg_light:"bg-gray-400",bg_dark:"bg-[hsl(200,6%,31%)]"},{title:"Vehicles",path:"products/vehicles",image:"https://res.cloudinary.com/djvestif4/image/upload/v1685436585/car-transformed_wegeou.webp",imageAspectRatio:"aspect-[2.02]",bg_light:"bg-purple-400",bg_dark:"bg-[hsl(270,95%,25%)]"},{title:"Watches",path:"products/watches",image:"https://res.cloudinary.com/djvestif4/image/upload/v1685436588/watches-transformed_tgsflz.webp",imageAspectRatio:"aspect-[1.21]",bg_light:"bg-cyan-400",bg_dark:"bg-[hsl(188,86%,38%)]"},{title:"Digital Lighting",path:"products/lighting",image:"https://res.cloudinary.com/djvestif4/image/upload/v1685436587/lighting-transformed_bzmi3h.webp",imageAspectRatio:"aspect-[1.03]",bg_light:"bg-green-300",bg_dark:"bg-[hsl(151,76%,26%)]"}];function j(){const t=D(A=>A.isDarkMode),{For:s}=h();return e.jsxs("article",{id:"Categories",className:"mt-[6rem] flex flex-col px-[4rem] lg:items-center",children:[e.jsx("h2",{className:"text-center text-[2.5rem] font-[600] lg:text-[4rem]",children:"All Categories"}),e.jsx("ul",{className:"mt-[3rem] grid auto-rows-[20rem] grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center gap-[3rem] lg:auto-rows-[23rem] lg:grid-cols-[repeat(3,_minmax(30rem,1fr))] lg:gap-[4rem]",children:e.jsx(s,{each:p,render:A=>e.jsxs("li",{"data-aos":"fade-up","data-aos-duration":"600","data-aos-anchor-easing":"ease-out",className:g("flex w-[min(100%,27rem)] justify-between gap-[1.5rem] rounded-[5rem] p-[2rem] transition-transform duration-[800ms] ease-in-out hover:scale-[1.09] lg:w-full lg:rounded-[6rem]",[t?A.bg_dark:A.bg_light]),children:[e.jsxs("div",{className:"flex min-w-[12rem] shrink-0 flex-col justify-center gap-[0.5rem] lg:gap-[1rem]",children:[e.jsx("h3",{className:"text-center text-[1.8rem] lg:text-[2rem]",children:A.title}),e.jsx(Z,{to:`${A.path}`,children:e.jsx(B,{text:"Shop Now",variant:"shop",className:"w-full bg-body p-[0.8rem] text-[--text-body] active:translate-y-[0.15rem] lg:p-[0.8rem_2.7rem] lg:text-[2rem]"})})]}),e.jsx("div",{className:"flex w-[12rem] items-center lg:w-[15rem]",children:e.jsx("img",{className:`${A.imageAspectRatio}`,src:A.image,loading:"lazy",alt:""})})]},A.title)})})]})}function C(t){return Q({tag:"svg",attr:{viewBox:"0 0 15 15",fill:"none"},child:[{tag:"path",attr:{fillRule:"evenodd",clipRule:"evenodd",d:"M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z",fill:"currentColor"}}]})(t)}const y=[{src:"https://res.cloudinary.com/djvestif4/image/upload/v1685436585/laptop1_dviwpy_qe5w8q.webp",blurSrc:"data:image/webp;base64,UklGRoIFAABXRUJQVlA4WAoAAAAgAAAAOAIAPwEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgglAMAAFA1AJ0BKjkCQAE+tVqpUKclI6KgCADgFolpbuFinzCQw4ztEk3gHfZv/r/9eMfoAVm9ZC1Asl2vFyclPjGWntk4/3+hqhDyiNgoW2n6wlyj88nJSZ5H0P3JUPcXffUDyITlW8Rge+2h9F95RTKNTJ4kPx7OZxUhsCsOfPOus4knpd8FCAKIk/fUDpsJl2pDlrpnYzMomV6FyAZQ/Hs6DUtL59RicQCIi7jnCwb7QkS3fy8xNPkynlDZ7QZPTZAs7SLAicPkfWIiDPZT+rHx1mDf5OE5BspKx+hT4Y6L5eLotUKZROMdhOK4K2EfvgDQu6JhX72z0kU+4LKMn31sPe+TtxjT13IYY9oK3MUcvMI2xvu4qgB0N97le7IXvSCe8Co1vzA/Osm2wB9tjlESy1YQdfcVuKfLz1RkQst/O8i1mkLtUMtlHseJKVUuYDVUwD8QJ8wTkPgtQgvNiuyor5PEnZaxSDRUCyXa8XJyK+vqqiq08Cp4DgzKIFku14uTkWZFyT/JhgNN88RKZteLk5D32ydGUBg0619PwtdrxcnIe+2TkPfbKKKKJyHvtk5D32ycKAD++b/cpwJrQ7jmAhje0FzSJ1HXvngdVBksUbgiozm8F7SMbtppVkpaRWvFLQnJi5K1FyLSxMefXoWJjM5kkGton6U6KZC67Jxz4HAcgPQjtTziAlQEK7DZg0n7QGz71iUB32fQ/+zasFhpJllq7iKOHbaMum0Rdx7KjNTzzRxwprBRAKrgyCnEOeg9luThj2I6E4VDqQAl2R7ItGZ6sCoypkWzRnbDA2H0wZso756qCMrXfmUmcJ6eRTMe6b4mj3+ui7EINpUK+qLtnfk+/IxF2nWnjU4BoiH6XEIjkGgX1hLv/mlB6NUS6il6FLJthQyUCQsvrJNd0CCZiAQ2a2q/NqiP7rYQ0TJxHvhF3AEmH393q7GGtrToWAPUgscmjwPlRaNtT+vaOWp/+1B90Er0jJUUKF3MWG7f12bLcCeWVowIMFn2Xsec52OQ72k2GLvIHAa2k+9EmpTBm5AxUBz9uY71oEviXcDMI7a29A4Q3LQnU+QRkQw/KcZLmo3GmDgX0YDrhwXCsflN19QABqn7pDF+f/K/odQndr7cFIN8yWERH4D/AAKzImiw4Ctppc2SnbUBHjMK4Hv3H1kW8IAAAOw+UFz22wqk/o4+r0sTwAAAAq88eAAAAAAAAAAAAAA="},{src:"https://res.cloudinary.com/djvestif4/image/upload/v1685436967/laptop2_g9ld1b_xbfzo4.webp",blurSrc:"data:image/webp;base64,UklGRqoFAABXRUJQVlA4WAoAAAAgAAAAOAIAVAMASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggvAMAALBsAJ0BKjkCVQM+tVqqUKclI6KgCADgFolpbuF2lf0eujAAJ7APfbJyHvtk5D32ych77ZOQ99xN9snIe+2TriTkPfbJyHvz2ntk5D32ymbych77ZOQ99snIe+2TkP2b9PbJyHvtk5D32ych77aES5OQ99snIe+2TkPfbJyJtLteLk5D32ych77ZOQ99snIe+2T1dy2S7Xi5OQ99tCJcnIe+2TkPfbJyHvtk5E2l2vFych77ZOQ99snIe+4m+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJ1xJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D9m/T2ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIgmEu0qBZLteLk5D32ych77ZOQ99snIe+2TkPfbJy57NubXi5OQ99snIe+2Wd9wWS7Xi5OQ99snq7z1FT7gsl2vFych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIm0u14uTkPfbJyHvtk5D32ydcSch77ZOQ99snIe+2TkPfcTfbJyHvtk5D32ych77ZORNpdrxcnIe+2TkPfbJyHvtlM3k5D32ych77ZOQ99snIfs36e2TkPfbJyHvtk5D32ymbych77ZOQ99snIe+2TkP2b9PbJyHvtk5D32ych77ZTN5OQ99snIe+2TkPfbJyH7N+ntk5D32ych77ZOQ99tCJcnIe+2Tj+AAP7/bSjV2FAAUop0TrKdZVCYYKdM4ABmzgDsnAHZOsp1lOzZ1lO6J4QXZnAAAAAAAAAAAAAAAAAAAAAAAAAADDbAAAAAAAAAAAAAAAAA"},{src:"https://res.cloudinary.com/djvestif4/image/upload/v1685436586/phone1_tqjof2_hxw9yj.webp",blurSrc:"data:image/webp;base64,UklGRoIEAABXRUJQVlA4WAoAAAAgAAAAOAIAegEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgglAIAAJA3AJ0BKjkCewE+tVqqUKclI6KgCADgFolpbuFo1DEfqeC1/nA9gAnsA+A/S7Xi5OREDych77ZOR/zzJ7ZPR9ZtLuN5tza8XLOygokgjXne3+FgKTOiwD32ycugdy4rsnIiYf7EGIzqdFZaXjhLscpBXZLtLB4H0L6buopl0EWlzLTRXbkHw7DdrxcoonIxU722LFebvssfCigHsEA9+LCGFE8Q62xwoxG++t0F1uNrn6I6ybZmCVr0NuDP4IgjfF6WAe+2buWbx/sUPpZt6h60MLW9snIfbe67ogfy1U2ec7bsdisOHz9EdZNszMzX7pPLk5D6SG8XJyHvtk5K1vdZ6lYC2Ac8Xo02yOEF2lS1S0Tf73pntszIQLJdrxcnIe/F/StEqDIpL/92C6e2TkPfbJyH2qwLz8D39zZVe+2TkPfbJyK92zMoFV6WrJMPfbJyHvtk5K1pQLJd3Iqvtk5D32ych77ZvJcQ6ya5ae2TkPfbJyHvtk6Mbk5D32ych77ZOQ99snIe/F94CoFku14uTkPfbJ1xJyHvtk5D32ych77ZOQ+3Bt5OQ99snIe+2TkPfbJyH7N+ntk5D32ych77ZOQ3gAD++w7QL5qLDYvS+h3bLUfR6vubbvz/tGONIfVSCBZ+3/mJPX5fNWRfYtVRVII5UN7qQHvGBdz8GhQG1U4F8KviezVKy7U6Fyq4qi8rQWMOIWC25sfIjIepl9EtwrN3+OdcNLJ8zyFFxNNRZ2aIGzHuikgXI5zEJsRqTY5Q/0Mre5S00n1fOYFGv2ZSdZXuSEM+8RtBS0CnZUQxZY3CvUb6fDVUOnSQi0J3vrHa1vB3tKM2JyrcI6FigiFhyQQecQAMF8MIAHFEACfBAAAAAA=="},{src:"https://res.cloudinary.com/djvestif4/image/upload/v1685436587/phone2_ngnbzv_y08ktb.webp",blurSrc:"data:image/webp;base64,UklGRsYJAABXRUJQVlA4WAoAAAAgAAAAOAIA8gIASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg2AcAALCVAJ0BKjkC8wI/EXq4WSwmJKOg8GpxgCIJaW7hY/7wQ+ar7L79ra/cxef8f1QL//t9OZpedPsACQb0o3pjJqJG1VVUc0gyEcpE9DZxN5iX/yeJ+AeP/JxdR5EC4NX3ciqADMnzz0PpxhwTReLvKUijXLqTEtdnZUPhNcrPlrYBcg+lJyTLPnW6OL5qNMfM4MlQ+2Sz6wD9gny5jrfIVzkUZjZZHy0ls2WW28ZfxS1HUtOeh0WXy0MBlspNcn5hve975q5gvQ4zGwbMFhP0ZZfNwPSWlsqK1qbJ2cJtxiVs2zJXpQ5FUBJit11pAWGrMbpMzHWFRiI1lVTq8PeEvz6k/5GK9qswjG85ObAD/b0+/L5wzbWtJ1xwHSDc3+dE/phYR0DRDdJmZEAiuGVKLjjGK/SWqAGH1GP4Cc6/fTnLDlQRTv03XIAFHaYjtAP/9mOsD0PWyKXcvCFCubib5A+CbBFs0Y/ETEqz7nSJw4gDpKjlVKgFO7jSMzlTCVHLKhz/3Cjwi8oQzjIYxshZPlQ+xlEAdgZqY4Mz/IzIGdJGni4UGcD//cKh8QB0k8U/3h86tckdI1d7VshJGLG0F75qDivUdYVD3eblEH6F1tFklZMUsNv15KztfpznNh4cQB0lQr3SHi73dhCh04dG5agAswbS7ZzWLF6MbIVg7m5RBgT/aY5UJnVdZRrTOgvvELlQ+IA6SofEktg90g4YJmZqKm/RzZd2wZKBVjlDGnOcOIA6SeKf9K0Av03d9eYkpNF9woMn/bvCWo5lQ+HyZdw8313mCWdSr/B2a+HIkoS1HMqHxAFrB7IZ+tZPm0aZmaw2oInxHaBkr2tqRKh+xaGl/TvUe/wSk7u7u7u7zBLM7mEEDQtsXdhzOUQdah10RERERESYkREaRAUEWh6sM3aZmZmZmZmZmxzMzMz3NG54fwjLu7u7u7u7u7u+QVVVVVVVbSzNFu7u7u7u7u7vCYAAAAAAAAAA+nd3d3d3d3d3epBqqqqqqqqqqqqqqqqqqqqqq8yqqqqqqqqqqqqqqqqqqqqqqxMAAAAAAAAAAAAAAAAAAAAAACYmZmZmZmZmZmZmZmZmZmZmZnRKqqqqqqqqqqqqqqqqqqqqqq+RXd3d3d3d3d3d3d3d3d3d3d+m7u7u7u7u7u7u7u7u7u7u7u+QVVVRclBPyuQCmOAAAAAAAAAAAATEzK6LK2yqOZpmMeCgBuAAAAAAAAAAAExMroo1T5+w9OcN7wANeGkRERERERERFfE/J0Yi8kvmE0RyGN9btRERERERERESYjwQTCfcRDcpMMOmOt2oiIiIiIiIiTDflk7/iJAPkghKuKOCckDom7u7u7u7u+QHJhWf17ms8bQ1ETfWA3427u7u7u7vQ0QUFIoeiQKHzFbOQ5dJUb1oSZmZmZp13UpsBwnR9L7VLZ1WXtH86DZvd3d3d9/Dhrx1ciM4MWRqeYC0Z6HFGCkqqqqfhgBKl0YnNXAyMgaIxAh9vPuefyIiH5cqq1LflNcC/gW8qoBf0XO+gvmGORERX8XDywfxiDOB87vFyUKIJB4a+WIEVOU1yS7kXIz6osJHwz6RIg9LKxjSv755Y+RUDVQQAAD+90SbbjkSLry7ZEIlLl/4zmfyjtEuH+uVEVH17cRy1oLs0at34ayu86Bnc5O9G404PjkbaXzY91KZ+D/d+h9zzqjIqUQi0JF4faGYPTrgKAMdNrQlVzR/RFcLk+6kXIMp/tbvOuFgYW+ak9Y9ttLlYQci4pXu4XZC2ea5Q0QfIMH5840P6cKoxQaZxNLH9tIUxXaryblAGlWRIkW9AbECE3377jc9czheNeUtq74Vq9yxMfp7abqcIcqD0Ukb9mkGe+UHZpdHNU8oPRSxJggIp32AuhrrbNgZmJjwWFb5wGfvGel/FPi3Wf3zdZud5MZjq3Hdty2AfEXwqh9hYYjMpirCsFbADwihUHDd+u7KCMAPayzaMhUuR5E38nfd+IQdIeX77EM7MCvi/wyW4eo2hGhYtNOudE1Ntia8YKk38SUO1LdsAKmnhrgLc+7ycX87z5JsyPXxD4mlpL54nps+6odPSMRy0417SPZIFVllSoTer8zYOq5CSDrZnixJQktaP/+ZTgGGzrIlsdbsgX4JFImUfvs2PNWtLfhq70DkNio+s3YjvSHHRLwNKVHuKqtYKvm9gzLuVNRj58IzbO1cZA9OwggwAZuhK5/qTY1GC09Cjm1m5xgO+kTsr0AB+qbEnfLpAvjk+dGXZmLumZOLfTAABwaIEPjo3c/lQJnAAABiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJX/zspL9lrJHfAABh9VzZjWJKr/OESJz03C/yoABW2I6pwGl+BLzXjyjdbZO9r4AIL+KeQJoCS+01fWBiKxorD1+EAEPfWZybG59XaLYtEcDBi6KAEgP51vWpNpq4h8mRW6Ht0opwAey7Z6mO4xJV6f6bL4fWxJB2t6fXtpOyiRXLfyaM4v80QETmpDmeC48P/d/PgTuKa/6ztTVd2hKHqTvaZwG0M5VWweDBBqzVPtmjJhkmPjPnnVMWA1RV8ZUUyulrFoT6JxRDepdv8sBNzXwcJ+OW5Koyhfu+HXjvLo7LXUqFUUeJlHjnUIpaW/arnrGc+NqQz/Y36ZX5kAAA="},{src:"https://res.cloudinary.com/djvestif4/image/upload/v1685436588/tablet2_yyzbfs_bytlej.webp",blurSrc:"data:image/webp;base64,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"},{src:"https://res.cloudinary.com/djvestif4/image/upload/v1685436588/tablet3_m2meyj_o4kv62.webp",blurSrc:"data:image/webp;base64,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"}];function P(){const{animatedElements:t,handleElementsAnimation:s}=u(),{For:A}=h(),{For:r}=h();return e.jsx("section",{id:"Hero",children:e.jsx(l.Root,{slideImages:y,children:e.jsxs(l.Content,{onButtonClick:s,outerClassName:"mx-[1rem] h-[33rem] md:h-[41.4rem] lg:h-[48.5rem]",innerClassName:"rounded-[0.7rem] dark:box-shadow-[0_0_7px_-1px_hsl(0,0%,40%,0.6)]",leftBtnClasses:"md:left-[0.8rem] hover:box-shadow-[0_0_5px_var(--text-dark)] lg:left-[29.5rem] p-[0.8rem_0.5rem] lg:p-[1.3rem_0.9rem]",rightBtnClasses:"hover:box-shadow-[0_0_5px_var(--text-dark)] md:right-[0.8rem] lg:right-[2rem] p-[0.8rem_0.5rem] lg:p-[1.3rem_0.9rem]",arrowIcon:e.jsx(C,{className:"lg:text-[1.7rem]"}),autoSlideInterval:1e4,hasAutoSlide:!0,pauseOnHover:!0,children:[e.jsx(l.ItemWrapper,{className:"brightness-[0.6]",children:e.jsx(A,{each:y,render:n=>e.jsx(l.Item,{children:e.jsx(I,{className:"h-full w-full",imageType:"hasFallback",src:n.src,blurSrc:n.blurSrc})},n.src)})}),e.jsxs(l.Caption,{className:"ml-[4.5rem] mt-[3.7rem] flex flex-col items-start md:ml-[7.5rem] lg:ml-[36rem] lg:mt-[8rem]",children:[e.jsx("h1",{ref:n=>t.heading=n,className:"w-[17ch] font-roboto text-[clamp(2rem,_4vw+1rem,_3rem)] font-600 text-heading",children:"Explore the Future of Technology"}),e.jsx("p",{ref:n=>t.paragraph=n,className:"z-20 w-[30ch] text-[clamp(1.3rem,_1vw+1rem,_1.7rem)] [margin-block:1rem_3rem] md:[margin-block:1.8rem_3.7rem] lg:w-[40ch] lg:text-[clamp(1.5rem,_1vw+1rem,_2rem)]",children:"Discover the Latest and most Exquisite Tech Products for Your Home, Office, and On-the-go Needs."}),e.jsx(B,{ref:n=>t.button=n,text:"Shop Now",theme:"secondary",className:"z-50 text-[clamp(1.3rem,_1vw+1rem,_1.7rem)] font-[600] transition-shadow duration-[400ms] hover:[box-shadow:0_10px_20px_hsl(43,100%,55%,0.4)] active:scale-[1.04] max-sm:p-[1rem_2.8rem]"})]}),e.jsx(l.IndicatorWrapper,{children:e.jsx(r,{each:y,render:(n,i)=>e.jsx(l.Indicator,{index:i},n.src)})})]})})})}const E=()=>{const{allProductsArray:t,isError:s,isLoading:A}=v(),r=t.filter(a=>(a==null?void 0:a.category)==="laptops"),n=t.filter(a=>(a==null?void 0:a.category)==="smartphones"),i=[...t.filter(a=>(a==null?void 0:a.category)==="motorcycle"),...t.filter(a=>(a==null?void 0:a.category)==="automotive")];return{isLoading:A,isError:s,hotSalesProducts:r,recentlyViewedProducts:n,similarProducts:i}};function F({data:t}){const s=t.map(A=>e.jsx(f,{to:`/products/${A==null?void 0:A.category}/${A==null?void 0:A.id}`,image:(A==null?void 0:A.images[0])??"",productItem:d(A)},A==null?void 0:A.id));return e.jsxs("article",{id:"Hot Sales",className:"flex flex-col gap-[3rem] px-[3rem]",children:[e.jsx("h2",{className:"text-[2.5rem] font-[700] max-md:text-center lg:text-[3rem]",children:"Hot Sales"}),e.jsx("ul",{className:"grid grid-cols-[repeat(auto-fit,_minmax(23rem,1fr))] justify-items-center gap-[3rem_1.5rem]",children:s})]})}function W({data:t}){const s=t.filter(A=>(A==null?void 0:A.id)!==3).map(A=>e.jsx(f,{to:`/products/${A==null?void 0:A.category}/${A==null?void 0:A.id}`,image:(A==null?void 0:A.images[0])??"",productItem:d(A)},A==null?void 0:A.id));return e.jsxs("article",{id:"Recently Viewed",className:"flex flex-col gap-[3rem] px-[3rem]",children:[e.jsx("h2",{className:"text-[2.5rem] font-[700] max-md:text-center lg:text-[3rem]",children:"Recently Viewed"}),e.jsx("ul",{className:"grid grid-cols-[repeat(auto-fit,_minmax(23rem,1fr))] justify-items-center gap-[3rem_1.5rem]",children:s})]})}function U({data:t}){const{For:s}=h();return e.jsxs("article",{id:"Similar Products You Might Like",className:"flex flex-col gap-[3rem] px-[3rem]",children:[e.jsx("h2",{className:"text-[2.5rem] font-[700] max-md:text-center lg:text-[3rem]",children:"Similar Products You Might Like"}),e.jsx("ul",{className:"grid grid-cols-[repeat(auto-fit,_minmax(min(100%,23.6rem),_1fr))] justify-items-center gap-[3rem_1.5rem]",children:e.jsx(s,{each:t,render:A=>e.jsx(f,{to:`/products/${A==null?void 0:A.category}/${A==null?void 0:A.id}`,image:(A==null?void 0:A.images[1])??"",productItem:d(A)},A==null?void 0:A.id)})})]})}function q(){const{hotSalesProducts:t,recentlyViewedProducts:s,similarProducts:A,isLoading:r}=E();return r?e.jsx(x,{count:10}):e.jsxs("section",{id:"Products Section",className:"flex flex-col gap-[6rem] px-[2rem] pt-[6rem]",children:[e.jsx(F,{data:t}),e.jsx(W,{data:s}),e.jsx(U,{data:A})]})}function N(){return e.jsxs(e.Fragment,{children:[e.jsx(P,{}),e.jsx(j,{}),e.jsx(q,{})]})}export{N as default};
