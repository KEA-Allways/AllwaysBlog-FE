import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const CommonButton = styled(Button)`
    text-align: center;
    width: 156px;
    height: 48px;
    line-height: 48px;
    background: #00b4ef;
    border: 1px solid #dadada;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: white;
    cursor: pointer;
    transition: all 0.5s ease;

    &:hover {
    background: cornflowerblue;
    }
`; 



