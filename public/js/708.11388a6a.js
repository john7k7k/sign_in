"use strict";(self["webpackChunkwebpage1"]=self["webpackChunkwebpage1"]||[]).push([[708],{9636:function(t,e,a){a.r(e),a.d(e,{default:function(){return D}});var o=a(3396),l=a(6824),n=a(8521);const s={class:"login"};function i(t,e,a,i,r,d){const c=(0,o.up)("loginnavbar"),m=(0,o.up)("logininput");return(0,o.wg)(),(0,o.iD)("div",s,[(0,o.Wm)(c,{class:"loginnavbar-bg"}),(0,o.Wm)(l.o,{class:""},{default:(0,o.w5)((()=>[(0,o.Wm)(n.D,{class:"d-flex justify-center",xs:"12"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{class:"logininput"})])),_:1})])),_:1})])}var r=a(4725),d=a(9242),c=a(870),m=a(11),u=a(6422),g=a(3369),p=a(3444),w=a(2900);const h=t=>((0,o.dD)("data-v-022f8657"),t=t(),(0,o.Cn)(),t),b=h((()=>(0,o._)("div",{class:"sign-up-text"},"註冊",-1))),f=h((()=>(0,o._)("div",{class:"titleword mb-5 ml-2 text-white"},"使用者登入",-1))),S=h((()=>(0,o._)("div",{class:"ml-2 mb-1 text-blue-grey-lighten-5 textdistance"},"使用者ID",-1))),v={class:"text-blue-grey-lighten-5 d-flex align-center justify-space-between ml-2 mb-1 textdistance"},y=h((()=>(0,o._)("br",null,null,-1)));function I(t,e,a,l,n,s){return(0,o.wg)(),(0,o.j4)(g.K,null,{default:(0,o.w5)((()=>[(0,o.Wm)(m._,{class:"pa-3 cardbg","max-width":"400"},{default:(0,o.w5)((()=>[(0,o.Wm)(u.O,{modelValue:t.form,"onUpdate:modelValue":e[3]||(e[3]=e=>t.form=e),onSubmit:(0,d.iM)(s.onSubmit,["prevent"])},{default:(0,o.w5)((()=>[(0,o.Wm)(c.T,{variant:"text",route:"",to:"/sign/up",class:"mt-2 d-flex justify-end",color:"indigo-accent-4"},{default:(0,o.w5)((()=>[b])),_:1}),f,S,(0,o.Wm)(w.h,{density:"compact",modelValue:t.account,"onUpdate:modelValue":e[0]||(e[0]=e=>t.account=e),readonly:t.loading,rules:[s.required],class:"mb-3 mr-2 ml-2 textfield text-white",placeholder:"","bg-color":"rgba(255, 255, 255, 0.15)"},null,8,["modelValue","readonly","rules"]),(0,o._)("div",v,[(0,o.Uk)("密碼 "),(0,o.kq)("",!0)]),(0,o.Wm)(w.h,{dark:"","append-inner-icon":t.visible?"mdi-eye-off":"mdi-eye",type:t.visible?"text":"password",modelValue:t.password,"onUpdate:modelValue":e[1]||(e[1]=e=>t.password=e),readonly:t.loading,rules:[s.required],density:"compact",placeholder:"",class:"ml-2 mr-2 text-white","onClick:appendInner":e[2]||(e[2]=e=>t.visible=!t.visible),"bg-color":"rgba(255, 255, 255, 0.15)"},null,8,["append-inner-icon","type","modelValue","readonly","rules"]),y,(0,o.Wm)(p.v,{timeout:1e3,rounded:"pill"},{activator:(0,o.w5)((({props:e})=>[(0,o.Wm)(c.T,(0,o.dG)({loading:t.loading,type:"submit",variant:"elevated",class:"mb-12 loginbuttom"},e,{width:"150"}),null,16,["loading"])])),_:1})])),_:1},8,["modelValue","onSubmit"])])),_:1})])),_:1})}var k=a(4161);const _=a(8082);var x={data:()=>({form:!1,salt:"kowkoww151s5ww",account:null,password:null,token:"",visible:!1,loading:!1,IP:"20.89.131.34:443",usertoken:localStorage.getItem("token")}),async created(){await this.loadnewdata()},methods:{onSubmit(){const t=this.password+this.salt,e=_.MD5(t).toString();this.form&&(this.loading=!0,localStorage.setItem("username",this.account),k.Z.post("https://pre.aifish.cc/api/v1/account/login",{username:this.account,password:e}).then((t=>{if(console.log(t),this.loading=!1,200==t.status){localStorage.setItem("UserName",t.data.username),localStorage.setItem("UserEmail",t.data.email),localStorage.setItem("UserLevel",t.data.level),localStorage.setItem("UserSection",t.data.section);const e=t.data.registrationTime,a=new Date(1e3*e),o=a.getFullYear(),l=(a.getMonth()+1).toString().padStart(2,"0"),n=a.getDate().toString().padStart(2,"0"),s=a.getHours().toString().padStart(2,"0"),i=a.getMinutes().toString().padStart(2,"0"),r=a.getSeconds().toString().padStart(2,"0"),d=`${o}-${l}-${n} ${s}:${i}:${r}`;localStorage.setItem("registrationTime",d),localStorage.setItem("token",t.data.token),document.cookie="token="+t.data.token+"; path=/";const c=t.data.poolTable,m=c.map((t=>t.id)),u=c.map((t=>t.name)),g=t.data.instructionTable,p=g.map((t=>t.id)),w=g.map((t=>t.name));localStorage.setItem("PoolsCode",JSON.stringify(m)),localStorage.setItem("PoolsName",JSON.stringify(u)),localStorage.setItem("InstructionCode",JSON.stringify(p)),localStorage.setItem("InstructionName",JSON.stringify(w)),localStorage.setItem("UserImage","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"),"001"==t.data.section&&t.data.level<=10?window.location.replace("/select/instruction"):window.location.replace("/home")}else this.$Message.error("登入失敗")})).catch((t=>{console.log(t),this.loading=!1,this.$Message.error("登入失敗")})))},required(t){return!!t||"此區為必填區域"},async loadnewdata(){try{const t=await k.Z.get("/api/v1/account",{headers:{Authorization:`Bearer ${this.usertoken}`}});console.log(t),200===t.status&&window.location.replace("/home")}catch(t){}}}},U=a(89);const W=(0,U.Z)(x,[["render",I],["__scopeId","data-v-022f8657"]]);var V=W,$={name:"login",components:{logininput:V,loginnavbar:r.Z},data:()=>({})};const C=(0,U.Z)($,[["render",i]]);var D=C}}]);
//# sourceMappingURL=708.11388a6a.js.map