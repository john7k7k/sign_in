"use strict";(self["webpackChunkwebpage1"]=self["webpackChunkwebpage1"]||[]).push([[126],{1126:function(e,t,i){i.r(t),i.d(t,{default:function(){return W}});var n=i(3396);const o={class:"Speech"};function s(e,t,i,s,a,l){const c=(0,n.up)("navbar"),h=(0,n.up)("Speech");return(0,n.wg)(),(0,n.iD)("div",o,[(0,n.Wm)(c),(0,n.Wm)(h)])}var a=i(9242),l=i(7139),c=i(870),h=i(11);const r=e=>((0,n.dD)("data-v-f99927e8"),e=e(),(0,n.Cn)(),e),g={class:"box"},d=r((()=>(0,n._)("div",{class:"tital"},"語音控制",-1))),u={for:"dropdown",style:{color:"white"}},p=["value"],v={for:"languageSelect",style:{color:"white"}},m=r((()=>(0,n._)("option",{value:"en-US",style:{color:"white"}},"英文",-1))),w=r((()=>(0,n._)("option",{value:"zh-CN",style:{color:"white"}},"中文",-1))),f=[m,w],b=r((()=>(0,n._)("br",null,null,-1))),y=r((()=>(0,n._)("p",{class:"resultTital"},"辨識結果",-1))),_={class:"Resultsword"},S={style:{color:"white"},class:"beginWord"},D={style:{color:"white"},class:"beginWord"};function L(e,t,i,o,s,r){return(0,n.wg)(),(0,n.iD)("div",g,[d,(0,n._)("div",null,[(0,n.wy)((0,n._)("label",u,"選擇控制魚的ID:",512),[[a.F8,!1]]),(0,n.wy)((0,n._)("select",{id:"dropdown","onUpdate:modelValue":t[0]||(t[0]=e=>s.selectedfishUID=e),onChange:t[1]||(t[1]=(...e)=>r.handleChange&&r.handleChange(...e))},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.options,((e,t)=>((0,n.wg)(),(0,n.iD)("option",{key:t,value:e.value},(0,l.zw)(e.label),9,p)))),128))],544),[[a.bM,s.selectedfishUID]])]),(0,n.wy)((0,n._)("label",v,"選擇語言:",512),[[a.F8,!1]]),(0,n.wy)((0,n._)("select",{id:"languageSelect","onUpdate:modelValue":t[2]||(t[2]=e=>s.selectedLanguage=e),onChange:t[3]||(t[3]=(...e)=>r.changeLanguage&&r.changeLanguage(...e)),style:{color:"white"}},f,544),[[a.bM,s.selectedLanguage],[a.F8,!1]]),b,y,(0,n.Wm)(h._,{class:"resultcard"},{default:(0,n.w5)((()=>[(0,n._)("div",_,(0,l.zw)(s.command),1)])),_:1}),(0,n.Wm)(c.T,{class:"btn-bg text-white",onClick:r.toggleSpeechRecognition,icon:s.icon,size:"80"},null,8,["onClick","icon"]),(0,n.wy)((0,n._)("div",S,"開始辨識",512),[[a.F8,!s.isListening]]),(0,n.wy)((0,n._)("div",D,"結束辨識",512),[[a.F8,s.isListening]])])}var I=i(4161),R={data(){return{selectedfishUID:null,options:[{value:"option1",label:"選項 1"},{value:"option2",label:"選項 2"},{value:"option3",label:"選項 3"}],recognition:null,selectedLanguage:"zh-CN",recognitionResult:"",command:"",isListening:!1,icon:"mdi mdi-microphone"}},mounted(){this.fetchOptions(),this.recognition=new window.webkitSpeechRecognition,this.recognition.lang=this.selectedLanguage,this.recognition.onresult=e=>{this.recognitionResult=e.results[e.results.length-1][0].transcript,this.submit(),setTimeout(this.startSpeechRecognition.bind(this),1e3)}},methods:{toggleSpeechRecognition(){this.isListening?(this.icon="mdi mdi-microphone",this.endSpeechRecognition()):(this.icon="mdi mdi-microphone-off",this.startSpeechRecognition())},startSpeechRecognition(){this.isListening=!0,this.recognition.start(),this.recognitionResult="辨識中",this.command="辨識中"},endSpeechRecognition(){this.isListening=!1,this.recognition.stop(),this.recognition.onresult},changeLanguage(){this.recognition.lang=this.selectedLanguage},submit(){I.Z.post("/api/v1/fish/voice",{text:this.recognitionResult,fishUID:this.selectedfishUID},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then((({data:e})=>this.command=e))},handleChange(){this.$emit("change",this.selectedOption)},async fetchOptions(){this.options=Object.keys(this.flatten((await I.Z.get("/api/v1/account",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).data.fishesID)).map((e=>({value:e.slice(-7),label:e.slice(-4)}))),console.log(this.options)},traverseAndFlatten(e,t,i){for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var o;o=void 0===i?n:i+"."+n;var s=e[n];"object"===typeof s?this.traverseAndFlatten(s,t,o):t[o]=s}},flatten(e){var t={};return this.traverseAndFlatten(e,t),t}}},C=i(89);const k=(0,C.Z)(R,[["render",L],["__scopeId","data-v-f99927e8"]]);var U=k,F=i(6434),z={name:"speech",components:{Speech:U,navbar:F.Z},data(){return{fishUID:""}},methods:{update(e){this.fishUID=e}}};const O=(0,C.Z)(z,[["render",s],["__scopeId","data-v-1bf295b6"]]);var W=O}}]);
//# sourceMappingURL=126.33e61a10.js.map