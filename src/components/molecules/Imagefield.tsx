import React, { MutableRefObject, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../signup';
import styled from 'styled-components';
import { Upload } from '@mui/icons-material';

const OuterDiv = styled.div`
	width: 100%;
	height: 150px;
	background-color: #f2f2f2;
	border: 1px solid #cecece;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const InnerDiv = styled.div`
	object-fit: contain;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Img = styled.img`
	max-width: 90%;
	max-height: 80%;
`;

const P = styled.p`
	line-height: 20px;
	margin-bottom: 10px;
`;

interface Props {
	setValue: UseFormSetValue<FormValues>;
}

const Imagefield = ({ setValue }: Props) => {
	const [picLoading, setPicLoading] = useState(false);
	// 이미지 미리보기
	const [imgPreview, setImgPreview] = useState<string>('');

	const photoInput = useRef<HTMLInputElement>(null);
	// img 태그
	const imgRef = useRef<HTMLImageElement>(null);

	const imgClick = () => {
		photoInput.current?.click();
	};

	const postDetails = (pics: any) => {
		// 이미지 미리보기
		const reader = new FileReader();
		reader.readAsDataURL(pics);
		reader.onloadend = () => {
			setImgPreview(reader.result as string);
		};

		setPicLoading(true);
		if (pics === undefined) {
			console.log('pic == undefined');
			return;
		}
		console.log('pics', pics);
		if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
			const data = new FormData();
			data.append('file', pics);
			data.append('upload_preset', 'mern-chat');
			data.append('cloud_name', 'dql4ynp7j');
			fetch('https://api.cloudinary.com/v1_1/dql4ynp7j/image/upload', {
				method: 'post',
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setValue('pic', data.url.toString());
					console.log(data.url.toString());
					setPicLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setPicLoading(false);
				});
		} else {
			console.log('please select another image');
			setPicLoading(false);
			return;
		}
	};

	return (
		<div>
			<P>Upload your Picture</P>
			<input
				type='file'
				accept='image/*'
				onChange={(e: any) => postDetails(e.target.files[0])}
				ref={photoInput}
				style={{ display: 'none' }}
			/>
			<OuterDiv onClick={imgClick}>
				<InnerDiv>
					{imgPreview ? <Img ref={imgRef} src={imgPreview} alt='preview' /> : <Upload />}
				</InnerDiv>
			</OuterDiv>
		</div>
	);
};

export default Imagefield;
