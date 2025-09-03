import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const DocumentFlows = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const documentTemplates = [
    {
      id: 1,
      name: "Справка об обучении",
      description: "Официальная справка о том, что вы являетесь студентом ТИУ",
      category: "academic",
      processingTime: "1-2 рабочих дня",
      required: ["Заявление", "Копия паспорта"],
      icon: "GraduationCap"
    },
    {
      id: 2,
      name: "Академическая справка",
      description: "Справка с перечнем изученных дисциплин и оценок",
      category: "academic", 
      processingTime: "3-5 рабочих дней",
      required: ["Заявление", "Копия паспорта", "Копия зачетной книжки"],
      icon: "BookOpen"
    },
    {
      id: 3,
      name: "Справка о стипендии",
      description: "Справка о размере получаемой стипендии",
      category: "financial",
      processingTime: "2-3 рабочих дня",
      required: ["Заявление", "Справка из банка"],
      icon: "DollarSign"
    },
    {
      id: 4,
      name: "Заявление на академический отпуск",
      description: "Оформление академического отпуска по уважительным причинам",
      category: "administrative",
      processingTime: "5-10 рабочих дней",
      required: ["Заявление", "Медицинская справка", "Согласие родителей"],
      icon: "Clock"
    },
    {
      id: 5,
      name: "Справка для военкомата",
      description: "Справка-вызов для предоставления в военный комиссариат",
      category: "military",
      processingTime: "1 рабочий день",
      required: ["Заявление", "Повестка из военкомата"],
      icon: "Shield"
    },
    {
      id: 6,
      name: "Дубликат студенческого билета",
      description: "Восстановление утраченного студенческого билета",
      category: "administrative",
      processingTime: "7-10 рабочих дней",
      required: ["Заявление", "Объяснительная записка", "Фото 3x4"],
      icon: "CreditCard"
    }
  ];

  const activeRequests = [
    {
      id: 1,
      name: "Справка об обучении",
      status: "processing",
      submittedDate: "15.02.2024",
      expectedDate: "17.02.2024",
      currentStep: "Обработка в деканате",
      progress: 75
    },
    {
      id: 2,
      name: "Академическая справка",
      status: "approved",
      submittedDate: "10.02.2024",
      expectedDate: "15.02.2024",
      currentStep: "Готово к выдаче",
      progress: 100
    },
    {
      id: 3,
      name: "Справка для военкомата",
      status: "waiting",
      submittedDate: "18.02.2024",
      expectedDate: "19.02.2024",
      currentStep: "Ожидание проверки",
      progress: 25
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'financial':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'administrative':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'military':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'processing':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'В обработке' };
      case 'approved':
        return { color: 'bg-green-100 text-green-800 border-green-200', text: 'Готов' };
      case 'waiting':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Ожидание' };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'Неизвестно' };
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'academic': return 'Академические';
      case 'financial': return 'Финансовые';
      case 'administrative': return 'Административные';
      case 'military': return 'Военкомат';
      default: return 'Прочие';
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
                <h1 className="text-2xl font-bold text-gray-900">Потоки документов</h1>
                <p className="text-gray-600">Подача и отслеживание документов</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Подать документы
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Мои заявки
            </TabsTrigger>
          </TabsList>

          {/* Document Templates */}
          <TabsContent value="templates" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Поиск документов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border-white/20"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-white/80 backdrop-blur-sm border-white/20">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="academic">Академические</SelectItem>
                  <SelectItem value="financial">Финансовые</SelectItem>
                  <SelectItem value="administrative">Административные</SelectItem>
                  <SelectItem value="military">Военкомат</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Document Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documentTemplates.filter(doc => 
                statusFilter === 'all' || doc.category === statusFilter
              ).map((template) => (
                <Card key={template.id} className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon name={template.icon} size={24} className="text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge className={getCategoryColor(template.category)} variant="outline">
                            {getCategoryName(template.category)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{template.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-600">Срок обработки: {template.processingTime}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon name="FileCheck" size={16} className="text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Необходимые документы:</span>
                        </div>
                        <ul className="text-sm text-gray-600 ml-6">
                          {template.required.map((req, index) => (
                            <li key={index} className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 justify-center">
                      <Icon name="FileText" size={16} className="mr-2" />
                      Подать заявление
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Requests */}
          <TabsContent value="active" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Активные заявки</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white/50">
                  {activeRequests.length} заявок
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {activeRequests.map((request) => {
                const statusInfo = getStatusInfo(request.status);
                return (
                  <Card key={request.id} className="bg-white/80 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{request.name}</h3>
                          <p className="text-gray-600">Подано: {request.submittedDate}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={statusInfo.color}>
                            {statusInfo.text}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            Ожидаемо: {request.expectedDate}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{request.currentStep}</span>
                          <span className="text-gray-600">{request.progress}%</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${request.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 justify-start">
                        <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/80 justify-center">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Подробнее
                        </Button>
                        {request.status === 'approved' && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90 justify-center">
                            <Icon name="Download" size={14} className="mr-1" />
                            Скачать
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentFlows;