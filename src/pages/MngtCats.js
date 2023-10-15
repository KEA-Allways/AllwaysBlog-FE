import Topbar from "../components/Topbar";
import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const cats = [
    { title : '소소한 요리 기록'},
    { title : '여행 다이어리'}
]

const MngtCats = () => {
    return (
        <div>
            <Topbar />
            [테마 및 목록 관리 페이지]
            <div>
                <Table style={{width: '100%'}}>
                    <thead>
                        <th style={{width: '10%'}}>
                            번호
                        </th>
                        <th style={{width: '50%'}}>
                            테마
                        </th>
                    </thead>
                    <tbody>
                    
                    {cats.map((contents, idx) => (
                        <tr>
                        <td>{idx + 1}</td>
                        <td>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link to={`/cat0${idx+1}`}>{contents.title}</Link>
                            </div>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MngtCats;