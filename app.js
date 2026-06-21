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
  "Categoria": "Category", "Forma de pagamento": "Payment method", "Formas de pagamento": "Payment methods", "Conta": "Account", "Valor": "Amount",
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
  "Visualização ampliada": "Expanded view", "Fechar gráfico": "Close chart",
  "Use a roda do mouse para aplicar zoom. Clique e arraste para navegar pelas datas.": "Use the mouse wheel to zoom. Click and drag to navigate through dates.",
  "Controles de zoom": "Zoom controls", "Diminuir zoom": "Zoom out", "Restaurar zoom": "Reset zoom", "Aumentar zoom": "Zoom in",
  "Atual": "Current", "Mínima": "Low", "Máxima": "High", "Digite": "Type", "para confirmar": "to confirm",
  "Todos os lançamentos de receitas e despesas serão apagados permanentemente. Os cadastros e o nome da planilha serão mantidos.": "All income and expense entries will be permanently deleted. Records and the spreadsheet name will be kept."
};

Object.assign(STATIC_TRANSLATIONS, {
  "Ler comprovante": "Read receipt",
  "Selecionar comprovante": "Select receipt",
  "Leitura local": "Local reading",
  "Confira os dados encontrados": "Review the extracted data",
  "Usar estes dados": "Use this data",
  "O comprovante já foi descartado. Somente estes dados serão usados para preencher o formulário.": "The receipt has already been discarded. Only this data will be used to fill in the form.",
  "Fotografe ou selecione uma imagem ou PDF. A leitura é feita neste aparelho, sem enviar o arquivo.": "Take a photo or select an image or PDF. Reading happens on this device without uploading the file.",
});

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
const NEW_USER_OWNER_NAME = "Minha Planilha";
const DEFAULT_MODULE_ORDER = ["dashboard", "registrations", "analysis", "exchange", "history"];
const STORAGE_KEY = "lurdes-controle-financeiro-v1";
const AUTH_STORAGE_KEY = "controle-financeiro-auth-v1";
const SUPABASE_URL = "https://uxioksvzpcogcuplfrdj.supabase.co";
const SUPABASE_KEY = "sb_publishable_0Rglw4_AS_h3B7IZaqN2GA_0Gic3UnW";
const TESSERACT_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/tesseract.min.js";
const PDFJS_MODULE_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs";
const PDFJS_WORKER_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";

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

let authSession = loadAuthSession();
let activeStorageKey = authSession?.user?.id ? accountStorageKey(authSession.user.id) : STORAGE_KEY;
const state = loadState(activeStorageKey);
let activeHistoryFilter = "all";
let activeVisualTab = "overview";
let activeRegistrationTab = "entry";
let activeSubRegistrationTab = "incomeSources";
let syncTimer;
let syncInProgress = false;
let authReady = false;
let conversionRequestId = 0;
let exchangeChartMeta = { rowsCount: 0, source: "EUR", target: "BRL", rows: [] };
let expandedChartBaseWidth = 1100;
let expandedChartWidth = 1100;
let expandedChartZoom = 1;
let expandedChartPan = null;
let pendingReceiptExtraction = null;
let tesseractLoader = null;
let pdfJsLoader = null;

