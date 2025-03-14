import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import OussemaImage from './assest/oussema.png';
import AymenImage from './assest/Aymen.png';





const TeamWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #141E30;
  padding-bottom: 180px;
  padding-top: 60px;
  background: radial-gradient(circle, rgba(2, 3, 14, 1) 0%, rgba(36, 59, 85, 1) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    filter: blur(150px);
  }
  
  &::before { top: -100px; left: -100px; width: 300px; height: 300px; }
  &::after { bottom: -150px; right: -150px; width: 400px; height: 400px; }
`;

const Number = styled.div`
  width: 80px;
  height: 80px;
  font-size: 36px;
  font-weight: 800;
  color: #FF6F61;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 4px solid #FF6F61;
  background-color: rgba(255, 111, 97, 0.1);
  margin-bottom: 20px;
`;

const TeamTitle = styled.div`
  font-size: 46px;
  font-weight: 700;
  margin-top: 20px;
  color: #FF6F61;
  text-align: center;
`;

const TeamDescription = styled.p`
  font-size: 22px;
  line-height: 1.8;
  color: #f0f0f0;
  max-width: 800px;
  text-align: center;
  margin-bottom: 60px;
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
  width: 70%;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
`;

const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #FF6F61;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: rgba(255, 255, 255, 0.3) 0px 10px 40px;
  }
`;

const TeamIcon = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left : 4px;
`;

const TeamMemberInfo = styled.div`
  text-align: center;
  color: #ffffff;
`;

const TeamMemberName = styled.h5`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
`;

const TeamMemberRole = styled.h6`
  font-size: 18px;
  color: #dcdcdc;
`;

const TeamMemberDescription = styled.p`
  font-size: 16px;
  color: #dcdcdc;
  line-height: 1.8;
`;

const Team = () => {
    const teamMembers = [
        {
          name: 'Haj Boubaker Oussema Hmida',
          role: 'Full Stack Developer Student',
          description: 'A passionate full-stack developer in training, focused on building responsive and dynamic web applications.',
          imageUrl: OussemaImage,
        },
        {
          name: 'Garfa Aymen',
          role: 'Full Stack Developer Student',
          description: 'Dedicated to learning the latest in web technologies, specializing in creating user-friendly front-end designs and efficient back-end solutions.',
          imageUrl: AymenImage,
        },
      ];
      

  return (
    <TeamWrapper id="equipe">
      <Number>03</Number>
      <TeamTitle>BUILDING TEAM</TeamTitle>
      <TeamDescription>The Talented People Behind YED WA7DA</TeamDescription>
      
      <TeamContainer>
        {teamMembers.map((member, index) => (
          <TeamCard key={index}>
            <TeamIcon>
              <img src={member.imageUrl} alt={`Display of ${member.name}`} style={{ width: '100%', borderRadius: '50%' }} />
            </TeamIcon>
            <TeamMemberInfo>
              <TeamMemberName>{member.name}</TeamMemberName>
              <TeamMemberRole>{member.role}</TeamMemberRole>
              <TeamMemberDescription>{member.description}</TeamMemberDescription>
              <div>
                <Button variant="link" href="#" target="_blank"><i className="fab fa-github"></i></Button>
                <Button variant="link" href="#" target="_blank"><i className="fab fa-twitter"></i></Button>
                <Button variant="link" href="#" target="_blank"><i className="fab fa-instagram"></i></Button>
              </div>
            </TeamMemberInfo>
          </TeamCard>
        ))}
      </TeamContainer>
    </TeamWrapper>
  );
};

export default Team;
