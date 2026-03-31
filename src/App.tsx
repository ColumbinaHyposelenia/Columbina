import CHARACTERS_RAW from './characters.md?raw';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Moon, 
  Feather, 
  Ghost, 
  Info, 
  Image as ImageIcon, 
  Search, 
  ChevronLeft, 
  Star, 
  Zap, 
  Sword, 
  Shield, 
  Menu,
  X,
  ExternalLink,
  Github,
  Clock,
  LayoutGrid,
  Layers,
  Wand2
} from 'lucide-react';

type Page = 'home' | 'characters' | 'endgame' | 'about';
type Character = {
  id: string;
  name: string;
  element: 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo';
  weapon: 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
  rarity: 4 | 5;
  description: string;
};

const jsonMatch = CHARACTERS_RAW.match(/```json\s+([\s\S]*?)\s+```/);
const CHARACTERS: Character[] = jsonMatch 
  ? JSON.parse(jsonMatch[1]) 
  : [];

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter(char => 
      char.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const navigate = (page: Page) => {
    setActivePage(page);
    setSelectedChar(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-bg-deep selection:bg-primary/30 font-sans">
      {/* Immersive Atmosphere Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="atmosphere-gradient absolute inset-0 opacity-40" />
        <div className="liquid-blob w-[800px] h-[800px] bg-primary/20 top-[-20%] left-[-10%] animate-float" />
        <div className="liquid-blob w-[900px] h-[900px] bg-blue-900/10 bottom-[-20%] right-[-10%] animate-float-delayed" />
        <div className="liquid-blob w-[600px] h-[600px] bg-purple-900/15 top-[20%] right-[5%] animate-float-slow" />
      </div>

      {/* Editorial Navigation */}
      <header className="fixed top-0 w-full glass-nav z-50">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <button 
            onClick={() => navigate('home')} 
            className="flex items-center gap-4 group z-20"
          >
            <div className="w-12 h-12 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <Moon className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(138,43,226,0.8)]" />
            </div>
            <div className="flex flex-col">
              {/* BRAND: Header Title */}
              <span className="text-3xl font-sans font-bold tracking-tighter text-white italic">HYPOSELENIA</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {(['characters', 'endgame', 'about'] as const).map((p) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`px-6 py-2 rounded-full font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-500 relative group ${
                  activePage === p ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                {p}
                {activePage === p && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/10"
                  />
                )}
              </button>
            ))}
          </nav>

          <button 
            className="md:hidden p-3 text-white glass-card rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg-deep/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden"
            >
              <div className="p-8 flex flex-col gap-6">
                {(['characters', 'endgame', 'about'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => navigate(p)}
                    className="text-left text-2xl font-display italic tracking-tight text-white/60 hover:text-primary transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-40 pb-32 px-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activePage === 'home' && !selectedChar && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-32"
            >
              {/* HYPOSELENIA: Hero Section */}
              <div className="flex flex-col items-center text-center space-y-12">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                  <Moon className="w-32 h-32 text-primary relative z-10 drop-shadow-[0_0_30px_rgba(138,43,226,0.8)]" />
                </motion.div>
                
                <div className="space-y-6">
                  {/* TEXT: Home Hero Title */}
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-sans">
                    달빛이 내리는 밤을 선물할게<br/>
                    <span className="text-primary italic font-display">Hyposelenia</span>
                  </h1>
                  {/* TEXT: Home Hero Description */}
                  <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                    Explore the celestial archive of heroes and artifacts. <br/>
                    The most refined database for the modern traveler.
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="flex gap-6 md:gap-12">
                  {[
                    { label: 'DAYS', value: timeLeft.days },
                    { label: 'HOURS', value: timeLeft.hours },
                    { label: 'MINS', value: timeLeft.minutes },
                    { label: 'SECS', value: timeLeft.seconds },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-4xl md:text-6xl font-display italic text-white leading-none">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] font-bold tracking-[0.3em] text-primary mt-2">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Navigation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { id: '01', title: 'CHARACTERS', desc: 'The celestial roster.', icon: LayoutGrid, page: 'characters' },
                  { id: '02', title: 'WEAPONS', desc: 'Relics of power.', icon: Sword, page: 'characters' },
                  { id: '03', title: 'ARTIFACTS', desc: 'Echoes of fate.', icon: Layers, page: 'characters' },
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => navigate(item.page as Page)}
                    className="glass-card rounded-[3rem] p-12 cursor-pointer group relative overflow-hidden h-[400px] flex flex-col justify-end"
                  >
                    <div className="absolute top-0 right-0 p-8 text-9xl font-display text-white/[0.02] group-hover:text-primary/5 transition-colors">
                      {item.id}
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-primary/20">
                        <item.icon className="text-primary w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-4xl font-display italic mb-2">{item.title}</h2>
                        <p className="text-white/40 text-lg font-light">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activePage === 'characters' && !selectedChar && (
            <motion.section
              key="characters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/10 pb-12">
                <div className="space-y-4">
                  {/* TEXT: Characters Page Title */}
                  <h1 className="text-6xl font-display italic tracking-tight">ARCHIVE</h1>
                  {/* TEXT: Characters Page Subtitle */}
                  <p className="text-white/40 font-serif italic text-lg">Browse the celestial roster of Teyvat.</p>
                </div>
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-full py-4 pl-14 pr-6 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-all text-sm tracking-widest uppercase font-bold"
                  />
                </div>
              </div>

              {/* Nanoka Inspired List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredCharacters.map((char) => (
                  <motion.div
                    key={char.id}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedChar(char)}
                    className="nanoka-card group cursor-pointer"
                  >
                    {/* Dark Image Box */}
                    <div className="aspect-[4/5] bg-[#0a0a0c] relative overflow-hidden rounded-t-2xl">
                      <img 
                        src={`https://picsum.photos/seed/char_grid_${char.id}/500/625`} 
                        alt={char.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Element Icon Top Right */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>

                      {/* Weapon Icon Bottom Right */}
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/5">
                        <Sword className="w-4 h-4 text-white/60" />
                      </div>
                    </div>

                    {/* Info Section with Rarity Border */}
                    <div className={`p-5 bg-[#121215] rounded-b-2xl border-t-2 ${char.rarity === 5 ? 'rarity-5-border' : 'rarity-4-border'}`}>
                      <h3 className="text-lg font-bold text-white mb-2 font-sans">{char.name}</h3>
                      <div className="flex gap-0.5">
                        {[...Array(char.rarity)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {selectedChar && (
            <motion.section
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-12"
            >
              <button 
                onClick={() => setSelectedChar(null)}
                className="flex items-center gap-3 text-white/40 hover:text-primary transition-all font-bold tracking-[0.3em] uppercase text-[10px] group"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </div>
                Back to Archive
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Immersive Image View (Left) */}
                <div className="lg:col-span-5 relative group">
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
                  <div className="glass-card rounded-[4rem] overflow-hidden aspect-[3/4] relative z-10 shadow-2xl border border-white/10">
                    <img 
                      src={`https://picsum.photos/seed/char_detail_${selectedChar.id}/1000/1333`} 
                      alt={selectedChar.name}
                      className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
                    <div className="absolute top-12 left-12 flex flex-col gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Info View (Right) */}
                <div className="lg:col-span-7 space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.4em] uppercase">
                        {selectedChar.element}
                      </div>
                      <div className="flex gap-1.5">
                        {[...Array(selectedChar.rarity)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* TEXT: Detail Page Name */}
                      <h1 className="text-7xl md:text-9xl font-bold italic leading-[0.8] tracking-tighter text-glow font-sans">
                        {selectedChar.name}
                      </h1>
                      <div className="h-1 w-32 bg-primary rounded-full" />
                    </div>

                    {/* TEXT: Detail Page Description */}
                    <p className="text-2xl text-white/60 leading-relaxed font-sans font-medium italic max-w-2xl">
                      "{selectedChar.description}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card rounded-[2.5rem] p-10 space-y-4 border border-white/5">
                      <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">Weapon Class</div>
                      <div className="text-2xl font-display italic flex items-center gap-4">
                        <Sword className="w-6 h-6 text-primary" />
                        {selectedChar.weapon}
                      </div>
                    </div>
                    <div className="glass-card rounded-[2.5rem] p-10 space-y-4 border border-white/5">
                      <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">Combat Power</div>
                      <div className="text-2xl font-display italic flex items-center gap-4">
                        <Zap className="w-6 h-6 text-primary" />
                        S-RANK
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h2 className="text-3xl font-display italic tracking-tight flex items-center gap-4">
                      <Wand2 className="text-primary w-8 h-8" /> SKILLS & TALENTS
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { name: 'Normal Attack', desc: 'Performs up to 5 consecutive strikes with celestial precision.' },
                        { name: 'Elemental Skill', desc: 'Deals massive AoE damage and applies elemental resonance.' },
                        { name: 'Elemental Burst', desc: 'Summons a lunar field that significantly buffs all party members.' }
                      ].map((skill, i) => (
                        <div key={i} className="glass-card rounded-[2rem] p-8 flex items-start gap-8 group hover:bg-white/[0.05] transition-all duration-500 border border-white/5">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-display text-2xl text-primary group-hover:scale-110 transition-transform">
                            0{i+1}
                          </div>
                          <div className="space-y-2">
                            <div className="font-bold text-xl italic tracking-tight font-sans">{skill.name}</div>
                            <div className="text-white/40 text-sm leading-relaxed font-light">{skill.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activePage === 'endgame' && (
            <motion.section
              key="endgame"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-20"
            >
              <div className="text-center space-y-6">
                {/* TEXT: Endgame Page Title */}
                <h1 className="text-7xl font-display italic tracking-tight">ENDGAME</h1>
                {/* TEXT: Endgame Page Subtitle */}
                <p className="text-white/40 font-serif italic text-xl">The ultimate trials for the strongest travelers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { title: 'Spiral Abyss', desc: 'The lunar tower of trials.', img: 'tower' },
                  { title: 'Imaginarium', desc: 'The theater of dreams.', img: 'roleplay' },
                  { title: 'Stygian', desc: 'Waves of the abyss.', img: 'leyline' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -15 }}
                    className="group relative aspect-[3/4] overflow-hidden rounded-[3rem] border border-white/5 bg-black cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/20 to-transparent z-10 opacity-90 transition-opacity duration-700 group-hover:opacity-70" />
                    <img 
                      src={`https://picsum.photos/seed/endgame_${i}/800/1066`} 
                      alt={item.title} 
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-40"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 space-y-4">
                      <div className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase">CHALLENGE 0{i+1}</div>
                      <h2 className="text-4xl font-display italic text-white leading-none">{item.title}</h2>
                      <p className="text-sm text-white/40 font-light opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activePage === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-24"
            >
              <div className="text-center space-y-10">
                <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-primary/20">
                  <Info className="w-12 h-12 text-primary" />
                </div>
                {/* TEXT: About Page Title */}
                <h1 className="text-7xl font-display italic tracking-tight">HYPOSELENIA</h1>
                {/* TEXT: About Page Description */}
                <p className="text-2xl text-white/40 font-sans font-bold italic leading-relaxed max-w-2xl mx-auto">
                  A premium archive dedicated to the world of Teyvat. 
                  Blending high-performance tech with an immersive sub-lunar aesthetic.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="glass-card rounded-[3rem] p-12 space-y-6 border border-white/5">
                  {/* TEXT: About Vision Title */}
                  <h3 className="text-[10px] font-bold text-primary tracking-[0.5em] uppercase">The Vision</h3>
                  {/* TEXT: About Vision Description */}
                  <p className="text-white/40 text-lg font-light leading-relaxed font-sans">To create a seamless, beautiful, and comprehensive database that feels like a part of the game world itself.</p>
                </div>
                <div className="glass-card rounded-[3rem] p-12 space-y-6 border border-white/5">
                  {/* TEXT: About Craft Title */}
                  <h3 className="text-[10px] font-bold text-primary tracking-[0.5em] uppercase">The Craft</h3>
                  {/* TEXT: About Craft Description */}
                  <p className="text-white/40 text-lg font-light leading-relaxed font-sans">Built with React, Vite, and Tailwind CSS. Powered by Liquid Glass design principles and atmospheric rendering.</p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <footer className="mt-auto border-t border-white/5 bg-black/40 px-8 py-20 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 md:flex-row md:items-start md:justify-between">
          <div className="space-y-8">
            <div className="flex items-center gap-4 font-display italic text-3xl">
              <Moon className="w-8 h-8 text-primary" />
              {/* BRAND: Footer Title */}
              <span>HYPOSELENIA</span>
            </div>
            {/* TEXT: Footer Disclaimer */}
            <p className="text-[10px] text-white/20 leading-loose max-w-sm font-bold uppercase tracking-widest font-sans">
              Hyposelenia 는 팬메이드 웹사이트입니다. <br />
              게임 관련 이미지 및 에셋의 저작권 및 상표권은 HoYoverse에 귀속됩니다.
            </p>
          </div>
          

          <div className="flex flex-col gap-10 md:items-end">
            <div className="flex gap-4">
              {/* Github 버튼을 a 태그로 변경 */}
              <a 
                href="https://github.com/ColumbinaHyposelenia/Columbina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center hover:border-primary/40 transition-all group border border-white/5"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <button className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center hover:border-primary/40 transition-all group border border-white/5">
                <ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.5em] text-white/10 font-sans">
              <span className="hover:text-primary transition-colors cursor-default">REACT 19</span>
              <span className="hover:text-primary transition-colors cursor-default">VITE 6</span>
              <span className="hover:text-primary transition-colors cursor-default">TAILWIND 4</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
