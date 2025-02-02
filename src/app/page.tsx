'use client';

import React, { useState } from 'react';
import TripStats from '@/components/TripStats';
import { LineChart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TripView } from '@/components/TripView';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

type View = 'trip' | 'stats';

export default function Home() {
  const [activeView, setActiveView] = useState<View>('trip');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Left side: Title */}
          <div className="flex items-center gap-4">
            <h1 className="font-semibold tracking-tight text-lg">Grécia</h1>
            <p className="font-semibold">Família Leal</p>
          </div>

          {/* Right side: Navigation buttons */}
          <Card className="border-none">
            <nav className="flex items-center p-1">
              <Button
                variant={activeView === 'trip' ? 'secondary' : 'ghost'}
                size="sm"
                className="relative gap-2"
                onClick={() => setActiveView('trip')}
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Itinerário</span>
                {activeView === 'trip' && (
                  <motion.div
                    className="absolute inset-0 bg-background rounded-md z-[-1]"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Button>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <Button
                variant={activeView === 'stats' ? 'secondary' : 'ghost'}
                size="sm"
                className="relative gap-2"
                onClick={() => setActiveView('stats')}
              >
                <LineChart className="w-4 h-4" />
                <span className="hidden sm:inline">Estatísticas</span>
                {activeView === 'stats' && (
                  <motion.div
                    className="absolute inset-0 bg-background rounded-md z-[-1]"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Button>
            </nav>
          </Card>
        </div>
      </motion.header>

      <main className="flex-1 w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container py-8 md:py-12 lg:py-16 max-w-7xl"
          >
            <div className="space-y-2 mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                {activeView === 'trip' ? 'Itinerário' : 'Estatísticas'}
              </h2>
              <p className="text-muted-foreground">
                {activeView === 'trip'
                  ? 'Planejamento completo da viagem com hospedagens e passeios.'
                  : 'Visualização de custos e informações da viagem.'}
              </p>
            </div>
            {activeView === 'trip' ? <TripView /> : <TripStats />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}