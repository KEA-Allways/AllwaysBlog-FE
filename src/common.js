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


