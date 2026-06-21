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

const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const STATIC_TRANSLATIONS = {
  "Mês": "Month", "Ano": "Year", "Idioma": "Language", "Moeda-base": "Base currency", "Moeda": "Currency", "Entrar e sincronizar": "Sign in and sync",
  "Tema escuro": "Dark theme", "Exportar CSV": "Export CSV", "Restaurar": "Restore", "Limpar Planilha": "Clear Spreadsheet",
  "Saldo inicial": "Starting balance", "Receitas": "Income", "Despesas": "Expenses", "Resultado": "Result",
  "Saldo final": "Final balance", "Lançamentos": "Entries", "Ganhos e gastos": "Income and expenses",
  "Comparativo do período": "Period comparison", "Visão mês a mês": "Month-by-month view", "Cadastros": "Records",
  "Cancelar edição": "Cancel editing", "Novo lançamento": "New entry", "Cadastros Gerais": "General Records",
  "Nome da planilha": "Spreadsheet name", "Data": "Date", "Referente ao mês": "Reference month", "Tipo": "Type",
  "Receita": "Income", "Despesa": "Expense", "Origem da receita": "Income source", "Descrição": "Description",
  "Categoria": "Category", "Forma de pagamento": "Payment method", "Conta": "Account", "Valor": "Amount",
  "Observações": "Notes", "Salvar lançamento": "Save entry", "Origens Receita": "Income Sources", "Contas": "Accounts",
  "Nova origem de receita": "New income source", "Adicionar": "Add", "Cópia completa": "Full copy",
  "Backup e recuperação": "Backup and recovery", "Baixar backup": "Download backup", "Restaurar backup": "Restore backup",
  "Análise Financeira": "Financial Analysis", "Visão geral": "Overview", "Pagamento": "Payment",
  "Resumo de receitas": "Income summary", "Despesas por categoria": "Expenses by category", "Despesas por conta": "Expenses by account",
  "Receitas por origem": "Income by source", "Saldo final por conta": "Final balance by account", "Histórico": "History",
  "Buscar": "Search", "Todos": "All", "Referente": "Reference", "Forma": "Method", "Ação irreversível": "Irreversible action",
  "Limpar toda a planilha?": "Clear the entire spreadsheet?", "Cancelar": "Cancel", "Apagar lançamentos": "Delete entries",
  "Sincronização segura": "Secure synchronization", "Acessar seus dados": "Access your data", "E-mail": "Email", "Senha": "Password",
  "Criar conta": "Create account", "Entrar": "Sign in", "Conta conectada": "Connected account", "Sincronização pronta": "Sync ready",
  "Sair": "Sign out", "Sincronizar agora": "Sync now", "Gráfico Cotações Tempo Real": "Real-Time Exchange Rate Chart",
  "Par de moedas": "Currency pair", "Período": "Period", "1 mês": "1 month", "3 meses": "3 months", "6 meses": "6 months", "1 ano": "1 year",
  "Personalizado": "Custom", "Data inicial": "Start date", "Data final": "End date", "Pesquisar": "Search",
  "Atual": "Current", "Mínima": "Low", "Máxima": "High", "Digite": "Type", "para confirmar": "to confirm",
  "Todos os lançamentos de receitas e despesas serão apagados permanentemente. Os cadastros e o nome da planilha serão mantidos.": "All income and expense entries will be permanently deleted. Records and the spreadsheet name will be kept."
};

const PLACEHOLDER_TRANSLATIONS = {
  "Ex.: IPVA, UNIMED, mercado": "E.g.: tax, healthcare, groceries", "Opcional": "Optional", "Digite um nome": "Enter a name",
  "Ex.: Mercado, aluguel, cliente": "E.g.: store, rent, client", "Descrição, categoria, conta...": "Description, category, account..."
};

let staticTextNodes = [];
let staticPlaceholders = [];

const DEFAULT_CATEGORIES = {
  Receita: ["Aposentadoria", "Aluguel", "Serviços", "Investimentos", "Outras receitas"],
  Despesa: ["Casa", "Saúde", "Mercado", "Transporte", "Impostos", "Lazer", "Outras despesas"],
};

const DEFAULT_PAYMENTS = ["Pix", "Débito", "Crédito", "Dinheiro", "Boleto", "Transferência"];
const DEFAULT_INCOME_SOURCES = ["Lurdes", "Camargo", "Família", "Banco", "Outro", "Não se aplica"];
const DEFAULT_ACCOUNTS = ["Carteira", "Conta corrente", "Poupança", "Cartão", "Investimentos"];
const DEFAULT_OWNER_NAME = "Lurdes Camargo";
const STORAGE_KEY = "lurdes-controle-financeiro-v1";
const AUTH_STORAGE_KEY = "controle-financeiro-auth-v1";
const SUPABASE_URL = "https://uxioksvzpcogcuplfrdj.supabase.co";
const SUPABASE_KEY = "sb_publishable_0Rglw4_AS_h3B7IZaqN2GA_0Gic3UnW";

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
let activeSubRegistrationTab = "incomeSources";
let authSession = loadAuthSession();
let syncTimer;
let syncInProgress = false;
let authReady = false;
let conversionRequestId = 0;

const els = {
  monthFilter: document.querySelector("#monthFilter"),
  yearFilter: document.querySelector("#yearFilter"),
  languageSelect: document.querySelector("#languageSelect"),
  baseCurrency: document.querySelector("#baseCurrency"),
  controlYearLabel: document.querySelector("#controlYearLabel"),
  ownerName: document.querySelector("#ownerName"),
  ownerNameHeading: document.querySelector("#ownerNameHeading"),
  themeToggle: document.querySelector("#themeToggle"),
  exportCsv: document.querySelector("#exportCsv"),
  resetData: document.querySelector("#resetData"),
  clearData: document.querySelector("#clearData"),
  authButton: document.querySelector("#authButton"),
  authButtonLabel: document.querySelector("#authButtonLabel"),
  clearDataDialog: document.querySelector("#clearDataDialog"),
  clearDataForm: document.querySelector("#clearDataForm"),
  clearDataConfirmation: document.querySelector("#clearDataConfirmation"),
  cancelClearData: document.querySelector("#cancelClearData"),
  confirmClearData: document.querySelector("#confirmClearData"),
  authDialog: document.querySelector("#authDialog"),
  closeAuthDialog: document.querySelector("#closeAuthDialog"),
  authForm: document.querySelector("#authForm"),
  authEmail: document.querySelector("#authEmail"),
  authPassword: document.querySelector("#authPassword"),
  authMessage: document.querySelector("#authMessage"),
  createAccount: document.querySelector("#createAccount"),
  authAccount: document.querySelector("#authAccount"),
  authAccountEmail: document.querySelector("#authAccountEmail"),
  cloudSyncStatus: document.querySelector("#cloudSyncStatus"),
  signOut: document.querySelector("#signOut"),
  syncNow: document.querySelector("#syncNow"),
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
  payment: document.querySelector("#payment"),
  account: document.querySelector("#account"),
  currency: document.querySelector("#currency"),
  amount: document.querySelector("#amount"),
  conversionPreview: document.querySelector("#conversionPreview"),
  exchangePair: document.querySelector("#exchangePair"),
  exchangePeriod: document.querySelector("#exchangePeriod"),
  exchangeCustomRange: document.querySelector("#exchangeCustomRange"),
  exchangeStartDate: document.querySelector("#exchangeStartDate"),
  exchangeEndDate: document.querySelector("#exchangeEndDate"),
  searchExchangeRange: document.querySelector("#searchExchangeRange"),
  exchangeCurrent: document.querySelector("#exchangeCurrent"),
  exchangeMin: document.querySelector("#exchangeMin"),
  exchangeMax: document.querySelector("#exchangeMax"),
  exchangeChart: document.querySelector("#exchangeChart"),
  notes: document.querySelector("#notes"),
  incomeSourceChart: document.querySelector("#incomeSourceChart"),
  incomeSourcesPanel: document.querySelector("#incomeSourcesPanel"),
  backupPanel: document.querySelector("#backupPanel"),
  downloadBackup: document.querySelector("#downloadBackup"),
  restoreBackup: document.querySelector("#restoreBackup"),
  backupFile: document.querySelector("#backupFile"),
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
    currency: "BRL",
    rates: null,
    rateDate: null,
    notes,
  };
}

