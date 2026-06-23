const STORAGE_KEY = "buildpilot.v1";

const modules = [
  ["dashboard", "Dashboard", "layout-dashboard"],
  ["projects", "Projects", "building-2"],
  ["rfis", "RFIs", "circle-help"],
  ["submittals", "Submittals", "clipboard-check"],
  ["dailyLogs", "Daily Logs", "calendar-days"],
  ["punch", "Punch List", "badge-check"],
  ["budget", "Budget", "wallet-cards"],
  ["changeOrders", "Change Orders", "file-diff"],
  ["schedule", "Schedule", "calendar-clock"],
  ["documents", "Documents", "folder-open"],
  ["directory", "Directory", "users"],
  ["reports", "Reports", "chart-column"]
];

const schema = {
  projects: {
    title: "Projects",
    description: "Control active jobs, health, contract values, and project teams.",
    addLabel: "Add Project",
    fields: [
      ["name", "Project Name", "text"],
      ["number", "Number", "text"],
      ["client", "Client", "text"],
      ["manager", "Manager", "text"],
      ["phase", "Phase", "select", ["Preconstruction", "Mobilization", "Construction", "Closeout"]],
      ["status", "Health", "select", ["On Track", "At Risk", "Critical"]],
      ["budget", "Budget", "number"],
      ["spent", "Committed", "number"],
      ["start", "Start", "date"],
      ["finish", "Finish", "date"]
    ],
    columns: ["number", "name", "client", "manager", "phase", "status"]
  },
  rfis: {
    title: "RFIs",
    description: "Track questions, ball-in-court, due dates, impacts, and closeout.",
    addLabel: "New RFI",
    fields: [
      ["subject", "Subject", "text"],
      ["number", "Number", "text"],
      ["projectId", "Project", "project"],
      ["assignee", "Ball In Court", "text"],
      ["status", "Status", "select", ["Draft", "Open", "Answered", "Closed", "Overdue"]],
      ["priority", "Priority", "select", ["Low", "Medium", "High", "Critical"]],
      ["due", "Due Date", "date"],
      ["impact", "Impact", "select", ["None", "Cost", "Schedule", "Cost + Schedule"]],
      ["details", "Question", "textarea"]
    ],
    columns: ["number", "subject", "projectId", "assignee", "status", "due"]
  },
  submittals: {
    title: "Submittals",
    description: "Keep packages, reviewers, lead times, and approvals moving.",
    addLabel: "New Submittal",
    fields: [
      ["title", "Title", "text"],
      ["number", "Number", "text"],
      ["projectId", "Project", "project"],
      ["spec", "Spec Section", "text"],
      ["reviewer", "Reviewer", "text"],
      ["status", "Status", "select", ["Draft", "Submitted", "In Review", "Revise and Resubmit", "Approved", "Closed"]],
      ["due", "Due Date", "date"],
      ["leadTime", "Lead Time Days", "number"]
    ],
    columns: ["number", "title", "projectId", "spec", "status", "due"]
  },
  dailyLogs: {
    title: "Daily Logs",
    description: "Capture field conditions, manpower, equipment, deliveries, and notes.",
    addLabel: "New Log",
    fields: [
      ["date", "Date", "date"],
      ["projectId", "Project", "project"],
      ["weather", "Weather", "text"],
      ["manpower", "Manpower", "number"],
      ["safety", "Safety Notes", "textarea"],
      ["work", "Work Performed", "textarea"],
      ["delays", "Delays", "textarea"]
    ],
    columns: ["date", "projectId", "weather", "manpower", "work", "delays"]
  },
  punch: {
    title: "Punch List",
    description: "Assign, inspect, and close field issues by location and trade.",
    addLabel: "New Item",
    fields: [
      ["item", "Item", "text"],
      ["projectId", "Project", "project"],
      ["location", "Location", "text"],
      ["trade", "Trade", "text"],
      ["assignee", "Assignee", "text"],
      ["status", "Status", "select", ["Open", "Ready for Review", "Rejected", "Closed"]],
      ["priority", "Priority", "select", ["Low", "Medium", "High", "Critical"]],
      ["due", "Due Date", "date"]
    ],
    columns: ["item", "projectId", "location", "trade", "assignee", "status"]
  },
  budget: {
    title: "Budget",
    description: "View cost codes, original budget, commitments, forecast, and variance.",
    addLabel: "New Cost Code",
    fields: [
      ["code", "Cost Code", "text"],
      ["projectId", "Project", "project"],
      ["description", "Description", "text"],
      ["original", "Original Budget", "number"],
      ["approvedChanges", "Approved Changes", "number"],
      ["committed", "Committed", "number"],
      ["actuals", "Actuals", "number"],
      ["forecast", "Forecast", "number"]
    ],
    columns: ["code", "description", "projectId", "original", "committed", "forecast"]
  },
  changeOrders: {
    title: "Change Orders",
    description: "Manage potential, submitted, approved, and rejected change events.",
    addLabel: "New Change",
    fields: [
      ["title", "Title", "text"],
      ["number", "Number", "text"],
      ["projectId", "Project", "project"],
      ["status", "Status", "select", ["Potential", "Pricing", "Submitted", "Approved", "Rejected"]],
      ["amount", "Amount", "number"],
      ["reason", "Reason", "select", ["Owner Request", "Design Conflict", "Field Condition", "Allowance", "Other"]],
      ["due", "Response Due", "date"],
      ["notes", "Notes", "textarea"]
    ],
    columns: ["number", "title", "projectId", "status", "amount", "due"]
  },
  schedule: {
    title: "Schedule",
    description: "Track milestones and lookahead activities with responsible parties.",
    addLabel: "New Activity",
    fields: [
      ["activity", "Activity", "text"],
      ["projectId", "Project", "project"],
      ["owner", "Responsible", "text"],
      ["status", "Status", "select", ["Not Started", "In Progress", "Blocked", "Complete"]],
      ["start", "Start", "date"],
      ["finish", "Finish", "date"],
      ["percent", "Percent Complete", "number"]
    ],
    columns: ["activity", "projectId", "owner", "status", "start", "finish"]
  },
  documents: {
    title: "Documents",
    description: "Keep plans, specs, permits, photos, and closeout files organized.",
    addLabel: "New Document",
    fields: [
      ["name", "Name", "text"],
      ["projectId", "Project", "project"],
      ["type", "Type", "select", ["Drawing", "Spec", "Permit", "Photo", "Closeout", "Meeting Minutes"]],
      ["revision", "Revision", "text"],
      ["status", "Status", "select", ["Current", "Superseded", "Draft", "Archived"]],
      ["owner", "Owner", "text"],
      ["updated", "Updated", "date"]
    ],
    columns: ["name", "projectId", "type", "revision", "status", "updated"]
  },
  directory: {
    title: "Directory",
    description: "Find companies, contacts, roles, phones, emails, and compliance status.",
    addLabel: "New Contact",
    fields: [
      ["name", "Name", "text"],
      ["company", "Company", "text"],
      ["role", "Role", "text"],
      ["email", "Email", "email"],
      ["phone", "Phone", "text"],
      ["trade", "Trade", "text"],
      ["status", "Status", "select", ["Active", "Needs Insurance", "Inactive"]]
    ],
    columns: ["name", "company", "role", "email", "phone", "status"]
  }
};

