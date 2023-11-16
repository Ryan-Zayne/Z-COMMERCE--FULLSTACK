import{w as z,x as F,y as G,z as P,A,E as Y,F as X,H as Z,J as D,K as ee,M as j,Q as N,T as te,U as se,r as O,V as re,j as l,R as Q,u as ne,c as I,e as ie,W as ae}from"./index-b5ed5d6f.js";import{h as oe}from"./index.esm-252fdbec.js";import{u as ue}from"./useElementList-dbdcf9c2.js";class ce extends z{constructor(e,t){super(),this.client=e,this.options=t,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(t)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(this.currentQuery.addObserver(this),L(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return T(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return T(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,t){const r=this.options,a=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),F(r,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),this.updateQuery();const n=this.hasListeners();n&&_(this.currentQuery,a,this.options,r)&&this.executeFetch(),this.updateResult(t),n&&(this.currentQuery!==a||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&this.updateStaleTimeout();const u=this.computeRefetchInterval();n&&(this.currentQuery!==a||this.options.enabled!==r.enabled||u!==this.currentRefetchInterval)&&this.updateRefetchInterval(u)}getOptimisticResult(e){const t=this.client.getQueryCache().build(this.client,e),r=this.createResult(t,e);return he(this,r,e)&&(this.currentResult=r,this.currentResultOptions=this.options,this.currentResultState=this.currentQuery.state),r}getCurrentResult(){return this.currentResult}trackResult(e){const t={};return Object.keys(e).forEach(r=>{Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(r),e[r])})}),t}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...t}={}){return this.fetch({...t,meta:{refetchPage:e}})}fetchOptimistic(e){const t=this.client.defaultQueryOptions(e),r=this.client.getQueryCache().build(this.client,t);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,t))}fetch(e){var t;return this.executeFetch({...e,cancelRefetch:(t=e.cancelRefetch)!=null?t:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let t=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(t=t.catch(G)),t}updateStaleTimeout(){if(this.clearStaleTimeout(),P||this.currentResult.isStale||!A(this.options.staleTime))return;const t=Y(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},t)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(P||this.options.enabled===!1||!A(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||X.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,t){const r=this.currentQuery,a=this.options,n=this.currentResult,u=this.currentResultState,c=this.currentResultOptions,m=e!==r,i=m?e.state:this.currentQueryInitialState,d=m?this.currentResult:this.previousQueryResult,{state:h}=e;let{dataUpdatedAt:f,error:o,errorUpdatedAt:p,fetchStatus:y,status:b}=h,S=!1,E=!1,v;if(t._optimisticResults){const g=this.hasListeners(),M=!g&&L(e,t),J=g&&_(e,r,t,a);(M||J)&&(y=Z(e.options.networkMode)?"fetching":"paused",f||(b="loading")),t._optimisticResults==="isRestoring"&&(y="idle")}if(t.keepPreviousData&&!h.dataUpdatedAt&&d!=null&&d.isSuccess&&b!=="error")v=d.data,f=d.dataUpdatedAt,b=d.status,S=!0;else if(t.select&&typeof h.data<"u")if(n&&h.data===(u==null?void 0:u.data)&&t.select===this.selectFn)v=this.selectResult;else try{this.selectFn=t.select,v=t.select(h.data),v=D(n==null?void 0:n.data,v,t),this.selectResult=v,this.selectError=null}catch(g){this.selectError=g}else v=h.data;if(typeof t.placeholderData<"u"&&typeof v>"u"&&b==="loading"){let g;if(n!=null&&n.isPlaceholderData&&t.placeholderData===(c==null?void 0:c.placeholderData))g=n.data;else if(g=typeof t.placeholderData=="function"?t.placeholderData():t.placeholderData,t.select&&typeof g<"u")try{g=t.select(g),this.selectError=null}catch(M){this.selectError=M}typeof g<"u"&&(b="success",v=D(n==null?void 0:n.data,g,t),E=!0)}this.selectError&&(o=this.selectError,v=this.selectResult,p=Date.now(),b="error");const R=y==="fetching",C=b==="loading",w=b==="error";return{status:b,fetchStatus:y,isLoading:C,isSuccess:b==="success",isError:w,isInitialLoading:C&&R,data:v,dataUpdatedAt:f,error:o,errorUpdatedAt:p,failureCount:h.fetchFailureCount,failureReason:h.fetchFailureReason,errorUpdateCount:h.errorUpdateCount,isFetched:h.dataUpdateCount>0||h.errorUpdateCount>0,isFetchedAfterMount:h.dataUpdateCount>i.dataUpdateCount||h.errorUpdateCount>i.errorUpdateCount,isFetching:R,isRefetching:R&&!C,isLoadingError:w&&h.dataUpdatedAt===0,isPaused:y==="paused",isPlaceholderData:E,isPreviousData:S,isRefetchError:w&&h.dataUpdatedAt!==0,isStale:U(e,t),refetch:this.refetch,remove:this.remove}}updateResult(e){const t=this.currentResult,r=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,F(r,t))return;this.currentResult=r;const a={cache:!0},n=()=>{if(!t)return!0;const{notifyOnChangeProps:u}=this.options,c=typeof u=="function"?u():u;if(c==="all"||!c&&!this.trackedProps.size)return!0;const m=new Set(c??this.trackedProps);return this.options.useErrorBoundary&&m.add("error"),Object.keys(this.currentResult).some(i=>{const d=i;return this.currentResult[d]!==t[d]&&m.has(d)})};(e==null?void 0:e.listeners)!==!1&&n()&&(a.listeners=!0),this.notify({...a,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const t=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(t==null||t.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const t={};e.type==="success"?t.onSuccess=!e.manual:e.type==="error"&&!ee(e.error)&&(t.onError=!0),this.updateResult(t),this.hasListeners()&&this.updateTimers()}notify(e){j.batch(()=>{if(e.onSuccess){var t,r,a,n;(t=(r=this.options).onSuccess)==null||t.call(r,this.currentResult.data),(a=(n=this.options).onSettled)==null||a.call(n,this.currentResult.data,null)}else if(e.onError){var u,c,m,i;(u=(c=this.options).onError)==null||u.call(c,this.currentResult.error),(m=(i=this.options).onSettled)==null||m.call(i,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(({listener:d})=>{d(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function le(s,e){return e.enabled!==!1&&!s.state.dataUpdatedAt&&!(s.state.status==="error"&&e.retryOnMount===!1)}function L(s,e){return le(s,e)||s.state.dataUpdatedAt>0&&T(s,e,e.refetchOnMount)}function T(s,e,t){if(e.enabled!==!1){const r=typeof t=="function"?t(s):t;return r==="always"||r!==!1&&U(s,e)}return!1}function _(s,e,t,r){return t.enabled!==!1&&(s!==e||r.enabled===!1)&&(!t.suspense||s.state.status!=="error")&&U(s,t)}function U(s,e){return s.isStaleByTime(e.staleTime)}function he(s,e,t){return t.keepPreviousData?!1:t.placeholderData!==void 0?e.isPlaceholderData:!F(s.getCurrentResult(),e)}class de extends z{constructor(e,t){super(),this.client=e,this.queries=[],this.result=[],this.observers=[],this.observersMap={},t&&this.setQueries(t)}onSubscribe(){this.listeners.size===1&&this.observers.forEach(e=>{e.subscribe(t=>{this.onUpdate(e,t)})})}onUnsubscribe(){this.listeners.size||this.destroy()}destroy(){this.listeners=new Set,this.observers.forEach(e=>{e.destroy()})}setQueries(e,t){this.queries=e,j.batch(()=>{const r=this.observers,a=this.findMatchingObservers(this.queries);a.forEach(i=>i.observer.setOptions(i.defaultedQueryOptions,t));const n=a.map(i=>i.observer),u=Object.fromEntries(n.map(i=>[i.options.queryHash,i])),c=n.map(i=>i.getCurrentResult()),m=n.some((i,d)=>i!==r[d]);r.length===n.length&&!m||(this.observers=n,this.observersMap=u,this.result=c,this.hasListeners()&&(N(r,n).forEach(i=>{i.destroy()}),N(n,r).forEach(i=>{i.subscribe(d=>{this.onUpdate(i,d)})}),this.notify()))})}getCurrentResult(){return this.result}getQueries(){return this.observers.map(e=>e.getCurrentQuery())}getObservers(){return this.observers}getOptimisticResult(e){return this.findMatchingObservers(e).map(t=>t.observer.getOptimisticResult(t.defaultedQueryOptions))}findMatchingObservers(e){const t=this.observers,r=new Map(t.map(o=>[o.options.queryHash,o])),a=e.map(o=>this.client.defaultQueryOptions(o)),n=a.flatMap(o=>{const p=r.get(o.queryHash);return p!=null?[{defaultedQueryOptions:o,observer:p}]:[]}),u=new Set(n.map(o=>o.defaultedQueryOptions.queryHash)),c=a.filter(o=>!u.has(o.queryHash)),m=new Set(n.map(o=>o.observer)),i=t.filter(o=>!m.has(o)),d=o=>{const p=this.client.defaultQueryOptions(o),y=this.observersMap[p.queryHash];return y??new ce(this.client,p)},h=c.map((o,p)=>{if(o.keepPreviousData){const y=i[p];if(y!==void 0)return{defaultedQueryOptions:o,observer:y}}return{defaultedQueryOptions:o,observer:d(o)}}),f=(o,p)=>a.indexOf(o.defaultedQueryOptions)-a.indexOf(p.defaultedQueryOptions);return n.concat(h).sort(f)}onUpdate(e,t){const r=this.observers.indexOf(e);r!==-1&&(this.result=te(this.result,r,t),this.notify())}notify(){j.batch(()=>{this.listeners.forEach(({listener:e})=>{e(this.result)})})}}const fe=se.useSyncExternalStore,V=O.createContext(!1),pe=()=>O.useContext(V);V.Provider;function me(){let s=!1;return{clearReset:()=>{s=!1},reset:()=>{s=!0},isReset:()=>s}}const ye=O.createContext(me()),ve=()=>O.useContext(ye);function ge(s,e){return typeof s=="function"?s(...e):!!s}const be=(s,e)=>{(s.suspense||s.useErrorBoundary)&&(e.isReset()||(s.retryOnMount=!1))},Re=s=>{O.useEffect(()=>{s.clearReset()},[s])},xe=({result:s,errorResetBoundary:e,useErrorBoundary:t,query:r})=>s.isError&&!e.isReset()&&!s.isFetching&&ge(t,[s.error,r]),Qe=s=>{s.suspense&&typeof s.staleTime!="number"&&(s.staleTime=1e3)},K=(s,e)=>s.isLoading&&s.isFetching&&!e,q=(s,e,t)=>(s==null?void 0:s.suspense)&&K(e,t),B=(s,e,t)=>e.fetchOptimistic(s).then(({data:r})=>{s.onSuccess==null||s.onSuccess(r),s.onSettled==null||s.onSettled(r,null)}).catch(r=>{t.clearReset(),s.onError==null||s.onError(r),s.onSettled==null||s.onSettled(void 0,r)});function Oe({queries:s,context:e}){const t=re({context:e}),r=pe(),a=ve(),n=O.useMemo(()=>s.map(f=>{const o=t.defaultQueryOptions(f);return o._optimisticResults=r?"isRestoring":"optimistic",o}),[s,t,r]);n.forEach(f=>{Qe(f),be(f,a)}),Re(a);const[u]=O.useState(()=>new de(t,n)),c=u.getOptimisticResult(n);fe(O.useCallback(f=>r?()=>{}:u.subscribe(j.batchCalls(f)),[u,r]),()=>u.getCurrentResult(),()=>u.getCurrentResult()),O.useEffect(()=>{u.setQueries(n,{listeners:!1})},[n,u]);const i=c.some((f,o)=>q(n[o],f,r))?c.flatMap((f,o)=>{const p=n[o],y=u.getObservers()[o];if(p&&y){if(q(p,f,r))return B(p,y,a);K(f,r)&&B(p,y,a)}return[]}):[];if(i.length>0)throw Promise.all(i);const d=u.getQueries(),h=c.find((f,o)=>{var p,y;return xe({result:f,errorResetBoundary:a,useErrorBoundary:(p=(y=n[o])==null?void 0:y.useErrorBoundary)!=null?p:!1,query:d[o]})});if(h!=null&&h.error)throw h.error;return c}const Me=s=>{if(s==null)throw new Error(`The Value "${s}" is not defined`);return s};function Fe(s){const{rating:e,text:t="",className:r="",icon:a=oe}=s,n=[...Array(5).keys()].map(c=>l.jsx(a,{color:"var(--text-header)"},c)),u=[...Array(5).keys()].map((c,m)=>m===4?l.jsx(a,{color:"var(--text-dark)"},c):l.jsx(a,{color:"var(--text-header)"},c));return l.jsxs("div",{className:`mt-[1rem] flex items-center gap-[1rem] text-[1.2rem] ${r}`,children:[l.jsx("span",{className:"flex",children:e>4.5?n:u}),l.jsxs("span",{children:[e," ",t]})]})}const W=Q.createContext({}),$=!0;function Se({baseColor:s,highlightColor:e,width:t,height:r,borderRadius:a,circle:n,direction:u,duration:c,enableAnimation:m=$}){const i={};return u==="rtl"&&(i["--animation-direction"]="reverse"),typeof c=="number"&&(i["--animation-duration"]=`${c}s`),m||(i["--pseudo-element-display"]="none"),(typeof t=="string"||typeof t=="number")&&(i.width=t),(typeof r=="string"||typeof r=="number")&&(i.height=r),(typeof a=="string"||typeof a=="number")&&(i.borderRadius=a),n&&(i.borderRadius="50%"),typeof s<"u"&&(i["--base-color"]=s),typeof e<"u"&&(i["--highlight-color"]=e),i}function x({count:s=1,wrapper:e,className:t,containerClassName:r,containerTestId:a,circle:n=!1,style:u,...c}){var m,i,d;const h=Q.useContext(W),f={...c};for(const[v,R]of Object.entries(c))typeof R>"u"&&delete f[v];const o={...h,...f,circle:n},p={...u,...Se(o)};let y="react-loading-skeleton";t&&(y+=` ${t}`);const b=(m=o.inline)!==null&&m!==void 0?m:!1,S=[],E=Math.ceil(s);for(let v=0;v<E;v++){let R=p;if(E>s&&v===E-1){const w=(i=R.width)!==null&&i!==void 0?i:"100%",k=s%1,g=typeof w=="number"?w*k:`calc(${w} * ${k})`;R={...R,width:g}}const C=Q.createElement("span",{className:y,style:R,key:v},"‌");b?S.push(C):S.push(Q.createElement(Q.Fragment,{key:v},C,Q.createElement("br",null)))}return Q.createElement("span",{className:r,"data-testid":a,"aria-live":"polite","aria-busy":(d=o.enableAnimation)!==null&&d!==void 0?d:$},e?S.map((v,R)=>Q.createElement(e,{key:R},v)):S)}function H({children:s,...e}){return Q.createElement(W.Provider,{value:e},s)}function Te({count:s=5,type:e="genericPage"}){var n;const t=ne(u=>u.isDarkMode),{For:r}=ue(),a={productItemPage:()=>l.jsx("section",{className:"p-[1rem_2rem_3rem] lg:pt-[3rem]",children:l.jsx("div",{className:"mt-[3rem] flex flex-col items-center gap-[4rem] overflow-hidden md:mt-[4.5rem] md:h-[47rem] md:flex-row md:items-start md:justify-around md:px-[1rem] lg:mt-[6rem] lg:flex-row lg:gap-[8rem]",children:l.jsxs(H,{highlightColor:I(t&&"#1e2021"),baseColor:I(t&&"#232628"),children:[l.jsx(x,{className:"h-[35rem] w-[40rem] md:h-[47rem] lg:w-full"}),l.jsx(x,{className:"h-[47rem] w-[46rem] max-md:mx-auto"})]})})}),genericPage:()=>l.jsx("section",{className:"mt-[8rem] flex flex-col gap-[6rem] pt-[6rem]",children:l.jsx("article",{className:"flex flex-col gap-[3rem] px-[3rem]",children:l.jsx("ul",{className:"grid grid-cols-[repeat(auto-fit,_minmax(23rem,1fr))] justify-items-center gap-[3rem_1.5rem]",children:l.jsx(r,{each:[...Array(s).keys()],render:u=>l.jsx("li",{className:ie(`w-[min(100%,25rem)] rounded-[1.2rem] bg-white/[0.17] box-shadow-[0_0_3px_hsl(60,_100%,_0%,_0.3)] ${t&&"bg-[hsl(200,5.88%,10%,0.17)]"}`),children:l.jsxs(H,{highlightColor:I(t&&"#1e2021"),baseColor:I(t&&"#232628"),children:[l.jsx("div",{children:l.jsx(x,{className:"block h-[18rem] w-full rounded-[0.8rem_0.8rem_0_0]"})}),l.jsxs("div",{className:"px-[1.4rem] pb-[1rem]",children:[l.jsxs("header",{className:"flex items-center justify-between gap-[1rem]",children:[l.jsx(x,{count:2,width:148,height:6}),l.jsx("span",{children:l.jsx(x,{width:58,height:23})})]}),l.jsx("p",{className:"mt-[2rem]",children:l.jsx(x,{className:"gap-[3rem]",count:3,width:"93%",height:6})}),l.jsxs("div",{className:"mt-[1rem] flex items-center gap-[1.3rem]",children:[l.jsx(x,{width:75,height:19}),l.jsx(x,{width:34,height:18})]}),l.jsx(x,{className:"mt-[2rem] rounded-[8px] p-[1rem_1.2rem]",width:97,height:35})]})]})},u)})})})}),default:()=>{throw new Error(`Case ${e} is unhandled`)}};return((n=a[e])==null?void 0:n.call(a))??a.default()}const we=async(s,e)=>{const t=await fetch(`${ae}/${s}`,e);if(!t.ok)throw new Error("Failed to fetch data from server");return t.json()},Ee=s=>s.products,Ce=s=>Oe({queries:s}),Ue=()=>{const e=Ce([{key:["smartphones"],url:"products/category/smartphones"},{key:["laptops"],url:"products/category/laptops"},{key:["mens-watches"],url:"products/category/mens-watches"},{key:["womens-watches"],url:"products/category/womens-watches"},{key:["automotive"],url:"products/category/automotive"},{key:["motorcycle"],url:"products/category/motorcycle"},{key:["lighting"],url:"products/category/lighting"}].map(({key:n,url:u})=>({queryKey:n,queryFn:()=>we(u),select:Ee}))),t=e.some(n=>n.isLoading===!0),r=e.some(n=>n.isError===!0),a=e.flatMap(n=>n.data).filter(n=>(n==null?void 0:n.id)!==3);return{isLoading:t,isError:r,allProductsArray:a}};export{Te as L,Fe as S,Me as a,Ue as u};
