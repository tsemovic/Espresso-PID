(function(e){function t(t){for(var n,c,i=t[0],s=t[1],l=t[2],u=0,p=[];u<i.length;u++)c=i[u],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&p.push(a[c][0]),a[c]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);d&&d(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,i=1;i<r.length;i++){var s=r[i];0!==a[s]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},a={app:0},o=[];function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var d=s;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"14d9":function(e){e.exports=JSON.parse('{"VUE_SOCKET_ENDPOINT":"http://192.168.1.21:3000","FLASK_IP":"192.168.1.21","FLASK_PORT":3000}')},3001:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("7a23"),a={class:"box"},o={class:"row text-center"},c={class:"col"},i={class:"text-center fontHeader"},s={class:"row content justify-center"},l={ref:"graph",class:"graph col-xs-12 col-sm-12 col-md-9 col-lg-6 col-xl-6 q-pa-sm"},d={class:"info col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-3 q-pa-sm"};function u(e,t,r,u,p,m){var f=Object(n["resolveComponent"])("Graph"),h=Object(n["resolveComponent"])("Info"),b=Object(n["resolveComponent"])("q-page"),O=Object(n["resolveComponent"])("q-page-container"),g=Object(n["resolveComponent"])("q-layout");return Object(n["openBlock"])(),Object(n["createBlock"])(g,{view:"hHh lpR fFf",class:"bg-image"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(O,null,{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,null,{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",a,[Object(n["createElementVNode"])("div",o,[Object(n["createElementVNode"])("div",c,[Object(n["createElementVNode"])("h1",i," GAGGIA CONTROLLER "+Object(n["toDisplayString"])(p.settingsJsonData),1)])]),Object(n["createElementVNode"])("div",s,[Object(n["createElementVNode"])("div",l,[Object(n["createVNode"])(f,{temperature:e.temperatureData,time:e.timestampData,dataArray:p.dataArray,chartHeight:p.chartHeight},null,8,["temperature","time","dataArray","chartHeight"])],512),Object(n["createElementVNode"])("div",d,[Object(n["createVNode"])(h,{P:p.P,I:p.I,D:p.D,targetTemperature:p.targetTemperature,currentTemperature:p.currentTemperature,pidRecieved:p.pidRecieved,onSetPID:t[0]||(t[0]=function(e){return m.setPID(e)})},null,8,["P","I","D","targetTemperature","currentTemperature","pidRecieved"])])])])]})),_:1})]})),_:1})]})),_:1})}r("b680"),r("33d1"),r("ea98");function p(e,t,r,a,o,c){var i=Object(n["resolveComponent"])("apexchart"),s=Object(n["resolveComponent"])("q-card-section"),l=Object(n["resolveComponent"])("q-card");return Object(n["openBlock"])(),Object(n["createBlock"])(l,{class:"rounded graph-container bg-white text-black"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,{class:"graph-card"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{class:"graph-graph",width:"100%",ref:"chart",options:e.chartOptions,series:e.series},null,8,["options","series"])]})),_:1})]})),_:1})}var m=r("ae27"),f=r.n(m),h=(r("5923"),{name:"LineExample",components:{apexchart:f.a},props:["temperature","time","chartHeight","dataArray"],data:function(){return{chartData:[],labelColor:"592D1D",intervalid1:null,chartOptions:{chart:{id:"realtime",type:"line",grid:{padding:{left:0,right:0}},redrawOnWindowResize:!0,animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:500},animateGradually:{enabled:!0,delay:2}},toolbar:{show:!1},zoom:{enabled:!1}},colors:["#D95448","#66DA26","#546E7A","#E91E63","#FF9800"],dataLabels:{enabled:!1},stroke:{curve:"smooth"},title:{align:"left"},markers:{size:0},tooltip:{enabled:!0,followCursor:!0,fillSeriesColor:!0,x:{show:!1}},xaxis:{type:"datetime",tickAmount:3,range:3e4,labels:{style:{colors:"#592D1D"},formatter:function(e){var t=new Date,r="";return e>=t.getTime()-31e3&&(r="T-30"),e>=t.getTime()-21e3&&(r="T-20"),e>=t.getTime()-11e3&&(r="T-10"),e>=t.getTime()-1e3&&(r="Now"),r}}},yaxis:{labels:{style:{colors:"#592D1D"}},title:{text:"TEMPERATURE (°C)",rotate:-90,offsetX:-5,offsetY:0,style:{color:"#592D1D",fontSize:"12px",fontFamily:"customfont2",fontWeight:600}}},legend:{show:!1}},series:[{name:"Temperature",data:this.temperature}]}},mounted:function(){this.updateChart()},watch:{chartHeight:function(){this.resize()}},methods:{resize:function(){var e=this;setTimeout((function(){return e.chartOptions={chart:{height:"100%"}}}),3e3)},initChart:function(){this.chartData=this.dataArray},updateChart:function(){var e=this,t=this;this.intervalid1=setInterval((function(){e.chartData.length<25&&e.initChart(),e.chartData.length>360&&(e.chartData=e.dataArray),e.dict={x:e.dataArray[e.dataArray.length-1].x,y:e.dataArray[e.dataArray.length-1].y},e.chartData.push(e.dict),t.$refs.chart.updateSeries([{data:e.chartData}])}),500)}}}),b=r("6b0d"),O=r.n(b),g=r("f09f"),j=r("a370"),v=r("93dc"),V=r.n(v);const x=O()(h,[["render",p]]);var D=x;V()(h,"components",{QCard:g["a"],QCardSection:j["a"]});var N={class:"info-container"},w={class:"row items-center no-wrap"},T={class:"col"},y=Object(n["createElementVNode"])("div",{class:"text-subtitle1"},"TEMPERATURE",-1),E={class:"text-h3"},_={class:"row items-center no-wrap"},C={class:"col"},P=Object(n["createElementVNode"])("div",{class:"text-subtitle1"},"TARGET TEMPERATURE",-1),I={class:"text-h3"},S={class:"row items-center no-wrap"},A={class:"col"},k=Object(n["createElementVNode"])("div",{class:"text-subtitle1"},"Settings",-1),R={class:"pid-container"},q={class:"text-h5 text-weight-bold pid-item"},F=Object(n["createTextVNode"])(" P:"),H={class:"text-h5"},Q={class:"text-h5 text-weight-bold pid-item"},U=Object(n["createTextVNode"])(" I:"),z={class:"text-h5"},L={class:"text-h5 text-weight-bold pid-item"},M=Object(n["createTextVNode"])(" D:"),B={class:"text-h5"},G=Object(n["createElementVNode"])("div",{class:"text-h5"},"PID Settings",-1),J={class:"settings-container"},$={class:"settings-item"},K={class:"settings-item"},W={class:"settings-item"},X={class:"settings-item2"};function Y(e,t,r,a,o,c){var i=Object(n["resolveComponent"])("q-card-section"),s=Object(n["resolveComponent"])("q-card"),l=Object(n["resolveComponent"])("q-btn"),d=Object(n["resolveComponent"])("q-card-actions"),u=Object(n["resolveComponent"])("q-space"),p=Object(n["resolveComponent"])("q-input"),m=Object(n["resolveComponent"])("q-dialog"),f=Object(n["resolveDirective"])("close-popup");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",N,[Object(n["createVNode"])(s,{flat:"",bordered:"",class:"rounded info-temperature bg-white text-primary no-margin"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",w,[Object(n["createElementVNode"])("div",T,[y,Object(n["createElementVNode"])("div",E,Object(n["toDisplayString"])(r.currentTemperature),1)])])]})),_:1})]})),_:1}),Object(n["createVNode"])(s,{flat:"",bordered:"",class:"rounded info-targetTemperature bg-white text-primary no-margin"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",_,[Object(n["createElementVNode"])("div",C,[P,Object(n["createElementVNode"])("div",I,Object(n["toDisplayString"])(r.targetTemperature),1)])])]})),_:1})]})),_:1}),Object(n["createVNode"])(s,{flat:"",bordered:"",class:"rounded info-pid bg-white text-primary no-margin"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",S,[Object(n["createElementVNode"])("div",A,[k,Object(n["createElementVNode"])("div",R,[Object(n["createElementVNode"])("div",q,[F,Object(n["createElementVNode"])("span",H,Object(n["toDisplayString"])(r.P),1)]),Object(n["createElementVNode"])("div",Q,[U,Object(n["createElementVNode"])("span",z,Object(n["toDisplayString"])(r.I),1)]),Object(n["createElementVNode"])("div",L,[M,Object(n["createElementVNode"])("span",B,Object(n["toDisplayString"])(r.D),1)])])])])]})),_:1}),Object(n["createVNode"])(d,{class:"justify-center"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(l,{color:"red",size:"22px",icon:"settings",label:"Settings",class:"full-width rounded",onClick:t[0]||(t[0]=function(t){c.updateForm(),e.settings=!0})})]})),_:1})]})),_:1}),Object(n["createVNode"])(m,{modelValue:e.settings,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.settings=t}),persistent:"","transition-show":"flip-down","transition-hide":"flip-up"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,{class:"rounded"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{class:"row items-center q-pb-none bg-white text-primary"},{default:Object(n["withCtx"])((function(){return[G,Object(n["createVNode"])(u),Object(n["withDirectives"])(Object(n["createVNode"])(l,{icon:"close",flat:"",round:"",dense:""},null,512),[[f]]),Object(n["withDirectives"])(Object(n["createVNode"])(l,{icon:"done",flat:"",round:"",dense:"",onClick:t[1]||(t[1]=function(e){return c.passEvent()})},null,512),[[f]])]})),_:1}),Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",J,[Object(n["createElementVNode"])("div",$,[Object(n["createVNode"])(p,{rounded:"",standout:"bg-red text-white",modelValue:e.form_P,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.form_P=t}),label:"P",dense:e.dense},null,8,["modelValue","dense"])]),Object(n["createElementVNode"])("div",K,[Object(n["createVNode"])(p,{rounded:"",standout:"bg-red text-white",modelValue:e.form_I,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.form_I=t}),label:"I",dense:e.dense},null,8,["modelValue","dense"])]),Object(n["createElementVNode"])("div",W,[Object(n["createVNode"])(p,{rounded:"",standout:"bg-red text-white",modelValue:e.form_D,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.form_D=t}),label:"D",dense:e.dense},null,8,["modelValue","dense"])]),Object(n["createElementVNode"])("div",X,[Object(n["createVNode"])(p,{rounded:"",standout:"bg-red text-white",modelValue:e.form_targetTemperature,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.form_targetTemperature=t}),label:"Target Temperature",dense:e.dense},null,8,["modelValue","dense"])])])]})),_:1})]})),_:1})]})),_:1},8,["modelValue"])])}var Z={name:"Info",props:["P","I","D","targetTemperature","currentTemperature","pidRecieved"],data:function(){return{displayTemperature:0,form_P:this.P,form_I:this.I,form_D:this.D,form_targetTemperature:this.targetTemperature}},methods:{passEvent:function(){var e=this,t={P:this.form_P,I:this.form_I,D:this.form_D,targetTemperature:this.form_targetTemperature};this.$emit("setPID",t),setTimeout((function(){return e.showNotification()}),100)},updateForm:function(){this.form_P=this.P,this.form_I=this.I,this.form_D=this.D,this.form_targetTemperature=this.targetTemperature},showNotification:function(){1==this.pidRecieved&&this.$q.notify({icon:null,color:"green",position:"top",message:"PID settings updated successfully!",timeout:3e3})}}},ee=r("4b7e"),te=r("9c40"),re=r("24e8"),ne=r("2c91"),ae=r("27f9"),oe=r("7f67");const ce=O()(Z,[["render",Y]]);var ie=ce;V()(Z,"components",{QCard:g["a"],QCardSection:j["a"],QCardActions:ee["a"],QBtn:te["a"],QDialog:re["a"],QSpace:ne["a"],QInput:ae["a"]}),V()(Z,"directives",{ClosePopup:oe["a"]});var se=r("daa8"),le=r("14d9"),de=se["a"].connect(le.VUE_SOCKET_ENDPOINT),ue={components:{Graph:D,Info:ie},data:function(){return{settingsJsonData:le,P:"",I:"",D:"",targetTemperature:"",currentTemperature:"",dataArray:[],vueSocketEndpoint:"",chartHeight:null,pidRecieved:!1}},created:function(){this.getTemperature(),this.getPID()},beforeMount:function(){this.getPID()},mounted:function(){this.askForTemperature(),this.askForPID(),this.$nextTick((function(){window.addEventListener("resize",this.updateChartHeight),this.updateChartHeight()}))},methods:{getTemperature:function(){var e=this;de.on("recieve_temperature",(function(t){e.dataArray=t,e.currentTemperature=t.at(-1).y.toFixed(2)}))},getPID:function(){var e=this;de.on("give_PID",(function(t){e.P=t["PID"]["P"],e.I=t["PID"]["I"],e.D=t["PID"]["D"],e.targetTemperature=t["TargetTemperature"],e.pidRecieved=!0,setTimeout((function(){return e.pidRecieved=!1}),3e3)}))},askForTemperature:function(){setInterval((function(){de.emit("send_temperature")}),500)},askForPID:function(){de.emit("get_PID")},setPID:function(e){de.emit("send_PID",e)},updateChartHeight:function(){this.chartHeight=this.$refs.graph.clientHeight}}},pe=(r("85ff"),r("4d5a")),me=r("09e3"),fe=r("9989");const he=O()(ue,[["render",u],["__scopeId","data-v-36d05f7f"]]);var be=he;V()(ue,"components",{QLayout:pe["a"],QPageContainer:me["a"],QPage:fe["a"]});var Oe=r("b05d"),ge=r("2a19"),je=(r("c867"),r("e54f"),{config:{},plugins:{}});Object(n["createApp"])(be).use(Oe["a"],{plugins:{Notify:ge["a"]},config:{notify:{}}},je).mount("#app")},5923:function(e,t,r){},"85ff":function(e,t,r){"use strict";r("3001")},c867:function(e,t,r){}});
//# sourceMappingURL=app.c971efeb.js.map