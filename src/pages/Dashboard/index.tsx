import React, { useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format, isAfter, isToday, parseISO } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import * as Style from './style';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

type MonthAvailabilityItem = {
  day: number;
  available: boolean;
};

type Appointment = {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleMonthChange = (month: Date): void => {
    setCurrentMonth(month);
  };

  const handleDateChange = (day: Date, modifiers: DayModifiers): void => {
    if (modifiers.available && !modifiers.disabled) setSelectedDate(day);
  };

  const { logout, user } = useAuth();

  useEffect(() => {
    api
      .get(`/providers/${user?.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user?.id]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }));

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDatesAsText = useMemo(
    () =>
      format(selectedDate, "'Dia' dd 'de' MMMM", {
        locale: ptBR,
      }),
    [selectedDate]
  );

  const selectedWeekDay = useMemo(
    () => format(selectedDate, 'cccc', { locale: ptBR }),
    [selectedDate]
  );

  const morningAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => parseISO(appointment.date).getHours() < 12
      ),
    [appointments]
  );

  const afternoonAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => parseISO(appointment.date).getHours() >= 12
      ),
    [appointments]
  );

  const nextAppointment = useMemo(
    () =>
      appointments.find((appointment) =>
        isAfter(parseISO(appointment.date), new Date())
      ),
    [appointments]
  );

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Style.Profile>
            <img
              src="https://yt3.ggpht.com/ytc/AKedOLRphzH9UGDvLpKEi2f9_9-tdsZrDy_xUbyuohFs=s48-c-k-c0x00ffffff-no-rj"
              alt="Denilson"
            />

            <div>
              <span>Bem-vindo, </span>
              <strong>{user?.name}</strong>
            </div>
          </Style.Profile>

          <button type="button" onClick={logout}>
            <FiPower />
          </button>
        </Style.HeaderContent>
      </Style.Header>

      <Style.Content>
        <Style.Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDatesAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <Style.NextAppointment>
              <strong>Agendamento a seguir</strong>

              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </Style.NextAppointment>
          )}

          <Style.Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste periodo</p>
            )}

            {morningAppointments.map((appointment) => (
              <Style.Appointment>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Style.Appointment>
            ))}
          </Style.Section>

          <Style.Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste periodo</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Style.Appointment>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Style.Appointment>
            ))}
          </Style.Section>
        </Style.Schedule>

        <Style.Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Style.Calendar>
      </Style.Content>
    </Style.Container>
  );
};
