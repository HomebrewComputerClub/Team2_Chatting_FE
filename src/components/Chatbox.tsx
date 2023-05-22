import SingleChat from "./SingleChat";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #eeeeee;
  width: 40%;
  heigth: 100%;
`;
const Chatbox = ({ fetchAgain, setFetchAgain }: any) => {
  return (
    <Wrapper>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Wrapper>
  );
};

export default Chatbox;
