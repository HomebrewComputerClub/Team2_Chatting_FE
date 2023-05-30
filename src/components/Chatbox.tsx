import SingleChat from "./SingleChat";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 40vw;
  margin-top: 5vh;
  border: 1px solid #fffe;
  border-radius: 20px;
  background: white;
  justify-content: space-around;
  align-items: center;
`;
const Chatbox = ({ fetchAgain, setFetchAgain }: any) => {
  return (
    <Wrapper>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Wrapper>
  );
};

export default Chatbox;
