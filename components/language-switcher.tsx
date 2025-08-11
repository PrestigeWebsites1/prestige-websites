"use client";

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface LanguageSwitcherProps {
  isDark?: boolean;
}

export default function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'al', name: 'Shqip', flag: '🇦🇱' },
  ] as const;

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className={`gap-2 backdrop-blur-md border transition-all duration-300 rounded-full px-4 py-2 ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 text-white' 
                : 'bg-black/5 border-black/10 hover:border-black/20 hover:bg-black/10 text-[#2d3436]'
            }`}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Globe className="h-4 w-4" />
            </motion.div>
            <span className="hidden sm:inline text-lg">{currentLanguage?.flag}</span>
            <span className="hidden md:inline font-medium">{currentLanguage?.name}</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-2 min-w-[140px]"
      >
        <AnimatePresence>
          {languages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.1 }}
            >
              <DropdownMenuItem
                onClick={() => setLanguage(lang.code)}
                className={`cursor-pointer rounded-lg px-3 py-2 transition-all duration-200 ${
                  language === lang.code 
                    ? 'bg-gradient-to-r from-[#fd79a8]/20 to-[#6c5ce7]/20 text-white border border-[#fd79a8]/30' 
                    : 'hover:bg-white/10 text-white/80 hover:text-white'
                }`}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-[#fd79a8] rounded-full"
                    />
                  )}
                </motion.div>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