const els = {
  sortableModules: null,
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
  selectReceipt: document.querySelector("#selectReceipt"),
  receiptFile: document.querySelector("#receiptFile"),
  receiptStatus: document.querySelector("#receiptStatus"),
  receiptReviewDialog: document.querySelector("#receiptReviewDialog"),
  closeReceiptReview: document.querySelector("#closeReceiptReview"),
  cancelReceiptReview: document.querySelector("#cancelReceiptReview"),
  applyReceiptData: document.querySelector("#applyReceiptData"),
  receiptReviewSummary: document.querySelector("#receiptReviewSummary"),
  receiptReviewWarnings: document.querySelector("#receiptReviewWarnings"),
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
  exchangeChartTitle: document.querySelector("#exchangeChartTitle"),
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
  exchangeChartDialog: document.querySelector("#exchangeChartDialog"),
  expandedExchangeChartTitle: document.querySelector("#expandedExchangeChartTitle"),
  closeExchangeChartDialog: document.querySelector("#closeExchangeChartDialog"),
  expandedExchangeChartScroll: document.querySelector("#expandedExchangeChartScroll"),
  expandedExchangeChart: document.querySelector("#expandedExchangeChart"),
  exchangeZoomOut: document.querySelector("#exchangeZoomOut"),
  exchangeZoomReset: document.querySelector("#exchangeZoomReset"),
  exchangeZoomIn: document.querySelector("#exchangeZoomIn"),
  exchangeZoomLevel: document.querySelector("#exchangeZoomLevel"),
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
  initializeModuleLayout();
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
  fillSelect(els.payment, state.payments);
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

function normalizeModuleOrder(order) {
  const unique = [];
  for (const id of Array.isArray(order) ? order : []) {
    if (DEFAULT_MODULE_ORDER.includes(id) && !unique.includes(id)) unique.push(id);
  }
  return [...unique, ...DEFAULT_MODULE_ORDER.filter((id) => !unique.includes(id))];
}

function initializeModuleLayout() {
  const moduleDefinitions = [
    ["dashboard", document.querySelector(".dashboard-panel")],
    ["registrations", document.querySelector(".registrations-panel")],
    ["analysis", document.querySelector(".charts-panel")],
    ["exchange", document.querySelector(".exchange-rate-panel")],
    ["history", document.querySelector(".history-panel")],
  ];
  const firstModule = moduleDefinitions[0][1];
  if (!firstModule) return;

  const container = document.createElement("section");
  container.id = "sortableModules";
  container.className = "sortable-modules";
  firstModule.before(container);
  els.sortableModules = container;

  for (const [id, module] of moduleDefinitions) {
    if (!module) continue;
    module.dataset.moduleId = id;
    addModuleDragHandle(module);
    container.append(module);
  }

  document.querySelector(".workspace")?.remove();
  applyModuleOrder();

  if (!window.Sortable) return;
  window.Sortable.create(container, {
    animation: 180,
    handle: ".module-drag-handle",
    draggable: "[data-module-id]",
    ghostClass: "module-sort-ghost",
    chosenClass: "module-sort-chosen",
    dragClass: "module-sort-drag",
    forceFallback: true,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    onEnd: saveModuleOrder,
  });
}

function addModuleDragHandle(module) {
  const title = module.querySelector(":scope > .panel-title");
  const heading = title?.querySelector(":scope > h2");
  if (!title || !heading) return;

  const headingGroup = document.createElement("div");
  headingGroup.className = "module-heading";
  const handle = document.createElement("button");
  handle.className = "module-drag-handle";
  handle.type = "button";
  handle.setAttribute("aria-label", `Mover ${heading.textContent.trim()}`);
  handle.title = "Arrastar para reorganizar";
  handle.innerHTML = '<span aria-hidden="true">&#8942;&#8942;</span>';
  title.insertBefore(headingGroup, heading);
  headingGroup.append(handle, heading);
}

function applyModuleOrder() {
  if (!els.sortableModules) return;
  state.moduleOrder = normalizeModuleOrder(state.moduleOrder);
  const modules = new Map([...els.sortableModules.children].map((module) => [module.dataset.moduleId, module]));
  state.moduleOrder.forEach((id) => {
    if (modules.has(id)) els.sortableModules.append(modules.get(id));
  });
}

function saveModuleOrder() {
  state.moduleOrder = [...els.sortableModules.querySelectorAll(":scope > [data-module-id]")]
    .map((module) => module.dataset.moduleId);
  persist();
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
  els.exchangeChart.addEventListener("click", (event) => {
    if (!event.target.closest(".exchange-point")) openExpandedExchangeChart();
  });
  els.closeExchangeChartDialog.addEventListener("click", () => els.exchangeChartDialog.close());
  els.exchangeZoomOut.addEventListener("click", () => setExpandedChartZoom(expandedChartZoom / 1.35));
  els.exchangeZoomReset.addEventListener("click", () => setExpandedChartZoom(1));
  els.exchangeZoomIn.addEventListener("click", () => setExpandedChartZoom(expandedChartZoom * 1.35));
  els.expandedExchangeChartScroll.addEventListener("wheel", zoomExpandedChartWithWheel, { passive: false });
  els.expandedExchangeChartScroll.addEventListener("pointerdown", startExpandedChartPan);
  els.expandedExchangeChartScroll.addEventListener("pointermove", moveExpandedChartPan);
  els.expandedExchangeChartScroll.addEventListener("pointerup", stopExpandedChartPan);
  els.expandedExchangeChartScroll.addEventListener("pointercancel", stopExpandedChartPan);
  els.exchangeChartDialog.addEventListener("click", (event) => {
    if (event.target === els.exchangeChartDialog) els.exchangeChartDialog.close();
  });
  els.entryForm.addEventListener("submit", saveEntry);
  els.selectReceipt.addEventListener("click", () => els.receiptFile.click());
  els.receiptFile.addEventListener("change", readReceipt);
  els.closeReceiptReview.addEventListener("click", closeReceiptReview);
  els.cancelReceiptReview.addEventListener("click", closeReceiptReview);
  els.applyReceiptData.addEventListener("click", applyReceiptExtraction);
  els.receiptReviewDialog.addEventListener("click", (event) => {
    if (event.target === els.receiptReviewDialog) closeReceiptReview();
  });
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

function setReceiptStatus(message, type = "") {
  els.receiptStatus.textContent = message;
  els.receiptStatus.className = `receipt-status${type ? ` ${type}` : ""}`;
}

async function readReceipt() {
  const file = els.receiptFile.files?.[0];
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    setReceiptStatus(ui("Formato não aceito. Use JPG, PNG, WEBP ou PDF.", "Unsupported format. Use JPG, PNG, WEBP, or PDF."), "error");
    els.receiptFile.value = "";
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    setReceiptStatus(ui("O arquivo deve ter no máximo 8 MB.", "The file must be no larger than 8 MB."), "error");
    els.receiptFile.value = "";
    return;
  }

  els.selectReceipt.disabled = true;
  setReceiptStatus(ui("Preparando a leitura local...", "Preparing local reading..."));

  try {
    const localReading = file.type === "application/pdf"
      ? await readReceiptPdfLocally(file)
      : await readReceiptImageLocally(file);
    pendingReceiptExtraction = extractReceiptFields(localReading.text, localReading.confidence);
    showReceiptReview(pendingReceiptExtraction);
    setReceiptStatus(ui("Leitura local concluída. Confira todos os dados antes de salvar.", "Local reading complete. Review all data before saving."), "success");
  } catch (error) {
    setReceiptStatus(error.message || ui("Não foi possível ler o comprovante.", "Could not read the receipt."), "error");
  } finally {
    els.receiptFile.value = "";
    els.selectReceipt.disabled = false;
  }
}

function loadExternalScript(url, id) {
  const loaded = document.querySelector(`#${id}`);
  if (loaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = id;
    script.src = url;
    script.crossOrigin = "anonymous";
    script.onload = resolve;
    script.onerror = () => reject(new Error(ui("Não foi possível carregar o leitor local. Verifique a conexão.", "Could not load the local reader. Check your connection.")));
    document.head.append(script);
  });
}

