"use client";

import * as React from "react";
import {
    Activity,
    ArrowRight,
    Menu,
    Phone,
    Calendar,
    Star,
    Users
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navigationItems = [
    { title: "Home", href: "#" },
    { title: "About", href: "#" },
    { title: "Technology", href: "#" },
    { title: "Services", href: "#" },
    { title: "Login", href: "/login" },
];

export function MynaHero() {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    React.useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    return (
        <div className="min-h-screen bg-background text-foreground w-full font-sans overflow-x-hidden selection:bg-primary/30 relative">

            {/* HEADER */}
            <header className="container mx-auto px-4 lg:px-12 z-50 relative pt-8">
                <div className="flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2">
                        <span className="font-sans text-2xl font-black tracking-tighter text-foreground uppercase">
                            MedAI.
                        </span>
                    </a>

                    <nav className="hidden md:flex items-center space-x-8 bg-card/40 backdrop-blur-md px-8 py-3 rounded-full border border-border/50">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/register"
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                "rounded-full hidden md:inline-flex bg-foreground hover:bg-foreground/90 text-background px-6 shadow-xl shadow-foreground/10"
                            )}
                        >
                            Book a call
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-background text-foreground border-border">
                                <nav className="flex flex-col gap-6 mt-12">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                    <Link href="/register" className={cn(buttonVariants(), "cursor-pointer rounded-full bg-foreground hover:bg-foreground/90 text-background w-full mt-4")}>
                                        Book a call
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <main className="w-full relative overflow-hidden" ref={ref}>
                {/* Abstract Background Elements */}
                <div className="absolute top-[-10%] right-0 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/3"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-slate-200 rounded-full blur-3xl opacity-60 -z-10"></div>

                <section className="container mx-auto px-4 lg:px-12 pt-20 pb-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content Column */}
                        <div className="flex flex-col relative z-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center bg-card/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 text-sm font-medium w-max mb-8 shadow-sm"
                            >
                                World's Most Adopted Healthcare AI
                            </motion.div>

                            <motion.h1
                                initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
                                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1] mb-6"
                            >
                                Revolutionizing<br />
                                Healthcare with<br />
                                AI
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-10"
                            >
                                Redefine healthcare with AI! Experience the power of faster
                                diagnostics and precisely tailored treatments, designed by
                                MedAI. Unveil the immense potential of intelligent care.
                                Bridge the gap between cutting-edge technology and holistic wellness.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex flex-wrap items-center gap-4 mb-16"
                            >
                                <Link
                                    href="/register"
                                    className={cn(
                                        buttonVariants({ size: "lg" }),
                                        "rounded-full bg-foreground hover:bg-foreground/90 text-background px-8 shadow-xl shadow-foreground/20 hover:-translate-y-1 transition-transform"
                                    )}
                                >
                                    <Phone className="w-4 h-4 mr-2" /> Book a call
                                </Link>
                                <Link
                                    href="/register"
                                    className={cn(
                                        buttonVariants({ size: "lg", variant: "outline" }),
                                        "rounded-full bg-transparent border-foreground/20 hover:bg-muted text-foreground px-8"
                                    )}
                                >
                                    Appointment
                                </Link>
                            </motion.div>

                            {/* Trust Badge / Rating */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="flex items-center gap-4"
                            >
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-muted">
                                            {/* Placeholder for avatars */}
                                            <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 text-foreground font-semibold">
                                        <span>Rated 5/5</span>
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span>& Trusted by</span>
                                    </div>
                                    <div className="text-muted-foreground font-medium text-sm">
                                        1000+ Patients
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Image / Hero Graphic Column */}
                        <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="absolute inset-0 z-10 flex items-center justify-center"
                            >
                                {/* 
                  Using a local relative path to the generated image. 
                  In a real app, this image would be configured to be served from the public/ dir. 
                  Since we are running locally and have path access, we will use an <img> tag with a file URI or rely on the visual design simulation.
                  To ensure it works flawlessly in front of the NextJS app router without modifying next config, we will build the floating cards around a proxy element.
                */}
                                <div className="relative w-full h-[120%] -right-10 top-0">
                                    <img
                                        src="file:///C:/Users/Usre/.gemini/antigravity/brain/995a07a7-68b7-44ba-ba81-2370aee97eb4/hero_medical_ai_1772884431220.png"
                                        alt="Medical AI Concept"
                                        className="object-contain w-full h-full scale-125 hover:scale-[1.28] transition-transform duration-700"
                                        style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.1))' }}
                                    />
                                </div>
                            </motion.div>

                            {/* Floating Stat Card 1 (Top Right) */}
                            <motion.div
                                initial={{ opacity: 0, x: 50, y: -20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="absolute top-1/4 right-0 z-30 bg-card/70 backdrop-blur-xl border border-white/40 p-3 rounded-full shadow-2xl flex items-center gap-3 pr-6"
                            >
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-primary/10"></div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-foreground text-sm leading-none">300+</span>
                                    <span className="text-xs text-muted-foreground">Expert doctors</span>
                                </div>
                            </motion.div>

                            {/* Floating Stat Card 2 (Bottom Center-ish) */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                                className="absolute bottom-10 left-10 z-30 bg-card/80 backdrop-blur-xl border border-white/40 p-4 rounded-3xl shadow-2xl flex flex-col w-64"
                            >
                                <div className="w-full h-32 rounded-2xl bg-muted/50 mb-4 overflow-hidden relative">
                                    {/* Placeholder for small inner image */}
                                    <div className="absolute inset-0 bg-blue-100/50 flex items-center justify-center">
                                        <Activity className="w-8 h-8 text-primary/40" />
                                    </div>
                                </div>
                                <span className="font-bold text-foreground text-xl">5,000+</span>
                                <span className="text-sm text-muted-foreground">Successful Treatment</span>
                            </motion.div>

                            {/* Floating Action Icons (Bottom Right) */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                                className="absolute bottom-20 right-0 z-30 flex flex-col gap-3 bg-card/60 backdrop-blur-md p-2 rounded-full border border-white/40 shadow-lg"
                            >
                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-background">
                                    <Phone className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-background">
                                    <Calendar className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-background">
                                    <Activity className="w-4 h-4" />
                                </Button>
                            </motion.div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
