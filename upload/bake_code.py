id = 211352

# requestsライブラリを利用
import requests

# jsonライブラリを利用
import json

import pyperclip

# 冒険者窓口が提供しているJSONデータの取得
URL = "https://lhrpg.com/lhz/api/" + str(id) + ".json"
#print(URL)

# リクエストを送信
res = requests.get(URL)

# JSONレスポンスを取得
data = json.loads(res.text)

i_num = 8


str_output = ""

#print(" ")
#print("◯ 戦闘の基本")
str_output += "◯ 戦闘の基本 \\n"

#print(str(data["abl_hit"] + " ：命中値"))
str_output += str(data["abl_hit"] + " ：命中値 \\n")

#print(str("2+" + data["abl_avoid"])+" 回避（ヘイトアンダー）")
str_output += str("2+" + data["abl_avoid"])+" 回避（ヘイトアンダー） \\n"

#print(str("2+"+ data["abl_resist"])+" 抵抗（ヘイトアンダー）")
str_output += str("2+"+ data["abl_resist"])+" 抵抗（ヘイトアンダー） \\n"

#print(str(data["abl_avoid"]+" 回避（ヘイトトップ）"))
str_output += str(data["abl_avoid"]+" 回避（ヘイトトップ） \\n")

#print(str(data["abl_resist"]+" 抵抗（ヘイトトップ）"))
str_output += str(data["abl_resist"]+" 抵抗（ヘイトトップ） \\n")

#print(" ")

timing_dict={
  "メジャー" : 0,
  "マイナー" : 0,
  "ムーブ" : 0,
  "イニシアチブ" : 0,
  "常時" : 0,
  "セットアップ" : 0,
  "プリプレイ" : 0,
  "本文" : 0,
}
react = 0
react_val = 0
inv_flag = 0
assult_flag = 0
fixed_dam_val = 0





for i_num in range(len(data["skills"])):
  #タイミングの名前書くやつ
  try:
    for key in timing_dict.keys():
      if(key == data["skills"][i_num]["timing"]):
        timing_dict[key] = timing_dict[key] + 1


    if(timing_dict[data["skills"][i_num]["timing"]] == 1):
      #print("◯ ",data["skills"][i_num]["timing"])
      str_output += "◯ "+ str(data["skills"][i_num]["timing"])
  except:
    #print("◯ その他")
    str_output += "\\n◯ その他"
 
  #技能の処理
  try:
    #スキル名・技能のタイミング・効果の記述
    #print("　《",data["skills"][i_num]["name"],"》[", data["skills"][i_num]["timing"],"] [ SR：",data["skills"][i_num]["skill_rank"],"/",data["skills"][i_num]["skill_max_rank"]," ] [ 射程：",data["skills"][i_num]["range"],"] ",data["skills"][i_num]["function"])
    str_output += "\\n\\n"+"《" + str(data["skills"][i_num]["name"]) + "》[" + str(data["skills"][i_num]["timing"]) + "] [ SR：" + str(data["skills"][i_num]["skill_rank"]) + "/" + str(data["skills"][i_num]["skill_max_rank"]) + " ] [ 射程：" + str(data["skills"][i_num]["range"]) + "] " + (data["skills"][i_num]["function"])

    #print(data["skills"][i_num])
    #print(data["skills"][i_num]["function"])


 
    if(data["skills"][i_num]["timing"] == "メジャー"):
