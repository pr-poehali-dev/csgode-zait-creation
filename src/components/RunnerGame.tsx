import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface RunnerGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

export default function RunnerGame({ balance, onBalanceChange }: RunnerGameProps) {
  const [bet, setBet] = useState(100);
  const [multiplier, setMultiplier] = useState(1.00);
  const [isRunning, setIsRunning] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [selectedMultiplier, setSelectedMultiplier] = useState(2);
  const [history, setHistory] = useState<number[]>([1.12, 3.04, 11.40, 1.01, 15.19, 2.47, 1.35, 2.69, 6.74, 1.18, 7.11, 3.49, 1.00]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const crashPointRef = useRef(0);

  const multiplierOptions = [1.1, 1.2, 1.5, 2];

  const startGame = () => {
    if (bet > balance || bet <= 0) return;
    
    setIsRunning(true);
    setIsCrashed(false);
    setCashedOut(false);
    setMultiplier(1.00);
    
    onBalanceChange(balance - bet);
    
    crashPointRef.current = Math.max(1.01, Math.random() * 10);
    
    intervalRef.current = setInterval(() => {
      setMultiplier((prev) => {
        const next = prev + 0.01;
        if (next >= crashPointRef.current) {
          stopGame(true);
          return crashPointRef.current;
        }
        return next;
      });
    }, 100);
  };

  const stopGame = (crashed = false) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsCrashed(crashed);
    
    if (!crashed && !cashedOut) {
      const win = Math.floor(bet * multiplier);
      setWinAmount(win);
      onBalanceChange(balance + win);
      setCashedOut(true);
    }
    
    setHistory(prev => [multiplier, ...prev.slice(0, 12)]);
  };

  const cashOut = () => {
    if (!isRunning || cashedOut) return;
    stopGame(false);
  };

  const autoBet = () => {
    if (bet > balance || bet <= 0) return;
    
    setIsRunning(true);
    setIsCrashed(false);
    setCashedOut(false);
    setMultiplier(1.00);
    
    onBalanceChange(balance - bet);
    
    crashPointRef.current = Math.max(1.01, Math.random() * 10);
    
    intervalRef.current = setInterval(() => {
      setMultiplier((prev) => {
        const next = prev + 0.01;
        if (next >= crashPointRef.current) {
          stopGame(true);
          return crashPointRef.current;
        }
        if (next >= selectedMultiplier) {
          const win = Math.floor(bet * selectedMultiplier);
          setWinAmount(win);
          onBalanceChange(balance - bet + win);
          setCashedOut(true);
          stopGame(false);
          return selectedMultiplier;
        }
        return next;
      });
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-morphism border-game-purple/30 overflow-hidden">
            <div className="relative h-[500px] bg-gradient-to-br from-slate-900/50 via-purple-950/30 to-slate-900/50">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <line 
                  x1="50%" 
                  y1="100%" 
                  x2="50%" 
                  y2="10%" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="4" 
                  strokeDasharray="10,5"
                  opacity={isRunning || isCrashed || cashedOut ? "1" : "0.3"}
                />
              </svg>

              <div 
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-linear"
                style={{
                  bottom: isRunning || cashedOut ? `${Math.min((multiplier - 1) * 40, 85)}%` : isCrashed ? '5%' : '10%',
                  transform: `translateX(-50%) ${isCrashed ? 'rotate(90deg)' : 'rotate(0deg)'}`,
                  transition: isCrashed ? 'all 0.5s ease-out' : 'bottom 0.1s linear, transform 0.5s ease-out',
                  zIndex: 10,
                }}
              >
                <div className={`text-7xl ${isRunning && !isCrashed ? 'animate-runner-bounce' : ''}`}>
                  🏃
                </div>
              </div>

              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
                <div className={`text-6xl font-heading font-bold mb-2 ${
                  isCrashed ? 'text-red-500 animate-pulse' : 
                  cashedOut ? 'text-game-mint' : 
                  'text-foreground'
                }`}>
                  {multiplier.toFixed(2)}x
                </div>
                
                {isCrashed && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-lg px-6 py-2 animate-fade-in">
                    💥 Упал на {multiplier.toFixed(2)}x!
                  </Badge>
                )}
                
                {cashedOut && !isCrashed && (
                  <Badge className="bg-game-mint/20 text-game-mint border-game-mint/50 text-lg px-6 py-2 animate-fade-in">
                    ✅ Выигрыш {winAmount}₽
                  </Badge>
                )}
              </div>

              {!isRunning && !isCrashed && !cashedOut && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center">
                  <div className="text-muted-foreground text-lg">
                    Сделай ставку и начни игру
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="glass-morphism border-game-purple/30 p-6">
            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
              <Icon name="History" size={20} />
              История игр
            </h3>
            <div className="flex flex-wrap gap-2">
              {history.map((mult, idx) => (
                <Badge
                  key={idx}
                  className={`${
                    mult >= 10 ? 'bg-game-purple/20 text-game-purple border-game-purple/50' :
                    mult >= 5 ? 'bg-game-pink/20 text-game-pink border-game-pink/50' :
                    mult >= 2 ? 'bg-game-mint/20 text-game-mint border-game-mint/50' :
                    'bg-red-500/20 text-red-400 border-red-500/50'
                  } font-mono`}
                >
                  {mult.toFixed(2)}x
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-morphism border-game-mint/30 p-6">
            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
              <Icon name="Coins" size={20} className="text-game-mint" />
              Управление ставкой
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Ставка</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bet}
                    onChange={(e) => setBet(Math.max(0, Number(e.target.value)))}
                    className="flex-1 bg-slate-900/50 border border-game-purple/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-game-mint/50 transition-colors"
                    disabled={isRunning}
                  />
                  <Button
                    onClick={() => setBet(Math.min(bet * 2, balance))}
                    variant="outline"
                    className="border-game-purple/30"
                    disabled={isRunning}
                  >
                    x2
                  </Button>
                  <Button
                    onClick={() => setBet(Math.floor(bet / 2))}
                    variant="outline"
                    className="border-game-purple/30"
                    disabled={isRunning}
                  >
                    /2
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 500, 1000].map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => setBet(amount)}
                    variant="outline"
                    size="sm"
                    className="border-game-purple/30"
                    disabled={isRunning}
                  >
                    {amount}₽
                  </Button>
                ))}
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Авто-выход</label>
                <div className="grid grid-cols-4 gap-2">
                  {multiplierOptions.map((mult) => (
                    <Button
                      key={mult}
                      onClick={() => setSelectedMultiplier(mult)}
                      variant={selectedMultiplier === mult ? "default" : "outline"}
                      size="sm"
                      className={selectedMultiplier === mult ? "bg-game-mint hover:bg-game-mint/80" : "border-game-purple/30"}
                    >
                      {mult}x
                    </Button>
                  ))}
                </div>
              </div>

              {!isRunning ? (
                <div className="space-y-2">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-game-purple to-game-pink hover:from-game-purple/80 hover:to-game-pink/80 text-white font-bold py-6"
                    disabled={bet > balance || bet <= 0}
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать игру
                  </Button>
                  <Button
                    onClick={autoBet}
                    className="w-full bg-gradient-to-r from-game-mint to-game-purple hover:from-game-mint/80 hover:to-game-purple/80 text-white font-bold py-6"
                    disabled={bet > balance || bet <= 0}
                  >
                    <Icon name="Zap" size={20} className="mr-2" />
                    Авто-выход {selectedMultiplier}x
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={cashOut}
                  className="w-full bg-gradient-to-r from-game-mint to-cyan-500 hover:from-game-mint/80 hover:to-cyan-500/80 text-white font-bold py-6 animate-pulse-glow"
                  disabled={cashedOut || isCrashed}
                >
                  <Icon name="DollarSign" size={20} className="mr-2" />
                  Забрать {(bet * multiplier).toFixed(0)}₽
                </Button>
              )}

              <div className="text-sm text-muted-foreground text-center pt-2">
                Потенциальный выигрыш: <span className="text-game-mint font-bold">{(bet * multiplier).toFixed(0)}₽</span>
              </div>
            </div>
          </Card>

          <Card className="glass-morphism border-game-purple/30 p-6">
            <h3 className="text-lg font-heading font-bold mb-4">📊 Статистика</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Баланс:</span>
                <span className="font-bold text-game-mint">{balance}₽</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Текущая ставка:</span>
                <span className="font-bold">{bet}₽</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Игр сыграно:</span>
                <span className="font-bold">{history.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}