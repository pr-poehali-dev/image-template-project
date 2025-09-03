import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Security = () => {
  const navigate = useNavigate();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const securityEvents = [
    {
      id: 1,
      type: "login",
      description: "Вход в систему",
      timestamp: "2024-02-18 14:30:15",
      location: "Тюмень, Россия",
      device: "Chrome на Windows",
      status: "success"
    },
    {
      id: 2,
      type: "password_change",
      description: "Смена пароля",
      timestamp: "2024-02-15 10:15:42",
      location: "Тюмень, Россия", 
      device: "Firefox на Windows",
      status: "success"
    },
    {
      id: 3,
      type: "failed_login",
      description: "Неудачная попытка входа",
      timestamp: "2024-02-14 16:22:18",
      location: "Москва, Россия",
      device: "Safari на iPhone",
      status: "failed"
    },
    {
      id: 4,
      type: "document_access",
      description: "Доступ к документам",
      timestamp: "2024-02-14 09:45:33",
      location: "Тюмень, Россия",
      device: "Chrome на Windows",
      status: "success"
    }
  ];

  const sessions = [
    {
      id: 1,
      device: "Chrome на Windows",
      location: "Тюмень, Россия",
      lastActive: "Сейчас активна",
      current: true
    },
    {
      id: 2,
      device: "Safari на iPhone",
      location: "Тюмень, Россия",
      lastActive: "2 часа назад",
      current: false
    },
    {
      id: 3,
      device: "Firefox на Windows",
      location: "Тюмень, Россия",
      lastActive: "1 день назад",
      current: false
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login':
        return 'LogIn';
      case 'password_change':
        return 'Key';
      case 'failed_login':
        return 'AlertTriangle';
      case 'document_access':
        return 'FileText';
      default:
        return 'Activity';
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Успешно</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Неудачно</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Предупреждение</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Неизвестно</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-white/50"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Безопасность</h1>
                <p className="text-gray-600">Управление настройками безопасности</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Icon name="Shield" size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Уровень безопасности</h3>
                  <p className="text-lg font-bold text-green-600">Высокий</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Icon name="Activity" size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Активных сессий</h3>
                  <p className="text-lg font-bold text-blue-600">{sessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Icon name="AlertTriangle" size={24} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium">Подозрительная активность</h3>
                  <p className="text-lg font-bold text-yellow-600">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Настройки
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Активность
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Сессии
            </TabsTrigger>
          </TabsList>

          {/* Security Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              {/* Password Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Key" size={20} />
                    Пароль и аутентификация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Текущий пароль</Label>
                      <Input type="password" placeholder="Введите текущий пароль" />
                    </div>
                    <div className="space-y-2">
                      <Label>Новый пароль</Label>
                      <Input type="password" placeholder="Введите новый пароль" />
                    </div>
                    <div className="space-y-2">
                      <Label>Подтверждение пароля</Label>
                      <Input type="password" placeholder="Подтвердите новый пароль" />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Изменить пароль
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Двухфакторная аутентификация</h4>
                      <p className="text-sm text-gray-600">
                        Дополнительный уровень защиты для вашего аккаунта
                      </p>
                    </div>
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Bell" size={20} />
                    Уведомления безопасности
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Email уведомления</h4>
                      <p className="text-sm text-gray-600">
                        Получать уведомления о входах и изменениях
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">SMS уведомления</h4>
                      <p className="text-sm text-gray-600">
                        Получать SMS при подозрительной активности
                      </p>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Eye" size={20} />
                    Конфиденциальность
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full bg-white/50 hover:bg-white/80">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать мои данные
                  </Button>
                  
                  <Button variant="destructive" className="w-full">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить аккаунт
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Activity */}
          <TabsContent value="activity" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">События безопасности</h2>
              <Button variant="outline" className="bg-white/50 hover:bg-white/80">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
            </div>

            <Alert className="bg-yellow-50 border-yellow-200">
              <Icon name="AlertTriangle" size={16} className="text-yellow-600" />
              <AlertTitle>Подозрительная активность</AlertTitle>
              <AlertDescription>
                Обнаружена неудачная попытка входа из Москвы. Если это были не вы, немедленно смените пароль.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              {securityEvents.map((event) => (
                <Card key={event.id} className="bg-white/80 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg bg-gray-100 ${getEventColor(event.status)}`}>
                          <Icon name={getEventIcon(event.type)} size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">{event.description}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{event.timestamp}</span>
                            <span>•</span>
                            <span>{event.location}</span>
                            <span>•</span>
                            <span>{event.device}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(event.status)}
                        <Button variant="ghost" size="icon">
                          <Icon name="MoreHorizontal" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Sessions */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Активные сессии</h2>
              <Button variant="outline" className="bg-white/50 hover:bg-white/80">
                <Icon name="LogOut" size={16} className="mr-2" />
                Завершить все сессии
              </Button>
            </div>

            <div className="grid gap-4">
              {sessions.map((session) => (
                <Card key={session.id} className="bg-white/80 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <Icon name="Monitor" size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {session.device}
                            {session.current && (
                              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                Текущая
                              </Badge>
                            )}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{session.location}</span>
                            <span>•</span>
                            <span>{session.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/80">
                          <Icon name="LogOut" size={14} className="mr-1" />
                          Завершить
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Security;