#例外処理
      if(data["skills"][i_num]["name"] == "シールドスウィング"):
        #print(str(data["abl_hit"]) + " ：命中値")
        str_output +=str("\\n" + str(data["abl_hit"]) + " ：命中値")
        #print(str(data["hand1"]["physical_defense"]) + "+" + str(data["skills"][i_num]["skill_rank"]) + "D" + " ：《シールドスウィング》ダメージ")
        str_output +=str("\\n" + str(data["hand1"]["physical_defense"]) + "+" + str(data["skills"][i_num]["skill_rank"]) + "D" + " ：《シールドスウィング》ダメージ")

      elif(data["skills"][i_num]["name"] == "ホーリーシールド"):
        #print(str(data["abl_hit"]) + " ：命中値")
        str_output +=str("\\n" + str(data["abl_hit"]) + " ：命中値")
        #print(str(data["hand1"]["magic_defense"]) + "+" + str(data["skills"][i_num]["skill_rank"]) + "D" + " ：《ホーリーシールド》ダメージ")
        str_output +=str("\\n" + str(data["hand1"]["magic_defense"]) + "+" + str(data["skills"][i_num]["skill_rank"]) + "D" + " ：《ホーリーシールド》ダメージ")
        #str(data["hand1"]["magic_defense"] + "+" + data["skills"][i_num]["skill_rank"] + "D" + " ：ホーリーシールドダメージ")

      else:
#ここから技能の一般化
        #"　］"で文字を区切る
        test_slice_1 = data["skills"][i_num]["function"].split("］")
        #　"Ｄ"が含まれているやつを取り出す
        str_match = list(filter(lambda x: "Ｄ" in x, test_slice_1))
        #リストで入ってるのでstr型に落とす  ←  ここがカス
        test_slice_2 = str_match[0]
        #"［"で前方を切り出す
        test_slice_3 = test_slice_2.split("［")
        #　"Ｄ"が含まれているやつを取り出す（２回目）
        str_match_2 = list(filter(lambda x: "Ｄ" in x, test_slice_3))
        #リストで入ってるのでstr型に落とす  ←  ここもカス
        test_slice_4 = str_match_2[0]
        #カスコードの残骸。消すとわからなくなるから残せてる
        output_str = test_slice_4

        #技能の技能値を反映
        a = str(data["skills"][i_num]["skill_rank"])
        output_new = output_str.replace("ＳＲ",a)
        #【】を{}に置換（チャパレで動くように）
        output_new_one = output_new.replace("【","{").replace("】","}")
        #攻撃の場合は命中を反映
        if(data["skills"][i_num]["roll"] != "判定なし"):
          #print(data["abl_hit"] + " ：命中値")
          str_output +=str("\\n" + data["abl_hit"] + " ：命中値")
          #print(output_new_one + " 《",data["skills"][i_num]["name"],"》ダメージ")
          str_output +=str("\\n" + output_new_one + "《",data["skills"][i_num]["name"],"》ダメージ")
        else:
          #print(output_new_one + " 《",data["skills"][i_num]["name"],"》")
          str_output +=str("\\n" + output_new_one + "《",data["skills"][i_num]["name"],"》")
        
        if(assult_flag == 1):
          output_new_second = output_new_one + "＋" + str(fixed_dam_val)
          #print(output_new_second)
          str_output +=str("\\n" + output_new_second)

    #ここから例外処理

 #例外処理
    elif(data["skills"][i_num]["name"] == "リアクティブマスタリー"):
      react = react+data["skills"][i_num]["skill_rank"]

    elif(data["skills"][i_num]["name"] == "インヴォークリアクト"):
      inv_flag =inv_flag + 1

    elif(data["skills"][i_num]["name"] == "ホワイトローブ・スタイル"):
      react_val = react_val + data["skills"][i_num]["skill_rank"] * 3

    elif(data["skills"][i_num]["name"] == "リアクティブヒール"):
      react = react+2

      if(react_val != 0):
        #print(str(react_val)+"+"+str(react)+"D"+" リアクティブヒール回復量")
        str_output +=str("\\n" + str(react_val)+"+"+str(react)+"D"+" リアクティブヒール回復量")

      else:
        #print(str(react)+"D"+" リアクティブヒール回復量")
        str_output +=str("\\n"+str(react)+"D"+" リアクティブヒール回復量")

      if(inv_flag == 1):
        if(react_val != 0):
          #print(str(react_val)+"+"+"{魔力}+"+str(react)+"D"+" リアクティブヒール回復量（インヴォーリアクト使用）")
          str_output +=str("\\n"+str(react_val)+"+"+"{魔力}+"+str(react)+"D"+" リアクティブヒール回復量（インヴォーリアクト使用）")

        else:
          #print("{魔力}+"+str(react)+"D"+" リアクティブヒール回復量（インヴォーリアクト使用）")
          str_output +=str("\\n"+"{魔力}+"+str(react)+"D"+" リアクティブヒール回復量（インヴォーリアクト使用）")

    elif(data["skills"][i_num]["name"] == "アサルト・スタンス"):
      fixed_dam_val = fixed_dam_val + data["skills"][i_num]["skill_rank"]*4
      assult_flag = 1
      #print(fixed_dam_val)
      str_output +=str("\\n"+fixed_dam_val)

    elif(data["skills"][i_num]["name"] == "禊ぎの障壁"):
      #print("C({魔力}+{回復力}+15) 禊ぎの障壁付与障壁量")
      str_output +=str("\\n"+"C({魔力}+{回復力}+15) 禊ぎの障壁付与障壁量")

    elif(data["skills"][i_num]["name"] == "ハートビートヒーリング"):
      #print("C({魔力}+{回復力}+15) 禊ぎの障壁付与障壁量")
      str_output +=str("\\n"+"C({魔力}+10) ハートビートヒーリング付与再生量")


  except:
    #print("なし")
    a = 1
  #print(" ")





