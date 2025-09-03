import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const PersonalCabinet = () => {
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState(null);

  const studentInfo = {
    name: "Анна Петровна Смирнова",
    studentId: "ТИУ-2021-001234",
    group: "ИВТ-21-1",
    faculty: "Институт математики и компьютерных наук",
    semester: "6 семестр",
    gpa: 4.2,
    completedCredits: 180,
    totalCredits: 240
  };

  const documents = [
    {
      id: 1,
      name: "Справка об обучении",
      status: "готов",
      date: "15.02.2024",
      type: "academic"
    },
    {
      id: 2,
      name: "Выписка из зачетной ведомости",
      status: "обработка",
      date: "10.02.2024",
      type: "academic"
    },
    {
      id: 3,
      name: "Справка о стипендии",
      status: "готов",
      date: "12.02.2024",
      type: "financial"
    },
    {
      id: 4,
      name: "Заявление на академический отпуск",
      status: "отклонен",
      date: "08.02.2024",
      type: "administrative"
    }
  ];

  const grades = [
    { subject: "Высшая математика", grade: 5, credits: 6, semester: 5 },
    { subject: "Программирование", grade: 5, credits: 4, semester: 5 },
    { subject: "Физика", grade: 4, credits: 5, semester: 5 },
    { subject: "Английский язык", grade: 4, credits: 3, semester: 5 },
    { subject: "История России", grade: 5, credits: 2, semester: 4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'готов':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'обработка':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'отклонен':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return 'GraduationCap';
      case 'financial':
        return 'DollarSign';
      case 'administrative':
        return 'FileText';
      default:
        return 'File';
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
                <h1 className="text-2xl font-bold text-gray-900">Личный кабинет</h1>
                <p className="text-gray-600">Управление профилем и документами</p>
              </div>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarImage src="/api/placeholder/48/48" />
              <AvatarFallback className="bg-primary text-primary-foreground">АС</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Student Profile Card */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/api/placeholder/80/80" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">АС</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{studentInfo.name}</CardTitle>
                  <p className="text-lg text-gray-600">{studentInfo.studentId}</p>
                  <p className="text-gray-600">{studentInfo.group} • {studentInfo.faculty}</p>
                  <p className="text-gray-600">{studentInfo.semester}</p>
                </div>
              </div>
              <Button variant="outline" className="bg-white/50 hover:bg-white/80">
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="Trophy" size={18} className="text-yellow-600" />
                  <span className="font-medium">Средний балл</span>
                </div>
                <p className="text-2xl font-bold text-primary">{studentInfo.gpa}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="BookOpen" size={18} className="text-blue-600" />
                  <span className="font-medium">Прогресс обучения</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{studentInfo.completedCredits} из {studentInfo.totalCredits} кредитов</span>
                    <span>{Math.round((studentInfo.completedCredits / studentInfo.totalCredits) * 100)}%</span>
                  </div>
                  <Progress value={(studentInfo.completedCredits / studentInfo.totalCredits) * 100} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={18} className="text-green-600" />
                  <span className="font-medium">Статус обучения</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Активный студент
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Документы
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Оценки
            </TabsTrigger>
            <TabsTrigger value="scholarship" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Стипендия
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Расписание
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Мои документы</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Подать заявление
              </Button>
            </div>

            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon name={getTypeIcon(doc.type)} size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{doc.name}</h3>
                          <p className="text-gray-600">Подано: {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
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

          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-6">
            <h2 className="text-xl font-semibold">Академические результаты</h2>
            
            <div className="grid gap-4">
              {grades.map((grade, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-blue-50">
                          <Icon name="BookOpen" size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{grade.subject}</h3>
                          <p className="text-gray-600">{grade.credits} кредитов • {grade.semester} семестр</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${grade.grade === 5 ? 'text-green-600' : grade.grade === 4 ? 'text-blue-600' : 'text-yellow-600'}`}>
                          {grade.grade}
                        </div>
                        <p className="text-sm text-gray-500">
                          {grade.grade === 5 ? 'Отлично' : grade.grade === 4 ? 'Хорошо' : 'Удовлетворительно'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scholarship Tab */}
          <TabsContent value="scholarship" className="space-y-6">
            <h2 className="text-xl font-semibold">Стипендия и доходы</h2>
            
            {/* Current Month Scholarship */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-100 rounded-xl">
                      <Icon name="DollarSign" size={32} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Стипендия за март 2024</h3>
                      <p className="text-gray-600">Академическая стипендия</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">12 450 ₽</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">
                      Начислена
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scholarship History */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">История выплат</h3>
              
              {[
                { month: "Февраль 2024", amount: 12450, status: "выплачена", type: "Академическая", date: "25.02.2024" },
                { month: "Январь 2024", amount: 12450, status: "выплачена", type: "Академическая", date: "25.01.2024" },
                { month: "Декабрь 2023", amount: 15600, status: "выплачена", type: "Повышенная", date: "25.12.2023" },
                { month: "Ноябрь 2023", amount: 15600, status: "выплачена", type: "Повышенная", date: "25.11.2023" },
                { month: "Октябрь 2023", amount: 12450, status: "выплачена", type: "Академическая", date: "25.10.2023" }
              ].map((payment, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-blue-50">
                          <Icon name="Wallet" size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">{payment.month}</h4>
                          <p className="text-gray-600">{payment.type} стипендия • {payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold text-gray-900">{payment.amount.toLocaleString()} ₽</p>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Scholarship Statistics */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Статистика стипендий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Icon name="TrendingUp" size={32} className="mx-auto text-blue-600 mb-2" />
                    <p className="text-2xl font-bold text-blue-600">68 850 ₽</p>
                    <p className="text-gray-600">За учебный год</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Icon name="Award" size={32} className="mx-auto text-purple-600 mb-2" />
                    <p className="text-2xl font-bold text-purple-600">3 месяца</p>
                    <p className="text-gray-600">Повышенная стипендия</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Icon name="Calendar" size={32} className="mx-auto text-green-600 mb-2" />
                    <p className="text-2xl font-bold text-green-600">25 числа</p>
                    <p className="text-gray-600">Дата выплаты</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-xl font-semibold">Расписание занятий</h2>
            
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Icon name="Calendar" size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Расписание на неделю</h3>
                  <p className="text-gray-600 mb-6">Здесь будет отображаться ваше расписание занятий</p>
                  <Button variant="outline">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать расписание
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PersonalCabinet;