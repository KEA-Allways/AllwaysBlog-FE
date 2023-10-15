import Topbar from "../components/Topbar";
import { Button, Table } from "react-bootstrap";
import { useState } from "react";

const MngtContents = () => {

    const contentsArr = [
        {
            src : "/img/mpc1.png",
            alt : "에이치티엠엘",
            title : "카드 1번입니다.",
            subtitle : "카드 1번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준1"
        },
        {
            src : "/img/mpc2.png",
            alt : "씨에스에스",
            title : "카드 2번입니다.",
            subtitle : "카드 2번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준2"
        },
        {
            src : "/img/mpc3.jpeg",
            alt : "자바스크립트",
            title : "카드 3번입니다.",
            subtitle : "카드 3번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준3"
        },
        {
            src : "/img/mpc4.png",
            alt : "리액트",
            title : "카드 4번입니다.",
            subtitle : "카드 4번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준4"
        },
        {
            src : "/img/mpc5.svg",
            alt : "노드제이에스",
            title : "카드 5번입니다.",
            subtitle : "카드 5번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준5"
        },
        {
            src : "/img/mpc6.png",
            alt : "스프링부트",
            title : "카드 6번입니다.",
            subtitle : "카드 6번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준6"
        },
        {
            src : "/img/mpc7.svg",
            alt : "마이에스큐엘",
            title : "카드 7번입니다.",
            subtitle : "카드 7번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준7"
        },
        {
            src : "/img/mpc8.png",
            alt : "마리아디비",
            title : "카드 8번입니다.",
            subtitle : "카드 8번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준8"
        },
        {
            src : "/img/mpc9.png",
            alt : "몽고디비",
            title : "카드 9번입니다.",
            subtitle : "카드 9번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준9"
        },
        {
            src : "/img/mpc10.png",
            alt : "레디스",
            title : "카드 10번입니다.",
            subtitle : "카드 10번에 대한 설명입니다.",
            userIcon : "/img/usericon.png",
            nickname : "김성준10"
        },
    ]

    const [hide, setHide] = useState(false);

    const mouseOn = () => {
        setHide(true);
    }
    const mouseOff = () => {
        setHide(false);
    }

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
                        <th style={{width: '50%'}}>
                            제목
                        </th>
                    </thead>
                    <tbody>
                    
                    {contentsArr.map((contents, idx) => (
                        <tr onMouseEnter={mouseOn}
                            onMouseLeave={mouseOff}
                        >
                        <td>{idx + 1}</td>
                        <td>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p>{contents.title}</p>
                            {hide && (
                                <div>
                                    <Button className="btn" color="secondary" size="sm" style={{marginRight: '5px', color: 'black', backgroundColor: 'white', border: '1px solid black'}}>
                                        수정
                                    </Button>
                                    <Button className="btn" color="secondary" size="sm" style={{marginRight: '5px', color: 'black', backgroundColor: 'white', border: '1px solid black'}}>
                                        삭제
                                    </Button>
                                </div>
                            )}
                                
                            
                            
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

export default MngtContents;