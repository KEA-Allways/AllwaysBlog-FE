import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const CommonButton = styled(Button)`
    background-color:black;
    color:white;
    width: 122px;
    height: 40px;
    border : none;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    border-radius: 10px;
    transition: all 0.4s ease;

    &:hover {
        color: black;
        background: white;
        border: 2px solid black;
    }
`; 

export const CommonColorButton = styled(Button)`
    background: rgba(0,190,254);
    color: white;
    width: 156px;
    height: 48px;
    border: 1px solid #dadada;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 48px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    //margin-right: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.05);
        background: rgba(0,170,234);
        transition: 0.5s;
    }
`; 

export const CommonDeleteButton = styled(Button)`
    background: rgba(236, 83, 83);
    color: white;
    width: 156px;
    height: 48px;
    border: 1px solid #dadada;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 48px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    //margin-right: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.05);
        background: rgba(216, 63, 63);
        transition: 0.5s;
    }

`; 

