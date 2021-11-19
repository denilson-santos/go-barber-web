import React, { useState } from 'react';

import { FiClock, FiPower } from 'react-icons/fi';
import * as Style from './style';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { logout, user } = useAuth();

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

        <Style.Calendar />
      </Style.Content>
    </Style.Container>
  );
};
