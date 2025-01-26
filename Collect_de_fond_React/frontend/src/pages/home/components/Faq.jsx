import styled from "styled-components";

const FaqContainer = styled.section`
  background-color: #f4f4f9;
  color: #333;
  padding: 80px 0;
  font-family: 'Arial', sans-serif;
`;

const FaqTitle = styled.h2`
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  color: #2b2d42;
  margin-bottom: 60px;
`;

const FaqList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 900px;
  margin: 0 auto;
`;

const FaqItem = styled.li`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const FaqQuestion = styled.h4`
  font-size: 26px;
  color: #2b2d42;
  margin: 0;
  padding: 20px 30px;
  background-color: #8d99ae;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  user-select: none;
`;

const FaqAnswer = styled.p`
  font-size: 18px;
  padding: 20px 30px;
  background-color: #edf2f4;
  margin: 0;
  border-radius: 0 0 10px 10px;
  display: none;
  transition: max-height 0.3s ease;
  
  &.open {
    display: block;
  }
`;

const Faq = () => {
  const faqData = [
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take security very seriously and use the latest encryption technology to protect your data.",
    },
    {
      question: "How much does the app cost?",
      answer:
        "Our app has a variety of pricing plans to fit any budget, starting at just $9.99/month.",
    },
    {
      question: "What kind of support is available?",
      answer:
        "We offer 24/7 support via email and live chat to ensure you get the help you need.",
    },
  ];

  const toggleAnswer = (index) => {
    const answer = document.getElementById(`faq-answer-${index}`);
    answer.classList.toggle("open");
  };

  return (
    <FaqContainer>
      <FaqTitle>Frequently Asked Questions</FaqTitle>
      <FaqList>
        {faqData.map((faq, index) => (
          <FaqItem key={index}>
            <FaqQuestion onClick={() => toggleAnswer(index)}>
              {faq.question}
            </FaqQuestion>
            <FaqAnswer id={`faq-answer-${index}`}>
              {faq.answer}
            </FaqAnswer>
          </FaqItem>
        ))}
      </FaqList>
    </FaqContainer>
  );
};

export default Faq;