const today = new Date();
const iso = days => new Date(today.getFullYear(), today.getMonth(), today.getDate() + days).toISOString().slice(0, 10);

const seedData = {
  selectedProjectId: "p1",
  activeModule: "dashboard",
  selectedRecords: {},
  filter: "All",
  search: "",
  projects: [
    { id: "p1", name: "Northline Medical Center", number: "24-101", client: "NMC Health", manager: "An Nguyen", phase: "Construction", status: "At Risk", budget: 18500000, spent: 11240000, start: "2026-01-12", finish: "2026-11-20" },
    { id: "p2", name: "Riverside Mixed Use", number: "24-144", client: "Bexley Partners", manager: "Maya Chen", phase: "Mobilization", status: "On Track", budget: 9400000, spent: 2160000, start: "2026-05-01", finish: "2027-03-18" },
    { id: "p3", name: "Cedar Labs Renovation", number: "25-012", client: "Cedar Bio", manager: "Luis Ortega", phase: "Closeout", status: "Critical", budget: 3200000, spent: 3385000, start: "2025-08-15", finish: "2026-07-10" }
  ],
  rfis: [
    { id: "r1", number: "RFI-081", projectId: "p1", subject: "OR 3 med gas headwall conflict", assignee: "Jacobs Design", status: "Overdue", priority: "Critical", due: iso(-3), impact: "Schedule", details: "Headwall backing conflicts with revised med gas routing." },
    { id: "r2", number: "RFI-082", projectId: "p1", subject: "Clarify lobby ceiling cloud attachment", assignee: "Acoustics Inc.", status: "Open", priority: "Medium", due: iso(2), impact: "None", details: "Confirm hanger pattern at curved ceiling." },
    { id: "r3", number: "RFI-014", projectId: "p2", subject: "Garage exhaust fan access", assignee: "Bexley Partners", status: "Answered", priority: "High", due: iso(4), impact: "Cost", details: "Need access door sizing approval." }
  ],
  submittals: [
    { id: "s1", number: "07 42 13-04", projectId: "p1", title: "Metal Wall Panels", spec: "07 42 13", reviewer: "Jacobs Design", status: "In Review", due: iso(1), leadTime: 42 },
    { id: "s2", number: "23 05 93-02", projectId: "p1", title: "Testing, Adjusting, Balancing", spec: "23 05 93", reviewer: "MEP Engineer", status: "Revise and Resubmit", due: iso(-1), leadTime: 14 },
    { id: "s3", number: "08 44 13-01", projectId: "p2", title: "Glazed Aluminum Curtain Wall", spec: "08 44 13", reviewer: "Architect", status: "Submitted", due: iso(7), leadTime: 56 }
  ],
  dailyLogs: [
    { id: "d1", date: iso(0), projectId: "p1", weather: "82F clear", manpower: 74, safety: "No incidents. Reviewed ladder setup.", work: "Level 2 framing, OR rough-in, exterior sheathing.", delays: "Waiting on RFI-081 before closing OR wall." },
    { id: "d2", date: iso(-1), projectId: "p1", weather: "Rain AM", manpower: 68, safety: "Wet surface reminder issued.", work: "MEP overhead layout and roof blocking.", delays: "Crane pick delayed 2 hours." }
  ],
  punch: [
    { id: "pl1", item: "Replace chipped tile at patient room 214", projectId: "p1", location: "Level 2", trade: "Tile", assignee: "Prime Finish", status: "Open", priority: "Medium", due: iso(5) },
    { id: "pl2", item: "Fire caulk missing at east riser", projectId: "p1", location: "Level 3 East", trade: "Firestop", assignee: "SafeSeal", status: "Ready for Review", priority: "High", due: iso(1) },
    { id: "pl3", item: "Touch up millwork panel", projectId: "p3", location: "Lab 102", trade: "Millwork", assignee: "Oakline", status: "Rejected", priority: "Low", due: iso(-2) }
  ],
  budget: [
    { id: "b1", code: "03-300", projectId: "p1", description: "Cast-in-place concrete", original: 1430000, approvedChanges: 24000, committed: 1398000, actuals: 1239000, forecast: 1451000 },
    { id: "b2", code: "09-290", projectId: "p1", description: "Gypsum board assemblies", original: 920000, approvedChanges: 48000, committed: 1006000, actuals: 612000, forecast: 1018000 },
    { id: "b3", code: "26-000", projectId: "p1", description: "Electrical", original: 3110000, approvedChanges: 76000, committed: 3275000, actuals: 2188000, forecast: 3312000 },
    { id: "b4", code: "08-400", projectId: "p2", description: "Openings and glazing", original: 1180000, approvedChanges: 0, committed: 884000, actuals: 120000, forecast: 1195000 }
  ],
  changeOrders: [
    { id: "co1", number: "PCO-017", projectId: "p1", title: "Owner requested imaging room shielding", status: "Submitted", amount: 184000, reason: "Owner Request", due: iso(3), notes: "Pricing validated with trade partners." },
    { id: "co2", number: "PCO-018", projectId: "p1", title: "Storm drain reroute", status: "Pricing", amount: 62000, reason: "Field Condition", due: iso(1), notes: "Civil engineer reviewing alternate path." },
    { id: "co3", number: "CO-006", projectId: "p3", title: "Added lab casework", status: "Approved", amount: 94000, reason: "Owner Request", due: iso(-10), notes: "Executed." }
  ],
  schedule: [
    { id: "sch1", activity: "Level 2 wall close-in", projectId: "p1", owner: "An Nguyen", status: "Blocked", start: iso(-2), finish: iso(5), percent: 62 },
    { id: "sch2", activity: "Roof air handler setting", projectId: "p1", owner: "MEP Coordinator", status: "In Progress", start: iso(1), finish: iso(2), percent: 20 },
    { id: "sch3", activity: "Garage foundations", projectId: "p2", owner: "Concrete PM", status: "Not Started", start: iso(8), finish: iso(20), percent: 0 },
    { id: "sch4", activity: "Owner training", projectId: "p3", owner: "Luis Ortega", status: "In Progress", start: iso(0), finish: iso(6), percent: 40 }
  ],
  documents: [
    { id: "doc1", name: "A2.11 Level 2 Floor Plan", projectId: "p1", type: "Drawing", revision: "ASI-04", status: "Current", owner: "Document Control", updated: iso(-2) },
    { id: "doc2", name: "Northline Infection Control Plan", projectId: "p1", type: "Permit", revision: "Rev 2", status: "Current", owner: "Safety", updated: iso(-11) },
    { id: "doc3", name: "Riverside GMP Book", projectId: "p2", type: "Spec", revision: "Final", status: "Current", owner: "Estimating", updated: iso(-20) }
  ],
  directory: [
    { id: "u1", name: "An Nguyen", company: "Prime Build", role: "Project Executive", email: "an@primebuild.example", phone: "555-0188", trade: "GC", status: "Active" },
    { id: "u2", name: "Priya Shah", company: "Jacobs Design", role: "Architect", email: "priya@jacobs.example", phone: "555-0144", trade: "Design", status: "Active" },
    { id: "u3", name: "Chris Miller", company: "VoltWorks", role: "Electrical PM", email: "chris@voltworks.example", phone: "555-0160", trade: "Electrical", status: "Needs Insurance" },
    { id: "u4", name: "Maya Chen", company: "Prime Build", role: "Project Manager", email: "maya@primebuild.example", phone: "555-0124", trade: "GC", status: "Active" }
  ]
};

