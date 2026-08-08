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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const passwordStrength = Math.min(password.length * 10, 100);
    let strengthColor = 'bg-white/10';
    if (password.length > 0) {
        if (passwordStrength < 40) strengthColor = 'bg-destructive';
        else if (passwordStrength < 80) strengthColor = 'bg-warning';
        else strengthColor = 'bg-primary';
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-center mb-10">
                <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
                    <Activity className="h-9 w-9 text-primary stroke-[2.5]" />
                    <span className="font-extrabold text-3xl tracking-tighter text-white">MedAI</span>
                </Link>
            </div>

            <Card className="glass-panel border-white/5 bg-slate-900/60 shadow-2xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="space-y-2 pb-8">
                    <CardTitle className="text-3xl font-bold font-headline text-white">Join MedAI</CardTitle>
                    <CardDescription className="text-indigo-200/60 font-medium">Access high-precision clinical automation</CardDescription>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-indigo-300/40">Full Name</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Dr. Sarah Johnson" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50 text-white placeholder:text-white/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-indigo-300/40">Clinical Role</Label>
                                <Select defaultValue="Doctor">
                                    <SelectTrigger id="role" className="bg-white/5 border-white/10 h-12 rounded-xl text-white">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="glass-panel border-white/10 bg-slate-900 text-white">
                                        <SelectItem value="Doctor">Physician</SelectItem>
                                        <SelectItem value="Nurse">Medical Staff</SelectItem>
                                        <SelectItem value="Admin">Clinical Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-indigo-300/40">Work Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="sarah.j@hospital.com" 
                                className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50 text-white placeholder:text-white/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-indigo-300/40">Create Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-3">
                                <div className={cn("h-full transition-all duration-500", strengthColor)} style={{ width: `${passwordStrength}%` }} />
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 pt-3">
                            <Checkbox id="terms" className="border-white/20 data-[state=checked]:bg-primary rounded-md" />
                            <Label htmlFor="terms" className="text-xs font-medium text-indigo-200/60 leading-none cursor-pointer">
                                I agree to the <Link href="#" className="text-primary hover:text-primary-container transition-colors font-bold underline underline-offset-2">Service Terms</Link>
                            </Label>
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
                                    Provisioning Account...
                                </span>
                            ) : 'Initialize Account'}
                        </Button>
                        <div className="text-xs text-center text-indigo-300/40 font-medium tracking-wide">
                            Already part of the network?{' '}
                            <Link href="/login" className="text-primary hover:text-primary-container font-bold underline underline-offset-4">Sign in</Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    );
}
