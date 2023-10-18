import ManageTopSideBar from '../../components/TopSidebar/ManageTopSideBar';
import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MngtTheme = (props) => {
    const [themes, setThemes] = useState([]);

    const apiGetCategories = () => {
        axios.get('http://private-bc2ca0-bee3083.apiary-mock.com/api/themes/1')
          .then((response) => {
            setThemes(response.data.themes);
            console.log(themes)
          })
          .catch((error) => {
            console.error('API GET request error:', error);
          });
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);

    return (
        <div>
            <ManageTopSideBar Container={
                <div>
                    [테마 및 목록 관리 페이지]
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
                        
                        {themes.map((item, idx) => (
                            <tr>
                            <td>{idx + 1}</td>
                            <td>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Link to={`/mngtTheme/${idx}`}>{item.themeName}</Link>
                                </div>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            } />
        </div>
    )
}

export default MngtTheme;