let state = loadState();
let selected = null;
let modal = null;

function loadState() {
  try {
    return { ...structuredClone(seedData), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return structuredClone(seedData);
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function icon(name) {
  const paths = {
    "layout-dashboard": '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
    "building-2": '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 12H4a2 2 0 0 0-2 2v8"/><path d="M18 9h2a2 2 0 0 1 2 2v11"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>',
    "circle-help": '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.6 1.5c-.7 1-1.7 1.3-2.2 2.4"/><path d="M12 17h.01"/>',
    "clipboard-check": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    "calendar-days": '<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
    "badge-check": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
    "wallet-cards": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M7 15h.01M11 15h2"/>',
    "file-diff": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M12 18v-6M9 15h6"/>',
    "calendar-clock": '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5M16 2v4M8 2v4M3 10h5"/><circle cx="17" cy="17" r="5"/><path d="M17 14v3l2 1"/>',
    "folder-open": '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.3 10H20a2 2 0 0 1 1.8 2.9l-2.2 4.4A3 3 0 0 1 17 19H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l2 3h6a2 2 0 0 1 2 2v2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    "chart-column": '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'
  };
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ""}</svg>`;
}

function money(value) {
  return Number(value || 0).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function projectName(id) {
  return state.projects.find(p => p.id === id)?.name || "All Projects";
}

function scopedRows(module) {
  const rows = state[module] || [];
  if (module === "projects" || module === "directory") return rows;
  return rows.filter(row => row.projectId === state.selectedProjectId);
}

function visibleRows(module) {
  const query = state.search.trim().toLowerCase();
  const rows = scopedRows(module);
  return rows.filter(row => {
    const matchesText = !query || Object.values(row).join(" ").toLowerCase().includes(query);
    const matchesFilter = state.filter === "All" || row.status === state.filter || row.priority === state.filter || row.type === state.filter || row.phase === state.filter;
    return matchesText && matchesFilter;
  });
}

function statusClass(value = "") {
  const v = String(value).toLowerCase();
  if (["approved", "closed", "complete", "current", "answered", "on track", "active"].some(x => v.includes(x))) return "green";
  if (["critical", "overdue", "rejected", "blocked", "needs"].some(x => v.includes(x))) return "red";
  if (["at risk", "open", "pricing", "submitted", "in review", "ready"].some(x => v.includes(x))) return "orange";
  if (["draft", "potential", "not started"].some(x => v.includes(x))) return "blue";
  return "yellow";
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="mark">BP</div>
          <div><strong>BuildPilot</strong><span>Construction command center</span></div>
        </div>
        <div class="project-switcher">
          <label for="projectSelect">Active Project</label>
          <select id="projectSelect">${state.projects.map(p => `<option value="${p.id}" ${p.id === state.selectedProjectId ? "selected" : ""}>${p.number} · ${p.name}</option>`).join("")}</select>
        </div>
        <nav class="nav">${modules.map(([key, label, ico]) => `<button class="${state.activeModule === key ? "active" : ""}" data-module="${key}">${icon(ico)} ${label}</button>`).join("")}</nav>
      </aside>
      <main class="main">
        <div class="topbar">
          <div class="search">${icon("search")}<input id="searchInput" placeholder="Search the jobsite, docs, costs, people..." value="${escapeHtml(state.search)}"></div>
          <div class="actions">
            <button class="btn ghost" id="resetBtn" title="Restore demo data">${icon("reset")} Reset</button>
            <button class="btn ghost" id="exportBtn">${icon("download")} Export</button>
            <button class="btn primary" id="addBtn">${icon("plus")} Add</button>
          </div>
        </div>
        <section class="content">${renderModule()}</section>
      </main>
    </div>
    ${modal ? renderModal() : ""}
  `;
  bind();
}

function renderModule() {
  if (state.activeModule === "dashboard") return renderDashboard();
  if (state.activeModule === "reports") return renderReports();
  const cfg = schema[state.activeModule];
  const rows = visibleRows(state.activeModule);
  const activeRow = rows.find(row => row.id === state.selectedRecords?.[state.activeModule]) || rows[0];
  const statuses = ["All", ...new Set(scopedRows(state.activeModule).flatMap(row => [row.status, row.priority, row.type, row.phase].filter(Boolean)))];
  return `
    <div class="module-head">
      <div><h1>${cfg.title}</h1><p class="lede">${cfg.description}</p></div>
      <div class="toolbar">
        <div class="segmented">${statuses.slice(0, 6).map(s => `<button class="${state.filter === s ? "active" : ""}" data-filter="${s}">${s}</button>`).join("")}</div>
      </div>
    </div>
    <div class="workbench">
      <div class="card panel">
        <div class="panel-head"><h2>${rows.length} records</h2><button class="btn primary" data-new="${state.activeModule}">${icon("plus")} ${cfg.addLabel}</button></div>
        ${rows.length ? renderTable(state.activeModule, rows, cfg) : `<div class="empty">No records match this view.</div>`}
      </div>
      <aside class="card panel">${renderDetail(state.activeModule, activeRow)}</aside>
    </div>
  `;
}

function renderDashboard() {
  const project = state.projects.find(p => p.id === state.selectedProjectId);
  const openRfis = scopedRows("rfis").filter(x => !["Closed", "Answered"].includes(x.status));
  const overdue = [...scopedRows("rfis"), ...scopedRows("submittals"), ...scopedRows("punch"), ...scopedRows("changeOrders")].filter(x => x.due && x.due < iso(0) && !["Closed", "Approved", "Answered"].includes(x.status));
  const coTotal = scopedRows("changeOrders").filter(x => x.status !== "Rejected").reduce((sum, x) => sum + Number(x.amount || 0), 0);
  const budgetRows = scopedRows("budget");
  const forecast = budgetRows.reduce((sum, x) => sum + Number(x.forecast || 0), 0);
  const original = budgetRows.reduce((sum, x) => sum + Number(x.original || 0) + Number(x.approvedChanges || 0), 0);
  const scheduleItems = scopedRows("schedule");
  const progress = Math.round(scheduleItems.reduce((sum, x) => sum + Number(x.percent || 0), 0) / Math.max(scheduleItems.length, 1));
  const insights = buildInsights();
  return `
    <div class="module-head">
      <div><h1>${project.name}</h1><p class="lede">${project.client} · ${project.phase} · ${project.manager}</p></div>
      <div class="toolbar"><span class="tag ${statusClass(project.status)}">${project.status}</span><button class="btn primary" data-new="dailyLogs">${icon("plus")} Daily Log</button></div>
    </div>
    <div class="grid stats">
      <div class="card stat"><span>Open RFIs</span><strong>${openRfis.length}</strong><small>${overdue.length} overdue items need action</small></div>
      <div class="card stat"><span>Change Exposure</span><strong>${money(coTotal)}</strong><small>Potential plus submitted changes</small></div>
      <div class="card stat"><span>Forecast Variance</span><strong>${money(forecast - original)}</strong><small>${money(forecast)} forecast at completion</small></div>
      <div class="card stat"><span>Schedule Progress</span><strong>${progress}%</strong><div class="progress"><span style="width:${Math.max(0, Math.min(100, progress))}%"></span></div></div>
    </div>
    <div class="workbench">
      <div class="card panel">
        <div class="panel-head"><h2>Priority Work</h2><div class="segmented"><button class="active">Live</button><button>Lookahead</button></div></div>
        <div class="kanban">
          ${renderLane("Blocked", scheduleItems.filter(x => x.status === "Blocked"))}
          ${renderLane("Due Soon", [...openRfis, ...scopedRows("submittals"), ...scopedRows("punch")].filter(x => x.due <= iso(5)))}
          ${renderLane("Field", scopedRows("dailyLogs").slice(0, 4))}
          ${renderLane("Cost", scopedRows("changeOrders").filter(x => x.status !== "Approved"))}
        </div>
      </div>
      <aside class="card panel assistant-box">
        <div class="panel-head"><h2>BuildPilot Assistant</h2><span class="tag blue">Better than passive tracking</span></div>
        ${insights.map(i => `<div class="insight"><strong>${i.title}</strong><p class="lede">${i.body}</p></div>`).join("")}
        <div class="timeline">${renderTimeline()}</div>
      </aside>
    </div>
  `;
}

function renderLane(title, items) {
  return `<div class="lane"><h3>${title}<span class="tag">${items.length}</span></h3>${items.length ? items.map(item => `<div class="task"><strong>${escapeHtml(item.subject || item.title || item.activity || item.item || item.date || item.number)}</strong><small>${escapeHtml(item.assignee || item.owner || item.status || item.work || item.reason || "")}</small>${item.due ? `<span class="tag ${statusClass(item.status || item.priority)}">${item.due}</span>` : ""}</div>`).join("") : `<p class="lede">Nothing here.</p>`}</div>`;
}

function renderTimeline() {
  const events = [
    ["Today", `${scopedRows("dailyLogs")[0]?.manpower || 0} workers logged on site.`],
    ["Next 48 hours", `${scopedRows("schedule").filter(x => x.start <= iso(2) && x.finish >= iso(0)).length} active schedule activities.`],
    ["Cost", `${scopedRows("changeOrders").filter(x => ["Pricing", "Submitted"].includes(x.status)).length} change items waiting for decision.`]
  ];
  return events.map(([title, body]) => `<div class="event"><span class="dot"></span><div><strong>${title}</strong><p>${body}</p></div></div>`).join("");
}

function buildInsights() {
  const insights = [];
  const lateRfi = scopedRows("rfis").find(x => x.status === "Overdue");
  if (lateRfi) insights.push({ title: "Unblock the schedule", body: `${lateRfi.number} is overdue and tied to ${lateRfi.impact.toLowerCase()} impact. Escalate ${lateRfi.assignee} before the next close-in activity.` });
  const budgetRisk = scopedRows("budget").find(x => Number(x.forecast) > Number(x.original) + Number(x.approvedChanges));
  if (budgetRisk) insights.push({ title: "Cost code drifting", body: `${budgetRisk.code} is forecasting above current budget by ${money(Number(budgetRisk.forecast) - Number(budgetRisk.original) - Number(budgetRisk.approvedChanges))}.` });
  const compliance = state.directory.find(x => x.status === "Needs Insurance");
  if (compliance) insights.push({ title: "Compliance warning", body: `${compliance.company} needs insurance updated before award or payment release.` });
  insights.push({ title: "Owner-ready summary", body: "Export the current view any time for a clean CSV snapshot you can send or archive." });
  return insights.slice(0, 4);
}

function renderReports() {
  const allRows = Object.keys(schema).flatMap(key => scopedRows(key).map(row => ({ key, row })));
  const risk = allRows.filter(({ row }) => ["Overdue", "Critical", "Blocked", "Rejected", "At Risk", "Needs Insurance"].includes(row.status) || row.priority === "Critical");
  const costs = scopedRows("budget");
  return `
    <div class="module-head"><div><h1>Reports</h1><p class="lede">Executive snapshots that combine field, cost, schedule, and risk signals.</p></div><button class="btn primary" id="exportBtn2">${icon("download")} Export Report</button></div>
    <div class="grid stats">
      <div class="card stat"><span>Risk Items</span><strong>${risk.length}</strong><small>Critical, blocked, overdue, or rejected</small></div>
      <div class="card stat"><span>Open Commitments</span><strong>${money(costs.reduce((s, x) => s + Number(x.committed || 0), 0))}</strong><small>Across active cost codes</small></div>
      <div class="card stat"><span>Documents</span><strong>${scopedRows("documents").length}</strong><small>Current project records</small></div>
      <div class="card stat"><span>Contacts</span><strong>${state.directory.length}</strong><small>Company directory</small></div>
    </div>
    <div class="two-col">
      <div class="card panel"><div class="panel-head"><h2>Risk Register</h2></div>${renderRiskList(risk)}</div>
      <div class="card panel"><div class="panel-head"><h2>Cost Forecast</h2></div>${renderCostSummary(costs)}</div>
    </div>
  `;
}

function renderRiskList(risk) {
  if (!risk.length) return `<div class="empty">No elevated risks in this project.</div>`;
  return risk.map(({ key, row }) => `<div class="task"><strong>${schema[key]?.title || key}: ${escapeHtml(row.subject || row.title || row.item || row.activity || row.name || row.code)}</strong><small>${escapeHtml(row.status || row.priority || "")} ${row.due ? `· due ${row.due}` : ""}</small></div>`).join("");
}

function renderCostSummary(rows) {
  if (!rows.length) return `<div class="empty">No budget rows yet.</div>`;
  return rows.map(row => {
    const revised = Number(row.original || 0) + Number(row.approvedChanges || 0);
    const variance = Number(row.forecast || 0) - revised;
    return `<div class="task"><strong>${row.code} · ${escapeHtml(row.description)}</strong><small>Forecast ${money(row.forecast)} · variance ${money(variance)}</small><div class="progress"><span style="width:${Math.min(100, Math.round((Number(row.committed || 0) / Math.max(revised, 1)) * 100))}%"></span></div></div>`;
  }).join("");
}

function renderTable(module, rows, cfg) {
  return `<div class="table-wrap"><table><thead><tr>${cfg.columns.map(c => `<th>${labelFor(c)}</th>`).join("")}<th></th></tr></thead><tbody>${rows.map(row => `<tr class="${state.selectedRecords?.[module] === row.id ? "selected" : ""}" data-row="${row.id}">${cfg.columns.map(col => `<td>${formatCell(col, row[col])}</td>`).join("")}<td><div class="row-actions"><button class="mini" title="Edit" data-edit="${row.id}">${icon("edit")}</button><button class="mini" title="Delete" data-delete="${row.id}">${icon("trash")}</button></div></td></tr>`).join("")}</tbody></table></div>`;
}

function renderDetail(module, row) {
  if (!row) return `<div class="empty">Select or create a record to see details.</div>`;
  const cfg = schema[module];
  selected = row.id;
  return `<div class="detail"><div class="detail-title"><div><h2>${escapeHtml(row.subject || row.title || row.name || row.item || row.activity || row.code || row.date)}</h2><p class="lede">${cfg.title}</p></div><span class="tag ${statusClass(row.status || row.priority)}">${escapeHtml(row.status || row.priority || "Record")}</span></div>${cfg.fields.map(([key, label]) => `<div class="kv"><span>${label}</span><strong>${formatCell(key, row[key])}</strong></div>`).join("")}</div>`;
}

function renderModal() {
  const cfg = schema[modal.module];
  const editing = modal.id ? state[modal.module].find(x => x.id === modal.id) : {};
  return `<div class="modal-backdrop"><form class="modal" id="recordForm">
    <header><h2>${modal.id ? "Edit" : "Create"} ${cfg.title}</h2><button class="mini" type="button" id="closeModal">${icon("x")}</button></header>
    <main class="form">${cfg.fields.map(field => renderField(field, editing || {})).join("")}</main>
    <footer><button type="button" class="btn ghost" id="cancelModal">Cancel</button><button class="btn primary" type="submit">Save Record</button></footer>
  </form></div>`;
}

function renderField([key, label, type, options], record) {
  const value = record[key] ?? defaultFor(type);
  if (type === "textarea") return `<div class="field"><label>${label}</label><textarea name="${key}">${escapeHtml(value)}</textarea></div>`;
  if (type === "select") return `<div class="field"><label>${label}</label><select name="${key}">${options.map(o => `<option ${o === value ? "selected" : ""}>${o}</option>`).join("")}</select></div>`;
  if (type === "project") return `<div class="field"><label>${label}</label><select name="${key}">${state.projects.map(p => `<option value="${p.id}" ${p.id === (value || state.selectedProjectId) ? "selected" : ""}>${p.number} · ${p.name}</option>`).join("")}</select></div>`;
  return `<div class="field"><label>${label}</label><input name="${key}" type="${type}" value="${escapeHtml(value)}"></div>`;
}

function defaultFor(type) {
  if (type === "number") return 0;
  if (type === "date") return iso(0);
  if (type === "project") return state.selectedProjectId;
  return "";
}

function bind() {
  document.querySelectorAll("[data-module]").forEach(btn => btn.addEventListener("click", () => {
    state.activeModule = btn.dataset.module;
    state.filter = "All";
    save();
    render();
  }));
  document.querySelector("#projectSelect").addEventListener("change", e => {
    state.selectedProjectId = e.target.value;
    state.filter = "All";
    save();
    render();
  });
  document.querySelector("#searchInput").addEventListener("input", e => {
    const cursor = e.target.selectionStart;
    state.search = e.target.value;
    save();
    render();
    const search = document.querySelector("#searchInput");
    search.focus();
    search.setSelectionRange(cursor, cursor);
  });
  document.querySelectorAll("[data-filter]").forEach(btn => btn.addEventListener("click", () => {
    state.filter = btn.dataset.filter;
    save();
    render();
  }));
  document.querySelectorAll("[data-new]").forEach(btn => btn.addEventListener("click", () => openNew(btn.dataset.new)));
  document.querySelector("#addBtn").addEventListener("click", () => openNew(state.activeModule === "dashboard" || state.activeModule === "reports" ? "rfis" : state.activeModule));
  document.querySelectorAll("[data-edit]").forEach(btn => btn.addEventListener("click", () => {
    modal = { module: state.activeModule, id: btn.dataset.edit };
    render();
  }));
  document.querySelectorAll("[data-row]").forEach(row => row.addEventListener("click", event => {
    if (event.target.closest("button")) return;
    state.selectedRecords = state.selectedRecords || {};
    state.selectedRecords[state.activeModule] = row.dataset.row;
    save();
    render();
  }));
  document.querySelectorAll("[data-delete]").forEach(btn => btn.addEventListener("click", () => {
    state[state.activeModule] = state[state.activeModule].filter(x => x.id !== btn.dataset.delete);
    save();
    render();
  }));
  document.querySelector("#exportBtn")?.addEventListener("click", exportCurrent);
  document.querySelector("#exportBtn2")?.addEventListener("click", exportCurrent);
  document.querySelector("#resetBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(seedData);
    render();
  });
  document.querySelector("#closeModal")?.addEventListener("click", closeModal);
  document.querySelector("#cancelModal")?.addEventListener("click", closeModal);
  document.querySelector("#recordForm")?.addEventListener("submit", submitForm);
}

function openNew(module) {
  if (!schema[module]) module = "rfis";
  modal = { module, id: null };
  render();
}

function closeModal() {
  modal = null;
  render();
}

function submitForm(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  const cfg = schema[modal.module];
  cfg.fields.forEach(([key, , type]) => {
    if (type === "number") data[key] = Number(data[key] || 0);
  });
  if (modal.id) {
    state[modal.module] = state[modal.module].map(row => row.id === modal.id ? { ...row, ...data } : row);
  } else {
    state[modal.module].unshift({ id: crypto.randomUUID(), ...data });
  }
  save();
  modal = null;
  render();
}

function exportCurrent() {
  const module = state.activeModule === "dashboard" || state.activeModule === "reports" ? "reports" : state.activeModule;
  const rows = module === "reports" ? buildReportRows() : visibleRows(module);
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `buildpilot-${module}-${iso(0)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function buildReportRows() {
  return Object.keys(schema).flatMap(key => scopedRows(key).map(row => ({ module: schema[key].title, ...row, project: projectName(row.projectId) })));
}

function toCsv(rows) {
  const headers = [...new Set(rows.flatMap(row => Object.keys(row)))];
  const esc = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map(row => headers.map(h => esc(row[h])).join(","))].join("\n");
}

function labelFor(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase()).replace("Id", "");
}

function formatCell(key, value) {
  if (key === "projectId") return escapeHtml(projectName(value));
  if (["budget", "spent", "original", "approvedChanges", "committed", "actuals", "forecast", "amount"].includes(key)) return money(value);
  if (key === "status" || key === "priority" || key === "phase" || key === "type") return `<span class="tag ${statusClass(value)}">${escapeHtml(value)}</span>`;
  return escapeHtml(value ?? "");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

render();
