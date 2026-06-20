const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const DEFAULT_CATEGORIES = {
  Receita: ["Aposentadoria", "Aluguel", "Serviços", "Investimentos", "Outras receitas"],
  Despesa: ["Casa", "Saúde", "Mercado", "Transporte", "Impostos", "Lazer", "Outras despesas"],
};

const DEFAULT_PAYMENTS = ["Pix", "Débito", "Crédito", "Dinheiro", "Boleto", "Transferência"];
const DEFAULT_INCOME_SOURCES = ["Lurdes", "Camargo", "Família", "Banco", "Outro", "Não se aplica"];
const DEFAULT_ACCOUNTS = ["Carteira", "Conta corrente", "Poupança", "Cartão", "Investimentos"];
const DEFAULT_OWNER_NAME = "Lurdes Camargo";
const STORAGE_KEY = "lurdes-controle-financeiro-v1";

const sampleEntries = [
  entry("2026-06-01", 5, "Receita", "Aposentadoria", "Aposentadoria", "Aposentadoria", "Transferência", "Conta corrente", 4200, "Recebimento mensal"),
  entry("2026-06-03", 5, "Despesa", "Não se aplica", "Mercado", "Mercado", "Débito", "Conta corrente", 536.9, ""),
  entry("2026-06-07", 5, "Despesa", "Não se aplica", "UNIMED", "Saúde", "Boleto", "Conta corrente", 890, ""),
  entry("2026-06-10", 5, "Despesa", "Não se aplica", "Farmácia", "Saúde", "Pix", "Conta corrente", 148.35, ""),
  entry("2026-05-01", 4, "Receita", "Aposentadoria", "Aposentadoria", "Aposentadoria", "Transferência", "Conta corrente", 4200, ""),
  entry("2026-05-12", 4, "Despesa", "Não se aplica", "IPVA", "Impostos", "Boleto", "Conta corrente", 612.44, ""),
  entry("2026-04-01", 3, "Receita", "Aluguel", "Aluguel", "Aluguel", "Pix", "Poupança", 1550, ""),
  entry("2026-04-16", 3, "Despesa", "Não se aplica", "Mercado", "Mercado", "Débito", "Conta corrente", 468.8, ""),
];

const state = loadState();
let activeHistoryFilter = "all";
let activeVisualTab = "overview";
let activeRegistrationTab = "entry";

const els = {
  monthFilter: document.querySelector("#monthFilter"),
  yearFilter: document.querySelector("#yearFilter"),
  controlYearLabel: document.querySelector("#controlYearLabel"),
  ownerName: document.querySelector("#ownerName"),
  ownerNameHeading: document.querySelector("#ownerNameHeading"),
  themeToggle: document.querySelector("#themeToggle"),
  exportCsv: document.querySelector("#exportCsv"),
  resetData: document.querySelector("#resetData"),
  clearData: document.querySelector("#clearData"),
  clearDataDialog: document.querySelector("#clearDataDialog"),
  clearDataForm: document.querySelector("#clearDataForm"),
  clearDataConfirmation: document.querySelector("#clearDataConfirmation"),
  cancelClearData: document.querySelector("#cancelClearData"),
  confirmClearData: document.querySelector("#confirmClearData"),
  startingBalanceTotal: document.querySelector("#startingBalanceTotal"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  balanceTotal: document.querySelector("#balanceTotal"),
  endingBalanceTotal: document.querySelector("#endingBalanceTotal"),
  entryCount: document.querySelector("#entryCount"),
  cashflowChart: document.querySelector("#cashflowChart"),
  monthlyChart: document.querySelector("#monthlyChart"),
  incomeSummaryPanel: document.querySelector("#incomeSummaryPanel"),
  nameSheetPanel: document.querySelector("#nameSheetPanel"),
  entryForm: document.querySelector("#entryForm"),
  cancelEdit: document.querySelector("#cancelEdit"),
  editingId: document.querySelector("#editingId"),
  date: document.querySelector("#date"),
  referenceMonth: document.querySelector("#referenceMonth"),
  type: document.querySelector("#type"),
  incomeSource: document.querySelector("#incomeSource"),
  description: document.querySelector("#description"),
  category: document.querySelector("#category"),
  addCategory: document.querySelector("#addCategory"),
  payment: document.querySelector("#payment"),
  account: document.querySelector("#account"),
  addAccount: document.querySelector("#addAccount"),
  amount: document.querySelector("#amount"),
  notes: document.querySelector("#notes"),
  incomeSourceChart: document.querySelector("#incomeSourceChart"),
  incomeSourcesPanel: document.querySelector("#incomeSourcesPanel"),
  incomeSourceForm: document.querySelector("#incomeSourceForm"),
  newIncomeSource: document.querySelector("#newIncomeSource"),
  incomeSourcesList: document.querySelector("#incomeSourcesList"),
  finalAccountBalanceChart: document.querySelector("#finalAccountBalanceChart"),
  selectedMonthLabel: document.querySelector("#selectedMonthLabel"),
  visualTabs: document.querySelector("#visualTabs"),
  visualOverviewPanel: document.querySelector("#visualOverviewPanel"),
  visualPaymentPanel: document.querySelector("#visualPaymentPanel"),
  categoryChart: document.querySelector("#categoryChart"),
  accountChart: document.querySelector("#accountChart"),
  paymentChart: document.querySelector("#paymentChart"),
  searchInput: document.querySelector("#searchInput"),
  entriesTable: document.querySelector("#entriesTable"),
};

init();
registerServiceWorker();

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !location.protocol.startsWith("http")) return;
  navigator.serviceWorker.register("./service-worker.js").catch(() => {
    // The app remains fully usable when offline installation is unavailable.
  });
}