async function loadTesseract() {
  if (window.Tesseract) return window.Tesseract;
  if (!tesseractLoader) {
    tesseractLoader = loadExternalScript(TESSERACT_SCRIPT_URL, "tesseract-local-reader")
      .then(() => window.Tesseract)
      .catch((error) => {
        tesseractLoader = null;
        throw error;
      });
  }
  return tesseractLoader;
}

async function loadPdfJs() {
  if (!pdfJsLoader) {
    pdfJsLoader = import(PDFJS_MODULE_URL).then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      return pdfjs;
    }).catch((error) => {
      pdfJsLoader = null;
      throw error;
    });
  }
  return pdfJsLoader;
}

function updateOcrProgress(progress) {
  if (progress.status !== "recognizing text") return;
  const percentage = Math.max(1, Math.min(100, Math.round((progress.progress || 0) * 100)));
  setReceiptStatus(ui(`Lendo o comprovante neste aparelho... ${percentage}%`, `Reading the receipt on this device... ${percentage}%`));
}

async function imageFileToCanvas(file) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = objectUrl;
    });

    const targetWidth = Math.min(2200, Math.max(image.naturalWidth, 1500));
    const scale = targetWidth / image.naturalWidth;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < pixels.data.length; index += 4) {
      const gray = (pixels.data[index] * 0.299) + (pixels.data[index + 1] * 0.587) + (pixels.data[index + 2] * 0.114);
      const adjusted = Math.max(0, Math.min(255, ((gray - 128) * 1.18) + 128));
      pixels.data[index] = adjusted;
      pixels.data[index + 1] = adjusted;
      pixels.data[index + 2] = adjusted;
    }
    context.putImageData(pixels, 0, 0);
    return canvas;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function recognizeCanvas(canvas) {
  const tesseract = await loadTesseract();
  const result = await tesseract.recognize(canvas, "eng+por", { logger: updateOcrProgress });
  return {
    text: String(result?.data?.text || ""),
    confidence: Number(result?.data?.confidence || 0),
  };
}

async function readReceiptImageLocally(file) {
  const canvas = await imageFileToCanvas(file);
  return recognizeCanvas(canvas);
}

async function readReceiptPdfLocally(file) {
  setReceiptStatus(ui("Abrindo o PDF neste aparelho...", "Opening the PDF on this device..."));
  const pdfjs = await loadPdfJs();
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pageCount = Math.min(pdf.numPages, 3);
  const texts = [];
  const confidences = [];

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const digitalText = content.items.map((item) => item.str || "").join(" ").trim();
    if (digitalText.length >= 60) {
      texts.push(digitalText);
      confidences.push(98);
      continue;
    }

    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    const reading = await recognizeCanvas(canvas);
    texts.push(reading.text);
    confidences.push(reading.confidence);
  }

  if (pdf.numPages > pageCount) {
    texts.push(ui("Aviso: somente as três primeiras páginas foram analisadas.", "Warning: only the first three pages were analyzed."));
  }
  return {
    text: texts.join("\n"),
    confidence: confidences.length ? confidences.reduce((sum, value) => sum + value, 0) / confidences.length : 0,
  };
}

function receiptLines(text) {
  return String(text || "").split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
}

function findLabeledReceiptValue(lines, labels) {
  for (const rawLabel of labels) {
    const label = normalizedValue(rawLabel);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const normalizedLine = normalizedValue(line);
      const matches = normalizedLine === label || normalizedLine.startsWith(`${label}:`) || normalizedLine.startsWith(`${label} `);
      if (!matches) continue;
      if (normalizedLine !== label) {
        const labelWords = label.split(/\s+/).length;
        const inlineValue = line.replace(/^.*?:/, "").trim() === line.trim()
          ? line.split(/\s+/).slice(labelWords).join(" ").trim()
          : line.replace(/^.*?:/, "").trim();
        if (inlineValue) return inlineValue;
      }
      if (lines[index + 1]) return lines[index + 1];
    }
  }
  return "";
}

