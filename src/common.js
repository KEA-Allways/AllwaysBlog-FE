import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const CommonButton = styled(Button)`
    background-color:black;
    color:white;
    width: 122px;
    height: 40px;
    // border: 1px solid black;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    border-radius: 10px;

    &:hover {
        color: black;
        background: white;
    }
`; 

export const CommonColorButton = styled(Button)`
    background: rgba(0,190,254);
    color: white;
    width: 156px;
    height: 48px;
    border: 1px solid #dadada;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 48px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.05);
        background: rgba(0,170,234);
        transition: 0.5s;
    }
`; 

