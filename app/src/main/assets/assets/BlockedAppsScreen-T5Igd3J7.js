import{j as e}from"./vendor-ui-Cxe4J1D7.js";import{c as p}from"./index-IzRDjdTz.js";import{u}from"./vendor-react-CTSaywpw.js";import{C as h}from"./chevron-right-CsZCuQHV.js";import{c as o}from"./createLucideIcon-D6uLTmh6.js";import"./vendor-firebase-CW1UtntS.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]],g=o("gamepad-2",y);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]],k=o("instagram",f);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]],s=o("message-circle",b);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],r=o("music",j);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]],N=o("twitter",v);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]],A=o("youtube",w),_=[{id:"instagram",icon:k,name:"Instagram",color:"text-pink-400"},{id:"whatsapp",icon:s,name:"WhatsApp",color:"text-green-400"},{id:"twitter",icon:N,name:"Twitter",color:"text-blue-400"},{id:"youtube",icon:A,name:"YouTube",color:"text-red-400"},{id:"spotify",icon:r,name:"Spotify",color:"text-emerald-400"},{id:"tiktok",icon:r,name:"TikTok",color:"text-cyan-400"},{id:"snapchat",icon:s,name:"Snapchat",color:"text-yellow-400"},{id:"games",icon:g,name:"الألعاب",color:"text-purple-400"}];function S(){const i=u(),{blockedApps:n,setBlockedApp:a,blockAllApps:l}=p(),d=t=>{a(t,!n[t])},m=Object.values(n).filter(Boolean).length;return e.jsxs("div",{className:"min-h-screen bg-background flex flex-col px-4 overflow-y-auto hide-scrollbar",style:{paddingTop:"calc(env(safe-area-inset-top, 0px) + 20px)",paddingBottom:"calc(env(safe-area-inset-bottom, 0px) + 24px)"},children:[e.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[e.jsx("button",{onClick:()=>i("/home"),className:"w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition",children:e.jsx(h,{className:"w-6 h-6"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h1",{className:"text-foreground text-2xl font-bold",children:"التطبيقات المحظورة"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:[m," تطبيق محظور"]})]})]}),e.jsx("button",{onClick:l,className:"mb-6 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl hover:opacity-90 transition",children:"حظر جميع تطبيقات التواصل"}),e.jsx("div",{className:"flex-1 space-y-3",children:_.map(t=>{const x=t.icon,c=n[t.id];return e.jsxs("button",{onClick:()=>d(t.id),className:"w-full bg-card rounded-2xl p-5 flex items-center gap-4 hover:bg-muted transition border border-border",children:[e.jsx("div",{className:`p-3 rounded-xl ${c?"bg-red-500/20":"bg-muted"}`,children:e.jsx(x,{className:`w-6 h-6 ${c?"text-red-400":t.color}`})}),e.jsxs("div",{className:"flex-1 text-right",children:[e.jsx("h3",{className:"text-foreground font-medium",children:t.name}),e.jsx("p",{className:"text-muted-foreground text-sm",children:c?"محظور":"غير محظور"})]}),e.jsx("div",{className:`w-12 h-7 rounded-full transition relative ${c?"bg-red-500":"bg-muted"}`,children:e.jsx("div",{className:`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${c?"left-1":"right-1"}`})})]},t.id)})})]})}export{S as BlockedAppsScreen};
