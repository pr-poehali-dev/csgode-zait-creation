import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [balance, setBalance] = useState(1500);

  const navigation = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'cases', label: 'Кейсы', icon: 'Package' },
    { id: 'roulette', label: 'Рулетка', icon: 'CircleDot' },
    { id: 'games', label: 'Игры', icon: 'Gamepad2' },
    { id: 'leagues', label: 'Лиги', icon: 'Trophy' },
    { id: 'events', label: 'События', icon: 'Calendar' },
    { id: 'inventory', label: 'Инвентарь', icon: 'Backpack' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  const miniGames = [
    { id: 1, name: 'CRASH', price: '3586.16₽', image: '💥' },
    { id: 2, name: 'DOUBLE', price: '4364.72₽', image: '🎲' },
    { id: 3, name: 'JACKPOT', price: '10.33₽', image: '🎰' },
    { id: 4, name: 'ROULETTE', price: '0.00₽', image: '🎡' },
    { id: 5, name: 'UPGRADE', price: '', image: '⬆️' },
    { id: 6, name: 'КЕЙСБЭТЛ', price: '', image: '⚔️' },
  ];

  const cases = [
    { id: 1, name: 'Бегущий человек', price: '3586.16₽', count: 84, rarity: 'legendary', image: '🏃' },
    { id: 2, name: 'Плитки', price: '4364.72₽', count: 140, rarity: 'epic', image: '🎫' },
    { id: 3, name: 'Jackrun', price: '10.53₽', count: 26, rarity: 'rare', image: '🎯' },
    { id: 4, name: 'Last of us', price: '0.00₽', count: 146, rarity: 'common', image: '🎮' },
    { id: 5, name: 'Upgrade', price: '0.00₽', count: 0, rarity: 'epic', image: '⬆️', badge: 'NEW' },
    { id: 6, name: 'Хранилище', price: '49₽', count: 49, rarity: 'rare', image: '🏔️' },
    { id: 7, name: 'Кейсбатл', price: '0₽', count: 0, rarity: 'common', image: '⚔️' },
  ];

  const weapons = [
    { id: 1, name: 'AWP Dragon Lore', price: 5000, rarity: 'legendary', image: '🔫' },
    { id: 2, name: 'Karambit Fade', price: 3500, rarity: 'legendary', image: '🔪' },
    { id: 3, name: 'AK-47 Fire Serpent', price: 2800, rarity: 'epic', image: '🔥' },
    { id: 4, name: 'M4A4 Howl', price: 4200, rarity: 'legendary', image: '🐺' },
  ];

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      legendary: 'bg-gradient-to-r from-game-orange to-amber-500',
      epic: 'bg-gradient-to-r from-purple-500 to-pink-500',
      rare: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      common: 'bg-gradient-to-r from-gray-500 to-slate-500',
    };
    return colors[rarity] || colors.common;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-dark via-slate-900 to-game-dark">
      <div className="bg-slate-950/80 border-b border-border/30 py-2">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {miniGames.map((game) => (
              <button
                key={game.id}
                className="flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-primary/20 hover:border-primary/50 transition-all hover:scale-105 min-w-[140px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{game.image}</span>
                  <span className="text-sm font-heading font-bold text-foreground">{game.name}</span>
                </div>
                {game.price && <div className="text-xs text-primary font-semibold">{game.price}</div>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className="border-b border-border/50 backdrop-blur-lg bg-card/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-heading font-bold flex items-center gap-2">
                <span className="text-primary text-glow-cyan">CSGO</span>
                <span className="text-secondary">🎃</span>
                <span className="text-foreground">RUN</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {navigation.slice(0, 6).map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.id)}
                  className={activeSection === item.id ? 'glow-cyan' : ''}
                >
                  <Icon name={item.icon as any} className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-4 py-2 text-lg border-primary text-primary glow-cyan">
                💰 {balance.toLocaleString()}₽
              </Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 glow-cyan font-heading">
                    ЗАРЕГИСТРИРОВАТЬСЯ
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-primary/30">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl text-primary text-glow-cyan">
                      Регистрация
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Email" className="bg-muted border-border" />
                    <Input placeholder="Пароль" type="password" className="bg-muted border-border" />
                    <Button className="w-full bg-gradient-to-r from-primary to-cyan-400 glow-cyan">
                      Создать аккаунт
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="border-primary text-primary">
                ВОЙТИ
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="relative overflow-hidden border-2 border-secondary/30 bg-gradient-to-br from-orange-900/40 via-red-900/40 to-orange-800/40 hover:border-secondary transition-all cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative h-[280px] flex items-center justify-between px-8">
                  <div className="z-10">
                    <h2 className="text-3xl font-heading font-black mb-2 text-foreground">Блог CSGORUN</h2>
                    <p className="text-sm text-muted-foreground mb-4">Гайды, лайфхаки и новости киберспорта в нашем<br />новом блоге csgorun.blog</p>
                    <Button className="bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary/90 glow-orange">
                      Блог
                    </Button>
                  </div>
                  <div className="absolute right-8 text-9xl opacity-80 group-hover:scale-110 transition-transform">
                    📰
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-blue-900/40 via-cyan-900/40 to-blue-800/40 hover:border-primary transition-all cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative h-[280px] flex items-center justify-between px-8">
                  <div className="z-10">
                    <h2 className="text-3xl font-heading font-black mb-2 text-foreground">Мой профиль</h2>
                    <p className="text-sm text-muted-foreground mb-4">Управляй своим аккаунтом,<br />отслеживай статистику</p>
                    <Button className="bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 glow-cyan">
                      Профиль
                    </Button>
                  </div>
                  <div className="absolute right-8 text-9xl opacity-80 group-hover:scale-110 transition-transform">
                    👤
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Gamepad2" className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-heading font-bold">Режимы игр</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cases.map((item) => (
                <Card 
                  key={item.id}
                  className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 cursor-pointer hover:scale-[1.02] bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur"
                >
                  <CardContent className="p-0">
                    <div className="relative h-[200px] bg-gradient-to-br from-blue-900/30 via-slate-900/50 to-cyan-900/30 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_50%)]"></div>
                      <div className="text-8xl group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-2xl">
                        {item.image}
                      </div>
                      {item.count !== undefined && (
                        <Badge className="absolute top-3 left-3 bg-slate-950/80 text-primary border border-primary/30 backdrop-blur">
                          • {item.count}
                        </Badge>
                      )}
                      {item.badge && (
                        <Badge className="absolute top-3 right-3 bg-secondary text-white border-0">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 bg-slate-900/50">
                      <h3 className="font-heading font-bold text-xl mb-1 text-foreground">{item.name}</h3>
                      <p className="text-sm text-primary font-semibold">{item.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>


        </div>
      )}

      {activeSection === 'cases' && (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <h1 className="text-4xl font-heading font-bold mb-8 text-glow-cyan">📦 Кейсы</h1>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Все кейсы</TabsTrigger>
              <TabsTrigger value="legendary">Легендарные</TabsTrigger>
              <TabsTrigger value="epic">Эпические</TabsTrigger>
              <TabsTrigger value="rare">Редкие</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cases.map((item) => (
                <Card 
                  key={item.id}
                  className="group relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105 hover:glow-cyan"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {item.image}
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-heading font-semibold text-lg">{item.name}</h3>
                      <Button className="w-full bg-gradient-to-r from-primary to-cyan-400 glow-cyan">
                        Открыть за {item.price}₽
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {activeSection === 'roulette' && (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <h1 className="text-4xl font-heading font-bold mb-8 text-glow-cyan">🎰 Рулетка</h1>
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="aspect-[3/1] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                  <div className="flex gap-4 animate-pulse">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="text-5xl">{weapons[i % weapons.length].image}</div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    x2
                  </Button>
                  <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                    x3
                  </Button>
                  <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">
                    x5
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Input placeholder="Сумма ставки" type="number" className="flex-1" />
                  <Button className="bg-gradient-to-r from-primary to-cyan-400 glow-cyan px-8">
                    Крутить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeSection === 'inventory' && (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <h1 className="text-4xl font-heading font-bold mb-8 text-glow-cyan">🎒 Инвентарь</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {weapons.map((weapon) => (
              <Card 
                key={weapon.id}
                className="group relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105 hover:glow-cyan"
              >
                <CardContent className="p-0">
                  <div className={`relative aspect-square ${getRarityColor(weapon.rarity)} flex items-center justify-center`}>
                    <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                      {weapon.image}
                    </div>
                    <Badge className="absolute top-3 right-3 bg-black/70 text-white border-0">
                      {weapon.price}₽
                    </Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-heading font-semibold">{weapon.name}</h3>
                    <Button variant="outline" className="w-full border-primary text-primary">
                      Продать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'profile' && (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <h1 className="text-4xl font-heading font-bold mb-8 text-glow-cyan">👤 Профиль</h1>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-primary/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold">Player_001</h2>
                    <p className="text-muted-foreground">Уровень 15</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-heading font-bold text-primary">{balance}</div>
                    <div className="text-sm text-muted-foreground">Баланс</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-heading font-bold text-secondary">42</div>
                    <div className="text-sm text-muted-foreground">Побед</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-heading font-bold text-game-purple">28</div>
                    <div className="text-sm text-muted-foreground">Кейсов открыто</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {['games', 'leagues', 'events'].includes(activeSection) && (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🚀</div>
            <h2 className="text-3xl font-heading font-bold mb-4">Скоро здесь появится что-то крутое!</h2>
            <p className="text-muted-foreground text-lg">Раздел "{navigation.find(n => n.id === activeSection)?.label}" в разработке</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;