function parseReceiptNumber(value) {
  let clean = String(value || "").replace(/[^\d.,-]/g, "").replace(/^-/, "");
  if (!clean) return 0;
  const comma = clean.lastIndexOf(",");
  const dot = clean.lastIndexOf(".");
  if (comma >= 0 && dot >= 0) {
    clean = comma > dot ? clean.replace(/\./g, "").replace(",", ".") : clean.replace(/,/g, "");
  } else if (comma >= 0) {
    clean = clean.replace(/\./g, "").replace(",", ".");
  }
  const parsed = Number(clean);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractReceiptAmount(lines, text) {
  const labeled = findLabeledReceiptValue(lines, ["amount", "valor", "total", "montante", "value"]);
  const labeledAmount = parseReceiptNumber(labeled);
  if (labeledAmount > 0) return labeledAmount;
  const currencyAmount = String(text).match(/(?:EUR|BRL|USD|R\$|€|US\$|\$)\s*([\d.,]+)|([\d.,]+)\s*(?:EUR|BRL|USD|€)/i);
  return parseReceiptNumber(currencyAmount?.[1] || currencyAmount?.[2]);
}

function validReceiptDate(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return "";
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function extractReceiptDate(text) {
  const source = String(text || "");
  const iso = source.match(/\b(20\d{2})[-/.](0?[1-9]|1[0-2])[-/.](0?[1-9]|[12]\d|3[01])\b/);
  if (iso) return validReceiptDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));
  const numeric = source.match(/\b(0?[1-9]|[12]\d|3[01])[-/.](0?[1-9]|1[0-2])[-/.](20\d{2})\b/);
  if (numeric) return validReceiptDate(Number(numeric[3]), Number(numeric[2]), Number(numeric[1]));

  const months = {
    jan: 1, january: 1, janeiro: 1, fev: 2, feb: 2, february: 2, fevereiro: 2,
    mar: 3, march: 3, marco: 3, abr: 4, apr: 4, april: 4, abril: 4,
    mai: 5, may: 5, maio: 5, jun: 6, june: 6, junho: 6,
    jul: 7, july: 7, julho: 7, ago: 8, aug: 8, august: 8, agosto: 8,
    set: 9, sep: 9, sept: 9, september: 9, setembro: 9,
    out: 10, oct: 10, october: 10, outubro: 10,
    nov: 11, november: 11, novembro: 11, dez: 12, dec: 12, december: 12, dezembro: 12,
  };
  const named = normalizedValue(source).match(/\b(0?[1-9]|[12]\d|3[01])\s+(?:de\s+)?([a-z]+)\.?\s+(?:de\s+)?(20\d{2})\b/);
  if (!named || !months[named[2]]) return "";
  return validReceiptDate(Number(named[3]), months[named[2]], Number(named[1]));
}

function findReceiptOption(text, options) {
  const normalizedText = normalizedValue(text);
  return options.find((option) => {
    const candidate = normalizedValue(option);
    return candidate.length >= 3 && normalizedText.includes(candidate);
  }) || "";
}

