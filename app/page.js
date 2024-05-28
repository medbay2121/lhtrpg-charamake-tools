"use client";
import React, { useRef, useState } from 'react';
import exportFunction from './function.js';
import './style_one.css';
import { Helmet } from "react-helmet"

const fetchCharacterData = async (charaId, setOutputValue) => {
  const url = `https://lhrpg.com/lhz/api/${charaId}.json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
//    const result = getPlayerData(data);

    const data_sample = exportFunction.char_data_bake(data);
    setOutputValue(prev => data_sample + '\n\n');
  } catch (error) {
    console.error('Error fetching character data:', error);
  }
}



//const getPlayerData = (data) => {
//  let string_with_newline = "XXXXXtestXXXXX";
//  return `{"kind":"character","data":{"name":"${data.name}","initiative":${(data.action + 0.1)},"externalUrl":"${data.sheet_url}","iconUrl":"","commands":"${string_with_newline}","status":[{"label":"HP","value":${data.max_hitpoint},"max":${data.max_hitpoint}},{"label":"ヘイト","value":0,"max":0},{"label":"疲労","value":0,"max":0},{"label":"因果力","value":${data.effect},"max":0},{"label":"障壁","value":0,"max":0}],"params":[{"label":"STR","value":"${data.str_value}"},{"label":"DEX","value":"${data.dex_value}"},{"label":"POW","value":"${data.pow_value}"},{"label":"INT","value":"${data.int_value}"},{"label":"攻撃力","value":"${data.physical_attack}"},{"label":"魔力","value":"${data.magic_attack}"},{"label":"回復力","value":"${data.heal_power}"},{"label":"物防","value":"${data.physical_defense}"},{"label":"魔防","value":"${data.magic_defense}"},{"label":"行動力","value":"${data.action}"},{"label":"移動力","value":"${data.move}"}]}}`;
//}

export default function Home() {
  const [charaId, setCharaId] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const textareaRef = useRef(null);



  // ボタンがクリックされたときに全選択を行う関数
  const handleSelectAll = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
    }
  };

  return (
    <main>



      <div className="disp_wide">
        <h2 className="text_title">冒険者窓口 キャラコマ生成所</h2>

        <div className="flex-container">
          <input id="chara_id" type="text" className="input-chara" 
        <div className="flex-container">
          <input id="chara_id" type="text" className="input-chara" 
            value={charaId} 
            onChange={(e) => setCharaId(e.target.value)} 
            placeholder="キャラクターIDを入力"
          />
          <br class="spbr"></br>
          <button 
            className="btn-fetch" 
            className="btn-fetch" 
            onClick={() => fetchCharacterData(charaId, setOutputValue)}>
            データ取得
          </button>
        </div>

        <div>
          <h1>このページの使い方</h1>
          <p>
            このページでは以下の手順でココフォリアに直接貼り付け可能なコマが生成できます。<br/><br/>
          </p>
          <p className="borderedText" style={{textAlign: "left", marginLeft: "0%", marginBottom:"20px"}}>
            ①.ログ・ホライズン冒険窓口へいって利用したい冒険者のページを開き、「基本情報を変更する」を選択する<br/>
            ②.「外部ツールからの〈冒険者〉データ参照を許可する」にチェックを入れ、変更内容を確定する<br/>
            ③.上部の入力欄にキャラクターID（冒険者ページのURLのhttps://lhrpg.com/lhz/pc?id=○○←ここ）を入力する<br/>
            ④.チャットパレット生成を押す<br/>
            ⑤.下の「全選択」ボタンを押し、生成された文字列を全部選択する。<br/>
            ⑥.下の文字列をコピーして出来上がり！<br/>
            ⑦.そのままココフォリアにコマとして貼り付け可能です<br/>
          </p>
        </div>

        <textarea id="outputText" rows={10} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
          value={outputValue}
          ref={textareaRef}
          readOnly
        ></textarea>
        <br />
        <button onClick={handleSelectAll}>全選択</button>


      </div>
    </main>
  );
}
