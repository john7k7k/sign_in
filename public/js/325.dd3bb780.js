"use strict";(self["webpackChunkwebpage1"]=self["webpackChunkwebpage1"]||[]).push([[325],{5269:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var i=n(3396);const a={class:"Speech"};function o(e,t,n,o,s,l){const c=(0,i.up)("navbar"),r=(0,i.up)("Speech");return(0,i.wg)(),(0,i.iD)("div",a,[(0,i.Wm)(c),(0,i.Wm)(r)])}var s=n(7139),l=n(9242),c=n.p+"img/Fishbowl.46ceded4.png",r=n(870),d=n(11),g=n(8694);const h=e=>((0,i.dD)("data-v-34fd37c1"),e=e(),(0,i.Cn)(),e),u={class:"configureBackdrop"},p={class:"startBox"},w={class:"startWordCSS"},m={class:"box"},v={class:"tital"},f={for:"dropdown",style:{color:"white"}},b=["value"],I={for:"languageSelect",style:{color:"white"}},W=h((()=>(0,i._)("option",{value:"en-US",style:{color:"white"}},"英文",-1))),_=h((()=>(0,i._)("option",{value:"zh-CN",style:{color:"white"}},"中文",-1))),S=[W,_],k=h((()=>(0,i._)("br",null,null,-1))),y={class:"resultTital"},C={class:"Resultsword"};function x(e,t,n,a,o,h){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.wy)((0,i._)("div",u,[(0,i._)("div",p,[(0,i.Wm)(r.T,{onClick:h.changeLangWord,variant:"flat",color:"blue-darken-1"},{default:(0,i.w5)((()=>[(0,i.Uk)("繁中/En")])),_:1},8,["onClick"]),(0,i.Wm)(g.f,{src:c,class:"startImg"}),(0,i._)("div",w,[(0,i._)("p",null,(0,s.zw)(o.starttitalWord[o.languageIndex][0]),1),(0,i._)("p",null,(0,s.zw)(o.starttitalWord[o.languageIndex][1]),1)]),(0,i.Wm)(r.T,{class:"startBtnCSS",onClick:t[0]||(t[0]=e=>o.showBackdrop=!1),variant:"flat",color:"teal-lighten-2"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(o.startBtnWord[o.languageIndex]),1)])),_:1})])],512),[[l.F8,o.showBackdrop]]),(0,i._)("div",m,[(0,i.Wm)(r.T,{variant:"text",class:"changeLan",onClick:h.changeLangWord},{default:(0,i.w5)((()=>[(0,i.Uk)("繁中/En")])),_:1},8,["onClick"]),(0,i._)("div",v,(0,s.zw)(o.titalWord[o.languageIndex]),1),(0,i._)("div",null,[(0,i.wy)((0,i._)("label",f,"選擇控制魚的ID:",512),[[l.F8,!1]]),(0,i.wy)((0,i._)("select",{id:"dropdown","onUpdate:modelValue":t[1]||(t[1]=e=>o.selectedfishUID=e),onChange:t[2]||(t[2]=(...e)=>h.handleChange&&h.handleChange(...e))},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.options,((e,t)=>((0,i.wg)(),(0,i.iD)("option",{key:t,value:e.value},(0,s.zw)(e.label),9,b)))),128))],544),[[l.bM,o.selectedfishUID]])]),(0,i.wy)((0,i._)("label",I,"選擇語言:",512),[[l.F8,!1]]),(0,i.wy)((0,i._)("select",{id:"languageSelect","onUpdate:modelValue":t[3]||(t[3]=e=>o.selectedLanguage=e),onChange:t[4]||(t[4]=(...e)=>h.changeLanguage&&h.changeLanguage(...e)),class:"changeLanCSS"},S,544),[[l.bM,o.selectedLanguage],[l.F8,!1]]),k,(0,i._)("p",y,(0,s.zw)(o.resultWord[o.languageIndex]),1),(0,i.Wm)(d._,{class:"resultcard"},{default:(0,i.w5)((()=>[(0,i._)("div",C,(0,s.zw)(o.command),1)])),_:1}),(0,i.Wm)(r.T,{class:"btn-bg text-white",onClick:h.toggleSpeechRecognition,icon:o.icon,size:"80"},null,8,["onClick","icon"]),(0,i.wy)((0,i._)("div",{style:{color:"white"},class:"beginWord"},(0,s.zw)(o.startWord[o.languageIndex]),513),[[l.F8,!o.isListening]]),(0,i.wy)((0,i._)("div",{style:{color:"white"},class:"beginWord"},(0,s.zw)(o.endWord[o.languageIndex]),513),[[l.F8,o.isListening]])])],64)}var L=n(4161),U={data(){return{showBackdrop:!0,starttitalWord:[["體驗語音操控的樂趣","讓你的聲音引導機器魚游動！"],["Start experiencing your voice","guiding the robotic fish to swim!"]],startBtnWord:["開始體驗","Start"],selectedfishUID:null,options:[{value:"option1",label:"選項 1"},{value:"option2",label:"選項 2"},{value:"option3",label:"選項 3"}],recognition:null,selectedLanguage:["zh-CN","en-US"],recognitionResult:"",command:"",isListening:!1,icon:"mdi mdi-microphone",English:"en-US",languageIndex:0,titalWord:["語音控制","Voice Control"],resultWord:["辨識結果","Identification results"],startWord:["開始辨識","Start recognition"],endWord:["結束辨識","End recognition"],commandWord:["辨識中","Identifying"]}},mounted(){this.fetchOptions(),this.recognition=new window.webkitSpeechRecognition,this.recognition.lang=this.selectedLanguage[this.languageIndex],this.recognition.onresult=e=>{this.recognitionResult=e.results[0][0].transcript,this.submit()}},methods:{toggleSpeechRecognition(){this.isListening?(this.icon="mdi mdi-microphone",this.endSpeechRecognition()):(this.icon="mdi mdi-microphone-off",this.startSpeechRecognition())},startSpeechRecognition(){this.isListening=!0,this.recognition.start(),this.recognitionResult=this.commandWord[this.languageIndex],this.command=this.commandWord[this.languageIndex]},endSpeechRecognition(){this.isListening=!1,this.recognition.stop(),this.recognition.onresult},changeLanguage(){this.recognition.lang=this.selectedLanguage},submit(){L.Z.post("/api/v1/fish/voice",{text:this.recognitionResult,fishUID:this.selectedfishUID},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then((({data:e})=>this.command=e))},handleChange(){this.$emit("change",this.selectedOption)},async fetchOptions(){this.options=Object.keys(this.flatten((await L.Z.get("/api/v1/account",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).data.fishesID)).map((e=>({value:e.slice(-7),label:e.slice(-4)}))),console.log(this.options)},traverseAndFlatten(e,t,n){for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a;a=void 0===n?i:n+"."+i;var o=e[i];"object"===typeof o?this.traverseAndFlatten(o,t,a):t[a]=o}},flatten(e){var t={};return this.traverseAndFlatten(e,t),t},changeLangWord(){0==this.languageIndex?this.languageIndex=1:this.languageIndex=0}}},z=n(89);const D=(0,z.Z)(U,[["render",x],["__scopeId","data-v-34fd37c1"]]);var R=D,B=n(4947),F={name:"speech",components:{Speech:R,navbar:B.Z},data(){return{fishUID:""}},methods:{update(e){this.fishUID=e}}};const O=(0,z.Z)(F,[["render",o],["__scopeId","data-v-1bf295b6"]]);var A=O}}]);
//# sourceMappingURL=325.dd3bb780.js.map