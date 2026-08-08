'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-center mb-10">
                <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
                    <Activity className="h-9 w-9 text-primary stroke-[2.5]" />
                    <span className="font-extrabold text-3xl tracking-tighter text-white">MedAI</span>
                </Link>
            </div>

            <Card className="glass-panel border-white/5 bg-slate-900/60 shadow-2xl rounded-[2rem] overflow-hidden">
                <CardHeader className="space-y-2 pb-8">
                    <CardTitle className="text-3xl font-bold font-headline text-white">Welcome back</CardTitle>
                    <CardDescription className="text-indigo-200/60 font-medium">Enter your credentials to access your session</CardDescription>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-indigo-300/40">Email Address</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="dr.smith@hospital.com" 
                                className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50 text-white placeholder:text-white/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-indigo-300/40">Password</Label>
                                <Link href="#" className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-primary hover:text-primary-container transition-colors">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <Input 
                                    id="password" 
                                    type={showPassword ? 'text' : 'password'} 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50 text-white"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-indigo-300/40 hover:text-white transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-primary rounded-md" />
                            <Label htmlFor="remember" className="text-xs font-medium text-indigo-200/60">Keep me signed in</Label>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-6 pt-8 pb-10">
                        <Button 
                            className="w-full h-14 bg-gradient-to-r from-primary to-primary-container text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-0" 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                                    Authenticating...
                                </span>
                            ) : 'Sign in to Dashboard'}
                        </Button>
                        <div className="text-xs text-center text-indigo-300/40 font-medium">
                            Don&apos;t have an analytical seat?{' '}
                            <Link href="/register" className="text-primary hover:text-primary-container font-bold underline underline-offset-4">Create account</Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    );
}