function init() {
  prepareStaticTranslations();
  els.languageSelect.value = state.language;
  els.baseCurrency.value = state.baseCurrency;
  els.currency.value = state.baseCurrency;
  els.exchangePair.value = state.exchangePair;
  els.exchangePeriod.value = state.exchangePeriod;
  initializeExchangeRangeControls();
  fillSelect(els.monthFilter, displayMonths().map((name, index) => ({ label: name, value: index })));
  fillYearFilter(new Date().getFullYear());
  fillSelect(els.referenceMonth, displayMonths().map((name, index) => ({ label: name, value: index })));
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
  applyStaticTranslations();
  initializeAuth();
  initializeExchangeRates();
}

function bindEvents() {
  els.monthFilter.addEventListener("change", render);
  els.yearFilter.addEventListener("change", render);
  els.languageSelect.addEventListener("change", changeLanguage);
  els.baseCurrency.addEventListener("change", changeBaseCurrency);
  els.ownerName.addEventListener("input", updateOwnerName);
  els.searchInput.addEventListener("input", renderTable);
  els.type.addEventListener("change", updateCategoryOptions);
  els.currency.addEventListener("change", updateConversionPreview);
  els.amount.addEventListener("input", updateConversionPreview);
  els.date.addEventListener("change", updateConversionPreview);
  els.exchangePair.addEventListener("change", changeExchangePair);
  els.exchangePeriod.addEventListener("change", changeExchangePeriod);
  els.searchExchangeRange.addEventListener("click", searchCustomExchangeRange);
  els.entryForm.addEventListener("submit", saveEntry);
  els.cancelEdit.addEventListener("click", clearForm);
  els.incomeSourceForm.addEventListener("submit", addGeneralRegistrationItem);
  els.incomeSourcesList.addEventListener("click", removeGeneralRegistrationItem);
  els.themeToggle.addEventListener("click", toggleTheme);
  els.exportCsv.addEventListener("click", exportCsv);
  els.resetData.addEventListener("click", resetData);
  els.clearData.addEventListener("click", clearData);
  els.cancelClearData.addEventListener("click", closeClearDataDialog);
  els.clearDataConfirmation.addEventListener("input", updateClearDataConfirmation);
  els.clearDataForm.addEventListener("submit", confirmClearData);
  els.authButton.addEventListener("click", openAuthDialog);
  els.closeAuthDialog.addEventListener("click", () => els.authDialog.close());
  els.authForm.addEventListener("submit", signIn);
  els.createAccount.addEventListener("click", createAccount);
  els.signOut.addEventListener("click", signOut);
  els.syncNow.addEventListener("click", syncNow);
  els.downloadBackup.addEventListener("click", downloadBackup);
  els.restoreBackup.addEventListener("click", () => els.backupFile.click());
  els.backupFile.addEventListener("change", restoreBackup);

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

  document.querySelectorAll("[data-sub-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSubRegistrationTab = button.dataset.subTab;
      renderGeneralRegistrations();
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
      language: "pt",
      baseCurrency: "EUR",
      exchangeRatesCache: {},
      exchangePair: "EUR/BRL",
      exchangePeriod: "1m",
      exchangeCustomStart: null,
      exchangeCustomEnd: null,
      exchangeHistory: null,
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
      language: parsed.language === "en" ? "en" : "pt",
      baseCurrency: ["EUR", "BRL", "USD"].includes(parsed.baseCurrency) ? parsed.baseCurrency : "EUR",
      exchangeRatesCache: parsed.exchangeRatesCache && typeof parsed.exchangeRatesCache === "object" ? parsed.exchangeRatesCache : {},
      exchangePair: typeof parsed.exchangePair === "string" ? parsed.exchangePair : "EUR/BRL",
      exchangePeriod: ["1m", "3m", "6m", "1y", "custom"].includes(parsed.exchangePeriod) ? parsed.exchangePeriod : "1m",
      exchangeCustomStart: typeof parsed.exchangeCustomStart === "string" ? parsed.exchangeCustomStart : null,
      exchangeCustomEnd: typeof parsed.exchangeCustomEnd === "string" ? parsed.exchangeCustomEnd : null,
      exchangeHistory: parsed.exchangeHistory && typeof parsed.exchangeHistory === "object" ? parsed.exchangeHistory : null,
    };
  } catch {
    return {
      entries: sampleEntries,
      accounts: DEFAULT_ACCOUNTS,
      incomeSources: DEFAULT_INCOME_SOURCES,
      categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      ownerName: DEFAULT_OWNER_NAME,
      theme: "light",
      language: "pt",
      baseCurrency: "EUR",
      exchangeRatesCache: {},
      exchangePair: "EUR/BRL",
      exchangePeriod: "1m",
      exchangeCustomStart: null,
      exchangeCustomEnd: null,
      exchangeHistory: null,
    };
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleCloudSync();
}

function loadAuthSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

