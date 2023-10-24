import React from 'react';
import BlogBody from "../../components/Body/BlogBody";
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import BlogTopSideBar from '../../components/TopSidebar/BlogTopSideBar';
import DetailPageBody from "../../components/DetailPage/DetailPageBody"
import html2canvas from 'html2canvas';


const DetailPage = () => {
    return (
        <>
            <BlogTopSideBar body={<DetailPageBody />}/>
             
        </>
    )
}

export default DetailPage;