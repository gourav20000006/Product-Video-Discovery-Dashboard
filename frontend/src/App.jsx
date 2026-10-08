import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Eye,
  Filter,
  History,
  ImagePlus,
  Instagram,
  Layers3,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Wand2,
  Youtube,
} from 'lucide-react';

const stats = [
  { label: 'Videos Found', value: '40+', glow: 'cyan' },
  { label: 'Avg Match', value: '89%', glow: 'violet' },
  { label: 'Searches', value: '12', glow: 'green' },
  { label: 'API Health', value: '99.2%', glow: 'amber' },
];

const tabs = ['Instagram Reels', 'Meta Ad Library', 'TikTok'];

const pipeline = [
  'Fetching product page',
  'Analyzing image',
  'Searching Instagram',
  'Searching Meta',
  'Scoring & dedupe',
];

const videos = [
  {
    type: 'Instagram',
    title: 'Oversized Graphic Tee Review',
    score: 94,
    caption: 'Same graphic print, oversized silhouette, and white base tone.',
    color: 'text-cyan-300',
    badge: 'Exact match',
    thumbnail:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
  {
    type: 'Meta Ads',
    title: 'Streetwear Drop Campaign',
    score: 91,
    caption: 'High-confidence match: centered logo, same colorway, product in focus.',
    color: 'text-violet-300',
    badge: 'High score',
    thumbnail:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  },
  {
    type: 'Instagram',
    title: 'Daily Outfit Fit Check',
    score: 87,
    caption: 'Strong fit and pattern similarity with a product-in-context view.',
    color: 'text-cyan-300',
    badge: 'Pattern match',
    thumbnail:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    type: 'Meta Ads',
    title: 'Front Logo Product Shot',
    score: 89,
    caption: 'Exact product style and product framing with logo visibility.',
    color: 'text-violet-300',
    badge: 'Product shot',
    thumbnail:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
];

const history = [
  { query: 'Oversized graphic tee', time: '2 mins ago', count: '40 videos' },
  { query: 'Protein dark chocolate', time: '1 hour ago', count: '32 videos' },
  { query: 'Nike Air Force 1 low', time: 'Yesterday', count: '48 videos' },
];

const attributes = [
  'Product type: graphic tee',
  'Colors: white, red, navy',
  'Fit: oversized',
  'Graphics: centered front logo',
  'Material: cotton blend',
];

const pillColors = {
  cyan: 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/20',
  violet: 'bg-violet-500/15 text-violet-300 border border-violet-400/20',
  green: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/20',
  amber: 'bg-amber-500/15 text-amber-300 border border-amber-400/20',
};

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-8">
        <header className="mb-7 rounded-[26px] border border-white/10 bg-white/5 px-4 py-3 shadow-soft backdrop-blur-xl md:px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 shadow-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">AI Discovery</div>
                <div className="text-lg font-semibold text-white">Product Video Discovery</div>
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                History
              </button>
              <button className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20">
                New Search
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-7">
          <section className="rounded-[28px] border border-cyan-500/20 bg-gradient-to-br from-[#0f1f31] via-[#0d1724] to-[#0a1320] p-5 shadow-glow md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-200">
                Search Dashboard
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.6fr_0.7fr]">
              <div className="space-y-4">
                <div className="flex gap-2 rounded-2xl border border-white/10 bg-slate-950/30 p-1.5">
                  {['Keyword', 'Product URL'].map((tab, idx) => (
                    <button
                      key={tab}
                      className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
                        idx === 0
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value="oversized graphic tee"
                      readOnly
                      className="w-full rounded-2xl border border-white/10 bg-[#0a1522] py-3.5 pl-11 pr-4 text-slate-100 placeholder:text-slate-500 outline-none ring-0 focus:border-cyan-400/70"
                    />
                  </div>

                  <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95">
                    Discover Videos
                  </button>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <ImagePlus className="h-4 w-4 text-cyan-300" />
                  </div>
                  Drag & drop a product image or upload a product photo
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-400">Pipeline</div>

                <div className="space-y-3">
                  {pipeline.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          index === 0 ? 'bg-cyan-400' : 'bg-slate-600'
                        }`}
                      />
                      <span className={index === 0 ? 'text-sm text-white' : 'text-sm text-slate-400'}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                  <span className={`h-2.5 w-2.5 rounded-full ${pillColors[item.glow]}`} />
                </div>

                <div className="text-3xl font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </section>

          <section className="grid gap-7 lg:grid-cols-[1.5fr_0.7fr]">
            <div className="space-y-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Results</div>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Matched video candidates</h2>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
                  {tabs.map((tab, idx) => (
                    <button
                      key={tab}
                      className={`rounded-lg px-3 py-2 text-sm transition ${
                        idx === 0
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {videos.map((video) => (
                  <article
                    key={video.title}
                    className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0d1724] shadow-soft"
                  >
                    <div className="relative">
                      <img src={video.thumbnail} alt={video.title} className="h-52 w-full object-cover" />

                      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-slate-100 backdrop-blur">
                        {video.type === 'Instagram' ? (
                          <Instagram className="h-3.5 w-3.5 text-pink-400" />
                        ) : (
                          <Layers3 className="h-3.5 w-3.5 text-cyan-300" />
                        )}
                        {video.type}
                      </div>

                      <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-semibold text-white">
                        <Star className="h-3 w-3 fill-white" />
                        {video.score}
                      </div>
                    </div>

                    <div className="space-y-4 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className={`text-xs uppercase tracking-[0.2em] ${video.color}`}>
                          Match score
                        </div>
                        <div className="text-sm font-semibold text-emerald-300">{video.score}%</div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{video.caption}</p>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-200">
                          {video.badge}
                        </span>

                        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10">
                          Open
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[26px] border border-white/10 bg-white/5 p-5 shadow-soft">
                <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-slate-400">Product analysis</div>

                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
                    alt="Product analysis"
                    className="h-52 w-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">Oversized Graphic Tee</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  White base, oversized silhouette, centered graphic, and neutral streetwear styling.
                </p>

                <div className="mt-5 space-y-2">
                  {attributes.map((item, idx) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2 text-sm text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/5 p-5 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Search history</div>
                  <History className="h-4 w-4 text-slate-300" />
                </div>

                <div className="space-y-3">
                  {history.map((item) => (
                    <div key={item.query} className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-white">{item.query}</span>
                        <span className="text-[11px] text-slate-400">{item.time}</span>
                      </div>
                      <div className="mt-2 text-xs text-cyan-300">{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
