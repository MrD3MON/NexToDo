import { createFileRoute, Link, useNavigate, Navigate } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
    LayoutGrid,
    Users,
    Zap,
    Bell,
    Shield,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    CheckSquare,
    Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { cn } from "@/lib/utils";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { ShineBorder } from "@/components/ui/shine-border";

export const Route = createFileRoute("/")({
    component: LandingPage,
});

function LandingPage() {
    return (
        <>
            <Authenticated>
                <RedirectToDashboard />
            </Authenticated>
            <AuthLoading>
                <LandingLoading />
            </AuthLoading>
            <Unauthenticated>
                <LandingContent />
            </Unauthenticated>
        </>
    );
}

function LandingLoading() {
    return (
        <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
        </div>
    );
}

/* ─── Fade-up animation wrapper ─── */
function FadeUp({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const features = [
    {
        title: "Kanban Boards",
        description:
            "Drag-and-drop cards across customisable lists. Visualise your entire workflow at a single glance.",
        link: "/sign-in",
    },
    {
        title: "Real-time Collaboration",
        description:
            "Invite teammates, assign cards, and watch changes appear instantly — no refresh needed.",
        link: "/sign-in",
    },
    {
        title: "Lightning Fast",
        description:
            "Built on Convex for sub-100 ms reactivity. Clean UI, keyboard shortcuts, built for speed.",
        link: "/sign-in",
    },
    {
        title: "Smart Notifications",
        description:
            "Stay in the loop with contextual alerts for mentions, due-dates, and board activity.",
        link: "/sign-in",
    },
    {
        title: "Workspace Security",
        description:
            "Role-based access control so the right people see the right boards — nothing more.",
        link: "/sign-in",
    },
    {
        title: "Powerful Checklists",
        description:
            "Break cards into steps with nested checklists, progress rings, and completion tracking.",
        link: "/sign-in",
    },
];

const perks = [
    { icon: CheckCircle2, label: "No credit card required" },
    { icon: CheckCircle2, label: "Free forever plan" },
    { icon: CheckCircle2, label: "Cancel anytime" },
];

const mockupColumns = [
    {
        title: "Backlog",
        count: 4,
        colClass: "bg-muted/40",
        cards: [
            {
                titleWidth: "w-3/4",
                tag: { label: "Design", bg: "bg-teal-500/10 text-teal-700 dark:text-teal-300 dark:bg-teal-500/20" },
                priority: { label: "Medium", bg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 dark:bg-amber-500/20" },
                hasChecklist: true,
                checklistDone: 2,
                checklistTotal: 5,
                isDone: false,
            },
            {
                titleWidth: "w-1/2",
                tag: { label: "Docs", bg: "bg-sky-500/10 text-sky-700 dark:text-sky-300 dark:bg-sky-500/20" },
                priority: null,
                hasChecklist: false,
                checklistDone: 0,
                checklistTotal: 0,
                isDone: false,
            }
        ]
    },
    {
        title: "In Progress",
        count: 2,
        colClass: "bg-accent/40 border border-border/80",
        cards: [
            {
                titleWidth: "w-5/6",
                tag: { label: "Feature", bg: "bg-primary/10 text-primary dark:bg-primary/20" },
                priority: { label: "High", bg: "bg-orange-500/10 text-orange-700 dark:text-orange-300 dark:bg-orange-500/20" },
                hasChecklist: true,
                checklistDone: 4,
                checklistTotal: 4,
                isDone: false,
            },
            {
                titleWidth: "w-2/3",
                tag: { label: "Refactor", bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 dark:bg-emerald-500/20" },
                priority: { label: "Low", bg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 dark:bg-blue-500/20" },
                hasChecklist: false,
                checklistDone: 0,
                checklistTotal: 0,
                isDone: false,
            }
        ]
    },
    {
        title: "Done",
        count: 6,
        colClass: "bg-muted/40",
        cards: [
            {
                titleWidth: "w-2/3",
                tag: { label: "Bug", bg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 dark:bg-rose-500/20" },
                priority: null,
                hasChecklist: true,
                checklistDone: 3,
                checklistTotal: 3,
                isDone: true,
            },
            {
                titleWidth: "w-1/2",
                tag: { label: "CI/CD", bg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 dark:bg-indigo-500/20" },
                priority: null,
                hasChecklist: false,
                checklistDone: 0,
                checklistTotal: 0,
                isDone: true,
            }
        ]
    }
];

function LandingContent() {
    return (
        <div className="min-h-[calc(100vh-3rem)] bg-background text-foreground overflow-x-hidden">
            {/* ── HERO ── */}
            <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] px-4 pt-8 pb-16 text-center overflow-hidden">
                {/* Background hexagon grid — adapts to theme via fill/stroke */}
                <HexagonPattern
                    radius={48}
                    gap={4}
                    className="fill-primary/[0.04] stroke-primary/[0.09] dark:fill-primary/[0.02] dark:stroke-primary/[0.05]"
                    hexagons={[
                        [2, 2],
                        [4, 1],
                        [6, 3],
                        [1, 5],
                        [8, 2],
                        [3, 7],
                        [7, 5],
                        [5, 4],
                        [9, 6],
                        [0, 3],
                        [10, 4],
                    ]}
                />

                {/* Glow blobs — subtle in light, more visible in dark */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.08] dark:bg-primary/[0.12] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-accent/[0.06] dark:bg-accent/[0.10] rounded-full blur-[90px] pointer-events-none" />

                {/* Badge */}
                <FadeUp delay={0.05}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/[0.04] text-primary text-xs font-semibold mb-8 backdrop-blur-sm">
                        <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                        Powered by real-time sync
                    </div>
                </FadeUp>

                {/* Headline */}
                <FadeUp delay={0.1}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-4xl text-foreground bg-gradient-to-b from-foreground to-foreground/75 bg-clip-text text-transparent pb-1">
                        Organise tasks. <br className="hidden sm:block" />
                        <SquigglyText
                            scale={[7, 10]}
                            stepDuration={70}
                            className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent"
                        >
                            Ship faster.
                        </SquigglyText>
                    </h1>
                </FadeUp>

                {/* Sub-headline */}
                <FadeUp delay={0.18}>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                        A beautiful Kanban board for makers who value clarity, speed, and seamless
                        team collaboration.
                    </p>
                </FadeUp>

                {/* CTAs */}
                <FadeUp
                    delay={0.26}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/sign-in">
                        <div className="relative rounded-full overflow-hidden">
                            <ShineBorder
                                shineColor={["hsl(var(--primary))", "hsl(var(--border))", "hsl(var(--accent))"]}
                                duration={5}
                                borderWidth={1.5}
                            />
                            <Button
                                size="lg"
                                className="relative bg-primary text-primary-foreground hover:opacity-90 rounded-full px-8 text-base font-semibold gap-2 transition-all duration-200 group border border-border"
                            >
                                Start for free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </div>
                    </Link>
                    <Link to="/sign-in">
                        <Button size="lg" variant="outline" className="rounded-full px-8 text-base hover:bg-accent border border-border bg-background">
                            Sign in
                        </Button>
                    </Link>
                </FadeUp>

                {/* Social proof perks */}
                <FadeUp delay={0.34} className="mt-10 flex flex-wrap justify-center gap-6">
                    {perks.map(({ icon: Icon, label }) => (
                        <span
                            key={label}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground"
                        >
                            <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                            {label}
                        </span>
                    ))}
                </FadeUp>

                {/* Hero visual — glowing board mockup */}
                <FadeUp delay={0.42} className="mt-20 w-full max-w-4xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/[0.03] dark:shadow-black/60">
                        <ShineBorder
                            shineColor={["hsl(var(--primary))", "hsl(var(--border))", "hsl(var(--accent))"]}
                            duration={8}
                            borderWidth={1}
                        />
                        {/* Fake board UI */}
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-3 h-3 rounded-full bg-border" />
                                <div className="w-3 h-3 rounded-full bg-border" />
                                <div className="w-3 h-3 rounded-full bg-border" />
                                <div className="ml-4 h-5 w-40 rounded bg-muted" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {mockupColumns.map((col) => (
                                    <div
                                        key={col.title}
                                        className={`rounded-xl p-3 ${col.colClass} border border-border/60`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                {col.title}
                                            </span>
                                            <span className="text-xs bg-muted/80 rounded-full px-2 py-0.5 text-muted-foreground">
                                                {col.count}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {col.cards.map((card, cardIdx) => (
                                                <div
                                                    key={cardIdx}
                                                    className="rounded-lg bg-card border border-border/40 p-3 shadow-sm hover:shadow-md transition-all duration-200 text-left"
                                                >
                                                    {/* Tags Row */}
                                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                                        {card.tag && (
                                                            <span className={cn("text-[9px] font-medium px-2 py-0.5 rounded-full", card.tag.bg)}>
                                                                {card.tag.label}
                                                            </span>
                                                        )}
                                                        {card.priority && (
                                                            <span className={cn("text-[9px] font-medium px-2 py-0.5 rounded-full", card.priority.bg)}>
                                                                {card.priority.label}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Title Line (Skeleton) */}
                                                    <div className={cn("h-2 rounded bg-muted/70 mb-1.5", card.titleWidth, card.isDone && "line-through opacity-60")} />
                                                    <div className="h-1.5 w-1/2 rounded bg-muted/40 mb-3" />

                                                    {/* Bottom Metadata Row */}
                                                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/20">
                                                        <div className="flex items-center gap-2">
                                                            {card.hasChecklist && (
                                                                <span className={cn("flex items-center gap-1", card.checklistDone === card.checklistTotal ? "text-primary font-medium" : "")}>
                                                                    <CheckSquare className="w-3 h-3" />
                                                                    {card.checklistDone}/{card.checklistTotal}
                                                                </span>
                                                            )}
                                                            {card.isDone && (
                                                                <span className="flex items-center gap-0.5 text-primary font-medium">
                                                                    <CheckCircle2 className="w-3 h-3" />
                                                                    Done
                                                                </span>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Fake avatar bubble */}
                                                        <div className="w-4 h-4 rounded-full bg-muted-foreground/20 border border-border flex items-center justify-center text-[7px] font-bold">
                                                            {col.title[0]}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeUp>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-24 px-4 border-t border-border/60">
                <div className="max-w-6xl mx-auto">
                    <FadeUp className="text-center mb-4">
                        <span className="text-primary text-xs font-semibold uppercase tracking-widest">
                            Features
                        </span>
                    </FadeUp>
                    <FadeUp delay={0.06} className="text-center mb-2">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                            <Text3DFlip
                                className="inline-flex text-3xl md:text-5xl font-bold"
                                textClassName="text-foreground bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
                                flipTextClassName="text-primary"
                                staggerDuration={0.04}
                            >
                                Everything you need
                            </Text3DFlip>
                        </h2>
                    </FadeUp>
                    <FadeUp delay={0.1} className="text-center mb-12">
                        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                            Powerful tools that stay out of your way.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.14}>
                        <HoverEffect
                            items={features}
                            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        />
                    </FadeUp>
                </div>
            </section>

            {/* ── ICON STATS ── */}
            <section className="py-20 px-4 border-t border-border/60">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: LayoutGrid, label: "Boards", value: "Unlimited" },
                        { icon: Users, label: "Teammates", value: "∞" },
                        { icon: Zap, label: "Latency", value: "< 100 ms" },
                        { icon: Bell, label: "Uptime", value: "99.9 %" },
                    ].map(({ icon: Icon, label, value }, i) => (
                        <FadeUp key={label} delay={i * 0.08}>
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="p-3 rounded-xl bg-muted border border-border shadow-sm">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <span className="text-2xl font-bold text-foreground">{value}</span>
                                <span className="text-sm text-muted-foreground">{label}</span>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-28 px-4 border-t border-border/60">
                <FadeUp className="max-w-lg mx-auto">
                    <NeonGradientCard
                        neonColors={{ firstColor: "hsl(var(--primary))", secondColor: "hsl(var(--accent))" }}
                        borderSize={1.5}
                        borderRadius={24}
                        className="w-full"
                    >
                        <div className="flex flex-col items-center text-center gap-5 py-4 bg-card">
                            <div className="p-3 rounded-xl bg-muted border border-border shadow-sm">
                                <Shield className="w-7 h-7 text-muted-foreground" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                                Ready to{" "}
                                <SquigglyText
                                    scale={[5, 8]}
                                    stepDuration={75}
                                    className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent"
                                >
                                    get organised?
                                </SquigglyText>
                            </h2>
                            <p className="text-muted-foreground text-sm max-w-xs">
                                Create your first board in seconds. No setup, no friction.
                            </p>
                            <Link to="/sign-in">
                                <Button
                                    size="lg"
                                    className="bg-primary text-primary-foreground hover:opacity-90 rounded-full px-8 font-semibold gap-2 group transition-all duration-200 shadow-md border border-border"
                                >
                                    Create your first board
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </NeonGradientCard>
                </FadeUp>
            </section>

            {/* ── FOOTER ── */}
            <footer className="border-t border-border py-8 px-6 text-center text-muted-foreground text-sm">
                © {new Date().getFullYear()} NexToDo. Built with <Heart className="inline h-3.5 w-3.5 fill-primary/30 text-primary animate-pulse mx-0.5 align-middle" /> and Convex.
            </footer>
        </div>
    );
}

function RedirectToDashboard() {
    return <Navigate to="/dashboard" replace />;
}
