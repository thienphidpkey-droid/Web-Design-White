import React, { useState, useEffect } from 'react';
import { Code, Layout, Smartphone, Mail, Github, Twitter, Linkedin, Palette, Layers, Zap, ExternalLink, Globe } from 'lucide-react';
import NeuButton from './components/NeuButton';
import ChatBot from './components/ChatBot';
import { SectionId } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);

  // Smooth scroll handler
  const scrollTo = (id: SectionId) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sticky header state
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neu-base text-gray-700 overflow-x-hidden font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* Background Ambient Elements for Hyperrealism/Color */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[100px] mix-blend-multiply animate-float"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[80px] mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-[120px] mix-blend-multiply animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'py-2 bg-neu-base/80 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer" onClick={() => scrollTo(SectionId.HOME)}>
            CreativeFlow.
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {[
              { id: SectionId.HOME, label: 'Trang chủ' },
              { id: SectionId.SERVICES, label: 'Dịch vụ' },
              { id: SectionId.PORTFOLIO, label: 'Dự án' },
              { id: SectionId.CONTACT, label: 'Liên hệ' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-medium transition-colors hover:text-blue-600 ${activeSection === item.id ? 'text-blue-600' : 'text-gray-500'}`}
              >
                {item.label}
              </button>
            ))}
            <NeuButton onClick={() => scrollTo(SectionId.CONTACT)} className="!px-6 !py-2 !text-sm">
              Bắt đầu ngay
            </NeuButton>
          </div>
          {/* Mobile Menu Icon would go here (simplified for this task) */}
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section id={SectionId.HOME} className="min-h-screen flex items-center justify-center pt-20 relative">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <div className="inline-block px-4 py-2 rounded-full shadow-neu-pressed bg-neu-base text-blue-500 font-semibold text-sm">
                👋 Freelance Web Designer & Developer
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-800">
                Biến ý tưởng thành <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Hiện Thực Số
                </span>
              </h1>
              <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
                Tôi tạo ra những trải nghiệm web độc đáo với phong cách Neumorphism hiện đại và hiệu ứng 3D sống động, giúp thương hiệu của bạn nổi bật.
              </p>
              <div className="flex flex-wrap gap-4">
                <NeuButton onClick={() => scrollTo(SectionId.PORTFOLIO)}>Xem dự án</NeuButton>
                <NeuButton variant="secondary" onClick={() => scrollTo(SectionId.CONTACT)}>Liên hệ tôi</NeuButton>
              </div>
              
              <div className="flex gap-6 pt-4 text-gray-400">
                <a href="#" className="hover:text-blue-500 transition-colors"><Github size={24} /></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
                <a href="#" className="hover:text-blue-700 transition-colors"><Linkedin size={24} /></a>
              </div>
            </div>

            {/* 3D Floating Element - Digital World Sphere */}
            <div className="relative flex justify-center items-center h-[500px] w-full max-w-[500px] mx-auto perspective-1000">
                
                {/* Orbit Rings */}
                <div className="absolute w-[110%] h-[110%] rounded-full border border-blue-400/20 border-dashed animate-[spin_30s_linear_infinite]"></div>
                <div className="absolute w-[130%] h-[130%] rounded-full border border-purple-400/10 border-dotted animate-[spin_40s_linear_infinite_reverse]"></div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-blue-400/20 blur-[80px] rounded-full mix-blend-multiply"></div>

                {/* Main Sphere */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 bg-neu-base rounded-full shadow-neu flex items-center justify-center animate-float z-10 overflow-hidden border border-white/40 group">
                    
                    {/* Inner Shadow for Sphere 3D Effect */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_10px_10px_20px_rgba(163,177,198,0.5),inset_-10px_-10px_20px_rgba(255,255,255,0.8)] pointer-events-none z-20"></div>

                    {/* Map Grid Texture */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    {/* The Globe Icon representing the map */}
                    <div className="relative z-10 text-gray-400/40 group-hover:text-blue-400/30 transition-colors duration-700">
                         <Globe strokeWidth={0.5} className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] animate-[spin_60s_linear_infinite]" />
                    </div>

                    {/* Active Nodes/Markers */}
                    <div className="absolute z-10 top-[35%] left-[35%] w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse"></div>
                    <div className="absolute z-10 top-[45%] right-[30%] w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7] animate-pulse delay-300"></div>
                    <div className="absolute z-10 bottom-[30%] left-[45%] w-2.5 h-2.5 bg-pink-500 rounded-full shadow-[0_0_15px_#ec4899] animate-pulse delay-700"></div>

                    {/* Digital Connection Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                       <path d="M 140 140 Q 200 180 260 180" stroke="url(#gradientLine)" strokeWidth="1.5" fill="none" className="opacity-60" />
                       <defs>
                         <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                           <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                           <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                         </linearGradient>
                       </defs>
                    </svg>

                    {/* Floating Info Badge */}
                    <div className="absolute z-30 bottom-12 bg-white/40 backdrop-blur-md border border-white/60 px-5 py-2 rounded-2xl shadow-lg flex items-center gap-2 transform transition-transform group-hover:scale-110">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-bold text-gray-700 tracking-wide">GLOBAL NETWORK</span>
                    </div>
                </div>

                {/* Floating Tech Icons Orbiting */}
                <div className="absolute top-0 right-10 p-3 bg-neu-base rounded-2xl shadow-neu animate-bounce text-blue-500 z-20" style={{ animationDuration: '4s' }}>
                   <Code size={20} />
                </div>
                <div className="absolute bottom-10 left-0 p-3 bg-neu-base rounded-2xl shadow-neu animate-bounce text-purple-500 z-20" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                   <Zap size={20} />
                </div>
            </div>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id={SectionId.SERVICES} className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Dịch Vụ Cung Cấp</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Giải pháp toàn diện cho nhu cầu kỹ thuật số của bạn, từ thiết kế đến lập trình.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: <Palette size={40} className="text-pink-500" />, title: "UI/UX Design", desc: "Thiết kế giao diện người dùng trực quan, hiện đại, tập trung vào trải nghiệm người dùng tối ưu." },
                { icon: <Code size={40} className="text-blue-500" />, title: "Web Development", desc: "Xây dựng website hiệu năng cao, chuẩn SEO, responsive với các công nghệ mới nhất." },
                { icon: <Layers size={40} className="text-purple-500" />, title: "3D Visuals", desc: "Tích hợp các yếu tố 3D tương tác và hiệu ứng chuyển động mượt mà vào website." }
              ].map((service, idx) => (
                <div key={idx} className="group p-8 rounded-3xl bg-neu-base shadow-neu hover:shadow-neu-pressed transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-neu-base shadow-neu flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id={SectionId.PORTFOLIO} className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Dự Án Nổi Bật</h2>
                <p className="text-gray-500">Các website tôi đã thiết kế và xây dựng.</p>
              </div>
              <div className="hidden md:block">
                 <NeuButton className="!px-6 !py-2 !text-sm">Xem tất cả trên Behance</NeuButton>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { 
                  title: "Heona Media", 
                  cat: "Creative Agency", 
                  url: "https://heonamedia.vercel.app/",
                  image: "https://i.postimg.cc/1tcCwRGR/heona.png"
                },
                { 
                  title: "Neon Glide Patin", 
                  cat: "Sports E-commerce", 
                  url: "https://neon-glide-patin.vercel.app/",
                  image: "https://i.postimg.cc/C1HPkMG0/patin.png"
                },
                { 
                  title: "Emerald Estate", 
                  cat: "Real Estate", 
                  url: "https://emerald-estate.vercel.app/",
                  image: "https://i.postimg.cc/pTYGzVDw/emerald.png"
                },
                { 
                  title: "Sen Mộc Spa", 
                  cat: "Beauty & Wellness", 
                  url: "https://senmocspa.vercel.app/",
                  image: "https://i.postimg.cc/nzYRBVv6/sen.png"
                },
                { 
                  title: "Minh An Studio", 
                  cat: "Photography Portfolio", 
                  url: "https://minh-an-studio.vercel.app/",
                  image: "https://i.postimg.cc/wMF07Wh0/minhan_(2).png"
                },
                { 
                  title: "Nha Khoa T-M-C", 
                  cat: "Medical Clinic", 
                  url: "https://nha-khoa-t-m-c.vercel.app/",
                  image: "https://i.postimg.cc/C5JmzvjQ/rang.png"
                },
              ].map((project, idx) => (
                <a 
                  key={idx} 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group rounded-3xl bg-neu-base shadow-neu overflow-hidden aspect-[4/3] cursor-pointer hover:shadow-neu-pressed transition-all duration-300 block"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0">
                     <img 
                       src={project.image} 
                       alt={project.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     {/* Overlay for text legibility */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg flex justify-between items-center hover:bg-white/20 transition-colors">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{project.title}</h3>
                        <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{project.cat}</p>
                      </div>
                      <div className="bg-white/20 p-2 rounded-full text-white hover:bg-blue-500 hover:text-white transition-all">
                        <ExternalLink size={16} />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
             <div className="mt-12 md:hidden flex justify-center">
                 <NeuButton>Xem tất cả</NeuButton>
              </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id={SectionId.CONTACT} className="py-24 pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-neu-base rounded-[3rem] shadow-neu p-8 md:p-12 relative overflow-hidden">
               {/* Decorative Circle */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

               <div className="relative z-10 text-center mb-10">
                 <h2 className="text-4xl font-bold text-gray-800 mb-4">Sẵn Sàng Hợp Tác?</h2>
                 <p className="text-gray-500">Hãy để lại thông tin, tôi sẽ liên hệ lại trong vòng 24h.</p>
               </div>

               <form className="space-y-6 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-600 ml-4">Họ tên</label>
                     <input type="text" className="w-full bg-neu-base rounded-2xl shadow-neu-pressed p-4 outline-none text-gray-700 focus:text-blue-600 transition-colors" placeholder="Nguyễn Văn A" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-600 ml-4">Email</label>
                     <input type="email" className="w-full bg-neu-base rounded-2xl shadow-neu-pressed p-4 outline-none text-gray-700 focus:text-blue-600 transition-colors" placeholder="email@example.com" />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 ml-4">Loại dự án</label>
                    <div className="flex flex-wrap gap-4">
                      {['Web Design', 'Development', 'Branding', 'Khác'].map(opt => (
                        <label key={opt} className="cursor-pointer">
                          <input type="radio" name="project_type" className="peer sr-only" />
                          <div className="px-6 py-2 rounded-xl shadow-neu bg-neu-base text-gray-500 peer-checked:shadow-neu-pressed peer-checked:text-blue-600 peer-checked:font-bold transition-all text-sm">
                            {opt}
                          </div>
                        </label>
                      ))}
                    </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-gray-600 ml-4">Tin nhắn</label>
                   <textarea rows={4} className="w-full bg-neu-base rounded-2xl shadow-neu-pressed p-4 outline-none text-gray-700 focus:text-blue-600 transition-colors resize-none" placeholder="Mô tả sơ qua về ý tưởng của bạn..."></textarea>
                 </div>

                 <div className="pt-4 flex justify-center">
                   <NeuButton type="submit" className="w-full md:w-auto !px-12">Gửi Tin Nhắn</NeuButton>
                 </div>
               </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-neu-base pt-12 pb-6 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600 mb-6">
            CreativeFlow.
          </div>
          <div className="flex justify-center gap-8 mb-8 text-gray-500">
            <span className="cursor-pointer hover:text-blue-500">Instagram</span>
            <span className="cursor-pointer hover:text-blue-500">Dribbble</span>
            <span className="cursor-pointer hover:text-blue-500">Behance</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CreativeFlow Design. All rights reserved.
          </p>
        </div>
      </footer>

      {/* AI Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default App;