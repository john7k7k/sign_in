"use strict";(self["webpackChunkwebpage1"]=self["webpackChunkwebpage1"]||[]).push([[920],{2859:function(e,l,t){t.r(l),t.d(l,{default:function(){return T}});var a=t(3396),n=t(6824),i=t(8521);const o={class:"signup"};function s(e,l,t,s,r,d){const u=(0,a.up)("loginnavbar"),c=(0,a.up)("signupinput");return(0,a.wg)(),(0,a.iD)("div",o,[(0,a.Wm)(u,{class:"signinnavbar-bg"}),(0,a.Wm)(n.o,{class:""},{default:(0,a.w5)((()=>[(0,a.Wm)(i.D,{class:"d-flex justify-center",xs:"12"},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{class:"signupinput"})])),_:1})])),_:1})])}var r=t(8380),d=t(9242),u=t(870),c=t(11),m=t(6422),p=t(3369),g=t(6836),b=t(3444),h=t(5869);const w=(0,a._)("div",{class:"login-text"},"登入",-1),v=(0,a._)("div",{class:"titleword mb-4 ml-2 text-white"},"註冊帳戶",-1),f=(0,a._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"使用者名稱",-1),y=(0,a._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"Email",-1),x=(0,a._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"密碼",-1),S=(0,a._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"選擇區域",-1),_=(0,a._)("br",null,null,-1);function V(e,l,t,n,i,o){return(0,a.wg)(),(0,a.j4)(p.K,null,{default:(0,a.w5)((()=>[(0,a.Wm)(c._,{class:"pa-3 cardbg","max-width":"400"},{default:(0,a.w5)((()=>[(0,a.Wm)(m.O,{modelValue:e.form,"onUpdate:modelValue":l[5]||(l[5]=l=>e.form=l),onSubmit:(0,d.iM)(o.onSubmit,["prevent"])},{default:(0,a.w5)((()=>[(0,a.Wm)(u.T,{variant:"text",route:"",to:"/login",class:"d-flex justify-end",color:"indigo-accent-4"},{default:(0,a.w5)((()=>[w])),_:1}),v,f,(0,a.Wm)(h.h,{density:"compact",modelValue:e.account,"onUpdate:modelValue":l[0]||(l[0]=l=>e.account=l),readonly:e.loading,rules:[o.required],class:"mb-1.5 mr-2 ml-2 text-white",placeholder:"","bg-color":"rgba(255, 255, 255, 0.2)"},null,8,["modelValue","readonly","rules"]),y,(0,a.Wm)(h.h,{density:"compact",modelValue:e.email,"onUpdate:modelValue":l[1]||(l[1]=l=>e.email=l),readonly:e.loading,rules:[o.required,o.emailRule],class:"mb-1.5 mr-2 ml-2 text-white",placeholder:"","bg-color":"rgba(255, 255, 255, 0.2)"},null,8,["modelValue","readonly","rules"]),x,(0,a.Wm)(h.h,{"append-inner-icon":e.visible?"mdi-eye-off":"mdi-eye",type:e.visible?"text":"password",modelValue:e.password,"onUpdate:modelValue":l[2]||(l[2]=l=>e.password=l),readonly:e.loading,rules:[o.required],density:"compact","onClick:appendInner":l[3]||(l[3]=l=>e.visible=!e.visible),placeholder:"",class:"ml-2 mr-2 text-white","bg-color":"rgba(255, 255, 255, 0.2)"},null,8,["append-inner-icon","type","modelValue","readonly","rules"]),S,(0,a.Wm)(g.rL,{modelValue:e.SelectSection,"onUpdate:modelValue":l[4]||(l[4]=l=>e.SelectSection=l),items:e.section,density:"comfortable",rules:[o.required],"bg-color":"rgba(255, 255, 255, 0.2)",class:"ml-2 mr-2 text-white"},null,8,["modelValue","items","rules"]),_,(0,a.Wm)(b.v,{timeout:1e3,rounded:"pill"},{activator:(0,a.w5)((({props:l})=>[(0,a.Wm)(u.T,(0,a.dG)({disabled:!e.form,loading:e.loading,color:"success",size:"large",type:"submit",variant:"elevated",class:"mb-8 sign-in-buttom"},l,{width:"250"}),{default:(0,a.w5)((()=>[(0,a.Uk)("註冊 ")])),_:2},1040,["disabled","loading"])])),_:1})])),_:1},8,["modelValue","onSubmit"])])),_:1})])),_:1})}var W=t(4161);const k=t(8082);var U={data:()=>({form:!1,email:null,account:null,password:null,token:"",loading:!1,section:["北科","海科"],SelectSection:null,visible:!1,IP:"20.89.131.34:443"}),methods:{onSubmit(){this.form&&(this.loading=!0,W.Z.post("/api/v1/account/sign_up",{username:this.account,mail:this.email,password:k.MD5(this.password+"kowkoww151s5ww").toString(),section:this.transection(this.SelectSection),level:80}).then((e=>{console.log(e),"200"==e.status?(alert("請至註冊信箱中點選驗證信進行驗證"),setTimeout((()=>this.loading=!1),2e3),window.location.replace("/login")):alert("註冊失敗!請刷新螢幕重新註冊一次")})).catch((e=>{console.log(e),this.loading=!1,alert("註冊失敗")})))},required(e){return null!==e&&""!==e.trim()||"此區為必填區域"},emailRule(e){return/.+@.+\..+/.test(e)||"Email 格式不正確"},transection(){return"北科"===this.SelectSection?"002":"海科"===this.SelectSection?"003":"先鋒"===this.SelectSection?"004":"003"}}},q=t(89);const Z=(0,q.Z)(U,[["render",V]]);var j=Z,C={name:"signup",components:{signupinput:j,loginnavbar:r.Z},data:()=>({})};const D=(0,q.Z)(C,[["render",s]]);var T=D}}]);
//# sourceMappingURL=920.30ac0648.js.map