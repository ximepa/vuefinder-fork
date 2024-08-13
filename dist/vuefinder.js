var er = Object.defineProperty;
var tr = (t, e, n) => e in t ? er(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var _s = (t, e, n) => tr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as yt, watch as Fe, ref as C, shallowRef as nr, onMounted as xe, onUnmounted as jn, onUpdated as Os, nextTick as ct, computed as rt, inject as re, openBlock as v, createElementBlock as g, withKeys as $t, unref as o, createElementVNode as r, withModifiers as st, renderSlot as Tt, normalizeClass as ae, toDisplayString as b, createBlock as W, resolveDynamicComponent as Rs, withCtx as Q, createVNode as z, Fragment as ge, renderList as ke, createCommentVNode as q, withDirectives as ue, vModelCheckbox as zt, createTextVNode as Z, vModelSelect as En, vModelText as kt, onBeforeUnmount as Fs, customRef as sr, vShow as Ue, isRef as or, TransitionGroup as rr, normalizeStyle as rn, mergeModels as ar, useModel as Bs, resolveComponent as lr, provide as ir, Transition as cr } from "vue";
import dr from "mitt";
import ur from "dragselect";
import _r from "@uppy/core";
import vr from "@uppy/xhr-upload";
import fr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import mr from "cropperjs";
import pr from "vue3-pdf-app";
var Ls;
const yn = (Ls = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Ls.getAttribute("content");
class hr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    _s(this, "config");
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const n = this.config, a = {};
    yn != null && yn !== "" && (a[n.xsrfHeaderName] = yn);
    const s = Object.assign({}, n.headers, a, e.headers), c = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (i instanceof FormData ? (u = i, n.body != null && Object.entries(this.config.body).forEach(([_, p]) => {
      u.append(_, p);
    })) : (u = { ...i }, n.body != null && Object.assign(u, this.config.body)));
    const f = {
      url: d,
      method: l,
      headers: s,
      params: c,
      body: u
    };
    if (n.transformRequest != null) {
      const _ = n.transformRequest({
        url: d,
        method: l,
        headers: s,
        params: c,
        body: u
      });
      _.url != null && (f.url = _.url), _.method != null && (f.method = _.method), _.params != null && (f.params = _.params ?? {}), _.headers != null && (f.headers = _.headers ?? {}), _.body != null && (f.body = _.body);
    }
    return f;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, n) {
    if (n.url != null)
      return n.url;
    const a = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return a.url + "?" + new URLSearchParams(a.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const n = this.transformRequestParams(e), a = e.responseType || "json", s = {
      method: e.method,
      headers: n.headers,
      signal: e.abortSignal
    }, c = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    const i = await fetch(c, s);
    if (i.ok)
      return await i[a]();
    throw await i.json();
  }
}
function gr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new hr(e);
}
function br(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = yt(JSON.parse(e ?? "{}"));
  Fe(n, a);
  function a() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(l, u) {
    n[l] = u;
  }
  function c(l) {
    delete n[l];
  }
  function i() {
    Object.keys(n).map((l) => c(l));
  }
  return { getStore: (l, u = null) => n.hasOwnProperty(l) ? n[l] : u, setStore: s, removeStore: c, clearStore: i };
}
async function wr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function yr(t, e, n, a) {
  const { getStore: s, setStore: c } = t, i = C({}), d = C(s("locale", e)), l = (_, p = e) => {
    wr(_, a).then((m) => {
      i.value = m, c("locale", _), d.value = _, c("translations", m), Object.values(a).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + _ }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Fe(d, (_) => {
    l(_);
  }), !s("locale") && !a.length ? l(e) : i.value = s("translations");
  const u = (_, ...p) => p.length ? u(_ = _.replace("%s", p.shift()), ...p) : _;
  function f(_, ...p) {
    return i.value && i.value.hasOwnProperty(_) ? u(i.value[_], ...p) : u(_, ...p);
  }
  return yt({ t: f, locale: d });
}
const de = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, $r = Object.values(de), kr = "2.5.16";
function Hs(t, e, n, a, s) {
  return (e = Math, n = e.log, a = 1024, s = n(t) / n(a) | 0, t / e.pow(a, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Is(t, e, n, a, s) {
  return (e = Math, n = e.log, a = 1e3, s = n(t) / n(a) | 0, t / e.pow(a, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function xr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, a = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return a[1] * Math.pow(1024, e[a[2].toLowerCase()]);
}
const tt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Sr(t, e) {
  const n = C(tt.SYSTEM), a = C(tt.LIGHT);
  n.value = t.getStore("theme", e ?? tt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    n.value === tt.DARK || n.value === tt.SYSTEM && i.matches ? a.value = tt.DARK : a.value = tt.LIGHT;
  };
  return c(s), s.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: a,
    /**
     * @param {Theme} value
     */
    set(i) {
      n.value = i, i !== tt.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(s);
    }
  };
}
function Cr() {
  const t = nr(null), e = C(!1), n = C();
  return { visible: e, type: t, data: n, open: (c, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = i;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.10.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const De = (t, e) => {
  const { o: n, i: a, u: s } = t;
  let c = n, i;
  const d = (f, _) => {
    const p = c, m = f, h = _ || (a ? !a(p, m) : p !== m);
    return (h || s) && (c = m, i = p), [c, h, i];
  };
  return [e ? (f) => d(e(c, i), f) : d, (f) => [c, !!f, i]];
}, Er = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Me = Er ? window : {}, Ns = Math.max, Ar = Math.min, An = Math.round, Jt = Math.abs, vs = Math.sign, Us = Me.cancelAnimationFrame, Gn = Me.requestAnimationFrame, Zt = Me.setTimeout, Tn = Me.clearTimeout, an = (t) => typeof Me[t] < "u" ? Me[t] : void 0, Tr = an("MutationObserver"), fs = an("IntersectionObserver"), Qt = an("ResizeObserver"), Kt = an("ScrollTimeline"), Kn = (t) => t === void 0, ln = (t) => t === null, ze = (t) => typeof t == "number", Lt = (t) => typeof t == "string", Wn = (t) => typeof t == "boolean", Be = (t) => typeof t == "function", Pe = (t) => Array.isArray(t), en = (t) => typeof t == "object" && !Pe(t) && !ln(t), Yn = (t) => {
  const e = !!t && t.length, n = ze(e) && e > -1 && e % 1 == 0;
  return Pe(t) || !Be(t) && n ? e > 0 && en(t) ? e - 1 in t : !0 : !1;
}, tn = (t) => !!t && t.constructor === Object, nn = (t) => t instanceof HTMLElement, cn = (t) => t instanceof Element;
function le(t, e) {
  if (Yn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && le(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const qs = (t, e) => t.indexOf(e) >= 0, Mt = (t, e) => t.concat(e), me = (t, e, n) => (!Lt(e) && Yn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), at = (t) => Array.from(t || []), Xn = (t) => Pe(t) ? t : !Lt(t) && Yn(t) ? at(t) : [t], Mn = (t) => !!t && !t.length, Dn = (t) => at(new Set(t)), Oe = (t, e, n) => {
  le(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, zs = "paddingTop", Ps = "paddingRight", js = "paddingLeft", Gs = "paddingBottom", Ks = "marginLeft", Ws = "marginRight", Ys = "marginBottom", Xs = "overflowX", Js = "overflowY", dn = "width", un = "height", nt = "visible", it = "hidden", gt = "scroll", Mr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, _n = (t, e, n, a) => {
  if (t && e) {
    let s = !0;
    return le(n, (c) => {
      const i = t[c], d = e[c];
      i !== d && (s = !1);
    }), s;
  }
  return !1;
}, Zs = (t, e) => _n(t, e, ["w", "h"]), Wt = (t, e) => _n(t, e, ["x", "y"]), Dr = (t, e) => _n(t, e, ["t", "r", "b", "l"]), dt = () => {
}, X = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? Zt : Gn, a = t ? Tn : Us;
  return [(s) => {
    a(e), e = n(() => s(), Be(t) ? t() : t);
  }, () => a(e)];
}, Vn = (t, e) => {
  const { _: n, v: a, p: s, S: c } = e || {};
  let i, d, l, u, f = dt;
  const _ = function(w) {
    f(), Tn(i), u = i = d = void 0, f = dt, t.apply(this, w);
  }, p = (y) => c && d ? c(d, y) : y, m = () => {
    f !== dt && _(p(l) || l);
  }, h = function() {
    const w = at(arguments), M = Be(n) ? n() : n;
    if (ze(M) && M >= 0) {
      const R = Be(a) ? a() : a, x = ze(R) && R >= 0, D = M > 0 ? Zt : Gn, L = M > 0 ? Tn : Us, V = p(w) || w, S = _.bind(0, V);
      let $;
      f(), s && !u ? (S(), u = !0, $ = D(() => u = void 0, M)) : ($ = D(S, M), x && !i && (i = Zt(m, R))), f = () => L($), d = l = V;
    } else
      _(w);
  };
  return h.m = m, h;
}, Qs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), He = (t) => t ? Object.keys(t) : [], oe = (t, e, n, a, s, c, i) => {
  const d = [e, n, a, s, c, i];
  return (typeof t != "object" || ln(t)) && !Be(t) && (t = {}), le(d, (l) => {
    le(l, (u, f) => {
      const _ = l[f];
      if (t === _)
        return !0;
      const p = Pe(_);
      if (_ && tn(_)) {
        const m = t[f];
        let h = m;
        p && !Pe(m) ? h = [] : !p && !tn(m) && (h = {}), t[f] = oe(h, _);
      } else
        t[f] = p ? _.slice() : _;
    });
  }), t;
}, eo = (t, e) => le(oe({}, t), (n, a, s) => {
  n === void 0 ? delete s[a] : n && tn(n) && (s[a] = eo(n));
}), Jn = (t) => !He(t).length, to = (t, e, n) => Ns(t, Ar(e, n)), ut = (t) => Dn((Pe(t) ? t : (t || "").split(" ")).filter((e) => e)), Zn = (t, e) => t && t.getAttribute(e), ms = (t, e) => t && t.hasAttribute(e), Xe = (t, e, n) => {
  le(ut(e), (a) => {
    t && t.setAttribute(a, String(n || ""));
  });
}, Ne = (t, e) => {
  le(ut(e), (n) => t && t.removeAttribute(n));
}, vn = (t, e) => {
  const n = ut(Zn(t, e)), a = X(Xe, t, e), s = (c, i) => {
    const d = new Set(n);
    return le(ut(c), (l) => {
      d[i](l);
    }), at(d).join(" ");
  };
  return {
    O: (c) => a(s(c, "delete")),
    $: (c) => a(s(c, "add")),
    C: (c) => {
      const i = ut(c);
      return i.reduce((d, l) => d && n.includes(l), i.length > 0);
    }
  };
}, no = (t, e, n) => (vn(t, e).O(n), X(Qn, t, e, n)), Qn = (t, e, n) => (vn(t, e).$(n), X(no, t, e, n)), sn = (t, e, n, a) => (a ? Qn : no)(t, e, n), es = (t, e, n) => vn(t, e).C(n), so = (t) => vn(t, "class"), oo = (t, e) => {
  so(t).O(e);
}, ts = (t, e) => (so(t).$(e), X(oo, t, e)), ro = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n ? at(n.querySelectorAll(t)) : [];
}, Vr = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n && n.querySelector(t);
}, Ln = (t, e) => cn(t) && t.matches(e), ao = (t) => Ln(t, "body"), On = (t) => t ? at(t.childNodes) : [], Dt = (t) => t && t.parentElement, mt = (t, e) => cn(t) && t.closest(e), Rn = (t) => document.activeElement, Lr = (t, e, n) => {
  const a = mt(t, e), s = t && Vr(n, a), c = mt(s, e) === a;
  return a && s ? a === t || s === t || c && mt(mt(t, n), e) !== a : !1;
}, bt = (t) => {
  le(Xn(t), (e) => {
    const n = Dt(e);
    e && n && n.removeChild(e);
  });
}, Ve = (t, e) => X(bt, t && e && le(Xn(e), (n) => {
  n && t.appendChild(n);
})), pt = (t) => {
  const e = document.createElement("div");
  return Xe(e, "class", t), e;
}, lo = (t) => {
  const e = pt();
  return e.innerHTML = t.trim(), le(On(e), (n) => bt(n));
}, ps = (t, e) => t.getPropertyValue(e) || t[e] || "", io = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Pt = (t) => io(parseFloat(t || "")), Fn = (t) => Math.round(t * 1e4) / 1e4, co = (t) => `${Fn(io(t))}px`;
function Vt(t, e) {
  t && e && le(e, (n, a) => {
    try {
      const s = t.style, c = ln(n) || Wn(n) ? "" : ze(n) ? co(n) : n;
      a.indexOf("--") === 0 ? s.setProperty(a, c) : s[a] = c;
    } catch {
    }
  });
}
function Ze(t, e, n) {
  const a = Lt(e);
  let s = a ? "" : {};
  if (t) {
    const c = Me.getComputedStyle(t, n) || t.style;
    s = a ? ps(c, e) : at(e).reduce((i, d) => (i[d] = ps(c, d), i), s);
  }
  return s;
}
const hs = (t, e, n) => {
  const a = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${a}top${s}`, i = `${a}right${s}`, d = `${a}bottom${s}`, l = `${a}left${s}`, u = Ze(t, [c, i, d, l]);
  return {
    t: Pt(u[c]),
    r: Pt(u[i]),
    b: Pt(u[d]),
    l: Pt(u[l])
  };
}, Or = (t, e) => `translate${en(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, Rr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Fr = {
  w: 0,
  h: 0
}, fn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Fr, Br = (t) => fn("inner", t || Me), ht = X(fn, "offset"), uo = X(fn, "client"), on = X(fn, "scroll"), ns = (t) => {
  const e = parseFloat(Ze(t, dn)) || 0, n = parseFloat(Ze(t, un)) || 0;
  return {
    w: e - An(e),
    h: n - An(n)
  };
}, $n = (t) => t.getBoundingClientRect(), Hr = (t) => !!t && Rr(t), Bn = (t) => !!(t && (t[un] || t[dn])), _o = (t, e) => {
  const n = Bn(t);
  return !Bn(e) && n;
}, gs = (t, e, n, a) => {
  le(ut(e), (s) => {
    t && t.removeEventListener(s, n, a);
  });
}, _e = (t, e, n, a) => {
  var s;
  const c = (s = a && a.H) != null ? s : !0, i = a && a.I || !1, d = a && a.A || !1, l = {
    passive: c,
    capture: i
  };
  return X(Oe, ut(e).map((u) => {
    const f = d ? (_) => {
      gs(t, u, f, i), n && n(_);
    } : n;
    return t && t.addEventListener(u, f, l), X(gs, t, u, f, i);
  }));
}, vo = (t) => t.stopPropagation(), Hn = (t) => t.preventDefault(), fo = (t) => vo(t) || Hn(t), qe = (t, e) => {
  const { x: n, y: a } = ze(e) ? {
    x: e,
    y: e
  } : e || {};
  ze(n) && (t.scrollLeft = n), ze(a) && (t.scrollTop = a);
}, Le = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), mo = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Ir = (t, e) => {
  const { D: n, M: a } = t, { w: s, h: c } = e, i = (_, p, m) => {
    let h = vs(_) * m, y = vs(p) * m;
    if (h === y) {
      const w = Jt(_), M = Jt(p);
      y = w > M ? 0 : y, h = w < M ? 0 : h;
    }
    return h = h === y ? 0 : h, [h + 0, y + 0];
  }, [d, l] = i(n.x, a.x, s), [u, f] = i(n.y, a.y, c);
  return {
    D: {
      x: d,
      y: u
    },
    M: {
      x: l,
      y: f
    }
  };
}, bs = ({ D: t, M: e }) => {
  const n = (a, s) => a === 0 && a <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, ws = ({ D: t, M: e }, n) => {
  const a = (s, c, i) => to(0, 1, (s - i) / (s - c) || 0);
  return {
    x: a(t.x, e.x, n.x),
    y: a(t.y, e.y, n.y)
  };
}, In = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ys = (t, e) => {
  le(Xn(e), t);
}, Nn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, i) => {
    if (c) {
      const d = e.get(c);
      ys((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, a = (c, i) => {
    if (Lt(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), ys((f) => {
        Be(f) && u.add(f);
      }, i), X(n, c, i);
    }
    Wn(i) && i && n();
    const d = He(c), l = [];
    return le(d, (u) => {
      const f = c[u];
      f && me(l, a(u, f));
    }), X(Oe, l);
  }, s = (c, i) => {
    le(at(e.get(c)), (d) => {
      i && !Mn(i) ? d.apply(0, i) : d();
    });
  };
  return a(t || {}), [a, n, s];
}, $s = (t) => JSON.stringify(t, (e, n) => {
  if (Be(n))
    throw 0;
  return n;
}), ks = (t, e) => t ? `${e}`.split(".").reduce((n, a) => n && Qs(n, a) ? n[a] : void 0, t) : void 0, Nr = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, po = (t, e) => {
  const n = {}, a = Mt(He(e), He(t));
  return le(a, (s) => {
    const c = t[s], i = e[s];
    if (en(c) && en(i))
      oe(n[s] = {}, po(c, i)), Jn(n[s]) && delete n[s];
    else if (Qs(e, s) && i !== c) {
      let d = !0;
      if (Pe(c) || Pe(i))
        try {
          $s(c) === $s(i) && (d = !1);
        } catch {
        }
      d && (n[s] = i);
    }
  }), n;
}, xs = (t, e, n) => (a) => [ks(t, a), n || ks(e, a) !== void 0], xt = "data-overlayscrollbars", Yt = "os-environment", jt = `${Yt}-scrollbar-hidden`, kn = `${xt}-initialize`, Xt = "noClipping", Ss = `${xt}-body`, ot = xt, Ur = "host", Je = `${xt}-viewport`, qr = Xs, zr = Js, Pr = "arrange", ho = "measuring", jr = "scrolling", go = "scrollbarHidden", Gr = "noContent", Un = `${xt}-padding`, Cs = `${xt}-content`, ss = "os-size-observer", Kr = `${ss}-appear`, Wr = `${ss}-listener`, Yr = "os-trinsic-observer", Xr = "os-theme-none", Re = "os-scrollbar", Jr = `${Re}-rtl`, Zr = `${Re}-horizontal`, Qr = `${Re}-vertical`, bo = `${Re}-track`, os = `${Re}-handle`, ea = `${Re}-visible`, ta = `${Re}-cornerless`, Es = `${Re}-interaction`, As = `${Re}-unusable`, qn = `${Re}-auto-hide`, Ts = `${qn}-hidden`, Ms = `${Re}-wheel`, na = `${bo}-interactive`, sa = `${os}-interactive`;
let wo;
const oa = () => wo, ra = (t) => {
  wo = t;
};
let xn;
const aa = () => {
  const t = (x, D, L) => {
    Ve(document.body, x), Ve(document.body, x);
    const P = uo(x), V = ht(x), S = ns(D);
    return L && bt(x), {
      x: V.h - P.h + S.h,
      y: V.w - P.w + S.w
    };
  }, e = (x) => {
    let D = !1;
    const L = ts(x, jt);
    try {
      D = Ze(x, "scrollbar-width") === "none" || Ze(x, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return L(), D;
  }, n = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = lo(`<div class="${Yt}"><div></div><style>${n}</style></div>`)[0], c = s.firstChild, i = s.lastChild, d = oa();
  d && (i.nonce = d);
  const [l, , u] = Nn(), [f, _] = De({
    o: t(s, c),
    i: Wt
  }, X(t, s, c, !0)), [p] = _(), m = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, y = {
    elements: {
      host: null,
      padding: !m,
      viewport: (x) => m && ao(x) && x,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, w = oe({}, Nr), M = X(oe, {}, w), B = X(oe, {}, y), R = {
    T: p,
    k: h,
    R: m,
    V: !!Kt,
    L: X(l, "r"),
    U: B,
    P: (x) => oe(y, x) && B(),
    N: M,
    q: (x) => oe(w, x) && M(),
    B: oe({}, y),
    F: oe({}, w)
  };
  if (Ne(s, "style"), bt(s), _e(Me, "resize", () => {
    u("r", []);
  }), Be(Me.matchMedia) && !m && (!h.x || !h.y)) {
    const x = (D) => {
      const L = Me.matchMedia(`(resolution: ${Me.devicePixelRatio}dppx)`);
      _e(L, "change", () => {
        D(), x(D);
      }, {
        A: !0
      });
    };
    x(() => {
      const [D, L] = f();
      oe(R.T, D), u("r", [L]);
    });
  }
  return R;
}, Ge = () => (xn || (xn = aa()), xn), yo = (t, e) => Be(e) ? e.apply(0, t) : e, la = (t, e, n, a) => {
  const s = Kn(a) ? n : a;
  return yo(t, s) || e.apply(0, t);
}, $o = (t, e, n, a) => {
  const s = Kn(a) ? n : a, c = yo(t, s);
  return !!c && (nn(c) ? c : e.apply(0, t));
}, ia = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: a } = e || {}, { k: s, R: c, U: i } = Ge(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = n ?? d, f = Kn(a) ? l : a, _ = (s.x || s.y) && u, p = t && (ln(f) ? !c : f);
  return !!_ || !!p;
}, rs = /* @__PURE__ */ new WeakMap(), ca = (t, e) => {
  rs.set(t, e);
}, da = (t) => {
  rs.delete(t);
}, ko = (t) => rs.get(t), ua = (t, e, n) => {
  let a = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    a = !0;
  }, i = (d) => {
    if (s && n) {
      const l = n.map((u) => {
        const [f, _] = u || [];
        return [_ && f ? (d || ro)(f, t) : [], _];
      });
      le(l, (u) => le(u[0], (f) => {
        const _ = u[1], p = s.get(f) || [];
        if (t.contains(f) && _) {
          const h = _e(f, _, (y) => {
            a ? (h(), s.delete(f)) : e(y);
          });
          s.set(f, me(p, h));
        } else
          Oe(p), s.delete(f);
      }));
    }
  };
  return i(), [c, i];
}, Ds = (t, e, n, a) => {
  let s = !1;
  const { j: c, X: i, Y: d, W: l, J: u, G: f } = a || {}, _ = Vn(() => s && n(!0), {
    _: 33,
    v: 99
  }), [p, m] = ua(t, _, d), h = c || [], y = i || [], w = Mt(h, y), M = (R, x) => {
    if (!Mn(x)) {
      const D = u || dt, L = f || dt, P = [], V = [];
      let S = !1, $ = !1;
      if (le(x, (E) => {
        const { attributeName: A, target: H, type: k, oldValue: N, addedNodes: U, removedNodes: ee } = E, se = k === "attributes", ne = k === "childList", pe = t === H, O = se && A, F = O && Zn(H, A || ""), I = Lt(F) ? F : null, j = O && N !== I, T = qs(y, A) && j;
        if (e && (ne || !pe)) {
          const K = se && j, G = K && l && Ln(H, l), te = (G ? !D(H, A, N, I) : !se || K) && !L(E, !!G, t, a);
          le(U, (ie) => me(P, ie)), le(ee, (ie) => me(P, ie)), $ = $ || te;
        }
        !e && pe && j && !D(H, A, N, I) && (me(V, A), S = S || T);
      }), m((E) => Dn(P).reduce((A, H) => (me(A, ro(E, H)), Ln(H, E) ? me(A, H) : A), [])), e)
        return !R && $ && n(!1), [!1];
      if (!Mn(V) || S) {
        const E = [Dn(V), S];
        return !R && n.apply(0, E), E;
      }
    }
  }, B = new Tr(X(M, !1));
  return [() => (B.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: w,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), B.disconnect(), s = !1);
  }), () => {
    if (s)
      return _.m(), M(!0, B.takeRecords());
  }];
}, xo = {}, So = {}, _a = (t) => {
  le(t, (e) => le(e, (n, a) => {
    xo[a] = e[a];
  }));
}, Co = (t, e, n) => He(t).map((a) => {
  const { static: s, instance: c } = t[a], [i, d, l] = n || [], u = n ? c : s;
  if (u) {
    const f = n ? u(i, d, e) : u(e);
    return (l || So)[a] = f;
  }
}), Ot = (t) => So[t], va = "__osOptionsValidationPlugin", fa = "__osSizeObserverPlugin", ma = (t, e) => {
  const { k: n } = e, [a, s] = t("showNativeOverlaidScrollbars");
  return [a && n.x && n.y, s];
}, wt = (t) => t.indexOf(nt) === 0, pa = (t, e) => {
  const n = (s, c, i, d) => {
    const l = s === nt ? it : s.replace(`${nt}-`, ""), u = wt(s), f = wt(i);
    return !c && !d ? it : u && f ? nt : u ? c && d ? l : c ? nt : it : c ? l : f && d ? nt : it;
  }, a = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    K: a,
    Z: {
      x: a.x === gt,
      y: a.y === gt
    }
  };
}, Eo = "__osScrollbarsHidingPlugin", ha = "__osClickScrollPlugin", Ao = (t, e, n) => {
  const { dt: a } = n || {}, s = Ot(fa), [c] = De({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = lo(`<div class="${ss}"><div class="${Wr}"></div></div>`)[0], u = l.firstChild, f = (_) => {
      const p = _ instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [y, , w] = c(_.contentRect), M = Bn(y);
        h = _o(y, w), m = !h && !M;
      } else
        h = _ === !0;
      m || e({
        ft: !0,
        dt: h
      });
    };
    if (Qt) {
      const _ = new Qt((p) => f(p.pop()));
      _.observe(u), me(i, () => {
        _.disconnect();
      });
    } else if (s) {
      const [_, p] = s(u, f, a);
      me(i, Mt([ts(l, Kr), _e(l, "animationstart", _)], p));
    } else
      return dt;
    return X(Oe, me(i, Ve(t, l)));
  };
}, ga = (t, e) => {
  let n;
  const a = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = pt(Yr), [c] = De({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const f = c(a(l)), [, _] = f;
      return _ && !u && e(f) && [f];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (fs)
      n = new fs(X(d, !1), {
        root: t
      }), n.observe(s), me(l, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const f = ht(s);
        i(f);
      };
      me(l, Ao(s, u)()), u();
    }
    return X(Oe, me(l, Ve(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, ba = (t, e, n, a) => {
  let s, c, i, d, l, u;
  const f = `[${ot}]`, _ = `[${Je}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: h, ot: y, gt: w, bt: M, nt: B, wt: R, yt: x, St: D, Ot: L } = t, P = (T) => Ze(T, "direction") === "rtl", V = {
    $t: !1,
    ct: P(m)
  }, S = Ge(), $ = Ot(Eo), [E] = De({
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = $ && $.tt(t, e, V, S, n).ut, G = !(R && B) && es(h, ot, Xt), Y = !B && x(Pr), te = Y && Le(w), ie = te && L(), be = D(ho, G), ve = Y && T && T()[0], Se = on(y), J = ns(y);
    return ve && ve(), qe(w, te), ie && ie(), G && be(), {
      w: Se.w + J.w,
      h: Se.h + J.h
    };
  }), A = Vn(a, {
    _: () => s,
    v: () => c,
    S(T, K) {
      const [G] = T, [Y] = K;
      return [Mt(He(G), He(Y)).reduce((te, ie) => (te[ie] = G[ie] || Y[ie], te), {})];
    }
  }), H = (T) => {
    const K = P(m);
    oe(T, {
      Ct: u !== K
    }), oe(V, {
      ct: K
    }), u = K;
  }, k = (T, K) => {
    const [G, Y] = T, te = {
      xt: Y
    };
    return oe(V, {
      $t: G
    }), !K && a(te), te;
  }, N = ({ ft: T, dt: K }) => {
    const Y = !(T && !K) && S.R ? A : a, te = {
      ft: T || K,
      dt: K
    };
    H(te), Y(te);
  }, U = (T, K) => {
    const [, G] = E(), Y = {
      Ht: G
    };
    return H(Y), G && !K && (T ? a : A)(Y), Y;
  }, ee = (T, K, G) => {
    const Y = {
      Et: K
    };
    return H(Y), K && !G && A(Y), Y;
  }, [se, ne] = M ? ga(h, k) : [], pe = !B && Ao(h, N, {
    dt: !0
  }), [O, F] = Ds(h, !1, ee, {
    X: p,
    j: p
  }), I = B && Qt && new Qt((T) => {
    const K = T[T.length - 1].contentRect;
    N({
      ft: !0,
      dt: _o(K, l)
    }), l = K;
  }), j = Vn(() => {
    const [, T] = E();
    a({
      Ht: T
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    I && I.observe(h);
    const T = pe && pe(), K = se && se(), G = O(), Y = S.L((te) => {
      te ? A({
        zt: te
      }) : j();
    });
    return () => {
      I && I.disconnect(), T && T(), K && K(), d && d(), G(), Y();
    };
  }, ({ It: T, At: K, Dt: G }) => {
    const Y = {}, [te] = T("update.ignoreMutation"), [ie, be] = T("update.attributes"), [ve, Se] = T("update.elementEvents"), [J, Ce] = T("update.debounce"), Ae = Se || be, ye = K || G, Ee = (he) => Be(te) && te(he);
    if (Ae) {
      i && i(), d && d();
      const [he, we] = Ds(M || y, !0, U, {
        j: Mt(p, ie || []),
        Y: ve,
        W: f,
        G: (ce, fe) => {
          const { target: $e, attributeName: Te } = ce;
          return (!fe && Te && !B ? Lr($e, f, _) : !1) || !!mt($e, `.${Re}`) || !!Ee(ce);
        }
      });
      d = he(), i = we;
    }
    if (Ce)
      if (A.m(), Pe(J)) {
        const he = J[0], we = J[1];
        s = ze(he) && he, c = ze(we) && we;
      } else ze(J) ? (s = J, c = !1) : (s = !1, c = !1);
    if (ye) {
      const he = F(), we = ne && ne(), ce = i && i();
      he && oe(Y, ee(he[0], he[1], ye)), we && oe(Y, k(we[0], ye)), ce && oe(Y, U(ce[0], ye));
    }
    return H(Y), Y;
  }, V];
}, wa = (t, e, n, a) => {
  const s = "--os-viewport-percent", c = "--os-scroll-percent", i = "--os-scroll-direction", { U: d } = Ge(), { scrollbars: l } = d(), { slot: u } = l, { vt: f, ht: _, ot: p, Mt: m, gt: h, wt: y, nt: w } = e, { scrollbars: M } = m ? {} : t, { slot: B } = M || {}, R = [], x = [], D = [], L = $o([f, _, p], () => w && y ? f : _, u, B), P = (O) => {
    if (Kt) {
      const F = new Kt({
        source: h,
        axis: O
      });
      return {
        kt: (j) => {
          const T = j.Tt.animate({
            clear: ["left"],
            [c]: [0, 1]
          }, {
            timeline: F
          });
          return () => T.cancel();
        }
      };
    }
  }, V = {
    x: P("x"),
    y: P("y")
  }, S = () => {
    const { Rt: O, Vt: F } = n, I = (j, T) => to(0, 1, j / (j + T) || 0);
    return {
      x: I(F.x, O.x),
      y: I(F.y, O.y)
    };
  }, $ = (O, F, I) => {
    const j = I ? ts : oo;
    le(O, (T) => {
      j(T.Tt, F);
    });
  }, E = (O, F) => {
    le(O, (I) => {
      const [j, T] = F(I);
      Vt(j, T);
    });
  }, A = (O, F, I) => {
    const j = Wn(I), T = j ? I : !0, K = j ? !I : !0;
    T && $(x, O, F), K && $(D, O, F);
  }, H = () => {
    const O = S(), F = (I) => (j) => [j.Tt, {
      [s]: Fn(I) + ""
    }];
    E(x, F(O.x)), E(D, F(O.y));
  }, k = () => {
    if (!Kt) {
      const { Lt: O } = n, F = ws(O, Le(h)), I = (j) => (T) => [T.Tt, {
        [c]: Fn(j) + ""
      }];
      E(x, I(F.x)), E(D, I(F.y));
    }
  }, N = () => {
    const { Lt: O } = n, F = bs(O), I = (j) => (T) => [T.Tt, {
      [i]: j ? "0" : "1"
    }];
    E(x, I(F.x)), E(D, I(F.y));
  }, U = () => {
    if (w && !y) {
      const { Rt: O, Lt: F } = n, I = bs(F), j = ws(F, Le(h)), T = (K) => {
        const { Tt: G } = K, Y = Dt(G) === p && G, te = (ie, be, ve) => {
          const Se = be * ie;
          return co(ve ? Se : -Se);
        };
        return [Y, Y && {
          transform: Or({
            x: te(j.x, O.x, I.x),
            y: te(j.y, O.y, I.y)
          })
        }];
      };
      E(x, T), E(D, T);
    }
  }, ee = (O) => {
    const F = O ? "x" : "y", j = pt(`${Re} ${O ? Zr : Qr}`), T = pt(bo), K = pt(os), G = {
      Tt: j,
      Ut: T,
      Pt: K
    }, Y = V[F];
    return me(O ? x : D, G), me(R, [Ve(j, T), Ve(T, K), X(bt, j), Y && Y.kt(G), a(G, A, O)]), G;
  }, se = X(ee, !0), ne = X(ee, !1), pe = () => (Ve(L, x[0].Tt), Ve(L, D[0].Tt), X(Oe, R));
  return se(), ne(), [{
    Nt: H,
    qt: k,
    Bt: N,
    Ft: U,
    jt: A,
    Xt: {
      Yt: x,
      Wt: se,
      Jt: X(E, x)
    },
    Gt: {
      Yt: D,
      Wt: ne,
      Jt: X(E, D)
    }
  }, pe];
}, ya = (t, e, n, a) => (s, c, i) => {
  const { ht: d, ot: l, nt: u, gt: f, Kt: _, Ot: p } = e, { Tt: m, Ut: h, Pt: y } = s, [w, M] = ft(333), [B, R] = ft(444), x = (P) => {
    Be(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: P.x,
      top: P.y
    });
  }, D = () => {
    const P = "pointerup pointercancel lostpointercapture", V = `client${i ? "X" : "Y"}`, S = i ? dn : un, $ = i ? "left" : "top", E = i ? "w" : "h", A = i ? "x" : "y", H = (N, U) => (ee) => {
      const { Rt: se } = n, ne = ht(h)[E] - ht(y)[E], O = U * ee / ne * se[A];
      qe(f, {
        [A]: N + O
      });
    }, k = [];
    return _e(h, "pointerdown", (N) => {
      const U = mt(N.target, `.${os}`) === y, ee = U ? y : h, se = t.scrollbars, ne = se[U ? "dragScroll" : "clickScroll"], { button: pe, isPrimary: O, pointerType: F } = N, { pointers: I } = se;
      if (pe === 0 && O && ne && (I || []).includes(F)) {
        Oe(k), R();
        const T = !U && (N.shiftKey || ne === "instant"), K = X($n, y), G = X($n, h), Y = (fe, $e) => (fe || K())[$] - ($e || G())[$], te = An($n(f)[S]) / ht(f)[E] || 1, ie = H(Le(f)[A], 1 / te), be = N[V], ve = K(), Se = G(), J = ve[S], Ce = Y(ve, Se) + J / 2, Ae = be - Se[$], ye = U ? 0 : Ae - Ce, Ee = (fe) => {
          Oe(ce), ee.releasePointerCapture(fe.pointerId);
        }, he = U || T, we = p(), ce = [_e(_, P, Ee), _e(_, "selectstart", (fe) => Hn(fe), {
          H: !1
        }), _e(h, P, Ee), he && _e(h, "pointermove", (fe) => ie(ye + (fe[V] - be))), he && (() => {
          const fe = Le(f);
          we();
          const $e = Le(f), Te = {
            x: $e.x - fe.x,
            y: $e.y - fe.y
          };
          (Jt(Te.x) > 3 || Jt(Te.y) > 3) && (p(), qe(f, fe), x(Te), B(we));
        })];
        if (ee.setPointerCapture(N.pointerId), T)
          ie(ye);
        else if (!U) {
          const fe = Ot(ha);
          if (fe) {
            const $e = fe(ie, ye, J, (Te) => {
              Te ? we() : me(ce, we);
            });
            me(ce, $e), me(k, X($e, !0));
          }
        }
      }
    });
  };
  let L = !0;
  return X(Oe, [_e(y, "pointermove pointerleave", a), _e(m, "pointerenter", () => {
    c(Es, !0);
  }), _e(m, "pointerleave pointercancel", () => {
    c(Es, !1);
  }), !u && _e(m, "mousedown", () => {
    const P = Rn();
    (ms(P, Je) || ms(P, ot) || P === document.body) && Zt(X(In, l), 25);
  }), _e(m, "wheel", (P) => {
    const { deltaX: V, deltaY: S, deltaMode: $ } = P;
    L && $ === 0 && Dt(m) === d && x({
      x: V,
      y: S
    }), L = !1, c(Ms, !0), w(() => {
      L = !0, c(Ms);
    }), Hn(P);
  }, {
    H: !1,
    I: !0
  }), _e(m, "pointerdown", X(_e, _, "click", fo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), D(), M, R]);
}, $a = (t, e, n, a, s, c) => {
  let i, d, l, u, f, _ = dt, p = 0;
  const m = (O) => O.pointerType === "mouse", [h, y] = ft(), [w, M] = ft(100), [B, R] = ft(100), [x, D] = ft(() => p), [L, P] = wa(t, s, a, ya(e, s, a, (O) => m(O) && ee())), { ht: V, Qt: S, wt: $ } = s, { jt: E, Nt: A, qt: H, Bt: k, Ft: N } = L, U = (O, F) => {
    if (D(), O)
      E(Ts);
    else {
      const I = X(E, Ts, !0);
      p > 0 && !F ? x(I) : I();
    }
  }, ee = () => {
    (l ? !i : !u) && (U(!0), w(() => {
      U(!1);
    }));
  }, se = (O) => {
    E(qn, O, !0), E(qn, O, !1);
  }, ne = (O) => {
    m(O) && (i = l, l && U(!0));
  }, pe = [D, M, R, y, () => _(), _e(V, "pointerover", ne, {
    A: !0
  }), _e(V, "pointerenter", ne), _e(V, "pointerleave", (O) => {
    m(O) && (i = !1, l && U(!1));
  }), _e(V, "pointermove", (O) => {
    m(O) && d && ee();
  }), _e(S, "scroll", (O) => {
    h(() => {
      H(), ee();
    }), c(O), N();
  })];
  return [() => X(Oe, me(pe, P())), ({ It: O, Dt: F, Zt: I, tn: j }) => {
    const { nn: T, sn: K, en: G, cn: Y } = j || {}, { Ct: te, dt: ie } = I || {}, { ct: be } = n, { k: ve } = Ge(), { K: Se, rn: J } = a, [Ce, Ae] = O("showNativeOverlaidScrollbars"), [ye, Ee] = O("scrollbars.theme"), [he, we] = O("scrollbars.visibility"), [ce, fe] = O("scrollbars.autoHide"), [$e, Te] = O("scrollbars.autoHideSuspend"), [St] = O("scrollbars.autoHideDelay"), [Rt, Ft] = O("scrollbars.dragScroll"), [Bt, lt] = O("scrollbars.clickScroll"), [_t, pn] = O("overflow"), hn = ie && !F, gn = J.x || J.y, bn = T || K || Y || te || F, Ie = G || we || pn, wn = Ce && ve.x && ve.y, Ct = (Et, et, Ht) => {
      const At = Et.includes(gt) && (he === nt || he === "auto" && et === gt);
      return E(ea, At, Ht), At;
    };
    if (p = St, hn && ($e && gn ? (se(!1), _(), B(() => {
      _ = _e(S, "scroll", X(se, !0), {
        A: !0
      });
    })) : se(!0)), Ae && E(Xr, wn), Ee && (E(f), E(ye, !0), f = ye), Te && !$e && se(!0), fe && (d = ce === "move", l = ce === "leave", u = ce === "never", U(u, !0)), Ft && E(sa, Rt), lt && E(na, !!Bt), Ie) {
      const Et = Ct(_t.x, Se.x, !0), et = Ct(_t.y, Se.y, !1);
      E(ta, !(Et && et));
    }
    bn && (H(), A(), N(), Y && k(), E(As, !J.x, !0), E(As, !J.y, !1), E(Jr, be && !$));
  }, {}, L];
}, ka = (t) => {
  const e = Ge(), { U: n, R: a } = e, { elements: s } = n(), { padding: c, viewport: i, content: d } = s, l = nn(t), u = l ? {} : t, { elements: f } = u, { padding: _, viewport: p, content: m } = f || {}, h = l ? t : u.target, y = ao(h), w = h.ownerDocument, M = w.documentElement, B = () => w.defaultView || Me, R = X(la, [h]), x = X($o, [h]), D = X(pt, ""), L = X(R, D, i), P = X(x, D, d), V = (J) => {
    const Ce = ht(J), Ae = on(J), ye = Ze(J, Xs), Ee = Ze(J, Js);
    return Ae.w - Ce.w > 0 && !wt(ye) || Ae.h - Ce.h > 0 && !wt(Ee);
  }, S = L(p), $ = S === h, E = $ && y, A = !$ && P(m), H = !$ && S === A, k = E ? M : S, N = E ? k : h, U = !$ && x(D, c, _), ee = !H && A, se = [ee, k, U, N].map((J) => nn(J) && !Dt(J) && J), ne = (J) => J && qs(se, J), pe = !ne(k) && V(k) ? k : h, O = E ? M : k, I = {
    vt: h,
    ht: N,
    ot: k,
    ln: U,
    bt: ee,
    gt: O,
    Qt: E ? w : k,
    an: y ? M : pe,
    Kt: w,
    wt: y,
    Mt: l,
    nt: $,
    un: B,
    yt: (J) => es(k, Je, J),
    St: (J, Ce) => sn(k, Je, J, Ce),
    Ot: () => sn(O, Je, jr, !0)
  }, { vt: j, ht: T, ln: K, ot: G, bt: Y } = I, te = [() => {
    Ne(T, [ot, kn]), Ne(j, kn), y && Ne(M, [kn, ot]);
  }];
  let ie = On([Y, G, K, T, j].find((J) => J && !ne(J)));
  const be = E ? j : Y || G, ve = X(Oe, te);
  return [I, () => {
    const J = B(), Ce = Rn(), Ae = (ce) => {
      Ve(Dt(ce), On(ce)), bt(ce);
    }, ye = (ce) => _e(ce, "focusin focusout focus blur", fo, {
      I: !0,
      H: !1
    }), Ee = "tabindex", he = Zn(G, Ee), we = ye(Ce);
    return Xe(T, ot, $ ? "" : Ur), Xe(K, Un, ""), Xe(G, Je, ""), Xe(Y, Cs, ""), $ || (Xe(G, Ee, he || "-1"), y && Xe(M, Ss, "")), Ve(be, ie), Ve(T, K), Ve(K || T, !$ && G), Ve(G, Y), me(te, [we, () => {
      const ce = Rn(), fe = ne(G), $e = fe && ce === G ? j : ce, Te = ye($e);
      Ne(K, Un), Ne(Y, Cs), Ne(G, Je), y && Ne(M, Ss), he ? Xe(G, Ee, he) : Ne(G, Ee), ne(Y) && Ae(Y), fe && Ae(G), ne(K) && Ae(K), In($e), Te();
    }]), a && !$ && (Qn(G, Je, go), me(te, X(Ne, G, Je))), In(!$ && y && Ce === j && J.top === J ? G : Ce), we(), ie = 0, ve;
  }, ve];
}, xa = ({ bt: t }) => ({ Zt: e, _n: n, Dt: a }) => {
  const { xt: s } = e || {}, { $t: c } = n;
  t && (s || a) && Vt(t, {
    [un]: c && "100%"
  });
}, Sa = ({ ht: t, ln: e, ot: n, nt: a }, s) => {
  const [c, i] = De({
    i: Dr,
    o: hs()
  }, X(hs, t, "padding", ""));
  return ({ It: d, Zt: l, _n: u, Dt: f }) => {
    let [_, p] = i(f);
    const { R: m } = Ge(), { ft: h, Ht: y, Ct: w } = l || {}, { ct: M } = u, [B, R] = d("paddingAbsolute");
    (h || p || (f || y)) && ([_, p] = c(f));
    const D = !a && (R || w || p);
    if (D) {
      const L = !B || !e && !m, P = _.r + _.l, V = _.t + _.b, S = {
        [Ws]: L && !M ? -P : 0,
        [Ys]: L ? -V : 0,
        [Ks]: L && M ? -P : 0,
        top: L ? -_.t : 0,
        right: L ? M ? -_.r : "auto" : 0,
        left: L ? M ? "auto" : -_.l : 0,
        [dn]: L && `calc(100% + ${P}px)`
      }, $ = {
        [zs]: L ? _.t : 0,
        [Ps]: L ? _.r : 0,
        [Gs]: L ? _.b : 0,
        [js]: L ? _.l : 0
      };
      Vt(e || n, S), Vt(n, $), oe(s, {
        ln: _,
        dn: !L,
        rt: e ? $ : oe({}, S, $)
      });
    }
    return {
      fn: D
    };
  };
}, Ca = (t, e) => {
  const n = Ge(), { ht: a, ln: s, ot: c, nt: i, Qt: d, gt: l, wt: u, St: f, un: _ } = t, { R: p } = n, m = u && i, h = X(Ns, 0), y = {
    display: () => !1,
    direction: (F) => F !== "ltr",
    flexDirection: (F) => F.endsWith("-reverse"),
    writingMode: (F) => F !== "horizontal-tb"
  }, w = He(y), M = {
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, B = {
    i: Wt,
    o: {}
  }, R = (F) => {
    f(ho, !m && F);
  }, x = (F) => {
    if (!w.some((be) => {
      const ve = F[be];
      return ve && y[be](ve);
    }))
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    R(!0);
    const j = Le(l), T = f(Gr, !0), K = _e(d, gt, (be) => {
      const ve = Le(l);
      be.isTrusted && ve.x === j.x && ve.y === j.y && vo(be);
    }, {
      I: !0,
      A: !0
    });
    qe(l, {
      x: 0,
      y: 0
    }), T();
    const G = Le(l), Y = on(l);
    qe(l, {
      x: Y.w,
      y: Y.h
    });
    const te = Le(l);
    qe(l, {
      x: te.x - G.x < 1 && -Y.w,
      y: te.y - G.y < 1 && -Y.h
    });
    const ie = Le(l);
    return qe(l, j), Gn(() => K()), {
      D: G,
      M: ie
    };
  }, D = (F, I) => {
    const j = Me.devicePixelRatio % 1 !== 0 ? 1 : 0, T = {
      w: h(F.w - I.w),
      h: h(F.h - I.h)
    };
    return {
      w: T.w > j ? T.w : 0,
      h: T.h > j ? T.h : 0
    };
  }, [L, P] = De(M, X(ns, c)), [V, S] = De(M, X(on, c)), [$, E] = De(M), [A] = De(B), [H, k] = De(M), [N] = De(B), [U] = De({
    i: (F, I) => _n(F, I, w),
    o: {}
  }, () => Hr(c) ? Ze(c, w) : {}), [ee, se] = De({
    i: (F, I) => Wt(F.D, I.D) && Wt(F.M, I.M),
    o: mo()
  }), ne = Ot(Eo), pe = (F, I) => `${I ? qr : zr}${Mr(F)}`, O = (F) => {
    const I = (T) => [nt, it, gt].map((K) => pe(K, T)), j = I(!0).concat(I()).join(" ");
    f(j), f(He(F).map((T) => pe(F[T], T === "x")).join(" "), !0);
  };
  return ({ It: F, Zt: I, _n: j, Dt: T }, { fn: K }) => {
    const { ft: G, Ht: Y, Ct: te, dt: ie, zt: be } = I || {}, ve = ne && ne.tt(t, e, j, n, F), { it: Se, ut: J, _t: Ce } = ve || {}, [Ae, ye] = ma(F, n), [Ee, he] = F("overflow"), we = wt(Ee.x), ce = wt(Ee.y), fe = !0;
    let $e = P(T), Te = S(T), St = E(T), Rt = k(T);
    ye && p && f(go, !Ae);
    {
      es(a, ot, Xt) && R(!0);
      const [ds] = J ? J() : [], [It] = $e = L(T), [Nt] = Te = V(T), Ut = uo(c), qt = m && Br(_()), Qo = {
        w: h(Nt.w + It.w),
        h: h(Nt.h + It.h)
      }, us = {
        w: h((qt ? qt.w : Ut.w + h(Ut.w - Nt.w)) + It.w),
        h: h((qt ? qt.h : Ut.h + h(Ut.h - Nt.h)) + It.h)
      };
      ds && ds(), Rt = H(us), St = $(D(Qo, us), T);
    }
    const [Ft, Bt] = Rt, [lt, _t] = St, [pn, hn] = Te, [gn, bn] = $e, [Ie, wn] = A({
      x: lt.w > 0,
      y: lt.h > 0
    }), Ct = we && ce && (Ie.x || Ie.y) || we && Ie.x && !Ie.y || ce && Ie.y && !Ie.x, Et = K || te || be || bn || hn || Bt || _t || he || ye || fe, et = pa(Ie, Ee), [Ht, At] = N(et.K), [Yo, Xo] = U(T), cs = te || ie || Xo || wn || T, [Jo, Zo] = cs ? ee(x(Yo), T) : se();
    return Et && (At && O(et.K), Ce && Se && Vt(c, Ce(et, j, Se(et, pn, gn)))), R(!1), sn(a, ot, Xt, Ct), sn(s, Un, Xt, Ct), oe(e, {
      K: Ht,
      Vt: {
        x: Ft.w,
        y: Ft.h
      },
      Rt: {
        x: lt.w,
        y: lt.h
      },
      rn: Ie,
      Lt: Ir(Jo, lt)
    }), {
      en: At,
      nn: Bt,
      sn: _t,
      cn: Zo || _t,
      vn: cs
    };
  };
}, Ea = (t) => {
  const [e, n, a] = ka(t), s = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    rt: {
      [Ws]: 0,
      [Ys]: 0,
      [Ks]: 0,
      [zs]: 0,
      [Ps]: 0,
      [Gs]: 0,
      [js]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    K: {
      x: it,
      y: it
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: mo()
  }, { vt: c, gt: i, nt: d, Ot: l } = e, { R: u, k: f } = Ge(), _ = !u && (f.x || f.y), p = [xa(e), Sa(e, s), Ca(e, s)];
  return [n, (m) => {
    const h = {}, w = _ && Le(i), M = w && l();
    return le(p, (B) => {
      oe(h, B(m, h) || {});
    }), qe(i, w), M && M(), !d && qe(c, 0), h;
  }, s, e, a];
}, Aa = (t, e, n, a, s) => {
  let c = !1;
  const i = xs(e, {}), [d, l, u, f, _] = Ea(t), [p, m, h] = ba(f, u, i, (x) => {
    R({}, x);
  }), [y, w, , M] = $a(t, e, h, u, f, s), B = (x) => He(x).some((D) => !!x[D]), R = (x, D) => {
    if (n())
      return !1;
    const { pn: L, Dt: P, At: V, hn: S } = x, $ = L || {}, E = !!P || !c, A = {
      It: xs(e, $, E),
      pn: $,
      Dt: E
    };
    if (S)
      return w(A), !1;
    const H = D || m(oe({}, A, {
      At: V
    })), k = l(oe({}, A, {
      _n: h,
      Zt: H
    }));
    w(oe({}, A, {
      Zt: H,
      tn: k
    }));
    const N = B(H), U = B(k), ee = N || U || !Jn($) || E;
    return c = !0, ee && a(x, {
      Zt: H,
      tn: k
    }), ee;
  };
  return [() => {
    const { an: x, gt: D, Ot: L } = f, P = Le(x), V = [p(), d(), y()], S = L();
    return qe(D, P), S(), X(Oe, V);
  }, R, () => ({
    gn: h,
    bn: u
  }), {
    wn: f,
    yn: M
  }, _];
}, je = (t, e, n) => {
  const { N: a } = Ge(), s = nn(t), c = s ? t : t.target, i = ko(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, f = ($) => {
      const E = eo($), A = Ot(va);
      return A ? A(E, !0) : E;
    }, _ = oe({}, a(), f(e)), [p, m, h] = Nn(), [y, w, M] = Nn(n), B = ($, E) => {
      M($, E), h($, E);
    }, [R, x, D, L, P] = Aa(t, _, () => d, ({ pn: $, Dt: E }, { Zt: A, tn: H }) => {
      const { ft: k, Ct: N, xt: U, Ht: ee, Et: se, dt: ne } = A, { nn: pe, sn: O, en: F, cn: I } = H;
      B("updated", [S, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!N,
          heightIntrinsicChanged: !!U,
          overflowEdgeChanged: !!pe,
          overflowAmountChanged: !!O,
          overflowStyleChanged: !!F,
          scrollCoordinatesChanged: !!I,
          contentMutation: !!ee,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: $ || {},
        force: !!E
      }]);
    }, ($) => B("scroll", [S, $])), V = ($) => {
      da(c), Oe(l), d = !0, B("destroyed", [S, $]), m(), w();
    }, S = {
      options($, E) {
        if ($) {
          const A = E ? a() : {}, H = po(_, oe(A, f($)));
          Jn(H) || (oe(_, H), x({
            pn: H
          }));
        }
        return oe({}, _);
      },
      on: y,
      off: ($, E) => {
        $ && E && w($, E);
      },
      state() {
        const { gn: $, bn: E } = D(), { ct: A } = $, { Vt: H, Rt: k, K: N, rn: U, ln: ee, dn: se, Lt: ne } = E;
        return oe({}, {
          overflowEdge: H,
          overflowAmount: k,
          overflowStyle: N,
          hasOverflow: U,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: ee,
          paddingAbsolute: se,
          directionRTL: A,
          destroyed: d
        });
      },
      elements() {
        const { vt: $, ht: E, ln: A, ot: H, bt: k, gt: N, Qt: U } = L.wn, { Xt: ee, Gt: se } = L.yn, ne = (O) => {
          const { Pt: F, Ut: I, Tt: j } = O;
          return {
            scrollbar: j,
            track: I,
            handle: F
          };
        }, pe = (O) => {
          const { Yt: F, Wt: I } = O, j = ne(F[0]);
          return oe({}, j, {
            clone: () => {
              const T = ne(I());
              return x({
                hn: !0
              }), T;
            }
          });
        };
        return oe({}, {
          target: $,
          host: E,
          padding: A || H,
          viewport: H,
          content: k || H,
          scrollOffsetElement: N,
          scrollEventElement: U,
          scrollbarHorizontal: pe(ee),
          scrollbarVertical: pe(se)
        });
      },
      update: ($) => x({
        Dt: $,
        At: !0
      }),
      destroy: X(V, !1),
      plugin: ($) => u[He($)[0]]
    };
    return me(l, [P]), ca(c, S), Co(xo, je, [S, p, u]), ia(L.wn.wt, !s && t.cancel) ? (V(!0), S) : (me(l, R()), B("initialized", [S]), S.update(), S);
  }
  return i;
};
je.plugin = (t) => {
  const e = Pe(t), n = e ? t : [t], a = n.map((s) => Co(s, je)[0]);
  return _a(n), e ? a : a[0];
};
je.valid = (t) => {
  const e = t && t.elements, n = Be(e) && e();
  return tn(n) && !!ko(n.target);
};
je.env = () => {
  const { T: t, k: e, R: n, V: a, B: s, F: c, U: i, P: d, N: l, q: u } = Ge();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: a,
    staticDefaultInitialization: s,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
je.nonce = ra;
function Ta() {
  let t;
  const e = C(null), n = Math.floor(Math.random() * 2 ** 32), a = C(!1), s = C([]), c = () => s.value, i = () => t.getSelection(), d = () => s.value.length, l = () => t.clearSelection(!0), u = C(), f = C(null), _ = C(null), p = C(null), m = C(null);
  function h() {
    t = new ur({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: D, event: L, isDragging: P }) => {
      if (P)
        t.Interaction._reset(L);
      else {
        a.value = !1;
        const V = e.value.offsetWidth - L.offsetX, S = e.value.offsetHeight - L.offsetY;
        V < 15 && S < 15 && t.Interaction._reset(L), L.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(L);
      }
    }), document.addEventListener("dragleave", (D) => {
      !D.buttons && a.value && (a.value = !1);
    });
  }
  const y = () => ct(() => {
    t.addSelection(
      t.getSelectables()
    ), w();
  }), w = () => {
    s.value = t.getSelection().map((D) => JSON.parse(D.dataset.item)), u.value(s.value);
  }, M = () => ct(() => {
    const D = c().map((L) => L.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((L) => D.includes(JSON.parse(L.dataset.item).path))
    ), w(), R();
  }), B = (D) => {
    u.value = D, t.subscribe("DS:end", ({ items: L, event: P, isDragging: V }) => {
      s.value = L.map((S) => JSON.parse(S.dataset.item)), D(L.map((S) => JSON.parse(S.dataset.item)));
    });
  }, R = () => {
    f.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (_.value.style.height = e.value.scrollHeight + "px", _.value.style.display = "block") : (_.value.style.height = "100%", _.value.style.display = "none"));
  }, x = (D) => {
    if (!f.value)
      return;
    const { scrollOffsetElement: L } = f.value.elements();
    L.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return xe(() => {
    je(p.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: je
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (D) => {
        f.value = D;
      },
      scroll: (D, L) => {
        const { scrollOffsetElement: P } = D.elements();
        e.value.scrollTo({
          top: P.scrollTop,
          left: 0
        });
      }
    }), h(), R(), m.value = new ResizeObserver(R), m.value.observe(e.value), e.value.addEventListener("scroll", x), t.subscribe("DS:scroll", ({ isDragging: D }) => D || x());
  }), jn(() => {
    t && t.stop(), m.value && m.value.disconnect();
  }), Os(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: a,
    scrollBar: _,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: i,
    selectAll: y,
    clearSelection: l,
    refreshSelection: M,
    getCount: d,
    onSelect: B
  };
}
function Ma(t, e) {
  const n = C(t), a = C(e), s = C([]), c = C([]), i = C([]), d = C(!1), l = C(5);
  let u = !1, f = !1;
  const _ = yt({
    adapter: n,
    storages: [],
    dirname: a,
    files: []
  });
  function p() {
    let B = [], R = [], x = a.value ?? n.value + "://";
    x.length === 0 && (s.value = []), x.replace(n.value + "://", "").split("/").forEach(function(P) {
      B.push(P), B.join("/") !== "" && R.push({
        basename: P,
        name: P,
        path: n.value + "://" + B.join("/"),
        type: "dir"
      });
    }), c.value = R;
    const [D, L] = h(R, l.value);
    i.value = L, s.value = D;
  }
  function m(B) {
    l.value = B, p();
  }
  function h(B, R) {
    return B.length > R ? [B.slice(-R), B.slice(0, -R)] : [B, []];
  }
  function y(B = null) {
    d.value = B ?? !d.value;
  }
  function w() {
    return s.value && s.value.length && !f;
  }
  const M = rt(() => {
    var B;
    return ((B = s.value[s.value.length - 2]) == null ? void 0 : B.path) ?? n.value + "://";
  });
  return xe(() => {
  }), Fe(a, p), xe(p), {
    adapter: n,
    path: a,
    loading: u,
    searchMode: f,
    data: _,
    breadcrumbs: s,
    breadcrumbItems: c,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: w,
    parentFolderPath: M
  };
}
const Da = (t, e) => {
  const n = br(t.id), a = dr(), s = n.getStore("metricUnits", !1), c = Sr(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = n.getStore("adapter"), u = (p) => Array.isArray(p) ? p : $r, f = n.getStore("persist-path", t.persist), _ = f ? n.getStore("path", t.path) : t.path;
  return yt({
    /** 
    * Core properties
    * */
    // app version
    version: kr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: a,
    // storage
    storage: n,
    // localization object
    i18n: yr(n, d, a, i),
    // modal state
    modal: Cr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: rt(() => Ta()),
    // http object
    requester: gr(t.request),
    // active features
    features: u(t.features),
    // view state
    view: n.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: n.getStore("full-screen", t.fullScreen),
    // show tree view
    showTreeView: n.getStore("show-tree-view", t.showTreeView),
    // pinnedFolders
    pinnedFolders: n.getStore("pinned-folders", t.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: t.selectButton,
    // max file size
    maxFileSize: t.maxFileSize,
    /**
    * Settings
    * */
    // theme state
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Is : Hs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: f,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Ma(l, _)
  });
}, Va = /* @__PURE__ */ r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1), La = { class: "vuefinder__modal-layout__container" }, Oa = { class: "vuefinder__modal-layout__content" }, Ra = { class: "vuefinder__modal-layout__footer" }, Ke = {
  __name: "ModalLayout",
  setup(t) {
    const e = C(null), n = re("ServiceContainer");
    return xe(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus(), ct(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (a, s) => (v(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = $t((c) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Va,
      r("div", La, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = st((c) => o(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", Oa, [
              Tt(a.$slots, "default")
            ]),
            r("div", Ra, [
              Tt(a.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Fa = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [a, s] of e)
    n[a] = s;
  return n;
}, Ba = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const a = re("ServiceContainer"), s = C(!1), { t: c } = a.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return xe(() => {
      a.emitter.on(t.on, d);
    }), jn(() => {
      clearTimeout(i);
    }), {
      shown: s,
      t: c
    };
  }
}, Ha = { key: 1 };
function Ia(t, e, n, a, s, c) {
  return v(), g("div", {
    class: ae(["vuefinder__action-message", { "vuefinder__action-message--hidden": !a.shown }])
  }, [
    t.$slots.default ? Tt(t.$slots, "default", { key: 0 }) : (v(), g("span", Ha, b(a.t("Saved.")), 1))
  ], 2);
}
const vt = /* @__PURE__ */ Fa(Ba, [["render", Ia]]), Na = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Ua = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
}, null, -1), qa = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
}, null, -1), za = [
  Ua,
  qa
];
function Pa(t, e) {
  return v(), g("svg", Na, [...za]);
}
const ja = { render: Pa }, Ga = { class: "vuefinder__modal-header" }, Ka = { class: "vuefinder__modal-header__icon-container" }, Wa = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Qe = {
  __name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: !0
    },
    icon: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    return (e, n) => (v(), g("div", Ga, [
      r("div", Ka, [
        (v(), W(Rs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", Wa, b(t.title), 1)
    ]));
  }
}, Ya = { class: "vuefinder__about-modal__content" }, Xa = { class: "vuefinder__about-modal__main" }, Ja = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Za = ["onClick", "aria-current"], Qa = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, el = { class: "vuefinder__about-modal__description" }, tl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, nl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, sl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, ol = { class: "vuefinder__about-modal__description" }, rl = { class: "vuefinder__about-modal__settings" }, al = { class: "vuefinder__about-modal__setting flex" }, ll = { class: "vuefinder__about-modal__setting-input" }, il = { class: "vuefinder__about-modal__setting-label" }, cl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, dl = { class: "vuefinder__about-modal__setting flex" }, ul = { class: "vuefinder__about-modal__setting-input" }, _l = { class: "vuefinder__about-modal__setting-label" }, vl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, fl = { class: "vuefinder__about-modal__setting flex" }, ml = { class: "vuefinder__about-modal__setting-input" }, pl = { class: "vuefinder__about-modal__setting-label" }, hl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, gl = { class: "vuefinder__about-modal__setting flex" }, bl = { class: "vuefinder__about-modal__setting-input" }, wl = { class: "vuefinder__about-modal__setting-label" }, yl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, $l = { class: "vuefinder__about-modal__setting" }, kl = { class: "vuefinder__about-modal__setting-input" }, xl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Sl = { class: "vuefinder__about-modal__setting-label" }, Cl = ["label"], El = ["value"], Al = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Tl = { class: "vuefinder__about-modal__setting-input" }, Ml = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Dl = { class: "vuefinder__about-modal__setting-label" }, Vl = ["label"], Ll = ["value"], Ol = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Rl = { class: "vuefinder__about-modal__shortcuts" }, Fl = { class: "vuefinder__about-modal__shortcut" }, Bl = /* @__PURE__ */ r("kbd", null, "F2", -1), Hl = { class: "vuefinder__about-modal__shortcut" }, Il = /* @__PURE__ */ r("kbd", null, "F5", -1), Nl = { class: "vuefinder__about-modal__shortcut" }, Ul = /* @__PURE__ */ r("kbd", null, "Del", -1), ql = { class: "vuefinder__about-modal__shortcut" }, zl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Esc")
], -1), Pl = { class: "vuefinder__about-modal__shortcut" }, jl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ Z(" + "),
  /* @__PURE__ */ r("kbd", null, "A")
], -1), Gl = { class: "vuefinder__about-modal__shortcut" }, Kl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ Z(" + "),
  /* @__PURE__ */ r("kbd", null, "F")
], -1), Wl = { class: "vuefinder__about-modal__shortcut" }, Yl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ Z(" + "),
  /* @__PURE__ */ r("kbd", null, "E")
], -1), Xl = { class: "vuefinder__about-modal__shortcut" }, Jl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ Z(" + "),
  /* @__PURE__ */ r("kbd", null, ",")
], -1), Zl = { class: "vuefinder__about-modal__shortcut" }, Ql = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ Z(" + "),
  /* @__PURE__ */ r("kbd", null, "Enter")
], -1), ei = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, ti = { class: "vuefinder__about-modal__description" }, To = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: a } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = rt(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = C("about"), l = async () => {
      a(), location.reload();
    }, u = (B) => {
      e.theme.set(B), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Is : Hs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), w = Object.fromEntries(
      Object.entries({
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([B]) => Object.keys(h).includes(B))
    ), M = rt(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (B, R) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: R[7] || (R[7] = (x) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: Q(() => [
        r("div", Ya, [
          z(Qe, {
            icon: o(ja),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          r("div", Xa, [
            r("div", null, [
              r("div", null, [
                r("nav", Ja, [
                  (v(!0), g(ge, null, ke(i.value, (x) => (v(), g("button", {
                    key: x.name,
                    onClick: (D) => d.value = x.key,
                    class: ae([x.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": x.current ? "page" : void 0
                  }, b(x.name), 11, Za))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (v(), g("div", Qa, [
              r("div", el, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", tl, b(o(s)("Project home")), 1),
              r("a", nl, b(o(s)("Follow on GitHub")), 1)
            ])) : q("", !0),
            d.value === c.SETTINGS ? (v(), g("div", sl, [
              r("div", ol, b(o(s)("Customize your experience with the following settings")), 1),
              r("div", rl, [
                r("fieldset", null, [
                  r("div", al, [
                    r("div", ll, [
                      ue(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": R[0] || (R[0] = (x) => o(e).metricUnits = x),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).metricUnits]
                      ])
                    ]),
                    r("div", il, [
                      r("label", cl, [
                        Z(b(o(s)("Use Metric Units")) + " ", 1),
                        z(vt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Q(() => [
                            Z(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", dl, [
                    r("div", ul, [
                      ue(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": R[1] || (R[1] = (x) => o(e).compactListView = x),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).compactListView]
                      ])
                    ]),
                    r("div", _l, [
                      r("label", vl, [
                        Z(b(o(s)("Compact list view")) + " ", 1),
                        z(vt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Q(() => [
                            Z(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", fl, [
                    r("div", ml, [
                      ue(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": R[2] || (R[2] = (x) => o(e).persist = x),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).persist]
                      ])
                    ]),
                    r("div", pl, [
                      r("label", hl, [
                        Z(b(o(s)("Persist path on reload")) + " ", 1),
                        z(vt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Q(() => [
                            Z(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", gl, [
                    r("div", bl, [
                      ue(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": R[3] || (R[3] = (x) => o(e).showThumbnails = x),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).showThumbnails]
                      ])
                    ]),
                    r("div", wl, [
                      r("label", yl, [
                        Z(b(o(s)("Show thumbnails")) + " ", 1),
                        z(vt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Q(() => [
                            Z(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", $l, [
                    r("div", kl, [
                      r("label", xl, b(o(s)("Theme")), 1)
                    ]),
                    r("div", Sl, [
                      ue(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": R[4] || (R[4] = (x) => o(e).theme.value = x),
                        onChange: R[5] || (R[5] = (x) => u(x.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (v(!0), g(ge, null, ke(M.value, (x, D) => (v(), g("option", { value: D }, b(x), 9, El))), 256))
                        ], 8, Cl)
                      ], 544), [
                        [En, o(e).theme.value]
                      ]),
                      z(vt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Q(() => [
                          Z(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(de).LANGUAGE) && Object.keys(o(w)).length > 1 ? (v(), g("div", Al, [
                    r("div", Tl, [
                      r("label", Ml, b(o(s)("Language")), 1)
                    ]),
                    r("div", Dl, [
                      ue(r("select", {
                        id: "language",
                        "onUpdate:modelValue": R[6] || (R[6] = (x) => o(e).i18n.locale = x),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (v(!0), g(ge, null, ke(o(w), (x, D) => (v(), g("option", { value: D }, b(x), 9, Ll))), 256))
                        ], 8, Vl)
                      ], 512), [
                        [En, o(e).i18n.locale]
                      ]),
                      z(vt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Q(() => [
                          Z(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : q("", !0)
                ])
              ])
            ])) : q("", !0),
            d.value === c.SHORTCUTS ? (v(), g("div", Ol, [
              r("div", Rl, [
                r("div", Fl, [
                  r("div", null, b(o(s)("Rename")), 1),
                  Bl
                ]),
                r("div", Hl, [
                  r("div", null, b(o(s)("Refresh")), 1),
                  Il
                ]),
                r("div", Nl, [
                  Z(b(o(s)("Delete")) + " ", 1),
                  Ul
                ]),
                r("div", ql, [
                  Z(b(o(s)("Escape")) + " ", 1),
                  zl
                ]),
                r("div", Pl, [
                  Z(b(o(s)("Select All")) + " ", 1),
                  jl
                ]),
                r("div", Gl, [
                  Z(b(o(s)("Search")) + " ", 1),
                  Kl
                ]),
                r("div", Wl, [
                  Z(b(o(s)("Toggle Sidebar")) + " ", 1),
                  Yl
                ]),
                r("div", Xl, [
                  Z(b(o(s)("Open Settings")) + " ", 1),
                  Jl
                ]),
                r("div", Zl, [
                  Z(b(o(s)("Toggle Full Screen")) + " ", 1),
                  Ql
                ])
              ])
            ])) : q("", !0),
            d.value === c.RESET ? (v(), g("div", ei, [
              r("div", ti, b(o(s)("Reset all settings to default")), 1),
              r("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(s)("Reset Settings")), 1)
            ])) : q("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ni = ["title"], si = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "vuefinder__message__icon"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), oi = [
  si
], We = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var u;
    const n = e, a = re("ServiceContainer"), { t: s } = a.i18n, c = C(!1), i = C(null), d = C((u = i.value) == null ? void 0 : u.strMessage);
    Fe(d, () => c.value = !1);
    const l = () => {
      n("hidden"), c.value = !0;
    };
    return (f, _) => (v(), g("div", null, [
      c.value ? q("", !0) : (v(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ae(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Tt(f.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: l,
          title: o(s)("Close")
        }, oi, 8, ni)
      ], 2))
    ]));
  }
}, ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ai = /* @__PURE__ */ r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), li = [
  ai
];
function ii(t, e) {
  return v(), g("svg", ri, [...li]);
}
const Mo = { render: ii }, ci = { class: "vuefinder__delete-modal__content" }, di = { class: "vuefinder__delete-modal__form" }, ui = { class: "vuefinder__delete-modal__description" }, _i = { class: "vuefinder__delete-modal__files vf-scrollbar" }, vi = { class: "vuefinder__delete-modal__file" }, fi = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), pi = [
  mi
], hi = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), bi = [
  gi
], wi = { class: "vuefinder__delete-modal__file-name" }, yi = { class: "vuefinder__delete-modal__warning" }, as = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = C(e.modal.data.items), s = C(""), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        r("div", yi, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Mo),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", ci, [
            r("div", di, [
              r("p", ui, b(o(n)("Are you sure you want to delete these files?")), 1),
              r("div", _i, [
                (v(!0), g(ge, null, ke(a.value, (l) => (v(), g("p", vi, [
                  l.type === "dir" ? (v(), g("svg", fi, pi)) : (v(), g("svg", hi, bi)),
                  r("span", wi, b(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ki = /* @__PURE__ */ r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), xi = [
  ki
];
function Si(t, e) {
  return v(), g("svg", $i, [...xi]);
}
const Do = { render: Si }, Ci = { class: "vuefinder__rename-modal__content" }, Ei = { class: "vuefinder__rename-modal__item" }, Ai = { class: "vuefinder__rename-modal__item-info" }, Ti = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Mi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Di = [
  Mi
], Vi = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Li = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Oi = [
  Li
], Ri = { class: "vuefinder__rename-modal__item-name" }, ls = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = C(e.modal.data.items[0]), s = C(e.modal.data.items[0].basename), c = C(""), i = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: a.value.path,
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (d) => {
          c.value = n(d.message);
        }
      });
    };
    return (d, l) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Do),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", Ci, [
            r("div", Ei, [
              r("p", Ai, [
                a.value.type === "dir" ? (v(), g("svg", Ti, Di)) : (v(), g("svg", Vi, Oi)),
                r("span", Ri, b(a.value.basename), 1)
              ]),
              ue(r("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => s.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [kt, s.value]
              ]),
              c.value.length ? (v(), W(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(b(c.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ye = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function Fi(t) {
  const e = (n) => {
    n.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ye.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ls, { items: t.dragSelect.getSelected() })), n.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(as, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ye.BACKSLASH && t.modal.open(To), n.metaKey && n.code === Ye.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ye.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  xe(() => {
    t.root.addEventListener("keydown", e);
  });
}
const Bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Hi = /* @__PURE__ */ r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Ii = [
  Hi
];
function Ni(t, e) {
  return v(), g("svg", Bi, [...Ii]);
}
const Vo = { render: Ni }, Ui = { class: "vuefinder__new-folder-modal__content" }, qi = { class: "vuefinder__new-folder-modal__form" }, zi = { class: "vuefinder__new-folder-modal__description" }, Pi = ["placeholder"], Lo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, a = C(""), s = C(""), c = () => {
      a.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Vo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Ui, [
            r("div", qi, [
              r("p", zi, b(o(n)("Create a new folder")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, Pi), [
                [kt, a.value]
              ]),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ji = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Gi = /* @__PURE__ */ r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Ki = [
  Gi
];
function Wi(t, e) {
  return v(), g("svg", ji, [...Ki]);
}
const Oo = { render: Wi }, Yi = { class: "vuefinder__new-file-modal__content" }, Xi = { class: "vuefinder__new-file-modal__form" }, Ji = { class: "vuefinder__new-file-modal__description" }, Zi = ["placeholder"], Qi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, a = C(""), s = C(""), c = () => {
      a.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Oo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Yi, [
            r("div", Xi, [
              r("p", Ji, b(o(n)("Create a new file")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Zi), [
                [kt, a.value]
              ]),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function zn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, tc = /* @__PURE__ */ r("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), nc = [
  tc
];
function sc(t, e) {
  return v(), g("svg", ec, [...nc]);
}
const Ro = { render: sc }, oc = { class: "vuefinder__upload-modal__content" }, rc = {
  key: 0,
  class: "pointer-events-none"
}, ac = {
  key: 1,
  class: "pointer-events-none"
}, lc = ["disabled"], ic = ["disabled"], cc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, dc = ["textContent"], uc = { class: "vuefinder__upload-modal__file-info" }, _c = { class: "vuefinder__upload-modal__file-name hidden md:block" }, vc = { class: "vuefinder__upload-modal__file-name md:hidden" }, fc = {
  key: 0,
  class: "ml-auto"
}, mc = ["title", "disabled", "onClick"], pc = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "vuefinder__upload-modal__file-remove-icon"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), hc = [
  pc
], gc = {
  key: 0,
  class: "py-2"
}, bc = ["disabled"], wc = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = C({ QUEUE_ENTRY_STATUS: s }), i = C(null), d = C(null), l = C(null), u = C(null), f = C(null), _ = C(null), p = C([]), m = C(""), h = C(!1), y = C(!1);
    let w;
    function M(A) {
      return p.value.findIndex((H) => H.id === A);
    }
    function B(A, H = null) {
      H = H ?? (A.webkitRelativePath || A.name), w.addFile({
        name: H,
        type: A.type,
        data: A,
        source: "Local"
      });
    }
    function R(A) {
      switch (A.status) {
        case s.DONE:
          return "text-green-600";
        case s.ERROR:
          return "text-red-600";
        case s.CANCELED:
          return "text-red-600";
        case s.PENDING:
        default:
          return "";
      }
    }
    const x = (A) => {
      switch (A.status) {
        case s.DONE:
          return "✓";
        case s.ERROR:
        case s.CANCELED:
          return "!";
        case s.PENDING:
        default:
          return "...";
      }
    };
    function D() {
      u.value.click();
    }
    function L() {
      if (!h.value) {
        if (!p.value.filter((A) => A.status !== s.DONE).length) {
          m.value = n("Please select file to upload first.");
          return;
        }
        m.value = "", w.retryAll(), w.upload();
      }
    }
    function P() {
      w.cancelAll({ reason: "user" }), p.value.forEach((A) => {
        A.status !== s.DONE && (A.status = s.CANCELED, A.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function V(A) {
      h.value || (w.removeFile(A.id, "removed-by-user"), p.value.splice(M(A.id), 1));
    }
    function S(A) {
      if (!h.value) {
        if (w.cancelAll({ reason: "user" }), A) {
          const H = [];
          p.value.forEach((k) => {
            k.status !== s.DONE && H.push(k);
          }), p.value = [], H.forEach((k) => {
            B(k.originalFile, k.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function $() {
      e.modal.close();
    }
    function E() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return xe(async () => {
      w = new _r({
        debug: e.debug,
        restrictions: {
          maxFileSize: xr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: a,
        onBeforeFileAdded(k, N) {
          if (N[k.id] != null) {
            const ee = M(k.id);
            p.value[ee].status === s.PENDING && (m.value = w.i18n("noDuplicates", { fileName: k.name })), p.value = p.value.filter((se) => se.id !== k.id);
          }
          return p.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), w.use(vr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, N) {
          let U;
          try {
            U = JSON.parse(k).message;
          } catch {
            U = n("Cannot parse server response.");
          }
          return new Error(U);
        }
      }), w.on("restriction-failed", (k, N) => {
        const U = p.value[M(k.id)];
        V(U), m.value = N.message;
      }), w.on("upload", () => {
        const k = E();
        w.setMeta({ ...k.body });
        const N = w.getPlugin("XHRUpload");
        N.opts.method = k.method, N.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), N.opts.headers = k.headers, delete k.headers["Content-Type"], h.value = !0, p.value.forEach((U) => {
          U.status !== s.DONE && (U.percent = null, U.status = s.UPLOADING, U.statusName = n("Pending upload"));
        });
      }), w.on("upload-progress", (k, N) => {
        const U = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        p.value[M(k.id)].percent = `${U}%`;
      }), w.on("upload-success", (k) => {
        const N = p.value[M(k.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), w.on("upload-error", (k, N) => {
        const U = p.value[M(k.id)];
        U.percent = null, U.status = s.ERROR, N.isNetworkError ? U.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : U.statusName = N ? N.message : n("Unknown Error");
      }), w.on("error", (k) => {
        m.value = k.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), w.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), f.value.addEventListener("click", () => {
        l.value.click();
      }), _.value.addEventListener("dragover", (k) => {
        k.preventDefault(), y.value = !0;
      }), _.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), y.value = !1;
      });
      function A(k, N) {
        N.isFile && N.file((U) => k(N, U)), N.isDirectory && N.createReader().readEntries((U) => {
          U.forEach((ee) => {
            A(k, ee);
          });
        });
      }
      _.value.addEventListener("drop", (k) => {
        k.preventDefault(), y.value = !1;
        const N = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((U) => {
          U.kind === "file" && A((ee, se) => {
            const ne = N.exec(ee.fullPath);
            B(se, ne[1]);
          }, U.webkitGetAsEntry());
        });
      });
      const H = ({ target: k }) => {
        const N = k.files;
        for (const U of N)
          B(U);
        k.value = "";
      };
      d.value.addEventListener("change", H), l.value.addEventListener("change", H);
    }), Fs(() => {
      w == null || w.close({ reason: "unmount" });
    }), (A, H) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: st(L, ["prevent"])
        }, b(o(n)("Upload")), 9, bc),
        h.value ? (v(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(P, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (v(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st($, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Ro),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          r("div", oc, [
            r("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: _,
              onClick: D
            }, [
              y.value ? (v(), g("div", rc, b(o(n)("Release to drop these files.")), 1)) : (v(), g("div", ac, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            r("div", {
              ref_key: "container",
              ref: i,
              class: "vuefinder__upload-modal__buttons"
            }, [
              r("button", {
                ref_key: "pickFiles",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Files")), 513),
              r("button", {
                ref_key: "pickFolders",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Folders")), 513),
              r("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: H[0] || (H[0] = (k) => S(!1))
              }, b(o(n)("Clear all")), 9, lc),
              r("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: H[1] || (H[1] = (k) => S(!0))
              }, b(o(n)("Clear only successful")), 9, ic)
            ], 512),
            r("div", cc, [
              (v(!0), g(ge, null, ke(p.value, (k) => (v(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: k.id
              }, [
                r("span", {
                  class: ae(["vuefinder__upload-modal__file-icon", R(k)])
                }, [
                  r("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(x(k))
                  }, null, 8, dc)
                ], 2),
                r("div", uc, [
                  r("div", _c, b(o(zn)(k.name, 40)) + " (" + b(k.size) + ")", 1),
                  r("div", vc, b(o(zn)(k.name, 16)) + " (" + b(k.size) + ")", 1),
                  r("div", {
                    class: ae(["vuefinder__upload-modal__file-status", R(k)])
                  }, [
                    Z(b(k.statusName) + " ", 1),
                    k.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (v(), g("b", fc, b(k.percent), 1)) : q("", !0)
                  ], 2)
                ]),
                r("button", {
                  type: "button",
                  class: ae(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: h.value,
                  onClick: (N) => V(k)
                }, hc, 10, mc)
              ]))), 128)),
              p.value.length ? q("", !0) : (v(), g("div", gc, b(o(n)("No files selected!")), 1))
            ]),
            m.value.length ? (v(), W(We, {
              key: 0,
              onHidden: H[2] || (H[2] = (k) => m.value = ""),
              error: ""
            }, {
              default: Q(() => [
                Z(b(m.value), 1)
              ]),
              _: 1
            })) : q("", !0)
          ])
        ]),
        r("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        r("input", {
          ref_key: "internalFolderInput",
          ref: l,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, $c = /* @__PURE__ */ r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), kc = [
  $c
];
function xc(t, e) {
  return v(), g("svg", yc, [...kc]);
}
const Fo = { render: xc }, Sc = { class: "vuefinder__unarchive-modal__content" }, Cc = { class: "vuefinder__unarchive-modal__items" }, Ec = { class: "vuefinder__unarchive-modal__item" }, Ac = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Mc = [
  Tc
], Dc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Lc = [
  Vc
], Oc = { class: "vuefinder__unarchive-modal__item-name" }, Rc = { class: "vuefinder__unarchive-modal__info" }, Bo = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = C(e.modal.data.items[0]), s = C(""), c = C([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: a.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, l) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Fo),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", Sc, [
            r("div", Cc, [
              (v(!0), g(ge, null, ke(c.value, (u) => (v(), g("p", Ec, [
                u.type === "dir" ? (v(), g("svg", Ac, Mc)) : (v(), g("svg", Dc, Lc)),
                r("span", Oc, b(u.basename), 1)
              ]))), 256)),
              r("p", Rc, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Bc = /* @__PURE__ */ r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Hc = [
  Bc
];
function Ic(t, e) {
  return v(), g("svg", Fc, [...Hc]);
}
const Ho = { render: Ic }, Nc = { class: "vuefinder__archive-modal__content" }, Uc = { class: "vuefinder__archive-modal__form" }, qc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, zc = { class: "vuefinder__archive-modal__file" }, Pc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Gc = [
  jc
], Kc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Yc = [
  Wc
], Xc = { class: "vuefinder__archive-modal__file-name" }, Jc = ["placeholder"], Io = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = C(""), s = C(""), c = C(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, l) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Ho),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", Nc, [
            r("div", Uc, [
              r("div", qc, [
                (v(!0), g(ge, null, ke(c.value, (u) => (v(), g("p", zc, [
                  u.type === "dir" ? (v(), g("svg", Pc, Gc)) : (v(), g("svg", Kc, Yc)),
                  r("span", Xc, b(u.basename), 1)
                ]))), 256))
              ]),
              ue(r("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => a.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Jc), [
                [kt, a.value]
              ]),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, Qc = /* @__PURE__ */ r("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), ed = /* @__PURE__ */ r("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), td = [
  Qc,
  ed
];
function nd(t, e) {
  return v(), g("svg", Zc, [...td]);
}
const is = { render: nd }, sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, od = /* @__PURE__ */ r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), rd = [
  od
];
function ad(t, e) {
  return v(), g("svg", sd, [...rd]);
}
const ld = { render: ad }, id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, cd = /* @__PURE__ */ r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), dd = [
  cd
];
function ud(t, e) {
  return v(), g("svg", id, [...dd]);
}
const _d = { render: ud }, vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, fd = /* @__PURE__ */ r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), md = [
  fd
];
function pd(t, e) {
  return v(), g("svg", vd, [...md]);
}
const hd = { render: pd }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, bd = /* @__PURE__ */ r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), wd = [
  bd
];
function yd(t, e) {
  return v(), g("svg", gd, [...wd]);
}
const $d = { render: yd }, kd = { class: "vuefinder__toolbar" }, xd = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Sd = ["title"], Cd = ["title"], Ed = ["title"], Ad = ["title"], Td = ["title"], Md = ["title"], Dd = ["title"], Vd = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ld = { class: "pl-2" }, Od = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Rd = { class: "vuefinder__toolbar__controls" }, Fd = ["title"], Bd = ["title"], Hd = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: a } = e.i18n, s = e.dragSelect, c = C("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Fe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (l, u) => (v(), g("div", kd, [
      c.value.length ? (v(), g("div", Vd, [
        r("div", Ld, [
          Z(b(o(a)("Search results for")) + " ", 1),
          r("span", Od, b(c.value), 1)
        ]),
        o(e).fs.loading ? (v(), W(o(is), { key: 0 })) : q("", !0)
      ])) : (v(), g("div", xd, [
        o(e).features.includes(o(de).NEW_FOLDER) ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(a)("New Folder"),
          onClick: u[0] || (u[0] = (f) => o(e).modal.open(Lo, { items: o(s).getSelected() }))
        }, [
          z(o(Vo))
        ], 8, Sd)) : q("", !0),
        o(e).features.includes(o(de).NEW_FILE) ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(a)("New File"),
          onClick: u[1] || (u[1] = (f) => o(e).modal.open(Qi, { items: o(s).getSelected() }))
        }, [
          z(o(Oo))
        ], 8, Cd)) : q("", !0),
        o(e).features.includes(o(de).RENAME) ? (v(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(a)("Rename"),
          onClick: u[2] || (u[2] = (f) => o(s).getCount() !== 1 || o(e).modal.open(ls, { items: o(s).getSelected() }))
        }, [
          z(o(Do), {
            class: ae(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ed)) : q("", !0),
        o(e).features.includes(o(de).DELETE) ? (v(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(a)("Delete"),
          onClick: u[3] || (u[3] = (f) => !o(s).getCount() || o(e).modal.open(as, { items: o(s).getSelected() }))
        }, [
          z(o(Mo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ad)) : q("", !0),
        o(e).features.includes(o(de).UPLOAD) ? (v(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(a)("Upload"),
          onClick: u[4] || (u[4] = (f) => o(e).modal.open(wc, { items: o(s).getSelected() }))
        }, [
          z(o(Ro))
        ], 8, Td)) : q("", !0),
        o(e).features.includes(o(de).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (v(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(a)("Unarchive"),
          onClick: u[5] || (u[5] = (f) => !o(s).getCount() || o(e).modal.open(Bo, { items: o(s).getSelected() }))
        }, [
          z(o(Fo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Md)) : q("", !0),
        o(e).features.includes(o(de).ARCHIVE) ? (v(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(a)("Archive"),
          onClick: u[6] || (u[6] = (f) => !o(s).getCount() || o(e).modal.open(Io, { items: o(s).getSelected() }))
        }, [
          z(o(Ho), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Dd)) : q("", !0)
      ])),
      r("div", Rd, [
        o(e).features.includes(o(de).FULL_SCREEN) ? (v(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: o(a)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (v(), W(o(_d), { key: 0 })) : (v(), W(o(ld), { key: 1 }))
        ], 8, Fd)) : q("", !0),
        r("div", {
          class: "mx-1.5",
          title: o(a)("Change View"),
          onClick: u[7] || (u[7] = (f) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (v(), W(o(hd), {
            key: 0,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0),
          o(e).view === "list" ? (v(), W(o($d), {
            key: 1,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0)
        ], 8, Bd)
      ])
    ]));
  }
}, Id = (t, e = 0, n = !1) => {
  let a;
  return (...s) => {
    n && !a && t(...s), clearTimeout(a), a = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Vs = (t, e, n) => {
  const a = C(t);
  return sr((s, c) => ({
    get() {
      return s(), a.value;
    },
    set: Id(
      (i) => {
        a.value = i, c();
      },
      e,
      n
    )
  }));
}, Nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Ud = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
}, null, -1), qd = [
  Ud
];
function zd(t, e) {
  return v(), g("svg", Nd, [...qd]);
}
const Pd = { render: zd }, jd = { class: "vuefinder__move-modal__content" }, Gd = { class: "vuefinder__move-modal__description" }, Kd = { class: "vuefinder__move-modal__files vf-scrollbar" }, Wd = { class: "vuefinder__move-modal__file" }, Yd = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Jd = [
  Xd
], Zd = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), eu = [
  Qd
], tu = { class: "vuefinder__move-modal__file-name" }, nu = { class: "vuefinder__move-modal__target-title" }, su = { class: "vuefinder__move-modal__target-directory" }, ou = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), ru = { class: "vuefinder__move-modal__target-path" }, au = { class: "vuefinder__move-modal__selected-items" }, Pn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = C(e.modal.data.items.from), s = C(""), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        r("div", au, b(o(n)("%s item(s) selected.", a.value.length)), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Pd),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", jd, [
            r("p", Gd, b(o(n)("Are you sure you want to move these files?")), 1),
            r("div", Kd, [
              (v(!0), g(ge, null, ke(a.value, (l) => (v(), g("div", Wd, [
                r("div", null, [
                  l.type === "dir" ? (v(), g("svg", Yd, Jd)) : (v(), g("svg", Zd, eu))
                ]),
                r("div", tu, b(l.path), 1)
              ]))), 256))
            ]),
            r("h4", nu, b(o(n)("Target Directory")), 1),
            r("p", su, [
              ou,
              r("span", ru, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (v(), W(We, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => s.value = ""),
              error: ""
            }, {
              default: Q(() => [
                Z(b(s.value), 1)
              ]),
              _: 1
            })) : q("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, lu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, iu = /* @__PURE__ */ r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), cu = [
  iu
];
function du(t, e) {
  return v(), g("svg", lu, [...cu]);
}
const uu = { render: du }, _u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, vu = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), fu = [
  vu
];
function mu(t, e) {
  return v(), g("svg", _u, [...fu]);
}
const pu = { render: mu }, hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, gu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), bu = [
  gu
];
function wu(t, e) {
  return v(), g("svg", hu, [...bu]);
}
const yu = { render: wu }, $u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, ku = /* @__PURE__ */ r("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), xu = [
  ku
];
function Su(t, e) {
  return v(), g("svg", $u, [...xu]);
}
const Cu = { render: Su }, Eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Au = /* @__PURE__ */ r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Tu = [
  Au
];
function Mu(t, e) {
  return v(), g("svg", Eu, [...Tu]);
}
const Du = { render: Mu }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Lu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Ou = [
  Lu
];
function Ru(t, e) {
  return v(), g("svg", Vu, [...Ou]);
}
const Fu = { render: Ru }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Hu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Iu = [
  Hu
];
function Nu(t, e) {
  return v(), g("svg", Bu, [...Iu]);
}
const mn = { render: Nu }, Uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, qu = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), zu = /* @__PURE__ */ r("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), Pu = [
  qu,
  zu
];
function ju(t, e) {
  return v(), g("svg", Uu, [...Pu]);
}
const Gu = { render: ju }, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, Wu = /* @__PURE__ */ r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Yu = [
  Wu
];
function Xu(t, e) {
  return v(), g("svg", Ku, [...Yu]);
}
const Ju = { render: Xu }, Zu = { class: "vuefinder__breadcrumb__container" }, Qu = ["title"], e_ = ["title"], t_ = ["title"], n_ = ["title"], s_ = { class: "vuefinder__breadcrumb__list" }, o_ = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, r_ = /* @__PURE__ */ r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1), a_ = { class: "relative" }, l_ = /* @__PURE__ */ r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1), i_ = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], c_ = { class: "vuefinder__breadcrumb__search-mode" }, d_ = ["placeholder"], u_ = { class: "vuefinder__breadcrumb__hidden-dropdown" }, __ = ["onDrop", "onClick"], v_ = { class: "vuefinder__breadcrumb__hidden-item-content" }, f_ = { class: "vuefinder__breadcrumb__hidden-item-text" }, m_ = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = e.dragSelect, { setStore: s } = e.storage, c = C(null), i = Vs(0, 100);
    Fe(i, (V) => {
      const S = c.value.children;
      let $ = 0, E = 0, A = 5, H = 1;
      e.fs.limitBreadcrumbItems(A), ct(() => {
        for (let k = S.length - 1; k >= 0 && !($ + S[k].offsetWidth > i.value - 40); k--)
          $ += parseInt(S[k].offsetWidth, 10), E++;
        E < H && (E = H), E > A && (E = A), e.fs.limitBreadcrumbItems(E);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    let l = C(null);
    xe(() => {
      l.value = new ResizeObserver(d), l.value.observe(c.value);
    }), jn(() => {
      l.value.disconnect();
    });
    const u = (V, S = null) => {
      V.preventDefault(), a.isDraggingRef.value = !1, p(V), S ?? (S = e.fs.hiddenBreadcrumbs.length - 1);
      let $ = JSON.parse(V.dataTransfer.getData("items"));
      if ($.find((E) => E.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: $,
          to: e.fs.hiddenBreadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (V, S = null) => {
      V.preventDefault(), a.isDraggingRef.value = !1, p(V), S ?? (S = e.fs.breadcrumbs.length - 2);
      let $ = JSON.parse(V.dataTransfer.getData("items"));
      if ($.find((E) => E.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: $,
          to: e.fs.breadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (V) => {
      V.preventDefault(), e.fs.isGoUpAvailable() ? (V.dataTransfer.dropEffect = "copy", V.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (V.dataTransfer.dropEffect = "none", V.dataTransfer.effectAllowed = "none");
    }, p = (V) => {
      V.preventDefault(), V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
      L(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      L(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, y = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: V.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, w = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, M = {
      mounted(V, S, $, E) {
        V.clickOutsideEvent = function(A) {
          V === A.target || V.contains(A.target) || S.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V, S, $, E) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, B = () => {
      e.showTreeView = !e.showTreeView;
    };
    Fe(() => e.showTreeView, (V, S) => {
      V !== S && s("show-tree-view", V);
    });
    const R = C(null), x = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => R.value.focus()));
    }, D = Vs("", 400);
    Fe(D, (V) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: V });
    }), Fe(() => e.fs.searchMode, (V) => {
      V && ct(() => R.value.focus());
    });
    const L = () => {
      e.fs.searchMode = !1, D.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      L();
    });
    const P = () => {
      D.value === "" && L();
    };
    return (V, S) => (v(), g("div", Zu, [
      r("span", {
        title: o(n)("Toggle Tree View")
      }, [
        z(o(Gu), {
          onClick: B,
          class: ae(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Qu),
      r("span", {
        title: o(n)("Go up a directory")
      }, [
        z(o(pu), {
          onDragover: S[0] || (S[0] = ($) => _($)),
          onDragleave: S[1] || (S[1] = ($) => p($)),
          onDrop: S[2] || (S[2] = ($) => f($)),
          onClick: h,
          class: ae(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, e_),
      o(e).fs.loading ? (v(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        z(o(yu), {
          onClick: S[3] || (S[3] = ($) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, n_)) : (v(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        z(o(uu), { onClick: m })
      ], 8, t_)),
      ue(r("div", {
        onClick: st(x, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          z(o(Cu), {
            onDragover: S[4] || (S[4] = ($) => _($)),
            onDragleave: S[5] || (S[5] = ($) => p($)),
            onDrop: S[6] || (S[6] = ($) => f($, -1)),
            onClick: S[7] || (S[7] = ($) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        r("div", s_, [
          o(e).fs.hiddenBreadcrumbs.length ? ue((v(), g("div", o_, [
            r_,
            r("div", a_, [
              r("span", {
                onDragenter: S[8] || (S[8] = ($) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: S[9] || (S[9] = ($) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                z(o(Ju), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [M, w]
          ]) : q("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: st(x, ["self"])
        }, [
          (v(!0), g(ge, null, ke(o(e).fs.breadcrumbs, ($, E) => (v(), g("div", { key: E }, [
            l_,
            r("span", {
              onDragover: (A) => E === o(e).fs.breadcrumbs.length - 1 || _(A),
              onDragleave: (A) => E === o(e).fs.breadcrumbs.length - 1 || p(A),
              onDrop: (A) => E === o(e).fs.breadcrumbs.length - 1 || f(A, E),
              class: "vuefinder__breadcrumb__item",
              title: $.basename,
              onClick: (A) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: $.path } })
            }, b($.name), 41, i_)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (v(), W(o(is), { key: 0 })) : q("", !0)
      ], 512), [
        [Ue, !o(e).fs.searchMode]
      ]),
      ue(r("div", c_, [
        r("div", null, [
          z(o(Du))
        ]),
        ue(r("input", {
          ref_key: "searchInput",
          ref: R,
          onKeydown: $t(L, ["esc"]),
          onBlur: P,
          "onUpdate:modelValue": S[10] || (S[10] = ($) => or(D) ? D.value = $ : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, d_), [
          [kt, o(D)]
        ]),
        z(o(Fu), { onClick: L })
      ], 512), [
        [Ue, o(e).fs.searchMode]
      ]),
      ue(r("div", u_, [
        (v(!0), g(ge, null, ke(o(e).fs.hiddenBreadcrumbs, ($, E) => (v(), g("div", {
          key: E,
          onDragover: S[11] || (S[11] = (A) => _(A)),
          onDragleave: S[12] || (S[12] = (A) => p(A)),
          onDrop: (A) => u(A, E),
          onClick: (A) => y($),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", v_, [
            r("span", null, [
              z(o(mn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            Z(),
            r("span", f_, b($.name), 1)
          ])
        ], 40, __))), 128))
      ], 512), [
        [Ue, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, No = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), p_ = ["onClick"], h_ = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, a = C(n("full-screen", !1)), s = C([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      s.value.splice(l, 1);
    }, d = (l) => {
      let u = s.value.findIndex((f) => f.id === l);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, s.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (v(), g("div", {
      class: ae(["vuefinder__toast", a.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      z(rr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (v(!0), g(ge, null, ke(s.value, (f, _) => (v(), g("div", {
            key: _,
            onClick: (p) => i(_),
            class: ae(["vuefinder__toast__message", c(f.type)])
          }, b(f.label), 11, p_))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, g_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, b_ = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), w_ = [
  b_
];
function y_(t, e) {
  return v(), g("svg", g_, [...w_]);
}
const $_ = { render: y_ }, k_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, x_ = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), S_ = [
  x_
];
function C_(t, e) {
  return v(), g("svg", k_, [...S_]);
}
const E_ = { render: C_ }, Gt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (v(), g("div", null, [
      t.direction === "asc" ? (v(), W(o($_), { key: 0 })) : q("", !0),
      t.direction === "desc" ? (v(), W(o(E_), { key: 1 })) : q("", !0)
    ]));
  }
}, A_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, T_ = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), M_ = [
  T_
];
function D_(t, e) {
  return v(), g("svg", A_, [...M_]);
}
const V_ = { render: D_ }, L_ = { class: "vuefinder__item-icon" }, Sn = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    return (e, n) => (v(), g("span", L_, [
      t.type === "dir" ? (v(), W(o(mn), {
        key: 0,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (v(), W(o(V_), {
        key: 1,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, O_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, R_ = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), F_ = [
  R_
];
function B_(t, e) {
  return v(), g("svg", O_, [...F_]);
}
const H_ = { render: B_ }, I_ = { class: "vuefinder__drag-item__container" }, N_ = { class: "vuefinder__drag-item__count" }, U_ = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, a) => (v(), g("div", I_, [
      z(o(H_)),
      r("div", N_, b(e.count), 1)
    ]));
  }
}, q_ = { class: "vuefinder__text-preview" }, z_ = { class: "vuefinder__text-preview__header" }, P_ = ["title"], j_ = { class: "vuefinder__text-preview__actions" }, G_ = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, K_ = { key: 1 }, W_ = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = C(""), s = C(""), c = C(null), i = C(!1), d = C(""), l = C(!1), u = re("ServiceContainer"), { t: f } = u.i18n;
    xe(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        a.value = m, n("success");
      });
    });
    const _ = () => {
      i.value = !i.value, s.value = a.value;
    }, p = () => {
      d.value = "", l.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((m) => {
        d.value = f("Updated."), a.value = m, n("success"), i.value = !i.value;
      }).catch((m) => {
        d.value = f(m.message), l.value = !0;
      });
    };
    return (m, h) => (v(), g("div", q_, [
      r("div", z_, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, P_),
        r("div", j_, [
          i.value ? (v(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(f)("Save")), 1)) : q("", !0),
          o(u).features.includes(o(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (y) => _())
          }, b(i.value ? o(f)("Cancel") : o(f)("Edit")), 1)) : q("", !0)
        ])
      ]),
      r("div", null, [
        i.value ? (v(), g("div", K_, [
          ue(r("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": h[1] || (h[1] = (y) => s.value = y),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [kt, s.value]
          ])
        ])) : (v(), g("pre", G_, b(a.value), 1)),
        d.value.length ? (v(), W(We, {
          key: 2,
          onHidden: h[2] || (h[2] = (y) => d.value = ""),
          error: l.value
        }, {
          default: Q(() => [
            Z(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : q("", !0)
      ])
    ]));
  }
}, Y_ = { class: "vuefinder__image-preview" }, X_ = { class: "vuefinder__image-preview__header" }, J_ = ["title"], Z_ = { class: "vuefinder__image-preview__actions" }, Q_ = { class: "vuefinder__image-preview__image-container" }, ev = ["src"], tv = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = re("ServiceContainer"), { t: s } = a.i18n, c = C(null), i = C(null), d = C(!1), l = C(""), u = C(!1), f = C(""), _ = () => {
      d.value = !d.value, d.value ? i.value = new mr(c.value, {
        crop(h) {
        }
      }) : i.value.destroy();
    }, p = () => {
      a.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: a.modal.data.adapter, path: a.modal.data.item.path },
        responseType: "blob"
      }).then((h) => {
        f.value = URL.createObjectURL(h);
      }).catch((h) => {
        console.log("catch", h);
      });
    }, m = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          l.value = "", u.value = !1;
          const y = new FormData();
          y.set("file", h), a.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: a.modal.data.adapter,
              path: a.modal.data.item.path
            },
            body: y
          }).then((w) => {
            l.value = s("Updated."), c.value.src = f.value, _(), n("success");
          }).catch((w) => {
            l.value = s(w.message), u.value = !0;
          });
        }
      );
    };
    return xe(() => {
      p(), n("success");
    }), (h, y) => (v(), g("div", Y_, [
      r("div", X_, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(a).modal.data.item.path
        }, b(o(a).modal.data.item.basename), 9, J_),
        r("div", Z_, [
          d.value ? (v(), g("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : q("", !0),
          o(a).features.includes(o(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: y[0] || (y[0] = (w) => _())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : q("", !0)
        ])
      ]),
      r("div", Q_, [
        r("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: f.value,
          alt: ""
        }, null, 8, ev)
      ]),
      l.value.length ? (v(), W(We, {
        key: 0,
        onHidden: y[1] || (y[1] = (w) => l.value = ""),
        error: u.value
      }, {
        default: Q(() => [
          Z(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : q("", !0)
    ]));
  }
}, nv = { class: "vuefinder__default-preview" }, sv = { class: "vuefinder__default-preview__header" }, ov = ["title"], rv = /* @__PURE__ */ r("div", null, null, -1), av = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), a = e;
    return xe(() => {
      a("success");
    }), (s, c) => (v(), g("div", nv, [
      r("div", sv, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, ov)
      ]),
      rv
    ]));
  }
}, lv = { class: "vuefinder__video-preview" }, iv = ["title"], cv = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), a = e, s = C(""), c = C(null), i = () => {
      n.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: n.modal.data.adapter, path: n.modal.data.item.path },
        responseType: "blob"
      }).then((d) => {
        s.value = URL.createObjectURL(d), c.value.src = s.value;
      }).catch((d) => {
        console.log("catch", d);
      });
    };
    return xe(() => {
      i(), a("success");
    }), (d, l) => (v(), g("div", lv, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, iv),
      r("div", null, [
        r("video", {
          class: "vuefinder__video-preview__video",
          preload: "",
          controls: "",
          ref_key: "videoPlayer",
          ref: c
        }, " Your browser does not support the video tag. ", 512)
      ])
    ]));
  }
}, dv = { class: "vuefinder__audio-preview" }, uv = ["title"], _v = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = re("ServiceContainer"), s = C(""), c = C(null), i = () => {
      a.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: a.modal.data.adapter, path: a.modal.data.item.path },
        responseType: "blob"
      }).then((d) => {
        s.value = URL.createObjectURL(d), c.value.src = s.value;
      }).catch((d) => {
        console.log("catch", d);
      });
    };
    return xe(() => {
      i(), n("success");
    }), (d, l) => (v(), g("div", dv, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(a).modal.data.item.path
      }, b(o(a).modal.data.item.basename), 9, uv),
      r("div", null, [
        r("audio", {
          class: "vuefinder__audio-preview__audio",
          controls: "",
          ref_key: "audioPlayer",
          ref: c
        }, " Your browser does not support the audio element. ", 512)
      ])
    ]));
  }
}, vv = { class: "vuefinder__pdf-preview" }, fv = ["title"], mv = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), a = e, s = C(""), c = C({
      sidebar: {
        viewThumbnail: !0,
        viewOutline: !0,
        viewAttachments: !0
      },
      toolbar: {
        toolbarViewerRight: {
          presentationMode: !0,
          openFile: !1,
          print: !0,
          download: !0,
          viewBookmark: !1
        }
      }
    });
    function i(l) {
      return new Promise((u, f) => {
        const _ = new FileReader();
        _.onloadend = () => u(_.result), _.onerror = f, _.readAsArrayBuffer(l);
      });
    }
    const d = () => {
      n.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: n.modal.data.adapter, path: n.modal.data.item.path },
        responseType: "blob"
      }).then((l) => {
        i(l).then((u) => {
          s.value = u;
        });
      }).catch((l) => {
        console.log("catch", l);
      });
    };
    return xe(() => {
      d(), a("success");
    }), (l, u) => (v(), g("div", vv, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, fv),
      r("div", null, [
        z(o(pr), {
          style: { height: "70vh" },
          pdf: s.value,
          config: c.value
        }, null, 8, ["pdf", "config"])
      ])
    ]));
  }
}, pv = { class: "vuefinder__preview-modal__content" }, hv = { key: 0 }, gv = { class: "vuefinder__preview-modal__loading" }, bv = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, wv = /* @__PURE__ */ r("svg", {
  class: "vuefinder__preview-modal__spinner",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ r("circle", {
    class: "vuefinder__preview-modal__spinner-circle",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ r("path", {
    class: "vuefinder__preview-modal__spinner-path",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), yv = { class: "vuefinder__preview-modal__details" }, $v = { class: "font-bold" }, kv = { class: "font-bold pl-2" }, xv = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Sv = ["download", "href"], Uo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = C(!1), s = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(de.PREVIEW);
    return c || (a.value = !0), (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(de).DOWNLOAD) ? (v(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, Sv)) : q("", !0)
      ]),
      default: Q(() => [
        r("div", null, [
          r("div", pv, [
            o(c) ? (v(), g("div", hv, [
              s("text") ? (v(), W(W_, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => a.value = !0)
              })) : s("image") ? (v(), W(tv, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => a.value = !0)
              })) : s("video") ? (v(), W(cv, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => a.value = !0)
              })) : s("audio") ? (v(), W(_v, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => a.value = !0)
              })) : s("application/pdf") ? (v(), W(mv, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => a.value = !0)
              })) : (v(), W(av, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => a.value = !0)
              }))
            ])) : q("", !0),
            r("div", gv, [
              a.value === !1 ? (v(), g("div", bv, [
                wv,
                r("span", null, b(o(n)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ]),
        r("div", yv, [
          r("div", null, [
            r("span", $v, b(o(n)("File Size")) + ": ", 1),
            Z(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", kv, b(o(n)("Last Modified")) + ": ", 1),
            Z(" " + b(o(No)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(de).DOWNLOAD) ? (v(), g("div", xv, [
          r("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : q("", !0)
      ]),
      _: 1
    }));
  }
}, Cv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Ev = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Av = /* @__PURE__ */ r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Tv = [
  Ev,
  Av
];
function Mv(t, e) {
  return v(), g("svg", Cv, [...Tv]);
}
const qo = { render: Mv }, Dv = ["data-type", "data-item", "data-index"], Cn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, a = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(Uo, { adapter: e.fs.adapter, item: m });
    }, c = {
      mounted(m, h, y, w) {
        y.props.draggable && (m.addEventListener("dragstart", (M) => i(M, h.value)), m.addEventListener("dragover", (M) => l(M, h.value)), m.addEventListener("drop", (M) => d(M, h.value)));
      },
      beforeUnmount(m, h, y, w) {
        y.props.draggable && (m.removeEventListener("dragstart", i), m.removeEventListener("dragover", l), m.removeEventListener("drop", d));
      }
    }, i = (m, h) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(a.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (m, h) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let y = JSON.parse(m.dataTransfer.getData("items"));
      if (y.find((w) => w.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, { items: { from: y, to: h } });
    }, l = (m, h) => {
      m.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((y) => y === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let u = null, f = !1;
    const _ = () => {
      u && clearTimeout(u);
    }, p = (m) => {
      if (!f)
        f = !0, setTimeout(() => f = !1, 300);
      else
        return f = !1, s(a.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: m.target.getBoundingClientRect().x,
          clientY: m.target.getBoundingClientRect().y
        });
        m.target.dispatchEvent(h);
      }, 500);
    };
    return (m, h) => ue((v(), g("div", {
      style: rn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find((y) => m.$el === y) ? "0.5 !important" : "" }),
      class: ae(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (y) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (y) => p(y)),
      onTouchend: h[2] || (h[2] = (y) => _()),
      onContextmenu: h[3] || (h[3] = st((y) => o(e).emitter.emit("vf-contextmenu-show", { event: y, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Tt(m.$slots, "default"),
      o(e).pinnedFolders.find((y) => y.path === t.item.path) ? (v(), W(o(qo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : q("", !0)
    ], 46, Dv)), [
      [c, t.item]
    ]);
  }
}, Vv = { class: "vuefinder__explorer__container" }, Lv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Ov = { class: "vuefinder__explorer__drag-item" }, Rv = { class: "vuefinder__explorer__item-list-content" }, Fv = { class: "vuefinder__explorer__item-list-name" }, Bv = { class: "vuefinder__explorer__item-name" }, Hv = { class: "vuefinder__explorer__item-path" }, Iv = { class: "vuefinder__explorer__item-list-content" }, Nv = { class: "vuefinder__explorer__item-list-name" }, Uv = { class: "vuefinder__explorer__item-name" }, qv = { class: "vuefinder__explorer__item-size" }, zv = { class: "vuefinder__explorer__item-date" }, Pv = { class: "vuefinder__explorer__item-grid-content" }, jv = ["data-src", "alt"], Gv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Kv = { class: "vuefinder__explorer__item-title break-all" }, Wv = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = (_) => _ == null ? void 0 : _.substring(0, 3), s = C(null), c = C(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      c.value = _, _ ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: _
        },
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = yt({ active: !1, column: "", order: "" }), u = (_ = !0) => {
      let p = [...e.fs.data.files], m = l.column, h = l.order === "asc" ? 1 : -1;
      if (!_)
        return p;
      const y = (w, M) => typeof w == "string" && typeof M == "string" ? w.toLowerCase().localeCompare(M.toLowerCase()) : w < M ? -1 : w > M ? 1 : 0;
      return l.active && (p = p.slice().sort((w, M) => y(w[m], M[m]) * h)), p;
    }, f = (_) => {
      l.active && l.column === _ ? (l.active = l.order === "asc", l.column = _, l.order = "desc") : (l.active = !0, l.column = _, l.order = "asc");
    };
    return xe(() => {
      d = new fr(i.area.value);
    }), Os(() => {
      d.update();
    }), Fs(() => {
      d.destroy();
    }), (_, p) => (v(), g("div", Vv, [
      o(e).view === "list" || c.value.length ? (v(), g("div", Lv, [
        r("div", {
          onClick: p[0] || (p[0] = (m) => f("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Z(b(o(n)("Name")) + " ", 1),
          ue(z(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? q("", !0) : (v(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => f("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Z(b(o(n)("Size")) + " ", 1),
          ue(z(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? q("", !0) : (v(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => f("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Z(b(o(n)("Date")) + " ", 1),
          ue(z(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (v(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => f("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Z(b(o(n)("Filepath")) + " ", 1),
          ue(z(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      r("div", Ov, [
        z(U_, {
          ref_key: "dragImage",
          ref: s,
          count: o(i).getCount()
        }, null, 8, ["count"])
      ]),
      r("div", {
        ref: o(i).scrollBarContainer,
        class: ae(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        r("div", {
          ref: o(i).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      r("div", {
        ref: o(i).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: p[4] || (p[4] = st((m) => o(e).emitter.emit("vf-contextmenu-show", { event: m, items: o(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (v(!0), g(ge, { key: 0 }, ke(u(), (m, h) => (v(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Q(() => [
            r("div", Rv, [
              r("div", Fv, [
                z(Sn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", Bv, b(m.basename), 1)
              ]),
              r("div", Hv, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0),
        o(e).view === "list" && !c.value.length ? (v(!0), g(ge, { key: 1 }, ke(u(), (m, h) => (v(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: Q(() => [
            r("div", Iv, [
              r("div", Nv, [
                z(Sn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", Uv, b(m.basename), 1)
              ]),
              r("div", qv, b(m.file_size ? o(e).filesize(m.file_size) : ""), 1),
              r("div", zv, b(o(No)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : q("", !0),
        o(e).view === "grid" && !c.value.length ? (v(!0), g(ge, { key: 2 }, ke(u(!1), (m, h) => (v(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Q(() => [
            r("div", null, [
              r("div", Pv, [
                (m.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (v(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": m.thumb,
                  alt: m.basename,
                  key: m.path
                }, null, 8, jv)) : (v(), W(Sn, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && m.type !== "dir" ? (v(), g("div", Gv, b(a(m.extension)), 1)) : q("", !0)
              ]),
              r("span", Kv, b(o(zn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0)
      ], 544),
      z(h_)
    ]));
  }
}, Yv = ["href", "download"], Xv = ["onClick"], Jv = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = C(null), s = C([]), c = C(""), i = yt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = rt(() => i.items.filter((_) => _.key == null || e.features.includes(_.key)));
    e.emitter.on("vf-context-selected", (_) => {
      s.value = _;
    });
    const l = {
      newfolder: {
        key: de.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(Lo)
      },
      selectAll: {
        title: () => n("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      pinFolder: {
        title: () => n("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(s.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      unpinFolder: {
        title: () => n("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((_) => !s.value.find((p) => p.path === _.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: de.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.modal.open(as, { items: s });
        }
      },
      refresh: {
        title: () => n("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: de.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(Uo, { adapter: e.fs.adapter, item: s.value[0] })
      },
      open: {
        title: () => n("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => n("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].dir
            }
          });
        }
      },
      download: {
        key: de.DOWNLOAD,
        link: rt(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: de.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(Io, { items: s })
      },
      unarchive: {
        key: de.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Bo, { items: s })
      },
      rename: {
        key: de.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(ls, { items: s })
      }
    }, u = (_) => {
      e.emitter.emit("vf-contextmenu-hide"), _.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      c.value = _;
    }), e.emitter.on("vf-contextmenu-show", ({ event: _, items: p, target: m = null }) => {
      if (i.items = [], c.value)
        if (m)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [m]);
        else
          return;
      else !m && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((h) => h.path === m.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", p)) : (m.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((h) => h.path === m.path) !== -1 ? i.items.push(l.unpinFolder) : i.items.push(l.pinFolder)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), m.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [m]));
      f(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (_) => {
      const p = e.dragSelect.area.value, m = e.root.getBoundingClientRect(), h = p.getBoundingClientRect();
      let y = _.clientX - m.left, w = _.clientY - m.top;
      i.active = !0, ct(() => {
        var x;
        const M = (x = a.value) == null ? void 0 : x.getBoundingClientRect();
        let B = (M == null ? void 0 : M.height) ?? 0, R = (M == null ? void 0 : M.width) ?? 0;
        y = h.right - _.pageX + window.scrollX < R ? y - R : y, w = h.bottom - _.pageY + window.scrollY < B ? w - B : w, i.positions = {
          left: y + "px",
          top: w + "px"
        };
      });
    };
    return (_, p) => ue((v(), g("ul", {
      ref_key: "contextmenu",
      ref: a,
      style: rn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (v(!0), g(ge, null, ke(d.value, (m) => (v(), g("li", {
        class: "vuefinder__context-menu__item",
        key: m.title
      }, [
        m.link ? (v(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m.link,
          download: m.link,
          onClick: p[0] || (p[0] = (h) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, Yv)) : (v(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => u(m)
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, Xv))
      ]))), 128))
    ], 4)), [
      [Ue, i.active]
    ]);
  }
}, Zv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Qv = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), ef = [
  Qv
];
function tf(t, e) {
  return v(), g("svg", Zv, [...ef]);
}
const zo = { render: tf }, nf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, sf = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), of = [
  sf
];
function rf(t, e) {
  return v(), g("svg", nf, [...of]);
}
const af = { render: rf }, lf = { class: "vuefinder__status-bar__wrapper" }, cf = { class: "vuefinder__status-bar__storage" }, df = ["title"], uf = { class: "vuefinder__status-bar__storage-icon" }, _f = ["value"], vf = { class: "vuefinder__status-bar__info" }, ff = { key: 0 }, mf = { class: "vuefinder__status-bar__selected-count" }, pf = { class: "vuefinder__status-bar__actions" }, hf = ["disabled"], gf = ["title"], bf = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: a } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), a("adapter", e.fs.adapter);
    }, i = C("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = rt(() => {
      const l = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (v(), g("div", lf, [
      r("div", cf, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          r("div", uf, [
            z(o(zo))
          ]),
          ue(r("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (f) => o(e).fs.adapter = f),
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (v(!0), g(ge, null, ke(o(e).fs.data.storages, (f) => (v(), g("option", { value: f }, b(f), 9, _f))), 256))
          ], 544), [
            [En, o(e).fs.adapter]
          ])
        ], 8, df),
        r("div", vf, [
          i.value.length ? (v(), g("span", ff, b(o(e).fs.data.files.length) + " items found. ", 1)) : q("", !0),
          r("span", mf, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", pf, [
        o(e).selectButton.active ? (v(), g("button", {
          key: 0,
          class: ae(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (f) => o(e).selectButton.click(o(s).getSelected(), f))
        }, b(o(n)("Select")), 11, hf)) : q("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (f) => o(e).modal.open(To))
        }, [
          z(o(af))
        ], 8, gf)
      ])
    ]));
  }
}, wf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, yf = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), $f = [
  yf
];
function kf(t, e) {
  return v(), g("svg", wf, [...$f]);
}
const Po = { render: kf }, xf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Sf = /* @__PURE__ */ r("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Cf = /* @__PURE__ */ r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), Ef = [
  Sf,
  Cf
];
function Af(t, e) {
  return v(), g("svg", xf, [...Ef]);
}
const Tf = { render: Af }, Mf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Df = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Vf = /* @__PURE__ */ r("path", { d: "M15 12H9M12 9v6" }, null, -1), Lf = [
  Df,
  Vf
];
function Of(t, e) {
  return v(), g("svg", Mf, [...Lf]);
}
const jo = { render: Of }, Rf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Ff = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Bf = /* @__PURE__ */ r("path", { d: "M9 12h6" }, null, -1), Hf = [
  Ff,
  Bf
];
function If(t, e) {
  return v(), g("svg", Rf, [...Hf]);
}
const Go = { render: If };
function Ko(t, e) {
  const n = t.findIndex((a) => a.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Nf = { class: "vuefinder__folder-loader-indicator" }, Uf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Wo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ar({
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = re("ServiceContainer");
    n.i18n;
    const a = Bs(t, "modelValue"), s = C(!1);
    Fe(
      () => a.value,
      () => {
        var d;
        return ((d = c()) == null ? void 0 : d.folders.length) || i();
      }
    );
    function c() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const i = () => {
      s.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Ko(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, l) => {
      var u;
      return v(), g("div", Nf, [
        s.value ? (v(), W(o(is), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (v(), g("div", Uf, [
          a.value && ((u = c()) != null && u.folders.length) ? (v(), W(o(Go), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : q("", !0),
          a.value ? q("", !0) : (v(), W(o(jo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, qf = { class: "vuefinder__treesubfolderlist__item-content" }, zf = ["onClick"], Pf = ["title", "onClick"], jf = { class: "vuefinder__treesubfolderlist__item-icon" }, Gf = { class: "vuefinder__treesubfolderlist__subfolder" }, Kf = {
  __name: "TreeSubfolderList",
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = C([]), a = t, s = C(null);
    xe(() => {
      a.path === a.adapter + "://" && je(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = rt(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === a.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const l = lr("TreeSubfolderList", !0);
      return v(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (v(!0), g(ge, null, ke(c.value, (u, f) => (v(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", qf, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (_) => n.value[u.path] = !n.value[u.path]
            }, [
              z(Wo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (_) => n.value[u.path] = _
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, zf),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (_) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter, path: u.path } })
            }, [
              r("div", jf, [
                o(e).fs.path === u.path ? (v(), W(o(Po), { key: 0 })) : (v(), W(o(mn), { key: 1 }))
              ]),
              r("div", {
                class: ae(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, Pf)
          ]),
          r("div", Gf, [
            ue(z(l, {
              adapter: a.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Ue, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Wf = { class: "vuefinder__treestorageitem__loader" }, Yf = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = C(!1);
    return (a, s) => (v(), g(ge, null, [
      r("div", {
        onClick: s[1] || (s[1] = (c) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        r("div", {
          class: ae(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          r("div", {
            class: ae(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            z(o(zo))
          ], 2),
          r("div", null, b(t.storage), 1)
        ], 2),
        r("div", Wf, [
          z(Wo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (c) => n.value = c)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(z(Kf, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ue, n.value]
      ])
    ], 64));
  }
}, Xf = { class: "vuefinder__folder-indicator" }, Jf = { class: "vuefinder__folder-indicator--icon" }, Zf = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Bs(t, "modelValue");
    return (n, a) => (v(), g("div", Xf, [
      r("div", Jf, [
        e.value ? (v(), W(o(Go), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : q("", !0),
        e.value ? q("", !0) : (v(), W(o(jo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Qf = { class: "vuefinder__treeview__header" }, em = { class: "vuefinder__treeview__pinned-label" }, tm = { class: "vuefinder__treeview__pin-text text-nowrap" }, nm = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, sm = { class: "vuefinder__treeview__pinned-item" }, om = ["onClick"], rm = ["title"], am = ["onClick"], lm = { key: 0 }, im = { class: "vuefinder__treeview__no-pinned" }, cm = { class: "vuefinder__treeview__storage" }, dm = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: a, setStore: s } = e.storage, c = C(190), i = C(a("pinned-folders-opened", !0));
    Fe(i, (f) => s("pinned-folders-opened", f));
    const d = (f) => {
      e.pinnedFolders = e.pinnedFolders.filter((_) => _.path !== f.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (f) => {
      const _ = f.clientX, p = f.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (w) => {
        c.value = m + w.clientX - _, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const w = p.getBoundingClientRect();
        c.value = w.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", y);
    }, u = C(null);
    return xe(() => {
      je(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Fe(e.fs.data, (f, _) => {
      const p = f.files.filter((m) => m.type === "dir");
      Ko(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (f, _) => (v(), g(ge, null, [
      r("div", {
        onClick: _[0] || (_[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: ae(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      r("div", {
        style: rn(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          r("div", Qf, [
            r("div", {
              onClick: _[2] || (_[2] = (p) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", em, [
                z(o(qo), { class: "vuefinder__treeview__pin-icon" }),
                r("div", tm, b(o(n)("Pinned Folders")), 1)
              ]),
              z(Zf, {
                modelValue: i.value,
                "onUpdate:modelValue": _[1] || (_[1] = (p) => i.value = p)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (v(), g("ul", nm, [
              (v(!0), g(ge, null, ke(o(e).pinnedFolders, (p) => (v(), g("li", sm, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (v(), W(o(mn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : q("", !0),
                  o(e).fs.path === p.path ? (v(), W(o(Po), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : q("", !0),
                  r("div", {
                    title: p.path,
                    class: ae(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, rm)
                ], 8, om),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => d(p)
                }, [
                  z(o(Tf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, am)
              ]))), 256)),
              o(e).pinnedFolders.length ? q("", !0) : (v(), g("li", lm, [
                r("div", im, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : q("", !0)
          ]),
          (v(!0), g(ge, null, ke(o(e).fs.data.storages, (p) => (v(), g("div", cm, [
            z(Yf, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: l,
          class: ae([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, um = { class: "vuefinder__main__content" }, _m = {
  __name: "VueFinder",
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: ""
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    showTreeView: {
      type: Boolean,
      default: !1
    },
    pinnedFolders: {
      type: Array,
      default: []
    },
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(t) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...t
        };
      }
    }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const n = e, s = Da(t, re("VueFinderOptions"));
    ir("ServiceContainer", s);
    const { setStore: c } = s.storage, i = C(null);
    s.root = i;
    const d = s.dragSelect;
    Fi(s);
    const l = (f) => {
      Object.assign(s.fs.data, f), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: f, body: _ = null, onSuccess: p = null, onError: m = null, noCloseModal: h = !1 }) => {
      ["index", "search"].includes(f.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const y = u.signal;
      s.requester.send({
        url: "",
        method: f.m || "get",
        params: f,
        body: _,
        abortSignal: y
      }).then((w) => {
        s.fs.adapter = w.adapter, s.persist && (s.fs.path = w.dirname, c("path", s.fs.path)), ["index", "search"].includes(f.q) && (s.fs.loading = !1), h || s.modal.close(), l(w), p && p(w);
      }).catch((w) => {
        console.error(w), m && m(w);
      });
    }), xe(() => {
      let f = {};
      s.fs.path.includes("://") && (f = {
        adapter: s.fs.path.split("://")[0],
        path: s.fs.path
      }), s.emitter.emit("vf-fetch", { params: { q: "index", adapter: s.fs.adapter, ...f } }), d.onSelect((_) => {
        n("select", _);
      });
    }), (f, _) => (v(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      r("div", {
        class: ae(o(s).theme.actualValue)
      }, [
        r("div", {
          class: ae([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: _[0] || (_[0] = (p) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: _[1] || (_[1] = (p) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          z(Hd),
          z(m_),
          r("div", um, [
            z(dm),
            z(Wv)
          ]),
          z(bf)
        ], 38),
        z(cr, { name: "fade" }, {
          default: Q(() => [
            o(s).modal.visible ? (v(), W(Rs(o(s).modal.type), { key: 0 })) : q("", !0)
          ]),
          _: 1
        }),
        z(Jv)
      ], 2)
    ], 512));
  }
}, km = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", _m);
  }
};
export {
  km as default
};
