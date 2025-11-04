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

  const cases = [
    { id: 1, name: 'Бегущий человек', price: 86, rarity: 'legendary', image: '🏃' },
    { id: 2, name: 'Плитки', price: 140, rarity: 'epic', image: '🎫' },
    { id: 3, name: 'Last of us', price: 142, rarity: 'rare', image: '🎮' },
    { id: 4, name: 'Хранилище', price: 49, rarity: 'common', image: '🏔️' },
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
        <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 p-12 border border-primary/30">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzAwZDRmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-heading font-black mb-6 text-glow-cyan">
                CSGORUN
              </h1>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Регистрируйся и наслаждайся!
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                Зарегистрируйся и получи +15% бонуса прямо сейчас.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Тебя ждет атмосфера незабываемых эмоций, любовь к CS2 и крутая компания единомышленников
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-heading text-lg px-8"
                >
                  ВОЙТИ НА САЙТ
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 glow-cyan font-heading text-lg px-8"
                >
                  ЗАРЕГИСТРИРОВАТЬСЯ
                </Button>
              </div>
            </div>

            <div className="absolute top-10 left-10 animate-float">
              <div className="text-8xl opacity-70 rotate-12">🔫</div>
            </div>
            <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-8xl opacity-70 -rotate-12">🔪</div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Gamepad2" className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-heading font-bold">Что внутри</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cases.map((item) => (
                <Card 
                  key={item.id}
                  className="group relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105 hover:glow-cyan bg-card/80 backdrop-blur"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                        {item.image}
                      </div>
                      <Badge className={`absolute top-3 right-3 ${getRarityColor(item.rarity)} text-white border-0`}>
                        {item.price}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-lg">{item.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <Card className="group overflow-hidden border-2 border-border hover:border-primary transition-all cursor-pointer hover:glow-cyan bg-gradient-to-br from-blue-900/30 to-purple-900/30">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold">Лиги</h3>
                  <Icon name="Trophy" className="w-10 h-10 text-primary group-hover:animate-pulse-glow" />
                </div>
                <p className="text-muted-foreground">Соревнуйся с другими игроками и получай призы</p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 border-border hover:border-secondary transition-all cursor-pointer hover:glow-orange bg-gradient-to-br from-green-900/30 to-teal-900/30">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold">Игровые события</h3>
                  <Icon name="Calendar" className="w-10 h-10 text-secondary group-hover:animate-pulse-glow" />
                </div>
                <p className="text-muted-foreground">Участвуй в уникальных событиях и выигрывай</p>
              </CardContent>
            </Card>
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
