import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Code, Layout, Smartphone, Mail, Github, Twitter, Linkedin, Palette, Layers, Zap, ExternalLink, Globe, ArrowUp, Instagram, Dribbble } from 'lucide-react';
import NeuButton from './components/NeuButton';
import Projects from './components/Projects';
import { SectionId, ProjectItem } from './types';

// Lazy load heavy components
const ChatBot = lazy(() => import('./components/ChatBot'));
const ProjectCarousel = lazy(() => import('./components/ProjectCarousel'));

// All projects data
const ALL_PROJECTS: ProjectItem[] = [
  {
    title: "Nova Creative Agency",
    cat: "Creative Agency",
    url: "https://nova-creative-agency.vercel.app/",
    image: "https://i.postimg.cc/RV3yHgGB/download_(21).png"
  },
  {
    title: "Heona Media",
    cat: "Creative Agency",
    url: "https://heonamedia.vercel.app/",
    image: "https://i.postimg.cc/nLs1yFp1/a1.jpg"
  },
  {
    title: "Neon Glide Patin",
    cat: "Sports E-commerce",
    url: "https://neon-glide-patin.vercel.app/",
    image: "https://i.postimg.cc/MGcYC6qt/a2.jpg"
  },
  {
    title: "Emerald Estate",
    cat: "Real Estate",
    url: "https://emerald-estate.vercel.app/",
    image: "https://i.postimg.cc/XvZgRj4K/a3.jpg"
  },
  {
    title: "Sen Mộc Spa",
    cat: "Beauty & Wellness",
    url: "https://senmocspa.vercel.app/",
    image: "https://i.postimg.cc/2SHDHwSh/spa-nedir.jpg"
  },
  {
    title: "Minh An Studio",
    cat: "Photography Portfolio",
    url: "https://minh-an-studio.vercel.app/",
    image: "https://i.postimg.cc/g0wKCzmq/a5.jpg"
  },
  {
    title: "Nha Khoa T-M-C",
    cat: "Medical Clinic",
    url: "https://nha-khoa-t-m-c.vercel.app/",
    image: "https://i.postimg.cc/g0wKCzmq/a5.jpg"
  },
  {
    title: "Web design CreativeFlow",
    cat: "Design Studio",
    url: "#",
    image: "https://i.postimg.cc/KYK56GxT/a7.jpg"
  },
  {
    title: "Camera Pro",
    cat: "Photography Gear",
    url: "https://camerapro-eight.vercel.app/",
    image: "https://i.postimg.cc/hGJ0kDcz/a8.jpg"
  },
  {
    title: "English Note Center",
    cat: "Education",
    url: "https://english-note-center.vercel.app/",
    image: "https://i.postimg.cc/LsqVc92J/a9.jpg"
  },
  {
    title: "Luxe Bijoux",
    cat: "Luxury Jewelry",
    url: "https://luxe-bijoux.vercel.app/",
    image: "https://i.postimg.cc/jS3X3w0N/a10.jpg"
  },
  {
    title: "Luxury Fashion",
    cat: "Fashion E-commerce",
    url: "https://luxury-fashion.vercel.app/",
    image: "https://i.postimg.cc/mgpwpzfF/a11.jpg"
  },
  {
    title: "Portfolio",
    cat: "Creative Portfolio",
    url: "https://portfolio-thienphidpkey-droids-projects.vercel.app/",
    image: "https://i.postimg.cc/JzYqYDV0/a12.jpg"
  },
  {
    title: "Business Automation",
    cat: "SaaS Platform",
    url: "https://business-automation-ten.vercel.app/",
    image: "https://i.postimg.cc/Mp3D3M2X/a13.jpg"
  },
  {
    title: "WanderLust",
    cat: "Travel App",
    url: "#",
    image: "https://i.postimg.cc/QxRPkcns/download_(22).png"
  },
  {
    title: "Notebook Flips",
    cat: "Interactive Notebook",
    url: "https://notebook-flips.vercel.app/",
    image: "https://i.postimg.cc/2S9w9bRj/a15.jpg"
  },
  {
    title: "Portfolio Glass Morphism",
    cat: "Web Design",
    url: "https://glass-morphism-portfolio.vercel.app/",
    image: "https://i.postimg.cc/kXF18L8D/download-(23).png"
  },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smooth scroll handler with offset
  const scrollTo = (id: SectionId) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sticky header and Scroll-to-top visibility state
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Services Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setServicesVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập nội dung tin nhắn';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert('Cảm ơn bạn! Tin nhắn đã được gửi thành công.');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', projectType: '', message: '' });
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const navItems = [
    { id: SectionId.HOME, label: 'Trang chủ', colorClass: 'text-blue-500' },
    { id: SectionId.SERVICES, label: 'Dịch vụ', colorClass: 'text-purple-500' },
    { id: SectionId.PROJECTS, label: 'Dự án', colorClass: 'text-pink-500' },
    { id: SectionId.CONTACT, label: 'Liên hệ', colorClass: 'text-teal-500' }
  ];

  return (
    <div className="min-h-screen bg-neu-base text-gray-700 overflow-x-hidden font-sans selection:bg-purple-200 selection:text-purple-900">

      {/* Background Ambient Elements for Hyperrealism/Color */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[100px] mix-blend-multiply animate-float"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[80px] mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-[120px] mix-blend-multiply animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'py-3 bg-neu-base/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer" onClick={() => scrollTo(SectionId.HOME)}>
            CreativeFlow.
          </div>
          <div className="hidden md:flex gap-4 items-center">
            {navItems.map((item) => (
              <NeuButton
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`!px-5 !py-2 !text-sm transition-transform hover:scale-105 ${item.colorClass} ${activeSection === item.id ? 'font-bold' : 'font-medium'}`}
                variant="secondary"
              >
                {item.label}
              </NeuButton>
            ))}
            <div className="w-px h-8 bg-gray-300 mx-2"></div>
            <NeuButton onClick={() => scrollTo(SectionId.CONTACT)} className="!px-6 !py-2 !text-sm border-2 border-white/50 text-gray-700">
              Bắt đầu ngay
            </NeuButton>
          </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section id={SectionId.HOME} className="min-h-screen flex items-center justify-center pt-20 relative scroll-mt-28">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-8 animate-in slide-in-from-left duration-1000 z-20">
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
                <NeuButton onClick={() => scrollTo(SectionId.PROJECTS)} className="text-blue-600">Xem dự án</NeuButton>
                <NeuButton variant="secondary" onClick={() => scrollTo(SectionId.CONTACT)}>Liên hệ tôi</NeuButton>
              </div>
            </div>

            {/* 3D Floating Element - Three.js Scene */}
            <div className="relative hidden lg:flex flex-col justify-center items-center w-full max-w-[800px] mx-auto space-y-6">
              <div className="h-[600px] w-full relative">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-400">Loading 3D Scene...</div>}>
                  <ProjectCarousel projects={ALL_PROJECTS.slice(0, 6)} />
                </Suspense>

                {/* Decorative Background for 3D */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-[80px] rounded-full -z-10"></div>
              </div>

              {/* View All Projects Button */}
              <NeuButton
                onClick={() => scrollTo(SectionId.PROJECTS)}
                className="!px-8 !py-3 text-purple-600 font-semibold flex items-center gap-2"
              >
                Xem toàn bộ dự án
                <ExternalLink size={18} />
              </NeuButton>
            </div>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id={SectionId.SERVICES} ref={servicesRef} className="py-24 relative scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className={`text-center mb-16 transition-all duration-700 transform ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Dịch Vụ Cung Cấp</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Giải pháp toàn diện cho nhu cầu kỹ thuật số của bạn, từ thiết kế đến lập trình.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: <Palette size={40} className="text-pink-500" />, title: "UI/UX Design", desc: "Thiết kế giao diện người dùng trực quan, hiện đại, tập trung vào trải nghiệm người dùng tối ưu." },
                { icon: <Code size={40} className="text-blue-500" />, title: "Web Development", desc: "Xây dựng website hiệu năng cao, chuẩn SEO, responsive với các công nghệ mới nhất." },
                { icon: <Layers size={40} className="text-purple-500" />, title: "3D Visuals", desc: "Tích hợp các yếu tố 3D tương tác và hiệu ứng chuyển động mượt mà vào website." }
              ].map((service, idx) => (
                <div
                  key={idx}
                  className={`group p-8 rounded-3xl bg-neu-base shadow-neu hover:shadow-neu-pressed transition-all duration-700 transform hover:-translate-y-2
                      ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                    `}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-neu-base shadow-neu flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="group-hover:animate-bounce">
                      {service.icon}
                    </div>
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

        {/* PROJECTS SECTION */}
        <section id={SectionId.PROJECTS} className="py-24 scroll-mt-28">
          <Projects projects={ALL_PROJECTS} />
        </section>

        {/* CONTACT SECTION */}
        <section id={SectionId.CONTACT} className="py-24 pb-32 scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-neu-base rounded-[3rem] shadow-neu p-8 md:p-12 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Sẵn Sàng Hợp Tác?</h2>
                <p className="text-gray-500">Hãy để lại thông tin, tôi sẽ liên hệ lại trong vòng 24h.</p>
              </div>

              <form className="space-y-6 max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 ml-4">Họ tên</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-neu-base rounded-2xl shadow-neu-pressed p-4 outline-none text-gray-700 focus:text-blue-600 transition-colors ${errors.name ? 'border border-red-500' : ''}`}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && <p className="text-red-500 text-xs ml-4">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 ml-4">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-neu-base rounded-2xl shadow-neu-pressed p-4 outline-none text-gray-700 focus:text-blue-600 transition-colors ${errors.email ? 'border border-red-500' : ''}`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs ml-4">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 ml-4">Loại dự án</label>
                  <div className="flex flex-wrap gap-4">
                    {['Web Design', 'Development', 'Branding', 'Khác'].map(opt => (
                      <label key={opt} className="cursor-pointer">
                        <input
                          type="radio"
                          name="projectType"
                          value={opt}
                          checked={formData.projectType === opt}
                          onChange={handleInputChange}
                          className="peer sr-only"
                        />
                        <div className="px-6 py-2 rounded-xl shadow-neu bg-neu-base text-gray-500 peer-checked:shadow-neu-pressed peer-checked:text-blue-600 peer-checked:font-bold transition-all text-sm">
                          {opt}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 ml-4">Tin nhắn</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full bg-neu-base rounded-2xl shadow-neu-pressed p-4 outline-none text-gray-700 focus:text-blue-600 transition-colors resize-none ${errors.message ? 'border border-red-500' : ''}`}
                    placeholder="Mô tả sơ qua về ý tưởng của bạn..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs ml-4">{errors.message}</p>}
                </div>

                <div className="pt-4 flex justify-center">
                  <NeuButton type="submit" className="w-full md:w-auto !px-12" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                  </NeuButton>
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
            <a href="#" className="p-3 rounded-full shadow-neu hover:shadow-neu-pressed hover:text-blue-500 hover:scale-110 transition-all duration-300" rel="noopener noreferrer">
              <Instagram size={24} />
            </a>
            <a href="#" className="p-3 rounded-full shadow-neu hover:shadow-neu-pressed hover:text-blue-500 hover:scale-110 transition-all duration-300" rel="noopener noreferrer">
              <Dribbble size={24} />
            </a>
            <a href="#" className="p-3 rounded-full shadow-neu hover:shadow-neu-pressed hover:text-blue-500 hover:scale-110 transition-all duration-300" rel="noopener noreferrer">
              <Palette size={24} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CreativeFlow Design. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 w-12 h-12 bg-neu-base shadow-neu rounded-full flex items-center justify-center text-blue-500 z-40 transition-all duration-500 hover:scale-110 hover:shadow-neu-pressed border border-white/20 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={24} />
      </button>

      {/* Floating Call Button (Zalo/Hotline) */}
      <a href="tel:xxx.xxxx.xxx" className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-neu-base p-2 pr-4 rounded-full shadow-neu hover:shadow-neu-pressed transition-all hover:scale-105 active:scale-95 group border border-white/30">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md animate-pulse-slow">
          <Smartphone size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium">Hotline / Zalo</span>
          <span className="text-sm font-bold text-gray-700 glitch-text">xxx.xxxx.xxx</span>
        </div>
      </a>

      {/* AI Chat Bot */}
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default App;