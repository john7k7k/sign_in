"use strict";(self["webpackChunkwebpage1"]=self["webpackChunkwebpage1"]||[]).push([[642],{4725:function(e,t,l){l.d(t,{Z:function(){return p}});var a=l(3396),n=l(6721),o=l(4075),i=l(9234),s=l(8694),r=l(7471),c=l(1615);function u(e,t){return(0,a.wg)(),(0,a.j4)(r.i,{prominent:""},{prepend:(0,a.w5)((()=>[(0,a.Wm)(s.f,{src:n,alt:"logo",width:"70",class:"logoimage"})])),default:(0,a.w5)((()=>[(0,a.Wm)(i.C),(0,a.Wm)(i.C),(0,a.Wm)(c.l,null,{default:(0,a.w5)((()=>[(0,a.Wm)(o.J,{inset:"",vertical:""}),(0,a.kq)("",!0)])),_:1})])),_:1})}var d=l(89);const m={},v=(0,d.Z)(m,[["render",u]]);var p=v},8642:function(e,t,l){l.r(t),l.d(t,{default:function(){return D}});var a=l(3396),n=l(6824),o=l(8521);const i={class:"signup"};function s(e,t,l,s,r,c){const u=(0,a.up)("loginnavbar"),d=(0,a.up)("signupinput");return(0,a.wg)(),(0,a.iD)("div",i,[(0,a.Wm)(u,{class:"signinnavbar-bg"}),(0,a.Wm)(n.o,{class:""},{default:(0,a.w5)((()=>[(0,a.Wm)(o.D,{class:"d-flex justify-center",xs:"12"},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{class:"signupinput"})])),_:1})])),_:1})])}var r=l(4725),c=l(9242),u=l(870),d=l(11),m=l(6422),v=l(3369),p=l(6836),b=l(3444),g=l(2900);const f=e=>((0,a.dD)("data-v-9d86fe7c"),e=e(),(0,a.Cn)(),e),h=f((()=>(0,a._)("div",{class:"login-text"},"登入",-1))),w=f((()=>(0,a._)("div",{class:"titleword mb-4 ml-2 text-white"},"註冊帳戶",-1))),y=f((()=>(0,a._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"使用者名稱",-1))),S=f((()=>(0,a._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"Email",-1))),_=f((()=>(0,a._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"密碼",-1))),k=f((()=>(0,a._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"選擇區域",-1))),V=f((()=>(0,a._)("br",null,null,-1)));function x(e,t,l,n,o,i){return(0,a.wg)(),(0,a.j4)(v.K,null,{default:(0,a.w5)((()=>[(0,a.Wm)(d._,{class:"pa-3 cardbg","max-width":"400"},{default:(0,a.w5)((()=>[(0,a.Wm)(m.O,{modelValue:e.form,"onUpdate:modelValue":t[5]||(t[5]=t=>e.form=t),onSubmit:(0,c.iM)(i.onSubmit,["prevent"])},{default:(0,a.w5)((()=>[(0,a.Wm)(u.T,{variant:"text",route:"",to:"/login",class:"d-flex justify-end",color:"indigo-accent-4"},{default:(0,a.w5)((()=>[h])),_:1}),w,y,(0,a.Wm)(g.h,{density:"compact",modelValue:e.account,"onUpdate:modelValue":t[0]||(t[0]=t=>e.account=t),readonly:e.loading,rules:[i.required],class:"mb-1.5 mr-2 ml-2 text-white",placeholder:"","bg-color":"rgba(255, 255, 255, 0.2)"},null,8,["modelValue","readonly","rules"]),S,(0,a.Wm)(g.h,{density:"compact",modelValue:e.email,"onUpdate:modelValue":t[1]||(t[1]=t=>e.email=t),readonly:e.loading,rules:[i.required,i.emailRule],class:"mb-1.5 mr-2 ml-2 text-white",placeholder:"","bg-color":"rgba(255, 255, 255, 0.2)"},null,8,["modelValue","readonly","rules"]),_,(0,a.Wm)(g.h,{"append-inner-icon":e.visible?"mdi-eye-off":"mdi-eye",type:e.visible?"text":"password",modelValue:e.password,"onUpdate:modelValue":t[2]||(t[2]=t=>e.password=t),readonly:e.loading,rules:[i.required],density:"compact","onClick:appendInner":t[3]||(t[3]=t=>e.visible=!e.visible),placeholder:"",class:"ml-2 mr-2 text-white","bg-color":"rgba(255, 255, 255, 0.2)"},null,8,["append-inner-icon","type","modelValue","readonly","rules"]),k,(0,a.Wm)(p.rL,{modelValue:e.SelectSection,"onUpdate:modelValue":t[4]||(t[4]=t=>e.SelectSection=t),items:e.section,density:"comfortable",rules:[i.required],"bg-color":"rgba(255, 255, 255, 0.2)",class:"ml-2 mr-2 text-white"},null,8,["modelValue","items","rules"]),V,(0,a.Wm)(b.v,{timeout:1e3,rounded:"pill"},{activator:(0,a.w5)((({props:t})=>[(0,a.Wm)(u.T,(0,a.dG)({disabled:!e.form,loading:e.loading,color:"success",size:"large",type:"submit",variant:"elevated",class:"mb-8 sign-in-buttom"},t,{width:"250"}),{default:(0,a.w5)((()=>[(0,a.Uk)("註冊 ")])),_:2},1040,["disabled","loading"])])),_:1})])),_:1},8,["modelValue","onSubmit"])])),_:1})])),_:1})}var W=l(4161);const C=l(8082);var U={data:()=>({form:!1,email:null,account:null,password:null,token:"",loading:!1,section:[],SelectSection:null,visible:!1,IP:"20.89.131.34:443"}),created(){this.fetchInstruction()},methods:{fetchInstruction(){W.Z.get("/api/v1/section",{headers:{Authorization:"Bearer "}}).then((e=>{console.log(e);const t=e.data.instructionTable,l=t.map((e=>e.name));this.section=l})).catch((e=>{console.log(e),this.loading=!1}))},onSubmit(){this.form&&(this.loading=!0,W.Z.post("/api/v1/account/sign_up",{username:this.account,mail:this.email,password:C.MD5(this.password+"kowkoww151s5ww").toString(),section:this.transection(this.SelectSection),level:80}).then((e=>{console.log(e),"200"==e.status?(alert("請至註冊信箱中點選驗證信進行驗證"),setTimeout((()=>this.loading=!1),2e3),window.location.replace("/login")):this.$Message.error("註冊失敗!請刷新螢幕重新註冊一次")})).catch((e=>{console.log(e),this.loading=!1,this.$Message.error("註冊失敗")})))},required(e){return null!==e&&""!==e.trim()||"此區為必填區域"},emailRule(e){return/.+@.+\..+/.test(e)||"Email 格式不正確"},transection(){return"北科"===this.SelectSection?"002":"海科"===this.SelectSection?"003":"先鋒"===this.SelectSection?"004":"003"}}},P=l(89);const T=(0,P.Z)(U,[["render",x],["__scopeId","data-v-9d86fe7c"]]);var I=T,Z={name:"signup",components:{signupinput:I,loginnavbar:r.Z},data:()=>({})};const q=(0,P.Z)(Z,[["render",s]]);var D=q},6422:function(e,t,l){l.d(t,{O:function(){return m}});var a=l(3396),n=l(9166),o=l(4357),i=l(3185),s=l(4870),r=l(3766),c=l(1107),u=l(9888);const d=(0,r.U)({...(0,n.l)(),...(0,o.vC)()},"VForm"),m=(0,c.ev)()({name:"VForm",props:d(),emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,t){let{slots:l,emit:n}=t;const r=(0,o.Np)(e),c=(0,s.iH)();function d(e){e.preventDefault(),r.reset()}function m(e){const t=e,l=r.validate();t.then=l.then.bind(l),t.catch=l.catch.bind(l),t.finally=l.finally.bind(l),n("submit",t),t.defaultPrevented||l.then((e=>{let{valid:t}=e;t&&c.value?.submit()})),t.preventDefault()}return(0,u.L)((()=>(0,a.Wm)("form",{ref:c,class:["v-form",e.class],style:e.style,novalidate:!0,onReset:d,onSubmit:m},[l.default?.(r)]))),(0,i.F)(r,c)}})},3444:function(e,t,l){l.d(t,{v:function(){return y}});var a=l(3396),n=l(836),o=l(8429),i=l(3185),s=l(5180),r=l(489),c=l(8717),u=l(4231),d=l(5975),m=l(7041),v=l(5221),p=l(4870),b=l(3766),g=l(131),f=l(1107),h=l(9888);const w=(0,b.U)({multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...(0,s.y)({location:"bottom"}),...(0,r.F)(),...(0,u.I)(),...(0,v.bk)(),...(0,m.x$)(),...(0,g.CE)((0,o.B)({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),y=(0,f.ev)()({name:"VSnackbar",props:w(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:l}=t;const b=(0,c.z)(e,"modelValue"),{locationStyles:g}=(0,s.T)(e),{positionClasses:f}=(0,r.K)(e),{scopeId:w}=(0,d.a)(),{themeClasses:y}=(0,m.ER)(e),{colorClasses:S,colorStyles:_,variantClasses:k}=(0,v.c1)(e),{roundedClasses:V}=(0,u.b)(e),x=(0,p.iH)();(0,a.YP)(b,C),(0,a.YP)((()=>e.timeout),C),(0,a.bv)((()=>{b.value&&C()}));let W=-1;function C(){window.clearTimeout(W);const t=Number(e.timeout);b.value&&-1!==t&&(W=window.setTimeout((()=>{b.value=!1}),t))}function U(){window.clearTimeout(W)}return(0,h.L)((()=>{const[t]=o.y.filterProps(e);return(0,a.Wm)(o.y,(0,a.dG)({ref:x,class:["v-snackbar",{"v-snackbar--active":b.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--vertical":e.vertical},f.value,e.class],style:e.style},t,{modelValue:b.value,"onUpdate:modelValue":e=>b.value=e,contentProps:(0,a.dG)({class:["v-snackbar__wrapper",y.value,S.value,V.value,k.value],style:[g.value,_.value],onPointerenter:U,onPointerleave:C},t.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0},w),{default:()=>[(0,v.Ux)(!1,"v-snackbar"),l.default&&(0,a.Wm)("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[l.default()]),l.actions&&(0,a.Wm)(n.z,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[(0,a.Wm)("div",{class:"v-snackbar__actions"},[l.actions()])]})],activator:l.activator})})),(0,i.F)({},x)}})}}]);
//# sourceMappingURL=642.05a71dcf.js.map