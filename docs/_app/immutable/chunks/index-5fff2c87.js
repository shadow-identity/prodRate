function j(){}function I(t,n){for(const e in n)t[e]=n[e];return t}function O(t){return t()}function C(){return Object.create(null)}function p(t){t.forEach(O)}function T(t){return typeof t=="function"}function lt(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function W(t){return Object.keys(t).length===0}function st(t,n,e,i){if(t){const r=D(t,n,e,i);return t[0](r)}}function D(t,n,e,i){return t[1]&&i?I(e.ctx.slice(),t[1](i(n))):e.ctx}function ut(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const u=[],o=Math.max(n.dirty.length,r.length);for(let l=0;l<o;l+=1)u[l]=n.dirty[l]|r[l];return u}return n.dirty|r}return n.dirty}function at(t,n,e,i,r,u){if(r){const o=D(n,e,i,u);t.p(o,r)}}function ft(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function _t(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function dt(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}function ht(t){return t&&T(t.destroy)?t.destroy:j}let v=!1;function G(){v=!0}function J(){v=!1}function K(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let s=0;s<n.length;s++){const f=n[s];f.claim_order!==void 0&&c.push(f)}n=c}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let c=0;c<n.length;c++){const s=n[c].claim_order,f=(r>0&&n[e[r]].claim_order<=s?r+1:K(1,r,g=>n[e[g]].claim_order,s))-1;i[c]=e[f]+1;const a=f+1;e[a]=c,r=Math.max(a,r)}const u=[],o=[];let l=n.length-1;for(let c=e[r]+1;c!=0;c=i[c-1]){for(u.push(n[c-1]);l>=c;l--)o.push(n[l]);l--}for(;l>=0;l--)o.push(n[l]);u.reverse(),o.sort((c,s)=>c.claim_order-s.claim_order);for(let c=0,s=0;c<o.length;c++){for(;s<u.length&&o[c].claim_order>=u[s].claim_order;)s++;const f=s<u.length?u[s]:null;t.insertBefore(o[c],f)}}function R(t,n){if(v){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function mt(t,n,e){v&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode.removeChild(t)}function V(t){return document.createElement(t)}function X(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function N(t){return document.createTextNode(t)}function pt(){return N(" ")}function yt(){return N("")}function gt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function xt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function bt(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function B(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function $t(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in n)n[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=n[i]:i==="__value"?t.value=t[i]=n[i]:e[i]&&e[i].set?t[i]=n[i]:B(t,i,n[i])}function vt(t,n){for(const e in n)B(t,e,n[e])}function Y(t){return Array.from(t.childNodes)}function Z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function L(t,n,e,i,r=!1){Z(t);const u=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const l=t[o];if(n(l)){const c=e(l);return c===void 0?t.splice(o,1):t[o]=c,r||(t.claim_info.last_index=o),l}}for(let o=t.claim_info.last_index-1;o>=0;o--){const l=t[o];if(n(l)){const c=e(l);return c===void 0?t.splice(o,1):t[o]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function q(t,n,e,i){return L(t,r=>r.nodeName===n,r=>{const u=[];for(let o=0;o<r.attributes.length;o++){const l=r.attributes[o];e[l.name]||u.push(l.name)}u.forEach(o=>r.removeAttribute(o))},()=>i(n))}function wt(t,n,e){return q(t,n,e,V)}function Et(t,n,e){return q(t,n,e,X)}function tt(t,n){return L(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>N(n),!0)}function kt(t){return tt(t," ")}function jt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Nt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function nt(t,n,{bubbles:e=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,i,n),r}let m;function h(t){m=t}function y(){if(!m)throw new Error("Function called outside component initialization");return m}function St(t){y().$$.on_mount.push(t)}function At(t){y().$$.after_update.push(t)}function Ct(){const t=y();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const u=nt(n,e,{cancelable:i});return r.slice().forEach(o=>{o.call(t,u)}),!u.defaultPrevented}return!0}}function Pt(t,n){return y().$$.context.set(t,n),n}function Mt(t){return y().$$.context.get(t)}function Ot(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const d=[],P=[],b=[],M=[],z=Promise.resolve();let E=!1;function F(){E||(E=!0,z.then(H))}function Tt(){return F(),z}function k(t){b.push(t)}const w=new Set;let x=0;function H(){const t=m;do{for(;x<d.length;){const n=d[x];x++,h(n),et(n.$$)}for(h(null),d.length=0,x=0;P.length;)P.pop()();for(let n=0;n<b.length;n+=1){const e=b[n];w.has(e)||(w.add(e),e())}b.length=0}while(d.length);for(;M.length;)M.pop()();E=!1,w.clear(),h(t)}function et(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(k)}}const $=new Set;let _;function Dt(){_={r:0,c:[],p:_}}function Bt(){_.r||p(_.c),_=_.p}function it(t,n){t&&t.i&&($.delete(t),t.i(n))}function Lt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}}function qt(t,n){const e={},i={},r={$$scope:1};let u=t.length;for(;u--;){const o=t[u],l=n[u];if(l){for(const c in o)c in l||(i[c]=1);for(const c in l)r[c]||(e[c]=l[c],r[c]=1);t[u]=l}else for(const c in o)r[c]=1}for(const o in i)o in e||(e[o]=void 0);return e}function zt(t){return typeof t=="object"&&t!==null?t:{}}function Ft(t){t&&t.c()}function Ht(t,n){t&&t.l(n)}function rt(t,n,e,i){const{fragment:r,on_mount:u,on_destroy:o,after_update:l}=t.$$;r&&r.m(n,e),i||k(()=>{const c=u.map(O).filter(T);o?o.push(...c):p(c),t.$$.on_mount=[]}),l.forEach(k)}function ct(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ot(t,n){t.$$.dirty[0]===-1&&(d.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function It(t,n,e,i,r,u,o,l=[-1]){const c=m;h(t);const s=t.$$={fragment:null,ctx:null,props:u,update:j,not_equal:r,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(c?c.$$.context:[])),callbacks:C(),dirty:l,skip_bound:!1,root:n.target||c.$$.root};o&&o(s.root);let f=!1;if(s.ctx=e?e(t,n.props||{},(a,g,...S)=>{const A=S.length?S[0]:g;return s.ctx&&r(s.ctx[a],s.ctx[a]=A)&&(!s.skip_bound&&s.bound[a]&&s.bound[a](A),f&&ot(t,a)),g}):[],s.update(),f=!0,p(s.before_update),s.fragment=i?i(s.ctx):!1,n.target){if(n.hydrate){G();const a=Y(n.target);s.fragment&&s.fragment.l(a),a.forEach(U)}else s.fragment&&s.fragment.c();n.intro&&it(t.$$.fragment),rt(t,n.target,n.anchor,n.customElement),J(),H()}h(c)}class Wt{$destroy(){ct(this,1),this.$destroy=j}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!W(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{Ct as $,qt as A,zt as B,ct as C,I as D,Tt as E,st as F,at as G,ft as H,ut as I,R as J,gt as K,Ot as L,xt as M,bt as N,Mt as O,$t as P,ht as Q,T as R,Wt as S,p as T,dt as U,y as V,_t as W,P as X,X as Y,Et as Z,vt as _,Y as a,B as b,wt as c,U as d,V as e,Nt as f,mt as g,tt as h,It as i,jt as j,pt as k,yt as l,kt as m,j as n,Dt as o,Lt as p,Bt as q,it as r,lt as s,N as t,Pt as u,At as v,St as w,Ft as x,Ht as y,rt as z};
