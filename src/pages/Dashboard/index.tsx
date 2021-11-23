import React, { useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
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

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleMonthChange = (month: Date): void => {
    setCurrentMonth(month);
  };

  const handleDateChange = (day: Date, modifiers: DayModifiers): void => {
    if (modifiers.available) setSelectedDate(day);
  };

  const { logout, user } = useAuth();

  useEffect(() => {
    api
      .get(`/providers/${user?.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth(),
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user?.id]);

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
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <Style.NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img
                src="https://avatars.githubusercontent.com/u/35299274?v=4"
                alt="Denilson"
              />

              <strong>Denilson da Silva Santos</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </Style.NextAppointment>

          <Style.Section>
            <strong>Manhã</strong>

            <Style.Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/35299274?v=4"
                  alt="Denilson"
                />

                <strong>Denilson da Silva Santos</strong>
              </div>
            </Style.Appointment>

            <Style.Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/35299274?v=4"
                  alt="Denilson"
                />

                <strong>Denilson da Silva Santos</strong>
              </div>
            </Style.Appointment>
          </Style.Section>

          <Style.Section>
            <strong>Tarde</strong>

            <Style.Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/35299274?v=4"
                  alt="Denilson"
                />

                <strong>Denilson da Silva Santos</strong>
              </div>
            </Style.Appointment>
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
