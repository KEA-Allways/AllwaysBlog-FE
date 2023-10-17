import React from 'react';
import clipboardCopy from 'clipboard-copy';

function CopyButton({content}) {
  const value = content;

  const handleCopyValue = () => {
    clipboardCopy(value)
      .then(() => {
        console.log('복사되었습니다.');
      })
      .catch((err) => {
        console.error('클립보드 복사에 실패했습니다: ', err);
      });
  };

  return (
        <div>
            {value } 
            <img style={{marginLeft : "5px"}}src='/img/copyicon.png' width="12px" height="12px" onClick={handleCopyValue}/>
            <small style={{textDecoration : "underline"}}>복사버튼</small>
        </div>
  );
}

export default CopyButton;






