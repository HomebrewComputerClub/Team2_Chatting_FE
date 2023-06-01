import { Avatar } from '@chakra-ui/avatar';
import { Box, Text } from '@chakra-ui/layout';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from '../../Store/atom';
import KeywordText from '../molecules/KeywordText';
const Img = styled.img`
	width: 3vw;
	height: 3vw;
	border: 1px solid #eeeeee;
	border-radius: 5px;
`;

const UserListItem = ({ user, handleFunction, query }: any) => {
	return (
		<Box
			onClick={handleFunction}
			cursor='pointer'
			bg='#E8E8E8'
			_hover={{
				background: '#38B2AC',
				color: 'white',
			}}
			w='100%'
			h={'10vh'}
			alignItems='center'
			color='black'
			px={3}
			py={2}
			mb={2}
			borderRadius='lg'
		>
			<Img src={user.pic} />
			<div>
				<KeywordText keyword={user.name} query={query} />
			</div>
		</Box>
	);
};

export default UserListItem;
