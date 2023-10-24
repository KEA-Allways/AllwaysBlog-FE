import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';

function CopyButton({content}) {

  const [isCopied, setIsCopied] = useState(false);
  const value = content; 

  const handleCopyValue = () => {
    clipboardCopy(value)
      .then(() => {
        setIsCopied(true); // "Copied"로 상태 업데이트
        setTimeout(() => {
          setIsCopied(false); // 1초 후에 원래 상태로 돌아감
        }, 1000);
      })
      .catch((err) => {
        console.error('클립보드 복사에 실패했습니다: ', err);
      });
  };

  return (
    <div>
      {isCopied ? (
        <span>{value} <img src='/img/copyicon.png' width="12px" height="12px" onClick={handleCopyValue}/><small>Copied!</small></span>
      ) : (
        <div>
          <span>{value} <img src='/img/copyicon.png' width="12px" height="12px" onClick={handleCopyValue}/></span> 
        </div>
      )}
    </div> 
  );
}

export default CopyButton;






