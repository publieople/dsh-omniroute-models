window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-omniroute-models",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/index.tsx
		/**
		* @dsh-external/dsh-omniroute-models — client half.
		*
		* Registers a `settings.section` page ("OmniRoute 模型管理"). All styling uses
		* DSH's theme tokens (`--dsw-alias-*` / `--dsw-font-*`) so it matches the
		* panel's light/dark surfaces and stays readable at every contrast level.
		*/
		const name = "@dsh-external/dsh-omniroute-models";
		const inject = ["slots"];
		const API = "/omniroute-models/api";
		const STYLE = `
.om-root{color:var(--dsw-alias-label-primary);font-size:15px;line-height:1.6;font-family:var(--dsw-font-family,system-ui)}
.om-root *{box-sizing:border-box}
.om-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;margin-bottom:12px}
.om-title{font-size:18px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0}
.om-sub{font-size:13px;color:var(--dsw-alias-label-secondary)}
.om-count{margin-left:auto;font-size:13px;color:var(--dsw-alias-label-secondary)}
.om-toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px}
.om-input,.om-select{min-height:38px;padding:7px 12px;font-size:14px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px}
.om-input::placeholder{color:var(--dsw-alias-label-tertiary)}
.om-btn{min-height:38px;padding:7px 14px;font-size:14px;font-weight:500;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;cursor:pointer;transition:background .15s ease,border-color .15s ease}
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
`;
		function apply(ctx) {
			ctx.effect(() => {
				const style = document.createElement("style");
				style.textContent = STYLE;
				document.head.appendChild(style);
				return () => style.remove();
			}, "omniroute-models: styles");
			ctx.effect(() => ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "omniroute-models",
				order: 15,
				label: () => "OmniRoute 模型管理"
			}, OmnirouteModelsSection)), "omniroute-models: settings.section");
		}
		function fmtTokens(n) {
			if (!n || n <= 0 || !Number.isFinite(n)) return "-";
			if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + "M";
			if (n >= 1e3) return (n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1) + "K";
			return String(n);
		}
		function OmnirouteModelsSection(_props) {
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
				return models.filter((m) => {
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
			}, [
				catalog,
				query,
				modality,
				vendorFilter,
				enabledFilter
			]);
			const total = catalog?.models?.length ?? 0;
			const enabledCount = catalog?.enabledCount ?? 0;
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
						text: "至少勾选 1 个模型"
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
							text: body.error ?? "应用失败"
						});
						return;
					}
					setFlash({
						kind: "ok",
						text: "已保存 " + selected.length + " 个模型"
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
			if (loading && !catalog) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "om-root",
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
					children: "正在拉取 OmniRoute 模型…"
				})]
			});
			if (error && !catalog) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "om-root",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "加载失败" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: error }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void load(),
							children: "重试"
						})
					]
				})
			});
			if (!catalog?.configured) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "om-root",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "OmniRoute 模型管理" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: catalog?.message ?? "未配置 OmniRoute 提供方。" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void load(),
							children: "重新检查"
						})
					]
				})
			});
			if (catalog?.compatible === false) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "om-root",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: catalog.displayName || catalog.provider }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: catalog?.message ?? "该供应商不支持自动发现。" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void selectProvider(provider === catalog.provider ? "" : catalog.provider),
							children: "返回"
						})
					]
				})
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "om-root",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-head",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								className: "om-title",
								children: "模型管理"
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
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "om-count",
								children: [
									"已启用 ",
									enabledCount,
									" / ",
									total
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-toolbar",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 6
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "om-sub",
									children: "路由"
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
											p.compatible ? "" : " · 不可自动发现"
										]
									}, p.provider)), !catalog.providers?.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: provider,
										children: catalog.provider
									})]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: "om-input",
								style: { width: 240 },
								placeholder: "搜索模型 id 或名称…",
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
										children: "全部模态"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "text",
										children: "仅文本"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "image",
										children: "视觉（含图片）"
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
									children: "全部供应商"
								}), vendors.map((v) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: v,
									children: v === "" ? "无命名空间" : v
								}, v || "__none__"))]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								className: "om-select",
								value: enabledFilter,
								onChange: (e) => setEnabledFilter(e.target.value),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "all",
										children: "全部"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "enabled",
										children: "已启用"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "disabled",
										children: "未启用"
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => setChecked((prev) => {
									const next = new Set(prev);
									for (const m of filtered) next.add(m.id);
									return next;
								}),
								children: "全选匹配"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => setChecked(/* @__PURE__ */ new Set()),
								children: "全不选"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => void load(provider),
								children: "拉取"
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "om-table-wrap",
						style: { maxHeight: 420 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
							className: "om-table",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { style: { width: 44 } }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "模型" }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: { width: 108 },
									children: "模态"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: {
										width: 80,
										textAlign: "right"
									},
									children: "上下文"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: {
										width: 80,
										textAlign: "right"
									},
									children: "输出"
								})
							] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tbody", { children: [filtered.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
								colSpan: 5,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "om-empty",
									children: "无匹配模型"
								})
							}) }), filtered.map((m) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", {
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
											"aria-label": `选择 ${m.id}`
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
										children: m.input.includes("image") ? "text + image" : "text"
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
						className: "om-foot",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn primary",
								onClick: () => void apply(),
								disabled: saving,
								style: { minWidth: 120 },
								children: saving ? "保存中…" : "保存所选"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "om-sub",
								children: [
									"已选 ",
									checked.size,
									" · 匹配 ",
									filtered.length,
									" · 共 ",
									total
								]
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
						children: "保存即整体替换该路由的 models 列表（DSH 恰好能用勾选的这些）；筛选只影响显示，不影响已勾选的保存内容；未保存前不落盘。"
					})
				]
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