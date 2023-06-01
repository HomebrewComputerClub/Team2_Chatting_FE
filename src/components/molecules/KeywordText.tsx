import React from 'react';
import styled from 'styled-components';

interface Props {
	keyword: string;
	query: string;
}

const Keyword = styled.p`
	font-weight: 700;
	font-size: 16px;
	flex: 1;
	margin: 0;
`;

const Highlight = styled.span`
	color: #fb786b;
	font-size: 16px;
	font-weight: 700;
`;

// 검색어 같은 부분 하이라이팅.
const KeywordText = ({ keyword, query }: Props) => {
	if (query !== '' && keyword.includes(query)) {
		const parts = keyword.split(new RegExp(`(${query})`, 'gi'));
		return (
			<Keyword>
				{parts.map((part, index) =>
					part === query ? <Highlight key={index}>{part}</Highlight> : part
				)}
			</Keyword>
		);
	}
	return <Keyword>{keyword}</Keyword>;
};

export default KeywordText;
