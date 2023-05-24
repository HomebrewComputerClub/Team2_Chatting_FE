import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// 모달창 띄워주는 component.

interface Props {
	open: any;
	handleClose: any;
	label: any;
}

const ModalField = ({ open, handleClose, label }: Props) => {
	const navigate = useNavigate();

	const onClickHandler = () => {
		handleClose();
		navigate(label.link);
	};
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '80%',
					maxWidth: 400,
					bgcolor: 'background.paper',
					borderRadius: 4,
					boxShadow: 24,
					p: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					{label.title}
				</Typography>
				<Typography id='modal-modal-description' sx={{ mt: 2, mb: 1 }}>
					{label.body}
				</Typography>
				<Button onClick={onClickHandler}>닫기</Button>
			</Box>
		</Modal>
	);
};

export default ModalField;