function saveAuthSession(session) {
  authSession = session;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

function clearAuthSession() {
  authSession = null;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

async function supabaseRequest(path, options = {}) {
  const token = options.token === false ? null : (options.token || authSession?.access_token);
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.msg || payload?.message || payload?.error_description || payload?.error || "Não foi possível concluir a operação.";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return payload;
}

async function consumeAuthRedirect() {
  if (!location.hash.includes("access_token=")) return;
  const params = new URLSearchParams(location.hash.slice(1));
  const accessToken = params.get("access_token");
  if (!accessToken) return;

  saveAuthSession({
    access_token: accessToken,
    refresh_token: params.get("refresh_token"),
    expires_at: Math.floor(Date.now() / 1000) + Number(params.get("expires_in") || 3600),
    user: null,
  });
  const user = await supabaseRequest("/auth/v1/user");
  authSession.user = user;
  saveAuthSession(authSession);
  history.replaceState(null, "", `${location.pathname}${location.search}`);
}

async function ensureSession() {
  if (!authSession) return null;
  if (authSession.expires_at > Math.floor(Date.now() / 1000) + 60 && authSession.user) return authSession;
  if (!authSession.refresh_token) {
    clearAuthSession();
    return null;
  }

  try {
    const refreshed = await supabaseRequest("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      token: false,
      body: { refresh_token: authSession.refresh_token },
    });
    saveAuthSession(refreshed);
    return authSession;
  } catch {
    clearAuthSession();
    return null;
  }
}

async function initializeAuth() {
  try {
    await consumeAuthRedirect();
    const session = await ensureSession();
    updateAuthUi();
    if (session) await loadRemoteState();
  } catch (error) {
    setSyncStatus("error", friendlyAuthError(error));
    updateAuthUi();
  } finally {
    authReady = true;
  }
}

function openAuthDialog() {
  setAuthMessage("");
  updateAuthUi();
  els.authDialog.showModal();
  if (!authSession) requestAnimationFrame(() => els.authEmail.focus());
}

function updateAuthUi() {
  const connected = Boolean(authSession?.user);
  els.authForm.classList.toggle("hidden", connected);
  els.authAccount.classList.toggle("hidden", !connected);
  els.authButton.classList.toggle("connected", connected);
  els.authButtonLabel.textContent = connected ? ui("Sincronizado", "Synced") : ui("Entrar e sincronizar", "Sign in and sync");
  els.authAccountEmail.textContent = authSession?.user?.email || "";
}

function setAuthMessage(message, type = "") {
  els.authMessage.textContent = message;
  els.authMessage.className = `auth-message${type ? ` ${type}` : ""}`;
}

function setSyncStatus(status, message) {
  els.authButton.classList.remove("syncing", "sync-error");
  if (status === "syncing") els.authButton.classList.add("syncing");
  if (status === "error") els.authButton.classList.add("sync-error");
  if (authSession?.user && status !== "error") els.authButton.classList.add("connected");
  els.authButtonLabel.textContent = status === "syncing" ? ui("Sincronizando", "Syncing") : authSession?.user ? ui("Sincronizado", "Synced") : ui("Entrar e sincronizar", "Sign in and sync");
  els.cloudSyncStatus.textContent = message || (status === "error" ? ui("Falha na sincronização", "Sync failed") : ui("Dados sincronizados", "Data synced"));
}

async function createAccount() {
  if (!els.authForm.reportValidity()) return;
  setAuthMessage("Criando sua conta...");
  els.createAccount.disabled = true;

  try {
    const redirectTo = "https://borba-business.github.io/controle-financeiro/";
    const result = await supabaseRequest(`/auth/v1/signup?redirect_to=${encodeURIComponent(redirectTo)}`, {
      method: "POST",
      token: false,
      body: { email: els.authEmail.value.trim(), password: els.authPassword.value },
    });

    if (result.access_token) {
      saveAuthSession(result);
      updateAuthUi();
      await loadRemoteState();
      setAuthMessage("");
    } else {
      setAuthMessage("Conta criada. Abra o e-mail de confirmação e depois entre no aplicativo.", "success");
    }
  } catch (error) {
    setAuthMessage(friendlyAuthError(error), "error");
  } finally {
    els.createAccount.disabled = false;
  }
}

async function signIn(event) {
  event.preventDefault();
  setAuthMessage("Entrando...");

  try {
    const session = await supabaseRequest("/auth/v1/token?grant_type=password", {
      method: "POST",
      token: false,
      body: { email: els.authEmail.value.trim(), password: els.authPassword.value },
    });
    saveAuthSession(session);
    updateAuthUi();
    await loadRemoteState();
    setAuthMessage("");
  } catch (error) {
    setAuthMessage(friendlyAuthError(error), "error");
  }
}

async function signOut() {
  try {
    await supabaseRequest("/auth/v1/logout", { method: "POST" });
  } catch {
    // The local session is cleared even if the network is unavailable.
  }
  clearAuthSession();
  updateAuthUi();
  els.authDialog.close();
}

function scheduleCloudSync() {
  if (!authReady || !authSession?.user || syncInProgress) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => syncToCloud(), 700);
}

async function syncNow() {
  await syncToCloud();
}

async function syncToCloud() {
  if (syncInProgress || !authSession?.user) return;
  syncInProgress = true;
  setSyncStatus("syncing", ui("Enviando alterações...", "Sending changes..."));

  try {
    const session = await ensureSession();
    if (!session) throw new Error("Sessão expirada. Entre novamente.");
    await supabaseRequest("/rest/v1/finance_states?on_conflict=user_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: {
        user_id: session.user.id,
        state,
        updated_at: new Date().toISOString(),
      },
    });
    setSyncStatus("success", `${ui("Sincronizado às", "Synced at")} ${new Date().toLocaleTimeString(state.language === "en" ? "en-GB" : "pt-BR", { hour: "2-digit", minute: "2-digit" })}`);
  } catch (error) {
    setSyncStatus("error", friendlyAuthError(error));
  } finally {
    syncInProgress = false;
  }
}

async function loadRemoteState() {
  const session = await ensureSession();
  if (!session) return;
  setSyncStatus("syncing", ui("Buscando seus dados...", "Fetching your data..."));

  const rows = await supabaseRequest(`/rest/v1/finance_states?select=state,updated_at&user_id=eq.${session.user.id}`);
  if (rows?.[0]?.state) {
    applyRemoteState(rows[0].state);
    setSyncStatus("success", ui("Dados atualizados neste aparelho", "Data updated on this device"));
  } else {
    await syncToCloud();
  }
}