#print(" ◯ 各種判定")
str_output += "\\n\\n ◯ 各種判定 \\n"

#print(str(data["abl_motion"] + " 運動値"))
str_output += str(data["abl_motion"] + " 運動値\\n")

#print(str(data["abl_durability"] + " 耐久値"))
str_output += str(data["abl_durability"] + " 耐久値\\n")

#print(str(data["abl_dismantle"] + " 解除値"))
str_output += str(data["abl_dismantle"] + " 解除値\\n")

#print(str(data["abl_operate"] + " 操作値"))
str_output += str(data["abl_operate"] + " 操作値\\n")

#print(str(data["abl_sense"] + " 知覚値"))
str_output += str(data["abl_sense"] + " 知覚値\\n")

#print(str(data["abl_negotiate"] + " 交渉値"))
str_output += str(data["abl_negotiate"] + " 交渉値\\n")

#print(str(data["abl_knowledge"] + " 知識値"))
str_output += str(data["abl_knowledge"] + " 知識値\\n")

#print(str(data["abl_analyze"] + " 解析値"))
str_output += str(data["abl_analyze"] + " 解析値\\n")

#print(str_output)

string_with_oldline = '{"kind":"character","data":{"name":"'+data.get("name")+'","initiative":'+str(data.get("action")+0.1)+',"externalUrl":"'+data.get("sheet_url")+'","iconUrl":"","commands":"'+str_output+'","status":[{"label":"HP","value":'+str(data.get("max_hitpoint"))+',"max":'+str(data.get("max_hitpoint"))+'},{"label":"ヘイト","value":0,"max":0},{"label":"疲労","value":0,"max":0},{"label":"因果力","value":' + str(data.get("effect")) + ',"max":0},{"label":"障壁","value":0,"max":0}],"params":[{"label":"STR","value":"' + str(data.get("str_value")) + '"},{"label":"DEX","value":"' + str(data.get("dex_value")) + '"},{"label":"POW","value":"' + str(data.get("pow_value")) + '"},{"label":"INT","value":"' + str(data.get("int_value")) + '"},{"label":"攻撃力","value":"' + str(data.get("physical_attack")) + '"},{"label":"魔力","value":"' + str(data.get("magic_attack")) + '"},{"label":"回復力","value":"' + str(data.get("heal_power")) + '"},{"label":"物防","value":"' + str(data.get("physical_defense")) + '"},{"label":"魔防","value":"' + str(data.get("magic_defense")) + '"},{"label":"行動力","value":"' + str(data.get("action")) + '"},{"label":"移動力","value":"' + str(data.get("move")) + '"}]}}'
print(string_with_oldline)