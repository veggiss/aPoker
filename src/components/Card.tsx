import React, { FC } from 'react';
import { Box, Grow, SvgIcon, Typography } from '@mui/material';
import Hearts from '../icons/heart.svg';
import Diamonds from '../icons/diamond.svg';
import Spades from '../icons/spades.svg';
import Clubs from '../icons/clubs.svg';

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    height: 300,
    boxShadow: 8,
    borderRadius: '0.5rem',
    margin: 2,
    backgroundColor: '#E6EEF4',
};

const cardNumberStyle = {
    fontSize: '6rem',
    padding: 1,
    lineHeight: 0.7,
};

const cardIconStyle = {
    fontSize: '9rem',
    display: 'flex',
    margin: 3,
    alignSelf: 'center',
};

const getColor = (suit: string) => (['h', 'r'].includes(suit) ? '#D71E00' : '#444444');

const getIcon = (suit: string) => {
    switch (suit) {
        case 's':
            return <Spades />;
        case 'r':
            return <Diamonds />;
        case 'k':
            return <Clubs />;
        case 'h':
            return <Hearts />;
    }
};

type Props = {
    value: string;
};

const PlayingCard: FC<Props> = ({ value }: Props) => {
    const number = value[0].toUpperCase();
    const suit = value[1];

    const color = getColor(suit);
    const icon = getIcon(suit);

    return (
        <Grow in={true} timeout={1000} unmountOnExit>
            <Box sx={cardStyle} color={color}>
                <Typography sx={cardNumberStyle}>{number}</Typography>

                <SvgIcon sx={cardIconStyle}>{icon}</SvgIcon>
            </Box>
        </Grow>
    );
};

export default PlayingCard;
