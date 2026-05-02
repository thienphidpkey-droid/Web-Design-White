import React from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsProps {
    projects: ProjectItem[];
    onBackClick: () => void;
}

const getGradient = (idx: number) => {
    const gradients = [
        'from-blue-600 to-purple-600',
        'from-pink-500 to-rose-500',
        'from-emerald-500 to-cyan-600',
        'from-amber-500 to-orange-600',
        'from-indigo-600 to-blue-600',
        'from-fuchsia-600 to-pink-600',
        'from-violet-600 to-purple-600',
        'from-teal-500 to-emerald-600',
        'from-gray-700 to-slate-900',
    ];
    return gradients[idx % gradients.length];
};

const Projects: React.FC<ProjectsProps> = ({ projects, onBackClick }) => {
    return (
        <div className="min-h-screen py-24 scroll-mt-28">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={onBackClick}
                        className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6"
                    >
                        <div className="p-2 rounded-full shadow-neu hover:shadow-neu-pressed transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-medium">Về trang chủ</span>
                    </button>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Tất Cả Dự Án
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Khám phá bộ sưu tập đầy đủ các website và ứng dụng tôi đã thiết kế và phát triển.
                    </p>
                    <div className="mt-4 text-sm text-gray-400">
                        <span className="font-semibold text-blue-600">{projects.length}</span> dự án
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, idx) => (
                        <a
                            key={idx}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group rounded-3xl bg-neu-base shadow-neu overflow-hidden aspect-[4/3] cursor-pointer hover:shadow-neu-pressed transition-all duration-300 block"
                        >
                            {/* Conditional Poster Background */}
                            {['Cosplay Store', 'Street Impact Fashion', 'Velocity Digital'].includes(project.title) ? (
                                <div className="absolute inset-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
                                    />
                                </div>
                            ) : (
                                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(idx)} p-8 flex flex-col justify-center items-center text-center transition-all duration-700 group-hover:scale-105`}>
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>
                                    
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50"></div>

                                    <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-md z-10 opacity-90 group-hover:opacity-100 transition-opacity leading-tight px-4">
                                        {project.title}
                                    </h4>
                                    <div className="w-12 h-1 bg-white/50 rounded-full z-10 mt-4 group-hover:w-20 transition-all duration-300"></div>
                                </div>
                            )}
                            
                            {/* Dark Overlay on Hover for legibility of the bottom block */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10"></div>

                            {/* Bottom Info Block */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg flex justify-between items-center hover:bg-white/20 transition-colors">
                                    <div>
                                        <p className="text-white/90 text-sm font-semibold uppercase tracking-wider">{project.cat}</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-full text-white group-hover:bg-blue-500 transition-all">
                                        <ExternalLink size={18} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
