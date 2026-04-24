export default function DashboardPage() {
  return (
    <>
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 w-full bg-white dark:bg-black border-b border-slate-950/10 dark:border-white/10 shadow-none">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <img className="w-full h-full object-cover" alt="professional portrait of a business owner in a modern corporate setting with soft ambient lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI8gZLkezPN8X9xbj5Ygaj5fDpcvh7Zfqn4jUTshb_FyqNTBpw8LGp7Iz3X-mNfYEKtR1Zcbwk7Xr2dIVv_nYxzfoH9869q-3-tsnDUO6J1nYtwa0jSWbul80fJDs1ynk3xA7BB5Py_fhKV8KSh6b_PmihvrLyU4CwV_Y_tiuK20U9UFsymmF-SMdASV1RE21LKGnC7wOvpCvTN9i4e2MXOfe2uINxFgLDbUL1OpTDh_-6iRgTZqJb1oD2QKBJMzHlw1Oqv5UMUw"/>
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-950 dark:text-white uppercase">Capital Control</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white text-black px-4 py-2 rounded font-label-caps text-label-caps active:scale-95 transition-transform duration-75">
            + NOVO
          </button>
          <span className="material-symbols-outlined text-slate-950 dark:text-white cursor-pointer" data-icon="notifications">notifications</span>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6 md:p-12 mb-24">
        {/* Dashboard Header */}
        <div className="mb-10">
          <h1 className="font-label-caps text-label-caps text-on-primary-container mb-2">RESUMO DA CONTA</h1>
          <div className="flex flex-col md:flex-row md:items-end gap-2">
            <span className="font-metric-lg text-metric-lg text-white">R$ 142.850,00</span>
            <span className="text-green-500 font-label-caps text-label-caps mb-1">+4.2% ESTE MÊS</span>
          </div>
        </div>
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Monthly Revenue Card */}
          <div className="md:col-span-4 p-6 bg-black border border-white/10 rounded-lg group hover:border-white/30 transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-caps text-label-caps text-on-primary-container">RECEITA MENSAL</span>
              <span className="material-symbols-outlined text-green-500" data-icon="trending_up">trending_up</span>
            </div>
            <div className="font-display-table text-display-table text-white mb-4">R$ 52.400</div>
            <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
              <div className="h-full bg-white w-3/4"></div>
            </div>
            <div className="mt-2 font-label-caps text-[10px] text-slate-500">75% DA META ATINGIDA</div>
          </div>
          {/* Monthly Expense Card */}
          <div className="md:col-span-4 p-6 bg-black border border-white/10 rounded-lg group hover:border-white/30 transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-caps text-label-caps text-on-primary-container">DESPESA MENSAL</span>
              <span className="material-symbols-outlined text-red-500" data-icon="trending_down">trending_down</span>
            </div>
            <div className="font-display-table text-display-table text-white mb-4">R$ 18.210</div>
            <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
              <div className="h-full bg-white w-1/4"></div>
            </div>
            <div className="mt-2 font-label-caps text-[10px] text-slate-500">22% DO ORÇAMENTO</div>
          </div>
          {/* Cash Flow Sparkline */}
          <div className="md:col-span-4 p-6 bg-black border border-white/10 rounded-lg">
            <span className="font-label-caps text-label-caps text-on-primary-container block mb-4">FLUXO DE CAIXA</span>
            <div className="flex items-end gap-1 h-20">
              <div className="flex-1 bg-white/10 h-[40%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[60%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[45%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[80%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[95%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[70%] rounded-t-sm"></div>
              <div className="flex-1 bg-white h-[100%] rounded-t-sm"></div>
            </div>
            <div className="flex justify-between mt-2 font-label-caps text-[10px] text-slate-500">
              <span>SEG</span>
              <span>DOM</span>
            </div>
          </div>
          {/* Recent Activity Table */}
          <div className="md:col-span-8 p-6 bg-black border border-white/10 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-label-caps text-label-caps text-white">ATIVIDADE RECENTE</h2>
              <span className="text-xs font-label-caps text-slate-500 cursor-pointer hover:text-white">VER TUDO</span>
            </div>
            <div className="space-y-4">
              {/* Row 1 */}
              <div className="flex items-center justify-between py-3 border-b border-white/5 hover:bg-white/5 px-2 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-white" data-icon="shopping_cart">shopping_cart</span>
                  </div>
                  <div>
                    <div className="font-display-table text-sm text-white">Apple Store Brasil</div>
                    <div className="font-label-caps text-[10px] text-slate-500">Hardware &amp; Tech</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display-table text-sm text-white">- R$ 12.499,00</div>
                  <div className="font-label-caps text-[10px] text-slate-500">HOJE, 14:20</div>
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex items-center justify-between py-3 border-b border-white/5 hover:bg-white/5 px-2 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-white" data-icon="payments">payments</span>
                  </div>
                  <div>
                    <div className="font-display-table text-sm text-white">Transferência Recebida</div>
                    <div className="font-label-caps text-[10px] text-slate-500">Cliente #4492</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display-table text-sm text-green-500">+ R$ 4.500,00</div>
                  <div className="font-label-caps text-[10px] text-slate-500">ONTEM, 09:15</div>
                </div>
              </div>
              {/* Row 3 */}
              <div className="flex items-center justify-between py-3 hover:bg-white/5 px-2 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-white" data-icon="restaurant">restaurant</span>
                  </div>
                  <div>
                    <div className="font-display-table text-sm text-white">Fogo de Chão</div>
                    <div className="font-label-caps text-[10px] text-slate-500">Corporate Dining</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display-table text-sm text-white">- R$ 840,20</div>
                  <div className="font-label-caps text-[10px] text-slate-500">22 JUN, 20:45</div>
                </div>
              </div>
            </div>
          </div>
          {/* Insights Card */}
          <div className="md:col-span-4 p-6 bg-black border border-white/10 rounded-lg flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-on-primary-container block mb-6">INSIGHTS IA</span>
              <p className="text-slate-400 font-body-main text-sm leading-relaxed mb-6">
                Suas despesas com fornecedores aumentaram 12% em comparação ao mês passado. Recomendamos revisar os contratos de infraestrutura.
              </p>
            </div>
            <button className="w-full border border-white/20 py-3 rounded font-label-caps text-label-caps hover:bg-white hover:text-black transition-colors">
              ANALISAR GASTOS
            </button>
          </div>
        </div>
      </main>
      {/* Modal Mockup (Hidden or Overlay State) */}
      <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div className="bg-black border border-white/10 w-full max-w-md p-8 rounded-lg shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-label-caps text-label-caps text-white">NOVA TRANSAÇÃO</h3>
            <span className="material-symbols-outlined text-slate-500 cursor-pointer" data-icon="close">close</span>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block font-label-caps text-[10px] text-slate-500 mb-2 uppercase">Valor</label>
              <input className="w-full bg-white/5 border border-white/10 focus:border-white text-white font-metric-lg text-2xl py-4 px-4 rounded outline-none transition-colors" placeholder="R$ 0,00" type="text"/>
            </div>
            <div>
              <label className="block font-label-caps text-[10px] text-slate-500 mb-2 uppercase">Descrição</label>
              <input className="w-full bg-white/5 border border-white/10 focus:border-white text-white p-3 rounded outline-none transition-colors" placeholder="Nome da despesa ou receita" type="text"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="border border-white/10 py-3 font-label-caps text-label-caps text-white hover:bg-white/10" type="button">DESPESA</button>
              <button className="bg-white py-3 font-label-caps text-label-caps text-black" type="button">RECEITA</button>
            </div>
            <button className="w-full bg-white text-black font-label-caps text-label-caps py-4 rounded font-bold">CONFIRMAR LANÇAMENTO</button>
          </form>
        </div>
      </div>
      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 h-20 pb-safe bg-white dark:bg-black border-t border-slate-950/10 dark:border-white/10 shadow-none">
        {/* Dashboard (Active) */}
        <a className="flex flex-col items-center justify-center text-slate-950 dark:text-white border-t-2 border-slate-950 dark:border-white pt-2 transition-all duration-200 ease-in-out" href="#">
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">Dashboard</span>
        </a>
        {/* Ledger */}
        <a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2 hover:text-slate-950 dark:hover:text-white transition-all duration-200 ease-in-out" href="#">
          <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">Ledger</span>
        </a>
        {/* Insights */}
        <a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2 hover:text-slate-950 dark:hover:text-white transition-all duration-200 ease-in-out" href="#">
          <span className="material-symbols-outlined" data-icon="query_stats">query_stats</span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">Insights</span>
        </a>
        {/* Settings */}
        <a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2 hover:text-slate-950 dark:hover:text-white transition-all duration-200 ease-in-out" href="#">
          <span className="material-symbols-outlined" data-icon="settings">settings</span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">Settings</span>
        </a>
      </nav>
    </>
  );
}