function cleanReceiptDescription(value) {
  return String(value || "").replace(/^[*#:\-\s]+/, "").replace(/\s+/g, " ").trim().slice(0, 120);
}

function extractReceiptFields(text, ocrConfidence) {
  const lines = receiptLines(text);
  if (!lines.length) throw new Error(ui("Nenhum texto foi encontrado. Tente uma imagem mais nítida.", "No text was found. Try a clearer image."));

  const normalizedText = normalizedValue(text);
  const incomeEvidence = /\b(received|money received|credit received|recebido|recebimento|valor creditado|deposito recebido)\b/.test(normalizedText);
  const expenseEvidence = /\b(payment details|receiver details|payee|beneficiary|purchase|pagamento|destinatario|transferencia enviada|debito)\b/.test(normalizedText);
  const type = incomeEvidence && !expenseEvidence ? "Receita" : "Despesa";
  const description = cleanReceiptDescription(findLabeledReceiptValue(lines, [
    "payee message", "mensagem ao beneficiário", "mensagem ao beneficiario", "merchant", "estabelecimento",
    "receiver name", "recipient name", "beneficiary", "favorecido", "destinatário", "destinatario", "name",
  ]));
  const amount = extractReceiptAmount(lines, text);
  const date = extractReceiptDate(text);
  const currency = /\bBRL\b|R\$/i.test(text) ? "BRL" : (/\bUSD\b|US\$|\$/i.test(text) ? "USD" : (/\bEUR\b|€/i.test(text) ? "EUR" : state.baseCurrency));
  const category = findReceiptOption(`${description} ${text}`, currentCategoryOptions());
  let payment = findReceiptOption(text, state.payments);
  if (!payment && /\b(iban|bic|bank transfer|transferencia|transferência)\b/i.test(text)) {
    payment = state.payments.find((item) => normalizedValue(item).includes("transfer")) || "";
  }
  const account = findReceiptOption(text, state.accounts);
  const incomeSource = type === "Receita" ? findReceiptOption(text, state.incomeSources) : "";
  const warnings = [ui("Leitura feita por OCR local. Confirme todos os campos antes de salvar.", "Read with local OCR. Confirm every field before saving.")];
  if (!date) warnings.push(ui("A data não foi identificada.", "The date was not identified."));
  if (!amount) warnings.push(ui("O valor não foi identificado.", "The amount was not identified."));
  if (!description) warnings.push(ui("A descrição precisa ser preenchida.", "The description must be filled in."));
  if (!category) warnings.push(ui("A categoria precisa ser escolhida.", "The category must be selected."));
  if (!account) warnings.push(ui("A conta não aparece no comprovante e precisa ser escolhida.", "The account is not shown on the receipt and must be selected."));
  if (!incomeEvidence && !expenseEvidence) warnings.push(ui("O tipo foi sugerido como Despesa por segurança.", "The type was suggested as Expense for safety."));

  const completeness = [date, amount, description, currency].filter(Boolean).length / 4;
  const confidence = Math.max(0.25, Math.min(0.98, ((Number(ocrConfidence) || 0) / 100 * 0.65) + (completeness * 0.35)));
  return {
    type,
    date,
    description,
    category,
    payment,
    account,
    incomeSource,
    amount,
    currency,
    notes: "",
    confidence,
    warnings,
  };
}

function showReceiptReview(data) {
  const labels = [
    [ui("Tipo", "Type"), data.type],
    [ui("Data", "Date"), data.date ? formatDate(data.date) : ui("Não identificada", "Not identified")],
    [ui("Descrição", "Description"), data.description],
    [ui("Categoria", "Category"), data.category],
    [ui("Forma de pagamento", "Payment method"), data.payment],
    [ui("Conta", "Account"), data.account],
    [ui("Valor", "Amount"), data.amount ? money(data.amount, data.currency || state.baseCurrency) : ui("Não identificado", "Not identified")],
    [ui("Confiança da leitura", "Reading confidence"), `${Math.round(Number(data.confidence || 0) * 100)}%`],
  ];

  els.receiptReviewSummary.replaceChildren(...labels.map(([label, value]) => {
    const item = document.createElement("div");
    item.className = "receipt-review-item";
    const name = document.createElement("span");
    const content = document.createElement("strong");
    name.textContent = label;
    content.textContent = value || ui("Revisar", "Review");
    item.append(name, content);
    return item;
  }));

  const warnings = Array.isArray(data.warnings) ? data.warnings.filter(Boolean) : [];
  els.receiptReviewWarnings.classList.toggle("hidden", !warnings.length);
  els.receiptReviewWarnings.textContent = warnings.join(" ");
  els.receiptReviewDialog.showModal();
}

function closeReceiptReview() {
  pendingReceiptExtraction = null;
  els.receiptReviewDialog.close();
}

function normalizedValue(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

function selectSuggestedValue(select, suggestion) {
  const normalizedSuggestion = normalizedValue(suggestion);
  if (!normalizedSuggestion) return false;
  const option = [...select.options].find((item) => normalizedValue(item.value) === normalizedSuggestion);
  if (!option) return false;
  select.value = option.value;
  return true;
}

function applyReceiptExtraction() {
  const data = pendingReceiptExtraction;
  if (!data) return;

  els.type.value = data.type === "Receita" ? "Receita" : "Despesa";
  updateCategoryOptions();
  if (/^\d{4}-\d{2}-\d{2}$/.test(data.date || "")) {
    els.date.value = data.date;
    els.referenceMonth.value = new Date(`${data.date}T00:00:00`).getMonth();
  }
  els.description.value = data.description || "";
  selectSuggestedValue(els.category, data.category);
  selectSuggestedValue(els.payment, data.payment);
  selectSuggestedValue(els.account, data.account);
  selectSuggestedValue(els.currency, data.currency);
  if (Number(data.amount) > 0) els.amount.value = Number(data.amount).toFixed(2);
  if (els.type.value === "Receita") selectSuggestedValue(els.incomeSource, data.incomeSource);
  els.notes.value = data.notes || "";
  updateConversionPreview();

  pendingReceiptExtraction = null;
  els.receiptReviewDialog.close();
  setReceiptStatus(ui("Dados preenchidos. Revise o formulário e clique em Salvar lançamento.", "Data filled in. Review the form and click Save entry."), "success");
  els.entryForm.scrollIntoView({ behavior: "smooth", block: "start" });
  requestAnimationFrame(() => els.description.focus());
}

function accountStorageKey(userId) {
  return `${STORAGE_KEY}:user:${userId}`;
}

function loadState(storageKey = activeStorageKey) {
  const saved = storageKey === STORAGE_KEY ? null : localStorage.getItem(storageKey);
  if (!saved) {
    return {
      entries: [],
      accounts: DEFAULT_ACCOUNTS,
      payments: DEFAULT_PAYMENTS,
      incomeSources: DEFAULT_INCOME_SOURCES,
      categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      ownerName: NEW_USER_OWNER_NAME,
      theme: "light",
      language: "pt",
      baseCurrency: "EUR",
      exchangeRatesCache: {},
      exchangePair: "EUR/BRL",
      exchangePeriod: "1m",
      exchangeCustomStart: null,
      exchangeCustomEnd: null,
      exchangeHistory: null,
      moduleOrder: [...DEFAULT_MODULE_ORDER],
    };
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : sampleEntries,
      accounts: Array.isArray(parsed.accounts) ? parsed.accounts : DEFAULT_ACCOUNTS,
      payments: Array.isArray(parsed.payments) ? parsed.payments : DEFAULT_PAYMENTS,
      incomeSources: Array.isArray(parsed.incomeSources) ? normalizeIncomeSources(parsed.incomeSources) : DEFAULT_INCOME_SOURCES,
      categories: parsed.categories && typeof parsed.categories === "object" ? parsed.categories : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      ownerName: typeof parsed.ownerName === "string" && parsed.ownerName.trim() ? parsed.ownerName : NEW_USER_OWNER_NAME,
      theme: parsed.theme === "dark" ? "dark" : "light",
      language: parsed.language === "en" ? "en" : "pt",
      baseCurrency: ["EUR", "BRL", "USD"].includes(parsed.baseCurrency) ? parsed.baseCurrency : "EUR",
      exchangeRatesCache: parsed.exchangeRatesCache && typeof parsed.exchangeRatesCache === "object" ? parsed.exchangeRatesCache : {},
      exchangePair: typeof parsed.exchangePair === "string" ? parsed.exchangePair : "EUR/BRL",
      exchangePeriod: ["1m", "3m", "6m", "1y", "custom"].includes(parsed.exchangePeriod) ? parsed.exchangePeriod : "1m",
      exchangeCustomStart: typeof parsed.exchangeCustomStart === "string" ? parsed.exchangeCustomStart : null,
      exchangeCustomEnd: typeof parsed.exchangeCustomEnd === "string" ? parsed.exchangeCustomEnd : null,
      exchangeHistory: parsed.exchangeHistory && typeof parsed.exchangeHistory === "object" ? parsed.exchangeHistory : null,
      moduleOrder: normalizeModuleOrder(parsed.moduleOrder),
    };
  } catch {
    return {
      entries: [],
      accounts: DEFAULT_ACCOUNTS,
      payments: DEFAULT_PAYMENTS,
      incomeSources: DEFAULT_INCOME_SOURCES,
      categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      ownerName: NEW_USER_OWNER_NAME,
      theme: "light",
      language: "pt",
      baseCurrency: "EUR",
      exchangeRatesCache: {},
      exchangePair: "EUR/BRL",
      exchangePeriod: "1m",
      exchangeCustomStart: null,
      exchangeCustomEnd: null,
      exchangeHistory: null,
      moduleOrder: [...DEFAULT_MODULE_ORDER],
    };
  }
}

function persist() {
  saveLocalState();
  scheduleCloudSync();
}

function saveLocalState() {
  localStorage.setItem(activeStorageKey, JSON.stringify(state));
}

function activateAccountStorage(userId) {
  if (!userId) return;
  activeStorageKey = accountStorageKey(userId);
  applyRemoteState(loadState(activeStorageKey));
  clearForm();
}

function activateGuestStorage() {
  activeStorageKey = STORAGE_KEY;
  localStorage.removeItem(STORAGE_KEY);
  applyRemoteState(loadState(STORAGE_KEY));
  clearForm();
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
    activateGuestStorage();
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
    activateGuestStorage();
    return null;
  }
}

async function initializeAuth() {
  try {
    await consumeAuthRedirect();
    const session = await ensureSession();
    updateAuthUi();
    if (session?.user?.id) {
      activateAccountStorage(session.user.id);
      await loadRemoteState();
    } else {
      activateGuestStorage();
    }
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
      activateAccountStorage(result.user.id);
      els.authPassword.value = "";
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
    activateAccountStorage(session.user.id);
    els.authPassword.value = "";
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
  activateGuestStorage();
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
  state.payments = Array.isArray(remote.payments) ? remote.payments : [...DEFAULT_PAYMENTS];
  state.incomeSources = Array.isArray(remote.incomeSources) ? normalizeIncomeSources(remote.incomeSources) : [...DEFAULT_INCOME_SOURCES];
  state.categories = remote.categories && typeof remote.categories === "object" ? remote.categories : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  state.ownerName = typeof remote.ownerName === "string" && remote.ownerName.trim() ? remote.ownerName : NEW_USER_OWNER_NAME;
  state.theme = remote.theme === "dark" ? "dark" : "light";
  state.language = remote.language === "en" ? "en" : "pt";
  state.baseCurrency = ["EUR", "BRL", "USD"].includes(remote.baseCurrency) ? remote.baseCurrency : "EUR";
  state.exchangeRatesCache = remote.exchangeRatesCache && typeof remote.exchangeRatesCache === "object" ? remote.exchangeRatesCache : {};
  state.exchangePair = typeof remote.exchangePair === "string" ? remote.exchangePair : "EUR/BRL";
  state.exchangePeriod = ["1m", "3m", "6m", "1y", "custom"].includes(remote.exchangePeriod) ? remote.exchangePeriod : "1m";
  state.exchangeCustomStart = typeof remote.exchangeCustomStart === "string" ? remote.exchangeCustomStart : null;
  state.exchangeCustomEnd = typeof remote.exchangeCustomEnd === "string" ? remote.exchangeCustomEnd : null;
  state.exchangeHistory = remote.exchangeHistory && typeof remote.exchangeHistory === "object" ? remote.exchangeHistory : null;
  state.moduleOrder = normalizeModuleOrder(remote.moduleOrder);

  saveLocalState();
  fillSelect(els.incomeSource, state.incomeSources);
  fillSelect(els.account, state.accounts);
  fillSelect(els.payment, state.payments);
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
  applyModuleOrder();
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
    saveLocalState();
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
    saveLocalState();
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

function exchangePeriodLabel() {
  const labels = {
    "1m": ui("1 mês", "1 month"),
    "3m": ui("3 meses", "3 months"),
    "6m": ui("6 meses", "6 months"),
    "1y": ui("1 ano", "1 year"),
  };

  if (state.exchangePeriod !== "custom") return labels[state.exchangePeriod] || labels["1m"];
  const locale = state.language === "en" ? "en-IE" : "pt-BR";
  const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString(locale);
  return state.exchangeCustomStart && state.exchangeCustomEnd
    ? `${formatDate(state.exchangeCustomStart)} - ${formatDate(state.exchangeCustomEnd)}`
    : ui("Personalizado", "Custom");
}

function updateExchangeChartTitles(source, target) {
  const title = `${ui("Gráfico Cotações Tempo Real", "Real-Time Exchange Rate Chart")} · ${source}/${target} · ${exchangePeriodLabel()}`;
  els.exchangeChartTitle.textContent = title;
  els.expandedExchangeChartTitle.textContent = title;
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
  updateExchangeChartTitles(source, target);
  const visibleStartDate = state.exchangeHistory?.startDate;
  const rows = expandExchangeHistory(history)
    .map((item) => ({ ...item, value: exchangePairValue(item.snapshot, source, target) }))
    .filter((item) => !visibleStartDate || item.date >= visibleStartDate)
    .filter((item) => Number.isFinite(item.value));

  if (!rows.length) {
    exchangeChartMeta = { rowsCount: 0, source, target, rows: [] };
    els.exchangeCurrent.textContent = "—";
    els.exchangeMin.textContent = "—";
    els.exchangeMax.textContent = "—";
    els.exchangeChart.innerHTML = `<div class="empty-state">${ui("Buscando histórico de cotações...", "Fetching exchange-rate history...")}</div>`;
    return;
  }

  const values = rows.map((item) => item.value);
  exchangeChartMeta = { rowsCount: rows.length, source, target, rows };
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
    return `<text class="exchange-axis-label exchange-date-label" x="${x(index)}" y="${height - 12}" text-anchor="middle">${label}</text>`;
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
    <line class="exchange-hover-line exchange-hover-line-vertical" x1="0" y1="${padding.top}" x2="0" y2="${padding.top + plotHeight}"></line>
    <line class="exchange-hover-line exchange-hover-line-horizontal" x1="${padding.left}" y1="0" x2="${width - padding.right}" y2="0"></line>
    <polyline class="exchange-line" pathLength="1" points="${points}"></polyline>
    ${pointMarkers}
  </svg>
  <div class="exchange-tooltip" role="status"></div>
  <button class="exchange-expand-button" type="button" aria-label="${ui("Expandir gráfico", "Expand chart")}" title="${ui("Expandir gráfico", "Expand chart")}">&#x26F6;</button>`;
  bindExchangeChartInteractions(source, target, els.exchangeChart);
  els.exchangeChart.querySelector(".exchange-expand-button").addEventListener("click", (event) => {
    event.stopPropagation();
    openExpandedExchangeChart();
  });
}

function bindExchangeChartInteractions(source, target, chart = els.exchangeChart) {
  const tooltip = chart.querySelector(".exchange-tooltip");
  const verticalGuide = chart.querySelector(".exchange-hover-line-vertical");
  const horizontalGuide = chart.querySelector(".exchange-hover-line-horizontal");
  const guides = [verticalGuide, horizontalGuide].filter(Boolean);
  const points = [...chart.querySelectorAll(".exchange-point")];

  const hideTooltip = () => {
    tooltip.classList.remove("visible");
    guides.forEach((guide) => guide.classList.remove("visible"));
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

    const chartRect = chart.getBoundingClientRect();
    const pointRect = point.getBoundingClientRect();
    const pointX = pointRect.left + pointRect.width / 2 - chartRect.left;
    const pointY = pointRect.top + pointRect.height / 2 - chartRect.top;
    const safeX = Math.max(90, Math.min(chartRect.width - 90, pointX));
    tooltip.style.left = `${safeX}px`;
    tooltip.style.top = `${Math.max(70, pointY)}px`;
    tooltip.classList.add("visible");

    const guideX = point.getAttribute("cx");
    const guideY = point.getAttribute("cy");
    verticalGuide?.setAttribute("x1", guideX);
    verticalGuide?.setAttribute("x2", guideX);
    horizontalGuide?.setAttribute("y1", guideY);
    horizontalGuide?.setAttribute("y2", guideY);
    guides.forEach((guide) => guide.classList.add("visible"));
  };

  points.forEach((point) => {
    point.addEventListener("pointerenter", () => showTooltip(point));
    point.addEventListener("pointerdown", () => showTooltip(point));
    point.addEventListener("focus", () => showTooltip(point));
    point.addEventListener("pointerleave", hideTooltip);
    point.addEventListener("blur", hideTooltip);
  });

  chart.querySelector("svg").addEventListener("pointerleave", hideTooltip);
}

function openExpandedExchangeChart() {
  const sourceSvg = els.exchangeChart.querySelector("svg");
  if (!sourceSvg || exchangeChartMeta.rowsCount === 0 || els.exchangeChartDialog.open) return;

  expandedChartBaseWidth = Math.max(1100, exchangeChartMeta.rowsCount * 5);
  expandedChartWidth = expandedChartBaseWidth;
  expandedChartZoom = 1;
  els.exchangeZoomLevel.textContent = "100%";
  els.expandedExchangeChart.style.width = `${expandedChartWidth}px`;
  els.expandedExchangeChart.innerHTML = `${sourceSvg.outerHTML}<div class="exchange-tooltip" role="status"></div>`;
  resizeExpandedSvg(expandedChartWidth, 520, true);
  updateExpandedDateLabels();
  bindExchangeChartInteractions(exchangeChartMeta.source, exchangeChartMeta.target, els.expandedExchangeChart);
  els.exchangeChartDialog.showModal();

  requestAnimationFrame(() => {
    els.expandedExchangeChartScroll.scrollLeft = els.expandedExchangeChartScroll.scrollWidth - els.expandedExchangeChartScroll.clientWidth;
  });
}

function resizeExpandedSvg(targetWidth, targetHeight = 520, initial = false) {
  const svg = els.expandedExchangeChart.querySelector("svg");
  if (!svg) return;

  const scaleX = initial ? targetWidth / 720 : targetWidth / expandedChartWidth;
  const scaleY = initial ? targetHeight / 270 : 1;
  const horizontalAttributes = ["x", "x1", "x2", "cx"];
  const verticalAttributes = ["y", "y1", "y2", "cy"];

  svg.querySelectorAll("*").forEach((element) => {
    horizontalAttributes.forEach((attribute) => {
      if (element.hasAttribute(attribute)) element.setAttribute(attribute, Number(element.getAttribute(attribute)) * scaleX);
    });
    verticalAttributes.forEach((attribute) => {
      if (element.hasAttribute(attribute)) element.setAttribute(attribute, Number(element.getAttribute(attribute)) * scaleY);
    });
    if (element.hasAttribute("points")) {
      const points = element.getAttribute("points").trim().split(/\s+/).map((point) => {
        const [pointX, pointY] = point.split(",").map(Number);
        return `${pointX * scaleX},${pointY * scaleY}`;
      });
      element.setAttribute("points", points.join(" "));
    }
  });

  svg.setAttribute("viewBox", `0 0 ${targetWidth} ${targetHeight}`);
  svg.style.width = `${targetWidth}px`;
  svg.style.height = `${targetHeight}px`;
}

function setExpandedChartZoom(nextZoom, focalX = null) {
  if (!els.exchangeChartDialog.open) return;
  const scroll = els.expandedExchangeChartScroll;
  const zoom = Math.min(8, Math.max(1, nextZoom));
  const localFocalX = focalX ?? scroll.clientWidth / 2;
  const contentRatio = (scroll.scrollLeft + localFocalX) / Math.max(expandedChartWidth, 1);
  const newWidth = expandedChartBaseWidth * zoom;

  resizeExpandedSvg(newWidth, 520, false);
  expandedChartWidth = newWidth;
  expandedChartZoom = zoom;
  els.expandedExchangeChart.style.width = `${newWidth}px`;
  els.exchangeZoomLevel.textContent = `${Math.round(zoom * 100)}%`;
  updateExpandedDateLabels();
  scroll.scrollLeft = contentRatio * newWidth - localFocalX;
}

function updateExpandedDateLabels() {
  const svg = els.expandedExchangeChart.querySelector("svg");
  const rows = exchangeChartMeta.rows || [];
  const points = [...els.expandedExchangeChart.querySelectorAll(".exchange-point")];
  if (!svg || !rows.length || !points.length) return;

  const existingLabels = [...svg.querySelectorAll(".exchange-date-label")];
  const labelY = Number(existingLabels[0]?.getAttribute("y")) || 496;
  existingLabels.forEach((label) => label.remove());

  const desiredCount = Math.min(rows.length, Math.max(3, Math.round(3 + (expandedChartZoom - 1) * 7)));
  const indexes = [...new Set(Array.from({ length: desiredCount }, (_, index) => (
    Math.round((index / Math.max(desiredCount - 1, 1)) * (rows.length - 1))
  )))];
  const locale = state.language === "en" ? "en-IE" : "pt-BR";
  const crossesYears = rows[0].date.slice(0, 4) !== rows.at(-1).date.slice(0, 4);

  indexes.forEach((rowIndex) => {
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("class", "exchange-axis-label exchange-date-label");
    label.setAttribute("x", points[rowIndex].getAttribute("cx"));
    label.setAttribute("y", labelY);
    label.setAttribute("text-anchor", "middle");
    label.textContent = new Date(`${rows[rowIndex].date}T00:00:00`).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      ...(crossesYears ? { year: "2-digit" } : {}),
    });
    svg.appendChild(label);
  });
}

function zoomExpandedChartWithWheel(event) {
  if (!els.exchangeChartDialog.open) return;
  event.preventDefault();
  const scrollRect = els.expandedExchangeChartScroll.getBoundingClientRect();
  const focalX = event.clientX - scrollRect.left;
  const factor = event.deltaY < 0 ? 1.18 : 1 / 1.18;
  setExpandedChartZoom(expandedChartZoom * factor, focalX);
}

function startExpandedChartPan(event) {
  if (event.button !== 0 || event.target.closest(".exchange-point")) return;
  expandedChartPan = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: els.expandedExchangeChartScroll.scrollLeft };
  els.expandedExchangeChartScroll.classList.add("is-panning");
  els.expandedExchangeChartScroll.setPointerCapture(event.pointerId);
}