function applyRemoteState(remote) {
  state.entries = Array.isArray(remote.entries) ? remote.entries : [];
  state.accounts = Array.isArray(remote.accounts) ? remote.accounts : [...DEFAULT_ACCOUNTS];
  state.incomeSources = Array.isArray(remote.incomeSources) ? normalizeIncomeSources(remote.incomeSources) : [...DEFAULT_INCOME_SOURCES];
  state.categories = remote.categories && typeof remote.categories === "object" ? remote.categories : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  state.ownerName = typeof remote.ownerName === "string" && remote.ownerName.trim() ? remote.ownerName : DEFAULT_OWNER_NAME;
  state.theme = remote.theme === "dark" ? "dark" : "light";
  state.language = remote.language === "en" ? "en" : state.language || "pt";
  state.baseCurrency = ["EUR", "BRL", "USD"].includes(remote.baseCurrency) ? remote.baseCurrency : state.baseCurrency || "EUR";
  state.exchangeRatesCache = remote.exchangeRatesCache && typeof remote.exchangeRatesCache === "object" ? remote.exchangeRatesCache : state.exchangeRatesCache || {};
  state.exchangePair = typeof remote.exchangePair === "string" ? remote.exchangePair : state.exchangePair || "EUR/BRL";
  state.exchangePeriod = ["1m", "3m", "6m", "1y", "custom"].includes(remote.exchangePeriod) ? remote.exchangePeriod : state.exchangePeriod || "1m";
  state.exchangeCustomStart = typeof remote.exchangeCustomStart === "string" ? remote.exchangeCustomStart : state.exchangeCustomStart || null;
  state.exchangeCustomEnd = typeof remote.exchangeCustomEnd === "string" ? remote.exchangeCustomEnd : state.exchangeCustomEnd || null;
  state.exchangeHistory = remote.exchangeHistory && typeof remote.exchangeHistory === "object" ? remote.exchangeHistory : state.exchangeHistory || null;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  fillSelect(els.incomeSource, state.incomeSources);
  fillSelect(els.account, state.accounts);
  els.languageSelect.value = state.language;
  els.baseCurrency.value = state.baseCurrency;
  els.exchangePair.value = state.exchangePair;
  els.exchangePeriod.value = state.exchangePeriod;
  initializeExchangeRangeControls();
  const selectedMonthValue = els.monthFilter.value;
  const referenceMonthValue = els.referenceMonth.value;
  fillSelect(els.monthFilter, displayMonths().map((name, index) => ({ label: name, value: index })));
  fillSelect(els.referenceMonth, displayMonths().map((name, index) => ({ label: name, value: index })));
  els.monthFilter.value = selectedMonthValue;
  els.referenceMonth.value = referenceMonthValue;
  updateCategoryOptions();
  els.ownerName.value = state.ownerName;
  els.ownerNameHeading.textContent = state.ownerName;
  document.title = "Planilha de Controle Financeiro";
  document.body.classList.toggle("dark", state.theme === "dark");
  updateThemeButton();
  applyStaticTranslations();
  fillYearFilter(new Date().getFullYear());
  render();
}

function friendlyAuthError(error) {
  const message = String(error?.message || "");
  if (/invalid login credentials/i.test(message)) return "E-mail ou senha incorretos.";
  if (/email not confirmed/i.test(message)) return "Confirme seu e-mail antes de entrar.";
  if (/user already registered/i.test(message)) return "Este e-mail já possui uma conta.";
  if (/password/i.test(message) && /characters/i.test(message)) return "A senha precisa ter pelo menos 6 caracteres.";
  if (/failed to fetch|network/i.test(message)) return "Sem conexão. Os dados continuam salvos neste aparelho.";
  return message || "Não foi possível concluir a operação.";
}

function updateOwnerName() {
  const cleanName = els.ownerName.value.trim() || DEFAULT_OWNER_NAME;
  state.ownerName = cleanName;
  els.ownerNameHeading.textContent = cleanName;
  document.title = "Planilha de Controle Financeiro";
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

function ui(portuguese, english) {
  return state.language === "en" ? english : portuguese;
}

function displayMonths() {
  return state.language === "en" ? MONTHS_EN : MONTHS;
}

function prepareStaticTranslations() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue.trim();
    if (STATIC_TRANSLATIONS[text]) staticTextNodes.push({ node, pt: text, en: STATIC_TRANSLATIONS[text] });
  }

  document.querySelectorAll("[placeholder]").forEach((element) => {
    const placeholder = element.getAttribute("placeholder");
    if (PLACEHOLDER_TRANSLATIONS[placeholder]) {
      staticPlaceholders.push({ element, pt: placeholder, en: PLACEHOLDER_TRANSLATIONS[placeholder] });
    }
  });
}

function applyStaticTranslations() {
  document.documentElement.lang = state.language === "en" ? "en" : "pt-BR";
  staticTextNodes.forEach(({ node, pt, en }) => {
    if (!node.isConnected) return;
    const whitespaceStart = node.nodeValue.match(/^\s*/)?.[0] || "";
    const whitespaceEnd = node.nodeValue.match(/\s*$/)?.[0] || "";
    node.nodeValue = `${whitespaceStart}${ui(pt, en)}${whitespaceEnd}`;
  });
  staticPlaceholders.forEach(({ element, pt, en }) => element.setAttribute("placeholder", ui(pt, en)));
}

function changeLanguage() {
  const month = els.monthFilter.value;
  const referenceMonth = els.referenceMonth.value;
  state.language = els.languageSelect.value === "en" ? "en" : "pt";
  fillSelect(els.monthFilter, displayMonths().map((name, index) => ({ label: name, value: index })));
  fillSelect(els.referenceMonth, displayMonths().map((name, index) => ({ label: name, value: index })));
  els.monthFilter.value = month;
  els.referenceMonth.value = referenceMonth;
  applyStaticTranslations();
  updateThemeButton();
  updateAuthUi();
  renderGeneralRegistrations();
  render();
  persist();
}

function changeBaseCurrency() {
  state.baseCurrency = els.baseCurrency.value;
  render();
  updateConversionPreview();
  persist();
}

async function fetchExchangeRates(date = "latest") {
  const response = await fetch(`https://api.frankfurter.dev/v1/${date}?from=EUR&to=BRL,USD`);
  if (!response.ok) throw new Error("Cotação indisponível");
  const data = await response.json();
  const rates = { EUR: 1, BRL: Number(data.rates?.BRL), USD: Number(data.rates?.USD) };
  if (!rates.BRL || !rates.USD) throw new Error("Cotação incompleta");
  return { rates, rateDate: data.date || date };
}

async function getRatesForDate(date) {
  const cacheKey = date || "latest";
  if (state.exchangeRatesCache[cacheKey]) return state.exchangeRatesCache[cacheKey];

  try {
    const result = await fetchExchangeRates(cacheKey);
    state.exchangeRatesCache[cacheKey] = result;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return result;
  } catch {
    const cached = state.exchangeRatesCache.latest || Object.values(state.exchangeRatesCache).at(-1);
    if (cached) return { ...cached, fallback: true };
    return null;
  }
}

async function initializeExchangeRates() {
  await getRatesForDate("latest");
  const dates = [...new Set(state.entries.filter((item) => !item.rates).map((item) => item.date).filter(Boolean))];
  await Promise.all(dates.map((date) => getRatesForDate(date)));
  await loadExchangeHistory();
  render();
  updateConversionPreview();
}

