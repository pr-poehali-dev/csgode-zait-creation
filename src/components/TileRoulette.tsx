import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TileRouletteProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

interface Tile {
  id: number;
  multiplier: number;
  type: 'blue' | 'mint' | 'orange';
  icon: string;
}

interface Bet {
  type: 'blue' | 'mint' | 'orange';
  amount: number;
}

export default function TileRoulette({ balance, onBalanceChange }: TileRouletteProps) {
  const [bet, setBet] = useState(100);
  const [bets, setBets] = useState<Bet[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winningTile, setWinningTile] = useState<Tile | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [history, setHistory] = useState<Tile[]>([]);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const tiles: Tile[] = [
    { id: 1, multiplier: 2, type: 'blue', icon: '🔷' },
    { id: 2, multiplier: 14, type: 'orange', icon: '🏃' },
    { id: 3, multiplier: 2, type: 'mint', icon: '💎' },
    { id: 4, multiplier: 2, type: 'blue', icon: '🔷' },
    { id: 5, multiplier: 2, type: 'mint', icon: '💎' },
    { id: 6, multiplier: 2, type: 'blue', icon: '🔷' },
    { id: 7, multiplier: 2, type: 'mint', icon: '💎' },
    { id: 8, multiplier: 2, type: 'blue', icon: '🔷' },
    { id: 9, multiplier: 2, type: 'mint', icon: '💎' },
    { id: 10, multiplier: 2, type: 'blue', icon: '🔷' },
    { id: 11, multiplier: 2, type: 'mint', icon: '💎' },
    { id: 12, multiplier: 2, type: 'blue', icon: '🔷' },
    { id: 13, multiplier: 2, type: 'mint', icon: '💎' },
    { id: 14, multiplier: 2, type: 'blue', icon: '🔷' },
    { id: 15, multiplier: 2, type: 'mint', icon: '💎' },
  ];

  const getTileColor = (type: string) => {
    switch (type) {
      case 'blue': return 'bg-blue-600 border-blue-400';
      case 'mint': return 'bg-game-mint border-mint-400';
      case 'orange': return 'bg-orange-600 border-orange-400';
      default: return 'bg-blue-600 border-blue-400';
    }
  };

  const placeBet = (type: 'blue' | 'mint' | 'orange') => {
    if (bet > balance || bet <= 0 || isSpinning) return;
    
    const existingBet = bets.find(b => b.type === type);
    if (existingBet) {
      setBets(bets.map(b => b.type === type ? { ...b, amount: b.amount + bet } : b));
    } else {
      setBets([...bets, { type, amount: bet }]);
    }
    
    onBalanceChange(balance - bet);
  };

  const getTotalBet = () => {
    return bets.reduce((sum, b) => sum + b.amount, 0);
  };

  const getBetAmount = (type: 'blue' | 'mint' | 'orange') => {
    return bets.find(b => b.type === type)?.amount || 0;
  };

  const startSpin = () => {
    if (bets.length === 0 || isSpinning) return;
    
    setIsSpinning(true);
    setWinningTile(null);
    setCountdown(7);

    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
          }
          performSpin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const performSpin = () => {
    const random = Math.random() * 100;
    let selectedTile: Tile;
    
    if (random < 5) {
      selectedTile = tiles[1];
    } else if (random < 52.5) {
      const blueTiles = tiles.filter(t => t.type === 'blue');
      selectedTile = blueTiles[Math.floor(Math.random() * blueTiles.length)];
    } else {
      const mintTiles = tiles.filter(t => t.type === 'mint');
      selectedTile = mintTiles[Math.floor(Math.random() * mintTiles.length)];
    }

    const tileIndex = tiles.findIndex(t => t.id === selectedTile.id);
    const degreesPerTile = 360 / tiles.length;
    const targetRotation = 360 * 5 + (tileIndex * degreesPerTile) + (degreesPerTile / 2);
    
    setRotation(targetRotation);
    
    setTimeout(() => {
      setWinningTile(selectedTile);
      setHistory(prev => [selectedTile, ...prev.slice(0, 19)]);
      
      const winningBet = bets.find(b => b.type === selectedTile.type);
      if (winningBet) {
        const winAmount = winningBet.amount * selectedTile.multiplier;
        onBalanceChange(balance + winAmount);
      }
      
      setTimeout(() => {
        setIsSpinning(false);
        setBets([]);
        setRotation(0);
      }, 3000);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-morphism border-game-purple/30 overflow-hidden">
            <div className="relative h-[500px] bg-gradient-to-br from-slate-900/50 via-purple-950/30 to-slate-900/50 flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-center mb-8">
                  {countdown > 0 ? (
                    <div>
                      <div className="text-6xl font-heading font-bold text-game-mint mb-2">
                        {countdown.toFixed(1)}s
                      </div>
                      <div className="text-sm text-muted-foreground">До начала раунда</div>
                    </div>
                  ) : isSpinning ? (
                    <div className="text-xl text-muted-foreground">Вращение...</div>
                  ) : (
                    <div className="text-xl text-muted-foreground">Сделайте ставку</div>
                  )}
                </div>

                <div className="relative">
                  <div 
                    className="relative w-[400px] h-[200px]"
                    style={{ perspective: '1000px' }}
                  >
                    <div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[450px] h-[150px] transition-transform duration-[5000ms] ease-out"
                      style={{ 
                        transform: `translateX(-50%) rotateZ(${rotation}deg)`,
                        transformOrigin: 'center 200px'
                      }}
                    >
                      {tiles.map((tile, index) => {
                        const angle = (360 / tiles.length) * index;
                        const radius = 200;
                        const x = Math.sin((angle * Math.PI) / 180) * radius;
                        const y = -Math.cos((angle * Math.PI) / 180) * radius;
                        
                        return (
                          <div
                            key={tile.id}
                            className={`absolute w-16 h-16 rounded-xl ${getTileColor(tile.type)} border-2 flex flex-col items-center justify-center shadow-lg transition-all`}
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(100% + ${y}px)`,
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <span className="text-2xl">{tile.icon}</span>
                            <span className="text-xs font-bold text-white">{tile.multiplier}x</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-game-mint drop-shadow-lg"></div>
                  </div>
                </div>

                {winningTile && (
                  <div className="mt-8 text-center animate-fade-in">
                    <Badge className="bg-game-mint/20 text-game-mint border-game-mint/50 text-xl px-8 py-3">
                      🎉 Выпало {winningTile.icon} {winningTile.multiplier}x
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="glass-morphism border-game-purple/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-bold flex items-center gap-2">
                <Icon name="History" size={20} />
                История ({history.length})
              </h3>
              <div className="text-sm text-muted-foreground">
                Банк: <span className="text-game-mint font-bold">{getTotalBet()}₽</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((tile, idx) => (
                <div
                  key={idx}
                  className={`w-14 h-14 rounded-lg ${getTileColor(tile.type)} border-2 flex flex-col items-center justify-center`}
                >
                  <span className="text-xl">{tile.icon}</span>
                  <span className="text-xs font-bold text-white">{tile.multiplier}x</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-morphism border-game-purple/30 p-6">
            <h3 className="text-lg font-heading font-bold mb-4">Ставки игроков</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🔷</div>
                <div className="text-sm text-muted-foreground">2X</div>
                <div className="text-lg font-bold text-blue-400">{getBetAmount('blue')}₽</div>
              </div>
              <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🏃</div>
                <div className="text-sm text-muted-foreground">14X</div>
                <div className="text-lg font-bold text-orange-400">{getBetAmount('orange')}₽</div>
              </div>
              <div className="bg-game-mint/20 border border-game-mint/30 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-sm text-muted-foreground">2X</div>
                <div className="text-lg font-bold text-game-mint">{getBetAmount('mint')}₽</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-morphism border-game-mint/30 p-6">
            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
              <Icon name="Coins" size={20} className="text-game-mint" />
              Сделать ставку
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Размер ставки</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bet}
                    onChange={(e) => setBet(Math.max(0, Number(e.target.value)))}
                    className="flex-1 bg-slate-900/50 border border-game-purple/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-game-mint/50 transition-colors"
                    disabled={isSpinning || countdown > 0}
                  />
                  <Button
                    onClick={() => setBet(Math.min(bet * 2, balance))}
                    variant="outline"
                    className="border-game-purple/30"
                    disabled={isSpinning || countdown > 0}
                  >
                    x2
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
                    disabled={isSpinning || countdown > 0}
                  >
                    {amount}₽
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => placeBet('blue')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4"
                  disabled={bet > balance || bet <= 0 || isSpinning || countdown > 0}
                >
                  🔷 Синий 2x
                </Button>
                <Button
                  onClick={() => placeBet('orange')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4"
                  disabled={bet > balance || bet <= 0 || isSpinning || countdown > 0}
                >
                  🏃 Оранжевый 14x
                </Button>
                <Button
                  onClick={() => placeBet('mint')}
                  className="w-full bg-game-mint hover:bg-game-mint/80 text-white font-bold py-4"
                  disabled={bet > balance || bet <= 0 || isSpinning || countdown > 0}
                >
                  💎 Зелёный 2x
                </Button>
              </div>

              {bets.length > 0 && !isSpinning && countdown === 0 && (
                <Button
                  onClick={startSpin}
                  className="w-full bg-gradient-to-r from-game-purple to-game-pink hover:from-game-purple/80 hover:to-game-pink/80 text-white font-bold py-6 animate-pulse-glow"
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  Запустить ({getTotalBet()}₽)
                </Button>
              )}
            </div>
          </Card>

          <Card className="glass-morphism border-game-purple/30 p-6">
            <h3 className="text-lg font-heading font-bold mb-4">💰 Ваши ставки</h3>
            {bets.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                Ставок нет
              </div>
            ) : (
              <div className="space-y-2">
                {bets.map((bet, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-900/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded ${getTileColor(bet.type)} flex items-center justify-center text-sm`}>
                        {bet.type === 'blue' ? '🔷' : bet.type === 'orange' ? '🏃' : '💎'}
                      </div>
                      <span className="font-medium capitalize">{bet.type}</span>
                    </div>
                    <span className="font-bold text-game-mint">{bet.amount}₽</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="glass-morphism border-game-purple/30 p-6">
            <h3 className="text-lg font-heading font-bold mb-4">📊 Статистика</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Баланс:</span>
                <span className="font-bold text-game-mint">{balance}₽</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">В игре:</span>
                <span className="font-bold">{getTotalBet()}₽</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Раундов:</span>
                <span className="font-bold">{history.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
