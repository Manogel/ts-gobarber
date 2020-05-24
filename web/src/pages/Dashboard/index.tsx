import React, { useState } from 'react';

import { FiClock } from 'react-icons/fi';
import {
  Container,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container>
      <Header />
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://cdn.discordapp.com/avatars/473900543769837593/866025cf2440f1fe4b1764d835f85687.png?size=512"
                alt="User"
              />
              <strong>Leonardo</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://cdn.discordapp.com/avatars/473900543769837593/866025cf2440f1fe4b1764d835f85687.png?size=512"
                  alt="User"
                />
                <strong>Leonardo</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://cdn.discordapp.com/avatars/473900543769837593/866025cf2440f1fe4b1764d835f85687.png?size=512"
                  alt="User"
                />
                <strong>Leonardo</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://cdn.discordapp.com/avatars/473900543769837593/866025cf2440f1fe4b1764d835f85687.png?size=512"
                  alt="User"
                />
                <strong>Leonardo</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
