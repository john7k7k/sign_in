"use strict";(self["webpackChunkwebpage1"]=self["webpackChunkwebpage1"]||[]).push([[8],{1008:function(e,t,a){a.r(t),a.d(t,{default:function(){return oe}});var l=a(3396),o=a(6824),n=a(8521);const s={class:"login"},r={class:"v-application__wrap",style:{height:"100%"}},i=(0,l._)("h1",{class:"text-center mr-15 text2"}," 仿生魚監控站 ",-1);function c(e,t,a,c,u,d){const m=(0,l.up)("loginnavbar"),p=(0,l.up)("logininput");return(0,l.wg)(),(0,l.iD)("div",s,[(0,l.Wm)(m,{class:"loginnavbar-bg"}),(0,l._)("div",r,[i,(0,l.Wm)(o.o,{class:"mt-2"},{default:(0,l.w5)((()=>[(0,l.Wm)(n.D,{class:"d-flex justify-center",xs:"12"},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{class:"logininput"})])),_:1})])),_:1})])])}var u=a(453),d=a(870),m=a(4075),p=a(9234),v=a(8694),b=a(7471),g=a(1615);const w=(0,l._)("h3",null,"註冊",-1);function f(e,t){return(0,l.wg)(),(0,l.j4)(b.i,{prominent:""},{prepend:(0,l.w5)((()=>[(0,l.Wm)(v.f,{src:u,alt:"logo",width:"70"})])),default:(0,l.w5)((()=>[(0,l.Wm)(p.C),(0,l.Wm)(p.C),(0,l.Wm)(g.l,null,{default:(0,l.w5)((()=>[(0,l.Wm)(m.J,{inset:"",vertical:""}),(0,l.Wm)(d.T,{variant:"text",route:"",to:"/SignUp",class:"rounded-button text"},{default:(0,l.w5)((()=>[w])),_:1})])),_:1})])),_:1})}var k=a(89);const h={},_=(0,k.Z)(h,[["render",f]]);var y=_,S=a(9242),x=a(9752),W=a(6422),V=a(3369),U=a(836),C=a(5768),I=a(3185),P=a(5180),T=a(489),$=a(8717),D=a(4231),E=a(5975),j=a(7041),B=a(5221),F=a(4870),G=a(3766),L=a(131),M=a(1107),N=a(9888);const Z=(0,G.U)({multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...(0,P.y)({location:"bottom"}),...(0,T.F)(),...(0,D.I)(),...(0,B.bk)(),...(0,j.x$)(),...(0,L.CE)((0,C.B)({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),q=(0,M.ev)()({name:"VSnackbar",props:Z(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const o=(0,$.z)(e,"modelValue"),{locationStyles:n}=(0,P.T)(e),{positionClasses:s}=(0,T.K)(e),{scopeId:r}=(0,E.a)(),{themeClasses:i}=(0,j.ER)(e),{colorClasses:c,colorStyles:u,variantClasses:d}=(0,B.c1)(e),{roundedClasses:m}=(0,D.b)(e),p=(0,F.iH)();(0,l.YP)(o,b),(0,l.YP)((()=>e.timeout),b),(0,l.bv)((()=>{o.value&&b()}));let v=-1;function b(){window.clearTimeout(v);const t=Number(e.timeout);o.value&&-1!==t&&(v=window.setTimeout((()=>{o.value=!1}),t))}function g(){window.clearTimeout(v)}return(0,N.L)((()=>{const[t]=C.y.filterProps(e);return(0,l.Wm)(C.y,(0,l.dG)({ref:p,class:["v-snackbar",{"v-snackbar--active":o.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--vertical":e.vertical},s.value,e.class],style:e.style},t,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,contentProps:(0,l.dG)({class:["v-snackbar__wrapper",i.value,c.value,m.value,d.value],style:[n.value,u.value],onPointerenter:g,onPointerleave:b},t.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0},r),{default:()=>[(0,B.Ux)(!1,"v-snackbar"),a.default&&(0,l.Wm)("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[a.default()]),a.actions&&(0,l.Wm)(U.z,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[(0,l.Wm)("div",{class:"v-snackbar__actions"},[a.actions()])]})],activator:a.activator})})),(0,I.F)({},p)}});var z=a(5869);const Y={class:"container"},A=(0,l._)("div",{class:"text-subtitle-1 text-black"},"使用者名稱",-1),H={class:"text-black text-subtitle-1 d-flex align-center justify-space-between"},K={class:"text-caption text-decoration-underline text-white",href:"#",rel:"noopener noreferrer",target:"_blank"},J=(0,l._)("br",null,null,-1);function O(e,t,a,o,n,s){return(0,l.wg)(),(0,l.j4)(V.K,null,{default:(0,l.w5)((()=>[(0,l.Wm)(x._,{class:"mx-auto px-8 py-11","max-width":"344",color:"white"},{default:(0,l.w5)((()=>[(0,l._)("div",Y,[(0,l.Wm)(W.O,{modelValue:e.form,"onUpdate:modelValue":t[3]||(t[3]=t=>e.form=t),onSubmit:(0,S.iM)(s.onSubmit,["prevent"])},{default:(0,l.w5)((()=>[A,(0,l.Wm)(z.h,{modelValue:e.account,"onUpdate:modelValue":t[0]||(t[0]=t=>e.account=t),readonly:e.loading,rules:[s.required],class:"mb-2",clearable:"",placeholder:"Enter your UserName"},null,8,["modelValue","readonly","rules"]),(0,l._)("div",H,[(0,l.Uk)(" 密碼 "),(0,l.wy)((0,l._)("a",K," 忘記密碼?",512),[[S.F8,!1]])]),(0,l.Wm)(z.h,{"append-inner-icon":e.visible?"mdi-eye-off":"mdi-eye",type:e.visible?"text":"password",modelValue:e.password,"onUpdate:modelValue":t[1]||(t[1]=t=>e.password=t),readonly:e.loading,rules:[s.required],"onClick:appendInner":t[2]||(t[2]=t=>e.visible=!e.visible),placeholder:"Enter your password"},null,8,["append-inner-icon","type","modelValue","readonly","rules"]),J,(0,l.Wm)(q,{timeout:2e3,color:"blue-grey",rounded:"pill"},{activator:(0,l.w5)((({props:t})=>[(0,l.Wm)(d.T,(0,l.dG)({rounded:"pill",disabled:!e.form,loading:e.loading,block:"",color:"success",size:"large",type:"submit",variant:"elevated",class:"mb-3"},t),{default:(0,l.w5)((()=>[(0,l.Uk)(" 登入 ")])),_:2},1040,["disabled","loading"])])),_:1})])),_:1},8,["modelValue","onSubmit"])])])),_:1})])),_:1})}var R=a(4161);const Q=a(8082);var X={data:()=>({form:!1,salt:"kowkoww151s5ww",account:null,password:null,token:"",visible:!1,loading:!1,IP:"20.89.131.34:80"}),methods:{onSubmit(){const e=this.password+this.salt,t=Q.MD5(e).toString();this.form&&(this.loading=!0,localStorage.setItem("username",this.account),R.Z.post("/api/v1/account/login",{username:this.account,password:t}).then((e=>{if(console.log(e),this.loading=!1,200==e.status){localStorage.setItem("UserName",e.data.username),localStorage.setItem("UserEmail",e.data.email),localStorage.setItem("UserLevel",e.data.level),localStorage.setItem("UserSection",e.data.section);const t=e.data.registrationTime,a=new Date(t),l=a.getFullYear(),o=a.getMonth()+1,n=a.getDate(),s=a.getHours(),r=a.getMinutes(),i=a.getSeconds(),c=`${l}-${o}-${n} ${s}:${r}:${i}`;localStorage.setItem("registrationTime",c),localStorage.setItem("token",e.data.token),document.cookie="token="+e.data.token+"; path=/",window.location.replace("/home")}else alert("登入失敗")})).catch((e=>{console.log(e),this.loading=!1,alert("登入失敗")})))},required(e){return!!e||"此區為必填區域"}}};const ee=(0,k.Z)(X,[["render",O]]);var te=ee,ae={name:"login",components:{loginnavbar:y,logininput:te},data:()=>({})};const le=(0,k.Z)(ae,[["render",c]]);var oe=le}}]);
//# sourceMappingURL=8.ad6d55f0.js.map