import React, { useState, useId } from 'react';
import { PetSpecies, PetSize, BookingData } from '../types';
import { SERVICES, ADDONS } from '../data/petShopData';
import { PawIcon } from './PawIcon';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Copy,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  AlertCircle,
  Sparkles,
  Info,
  Check,
  Dog,
  Cat,
} from 'lucide-react';

interface BookingWizardProps {
  initialServiceId?: string;
  onServiceChosen?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({ initialServiceId }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  // Booking state
  const [booking, setBooking] = useState<BookingData>({
    petName: '',
    petSpecies: 'dog',
    petSize: 'small',
    petNotes: '',
    tutorName: '',
    tutorPhone: '',
    mainServiceId: initialServiceId || 'banho',
    selectedAddonIds: [],
    date: '',
    timeSlot: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Post-booking action state
  const [isCopied, setIsCopied] = useState(false);
  const [appointmentCode, setAppointmentCode] = useState<string>('');

  // Handle prop update if changed
  React.useEffect(() => {
    if (initialServiceId) {
      setBooking((prev) => ({ ...prev, mainServiceId: initialServiceId }));
    }
  }, [initialServiceId]);

  // Formatter for Brazilian Phone: (XX) XXXXX-XXXX
  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : '';
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setBooking({ ...booking, tutorPhone: formatted });
    if (errors.tutorPhone) {
      setErrors({ ...errors, tutorPhone: '' });
    }
  };

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!booking.petName.trim()) {
      newErrors.petName = 'Por favor, informe o nome do seu pet.';
    }
    if (!booking.tutorName.trim()) {
      newErrors.tutorName = 'Por favor, informe o seu nome (tutor).';
    }
    const cleanDigits = booking.tutorPhone.replace(/\D/g, '');
    if (!cleanDigits) {
      newErrors.tutorPhone = 'Por favor, informe seu WhatsApp para contato.';
    } else if (cleanDigits.length < 10) {
      newErrors.tutorPhone = 'Número incompleto. Digite o DDD + número (ex: 11 98888-7777).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!booking.mainServiceId) {
      newErrors.mainService = 'Por favor, selecione ao menos um serviço principal.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!booking.date) {
      newErrors.date = 'Por favor, selecione a data do agendamento.';
    }
    if (!booking.timeSlot) {
      newErrors.timeSlot = 'Por favor, selecione o horário desejado.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3) {
      if (!validateStep3()) return;
      // Generate a friendly appointment ID
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setAppointmentCode(`FF-${randomId}`);
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const jumpToStep = (target: number) => {
    if (target < currentStep) {
      setCurrentStep(target);
    } else if (target === 2 && validateStep1()) {
      setCurrentStep(2);
    } else if (target === 3 && validateStep1() && validateStep2()) {
      setCurrentStep(3);
    }
  };

  // Price Calculation
  const selectedServiceObj = SERVICES.find((s) => s.id === booking.mainServiceId) || SERVICES[0];
  const baseServicePrice = selectedServiceObj ? selectedServiceObj.prices[booking.petSize] : 0;
  
  const addonsTotal = booking.selectedAddonIds.reduce((acc, addonId) => {
    const item = ADDONS.find((a) => a.id === addonId);
    return acc + (item ? item.price : 0);
  }, 0);

  const estimatedTotal = baseServicePrice + addonsTotal;

  // Toggle Addon
  const toggleAddon = (addonId: string) => {
    setBooking((prev) => {
      const exists = prev.selectedAddonIds.includes(addonId);
      return {
        ...prev,
        selectedAddonIds: exists
          ? prev.selectedAddonIds.filter((id) => id !== addonId)
          : [...prev.selectedAddonIds, addonId],
      };
    });
  };

  // Calendar dates generation (Next 14 days, skipping Sundays or showing as closed)
  const getUpcomingDays = () => {
    const days: { dateStr: string; dayName: string; dayNumber: number; monthName: string; isSunday: boolean }[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isSunday = d.getDay() === 0;
      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      days.push({
        dateStr,
        dayName: dayNames[d.getDay()],
        dayNumber: d.getDate(),
        monthName: monthNames[d.getMonth()],
        isSunday,
      });
    }
    return days;
  };

  const upcomingDays = React.useMemo(() => getUpcomingDays(), []);

  // Time Slots
  const morningSlots = [
    { time: '08:30', status: 'Disponível', spots: 2 },
    { time: '09:30', status: 'Disponível', spots: 3 },
    { time: '10:30', status: 'Poucas vagas', spots: 1 },
    { time: '11:30', status: 'Disponível', spots: 2 },
  ];

  const afternoonSlots = [
    { time: '13:30', status: 'Disponível', spots: 3 },
    { time: '14:30', status: 'Poucas vagas', spots: 1 },
    { time: '15:30', status: 'Disponível', spots: 2 },
    { time: '16:30', status: 'Disponível', spots: 2 },
    { time: '17:30', status: 'Poucas vagas', spots: 1 },
  ];

  // Format date readable
  const getFormattedDateLong = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${weekdays[dateObj.getDay()]}, ${day} de ${months[dateObj.getMonth()]} de ${year}`;
  };

  // Build formatted summary text
  const generateSummaryText = () => {
    const speciesLabel = booking.petSpecies === 'dog' ? 'Cão' : 'Gato';
    const sizeLabel = booking.petSize === 'small' ? 'Pequeno (até 10kg)' : booking.petSize === 'medium' ? 'Médio (10 a 25kg)' : 'Grande (+25kg)';
    const selectedAddonsList = booking.selectedAddonIds
      .map((id) => ADDONS.find((a) => a.id === id))
      .filter(Boolean)
      .map((a) => `• ${a?.name} (+ R$ ${a?.price.toFixed(2)})`)
      .join('\n');

    return `🐾 *AGENDAMENTO FOCINHO FELIZ* 🐾
Código: #${appointmentCode || 'FF-DEMO'}

🐶 *Pet:* ${booking.petName} (${speciesLabel} • Porte ${sizeLabel})
👤 *Tutor(a):* ${booking.tutorName}
📱 *WhatsApp:* ${booking.tutorPhone}

📅 *Data:* ${getFormattedDateLong(booking.date)}
⏰ *Horário:* ${booking.timeSlot}

✂️ *Serviço Principal:*
• ${selectedServiceObj.name} (R$ ${baseServicePrice.toFixed(2)})
${selectedAddonsList ? `\n✨ *Cuidados Adicionais:*\n${selectedAddonsList}\n` : ''}
💰 *Valor Estimado:* R$ ${estimatedTotal.toFixed(2)}
*(Pagamento no balcão da loja física após o serviço)*

${booking.petNotes ? `📝 *Observações:* ${booking.petNotes}\n` : ''}
📍 *Local:* Focinho Feliz Pet Shop (Demonstrativo)
*Aviso:* Todos os dados e agendamentos são para demonstração no site.`;
  };

  // Copy to clipboard
  const handleCopySummary = async () => {
    const text = generateSummaryText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3500);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3500);
    }
  };

  // Open WhatsApp directly using the tutor's provided phone number
  const handleOpenWhatsApp = () => {
    const cleanNumber = booking.tutorPhone.replace(/\D/g, '');
    const phoneParam = cleanNumber.startsWith('55') ? cleanNumber : `55${cleanNumber}`;
    const textParam = encodeURIComponent(generateSummaryText());
    const waUrl = `https://wa.me/${phoneParam}?text=${textParam}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Reset for a new pet
  const handleReset = () => {
    setBooking({
      petName: '',
      petSpecies: 'dog',
      petSize: 'small',
      petNotes: '',
      tutorName: '',
      tutorPhone: '',
      mainServiceId: 'banho',
      selectedAddonIds: [],
      date: '',
      timeSlot: '',
    });
    setCurrentStep(1);
    setAppointmentCode('');
    setIsCopied(false);
  };

  return (
    <section id="agendamento" className="py-12 lg:py-18 bg-[#F8FAFC] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F5C66] bg-[#EDF5F6] px-3.5 py-1.5 rounded-lg mb-3">
            <PawIcon size={14} className="text-[#1F5C66]" />
            <span>ASSISTENTE VISUAL DE AGENDAMENTO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight text-balance">
            Agende o banho e tosa em 4 etapas simples
          </h2>
          <p className="mt-2.5 text-base text-slate-600">
            Descubra o valor estimado exato para o porte do seu pet, escolha o dia perfeito e receba o resumo instantâneo.
          </p>
        </div>

        {/* Wizard Main Container with Teal Accent Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* Top Progress Track */}
          <div className="bg-[#1F5C66] text-white px-5 sm:px-8 pt-6 pb-7">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-3">
              <span className="text-[#F6D55C] flex items-center gap-1.5">
                <PawIcon size={16} />
                <span>Etapa {currentStep} de {totalSteps}</span>
              </span>
              <span className="text-white/80">
                {currentStep === 1 && 'Dados do Pet & Tutor'}
                {currentStep === 2 && 'Escolha de Serviços'}
                {currentStep === 3 && 'Data & Horário'}
                {currentStep === 4 && 'Resumo & Confirmação'}
              </span>
            </div>

            {/* Stepper Buttons for Navigation */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                { step: 1, label: '1. Pet' },
                { step: 2, label: '2. Serviço' },
                { step: 3, label: '3. Data' },
                { step: 4, label: '4. Resumo' },
              ].map((item) => {
                const isCompleted = item.step < currentStep;
                const isCurrent = item.step === currentStep;

                return (
                  <button
                    key={item.step}
                    onClick={() => jumpToStep(item.step)}
                    disabled={item.step > currentStep}
                    className={`h-2.5 sm:h-3 rounded-full transition-all relative cursor-pointer ${
                      isCompleted
                        ? 'bg-[#F6D55C] hover:opacity-90'
                        : isCurrent
                        ? 'bg-white ring-2 ring-[#F6D55C] ring-offset-2 ring-offset-[#1F5C66]'
                        : 'bg-white/25 cursor-not-allowed'
                    }`}
                    title={item.label}
                    aria-label={`Ir para ${item.label}`}
                  />
                );
              })}
            </div>

            {/* Step Labels row on desktop */}
            <div className="hidden sm:grid grid-cols-4 gap-3 mt-3 text-xs text-center text-white/75 font-medium">
              <span className={currentStep === 1 ? 'text-white font-bold' : ''}>1. Pet & Tutor</span>
              <span className={currentStep === 2 ? 'text-white font-bold' : ''}>2. Serviços & Porte</span>
              <span className={currentStep === 3 ? 'text-white font-bold' : ''}>3. Data & Horário</span>
              <span className={currentStep === 4 ? 'text-white font-bold' : ''}>4. Resumo & Envio</span>
            </div>
          </div>

          {/* Wizard Content Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            
            {/* ETAPA 1: DADOS DO PET & TUTOR */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                    <span>Conte-nos sobre seu companheiro</span>
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Essas informações definem o tempo de secagem, produtos ideais e o valor estimado.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome do Pet */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Nome do Pet <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Pipoca, Thor, Mel, Luna..."
                      value={booking.petName}
                      onChange={(e) => {
                        setBooking({ ...booking, petName: e.target.value });
                        if (errors.petName) setErrors({ ...errors, petName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1F5C66] transition-colors ${
                        errors.petName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                      }`}
                    />
                    {errors.petName && (
                      <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.petName}</span>
                      </p>
                    )}
                  </div>

                  {/* Espécie: Cão ou Gato */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Espécie do Pet <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBooking({ ...booking, petSpecies: 'dog' })}
                        className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          booking.petSpecies === 'dog'
                            ? 'bg-[#EDF5F6] border-[#1F5C66] text-[#1F5C66] shadow-xs ring-1 ring-[#1F5C66]'
                            : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Dog className="w-5 h-5 text-[#1F5C66]" />
                        <span>Cãozinho</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBooking({ ...booking, petSpecies: 'cat' })}
                        className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          booking.petSpecies === 'cat'
                            ? 'bg-[#EDF5F6] border-[#1F5C66] text-[#1F5C66] shadow-xs ring-1 ring-[#1F5C66]'
                            : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Cat className="w-5 h-5 text-[#1F5C66]" />
                        <span>Gatinho</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Porte do Pet */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Porte do Pet <span className="text-rose-500">*</span>{' '}
                    <span className="text-xs font-normal text-slate-500">
                      (Define a quantidade de produto e o tempo de dedicação)
                    </span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {[
                      {
                        size: 'small' as PetSize,
                        title: 'Porte Pequeno',
                        weight: 'Até 10 kg',
                        examples: 'Shih-tzu, Poodle toy, Yorkshire, Gatos',
                      },
                      {
                        size: 'medium' as PetSize,
                        title: 'Porte Médio',
                        weight: '10 kg a 25 kg',
                        examples: 'Beagle, Cocker, Buldogue Francês',
                      },
                      {
                        size: 'large' as PetSize,
                        title: 'Porte Grande',
                        weight: 'Acima de 25 kg',
                        examples: 'Golden, Labrador, Pastor Alemão',
                      },
                    ].map((item) => {
                      const isSelected = booking.petSize === item.size;
                      return (
                        <div
                          key={item.size}
                          onClick={() => setBooking({ ...booking, petSize: item.size })}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#FFFDF0] border-[#F6D55C] ring-2 ring-[#F6D55C] shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-slate-900 text-sm font-display">
                              {item.title}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#EDF5F6] text-[#1F5C66]">
                              {item.weight}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-snug">
                            {item.examples}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dados do Tutor */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-base font-bold text-slate-800 mb-3">
                    Dados do Tutor para Contato e WhatsApp
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1.5">
                        Seu Nome Completo <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Juliana Mendes"
                        value={booking.tutorName}
                        onChange={(e) => {
                          setBooking({ ...booking, tutorName: e.target.value });
                          if (errors.tutorName) setErrors({ ...errors, tutorName: '' });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1F5C66] transition-colors ${
                          errors.tutorName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                        }`}
                      />
                      {errors.tutorName && (
                        <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.tutorName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1.5">
                        Seu WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="(11) 98765-4321"
                        value={booking.tutorPhone}
                        onChange={handlePhoneChange}
                        className={`w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1F5C66] transition-colors ${
                          errors.tutorPhone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                        }`}
                      />
                      {errors.tutorPhone ? (
                        <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.tutorPhone}</span>
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 mt-1">
                          Usado para você receber a mensagem do agendamento no seu WhatsApp.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Observações / Cuidados Especiais */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Observações ou Cuidados Especiais <span className="text-xs font-normal text-slate-500">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Tem medo de secador alto, idoso com dor na coluna, pele sensível a perfume..."
                    value={booking.petNotes}
                    onChange={(e) => setBooking({ ...booking, petNotes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1F5C66]"
                  />
                </div>
              </div>
            )}

            {/* ETAPA 2: ESCOLHA DE SERVIÇO & PREÇOS POR PORTE */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Selecione o serviço para {booking.petName || 'seu pet'}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Valores já calculados para o porte{' '}
                      <span className="font-bold text-[#1F5C66]">
                        {booking.petSize === 'small' ? 'Pequeno' : booking.petSize === 'medium' ? 'Médio' : 'Grande'}
                      </span>
                      .
                    </p>
                  </div>
                  
                  {/* Indicator to change size if tutor wants */}
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-semibold text-[#1F5C66] hover:underline self-start sm:self-auto cursor-pointer"
                  >
                    Alterar porte do pet
                  </button>
                </div>

                {/* Service Cards Grid */}
                <div className="space-y-3">
                  {SERVICES.map((srv) => {
                    const isSelected = booking.mainServiceId === srv.id;
                    const priceForSize = srv.prices[booking.petSize];

                    return (
                      <div
                        key={srv.id}
                        onClick={() => setBooking({ ...booking, mainServiceId: srv.id })}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#FFFDF0] border-[#F6D55C] ring-2 ring-[#F6D55C] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                              isSelected
                                ? 'bg-[#1F5C66] border-[#1F5C66] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 font-display text-base sm:text-lg">
                                {srv.name}
                              </h4>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {srv.durationMinutes} min
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                              {srv.shortDesc}
                            </p>
                            
                            {/* Included items */}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {srv.includes.slice(0, 3).map((item, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                                >
                                  ✓ {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Price side */}
                        <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex sm:flex-col justify-between items-center sm:items-end">
                          <span className="text-xs text-slate-400">Valor estimado</span>
                          <div className="text-xl sm:text-2xl font-bold text-[#1F5C66] tabular-nums font-display">
                            R$ {priceForSize.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Optional Add-ons */}
                <div className="pt-5 border-t border-slate-100">
                  <h4 className="text-base font-bold text-slate-900 font-display mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#E5BF35]" />
                    <span>Cuidados Adicionais Opcionais</span>
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">
                    Adicione mimos e tratamentos preventivos ao atendimento do seu pet.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {ADDONS.map((addon) => {
                      const isChecked = booking.selectedAddonIds.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all text-left ${
                            isChecked
                              ? 'bg-[#EDF5F6] border-[#1F5C66] text-[#1F5C66] ring-1 ring-[#1F5C66]'
                              : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-slate-800">
                              {addon.name}
                            </span>
                            <span className="text-xs font-bold text-[#1F5C66] tabular-nums">
                              + R$ {addon.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-snug">
                            {addon.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subtotal preview banner */}
                <div className="bg-[#FFFDF0] border border-[#F6D55C] rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F6D55C] text-[#1F5C66] flex items-center justify-center shrink-0">
                      <PawIcon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-700">Subtotal Selecionado</div>
                      <div className="text-xs text-slate-500">
                        {selectedServiceObj.name} + {booking.selectedAddonIds.length} adicionais
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#1F5C66] tabular-nums font-display">
                    R$ {estimatedTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3: DATA & HORÁRIO EM CALENDÁRIO SIMPLES */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-[#1F5C66]" />
                    <span>Escolha o melhor dia e horário</span>
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Trabalhamos com vagas limitadas para garantir que cada pet receba atenção exclusiva e calma.
                  </p>
                </div>

                {/* Day selector carousel / grid */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-sm font-bold text-slate-800">
                      Próximos dias disponíveis <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-xs text-slate-400">
                      Domingos e feriados fechados
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                    {upcomingDays.map((day) => {
                      const isSelected = booking.date === day.dateStr;

                      if (day.isSunday) {
                        return (
                          <div
                            key={day.dateStr}
                            className="p-2.5 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center opacity-60 cursor-not-allowed"
                            title="Fechado aos domingos"
                          >
                            <span className="text-[11px] font-semibold text-slate-400 block">
                              {day.dayName}
                            </span>
                            <span className="text-lg font-bold text-slate-400 block font-display">
                              {day.dayNumber}
                            </span>
                            <span className="text-[10px] text-slate-400 block">Fechado</span>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={day.dateStr}
                          type="button"
                          onClick={() => {
                            setBooking({ ...booking, date: day.dateStr });
                            if (errors.date) setErrors({ ...errors, date: '' });
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1F5C66] border-[#1F5C66] text-white shadow-md ring-2 ring-[#F6D55C]'
                              : 'bg-white border-slate-200 hover:border-[#1F5C66] hover:bg-[#EDF5F6]/50 text-slate-700'
                          }`}
                        >
                          <span
                            className={`text-[11px] font-bold block ${
                              isSelected ? 'text-[#F6D55C]' : 'text-slate-500'
                            }`}
                          >
                            {day.dayName}
                          </span>
                          <span className="text-xl font-bold block font-display tabular-nums">
                            {day.dayNumber}
                          </span>
                          <span
                            className={`text-[10px] block font-medium ${
                              isSelected ? 'text-white/80' : 'text-slate-400'
                            }`}
                          >
                            {day.monthName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.date && (
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.date}</span>
                    </p>
                  )}
                </div>

                {/* Time slot selector (Morning & Afternoon) */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-800 mb-3">
                    Horários disponíveis <span className="text-rose-500">*</span>
                  </label>

                  <div className="space-y-4">
                    {/* Morning */}
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Período da Manhã (08:30 às 12:00)
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {morningSlots.map((slot) => {
                          const isSelected = booking.timeSlot === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() => {
                                setBooking({ ...booking, timeSlot: slot.time });
                                if (errors.timeSlot) setErrors({ ...errors, timeSlot: '' });
                              }}
                              className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1F5C66] border-[#1F5C66] text-white shadow-xs'
                                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <div className="text-base font-bold font-display tabular-nums">
                                {slot.time}
                              </div>
                              <div
                                className={`text-[11px] ${
                                  isSelected ? 'text-[#F6D55C]' : 'text-emerald-600 font-medium'
                                }`}
                              >
                                {slot.status}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Período da Tarde (13:30 às 18:00)
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {afternoonSlots.map((slot) => {
                          const isSelected = booking.timeSlot === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() => {
                                setBooking({ ...booking, timeSlot: slot.time });
                                if (errors.timeSlot) setErrors({ ...errors, timeSlot: '' });
                              }}
                              className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1F5C66] border-[#1F5C66] text-white shadow-xs'
                                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <div className="text-base font-bold font-display tabular-nums">
                                {slot.time}
                              </div>
                              <div
                                className={`text-[11px] ${
                                  isSelected ? 'text-[#F6D55C]' : 'text-emerald-600 font-medium'
                                }`}
                              >
                                {slot.status}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {errors.timeSlot && (
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.timeSlot}</span>
                    </p>
                  )}
                </div>

                {/* Selected Date/Time summary bar */}
                {booking.date && booking.timeSlot && (
                  <div className="bg-[#EDF5F6] border border-[#1F5C66]/30 rounded-2xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1F5C66] shrink-0" />
                    <div className="text-sm text-slate-800">
                      Dia escolhido:{' '}
                      <span className="font-bold text-[#1F5C66]">
                        {getFormattedDateLong(booking.date)}
                      </span>{' '}
                      às <span className="font-bold text-[#1F5C66]">{booking.timeSlot}</span>.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ETAPA 4: RESUMO COM VALOR ESTIMADO & AÇÕES WHATSAPP / COPIAR */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center max-w-xl mx-auto mb-2">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    Agendamento Preparado com Sucesso!
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Confira todos os dados abaixo. Você pode copiar o resumo ou abrir diretamente no seu WhatsApp para arquivar ou enviar.
                  </p>
                </div>

                {/* Ticket / Voucher Presentation Card */}
                <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-6 sm:p-7 relative overflow-hidden">
                  
                  {/* Decorative Paw stamp */}
                  <div className="absolute top-4 right-4 text-[#1F5C66]/10 pointer-events-none">
                    <PawIcon size={80} />
                  </div>

                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Comprovante de Agendamento Demonstrativo
                      </span>
                      <div className="text-lg font-bold text-[#1F5C66] font-display flex items-center gap-2">
                        <span>Focinho Feliz Pet Shop</span>
                        <span className="text-xs bg-[#F6D55C] text-[#143F46] font-mono px-2 py-0.5 rounded-md">
                          #{appointmentCode || 'FF-2026'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-semibold text-[#1F5C66] hover:underline self-start sm:self-auto flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Editar escolhas</span>
                    </button>
                  </div>

                  {/* Grid details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                      <span className="text-xs text-slate-400 block">Pet & Porte:</span>
                      <span className="font-bold text-slate-800 text-base">
                        {booking.petName} ({booking.petSpecies === 'dog' ? 'Cão' : 'Gato'})
                      </span>
                      <span className="text-xs text-slate-500 block">
                        Porte {booking.petSize === 'small' ? 'Pequeno' : booking.petSize === 'medium' ? 'Médio' : 'Grande'}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block">Tutor & Contato:</span>
                      <span className="font-bold text-slate-800 text-base">
                        {booking.tutorName}
                      </span>
                      <span className="text-xs text-slate-500 block">
                        WhatsApp: {booking.tutorPhone}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block">Data Agendada:</span>
                      <span className="font-bold text-[#1F5C66]">
                        {getFormattedDateLong(booking.date)}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block">Horário:</span>
                      <span className="font-bold text-[#1F5C66]">
                        {booking.timeSlot} horas
                      </span>
                    </div>
                  </div>

                  {/* Breakdown of items */}
                  <div className="border-t border-slate-200 pt-4 mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Discriminação dos Serviços
                    </span>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between items-center text-slate-700">
                        <span>{selectedServiceObj.name}</span>
                        <span className="font-semibold tabular-nums">
                          R$ {baseServicePrice.toFixed(2)}
                        </span>
                      </div>

                      {booking.selectedAddonIds.map((id) => {
                        const addon = ADDONS.find((a) => a.id === id);
                        if (!addon) return null;
                        return (
                          <div key={id} className="flex justify-between items-center text-slate-600 text-xs">
                            <span>+ {addon.name}</span>
                            <span className="font-semibold tabular-nums">
                              R$ {addon.price.toFixed(2)}
                            </span>
                          </div>
                        );
                      })}

                      {booking.petNotes && (
                        <div className="pt-2 text-xs text-slate-500 italic">
                          Obs: &ldquo;{booking.petNotes}&rdquo;
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Total Estimado Box */}
                  <div className="border-t-2 border-slate-300 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-500 block">
                        VALOR TOTAL ESTIMADO
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Pagamento no balcão da loja física após o banho
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-[#1F5C66] font-display tabular-nums">
                      R$ {estimatedTotal.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Explicit Action Buttons Required by the Prompt: Copiar Resumo e Abrir WhatsApp */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Botão Copiar Resumo */}
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 font-bold text-slate-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-5 h-5 text-emerald-600" />
                          <span className="text-emerald-700">Resumo Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 text-[#1F5C66]" />
                          <span>Copiar resumo</span>
                        </>
                      )}
                    </button>

                    {/* Botão Abrir WhatsApp usando o número digitado pelo próprio tutor */}
                    <button
                      type="button"
                      onClick={handleOpenWhatsApp}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Abrir WhatsApp ({booking.tutorPhone})</span>
                    </button>
                  </div>

                  {/* Toast Alert for Copy */}
                  {isCopied && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-semibold animate-in fade-in duration-200">
                      ✓ Resumo copiado para a área de transferência! Você pode colar no bloco de notas ou compartilhar.
                    </div>
                  )}

                  {/* Privacy & Transparency note */}
                  <div className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
                    <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Privacidade e Ação Explícita:</strong> Nenhum dado pessoal é transmitido automaticamente a terceiros. O botão acima abre o WhatsApp diretamente para o número que você digitou.
                    </span>
                  </div>

                  {/* Bottom secondary action: Reset for another pet */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1F5C66] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Agendar para outro pet ou recomeçar</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Footer for Steps 1, 2, 3 */}
            {currentStep < 4 && (
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div /> // Spacer
                )}

                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1F5C66] hover:bg-[#143F46] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>
                    {currentStep === 1 && 'Continuar para Serviços'}
                    {currentStep === 2 && 'Continuar para Data & Horário'}
                    {currentStep === 3 && 'Ver Resumo & Confirmar'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
