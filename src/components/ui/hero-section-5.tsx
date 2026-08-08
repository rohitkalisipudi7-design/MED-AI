'use client'
import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight, Activity } from 'lucide-react'
import { useScroll, motion } from 'framer-motion'

export function HeroSection() {
    return (
        <div className="bg-mesh min-h-screen font-body text-foreground">
            <HeroHeader />
            <main className="overflow-x-hidden pt-12">
                <section className="relative">
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-32">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12 text-center lg:text-left">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mx-auto max-w-lg lg:ml-0 lg:max-w-full"
                            >
                                <h1 className="mt-8 max-w-3xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-bold font-headline tracking-tight text-white leading-[1.1]">
                                    Stop Scanning. <span className="text-primary-container bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container">Start Treating.</span> <br />
                                    Transform Medical Reports <br className="hidden xl:block" /> into Instant Clinical Insights.
                                </h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg text-indigo-200/60 font-medium">
                                    Upload lab results, prescriptions, and diagnostic summaries. Our AI instantly extracts key data, highlights abnormal values, and generates structured summaries so you can make faster, safer decisions.
                                </p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                                    <Link
                                        href="/register"
                                        className={cn(buttonVariants({ size: "lg" }), "h-14 rounded-full pl-6 pr-4 text-base shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-primary-container border-0 font-bold active:scale-95 transition-transform")}>
                                        <span className="text-nowrap">Book a Demo</span>
                                        <ChevronRight className="ml-1 h-5 w-5" />
                                    </Link>
                                    <Link
                                        href="#demo-video"
                                        className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-14 rounded-full px-6 text-base font-bold glass-panel border-white/10 hover:bg-white/10 transition-all active:scale-95")}>
                                        <span className="text-nowrap shrink-0">See How It Works</span>
                                    </Link>
                                </div>
                                <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-[10px] text-indigo-300/40 font-label tracking-[0.2em] uppercase">
                                    <div className="flex items-center gap-2 font-bold">
                                        <span className="material-symbols-outlined text-emerald-400 text-lg">verified_user</span> 
                                        HIPAA Compliant
                                    </div>
                                    <div className="hidden sm:block text-white/5">•</div>
                                    <div className="flex items-center gap-2 font-bold">
                                        <span className="material-symbols-outlined text-primary text-lg">lock</span>
                                        256-bit Encryption
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Background Video/Visual */}
                        <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none opacity-40">
                             <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-20" />
                             <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="size-full object-cover mix-blend-screen opacity-30"
                                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"></video>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-900/40 backdrop-blur-xl border-y border-white/5 py-12">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row gap-8">
                            <div className="md:max-w-44 md:border-r md:border-white/10 md:pr-12 whitespace-nowrap">
                                <p className="text-center md:text-end text-[10px] font-label uppercase tracking-[0.2em] text-indigo-300/40 font-bold">Powering the best hospitals</p>
                            </div>
                            <div className="relative py-2 md:w-[calc(100%-11rem)] w-full overflow-hidden">
                                <InfiniteSlider
                                    durationOnHover={20}
                                    duration={40}
                                    gap={112}>
                                    {[1,2,3,4,5,6,7,8].map((i) => (
                                        <div key={i} className="flex">
                                            <img
                                                className="h-6 w-auto opacity-30 grayscale invert brightness-200 transition-all hover:opacity-100 hover:grayscale-0"
                                                src={`https://html.tailus.io/blocks/customers/${['nvidia', 'column', 'github', 'nike', 'lemonsqueezy', 'laravel', 'lilly', 'openai'][i-1]}.svg`}
                                                alt="Partner Logo"
                                            />
                                        </div>
                                    ))}
                                </InfiniteSlider>

                                <div className="bg-gradient-to-r from-[#030303] absolute inset-y-0 left-0 w-24 z-10 pointer-events-none opacity-50"></div>
                                <div className="bg-gradient-to-l from-[#030303] absolute inset-y-0 right-0 w-24 z-10 pointer-events-none opacity-50"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="solutions" className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-white">Why <span className="text-primary">MedAI?</span></h2>
                        <p className="text-indigo-200/60 text-lg max-w-2xl mx-auto font-medium">Reduce administrative load by up to 80% while improving diagnosis speed.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: 'lab_research', title: 'Instant Lab Extraction', desc: 'Automatically parse metabolic panels, CBCs, and more to identify abnormal flags instantly.' },
                            { icon: 'notes', title: 'AI-Summarized Notes', desc: 'Transform unstructured practitioner notes into concise, actionable patient summaries.' },
                            { icon: 'bolt', title: 'Seamless Workflow', desc: 'Integrates directly into your existing dashboard workflow. Drag, drop, analyze.' }
                        ].map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 glass-panel bg-indigo-950/20 rounded-3xl border-white/5 hover:border-white/10 transition-all group flex flex-col items-start"
                            >
                                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                                    <span className="material-symbols-outlined text-4xl text-primary">{feature.icon}</span>
                                </div>
                                <h3 className="font-bold font-headline text-2xl mb-4 text-white">{feature.title}</h3>
                                <p className="text-indigo-200/60 text-base leading-relaxed font-body">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section id="pricing" className="bg-slate-900/20 backdrop-blur-xl py-32 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-white">Simple <span className="text-primary">AI Pricing</span></h2>
                            <p className="text-indigo-200/60 text-lg max-w-2xl mx-auto font-medium">Scale your medical practice without scaling your costs.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                            {[
                                { name: 'Clinic Small', price: '99', features: ['Up to 1,000 document scans', 'Basic NLP summaries', 'Email Support'] },
                                { name: 'Hospital Pro', price: '499', popular: true, features: ['Up to 10,000 document scans', 'Advanced medical context AI', 'Trend & Analytics Dashboard', '24/7 Priority Support'] },
                                { name: 'Enterprise Network', price: 'Custom', features: ['Unlimited volume', 'Custom model fine-tuning', 'On-premise deployment', 'Dedicated Account Manager'] }
                            ].map((plan, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={cn(
                                        "p-10 rounded-[2.5rem] flex flex-col transition-all relative border overflow-hidden",
                                        plan.popular 
                                            ? "glass-panel bg-primary/5 border-primary/30 shadow-2xl shadow-primary/10 scale-105 z-10" 
                                            : "glass-panel bg-white/5 border-white/10"
                                    )}
                                >
                                    {plan.popular && (
                                        <>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[64px] rounded-full -mr-12 -mt-12"></div>
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20">Most Popular</div>
                                        </>
                                    )}
                                    <h3 className="font-bold font-headline text-2xl mb-2 text-white">{plan.name}</h3>
                                    <div className="text-5xl font-extrabold font-headline mb-8 text-white flex items-baseline">
                                        {plan.price !== 'Custom' && <span className="text-2xl font-normal text-indigo-300/60 mr-1">$</span>}
                                        {plan.price}
                                        {plan.price !== 'Custom' && <span className="text-base font-medium text-indigo-300/40 ml-1">/mo</span>}
                                    </div>
                                    <ul className="space-y-4 mb-12 flex-1 text-sm font-body font-medium text-indigo-200/70">
                                        {plan.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-4">
                                                <span className="material-symbols-outlined text-primary text-xl font-bold">check</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={cn(
                                        "w-full h-14 rounded-2xl font-bold transition-all shadow-xl",
                                        plan.popular 
                                            ? "bg-gradient-to-r from-primary to-primary-container text-primary-foreground hover:scale-[1.02] active:scale-95 border-0" 
                                            : "bg-white/5 text-white hover:bg-white/10 border-white/10 active:scale-95"
                                    )}>
                                        {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                
                <footer className="bg-slate-900/40 backdrop-blur-2xl border-t border-white/5 py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                            <Link href="/" className="flex items-center space-x-3 text-primary transition-transform hover:scale-105 active:scale-95">
                                <Activity className="h-8 w-8 stroke-[2.5]" />
                                <span className="font-extrabold text-2xl tracking-tighter text-white">MedAI</span>
                            </Link>
                            
                            <div className="flex flex-col items-center md:items-end gap-4">
                                <p className="font-label text-[10px] tracking-[0.3em] uppercase text-indigo-300/30 font-bold">© 2024 MedAI Systems. Protected Clinical Infrastructure.</p>
                                <div className="flex gap-10">
                                    {['Security Compliance', 'Privacy Architecture', 'Clinical Validation'].map((link) => (
                                        <a key={link} href="#" className="font-label text-[9px] tracking-[0.2em] uppercase text-indigo-300/40 hover:text-primary transition-all font-bold">
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}

const menuItems = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Why MedAI', href: '#why-us' },
    { name: 'About AI', href: '#about-ai' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.02)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav className="group fixed z-50 w-full pt-6 transition-all">
                <div className={cn(
                    'mx-auto max-w-7xl rounded-full px-6 transition-all duration-500 lg:px-12 border border-transparent', 
                    scrolled ? 'bg-slate-950/40 glass-panel backdrop-blur-2xl shadow-2xl border-white/5 py-1 max-w-5xl' : 'py-2'
                )}>
                    <div className={cn('relative flex flex-wrap items-center justify-between gap-6 py-2 duration-300 lg:gap-0', scrolled ? 'lg:py-2' : 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link href="/" className="flex items-center space-x-3 text-primary group/logo active:scale-95 transition-transform">
                                <Activity className="h-8 w-8 stroke-[2.5] group-hover/logo:scale-110 transition-transform duration-500" />
                                <span className="font-extrabold text-2xl tracking-tighter text-white">MedAI</span>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden bg-transparent border-0 hover:bg-white/5 rounded-full transition-colors">
                                <Menu className={cn("m-auto size-6 duration-300 text-white", menuState ? "rotate-90 scale-0 opacity-0 absolute" : "rotate-0 scale-100 opacity-100")} />
                                <X className={cn("absolute inset-0 m-auto size-6 text-white transition-all duration-300", menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-12 text-[10px] font-label font-bold uppercase tracking-[0.2em]">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link href={item.href} className="text-indigo-200/40 hover:text-white transition-all relative group/navitem">
                                                <span>{item.name}</span>
                                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover/navitem:w-full"></span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={cn(
                            "lg:flex items-center justify-end w-full lg:w-fit rounded-3xl lg:p-0 transition-all duration-500 overflow-hidden",
                            menuState ? "max-h-[400px] mt-8 p-8 bg-slate-950/90 glass-panel border border-white/5" : "max-h-0 lg:max-h-none hidden lg:block"
                        )}>
                            <div className="flex w-full flex-col space-y-4 sm:flex-row sm:gap-8 sm:space-y-0 md:w-fit items-center">
                                <Link
                                    href="/login"
                                    className="font-bold text-[10px] font-label uppercase tracking-[0.2em] text-indigo-300/60 hover:text-white transition-colors px-4 py-2">
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-primary-foreground rounded-full text-[10px] font-bold font-label uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