function changeExchangePair() {
  state.exchangePair = els.exchangePair.value;
  renderExchangeChart();
  persist();
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function subtractCalendarMonths(date, months) {
  const result = new Date(date);
  const desiredDay = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() - months);
  const lastDay = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();
  result.setUTCDate(Math.min(desiredDay, lastDay));
  return result;
}

function getExchangeDateRange() {
  const today = new Date();
  const endDate = dateKey(today);

  if (state.exchangePeriod === "custom" && state.exchangeCustomStart && state.exchangeCustomEnd) {
    return { startDate: state.exchangeCustomStart, endDate: state.exchangeCustomEnd };
  }

  const monthsByPeriod = { "1m": 1, "3m": 3, "6m": 6 };
  const start = state.exchangePeriod === "1y"
    ? new Date(Date.UTC(today.getUTCFullYear() - 1, today.getUTCMonth(), today.getUTCDate()))
    : subtractCalendarMonths(today, monthsByPeriod[state.exchangePeriod] || 1);

  return { startDate: dateKey(start), endDate };
}

function initializeExchangeRangeControls() {
  const today = dateKey(new Date());
  const defaultStart = dateKey(subtractCalendarMonths(new Date(), 1));
  els.exchangeStartDate.max = today;
  els.exchangeEndDate.max = today;
  els.exchangeStartDate.value = state.exchangeCustomStart || defaultStart;
  els.exchangeEndDate.value = state.exchangeCustomEnd || today;
  els.exchangeCustomRange.hidden = state.exchangePeriod !== "custom";
}

async function changeExchangePeriod() {
  state.exchangePeriod = els.exchangePeriod.value;
  initializeExchangeRangeControls();
  persist();

  if (state.exchangePeriod !== "custom") {
    await loadExchangeHistory();
  }
}

async function searchCustomExchangeRange() {
  const startDate = els.exchangeStartDate.value;
  const endDate = els.exchangeEndDate.value;
  const today = dateKey(new Date());

  if (!startDate || !endDate || startDate > endDate || endDate > today) {
    alert(ui("Escolha um período válido, sem datas futuras.", "Choose a valid period without future dates."));
    return;
  }

  state.exchangeCustomStart = startDate;
  state.exchangeCustomEnd = endDate;
  state.exchangePeriod = "custom";
  persist();
  await loadExchangeHistory(true);
}

async function loadExchangeHistory(force = false) {
  const todayKey = dateKey(new Date());
  const { startDate, endDate } = getExchangeDateRange();
  const rangeKey = `${startDate}:${endDate}`;

  if (!force && state.exchangeHistory?.fetchedOn === todayKey && state.exchangeHistory?.rangeKey === rangeKey && state.exchangeHistory?.rates) {
    renderExchangeChart();
    return;
  }

  try {
    els.exchangeChart.innerHTML = `<div class="empty-state">${ui("Buscando histórico de cotações...", "Fetching exchange-rate history...")}</div>`;
    const requestStart = new Date(`${startDate}T00:00:00Z`);
    requestStart.setUTCDate(requestStart.getUTCDate() - 7);
    const apiStartDate = dateKey(requestStart);
    const response = await fetch(`https://api.frankfurter.dev/v1/${apiStartDate}..${endDate}?from=EUR&to=BRL,USD`);
    if (!response.ok) throw new Error("Histórico indisponível");
    const data = await response.json();
    state.exchangeHistory = { fetchedOn: todayKey, rangeKey, startDate, endDate, rates: data.rates || {} };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    if (state.exchangeHistory?.rangeKey !== rangeKey) {
      els.exchangeCurrent.textContent = "—";
      els.exchangeMin.textContent = "—";
      els.exchangeMax.textContent = "—";
      els.exchangeChart.innerHTML = `<div class="empty-state">${ui("Não foi possível consultar este período. Verifique a conexão.", "This period could not be loaded. Check your connection.")}</div>`;
      return;
    }
  }

  renderExchangeChart();
}

function exchangePairValue(snapshot, source, target) {
  const rates = { EUR: 1, ...snapshot };
  if (!rates[source] || !rates[target]) return null;
  return rates[target] / rates[source];
}

function formatExchangeRate(value, target) {
  return `${Number(value).toLocaleString(state.language === "en" ? "en-IE" : "pt-BR", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ${target}`;
}

function expandExchangeHistory(history) {
  const sourceRows = Object.entries(history)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB));

  if (!sourceRows.length) return [];

  const snapshots = new Map(sourceRows);
  const firstDate = sourceRows[0][0];
  const lastDate = state.exchangeHistory?.endDate || state.exchangeHistory?.fetchedOn || sourceRows.at(-1)[0];
  const start = new Date(`${firstDate}T00:00:00Z`);
  const end = new Date(`${lastDate}T00:00:00Z`);
  const rows = [];
  let lastSnapshot = null;
  let lastSourceDate = null;

  for (const cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const date = cursor.toISOString().slice(0, 10);
    const publishedSnapshot = snapshots.get(date);

    if (publishedSnapshot) {
      lastSnapshot = publishedSnapshot;
      lastSourceDate = date;
    }

    if (!lastSnapshot) continue;

    rows.push({
      date,
      snapshot: lastSnapshot,
      carried: !publishedSnapshot,
      sourceDate: lastSourceDate,
    });
  }

  return rows;
}

