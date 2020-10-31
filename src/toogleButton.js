
import styled from 'styled-components';

export const ToogleButton = styled.button`
background: ${({ theme }) => theme.gradient};
cursor: pointer;
display: flex;
font-size: 0.5rem;
justify-content: space-between;
margin: 0 auto;
overflow: hidden;
padding: 0.5rem;
position: relative;
width: 5rem;
height: 3rem;
transition: all 0.25s linear;
border:none;
outline:0;
:hover,:active,:focus{
    outline:0;
}
`;