function entry(date, referenceMonth, type, incomeSource, description, category, payment, account, amount, notes) {
  return {
    id: crypto.randomUUID(),
    date,
    referenceMonth,
    type,
    incomeSource,
    description,
    category,
    payment,
    account,
    amount,
    notes,
  };
}

function init() {
  fillSelect(els.monthFilter, MONTHS.map((name, index) => ({ label: name, value: index })));
  fillYearFilter(new Date().getFullYear());
  fillSelect(els.referenceMonth, MONTHS.map((name, index) => ({ label: name, value: index })));
  fillSelect(els.incomeSource, state.incomeSources);
  fillSelect(els.payment, DEFAULT_PAYMENTS);
  fillSelect(els.account, state.accounts);
  els.monthFilter.value = new Date().getMonth();
  els.yearFilter.value = new Date().getFullYear();
  els.referenceMonth.value = new Date().getMonth();
  
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  els.date.value = `${yyyy}-${mm}-${dd}`;

  els.ownerName.value = state.ownerName;
  updateOwnerName();
  document.body.classList.toggle("dark", state.theme === "dark");
  updateThemeButton();
  updateCategoryOptions();
  bindEvents();
  renderRegistrationTabs();
  render();
}

function bindEvents() {
  els.monthFilter.addEventListener("change", render);
  els.yearFilter.addEventListener("change", render);
  els.ownerName.addEventListener("input", updateOwnerName);
  els.searchInput.addEventListener("input", renderTable);
  els.type.addEventListener("change", updateCategoryOptions);
  els.entryForm.addEventListener("submit", saveEntry);
  els.cancelEdit.addEventListener("click", clearForm);
  els.incomeSourceForm.addEventListener("submit", addIncomeSource);
  els.incomeSourcesList.addEventListener("click", removeIncomeSource);
  els.addAccount.addEventListener("click", addAccount);
  els.addCategory.addEventListener("click", addCategory);
  els.themeToggle.addEventListener("click", toggleTheme);
  els.exportCsv.addEventListener("click", exportCsv);
  els.resetData.addEventListener("click", resetData);
  els.clearData.addEventListener("click", clearData);
  els.cancelClearData.addEventListener("click", closeClearDataDialog);
  els.clearDataConfirmation.addEventListener("input", updateClearDataConfirmation);
  els.clearDataForm.addEventListener("submit", confirmClearData);

  document.querySelectorAll("[data-history-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeHistoryFilter = button.dataset.historyFilter;
      document.querySelectorAll("[data-history-filter]").forEach((item) => item.classList.toggle("active", item === button));
      renderTable();
    });
  });

  document.querySelectorAll("[data-visual-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeVisualTab = button.dataset.visualTab;
      document.querySelectorAll("[data-visual-tab]").forEach((item) => item.classList.toggle("active", item === button));
      renderVisualTabs();
    });
  });

  document.querySelectorAll("[data-registration-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeRegistrationTab = button.dataset.registrationTab;
      renderRegistrationTabs();
    });
  });

  els.entriesTable.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    if (button.dataset.action === "edit") editEntry(button.dataset.id);
    if (button.dataset.action === "delete") deleteEntry(button.dataset.id);
  });
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return {
      entries: sampleEntries,
      accounts: DEFAULT_ACCOUNTS,
      incomeSources: DEFAULT_INCOME_SOURCES,
      categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      ownerName: DEFAULT_OWNER_NAME,
      theme: "light",
    };
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : sampleEntries,
      accounts: Array.isArray(parsed.accounts) ? parsed.accounts : DEFAULT_ACCOUNTS,
      incomeSources: Array.isArray(parsed.incomeSources) ? normalizeIncomeSources(parsed.incomeSources) : DEFAULT_INCOME_SOURCES,
      categories: parsed.categories && typeof parsed.categories === "object" ? parsed.categories : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      ownerName: typeof parsed.ownerName === "string" && parsed.ownerName.trim() ? parsed.ownerName : DEFAULT_OWNER_NAME,
      theme: parsed.theme === "dark" ? "dark" : "light",
    };
  } catch {
    return {
      entries: sampleEntries,
      accounts: DEFAULT_ACCOUNTS,
      incomeSources: DEFAULT_INCOME_SOURCES,
      categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      ownerName: DEFAULT_OWNER_NAME,
      theme: "light",
    };
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateOwnerName() {
  const cleanName = els.ownerName.value.trim() || DEFAULT_OWNER_NAME;
  state.ownerName = cleanName;
  els.ownerNameHeading.textContent = cleanName;
  document.title = `${cleanName} | Controle Financeiro`;
  persist();
}

function fillSelect(select, values) {
  select.innerHTML = "";
  values.forEach((item) => {
    const option = document.createElement("option");
    option.value = typeof item === "object" ? item.value : item;
    option.textContent = typeof item === "object" ? item.label : item;
    select.append(option);
  });
}

function normalizeIncomeSources(values) {
  const cleanValues = values.map((value) => String(value).trim()).filter(Boolean);
  return [...new Set([...cleanValues, "Não se aplica"])];
}

function updateCategoryOptions() {
  const typeValue = els.type.value;
  const currentCategories = state.categories && state.categories[typeValue] ? state.categories[typeValue] : DEFAULT_CATEGORIES[typeValue];
  fillSelect(els.category, currentCategories);
  els.incomeSource.disabled = typeValue === "Despesa";
  if (typeValue === "Despesa") {
    ensureIncomeSourceOption("Não se aplica");
    els.incomeSource.value = "Não se aplica";
  }
}

function selectedMonth() {
  return Number(els.monthFilter.value);
}

function selectedYear() {
  return Number(els.yearFilter.value);
}

function entryYear(item) {
  return new Date(`${item.date}T00:00:00`).getFullYear();
}

function fillYearFilter(preferredYear = selectedYear()) {
  const currentYear = new Date().getFullYear();
  const years = new Set([currentYear - 1, currentYear, currentYear + 1, preferredYear]);
  state.entries.forEach((item) => years.add(entryYear(item)));
  fillSelect(
    els.yearFilter,
    [...years]
      .filter((year) => Number.isFinite(year))
      .sort((a, b) => b - a)
      .map((year) => ({ label: year, value: year }))
  );
  els.yearFilter.value = preferredYear;
}

function monthEntries(month = selectedMonth(), year = selectedYear()) {
  return state.entries.filter((item) => Number(item.referenceMonth) === month && entryYear(item) === year);
}

function render() {
  const month = selectedMonth();
  const year = selectedYear();
  const entries = monthEntries(month, year);
  const income = sum(entries.filter((item) => item.type === "Receita"));
  const expense = sum(entries.filter((item) => item.type === "Despesa"));
  const startingBalance = calculateStartingBalance(month, year);
  const balance = income - expense;
  const endingBalance = startingBalance + balance;

  els.controlYearLabel.textContent = `Controle financeiro ${year}`;
  els.selectedMonthLabel.textContent = `${MONTHS[month]} ${year}`;
  els.startingBalanceTotal.textContent = money(startingBalance);
  els.incomeTotal.textContent = money(income);
  els.expenseTotal.textContent = money(expense);
  els.balanceTotal.textContent = money(balance);
  els.endingBalanceTotal.textContent = money(endingBalance);
  els.entryCount.textContent = entries.length;

  renderCashflow(income, expense, balance);
  renderMonthlyChart();
  renderBarList(els.categoryChart, groupValues(entries.filter((item) => item.type === "Despesa"), "category"), "expense");
  renderBarList(els.accountChart, groupValues(entries.filter((item) => item.type === "Despesa"), "account"), "expense");
  renderBarList(els.paymentChart, groupValues(entries, "payment"), "accent");
  renderBarList(els.incomeSourceChart, groupValues(entries.filter((item) => item.type === "Receita"), "incomeSource"), "income");
  renderBarList(els.finalAccountBalanceChart, accountBalances());
  renderTable();
}

function calculateStartingBalance(month, year) {
  return state.entries.reduce((total, item) => {
    const itemYear = entryYear(item);
    const itemMonth = Number(item.referenceMonth);
    if (itemYear > year || (itemYear === year && itemMonth >= month)) return total;
    return total + (item.type === "Receita" ? item.amount : -item.amount);
  }, 0);
}

function sum(entries) {
  return entries.reduce((total, item) => total + Number(item.amount || 0), 0);
}

function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderCashflow(income, expense, balance) {
  const max = Math.max(income, expense, Math.abs(balance), 1);
  const rows = [
    ["Receitas", income, "income"],
    ["Despesas", expense, "expense"],
    ["Resultado", balance, "accent"],
  ];

  els.cashflowChart.innerHTML = rows
    .map(([label, value, className]) => {
      const width = Math.max(4, (Math.abs(value) / max) * 100);
      return `
        <div class="money-bar">
          <header><span>${label}</span><strong>${money(value)}</strong></header>
          <div class="track"><span class="fill ${className}" style="width:${width}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderMonthlyChart() {
  const monthly = MONTHS.map((_, month) => {
    const entries = monthEntries(month, selectedYear());
    return {
      income: sum(entries.filter((item) => item.type === "Receita")),
      expense: sum(entries.filter((item) => item.type === "Despesa")),
    };
  });
  const max = Math.max(...monthly.flatMap((item) => [item.income, item.expense]), 1);

  els.monthlyChart.innerHTML = monthly
    .map((item, index) => {
      const incomeHeight = Math.max(4, (item.income / max) * 100);
      const expenseHeight = Math.max(4, (item.expense / max) * 100);
      return `
        <div class="month-column" title="${MONTHS[index]}">
          <div class="month-bars">
            <span class="fill income" style="height:${incomeHeight}%"></span>
            <span class="fill expense" style="height:${expenseHeight}%"></span>
          </div>
          <small>${MONTHS[index].slice(0, 3)}</small>
        </div>
      `;
    })
    .join("");
}

function groupValues(entries, key) {
  return entries.reduce((groups, item) => {
    const label = item[key] || "Sem informação";
    groups[label] = (groups[label] || 0) + Number(item.amount || 0);
    return groups;
  }, {});
}

function accountBalances() {
  return state.entries.reduce((groups, item) => {
    const itemYear = entryYear(item);
    const itemMonth = Number(item.referenceMonth);
    if (itemYear > selectedYear() || (itemYear === selectedYear() && itemMonth > selectedMonth())) return groups;
    groups[item.account] = (groups[item.account] || 0) + (item.type === "Receita" ? item.amount : -item.amount);
    return groups;
  }, {});
}

function renderBarList(container, groups, forceColorClass = null) {
  const rows = Object.entries(groups)
    .filter(([, value]) => value !== 0)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  const max = Math.max(...rows.map(([, value]) => Math.abs(value)), 1);

  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">Sem dados para exibir.</div>`;
    return;
  }

  container.innerHTML = rows
    .map(([label, value]) => {
      const width = Math.max(5, (Math.abs(value) / max) * 100);
      const className = forceColorClass || (value < 0 ? "expense" : "income");
      return `
        <div class="bar-row">
          <header><span>${escapeHtml(label)}</span><strong>${money(value)}</strong></header>
          <div class="track"><span class="fill ${className}" style="width:${width}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderTable() {
  const query = els.searchInput.value.trim().toLowerCase();
  const entries = monthEntries()
    .filter((item) => activeHistoryFilter === "all" || item.type === activeHistoryFilter)
    .filter((item) => {
      const searchable = [item.description, item.category, item.payment, item.account, item.notes].join(" ").toLowerCase();
      return searchable.includes(query);
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!entries.length) {
    els.entriesTable.innerHTML = `<tr><td colspan="9"><div class="empty-state">Nenhum lançamento encontrado.</div></td></tr>`;
    return;
  }

  els.entriesTable.innerHTML = entries
    .map(
      (item) => `
        <tr>
          <td>${formatDate(item.date)}</td>
          <td>${MONTHS[item.referenceMonth]} ${entryYear(item)}</td>
          <td><span class="pill ${item.type === "Receita" ? "income" : "expense"}">${item.type}</span></td>
          <td><strong>${escapeHtml(item.description)}</strong><br><small>${escapeHtml(item.notes || "")}</small></td>
          <td>${escapeHtml(item.category)}</td>
          <td>${escapeHtml(item.payment)}</td>
          <td>${escapeHtml(item.account)}</td>
          <td><strong>${money(item.amount)}</strong></td>
          <td>
            <div class="row-actions">
              <button type="button" data-action="edit" data-id="${item.id}">Editar</button>
              <button type="button" data-action="delete" data-id="${item.id}">Excluir</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function saveEntry(event) {
  event.preventDefault();
  const data = {
    id: els.editingId.value || crypto.randomUUID(),
    date: els.date.value,
    referenceMonth: Number(els.referenceMonth.value),
    type: els.type.value,
    incomeSource: els.type.value === "Receita" ? els.incomeSource.value : "Não se aplica",
    description: els.description.value.trim(),
    category: els.category.value,
    payment: els.payment.value,
    account: els.account.value,
    amount: Number(els.amount.value),
    notes: els.notes.value.trim(),
  };

  if (els.editingId.value) {
    const index = state.entries.findIndex((item) => item.id === els.editingId.value);
    state.entries[index] = data;
  } else {
    state.entries.push(data);
  }

  persist();
  clearForm();
  fillYearFilter(new Date(`${data.date}T00:00:00`).getFullYear());
  els.monthFilter.value = data.referenceMonth;
  els.yearFilter.value = entryYear(data);
  render();
}

function clearForm() {
  els.entryForm.reset();
  els.editingId.value = "";
  els.cancelEdit.classList.add("hidden");
  els.date.value = defaultDateForSelection();
  els.referenceMonth.value = els.monthFilter.value;
  updateCategoryOptions();
}

function editEntry(id) {
  const item = state.entries.find((entryItem) => entryItem.id === id);
  if (!item) return;

  els.editingId.value = item.id;
  els.date.value = item.date;
  els.referenceMonth.value = item.referenceMonth;
  els.type.value = item.type;
  updateCategoryOptions();
  ensureIncomeSourceOption(item.incomeSource);
  els.incomeSource.value = item.incomeSource;
  els.description.value = item.description;
  els.category.value = item.category;
  els.payment.value = item.payment;
  els.account.value = item.account;
  els.amount.value = item.amount;
  els.notes.value = item.notes || "";
  els.cancelEdit.classList.remove("hidden");
  activeRegistrationTab = "entry";
  renderRegistrationTabs();
  els.entryForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteEntry(id) {
  const item = state.entries.find((entryItem) => entryItem.id === id);
  if (!item) return;
  if (!confirm(`Excluir "${item.description}"?`)) return;
  state.entries = state.entries.filter((entryItem) => entryItem.id !== id);
  persist();
  render();
}

function addAccount() {
  const name = prompt("Nome da nova conta:");
  if (!name) return;
  const cleanName = name.trim();
  if (!cleanName || state.accounts.includes(cleanName)) return;
  state.accounts.push(cleanName);
  fillSelect(els.account, state.accounts);
  els.account.value = cleanName;
  persist();
}

function addCategory() {
  const typeValue = els.type.value;
  const name = prompt(`Nome da nova categoria de ${typeValue.toLowerCase()}:`);
  if (!name) return;
  const cleanName = name.trim();
  if (!cleanName) return;
  if (!state.categories) {
    state.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!state.categories[typeValue]) {
    state.categories[typeValue] = [...DEFAULT_CATEGORIES[typeValue]];
  }
  if (state.categories[typeValue].includes(cleanName)) return;
  state.categories[typeValue].push(cleanName);
  fillSelect(els.category, state.categories[typeValue]);
  els.category.value = cleanName;
  persist();
}

function addIncomeSource(event) {
  event.preventDefault();
  const cleanName = els.newIncomeSource.value.trim();
  if (!cleanName || state.incomeSources.includes(cleanName)) return;
  state.incomeSources = normalizeIncomeSources([...state.incomeSources, cleanName]);
  fillSelect(els.incomeSource, state.incomeSources);
  els.incomeSource.value = cleanName;
  els.newIncomeSource.value = "";
  renderIncomeSourcesList();
  persist();
}

function removeIncomeSource(event) {
  const button = event.target.closest("button[data-income-source]");
  if (!button) return;
  const selectedSource = button.dataset.incomeSource;
  if (!selectedSource || selectedSource === "Não se aplica") {
    alert('A opção "Não se aplica" é fixa e não pode ser removida.');
    return;
  }
  if (!confirm(`Remover "${selectedSource}" da lista de origens? Os históricos já cadastrados continuarão salvos.`)) return;
  state.incomeSources = normalizeIncomeSources(state.incomeSources.filter((source) => source !== selectedSource));
  fillSelect(els.incomeSource, state.incomeSources);
  els.incomeSource.value = state.incomeSources[0] || "Não se aplica";
  renderIncomeSourcesList();
  persist();
}

function ensureIncomeSourceOption(source) {
  if (!source || state.incomeSources.includes(source)) return;
  const option = document.createElement("option");
  option.value = source;
  option.textContent = `${source} (histórico)`;
  els.incomeSource.append(option);
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.body.classList.toggle("dark", state.theme === "dark");
  updateThemeButton();
  persist();
}

function updateThemeButton() {
  const isDark = state.theme === "dark";
  els.themeToggle.textContent = isDark ? "Tema claro" : "Tema escuro";
  els.themeToggle.setAttribute("aria-pressed", String(isDark));
}

function renderVisualTabs() {
  els.visualOverviewPanel.classList.toggle("hidden", activeVisualTab !== "overview");
  els.visualPaymentPanel.classList.toggle("hidden", activeVisualTab !== "payment");
  els.incomeSummaryPanel.classList.toggle("hidden", activeVisualTab !== "income");
}

function renderRegistrationTabs() {
  document.querySelectorAll("[data-registration-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.registrationTab === activeRegistrationTab);
  });
  els.entryForm.classList.toggle("hidden", activeRegistrationTab !== "entry");
  els.incomeSourcesPanel.classList.toggle("hidden", activeRegistrationTab !== "incomeSources");
  els.nameSheetPanel.classList.toggle("hidden", activeRegistrationTab !== "name");
  renderIncomeSourcesList();
}

function renderIncomeSourcesList() {
  els.incomeSourcesList.innerHTML = state.incomeSources
    .map((source) => {
      const isFixed = source === "Não se aplica";
      const deleteButton = isFixed
        ? `<span class="fixed-label">Fixo</span>`
        : `<button class="icon-danger" type="button" data-income-source="${escapeHtml(source)}" aria-label="Remover ${escapeHtml(source)}">🗑</button>`;
      return `
        <div class="editable-list-row">
          <span>${escapeHtml(source)}</span>
          ${deleteButton}
        </div>
      `;
    })
    .join("");
}

function exportCsv() {
  const headers = ["Data", "Referente", "Tipo", "Origem", "Descrição", "Categoria", "Forma", "Conta", "Valor", "Observações"];
  const rows = state.entries.map((item) => [
    item.date,
    MONTHS[item.referenceMonth],
    item.type,
    item.incomeSource,
    item.description,
    item.category,
    item.payment,
    item.account,
    item.amount.toFixed(2).replace(".", ","),
    item.notes || "",
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvValue).join(";")).join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "controle-financeiro-lurdes-camargo.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function resetData() {
  if (!confirm("Restaurar os dados de exemplo? Os lançamentos salvos serão substituídos.")) return;
  state.entries = sampleEntries.map((item) => ({ ...item, id: crypto.randomUUID() }));
  state.accounts = [...DEFAULT_ACCOUNTS];
  state.incomeSources = [...DEFAULT_INCOME_SOURCES];
  state.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  fillSelect(els.incomeSource, state.incomeSources);
  fillSelect(els.account, state.accounts);
  updateCategoryOptions();
  fillYearFilter(new Date().getFullYear());
  persist();
  clearForm();
  render();
}

function clearData() {
  els.clearDataConfirmation.value = "";
  updateClearDataConfirmation();
  els.clearDataDialog.showModal();
  requestAnimationFrame(() => els.clearDataConfirmation.focus());
}

function closeClearDataDialog() {
  els.clearDataDialog.close();
}

function updateClearDataConfirmation() {
  els.confirmClearData.disabled = els.clearDataConfirmation.value.trim().toUpperCase() !== "LIMPAR";
}

function confirmClearData(event) {
  event.preventDefault();
  if (els.confirmClearData.disabled) return;

  state.entries = [];
  persist();
  clearForm();
  render();
  closeClearDataDialog();
}

function defaultDateForSelection() {
  const year = selectedYear() || new Date().getFullYear();
  const month = String((selectedMonth() || 0) + 1).padStart(2, "0");
  return `${year}-${month}-01`;
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("pt-BR");
}

function csvValue(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
