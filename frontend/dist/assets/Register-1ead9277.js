import{r as a,O as j,R as ce,G as Be,u as he,f as re,j as s,T as ne,k as A,U as pe,V as be,B as W,W as Oe}from"./index-823fce77.js";var De=Object.defineProperty,Me=(e,t,r)=>t in e?De(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Z=(e,t,r)=>(Me(e,typeof t!="symbol"?t+"":t,r),r);let Ue=class{constructor(){Z(this,"current",this.detect()),Z(this,"handoffState","pending"),Z(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},K=new Ue,D=(e,t)=>{K.isServer?a.useEffect(e,t):a.useLayoutEffect(e,t)};function B(e){let t=a.useRef(e);return D(()=>{t.current=e},[e]),t}function Le(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function M(){let e=[],t={addEventListener(r,n,l,f){return r.addEventListener(n,l,f),t.add(()=>r.removeEventListener(n,l,f))},requestAnimationFrame(...r){let n=requestAnimationFrame(...r);return t.add(()=>cancelAnimationFrame(n))},nextFrame(...r){return t.requestAnimationFrame(()=>t.requestAnimationFrame(...r))},setTimeout(...r){let n=setTimeout(...r);return t.add(()=>clearTimeout(n))},microTask(...r){let n={current:!0};return Le(()=>{n.current&&r[0]()}),t.add(()=>{n.current=!1})},style(r,n,l){let f=r.style.getPropertyValue(n);return Object.assign(r.style,{[n]:l}),this.add(()=>{Object.assign(r.style,{[n]:f})})},group(r){let n=M();return r(n),this.add(()=>n.dispose())},add(r){return e.push(r),()=>{let n=e.indexOf(r);if(n>=0)for(let l of e.splice(n,1))l()}},dispose(){for(let r of e.splice(0))r()}};return t}function xe(){let[e]=a.useState(M);return a.useEffect(()=>()=>e.dispose(),[e]),e}let C=function(e){let t=B(e);return j.useCallback((...r)=>t.current(...r),[t])};function Pe(){let e=typeof document>"u";return"useSyncExternalStore"in ce?(t=>t.useSyncExternalStore)(ce)(()=>()=>{},()=>!1,()=>!e):!1}function ge(){let e=Pe(),[t,r]=a.useState(K.isHandoffComplete);return t&&K.isHandoffComplete===!1&&r(!1),a.useEffect(()=>{t!==!0&&r(!0)},[t]),a.useEffect(()=>K.handoff(),[]),e?!1:t}function w(e,t,...r){if(e in t){let l=t[e];return typeof l=="function"?l(...r):l}let n=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(l=>`"${l}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,w),n}let He=Symbol();function ve(...e){let t=a.useRef(e);a.useEffect(()=>{t.current=e},[e]);let r=C(n=>{for(let l of t.current)l!=null&&(typeof l=="function"?l(n):l.current=n)});return e.every(n=>n==null||(n==null?void 0:n[He]))?void 0:r}function V(...e){return Array.from(new Set(e.flatMap(t=>typeof t=="string"?t.split(" "):[]))).filter(Boolean).join(" ")}var je=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(je||{}),F=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(F||{});function we({ourProps:e,theirProps:t,slot:r,defaultTag:n,features:l,visible:f=!0,name:u}){let i=ye(t,e);if(f)return Q(i,r,n,u);let c=l??0;if(c&2){let{static:o=!1,...h}=i;if(o)return Q(h,r,n,u)}if(c&1){let{unmount:o=!0,...h}=i;return w(o?0:1,{0(){return null},1(){return Q({...h,hidden:!0,style:{display:"none"}},r,n,u)}})}return Q(i,r,n,u)}function Q(e,t={},r,n){let{as:l=r,children:f,refName:u="ref",...i}=$(e,["unmount","static"]),c=e.ref!==void 0?{[u]:e.ref}:{},o=typeof f=="function"?f(t):f;"className"in i&&i.className&&typeof i.className=="function"&&(i.className=i.className(t));let h={};if(t){let p=!1,g=[];for(let[b,d]of Object.entries(t))typeof d=="boolean"&&(p=!0),d===!0&&g.push(b);p&&(h["data-headlessui-state"]=g.join(" "))}if(l===a.Fragment&&Object.keys(de(i)).length>0){if(!a.isValidElement(o)||Array.isArray(o)&&o.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${n} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(i).map(d=>`  - ${d}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(d=>`  - ${d}`).join(`
`)].join(`
`));let p=o.props,g=typeof(p==null?void 0:p.className)=="function"?(...d)=>V(p==null?void 0:p.className(...d),i.className):V(p==null?void 0:p.className,i.className),b=g?{className:g}:{};return a.cloneElement(o,Object.assign({},ye(o.props,de($(i,["ref"]))),h,c,Qe(o.ref,c.ref),b))}return a.createElement(l,Object.assign({},$(i,["ref"]),l!==a.Fragment&&c,l!==a.Fragment&&h),o)}function Qe(...e){return{ref:e.every(t=>t==null)?void 0:t=>{for(let r of e)r!=null&&(typeof r=="function"?r(t):r.current=t)}}}function ye(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},r={};for(let n of e)for(let l in n)l.startsWith("on")&&typeof n[l]=="function"?(r[l]!=null||(r[l]=[]),r[l].push(n[l])):t[l]=n[l];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(r).map(n=>[n,void 0])));for(let n in r)Object.assign(t,{[n](l,...f){let u=r[n];for(let i of u){if((l instanceof Event||(l==null?void 0:l.nativeEvent)instanceof Event)&&l.defaultPrevented)return;i(l,...f)}}});return t}function se(e){var t;return Object.assign(a.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function de(e){let t=Object.assign({},e);for(let r in t)t[r]===void 0&&delete t[r];return t}function $(e,t=[]){let r=Object.assign({},e);for(let n of t)n in r&&delete r[n];return r}let le=a.createContext(null);le.displayName="OpenClosedContext";var y=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(y||{});function Ce(){return a.useContext(le)}function We({value:e,children:t}){return j.createElement(le.Provider,{value:e},t)}function ae(){let e=a.useRef(!1);return D(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function Ke(e=0){let[t,r]=a.useState(e),n=ae(),l=a.useCallback(c=>{n.current&&r(o=>o|c)},[t,n]),f=a.useCallback(c=>!!(t&c),[t]),u=a.useCallback(c=>{n.current&&r(o=>o&~c)},[r,n]),i=a.useCallback(c=>{n.current&&r(o=>o^c)},[r]);return{flags:t,addFlag:l,hasFlag:f,removeFlag:u,toggleFlag:i}}function Ve(e){let t={called:!1};return(...r)=>{if(!t.called)return t.called=!0,e(...r)}}function _(e,...t){e&&t.length>0&&e.classList.add(...t)}function ee(e,...t){e&&t.length>0&&e.classList.remove(...t)}function ze(e,t){let r=M();if(!e)return r.dispose;let{transitionDuration:n,transitionDelay:l}=getComputedStyle(e),[f,u]=[n,l].map(c=>{let[o=0]=c.split(",").filter(Boolean).map(h=>h.includes("ms")?parseFloat(h):parseFloat(h)*1e3).sort((h,p)=>p-h);return o}),i=f+u;if(i!==0){r.group(o=>{o.setTimeout(()=>{t(),o.dispose()},i),o.addEventListener(e,"transitionrun",h=>{h.target===h.currentTarget&&o.dispose()})});let c=r.addEventListener(e,"transitionend",o=>{o.target===o.currentTarget&&(t(),c())})}else t();return r.add(()=>t()),r.dispose}function Xe(e,t,r,n){let l=r?"enter":"leave",f=M(),u=n!==void 0?Ve(n):()=>{};l==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let i=w(l,{enter:()=>t.enter,leave:()=>t.leave}),c=w(l,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),o=w(l,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return ee(e,...t.base,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),_(e,...t.base,...i,...o),f.nextFrame(()=>{ee(e,...t.base,...i,...o),_(e,...t.base,...i,...c),ze(e,()=>(ee(e,...t.base,...i),_(e,...t.base,...t.entered),u()))}),f.dispose}function Ye({immediate:e,container:t,direction:r,classes:n,onStart:l,onStop:f}){let u=ae(),i=xe(),c=B(r);D(()=>{e&&(c.current="enter")},[e]),D(()=>{let o=M();i.add(o.dispose);let h=t.current;if(h&&c.current!=="idle"&&u.current)return o.dispose(),l.current(c.current),o.add(Xe(h,n.current,c.current==="enter",()=>{o.dispose(),f.current(c.current)})),o.dispose},[r])}function N(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let z=a.createContext(null);z.displayName="TransitionContext";var qe=(e=>(e.Visible="visible",e.Hidden="hidden",e))(qe||{});function Ge(){let e=a.useContext(z);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Je(){let e=a.useContext(X);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let X=a.createContext(null);X.displayName="NestingContext";function Y(e){return"children"in e?Y(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function Ee(e,t){let r=B(e),n=a.useRef([]),l=ae(),f=xe(),u=C((b,d=F.Hidden)=>{let x=n.current.findIndex(({el:m})=>m===b);x!==-1&&(w(d,{[F.Unmount](){n.current.splice(x,1)},[F.Hidden](){n.current[x].state="hidden"}}),f.microTask(()=>{var m;!Y(n)&&l.current&&((m=r.current)==null||m.call(r))}))}),i=C(b=>{let d=n.current.find(({el:x})=>x===b);return d?d.state!=="visible"&&(d.state="visible"):n.current.push({el:b,state:"visible"}),()=>u(b,F.Unmount)}),c=a.useRef([]),o=a.useRef(Promise.resolve()),h=a.useRef({enter:[],leave:[],idle:[]}),p=C((b,d,x)=>{c.current.splice(0),t&&(t.chains.current[d]=t.chains.current[d].filter(([m])=>m!==b)),t==null||t.chains.current[d].push([b,new Promise(m=>{c.current.push(m)})]),t==null||t.chains.current[d].push([b,new Promise(m=>{Promise.all(h.current[d].map(([S,k])=>k)).then(()=>m())})]),d==="enter"?o.current=o.current.then(()=>t==null?void 0:t.wait.current).then(()=>x(d)):x(d)}),g=C((b,d,x)=>{Promise.all(h.current[d].splice(0).map(([m,S])=>S)).then(()=>{var m;(m=c.current.shift())==null||m()}).then(()=>x(d))});return a.useMemo(()=>({children:n,register:i,unregister:u,onStart:p,onStop:g,wait:o,chains:h}),[i,u,n,p,g,h,o])}function Ze(){}let $e=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function me(e){var t;let r={};for(let n of $e)r[n]=(t=e[n])!=null?t:Ze;return r}function _e(e){let t=a.useRef(me(e));return a.useEffect(()=>{t.current=me(e)},[e]),t}let et="div",Ne=je.RenderStrategy;function tt(e,t){var r,n;let{beforeEnter:l,afterEnter:f,beforeLeave:u,afterLeave:i,enter:c,enterFrom:o,enterTo:h,entered:p,leave:g,leaveFrom:b,leaveTo:d,...x}=e,m=a.useRef(null),S=ve(m,t),k=(r=x.unmount)==null||r?F.Unmount:F.Hidden,{show:v,appear:I,initial:oe}=Ge(),[R,q]=a.useState(v?"visible":"hidden"),ie=Je(),{register:U,unregister:L}=ie;a.useEffect(()=>U(m),[U,m]),a.useEffect(()=>{if(k===F.Hidden&&m.current){if(v&&R!=="visible"){q("visible");return}return w(R,{hidden:()=>L(m),visible:()=>U(m)})}},[R,m,U,L,v,k]);let G=B({base:N(x.className),enter:N(c),enterFrom:N(o),enterTo:N(h),entered:N(p),leave:N(g),leaveFrom:N(b),leaveTo:N(d)}),P=_e({beforeEnter:l,afterEnter:f,beforeLeave:u,afterLeave:i}),J=ge();a.useEffect(()=>{if(J&&R==="visible"&&m.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[m,R,J]);let Ie=oe&&!I,ue=I&&v&&oe,Re=(()=>!J||Ie?"idle":v?"enter":"leave")(),O=Ke(0),Se=C(E=>w(E,{enter:()=>{O.addFlag(y.Opening),P.current.beforeEnter()},leave:()=>{O.addFlag(y.Closing),P.current.beforeLeave()},idle:()=>{}})),ke=C(E=>w(E,{enter:()=>{O.removeFlag(y.Opening),P.current.afterEnter()},leave:()=>{O.removeFlag(y.Closing),P.current.afterLeave()},idle:()=>{}})),H=Ee(()=>{q("hidden"),L(m)},ie);Ye({immediate:ue,container:m,classes:G,direction:Re,onStart:B(E=>{H.onStart(m,E,Se)}),onStop:B(E=>{H.onStop(m,E,ke),E==="leave"&&!Y(H)&&(q("hidden"),L(m))})});let T=x,Te={ref:S};return ue?T={...T,className:V(x.className,...G.current.enter,...G.current.enterFrom)}:(T.className=V(x.className,(n=m.current)==null?void 0:n.className),T.className===""&&delete T.className),j.createElement(X.Provider,{value:H},j.createElement(We,{value:w(R,{visible:y.Open,hidden:y.Closed})|O.flags},we({ourProps:Te,theirProps:T,defaultTag:et,features:Ne,visible:R==="visible",name:"Transition.Child"})))}function rt(e,t){let{show:r,appear:n=!1,unmount:l=!0,...f}=e,u=a.useRef(null),i=ve(u,t);ge();let c=Ce();if(r===void 0&&c!==null&&(r=(c&y.Open)===y.Open),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[o,h]=a.useState(r?"visible":"hidden"),p=Ee(()=>{h("hidden")}),[g,b]=a.useState(!0),d=a.useRef([r]);D(()=>{g!==!1&&d.current[d.current.length-1]!==r&&(d.current.push(r),b(!1))},[d,r]);let x=a.useMemo(()=>({show:r,appear:n,initial:g}),[r,n,g]);a.useEffect(()=>{if(r)h("visible");else if(!Y(p))h("hidden");else{let v=u.current;if(!v)return;let I=v.getBoundingClientRect();I.x===0&&I.y===0&&I.width===0&&I.height===0&&h("hidden")}},[r,p]);let m={unmount:l},S=C(()=>{var v;g&&b(!1),(v=e.beforeEnter)==null||v.call(e)}),k=C(()=>{var v;g&&b(!1),(v=e.beforeLeave)==null||v.call(e)});return j.createElement(X.Provider,{value:p},j.createElement(z.Provider,{value:x},we({ourProps:{...m,as:a.Fragment,children:j.createElement(Ae,{ref:i,...m,...f,beforeEnter:S,beforeLeave:k})},theirProps:{},defaultTag:a.Fragment,features:Ne,visible:o==="visible",name:"Transition"})))}function nt(e,t){let r=a.useContext(z)!==null,n=Ce()!==null;return j.createElement(j.Fragment,null,!r&&n?j.createElement(te,{ref:t,...e}):j.createElement(Ae,{ref:t,...e}))}let te=se(rt),Ae=se(tt),st=se(nt),fe=Object.assign(te,{Child:st,Root:te});function Fe(e){return Be({tag:"svg",attr:{version:"1.1",x:"0px",y:"0px",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"path",attr:{fill:"#FFC107",d:`M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z`}},{tag:"path",attr:{fill:"#FF3D00",d:`M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z`}},{tag:"path",attr:{fill:"#4CAF50",d:`M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z`}},{tag:"path",attr:{fill:"#1976D2",d:`M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z`}}]})(e)}const lt=({setIsLogin:e})=>{const t=he(u=>u.isDarkMode),r=re(u=>u.isDesktop),[n,l]=a.useState(!1),f=u=>{u.preventDefault(),l(i=>!i)};return s.jsxs(s.Fragment,{children:[s.jsxs("header",{children:[!r&&s.jsx(ne,{className:"ml-[-0.8rem] w-[16rem] md:w-full"}),s.jsx("h2",{className:A("font-roboto text-[3.8rem] font-[800] text-[color:hsl(0,0%,20%)] max-lg:mt-[1.5rem]",t&&"text-[color:hsl(38,9%,76%)]"),children:"Login"})]}),s.jsxs("form",{className:"mt-[3rem] flex flex-col gap-[2rem] lg:mt-[2.5rem] [&_input]:text-[1.8rem] [&_input]:text-input lg:[&_input]:text-[1.6rem] [&_label]:text-[1.2rem]",children:[s.jsxs("label",{className:"flex flex-col text-label",children:["Email address",s.jsx("input",{type:"email",className:A("min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent  focus-visible:border-b-navbar",t&&"focus-visible:border-b-carousel-dot")})]}),s.jsxs("label",{className:"relative flex flex-col text-label",children:["Password",s.jsx("input",{type:n?"text":"password",className:A("min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent  focus-visible:border-b-navbar",t&&"focus-visible:border-b-carousel-dot")}),s.jsx("button",{className:"absolute right-[2rem] top-[2.3rem] text-[1.8rem]",onClick:f,children:n?s.jsx(pe,{}):s.jsx(be,{})})]}),s.jsxs("label",{className:"flex flex-row-reverse justify-end gap-[1rem] text-input",children:["Remember me",s.jsx("input",{type:"checkbox"})]}),s.jsx(W,{text:"Login",theme:"secondary",className:"mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]"})]}),s.jsxs("div",{className:"my-[3rem] flex items-center justify-center text-input",children:[s.jsx("span",{className:"mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn"}),"Or",s.jsx("span",{className:"ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn"})]}),s.jsxs("footer",{children:[s.jsxs("div",{className:"flex flex-col items-center text-[1.5rem]",children:[s.jsxs(W,{theme:"ghost",className:"w-[max(80%,27.1rem)] gap-[1rem] rounded-[10rem] border-[2px] border-carousel-btn ",children:[s.jsx(Fe,{className:"text-[1.8rem]"}),"Continue with Google"]}),s.jsxs(W,{className:"mt-[1.5rem] w-[max(80%,27.1rem)] gap-[1rem] rounded-[10rem] border-[2px] border-carousel-btn bg-[hsl(214,89%,38%)] text-light",children:[s.jsx(Oe,{className:"text-[1.8rem]"}),"Continue with Facebook"]})]}),s.jsxs("p",{className:"mx-auto mt-[4rem] text-center text-[1.3rem] font-[500] text-input",children:["New user?",s.jsx("button",{className:"ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]",onClick:()=>e(!1),children:"Create an account"})]})]})]})},at="data:image/png;base64,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";function ot({setIsLogin:e}){const t=he(u=>u.isDarkMode),r=re(u=>u.isDesktop),[n,l]=a.useState(!1),f=u=>{u.preventDefault(),l(i=>!i)};return s.jsxs(s.Fragment,{children:[s.jsxs("header",{children:[!r&&s.jsx(ne,{className:"ml-[-0.8rem] w-[16rem] md:w-full"}),s.jsx("h2",{className:A("font-roboto text-[3.8rem] font-[800] text-[color:hsl(0,0%,20%)] max-lg:mt-[2rem]",t&&"text-[color:hsl(38,9%,76%)]"),children:"Sign Up"})]}),s.jsxs("form",{className:"mt-[2.5rem] flex flex-col gap-[1.8rem] [&_input]:text-[1.8rem] lg:[&_input]:text-[1.6rem] [&_label]:text-[1.2rem]",children:[s.jsxs("label",{className:"flex flex-col text-label",children:["Name",s.jsx("input",{type:"text",className:A("min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar",t&&"focus-visible:border-b-carousel-dot")})]}),s.jsxs("label",{className:"flex flex-col text-label",children:["Email address",s.jsx("input",{type:"email",className:A("min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar",t&&"focus-visible:border-b-carousel-dot")})]}),s.jsxs("label",{className:"relative flex flex-col text-label",children:["Password",s.jsx("input",{type:n?"text":"password",className:A("min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar",t&&"focus-visible:border-b-carousel-dot")}),s.jsx("button",{className:"absolute right-[2rem] top-[2.3rem] text-[1.8rem]",onClick:f,children:n?s.jsx(be,{}):s.jsx(pe,{})})]}),s.jsxs("div",{className:"flex flex-row-reverse justify-end gap-[1rem] text-input",children:[s.jsxs("p",{className:"text-[1.4rem]",children:["I agree to all"," ",s.jsx("span",{className:"cursor-default font-[500] underline hover:text-[hsl(214,89%,53%)]",children:"Terms & Conditions"})]}),s.jsx("input",{type:"checkbox"})]}),s.jsx(W,{text:"Sign up",theme:"secondary",className:"mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]"})]}),s.jsxs("div",{className:"my-[3.3rem] flex items-center ",children:[s.jsx("span",{className:"mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn"}),s.jsx("p",{className:"shrink-0 text-[1.5rem] text-input",children:"Or create an account with"}),s.jsx("span",{className:"ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn"})]}),s.jsxs("footer",{children:[s.jsxs("div",{className:"flex items-center justify-center gap-[3rem] text-[1.5rem]",children:[s.jsx("button",{className:"rounded-[50%] border-[2px] border-label bg-white p-[0.8rem]",children:s.jsx(Fe,{className:"text-[3rem]"})}),s.jsx("button",{className:A("rounded-[50%] border-[2px] border-[hsl(214,89%,53%)] bg-[hsl(214,89%,53%)] ",t&&"border-[hsl(214,89%,35%)] bg-[hsl(214,89%,35%)]"),children:s.jsx("img",{className:"aspect-square w-[5rem] brightness-[0.96]",src:at,alt:""})})]}),s.jsxs("p",{className:"mx-auto mt-[4rem] text-center text-[1.4rem] font-[500] text-input lg:mt-[3rem]",children:["Already have an account?",s.jsx("button",{className:"ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]",onClick:()=>{e(!0)},children:"Sign in"})]})]})]})}function ct(){const e=re(n=>n.isDesktop),[t,r]=a.useState(!0);return s.jsxs("section",{className:"relative flex items-center justify-center bg-[url(/src/pages/Register/images/yellow-cart-bg.webp)] bg-cover bg-no-repeat md:py-[2rem] lg:justify-between lg:bg-[url(/src/pages/Register/images/glitter.webp)] lg:px-[10rem]",children:[s.jsx("span",{id:"Background Overlay",className:"absolute inset-0 z-[1] bg-[hsl(0,0%,0%,0.45)]"}),e&&s.jsx(ne,{className:"relative bottom-[1rem] z-10 ml-[-0.8rem] w-[20rem] brightness-[0.8] contrast-[1.7] lg:left-[4rem]"}),s.jsx(fe,{className:"relative z-10 w-[min(100%,48rem)] rounded-[4px] bg-body p-[2rem_3rem] md:px-[5rem]",show:t,appear:!0,enter:"transition-[opacity,transform] duration-[800ms]",enterFrom:"opacity-0 translate-x-[2rem]",enterTo:"opacity-100 translate-x-[0]",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:s.jsx(lt,{setIsLogin:r})}),s.jsx(fe,{className:"relative z-10 w-[min(100%,48rem)] rounded-[4px] bg-body p-[3rem_3rem] md:p-[2rem_5rem]",show:!t,appear:!0,enter:"transition-[opacity,transform] duration-[800ms]",enterFrom:"opacity-0 translate-x-[2rem]",enterTo:"opacity-100 translate-x-[0]",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:s.jsx(ot,{setIsLogin:r})})]})}export{ct as default};
