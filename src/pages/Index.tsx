import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Привет! Я помогу с вопросами о документах и процедурах ТИУ. Что вас интересует?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [...chatMessages, { type: 'user', text: chatInput }];
    setChatMessages(newMessages);
    
    setTimeout(() => {
      const botResponse = getBotResponse(chatInput);
      setChatMessages([...newMessages, { type: 'bot', text: botResponse }]);
    }, 1000);
    
    setChatInput('');
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('справк') || lowerMessage.includes('документ')) {
      return 'Для получения справок обратитесь в деканат или используйте раздел "Документы". Большинство справок можно заказать онлайн.';
    }
    if (lowerMessage.includes('стипенди')) {
      return 'Информацию о стипендиях можно найти в личном кабинете. Выплаты производятся до 25 числа каждого месяца.';
    }
    if (lowerMessage.includes('расписан')) {
      return 'Актуальное расписание доступно в личном кабинете и на официальном сайте ТИУ.';
    }
    return 'Спасибо за вопрос! Для получения подробной информации обратитесь в деканат или воспользуйтесь соответствующими разделами портала.';
  };

  const sections = [
    {
      id: 'personal',
      title: 'Личный кабинет',
      description: 'Управление профилем и персональными данными',
      icon: 'User',
      color: 'bg-blue-50 hover:bg-blue-100',
      features: ['Хранение документов', 'История запросов', 'Личные заметки']
    },
    {
      id: 'bot',
      title: 'Интеллектуальный бот',
      description: 'ИИ-помощник для быстрых ответов',
      icon: 'Bot',
      color: 'bg-purple-50 hover:bg-purple-100',
      features: ['Ответы на вопросы', 'Инструкции', 'Напоминания', 'Снижение нагрузки']
    },
    {
      id: 'documents',
      title: 'Потоки документов',
      description: 'Управление документооборотом',
      icon: 'FileText',
      color: 'bg-green-50 hover:bg-green-100',
      features: ['Оформление', 'Отслеживание', 'Распределение']
    },
    {
      id: 'security',
      title: 'Безопасность',
      description: 'Защита данных и конфиденциальность',
      icon: 'Shield',
      color: 'bg-orange-50 hover:bg-orange-100',
      features: ['Шифрование', 'Контроль доступа', 'Аудит безопасности']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Icon name="FileText" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Документы ТИУ</h1>
                <p className="text-sm text-gray-600">Универсальный студенческий портал</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Icon name="Circle" className="w-2 h-2 mr-2 fill-current" />
                Онлайн
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="User" className="w-4 h-4 mr-2" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Добро пожаловать в портал ТИУ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Управляйте документами, получайте помощь от ИИ-ассистента и отслеживайте 
            академические процессы в одном удобном интерфейсе
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section) => (
            <Card key={section.id} className={`transition-all duration-300 hover:shadow-xl ${section.color} border-0`}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Icon name={section.icon} className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{section.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {section.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Icon name="CheckCircle" className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Перейти в {section.title.toLowerCase()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Статистика портала</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12,847</div>
              <div className="text-gray-600">Активных студентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">89,234</div>
              <div className="text-gray-600">Обработанных документов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Поддержка ИИ-бота</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">Время работы системы</div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Bot */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <Button 
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl animate-pulse"
            size="icon"
          >
            <Icon name="MessageCircle" className="w-6 h-6" />
          </Button>
        )}
        
        {isChatOpen && (
          <Card className="w-80 h-96 shadow-2xl">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Bot" className="w-5 h-5" />
                  <CardTitle className="text-lg">ИИ-Помощник</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-blue-700 h-8 w-8"
                  onClick={() => setIsChatOpen(false)}
                >
                  <Icon name="X" className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-64 p-4">
                <div className="space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        msg.type === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-sm' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Задайте вопрос..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Icon name="Send" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;