import Topbar from "../components/Topbar";
import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const MngtContents = () => {

    const [lists, setLists] = useState([]);

    const apiGetCategories = () => {
        axios.get('http://private-bc2ca0-bee3083.apiary-mock.com/api/posts/1/1')
          .then((response) => {
            setLists(response.data.posts);
            console.log(lists)
          })
          .catch((error) => {
            console.error('API GET request error:', error);
          });
    };

    const [hide, setHide] = useState(false);

    const mouseOn = () => {
        setHide(true);
    }
    const mouseOff = () => {
        setHide(false);
    }

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);

    return (
        
        <div>
            <Topbar />
            [글 관리 페이지]
            <div>
                <Table style={{width: '100%'}}>
                    <thead>
                        <th style={{width: '10%'}}>
                            번호
                        </th>
                        <th style={{width: '70%'}}>
                            제목
                        </th>
                        <th style={{width: '20%'}}></th>
                    </thead>
                    <tbody>
                    
                    {lists.map((contents, idx) => (
                        <tr onMouseEnter={mouseOn}
                            onMouseLeave={mouseOff}
                        >
                        <td>{idx + 1}</td>
                        <td>
                          <div style={{ display: 'flex', justifyContent: 'space-between',  flexDirection: 'column' }}>
                            <p style={{ margin: '0'}}>{contents.name}</p>
                            <p style={{ margin: '0'}}>{contents.nickname} | {contents.postDate}</p>
                          </div>
                            
                        </td>
                        <td>
                            {!hide && (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button className="btn" color="secondary" size="sm" style={{marginRight: '5px', color: 'black', backgroundColor: 'white', border: '1px solid black'}}>
                                        수정
                                    </Button>
                                    <Button className="btn" color="secondary" size="sm" style={{marginRight: '5px', color: 'black', backgroundColor: 'white', border: '1px solid black'}}>
                                        삭제
                                    </Button>
                                </div>
                            )}
                        </td>
                      </tr>
                    ))}
                    </tbody>

                </Table>
            </div>
            
        </div>
    )
}

export default MngtContents;