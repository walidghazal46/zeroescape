const zp=()=>{};var ml={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp={SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea=function(r,e){if(!r)throw Gp(e)},Gp=function(r){return new Error("Firebase Database ("+Kp.SDK_VERSION+") INTERNAL ASSERT FAILED: "+r)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Hp=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Rd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,u=s+2<r.length,h=u?r[s+2]:0,f=i>>2,g=(i&3)<<4|c>>4;let I=(c&15)<<2|h>>6,b=h&63;u||(b=64,o||(I=64)),n.push(t[f],t[g],t[I],t[b])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Ad(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Hp(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const g=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||g==null)throw new Wp;const I=i<<2|c>>4;if(n.push(I),h!==64){const b=c<<4&240|h>>2;if(n.push(b),g!==64){const V=h<<6&192|g;n.push(V)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Wp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Qp=function(r){const e=Ad(r);return Rd.encodeByteArray(e,!0)},Sd=function(r){return Qp(r).replace(/\./g,"")},bd=function(r){try{return Rd.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp=()=>Pd().__FIREBASE_DEFAULTS__,Yp=()=>{if(typeof process>"u"||typeof ml>"u")return;const r=ml.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Xp=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&bd(r[1]);return e&&JSON.parse(e)},eo=()=>{try{return zp()||Jp()||Yp()||Xp()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Cd=r=>{var e,t;return(t=(e=eo())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},Zp=r=>{const e=Cd(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Vd=()=>{var r;return(r=eo())==null?void 0:r.config},kd=r=>{var e;return(e=eo())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function t_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ye())}function Dd(){var e;const r=(e=eo())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function n_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function r_(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function s_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function i_(){const r=ye();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Nd(){return!Dd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function xd(){return!Dd()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function nc(){try{return typeof indexedDB=="object"}catch{return!1}}function o_(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a_="FirebaseError";class Ge extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=a_,Object.setPrototypeOf(this,Ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Nn.prototype.create)}}class Nn{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?c_(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Ge(s,c,n)}}function c_(r,e){return r.replace(u_,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const u_=/\{\$([^}]+)}/g;function l_(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function $t(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(gl(i)&&gl(o)){if(!$t(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function gl(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Gr(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Hr(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function h_(r,e){const t=new d_(r,e);return t.subscribe.bind(t)}class d_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");f_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=ea),s.error===void 0&&(s.error=ea),s.complete===void 0&&(s.complete=ea);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function f_(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function ea(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_=1e3,g_=2,p_=14400*1e3,__=.5;function Od(r,e=m_,t=g_){const n=e*Math.pow(t,r),s=Math.round(__*n*(Math.random()-.5)*2);return Math.min(p_,n+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function rc(r){return(await fetch(r,{credentials:"include"})).ok}class Xe{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new e_;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(E_(e))try{this.getOrInitializeService({instanceIdentifier:cn})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=cn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=cn){return this.instances.has(e)}getOptions(e=cn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:I_(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=cn){return this.component?this.component.multipleInstances?e:cn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function I_(r){return r===cn?void 0:r}function E_(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new y_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));const w_={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},v_=H.INFO,A_={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},R_=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=A_[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class to{constructor(e){this.name=e,this._logLevel=v_,this._logHandler=R_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?w_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const S_=(r,e)=>e.some(t=>r instanceof t);let pl,_l;function b_(){return pl||(pl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function P_(){return _l||(_l=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Md=new WeakMap,Ta=new WeakMap,Ld=new WeakMap,ta=new WeakMap,sc=new WeakMap;function C_(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(Ft(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Md.set(t,r)}).catch(()=>{}),sc.set(e,r),e}function V_(r){if(Ta.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});Ta.set(r,e)}let wa={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Ta.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Ld.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ft(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function k_(r){wa=r(wa)}function D_(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(na(this),e,...t);return Ld.set(n,e.sort?e.sort():[e]),Ft(n)}:P_().includes(r)?function(...e){return r.apply(na(this),e),Ft(Md.get(this))}:function(...e){return Ft(r.apply(na(this),e))}}function N_(r){return typeof r=="function"?D_(r):(r instanceof IDBTransaction&&V_(r),S_(r,b_())?new Proxy(r,wa):r)}function Ft(r){if(r instanceof IDBRequest)return C_(r);if(ta.has(r))return ta.get(r);const e=N_(r);return e!==r&&(ta.set(r,e),sc.set(e,r)),e}const na=r=>sc.get(r);function Fd(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=Ft(o);return n&&o.addEventListener("upgradeneeded",u=>{n(Ft(o.result),u.oldVersion,u.newVersion,Ft(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const x_=["get","getKey","getAll","getAllKeys","count"],O_=["put","add","delete","clear"],ra=new Map;function yl(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(ra.get(e))return ra.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=O_.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||x_.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return ra.set(e,i),i}k_(r=>({...r,get:(e,t,n)=>yl(e,t)||r.get(e,t,n),has:(e,t)=>!!yl(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(L_(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function L_(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const va="@firebase/app",Il="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft=new to("@firebase/app"),F_="@firebase/app-compat",U_="@firebase/analytics-compat",B_="@firebase/analytics",q_="@firebase/app-check-compat",j_="@firebase/app-check",$_="@firebase/auth",z_="@firebase/auth-compat",K_="@firebase/database",G_="@firebase/data-connect",H_="@firebase/database-compat",W_="@firebase/functions",Q_="@firebase/functions-compat",J_="@firebase/installations",Y_="@firebase/installations-compat",X_="@firebase/messaging",Z_="@firebase/messaging-compat",ey="@firebase/performance",ty="@firebase/performance-compat",ny="@firebase/remote-config",ry="@firebase/remote-config-compat",sy="@firebase/storage",iy="@firebase/storage-compat",oy="@firebase/firestore",ay="@firebase/ai",cy="@firebase/firestore-compat",uy="firebase",ly="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa="[DEFAULT]",hy={[va]:"fire-core",[F_]:"fire-core-compat",[B_]:"fire-analytics",[U_]:"fire-analytics-compat",[j_]:"fire-app-check",[q_]:"fire-app-check-compat",[$_]:"fire-auth",[z_]:"fire-auth-compat",[K_]:"fire-rtdb",[G_]:"fire-data-connect",[H_]:"fire-rtdb-compat",[W_]:"fire-fn",[Q_]:"fire-fn-compat",[J_]:"fire-iid",[Y_]:"fire-iid-compat",[X_]:"fire-fcm",[Z_]:"fire-fcm-compat",[ey]:"fire-perf",[ty]:"fire-perf-compat",[ny]:"fire-rc",[ry]:"fire-rc-compat",[sy]:"fire-gcs",[iy]:"fire-gcs-compat",[oy]:"fire-fst",[cy]:"fire-fst-compat",[ay]:"fire-vertex","fire-js":"fire-js",[uy]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci=new Map,dy=new Map,Ra=new Map;function El(r,e){try{r.container.addComponent(e)}catch(t){ft.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function ct(r){const e=r.name;if(Ra.has(e))return ft.debug(`There were multiple attempts to register component ${e}.`),!1;Ra.set(e,r);for(const t of Ci.values())El(t,r);for(const t of dy.values())El(t,r);return!0}function xn(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Se(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ut=new Nn("app","Firebase",fy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Xe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ut.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt=ly;function gy(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:Aa,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw Ut.create("bad-app-name",{appName:String(s)});if(t||(t=Vd()),!t)throw Ut.create("no-options");const i=Ci.get(s);if(i){if($t(t,i.options)&&$t(n,i.config))return i;throw Ut.create("duplicate-app",{appName:s})}const o=new T_(s);for(const u of Ra.values())o.addComponent(u);const c=new my(t,n,o);return Ci.set(s,c),c}function ic(r=Aa){const e=Ci.get(r);if(!e&&r===Aa&&Vd())return gy();if(!e)throw Ut.create("no-app",{appName:r});return e}function Me(r,e,t){let n=hy[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ft.warn(o.join(" "));return}ct(new Xe(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py="firebase-heartbeat-database",_y=1,cs="firebase-heartbeat-store";let sa=null;function Ud(){return sa||(sa=Fd(py,_y,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(cs)}catch(t){console.warn(t)}}}}).catch(r=>{throw Ut.create("idb-open",{originalErrorMessage:r.message})})),sa}async function yy(r){try{const t=(await Ud()).transaction(cs),n=await t.objectStore(cs).get(Bd(r));return await t.done,n}catch(e){if(e instanceof Ge)ft.warn(e.message);else{const t=Ut.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ft.warn(t.message)}}}async function Tl(r,e){try{const n=(await Ud()).transaction(cs,"readwrite");await n.objectStore(cs).put(e,Bd(r)),await n.done}catch(t){if(t instanceof Ge)ft.warn(t.message);else{const n=Ut.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ft.warn(n.message)}}}function Bd(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iy=1024,Ey=30;class Ty{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new vy(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=wl();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Ey){const o=Ay(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){ft.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=wl(),{heartbeatsToSend:n,unsentEntries:s}=wy(this._heartbeatsCache.heartbeats),i=Sd(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return ft.warn(t),""}}}function wl(){return new Date().toISOString().substring(0,10)}function wy(r,e=Iy){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),vl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),vl(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class vy{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return nc()?o_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await yy(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Tl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Tl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function vl(r){return Sd(JSON.stringify({version:2,heartbeats:r})).length}function Ay(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ry(r){ct(new Xe("platform-logger",e=>new M_(e),"PRIVATE")),ct(new Xe("heartbeat",e=>new Ty(e),"PRIVATE")),Me(va,Il,r),Me(va,Il,"esm2020"),Me("fire-js","")}Ry("");function qd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Sy=qd,jd=new Nn("auth","Firebase",qd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vi=new to("@firebase/auth");function by(r,...e){Vi.logLevel<=H.WARN&&Vi.warn(`Auth (${zt}): ${r}`,...e)}function di(r,...e){Vi.logLevel<=H.ERROR&&Vi.error(`Auth (${zt}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(r,...e){throw ac(r,...e)}function Qe(r,...e){return ac(r,...e)}function oc(r,e,t){const n={...Sy(),[e]:t};return new Nn("auth","Firebase",n).create(e,{appName:r.name})}function Je(r){return oc(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $d(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&ze(r,"argument-error"),oc(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ac(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return jd.create(r,...e)}function q(r,e,...t){if(!r)throw ac(e,...t)}function lt(r){const e="INTERNAL ASSERTION FAILED: "+r;throw di(e),new Error(e)}function mt(r,e){r||lt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function Py(){return Al()==="http:"||Al()==="https:"}function Al(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Py()||r_()||"connection"in navigator)?navigator.onLine:!0}function Vy(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,t){this.shortDelay=e,this.longDelay=t,mt(t>e,"Short delay should be less than long delay!"),this.isMobile=t_()||s_()}get(){return Cy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cc(r,e){mt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;lt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;lt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;lt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Ny=new Rs(3e4,6e4);function Qt(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function Jt(r,e,t,n,s={}){return Kd(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=As({key:r.config.apiKey,...o}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:u,...i};return n_()||(h.referrerPolicy="no-referrer"),r.emulatorConfig&&yr(r.emulatorConfig.host)&&(h.credentials="include"),zd.fetch()(await Gd(r,r.config.apiHost,t,c),h)})}async function Kd(r,e,t){r._canInitEmulator=!1;const n={...ky,...e};try{const s=new Oy(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw si(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw si(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw si(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw si(r,"user-disabled",o);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw oc(r,f,h);ze(r,f)}}catch(s){if(s instanceof Ge)throw s;ze(r,"network-request-failed",{message:String(s)})}}async function Ss(r,e,t,n,s={}){const i=await Jt(r,e,t,n,s);return"mfaPendingCredential"in i&&ze(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function Gd(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?cc(r.config,s):`${r.config.apiScheme}://${s}`;return Dy.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function xy(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Oy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Qe(this.auth,"network-request-failed")),Ny.get())})}}function si(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=Qe(r,e,n);return s.customData._tokenResponse=t,s}function Rl(r){return r!==void 0&&r.enterprise!==void 0}class My{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return xy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Ly(r,e){return Jt(r,"GET","/v2/recaptchaConfig",Qt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fy(r,e){return Jt(r,"POST","/v1/accounts:delete",e)}async function ki(r,e){return Jt(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Uy(r,e=!1){const t=re(r),n=await t.getIdToken(e),s=uc(n);q(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:Zr(ia(s.auth_time)),issuedAtTime:Zr(ia(s.iat)),expirationTime:Zr(ia(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ia(r){return Number(r)*1e3}function uc(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return di("JWT malformed, contained fewer than 3 sections"),null;try{const s=bd(t);return s?JSON.parse(s):(di("Failed to decode base64 JWT payload"),null)}catch(s){return di("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Sl(r){const e=uc(r);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function us(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Ge&&By(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function By({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Zr(this.lastLoginAt),this.creationTime=Zr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Di(r){var g;const e=r.auth,t=await r.getIdToken(),n=await us(r,ki(e,{idToken:t}));q(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=(g=s.providerUserInfo)!=null&&g.length?Hd(s.providerUserInfo):[],o=$y(r.providerData,i),c=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new ba(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function jy(r){const e=re(r);await Di(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $y(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function Hd(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zy(r,e){const t=await Kd(r,{},async()=>{const n=As({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await Gd(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&yr(r.emulatorConfig.host)&&(u.credentials="include"),zd.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ky(r,e){return Jt(r,"POST","/v2/accounts:revokeToken",Qt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Sl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=Sl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await zy(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Yn;return n&&(q(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(q(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(q(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Yn,this.toJSON())}_performRefresh(){return lt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(r,e){q(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class We{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new qy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ba(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await us(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Uy(this,e)}reload(){return jy(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new We({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Di(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Se(this.auth.app))return Promise.reject(Je(this.auth));const e=await this.getIdToken();return await us(this,Fy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:g,emailVerified:I,isAnonymous:b,providerData:V,stsTokenManager:D}=t;q(g&&D,e,"internal-error");const x=Yn.fromJSON(this.name,D);q(typeof g=="string",e,"internal-error"),bt(n,e.name),bt(s,e.name),q(typeof I=="boolean",e,"internal-error"),q(typeof b=="boolean",e,"internal-error"),bt(i,e.name),bt(o,e.name),bt(c,e.name),bt(u,e.name),bt(h,e.name),bt(f,e.name);const $=new We({uid:g,auth:e,email:s,emailVerified:I,displayName:n,isAnonymous:b,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:x,createdAt:h,lastLoginAt:f});return V&&Array.isArray(V)&&($.providerData=V.map(L=>({...L}))),u&&($._redirectEventId=u),$}static async _fromIdTokenResponse(e,t,n=!1){const s=new Yn;s.updateFromServerResponse(t);const i=new We({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Di(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Hd(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Yn;c.updateFromIdToken(n);const u=new We({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ba(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl=new Map;function ht(r){mt(r instanceof Function,"Expected a class definition");let e=bl.get(r);return e?(mt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,bl.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Wd.type="NONE";const Pl=Wd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fi(r,e,t){return`firebase:${r}:${e}:${t}`}class Xn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=fi(this.userKey,s.apiKey,i),this.fullPersistenceKey=fi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ki(this.auth,{idToken:e}).catch(()=>{});return t?We._fromGetAccountInfoResponse(this.auth,t,e):null}return We._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Xn(ht(Pl),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||ht(Pl);const o=fi(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let g;if(typeof f=="string"){const I=await ki(e,{idToken:f}).catch(()=>{});if(!I)break;g=await We._fromGetAccountInfoResponse(e,I,f)}else g=We._fromJSON(e,f);h!==i&&(c=g),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Xn(i,e,n):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Xn(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Xd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Qd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ef(e))return"Blackberry";if(tf(e))return"Webos";if(Jd(e))return"Safari";if((e.includes("chrome/")||Yd(e))&&!e.includes("edge/"))return"Chrome";if(Zd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function Qd(r=ye()){return/firefox\//i.test(r)}function Jd(r=ye()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Yd(r=ye()){return/crios\//i.test(r)}function Xd(r=ye()){return/iemobile/i.test(r)}function Zd(r=ye()){return/android/i.test(r)}function ef(r=ye()){return/blackberry/i.test(r)}function tf(r=ye()){return/webos/i.test(r)}function lc(r=ye()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Gy(r=ye()){var e;return lc(r)&&!!((e=window.navigator)!=null&&e.standalone)}function Hy(){return i_()&&document.documentMode===10}function nf(r=ye()){return lc(r)||Zd(r)||tf(r)||ef(r)||/windows phone/i.test(r)||Xd(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rf(r,e=[]){let t;switch(r){case"Browser":t=Cl(ye());break;case"Worker":t=`${Cl(ye())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${zt}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qy(r,e={}){return Jt(r,"GET","/v2/passwordPolicy",Qt(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy=6;class Yy{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Jy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Vl(this),this.idTokenSubscription=new Vl(this),this.beforeStateQueue=new Wy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=jd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ht(t)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted&&(this.persistenceManager=await Xn.create(this,e),(n=this._resolvePersistenceManagerAvailable)==null||n.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ki(this,{idToken:e}),n=await We._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Se(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=n==null?void 0:n._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(n=u.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Di(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Vy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Se(this.app))return Promise.reject(Je(this));const t=e?re(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Se(this.app)?Promise.reject(Je(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Se(this.app)?Promise.reject(Je(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ht(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Qy(this),t=new Yy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Nn("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Ky(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ht(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await Xn.create(this,[ht(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=rf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(Se(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&by(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Ze(r){return re(r)}class Vl{constructor(e){this.auth=e,this.observer=null,this.addObserver=h_(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let no={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Zy(r){no=r}function sf(r){return no.loadJS(r)}function eI(){return no.recaptchaEnterpriseScript}function tI(){return no.gapiScript}function nI(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class rI{constructor(){this.enterprise=new sI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class sI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const iI="recaptcha-enterprise",of="NO_RECAPTCHA";class oI{constructor(e){this.type=iI,this.auth=Ze(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{Ly(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new My(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Rl(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(of)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new rI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{n(this.auth).then(c=>{if(!t&&Rl(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=eI();u.length!==0&&(u+=c),sf(u).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function kl(r,e,t,n=!1,s=!1){const i=new oI(r);let o;if(s)o=of;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return n?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Pa(r,e,t,n,s){var i;if((i=r._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await kl(r,e,t,t==="getOobCode");return n(r,o)}else return n(r,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await kl(r,e,t,t==="getOobCode");return n(r,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aI(r,e){const t=xn(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if($t(i,e??{}))return s;ze(s,"already-initialized")}return t.initialize({options:e})}function cI(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(ht);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function uI(r,e,t){const n=Ze(r);q(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=af(e),{host:o,port:c}=lI(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){q(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),q($t(h,n.config.emulator)&&$t(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,yr(o)?rc(`${i}//${o}${u}`):hI()}function af(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function lI(r){const e=af(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:Dl(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:Dl(o)}}}function Dl(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function hI(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return lt("not implemented")}_getIdTokenResponse(e){return lt("not implemented")}_linkToIdToken(e,t){return lt("not implemented")}_getReauthenticationResolver(e){return lt("not implemented")}}async function dI(r,e){return Jt(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fI(r,e){return Ss(r,"POST","/v1/accounts:signInWithPassword",Qt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mI(r,e){return Ss(r,"POST","/v1/accounts:signInWithEmailLink",Qt(r,e))}async function gI(r,e){return Ss(r,"POST","/v1/accounts:signInWithEmailLink",Qt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls extends hc{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new ls(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new ls(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Pa(e,t,"signInWithPassword",fI);case"emailLink":return mI(e,{email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Pa(e,n,"signUpPassword",dI);case"emailLink":return gI(e,{idToken:t,email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zn(r,e){return Ss(r,"POST","/v1/accounts:signInWithIdp",Qt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pI="http://localhost";class wn extends hc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new wn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ze("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new wn(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Zn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Zn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zn(e,t)}buildRequest(){const e={requestUri:pI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=As(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _I(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function yI(r){const e=Gr(Hr(r)).link,t=e?Gr(Hr(e)).deep_link_id:null,n=Gr(Hr(r)).deep_link_id;return(n?Gr(Hr(n)).link:null)||n||t||e||r}class dc{constructor(e){const t=Gr(Hr(e)),n=t.apiKey??null,s=t.oobCode??null,i=_I(t.mode??null);q(n&&s&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=yI(e);try{return new dc(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(){this.providerId=Ir.PROVIDER_ID}static credential(e,t){return ls._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=dc.parseLink(t);return q(n,"argument-error"),ls._fromEmailAndCode(e,n.code,n.tenantId)}}Ir.PROVIDER_ID="password";Ir.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ir.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs extends ro{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends bs{constructor(){super("facebook.com")}static credential(e){return wn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dt.credential(e.oauthAccessToken)}catch{return null}}}Dt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt extends bs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return wn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Nt.credential(t,n)}catch{return null}}}Nt.GOOGLE_SIGN_IN_METHOD="google.com";Nt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends bs{constructor(){super("github.com")}static credential(e){return wn._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return xt.credential(e.oauthAccessToken)}catch{return null}}}xt.GITHUB_SIGN_IN_METHOD="github.com";xt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends bs{constructor(){super("twitter.com")}static credential(e,t){return wn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Ot.credential(t,n)}catch{return null}}}Ot.TWITTER_SIGN_IN_METHOD="twitter.com";Ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cf(r,e){return Ss(r,"POST","/v1/accounts:signUp",Qt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await We._fromIdTokenResponse(e,n,s),o=Nl(n);return new gt({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=Nl(n);return new gt({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function Nl(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KR(r){var s;if(Se(r.app))return Promise.reject(Je(r));const e=Ze(r);if(await e._initializationPromise,(s=e.currentUser)!=null&&s.isAnonymous)return new gt({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await cf(e,{returnSecureToken:!0}),n=await gt._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(n.user),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni extends Ge{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Ni.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Ni(e,t,n,s)}}function uf(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ni._fromErrorAndOperation(r,i,e,n):i})}async function II(r,e,t=!1){const n=await us(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return gt._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI(r,e,t=!1){const{auth:n}=r;if(Se(n.app))return Promise.reject(Je(n));const s="reauthenticate";try{const i=await us(r,uf(n,s,e,r),t);q(i.idToken,n,"internal-error");const o=uc(i.idToken);q(o,n,"internal-error");const{sub:c}=o;return q(r.uid===c,n,"user-mismatch"),gt._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ze(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lf(r,e,t=!1){if(Se(r.app))return Promise.reject(Je(r));const n="signIn",s=await uf(r,n,e),i=await gt._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}async function TI(r,e){return lf(Ze(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hf(r){const e=Ze(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function GR(r,e,t){if(Se(r.app))return Promise.reject(Je(r));const n=Ze(r),o=await Pa(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",cf).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&hf(r),u}),c=await gt._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(c.user),c}function HR(r,e,t){return Se(r.app)?Promise.reject(Je(r)):TI(re(r),Ir.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&hf(r),n})}function wI(r,e,t,n){return re(r).onIdTokenChanged(e,t,n)}function vI(r,e,t){return re(r).beforeAuthStateChanged(e,t)}function WR(r,e,t,n){return re(r).onAuthStateChanged(e,t,n)}function QR(r){return re(r).signOut()}const xi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(xi,"1"),this.storage.removeItem(xi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI=1e3,RI=10;class ff extends df{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=nf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);Hy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,RI):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},AI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ff.type="LOCAL";const SI=ff;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf extends df{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}mf.type="SESSION";const gf=mf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new so(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await bI(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}so.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=fc("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(g){const I=g;if(I.data.eventId===h)switch(I.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(I.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(){return window}function CI(r){it().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(){return typeof it().WorkerGlobalScope<"u"&&typeof it().importScripts=="function"}async function VI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function kI(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function DI(){return pf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _f="firebaseLocalStorageDb",NI=1,Oi="firebaseLocalStorage",yf="fbase_key";class Ps{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function io(r,e){return r.transaction([Oi],e?"readwrite":"readonly").objectStore(Oi)}function xI(){const r=indexedDB.deleteDatabase(_f);return new Ps(r).toPromise()}function Ca(){const r=indexedDB.open(_f,NI);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Oi,{keyPath:yf})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Oi)?e(n):(n.close(),await xI(),e(await Ca()))})})}async function xl(r,e,t){const n=io(r,!0).put({[yf]:e,value:t});return new Ps(n).toPromise()}async function OI(r,e){const t=io(r,!1).get(e),n=await new Ps(t).toPromise();return n===void 0?null:n.value}function Ol(r,e){const t=io(r,!0).delete(e);return new Ps(t).toPromise()}const MI=800,LI=3;class If{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ca(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>LI)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return pf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=so._getInstance(DI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await VI(),!this.activeServiceWorker)return;this.sender=new PI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||kI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ca();return await xl(e,xi,"1"),await Ol(e,xi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>xl(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>OI(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ol(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=io(s,!1).getAll();return new Ps(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),MI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}If.type="LOCAL";const FI=If;new Rs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(r,e){return e?ht(e):(q(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc extends hc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function UI(r){return lf(r.auth,new gc(r),r.bypassAuthState)}function BI(r){const{auth:e,user:t}=r;return q(t,e,"internal-error"),EI(t,new gc(r),r.bypassAuthState)}async function qI(r){const{auth:e,user:t}=r;return q(t,e,"internal-error"),II(t,new gc(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return UI;case"linkViaPopup":case"linkViaRedirect":return qI;case"reauthViaPopup":case"reauthViaRedirect":return BI;default:ze(this.auth,"internal-error")}}resolve(e){mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI=new Rs(2e3,1e4);async function JR(r,e,t){if(Se(r.app))return Promise.reject(Qe(r,"operation-not-supported-in-this-environment"));const n=Ze(r);$d(r,e,ro);const s=mc(n,t);return new gn(n,"signInViaPopup",e,s).executeNotNull()}class gn extends Ef{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,gn.currentPopupAction&&gn.currentPopupAction.cancel(),gn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){mt(this.filter.length===1,"Popup operations only handle one event");const e=fc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,gn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,jI.get())};e()}}gn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I="pendingRedirect",mi=new Map;class zI extends Ef{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=mi.get(this.auth._key());if(!e){try{const n=await KI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}mi.set(this.auth._key(),e)}return this.bypassAuthState||mi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function KI(r,e){const t=wf(e),n=Tf(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}async function GI(r,e){return Tf(r)._set(wf(e),"true")}function HI(r,e){mi.set(r._key(),e)}function Tf(r){return ht(r._redirectPersistence)}function wf(r){return fi($I,r.config.apiKey,r.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YR(r,e,t){return WI(r,e,t)}async function WI(r,e,t){if(Se(r.app))return Promise.reject(Je(r));const n=Ze(r);$d(r,e,ro),await n._initializationPromise;const s=mc(n,t);return await GI(s,n),s._openRedirect(n,e,"signInViaRedirect")}async function XR(r,e){return await Ze(r)._initializationPromise,vf(r,e,!1)}async function vf(r,e,t=!1){if(Se(r.app))return Promise.reject(Je(r));const n=Ze(r),s=mc(n,e),o=await new zI(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QI=600*1e3;class JI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!YI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Af(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(Qe(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=QI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ml(e))}saveEventToCache(e){this.cachedEventUids.add(Ml(e)),this.lastProcessedEventTime=Date.now()}}function Ml(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function Af({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function YI(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Af(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XI(r,e={}){return Jt(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,eE=/^https?/;async function tE(r){if(r.config.emulator)return;const{authorizedDomains:e}=await XI(r);for(const t of e)try{if(nE(t))return}catch{}ze(r,"unauthorized-domain")}function nE(r){const e=Sa(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!eE.test(t))return!1;if(ZI.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE=new Rs(3e4,6e4);function Ll(){const r=it().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function sE(r){return new Promise((e,t)=>{var s,i,o;function n(){Ll(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ll(),t(Qe(r,"network-request-failed"))},timeout:rE.get()})}if((i=(s=it().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=it().gapi)!=null&&o.load)n();else{const c=nI("iframefcb");return it()[c]=()=>{gapi.load?n():t(Qe(r,"network-request-failed"))},sf(`${tI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw gi=null,e})}let gi=null;function iE(r){return gi=gi||sE(r),gi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oE=new Rs(5e3,15e3),aE="__/auth/iframe",cE="emulator/auth/iframe",uE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},lE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function hE(r){const e=r.config;q(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?cc(e,cE):`https://${r.config.authDomain}/${aE}`,n={apiKey:e.apiKey,appName:r.name,v:zt},s=lE.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${As(n).slice(1)}`}async function dE(r){const e=await iE(r),t=it().gapi;return q(t,r,"internal-error"),e.open({where:document.body,url:hE(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:uE,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=Qe(r,"network-request-failed"),c=it().setTimeout(()=>{i(o)},oE.get());function u(){it().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},mE=500,gE=600,pE="_blank",_E="http://localhost";class Fl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function yE(r,e,t,n=mE,s=gE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={...fE,width:n.toString(),height:s.toString(),top:i,left:o},h=ye().toLowerCase();t&&(c=Yd(h)?pE:t),Qd(h)&&(e=e||_E,u.scrollbars="yes");const f=Object.entries(u).reduce((I,[b,V])=>`${I}${b}=${V},`,"");if(Gy(h)&&c!=="_self")return IE(e||"",c),new Fl(null);const g=window.open(e||"",c,f);q(g,r,"popup-blocked");try{g.focus()}catch{}return new Fl(g)}function IE(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EE="__/auth/handler",TE="emulator/auth/handler",wE=encodeURIComponent("fac");async function Ul(r,e,t,n,s,i){q(r.config.authDomain,r,"auth-domain-config-required"),q(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:zt,eventId:s};if(e instanceof ro){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",l_(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))o[f]=g}if(e instanceof bs){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${wE}=${encodeURIComponent(u)}`:"";return`${vE(r)}?${As(c).slice(1)}${h}`}function vE({config:r}){return r.emulator?cc(r,TE):`https://${r.authDomain}/${EE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa="webStorageSupport";class AE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=gf,this._completeRedirectFn=vf,this._overrideRedirectResult=HI}async _openPopup(e,t,n,s){var o;mt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Ul(e,t,n,Sa(),s);return yE(e,i,fc())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await Ul(e,t,n,Sa(),s);return CI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(mt(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await dE(e),n=new JI(e);return t.register("authEvent",s=>(q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(oa,{type:oa},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[oa];i!==void 0&&t(!!i),ze(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=tE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return nf()||Jd()||lc()}}const RE=AE;var Bl="@firebase/auth",ql="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bE(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function PE(r){ct(new Xe("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;q(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:rf(r)},h=new Xy(n,s,i,u);return cI(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),ct(new Xe("auth-internal",e=>{const t=Ze(e.getProvider("auth").getImmediate());return(n=>new SE(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Me(Bl,ql,bE(r)),Me(Bl,ql,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CE=300,VE=kd("authIdTokenMaxAge")||CE;let jl=null;const kE=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>VE)return;const s=t==null?void 0:t.token;jl!==s&&(jl=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function ZR(r=ic()){const e=xn(r,"auth");if(e.isInitialized())return e.getImmediate();const t=aI(r,{popupRedirectResolver:RE,persistence:[FI,SI,gf]}),n=kd("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=kE(i.toString());vI(t,o,()=>o(t.currentUser)),wI(t,c=>o(c))}}const s=Cd("auth");return s&&uI(t,`http://${s}`),t}function DE(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}Zy({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=Qe("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",DE().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});PE("Browser");var NE="firebase",xE="12.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me(NE,xE,"app");var $l=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bt,Rf;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,p){function y(){}y.prototype=p.prototype,E.F=p.prototype,E.prototype=new y,E.prototype.constructor=E,E.D=function(w,T,R){for(var _=Array(arguments.length-2),xe=2;xe<arguments.length;xe++)_[xe-2]=arguments[xe];return p.prototype[T].apply(w,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,y){y||(y=0);const w=Array(16);if(typeof p=="string")for(var T=0;T<16;++T)w[T]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(T=0;T<16;++T)w[T]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=E.g[0],y=E.g[1],T=E.g[2];let R=E.g[3],_;_=p+(R^y&(T^R))+w[0]+3614090360&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[1]+3905402710&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[2]+606105819&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[4]+4118548399&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[5]+1200080426&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[6]+2821735955&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[8]+1770035416&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[9]+2336552879&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[10]+4294925233&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[12]+1804603682&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[13]+4254626195&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[14]+2792965006&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(T^R&(y^T))+w[1]+4129170786&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[6]+3225465664&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[11]+643717713&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[5]+3593408605&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[10]+38016083&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[15]+3634488961&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[9]+568446438&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[14]+3275163606&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[3]+4107603335&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[13]+2850285829&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[2]+4243563512&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[7]+1735328473&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(y^T^R)+w[5]+4294588738&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[8]+2272392833&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[11]+1839030562&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[1]+2763975236&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[4]+1272893353&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[7]+4139469664&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[13]+681279174&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[0]+3936430074&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[3]+3572445317&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[9]+3654602809&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[12]+3873151461&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[15]+530742520&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(T^(y|~R))+w[0]+4096336452&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[7]+1126891415&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[14]+2878612391&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[12]+1700485571&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[3]+2399980690&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[10]+4293915773&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[8]+1873313359&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[15]+4264355552&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[6]+2734768916&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[4]+4149444226&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[11]+3174756917&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[2]+718787259&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+R&4294967295}n.prototype.v=function(E,p){p===void 0&&(p=E.length);const y=p-this.blockSize,w=this.C;let T=this.h,R=0;for(;R<p;){if(T==0)for(;R<=y;)s(this,E,R),R+=this.blockSize;if(typeof E=="string"){for(;R<p;)if(w[T++]=E.charCodeAt(R++),T==this.blockSize){s(this,w),T=0;break}}else for(;R<p;)if(w[T++]=E[R++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=p},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var y=E.length-8;y<E.length;++y)E[y]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)E[p++]=this.g[y]>>>w&255;return E};function i(E,p){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=p(E)}function o(E,p){this.h=p;const y=[];let w=!0;for(let T=E.length-1;T>=0;T--){const R=E[T]|0;w&&R==p||(y[T]=R,w=!1)}this.g=y}var c={};function u(E){return-128<=E&&E<128?i(E,function(p){return new o([p|0],p<0?-1:0)}):new o([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return g;if(E<0)return x(h(-E));const p=[];let y=1;for(let w=0;E>=y;w++)p[w]=E/y|0,y*=4294967296;return new o(p,0)}function f(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return x(f(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(p,8));let w=g;for(let R=0;R<E.length;R+=8){var T=Math.min(8,E.length-R);const _=parseInt(E.substring(R,R+T),p);T<8?(T=h(Math.pow(p,T)),w=w.j(T).add(h(_))):(w=w.j(y),w=w.add(h(_)))}return w}var g=u(0),I=u(1),b=u(16777216);r=o.prototype,r.m=function(){if(D(this))return-x(this).m();let E=0,p=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);E+=(w>=0?w:4294967296+w)*p,p*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(V(this))return"0";if(D(this))return"-"+x(this).toString(E);const p=h(Math.pow(E,6));var y=this;let w="";for(;;){const T=ne(y,p).g;y=$(y,T.j(p));let R=((y.g.length>0?y.g[0]:y.h)>>>0).toString(E);if(y=T,V(y))return R+w;for(;R.length<6;)R="0"+R;w=R+w}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function V(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function D(E){return E.h==-1}r.l=function(E){return E=$(this,E),D(E)?-1:V(E)?0:1};function x(E){const p=E.g.length,y=[];for(let w=0;w<p;w++)y[w]=~E.g[w];return new o(y,~E.h).add(I)}r.abs=function(){return D(this)?x(this):this},r.add=function(E){const p=Math.max(this.g.length,E.g.length),y=[];let w=0;for(let T=0;T<=p;T++){let R=w+(this.i(T)&65535)+(E.i(T)&65535),_=(R>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=_>>>16,R&=65535,_&=65535,y[T]=_<<16|R}return new o(y,y[y.length-1]&-2147483648?-1:0)};function $(E,p){return E.add(x(p))}r.j=function(E){if(V(this)||V(E))return g;if(D(this))return D(E)?x(this).j(x(E)):x(x(this).j(E));if(D(E))return x(this.j(x(E)));if(this.l(b)<0&&E.l(b)<0)return h(this.m()*E.m());const p=this.g.length+E.g.length,y=[];for(var w=0;w<2*p;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const R=this.i(w)>>>16,_=this.i(w)&65535,xe=E.i(T)>>>16,en=E.i(T)&65535;y[2*w+2*T]+=_*en,L(y,2*w+2*T),y[2*w+2*T+1]+=R*en,L(y,2*w+2*T+1),y[2*w+2*T+1]+=_*xe,L(y,2*w+2*T+1),y[2*w+2*T+2]+=R*xe,L(y,2*w+2*T+2)}for(E=0;E<p;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=p;E<2*p;E++)y[E]=0;return new o(y,0)};function L(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function U(E,p){this.g=E,this.h=p}function ne(E,p){if(V(p))throw Error("division by zero");if(V(E))return new U(g,g);if(D(E))return p=ne(x(E),p),new U(x(p.g),x(p.h));if(D(p))return p=ne(E,x(p)),new U(x(p.g),p.h);if(E.g.length>30){if(D(E)||D(p))throw Error("slowDivide_ only works with positive integers.");for(var y=I,w=p;w.l(E)<=0;)y=J(y),w=J(w);var T=Y(y,1),R=Y(w,1);for(w=Y(w,2),y=Y(y,2);!V(w);){var _=R.add(w);_.l(E)<=0&&(T=T.add(y),R=_),w=Y(w,1),y=Y(y,1)}return p=$(E,T.j(p)),new U(T,p)}for(T=g;E.l(p)>=0;){for(y=Math.max(1,Math.floor(E.m()/p.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),R=h(y),_=R.j(p);D(_)||_.l(E)>0;)y-=w,R=h(y),_=R.j(p);V(R)&&(R=I),T=T.add(R),E=$(E,_)}return new U(T,E)}r.B=function(E){return ne(this,E).h},r.and=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)&E.i(w);return new o(y,this.h&E.h)},r.or=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)|E.i(w);return new o(y,this.h|E.h)},r.xor=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)^E.i(w);return new o(y,this.h^E.h)};function J(E){const p=E.g.length+1,y=[];for(let w=0;w<p;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new o(y,E.h)}function Y(E,p){const y=p>>5;p%=32;const w=E.g.length-y,T=[];for(let R=0;R<w;R++)T[R]=p>0?E.i(R+y)>>>p|E.i(R+y+1)<<32-p:E.i(R+y);return new o(T,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Rf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Bt=o}).apply(typeof $l<"u"?$l:typeof self<"u"?self:typeof window<"u"?window:{});var ii=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Sf,Wr,bf,pi,Va,Pf,Cf,Vf;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ii=="object"&&ii];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var m=0;m<a.length-1;m++){var A=a[m];if(!(A in d))break e;d=d[A]}a=a[a.length-1],m=d[a],l=l(m),l!=m&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&d.push([m,l[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function g(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(m,A,S){for(var N=Array(arguments.length-2),K=2;K<arguments.length;K++)N[K-2]=arguments[K];return l.prototype[A].apply(m,N)}}var I=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function b(a){const l=a.length;if(l>0){const d=Array(l);for(let m=0;m<l;m++)d[m]=a[m];return d}return[]}function V(a,l){for(let m=1;m<arguments.length;m++){const A=arguments[m];var d=typeof A;if(d=d!="object"?d:A?Array.isArray(A)?"array":d:"null",d=="array"||d=="object"&&typeof A.length=="number"){d=a.length||0;const S=A.length||0;a.length=d+S;for(let N=0;N<S;N++)a[d+N]=A[N]}else a.push(A)}}class D{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function x(a){o.setTimeout(()=>{throw a},0)}function $(){var a=E;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class L{constructor(){this.h=this.g=null}add(l,d){const m=U.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var U=new D(()=>new ne,a=>a.reset());class ne{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let J,Y=!1,E=new L,p=()=>{const a=Promise.resolve(void 0);J=()=>{a.then(y)}};function y(){for(var a;a=$();){try{a.h.call(a.g)}catch(d){x(d)}var l=U;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}Y=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var R=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function _(a){return/^[\s\xa0]*$/.test(a)}function xe(a,l){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}g(xe,T),xe.prototype.init=function(a,l){const d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&xe.Z.h.call(this)},xe.prototype.h=function(){xe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var en="closure_listenable_"+(Math.random()*1e6|0),dp=0;function fp(a,l,d,m,A){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=A,this.key=++dp,this.da=this.fa=!1}function $s(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function zs(a,l,d){for(const m in a)l.call(d,a[m],m,a)}function mp(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function fu(a){const l={};for(const d in a)l[d]=a[d];return l}const mu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function gu(a,l){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)a[d]=m[d];for(let S=0;S<mu.length;S++)d=mu[S],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function Ks(a){this.src=a,this.g={},this.h=0}Ks.prototype.add=function(a,l,d,m,A){const S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);const N=ko(a,l,m,A);return N>-1?(l=a[N],d||(l.fa=!1)):(l=new fp(l,this.src,S,!!m,A),l.fa=d,a.push(l)),l};function Vo(a,l){const d=l.type;if(d in a.g){var m=a.g[d],A=Array.prototype.indexOf.call(m,l,void 0),S;(S=A>=0)&&Array.prototype.splice.call(m,A,1),S&&($s(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ko(a,l,d,m){for(let A=0;A<a.length;++A){const S=a[A];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==m)return A}return-1}var Do="closure_lm_"+(Math.random()*1e6|0),No={};function pu(a,l,d,m,A){if(Array.isArray(l)){for(let S=0;S<l.length;S++)pu(a,l[S],d,m,A);return null}return d=Iu(d),a&&a[en]?a.J(l,d,c(m)?!!m.capture:!1,A):gp(a,l,d,!1,m,A)}function gp(a,l,d,m,A,S){if(!l)throw Error("Invalid event type");const N=c(A)?!!A.capture:!!A;let K=Oo(a);if(K||(a[Do]=K=new Ks(a)),d=K.add(l,d,m,N,S),d.proxy)return d;if(m=pp(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)R||(A=N),A===void 0&&(A=!1),a.addEventListener(l.toString(),m,A);else if(a.attachEvent)a.attachEvent(yu(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function pp(){function a(d){return l.call(a.src,a.listener,d)}const l=_p;return a}function _u(a,l,d,m,A){if(Array.isArray(l))for(var S=0;S<l.length;S++)_u(a,l[S],d,m,A);else m=c(m)?!!m.capture:!!m,d=Iu(d),a&&a[en]?(a=a.i,S=String(l).toString(),S in a.g&&(l=a.g[S],d=ko(l,d,m,A),d>-1&&($s(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[S],a.h--)))):a&&(a=Oo(a))&&(l=a.g[l.toString()],a=-1,l&&(a=ko(l,d,m,A)),(d=a>-1?l[a]:null)&&xo(d))}function xo(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[en])Vo(l.i,a);else{var d=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(d,m,a.capture):l.detachEvent?l.detachEvent(yu(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=Oo(l))?(Vo(d,a),d.h==0&&(d.src=null,l[Do]=null)):$s(a)}}}function yu(a){return a in No?No[a]:No[a]="on"+a}function _p(a,l){if(a.da)a=!0;else{l=new xe(l,this);const d=a.listener,m=a.ha||a.src;a.fa&&xo(a),a=d.call(m,l)}return a}function Oo(a){return a=a[Do],a instanceof Ks?a:null}var Mo="__closure_events_fn_"+(Math.random()*1e9>>>0);function Iu(a){return typeof a=="function"?a:(a[Mo]||(a[Mo]=function(l){return a.handleEvent(l)}),a[Mo])}function ve(){w.call(this),this.i=new Ks(this),this.M=this,this.G=null}g(ve,w),ve.prototype[en]=!0,ve.prototype.removeEventListener=function(a,l,d,m){_u(this,a,l,d,m)};function Ce(a,l){var d,m=a.G;if(m)for(d=[];m;m=m.G)d.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new T(l,a);else if(l instanceof T)l.target=l.target||a;else{var A=l;l=new T(m,a),gu(l,A)}A=!0;let S,N;if(d)for(N=d.length-1;N>=0;N--)S=l.g=d[N],A=Gs(S,m,!0,l)&&A;if(S=l.g=a,A=Gs(S,m,!0,l)&&A,A=Gs(S,m,!1,l)&&A,d)for(N=0;N<d.length;N++)S=l.g=d[N],A=Gs(S,m,!1,l)&&A}ve.prototype.N=function(){if(ve.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let m=0;m<d.length;m++)$s(d[m]);delete a.g[l],a.h--}}this.G=null},ve.prototype.J=function(a,l,d,m){return this.i.add(String(a),l,!1,d,m)},ve.prototype.K=function(a,l,d,m){return this.i.add(String(a),l,!0,d,m)};function Gs(a,l,d,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let A=!0;for(let S=0;S<l.length;++S){const N=l[S];if(N&&!N.da&&N.capture==d){const K=N.listener,pe=N.ha||N.src;N.fa&&Vo(a.i,N),A=K.call(pe,m)!==!1&&A}}return A&&!m.defaultPrevented}function yp(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Eu(a){a.g=yp(()=>{a.g=null,a.i&&(a.i=!1,Eu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Ip extends w{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Eu(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ar(a){w.call(this),this.h=a,this.g={}}g(Ar,w);var Tu=[];function wu(a){zs(a.g,function(l,d){this.g.hasOwnProperty(d)&&xo(l)},a),a.g={}}Ar.prototype.N=function(){Ar.Z.N.call(this),wu(this)},Ar.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Lo=o.JSON.stringify,Ep=o.JSON.parse,Tp=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function vu(){}function Au(){}var Rr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Fo(){T.call(this,"d")}g(Fo,T);function Uo(){T.call(this,"c")}g(Uo,T);var tn={},Ru=null;function Hs(){return Ru=Ru||new ve}tn.Ia="serverreachability";function Su(a){T.call(this,tn.Ia,a)}g(Su,T);function Sr(a){const l=Hs();Ce(l,new Su(l))}tn.STAT_EVENT="statevent";function bu(a,l){T.call(this,tn.STAT_EVENT,a),this.stat=l}g(bu,T);function Ve(a){const l=Hs();Ce(l,new bu(l,a))}tn.Ja="timingevent";function Pu(a,l){T.call(this,tn.Ja,a),this.size=l}g(Pu,T);function br(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Pr(){this.g=!0}Pr.prototype.ua=function(){this.g=!1};function wp(a,l,d,m,A,S){a.info(function(){if(a.g)if(S){var N="",K=S.split("&");for(let se=0;se<K.length;se++){var pe=K[se].split("=");if(pe.length>1){const Ee=pe[0];pe=pe[1];const tt=Ee.split("_");N=tt.length>=2&&tt[1]=="type"?N+(Ee+"="+pe+"&"):N+(Ee+"=redacted&")}}}else N=null;else N=S;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+l+`
`+d+`
`+N})}function vp(a,l,d,m,A,S,N){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+l+`
`+d+`
`+S+" "+N})}function Ln(a,l,d,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Rp(a,d)+(m?" "+m:"")})}function Ap(a,l){a.info(function(){return"TIMEOUT: "+l})}Pr.prototype.info=function(){};function Rp(a,l){if(!a.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(a=0;a<S.length;a++)if(Array.isArray(S[a])){var d=S[a];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var A=m[0];if(A!="noop"&&A!="stop"&&A!="close")for(let N=1;N<m.length;N++)m[N]=""}}}}return Lo(S)}catch{return l}}var Ws={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Cu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Vu;function Bo(){}g(Bo,vu),Bo.prototype.g=function(){return new XMLHttpRequest},Vu=new Bo;function Cr(a){return encodeURIComponent(String(a))}function Sp(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function Tt(a,l,d,m){this.j=a,this.i=l,this.l=d,this.S=m||1,this.V=new Ar(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ku}function ku(){this.i=null,this.g="",this.h=!1}var Du={},qo={};function jo(a,l,d){a.M=1,a.A=Js(et(l)),a.u=d,a.R=!0,Nu(a,null)}function Nu(a,l){a.F=Date.now(),Qs(a),a.B=et(a.A);var d=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),Gu(d.i,"t",m),a.C=0,d=a.j.L,a.h=new ku,a.g=ll(a.j,d?l:null,!a.u),a.P>0&&(a.O=new Ip(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,m=a.ba;var A="readystatechange";Array.isArray(A)||(A&&(Tu[0]=A.toString()),A=Tu);for(let S=0;S<A.length;S++){const N=pu(d,A[S],m||l.handleEvent,!1,l.h||l);if(!N)break;l.g[N.key]=N}l=a.J?fu(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),Sr(),wp(a.i,a.v,a.B,a.l,a.S,a.u)}Tt.prototype.ba=function(a){a=a.target;const l=this.O;l&&At(a)==3?l.j():this.Y(a)},Tt.prototype.Y=function(a){try{if(a==this.g)e:{const K=At(this.g),pe=this.g.ya(),se=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||Zu(this.g)))){this.K||K!=4||pe==7||(pe==8||se<=0?Sr(3):Sr(2)),$o(this);var l=this.g.ca();this.X=l;var d=bp(this);if(this.o=l==200,vp(this.i,this.v,this.B,this.l,this.S,K,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,A=this.g;if((m=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(m)){var S=m;break t}}S=null}if(a=S)Ln(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,zo(this,a);else{this.o=!1,this.m=3,Ve(12),nn(this),Vr(this);break e}}if(this.R){a=!0;let Ee;for(;!this.K&&this.C<d.length;)if(Ee=Pp(this,d),Ee==qo){K==4&&(this.m=4,Ve(14),a=!1),Ln(this.i,this.l,null,"[Incomplete Response]");break}else if(Ee==Du){this.m=4,Ve(15),Ln(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else Ln(this.i,this.l,Ee,null),zo(this,Ee);if(xu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||d.length!=0||this.h.h||(this.m=1,Ve(16),a=!1),this.o=this.o&&a,!a)Ln(this.i,this.l,d,"[Invalid Chunked Response]"),nn(this),Vr(this);else if(d.length>0&&!this.W){this.W=!0;var N=this.j;N.g==this&&N.aa&&!N.P&&(N.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Xo(N),N.P=!0,Ve(11))}}else Ln(this.i,this.l,d,null),zo(this,d);K==4&&nn(this),this.o&&!this.K&&(K==4?ol(this.j,this):(this.o=!1,Qs(this)))}else jp(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Ve(12)):(this.m=0,Ve(13)),nn(this),Vr(this)}}}catch{}finally{}};function bp(a){if(!xu(a))return a.g.la();const l=Zu(a.g);if(l==="")return"";let d="";const m=l.length,A=At(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return nn(a),Vr(a),"";a.h.i=new o.TextDecoder}for(let S=0;S<m;S++)a.h.h=!0,d+=a.h.i.decode(l[S],{stream:!(A&&S==m-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function xu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Pp(a,l){var d=a.C,m=l.indexOf(`
`,d);return m==-1?qo:(d=Number(l.substring(d,m)),isNaN(d)?Du:(m+=1,m+d>l.length?qo:(l=l.slice(m,m+d),a.C=m+d,l)))}Tt.prototype.cancel=function(){this.K=!0,nn(this)};function Qs(a){a.T=Date.now()+a.H,Ou(a,a.H)}function Ou(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=br(h(a.aa,a),l)}function $o(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Tt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Ap(this.i,this.B),this.M!=2&&(Sr(),Ve(17)),nn(this),this.m=2,Vr(this)):Ou(this,this.T-a)};function Vr(a){a.j.I==0||a.K||ol(a.j,a)}function nn(a){$o(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,wu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function zo(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||Ko(d.h,a))){if(!a.L&&Ko(d.h,a)&&d.I==3){try{var m=d.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)ti(d),Zs(d);else break e;Yo(d),Ve(18)}}else d.xa=A[1],0<d.xa-d.K&&A[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=br(h(d.Va,d),6e3));Fu(d.h)<=1&&d.ta&&(d.ta=void 0)}else sn(d,11)}else if((a.L||d.g==a)&&ti(d),!_(l))for(A=d.Ba.g.parse(l),l=0;l<A.length;l++){let se=A[l];const Ee=se[0];if(!(Ee<=d.K))if(d.K=Ee,se=se[1],d.I==2)if(se[0]=="c"){d.M=se[1],d.ba=se[2];const tt=se[3];tt!=null&&(d.ka=tt,d.j.info("VER="+d.ka));const on=se[4];on!=null&&(d.za=on,d.j.info("SVER="+d.za));const Rt=se[5];Rt!=null&&typeof Rt=="number"&&Rt>0&&(m=1.5*Rt,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const St=a.g;if(St){const ri=St.g?St.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ri){var S=m.h;S.g||ri.indexOf("spdy")==-1&&ri.indexOf("quic")==-1&&ri.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Go(S,S.h),S.h=null))}if(m.G){const Zo=St.g?St.g.getResponseHeader("X-HTTP-Session-Id"):null;Zo&&(m.wa=Zo,ie(m.J,m.G,Zo))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var N=a;if(m.na=ul(m,m.L?m.ba:null,m.W),N.L){Uu(m.h,N);var K=N,pe=m.O;pe&&(K.H=pe),K.D&&($o(K),Qs(K)),m.g=N}else sl(m);d.i.length>0&&ei(d)}else se[0]!="stop"&&se[0]!="close"||sn(d,7);else d.I==3&&(se[0]=="stop"||se[0]=="close"?se[0]=="stop"?sn(d,7):Jo(d):se[0]!="noop"&&d.l&&d.l.qa(se),d.A=0)}}Sr(4)}catch{}}var Cp=class{constructor(a,l){this.g=a,this.map=l}};function Mu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Lu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Fu(a){return a.h?1:a.g?a.g.size:0}function Ko(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Go(a,l){a.g?a.g.add(l):a.h=l}function Uu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Mu.prototype.cancel=function(){if(this.i=Bu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Bu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return b(a.i)}var qu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vp(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const m=a[d].indexOf("=");let A,S=null;m>=0?(A=a[d].substring(0,m),S=a[d].substring(m+1)):A=a[d],l(A,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function wt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof wt?(this.l=a.l,kr(this,a.j),this.o=a.o,this.g=a.g,Dr(this,a.u),this.h=a.h,Ho(this,Hu(a.i)),this.m=a.m):a&&(l=String(a).match(qu))?(this.l=!1,kr(this,l[1]||"",!0),this.o=Nr(l[2]||""),this.g=Nr(l[3]||"",!0),Dr(this,l[4]),this.h=Nr(l[5]||"",!0),Ho(this,l[6]||"",!0),this.m=Nr(l[7]||"")):(this.l=!1,this.i=new Or(null,this.l))}wt.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(xr(l,ju,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(xr(l,ju,!0),"@"),a.push(Cr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(xr(d,d.charAt(0)=="/"?Np:Dp,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",xr(d,Op)),a.join("")},wt.prototype.resolve=function(a){const l=et(this);let d=!!a.j;d?kr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var m=a.h;if(d)Dr(l,a.u);else if(d=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var A=l.h.lastIndexOf("/");A!=-1&&(m=l.h.slice(0,A+1)+m)}if(A=m,A==".."||A==".")m="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){m=A.lastIndexOf("/",0)==0,A=A.split("/");const S=[];for(let N=0;N<A.length;){const K=A[N++];K=="."?m&&N==A.length&&S.push(""):K==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),m&&N==A.length&&S.push("")):(S.push(K),m=!0)}m=S.join("/")}else m=A}return d?l.h=m:d=a.i.toString()!=="",d?Ho(l,Hu(a.i)):d=!!a.m,d&&(l.m=a.m),l};function et(a){return new wt(a)}function kr(a,l,d){a.j=d?Nr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Dr(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Ho(a,l,d){l instanceof Or?(a.i=l,Mp(a.i,a.l)):(d||(l=xr(l,xp)),a.i=new Or(l,a.l))}function ie(a,l,d){a.i.set(l,d)}function Js(a){return ie(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Nr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function xr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,kp),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function kp(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ju=/[#\/\?@]/g,Dp=/[#\?:]/g,Np=/[#\?]/g,xp=/[#\?@]/g,Op=/#/g;function Or(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function rn(a){a.g||(a.g=new Map,a.h=0,a.i&&Vp(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Or.prototype,r.add=function(a,l){rn(this),this.i=null,a=Fn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function $u(a,l){rn(a),l=Fn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function zu(a,l){return rn(a),l=Fn(a,l),a.g.has(l)}r.forEach=function(a,l){rn(this),this.g.forEach(function(d,m){d.forEach(function(A){a.call(l,A,m,this)},this)},this)};function Ku(a,l){rn(a);let d=[];if(typeof l=="string")zu(a,l)&&(d=d.concat(a.g.get(Fn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}r.set=function(a,l){return rn(this),this.i=null,a=Fn(this,a),zu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=Ku(this,a),a.length>0?String(a[0]):l):l};function Gu(a,l,d){$u(a,l),d.length>0&&(a.i=null,a.g.set(Fn(a,l),b(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var d=l[m];const A=Cr(d);d=Ku(this,d);for(let S=0;S<d.length;S++){let N=A;d[S]!==""&&(N+="="+Cr(d[S])),a.push(N)}}return this.i=a.join("&")};function Hu(a){const l=new Or;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Fn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Mp(a,l){l&&!a.j&&(rn(a),a.i=null,a.g.forEach(function(d,m){const A=m.toLowerCase();m!=A&&($u(this,m),Gu(this,A,d))},a)),a.j=l}function Lp(a,l){const d=new Pr;if(o.Image){const m=new Image;m.onload=f(vt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=f(vt,d,"TestLoadImage: error",!1,l,m),m.onabort=f(vt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(vt,d,"TestLoadImage: timeout",!1,l,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function Fp(a,l){const d=new Pr,m=new AbortController,A=setTimeout(()=>{m.abort(),vt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(S=>{clearTimeout(A),S.ok?vt(d,"TestPingServer: ok",!0,l):vt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),vt(d,"TestPingServer: error",!1,l)})}function vt(a,l,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch{}}function Up(){this.g=new Tp}function Wo(a){this.i=a.Sb||null,this.h=a.ab||!1}g(Wo,vu),Wo.prototype.g=function(){return new Ys(this.i,this.h)};function Ys(a,l){ve.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(Ys,ve),r=Ys.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,Lr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Mr(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Lr(this)),this.g&&(this.readyState=3,Lr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Wu(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Wu(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Mr(this):Lr(this),this.readyState==3&&Wu(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,Mr(this))},r.Na=function(a){this.g&&(this.response=a,Mr(this))},r.ga=function(){this.g&&Mr(this)};function Mr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Lr(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Lr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ys.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Qu(a){let l="";return zs(a,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Qo(a,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Qu(d),typeof a=="string"?d!=null&&Cr(d):ie(a,l,d))}function ue(a){ve.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(ue,ve);var Bp=/^https?$/i,qp=["POST","PUT"];r=ue.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Vu.g(),this.g.onreadystatechange=I(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(S){Ju(this,S);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const S of m.keys())d.set(S,m.get(S));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),A=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(qp,l,void 0)>=0)||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,N]of d)this.g.setRequestHeader(S,N);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(S){Ju(this,S)}};function Ju(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Yu(a),Xs(a)}function Yu(a){a.A||(a.A=!0,Ce(a,"complete"),Ce(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ce(this,"complete"),Ce(this,"abort"),Xs(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xs(this,!0)),ue.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Xu(this):this.Xa())},r.Xa=function(){Xu(this)};function Xu(a){if(a.h&&typeof i<"u"){if(a.v&&At(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ce(a,"readystatechange"),At(a)==4){a.h=!1;try{const S=a.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=S===0){let N=String(a.D).match(qu)[1]||null;!N&&o.self&&o.self.location&&(N=o.self.location.protocol.slice(0,-1)),m=!Bp.test(N?N.toLowerCase():"")}d=m}if(d)Ce(a,"complete"),Ce(a,"success");else{a.o=6;try{var A=At(a)>2?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.ca()+"]",Yu(a)}}finally{Xs(a)}}}}function Xs(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||Ce(a,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function At(a){return a.g?a.g.readyState:0}r.ca=function(){try{return At(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Ep(l)}};function Zu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function jp(a){const l={};a=(a.g&&At(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(_(a[m]))continue;var d=Sp(a[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[A]||[];l[A]=S,S.push(d)}mp(l,function(m){return m.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Fr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function el(a){this.za=0,this.i=[],this.j=new Pr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Fr("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Fr("baseRetryDelayMs",5e3,a),this.Za=Fr("retryDelaySeedMs",1e4,a),this.Ta=Fr("forwardChannelMaxRetries",2,a),this.va=Fr("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Mu(a&&a.concurrentRequestLimit),this.Ba=new Up,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=el.prototype,r.ka=8,r.I=1,r.connect=function(a,l,d,m){Ve(0),this.W=a,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=ul(this,null,this.W),ei(this)};function Jo(a){if(tl(a),a.I==3){var l=a.V++,d=et(a.J);if(ie(d,"SID",a.M),ie(d,"RID",l),ie(d,"TYPE","terminate"),Ur(a,d),l=new Tt(a,a.j,l),l.M=2,l.A=Js(et(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=ll(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Qs(l)}cl(a)}function Zs(a){a.g&&(Xo(a),a.g.cancel(),a.g=null)}function tl(a){Zs(a),a.v&&(o.clearTimeout(a.v),a.v=null),ti(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function ei(a){if(!Lu(a.h)&&!a.m){a.m=!0;var l=a.Ea;J||p(),Y||(J(),Y=!0),E.add(l,a),a.D=0}}function $p(a,l){return Fu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=br(h(a.Ea,a,l),al(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const A=new Tt(this,this.j,a);let S=this.o;if(this.U&&(S?(S=fu(S),gu(S,this.U)):S=this.U),this.u!==null||this.R||(A.J=S,S=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=rl(this,A,l),d=et(this.J),ie(d,"RID",a),ie(d,"CVER",22),this.G&&ie(d,"X-HTTP-Session-Id",this.G),Ur(this,d),S&&(this.R?l="headers="+Cr(Qu(S))+"&"+l:this.u&&Qo(d,this.u,S)),Go(this.h,A),this.Ra&&ie(d,"TYPE","init"),this.S?(ie(d,"$req",l),ie(d,"SID","null"),A.U=!0,jo(A,d,null)):jo(A,d,l),this.I=2}}else this.I==3&&(a?nl(this,a):this.i.length==0||Lu(this.h)||nl(this))};function nl(a,l){var d;l?d=l.l:d=a.V++;const m=et(a.J);ie(m,"SID",a.M),ie(m,"RID",d),ie(m,"AID",a.K),Ur(a,m),a.u&&a.o&&Qo(m,a.u,a.o),d=new Tt(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=rl(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Go(a.h,d),jo(d,m,l)}function Ur(a,l){a.H&&zs(a.H,function(d,m){ie(l,m,d)}),a.l&&zs({},function(d,m){ie(l,m,d)})}function rl(a,l,d){d=Math.min(a.i.length,d);const m=a.l?h(a.l.Ka,a.l,a):null;e:{var A=a.i;let K=-1;for(;;){const pe=["count="+d];K==-1?d>0?(K=A[0].g,pe.push("ofs="+K)):K=0:pe.push("ofs="+K);let se=!0;for(let Ee=0;Ee<d;Ee++){var S=A[Ee].g;const tt=A[Ee].map;if(S-=K,S<0)K=Math.max(0,A[Ee].g-100),se=!1;else try{S="req"+S+"_"||"";try{var N=tt instanceof Map?tt:Object.entries(tt);for(const[on,Rt]of N){let St=Rt;c(Rt)&&(St=Lo(Rt)),pe.push(S+on+"="+encodeURIComponent(St))}}catch(on){throw pe.push(S+"type="+encodeURIComponent("_badmap")),on}}catch{m&&m(tt)}}if(se){N=pe.join("&");break e}}N=void 0}return a=a.i.splice(0,d),l.G=a,N}function sl(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;J||p(),Y||(J(),Y=!0),E.add(l,a),a.A=0}}function Yo(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=br(h(a.Da,a),al(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,il(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=br(h(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ve(10),Zs(this),il(this))};function Xo(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function il(a){a.g=new Tt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=et(a.na);ie(l,"RID","rpc"),ie(l,"SID",a.M),ie(l,"AID",a.K),ie(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&ie(l,"TO",a.ia),ie(l,"TYPE","xmlhttp"),Ur(a,l),a.u&&a.o&&Qo(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Js(et(l)),d.u=null,d.R=!0,Nu(d,a)}r.Va=function(){this.C!=null&&(this.C=null,Zs(this),Yo(this),Ve(19))};function ti(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function ol(a,l){var d=null;if(a.g==l){ti(a),Xo(a),a.g=null;var m=2}else if(Ko(a.h,l))d=l.G,Uu(a.h,l),m=1;else return;if(a.I!=0){if(l.o)if(m==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var A=a.D;m=Hs(),Ce(m,new Pu(m,d)),ei(a)}else sl(a);else if(A=l.m,A==3||A==0&&l.X>0||!(m==1&&$p(a,l)||m==2&&Yo(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),A){case 1:sn(a,5);break;case 4:sn(a,10);break;case 3:sn(a,6);break;default:sn(a,2)}}}function al(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function sn(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),m=a.Ua;const A=!m;m=new wt(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||kr(m,"https"),Js(m),A?Lp(m.toString(),d):Fp(m.toString(),d)}else Ve(2);a.I=0,a.l&&a.l.pa(l),cl(a),tl(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function cl(a){if(a.I=0,a.ja=[],a.l){const l=Bu(a.h);(l.length!=0||a.i.length!=0)&&(V(a.ja,l),V(a.ja,a.i),a.h.i.length=0,b(a.i),a.i.length=0),a.l.oa()}}function ul(a,l,d){var m=d instanceof wt?et(d):new wt(d);if(m.g!="")l&&(m.g=l+"."+m.g),Dr(m,m.u);else{var A=o.location;m=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;const S=new wt(null);m&&kr(S,m),l&&(S.g=l),A&&Dr(S,A),d&&(S.h=d),m=S}return d=a.G,l=a.wa,d&&l&&ie(m,d,l),ie(m,"VER",a.ka),Ur(a,m),m}function ll(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new ue(new Wo({ab:d})):new ue(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function hl(){}r=hl.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function ni(){}ni.prototype.g=function(a,l){return new Le(a,l)};function Le(a,l){ve.call(this),this.g=new el(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!_(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!_(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Un(this)}g(Le,ve),Le.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Le.prototype.close=function(){Jo(this.g)},Le.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Lo(a),a=d);l.i.push(new Cp(l.Ya++,a)),l.I==3&&ei(l)},Le.prototype.N=function(){this.g.l=null,delete this.j,Jo(this.g),delete this.g,Le.Z.N.call(this)};function dl(a){Fo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}g(dl,Fo);function fl(){Uo.call(this),this.status=1}g(fl,Uo);function Un(a){this.g=a}g(Un,hl),Un.prototype.ra=function(){Ce(this.g,"a")},Un.prototype.qa=function(a){Ce(this.g,new dl(a))},Un.prototype.pa=function(a){Ce(this.g,new fl)},Un.prototype.oa=function(){Ce(this.g,"b")},ni.prototype.createWebChannel=ni.prototype.g,Le.prototype.send=Le.prototype.o,Le.prototype.open=Le.prototype.m,Le.prototype.close=Le.prototype.close,Vf=function(){return new ni},Cf=function(){return Hs()},Pf=tn,Va={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ws.NO_ERROR=0,Ws.TIMEOUT=8,Ws.HTTP_ERROR=6,pi=Ws,Cu.COMPLETE="complete",bf=Cu,Au.EventType=Rr,Rr.OPEN="a",Rr.CLOSE="b",Rr.ERROR="c",Rr.MESSAGE="d",ve.prototype.listen=ve.prototype.J,Wr=Au,ue.prototype.listenOnce=ue.prototype.K,ue.prototype.getLastError=ue.prototype.Ha,ue.prototype.getLastErrorCode=ue.prototype.ya,ue.prototype.getStatus=ue.prototype.ca,ue.prototype.getResponseJson=ue.prototype.La,ue.prototype.getResponseText=ue.prototype.la,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Fa,Sf=ue}).apply(typeof ii<"u"?ii:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ke.UNAUTHENTICATED=new ke(null),ke.GOOGLE_CREDENTIALS=new ke("google-credentials-uid"),ke.FIRST_PARTY=new ke("first-party-uid"),ke.MOCK_USER=new ke("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Er="12.12.0";function OE(r){Er=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn=new to("@firebase/firestore");function Gn(){return vn.logLevel}function C(r,...e){if(vn.logLevel<=H.DEBUG){const t=e.map(pc);vn.debug(`Firestore (${Er}): ${r}`,...t)}}function De(r,...e){if(vn.logLevel<=H.ERROR){const t=e.map(pc);vn.error(`Firestore (${Er}): ${r}`,...t)}}function rr(r,...e){if(vn.logLevel<=H.WARN){const t=e.map(pc);vn.warn(`Firestore (${Er}): ${r}`,...t)}}function pc(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,kf(r,n,t)}function kf(r,e,t){let n=`FIRESTORE (${Er}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw De(n),new Error(n)}function F(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||kf(e,s,n)}function j(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends Ge{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class LE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(ke.UNAUTHENTICATED)))}shutdown(){}}class FE{constructor(e){this.t=e,this.currentUser=ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let i=new ot;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ot,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ot)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string",31837,{l:n}),new ME(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string",2055,{h:e}),new ke(e)}}class UE{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=ke.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class BE{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new UE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(ke.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class zl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class qE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Se(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){F(this.o===void 0,3512);const n=i=>{i.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,C("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new zl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(F(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new zl(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jE(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=jE(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function z(r,e){return r<e?-1:r>e?1:0}function ka(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return aa(s)===aa(i)?z(s,i):aa(s)?1:-1}return z(r.length,e.length)}const $E=55296,zE=57343;function aa(r){const e=r.charCodeAt(0);return e>=$E&&e<=zE}function sr(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function Df(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kl="__name__";class nt{constructor(e,t,n){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&M(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return nt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof nt?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=nt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return z(e.length,t.length)}static compareSegments(e,t){const n=nt.isNumericId(e),s=nt.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?nt.extractNumericId(e).compare(nt.extractNumericId(t)):ka(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Bt.fromString(e.substring(4,e.length-2))}}class X extends nt{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new k(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new X(t)}static emptyPath(){return new X([])}}const KE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ce extends nt{construct(e,t,n){return new ce(e,t,n)}static isValidIdentifier(e){return KE.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ce.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Kl}static keyField(){return new ce([Kl])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new k(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new k(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new k(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ce(t)}static emptyPath(){return new ce([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(X.fromString(e))}static fromName(e){return new O(X.fromString(e).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new X(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(r,e,t){if(!t)throw new k(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function GE(r,e,t,n){if(e===!0&&n===!0)throw new k(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Gl(r){if(!O.isDocumentKey(r))throw new k(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Hl(r){if(O.isDocumentKey(r))throw new k(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function xf(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function oo(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function Ke(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new k(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=oo(r);throw new k(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function HE(r,e){if(e<=0)throw new k(P.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(r,e){const t={typeString:r};return e&&(t.value=e),t}function Cs(r,e){if(!xf(r))throw new k(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new k(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl=-62135596800,Ql=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(e){return Z.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Ql);return new Z(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Wl)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ql}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Cs(e,Z._jsonSchema))return new Z(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Wl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:me("string",Z._jsonSchemaVersion),seconds:me("number"),nanoseconds:me("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{static fromTimestamp(e){return new B(e)}static min(){return new B(new Z(0,0))}static max(){return new B(new Z(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs=-1;class Mi{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function Da(r){return r.fields.find((e=>e.kind===2))}function un(r){return r.fields.filter((e=>e.kind!==2))}Mi.UNKNOWN_ID=-1;class _i{constructor(e,t){this.fieldPath=e,this.kind=t}}class ds{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ds(0,Be.min())}}function WE(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new Z(t+1,0):new Z(t,n));return new Be(s,O.empty(),e)}function Of(r){return new Be(r.readTime,r.key,hs)}class Be{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Be(B.min(),O.empty(),hs)}static max(){return new Be(B.max(),O.empty(),hs)}}function yc(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(r.documentKey,e.documentKey),t!==0?t:z(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Lf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function On(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Mf)throw r;C("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new v(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof v?t:v.resolve(t)}catch(t){return v.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):v.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):v.reject(t)}static resolve(e){return new v(((t,n)=>{t(e)}))}static reject(e){return new v(((t,n)=>{n(e)}))}static waitFor(e){return new v(((t,n)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>n(u)))})),o=!0,i===s&&t()}))}static or(e){let t=v.resolve(!1);for(const n of e)t=t.next((s=>s?v.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new v(((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{o[h]=f,++c,c===i&&n(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new v(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe="SimpleDb";class ao{static open(e,t,n,s){try{return new ao(t,e.transaction(s,n))}catch(i){throw new es(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new ot,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new es(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Ic(n.target.error);this.S.reject(new es(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(C(Fe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new JE(t)}}class qt{static delete(e){return C(Fe,"Removing database:",e),hn(Pd().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!nc())return!1;if(qt.F())return!0;const e=ye(),t=qt.M(e),n=0<t&&t<10,s=Ff(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,qt.M(ye())===12.2&&De("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(C(Fe,"Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new es(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new k(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new k(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new es(e,o))},s.onupgradeneeded=i=>{C(Fe,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{C(Fe,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=ao.open(this.db,e,i?"readonly":"readwrite",n),u=s(c).next((h=>(c.C(),h))).catch((h=>(c.abort(h),v.reject(h)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&o<3;if(C(Fe,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Ff(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class QE{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return hn(this.U.delete())}}class es extends k{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Yt(r){return r.name==="IndexedDbTransactionError"}class JE{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(C(Fe,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(C(Fe,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),hn(n)}add(e){return C(Fe,"ADD",this.store.name,e,e),hn(this.store.add(e))}get(e){return hn(this.store.get(e)).next((t=>(t===void 0&&(t=null),C(Fe,"GET",this.store.name,e,t),t)))}delete(e){return C(Fe,"DELETE",this.store.name,e),hn(this.store.delete(e))}count(){return C(Fe,"COUNT",this.store.name),hn(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(n),o=[];return this.H(i,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new v(((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}}))}X(e,t){C(Fe,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const s=this.cursor(n);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new v(((n,s)=>{t.onerror=i=>{const o=Ic(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():n()})):n()}}))}H(e,t){const n=[];return new v(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new QE(c),h=t(c.primaryKey,c.value,u);if(h instanceof v){const f=h.catch((g=>(u.done(),v.reject(g))));n.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>v.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function hn(r){return new v(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Ic(n.target.error);t(s)}}))}let Jl=!1;function Ic(r){const e=qt.M(ye());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Jl||(Jl=!0,setTimeout((()=>{throw n}),0)),n}}return r}const ts="IndexBackfiller";class YE{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){C(ts,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();C(ts,`Documents written: ${t}`)}catch(t){Yt(t)?C(ts,"Ignoring IndexedDB error during index backfill: ",t):await On(t)}await this.re(6e4)}))}}class XE{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const n=new Set;let s=t,i=!0;return v.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return C(ts,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,n.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(C(ts,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let n=e;return t.changes.forEach(((s,i)=>{const o=Of(i);yc(o,n)>0&&(n=o)})),new Be(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}je.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=-1;function co(r){return r==null}function fs(r){return r===0&&1/r==-1/0}function ZE(r){return typeof r=="number"&&Number.isInteger(r)&&!fs(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li="";function Pe(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Yl(e)),e=eT(r.get(t),e);return Yl(e)}function eT(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case Li:t+="";break;default:t+=i}}return t}function Yl(r){return r+Li+""}function rt(r){const e=r.length;if(F(e>=2,64408,{path:r}),e===2)return F(r.charAt(0)===Li&&r.charAt(1)==="",56145,{path:r}),X.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(Li,i);switch((o<0||o>t)&&M(50515,{path:r}),r.charAt(o+1)){case"":const c=r.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),n.push(u);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:M(61167,{path:r})}i=o+2}return new X(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln="remoteDocuments",Vs="owner",Bn="owner",ms="mutationQueues",tT="userId",He="mutations",Xl="batchId",pn="userMutationsIndex",Zl=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(r,e){return[r,Pe(e)]}function Uf(r,e,t){return[r,Pe(e),t]}const nT={},ir="documentMutations",Fi="remoteDocumentsV14",rT=["prefixPath","collectionGroup","readTime","documentId"],Ii="documentKeyIndex",sT=["prefixPath","collectionGroup","documentId"],Bf="collectionGroupIndex",iT=["collectionGroup","readTime","prefixPath","documentId"],gs="remoteDocumentGlobal",Na="remoteDocumentGlobalKey",or="targets",qf="queryTargetsIndex",oT=["canonicalId","targetId"],ar="targetDocuments",aT=["targetId","path"],Ec="documentTargetsIndex",cT=["path","targetId"],Ui="targetGlobalKey",In="targetGlobal",ps="collectionParents",uT=["collectionId","parent"],cr="clientMetadata",lT="clientId",uo="bundles",hT="bundleId",lo="namedQueries",dT="name",Tc="indexConfiguration",fT="indexId",xa="collectionGroupIndex",mT="collectionGroup",ns="indexState",gT=["indexId","uid"],jf="sequenceNumberIndex",pT=["uid","sequenceNumber"],rs="indexEntries",_T=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],$f="documentKeyIndex",yT=["indexId","uid","orderedDocumentKey"],ho="documentOverlays",IT=["userId","collectionPath","documentId"],Oa="collectionPathOverlayIndex",ET=["userId","collectionPath","largestBatchId"],zf="collectionGroupOverlayIndex",TT=["userId","collectionGroup","largestBatchId"],wc="globals",wT="name",Kf=[ms,He,ir,ln,or,Vs,In,ar,cr,gs,ps,uo,lo],vT=[...Kf,ho],Gf=[ms,He,ir,Fi,or,Vs,In,ar,cr,gs,ps,uo,lo,ho],Hf=Gf,vc=[...Hf,Tc,ns,rs],AT=vc,Wf=[...vc,wc],RT=Wf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma extends Lf{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Ie(r,e){const t=j(r);return qt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eh(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Xt(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function Qf(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,t){this.comparator=e,this.root=t||we.EMPTY}insert(e,t){return new ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,we.BLACK,null,null))}remove(e){return new ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,we.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new oi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new oi(this.root,e,this.comparator,!1)}getReverseIterator(){return new oi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new oi(this.root,e,this.comparator,!0)}}class oi{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class we{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??we.RED,this.left=s??we.EMPTY,this.right=i??we.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new we(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return we.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return we.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}}we.EMPTY=null,we.RED=!0,we.BLACK=!1;we.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new we(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.comparator=e,this.data=new ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new th(this.data.getIterator())}getIteratorFrom(e){return new th(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof te)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new te(this.comparator);return t.data=e,t}}class th{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function qn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.fields=e,e.sort(ce.comparator)}static empty(){return new Oe([])}unionWith(e){let t=new te(ce.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Oe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return sr(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Jf("Invalid base64 string: "+i):i}})(e);return new ge(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ge.EMPTY_BYTE_STRING=new ge("");const ST=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function pt(r){if(F(!!r,39018),typeof r=="string"){let e=0;const t=ST.exec(r);if(F(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:oe(r.seconds),nanos:oe(r.nanos)}}function oe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function _t(r){return typeof r=="string"?ge.fromBase64String(r):ge.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf="server_timestamp",Xf="__type__",Zf="__previous_value__",em="__local_write_time__";function Ac(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Xf])==null?void 0:n.stringValue)===Yf}function fo(r){const e=r.mapValue.fields[Zf];return Ac(e)?fo(e):e}function _s(r){const e=pt(r.mapValue.fields[em].timestampValue);return new Z(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{constructor(e,t,n,s,i,o,c,u,h,f,g){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=g}}const Bi="(default)";class An{constructor(e,t){this.projectId=e,this.database=t||Bi}static empty(){return new An("","")}get isDefaultDatabase(){return this.database===Bi}isEqual(e){return e instanceof An&&e.projectId===this.projectId&&e.database===this.database}}function PT(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new k(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new An(r.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc="__type__",tm="__max__",Lt={mapValue:{fields:{__type__:{stringValue:tm}}}},Sc="__vector__",ur="value",Ei={nullValue:"NULL_VALUE"};function Kt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ac(r)?4:nm(r)?9007199254740991:mo(r)?10:11:M(28295,{value:r})}function ut(r,e){if(r===e)return!0;const t=Kt(r);if(t!==Kt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return _s(r).isEqual(_s(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=pt(s.timestampValue),c=pt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(s,i){return _t(s.bytesValue).isEqual(_t(i.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(s,i){return oe(s.geoPointValue.latitude)===oe(i.geoPointValue.latitude)&&oe(s.geoPointValue.longitude)===oe(i.geoPointValue.longitude)})(r,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return oe(s.integerValue)===oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=oe(s.doubleValue),c=oe(i.doubleValue);return o===c?fs(o)===fs(c):isNaN(o)&&isNaN(c)}return!1})(r,e);case 9:return sr(r.arrayValue.values||[],e.arrayValue.values||[],ut);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(eh(o)!==eh(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!ut(o[u],c[u])))return!1;return!0})(r,e);default:return M(52216,{left:r})}}function ys(r,e){return(r.values||[]).find((t=>ut(t,e)))!==void 0}function Gt(r,e){if(r===e)return 0;const t=Kt(r),n=Kt(e);if(t!==n)return z(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(r.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=oe(i.integerValue||i.doubleValue),u=oe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(r,e);case 3:return nh(r.timestampValue,e.timestampValue);case 4:return nh(_s(r),_s(e));case 5:return ka(r.stringValue,e.stringValue);case 6:return(function(i,o){const c=_t(i),u=_t(o);return c.compareTo(u)})(r.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=z(c[h],u[h]);if(f!==0)return f}return z(c.length,u.length)})(r.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=z(oe(i.latitude),oe(o.latitude));return c!==0?c:z(oe(i.longitude),oe(o.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return rh(r.arrayValue,e.arrayValue);case 10:return(function(i,o){var I,b,V,D;const c=i.fields||{},u=o.fields||{},h=(I=c[ur])==null?void 0:I.arrayValue,f=(b=u[ur])==null?void 0:b.arrayValue,g=z(((V=h==null?void 0:h.values)==null?void 0:V.length)||0,((D=f==null?void 0:f.values)==null?void 0:D.length)||0);return g!==0?g:rh(h,f)})(r.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Lt.mapValue&&o===Lt.mapValue)return 0;if(i===Lt.mapValue)return 1;if(o===Lt.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let g=0;g<u.length&&g<f.length;++g){const I=ka(u[g],f[g]);if(I!==0)return I;const b=Gt(c[u[g]],h[f[g]]);if(b!==0)return b}return z(u.length,f.length)})(r.mapValue,e.mapValue);default:throw M(23264,{he:t})}}function nh(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return z(r,e);const t=pt(r),n=pt(e),s=z(t.seconds,n.seconds);return s!==0?s:z(t.nanos,n.nanos)}function rh(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Gt(t[s],n[s]);if(i)return i}return z(t.length,n.length)}function lr(r){return La(r)}function La(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=pt(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return _t(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return O.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=La(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${La(t.fields[o])}`;return s+"}"})(r.mapValue):M(61005,{value:r})}function Ti(r){switch(Kt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=fo(r);return e?16+Ti(e):16;case 5:return 2*r.stringValue.length;case 6:return _t(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+Ti(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return Xt(n.fields,((i,o)=>{s+=i.length+Ti(o)})),s})(r.mapValue);default:throw M(13486,{value:r})}}function Is(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Fa(r){return!!r&&"integerValue"in r}function Es(r){return!!r&&"arrayValue"in r}function sh(r){return!!r&&"nullValue"in r}function ih(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function wi(r){return!!r&&"mapValue"in r}function mo(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Rc])==null?void 0:n.stringValue)===Sc}function ss(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return Xt(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=ss(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ss(r.arrayValue.values[t]);return e}return{...r}}function nm(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===tm}const rm={mapValue:{fields:{[Rc]:{stringValue:Sc},[ur]:{arrayValue:{}}}}};function CT(r){return"nullValue"in r?Ei:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Is(An.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?mo(r)?rm:{mapValue:{}}:M(35942,{value:r})}function VT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Is(An.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?rm:"mapValue"in r?mo(r)?{mapValue:{}}:Lt:M(61959,{value:r})}function oh(r,e){const t=Gt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function ah(r,e){const t=Gt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.value=e}static empty(){return new be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!wi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ss(t)}setAll(e){let t=ce.emptyPath(),n={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=ss(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());wi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ut(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];wi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Xt(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new be(ss(this.value))}}function sm(r){const e=[];return Xt(r.fields,((t,n)=>{const s=new ce([t]);if(wi(n)){const i=sm(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Oe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new le(e,0,B.min(),B.min(),B.min(),be.empty(),0)}static newFoundDocument(e,t,n,s){return new le(e,1,t,B.min(),n,s,0)}static newNoDocument(e,t){return new le(e,2,t,B.min(),B.min(),be.empty(),0)}static newUnknownDocument(e,t){return new le(e,3,t,B.min(),B.min(),be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t){this.position=e,this.inclusive=t}}function ch(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=O.comparator(O.fromName(o.referenceValue),t.key):n=Gt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function uh(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!ut(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,t="asc"){this.field=e,this.dir=t}}function kT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{}class W extends im{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new DT(e,t,n):t==="array-contains"?new OT(e,n):t==="in"?new hm(e,n):t==="not-in"?new MT(e,n):t==="array-contains-any"?new LT(e,n):new W(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new NT(e,n):new xT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Gt(t,this.value)):t!==null&&Kt(this.value)===Kt(t)&&this.matchesComparison(Gt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ee extends im{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ee(e,t)}matches(e){return dr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function dr(r){return r.op==="and"}function Ua(r){return r.op==="or"}function bc(r){return om(r)&&dr(r)}function om(r){for(const e of r.filters)if(e instanceof ee)return!1;return!0}function Ba(r){if(r instanceof W)return r.field.canonicalString()+r.op.toString()+lr(r.value);if(bc(r))return r.filters.map((e=>Ba(e))).join(",");{const e=r.filters.map((t=>Ba(t))).join(",");return`${r.op}(${e})`}}function am(r,e){return r instanceof W?(function(n,s){return s instanceof W&&n.op===s.op&&n.field.isEqual(s.field)&&ut(n.value,s.value)})(r,e):r instanceof ee?(function(n,s){return s instanceof ee&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,c)=>i&&am(o,s.filters[c])),!0):!1})(r,e):void M(19439)}function cm(r,e){const t=r.filters.concat(e);return ee.create(t,r.op)}function um(r){return r instanceof W?(function(t){return`${t.field.canonicalString()} ${t.op} ${lr(t.value)}`})(r):r instanceof ee?(function(t){return t.op.toString()+" {"+t.getFilters().map(um).join(" ,")+"}"})(r):"Filter"}class DT extends W{constructor(e,t,n){super(e,t,n),this.key=O.fromName(n.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class NT extends W{constructor(e,t){super(e,"in",t),this.keys=lm("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class xT extends W{constructor(e,t){super(e,"not-in",t),this.keys=lm("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function lm(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((n=>O.fromName(n.referenceValue)))}class OT extends W{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Es(t)&&ys(t.arrayValue,this.value)}}class hm extends W{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ys(this.value.arrayValue,t)}}class MT extends W{constructor(e,t){super(e,"not-in",t)}matches(e){if(ys(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ys(this.value.arrayValue,t)}}class LT extends W{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Es(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>ys(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function qa(r,e=null,t=[],n=[],s=null,i=null,o=null){return new FT(r,e,t,n,s,i,o)}function Rn(r){const e=j(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>Ba(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),co(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>lr(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>lr(n))).join(",")),e.Te=t}return e.Te}function ks(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!kT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!am(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!uh(r.startAt,e.startAt)&&uh(r.endAt,e.endAt)}function qi(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function ji(r,e){return r.filters.filter((t=>t instanceof W&&t.field.isEqual(e)))}function lh(r,e,t){let n=Ei,s=!0;for(const i of ji(r,e)){let o=Ei,c=!0;switch(i.op){case"<":case"<=":o=CT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Ei}oh({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];oh({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function hh(r,e,t){let n=Lt,s=!0;for(const i of ji(r,e)){let o=Lt,c=!0;switch(i.op){case">=":case">":o=VT(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Lt}ah({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];ah({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function UT(r,e,t,n,s,i,o,c){return new Tr(r,e,t,n,s,i,o,c)}function go(r){return new Tr(r)}function dh(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function BT(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function dm(r){return r.collectionGroup!==null}function is(r){const e=j(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new te(ce.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Ts(i,n))})),t.has(ce.keyField().canonicalString())||e.Ee.push(new Ts(ce.keyField(),n))}return e.Ee}function $e(r){const e=j(r);return e.Ie||(e.Ie=qT(e,is(r))),e.Ie}function qT(r,e){if(r.limitType==="F")return qa(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Ts(s.field,i)}));const t=r.endAt?new hr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new hr(r.startAt.position,r.startAt.inclusive):null;return qa(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function ja(r,e){const t=r.filters.concat([e]);return new Tr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function jT(r,e){const t=r.explicitOrderBy.concat([e]);return new Tr(r.path,r.collectionGroup,t,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function $i(r,e,t){return new Tr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function po(r,e){return ks($e(r),$e(e))&&r.limitType===e.limitType}function fm(r){return`${Rn($e(r))}|lt:${r.limitType}`}function Hn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>um(s))).join(", ")}]`),co(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>lr(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>lr(s))).join(",")),`Target(${n})`})($e(r))}; limitType=${r.limitType})`}function Ds(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):O.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of is(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,c,u){const h=ch(o,c,u);return o.inclusive?h<=0:h<0})(n.startAt,is(n),s)||n.endAt&&!(function(o,c,u){const h=ch(o,c,u);return o.inclusive?h>=0:h>0})(n.endAt,is(n),s))})(r,e)}function $T(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function mm(r){return(e,t)=>{let n=!1;for(const s of is(r)){const i=zT(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function zT(r,e,t){const n=r.field.isKeyField()?O.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Gt(u,h):M(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Xt(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return Qf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KT=new ae(O.comparator);function Ue(){return KT}const gm=new ae(O.comparator);function Qr(...r){let e=gm;for(const t of r)e=e.insert(t.key,t);return e}function pm(r){let e=gm;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function st(){return os()}function _m(){return os()}function os(){return new yt((r=>r.toString()),((r,e)=>r.isEqual(e)))}const GT=new ae(O.comparator),HT=new te(O.comparator);function G(...r){let e=HT;for(const t of r)e=e.add(t);return e}const WT=new te(z);function QT(){return WT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pc(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:fs(e)?"-0":e}}function ym(r){return{integerValue:""+r}}function JT(r,e){return ZE(e)?ym(e):Pc(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(){this._=void 0}}function YT(r,e,t){return r instanceof fr?(function(s,i){const o={fields:{[Xf]:{stringValue:Yf},[em]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ac(i)&&(i=fo(i)),i&&(o.fields[Zf]=i),{mapValue:o}})(t,e):r instanceof mr?Em(r,e):r instanceof gr?Tm(r,e):(function(s,i){const o=Im(s,i),c=fh(o)+fh(s.Ae);return Fa(o)&&Fa(s.Ae)?ym(c):Pc(s.serializer,c)})(r,e)}function XT(r,e,t){return r instanceof mr?Em(r,e):r instanceof gr?Tm(r,e):t}function Im(r,e){return r instanceof ws?(function(n){return Fa(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(e)?e:{integerValue:0}:null}class fr extends _o{}class mr extends _o{constructor(e){super(),this.elements=e}}function Em(r,e){const t=wm(e);for(const n of r.elements)t.some((s=>ut(s,n)))||t.push(n);return{arrayValue:{values:t}}}class gr extends _o{constructor(e){super(),this.elements=e}}function Tm(r,e){let t=wm(e);for(const n of r.elements)t=t.filter((s=>!ut(s,n)));return{arrayValue:{values:t}}}class ws extends _o{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function fh(r){return oe(r.integerValue||r.doubleValue)}function wm(r){return Es(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e,t){this.field=e,this.transform=t}}function ZT(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof mr&&s instanceof mr||n instanceof gr&&s instanceof gr?sr(n.elements,s.elements,ut):n instanceof ws&&s instanceof ws?ut(n.Ae,s.Ae):n instanceof fr&&s instanceof fr})(r.transform,e.transform)}class ew{constructor(e,t){this.version=e,this.transformResults=t}}class _e{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new _e}static exists(e){return new _e(void 0,e)}static updateTime(e){return new _e(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function vi(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class yo{}function Am(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new Ns(r.key,_e.none()):new wr(r.key,r.data,_e.none());{const t=r.data,n=be.empty();let s=new te(ce.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new It(r.key,n,new Oe(s.toArray()),_e.none())}}function tw(r,e,t){r instanceof wr?(function(s,i,o){const c=s.value.clone(),u=gh(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):r instanceof It?(function(s,i,o){if(!vi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=gh(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Rm(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function as(r,e,t,n){return r instanceof wr?(function(i,o,c,u){if(!vi(i.precondition,o))return c;const h=i.value.clone(),f=ph(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(r,e,t,n):r instanceof It?(function(i,o,c,u){if(!vi(i.precondition,o))return c;const h=ph(i.fieldTransforms,u,o),f=o.data;return f.setAll(Rm(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((g=>g.field)))})(r,e,t,n):(function(i,o,c){return vi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(r,e,t)}function nw(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Im(n.transform,s||null);i!=null&&(t===null&&(t=be.empty()),t.set(n.field,i))}return t||null}function mh(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&sr(n,s,((i,o)=>ZT(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class wr extends yo{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class It extends yo{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Rm(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function gh(r,e,t){const n=new Map;F(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,XT(o,c,t[s]))}return n}function ph(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,YT(i,o,e))}return n}class Ns extends yo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Sm extends yo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&tw(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=as(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=as(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=_m();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Am(o,c);u!==null&&n.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(B.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),G())}isEqual(e){return this.batchId===e.batchId&&sr(this.mutations,e.mutations,((t,n)=>mh(t,n)))&&sr(this.baseMutations,e.baseMutations,((t,n)=>mh(t,n)))}}class Vc{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){F(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=(function(){return GT})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new Vc(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe,Q;function sw(r){switch(r){case P.OK:return M(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function bm(r){if(r===void 0)return De("GRPC error has no .code"),P.UNKNOWN;switch(r){case fe.OK:return P.OK;case fe.CANCELLED:return P.CANCELLED;case fe.UNKNOWN:return P.UNKNOWN;case fe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case fe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case fe.INTERNAL:return P.INTERNAL;case fe.UNAVAILABLE:return P.UNAVAILABLE;case fe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case fe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case fe.NOT_FOUND:return P.NOT_FOUND;case fe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case fe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case fe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case fe.ABORTED:return P.ABORTED;case fe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case fe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case fe.DATA_LOSS:return P.DATA_LOSS;default:return M(39323,{code:r})}}(Q=fe||(fe={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iw(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ow=new Bt([4294967295,4294967295],0);function _h(r){const e=iw().encode(r),t=new Rf;return t.update(e),new Uint8Array(t.digest())}function yh(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Bt([t,n],0),new Bt([s,i],0)]}class Dc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Jr(`Invalid padding: ${t}`);if(n<0)throw new Jr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Jr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Jr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Bt.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Bt.fromNumber(n)));return s.compare(ow)===1&&(s=new Bt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=_h(e),[n,s]=yh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Dc(i,s,t);return n.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=_h(e),[n,s]=yh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Jr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,xs.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Io(B.min(),s,new ae(z),Ue(),G())}}class xs{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new xs(n,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class Pm{constructor(e,t){this.targetId=e,this.Ce=t}}class Cm{constructor(e,t,n=ge.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Ih{constructor(){this.ve=0,this.Fe=Eh(),this.Me=ge.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=G(),t=G(),n=G();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:M(38017,{changeType:i})}})),new xs(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Eh()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,F(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class aw{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ue(),this.Je=ai(),this.He=ai(),this.Ze=new ae(z)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:M(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((n,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(qi(i))if(n===0){const o=new O(i.path);this.et(t,o,le.newNoDocument(o,B.min()))}else F(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=_t(n).toUint8Array()}catch(u){if(u instanceof Jf)return rr("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Dc(o,s,i)}catch(u){return rr(u instanceof Jr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&qi(c.target)){const u=new O(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,le.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let n=G();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new Io(e,t,this.Ze,this.je,n);return this.je=Ue(),this.Je=ai(),this.He=ai(),this.Ze=new ae(z),s}Ye(e,t){if(!this.rt(e))return;const n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Ih,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new te(z),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new te(z),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||C("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Ih),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ai(){return new ae(O.comparator)}function Eh(){return new ae(O.comparator)}const cw={asc:"ASCENDING",desc:"DESCENDING"},uw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},lw={and:"AND",or:"OR"};class hw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function $a(r,e){return r.useProto3Json||co(e)?e:{value:e}}function pr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Vm(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function dw(r,e){return pr(r,e.toTimestamp())}function Ne(r){return F(!!r,49232),B.fromTimestamp((function(t){const n=pt(t);return new Z(n.seconds,n.nanos)})(r))}function Nc(r,e){return za(r,e).canonicalString()}function za(r,e){const t=(function(s){return new X(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function km(r){const e=X.fromString(r);return F(Bm(e),10190,{key:e.toString()}),e}function zi(r,e){return Nc(r.databaseId,e.path)}function En(r,e){const t=km(e);if(t.get(1)!==r.databaseId.projectId)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new O(xm(t))}function Dm(r,e){return Nc(r.databaseId,e)}function Nm(r){const e=km(r);return e.length===4?X.emptyPath():xm(e)}function Ka(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function xm(r){return F(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Th(r,e,t){return{name:zi(r,e),fields:t.value.mapValue.fields}}function fw(r,e,t){const n=En(r,e.name),s=Ne(e.updateTime),i=e.createTime?Ne(e.createTime):B.min(),o=new be({mapValue:{fields:e.fields}}),c=le.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function mw(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:M(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string",58123),ge.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ge.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?P.UNKNOWN:bm(h.code);return new k(f,h.message||"")})(o);t=new Cm(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=En(r,n.document.name),i=Ne(n.document.updateTime),o=n.document.createTime?Ne(n.document.createTime):B.min(),c=new be({mapValue:{fields:n.document.fields}}),u=le.newFoundDocument(s,i,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new Ai(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=En(r,n.document),i=n.readTime?Ne(n.readTime):B.min(),o=le.newNoDocument(s,i),c=n.removedTargetIds||[];t=new Ai([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=En(r,n.document),i=n.removedTargetIds||[];t=new Ai([],i,s,null)}else{if(!("filter"in e))return M(11601,{Vt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new rw(s,i),c=n.targetId;t=new Pm(c,o)}}return t}function Ki(r,e){let t;if(e instanceof wr)t={update:Th(r,e.key,e.value)};else if(e instanceof Ns)t={delete:zi(r,e.key)};else if(e instanceof It)t={update:Th(r,e.key,e.data),updateMask:Ew(e.fieldMask)};else{if(!(e instanceof Sm))return M(16599,{dt:e.type});t={verify:zi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const c=o.transform;if(c instanceof fr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof mr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof gr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ws)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw M(20930,{transform:o.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:dw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)})(r,e.precondition)),t}function Ga(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?_e.updateTime(Ne(i.updateTime)):i.exists!==void 0?_e.exists(i.exists):_e.none()})(e.currentDocument):_e.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)F(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new fr;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new mr(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new gr(f)}else"increment"in c?u=new ws(o,c.increment):M(16584,{proto:c});const h=ce.fromServerFormat(c.fieldPath);return new vm(h,u)})(r,s))):[];if(e.update){e.update.name;const s=En(r,e.update.name),i=new be({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const h=u.fieldPaths||[];return new Oe(h.map((f=>ce.fromServerFormat(f))))})(e.updateMask);return new It(s,i,o,t,n)}return new wr(s,i,t,n)}if(e.delete){const s=En(r,e.delete);return new Ns(s,t)}if(e.verify){const s=En(r,e.verify);return new Sm(s,t)}return M(1463,{proto:e})}function gw(r,e){return r&&r.length>0?(F(e!==void 0,14353),r.map((t=>(function(s,i){let o=s.updateTime?Ne(s.updateTime):Ne(i);return o.isEqual(B.min())&&(o=Ne(i)),new ew(o,s.transformResults||[])})(t,e)))):[]}function Om(r,e){return{documents:[Dm(r,e.path)]}}function Mm(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Dm(r,s);const i=(function(h){if(h.length!==0)return Um(ee.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(I){return{field:Wn(I.field),direction:_w(I.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=$a(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function Lm(r){let e=Nm(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){F(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(g){const I=Fm(g);return I instanceof ee&&bc(I)?I.getFilters():[I]})(t.where));let o=[];t.orderBy&&(o=(function(g){return g.map((I=>(function(V){return new Ts(Qn(V.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(V.direction))})(I)))})(t.orderBy));let c=null;t.limit&&(c=(function(g){let I;return I=typeof g=="object"?g.value:g,co(I)?null:I})(t.limit));let u=null;t.startAt&&(u=(function(g){const I=!!g.before,b=g.values||[];return new hr(b,I)})(t.startAt));let h=null;return t.endAt&&(h=(function(g){const I=!g.before,b=g.values||[];return new hr(b,I)})(t.endAt)),UT(e,s,o,i,c,"F",u,h)}function pw(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Fm(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Qn(t.unaryFilter.field);return W.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Qn(t.unaryFilter.field);return W.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Qn(t.unaryFilter.field);return W.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Qn(t.unaryFilter.field);return W.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}})(r):r.fieldFilter!==void 0?(function(t){return W.create(Qn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ee.create(t.compositeFilter.filters.map((n=>Fm(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}})(t.compositeFilter.op))})(r):M(30097,{filter:r})}function _w(r){return cw[r]}function yw(r){return uw[r]}function Iw(r){return lw[r]}function Wn(r){return{fieldPath:r.canonicalString()}}function Qn(r){return ce.fromServerFormat(r.fieldPath)}function Um(r){return r instanceof W?(function(t){if(t.op==="=="){if(ih(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NAN"}};if(sh(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ih(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NAN"}};if(sh(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wn(t.field),op:yw(t.op),value:t.value}}})(r):r instanceof ee?(function(t){const n=t.getFilters().map((s=>Um(s)));return n.length===1?n[0]:{compositeFilter:{op:Iw(t.op),filters:n}}})(r):M(54877,{filter:r})}function Ew(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Bm(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function qm(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t,n,s,i=B.min(),o=B.min(),c=ge.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new dt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new dt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new dt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new dt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(e){this.yt=e}}function Tw(r,e){let t;if(e.document)t=fw(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=O.fromSegments(e.noDocument.path),s=bn(e.noDocument.readTime);t=le.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return M(56709);{const n=O.fromSegments(e.unknownDocument.path),s=bn(e.unknownDocument.version);t=le.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new Z(s[0],s[1]);return B.fromTimestamp(i)})(e.readTime)),t}function wh(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Gi(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,o){return{name:zi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:pr(i,o.version.toTimestamp()),createTime:pr(i,o.createTime.toTimestamp())}})(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Sn(e.version)};else{if(!e.isUnknownDocument())return M(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Sn(e.version)}}return n}function Gi(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Sn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function bn(r){const e=new Z(r.seconds,r.nanoseconds);return B.fromTimestamp(e)}function dn(r,e){const t=(e.baseMutations||[]).map((i=>Ga(r.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>Ga(r.yt,i))),s=Z.fromMillis(e.localWriteTimeMs);return new Cc(e.batchId,s,t,n)}function Yr(r){const e=bn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?bn(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const o=i.documents.length;return F(o===1,1966,{count:o}),$e(go(Nm(i.documents[0])))})(r.query):(function(i){return $e(Lm(i))})(r.query),new dt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,ge.fromBase64String(r.resumeToken))}function $m(r,e){const t=Sn(e.snapshotVersion),n=Sn(e.lastLimboFreeSnapshotVersion);let s;s=qi(e.target)?Om(r.yt,e.target):Mm(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Rn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function zm(r){const e=Lm({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?$i(e,e.limit,"L"):e}function ca(r,e){return new kc(e.largestBatchId,Ga(r.yt,e.overlayMutation))}function vh(r,e){const t=e.path.lastSegment();return[r,Pe(e.path.popLast()),t]}function Ah(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Sn(n.readTime),documentKey:Pe(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{getBundleMetadata(e,t){return Rh(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:bn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return Rh(e).put((function(s){return{bundleId:s.id,createTime:Sn(Ne(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return Sh(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:zm(i.bundledQuery),readTime:bn(i.readTime)}})(n)}))}saveNamedQuery(e,t){return Sh(e).put((function(s){return{name:s.name,readTime:Sn(Ne(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function Rh(r){return Ie(r,uo)}function Sh(r){return Ie(r,lo)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new Eo(e,n)}getOverlay(e,t){return Br(e).get(vh(this.userId,t)).next((n=>n?ca(this.serializer,n):null))}getOverlays(e,t){const n=st();return v.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,o)=>{const c=new kc(t,o);s.push(this.St(e,c))})),v.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((o=>s.add(Pe(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(Br(e).X(Oa,c))})),v.waitFor(i)}getOverlaysForCollection(e,t,n){const s=st(),i=Pe(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Br(e).J(Oa,o).next((c=>{for(const u of c){const h=ca(this.serializer,u);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=st();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Br(e).ee({index:zf,range:c},((u,h,f)=>{const g=ca(this.serializer,h);i.size()<s||g.largestBatchId===o?(i.set(g.getKey(),g),o=g.largestBatchId):f.done()})).next((()=>i))}St(e,t){return Br(e).put((function(s,i,o){const[c,u,h]=vh(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ki(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function Br(r){return Ie(r,ho)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{bt(e){return Ie(e,wc)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const n=t==null?void 0:t.value;return n?ge.fromUint8Array(n):ge.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(oe(e.integerValue));else if("doubleValue"in e){const n=oe(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),fs(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=pt(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(_t(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?nm(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):mo(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):M(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){var o,c;const n=e.fields||{};this.Ft(t,53);const s=ur,i=((c=(o=n[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(oe(i)),this.Ot(s,t),this.Ct(n[s],t)}Kt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),O.fromName(e).path.forEach((n=>{this.Ft(t,60),this.$t(n,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}fn.Wt=new fn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn=255;function Aw(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function bh(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const o=Aw(255&n[i]);if(s+=o,o!==8)break}return s})(r);return Math.ceil(e/8)}class Rw{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),n=bh(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=bh(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(jn),this.sn(255)}_n(){this.an(jn),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===jn?(this.sn(jn),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===jn?(this.an(jn),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class Sw{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class bw{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class qr{constructor(){this.cn=new Rw,this.ascending=new Sw(this.cn),this.descending=new bw(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,t,n,s){this.hn=e,this.Pn=t,this.Tn=n,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new mn(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:Ri(this.Tn),directionalValue:Ri(this.En),orderedDocumentKey:Ri(t),documentKey:n.path.toArray()}}An(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Pt(r,e){let t=r.hn-e.hn;return t!==0?t:(t=Ph(r.Tn,e.Tn),t!==0?t:(t=Ph(r.En,e.En),t!==0?t:O.comparator(r.Pn,e.Pn)))}function Ph(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function Ri(r){return xd()?(function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n})(r):r}function Ch(r){return typeof r!="string"?r:(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(r)}class Vh{constructor(e){this.Vn=new te(((t,n)=>ce.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(e){if(F(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Da(e);if(t!==void 0&&!this.pn(t))return!1;const n=un(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=n[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new te(ce.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new _i(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new _i(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new _i(n.field,n.dir==="asc"?0:1)));return new Mi(Mi.UNKNOWN_ID,this.collectionId,t,ds.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(r){var t,n;if(F(r instanceof W||r instanceof ee,20012),r instanceof W){if(r instanceof hm){const s=((n=(t=r.value.arrayValue)==null?void 0:t.values)==null?void 0:n.map((i=>W.create(r.field,"==",i))))||[];return ee.create(s,"or")}return r}const e=r.filters.map((s=>Km(s)));return ee.create(e,r.op)}function Pw(r){if(r.getFilters().length===0)return[];const e=Qa(Km(r));return F(Gm(e),7391),Ha(e)||Wa(e)?[e]:e.getFilters()}function Ha(r){return r instanceof W}function Wa(r){return r instanceof ee&&bc(r)}function Gm(r){return Ha(r)||Wa(r)||(function(t){if(t instanceof ee&&Ua(t)){for(const n of t.getFilters())if(!Ha(n)&&!Wa(n))return!1;return!0}return!1})(r)}function Qa(r){if(F(r instanceof W||r instanceof ee,34018),r instanceof W)return r;if(r.filters.length===1)return Qa(r.filters[0]);const e=r.filters.map((n=>Qa(n)));let t=ee.create(e,r.op);return t=Hi(t),Gm(t)?t:(F(t instanceof ee,64498),F(dr(t),40251),F(t.filters.length>1,57927),t.filters.reduce(((n,s)=>xc(n,s))))}function xc(r,e){let t;return F(r instanceof W||r instanceof ee,38388),F(e instanceof W||e instanceof ee,25473),t=r instanceof W?e instanceof W?(function(s,i){return ee.create([s,i],"and")})(r,e):kh(r,e):e instanceof W?kh(e,r):(function(s,i){if(F(s.filters.length>0&&i.filters.length>0,48005),dr(s)&&dr(i))return cm(s,i.getFilters());const o=Ua(s)?s:i,c=Ua(s)?i:s,u=o.filters.map((h=>xc(h,c)));return ee.create(u,"or")})(r,e),Hi(t)}function kh(r,e){if(dr(e))return cm(e,r.getFilters());{const t=e.filters.map((n=>xc(r,n)));return ee.create(t,"or")}}function Hi(r){if(F(r instanceof W||r instanceof ee,11850),r instanceof W)return r;const e=r.getFilters();if(e.length===1)return Hi(e[0]);if(om(r))return r;const t=e.map((s=>Hi(s))),n=[];return t.forEach((s=>{s instanceof W?n.push(s):s instanceof ee&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:ee.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(){this.bn=new Oc}addToCollectionParentIndex(e,t){return this.bn.add(t),v.resolve()}getCollectionParents(e,t){return v.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return v.resolve()}deleteFieldIndex(e,t){return v.resolve()}deleteAllFieldIndexes(e){return v.resolve()}createTargetIndexes(e,t){return v.resolve()}getDocumentsMatchingTarget(e,t){return v.resolve(null)}getIndexType(e,t){return v.resolve(0)}getFieldIndexes(e,t){return v.resolve([])}getNextCollectionGroupToUpdate(e){return v.resolve(null)}getMinOffset(e,t){return v.resolve(Be.min())}getMinOffsetFromCollectionGroup(e,t){return v.resolve(Be.min())}updateCollectionGroup(e,t,n){return v.resolve()}updateIndexEntries(e,t){return v.resolve()}}class Oc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new te(X.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new te(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh="IndexedDbIndexManager",ci=new Uint8Array(0);class Vw{constructor(e,t){this.databaseId=t,this.Dn=new Oc,this.Cn=new yt((n=>Rn(n)),((n,s)=>ks(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const i={collectionId:n,parent:Pe(s)};return Nh(e).put(i)}return v.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Df(t),""],!1,!0);return Nh(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;n.push(rt(o.parent))}return n}))}addFieldIndex(e,t){const n=jr(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=zn(e);return i.next((c=>{o.put(Ah(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=jr(e),s=zn(e),i=$n(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=jr(e),n=$n(e),s=zn(e);return t.X().next((()=>n.X())).next((()=>s.X()))}createTargetIndexes(e,t){return v.forEach(this.vn(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new Vh(n).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=$n(e);let s=!0;const i=new Map;return v.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=G();const c=[];return v.forEach(i,((u,h)=>{C(Dh,`Using index ${(function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map((ne=>`${ne.fieldPath}:${ne.kind}`)).join(",")}`})(u)} to execute ${Rn(t)}`);const f=(function(U,ne){const J=Da(ne);if(J===void 0)return null;for(const Y of ji(U,J.fieldPath))switch(Y.op){case"array-contains-any":return Y.value.arrayValue.values||[];case"array-contains":return[Y.value]}return null})(h,u),g=(function(U,ne){const J=new Map;for(const Y of un(ne))for(const E of ji(U,Y.fieldPath))switch(E.op){case"==":case"in":J.set(Y.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return J.set(Y.fieldPath.canonicalString(),E.value),Array.from(J.values())}return null})(h,u),I=(function(U,ne){const J=[];let Y=!0;for(const E of un(ne)){const p=E.kind===0?lh(U,E.fieldPath,U.startAt):hh(U,E.fieldPath,U.startAt);J.push(p.value),Y&&(Y=p.inclusive)}return new hr(J,Y)})(h,u),b=(function(U,ne){const J=[];let Y=!0;for(const E of un(ne)){const p=E.kind===0?hh(U,E.fieldPath,U.endAt):lh(U,E.fieldPath,U.endAt);J.push(p.value),Y&&(Y=p.inclusive)}return new hr(J,Y)})(h,u),V=this.Mn(u,h,I),D=this.Mn(u,h,b),x=this.xn(u,h,g),$=this.On(u.indexId,f,V,I.inclusive,D,b.inclusive,x);return v.forEach($,(L=>n.Z(L,t.limit).next((U=>{U.forEach((ne=>{const J=O.fromSegments(ne.documentKey);o.has(J)||(o=o.add(J),c.push(J))}))}))))})).next((()=>c))}return v.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=Pw(ee.create(e.filters,"and")).map((n=>qa(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,n,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(n.length,i.length),h=u/(t!=null?t.length:1),f=[];for(let g=0;g<u;++g){const I=t?this.Nn(t[g/h]):ci,b=this.Bn(e,I,n[g%h],s),V=this.Ln(e,I,i[g%h],o),D=c.map((x=>this.Bn(e,I,x,!0)));f.push(...this.createRange(b,V,D))}return f}Bn(e,t,n,s){const i=new mn(e,O.empty(),t,n);return s?i:i.In()}Ln(e,t,n,s){const i=new mn(e,O.empty(),t,n);return s?i.In():i}Fn(e,t){const n=new Vh(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)n.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let n=2;const s=this.vn(t);return v.forEach(s,(i=>this.Fn(e,i).next((o=>{o?n!==0&&o.fields.length<(function(u){let h=new te(ce.comparator),f=!1;for(const g of u.filters)for(const I of g.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:h=h.add(I.field));for(const g of u.orderBy)g.field.isKeyField()||(h=h.add(g.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&n===2?1:n))}kn(e,t){const n=new qr;for(const s of un(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.ln(s.kind);fn.Wt.Dt(i,o)}return n.un()}Nn(e){const t=new qr;return fn.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const n=new qr;return fn.Wt.Dt(Is(this.databaseId,t),n.ln((function(i){const o=un(i);return o.length===0?0:o[o.length-1].kind})(e))),n.un()}xn(e,t,n){if(n===null)return[];let s=[];s.push(new qr);let i=0;for(const o of un(e)){const c=n[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&Es(c))s=this.Un(s,o,c);else{const h=u.ln(o.kind);fn.Wt.Dt(c,h)}}return this.$n(s)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const u=new qr;u.seed(c.un()),fn.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find((n=>n instanceof W&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=jr(e),s=zn(e);return(t?n.J(xa,IDBKeyRange.bound(t,t)):n.J()).next((i=>{const o=[];return v.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(f,g){const I=g?new ds(g.sequenceNumber,new Be(bn(g.readTime),new O(rt(g.documentKey)),g.largestBatchId)):ds.empty(),b=f.fields.map((([V,D])=>new _i(ce.fromServerFormat(V),D)));return new Mi(f.indexId,f.collectionGroup,b,I)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:z(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=jr(e),i=zn(e);return this.Wn(e).next((o=>s.J(xa,IDBKeyRange.bound(t,t)).next((c=>v.forEach(c,(u=>i.put(Ah(u.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return v.forEach(t,((s,i)=>{const o=n.get(s.collectionGroup);return(o?v.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(n.set(s.collectionGroup,c),v.forEach(c,(u=>this.Qn(e,s,u).next((h=>{const f=this.Gn(i,u);return h.isEqual(f)?v.resolve():this.zn(e,i,u,h,f)})))))))}))}jn(e,t,n,s){return $n(e).put(s.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,s){return $n(e).delete(s.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){const s=$n(e);let i=new te(Pt);return s.ee({index:$f,range:IDBKeyRange.only([n.indexId,this.uid,Ri(this.qn(n,t))])},((o,c)=>{i=i.add(new mn(n.indexId,t,Ch(c.arrayValue),Ch(c.directionalValue)))})).next((()=>i))}Gn(e,t){let n=new te(Pt);const s=this.kn(t,e);if(s==null)return n;const i=Da(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Es(o))for(const c of o.arrayValue.values||[])n=n.add(new mn(t.indexId,e.key,this.Nn(c),s))}else n=n.add(new mn(t.indexId,e.key,ci,s));return n}zn(e,t,n,s,i){C(Dh,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,h,f,g,I){const b=u.getIterator(),V=h.getIterator();let D=qn(b),x=qn(V);for(;D||x;){let $=!1,L=!1;if(D&&x){const U=f(D,x);U<0?L=!0:U>0&&($=!0)}else D!=null?L=!0:$=!0;$?(g(x),x=qn(V)):L?(I(D),D=qn(b)):(D=qn(b),x=qn(V))}})(s,i,Pt,(c=>{o.push(this.jn(e,t,n,c))}),(c=>{o.push(this.Jn(e,t,n,c))})),v.waitFor(o)}Wn(e){let t=1;return zn(e).ee({index:jf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,c)=>Pt(o,c))).filter(((o,c,u)=>!c||Pt(o,u[c-1])!==0));const s=[];s.push(e);for(const o of n){const c=Pt(o,e),u=Pt(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,ci,O.empty()),u=s[o+1].An(this.uid,ci,O.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return Pt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(xh)}getMinOffset(e,t){return v.mapArray(this.vn(t),(n=>this.Fn(e,n).next((s=>s||M(44426))))).next(xh)}}function Nh(r){return Ie(r,ps)}function $n(r){return Ie(r,rs)}function jr(r){return Ie(r,Tc)}function zn(r){return Ie(r,ns)}function xh(r){F(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;yc(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Be(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Hm=41943040;class Re{static withCacheSize(e){return new Re(e,Re.DEFAULT_COLLECTION_PERCENTILE,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wm(r,e,t){const n=r.store(He),s=r.store(ir),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=n.ee({range:o},((f,g,I)=>(c++,I.delete())));i.push(u.next((()=>{F(c===1,47070,{batchId:t.batchId})})));const h=[];for(const f of t.mutations){const g=Uf(e,f.key.path,t.batchId);i.push(s.delete(g)),h.push(f.key)}return v.waitFor(i).next((()=>h))}function Wi(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw M(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Re.DEFAULT_COLLECTION_PERCENTILE=10,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Re.DEFAULT=new Re(Hm,Re.DEFAULT_COLLECTION_PERCENTILE,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Re.DISABLED=new Re(-1,0,0);class To{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(e,t,n,s){F(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new To(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ct(e).ee({index:pn,range:n},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=Jn(e),o=Ct(e);return o.add({}).next((c=>{F(typeof c=="number",49019);const u=new Cc(c,t,n,s),h=(function(b,V,D){const x=D.baseMutations.map((L=>Ki(b.yt,L))),$=D.mutations.map((L=>Ki(b.yt,L)));return{userId:V,batchId:D.batchId,localWriteTimeMs:D.localWriteTime.toMillis(),baseMutations:x,mutations:$}})(this.serializer,this.userId,u),f=[];let g=new te(((I,b)=>z(I.canonicalString(),b.canonicalString())));for(const I of s){const b=Uf(this.userId,I.key.path,c);g=g.add(I.key.path.popLast()),f.push(o.put(h)),f.push(i.put(b,nT))}return g.forEach((I=>{f.push(this.indexManager.addToCollectionParentIndex(e,I))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),v.waitFor(f).next((()=>u))}))}lookupMutationBatch(e,t){return Ct(e).get(t).next((n=>n?(F(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),dn(this.serializer,n)):null))}Xn(e,t){return this.Zn[t]?v.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.Zn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Ct(e).ee({index:pn,range:s},((o,c,u)=>{c.userId===this.userId&&(F(c.batchId>=n,47524,{Yn:n}),i=dn(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=yn;return Ct(e).ee({index:pn,range:t,reverse:!0},((s,i,o)=>{n=i.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,yn],[this.userId,Number.POSITIVE_INFINITY]);return Ct(e).J(pn,t).next((n=>n.map((s=>dn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=yi(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return Jn(e).ee({range:s},((o,c,u)=>{const[h,f,g]=o,I=rt(f);if(h===this.userId&&t.path.isEqual(I))return Ct(e).get(g).next((b=>{if(!b)throw M(61480,{er:o,batchId:g});F(b.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:b.userId,batchId:g}),i.push(dn(this.serializer,b))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(z);const s=[];return t.forEach((i=>{const o=yi(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Jn(e).ee({range:c},((h,f,g)=>{const[I,b,V]=h,D=rt(b);I===this.userId&&i.path.isEqual(D)?n=n.add(V):g.done()}));s.push(u)})),v.waitFor(s).next((()=>this.tr(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=yi(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new te(z);return Jn(e).ee({range:o},((u,h,f)=>{const[g,I,b]=u,V=rt(I);g===this.userId&&n.isPrefixOf(V)?V.length===s&&(c=c.add(b)):f.done()})).next((()=>this.tr(e,c)))}tr(e,t){const n=[],s=[];return t.forEach((i=>{s.push(Ct(e).get(i).next((o=>{if(o===null)throw M(35274,{batchId:i});F(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(dn(this.serializer,o))})))})),v.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return Wm(e.le,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),v.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return v.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return Jn(e).ee({range:n},((i,o,c)=>{if(i[0]===this.userId){const u=rt(i[1]);s.push(u)}else c.done()})).next((()=>{F(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return Qm(e,this.userId,t)}ir(e){return Jm(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:yn,lastStreamToken:""}))}}function Qm(r,e,t){const n=yi(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return Jn(r).ee({range:i,Y:!0},((c,u,h)=>{const[f,g,I]=c;f===e&&g===s&&(o=!0),h.done()})).next((()=>o))}function Ct(r){return Ie(r,He)}function Jn(r){return Ie(r,ir)}function Jm(r){return Ie(r,ms)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Pn(0)}static ar(){return new Pn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const n=new Pn(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>B.fromTimestamp(new Z(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.ur(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Kn(e).delete(t.targetId))).next((()=>this.ur(e))).next((n=>(F(n.targetCount>0,8065),n.targetCount-=1,this.cr(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return Kn(e).ee(((o,c)=>{const u=Yr(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>v.waitFor(i))).next((()=>s))}forEachTarget(e,t){return Kn(e).ee(((n,s)=>{const i=Yr(s);t(i)}))}ur(e){return Mh(e).get(Ui).next((t=>(F(t!==null,2888),t)))}cr(e,t){return Mh(e).put(Ui,t)}lr(e,t){return Kn(e).put($m(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const n=Rn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Kn(e).ee({range:s,index:qf},((o,c,u)=>{const h=Yr(c);ks(t,h.target)&&(i=h,u.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=Mt(e);return t.forEach((o=>{const c=Pe(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))})),v.waitFor(s)}removeMatchingKeys(e,t,n){const s=Mt(e);return v.forEach(t,(i=>{const o=Pe(i.path);return v.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=Mt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Mt(e);let i=G();return s.ee({range:n,Y:!0},((o,c,u)=>{const h=rt(o[1]),f=new O(h);i=i.add(f)})).next((()=>i))}containsKey(e,t){const n=Pe(t.path),s=IDBKeyRange.bound([n],[Df(n)],!1,!0);let i=0;return Mt(e).ee({index:Ec,Y:!0,range:s},(([o,c],u,h)=>{o!==0&&(i++,h.done())})).next((()=>i>0))}At(e,t){return Kn(e).get(t).next((n=>n?Yr(n):null))}}function Kn(r){return Ie(r,or)}function Mh(r){return Ie(r,In)}function Mt(r){return Ie(r,ar)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh="LruGarbageCollector",Ym=1048576;function Fh([r,e],[t,n]){const s=z(r,t);return s===0?z(e,n):s}class Dw{constructor(e){this.Pr=e,this.buffer=new te(Fh),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Fh(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Xm{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){C(Lh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Yt(t)?C(Lh,"Ignoring IndexedDB error during garbage collection: ",t):await On(t)}await this.Ar(3e5)}))}}class Nw{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return v.resolve(je.ce);const n=new Dw(t);return this.Vr.forEachTarget(e,(s=>n.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>n.Ir(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(Oh)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Oh):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((g=>(g>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,o=Date.now(),this.nthSequenceNumber(e,s)))).next((g=>(n=g,c=Date.now(),this.removeTargets(e,n,t)))).next((g=>(i=g,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((g=>(h=Date.now(),Gn()<=H.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${g} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g}))))}}function Zm(r,e){return new Nw(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(e,t){this.db=e,this.garbageCollector=Zm(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((n,s)=>t(s)))}addReference(e,t,n){return ui(e,n)}removeReference(e,t,n){return ui(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return ui(e,t)}wr(e,t){return(function(s,i){let o=!1;return Jm(s).te((c=>Qm(s,c,i).next((u=>(u&&(o=!0),v.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((h=>{if(!h)return i++,n.getEntry(e,o).next((()=>(n.removeEntry(o,B.min()),Mt(e).delete((function(g){return[0,Pe(g.path)]})(o)))))}));s.push(u)}})).next((()=>v.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return ui(e,t)}yr(e,t){const n=Mt(e);let s,i=je.ce;return n.ee({index:Ec},(([o,c],{path:u,sequenceNumber:h})=>{o===0?(i!==je.ce&&t(new O(rt(s)),i),i=h,s=u):i=je.ce})).next((()=>{i!==je.ce&&t(new O(rt(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ui(r,e){return Mt(r).put((function(n,s){return{targetId:0,path:Pe(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(){this.changes=new yt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?v.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return an(e).put(n)}removeEntry(e,t,n){return an(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Gi(o),c[c.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.Sr(e,n))))}getEntry(e,t){let n=le.newInvalidDocument(t);return an(e).ee({index:Ii,range:IDBKeyRange.only($r(t))},((s,i)=>{n=this.br(t,i)})).next((()=>n))}Dr(e,t){let n={size:0,document:le.newInvalidDocument(t)};return an(e).ee({index:Ii,range:IDBKeyRange.only($r(t))},((s,i)=>{n={document:this.br(t,i),size:Wi(i)}})).next((()=>n))}getEntries(e,t){let n=Ue();return this.Cr(e,t,((s,i)=>{const o=this.br(s,i);n=n.insert(s,o)})).next((()=>n))}vr(e,t){let n=Ue(),s=new ae(O.comparator);return this.Cr(e,t,((i,o)=>{const c=this.br(i,o);n=n.insert(i,c),s=s.insert(i,Wi(o))})).next((()=>({documents:n,Fr:s})))}Cr(e,t,n){if(t.isEmpty())return v.resolve();let s=new te(qh);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound($r(s.first()),$r(s.last())),o=s.getIterator();let c=o.getNext();return an(e).ee({index:Ii,range:i},((u,h,f)=>{const g=O.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&qh(c,g)<0;)n(c,null),c=o.getNext();c&&c.isEqual(g)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.j($r(c)):f.done()})).next((()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Gi(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return an(e).J(IDBKeyRange.bound(c,u,!0)).next((h=>{i==null||i.incrementDocumentReadCount(h.length);let f=Ue();for(const g of h){const I=this.br(O.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);I.isFoundDocument()&&(Ds(t,I)||s.has(I.key))&&(f=f.insert(I.key,I))}return f}))}getAllFromCollectionGroup(e,t,n,s){let i=Ue();const o=Bh(t,n),c=Bh(t,Be.max());return an(e).ee({index:Bf,range:IDBKeyRange.bound(o,c,!0)},((u,h,f)=>{const g=this.br(O.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(g.key,g),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new Mw(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return Uh(e).get(Na).next((t=>(F(!!t,20021),t)))}Sr(e,t){return Uh(e).put(Na,t)}br(e,t){if(t){const n=Tw(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return le.newInvalidDocument(e)}}function tg(r){return new Ow(r)}class Mw extends eg{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new yt((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new te(((i,o)=>z(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=wh(this.Mr.serializer,o);s=s.add(i.path.popLast());const h=Wi(u);n+=h-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(n-=c.size,this.trackRemovals){const u=wh(this.Mr.serializer,o.convertToNoDocument(B.min()));t.push(this.Mr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Mr.updateMetadata(e,n)),v.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((n=>(this.Or.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:n,Fr:s})=>(s.forEach(((i,o)=>{this.Or.set(i,{size:o,readTime:n.get(i).readTime})})),n)))}}function Uh(r){return Ie(r,gs)}function an(r){return Ie(r,Fi)}function $r(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Bh(r,e){const t=e.documentKey.path.toArray();return[r,Gi(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function qh(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=z(t[i],n[i]),s)return s;return s=z(t.length,n.length),s||(s=z(t[t.length-2],n[n.length-2]),s||z(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&as(n.mutation,s,Oe.empty(),Z.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,G()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=G()){const s=st();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=Qr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=st();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,G())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,n,s){let i=Ue();const o=os(),c=(function(){return os()})();return t.forEach(((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof It)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),as(f.mutation,h,f.mutation.getFieldMask(),Z.now())):o.set(h.key,Oe.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>c.set(h,new Lw(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const n=os();let s=new ae(((o,c)=>o-c)),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||Oe.empty();f=c.applyToLocalView(h,f),n.set(u,f);const g=(s.get(c.batchId)||G()).add(u);s=s.insert(c.batchId,g)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,g=_m();f.forEach((I=>{if(!i.has(I)){const b=Am(t.get(I),n.get(I));b!==null&&g.set(I,b),i=i.add(I)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,g))}return v.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return BT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):dm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):v.resolve(st());let c=hs,u=i;return o.next((h=>v.forEach(h,((f,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),i.get(f)?v.resolve():this.remoteDocumentCache.getEntry(e,f).next((I=>{u=u.insert(f,I)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,G()))).next((f=>({batchId:c,changes:pm(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next((n=>{let s=Qr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=Qr();return this.indexManager.getCollectionParents(e,i).next((c=>v.forEach(c,(u=>{const h=(function(g,I){return new Tr(I,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next((f=>{f.forEach(((g,I)=>{o=o.insert(g,I)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,le.newInvalidDocument(f)))}));let c=Qr();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&as(f.mutation,h,Oe.empty(),Z.now()),Ds(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fw{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return v.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Ne(s.createTime)}})(t)),v.resolve()}getNamedQuery(e,t){return v.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:zm(s.bundledQuery),readTime:Ne(s.readTime)}})(t)),v.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.overlays=new ae(O.comparator),this.Lr=new Map}getOverlay(e,t){return v.resolve(this.overlays.get(t))}getOverlays(e,t){const n=st();return v.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.St(e,t,i)})),v.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(n)),v.resolve()}getOverlaysForCollection(e,t,n){const s=st(),i=t.length+1,o=new O(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return v.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new ae(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=st(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=st(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return v.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new kc(t,n));let i=this.Lr.get(t);i===void 0&&(i=G(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(){this.sessionToken=ge.EMPTY_BYTE_STRING}getSessionToken(e){return v.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,v.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(){this.kr=new te(Te.qr),this.Kr=new te(Te.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new Te(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Wr(new Te(e,t))}Qr(e,t){e.forEach((n=>this.removeReference(n,t)))}Gr(e){const t=new O(new X([])),n=new Te(t,e),s=new Te(t,e+1),i=[];return this.Kr.forEachInRange([n,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new O(new X([])),n=new Te(t,e),s=new Te(t,e+1);let i=G();return this.Kr.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Te(e,0),n=this.kr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Te{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return O.comparator(e.key,t.key)||z(e.Jr,t.Jr)}static Ur(e,t){return z(e.Jr,t.Jr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new te(Te.qr)}checkEmpty(e){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Cc(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Te(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return v.resolve(o)}lookupMutationBatch(e,t){return v.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.Xr(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?yn:this.Yn-1)}getAllMutationBatches(e){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Te(t,0),s=new Te(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,s],(o=>{const c=this.Zr(o.Jr);i.push(c)})),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(z);return t.forEach((s=>{const i=new Te(s,0),o=new Te(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(c=>{n=n.add(c.Jr)}))})),v.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;O.isDocumentKey(i)||(i=i.child(""));const o=new Te(new O(i),0);let c=new te(z);return this.Hr.forEachWhile((u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Jr)),!0)}),o),v.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((n=>{const s=this.Zr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){F(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return v.forEach(t.mutations,(s=>{const i=new Te(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=n}))}nr(e){}containsKey(e,t){const n=new Te(t,0),s=this.Hr.firstAfterOrEqual(n);return v.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,v.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e){this.ti=e,this.docs=(function(){return new ae(O.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return v.resolve(n?n.document.mutableCopy():le.newInvalidDocument(t))}getEntries(e,t){let n=Ue();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():le.newInvalidDocument(s))})),v.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=Ue();const o=t.path,c=new O(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||yc(Of(f),n)<=0||(s.has(f.key)||Ds(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(e,t,n,s){M(9500)}ni(e,t){return v.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new $w(this)}getSize(e){return v.resolve(this.size)}}class $w extends eg{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(n)})),v.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zw{constructor(e){this.persistence=e,this.ri=new yt((t=>Rn(t)),ks),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.ii=0,this.si=new Mc,this.targetCount=0,this.oi=Pn._r()}forEachTarget(e,t){return this.ri.forEach(((n,s)=>t(s))),v.resolve()}getLastRemoteSnapshotVersion(e){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return v.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),v.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Pn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,v.resolve()}updateTargetData(e,t){return this.lr(t),v.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,v.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),v.waitFor(i).next((()=>s))}getTargetCount(e){return v.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return v.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),v.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),v.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),v.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return v.resolve(n)}containsKey(e,t){return v.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e,t){this._i={},this.overlays={},this.ai=new je(0),this.ui=!1,this.ui=!0,this.ci=new Bw,this.referenceDelegate=e(this),this.li=new zw(this),this.indexManager=new Cw,this.remoteDocumentCache=(function(s){return new jw(s)})((n=>this.referenceDelegate.hi(n))),this.serializer=new jm(t),this.Pi=new Fw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Uw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new qw(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){C("MemoryPersistence","Starting transaction:",e);const s=new Kw(this.ai.next());return this.referenceDelegate.Ti(),n(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return v.or(Object.values(this._i).map((n=>()=>n.containsKey(e,t))))}}class Kw extends Lf{constructor(e){super(),this.currentSequenceNumber=e}}class wo{constructor(e){this.persistence=e,this.Ri=new Mc,this.Ai=null}static Vi(e){return new wo(e)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),v.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),v.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),v.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.di,(n=>{const s=O.fromPath(n);return this.mi(e,s).next((i=>{i||t.removeEntry(s,B.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((n=>{n?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return v.or([()=>v.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Qi{constructor(e,t){this.persistence=e,this.fi=new yt((n=>Pe(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=Zm(this,t)}static Vi(e,t){return new Qi(e,t)}Ti(){}Ei(e){return v.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}mr(e,t){return v.forEach(this.fi,((n,s)=>this.wr(e,n,s).next((i=>i?v.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(n++,i.removeEntry(o,B.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),v.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),v.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),v.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),v.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ti(e.data.value)),t}wr(e,t,n){return v.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e){this.serializer=e}k(e,t,n,s){const i=new ao("createOrUpgrade",t);n<1&&s>=1&&((function(u){u.createObjectStore(Vs)})(e),(function(u){u.createObjectStore(ms,{keyPath:tT}),u.createObjectStore(He,{keyPath:Xl,autoIncrement:!0}).createIndex(pn,Zl,{unique:!0}),u.createObjectStore(ir)})(e),jh(e),(function(u){u.createObjectStore(ln)})(e));let o=v.resolve();return n<3&&s>=3&&(n!==0&&((function(u){u.deleteObjectStore(ar),u.deleteObjectStore(or),u.deleteObjectStore(In)})(e),jh(e)),o=o.next((()=>(function(u){const h=u.store(In),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put(Ui,f)})(i)))),n<4&&s>=4&&(n!==0&&(o=o.next((()=>(function(u,h){return h.store(He).J().next((g=>{u.deleteObjectStore(He),u.createObjectStore(He,{keyPath:Xl,autoIncrement:!0}).createIndex(pn,Zl,{unique:!0});const I=h.store(He),b=g.map((V=>I.put(V)));return v.waitFor(b)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(cr,{keyPath:lT})})(e)}))),n<5&&s>=5&&(o=o.next((()=>this.gi(i)))),n<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(gs)})(e),this.pi(i))))),n<7&&s>=7&&(o=o.next((()=>this.yi(i)))),n<8&&s>=8&&(o=o.next((()=>this.wi(e,i)))),n<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(o=o.next((()=>this.Si(i)))),n<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(uo,{keyPath:hT})})(e),(function(u){u.createObjectStore(lo,{keyPath:dT})})(e)}))),n<12&&s>=12&&(o=o.next((()=>{(function(u){const h=u.createObjectStore(ho,{keyPath:IT});h.createIndex(Oa,ET,{unique:!1}),h.createIndex(zf,TT,{unique:!1})})(e)}))),n<13&&s>=13&&(o=o.next((()=>(function(u){const h=u.createObjectStore(Fi,{keyPath:rT});h.createIndex(Ii,sT),h.createIndex(Bf,iT)})(e))).next((()=>this.bi(e,i))).next((()=>e.deleteObjectStore(ln)))),n<14&&s>=14&&(o=o.next((()=>this.Di(e,i)))),n<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(Tc,{keyPath:fT,autoIncrement:!0}).createIndex(xa,mT,{unique:!1}),u.createObjectStore(ns,{keyPath:gT}).createIndex(jf,pT,{unique:!1}),u.createObjectStore(rs,{keyPath:_T}).createIndex($f,yT,{unique:!1})})(e)))),n<16&&s>=16&&(o=o.next((()=>{t.objectStore(ns).clear()})).next((()=>{t.objectStore(rs).clear()}))),n<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(wc,{keyPath:wT})})(e)}))),n<18&&s>=18&&xd()&&(o=o.next((()=>{t.objectStore(ns).clear()})).next((()=>{t.objectStore(rs).clear()}))),o}pi(e){let t=0;return e.store(ln).ee(((n,s)=>{t+=Wi(s)})).next((()=>{const n={byteSize:t};return e.store(gs).put(Na,n)}))}gi(e){const t=e.store(ms),n=e.store(He);return t.J().next((s=>v.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,yn],[i.userId,i.lastAcknowledgedBatchId]);return n.J(pn,o).next((c=>v.forEach(c,(u=>{F(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=dn(this.serializer,u);return Wm(e,i.userId,h).next((()=>{}))}))))}))))}yi(e){const t=e.store(ar),n=e.store(ln);return e.store(In).get(Ui).next((s=>{const i=[];return n.ee(((o,c)=>{const u=new X(o),h=(function(g){return[0,Pe(g)]})(u);i.push(t.get(h).next((f=>f?v.resolve():(g=>t.put({targetId:0,path:Pe(g),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>v.waitFor(i)))}))}wi(e,t){e.createObjectStore(ps,{keyPath:uT});const n=t.store(ps),s=new Oc,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:Pe(u)})}};return t.store(ln).ee({Y:!0},((o,c)=>{const u=new X(o);return i(u.popLast())})).next((()=>t.store(ir).ee({Y:!0},(([o,c,u],h)=>{const f=rt(c);return i(f.popLast())}))))}Si(e){const t=e.store(or);return t.ee(((n,s)=>{const i=Yr(s),o=$m(this.serializer,i);return t.put(o)}))}bi(e,t){const n=t.store(ln),s=[];return n.ee(((i,o)=>{const c=t.store(Fi),u=(function(g){return g.document?new O(X.fromString(g.document.name).popFirst(5)):g.noDocument?O.fromSegments(g.noDocument.path):g.unknownDocument?O.fromSegments(g.unknownDocument.path):M(36783)})(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))})).next((()=>v.waitFor(s)))}Di(e,t){const n=t.store(He),s=tg(this.serializer),i=new Lc(wo.Vi,this.serializer.yt);return n.J().next((o=>{const c=new Map;return o.forEach((u=>{let h=c.get(u.userId)??G();dn(this.serializer,u).keys().forEach((f=>h=h.add(f))),c.set(u.userId,h)})),v.forEach(c,((u,h)=>{const f=new ke(h),g=Eo.wt(this.serializer,f),I=i.getIndexManager(f),b=To.wt(f,this.serializer,I,i.referenceDelegate);return new ng(s,b,g,I).recalculateAndSaveOverlaysForDocumentKeys(new Ma(t,je.ce),u).next()}))}))}}function jh(r){r.createObjectStore(ar,{keyPath:aT}).createIndex(Ec,cT,{unique:!0}),r.createObjectStore(or,{keyPath:"targetId"}).createIndex(qf,oT,{unique:!0}),r.createObjectStore(In)}const Vt="IndexedDbPersistence",ua=18e5,la=5e3,ha="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Hw="main";class Fc{constructor(e,t,n,s,i,o,c,u,h,f,g=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=o,this.document=c,this.Fi=h,this.Mi=f,this.xi=g,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=I=>Promise.resolve(),!Fc.v())throw new k(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new xw(this,s),this.qi=t+Hw,this.serializer=new jm(u),this.Ki=new qt(this.qi,this.xi,new Gw(this.serializer)),this.ci=new vw,this.li=new kw(this.referenceDelegate,this.serializer),this.remoteDocumentCache=tg(this.serializer),this.Pi=new ww,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&De(Vt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(P.FAILED_PRECONDITION,ha);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new je(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.Ki&&this.Ki.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>li(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Ji(e))).next((t=>this.isPrimary&&!t?this.Hi(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(Yt(e))return C(Vt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return C(Vt,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return zr(e).get(Bn).next((t=>v.resolve(this.Xi(t))))}Yi(e){return li(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,ua)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=Ie(t,cr);return n.J().next((s=>{const i=this.ns(s,ua),o=s.filter((c=>i.indexOf(c)===-1));return v.forEach(o,(c=>n.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?v.resolve(!0):zr(e).get(Bn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,la)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new k(P.FAILED_PRECONDITION,ha);return!1}}return!(!this.networkEnabled||!this.inForeground)||li(e).J().next((n=>this.ns(n,la).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&C(Vt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[Vs,cr],(e=>{const t=new Ma(e,je.ce);return this.Hi(t).next((()=>this.Yi(t)))})),this.Ki.close(),this.ls()}ns(e,t){return e.filter((n=>this.ts(n.updateTimeMs,t)&&!this.ss(n.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>li(e).J().next((t=>this.ns(t,ua).map((n=>n.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return To.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Vw(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Eo.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){C(Vt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?RT:u===17?Wf:u===16?AT:u===15?vc:u===14?Hf:u===13?Gf:u===12?vT:u===11?Kf:void M(60245)})(this.xi);let o;return this.Ki.runTransaction(e,s,i,(c=>(o=new Ma(c,this.ai?this.ai.next():je.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Ji(o))).next((u=>{if(!u)throw De(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new k(P.FAILED_PRECONDITION,Mf);return n(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>n(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return zr(e).get(Bn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,la)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new k(P.FAILED_PRECONDITION,ha)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return zr(e).put(Bn,t)}static v(){return qt.v()}Hi(e){const t=zr(e);return t.get(Bn).next((n=>this.Xi(n)?(C(Vt,"Releasing primary lease."),t.delete(Bn)):v.resolve()))}ts(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(De(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;Nd()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const n=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return C(Vt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return De(Vt,"Failed to get zombied client id.",n),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){De("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function zr(r){return Ie(r,Vs)}function li(r){return Ie(r,cr)}function Ww(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=s}static Is(e,t){let n=G(),s=G();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Uc(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Nd()?8:Ff(ye())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new Qw;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,n,s){return n.documentReadCount<this.Vs?(Gn()<=H.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",Hn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),v.resolve()):(Gn()<=H.DEBUG&&C("QueryEngine","Query:",Hn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(Gn()<=H.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",Hn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,$e(t))):v.resolve())}gs(e,t){if(dh(t))return v.resolve(null);let n=$e(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=$i(t,null,"F"),n=$e(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((i=>{const o=G(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,n).next((u=>{const h=this.Ss(t,c);return this.bs(t,h,o,u.readTime)?this.gs(e,$i(t,null,"F")):this.Ds(e,h,t,u)}))))})))))}ps(e,t,n,s){return dh(t)||s.isEqual(B.min())?v.resolve(null):this.fs.getDocuments(e,n).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,n,s)?v.resolve(null):(Gn()<=H.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Hn(t)),this.Ds(e,o,t,WE(s,hs)).next((c=>c)))}))}Ss(e,t){let n=new te(mm(e));return t.forEach(((s,i)=>{Ds(e,i)&&(n=n.add(i))})),n}bs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,n){return Gn()<=H.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",Hn(t)),this.fs.getDocumentsMatchingQuery(e,t,Be.min(),n)}Ds(e,t,n,s){return this.fs.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc="LocalStore",Jw=3e8;class Yw{constructor(e,t,n,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new ae(z),this.Fs=new yt((i=>Rn(i)),ks),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ng(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function sg(r,e,t,n){return new Yw(r,e,t,n)}async function ig(r,e){const t=j(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],c=[];let u=G();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next((h=>({Ns:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function Xw(r,e){const t=j(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const g=h.batch,I=g.keys();let b=v.resolve();return I.forEach((V=>{b=b.next((()=>f.getEntry(u,V))).next((D=>{const x=h.docVersions.get(V);F(x!==null,48541),D.version.compareTo(x)<0&&(g.applyToRemoteDocument(D,h),D.isValidDocument()&&(D.setReadTime(h.commitVersion),f.addEntry(D)))}))})),b.next((()=>c.mutationQueue.removeMutationBatch(u,g)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let u=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function og(r){const e=j(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function Zw(r,e){const t=j(r),n=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach(((f,g)=>{const I=s.get(g);if(!I)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,g).next((()=>t.li.addMatchingKeys(i,f.addedDocuments,g))));let b=I.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?b=b.withResumeToken(ge.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,n)),s=s.insert(g,b),(function(D,x,$){return D.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=Jw?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0})(I,b,f)&&c.push(t.li.updateTargetData(i,b))}));let u=Ue(),h=G();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(ev(i,o,e.documentUpdates).next((f=>{u=f.Bs,h=f.Ls}))),!n.isEqual(B.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next((g=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,n)));c.push(f)}return v.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.vs=s,i)))}function ev(r,e,t){let n=G(),s=G();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=Ue();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(B.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):C(Bc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Bs:o,Ls:s}}))}function tv(r,e){const t=j(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=yn),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function nv(r,e){const t=j(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.li.getTargetData(n,e).next((i=>i?(s=i,v.resolve(s)):t.li.allocateTargetId(n).next((o=>(s=new dt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.li.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(n.targetId,n),t.Fs.set(e,n.targetId)),n}))}async function Ja(r,e,t){const n=j(r),s=n.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Yt(o))throw o;C(Bc,`Failed to update sequence numbers for target ${e}: ${o}`)}n.vs=n.vs.remove(e),n.Fs.delete(s.target)}function $h(r,e,t){const n=j(r);let s=B.min(),i=G();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const g=j(u),I=g.Fs.get(f);return I!==void 0?v.resolve(g.vs.get(I)):g.li.getTargetData(h,f)})(n,o,$e(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>n.Cs.getDocumentsMatchingQuery(o,e,t?s:B.min(),t?i:G()))).next((c=>(rv(n,$T(e),c),{documents:c,ks:i})))))}function rv(r,e,t){let n=r.Ms.get(e)||B.min();t.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Ms.set(e,n)}class zh{constructor(){this.activeTargetIds=QT()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ag{constructor(){this.vo=new zh,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new zh,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh="ConnectivityMonitor";class Gh{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){C(Kh,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){C(Kh,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hi=null;function Ya(){return hi===null?hi=(function(){return 268435456+Math.round(2147483648*Math.random())})():hi++,"0x"+hi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da="RestConnection",iv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class ov{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===Bi?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(e,t,n,s,i){const o=Ya(),c=this.Qo(e,t.toUriEncodedString());C(da,`Sending RPC '${e}' ${o}:`,c,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:h}=new URL(c),f=yr(h);return this.zo(e,c,u,n,f).then((g=>(C(da,`Received RPC '${e}' ${o}: `,g),g)),(g=>{throw rr(da,`RPC '${e}' ${o} failed with error: `,g,"url: ",c,"request:",n),g}))}jo(e,t,n,s,i,o){return this.Wo(e,t,n,s,i)}Go(e,t,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Er})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const n=iv[e];let s=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae="WebChannelConnection",Kr=(r,e,t)=>{r.listen(e,(n=>{try{t(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class er extends ov{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!er.c_){const e=Cf();Kr(e,Pf.STAT_EVENT,(t=>{t.stat===Va.PROXY?C(Ae,"STAT_EVENT: detected buffering proxy"):t.stat===Va.NOPROXY&&C(Ae,"STAT_EVENT: detected no buffering proxy")})),er.c_=!0}}zo(e,t,n,s,i){const o=Ya();return new Promise(((c,u)=>{const h=new Sf;h.setWithCredentials(!0),h.listenOnce(bf.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case pi.NO_ERROR:const g=h.getResponseJson();C(Ae,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(g)),c(g);break;case pi.TIMEOUT:C(Ae,`RPC '${e}' ${o} timed out`),u(new k(P.DEADLINE_EXCEEDED,"Request time out"));break;case pi.HTTP_ERROR:const I=h.getStatus();if(C(Ae,`RPC '${e}' ${o} failed with status:`,I,"response text:",h.getResponseText()),I>0){let b=h.getResponseJson();Array.isArray(b)&&(b=b[0]);const V=b==null?void 0:b.error;if(V&&V.status&&V.message){const D=(function($){const L=$.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(L)>=0?L:P.UNKNOWN})(V.status);u(new k(D,V.message))}else u(new k(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new k(P.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{C(Ae,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);C(Ae,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)}))}T_(e,t,n){const s=Ya(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const h=i.join("");C(Ae,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=o.createWebChannel(h,c);this.E_(f);let g=!1,I=!1;const b=new av({Jo:V=>{I?C(Ae,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(g||(C(Ae,`Opening RPC '${e}' stream ${s} transport.`),f.open(),g=!0),C(Ae,`RPC '${e}' stream ${s} sending:`,V),f.send(V))},Ho:()=>f.close()});return Kr(f,Wr.EventType.OPEN,(()=>{I||(C(Ae,`RPC '${e}' stream ${s} transport opened.`),b.i_())})),Kr(f,Wr.EventType.CLOSE,(()=>{I||(I=!0,C(Ae,`RPC '${e}' stream ${s} transport closed`),b.o_(),this.I_(f))})),Kr(f,Wr.EventType.ERROR,(V=>{I||(I=!0,rr(Ae,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),b.o_(new k(P.UNAVAILABLE,"The operation could not be completed")))})),Kr(f,Wr.EventType.MESSAGE,(V=>{var D;if(!I){const x=V.data[0];F(!!x,16349);const $=x,L=($==null?void 0:$.error)||((D=$[0])==null?void 0:D.error);if(L){C(Ae,`RPC '${e}' stream ${s} received error:`,L);const U=L.status;let ne=(function(E){const p=fe[E];if(p!==void 0)return bm(p)})(U),J=L.message;U==="NOT_FOUND"&&J.includes("database")&&J.includes("does not exist")&&J.includes(this.databaseId.database)&&rr(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ne===void 0&&(ne=P.INTERNAL,J="Unknown error status: "+U+" with message "+L.message),I=!0,b.o_(new k(ne,J)),f.close()}else C(Ae,`RPC '${e}' stream ${s} received:`,x),b.__(x)}})),er.u_(),setTimeout((()=>{b.s_()}),0),b}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Vf()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cv(r){return new er(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uv(){return typeof window<"u"?window:null}function Si(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vo(r){return new hw(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */er.c_=!1;class cg{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&C("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh="PersistentStream";class ug{constructor(e,t,n,s,i,o,c,u){this.Ci=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new cg(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(De(t.toString()),De("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===t&&this.G_(n,s)}),(n=>{e((()=>{const s=new k(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{n((()=>this.listener.Zo()))})),this.stream.Yo((()=>{n((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return C(Hh,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(C(Hh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class lv extends ug{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=mw(this.serializer,e),n=(function(i){if(!("targetChange"in i))return B.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?Ne(o.readTime):B.min()})(e);return this.listener.H_(t,n)}Z_(e){const t={};t.database=Ka(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=qi(u)?{documents:Om(i,u)}:{query:Mm(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Vm(i,o.resumeToken);const h=$a(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(B.min())>0){c.readTime=pr(i,o.snapshotVersion.toTimestamp());const h=$a(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const n=pw(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){const t={};t.database=Ka(this.serializer),t.removeTarget=e,this.q_(t)}}class hv extends ug{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return F(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){F(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=gw(e.writeResults,e.commitTime),n=Ne(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Ka(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Ki(this.serializer,n)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{}class fv extends dv{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,za(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new k(P.UNKNOWN,i.toString())}))}jo(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,za(t,n),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(P.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function mv(r,e,t,n){return new fv(r,e,t,n)}class gv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(De(t),this.aa=!1):C("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn="RemoteStore";class pv{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((o=>{n.enqueueAndForget((async()=>{Mn(this)&&(C(Cn,"Restarting streams for network reachability change."),await(async function(u){const h=j(u);h.Ia.add(4),await Ms(h),h.Va.set("Unknown"),h.Ia.delete(4),await Os(h)})(this))}))})),this.Va=new gv(n,s)}}async function Os(r){if(Mn(r))for(const e of r.Ra)await e(!0)}async function Ms(r){for(const e of r.Ra)await e(!1)}function lg(r,e){const t=j(r);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),zc(t)?$c(t):vr(t).O_()&&jc(t,e))}function qc(r,e){const t=j(r),n=vr(t);t.Ea.delete(e),n.O_()&&hg(t,e),t.Ea.size===0&&(n.O_()?n.L_():Mn(t)&&t.Va.set("Unknown"))}function jc(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}vr(r).Z_(e)}function hg(r,e){r.da.$e(e),vr(r).X_(e)}function $c(r){r.da=new aw({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ea.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),vr(r).start(),r.Va.ua()}function zc(r){return Mn(r)&&!vr(r).x_()&&r.Ea.size>0}function Mn(r){return j(r).Ia.size===0}function dg(r){r.da=void 0}async function _v(r){r.Va.set("Online")}async function yv(r){r.Ea.forEach(((e,t)=>{jc(r,e)}))}async function Iv(r,e){dg(r),zc(r)?(r.Va.ha(e),$c(r)):r.Va.set("Unknown")}async function Ev(r,e,t){if(r.Va.set("Online"),e instanceof Cm&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))})(r,e)}catch(n){C(Cn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Ji(r,n)}else if(e instanceof Ai?r.da.Xe(e):e instanceof Pm?r.da.st(e):r.da.tt(e),!t.isEqual(B.min()))try{const n=await og(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ea.get(u);if(!f)return;i.Ea.set(u,f.withResumeToken(ge.EMPTY_BYTE_STRING,f.snapshotVersion)),hg(i,u);const g=new dt(f.target,u,h,f.sequenceNumber);jc(i,g)})),i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){C(Cn,"Failed to raise snapshot:",n),await Ji(r,n)}}async function Ji(r,e,t){if(!Yt(e))throw e;r.Ia.add(1),await Ms(r),r.Va.set("Offline"),t||(t=()=>og(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{C(Cn,"Retrying IndexedDB access"),await t(),r.Ia.delete(1),await Os(r)}))}function fg(r,e){return e().catch((t=>Ji(r,t,e)))}async function Ls(r){const e=j(r),t=Ht(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:yn;for(;Tv(e);)try{const s=await tv(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,wv(e,s)}catch(s){await Ji(e,s)}mg(e)&&gg(e)}function Tv(r){return Mn(r)&&r.Ta.length<10}function wv(r,e){r.Ta.push(e);const t=Ht(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function mg(r){return Mn(r)&&!Ht(r).x_()&&r.Ta.length>0}function gg(r){Ht(r).start()}async function vv(r){Ht(r).ra()}async function Av(r){const e=Ht(r);for(const t of r.Ta)e.ea(t.mutations)}async function Rv(r,e,t){const n=r.Ta.shift(),s=Vc.from(n,e,t);await fg(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await Ls(r)}async function Sv(r,e){e&&Ht(r).Y_&&await(async function(n,s){if((function(o){return sw(o)&&o!==P.ABORTED})(s.code)){const i=n.Ta.shift();Ht(n).B_(),await fg(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Ls(n)}})(r,e),mg(r)&&gg(r)}async function Wh(r,e){const t=j(r);t.asyncQueue.verifyOperationInProgress(),C(Cn,"RemoteStore received new credentials");const n=Mn(t);t.Ia.add(3),await Ms(t),n&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Os(t)}async function bv(r,e){const t=j(r);e?(t.Ia.delete(2),await Os(t)):e||(t.Ia.add(2),await Ms(t),t.Va.set("Unknown"))}function vr(r){return r.ma||(r.ma=(function(t,n,s){const i=j(t);return i.sa(),new lv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:_v.bind(null,r),Yo:yv.bind(null,r),t_:Iv.bind(null,r),H_:Ev.bind(null,r)}),r.Ra.push((async e=>{e?(r.ma.B_(),zc(r)?$c(r):r.Va.set("Unknown")):(await r.ma.stop(),dg(r))}))),r.ma}function Ht(r){return r.fa||(r.fa=(function(t,n,s){const i=j(t);return i.sa(),new hv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:vv.bind(null,r),t_:Sv.bind(null,r),ta:Av.bind(null,r),na:Rv.bind(null,r)}),r.Ra.push((async e=>{e?(r.fa.B_(),await Ls(r)):(await r.fa.stop(),r.Ta.length>0&&(C(Cn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new ot,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new Kc(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Gc(r,e){if(De("AsyncQueue",`${e}: ${r}`),Yt(r))return new k(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{static emptySet(e){return new tr(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||O.comparator(t.key,n.key):(t,n)=>O.comparator(t.key,n.key),this.keyedMap=Qr(),this.sortedSet=new ae(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof tr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new tr;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(){this.ga=new ae(O.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):M(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}}class _r{constructor(e,t,n,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new _r(e,t,tr.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&po(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Cv{constructor(){this.queries=Jh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=j(t),i=s.queries;s.queries=Jh(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(n)}))})(this,new k(P.ABORTED,"Firestore shutting down"))}}function Jh(){return new yt((r=>fm(r)),po)}async function pg(r,e){const t=j(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new Pv,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Gc(o,`Initialization of query '${Hn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Hc(t)}async function _g(r,e){const t=j(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function Vv(r,e){const t=j(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(n=!0);o.wa=s}}n&&Hc(t)}function kv(r,e,t){const n=j(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function Hc(r){r.Ca.forEach((e=>{e.next()}))}var Xa,Yh;(Yh=Xa||(Xa={})).Ma="default",Yh.Cache="cache";class yg{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new _r(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=_r.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Xa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(e){this.key=e}}class Eg{constructor(e){this.key=e}}class Dv{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=G(),this.mutatedKeys=G(),this.eu=mm(e),this.tu=new tr(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new Qh,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,g)=>{const I=s.get(f),b=Ds(this.query,g)?g:null,V=!!I&&this.mutatedKeys.has(I.key),D=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let x=!1;I&&b?I.data.isEqual(b.data)?V!==D&&(n.track({type:3,doc:b}),x=!0):this.su(I,b)||(n.track({type:2,doc:b}),x=!0,(u&&this.eu(b,u)>0||h&&this.eu(b,h)<0)&&(c=!0)):!I&&b?(n.track({type:0,doc:b}),x=!0):I&&!b&&(n.track({type:1,doc:I}),x=!0,(u||h)&&(c=!0)),x&&(b?(o=o.add(b),i=D?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,g)=>(function(b,V){const D=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:x})}};return D(b)-D(V)})(f.type,g.type)||this.eu(f.doc,g.doc))),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,h=u!==this.Xa;return this.Xa=u,o.length!==0||h?{snapshot:new _r(this.query,e.tu,i,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Qh,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=G(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))}));const t=[];return e.forEach((n=>{this.Ya.has(n)||t.push(new Eg(n))})),this.Ya.forEach((n=>{e.has(n)||t.push(new Ig(n))})),t}cu(e){this.Za=e.ks,this.Ya=G();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return _r.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Wc="SyncEngine";class Nv{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class xv{constructor(e){this.key=e,this.hu=!1}}class Ov{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new yt((c=>fm(c)),po),this.Eu=new Map,this.Iu=new Set,this.Ru=new ae(O.comparator),this.Au=new Map,this.Vu=new Mc,this.du={},this.mu=new Map,this.fu=Pn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Mv(r,e,t=!0){const n=Sg(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Tg(n,e,t,!0),s}async function Lv(r,e){const t=Sg(r);await Tg(t,e,!0,!1)}async function Tg(r,e,t,n){const s=await nv(r.localStore,$e(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await Fv(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&lg(r.remoteStore,s),c}async function Fv(r,e,t,n,s){r.pu=(g,I,b)=>(async function(D,x,$,L){let U=x.view.ru($);U.bs&&(U=await $h(D.localStore,x.query,!1).then((({documents:E})=>x.view.ru(E,U))));const ne=L&&L.targetChanges.get(x.targetId),J=L&&L.targetMismatches.get(x.targetId)!=null,Y=x.view.applyChanges(U,D.isPrimaryClient,ne,J);return Zh(D,x.targetId,Y.au),Y.snapshot})(r,g,I,b);const i=await $h(r.localStore,e,!0),o=new Dv(e,i.ks),c=o.ru(i.documents),u=xs.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(c,r.isPrimaryClient,u);Zh(r,t,h.au);const f=new Nv(e,t,o);return r.Tu.set(e,f),r.Eu.has(t)?r.Eu.get(t).push(e):r.Eu.set(t,[e]),h.snapshot}async function Uv(r,e,t){const n=j(r),s=n.Tu.get(e),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter((o=>!po(o,e)))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Ja(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&qc(n.remoteStore,s.targetId),Za(n,s.targetId)})).catch(On)):(Za(n,s.targetId),await Ja(n.localStore,s.targetId,!0))}async function Bv(r,e){const t=j(r),n=t.Tu.get(e),s=t.Eu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),qc(t.remoteStore,n.targetId))}async function qv(r,e,t){const n=bg(r);try{const s=await(function(o,c){const u=j(o),h=Z.now(),f=c.reduce(((b,V)=>b.add(V.key)),G());let g,I;return u.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let V=Ue(),D=G();return u.xs.getEntries(b,f).next((x=>{V=x,V.forEach((($,L)=>{L.isValidDocument()||(D=D.add($))}))})).next((()=>u.localDocuments.getOverlayedDocuments(b,V))).next((x=>{g=x;const $=[];for(const L of c){const U=nw(L,g.get(L.key).overlayedDocument);U!=null&&$.push(new It(L.key,U,sm(U.value.mapValue),_e.exists(!0)))}return u.mutationQueue.addMutationBatch(b,h,$,c)})).next((x=>{I=x;const $=x.applyToLocalDocumentSet(g,D);return u.documentOverlayCache.saveOverlays(b,x.batchId,$)}))})).then((()=>({batchId:I.batchId,changes:pm(g)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.du[o.currentUser.toKey()];h||(h=new ae(z)),h=h.insert(c,u),o.du[o.currentUser.toKey()]=h})(n,s.batchId,t),await Fs(n,s.changes),await Ls(n.remoteStore)}catch(s){const i=Gc(s,"Failed to persist write");t.reject(i)}}async function wg(r,e){const t=j(r);try{const n=await Zw(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(F(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?F(o.hu,14607):s.removedDocuments.size>0&&(F(o.hu,42227),o.hu=!1))})),await Fs(t,n,e)}catch(n){await On(n)}}function Xh(r,e,t){const n=j(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=j(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,g)=>{for(const I of g.Sa)I.va(c)&&(h=!0)})),h&&Hc(u)})(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function jv(r,e,t){const n=j(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new ae(O.comparator);o=o.insert(i,le.newNoDocument(i,B.min()));const c=G().add(i),u=new Io(B.min(),new Map,new ae(z),o,c);await wg(n,u),n.Ru=n.Ru.remove(i),n.Au.delete(e),Qc(n)}else await Ja(n.localStore,e,!1).then((()=>Za(n,e,t))).catch(On)}async function $v(r,e){const t=j(r),n=e.batch.batchId;try{const s=await Xw(t.localStore,e);Ag(t,n,null),vg(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Fs(t,s)}catch(s){await On(s)}}async function zv(r,e,t){const n=j(r);try{const s=await(function(o,c){const u=j(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((g=>(F(g!==null,37113),f=g.keys(),u.mutationQueue.removeMutationBatch(h,g)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);Ag(n,e,t),vg(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Fs(n,s)}catch(s){await On(s)}}function vg(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function Ag(r,e,t){const n=j(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.du[n.currentUser.toKey()]=s}}function Za(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Eu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Eu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach((n=>{r.Vu.containsKey(n)||Rg(r,n)}))}function Rg(r,e){r.Iu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(qc(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),Qc(r))}function Zh(r,e,t){for(const n of t)n instanceof Ig?(r.Vu.addReference(n.key,e),Kv(r,n)):n instanceof Eg?(C(Wc,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,e),r.Vu.containsKey(n.key)||Rg(r,n.key)):M(19791,{wu:n})}function Kv(r,e){const t=e.key,n=t.path.canonicalString();r.Ru.get(t)||r.Iu.has(n)||(C(Wc,"New document in limbo: "+t),r.Iu.add(n),Qc(r))}function Qc(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Iu.values().next().value;r.Iu.delete(e);const t=new O(X.fromString(e)),n=r.fu.next();r.Au.set(n,new xv(t)),r.Ru=r.Ru.insert(t,n),lg(r.remoteStore,new dt($e(go(t.path)),n,"TargetPurposeLimboResolution",je.ce))}}async function Fs(r,e,t){const n=j(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,u)=>{o.push(n.pu(u,e,t).then((h=>{var f;if((h||t)&&n.isPrimaryClient){const g=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,g?"current":"not-current")}if(h){s.push(h);const g=Uc.Is(u.targetId,h);i.push(g)}})))})),await Promise.all(o),n.Pu.H_(s),await(async function(u,h){const f=j(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(g=>v.forEach(h,(I=>v.forEach(I.Ts,(b=>f.persistence.referenceDelegate.addReference(g,I.targetId,b))).next((()=>v.forEach(I.Es,(b=>f.persistence.referenceDelegate.removeReference(g,I.targetId,b)))))))))}catch(g){if(!Yt(g))throw g;C(Bc,"Failed to update sequence numbers: "+g)}for(const g of h){const I=g.targetId;if(!g.fromCache){const b=f.vs.get(I),V=b.snapshotVersion,D=b.withLastLimboFreeSnapshotVersion(V);f.vs=f.vs.insert(I,D)}}})(n.localStore,i))}async function Gv(r,e){const t=j(r);if(!t.currentUser.isEqual(e)){C(Wc,"User change. New user:",e.toKey());const n=await ig(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new k(P.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Fs(t,n.Ns)}}function Hv(r,e){const t=j(r),n=t.Au.get(e);if(n&&n.hu)return G().add(n.key);{let s=G();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function Sg(r){const e=j(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=wg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Hv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=jv.bind(null,e),e.Pu.H_=Vv.bind(null,e.eventManager),e.Pu.yu=kv.bind(null,e.eventManager),e}function bg(r){const e=j(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=$v.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=zv.bind(null,e),e}class vs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=vo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return sg(this.persistence,new rg,e.initialUser,this.serializer)}Cu(e){return new Lc(wo.Vi,this.serializer)}Du(e){return new ag}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}vs.provider={build:()=>new vs};class Wv extends vs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){F(this.persistence.referenceDelegate instanceof Qi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Xm(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Re.withCacheSize(this.cacheSizeBytes):Re.DEFAULT;return new Lc((n=>Qi.Vi(n,t)),this.serializer)}}class Qv extends vs{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await bg(this.xu.syncEngine),await Ls(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return sg(this.persistence,new rg,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Xm(n,e.asyncQueue,t)}Mu(e,t){const n=new XE(t,this.persistence);return new YE(e.asyncQueue,n)}Cu(e){const t=Ww(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Re.withCacheSize(this.cacheSizeBytes):Re.DEFAULT;return new Fc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,uv(),Si(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new ag}}class Yi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Xh(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Gv.bind(null,this.syncEngine),await bv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Cv})()}createDatastore(e){const t=vo(e.databaseInfo.databaseId),n=cv(e.databaseInfo);return mv(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,c){return new pv(n,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Xh(this.syncEngine,t,0)),(function(){return Gh.v()?new Gh:new sv})())}createSyncEngine(e,t){return(function(s,i,o,c,u,h,f){const g=new Ov(s,i,o,c,u,h);return f&&(g.gu=!0),g})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=j(s);C(Cn,"RemoteStore shutting down."),i.Ia.add(5),await Ms(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Yi.provider={build:()=>new Yi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):De("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt="FirestoreClient";class Jv{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=ke.UNAUTHENTICATED,this.clientId=_c.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{C(Wt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(C(Wt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ot;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Gc(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function fa(r,e){r.asyncQueue.verifyOperationInProgress(),C(Wt,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await ig(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function ed(r,e){r.asyncQueue.verifyOperationInProgress();const t=await Cg(r);C(Wt,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>Wh(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>Wh(e.remoteStore,s))),r._onlineComponents=e}async function Cg(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C(Wt,"Using user provided OfflineComponentProvider");try{await fa(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;rr("Error using user provided cache. Falling back to memory cache: "+t),await fa(r,new vs)}}else C(Wt,"Using default OfflineComponentProvider"),await fa(r,new Wv(void 0));return r._offlineComponents}async function Jc(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C(Wt,"Using user provided OnlineComponentProvider"),await ed(r,r._uninitializedComponentsProvider._online)):(C(Wt,"Using default OnlineComponentProvider"),await ed(r,new Yi))),r._onlineComponents}function Yv(r){return Cg(r).then((e=>e.persistence))}function Xv(r){return Jc(r).then((e=>e.remoteStore))}function Zv(r){return Jc(r).then((e=>e.syncEngine))}async function Vg(r){const e=await Jc(r),t=e.eventManager;return t.onListen=Mv.bind(null,e.syncEngine),t.onUnlisten=Uv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Lv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Bv.bind(null,e.syncEngine),t}function eA(r){return r.asyncQueue.enqueue((async()=>{const e=await Yv(r),t=await Xv(r);return e.setNetworkEnabled(!0),(function(s){const i=j(s);return i.Ia.delete(0),Os(i)})(t)}))}function tA(r,e,t={}){const n=new ot;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Pg({next:I=>{f.Nu(),o.enqueueAndForget((()=>_g(i,g)));const b=I.docs.has(c);!b&&I.fromCache?h.reject(new k(P.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&I.fromCache&&u&&u.source==="server"?h.reject(new k(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),g=new yg(go(c.path),f,{includeMetadataChanges:!0,qa:!0});return pg(i,g)})(await Vg(r),r.asyncQueue,e,t,n))),n.promise}function nA(r,e,t={}){const n=new ot;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Pg({next:I=>{f.Nu(),o.enqueueAndForget((()=>_g(i,g))),I.fromCache&&u.source==="server"?h.reject(new k(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(I)},error:I=>h.reject(I)}),g=new yg(c,f,{includeMetadataChanges:!0,qa:!0});return pg(i,g)})(await Vg(r),r.asyncQueue,e,t,n))),n.promise}function rA(r,e){const t=new ot;return r.asyncQueue.enqueueAndForget((async()=>qv(await Zv(r),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kg(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sA="ComponentProvider",td=new Map;function iA(r,e,t,n,s){return new bT(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,kg(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oA="firestore.googleapis.com",nd=!0;class rd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new k(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=oA,this.ssl=nd}else this.host=e.host,this.ssl=e.ssl??nd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Hm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ym)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}GE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=kg(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Yc{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new rd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new rd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new LE;switch(n.type){case"firstParty":return new BE(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=td.get(t);n&&(C(sA,"Removing Datastore"),td.delete(t),n.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Zt(this.firestore,e,this._query)}}class de{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new jt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new de(this.firestore,e,this._key)}toJSON(){return{type:de._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Cs(t,de._jsonSchema))return new de(e,n||null,new O(X.fromString(t.referencePath)))}}de._jsonSchemaVersion="firestore/documentReference/1.0",de._jsonSchema={type:me("string",de._jsonSchemaVersion),referencePath:me("string")};class jt extends Zt{constructor(e,t,n){super(e,t,go(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new de(this.firestore,null,new O(e))}withConverter(e){return new jt(this.firestore,e,this._path)}}function tS(r,e,...t){if(r=re(r),Nf("collection","path",e),r instanceof Yc){const n=X.fromString(e,...t);return Hl(n),new jt(r,null,n)}{if(!(r instanceof de||r instanceof jt))throw new k(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return Hl(n),new jt(r.firestore,null,n)}}function aA(r,e,...t){if(r=re(r),arguments.length===1&&(e=_c.newId()),Nf("doc","path",e),r instanceof Yc){const n=X.fromString(e,...t);return Gl(n),new de(r,null,new O(n))}{if(!(r instanceof de||r instanceof jt))throw new k(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return Gl(n),new de(r.firestore,r instanceof jt?r.converter:null,new O(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd="AsyncQueue";class id{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new cg(this,"async_queue_retry"),this._c=()=>{const n=Si();n&&C(sd,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=Si();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Si();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new ot;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Yt(e))throw e;C(sd,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,De("INTERNAL UNHANDLED ERROR: ",od(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Kc.createAndSchedule(this,e,t,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:od(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function od(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class Et extends Yc{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new id,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new id(e),this._firestoreClient=void 0,await e}}}function nS(r,e,t){t||(t=Bi);const n=xn(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if($t(i,e))return s;throw new k(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new k(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ym)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&yr(e.host)&&rc(e.host),n.initialize({options:e,instanceIdentifier:t})}function Us(r){if(r._terminated)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||cA(r),r._firestoreClient}function cA(r){var n,s,i,o;const e=r._freezeSettings(),t=iA(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new Jv(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}})(r._componentsProvider))}function rS(r){return eA(Us(r=Ke(r,Et)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new qe(ge.fromBase64String(e))}catch(t){throw new k(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new qe(ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:qe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Cs(e,qe._jsonSchema))return qe.fromBase64String(e.bytes)}}qe._jsonSchemaVersion="firestore/bytes/1.0",qe._jsonSchema={type:me("string",qe._jsonSchemaVersion),bytes:me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ce(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:at._jsonSchemaVersion}}static fromJSON(e){if(Cs(e,at._jsonSchema))return new at(e.latitude,e.longitude)}}at._jsonSchemaVersion="firestore/geoPoint/1.0",at._jsonSchema={type:me("string",at._jsonSchemaVersion),latitude:me("number"),longitude:me("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Ye._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Cs(e,Ye._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Ye(e.vectorValues);throw new k(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ye._jsonSchemaVersion="firestore/vectorValue/1.0",Ye._jsonSchema={type:me("string",Ye._jsonSchemaVersion),vectorValues:me("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uA=/^__.*__$/;class lA{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new It(e,this.data,this.fieldMask,t,this.fieldTransforms):new wr(e,this.data,t,this.fieldTransforms)}}class Dg{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new It(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Ng(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:r})}}class Xc{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Xc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(e),n}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.i({path:t,arrayElement:!1});return n.Ac(),n}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Xi(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Ng(this.dataSource)&&uA.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class hA{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||vo(e)}I(e,t,n,s=!1){return new Xc({dataSource:e,methodName:t,targetDoc:n,path:ce.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Bs(r){const e=r._freezeSettings(),t=vo(r._databaseId);return new hA(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Zc(r,e,t,n,s,i={}){const o=r.I(i.merge||i.mergeFields?2:0,e,t,s);tu("Data must be an object, but it was:",o,n);const c=Mg(n,o);let u,h;if(i.merge)u=new Oe(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const I=Vn(e,g,t);if(!o.contains(I))throw new k(P.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);Ug(f,I)||f.push(I)}u=new Oe(f),h=o.fieldTransforms.filter((g=>u.covers(g.field)))}else u=null,h=o.fieldTransforms;return new lA(new be(c),u,h)}class So extends Ro{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof So}}class eu extends Ro{_toFieldTransform(e){return new vm(e.path,new fr)}isEqual(e){return e instanceof eu}}function xg(r,e,t,n){const s=r.I(1,e,t);tu("Data must be an object, but it was:",s,n);const i=[],o=be.empty();Xt(n,((u,h)=>{const f=Fg(e,u,t);h=re(h);const g=s.fc(f);if(h instanceof So)i.push(f);else{const I=qs(h,g);I!=null&&(i.push(f),o.set(f,I))}}));const c=new Oe(i);return new Dg(o,c,s.fieldTransforms)}function Og(r,e,t,n,s,i){const o=r.I(1,e,t),c=[Vn(e,n,t)],u=[s];if(i.length%2!=0)throw new k(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<i.length;I+=2)c.push(Vn(e,i[I])),u.push(i[I+1]);const h=[],f=be.empty();for(let I=c.length-1;I>=0;--I)if(!Ug(h,c[I])){const b=c[I];let V=u[I];V=re(V);const D=o.fc(b);if(V instanceof So)h.push(b);else{const x=qs(V,D);x!=null&&(h.push(b),f.set(b,x))}}const g=new Oe(h);return new Dg(f,g,o.fieldTransforms)}function dA(r,e,t,n=!1){return qs(t,r.I(n?4:3,e))}function qs(r,e){if(Lg(r=re(r)))return tu("Unsupported field value:",e,r),Mg(r,e);if(r instanceof Ro)return(function(n,s){if(!Ng(s.dataSource))throw s.yc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(n,s){const i=[];let o=0;for(const c of n){let u=qs(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(r,e)}return(function(n,s){if((n=re(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return JT(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Z.fromDate(n);return{timestampValue:pr(s.serializer,i)}}if(n instanceof Z){const i=new Z(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:pr(s.serializer,i)}}if(n instanceof at)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof qe)return{bytesValue:Vm(s.serializer,n._byteString)};if(n instanceof de){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Nc(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Ye)return(function(o,c){const u=o instanceof Ye?o.toArray():o;return{mapValue:{fields:{[Rc]:{stringValue:Sc},[ur]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return Pc(c.serializer,f)}))}}}}}})(n,s);if(qm(n))return n._toProto(s.serializer);throw s.yc(`Unsupported field value: ${oo(n)}`)})(r,e)}function Mg(r,e){const t={};return Qf(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Xt(r,((n,s)=>{const i=qs(s,e.dc(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function Lg(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Z||r instanceof at||r instanceof qe||r instanceof de||r instanceof Ro||r instanceof Ye||qm(r))}function tu(r,e,t){if(!Lg(t)||!xf(t)){const n=oo(t);throw n==="an object"?e.yc(r+" a custom object"):e.yc(r+" "+n)}}function Vn(r,e,t){if((e=re(e))instanceof Ao)return e._internalPath;if(typeof e=="string")return Fg(r,e);throw Xi("Field path arguments must be of type string or ",r,!1,void 0,t)}const fA=new RegExp("[~\\*/\\[\\]]");function Fg(r,e,t){if(e.search(fA)>=0)throw Xi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Ao(...e.split("."))._internalPath}catch{throw Xi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Xi(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new k(P.INVALID_ARGUMENT,c+r+u)}function Ug(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{convertValue(e,t="none"){switch(Kt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(_t(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Xt(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[ur].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>oe(o.doubleValue)));return new Ye(t)}convertGeoPoint(e){return new at(oe(e.latitude),oe(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=fo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(_s(e));default:return null}}convertTimestamp(e){const t=pt(e);return new Z(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);F(Bm(n),9688,{name:e});const s=new An(n.get(1),n.get(3)),i=new O(n.popFirst(5));return s.isEqual(t)||De(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg extends mA{constructor(e){super(),this.firestore=e}convertBytes(e){return new qe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new de(this.firestore,null,t)}}function sS(){return new eu("serverTimestamp")}const ad="@firebase/firestore",cd="4.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new de(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new gA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Vn("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class gA extends qg{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pA(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class nu{}class ru extends nu{}function iS(r,e,...t){let n=[];e instanceof nu&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((u=>u instanceof su)).length,c=i.filter((u=>u instanceof bo)).length;if(o>1||o>0&&c>0)throw new k(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class bo extends ru{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new bo(e,t,n)}_apply(e){const t=this._parse(e);return jg(e._query,t),new Zt(e.firestore,e.converter,ja(e._query,t))}_parse(e){const t=Bs(e.firestore);return(function(i,o,c,u,h,f,g){let I;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new k(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){ld(g,f);const V=[];for(const D of g)V.push(ud(u,i,D));I={arrayValue:{values:V}}}else I=ud(u,i,g)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||ld(g,f),I=dA(c,o,g,f==="in"||f==="not-in");return W.create(h,f,I)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function oS(r,e,t){const n=e,s=Vn("where",r);return bo._create(s,n,t)}class su extends nu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new su(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)jg(o,u),o=ja(o,u)})(e._query,t),new Zt(e.firestore,e.converter,ja(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class iu extends ru{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new iu(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new k(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new k(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ts(i,o)})(e._query,this._field,this._direction);return new Zt(e.firestore,e.converter,jT(e._query,t))}}function aS(r,e="asc"){const t=e,n=Vn("orderBy",r);return iu._create(n,t)}class ou extends ru{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new ou(e,t,n)}_apply(e){return new Zt(e.firestore,e.converter,$i(e._query,this._limit,this._limitType))}}function cS(r){return HE("limit",r),ou._create("limit",r,"F")}function ud(r,e,t){if(typeof(t=re(t))=="string"){if(t==="")throw new k(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!dm(e)&&t.indexOf("/")!==-1)throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(X.fromString(t));if(!O.isDocumentKey(n))throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Is(r,new O(n))}if(t instanceof de)return Is(r,t._key);throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${oo(t)}.`)}function ld(r,e){if(!Array.isArray(r)||r.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function jg(r,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new k(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function au(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class _A{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=IA(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function uS(r){return new _A(r)}class yA{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Yi.provider,this._offlineComponentProvider={build:t=>new Qv(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}function IA(r){return new yA(r==null?void 0:r.forceOwnership)}class Xr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Tn extends qg{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new bi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Vn("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Tn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Tn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Tn._jsonSchema={type:me("string",Tn._jsonSchemaVersion),bundleSource:me("string","DocumentSnapshot"),bundleName:me("string"),bundle:me("string")};class bi extends Tn{data(e={}){return super.data(e)}}class nr{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Xr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new bi(this._firestore,this._userDataWriter,n.key,n,new Xr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new bi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Xr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new bi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Xr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:EA(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=nr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=_c.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function EA(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nr._jsonSchemaVersion="firestore/querySnapshot/1.0",nr._jsonSchema={type:me("string",nr._jsonSchemaVersion),bundleSource:me("string","QuerySnapshot"),bundleName:me("string"),bundle:me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Bs(e)}set(e,t,n){this._verifyNotCommitted();const s=ma(e,this._firestore),i=au(s.converter,t,n),o=Zc(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,_e.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=ma(e,this._firestore);let o;return o=typeof(t=re(t))=="string"||t instanceof Ao?Og(this._dataReader,"WriteBatch.update",i._key,t,n,s):xg(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,_e.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ma(e,this._firestore);return this._mutations=this._mutations.concat(new Ns(t._key,_e.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new k(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ma(r,e){if((r=re(r)).firestore!==e)throw new k(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lS(r){r=Ke(r,de);const e=Ke(r.firestore,Et),t=Us(e);return tA(t,r._key).then((n=>wA(e,r,n)))}function hS(r){r=Ke(r,Zt);const e=Ke(r.firestore,Et),t=Us(e),n=new Bg(e);return pA(r._query),nA(t,r._query).then((s=>new nr(e,n,r,s)))}function dS(r,e,t){r=Ke(r,de);const n=Ke(r.firestore,Et),s=au(r.converter,e,t),i=Bs(n);return js(n,[Zc(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,_e.none())])}function fS(r,e,t,...n){r=Ke(r,de);const s=Ke(r.firestore,Et),i=Bs(s);let o;return o=typeof(e=re(e))=="string"||e instanceof Ao?Og(i,"updateDoc",r._key,e,t,n):xg(i,"updateDoc",r._key,e),js(s,[o.toMutation(r._key,_e.exists(!0))])}function mS(r){return js(Ke(r.firestore,Et),[new Ns(r._key,_e.none())])}function gS(r,e){const t=Ke(r.firestore,Et),n=aA(r),s=au(r.converter,e),i=Bs(r.firestore);return js(t,[Zc(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,_e.exists(!1))]).then((()=>n))}function js(r,e){const t=Us(r);return rA(t,e)}function wA(r,e,t){const n=t.docs.get(e._key),s=new Bg(r);return new Tn(r,s,e._key,n,new Xr(t.hasPendingWrites,t.fromCache),e.converter)}function pS(r){return r=Ke(r,Et),Us(r),new TA(r,(e=>js(r,e)))}(function(e,t=!0){OE(zt),ct(new Xe("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new Et(new FE(n.getProvider("auth-internal")),new qE(o,n.getProvider("app-check-internal")),PT(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Me(ad,cd,e),Me(ad,cd,"esm2020")})();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e,t,n,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Se(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||n.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s==null||s.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),n=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:n,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="us-central1";class AA{constructor(e,t,n,s,i=ec,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new vA(e,t,n,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=ec}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function RA(r,e,t){const n=yr(e);r.emulatorOrigin=`http${n?"s":""}://${e}:${t}`,n&&rc(r.emulatorOrigin+"/backends")}const hd="@firebase/functions",dd="0.13.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SA="auth-internal",bA="app-check-internal",PA="messaging-internal";function CA(r){const e=(t,{instanceIdentifier:n})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(SA),o=t.getProvider(PA),c=t.getProvider(bA);return new AA(s,i,o,c,n)};ct(new Xe($g,e,"PUBLIC").setMultipleInstances(!0)),Me(hd,dd,r),Me(hd,dd,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _S(r=ic(),e=ec){const n=xn(re(r),$g).getImmediate({identifier:e}),s=Zp("functions");return s&&VA(n,...s),n}function VA(r,e,t){RA(re(r),e,t)}CA();const zg="@firebase/installations",cu="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=1e4,Gg=`w:${cu}`,Hg="FIS_v2",kA="https://firebaseinstallations.googleapis.com/v1",DA=3600*1e3,NA="installations",xA="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OA={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},kn=new Nn(NA,xA,OA);function Wg(r){return r instanceof Ge&&r.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg({projectId:r}){return`${kA}/projects/${r}/installations`}function Jg(r){return{token:r.token,requestStatus:2,expiresIn:LA(r.expiresIn),creationTime:Date.now()}}async function Yg(r,e){const n=(await e.json()).error;return kn.create("request-failed",{requestName:r,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Xg({apiKey:r}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r})}function MA(r,{refreshToken:e}){const t=Xg(r);return t.append("Authorization",FA(e)),t}async function Zg(r){const e=await r();return e.status>=500&&e.status<600?r():e}function LA(r){return Number(r.replace("s","000"))}function FA(r){return`${Hg} ${r}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UA({appConfig:r,heartbeatServiceProvider:e},{fid:t}){const n=Qg(r),s=Xg(r),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={fid:t,authVersion:Hg,appId:r.appId,sdkVersion:Gg},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await Zg(()=>fetch(n,c));if(u.ok){const h=await u.json();return{fid:h.fid||t,registrationStatus:2,refreshToken:h.refreshToken,authToken:Jg(h.authToken)}}else throw await Yg("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ep(r){return new Promise(e=>{setTimeout(e,r)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BA(r){return btoa(String.fromCharCode(...r)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qA=/^[cdef][\w-]{21}$/,tc="";function jA(){try{const r=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(r),r[0]=112+r[0]%16;const t=$A(r);return qA.test(t)?t:tc}catch{return tc}}function $A(r){return BA(r).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(r){return`${r.appName}!${r.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tp=new Map;function np(r,e){const t=Po(r);rp(t,e),zA(t,e)}function rp(r,e){const t=tp.get(r);if(t)for(const n of t)n(e)}function zA(r,e){const t=KA();t&&t.postMessage({key:r,fid:e}),GA()}let _n=null;function KA(){return!_n&&"BroadcastChannel"in self&&(_n=new BroadcastChannel("[Firebase] FID Change"),_n.onmessage=r=>{rp(r.data.key,r.data.fid)}),_n}function GA(){tp.size===0&&_n&&(_n.close(),_n=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HA="firebase-installations-database",WA=1,Dn="firebase-installations-store";let ga=null;function uu(){return ga||(ga=Fd(HA,WA,{upgrade:(r,e)=>{switch(e){case 0:r.createObjectStore(Dn)}}})),ga}async function Zi(r,e){const t=Po(r),s=(await uu()).transaction(Dn,"readwrite"),i=s.objectStore(Dn),o=await i.get(t);return await i.put(e,t),await s.done,(!o||o.fid!==e.fid)&&np(r,e.fid),e}async function sp(r){const e=Po(r),n=(await uu()).transaction(Dn,"readwrite");await n.objectStore(Dn).delete(e),await n.done}async function Co(r,e){const t=Po(r),s=(await uu()).transaction(Dn,"readwrite"),i=s.objectStore(Dn),o=await i.get(t),c=e(o);return c===void 0?await i.delete(t):await i.put(c,t),await s.done,c&&(!o||o.fid!==c.fid)&&np(r,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lu(r){let e;const t=await Co(r.appConfig,n=>{const s=QA(n),i=JA(r,s);return e=i.registrationPromise,i.installationEntry});return t.fid===tc?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function QA(r){const e=r||{fid:jA(),registrationStatus:0};return ip(e)}function JA(r,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(kn.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},n=YA(r,t);return{installationEntry:t,registrationPromise:n}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:XA(r)}:{installationEntry:e}}async function YA(r,e){try{const t=await UA(r,e);return Zi(r.appConfig,t)}catch(t){throw Wg(t)&&t.customData.serverCode===409?await sp(r.appConfig):await Zi(r.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function XA(r){let e=await fd(r.appConfig);for(;e.registrationStatus===1;)await ep(100),e=await fd(r.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:n}=await lu(r);return n||t}return e}function fd(r){return Co(r,e=>{if(!e)throw kn.create("installation-not-found");return ip(e)})}function ip(r){return ZA(r)?{fid:r.fid,registrationStatus:0}:r}function ZA(r){return r.registrationStatus===1&&r.registrationTime+Kg<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eR({appConfig:r,heartbeatServiceProvider:e},t){const n=tR(r,t),s=MA(r,t),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={installation:{sdkVersion:Gg,appId:r.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await Zg(()=>fetch(n,c));if(u.ok){const h=await u.json();return Jg(h)}else throw await Yg("Generate Auth Token",u)}function tR(r,{fid:e}){return`${Qg(r)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hu(r,e=!1){let t;const n=await Co(r.appConfig,i=>{if(!op(i))throw kn.create("not-registered");const o=i.authToken;if(!e&&sR(o))return i;if(o.requestStatus===1)return t=nR(r,e),i;{if(!navigator.onLine)throw kn.create("app-offline");const c=oR(i);return t=rR(r,c),c}});return t?await t:n.authToken}async function nR(r,e){let t=await md(r.appConfig);for(;t.authToken.requestStatus===1;)await ep(100),t=await md(r.appConfig);const n=t.authToken;return n.requestStatus===0?hu(r,e):n}function md(r){return Co(r,e=>{if(!op(e))throw kn.create("not-registered");const t=e.authToken;return aR(t)?{...e,authToken:{requestStatus:0}}:e})}async function rR(r,e){try{const t=await eR(r,e),n={...e,authToken:t};return await Zi(r.appConfig,n),t}catch(t){if(Wg(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await sp(r.appConfig);else{const n={...e,authToken:{requestStatus:0}};await Zi(r.appConfig,n)}throw t}}function op(r){return r!==void 0&&r.registrationStatus===2}function sR(r){return r.requestStatus===2&&!iR(r)}function iR(r){const e=Date.now();return e<r.creationTime||r.creationTime+r.expiresIn<e+DA}function oR(r){const e={requestStatus:1,requestTime:Date.now()};return{...r,authToken:e}}function aR(r){return r.requestStatus===1&&r.requestTime+Kg<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cR(r){const e=r,{installationEntry:t,registrationPromise:n}=await lu(e);return n?n.catch(console.error):hu(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uR(r,e=!1){const t=r;return await lR(t),(await hu(t,e)).token}async function lR(r){const{registrationPromise:e}=await lu(r);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hR(r){if(!r||!r.options)throw pa("App Configuration");if(!r.name)throw pa("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!r.options[t])throw pa(t);return{appName:r.name,projectId:r.options.projectId,apiKey:r.options.apiKey,appId:r.options.appId}}function pa(r){return kn.create("missing-app-config-values",{valueName:r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap="installations",dR="installations-internal",fR=r=>{const e=r.getProvider("app").getImmediate(),t=hR(e),n=xn(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},mR=r=>{const e=r.getProvider("app").getImmediate(),t=xn(e,ap).getImmediate();return{getId:()=>cR(t),getToken:s=>uR(t,s)}};function gR(){ct(new Xe(ap,fR,"PUBLIC")),ct(new Xe(dR,mR,"PRIVATE"))}gR();Me(zg,cu);Me(zg,cu,"esm2020");const _a="@firebase/remote-config",gd="0.8.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const up="remote-config",pd=100;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pR={"already-initialized":"Remote Config already initialized","registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","indexed-db-unavailable":"Indexed DB is not supported by current browser","custom-signal-max-allowed-signals":"Setting more than {$maxSignals} custom signals is not supported.","stream-error":"The stream was not able to connect to the backend: {$originalErrorMessage}.","realtime-unavailable":"The Realtime service is unavailable: {$originalErrorMessage}","update-message-invalid":"The stream invalidation message was unparsable: {$originalErrorMessage}","update-not-fetched":"Unable to fetch the latest config: {$originalErrorMessage}","analytics-unavailable":"Connection to Firebase Analytics failed: {$originalErrorMessage}"},he=new Nn("remoteconfig","Remote Config",pR);function _R(r,e){return r instanceof Ge&&r.code.indexOf(e)!==-1}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yR=!1,IR="",_d=0,ER=["1","true","t","yes","y","on"];class ya{constructor(e,t=IR){this._source=e,this._value=t}asString(){return this._value}asBoolean(){return this._source==="static"?yR:ER.indexOf(this._value.toLowerCase())>=0}asNumber(){if(this._source==="static")return _d;let e=Number(this._value);return isNaN(e)&&(e=_d),e}getSource(){return this._source}}class TR{constructor(e){this.storage=e._storage,this.logger=e._logger,this.analyticsProvider=e._analyticsProvider}async updateActiveExperiments(e){const t=await this.storage.getActiveExperiments()||new Set,n=this.createExperimentInfoMap(e);return this.addActiveExperiments(n),this.removeInactiveExperiments(t,n),this.storage.setActiveExperiments(new Set(n.keys()))}createExperimentInfoMap(e){const t=new Map;for(const n of e)t.set(n.experimentId,n);return t}addActiveExperiments(e){const t={};for(const[n,s]of e.entries())t[`firebase${n}`]=s.variantId;this.addExperimentToAnalytics(t)}removeInactiveExperiments(e,t){const n={};for(const s of e)t.has(s)||(n[`firebase${s}`]=null);this.addExperimentToAnalytics(n)}addExperimentToAnalytics(e){if(Object.keys(e).length!==0)try{const t=this.analyticsProvider.getImmediate({optional:!0});t?(t.setUserProperties(e),t.logEvent("set_firebase_experiment_state")):this.logger.warn("Analytics import failed. Verify if you have imported Firebase Analytics in your app code.")}catch(t){throw he.create("analytics-unavailable",{originalErrorMessage:t==null?void 0:t.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yS(r=ic(),e={}){var s,i;r=re(r);const t=xn(r,up);if(t.isInitialized()){const o=t.getOptions();if($t(o,e))return t.getImmediate();throw he.create("already-initialized")}t.initialize({options:e});const n=t.getImmediate();return e.initialFetchResponse&&(n._initializePromise=Promise.all([n._storage.setLastSuccessfulFetchResponse(e.initialFetchResponse),n._storage.setActiveConfigEtag(((s=e.initialFetchResponse)==null?void 0:s.eTag)||""),n._storage.setActiveConfigTemplateVersion(e.initialFetchResponse.templateVersion||0),n._storageCache.setLastSuccessfulFetchTimestampMillis(Date.now()),n._storageCache.setLastFetchStatus("success"),n._storageCache.setActiveConfig(((i=e.initialFetchResponse)==null?void 0:i.config)||{})]).then(),n._isInitializationComplete=!0),n}async function wR(r){const e=re(r),[t,n]=await Promise.all([e._storage.getLastSuccessfulFetchResponse(),e._storage.getActiveConfigEtag()]);if(!t||!t.config||!t.eTag||!t.templateVersion||t.eTag===n)return!1;const s=new TR(e),i=t.experiments?s.updateActiveExperiments(t.experiments):Promise.resolve();return await Promise.all([e._storageCache.setActiveConfig(t.config),e._storage.setActiveConfigEtag(t.eTag),e._storage.setActiveConfigTemplateVersion(t.templateVersion),i]),!0}function vR(r){const e=re(r);return e._initializePromise||(e._initializePromise=e._storageCache.loadFromStorage().then(()=>{e._isInitializationComplete=!0})),e._initializePromise}async function AR(r){const e=re(r),t=new cp;setTimeout(async()=>{t.abort()},e.settings.fetchTimeoutMillis);const n=e._storageCache.getCustomSignals();n&&e._logger.debug(`Fetching config with custom signals: ${JSON.stringify(n)}`);try{await e._client.fetch({cacheMaxAgeMillis:e.settings.minimumFetchIntervalMillis,signal:t,customSignals:n}),await e._storageCache.setLastFetchStatus("success")}catch(s){const i=_R(s,"fetch-throttle")?"throttle":"failure";throw await e._storageCache.setLastFetchStatus(i),s}}function IS(r,e){const t=re(r);t._isInitializationComplete||t._logger.debug(`A value was requested for key "${e}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);const n=t._storageCache.getActiveConfig();return n&&n[e]!==void 0?new ya("remote",n[e]):t.defaultConfig&&t.defaultConfig[e]!==void 0?new ya("default",String(t.defaultConfig[e])):(t._logger.debug(`Returning static value for key "${e}". Define a default or remote value if this is unintentional.`),new ya("static"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RR{constructor(e,t,n,s){this.client=e,this.storage=t,this.storageCache=n,this.logger=s}isCachedDataFresh(e,t){if(!t)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;const n=Date.now()-t,s=n<=e;return this.logger.debug(`Config fetch cache check. Cache age millis: ${n}. Cache max age millis (minimumFetchIntervalMillis setting): ${e}. Is cache hit: ${s}.`),s}async fetch(e){const[t,n]=await Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(n&&this.isCachedDataFresh(e.cacheMaxAgeMillis,t))return n;e.eTag=n&&n.eTag;const s=await this.client.fetch(e),i=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return s.status===200&&i.push(this.storage.setLastSuccessfulFetchResponse(s)),await Promise.all(i),s}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SR(r=navigator){return r.languages&&r.languages[0]||r.language}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(e,t,n,s,i,o){this.firebaseInstallations=e,this.sdkVersion=t,this.namespace=n,this.projectId=s,this.apiKey=i,this.appId=o}async fetch(e){const[t,n]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),i=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,o={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":e.eTag||"*"},c={sdk_version:this.sdkVersion,app_instance_id:t,app_instance_id_token:n,app_id:this.appId,language_code:SR(),custom_signals:e.customSignals},u={method:"POST",headers:o,body:JSON.stringify(c)},h=fetch(i,u),f=new Promise((L,U)=>{e.signal.addEventListener(()=>{const ne=new Error("The operation was aborted.");ne.name="AbortError",U(ne)})});let g;try{await Promise.race([h,f]),g=await h}catch(L){let U="fetch-client-network";throw(L==null?void 0:L.name)==="AbortError"&&(U="fetch-timeout"),he.create(U,{originalErrorMessage:L==null?void 0:L.message})}let I=g.status;const b=g.headers.get("ETag")||void 0;let V,D,x,$;if(g.status===200){let L;try{L=await g.json()}catch(U){throw he.create("fetch-client-parse",{originalErrorMessage:U==null?void 0:U.message})}V=L.entries,D=L.state,x=L.templateVersion,$=L.experimentDescriptions}if(D==="INSTANCE_STATE_UNSPECIFIED"?I=500:D==="NO_CHANGE"?I=304:(D==="NO_TEMPLATE"||D==="EMPTY_CONFIG")&&(V={},$=[]),I!==304&&I!==200)throw he.create("fetch-status",{httpStatus:I});return{status:I,eTag:b,config:V,templateVersion:x,experiments:$}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PR(r,e){return new Promise((t,n)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(t,s);r.addEventListener(()=>{clearTimeout(i),n(he.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function CR(r){if(!(r instanceof Ge)||!r.customData)return!1;const e=Number(r.customData.httpStatus);return e===429||e===500||e===503||e===504}class VR{constructor(e,t){this.client=e,this.storage=t}async fetch(e){const t=await this.storage.getThrottleMetadata()||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(e,t)}async attemptFetch(e,{throttleEndTimeMillis:t,backoffCount:n}){await PR(e.signal,t);try{const s=await this.client.fetch(e);return await this.storage.deleteThrottleMetadata(),s}catch(s){if(!CR(s))throw s;const i={throttleEndTimeMillis:Date.now()+Od(n),backoffCount:n+1};return await this.storage.setThrottleMetadata(i),this.attemptFetch(e,i)}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kR=60*1e3,DR=720*60*1e3;class NR{get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}constructor(e,t,n,s,i,o,c){this.app=e,this._client=t,this._storageCache=n,this._storage=s,this._logger=i,this._realtimeHandler=o,this._analyticsProvider=c,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:kR,minimumFetchIntervalMillis:DR},this.defaultConfig={}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(r,e){const t=r.target.error||void 0;return he.create(e,{originalErrorMessage:t&&(t==null?void 0:t.message)})}const kt="app_namespace_store",xR="firebase_remote_config",OR=1;function MR(){return new Promise((r,e)=>{try{const t=indexedDB.open(xR,OR);t.onerror=n=>{e(Pi(n,"storage-open"))},t.onsuccess=n=>{r(n.target.result)},t.onupgradeneeded=n=>{const s=n.target.result;switch(n.oldVersion){case 0:s.createObjectStore(kt,{keyPath:"compositeKey"})}}}catch(t){e(he.create("storage-open",{originalErrorMessage:t==null?void 0:t.message}))}})}class lp{getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(e){return this.set("last_fetch_status",e)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(e){return this.set("last_successful_fetch_timestamp_millis",e)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(e){return this.set("last_successful_fetch_response",e)}getActiveConfig(){return this.get("active_config")}setActiveConfig(e){return this.set("active_config",e)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(e){return this.set("active_config_etag",e)}getActiveExperiments(){return this.get("active_experiments")}setActiveExperiments(e){return this.set("active_experiments",e)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(e){return this.set("throttle_metadata",e)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}getCustomSignals(){return this.get("custom_signals")}getRealtimeBackoffMetadata(){return this.get("realtime_backoff_metadata")}setRealtimeBackoffMetadata(e){return this.set("realtime_backoff_metadata",e)}getActiveConfigTemplateVersion(){return this.get("last_known_template_version")}setActiveConfigTemplateVersion(e){return this.set("last_known_template_version",e)}}class LR extends lp{constructor(e,t,n,s=MR()){super(),this.appId=e,this.appName=t,this.namespace=n,this.openDbPromise=s}async setCustomSignals(e){const n=(await this.openDbPromise).transaction([kt],"readwrite"),s=await this.getWithTransaction("custom_signals",n),i=hp(e,s||{});return await this.setWithTransaction("custom_signals",i,n),i}async getWithTransaction(e,t){return new Promise((n,s)=>{const i=t.objectStore(kt),o=this.createCompositeKey(e);try{const c=i.get(o);c.onerror=u=>{s(Pi(u,"storage-get"))},c.onsuccess=u=>{const h=u.target.result;n(h?h.value:void 0)}}catch(c){s(he.create("storage-get",{originalErrorMessage:c==null?void 0:c.message}))}})}async setWithTransaction(e,t,n){return new Promise((s,i)=>{const o=n.objectStore(kt),c=this.createCompositeKey(e);try{const u=o.put({compositeKey:c,value:t});u.onerror=h=>{i(Pi(h,"storage-set"))},u.onsuccess=()=>{s()}}catch(u){i(he.create("storage-set",{originalErrorMessage:u==null?void 0:u.message}))}})}async get(e){const n=(await this.openDbPromise).transaction([kt],"readonly");return this.getWithTransaction(e,n)}async set(e,t){const s=(await this.openDbPromise).transaction([kt],"readwrite");return this.setWithTransaction(e,t,s)}async delete(e){const t=await this.openDbPromise;return new Promise((n,s)=>{const o=t.transaction([kt],"readwrite").objectStore(kt),c=this.createCompositeKey(e);try{const u=o.delete(c);u.onerror=h=>{s(Pi(h,"storage-delete"))},u.onsuccess=()=>{n()}}catch(u){s(he.create("storage-delete",{originalErrorMessage:u==null?void 0:u.message}))}})}createCompositeKey(e){return[this.appId,this.appName,this.namespace,e].join()}}class FR extends lp{constructor(){super(...arguments),this.storage={}}async get(e){return Promise.resolve(this.storage[e])}async set(e,t){return this.storage[e]=t,Promise.resolve(void 0)}async delete(e){return this.storage[e]=void 0,Promise.resolve()}async setCustomSignals(e){const t=this.storage.custom_signals||{};return this.storage.custom_signals=hp(e,t),Promise.resolve(this.storage.custom_signals)}}function hp(r,e){const t={...e,...r},n=Object.fromEntries(Object.entries(t).filter(([s,i])=>i!==null).map(([s,i])=>typeof i=="number"?[s,i.toString()]:[s,i]));if(Object.keys(n).length>pd)throw he.create("custom-signal-max-allowed-signals",{maxSignals:pd});return n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UR{constructor(e){this.storage=e}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}getCustomSignals(){return this.customSignals}async loadFromStorage(){const e=this.storage.getLastFetchStatus(),t=this.storage.getLastSuccessfulFetchTimestampMillis(),n=this.storage.getActiveConfig(),s=this.storage.getCustomSignals(),i=await e;i&&(this.lastFetchStatus=i);const o=await t;o&&(this.lastSuccessfulFetchTimestampMillis=o);const c=await n;c&&(this.activeConfig=c);const u=await s;u&&(this.customSignals=u)}setLastFetchStatus(e){return this.lastFetchStatus=e,this.storage.setLastFetchStatus(e)}setLastSuccessfulFetchTimestampMillis(e){return this.lastSuccessfulFetchTimestampMillis=e,this.storage.setLastSuccessfulFetchTimestampMillis(e)}setActiveConfig(e){return this.activeConfig=e,this.storage.setActiveConfig(e)}async setCustomSignals(e){this.customSignals=await this.storage.setCustomSignals(e)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BR{constructor(e){this.allowedEvents_=e,this.listeners_={},Ea(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let s=0;s<n.length;s++)n[s].callback.apply(n[s].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const s=this.getInitialEvent(e);s&&t.apply(n,s)}off(e,t,n){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===t&&(!n||n===s[i].context)){s.splice(i,1);return}}validateEventType_(e){Ea(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du extends BR{static getInstance(){return new du}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const n=!document[e];n!==this.visible_&&(this.visible_=n,this.trigger("visible",n))},!1)}getInitialEvent(e){return Ea(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qR="X-Goog-Api-Key",jR="X-Goog-Firebase-Installations-Auth",Ia=8,yd=3,Id=-1,Ed=0,Td="featureDisabled",wd="retryIntervalSeconds",vd="latestTemplateVersionNumber";class $R{constructor(e,t,n,s,i,o,c,u,h,f){this.firebaseInstallations=e,this.storage=t,this.sdkVersion=n,this.namespace=s,this.projectId=i,this.apiKey=o,this.appId=c,this.logger=u,this.storageCache=h,this.cachingClient=f,this.observers=new Set,this.isConnectionActive=!1,this.isRealtimeDisabled=!1,this.httpRetriesRemaining=Ia,this.isInBackground=!1,this.decoder=new TextDecoder("utf-8"),this.isClosingConnection=!1,this.propagateError=g=>this.observers.forEach(I=>{var b;return(b=I.error)==null?void 0:b.call(I,g)}),this.isStatusCodeRetryable=g=>!g||[408,429,502,503,504].includes(g),this.setRetriesRemaining(),du.getInstance().on("visible",this.onVisibilityChange,this)}async setRetriesRemaining(){const e=await this.storage.getRealtimeBackoffMetadata(),t=(e==null?void 0:e.numFailedStreams)||0;this.httpRetriesRemaining=Math.max(Ia-t,1)}async updateBackoffMetadataWithLastFailedStreamConnectionTime(e){var s;const t=(((s=await this.storage.getRealtimeBackoffMetadata())==null?void 0:s.numFailedStreams)||0)+1,n=Od(t,6e4,2);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(e.getTime()+n),numFailedStreams:t})}async updateBackoffMetadataWithRetryInterval(e){const t=Date.now(),n=e*1e3,s=new Date(t+n);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:s,numFailedStreams:0}),await this.retryHttpConnectionWhenBackoffEnds()}async closeRealtimeHttpConnection(){if(!this.isClosingConnection){this.isClosingConnection=!0;try{this.reader&&await this.reader.cancel()}catch{this.logger.debug("Failed to cancel the reader, connection was lost.")}finally{this.reader=void 0}this.controller&&(await this.controller.abort(),this.controller=void 0),this.isClosingConnection=!1}}async resetRealtimeBackoff(){await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(-1),numFailedStreams:0})}resetRetryCount(){this.httpRetriesRemaining=Ia}async establishRealtimeConnection(e,t,n,s){const i=await this.storage.getActiveConfigEtag(),o=await this.storage.getActiveConfigTemplateVersion(),c={[qR]:this.apiKey,[jR]:n,"Content-Type":"application/json",Accept:"application/json","If-None-Match":i||"*","Content-Encoding":"gzip"},u={project:this.projectId,namespace:this.namespace,lastKnownVersionNumber:o,appId:this.appId,sdkVersion:this.sdkVersion,appInstanceId:t};return await fetch(e,{method:"POST",headers:c,body:JSON.stringify(u),signal:s})}getRealtimeUrl(){const t=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfigrealtime.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:streamFetchInvalidations?key=${this.apiKey}`;return new URL(t)}async createRealtimeConnection(){const[e,t]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken(!1)]);this.controller=new AbortController;const n=this.getRealtimeUrl();return await this.establishRealtimeConnection(n,e,t,this.controller.signal)}async retryHttpConnectionWhenBackoffEnds(){let e=await this.storage.getRealtimeBackoffMetadata();e||(e={backoffEndTimeMillis:new Date(Id),numFailedStreams:Ed});const t=new Date(e.backoffEndTimeMillis).getTime(),n=Date.now(),s=Math.max(0,t-n);await this.makeRealtimeHttpConnection(s)}setIsHttpConnectionRunning(e){this.isConnectionActive=e}checkAndSetHttpConnectionFlagIfNotRunning(){const e=this.canEstablishStreamConnection();return e&&this.setIsHttpConnectionRunning(!0),e}fetchResponseIsUpToDate(e,t){return e.config!=null&&e.templateVersion?e.templateVersion>=t:this.storageCache.getLastFetchStatus()==="success"}parseAndValidateConfigUpdateMessage(e){const t=e.indexOf("{"),n=e.indexOf("}",t);return t<0||n<0||t>=n?"":e.substring(t,n+1)}isEventListenersEmpty(){return this.observers.size===0}getRandomInt(e){return Math.floor(Math.random()*e)}executeAllListenerCallbacks(e){this.observers.forEach(t=>t.next(e))}getChangedParams(e,t){const n=new Set,s=new Set(Object.keys(e||{})),i=new Set(Object.keys(t||{}));for(const o of s)(!i.has(o)||e[o]!==t[o])&&n.add(o);for(const o of i)s.has(o)||n.add(o);return n}async fetchLatestConfig(e,t){const n=e-1,s=yd-n,i=this.storageCache.getCustomSignals();i&&this.logger.debug(`Fetching config with custom signals: ${JSON.stringify(i)}`);const o=new cp;try{const c={cacheMaxAgeMillis:0,signal:o,customSignals:i,fetchType:"REALTIME",fetchAttempt:s},u=await this.cachingClient.fetch(c);let h=await this.storage.getActiveConfig();if(!this.fetchResponseIsUpToDate(u,t)){this.logger.debug("Fetched template version is the same as SDK's current version. Retrying fetch."),await this.autoFetch(n,t);return}if(u.config==null){this.logger.debug("The fetch succeeded, but the backend had no updates.");return}h==null&&(h={});const f=this.getChangedParams(u.config,h);if(f.size===0){this.logger.debug("Config was fetched, but no params changed.");return}const g={getUpdatedKeys(){return new Set(f)}};this.executeAllListenerCallbacks(g)}catch(c){const u=c instanceof Error?c.message:String(c),h=he.create("update-not-fetched",{originalErrorMessage:`Failed to auto-fetch config update: ${u}`});this.propagateError(h)}}async autoFetch(e,t){if(e===0){const i=he.create("update-not-fetched",{originalErrorMessage:"Unable to fetch the latest version of the template."});this.propagateError(i);return}const s=this.getRandomInt(4)*1e3;await new Promise(i=>setTimeout(i,s)),await this.fetchLatestConfig(e,t)}async handleNotifications(e){let t,n="";for(;;){const{done:s,value:i}=await e.read();if(s)break;if(t=this.decoder.decode(i,{stream:!0}),n+=t,t.includes("}")){if(n=this.parseAndValidateConfigUpdateMessage(n),n.length===0)continue;try{const o=JSON.parse(n);if(this.isEventListenersEmpty())break;if(Td in o&&o[Td]===!0){const c=he.create("realtime-unavailable",{originalErrorMessage:"The server is temporarily unavailable. Try again in a few minutes."});this.propagateError(c);break}if(vd in o){const c=await this.storage.getActiveConfigTemplateVersion(),u=Number(o[vd]);c&&u>c&&await this.autoFetch(yd,u)}if(wd in o){const c=Number(o[wd]);await this.updateBackoffMetadataWithRetryInterval(c)}}catch(o){this.logger.debug("Unable to parse latest config update message.",o);const c=o instanceof Error?o.message:String(o);this.propagateError(he.create("update-message-invalid",{originalErrorMessage:c}))}n=""}}}async listenForNotifications(e){try{await this.handleNotifications(e)}catch{this.isInBackground||this.logger.debug("Real-time connection was closed due to an exception.")}}async prepareAndBeginRealtimeHttpStream(){if(!this.checkAndSetHttpConnectionFlagIfNotRunning())return;let e=await this.storage.getRealtimeBackoffMetadata();e||(e={backoffEndTimeMillis:new Date(Id),numFailedStreams:Ed});const t=e.backoffEndTimeMillis.getTime();if(Date.now()<t){await this.retryHttpConnectionWhenBackoffEnds();return}let n,s;try{if(n=await this.createRealtimeConnection(),s=n.status,n.ok&&n.body){this.resetRetryCount(),await this.resetRealtimeBackoff();const i=n.body.getReader();this.reader=i,await this.listenForNotifications(i)}}catch(i){this.isInBackground?this.resetRetryCount():this.logger.debug("Exception connecting to real-time RC backend. Retrying the connection...:",i)}finally{await this.closeRealtimeHttpConnection(),this.setIsHttpConnectionRunning(!1);const i=!this.isInBackground&&(s===void 0||this.isStatusCodeRetryable(s));if(i&&await this.updateBackoffMetadataWithLastFailedStreamConnectionTime(new Date),i||n!=null&&n.ok)await this.retryHttpConnectionWhenBackoffEnds();else{const o=`Unable to connect to the server. HTTP status code: ${s}`,c=he.create("stream-error",{originalErrorMessage:o});this.propagateError(c)}}}canEstablishStreamConnection(){const e=this.observers.size>0,t=!this.isRealtimeDisabled,n=!this.isConnectionActive,s=!this.isInBackground;return e&&t&&n&&s}async makeRealtimeHttpConnection(e){if(this.canEstablishStreamConnection()){if(this.httpRetriesRemaining>0)this.httpRetriesRemaining--,await new Promise(t=>setTimeout(t,e)),this.prepareAndBeginRealtimeHttpStream();else if(!this.isInBackground){const t=he.create("stream-error",{originalErrorMessage:"Unable to connect to the server. Check your connection and try again."});this.propagateError(t)}}}async beginRealtime(){this.observers.size>0&&await this.makeRealtimeHttpConnection(0)}addObserver(e){this.observers.add(e),this.beginRealtime()}removeObserver(e){this.observers.has(e)&&this.observers.delete(e)}async onVisibilityChange(e){this.isInBackground=!e,e?e&&await this.beginRealtime():await this.closeRealtimeHttpConnection()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zR(){ct(new Xe(up,r,"PUBLIC").setMultipleInstances(!0)),Me(_a,gd),Me(_a,gd,"esm2020");function r(e,{options:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate(),i=e.getProvider("analytics-internal"),{projectId:o,apiKey:c,appId:u}=n.options;if(!o)throw he.create("registration-project-id");if(!c)throw he.create("registration-api-key");if(!u)throw he.create("registration-app-id");const h=(t==null?void 0:t.templateId)||"firebase",f=nc()?new LR(u,n.name,h):new FR,g=new UR(f),I=new to(_a);I.logLevel=H.ERROR;const b=new bR(s,zt,h,o,c,u),V=new VR(b,f),D=new RR(V,f,g,I),x=new $R(s,f,zt,h,o,c,u,I,g,D),$=new NR(n,D,g,f,I,x,i);return vR($),$}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ES(r){return r=re(r),await AR(r),wR(r)}zR();export{GR as A,XR as B,TI as C,YR as D,JR as E,rS as F,Nt as G,Z as T,nS as a,_S as b,yS as c,IS as d,aA as e,ES as f,ZR as g,gS as h,gy as i,tS as j,lS as k,hS as l,pS as m,cS as n,aS as o,uS as p,iS as q,dS as r,sS as s,mS as t,fS as u,WR as v,oS as w,QR as x,HR as y,KR as z};
