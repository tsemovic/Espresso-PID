(function(e){function t(t){for(var a,i,s=t[0],c=t[1],l=t[2],u=0,p=[];u<s.length;u++)i=s[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,s=1;s<r.length;s++){var c=r[s];0!==n[c]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var a={},n={app:0},o=[];function i(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=a,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(r,a,function(t){return e[t]}.bind(null,a));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);var a=r("1da1"),n=(r("e260"),r("e6cf"),r("cca6"),r("a79d"),r("96cf"),r("7a23")),o={class:"box"},i={class:"row text-center"},s={class:"col"},c={class:"text-center fontHeader text-primary"},l={class:"row content justify-center"},d={ref:"graph",class:"graph col-xs-12 col-sm-12 col-md-9 col-lg-6 col-xl-6 q-pa-sm"},u={class:"info col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-3 q-pa-sm"};function p(e,t,r,a,p,f){var m=Object(n["resolveComponent"])("Graph"),h=Object(n["resolveComponent"])("Info"),g=Object(n["resolveComponent"])("q-page"),b=Object(n["resolveComponent"])("q-page-container"),O=Object(n["resolveComponent"])("q-layout");return Object(n["openBlock"])(),Object(n["createBlock"])(O,{view:"hHh lpR fFf",class:Object(n["normalizeClass"])({bgimage:p.background,bgcolour:!p.background})},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,null,{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",o,[Object(n["createElementVNode"])("div",i,[Object(n["createElementVNode"])("div",s,[Object(n["createElementVNode"])("h1",c,Object(n["toDisplayString"])(f.settings.VUE_TITLE),1)])]),Object(n["createElementVNode"])("div",l,[Object(n["createElementVNode"])("div",d,[Object(n["createVNode"])(m,{dataArray:p.dataArray,chartHeight:p.chartHeight,targetTemperature:p.targetTemperature,settings:f.settings},null,8,["dataArray","chartHeight","targetTemperature","settings"])],512),Object(n["createElementVNode"])("div",u,[Object(n["createVNode"])(h,{P:p.P,I:p.I,D:p.D,targetTemperature:p.targetTemperature,currentTemperature:p.currentTemperature,currentTime:p.currentTime,pidRecieved:p.pidRecieved,onSetPID:t[0]||(t[0]=function(e){return f.setPID(e)})},null,8,["P","I","D","targetTemperature","currentTemperature","currentTime","pidRecieved"])])])])]})),_:1})]})),_:1})]})),_:1},8,["class"])}r("b680"),r("33d1"),r("ea98");function f(e,t,r,a,o,i){var s=Object(n["resolveComponent"])("apexchart"),c=Object(n["resolveComponent"])("q-card-section"),l=Object(n["resolveComponent"])("q-card");return Object(n["openBlock"])(),Object(n["createBlock"])(l,{class:"rounded graph-container card-bg text-secondary no-shadow"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(c,{class:"graph-card"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,{class:"graph-graph",width:"100%",ref:"chart",options:e.chartOptions,series:e.series},null,8,["options","series"])]})),_:1})]})),_:1})}r("fb6a");var m=r("ae27"),h=r.n(m),g=(r("5923"),{name:"LineExample",components:{apexchart:h.a},props:["chartHeight","dataArray","settings","targetTemperature"],data:function(){return{temperatureData:[],targetData:[],labelColor:"592D1D",intervalid1:null,chartOptions:{chart:{id:"realtime",type:"line",grid:{show:!1,yaxis:{lines:{show:!1}}},redrawOnWindowResize:!0,animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:500},animateGradually:{enabled:!0,delay:2}},toolbar:{show:!1},zoom:{enabled:!1}},grid:{show:!1,xaxis:{lines:{show:!1}},yaxis:{lines:{show:!1}}},colors:[this.settings.VUE_COLOUR.accent,this.settings.VUE_COLOUR.info],dataLabels:{enabled:!1},stroke:{curve:"smooth",lineCap:"butt",width:[5,2],dashArray:[0,0]},title:{align:"left"},markers:{size:0},tooltip:{enabled:!1,followCursor:!1,fillSeriesColor:!0,x:{show:!1}},xaxis:{type:"datetime",tickAmount:3,range:3e4,labels:{style:{colors:this.settings.VUE_COLOUR.secondary},formatter:function(e){var t=new Date,r=t.getTime(),a="";return e>=r-37e3&&(a="T-30"),e>=r-27e3&&(a="T-20"),e>=r-17e3&&(a="T-10"),e>=r-1e3&&(a="Now"),a}},axisBorder:{show:!0,color:this.settings.VUE_COLOUR.info,offsetX:-4,offsetY:0},axisTicks:{show:!0,color:this.settings.VUE_COLOUR.info}},yaxis:{labels:{offsetX:-5,style:{colors:this.settings.VUE_COLOUR.secondary}},title:{text:"TEMPERATURE (°C)",rotate:-90,offsetX:0,offsetY:0,style:{color:this.settings.VUE_COLOUR.secondary,fontSize:"12px",fontFamily:"customfont2",fontWeight:600}},axisBorder:{show:!0,color:this.settings.VUE_COLOUR.info,offsetX:0,offsetY:0}},legend:{show:!0,position:"top",horizontalAlign:"right",fontSize:"16px",fontFamily:"customFont2",fontWeight:"450",labels:{colors:this.settings.VUE_COLOUR.secondary,useSeriesColors:!1},onItemClick:{toggleDataSeries:!1},onItemHover:{highlightDataSeries:!1}}},series:[{name:"TEMPERATURE",data:this.dataArray},{name:"TARGET",data:this.targetTemperature}]}},mounted:function(){this.updateChart()},watch:{chartHeight:function(){this.resize()}},methods:{resize:function(){var e=this;setTimeout((function(){return e.chartOptions={chart:{height:"100%"}}}),3e3)},initChart:function(){this.temperatureData=this.dataArray;for(var e=new Date(this.dataArray[this.dataArray.length-1].x),t=e-6e4,r=t;r<=e;r+=1e3)this.targetData.push({x:new Date(r),y:this.targetTemperature});this.targetData.push({x:this.dataArray[this.dataArray.length-1].x,y:this.targetTemperature})},updateChart:function(){var e=this,t=this;this.intervalid1=setInterval((function(){e.temperatureData.length<25&&e.initChart(),e.temperatureData.length>600&&(e.temperatureData=e.dataArray,e.targetData=e.targetData.slice(e.targetData.length-60,e.targetData.length));var r={x:e.dataArray[e.dataArray.length-1].x,y:e.dataArray[e.dataArray.length-1].y};e.temperatureData.push(r);var a={x:e.dataArray[e.dataArray.length-1].x,y:e.targetTemperature};e.targetData.push(a),t.$refs.chart.updateSeries([{name:"TEMPERATURE",data:e.temperatureData},{name:"TARGET",data:e.targetData}])}),500)}}}),b=r("6b0d"),O=r.n(b),v=r("f09f"),j=r("a370"),y=r("93dc"),V=r.n(y);const x=O()(g,[["render",f]]);var E=x;V()(g,"components",{QCard:v["a"],QCardSection:j["a"]});var C={class:"info-container"},T={class:"row items-center no-wrap"},w={class:"col"},_=Object(n["createElementVNode"])("div",{class:"text-subtitle1 text-secondary"},"TEMPERATURE",-1),D={class:"text-h3 text-info"},N=Object(n["createElementVNode"])("div",{class:"text-subtitle1 text-secondary"},"TIME",-1),U={class:"text-h5 text-info"},P={class:"row items-center no-wrap"},R={class:"col"},I=Object(n["createElementVNode"])("div",{class:"text-subtitle1 text-secondary"},"TARGET TEMPERATURE",-1),A={class:"text-h3 text-info"},k={class:"row items-center no-wrap"},L={class:"col"},S=Object(n["createElementVNode"])("div",{class:"text-subtitle1 text-secondary"},"CONFIGURATION",-1),q={class:"pid-container"},H={class:"text-h5 text-weight-bold pid-item text-info"},M=Object(n["createTextVNode"])(" P:"),F={class:"text-h5"},Q={class:"text-h5 text-weight-bold pid-item text-info"},z=Object(n["createTextVNode"])(" I:"),B={class:"text-h5"},G={class:"text-h5 text-weight-bold pid-item text-info"},$=Object(n["createTextVNode"])(" D:"),K={class:"text-h5"},X=Object(n["createElementVNode"])("div",{class:"text-h5 text-secondary"},"PID Settings",-1),W={class:"settings-container"},Y={class:"settings-item"},J={class:"settings-item"},Z={class:"settings-item"},ee={class:"settings-item2"};function te(e,t,r,a,o,i){var s=Object(n["resolveComponent"])("q-card-section"),c=Object(n["resolveComponent"])("q-card"),l=Object(n["resolveComponent"])("q-btn"),d=Object(n["resolveComponent"])("q-card-actions"),u=Object(n["resolveComponent"])("q-space"),p=Object(n["resolveComponent"])("q-input"),f=Object(n["resolveComponent"])("q-dialog"),m=Object(n["resolveDirective"])("close-popup");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",C,[Object(n["createVNode"])(c,{flat:"",bordered:"",class:"rounded info-temperature text-secondary no-margin card-info-bg no-shadow"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",T,[Object(n["createElementVNode"])("div",w,[_,Object(n["createElementVNode"])("div",D,Object(n["toDisplayString"])(r.currentTemperature),1),N,Object(n["createElementVNode"])("div",U,Object(n["toDisplayString"])(r.currentTime),1)])])]})),_:1})]})),_:1}),Object(n["createVNode"])(c,{flat:"",bordered:"",class:"rounded info-targetTemperature text-secondary no-margin card-info-bg no-shadow"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",P,[Object(n["createElementVNode"])("div",R,[I,Object(n["createElementVNode"])("div",A,Object(n["toDisplayString"])(r.targetTemperature),1)])])]})),_:1})]})),_:1}),Object(n["createVNode"])(c,{flat:"",bordered:"",class:"rounded info-pid text-secondary no-margin card-info-bg no-shadow"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,{class:"q-pb-xs"},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",k,[Object(n["createElementVNode"])("div",L,[S,Object(n["createElementVNode"])("div",q,[Object(n["createElementVNode"])("div",H,[M,Object(n["createElementVNode"])("span",F,Object(n["toDisplayString"])(r.P),1)]),Object(n["createElementVNode"])("div",Q,[z,Object(n["createElementVNode"])("span",B,Object(n["toDisplayString"])(r.I),1)]),Object(n["createElementVNode"])("div",G,[$,Object(n["createElementVNode"])("span",K,Object(n["toDisplayString"])(r.D),1)])])])])]})),_:1}),Object(n["createVNode"])(d,{class:"justify-center q-pt-xs"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(l,{color:"positive","text-color":"warning",size:"22px",icon:"settings",label:"Settings",class:"full-width rounded",onClick:t[0]||(t[0]=function(t){i.updateForm(),e.settings=!0})})]})),_:1})]})),_:1}),Object(n["createVNode"])(f,{modelValue:e.settings,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.settings=t}),persistent:"","transition-show":"flip-down","transition-hide":"flip-up"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(c,{class:"rounded"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,{class:"row items-center q-pb-none card-settings-bg bg-warning text-secondary"},{default:Object(n["withCtx"])((function(){return[X,Object(n["createVNode"])(u),Object(n["withDirectives"])(Object(n["createVNode"])(l,{icon:"close",flat:"",round:"",dense:""},null,512),[[m]]),Object(n["withDirectives"])(Object(n["createVNode"])(l,{icon:"done",flat:"",round:"",dense:"",onClick:t[1]||(t[1]=function(e){return i.passEvent()})},null,512),[[m]])]})),_:1}),Object(n["createVNode"])(s,{class:"bg-warning"},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",W,[Object(n["createElementVNode"])("div",Y,[Object(n["createVNode"])(p,{rounded:"","input-class":"card-settings-text",standout:"bg-dark","bg-color":"--negative",modelValue:e.form_P,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.form_P=t}),label:"P","label-color":"info",dense:e.dense},null,8,["modelValue","dense"])]),Object(n["createElementVNode"])("div",J,[Object(n["createVNode"])(p,{rounded:"","input-class":"card-settings-text",standout:"bg-dark","bg-color":"--negative",modelValue:e.form_I,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.form_I=t}),label:"I","label-color":"info",dense:e.dense},null,8,["modelValue","dense"])]),Object(n["createElementVNode"])("div",Z,[Object(n["createVNode"])(p,{rounded:"","input-class":"card-settings-text",standout:"bg-dark","bg-color":"--negative",modelValue:e.form_D,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.form_D=t}),label:"D","label-color":"info",dense:e.dense},null,8,["modelValue","dense"])]),Object(n["createElementVNode"])("div",ee,[Object(n["createVNode"])(p,{rounded:"","input-class":"card-settings-text",standout:"bg-dark","bg-color":"--negative",modelValue:e.form_targetTemperature,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.form_targetTemperature=t}),label:"Target Temperature","label-color":"info",dense:e.dense},null,8,["modelValue","dense"])])])]})),_:1})]})),_:1})]})),_:1},8,["modelValue"])])}var re={name:"Info",props:["P","I","D","targetTemperature","currentTemperature","currentTime","pidRecieved"],data:function(){return{displayTemperature:0,form_P:this.P,form_I:this.I,form_D:this.D,form_targetTemperature:this.targetTemperature}},methods:{passEvent:function(){var e=this,t={P:this.form_P,I:this.form_I,D:this.form_D,targetTemperature:this.form_targetTemperature};this.$emit("setPID",t),setTimeout((function(){return e.showNotification()}),100)},updateForm:function(){this.form_P=this.P,this.form_I=this.I,this.form_D=this.D,this.form_targetTemperature=this.targetTemperature},showNotification:function(){1==this.pidRecieved&&this.$q.notify({icon:null,color:"green",position:"top",message:"PID settings updated successfully!",timeout:3e3})}}},ae=r("4b7e"),ne=r("9c40"),oe=r("24e8"),ie=r("2c91"),se=r("27f9"),ce=r("7f67");const le=O()(re,[["render",te]]);var de=le;V()(re,"components",{QCard:v["a"],QCardSection:j["a"],QCardActions:ae["a"],QBtn:ne["a"],QDialog:oe["a"],QSpace:ie["a"],QInput:se["a"]}),V()(re,"directives",{ClosePopup:ce["a"]});var ue=r("daa8"),pe=Object(ue["a"])(),fe={inject:["settings"],components:{Graph:E,Info:de},data:function(){return{P:"",I:"",D:"",targetTemperature:"",currentTemperature:"",currentTime:"",dataArray:[],vueSocketEndpoint:"",chartHeight:null,pidRecieved:!1,background:!0}},created:function(){this.setColours(),this.getTemperature(),this.getPID(),document.title=this.settings.VUE_TITLE},beforeMount:function(){this.getPID()},mounted:function(){this.askForTemperature(),this.askForPID(),this.$nextTick((function(){window.addEventListener("resize",this.updateChartHeight),this.updateChartHeight()}))},methods:{getTemperature:function(){var e=this;pe.on("recieve_temperature",(function(t){e.dataArray=t,e.currentTemperature=t.at(-1).y.toFixed(2);var r=new Date(t.at(-1).x),a=r.getHours(),n=r.getMinutes(),o=r.getSeconds(),i=a>=12?"pm":"am";a%=12,a=a||12,n=n<10?"0"+n:n,o=o<10?"0"+o:o;var s=a+":"+n+":"+o+" "+i;e.currentTime=s}))},getPID:function(){var e=this;pe.on("give_PID",(function(t){e.P=t["PID"]["P"],e.I=t["PID"]["I"],e.D=t["PID"]["D"],e.targetTemperature=t["TargetTemperature"],e.pidRecieved=!0,setTimeout((function(){return e.pidRecieved=!1}),3e3)}))},askForTemperature:function(){setInterval((function(){pe.emit("send_temperature")}),500)},askForPID:function(){pe.emit("get_PID")},setPID:function(e){pe.emit("send_PID",e)},updateChartHeight:function(){this.chartHeight=this.$refs.graph.clientHeight},setColours:function(){var e=document.documentElement;1==this.settings.BACKGROUND_IMAGE?this.background=!0:this.background=!1,e.style.setProperty("--primary",this.settings.VUE_COLOUR.primary),e.style.setProperty("--secondary",this.settings.VUE_COLOUR.secondary),e.style.setProperty("--accent",this.settings.VUE_COLOUR.accent),e.style.setProperty("--dark",this.settings.VUE_COLOUR.dark),e.style.setProperty("--positive",this.settings.VUE_COLOUR.positive),e.style.setProperty("--negative",this.settings.VUE_COLOUR.negative),e.style.setProperty("--info",this.settings.VUE_COLOUR.info),e.style.setProperty("--warning",this.settings.VUE_COLOUR.warning)}}},me=(r("7094"),r("4d5a")),he=r("09e3"),ge=r("9989");const be=O()(fe,[["render",p],["__scopeId","data-v-a3dbbd4e"]]);var Oe=be;V()(fe,"components",{QLayout:me["a"],QPageContainer:he["a"],QPage:ge["a"]});var ve=r("b05d"),je=r("2a19"),ye=(r("c867"),r("e54f"),{config:{},plugins:{}});function Ve(){return xe.apply(this,arguments)}function xe(){return xe=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={VUE_TITLE:"Espresso Machine",BACKGROUND_IMAGE:!1,VUE_COLOUR:{primary:"#0da54e",secondary:"#0da54e",accent:"#f48221",dark:"#f2f2f2",positive:"#0da54e",negative:"#d2d6d9",info:"#0da54e",warning:"#f2f2f2"},FLASK_IP:"0.0.0.0",FLASK_PORT:5e3},e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)}))),xe.apply(this,arguments)}Ve().then((function(e){Object(n["createApp"])(Oe).use(ve["a"],{plugins:{Notify:je["a"]},config:{notify:{},brand:{primary:e.VUE_COLOUR.primary,secondary:e.VUE_COLOUR.secondary,accent:e.VUE_COLOUR.accent,dark:e.VUE_COLOUR.dark,positive:e.VUE_COLOUR.positive,negative:e.VUE_COLOUR.negative,info:e.VUE_COLOUR.info,warning:e.VUE_COLOUR.warning}}},ye).provide("settings",e).mount("#app")}))},5923:function(e,t,r){},7094:function(e,t,r){"use strict";r("7d34")},"7d34":function(e,t,r){},c867:function(e,t,r){}});
//# sourceMappingURL=app.90bf4466.js.map