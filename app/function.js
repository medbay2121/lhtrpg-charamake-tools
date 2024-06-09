exports.char_data_bake = function(send_data){
    const data = send_data;
    let str_output = "";

    try {

        //ひたすらリコーディングするだけ


        //console.log(" ");
        //console.log("◯ 戦闘の基本");
        str_output += "◯ 戦闘の基本 \\n";

        //console.log(data["abl_hit"] + " ：命中値");
        str_output += data["abl_hit"] + " ： 命中値 \\n";

        str_output += "{攻撃力}+1D" + " ： 基本物理攻撃 \\n";
        str_output += "{魔力}+1D" + " ： 基本魔法攻撃 \\n";

        str_output += "ーーーーーーーーーーーーーーー \\n";

        //console.log("2+" + data["abl_avoid"] + " 回避（ヘイトアンダー）");
        str_output += "2+" + data["abl_avoid"] + " 【回避】（ヘイトアンダー） \\n";

        //console.log("2+" + data["abl_resist"] + " 抵抗（ヘイトアンダー）");
        str_output += "2+" + data["abl_resist"] + " 【抵抗】（ヘイトアンダー） \\n";

        //console.log(data["abl_avoid"] + " 回避（ヘイトトップ）");
        str_output += data["abl_avoid"] + " 【回避】（ヘイトトップ） \\n";

        //console.log(data["abl_resist"] + " 抵抗（ヘイトトップ）");
        str_output += data["abl_resist"] + " 【抵抗】（ヘイトトップ） \\n";


        let timing_dict = {
            "メジャー": 0,
            "マイナー": 0,
            "ムーブ": 0,
            "イニシアチブ": 0,
            "常時": 0,
            "セットアップ": 0,
            "プリプレイ": 0,
            "ダメージ適用直前": 0,
            "ダメージ適用直後": 0,
            "本文": 0,
            "クリンナップ": 0,
        };
          
          // Initialize variables react, react_val, inv_flag, assult_flag, fixed_dam_val to 0
        let react = 0;
        let react_val = 0;
        let inv_flag = 0;
        let assult_flag = 0;
        let fixed_dam_val = 0;

        for (let i_num = 0; i_num < data["skills"].length; i_num++) {
        // タイミングの名前書くやつ
            try {
                for (let key in timing_dict) {
                    if (key === data["skills"][i_num]["timing"]) {
                        timing_dict[key] += 1;
                    }
                }
            
                if (timing_dict[data["skills"][i_num]["timing"]] == 1) {
                    //console.log("◯ ", data["skills"][i_num]["timing"]);
                    str_output += "\\n◯ " + String(data["skills"][i_num]["timing"]);
                }
                else if (timing_dict[data["skills"][i_num]["timing"]] > 1) {
                }
                else{
                    str_output += "\\n◯ その他";
                }
            }

            catch {
                
                //console.log("◯ その他");
                str_output += "\\n◯ その他";
                
                hoge = 1;
            }

            // 技能の処理
            try {
            //スキル名・技能のタイミング・効果の記述
                str_output += "\\n\\n" + "《" + data["skills"][i_num]["name"] + "》[" + data["skills"][i_num]["timing"] + "] [ SR：" + data["skills"][i_num]["skill_rank"] + "/" + data["skills"][i_num]["skill_max_rank"] + " ] [ 射程：" + data["skills"][i_num]["range"] + "] [ 対象：" + data["skills"][i_num]["target"] +"] [ 判定：" + data["skills"][i_num]["roll"] +"]"+ "] [ コスト：" + data["skills"][i_num]["cost"] +" ] [ 制限：" + data["skills"][i_num]["limit"] + " ]    " + data["skills"][i_num]["function"];

                //メジャー技能処理
                if (data["skills"][i_num]["timing"] == "メジャー" ) {

                    //例外処理
                    if (data["skills"][i_num]["name"] == "シールドスウィング") {
                        //console.log(data["abl_hit"] + " ：命中値");
                        str_output += "\\n" + data["abl_hit"] + " ：命中値";
                        //console.log(data["hand1"]["physical_defense"] + "+" + data["skills"][i_num]["skill_rank"] + "D" + " ：《シールドスウィング》ダメージ");
                        str_output += "\\n" + data["hand1"]["physical_defense"] + "+" + data["skills"][i_num]["skill_rank"] + "D" + " ：《シールドスウィング》ダメージ";
                    } else if (data["skills"][i_num]["name"] == "ホーリーシールド") {
                        //console.log(data["abl_hit"] + " ：命中値");
                        str_output += "\\n" + data["abl_hit"] + " ：命中値";
                        //console.log(data["hand1"]["magic_defense"] + "+" + data["skills"][i_num]["skill_rank"] + "D" + " ：《ホーリーシールド》ダメージ");
                        str_output += "\\n" + data["hand1"]["magic_defense"] + "+" + data["skills"][i_num]["skill_rank"] + "D" + " ：《ホーリーシールド》ダメージ";
                        //str(data["hand1"]["magic_defense"] + "+" + data["skills"][i_num]["skill_rank"] + "D" + " ：ホーリーシールドダメージ");

                    } else {
                    // ここから技能の一般化

                        // "　］"で文字を区切る
                        let test_slice1 = data["skills"][i_num]["function"].split("］");
                        // "Ｄ"が含まれているやつを取り出す
                        let strMatch = test_slice1.filter(x => x.includes("Ｄ"));
                        // リストで入ってるのでstr型に落とす  ←  ここがカス
                        let test_slice2 = strMatch[0];
                        // "［"で前方を切り出す
                        let test_slice3 = test_slice2.split("［");
                        // "Ｄ"が含まれているやつを取り出す（２回目）
                        let strMatch2 = test_slice3.filter(x => x.includes("Ｄ"));
                        // リストで入ってるのでstr型に落とす  ←  ここもカス
                        let test_slice4 = strMatch2[0];
                        // カスコードの残骸。消すとわからなくなるから残せてる
                        let output_str = test_slice4;

                        // 技能の技能値を反映
                        let a = String(data["skills"][i_num]["skill_rank"]);
                        let output_new = output_str.replace("ＳＲ", a);
                        // 【】を{}に置換（チャパレで動くように）
                        let output_new_one = output_new.replace("【", "{").replace("】", "}");

                        // 攻撃の場合は命中を反映
                        if (data["skills"][i_num]["roll"] !== "判定なし") {
                            // console.log(data["abl_hit"] + " ：命中値");
                            str_output += "\\n" + data["abl_hit"] + "　：命中値";
                            // console.log(output_new_one + " 《" + data["skills"][i_num]["name"] + "》ダメージ");
                            str_output += "\\n" + output_new_one + "　《" + data["skills"][i_num]["name"] + "》ダメージ";
                        } else {

                        //回復の時（攻撃以外）は名称変更
                            // console.log(output_new_one + " 《" + data["skills"][i_num]["name"] + "》");
                            str_output += "\\n" + output_new_one + "　《" + data["skills"][i_num]["name"] + "》";
                        }

                        //アサルトスタンス時のダメージ
                        if (assult_flag === 1) {
                            let output_new_second = output_new_one + "＋" + fixed_dam_val.toString();
                            //console.log(output_new_second);
                            str_output += "\\n" + output_new_second + " アサルトスタンス適用ダメージ";
                        }
                    }  
                }
                else if (data["skills"][i_num]["name"] === "リアクティブマスタリー") {
                    react = react + data["skills"][i_num]["skill_rank"];
                }
                else if (data["skills"][i_num]["name"] == "インヴォークリアクト"){
                    inv_flag =inv_flag + 1
                }
                else if(data["skills"][i_num]["name"] == "ホワイトローブ・スタイル"){
                    react_val = react_val + data["skills"][i_num]["skill_rank"] * 3
                }
                else if (data["skills"][i_num]["name"] == "リアクティブヒール") {
                    react += 2;
                
                    if (react_val != 0) {
                        //console.log(react_val + "+" + react + "D" + " リアクティブヒール回復量");
                        str_output += "\\n" + react_val + "+" + react + "D" + " リアクティブヒール回復量";
                    } else {
                        //console.log(react + "D" + " リアクティブヒール回復量");
                        str_output += "\\n" + react + "D" + " リアクティブヒール回復量";
                    }
                
                    if (inv_flag == 1) {
                        if (react_val != 0) {
                            //console.log(react_val + "+" + "{魔力}+" + react + "D" + " リアクティブヒール回復量（インヴォーリアクト使用）");
                            str_output += "\\n" + react_val + "+" + "{魔力}+" + react + "D" + " リアクティブヒール回復量（インヴォーリアクト使用）";
                        } else {
                            //console.log("{魔力}+" + react + "D" + " リアクティブヒール回復量（インヴォーリアクト使用）");
                            str_output += "\\n" + "{魔力}+" + react + "D" + " リアクティブヒール回復量（インヴォーリアクト使用）";
                        }
                    }
                }
                else if(data["skills"][i_num]["name"] == "アサルト・スタンス"){
                    fixed_dam_val = fixed_dam_val + data["skills"][i_num]["skill_rank"]*4
                    assult_flag = 1
                    str_output +=str("\\n"+fixed_dam_val)
                }
                else if(data["skills"][i_num]["name"] == "禊ぎの障壁"){
                    //print("C({魔力}+{回復力}+15) 禊ぎの障壁付与障壁量")
                    str_output +=str("\\n"+"C({魔力}+{回復力}+15) 禊ぎの障壁付与障壁量")
                }
                else if(data["skills"][i_num]["name"] == "ハートビートヒーリング"){
                    //print("C({魔力}+{回復力}+15) 禊ぎの障壁付与障壁量")
                    str_output +=str("\\n"+"C({魔力}+10) ハートビートヒーリング付与再生量")
                }
            }
            catch {
                var an = 1;
            }   
        }

        str_output += "ーーーーーーーーーーーーーーー \\n";

        str_output += "\\n\\n ◯ 基本行動 \\n";
        str_output += "敵情を探る  [タイミング：ブリーフィング] [判定：基本（知覚／探知）] 効果：敵情を探り、情報を得る。〔達成値：10〕登場エネミー数を知る 〔達成値：20〕最もランクが低いエネミーの情報を公開〔ファンブル〕敵に気づかれる" + "\\n";
        str_output += "異常探知  [タイミング：セットアップ] [判定：基本（知覚／探知）] 効果：対象の［隠蔽］状態および［隠密］状態は解除される。" + "\\n";
        str_output += "エネミー識別  [タイミング：セットアップ] [判定：基本（知識／探知）] 効果：対象は［識別済］状態となる。" + "\\n";
        str_output += "プロップ解除  [タイミング：セットアップ] [判定：基本（解除／探知）] 効果：［識別済］の［ギミック］を戦闘不能にする" + "\\n";
        str_output += "プロップ解析  [タイミング：セットアップ] [判定：基本（解析／探知）] 効果：［識別済］のプロップの機能を停止させる" + "\\n";
        str_output += "かばう  [タイミング：ダメージ適用直前] [射程：至近] 効果：［ダメージ適用ステップ］であなた以外の対象が受ける予定のダメージをかわりに受ける。《かばう》を行なうためには［未行動］でなければならず、また《かばう》を行なうことで即座に［行動済］になる。" + "\\n";

        str_output += "ーーーーーーーーーーーーーーー \\n";


        //console.log(" ◯ 各種判定")
        str_output += "\\n\\n ◯ 各種判定 \\n";

        //console.log(data["abl_motion"] + " 運動値")
        str_output += data["abl_motion"] + " 運動値\\n";

        //console.log(data["abl_durability"] + " 耐久値")
        str_output += data["abl_durability"] + " 耐久値\\n";

        //console.log(data["abl_dismantle"] + " 解除値")
        str_output += data["abl_dismantle"] + " 解除値\\n";

        //console.log(data["abl_operate"] + " 操作値")
        str_output += data["abl_operate"] + " 操作値\\n";

        //console.log(data["abl_sense"] + " 知覚値")
        str_output += data["abl_sense"] + " 知覚値\\n";

        //console.log(data["abl_negotiate"] + " 交渉値")
        str_output += data["abl_negotiate"] + " 交渉値\\n";

        //console.log(data["abl_knowledge"] + " 知識値")
        str_output += data["abl_knowledge"] + " 知識値\\n";

        //console.log(data["abl_analyze"] + " 解析値")
        str_output += data["abl_analyze"] + " 解析値\\n";


        let string_with_newline = str_output;
        return `{"kind":"character","data":{"name":"${data.name}","memo":"${data.tags}","initiative":${(data.action + 0.1)},"externalUrl":"${data.sheet_url}","iconUrl":"","commands":"${string_with_newline}","status":[{"label":"HP","value":${data.max_hitpoint},"max":${data.max_hitpoint}},{"label":"ヘイト","value":0,"max":0},{"label":"疲労","value":0,"max":0},{"label":"因果力","value":${data.effect},"max":0},{"label":"障壁","value":0,"max":0}],"params":[{"label":"STR","value":"${data.str_value}"},{"label":"DEX","value":"${data.dex_value}"},{"label":"POW","value":"${data.pow_value}"},{"label":"INT","value":"${data.int_value}"},{"label":"攻撃力","value":"${data.physical_attack}"},{"label":"魔力","value":"${data.magic_attack}"},{"label":"回復力","value":"${data.heal_power}"},{"label":"物防","value":"${data.physical_defense}"},{"label":"魔防","value":"${data.magic_defense}"},{"label":"行動力","value":"${data.action}"},{"label":"移動力","value":"${data.move}"}]}}`;

    } catch (error) {
      console.error('Error fetching character data:', error);
    }
}