function renderExchangeChart() {
  const history = state.exchangeHistory?.rates || {};
  const [source, target] = (state.exchangePair || "EUR/BRL").split("/");
  const visibleStartDate = state.exchangeHistory?.startDate;
  const rows = expandExchangeHistory(history)
    .map((item) => ({ ...item, value: exchangePairValue(item.snapshot, source, target) }))
    .filter((item) => !visibleStartDate || item.date >= visibleStartDate)
    .filter((item) => Number.isFinite(item.value));

  if (!rows.length) {
    els.exchangeCurrent.textContent = "—";
    els.exchangeMin.textContent = "—";
    els.exchangeMax.textContent = "—";
    els.exchangeChart.innerHTML = `<div class="empty-state">${ui("Buscando histórico de cotações...", "Fetching exchange-rate history...")}</div>`;
    return;
  }

  const values = rows.map((item) => item.value);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const latest = rows.at(-1).value;
  els.exchangeCurrent.textContent = formatExchangeRate(latest, target);
  els.exchangeMin.textContent = formatExchangeRate(minimum, target);
  els.exchangeMax.textContent = formatExchangeRate(maximum, target);

  const width = 720;
  const height = 270;
  const padding = { top: 20, right: 18, bottom: 38, left: 62 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const range = maximum - minimum || Math.max(maximum * 0.01, 0.0001);
  const chartMin = minimum - range * 0.12;
  const chartMax = maximum + range * 0.12;
  const chartRange = chartMax - chartMin;
  const x = (index) => padding.left + (index / Math.max(rows.length - 1, 1)) * plotWidth;
  const y = (value) => padding.top + ((chartMax - value) / chartRange) * plotHeight;
  const points = rows.map((item, index) => `${x(index).toFixed(2)},${y(item.value).toFixed(2)}`).join(" ");
  const areaPoints = `${padding.left},${padding.top + plotHeight} ${points} ${width - padding.right},${padding.top + plotHeight}`;
  const grid = Array.from({ length: 5 }, (_, index) => {
    const value = chartMax - (index / 4) * chartRange;
    const lineY = padding.top + (index / 4) * plotHeight;
    return `<line class="exchange-grid-line" x1="${padding.left}" y1="${lineY}" x2="${width - padding.right}" y2="${lineY}"></line>
      <text class="exchange-axis-label" x="${padding.left - 8}" y="${lineY + 4}" text-anchor="end">${Number(value).toFixed(4)}</text>`;
  }).join("");
  const labelIndexes = [...new Set([0, Math.floor((rows.length - 1) / 2), rows.length - 1])];
  const dateLabels = labelIndexes.map((index) => {
    const includeYear = rows[0].date.slice(0, 4) !== rows.at(-1).date.slice(0, 4);
    const label = new Date(`${rows[index].date}T00:00:00`).toLocaleDateString(state.language === "en" ? "en-IE" : "pt-BR", {
      day: "2-digit",
      month: "short",
      ...(includeYear ? { year: "2-digit" } : {}),
    });
    return `<text class="exchange-axis-label" x="${x(index)}" y="${height - 12}" text-anchor="middle">${label}</text>`;
  }).join("");
  const pointMarkers = rows.map((item, index) => {
    const marketStatus = item.carried ? ui("mercado fechado", "market closed") : ui("cotacao oficial", "official rate");
    const accessibleLabel = `${item.date}: ${formatExchangeRate(item.value, target)}, ${marketStatus}`;
    const radius = rows.length > 250 ? 1.7 : rows.length > 100 ? 2.2 : 3;
    return `<circle class="exchange-point${item.carried ? " carried" : ""}" cx="${x(index)}" cy="${y(item.value)}" r="${radius}" tabindex="0" data-date="${item.date}" data-value="${item.value}" data-carried="${item.carried}" data-source-date="${item.sourceDate}" aria-label="${accessibleLabel}"></circle>`;
  }).join("");

  els.exchangeChart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${source}/${target}">
    ${grid}
    ${dateLabels}
    <polygon class="exchange-area" points="${areaPoints}"></polygon>
    <line class="exchange-hover-line" x1="0" y1="${padding.top}" x2="0" y2="${padding.top + plotHeight}"></line>
    <polyline class="exchange-line" pathLength="1" points="${points}"></polyline>
    ${pointMarkers}
  </svg>
  <div class="exchange-tooltip" role="status"></div>`;
  bindExchangeChartInteractions(source, target);
}

function bindExchangeChartInteractions(source, target) {
  const tooltip = els.exchangeChart.querySelector(".exchange-tooltip");
  const guide = els.exchangeChart.querySelector(".exchange-hover-line");
  const points = [...els.exchangeChart.querySelectorAll(".exchange-point")];

  const hideTooltip = () => {
    tooltip.classList.remove("visible");
    guide.classList.remove("visible");
    points.forEach((point) => point.classList.remove("active"));
  };

  const showTooltip = (point) => {
    points.forEach((item) => item.classList.toggle("active", item === point));
    const date = new Date(`${point.dataset.date}T00:00:00`).toLocaleDateString(state.language === "en" ? "en-IE" : "pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const sourceDate = new Date(`${point.dataset.sourceDate}T00:00:00`).toLocaleDateString(state.language === "en" ? "en-IE" : "pt-BR");
    const marketStatus = point.dataset.carried === "true"
      ? `<small class="market-status">${ui("Mercado fechado - cotacao de", "Market closed - rate from")} ${sourceDate}</small>`
      : "";
    tooltip.innerHTML = `<span>${source}/${target}</span><strong>${formatExchangeRate(Number(point.dataset.value), target)}</strong><small>${date}</small>${marketStatus}`;

    const chartRect = els.exchangeChart.getBoundingClientRect();
    const pointRect = point.getBoundingClientRect();
    const pointX = pointRect.left + pointRect.width / 2 - chartRect.left;
    const pointY = pointRect.top + pointRect.height / 2 - chartRect.top;
    const safeX = Math.max(90, Math.min(chartRect.width - 90, pointX));
    tooltip.style.left = `${safeX}px`;
    tooltip.style.top = `${Math.max(70, pointY)}px`;
    tooltip.classList.add("visible");

    const guideX = point.getAttribute("cx");
    guide.setAttribute("x1", guideX);
    guide.setAttribute("x2", guideX);
    guide.classList.add("visible");
  };

  points.forEach((point) => {
    point.addEventListener("pointerenter", () => showTooltip(point));
    point.addEventListener("pointerdown", () => showTooltip(point));
    point.addEventListener("focus", () => showTooltip(point));
    point.addEventListener("pointerleave", hideTooltip);
    point.addEventListener("blur", hideTooltip);
  });

  els.exchangeChart.querySelector("svg").addEventListener("pointerleave", hideTooltip);
}

function ratesForEntry(item) {
  return item.rates || state.exchangeRatesCache[item.date]?.rates || state.exchangeRatesCache.latest?.rates || null;
}

function convertCurrency(amount, sourceCurrency, targetCurrency, rates) {
  const numericAmount = Number(amount || 0);
  if (sourceCurrency === targetCurrency) return numericAmount;
  if (!rates?.[sourceCurrency] || !rates?.[targetCurrency]) return null;
  return (numericAmount / rates[sourceCurrency]) * rates[targetCurrency];
}

function entryValue(item, targetCurrency = state.baseCurrency) {
  return convertCurrency(item.amount, item.currency || "BRL", targetCurrency, ratesForEntry(item)) ?? 0;
}

async function updateConversionPreview() {
  const requestId = ++conversionRequestId;
  const amount = Number(els.amount.value || 0);
  const sourceCurrency = els.currency.value;
  const targetCurrency = state.baseCurrency;

  if (!amount) {
    els.conversionPreview.textContent = ui("Informe o valor para visualizar a conversão.", "Enter an amount to preview the conversion.");
    return;
  }

  if (sourceCurrency === targetCurrency) {
    els.conversionPreview.innerHTML = `<strong>${money(amount, sourceCurrency)}</strong> · ${ui("sem conversão", "no conversion")}`;
    return;
  }

  els.conversionPreview.textContent = ui("Buscando cotação...", "Fetching exchange rate...");
  const result = await getRatesForDate(els.date.value);
  if (requestId !== conversionRequestId) return;
  if (!result) {
    els.conversionPreview.textContent = ui("Cotação indisponível. Verifique a conexão.", "Rate unavailable. Check your connection.");
    return;
  }

  const converted = convertCurrency(amount, sourceCurrency, targetCurrency, result.rates);
  if (converted === null) {
    els.conversionPreview.textContent = ui("Cotação incompleta. Tente atualizar novamente.", "Incomplete rate. Please try updating again.");
    return;
  }
  const fallback = result.fallback ? ` · ${ui("última cotação salva", "last saved rate")}` : ` · ${ui("cotação de", "rate from")} ${formatDate(result.rateDate)}`;
  els.conversionPreview.innerHTML = `<strong>${money(amount, sourceCurrency)} = ${money(converted, targetCurrency)}</strong>${fallback}`;
}

function currentCategoryOptions() {
  if (!state.categories || typeof state.categories !== "object") {
    state.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!Array.isArray(state.categories.Despesa)) {
    state.categories.Despesa = [...DEFAULT_CATEGORIES.Despesa];
  }
  return state.categories.Despesa;
}

function updateCategoryOptions() {
  const typeValue = els.type.value;
  fillSelect(els.category, currentCategoryOptions());
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

  els.controlYearLabel.textContent = `${ui("Controle financeiro", "Financial control")} ${year}`;
  els.selectedMonthLabel.textContent = `${displayMonths()[month]} ${year}`;
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
  renderExchangeChart();
  applyStaticTranslations();
}

function calculateStartingBalance(month, year) {
  return state.entries.reduce((total, item) => {
    const itemYear = entryYear(item);
    const itemMonth = Number(item.referenceMonth);
    if (itemYear > year || (itemYear === year && itemMonth >= month)) return total;
    const value = entryValue(item);
    return total + (item.type === "Receita" ? value : -value);
  }, 0);
}

function sum(entries) {
  return entries.reduce((total, item) => total + entryValue(item), 0);
}

function money(value, currency = state.baseCurrency) {
  return Number(value || 0).toLocaleString(state.language === "en" ? "en-IE" : "pt-BR", { style: "currency", currency });
}

function renderCashflow(income, expense, balance) {
  const max = Math.max(income, expense, Math.abs(balance), 1);
  const rows = [
    [ui("Receitas", "Income"), income, "income"],
    [ui("Despesas", "Expenses"), expense, "expense"],
    [ui("Resultado", "Result"), balance, "accent"],
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
  const months = displayMonths();
  const monthly = months.map((_, month) => {
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
        <div class="month-column" title="${months[index]}">
          <div class="month-bars">
            <span class="fill income" style="height:${incomeHeight}%"></span>
            <span class="fill expense" style="height:${expenseHeight}%"></span>
          </div>
          <small>${months[index].slice(0, 3)}</small>
        </div>
      `;
    })
    .join("");
}