function moveExpandedChartPan(event) {
  if (!expandedChartPan || expandedChartPan.pointerId !== event.pointerId) return;
  els.expandedExchangeChartScroll.scrollLeft = expandedChartPan.scrollLeft - (event.clientX - expandedChartPan.startX);
}

function stopExpandedChartPan(event) {
  if (!expandedChartPan || expandedChartPan.pointerId !== event.pointerId) return;
  els.expandedExchangeChartScroll.classList.remove("is-panning");
  expandedChartPan = null;
}

function ratesForEntry(item) {
  return item.rates || state.exchangeRatesCache[item.date]?.rates || state.exchangeRatesCache.latest?.rates || null;
}

function rateDateForEntry(item) {
  return item.rateDate
    || state.exchangeRatesCache[item.date]?.rateDate
    || state.exchangeRatesCache.latest?.rateDate
    || item.date;
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
                ? `<br><small>≈ ${money(entryValue(item))} · ${ui("Cotação dia", "Rate date")} ${formatDate(rateDateForEntry(item))}</small>`
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
  ensurePaymentOption(item.payment);
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

function ensurePaymentOption(payment) {
  if (!payment || state.payments.includes(payment)) return;
  const option = document.createElement("option");
  option.value = payment;
  option.textContent = `${payment} (${ui("histórico", "history")})`;
  els.payment.append(option);
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

  if (activeSubRegistrationTab === "payments") {
    return {
      label: ui("Nova forma de pagamento", "New payment method"),
      placeholder: ui("Ex.: PayPal, cheque, vale", "E.g.: PayPal, cheque, voucher"),
      items: state.payments,
      duplicateMessage: ui("Esta forma de pagamento já está cadastrada.", "This payment method is already registered."),
      removeMessage: ui("formas de pagamento", "payment methods"),
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
  } else if (activeSubRegistrationTab === "payments") {
    state.payments = [...state.payments, cleanName];
    fillSelect(els.payment, state.payments);
    els.payment.value = cleanName;
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
  } else if (activeSubRegistrationTab === "payments") {
    state.payments = state.payments.filter((item) => item !== selectedItem);
    fillSelect(els.payment, state.payments);
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
  state.payments = [...DEFAULT_PAYMENTS];
  state.incomeSources = [...DEFAULT_INCOME_SOURCES];
  state.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  fillSelect(els.incomeSource, state.incomeSources);
  fillSelect(els.account, state.accounts);
  fillSelect(els.payment, state.payments);
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
