import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UpgradeSystemProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

interface Item {
  id: number;
  name: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  category: string;
}

export default function UpgradeSystem({ balance, onBalanceChange }: UpgradeSystemProps) {
  const [selectedItemLeft, setSelectedItemLeft] = useState<Item | null>(null);
  const [selectedItemRight, setSelectedItemRight] = useState<Item | null>(null);
  const [balanceSlider, setBalanceSlider] = useState(50);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<'success' | 'fail' | null>(null);
  const [searchLeft, setSearchLeft] = useState('');
  const [searchRight, setSearchRight] = useState('');
  const [activeMode, setActiveMode] = useState<'improve' | 'get'>('improve');

  const marketItems: Item[] = [
    { id: 1, name: 'StatTrak™ Glock-18', price: 361218, rarity: 'legendary', image: '🔫', category: 'MW' },
    { id: 2, name: 'StatTrak™ Butterfly Knife', price: 390038, rarity: 'legendary', image: '🔪', category: 'MW' },
    { id: 3, name: 'StatTrak™ Karambit', price: 370998, rarity: 'legendary', image: '🗡️', category: 'FN' },
    { id: 4, name: 'AWP Fire Prince', price: 364040, rarity: 'epic', image: '🎯', category: 'FT' },
    { id: 5, name: 'Karambit Fade', price: 349878, rarity: 'legendary', image: '💎', category: 'MW' },
    { id: 6, name: 'M4A4 Howl', price: 344500, rarity: 'legendary', image: '🐺', category: 'MW' },
    { id: 7, name: 'AK-47 Fire Serpent', price: 318000, rarity: 'epic', image: '🐍', category: 'FN' },
    { id: 8, name: 'Desert Eagle Blaze', price: 308000, rarity: 'rare', image: '🔥', category: 'FN' },
  ];

  const inventoryItems: Item[] = [
    { id: 101, name: 'AK-47 Redline', price: 50000, rarity: 'rare', image: '🎮', category: 'FT' },
    { id: 102, name: 'M4A1-S Hyper Beast', price: 45000, rarity: 'rare', image: '🦁', category: 'MW' },
    { id: 103, name: 'AWP Asiimov', price: 80000, rarity: 'epic', image: '🎨', category: 'FT' },
  ];

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      legendary: 'border-game-purple bg-game-purple/10',
      epic: 'border-game-pink bg-game-pink/10',
      rare: 'border-game-mint bg-game-mint/10',
      common: 'border-slate-600 bg-slate-600/10',
    };
    return colors[rarity] || colors.common;
  };

  const calculateChance = () => {
    if (!selectedItemLeft || !selectedItemRight) return 50;
    
    const leftValue = selectedItemLeft.price * (balanceSlider / 100);
    const rightValue = selectedItemRight.price;
    
    const chance = (leftValue / (leftValue + rightValue)) * 100;
    return Math.min(Math.max(chance, 5), 95);
  };

  const startUpgrade = () => {
    if (!selectedItemLeft || !selectedItemRight) return;
    
    const cost = selectedItemLeft.price;
    if (cost > balance) return;
    
    setIsUpgrading(true);
    setUpgradeResult(null);
    onBalanceChange(balance - cost);
    
    setTimeout(() => {
      const chance = calculateChance();
      const success = Math.random() * 100 < chance;
      
      setUpgradeResult(success ? 'success' : 'fail');
      
      if (success && activeMode === 'get') {
        onBalanceChange(balance - cost + selectedItemRight.price);
      }
      
      setTimeout(() => {
        setIsUpgrading(false);
        setUpgradeResult(null);
        setSelectedItemLeft(null);
        setSelectedItemRight(null);
      }, 3000);
    }, 3000);
  };

  const filteredInventory = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchLeft.toLowerCase())
  );

  const filteredMarket = marketItems.filter(item =>
    item.name.toLowerCase().includes(searchRight.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-2 text-center">UPGRADE</h1>
        <p className="text-center text-muted-foreground">Испытай удачу и попробуй получить крутые скины</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-5xl h-[400px] bg-gradient-to-r from-blue-900/20 via-blue-600/30 to-blue-900/20 rounded-3xl border-2 border-blue-500/30"
               style={{
                 boxShadow: '0 0 100px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(59, 130, 246, 0.1)',
               }}>
            <div className="absolute inset-4 border-2 border-blue-500/20 rounded-2xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-32 border-2 border-blue-400/40 rounded-2xl bg-blue-950/30"></div>
            
            <div className="absolute top-8 left-8 w-24 h-24 border-2 border-blue-500/30 rounded-xl bg-blue-900/20"></div>
            <div className="absolute top-8 right-8 w-24 h-24 border-2 border-blue-500/30 rounded-xl bg-blue-900/20"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 border-2 border-blue-500/30 rounded-xl bg-blue-900/20"></div>
            <div className="absolute bottom-8 right-8 w-24 h-24 border-2 border-blue-500/30 rounded-xl bg-blue-900/20"></div>

            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-2 bg-blue-500/20 rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 h-2 bg-blue-500/20 rounded-full"></div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-8 py-20">
          <div className={`w-64 h-64 glass-morphism border-2 rounded-2xl flex items-center justify-center ${
            selectedItemLeft ? getRarityColor(selectedItemLeft.rarity) : 'border-slate-600'
          } transition-all`}>
            {selectedItemLeft ? (
              <div className="text-center p-4">
                <div className="text-6xl mb-4">{selectedItemLeft.image}</div>
                <div className="text-sm font-bold mb-1">{selectedItemLeft.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{selectedItemLeft.category}</div>
                <Badge className="bg-game-mint/20 text-game-mint border-game-mint/50">
                  {selectedItemLeft.price.toLocaleString()}₽
                </Badge>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Icon name="Package" size={48} className="mx-auto mb-2 opacity-30" />
                <div className="text-sm">Выбери скин или баланс</div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            {isUpgrading ? (
              <div className="w-16 h-16 rounded-full border-4 border-game-mint border-t-transparent animate-spin"></div>
            ) : upgradeResult === 'success' ? (
              <div className="text-6xl animate-bounce">✅</div>
            ) : upgradeResult === 'fail' ? (
              <div className="text-6xl animate-bounce">❌</div>
            ) : (
              <Icon name="ArrowRight" size={48} className="text-game-mint" />
            )}
            
            {!isUpgrading && !upgradeResult && (
              <Badge className="bg-game-mint/20 text-game-mint border-game-mint/50 text-lg px-6 py-2">
                {calculateChance().toFixed(1)}%
              </Badge>
            )}
          </div>

          <div className={`w-64 h-64 glass-morphism border-2 rounded-2xl flex items-center justify-center ${
            selectedItemRight ? getRarityColor(selectedItemRight.rarity) : 'border-slate-600'
          } transition-all`}>
            {selectedItemRight ? (
              <div className="text-center p-4">
                <div className="text-6xl mb-4">{selectedItemRight.image}</div>
                <div className="text-sm font-bold mb-1">{selectedItemRight.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{selectedItemRight.category}</div>
                <Badge className="bg-game-purple/20 text-game-purple border-game-purple/50">
                  {selectedItemRight.price.toLocaleString()}₽
                </Badge>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Icon name="Gift" size={48} className="mx-auto mb-2 opacity-30" />
                <div className="text-sm">Выбери скин, который хочешь получить</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as 'improve' | 'get')} className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="improve">
              <Icon name="TrendingUp" size={18} className="mr-2" />
              Хочу улучшить
            </TabsTrigger>
            <TabsTrigger value="get">
              <Icon name="Target" size={18} className="mr-2" />
              Хочу получить
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeMode === 'improve' && (
        <Card className="glass-morphism border-game-purple/30 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Icon name="Wallet" size={20} className="text-game-mint" />
            <span className="text-sm text-muted-foreground">Баланс апгрейда</span>
            <input
              type="range"
              min="0"
              max="100"
              value={balanceSlider}
              onChange={(e) => setBalanceSlider(Number(e.target.value))}
              className="flex-1"
              disabled={isUpgrading}
            />
            <span className="text-lg font-bold text-game-mint">{balanceSlider}%</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {activeMode === 'improve' 
              ? 'Выбери скин или баланс аккаунта, либо всё вместе'
              : 'Выбери как хочешь получить выигрыш — баланс или скин'
            }
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-morphism border-game-purple/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold flex items-center gap-2">
              <Icon name="Package" size={20} />
              Инвентарь
            </h3>
            <Badge variant="outline">Мин. цена ₽</Badge>
          </div>
          
          <div className="mb-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Название"
                value={searchLeft}
                onChange={(e) => setSearchLeft(e.target.value)}
                className="pl-10 bg-slate-900/50 border-game-purple/30"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredInventory.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Скинов не найдено
              </div>
            ) : (
              filteredInventory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => !isUpgrading && setSelectedItemLeft(item)}
                  className={`glass-morphism p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedItemLeft?.id === item.id ? 'ring-2 ring-game-mint' : ''
                  } ${getRarityColor(item.rarity)}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-game-mint/20 text-game-mint border-game-mint/50">
                        {item.price.toLocaleString()}₽
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="glass-morphism border-game-purple/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold flex items-center gap-2">
              <Icon name="ShoppingCart" size={20} />
              Маркет скинов
            </h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">2X</Badge>
              <Badge variant="outline" className="text-xs">4X</Badge>
              <Badge variant="outline" className="text-xs">16X</Badge>
              <Badge variant="outline" className="text-xs">50X</Badge>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Название"
                value={searchRight}
                onChange={(e) => setSearchRight(e.target.value)}
                className="pl-10 bg-slate-900/50 border-game-purple/30"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredMarket.map((item) => (
              <div
                key={item.id}
                onClick={() => !isUpgrading && setSelectedItemRight(item)}
                className={`glass-morphism p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedItemRight?.id === item.id ? 'ring-2 ring-game-purple' : ''
                } ${getRarityColor(item.rarity)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-game-purple/20 text-game-purple border-game-purple/50">
                      {item.price.toLocaleString()}₽
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={startUpgrade}
          disabled={!selectedItemLeft || !selectedItemRight || isUpgrading}
          className="bg-gradient-to-r from-game-purple to-game-mint hover:from-game-purple/80 hover:to-game-mint/80 text-white font-bold py-6 px-12 text-lg"
        >
          {isUpgrading ? (
            <>
              <Icon name="Loader2" size={24} className="mr-2 animate-spin" />
              Апгрейд...
            </>
          ) : (
            <>
              <Icon name="Zap" size={24} className="mr-2" />
              Начать UPGRADE
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