function groupValues(entries, key) {
  return entries.reduce((groups, item) => {
    const label = item[key] || ui("Sem informação", "No information");
    groups[label] = (groups[label] || 0) + entryValue(item);
    return groups;
  }, {});
}

function accountBalances() {
  return state.entries.reduce((groups, item) => {
    const itemYear = entryYear(item);
    const itemMonth = Number(item.referenceMonth);
    if (itemYear > selectedYear() || (itemYear === selectedYear() && itemMonth > selectedMonth())) return groups;
    const value = entryValue(item);
    groups[item.account] = (groups[item.account] || 0) + (item.type === "Receita" ? value : -value);
    return groups;
  }, {});
}

function renderBarList(container, groups, forceColorClass = null) {
  const rows = Object.entries(groups)
    .filter(([, value]) => value !== 0)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  const max = Math.max(...rows.map(([, value]) => Math.abs(value)), 1);

  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">${ui("Sem dados para exibir.", "No data to display.")}</div>`;
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
    els.entriesTable.innerHTML = `<tr><td colspan="9"><div class="empty-state">${ui("Nenhum lançamento encontrado.", "No entries found.")}</div></td></tr>`;
    return;
  }

  els.entriesTable.innerHTML = entries
    .map(
      (item) => `
        <tr>
          <td>${formatDate(item.date)}</td>
          <td>${displayMonths()[item.referenceMonth]} ${entryYear(item)}</td>
          <td><span class="pill ${item.type === "Receita" ? "income" : "expense"}">${item.type === "Receita" ? ui("Receita", "Income") : ui("Despesa", "Expense")}</span></td>
          <td><strong>${escapeHtml(item.description)}</strong><br><small>${escapeHtml(item.notes || "")}</small></td>
          <td>${escapeHtml(item.category)}</td>
          <td>${escapeHtml(item.payment)}</td>
          <td>${escapeHtml(item.account)}</td>
          <td>
            <strong>${money(item.amount, item.currency || "BRL")}</strong>
            ${(item.currency || "BRL") !== state.baseCurrency
              ? ratesForEntry(item)
                ? `<br><small>≈ ${money(entryValue(item))}</small>`
                : `<br><small>${ui("Cotação pendente", "Rate pending")}</small>`
              : ""}
          </td>
          <td>
            <div class="row-actions">
              <button type="button" data-action="edit" data-id="${item.id}">${ui("Editar", "Edit")}</button>
              <button type="button" data-action="delete" data-id="${item.id}">${ui("Excluir", "Delete")}</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

async function saveEntry(event) {
  event.preventDefault();
  const rateResult = await getRatesForDate(els.date.value);
  if (els.currency.value !== state.baseCurrency && !rateResult) {
    alert(ui("Não foi possível obter a cotação. Conecte-se à internet e tente novamente.", "Could not obtain the exchange rate. Connect to the internet and try again."));
    return;
  }
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
    currency: els.currency.value,
    rates: rateResult?.rates || null,
    rateDate: rateResult?.rateDate || els.date.value,
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
  els.currency.value = state.baseCurrency;
  updateCategoryOptions();
  updateConversionPreview();
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
  ensureCategoryOption(item.category);
  els.category.value = item.category;
  els.payment.value = item.payment;
  els.account.value = item.account;
  els.currency.value = item.currency || "BRL";
  els.amount.value = item.amount;
  els.notes.value = item.notes || "";
  els.cancelEdit.classList.remove("hidden");
  activeRegistrationTab = "entry";
  renderRegistrationTabs();
  updateConversionPreview();
  els.entryForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteEntry(id) {
  const item = state.entries.find((entryItem) => entryItem.id === id);
  if (!item) return;
  if (!confirm(`${ui("Excluir", "Delete")} "${item.description}"?`)) return;
  state.entries = state.entries.filter((entryItem) => entryItem.id !== id);
  persist();
  render();
}

function ensureCategoryOption(category) {
  if (!category || currentCategoryOptions().includes(category)) return;
  const option = document.createElement("option");
  option.value = category;
  option.textContent = `${category} (histórico)`;
  els.category.append(option);
}

function generalRegistrationConfig() {
  if (activeSubRegistrationTab === "categories") {
    return {
      label: ui("Nova categoria", "New category"),
      placeholder: ui("Ex.: Educação, Saúde, Mercado", "E.g.: Education, Health, Groceries"),
      items: currentCategoryOptions(),
      duplicateMessage: ui("Esta categoria já está cadastrada.", "This category is already registered."),
      removeMessage: ui("categorias", "categories"),
    };
  }

  if (activeSubRegistrationTab === "accounts") {
    return {
      label: ui("Nova conta", "New account"),
      placeholder: ui("Ex.: Carteira, Banco, Poupança", "E.g.: Wallet, Bank, Savings"),
      items: state.accounts,
      duplicateMessage: ui("Esta conta já está cadastrada.", "This account is already registered."),
      removeMessage: ui("contas", "accounts"),
    };
  }

  return {
    label: ui("Nova origem de receita", "New income source"),
    placeholder: ui("Ex.: Mercado, aluguel, cliente", "E.g.: Store, rent, client"),
    items: state.incomeSources,
    duplicateMessage: ui("Esta origem já está cadastrada.", "This income source is already registered."),
    removeMessage: ui("origens de receita", "income sources"),
  };
}

function addGeneralRegistrationItem(event) {
  event.preventDefault();
  const cleanName = els.newIncomeSource.value.trim();
  if (!cleanName) return;

  const config = generalRegistrationConfig();
  const alreadyExists = config.items.some((item) => item.toLocaleLowerCase("pt-BR") === cleanName.toLocaleLowerCase("pt-BR"));
  if (alreadyExists) {
    alert(config.duplicateMessage);
    return;
  }

  if (activeSubRegistrationTab === "categories") {
    state.categories.Despesa = [...config.items, cleanName];
    updateCategoryOptions();
  } else if (activeSubRegistrationTab === "accounts") {
    state.accounts = [...state.accounts, cleanName];
    fillSelect(els.account, state.accounts);
    els.account.value = cleanName;
  } else {
    state.incomeSources = normalizeIncomeSources([...state.incomeSources, cleanName]);
    fillSelect(els.incomeSource, state.incomeSources);
    els.incomeSource.value = cleanName;
  }

  els.newIncomeSource.value = "";
  renderGeneralRegistrations();
  persist();
}

function removeGeneralRegistrationItem(event) {
  const button = event.target.closest("button[data-general-item]");
  if (!button) return;
  const selectedItem = button.dataset.generalItem;
  if (!selectedItem || (activeSubRegistrationTab === "incomeSources" && selectedItem === "Não se aplica")) {
    alert(ui('A opção "Não se aplica" é fixa e não pode ser removida.', 'The "Not applicable" option is fixed and cannot be removed.'));
    return;
  }

  const config = generalRegistrationConfig();
  if (!confirm(`${ui("Remover", "Remove")} "${selectedItem}" ${ui("da lista de", "from the list of")} ${config.removeMessage}? ${ui("Os históricos já cadastrados continuarão salvos.", "Existing history will remain saved.")}`)) return;

  if (activeSubRegistrationTab === "categories") {
    state.categories.Despesa = state.categories.Despesa.filter((item) => item !== selectedItem);
    updateCategoryOptions();
  } else if (activeSubRegistrationTab === "accounts") {
    state.accounts = state.accounts.filter((item) => item !== selectedItem);
    fillSelect(els.account, state.accounts);
  } else {
    state.incomeSources = normalizeIncomeSources(state.incomeSources.filter((item) => item !== selectedItem));
    fillSelect(els.incomeSource, state.incomeSources);
    els.incomeSource.value = state.incomeSources[0] || "Não se aplica";
  }

  renderGeneralRegistrations();
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
  els.themeToggle.textContent = isDark ? ui("Tema claro", "Light theme") : ui("Tema escuro", "Dark theme");
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
  els.backupPanel.classList.toggle("hidden", activeRegistrationTab !== "backup");
  renderGeneralRegistrations();
}

function renderGeneralRegistrations() {
  document.querySelectorAll("[data-sub-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.subTab === activeSubRegistrationTab);
  });

  const config = generalRegistrationConfig();
  document.querySelector("#subFormLabel").textContent = config.label;
  els.newIncomeSource.placeholder = config.placeholder;
  els.newIncomeSource.value = "";

  els.incomeSourcesList.innerHTML = config.items
    .map((item) => {
      const isFixed = activeSubRegistrationTab === "incomeSources" && item === "Não se aplica";
      const deleteButton = isFixed
        ? `<span class="fixed-label">${ui("Fixo", "Fixed")}</span>`
        : `<button class="icon-danger" type="button" data-general-item="${escapeHtml(item)}" aria-label="Remover ${escapeHtml(item)}">🗑</button>`;
      return `
        <div class="editable-list-row">
          <span>${escapeHtml(item)}</span>
          ${deleteButton}
        </div>
      `;
    })
    .join("");
}

function exportCsv() {
  const headers = state.language === "en"
    ? ["Date", "Reference", "Type", "Source", "Description", "Category", "Method", "Account", "Original amount", "Currency", `Amount in ${state.baseCurrency}`, "Notes"]
    : ["Data", "Referente", "Tipo", "Origem", "Descrição", "Categoria", "Forma", "Conta", "Valor original", "Moeda", `Valor em ${state.baseCurrency}`, "Observações"];
  const rows = state.entries.map((item) => [
    item.date,
    displayMonths()[item.referenceMonth],
    item.type,
    item.incomeSource,
    item.description,
    item.category,
    item.payment,
    item.account,
    item.amount.toFixed(2).replace(".", ","),
    item.currency || "BRL",
    entryValue(item).toFixed(2).replace(".", ","),
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

function downloadBackup() {
  const backup = {
    format: "controle-financeiro-backup",
    version: 1,
    exportedAt: new Date().toISOString(),
    state,
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `controle-financeiro-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function restoreBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const backup = JSON.parse(await file.text());
    if (
      backup?.format !== "controle-financeiro-backup" ||
      backup?.version !== 1 ||
      !backup.state ||
      !Array.isArray(backup.state.entries) ||
      !Array.isArray(backup.state.accounts) ||
      !Array.isArray(backup.state.incomeSources)
    ) {
      throw new Error("Arquivo de backup inválido.");
    }

    if (!confirm("Restaurar este backup? Os dados atuais serão substituídos e a alteração será sincronizada com os outros aparelhos.")) return;

    applyRemoteState(backup.state);
    persist();
    clearForm();
    render();
    alert("Backup restaurado com sucesso.");
  } catch (error) {
    alert(error.message || "Não foi possível restaurar o backup.");
  } finally {
    event.target.value = "";
  }
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
  return new Date(`${value}T00:00:00`).toLocaleDateString(state.language === "en" ? "en-GB" : "pt-BR");
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
