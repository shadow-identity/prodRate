function w(){}function I(t,n){for(const e in n)t[e]=n[e];return t}function D(t){return t()}function T(){return Object.create(null)}function y(t){t.forEach(D)}function M(t){return typeof t=="function"}function ut(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function W(t){return Object.keys(t).length===0}function G(t,...n){if(t==null)return w;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function lt(t,n,e){t.$$.on_destroy.push(G(n,e))}function at(t,n,e,i){if(t){const r=O(t,n,e,i);return t[0](r)}}function O(t,n,e,i){return t[1]&&i?I(e.ctx.slice(),t[1](i(n))):e.ctx}function ft(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],o=Math.max(n.dirty.length,r.length);for(let s=0;s<o;s+=1)l[s]=n.dirty[s]|r[s];return l}return n.dirty|r}return n.dirty}function _t(t,n,e,i,r,l){if(r){const o=O(n,e,i,l);t.p(o,r)}}function dt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function ht(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function mt(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}function pt(t){return t==null?"":t}function yt(t,n,e){return t.set(e),n}function gt(t){return t&&M(t.destroy)?t.destroy:w}let v=!1;function J(){v=!0}function K(){v=!1}function Q(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function R(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<n.length;u++){const f=n[u];f.claim_order!==void 0&&c.push(f)}n=c}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let c=0;c<n.length;c++){const u=n[c].claim_order,f=(r>0&&n[e[r]].claim_order<=u?r+1:Q(1,r,g=>n[e[g]].claim_order,u))-1;i[c]=e[f]+1;const a=f+1;e[a]=c,r=Math.max(a,r)}const l=[],o=[];let s=n.length-1;for(let c=e[r]+1;c!=0;c=i[c-1]){for(l.push(n[c-1]);s>=c;s--)o.push(n[s]);s--}for(;s>=0;s--)o.push(n[s]);l.reverse(),o.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<o.length;c++){for(;u<l.length&&o[c].claim_order>=l[u].claim_order;)u++;const f=u<l.length?l[u]:null;t.insertBefore(o[c],f)}}function U(t,n){if(v){for(R(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function bt(t,n,e){v&&!e?U(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function V(t){t.parentNode.removeChild(t)}function X(t){return document.createElement(t)}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function xt(){return S(" ")}function $t(){return S("")}function wt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function vt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function Et(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function B(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function kt(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in n)n[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=n[i]:i==="__value"?t.value=t[i]=n[i]:e[i]&&e[i].set?t[i]=n[i]:B(t,i,n[i])}function jt(t,n){for(const e in n)B(t,e,n[e])}function Z(t){return Array.from(t.childNodes)}function tt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function L(t,n,e,i,r=!1){tt(t);const l=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const s=t[o];if(n(s)){const c=e(s);return c===void 0?t.splice(o,1):t[o]=c,r||(t.claim_info.last_index=o),s}}for(let o=t.claim_info.last_index-1;o>=0;o--){const s=t[o];if(n(s)){const c=e(s);return c===void 0?t.splice(o,1):t[o]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,s}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function q(t,n,e,i){return L(t,r=>r.nodeName===n,r=>{const l=[];for(let o=0;o<r.attributes.length;o++){const s=r.attributes[o];e[s.name]||l.push(s.name)}l.forEach(o=>r.removeAttribute(o))},()=>i(n))}function Nt(t,n,e){return q(t,n,e,X)}function St(t,n,e){return q(t,n,e,Y)}function nt(t,n){return L(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>S(n),!0)}function At(t){return nt(t," ")}function Ct(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Tt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function et(t,n,{bubbles:e=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,i,n),r}let p;function m(t){p=t}function d(){if(!p)throw new Error("Function called outside component initialization");return p}function Pt(t){d().$$.on_mount.push(t)}function Dt(t){d().$$.after_update.push(t)}function Mt(t){d().$$.on_destroy.push(t)}function Ot(){const t=d();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const l=et(n,e,{cancelable:i});return r.slice().forEach(o=>{o.call(t,l)}),!l.defaultPrevented}return!0}}function Bt(t,n){return d().$$.context.set(t,n),n}function Lt(t){return d().$$.context.get(t)}function qt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const h=[],P=[],x=[],k=[],z=Promise.resolve();let j=!1;function F(){j||(j=!0,z.then(H))}function zt(){return F(),z}function N(t){x.push(t)}function Ft(t){k.push(t)}const E=new Set;let b=0;function H(){const t=p;do{for(;b<h.length;){const n=h[b];b++,m(n),it(n.$$)}for(m(null),h.length=0,b=0;P.length;)P.pop()();for(let n=0;n<x.length;n+=1){const e=x[n];E.has(e)||(E.add(e),e())}x.length=0}while(h.length);for(;k.length;)k.pop()();j=!1,E.clear(),m(t)}function it(t){if(t.fragment!==null){t.update(),y(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const $=new Set;let _;function Ht(){_={r:0,c:[],p:_}}function It(){_.r||y(_.c),_=_.p}function rt(t,n){t&&t.i&&($.delete(t),t.i(n))}function Wt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}}const Gt=typeof window!="undefined"?window:typeof globalThis!="undefined"?globalThis:global;function Jt(t,n){const e={},i={},r={$$scope:1};let l=t.length;for(;l--;){const o=t[l],s=n[l];if(s){for(const c in o)c in s||(i[c]=1);for(const c in s)r[c]||(e[c]=s[c],r[c]=1);t[l]=s}else for(const c in o)r[c]=1}for(const o in i)o in e||(e[o]=void 0);return e}function Kt(t){return typeof t=="object"&&t!==null?t:{}}function Qt(t,n,e){const i=t.$$.props[n];i!==void 0&&(t.$$.bound[i]=e,e(t.$$.ctx[i]))}function Rt(t){t&&t.c()}function Ut(t,n){t&&t.l(n)}function ct(t,n,e,i){const{fragment:r,on_mount:l,on_destroy:o,after_update:s}=t.$$;r&&r.m(n,e),i||N(()=>{const c=l.map(D).filter(M);o?o.push(...c):y(c),t.$$.on_mount=[]}),s.forEach(N)}function ot(t,n){const e=t.$$;e.fragment!==null&&(y(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function st(t,n){t.$$.dirty[0]===-1&&(h.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Vt(t,n,e,i,r,l,o,s=[-1]){const c=p;m(t);const u=t.$$={fragment:null,ctx:null,props:l,update:w,not_equal:r,bound:T(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(c?c.$$.context:[])),callbacks:T(),dirty:s,skip_bound:!1,root:n.target||c.$$.root};o&&o(u.root);let f=!1;if(u.ctx=e?e(t,n.props||{},(a,g,...A)=>{const C=A.length?A[0]:g;return u.ctx&&r(u.ctx[a],u.ctx[a]=C)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](C),f&&st(t,a)),g}):[],u.update(),f=!0,y(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){J();const a=Z(n.target);u.fragment&&u.fragment.l(a),a.forEach(V)}else u.fragment&&u.fragment.c();n.intro&&rt(t.$$.fragment),ct(t,n.target,n.anchor,n.customElement),K(),H()}m(c)}class Xt{$destroy(){ot(this,1),this.$destroy=w}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!W(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{jt as $,Kt as A,ot as B,I as C,zt as D,w as E,G as F,y as G,M as H,at as I,_t as J,dt as K,ft as L,U as M,wt as N,qt as O,vt as P,Et as Q,Lt as R,Xt as S,kt as T,gt as U,mt as V,d as W,ht as X,P as Y,Y as Z,St as _,Z as a,lt as a0,Ot as a1,Mt as a2,yt as a3,pt as a4,Gt as a5,Qt as a6,Ft as a7,B as b,Nt as c,V as d,X as e,Tt as f,bt as g,nt as h,Vt as i,Ct as j,xt as k,$t as l,At as m,Ht as n,Wt as o,It as p,rt as q,Bt as r,ut as s,S as t,Dt as u,Pt as v,Rt as w,Ut as x,ct as y,Jt as z};
