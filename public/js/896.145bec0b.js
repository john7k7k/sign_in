"use strict";(self["webpackChunkwebpage1"]=self["webpackChunkwebpage1"]||[]).push([[896],{3896:function(e,l,n){n.r(l),n.d(l,{default:function(){return z}});var a=n(3396),t=n(6824),o=n(8521);const i={class:"signup"},s={class:"v-application__wrap"},r=(0,a._)("h1",{class:"text-center my-1 textsignup"}," 註冊 ",-1);function u(e,l,n,u,d,c){const m=(0,a.up)("signinnavbar"),p=(0,a.up)("signupinput");return(0,a.wg)(),(0,a.iD)("div",i,[(0,a.Wm)(m,{class:"signinnavbar-bg"}),(0,a._)("div",s,[r,(0,a.Wm)(t.o,{class:"mt-2"},{default:(0,a.w5)((()=>[(0,a.Wm)(o.D,{class:"d-flex justify-center",xs:"12"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{class:"signupinput"})])),_:1})])),_:1})])])}var d=n(453),c=n(870),m=n(4075),p=n(9234),w=n(8694),g=n(7471),b=n(1615);const f=(0,a._)("h3",null,"登入",-1);function h(e,l){return(0,a.wg)(),(0,a.j4)(g.i,{prominent:""},{prepend:(0,a.w5)((()=>[(0,a.Wm)(w.f,{src:d,alt:"logo",width:"70"})])),default:(0,a.w5)((()=>[(0,a.Wm)(p.C),(0,a.Wm)(p.C),(0,a.Wm)(b.l,null,{default:(0,a.w5)((()=>[(0,a.Wm)(m.J,{inset:"",vertical:""}),(0,a.Wm)(c.T,{variant:"text",route:"",to:"/login",class:"rounded-button text"},{default:(0,a.w5)((()=>[f])),_:1})])),_:1})])),_:1})}var v=n(89);const y={},W=(0,v.Z)(y,[["render",h]]);var _=W,S=n(9242),V=n(9752),k=n(6422),x=n(3369),U=n(6836),q=n(5869);const C=(0,a._)("br",null,null,-1);function E(e,l,n,t,o,i){return(0,a.wg)(),(0,a.j4)(x.K,null,{default:(0,a.w5)((()=>[(0,a.Wm)(V._,{class:"mx-auto px-6 py-8","max-width":"344",color:"white"},{default:(0,a.w5)((()=>[(0,a.Wm)(k.O,{modelValue:e.form,"onUpdate:modelValue":l[5]||(l[5]=l=>e.form=l),onSubmit:(0,S.iM)(i.onSubmit,["prevent"])},{default:(0,a.w5)((()=>[(0,a.Wm)(q.h,{modelValue:e.account,"onUpdate:modelValue":l[0]||(l[0]=l=>e.account=l),readonly:e.loading,rules:[i.required],class:"mb-2",clearable:"",label:"使用者名稱"},null,8,["modelValue","readonly","rules"]),(0,a.Wm)(q.h,{modelValue:e.email,"onUpdate:modelValue":l[1]||(l[1]=l=>e.email=l),readonly:e.loading,rules:[i.required,i.emailRule],clearable:"",label:"Email",placeholder:"Enter your Email"},null,8,["modelValue","readonly","rules"]),(0,a.Wm)(q.h,{"append-inner-icon":e.visible?"mdi-eye-off":"mdi-eye",type:e.visible?"text":"password",modelValue:e.password,"onUpdate:modelValue":l[2]||(l[2]=l=>e.password=l),readonly:e.loading,rules:[i.required],"onClick:appendInner":l[3]||(l[3]=l=>e.visible=!e.visible),label:"密碼",placeholder:"Enter your password"},null,8,["append-inner-icon","type","modelValue","readonly","rules"]),(0,a.Wm)(U.rL,{modelValue:e.SelectSection,"onUpdate:modelValue":l[4]||(l[4]=l=>e.SelectSection=l),items:e.section,density:"comfortable",label:"選擇區域",rules:[i.required]},null,8,["modelValue","items","rules"]),C,(0,a.Wm)(c.T,{disabled:!e.form,loading:e.loading,block:"",color:"success",size:"large",type:"submit",variant:"elevated"},{default:(0,a.w5)((()=>[(0,a.Uk)(" 註冊 ")])),_:1},8,["disabled","loading"])])),_:1},8,["modelValue","onSubmit"])])),_:1})])),_:1})}var Z=n(4161);const j=n(8082);var D={data:()=>({form:!1,email:null,account:null,password:null,token:"",loading:!1,section:["北科","海科"],SelectSection:null,visible:!1,IP:"20.89.131.34:80"}),methods:{onSubmit(){this.form&&(this.loading=!0,Z.Z.post("/api/v1/account/sign_up",{username:this.account,mail:this.email,password:j.MD5(this.password+"kowkoww151s5ww").toString(),section:this.transection(this.SelectSection)}).then((e=>{console.log(e),"200"==e.status?(alert("註冊成功!\n3秒後將會自動返回登入頁面.."),setTimeout((()=>this.loading=!1),2e3),window.location.replace("/login")):alert("註冊失敗!請再刷新螢幕重新註冊一次")})).catch((e=>{console.log(e),this.loading=!1,alert("註冊失敗")})))},required(e){return null!==e&&""!==e.trim()||"此區為必填區域"},emailRule(e){return/.+@.+\..+/.test(e)||"Email 格式不正確"},transection(){return"北科"===this.SelectSection?"002":"003"}}};const T=(0,v.Z)(D,[["render",E]]);var I=T,M={name:"signup",components:{signinnavbar:_,signupinput:I},data:()=>({})};const R=(0,v.Z)(M,[["render",u]]);var z=R}}]);
//# sourceMappingURL=896.145bec0b.js.map