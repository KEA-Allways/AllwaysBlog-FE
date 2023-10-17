import ManageTopSideBar from "../../components/TopSidebar/ManageTopSideBar";
import Topbar from "../../components/Topbar/Topbar";
import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import TableStyles from "../../components/Table.module.css"
import Paging from "../../components/Paging/Paging"

const MngtContents = () => {

    const [lists, setLists] = useState([]);
    const [hideList, setHideList] = useState(Array(lists.length).fill(false));
    const [checkItems, setCheckItems] = useState([]);

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

    const setRowHideState = (idx, value) => {
        const updatedHideList = [];
        updatedHideList[idx] = value;
        setHideList(updatedHideList);
    };

    const mouseOn = (idx) => {
        setRowHideState(idx, true);
    }
    const mouseOff = (idx) => {
        setRowHideState(idx, false);
    }

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);

    

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
        // 단일 선택 시 체크된 아이템을 배열에 추가
        setCheckItems(prev => [...prev, id]);
        } else {
        // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
        setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if(checked) {
        // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
        const idArray = [];
        lists.forEach((el) => idArray.push(el.postSeq));
        setCheckItems(idArray);
        }
        else {
        // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
        setCheckItems([]);
        }
    }

    return (
        
        <div>
            <Topbar />
            [글 관리 페이지]
            <div>
                <Table striped style={{width: '100%', borderRadius: '10px' }} className={TableStyles.table}>
                    <thead>
                        <th style={{width: '5%'}}>
                            <input type='checkbox' name='select-all' onChange={(e) => handleAllCheck(e.target.checked)}
                                checked={checkItems.length === lists.length ? true : false} />
                        </th>
                        <th style={{width: '5%'}}>
                            번호
                        </th>
                        <th style={{width: '70%'}} colSpan={1}>
                            제목
                        </th>
                        <th style={{width: '20%'}}></th>
                    </thead>

                    <tbody>
                    
                    {lists.map((contents, idx) => (
                        <tr onMouseEnter={() => mouseOn(idx)} onMouseLeave={() => mouseOff(idx)}>
                            <td>
                                <input type='checkbox' name={`select-${contents.postSeq}`}
                                    onChange={(e) => handleSingleCheck(e.target.checked, contents.postSeq)}
                                    checked={checkItems.includes(contents.postSeq) ? true : false} />
                            </td>
                            <td>
                                {idx + 1}
                            </td>
                            <td style={{textAlign: 'left'}}>
                                <div style={{ display: 'flex', justifyContent: 'space-between',  flexDirection: 'column' }}>
                                    <p style={{ margin: '0'}}>{contents.name}</p>
                                    <p style={{ margin: '0'}}>{contents.nickname} | {contents.postDate}</p>
                                </div>
                            </td>
                            <td>
                                {hideList[idx] && (
                                    <div style={{ marginTop: '10px' }}>
                                        <Button className="Conbtn" color="secondary" size="sm" style={{marginRight: '5px', color: 'black', backgroundColor: 'white', border: '1px solid black'}}>
                                            수정
                                        </Button>
                                        <Button className="Conbtn" color="secondary" size="sm" style={{marginRight: '5px', color: 'black', backgroundColor: 'white', border: '1px solid black'}}>
                                            삭제
                                        </Button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </Table>
                <Paging />
            </div>
        </div>
    )
}

export default MngtContents;
