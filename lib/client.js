window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-omniroute-models",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/locales.ts
		/**
		* `omniroute-models` client namespace dictionaries (zh/en).
		*
		* `zh` is the key-set source of truth (Chinese-first repo convention); `en` is
		* typed `Record<OmniKey, string>` so a missing English key is a compile error.
		* Registered into the DSH locale runtime (`ctx.locale.register(NS, dictionaries)`)
		* and bound with `ctx.locale.bind(NS)`; the settings section reads copy through
		* the framework-injected `t` seat.
		*/
		/** Simplified Chinese dictionary (key-set source of truth). */
		const zh = {
			nav: "OmniRoute 模型管理",
			"tab.models": "模型管理",
			"tab.search": "联网搜索",
			"head.title": "模型管理",
			"toolbar.route": "路由",
			"toolbar.search": "搜索模型 id 或名称…",
			"filter.modality.all": "全部模态",
			"filter.modality.text": "仅文本",
			"filter.modality.image": "视觉（含图片）",
			"filter.vendor.all": "全部供应商",
			"filter.vendor.none": "无命名空间",
			"filter.enabled.all": "全部",
			"filter.enabled.enabled": "已启用",
			"filter.enabled.disabled": "未启用",
			"action.selectMatching": "全选匹配",
			"action.deselectAll": "全不选",
			"action.refresh": "拉取",
			"action.save": "保存所选",
			"action.saving": "保存中…",
			"action.prevPage": "上一页",
			"action.nextPage": "下一页",
			"action.back": "返回",
			"col.model": "模型",
			"col.modality": "模态",
			"col.context": "上下文",
			"col.output": "输出",
			"modality.textImage": "text + image",
			"modality.text": "text",
			"counts.enabled": "已启用 {enabled} / {total}",
			"counts.selected": "已选 {checked} · 匹配 {matched} · 共 {total}",
			"counts.page": "第 {page} / {totalPages} 页",
			"status.saved": "已保存 {count} 个模型",
			"status.minOne": "至少勾选 1 个模型",
			"status.applyFailed": "应用失败",
			"empty.noMatch": "无匹配模型",
			"loading.fetching": "正在拉取 OmniRoute 模型…",
			"error.loadFailed": "加载失败",
			"error.retry": "重试",
			"configured.title": "OmniRoute 模型管理",
			"configured.notSet": "未配置 OmniRoute 提供方。",
			"configured.recheck": "重新检查",
			"notCompatible.msg": "该供应商不支持自动发现。",
			"option.notDiscoverable": "不可自动发现",
			"note.save": "保存即整体替换该路由的 models 列表（DSH 恰好能用勾选的这些）；筛选只影响显示，不影响已勾选的保存内容；未保存前不落盘。",
			"aria.selectModel": "选择 {id}",
			"search.title": "联网搜索",
			"search.enabled": "启用 OmniRoute 联网搜索",
			"search.provider": "搜索后端",
			"search.provider.auto": "OmniRoute 默认",
			"search.baseURL": "网关地址",
			"search.apiKeyEnv": "密钥环境变量",
			"search.maxResults": "结果上限",
			"search.advanced": "高级",
			"search.test": "测试连接",
			"search.testing": "测试中…",
			"search.testOk": "连接成功：{count} 条结果",
			"search.testFail": "测试失败：{error}",
			"search.save": "保存搜索配置",
			"search.saved": "搜索配置已保存",
			"search.minKey": "启用搜索需配置网关地址与密钥环境变量。",
			"search.hint": "在 OmniRoute 后台给所选搜索引擎（Tavily/Brave/Ollama 等）配置 API key 后，DSH 的 web_search 才会返回结果。",
			"host.catalog.notConfigured": "未发现 llm-pi-ai 提供方配置，请先在「模型」设置中添加对应路由（baseURL + apiKeyEnv）。",
			"host.catalog.notCompatible": "该供应商协议 \"{api}\" 不是 OpenAI 兼容，无法自动拉取模型。请在 settings.yaml 手动维护 {route} 的 models。",
			"host.apply.emptyModels": "至少需要勾选 1 个模型（空列表会让手工声明路由不可服务）",
			"host.apply.emptyId": "存在空模型 id",
			"host.apply.duplicateId": "重复模型 id: {id}",
			"host.apply.noModality": "模型 {id} 缺少有效模态（只支持 text/image）",
			"host.apply.noSettings": "settings 服务不可用（未挂载 llm-pi-ai 提供方）"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			nav: "OmniRoute model manager",
			"tab.models": "Models",
			"tab.search": "Web search",
			"head.title": "Models",
			"toolbar.route": "Route",
			"toolbar.search": "Search model id or name…",
			"filter.modality.all": "All modalities",
			"filter.modality.text": "Text only",
			"filter.modality.image": "Vision (with images)",
			"filter.vendor.all": "All vendors",
			"filter.vendor.none": "No namespace",
			"filter.enabled.all": "All",
			"filter.enabled.enabled": "Enabled",
			"filter.enabled.disabled": "Disabled",
			"action.selectMatching": "Select matching",
			"action.deselectAll": "Clear all",
			"action.refresh": "Refresh",
			"action.save": "Save selected",
			"action.saving": "Saving…",
			"action.prevPage": "Previous",
			"action.nextPage": "Next",
			"action.back": "Back",
			"col.model": "Model",
			"col.modality": "Modality",
			"col.context": "Context",
			"col.output": "Output",
			"modality.textImage": "text + image",
			"modality.text": "text",
			"counts.enabled": "Enabled {enabled} / {total}",
			"counts.selected": "Selected {checked} · Matching {matched} · Of {total}",
			"counts.page": "Page {page} / {totalPages}",
			"status.saved": "Saved {count} models",
			"status.minOne": "Select at least 1 model",
			"status.applyFailed": "Apply failed",
			"empty.noMatch": "No matching models",
			"loading.fetching": "Fetching OmniRoute models…",
			"error.loadFailed": "Load failed",
			"error.retry": "Retry",
			"configured.title": "OmniRoute model manager",
			"configured.notSet": "No OmniRoute provider is configured.",
			"configured.recheck": "Recheck",
			"notCompatible.msg": "This provider does not support auto-discovery.",
			"option.notDiscoverable": "auto-discovery unavailable",
			"note.save": "Saving replaces this route’s models list in one go (DSH serves exactly the checked ones). Filters only narrow the view — they never change what a save writes. Nothing is written until you save.",
			"aria.selectModel": "Select {id}",
			"search.title": "Web search",
			"search.enabled": "Enable OmniRoute web search",
			"search.provider": "Search backend",
			"search.provider.auto": "OmniRoute default",
			"search.baseURL": "Gateway base URL",
			"search.apiKeyEnv": "Key environment variable",
			"search.maxResults": "Max results",
			"search.advanced": "Advanced",
			"search.test": "Test connection",
			"search.testing": "Testing…",
			"search.testOk": "OK: {count} results",
			"search.testFail": "Test failed: {error}",
			"search.save": "Save search config",
			"search.saved": "Search config saved",
			"search.minKey": "A gateway base URL and a key environment variable are required to enable search.",
			"search.hint": "After configuring an API key for the chosen search engine (Tavily/Brave/Ollama, …) in OmniRoute, DSH’s web_search will return results.",
			"host.catalog.notConfigured": "No llm-pi-ai provider is configured. Add the route (baseURL + apiKeyEnv) in the “Models” settings first.",
			"host.catalog.notCompatible": "Provider protocol \"{api}\" is not OpenAI-compatible and cannot be listed automatically. Maintain {route}’s models in settings.yaml instead.",
			"host.apply.emptyModels": "Select at least 1 model (an empty list would make a manually-declared route unserviceable)",
			"host.apply.emptyId": "A model id is missing",
			"host.apply.duplicateId": "Duplicate model id: {id}",
			"host.apply.noModality": "Model {id} has no valid modality (only text/image are supported)",
			"host.apply.noSettings": "The settings service is unavailable (no llm-pi-ai provider is mounted)"
		};
		/** Locale namespace of this plugin's client half. */
		const NS = "omniroute-models";
		/** The two dictionaries, keyed by locale id. */
		const dictionaries = {
			zh,
			en
		};
		//#endregion
		//#region node_modules/morphicons/dist/normalize-CYnN3Npw.js
		const COMMANDS = "MmLlHhVvCcSsQqTtAaZz";
		function parsePath(d) {
			const subs = [];
			const n = d.length;
			let i = 0;
			let cx = 0;
			let cy = 0;
			let sx = 0;
			let sy = 0;
			let cur = null;
			let cmd = "";
			let px = 0;
			let py = 0;
			let prev = "";
			let started = false;
			const err = (msg) => {
				throw new Error(`morphicons: ${msg} at d[${i}]`);
			};
			const isDigit = (c) => c >= 48 && c <= 57;
			const skip = () => {
				while (i < n) {
					const c = d.charCodeAt(i);
					if (c === 32 || c === 9 || c === 10 || c === 13 || c === 12 || c === 44) i++;
					else break;
				}
			};
			const num = () => {
				skip();
				const start = i;
				if (i < n && (d[i] === "+" || d[i] === "-")) i++;
				let dig = false;
				while (i < n && isDigit(d.charCodeAt(i))) {
					i++;
					dig = true;
				}
				if (i < n && d[i] === ".") {
					i++;
					while (i < n && isDigit(d.charCodeAt(i))) {
						i++;
						dig = true;
					}
				}
				if (!dig) err("expected number");
				if (i < n && (d[i] === "e" || d[i] === "E")) {
					const save = i;
					i++;
					if (i < n && (d[i] === "+" || d[i] === "-")) i++;
					let ed = false;
					while (i < n && isDigit(d.charCodeAt(i))) {
						i++;
						ed = true;
					}
					if (!ed) i = save;
				}
				return Number(d.slice(start, i));
			};
			const flag = () => {
				skip();
				const c = d[i];
				if (c === "0" || c === "1") {
					i++;
					return c === "1" ? 1 : 0;
				}
				return err("expected arc flag (0|1)");
			};
			const open = () => {
				if (!started) err("path must start with M/m");
				if (!cur) {
					cur = {
						x0: cx,
						y0: cy,
						segs: [],
						closed: false
					};
					subs.push(cur);
				}
				return cur;
			};
			let rel = false;
			const nx = () => num() + (rel ? cx : 0);
			const ny = () => num() + (rel ? cy : 0);
			while (true) {
				skip();
				if (i >= n) break;
				const ch = d[i];
				if (COMMANDS.includes(ch)) {
					cmd = ch;
					i++;
				} else if (cmd === "") err("path must start with M/m");
				else if (cmd === "M") cmd = "L";
				else if (cmd === "m") cmd = "l";
				else if (cmd === "Z" || cmd === "z") err("stray data after Z");
				rel = cmd >= "a";
				switch (rel ? cmd.toUpperCase() : cmd) {
					case "M": {
						started = true;
						const x = nx();
						const y = ny();
						cx = x;
						cy = y;
						sx = x;
						sy = y;
						cur = {
							x0: x,
							y0: y,
							segs: [],
							closed: false
						};
						subs.push(cur);
						prev = "";
						break;
					}
					case "L": {
						const x = nx();
						const y = ny();
						open().segs.push([
							"L",
							x,
							y
						]);
						cx = x;
						cy = y;
						prev = "";
						break;
					}
					case "H": {
						const x = nx();
						open().segs.push([
							"L",
							x,
							cy
						]);
						cx = x;
						prev = "";
						break;
					}
					case "V": {
						const y = ny();
						open().segs.push([
							"L",
							cx,
							y
						]);
						cy = y;
						prev = "";
						break;
					}
					case "C":
					case "S": {
						let x1;
						let y1;
						if (cmd === "C" || cmd === "c") {
							x1 = nx();
							y1 = ny();
						} else {
							x1 = prev === "C" ? 2 * cx - px : cx;
							y1 = prev === "C" ? 2 * cy - py : cy;
						}
						const x2 = nx();
						const y2 = ny();
						const x = nx();
						const y = ny();
						open().segs.push([
							"C",
							x1,
							y1,
							x2,
							y2,
							x,
							y
						]);
						px = x2;
						py = y2;
						cx = x;
						cy = y;
						prev = "C";
						break;
					}
					case "Q":
					case "T": {
						let x1;
						let y1;
						if (cmd === "Q" || cmd === "q") {
							x1 = nx();
							y1 = ny();
						} else {
							x1 = prev === "Q" ? 2 * cx - px : cx;
							y1 = prev === "Q" ? 2 * cy - py : cy;
						}
						const x = nx();
						const y = ny();
						open().segs.push([
							"Q",
							x1,
							y1,
							x,
							y
						]);
						px = x1;
						py = y1;
						cx = x;
						cy = y;
						prev = "Q";
						break;
					}
					case "A": {
						const rx = num();
						const ry = num();
						const rot = num();
						const large = flag();
						const sweep = flag();
						const x = nx();
						const y = ny();
						open().segs.push([
							"A",
							rx,
							ry,
							rot,
							large,
							sweep,
							x,
							y
						]);
						cx = x;
						cy = y;
						prev = "";
						break;
					}
					case "Z":
						if (cur) {
							cur.closed = true;
							cur = null;
						}
						cx = sx;
						cy = sy;
						prev = "";
						break;
					default: err(`unsupported command "${cmd}"`);
				}
			}
			return subs.filter((s) => s.segs.length > 0);
		}
		function fmt(v) {
			return String(Math.round(v * 100) / 100);
		}
		/** Sampled subpaths → polyline `d` attribute. `closed[k]` appends Z to
		*  subpath k (closed loops in flight); without flags everything is open. */
		function serialize(subs, closed) {
			let d = "";
			for (let k = 0; k < subs.length; k++) {
				const o = subs[k];
				const n = o.length / 2;
				d += `M${fmt(o[0])} ${fmt(o[1])}`;
				for (let i = 1; i < n; i++) d += `L${fmt(o[2 * i])} ${fmt(o[2 * i + 1])}`;
				if (closed?.[k]) d += "Z";
			}
			return d;
		}
		function fmtCanon(v) {
			return String(Math.round(v * 1e4) / 1e4);
		}
		/** Cubic subpaths → canonical `d`, quantized to 4 decimals (engine-stable
		*  bytes; see fmtCanon). */
		function cubicsToPathD(paths) {
			let d = "";
			for (const { pts, closed } of paths) {
				d += `M${fmtCanon(pts[0])} ${fmtCanon(pts[1])}`;
				for (let i = 2; i < pts.length; i += 6) d += `C${fmtCanon(pts[i])} ${fmtCanon(pts[i + 1])} ${fmtCanon(pts[i + 2])} ${fmtCanon(pts[i + 3])} ${fmtCanon(pts[i + 4])} ${fmtCanon(pts[i + 5])}`;
				if (closed) d += "Z";
			}
			return d;
		}
		/** Control-point offset for a quarter circle: (4/3)·tan(π/8) ≈ 0.5523. */
		const KAPPA = 4 / 3 * Math.tan(Math.PI / 8);
		const TAU = 2 * Math.PI;
		function builder(x0, y0) {
			const pts = [x0, y0];
			let cx = x0;
			let cy = y0;
			const cubic = (x1, y1, x2, y2, x, y) => {
				pts.push(x1, y1, x2, y2, x, y);
				cx = x;
				cy = y;
			};
			const line = (x, y) => {
				if (Math.abs(x - cx) < 1e-12 && Math.abs(y - cy) < 1e-12) return;
				cubic(cx + (x - cx) / 3, cy + (y - cy) / 3, cx + 2 * (x - cx) / 3, cy + 2 * (y - cy) / 3, x, y);
			};
			const quad = (x1, y1, x, y) => {
				cubic(cx + 2 / 3 * (x1 - cx), cy + 2 / 3 * (y1 - cy), x + 2 / 3 * (x1 - x), y + 2 / 3 * (y1 - y), x, y);
			};
			const arc = (rx0, ry0, rotDeg, large, sweep, x, y) => {
				const x1 = cx;
				const y1 = cy;
				if (Math.abs(x - x1) < 1e-12 && Math.abs(y - y1) < 1e-12) return;
				let rx = Math.abs(rx0);
				let ry = Math.abs(ry0);
				if (rx < 1e-12 || ry < 1e-12) {
					line(x, y);
					return;
				}
				const phi = rotDeg * Math.PI / 180;
				const cosP = Math.cos(phi);
				const sinP = Math.sin(phi);
				const hx = (x1 - x) / 2;
				const hy = (y1 - y) / 2;
				const x1p = cosP * hx + sinP * hy;
				const y1p = -sinP * hx + cosP * hy;
				const lam = x1p * x1p / (rx * rx) + y1p * y1p / (ry * ry);
				if (lam > 1) {
					const s = Math.sqrt(lam);
					rx *= s;
					ry *= s;
				}
				const rx2 = rx * rx;
				const ry2 = ry * ry;
				const xp2 = x1p * x1p;
				const yp2 = y1p * y1p;
				let rad = (rx2 * ry2 - rx2 * yp2 - ry2 * xp2) / (rx2 * yp2 + ry2 * xp2);
				if (rad < 0) rad = 0;
				const co = (large === sweep ? -1 : 1) * Math.sqrt(rad);
				const cxp = co * rx * y1p / ry;
				const cyp = -co * ry * x1p / rx;
				const ccx = cosP * cxp - sinP * cyp + (x1 + x) / 2;
				const ccy = sinP * cxp + cosP * cyp + (y1 + y) / 2;
				const th1 = Math.atan2((y1p - cyp) / ry, (x1p - cxp) / rx);
				let dth = Math.atan2((-y1p - cyp) / ry, (-x1p - cxp) / rx) - th1;
				if (sweep === 0 && dth > 0) dth -= TAU;
				else if (sweep === 1 && dth < 0) dth += TAU;
				const slices = Math.max(1, Math.ceil(Math.abs(dth) / (Math.PI / 2) - 1e-9));
				const delta = dth / slices;
				const alpha = 4 / 3 * Math.tan(delta / 4);
				const ex = (t) => ccx + rx * Math.cos(t) * cosP - ry * Math.sin(t) * sinP;
				const ey = (t) => ccy + rx * Math.cos(t) * sinP + ry * Math.sin(t) * cosP;
				const dx = (t) => -rx * Math.sin(t) * cosP - ry * Math.cos(t) * sinP;
				const dy = (t) => -rx * Math.sin(t) * sinP + ry * Math.cos(t) * cosP;
				let t0 = th1;
				let p0x = x1;
				let p0y = y1;
				for (let s = 1; s <= slices; s++) {
					const t1 = th1 + delta * s;
					const p1x = s === slices ? x : ex(t1);
					const p1y = s === slices ? y : ey(t1);
					cubic(p0x + alpha * dx(t0), p0y + alpha * dy(t0), p1x - alpha * dx(t1), p1y - alpha * dy(t1), p1x, p1y);
					t0 = t1;
					p0x = p1x;
					p0y = p1y;
				}
			};
			const finish = (closed) => {
				if (closed) line(pts[0], pts[1]);
				if (pts.length < 8) return null;
				return {
					pts: Float64Array.from(pts),
					closed
				};
			};
			return [
				cubic,
				line,
				quad,
				arc,
				finish
			];
		}
		function lowerSubpath(raw) {
			const [cubic, line, quad, arc, finish] = builder(raw.x0, raw.y0);
			for (const s of raw.segs) switch (s[0]) {
				case "L":
					line(s[1], s[2]);
					break;
				case "C":
					cubic(s[1], s[2], s[3], s[4], s[5], s[6]);
					break;
				case "Q":
					quad(s[1], s[2], s[3], s[4]);
					break;
				case "A": arc(s[1], s[2], s[3], s[4], s[5], s[6], s[7]);
			}
			return finish(raw.closed);
		}
		function attrNum(attrs, key, fallback = 0) {
			const v = attrs[key];
			if (v === void 0) return fallback;
			const x = typeof v === "number" ? v : Number(v);
			return Number.isFinite(x) ? x : fallback;
		}
		function parsePoints(v) {
			const s = String(v ?? "").trim();
			if (!s) return [];
			const nums = s.split(/[\s,]+/).map(Number);
			if (nums.some((x) => !Number.isFinite(x))) throw new Error(`morphicons: invalid points: "${s}"`);
			return nums;
		}
		function polyPath(nums, closed) {
			if (nums.length < 4) return null;
			const [, line, , , finish] = builder(nums[0], nums[1]);
			for (let i = 2; i + 1 < nums.length; i += 2) line(nums[i], nums[i + 1]);
			return finish(closed);
		}
		function ellipsePath(cx, cy, rx, ry) {
			if (rx < 1e-12 || ry < 1e-12) return null;
			const kx = KAPPA * rx;
			const ky = KAPPA * ry;
			const e = cx + rx;
			const w = cx - rx;
			const s = cy + ry;
			const n = cy - ry;
			const [cubic, , , , finish] = builder(e, cy);
			cubic(e, cy + ky, cx + kx, s, cx, s);
			cubic(cx - kx, s, w, cy + ky, w, cy);
			cubic(w, cy - ky, cx - kx, n, cx, n);
			cubic(cx + kx, n, e, cy - ky, e, cy);
			return finish(true);
		}
		function rectPath(attrs) {
			const x = attrNum(attrs, "x");
			const y = attrNum(attrs, "y");
			const w = attrNum(attrs, "width");
			const h = attrNum(attrs, "height");
			if (w < 1e-12 || h < 1e-12) return null;
			let rx = attrNum(attrs, "rx", NaN);
			let ry = attrNum(attrs, "ry", NaN);
			if (Number.isNaN(rx)) rx = Number.isNaN(ry) ? 0 : ry;
			if (Number.isNaN(ry)) ry = rx;
			rx = Math.min(Math.max(rx, 0), w / 2);
			ry = Math.min(Math.max(ry, 0), h / 2);
			if (rx < 1e-12 || ry < 1e-12) return polyPath([
				x,
				y,
				x + w,
				y,
				x + w,
				y + h,
				x,
				y + h
			], true);
			const xa = x + rx;
			const xb = x + w - rx;
			const xr = x + w;
			const ya = y + ry;
			const yb = y + h - ry;
			const yd = y + h;
			const kx = KAPPA * rx;
			const ky = KAPPA * ry;
			const [cubic, line, , , finish] = builder(xa, y);
			line(xb, y);
			cubic(xb + kx, y, xr, ya - ky, xr, ya);
			line(xr, yb);
			cubic(xr, yb + ky, xb + kx, yd, xb, yd);
			line(xa, yd);
			cubic(xa - kx, yd, x, yb + ky, x, yb);
			line(x, ya);
			cubic(x, ya - ky, xa - kx, y, xa, y);
			return finish(true);
		}
		/** Icon (IconNode or `d` string) → list of cubic subpaths. */
		function iconToCubics(input) {
			const out = [];
			const push = (p) => {
				if (p) out.push(p);
			};
			if (typeof input === "string") {
				for (const s of parsePath(input)) push(lowerSubpath(s));
				return out;
			}
			for (const [tag, attrs] of input) switch (tag) {
				case "path":
					for (const s of parsePath(String(attrs.d ?? ""))) push(lowerSubpath(s));
					break;
				case "line": {
					const [, line, , , finish] = builder(attrNum(attrs, "x1"), attrNum(attrs, "y1"));
					line(attrNum(attrs, "x2"), attrNum(attrs, "y2"));
					push(finish(false));
					break;
				}
				case "circle": {
					const r = attrNum(attrs, "r");
					push(ellipsePath(attrNum(attrs, "cx"), attrNum(attrs, "cy"), r, r));
					break;
				}
				case "ellipse":
					push(ellipsePath(attrNum(attrs, "cx"), attrNum(attrs, "cy"), attrNum(attrs, "rx"), attrNum(attrs, "ry")));
					break;
				case "rect":
					push(rectPath(attrs));
					break;
				case "polyline":
					push(polyPath(parsePoints(attrs.points), false));
					break;
				case "polygon":
					push(polyPath(parsePoints(attrs.points), true));
					break;
				default: throw new Error(`morphicons: unsupported tag <${tag}>`);
			}
			return out;
		}
		//#endregion
		//#region node_modules/morphicons/dist/spring-CFHloqPP.js
		/** Preallocated output buffers for a plan (zero allocation per frame). */
		function allocOutputs(plan) {
			return plan.items.map(() => new Float64Array(2 * plan.n));
		}
		function interpPolar(plan, t, out) {
			for (let k = 0; k < plan.items.length; k++) {
				const it = plan.items[k];
				const o = out[k];
				const n = plan.n;
				const s = Math.exp(it.lnSigma * t);
				const ang = it.theta * t;
				const cos = Math.cos(ang) * s;
				const sin = Math.sin(ang) * s;
				let cx;
				let cy;
				if (it.block) {
					const [ox, oy] = it.block.off;
					const [dx, dy] = it.block.drift;
					cx = it.ca[0] + dx * t + (ox * cos - oy * sin - ox);
					cy = it.ca[1] + dy * t + (ox * sin + oy * cos - oy);
				} else {
					cx = it.ca[0] + (it.cb[0] - it.ca[0]) * t;
					cy = it.ca[1] + (it.cb[1] - it.ca[1]) * t;
				}
				for (let i = 0; i < n; i++) {
					const px = it.aC[2 * i] + (it.bT[2 * i] - it.aC[2 * i]) * t;
					const py = it.aC[2 * i + 1] + (it.bT[2 * i + 1] - it.aC[2 * i + 1]) * t;
					o[2 * i] = cx + px * cos - py * sin;
					o[2 * i + 1] = cy + px * sin + py * cos;
				}
			}
		}
		/** Weight of |ΔL| in the subpath pairing cost. */
		const LEN_WEIGHT = .35;
		/** λ of the minimal-rotation tie-break: score = res + λ·|θ|/π.
		*  It exists because shapes symmetric under inversion (lines) tie in
		*  residual for both traversal orientations yet produce different rotations. */
		const LAMBDA = .05;
		/** Global residual below which the whole icon counts as congruent and the
		*  plan shares (θ, σ) across all items (hybrid variant of Procrustes). */
		const GLOBAL_EPS = .005;
		/** Bounds for exhaustive matching; above them it falls back to greedy with
		*  repair. 8! = 40 320 permutations / 1e5 assignments — both sub-ms. */
		const PERM_MAX = 8;
		const SURJ_MAX = 1e5;
		function centroid(p) {
			const n = p.length / 2;
			let cx = 0;
			let cy = 0;
			for (let i = 0; i < n; i++) {
				cx += p[2 * i];
				cy += p[2 * i + 1];
			}
			return [cx / n, cy / n];
		}
		function polyLen(p) {
			const n = p.length / 2;
			let L = 0;
			for (let i = 1; i < n; i++) L += Math.hypot(p[2 * i] - p[2 * i - 2], p[2 * i + 1] - p[2 * i - 1]);
			return L;
		}
		function reversePts(p) {
			const n = p.length / 2;
			const out = new Float64Array(2 * n);
			for (let i = 0; i < n; i++) {
				out[2 * i] = p[2 * (n - 1 - i)];
				out[2 * i + 1] = p[2 * (n - 1 - i) + 1];
			}
			return out;
		}
		/** Circular re-indexing of a loop: out[i] = p[(i+off) mod n]. Same point
		*  set, different cut point — the circular degree of freedom of closed paths. */
		function rotatePts(p, off) {
			const n = p.length / 2;
			const out = new Float64Array(2 * n);
			for (let i = 0; i < n; i++) {
				const j = (i + off) % n;
				out[2 * i] = p[2 * j];
				out[2 * i + 1] = p[2 * j + 1];
			}
			return out;
		}
		/** Optimal similarity (θ, σ) minimizing Σ|σ·R(θ)·(a−c_A) − (b−c_B)|².
		*  θ* = atan2(S_xy − S_yx, S_xx + S_yy); σ* by zero derivative.
		*  res = RMS residual normalized by b's energy (0 → same shape). */
		function procrustes(a, b, ca, cb) {
			const n = a.length / 2;
			let sxx = 0;
			let sxy = 0;
			let syx = 0;
			let syy = 0;
			let na = 0;
			let nb = 0;
			for (let i = 0; i < n; i++) {
				const ax = a[2 * i] - ca[0];
				const ay = a[2 * i + 1] - ca[1];
				const bx = b[2 * i] - cb[0];
				const by = b[2 * i + 1] - cb[1];
				sxx += ax * bx;
				syy += ay * by;
				sxy += ax * by;
				syx += ay * bx;
				na += ax * ax + ay * ay;
				nb += bx * bx + by * by;
			}
			const theta = Math.atan2(sxy - syx, sxx + syy);
			const num = Math.cos(theta) * (sxx + syy) + Math.sin(theta) * (sxy - syx);
			let sigma = na > 1e-12 ? num / na : 1;
			if (!(sigma > 1e-6)) sigma = 1e-6;
			const res2 = Math.max(0, sigma * sigma * na - 2 * sigma * num + nb);
			const res = nb > 1e-12 ? Math.sqrt(res2 / nb) : 0;
			return {
				theta,
				sigma,
				res
			};
		}
		/** Best index-to-index correspondence between a and b: tries both traversal
		*  directions and, if there is a closed loop, its N circular offsets,
		*  scoring with score = res + λ·|θ|/π. The freedom is applied to ONE cloud
		*  — the closed one (b if both are); varying both at once would be
		*  redundant. */
		function alignPair(aPts, bPts, aClosed = false, bClosed = false) {
			const ca = centroid(aPts);
			const cb = centroid(bPts);
			const varyA = aClosed && !bClosed;
			const base = varyA ? aPts : bPts;
			const offs = aClosed || bClosed ? base.length / 2 : 1;
			let bestScore = Number.POSITIVE_INFINITY;
			let best = base;
			let sim = {
				theta: 0,
				sigma: 1,
				res: 0
			};
			for (let dir = 0; dir < 2; dir++) {
				const walk = dir ? reversePts(base) : base;
				for (let off = 0; off < offs; off++) {
					const cand = off ? rotatePts(walk, off) : walk;
					const s = varyA ? procrustes(cand, bPts, ca, cb) : procrustes(aPts, cand, ca, cb);
					const score = s.res + LAMBDA * Math.abs(s.theta) / Math.PI;
					if (score < bestScore) {
						bestScore = score;
						best = cand;
						sim = s;
					}
				}
			}
			return varyA ? {
				ca,
				cb,
				a: best,
				b: bPts,
				...sim
			} : {
				ca,
				cb,
				a: aPts,
				b: best,
				...sim
			};
		}
		function costMatrix(A, B) {
			const cbs = B.map(centroid);
			const lbs = B.map(polyLen);
			return A.map((a) => {
				const ca = centroid(a);
				const la = polyLen(a);
				return cbs.map((cb, j) => Math.hypot(ca[0] - cb[0], ca[1] - cb[1]) + LEN_WEIGHT * Math.abs(la - lbs[j]));
			});
		}
		function bestPermutation(C) {
			const n = C.length;
			if (n > PERM_MAX) {
				const pairs = [];
				for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) pairs.push([
					C[i][j],
					i,
					j
				]);
				pairs.sort((x, y) => x[0] - y[0]);
				const out = new Array(n).fill(-1);
				const used = new Array(n).fill(false);
				for (const [, i, j] of pairs) if (out[i] < 0 && !used[j]) {
					out[i] = j;
					used[j] = true;
				}
				return out;
			}
			const idx = Array.from({ length: n }, (_, i) => i);
			let best = idx.slice();
			let bc = Number.POSITIVE_INFINITY;
			const perm = (arr, k, acc) => {
				if (acc >= bc) return;
				if (k === n) {
					bc = acc;
					best = arr.slice();
					return;
				}
				for (let i = k; i < n; i++) {
					[arr[k], arr[i]] = [arr[i], arr[k]];
					perm(arr, k + 1, acc + C[k][arr[k]]);
					[arr[k], arr[i]] = [arr[i], arr[k]];
				}
			};
			perm(idx, 0, 0);
			return best;
		}
		function bestSurjection(C) {
			const B = C.length;
			const S = C[0].length;
			if (S ** B > SURJ_MAX) {
				const f = C.map((row) => {
					let m = 0;
					for (let j = 1; j < row.length; j++) if (row[j] < row[m]) m = j;
					return m;
				});
				const mult = new Array(S).fill(0);
				for (const s of f) mult[s]++;
				for (let s = 0; s < S; s++) {
					if (mult[s] > 0) continue;
					let bi = -1;
					let bc = Number.POSITIVE_INFINITY;
					for (let i = 0; i < B; i++) {
						if (mult[f[i]] < 2) continue;
						const extra = C[i][s] - C[i][f[i]];
						if (extra < bc) {
							bc = extra;
							bi = i;
						}
					}
					mult[f[bi]]--;
					f[bi] = s;
					mult[s]++;
				}
				return f;
			}
			let best = null;
			let bc = Number.POSITIVE_INFINITY;
			const f = new Array(B);
			const mult = new Array(S).fill(0);
			const rec = (i, acc, covered) => {
				if (acc >= bc || S - covered > B - i) return;
				if (i === B) {
					bc = acc;
					best = f.slice();
					return;
				}
				for (let s = 0; s < S; s++) {
					f[i] = s;
					mult[s]++;
					rec(i + 1, acc + C[i][s], covered + (mult[s] === 1 ? 1 : 0));
					mult[s]--;
				}
			};
			rec(0, 0, 0);
			if (!best) throw new Error("morphicons: no valid surjection (B < S)");
			return best;
		}
		function applyGlobal(items, n) {
			const T = items.length * n;
			const ga = new Float64Array(2 * T);
			const gb = new Float64Array(2 * T);
			items.forEach((it, k) => {
				ga.set(it.a, 2 * n * k);
				gb.set(it.bO, 2 * n * k);
			});
			const gca = centroid(ga);
			const g = procrustes(ga, gb, gca, centroid(gb));
			if (g.res >= GLOBAL_EPS) return;
			const cos = Math.cos(-g.theta);
			const sin = Math.sin(-g.theta);
			const rc = Math.cos(g.theta);
			const rs = Math.sin(g.theta);
			for (const it of items) {
				let e2 = 0;
				let nb = 0;
				for (let i = 0; i < n; i++) {
					const bx = it.bO[2 * i] - it.cb[0];
					const by = it.bO[2 * i + 1] - it.cb[1];
					it.bT[2 * i] = (bx * cos - by * sin) / g.sigma;
					it.bT[2 * i + 1] = (bx * sin + by * cos) / g.sigma;
					const ex = g.sigma * (rc * it.aC[2 * i] - rs * it.aC[2 * i + 1]) - bx;
					const ey = g.sigma * (rs * it.aC[2 * i] + rc * it.aC[2 * i + 1]) - by;
					e2 += ex * ex + ey * ey;
					nb += bx * bx + by * by;
				}
				it.theta = g.theta;
				it.lnSigma = Math.log(g.sigma);
				it.res = nb > 1e-12 ? Math.sqrt(e2 / nb) : 0;
				const s1 = Math.exp(it.lnSigma);
				const c1 = Math.cos(it.theta) * s1;
				const n1 = Math.sin(it.theta) * s1;
				const ox = it.ca[0] - gca[0];
				const oy = it.ca[1] - gca[1];
				const rx = ox * c1 - oy * n1 - ox;
				const ry = ox * n1 + oy * c1 - oy;
				it.block = {
					off: [ox, oy],
					drift: [it.cb[0] - it.ca[0] - rx, it.cb[1] - it.ca[1] - ry]
				};
			}
		}
		/** Builds the morph plan between two lists of sampled subpaths. The plan is
		*  cacheable and serializable; it accepts any list — including intermediate
		*  shapes (interruptions). */
		function buildPlan(srcSubs, dstSubs) {
			const p = srcSubs.length;
			const q = dstSubs.length;
			if (p === 0 || q === 0) throw new Error("morphicons: icon has no subpaths");
			const A = srcSubs.map((s) => s.pts);
			const B = dstSubs.map((s) => s.pts);
			const pairs = [];
			if (p === q) {
				const perm = bestPermutation(costMatrix(A, B));
				for (let i = 0; i < p; i++) pairs.push([i, perm[i]]);
			} else if (p < q) {
				const f = bestSurjection(costMatrix(B, A));
				for (let j = 0; j < q; j++) pairs.push([f[j], j]);
			} else {
				const f = bestSurjection(costMatrix(A, B));
				for (let i = 0; i < p; i++) pairs.push([i, f[i]]);
			}
			const n = A[0].length / 2;
			const items = pairs.map(([si, di]) => {
				const al = alignPair(A[si], B[di], srcSubs[si].closed, dstSubs[di].closed);
				const a = al.a;
				const aC = new Float64Array(2 * n);
				const bT = new Float64Array(2 * n);
				const bO = new Float64Array(2 * n);
				const cos = Math.cos(-al.theta);
				const sin = Math.sin(-al.theta);
				for (let i = 0; i < n; i++) {
					aC[2 * i] = a[2 * i] - al.ca[0];
					aC[2 * i + 1] = a[2 * i + 1] - al.ca[1];
					const bx = al.b[2 * i] - al.cb[0];
					const by = al.b[2 * i + 1] - al.cb[1];
					bT[2 * i] = (bx * cos - by * sin) / al.sigma;
					bT[2 * i + 1] = (bx * sin + by * cos) / al.sigma;
					bO[2 * i] = al.b[2 * i];
					bO[2 * i + 1] = al.b[2 * i + 1];
				}
				return {
					a,
					aC,
					bT,
					bO,
					ca: al.ca,
					cb: al.cb,
					theta: al.theta,
					lnSigma: Math.log(al.sigma),
					res: al.res,
					closed: srcSubs[si].closed && dstSubs[di].closed,
					block: null
				};
			});
			if (items.length > 1) applyGlobal(items, n);
			return {
				items,
				n
			};
		}
		/** Default angular threshold for a segment joint to count as a corner. */
		const CORNER_THRESHOLD = Math.PI / 8;
		const GX = [
			.18343464249564978,
			.525532409916329,
			.7966664774136267,
			.9602898564975363
		];
		const GW = [
			.362683783378362,
			.31370664587788727,
			.22238103445337448,
			.10122853629037626
		];
		function speed(p, k, t) {
			const i = 6 * k;
			const u = 1 - t;
			const c0 = 3 * u * u;
			const c1 = 6 * u * t;
			const c2 = 3 * t * t;
			const dx = c0 * (p[i + 2] - p[i]) + c1 * (p[i + 4] - p[i + 2]) + c2 * (p[i + 6] - p[i + 4]);
			const dy = c0 * (p[i + 3] - p[i + 1]) + c1 * (p[i + 5] - p[i + 3]) + c2 * (p[i + 7] - p[i + 5]);
			return Math.hypot(dx, dy);
		}
		function segLen(p, k, t1 = 1) {
			const half = t1 / 2;
			let s = 0;
			for (let j = 0; j < 4; j++) s += GW[j] * (speed(p, k, half + half * GX[j]) + speed(p, k, half - half * GX[j]));
			return s * half;
		}
		function point(p, k, t, out, o) {
			const i = 6 * k;
			const u = 1 - t;
			const b0 = u * u * u;
			const b1 = 3 * u * u * t;
			const b2 = 3 * u * t * t;
			const b3 = t * t * t;
			out[o] = b0 * p[i] + b1 * p[i + 2] + b2 * p[i + 4] + b3 * p[i + 6];
			out[o + 1] = b0 * p[i + 1] + b1 * p[i + 3] + b2 * p[i + 5] + b3 * p[i + 7];
		}
		function tangent(p, k, atEnd) {
			const i = 6 * k;
			const b = atEnd ? i + 6 : i;
			const s = atEnd ? -1 : 1;
			for (const j of atEnd ? [
				4,
				2,
				0
			] : [
				2,
				4,
				6
			]) {
				const dx = s * (p[i + j] - p[b]);
				const dy = s * (p[i + j + 1] - p[b + 1]);
				if (dx * dx + dy * dy > 1e-18) return [dx, dy];
			}
			return null;
		}
		/** Segment boundaries (index of the segment starting at the corner) whose
		*  tangent discontinuity exceeds the threshold. For closed paths this
		*  includes the closing joint (boundary = first active segment). */
		function detectCorners(path, threshold = CORNER_THRESHOLD) {
			const p = path.pts;
			const m = (p.length / 2 - 1) / 3;
			const active = [];
			for (let k = 0; k < m; k++) if (segLen(p, k) > 1e-9) active.push(k);
			if (active.length === 0) return [];
			const corners = /* @__PURE__ */ new Set();
			const test = (a, b) => {
				const u = tangent(p, a, true);
				const v = tangent(p, b, false);
				if (!u || !v) return;
				if (Math.abs(Math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1])) > threshold) corners.add(b);
			};
			for (let j = 0; j + 1 < active.length; j++) test(active[j], active[j + 1]);
			if (path.closed && active.length > 1) test(active[active.length - 1], active[0]);
			return [...corners].sort((a, b) => a - b);
		}
		function invert(p, k, s, ls) {
			if (s <= 0) return 0;
			if (s >= ls) return 1;
			let lo = 0;
			let hi = 1;
			let t = s / ls;
			for (let it = 0; it < 12; it++) {
				const f = segLen(p, k, t) - s;
				if (Math.abs(f) < 1e-10 * ls + 1e-14) break;
				if (f > 0) hi = t;
				else lo = t;
				const sp = speed(p, k, t);
				let nt = sp > 1e-12 ? t - f / sp : (lo + hi) / 2;
				if (!(nt > lo && nt < hi)) nt = (lo + hi) / 2;
				t = nt;
			}
			return t;
		}
		/** Samples a cubic subpath at N points equidistant by arc length, anchoring
		*  corners and endpoints as exact samples. Returns Float64Array(2N). Closed
		*  paths distribute N intervals around the loop (without duplicating the
		*  first point); the circular start-point freedom is resolved by the plan's
		*  circular correspondence. */
		function resamplePath(path, N = 64, cornerThreshold = CORNER_THRESHOLD) {
			const p = path.pts;
			const m = (p.length / 2 - 1) / 3;
			const out = new Float64Array(2 * N);
			const fill = () => {
				for (let i = 0; i < N; i++) {
					out[2 * i] = p[0];
					out[2 * i + 1] = p[1];
				}
				return out;
			};
			if (m < 1) return fill();
			const lens = new Array(m);
			let L = 0;
			for (let k = 0; k < m; k++) {
				lens[k] = segLen(p, k);
				L += lens[k];
			}
			if (L < 1e-12) return fill();
			const cs = detectCorners(path, cornerThreshold);
			const anchors = path.closed ? cs.length > 0 ? cs : [0] : [.../* @__PURE__ */ new Set([
				0,
				...cs,
				m
			])].sort((a, b) => a - b);
			const runs = [];
			if (path.closed) for (let j = 0; j < anchors.length; j++) {
				const a = anchors[j];
				const b = j + 1 < anchors.length ? anchors[j + 1] : anchors[0] + m;
				runs.push([a, b]);
			}
			else for (let j = 0; j + 1 < anchors.length; j++) runs.push([anchors[j], anchors[j + 1]]);
			const rl = runs.map(([a, b]) => {
				let s = 0;
				for (let k = a; k < b; k++) s += lens[k % m];
				return s;
			});
			const intervals = path.closed ? N : N - 1;
			if (runs.length > intervals) throw new Error(`morphicons: N=${N} too small (${runs.length} runs)`);
			const total = rl.reduce((a, b) => a + b, 0) || 1;
			const ideal = rl.map((l) => intervals * l / total);
			const counts = ideal.map((q) => Math.max(1, Math.floor(q)));
			let R = intervals - counts.reduce((a, b) => a + b, 0);
			if (R > 0) {
				const order = ideal.map((q, idx) => [Math.round((q - Math.floor(q)) * 1e9), idx]).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
				for (let j = 0; j < R; j++) counts[order[j % counts.length][1]]++;
			}
			while (R < 0) {
				let bi = 0;
				for (let idx = 1; idx < counts.length; idx++) if (counts[idx] > counts[bi]) bi = idx;
				if (counts[bi] <= 1) break;
				counts[bi]--;
				R++;
			}
			let w = 0;
			for (let r = 0; r < runs.length; r++) {
				const [k0, k1] = runs[r];
				const cnt = counts[r];
				const Lr = rl[r];
				const vi = 6 * (k0 % m);
				out[2 * w] = p[vi];
				out[2 * w + 1] = p[vi + 1];
				w++;
				let seg = k0;
				let acc = 0;
				for (let j = 1; j < cnt; j++) {
					const target = Lr * j / cnt;
					while (seg < k1 - 1 && acc + lens[seg % m] < target) {
						acc += lens[seg % m];
						seg++;
					}
					const k = seg % m;
					const ls = lens[k];
					point(p, k, ls > 1e-12 ? invert(p, k, target - acc, ls) : 0, out, 2 * w);
					w++;
				}
			}
			if (!path.closed) {
				const vi = 6 * m;
				out[2 * w] = p[vi];
				out[2 * w + 1] = p[vi + 1];
			}
			return out;
		}
		/** Full input pipeline: icon → cubics → sampled subpaths with their
		*  topology (the plan needs to know which subpaths are closed loops). */
		function resampleIcon(input, N = 64) {
			return iconToCubics(input).map((path) => ({
				pts: resamplePath(path, N),
				closed: path.closed
			}));
		}
		var Spring = class {
			x = 1;
			v = 0;
			k = 250;
			c = 24;
			config(k, c) {
				this.k = k;
				this.c = c;
			}
			/** Starts (or restarts mid-flight) preserving velocity. */
			start() {
				this.x = 0;
				if (this.v > 14) this.v = 14;
				if (this.v < -14) this.v = -14;
			}
			/** Advances dt seconds. Returns true on settle (|1−x| < 0.001 ∧ |v| < 0.02). */
			step(dt) {
				const steps = Math.max(1, Math.min(16, Math.ceil(dt / (1 / 240))));
				const s = dt / steps;
				for (let i = 0; i < steps; i++) {
					const a = this.k * (1 - this.x) - this.c * this.v;
					this.v += a * s;
					this.x += this.v * s;
				}
				return Math.abs(1 - this.x) < .001 && Math.abs(this.v) < .02;
			}
		};
		/** Spring presets (ζ = c/(2√k)) with the API's public names. */
		const SPRING_PRESETS = {
			/** ζ = 1.00 — critically damped, no overshoot. */
			smooth: {
				k: 170,
				c: 26
			},
			/** ζ = 0.73 — fast, subtle overshoot. */
			snappy: {
				k: 420,
				c: 30
			},
			/** ζ = 0.40 — playful. */
			bouncy: {
				k: 300,
				c: 14
			}
		};
		//#endregion
		//#region node_modules/morphicons/dist/dom.js
		const tickers = /* @__PURE__ */ new Set();
		let rafId = 0;
		let last = -1;
		function loop(ts) {
			const dt = last < 0 ? 0 : Math.min(Math.max((ts - last) / 1e3, 0), .1);
			last = ts;
			for (const tick of [...tickers]) tick(dt);
			if (tickers.size > 0) rafId = requestAnimationFrame(loop);
			else {
				rafId = 0;
				last = -1;
			}
		}
		function addTicker(tick) {
			tickers.add(tick);
			if (rafId === 0) {
				last = -1;
				rafId = requestAnimationFrame(loop);
			}
		}
		function removeTicker(tick) {
			tickers.delete(tick);
			if (tickers.size === 0 && rafId !== 0) {
				cancelAnimationFrame(rafId);
				rafId = 0;
				last = -1;
			}
		}
		const samples = /* @__PURE__ */ new WeakMap();
		const canon = /* @__PURE__ */ new WeakMap();
		const plans = /* @__PURE__ */ new WeakMap();
		function sampledOf(icon) {
			if (typeof icon === "string") return resampleIcon(icon);
			let s = samples.get(icon);
			if (!s) {
				s = resampleIcon(icon);
				samples.set(icon, s);
			}
			return s;
		}
		/** Canonical `d` of an icon: the input string verbatim, or the real cubics
		*  quantized to 4 decimals (the at-rest snap; engine-stable bytes so SSR
		*  hydration matches, see fmtCanon in core/serialize). Exported because it
		*  is what a binding renders at SSR/rest before any runtime exists. */
		function canonicalD(icon) {
			if (typeof icon === "string") return icon;
			let d = canon.get(icon);
			if (!d) {
				d = cubicsToPathD(iconToCubics(icon));
				canon.set(icon, d);
			}
			return d;
		}
		function planBetween(src, dst) {
			if (typeof src === "string" || typeof dst === "string") return buildPlan(sampledOf(src), sampledOf(dst));
			let inner = plans.get(src);
			if (!inner) {
				inner = /* @__PURE__ */ new WeakMap();
				plans.set(src, inner);
			}
			let p = inner.get(dst);
			if (!p) {
				p = buildPlan(sampledOf(src), sampledOf(dst));
				inner.set(dst, p);
			}
			return p;
		}
		function resolveSpring(s) {
			if (typeof s === "string") return SPRING_PRESETS[s];
			const d = SPRING_PRESETS.snappy;
			return {
				k: s?.stiffness ?? d.k,
				c: s?.damping ?? d.c
			};
		}
		/** Creates the morph instance over a `<path>` and paints the initial icon. */
		function createMorph(el, icon, options) {
			const spring = new Spring();
			let reducedMotion = options?.reducedMotion ?? "never";
			let target = icon;
			let rest = true;
			let plan = null;
			let out = null;
			let closed = null;
			let t = 1;
			let flying = false;
			let dead = false;
			el.setAttribute("d", canonicalD(icon));
			const render = (tt) => {
				const p = plan;
				const o = out;
				const cl = closed;
				if (!p || !o || !cl) return;
				t = tt;
				interpPolar(p, tt, o);
				el.setAttribute("d", serialize(o, cl));
			};
			const stop = () => {
				if (!flying) return;
				flying = false;
				removeTicker(tick);
			};
			const tick = (dt) => {
				const settled = spring.step(dt);
				render(spring.x);
				if (settled) {
					stop();
					settle();
				}
			};
			const settle = () => {
				rest = true;
				plan = null;
				out = null;
				closed = null;
				t = 1;
				spring.x = 1;
				spring.v = 0;
				el.setAttribute("d", canonicalD(target));
			};
			/** The current shape as plan source: the at-rest icon, or the rendered
			*  buffers (already N points per subpath). */
			const snapshot = () => {
				const p = plan;
				const o = out;
				if (rest || !p || !o) return sampledOf(target);
				return o.map((buf, k) => ({
					pts: Float64Array.from(buf),
					closed: p.items[k].closed
				}));
			};
			const retarget = (icon) => {
				plan = rest ? planBetween(target, icon) : buildPlan(snapshot(), sampledOf(icon));
				out = allocOutputs(plan);
				closed = plan.items.map((it) => it.closed);
				target = icon;
				rest = false;
			};
			const setNow = (icon) => {
				stop();
				target = icon;
				settle();
			};
			/** True when the policy says this morphTo must jump instead of flying. */
			const motionOff = () => {
				if (reducedMotion === "always") return true;
				if (reducedMotion !== "user") return false;
				if (typeof matchMedia === "undefined") return false;
				return matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
			};
			const seek = (icon, tt) => {
				if (dead) return;
				const reuse = !rest && plan !== null && icon === target;
				stop();
				spring.v = 0;
				if (!reuse) retarget(icon);
				render(tt);
			};
			return {
				morphTo(icon, sp) {
					if (dead) return;
					if (icon === target && (rest || flying)) return;
					if (motionOff()) {
						setNow(icon);
						return;
					}
					const { k, c } = resolveSpring(sp);
					spring.config(k, c);
					retarget(icon);
					spring.start();
					if (!flying) {
						flying = true;
						addTicker(tick);
					}
				},
				set(icon) {
					if (dead) return;
					setNow(icon);
				},
				seek,
				get progress() {
					return rest ? 1 : t;
				},
				set progress(v) {
					if (!dead) seek(target, v);
				},
				get reducedMotion() {
					return reducedMotion;
				},
				set reducedMotion(v) {
					reducedMotion = v;
				},
				destroy() {
					stop();
					dead = true;
					plan = null;
					out = null;
					closed = null;
				}
			};
		}
		//#endregion
		//#region node_modules/morphicons/dist/react.js
		const useIsoLayoutEffect = typeof document === "undefined" ? react.useEffect : react.useLayoutEffect;
		/** Frozen shape of the from→to pair at t, using the pure core (SSR-safe).
		*  At exact endpoints returns the canonical `d` (real curves, not polyline). */
		function frozenD(from, to, t) {
			if (t <= 0) return canonicalD(from);
			if (t >= 1) return canonicalD(to);
			const plan = buildPlan(resampleIcon(from), resampleIcon(to));
			const out = allocOutputs(plan);
			interpPolar(plan, t, out);
			return serialize(out, plan.items.map((it) => it.closed));
		}
		const MorphIcon = (0, react.forwardRef)(function MorphIcon(props, ref) {
			const { icon, from, to, progress, spring, reducedMotion, size = 24, color = "currentColor", strokeWidth = 2, absoluteStrokeWidth, label, ...rest } = props;
			const controlled = from !== void 0 && to !== void 0;
			const initialIcon = icon ?? from ?? to;
			const [initialD] = (0, react.useState)(() => {
				if (controlled) return frozenD(from, to, progress ?? 0);
				return initialIcon !== void 0 ? canonicalD(initialIcon) : "";
			});
			const pathRef = (0, react.useRef)(null);
			const morphRef = (0, react.useRef)(null);
			const springRef = (0, react.useRef)(spring);
			springRef.current = spring;
			const rmRef = (0, react.useRef)(reducedMotion);
			rmRef.current = reducedMotion;
			const prevIcon = (0, react.useRef)(icon);
			const prevControlled = (0, react.useRef)(controlled);
			const dead = (0, react.useRef)(false);
			const based = (0, react.useRef)(false);
			const pair = (0, react.useRef)(null);
			/** Driver birth, lazy included (#1 of the lifecycle contract): an
			*  iconless mount keeps the element and the FIRST icon to show up (prop
			*  or imperative) creates the driver, already showing it — no flight.
			*  Stable across renders: closes over refs only. */
			const ensure = (0, react.useCallback)((birth) => {
				if (morphRef.current) return morphRef.current;
				const el = pathRef.current;
				if (dead.current || !el) return null;
				morphRef.current = createMorph(el, birth, { reducedMotion: rmRef.current });
				return morphRef.current;
			}, []);
			useIsoLayoutEffect(() => {
				dead.current = false;
				const el = pathRef.current;
				if (el && initialIcon !== void 0) {
					const m = createMorph(el, controlled ? from : initialIcon, { reducedMotion: rmRef.current });
					morphRef.current = m;
					if (controlled) {
						pair.current = [from, to];
						const t = progress ?? 0;
						if (t <= 0) m.set(from);
						else if (t >= 1) m.set(to);
						else {
							m.seek(to, t);
							based.current = true;
						}
					}
				}
				return () => {
					dead.current = true;
					morphRef.current?.destroy();
					morphRef.current = null;
					based.current = false;
					pair.current = null;
				};
			}, []);
			(0, react.useEffect)(() => {
				const m = morphRef.current;
				if (m) m.reducedMotion = reducedMotion ?? "never";
			}, [reducedMotion]);
			(0, react.useEffect)(() => {
				const left = prevControlled.current && !controlled;
				prevControlled.current = controlled;
				const changed = icon !== prevIcon.current;
				prevIcon.current = icon;
				if (controlled) return;
				if (icon === void 0 || !changed && !left) return;
				pair.current = null;
				based.current = false;
				const m = morphRef.current;
				if (m) m.morphTo(icon, springRef.current);
				else ensure(icon);
			}, [
				icon,
				controlled,
				ensure
			]);
			(0, react.useEffect)(() => {
				if (!controlled) return;
				const m = morphRef.current ?? ensure(from);
				if (!m) return;
				const t = progress ?? 0;
				if (!pair.current || pair.current[0] !== from || pair.current[1] !== to) {
					pair.current = [from, to];
					based.current = false;
				}
				if (t <= 0) {
					m.set(from);
					based.current = false;
				} else if (t >= 1) {
					m.set(to);
					based.current = false;
				} else {
					if (!based.current) {
						m.set(from);
						based.current = true;
					}
					m.seek(to, t);
				}
			}, [
				controlled,
				from,
				to,
				progress,
				ensure
			]);
			(0, react.useImperativeHandle)(ref, () => ({
				morphTo: (i, s) => {
					pair.current = null;
					based.current = false;
					const m = morphRef.current;
					if (m) m.morphTo(i, s ?? springRef.current);
					else ensure(i);
				},
				set: (i) => {
					pair.current = null;
					based.current = false;
					const m = morphRef.current;
					if (m) m.set(i);
					else ensure(i);
				}
			}), [ensure]);
			const sw = absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: size,
				height: size,
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: color,
				strokeWidth: sw,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				role: label ? "img" : void 0,
				"aria-hidden": label ? void 0 : true,
				...rest,
				children: [label ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("title", { children: label }) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					ref: pathRef,
					d: initialD
				})]
			});
		});
		//#endregion
		//#region src/client/index.tsx
		/**
		* @dsh-external/dsh-omniroute-models — client half.
		*
		* Registers a `settings.section` page ("OmniRoute 模型管理"), localized through
		* the DSH locale runtime (`ctx.locale`). Copy lives in `./locales.ts`
		* (namespace `omniroute-models`, zh/en); the section reads it via the
		* framework-injected `t` seat. All styling uses DSH's theme tokens.
		*/
		const name = "@dsh-external/dsh-omniroute-models";
		const inject = ["slots", "locale"];
		const API = "/omniroute-models/api";
		const PAGE_SIZE = 50;
		const IconChevronRight = [["path", { d: "m9 18 6-6-6-6" }]];
		const IconChevronDown = [["path", { d: "m6 9 6 6 6-6" }]];
		const IconRefresh = [["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }], ["path", { d: "M21 3v5h-5" }]];
		const IconCheck = [["path", { d: "M20 6 9 17l-5-5" }]];
		const IconX = [["path", { d: "M18 6 6 18" }], ["path", { d: "m6 6 12 12" }]];
		const STYLE = `
.om-root{color:var(--dsw-alias-label-primary);font-size:15px;line-height:1.6;font-family:var(--dsw-font-family,system-ui)}
.om-root *{box-sizing:border-box}
.om-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;margin-bottom:12px}
.om-title{font-size:18px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0}
.om-sub{font-size:13px;color:var(--dsw-alias-label-secondary)}
.om-count{margin-left:auto;font-size:13px;color:var(--dsw-alias-label-secondary)}
.om-toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px}
.om-group{display:flex;flex-wrap:wrap;gap:10px;align-items:center;min-width:0}
.om-group.right{margin-left:auto;justify-content:flex-end}
.om-toolbar .om-select{min-width:118px}
.om-search{flex:1 1 180px;min-width:170px;max-width:340px}
.om-input,.om-select{min-height:38px;padding:7px 12px;font-size:14px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px}
.om-input::placeholder{color:var(--dsw-alias-label-tertiary)}
.om-btn{display:inline-flex;align-items:center;gap:6px;min-height:38px;padding:7px 14px;font-size:14px;font-weight:500;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;cursor:pointer;transition:background .15s ease,border-color .15s ease}
.om-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.08))}
.om-btn:disabled{opacity:.5;cursor:not-allowed}
.om-btn.primary{color:var(--dsw-alias-label-primary-inverted,#fff);background:var(--dsw-alias-button-primary-fill);border-color:transparent}
.om-btn.primary:hover{background:var(--dsw-alias-button-primary-hover)}
.om-input:focus-visible,.om-select:focus-visible,.om-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.om-table-wrap{overflow-x:auto;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.om-table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:14px}
.om-table thead th{position:sticky;top:0;z-index:1;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:600;text-align:left;padding:10px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:1px solid var(--dsw-alias-border-l1)}
.om-table tbody td{padding:10px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);vertical-align:top;overflow-wrap:anywhere}
.om-table tbody tr:last-child td{border-bottom:none}
.om-table tbody tr:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.08))}
.om-table tbody tr.om-sel{background:var(--dsw-alias-interactive-bg-hover-accent,rgba(22,102,192,.1))}
.om-model-cell{overflow-wrap:anywhere}
.om-vendor{color:var(--dsw-alias-label-secondary);font-weight:600;font-size:13px}
.om-id{overflow-wrap:anywhere;word-break:break-word}
.om-meta{color:var(--dsw-alias-label-secondary);font-size:13px;white-space:nowrap}
.om-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;font-size:12px;font-weight:600;border-radius:999px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);white-space:nowrap}
.om-badge.img{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-interactive-bg-hover-accent,rgba(22,102,192,.12));border-color:var(--dsw-alias-border-l2)}
.om-foot{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px}
.om-status{font-size:13px}
.om-status.ok{color:var(--dsw-alias-state-success-primary)}
.om-status.err{color:var(--dsw-alias-state-error-primary)}
.om-empty{color:var(--dsw-alias-label-secondary);text-align:center;padding:32px 12px}
.om-note{color:var(--dsw-alias-label-tertiary);font-size:12px;margin-top:10px}
.om-card{border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);padding:20px;max-width:620px}
.om-card h3{font-size:16px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0 0 8px}
.om-card p{color:var(--dsw-alias-label-secondary);margin:0 0 14px}
.om-skel{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:20px;background:var(--dsw-alias-bg-layer-1)}
.om-skel .bar{height:14px;border-radius:6px;background:var(--dsw-alias-bg-skeleton);margin:0 0 12px}
.om-check{width:16px;height:16px;accent-color:var(--dsw-alias-brand-primary);cursor:pointer}
.om-tabs{display:flex;gap:2px;border-bottom:1px solid var(--dsw-alias-border-l2,#e5e7eb);align-items:flex-end;margin-bottom:12px;flex-wrap:wrap}
.om-tab{border:none;background:none;font:inherit;font-size:13px;color:var(--dsw-alias-label-secondary,#6b7280);padding:7px 12px;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap}
.om-tab.on{color:var(--dsw-alias-brand-primary,#4f6ef7);border-bottom-color:var(--dsw-alias-brand-primary,#4f6ef7);font-weight:600}
.om-row{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;margin-bottom:12px}
.om-field{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap}
.om-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px 14px;margin:2px 0 12px}
.om-adv{display:inline-flex;align-items:center;gap:4px;padding:0;border:none;background:none;color:var(--dsw-alias-label-secondary,#6b7280);font:inherit;font-size:13px;cursor:pointer}
.om-adv:hover{color:var(--dsw-alias-brand-primary,#4f6ef7)}
`;
		/** Translate a host-driven message: prefer the localized `code`, else the raw text. */
		function hostMessage(t, code, params, fallback) {
			const key = "host." + (code ?? "");
			if (code && key in zh) return t(key, params);
			return fallback;
		}
		function apply(ctx) {
			ctx.effect(() => {
				const style = document.createElement("style");
				style.textContent = STYLE;
				document.head.appendChild(style);
				return () => style.remove();
			}, "omniroute-models: styles");
			ctx.effect(() => {
				const disposers = [];
				for (const locale of ["zh", "en"]) disposers.push(ctx.locale.register(NS, locale, dictionaries[locale]));
				return () => {
					for (const dispose of disposers) dispose();
				};
			}, "omniroute-models: copy dictionaries");
			ctx.effect(() => {
				const t = ctx.locale.bind(NS);
				return ctx.slots.inject("settings.section", () => ctx.slots.register({
					name: "settings.section",
					id: "omniroute-models",
					order: 15,
					label: () => t("nav"),
					inject: () => ({ t })
				}, OmnirouteModelsSection));
			}, "omniroute-models: settings.section");
		}
		function fmtTokens(n) {
			if (!n || n <= 0 || !Number.isFinite(n)) return "-";
			if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + "M";
			if (n >= 1e3) return (n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1) + "K";
			return String(n);
		}
		const SEARCH_DEFAULT_BASE = "http://localhost:20128/v1";
		function SearchConfigCard({ t }) {
			const [form, setForm] = (0, react.useState)({
				searchEnabled: false,
				searchProvider: "",
				searchBaseURL: SEARCH_DEFAULT_BASE,
				searchApiKeyEnv: "OMNIROUTE_API_KEY",
				searchApiKey: "",
				searchMaxResults: 8
			});
			const [providers, setProviders] = (0, react.useState)([]);
			const [revision, setRevision] = (0, react.useState)(void 0);
			const [loading, setLoading] = (0, react.useState)(false);
			const [saving, setSaving] = (0, react.useState)(false);
			const [testing, setTesting] = (0, react.useState)(false);
			const [showAdvanced, setShowAdvanced] = (0, react.useState)(false);
			const [flash, setFlash] = (0, react.useState)(null);
			async function load() {
				setLoading(true);
				setFlash(null);
				try {
					const data = await (await fetch(API + "/search-config", { cache: "no-store" })).json();
					if (data.config) setForm((f) => ({
						...f,
						...data.config
					}));
					setProviders(data.providers ?? []);
					setRevision(data.revision);
				} catch (e) {
					setFlash({
						kind: "err",
						text: String(e.message ?? e)
					});
				} finally {
					setLoading(false);
				}
			}
			(0, react.useEffect)(() => {
				load();
			}, []);
			function field(key, value) {
				setForm((prev) => ({
					...prev,
					[key]: value
				}));
			}
			async function save() {
				setSaving(true);
				setFlash(null);
				try {
					const res = await fetch(API + "/search-config", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							config: form,
							expectedRevision: revision
						})
					});
					const data = await res.json();
					if (!res.ok || !data.ok) {
						setFlash({
							kind: "err",
							text: hostMessage(t, data.code, void 0, data.error ?? t("status.applyFailed"))
						});
						return;
					}
					setFlash({
						kind: "ok",
						text: t("search.saved")
					});
					await load();
				} catch (e) {
					setFlash({
						kind: "err",
						text: String(e.message ?? e)
					});
				} finally {
					setSaving(false);
				}
			}
			async function test() {
				setTesting(true);
				setFlash(null);
				try {
					const data = await (await fetch(API + "/search-test", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ config: form })
					})).json();
					if (data.ok) setFlash({
						kind: "ok",
						text: t("search.testOk", { count: data.count ?? 0 })
					});
					else setFlash({
						kind: "err",
						text: data.error ?? t("search.testFail", { error: "" })
					});
				} catch (e) {
					setFlash({
						kind: "err",
						text: t("search.testFail", { error: String(e.message ?? e) })
					});
				} finally {
					setTesting(false);
				}
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "om-card",
				style: { marginBottom: 0 },
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "om-head",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							className: "om-title",
							children: t("search.title")
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "om-row",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							className: "om-field",
							style: { cursor: "pointer" },
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: "om-check",
								type: "checkbox",
								checked: form.searchEnabled,
								onChange: (e) => field("searchEnabled", e.target.checked)
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("search.enabled") })]
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-grid",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							className: "om-field",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-sub",
								children: t("search.provider")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								className: "om-select",
								value: form.searchProvider,
								onChange: (e) => field("searchProvider", e.target.value),
								style: { minWidth: 180 },
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: "",
									children: t("search.provider.auto")
								}), providers.map((p) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: p.id,
									children: p.name || p.id
								}, p.id))]
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							className: "om-field",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-sub",
								children: t("search.maxResults")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: "om-input",
								type: "number",
								min: 1,
								max: 50,
								style: { width: 90 },
								value: form.searchMaxResults,
								onChange: (e) => field("searchMaxResults", Number(e.target.value))
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: "om-adv",
						onClick: () => setShowAdvanced((s) => !s),
						"aria-expanded": showAdvanced,
						style: { marginBottom: showAdvanced ? 10 : 0 },
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(MorphIcon, {
								icon: showAdvanced ? IconChevronDown : IconChevronRight,
								size: 14,
								strokeWidth: 2
							}),
							" ",
							t("search.advanced")
						]
					}),
					showAdvanced && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-grid",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: "om-field",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "om-sub",
									children: t("search.baseURL")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: "om-input",
									style: { width: 260 },
									value: form.searchBaseURL,
									onChange: (e) => field("searchBaseURL", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: "om-field",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "om-sub",
									children: t("search.apiKeyEnv")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: "om-input",
									style: { width: 180 },
									value: form.searchApiKeyEnv,
									onChange: (e) => field("searchApiKeyEnv", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: "om-field",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "om-sub",
									children: "API Key"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: "om-input",
									type: "password",
									style: { width: 220 },
									value: form.searchApiKey,
									placeholder: "(optional)",
									onChange: (e) => field("searchApiKey", e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-foot",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => void test(),
								disabled: testing || loading,
								children: testing ? t("search.testing") : t("search.test")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn primary",
								onClick: () => void save(),
								disabled: saving || loading,
								children: t("search.save")
							}),
							flash && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-status " + flash.kind,
								role: "status",
								children: flash.text
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "om-note",
						children: t("search.hint")
					})
				]
			});
		}
		function OmnirouteModelsSection(props) {
			const t = props.t;
			const [catalog, setCatalog] = (0, react.useState)(null);
			const [provider, setProvider] = (0, react.useState)("");
			const [loading, setLoading] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const [query, setQuery] = (0, react.useState)("");
			const [modality, setModality] = (0, react.useState)("all");
			const [vendorFilter, setVendorFilter] = (0, react.useState)("all");
			const [enabledFilter, setEnabledFilter] = (0, react.useState)("all");
			const [checked, setChecked] = (0, react.useState)(/* @__PURE__ */ new Set());
			const [saving, setSaving] = (0, react.useState)(false);
			const [flash, setFlash] = (0, react.useState)(null);
			const [page, setPage] = (0, react.useState)(1);
			const [tab, setTab] = (0, react.useState)("models");
			let loadCtrl = null;
			async function load(p) {
				loadCtrl?.abort();
				const ctrl = new AbortController();
				loadCtrl = ctrl;
				setLoading(true);
				setError(null);
				setFlash(null);
				try {
					const qs = p ? `?provider=${encodeURIComponent(p)}` : "";
					const data = await (await fetch(`${API}/catalog${qs}`, {
						cache: "no-store",
						signal: ctrl.signal
					})).json();
					if (ctrl.signal.aborted) return;
					setCatalog(data);
					setProvider(data.provider ?? "");
					const enabled = /* @__PURE__ */ new Set();
					for (const m of data.models ?? []) if (m.enabled) enabled.add(m.id);
					setChecked(enabled);
				} catch (e) {
					if (e.name === "AbortError" || ctrl.signal.aborted) return;
					setError(String(e.message ?? e));
				} finally {
					if (loadCtrl === ctrl) setLoading(false);
				}
			}
			(0, react.useEffect)(() => {
				load();
				return () => {
					loadCtrl?.abort();
				};
			}, []);
			function selectProvider(p) {
				setProvider(p);
				setQuery("");
				setModality("all");
				setVendorFilter("all");
				setEnabledFilter("all");
				load(p);
			}
			const vendors = (0, react.useMemo)(() => {
				const set = /* @__PURE__ */ new Set();
				for (const m of catalog?.models ?? []) set.add(m.vendor);
				return [...set].sort();
			}, [catalog]);
			const filtered = (0, react.useMemo)(() => {
				const models = catalog?.models ?? [];
				const q = query.trim().toLowerCase();
				const out = models.filter((m) => {
					if (q && !m.id.toLowerCase().includes(q) && !(m.name ?? "").toLowerCase().includes(q)) return false;
					if (modality === "image" && !m.input.includes("image")) return false;
					if (modality === "text" && m.input.includes("image")) return false;
					if (vendorFilter !== "all") {
						if (vendorFilter === "") {
							if (m.vendor !== "") return false;
						} else if (m.vendor !== vendorFilter) return false;
					}
					if (enabledFilter === "enabled" && !m.enabled) return false;
					if (enabledFilter === "disabled" && m.enabled) return false;
					return true;
				});
				out.sort((a, b) => a.vendor.localeCompare(b.vendor) || (a.name ?? "").toLowerCase().localeCompare((b.name ?? "").toLowerCase()) || a.id.localeCompare(b.id));
				return out;
			}, [
				catalog,
				query,
				modality,
				vendorFilter,
				enabledFilter
			]);
			const total = catalog?.models?.length ?? 0;
			const enabledCount = catalog?.enabledCount ?? 0;
			const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
			const safePage = Math.min(page, totalPages);
			const paged = (0, react.useMemo)(() => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE), [filtered, safePage]);
			(0, react.useEffect)(() => {
				setPage(1);
			}, [
				query,
				modality,
				vendorFilter,
				enabledFilter,
				catalog
			]);
			function toggle(id) {
				setChecked((prev) => {
					const next = new Set(prev);
					if (next.has(id)) next.delete(id);
					else next.add(id);
					return next;
				});
			}
			async function apply() {
				const selected = (catalog?.models ?? []).filter((m) => checked.has(m.id));
				if (selected.length === 0) {
					setFlash({
						kind: "err",
						text: t("status.minOne")
					});
					return;
				}
				setSaving(true);
				setFlash(null);
				try {
					const res = await fetch(`${API}/apply`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							provider: catalog?.provider,
							models: selected.map((m) => ({
								id: m.id,
								name: m.name,
								input: m.input,
								contextWindow: m.contextWindow,
								maxTokens: m.maxTokens
							}))
						})
					});
					const body = await res.json();
					if (!res.ok || !body.ok) {
						setFlash({
							kind: "err",
							text: hostMessage(t, body.code, body.params, body.error ?? t("status.applyFailed"))
						});
						return;
					}
					setFlash({
						kind: "ok",
						text: t("status.saved", { count: selected.length })
					});
					await load();
				} catch (e) {
					setFlash({
						kind: "err",
						text: String(e.message ?? e)
					});
				} finally {
					setSaving(false);
				}
			}
			function renderModels() {
				if (loading && !catalog) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					"aria-busy": "true",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-skel",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "bar",
								style: { width: "40%" }
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "bar",
								style: { width: "80%" }
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "bar",
								style: { width: "60%" }
							})
						]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "om-note",
						children: t("loading.fetching")
					})]
				});
				if (error && !catalog) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("error.loadFailed") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: error }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void load(),
							children: t("error.retry")
						})
					]
				});
				if (!catalog?.configured) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("configured.title") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: hostMessage(t, catalog?.code, catalog?.params, catalog?.message ?? t("configured.notSet")) }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void load(),
							children: t("configured.recheck")
						})
					]
				});
				if (catalog?.compatible === false) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: catalog.displayName || catalog.provider }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: hostMessage(t, catalog?.code, catalog?.params, catalog?.message ?? t("notCompatible.msg")) }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void selectProvider(provider === catalog.provider ? "" : catalog.provider),
							children: t("action.back")
						})
					]
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-head",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								className: "om-title",
								children: t("head.title")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "om-sub",
								children: [
									catalog.displayName || catalog.provider,
									catalog.api ? " · " + catalog.api : "",
									" · ",
									catalog.baseURL
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-count",
								children: t("counts.enabled", {
									enabled: enabledCount,
									total
								})
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-toolbar",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "om-group",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									style: {
										display: "inline-flex",
										alignItems: "center",
										gap: 6
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "om-sub",
										children: t("toolbar.route")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
										className: "om-select",
										value: provider,
										onChange: (e) => selectProvider(e.target.value),
										style: { minWidth: 170 },
										children: [(catalog.providers ?? []).map((p) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
											value: p.provider,
											children: [
												p.displayName,
												"（",
												p.modelCount,
												"）",
												p.compatible ? "" : " · " + t("option.notDiscoverable")
											]
										}, p.provider)), !catalog.providers?.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: provider,
											children: catalog.provider
										})]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: "om-input om-search",
									placeholder: t("toolbar.search"),
									value: query,
									onChange: (e) => setQuery(e.target.value)
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
									className: "om-select",
									value: modality,
									onChange: (e) => setModality(e.target.value),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "all",
											children: t("filter.modality.all")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "text",
											children: t("filter.modality.text")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "image",
											children: t("filter.modality.image")
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
									className: "om-select",
									value: vendorFilter,
									onChange: (e) => setVendorFilter(e.target.value),
									style: { minWidth: 150 },
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "all",
										children: t("filter.vendor.all")
									}), vendors.map((v) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: v,
										children: v === "" ? t("filter.vendor.none") : v
									}, v || "__none__"))]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
									className: "om-select",
									value: enabledFilter,
									onChange: (e) => setEnabledFilter(e.target.value),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "all",
											children: t("filter.enabled.all")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "enabled",
											children: t("filter.enabled.enabled")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "disabled",
											children: t("filter.enabled.disabled")
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "om-group right",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: "om-btn",
									onClick: () => setChecked((prev) => {
										const next = new Set(prev);
										for (const m of filtered) next.add(m.id);
										return next;
									}),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(MorphIcon, {
											icon: IconCheck,
											size: 15,
											strokeWidth: 2
										}),
										" ",
										t("action.selectMatching")
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: "om-btn",
									onClick: () => setChecked(/* @__PURE__ */ new Set()),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(MorphIcon, {
											icon: IconX,
											size: 15,
											strokeWidth: 2
										}),
										" ",
										t("action.deselectAll")
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: "om-btn",
									onClick: () => void load(provider),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(MorphIcon, {
											icon: IconRefresh,
											size: 15,
											strokeWidth: 2
										}),
										" ",
										t("action.refresh")
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "om-table-wrap",
						style: { maxHeight: 420 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
							className: "om-table",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { style: { width: 44 } }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("col.model") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: { width: 108 },
									children: t("col.modality")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: {
										width: 80,
										textAlign: "right"
									},
									children: t("col.context")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: {
										width: 80,
										textAlign: "right"
									},
									children: t("col.output")
								})
							] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tbody", { children: [filtered.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
								colSpan: 5,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "om-empty",
									children: t("empty.noMatch")
								})
							}) }), paged.map((m) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", {
								className: checked.has(m.id) ? "om-sel" : void 0,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
										style: {
											verticalAlign: "middle",
											padding: "10px 0",
											textAlign: "center"
										},
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											className: "om-check",
											type: "checkbox",
											checked: checked.has(m.id),
											onChange: () => toggle(m.id),
											"aria-label": t("aria.selectModel", { id: m.id })
										})
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "om-model-cell",
										children: [m.vendor && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: "om-vendor",
											children: [m.vendor, " / "]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "om-id",
											children: m.vendor ? m.id.slice(m.vendor.length + 1) : m.id
										})]
									}) }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "om-badge" + (m.input.includes("image") ? " img" : ""),
										children: m.input.includes("image") ? t("modality.textImage") : t("modality.text")
									}) }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
										className: "om-meta",
										style: { textAlign: "right" },
										children: fmtTokens(m.contextWindow)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
										className: "om-meta",
										style: { textAlign: "right" },
										children: fmtTokens(m.maxTokens)
									})
								]
							}, m.id))] })]
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-pager",
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							marginTop: 10
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => setPage((p) => Math.max(1, p - 1)),
								disabled: safePage <= 1,
								children: t("action.prevPage")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-sub",
								children: t("counts.page", {
									page: safePage,
									totalPages
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
								disabled: safePage >= totalPages,
								children: t("action.nextPage")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-foot",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn primary",
								onClick: () => void apply(),
								disabled: saving,
								style: { minWidth: 120 },
								children: saving ? t("action.saving") : t("action.save")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-sub",
								children: t("counts.selected", {
									checked: checked.size,
									matched: filtered.length,
									total
								})
							}),
							flash && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-status " + flash.kind,
								role: "status",
								children: flash.text
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "om-note",
						children: t("note.save")
					})
				] });
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "om-root",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-tabs",
					role: "tablist",
					"aria-label": t("nav"),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						role: "tab",
						"aria-selected": tab === "models",
						className: tab === "models" ? "om-tab on" : "om-tab",
						onClick: () => setTab("models"),
						children: t("tab.models")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						role: "tab",
						"aria-selected": tab === "search",
						className: tab === "search" ? "om-tab on" : "om-tab",
						onClick: () => setTab("search"),
						children: t("tab.search")
					})]
				}), tab === "models" ? renderModels() : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SearchConfigCard, { t })]
			});
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map