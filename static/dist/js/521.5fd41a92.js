"use strict";(self["webpackChunkwebpage1"]=self["webpackChunkwebpage1"]||[]).push([[521],{7521:function(e,l,o){o.r(l),o.d(l,{default:function(){return W}});var a=o(3396);const n={class:"login"},t=(0,a._)("h1",{class:"text-center my-3"}," Sign In ",-1);function r(e,l,o,r,s,d){const u=(0,a.up)("loginnavbar"),i=(0,a.up)("logininput");return(0,a.wg)(),(0,a.iD)("div",n,[(0,a.Wm)(u),t,(0,a.Wm)(i)])}var s=o(5635),d=o(9242),u=o(870),i=o(9752),c=o(6422),m=o(3369),p=o(2900);const g=(0,a._)("br",null,null,-1);function w(e,l,o,n,t,r){return(0,a.wg)(),(0,a.j4)(m.K,null,{default:(0,a.w5)((()=>[(0,a.Wm)(i._,{class:"mx-auto px-6 py-8","max-width":"344",color:"deep-purple-darken-4"},{default:(0,a.w5)((()=>[(0,a.Wm)(c.O,{modelValue:e.form,"onUpdate:modelValue":l[2]||(l[2]=l=>e.form=l),onSubmit:(0,d.iM)(r.onSubmit,["prevent"])},{default:(0,a.w5)((()=>[(0,a.Wm)(p.h,{modelValue:e.account,"onUpdate:modelValue":l[0]||(l[0]=l=>e.account=l),readonly:e.loading,rules:[r.required],class:"mb-2",clearable:"",label:"使用者名稱"},null,8,["modelValue","readonly","rules"]),(0,a.Wm)(p.h,{modelValue:e.password,"onUpdate:modelValue":l[1]||(l[1]=l=>e.password=l),readonly:e.loading,rules:[r.required],clearable:"",label:"密碼",placeholder:"Enter your password"},null,8,["modelValue","readonly","rules"]),g,(0,a.Wm)(u.T,{disabled:!e.form,loading:e.loading,block:"",color:"success",size:"large",type:"submit",variant:"elevated"},{default:(0,a.w5)((()=>[(0,a.Uk)(" 登入 ")])),_:1},8,["disabled","loading"])])),_:1},8,["modelValue","onSubmit"])])),_:1})])),_:1})}var h=o(4161);const b=o(8082);var f={data:()=>({form:!1,salt:"kowkoww151s5ww",account:null,password:null,token:"",loading:!1}),methods:{onSubmit(){const e=this.password+this.salt,l=b.MD5(e).toString();this.form&&(this.loading=!0,h.Z.post("/api1/login_respond",{account:this.account,password:l}).then((e=>{console.log(e),this.loading=!1,200==e.status?window.location.replace(`http://localhost/home/?token=${e.data.token}`):alert("登入失敗")})).catch((e=>{console.log(e),this.loading=!1,alert("登入失敗")})))},required(e){return!!e||"Field is required"}}},k=o(89);const v=(0,k.Z)(f,[["render",w]]);var V=v,y={name:"login",components:{loginnavbar:s.Z,logininput:V},data:()=>({})};const _=(0,k.Z)(y,[["render",r]]);var W=_}}]);
//# sourceMappingURL=521.5fd41a92.js.map