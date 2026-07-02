import { useState, useEffect } from "react";

const QUESTION_BANK = {
  s1: [
    // 人物選択形式
    { type:"select", question:"近代病理学の父として正しい人物はどれか。", choices:["①モルガーニ","②ロキタンスキー","③ヒポクラテス","④ウィルヒョウ"], answer:0, explanation:"モルガーニ（1682-1771）は700以上の病理解剖を行い「疾患は臓器単位で起こる」を確立した近代病理学の父。ウィルヒョウは現代病理学の父、ヒポクラテスは医学の父。" },
    { type:"select", question:"医学の父として正しい人物はどれか。", choices:["①モルガーニ","②ロキタンスキー","③ヒポクラテス","④ガレノス"], answer:2, explanation:"ヒポクラテス（BC460-370）は四体液説を提唱し、科学としての医学の端緒を開いた「医学の父」。" },
    { type:"select", question:"現代病理学の父として正しい人物はどれか。", choices:["①モルガーニ","②ロキタンスキー","③ヒポクラテス","④ウィルヒョウ"], answer:3, explanation:"ウィルヒョウ（1821-1902）は「Omnis cellula e cellula（すべての細胞は細胞から）」を提唱し細胞病理学を確立した現代病理学の父。" },
    // ○×形式
    { type:"truefalse", question:"術中迅速診断は、組織の加圧・薄切り・染色などにより短時間で標本を作り、手術中の断端評価やリンパ節転移の評価を行う。", answer:true, explanation:"◯。術中迅速診断（frozen section）は組織を凍結・薄切りしてHE染色し、手術中に断端の癌遺残やリンパ節転移の有無を評価するもの。" },
    { type:"truefalse", question:"細胞の種類により発現するアクチンフィラメントの種類が異なることを利用して、免疫組織化学的に上皮、間葉系細胞、神経細胞を区別することができる。", answer:false, explanation:"×。免疫組織化学で細胞種を区別するために利用するのはアクチンフィラメントではなく「中間径フィラメント」（サイトケラチン・ビメンチン・デスミン・NFP・GFAPなど）。アクチンは細胞骨格として広く発現する。" },
    { type:"truefalse", question:"細胞傷害の原因として物理的因子の代表として高温・低温・アスベスト・シリカ粉末、化学物質の代表として放射線や青酸・水銀などが挙げられる。", answer:false, explanation:"×。放射線は物理的因子、青酸・水銀は化学的因子。アスベスト・シリカ粉末は物理的因子。分類が入れ替わっており誤り。" },
    { type:"truefalse", question:"壊死では細胞内小器官の腫大と膨化・膜障害が生じる一方、アポトーシスでは核クロマチンの凝縮と断片化がまず起こり、細胞内小器官や膜は比較的保たれる。", answer:true, explanation:"◯。壊死（ネクローシス）では細胞膜・小器官の膨化→破裂→炎症。アポトーシスでは核クロマチン凝縮・断片化→アポトーシス小体形成→貪食。細胞内小器官と膜が保たれるのがアポトーシスの特徴。" },
    { type:"truefalse", question:"外科病理学とは、主に手術や生検で得られた臓器・組織を対象として、肉眼的・顕微鏡的に診断を行う病理学の分野である。", answer:true, explanation:"◯。外科病理学（Surgical Pathology）は手術切除標本・生検組織・剖検を対象とする診断病理学の中心的分野。" },
    { type:"truefalse", question:"ウィルヒョウの「Omnis cellula e cellula」とは「すべての細胞は組織から生じる」という意味である。", answer:false, explanation:"×。「Omnis cellula e cellula」は「すべての細胞は細胞から生じる」という意味。ウィルヒョウが細胞病理学確立の根本原理として提唱した。" },
    { type:"truefalse", question:"病理診断において、腫瘍性病変は多彩性（polymorphous）が特徴で多種類の細胞が混在し、炎症性病変は単一性（monomorphous）が特徴である。", answer:false, explanation:"×。逆。炎症性病変は多彩性（polymorphous）で多種の細胞が混在、腫瘍性病変は単一性（monomorphous）で一種類の細胞が増殖するのが特徴。" },
    { type:"select", question:"CPC（臨床病理カンファレンス）の確立に貢献した人物はどれか。", choices:["①ウィルヒョウ","②ブールハーフェ","③ラエンネック","④ヴェサリウス"], answer:1, explanation:"ブールハーフェ（Herman Boerhaave、1668-1738）がCPCを確立。ラエンネックは聴診器の発明者、ヴェサリウスはDe humani corporis fabricaの著者（近代解剖学の創始者）。" },
    { type:"select", question:"「De humani corporis fabrica」を著し現代人体解剖の基礎を作った人物はどれか。", choices:["①モルガーニ","②ウィルヒョウ","③ヴェサリウス","④ガレノス"], answer:2, explanation:"ヴェサリウス（1514-1564）が「De humani corporis fabrica（人体の構造について）」を著した。ガレノスの解剖学的誤りを訂正し、現代人体解剖学の創始者となった。" },
    { type:"truefalse", question:"剖検（autopsy）の目的には、死因究明・臨床診断の確認・病態の解明・教育・研究が含まれる。", answer:true, explanation:"◯。剖検は臨床で確定できなかった診断の確認、死因究明、病態解明、医学教育・研究への貢献など多くの目的をもつ。" },
    { type:"truefalse", question:"細胞診（cytology）では組織の3次元的構造を評価でき、組織生検と同等の診断能を有する。", answer:false, explanation:"×。細胞診は剥離細胞・穿刺吸引細胞を塗抹して評価するため、組織の3次元構造は評価できない。組織生検（histology）のほうが診断精度は高い。低侵襲で繰り返し施行できる点が細胞診の利点。" },
    { type:"truefalse", question:"ロキタンスキーはウィーン医学派の病理学者で、肉眼病理学の発展に大きく貢献した。", answer:true, explanation:"◯。カール・フォン・ロキタンスキー（1804-1878）はウィーン大学の病理学者で、約3万件以上の剖検を行い肉眼病理学（Gross Pathology）を大成させた。近代病理学の確立に貢献した重要人物。" },
    { type:"select", question:"顕微鏡を発明したとされる人物はどれか。", choices:["①ウィルヒョウ","②レーウェンフック","③ヤンセン","④シュワン"], answer:2, explanation:"ヤンセン（Zacharias Janssen、1580-1638頃）が顕微鏡を発明したとされる。レーウェンフックは自作の高倍率顕微鏡で微生物を初めて観察した「微生物学の父」。" },
    { type:"truefalse", question:"炎症の5主徴は発赤・熱感・腫脹・疼痛・機能障害であり、ガレノスが4徴に機能障害を追加して5徴候が完成した。", answer:true, explanation:"◯。ケルスス（BC25-AD50）が4徴（発赤・腫脹・発熱・疼痛）を記載し、ガレノスが機能障害を追加して5徴候が確立された。" },
    { type:"truefalse", question:"モルガーニの主な貢献は「すべての疾患は細胞レベルで起こる」という細胞病理学の確立である。", answer:false, explanation:"×。モルガーニの貢献は「疾患は臓器単位で起こる」という臓器病理学の確立。「細胞レベルでの疾患」を確立したのはウィルヒョウ。" },
    { type:"truefalse", question:"病理組織の系統的観察では、まず観察している臓器を同定し、次に正常か異常かを判断する。", answer:true, explanation:"◯。系統的観察の手順：①臓器の同定→②正常か異常か→③異常の場合：どこに異常があるか・細胞成分・境界・均一性・構築像・細胞種類の評価へと進む。" },
    { type:"select", question:"病理学の分類において「法医学（Forensic Pathology）」の主な対象として正しいのはどれか。", choices:["①生検・切除検体の組織診断","②死因の究明・身元確認","③血液・尿の臨床検査","④動物を用いた実験研究"], answer:1, explanation:"法医学（Forensic Pathology）は死因究明・身元確認・犯罪捜査への協力を主な対象とする。外科病理学が生検・切除検体、臨床病理学が検体検査、実験病理学が動物実験を扱う。" },
  ],
  s2: [
    // ○×形式（代謝障害）
    { type:"truefalse", question:"糖を過剰に摂取した時、骨格筋や肝臓ではグリコーゲンの合成が抑制され、恒常性が保たれる。", answer:false, explanation:"×。糖過剰摂取時はグリコーゲン合成が「亢進」して余剰グルコースを貯蔵する。抑制されるのではなく促進される。" },
    { type:"truefalse", question:"Ⅰ型糖原病（フォン・ギールケ病）はグルコース6ホスファターゼの欠損によりグルコースの合成障害が起こり、空腹時低血糖と肝腫大をきたす。", answer:true, explanation:"◯。Ⅰ型糖原病（フォン・ギールケ病）はグルコース-6-ホスファターゼ欠損→肝でグルコース-6-リン酸→グルコースへの変換障害→空腹時低血糖＋グリコーゲン蓄積→肝腫大・腎腫大。" },
    { type:"truefalse", question:"小腸で吸収されたカイロミクロンと肝臓で合成された超低比重リポタンパク質（VLDL）の脂質成分はトリグリセリドである。", answer:true, explanation:"◯。カイロミクロン（dietary fat運搬）とVLDL（肝での内因性脂質運搬）はいずれも主にトリグリセリド（中性脂肪）を輸送する。LDLはコレステロールが主成分。" },
    { type:"truefalse", question:"リソソームにおける酵素やトランスポーターの先天的欠損は、リソソーム内の複合脂質の蓄積を生じ、Gaucher病やNiemann-Pick病などが代表的な複合脂質代謝異常症である。", answer:true, explanation:"◯。リソソーム病（lysosomal storage disease）：Gaucher病（β-グルコセレブロシダーゼ欠損→グルコセレブロシド蓄積）、Niemann-Pick病（スフィンゴミエリナーゼ欠損→スフィンゴミエリン蓄積）。" },
    { type:"truefalse", question:"フェニルケトン尿症ではフェニルアラニン水酸化酵素が欠損しており、血中フェニルアラニン濃度の上昇による知能障害や副代謝産物であるフェニルピルビン酸の尿中排泄が起こる。", answer:true, explanation:"◯。フェニルケトン尿症（PKU）はフェニルアラニン水酸化酵素欠損→フェニルアラニン蓄積→知能障害・白皮症。フェニルアラニン→フェニルピルビン酸（ケトン体）→尿中排泄（ネズミ臭）。" },
    // 関連選択形式
    { type:"select", question:"高尿酸血症と最も関連の深い疾患・病態はどれか。", choices:["①無効造血","②Wilson病","③レッシュ-ナイハン症候群","④異栄養性石灰化"], answer:2, explanation:"レッシュ-ナイハン症候群はHGPRT（ヒポキサンチングアニンホスホリボシルトランスフェラーゼ）欠損→プリン体の再利用障害→尿酸産生過剰→高尿酸血症・痛風・自傷行為。" },
    { type:"select", question:"高間接ビリルビン血症と最も関連の深い病態はどれか。", choices:["①無効造血","②Wilson病","③レッシュ-ナイハン症候群","④免疫グロブリン"], answer:0, explanation:"高間接ビリルビン血症は溶血や無効造血（骨髄内での赤血球前駆体の崩壊、例：サラセミア・巨赤芽球性貧血）で生じる。肝での抱合前のビリルビン（間接型）が上昇する。" },
    { type:"select", question:"アミロイドーシスと最も関連の深いものはどれか。", choices:["①無効造血","②Wilson病","③レッシュ-ナイハン症候群","④免疫グロブリン"], answer:3, explanation:"AAアミロイドーシス（慢性炎症）やALアミロイドーシス（形質細胞腫・多発性骨髄腫）において免疫グロブリン軽鎖がアミロイド前駆蛋白となる。ALアミロイドーシスが最も代表的。" },
    // ○×形式
    { type:"truefalse", question:"アポトーシスでは細胞内小器官の腫大と膨化・膜障害が生じ、炎症反応を伴う。", answer:false, explanation:"×。これはネクローシス（壊死）の特徴。アポトーシスでは核クロマチン凝縮・断片化→アポトーシス小体形成→マクロファージに貪食。細胞膜・小器官は比較的保たれ、炎症を伴わない。" },
    { type:"truefalse", question:"化生（metaplasia）とは環境変化や修復の過程で、分化した細胞がほかの分化した細胞の形態・機能をもつようになる変化である。", answer:true, explanation:"◯。化生の代表例：慢性胃炎→腸上皮化生、喫煙による気管支粘膜の扁平上皮化生、バレット食道（扁平上皮→円柱上皮）。" },
    { type:"select", question:"「細胞の大きさの増大により本来の形状を保持したまま臓器・組織の大きさが増す現象」を表す用語はどれか。", choices:["①hyperplasia","②hypertrophy","③metaplasia","④atrophy"], answer:1, explanation:"hypertrophy（肥大）は個々の細胞の容積増大による臓器増大。細胞数は変わらない。hyperplasia（過形成）は細胞数増加による増大。両者の区別が重要。" },
    { type:"select", question:"「元々の組織や臓器の細胞が減少したり、容積が減少する現象」を表す用語はどれか。", choices:["①hyperplasia","②hypertrophy","③metaplasia","④atrophy"], answer:3, explanation:"atrophy（萎縮）は正常まで発育した臓器・組織の容積減少。原因：加齢・廃用・栄養障害・神経性・圧迫・虚血。低形成（hypoplasia）や無形成（aplasia）とは区別する。" },
    { type:"truefalse", question:"凝固壊死は組織の形態を保ったまま壊死に至るもので、虚血性梗塞・熱傷・放射線が代表例である。", answer:true, explanation:"◯。凝固壊死（coagulation necrosis）は蛋白質の変性・凝固により組織の輪郭が保たれる。虚血性梗塞（心筋・腎・脾など）が代表例。脳のみ例外で融解壊死を示す。" },
    { type:"truefalse", question:"壊疽とは乾酪壊死に感染が加わった状態をいう。", answer:false, explanation:"×。壊疽（gangrene）は凝固壊死に感染（腐敗）が加わった状態。乾酪壊死は結核に特徴的なチーズ様外観の壊死であり、壊疽とは別の概念。" },
    { type:"truefalse", question:"Wilson病は銅代謝異常疾患であり、肝・脳・角膜（Kayser-Fleischer環）に銅が蓄積する。", answer:true, explanation:"◯。Wilson病はATP7B（銅輸送蛋白）遺伝子変異→胆汁への銅排泄障害→肝・脳・腎・角膜への銅蓄積。角膜のKayser-Fleischer環が特徴的。常染色体潜性遺伝。" },
    { type:"truefalse", question:"Ⅱ型糖尿病は膵β細胞の自己免疫的破壊によりインスリン分泌が絶対的に欠乏する疾患である。", answer:false, explanation:"×。これはⅠ型糖尿病の説明。Ⅱ型糖尿病はインスリン分泌低下＋インスリン抵抗性が原因で、主に生活習慣（肥満・運動不足）と遺伝的素因が関与する。" },
    { type:"select", question:"フォン・ギールケ病（Ⅰ型糖原病）で欠損している酵素はどれか。", choices:["①ライソゾーム酸性α-グルコシダーゼ","②グルコース-6-ホスファターゼ","③ホスホフルクトキナーゼ","④グリコーゲンシンターゼ"], answer:1, explanation:"Ⅰ型糖原病（フォン・ギールケ病）はグルコース-6-ホスファターゼ欠損。グルコース-6-リン酸→グルコースへの変換障害→空腹時低血糖・肝腫大・腎腫大。Ⅱ型（ポンペ病）は酸性α-グルコシダーゼ欠損。" },
    { type:"truefalse", question:"脂肪壊死は急性膵炎で膵リパーゼが脂肪組織を融解・鹸化することにより生じる。", answer:true, explanation:"◯。急性膵炎では活性化された膵リパーゼが腹腔内の脂肪組織を分解→脂肪酸とグリセロールに分解→脂肪酸がカルシウムと結合→鹸化（石鹸様白色斑）。" },
    { type:"truefalse", question:"アミロイドはCongo-red染色で橙赤色に染まり、偏光顕微鏡で緑色の複屈折を示す。", answer:true, explanation:"◯。アミロイドの最も重要な染色はCongo-red染色。偏光顕微鏡での緑色複屈折（apple-green birefringence）がアミロイドの確定診断に用いられる。" },
    { type:"truefalse", question:"永久細胞（神経・心筋・骨格筋）が傷害されると、完全治癒が可能で元の細胞が再生される。", answer:false, explanation:"×。永久細胞（permanent cells）はほとんど増殖しないため、傷害されると瘢痕治癒（線維化）となる。完全治癒が可能なのは不安定細胞（表皮・消化管粘膜・造血細胞）。" },
  ],
  s3: [
    // 炎症5主徴の選択形式
    { type:"multi", question:"炎症の5主徴をすべて選べ。（完全解答）\n選択肢：あ.発赤　い.障害　う.修復　え.熱感　お.機能障害　か.疼痛　き.腫脹", choices:["①発赤・熱感・腫脹・疼痛・機能障害","②発赤・障害・修復・疼痛・機能障害","③発赤・熱感・浮腫・疼痛・機能障害","④発赤・熱感・腫脹・疼痛・うっ血"], answer:0, explanation:"炎症の5主徴：発赤（rubor）・熱感（calor）・腫脹（tumor）・疼痛（dolor）・機能障害。ケルスス4徴（発赤・腫脹・発熱・疼痛）＋ガレノスが追加した機能障害で5徴候が完成。" },
    { type:"truefalse", question:"炎症は「局所に作用した障害因子に対する防御反応、またはそれによって起こった組織細胞障害に対する生体の局所的な修復反応」と定義される。", answer:true, explanation:"◯。炎症の定義として正確。防御反応（病原体除去）と修復反応（組織の回復）の両側面をもつ生体反応。語尾「-itis」で表される。" },
    { type:"truefalse", question:"炎症の原因の代表的なものとして、病原微生物・化学的因子・物理的因子・アレルギー反応などがある。", answer:true, explanation:"◯。炎症の原因：①生物学的因子（病原微生物・死細胞）②化学的因子（重金属・有機溶剤・酸・アルカリ）③物理的因子（外力・熱・放射線・異物）④内因（自己免疫・アレルギー）。" },
    { type:"truefalse", question:"組織細胞障害が起こり炎症反応がスタートすると、毛細血管に存在する血管平滑筋が拡大して血流が増加する。", answer:false, explanation:"×。毛細血管には血管平滑筋はない（細動脈に存在）。炎症初期の血管拡張は細動脈の平滑筋弛緩と毛細血管の充血による。また「拡大」ではなく「弛緩・拡張」が正確。" },
    { type:"truefalse", question:"ヒスタミンは急性炎症におけるケミカルメディエーターであり肥満細胞のみが放出し、血管の拡張・血管透過性の亢進の作用を有する。", answer:false, explanation:"×。ヒスタミンは肥満細胞（マスト細胞）だけでなく好塩基球も放出する。「肥満細胞のみ」が誤り。作用（血管拡張・透過性亢進）の部分は正しい。" },
    // 遊走関連選択形式
    { type:"match", question:"白血球の遊走における「ローリング」に最も関連する分子はどれか。", choices:["①セレクチンファミリー","②インテグリン","③血流緩徐","④走化性因子","⑤CD31"], answer:0, explanation:"ローリングはPセレクチン・Eセレクチン（セレクチンファミリー）が白血球のリガンド（PSGL-1など）に結合して媒介する。緩やかな結合で白血球が転がるように移動する。" },
    { type:"match", question:"白血球の遊走における「接着」に最も関連する分子はどれか。", choices:["①セレクチンファミリー","②インテグリン","③血流緩徐","④走化性因子","⑤CD31"], answer:1, explanation:"強い接着はインテグリン（LFA-1・Mac-1）が内皮細胞のICAM-1・VCAM-1と結合することで媒介される。この段階で白血球は内皮に強固に固定される。" },
    { type:"match", question:"白血球の遊走における「辺縁趨向」に最も関連する現象はどれか。", choices:["①セレクチンファミリー","②インテグリン","③血流緩徐","④走化性因子","⑤CD31"], answer:2, explanation:"辺縁趨向（margination）は炎症局所での血流緩徐・うっ血により白血球が血管辺縁部に集まる現象。ローリング・接着の前段階。" },
    { type:"match", question:"白血球の遊走における「遊出（血管外への移動）」に最も関連する分子はどれか。", choices:["①セレクチンファミリー","②インテグリン","③血流緩徐","④走化性因子","⑤CD31"], answer:4, explanation:"遊出（transmigration/diapedesis）はCD31（PECAM-1）が内皮細胞間隙での白血球の通過を媒介する。CD31は内皮細胞と白血球の両方に発現する。" },
    { type:"match", question:"白血球の遊走における「遊走」に最も関連する因子はどれか。", choices:["①セレクチンファミリー","②インテグリン","③血流緩徐","④走化性因子","⑤CD31"], answer:3, explanation:"血管外に出た白血球は走化性因子（chemotactic factors：IL-8/CXCL8、C5a、LTB4、fMLP）の濃度勾配に従って炎症局所に遊走する。" },
    { type:"truefalse", question:"急性炎症では好中球が最初に浸潤し、慢性炎症ではリンパ球・マクロファージが主体となる。", answer:true, explanation:"◯。急性炎症（数分〜数日）：好中球主体。慢性炎症（数カ月〜年単位）：リンパ球・マクロファージ・形質細胞主体＋線維化。時間経過による細胞浸潤パターンの変化が重要。" },
    { type:"truefalse", question:"漏出（transudate）は炎症特異的で蛋白豊富な液体であり、滲出（exudate）は心不全など物理的圧力変化で生じる蛋白の少ない液体である。", answer:false, explanation:"×。逆。滲出（exudate）が炎症特異的で蛋白豊富（免疫グロブリン・フィブリノーゲン含む）。漏出（transudate）が蛋白の少ない液体で心不全・肝硬変・腎症候群などの物理的圧力変化で生じる。" },
    { type:"truefalse", question:"線維素性炎はフィブリンの沈着が特徴で、大葉性肺炎・絨毛心・偽膜性腸炎が代表例である。", answer:true, explanation:"◯。線維素性炎（fibrinous inflammation）はフィブリン析出が特徴。大葉性肺炎（肺胞腔内のフィブリン析出）・絨毛心（心外膜のフィブリン析出）・偽膜性腸炎（粘膜上のフィブリン偽膜）が代表。" },
    { type:"truefalse", question:"ブラジキニンは血管拡張・血管透過性亢進・痛覚受容体刺激の作用を有し、腫脹と疼痛に関与する。", answer:true, explanation:"◯。ブラジキニン（bradykinin）はカリクレイン-キニン系から産生され、血管拡張・透過性亢進（腫脹）と痛覚受容体（侵害受容器）への直接刺激（疼痛）を引き起こす。" },
    { type:"truefalse", question:"肉芽腫性炎は特異性炎で、活性化マクロファージ由来の類上皮細胞・多核巨細胞・リンパ球で構成される肉芽腫が特徴であり、結核・サルコイドーシスが代表例である。", answer:true, explanation:"◯。肉芽腫（granuloma）は類上皮細胞（活性化マクロファージが変化）＋Langhans型多核巨細胞＋リンパ球で構成。結核は乾酪壊死を伴う、サルコイドーシスは非乾酪性（乾酪壊死なし）。" },
    { type:"truefalse", question:"蜂窩織炎（phlegmon）はび漫性の化膿性炎症で、膿瘍（abscess）は限局した空洞内に膿が貯留した状態である。", answer:true, explanation:"◯。蜂窩織炎（phlegmon）：組織間隙に沿ったび漫性化膿性炎症。膿瘍（abscess）：組織が融解して生じた限局した空洞内の膿貯留→切開排膿が治療。" },
    { type:"truefalse", question:"創傷治癒において、一次治癒は組織欠損が大きく肉芽組織による充填が必要な場合に起こる。", answer:false, explanation:"×。逆。一次治癒（first intention）は清潔な切創など組織欠損が少ない場合の治癒。二次治癒（second intention）が組織欠損が大きく肉芽組織による充填が必要な場合。" },
    { type:"truefalse", question:"ヒスタミンとロイコトリエンはいずれも急性炎症のケミカルメディエーターであり、ヒスタミンは血管拡張、ロイコトリエンは白血球の遊走促進・気管支収縮に関与する。", answer:true, explanation:"◯。ヒスタミン（肥満細胞・好塩基球）→血管拡張・透過性亢進。ロイコトリエン（アラキドン酸→リポキシゲナーゼ経路）→白血球遊走促進・気管支収縮（LTC4・LTD4・LTE4）。" },
    { type:"truefalse", question:"炎症の全身反応として、IL-1・IL-6・TNF-αが肝臓に作用して急性期蛋白（CRP・フィブリノーゲン）を産生させ、また視床下部に作用して発熱を引き起こす。", answer:true, explanation:"◯。炎症の全身反応（急性期反応）：炎症性サイトカイン（IL-1・IL-6・TNF-α）→肝臓（CRP・フィブリノーゲン・血清アミロイドA産生）・視床下部（発熱）・骨髄（白血球増多）に作用。" },
    { type:"truefalse", question:"好中球による殺菌は主に活性酸素（ROS）の産生とミエロペルオキシダーゼ（MPO）を利用した酸化的機序による。", answer:true, explanation:"◯。好中球の殺菌機序：①酸化的バースト（NADPH oxidaseによるO2-・H2O2産生）②MPO（H2O2＋Cl-→HOCl次亜塩素酸）による強力な殺菌。CGD（慢性肉芽腫症）はNADPH oxidase欠損で難治性感染症を来す。" },
  ],
  s4: [
    { type:"truefalse", question:"ある病原微生物が動物からヒト、あるいはヒトからヒトに伝播する場合を伝染病という。", answer:false, explanation:"×。動物からヒトへの伝播は「人畜共通感染症（zoonosis）」。ヒトからヒトへの伝播が伝染病（infectious disease）の定義。問題文は動物→ヒトも含めており誤り。" },
    { type:"truefalse", question:"健康な人には通常感染症を引き起こさないような弱い病原体が、免疫力が低下した状態の時に感染し病気を引き起こすことを日和見感染という。", answer:true, explanation:"◯。日和見感染（opportunistic infection）：免疫不全（HIV/AIDS・ステロイド投与・抗癌剤使用など）の患者に通常感染力の弱い病原体が感染して発症。ニューモシスチス・CMV・カンジダなどが代表。" },
    { type:"truefalse", question:"新興感染症とは、新たに知られるようになった感染症のことで、新型コロナウイルス感染症やウエストナイル熱がこれに含まれる。", answer:true, explanation:"◯。新興感染症（emerging infectious disease）：1970年代以降に新たに認識された感染症。HIV/AIDS・エボラ出血熱・SARS・COVID-19・ウエストナイル熱など。再興感染症は一度減少後に再び増加した感染症（結核・マラリアなど）。" },
    { type:"truefalse", question:"HIVウイルスはCD8抗原陽性の細胞に感染して、細胞性免疫を障害する。", answer:false, explanation:"×。HIVはCD4抗原陽性細胞（CD4+ヘルパーT細胞・マクロファージ・樹状細胞）に感染する。CD8+細胞（細胞傷害性T細胞）ではなくCD4+細胞が標的。CD4+T細胞の減少→細胞性免疫の低下→日和見感染症。" },
    // 関連選択形式
    { type:"match", question:"連鎖球菌と最も関連の深い疾患はどれか。", choices:["①急性糸球体腎炎","②ベロ毒素","③グラム陰性球菌","④偽膜性腸炎"], answer:0, explanation:"Group A連鎖球菌（化膿性連鎖球菌）の感染後症候群：急性糸球体腎炎（免疫複合体型）・リウマチ熱。連鎖球菌は直接的に腎炎を起こすのではなく、感染後の免疫応答が病態の主体。" },
    { type:"match", question:"クロストリジウムと最も関連の深い疾患はどれか。", choices:["①急性糸球体腎炎","②ベロ毒素","③グラム陰性球菌","④偽膜性腸炎"], answer:3, explanation:"Clostridium difficile→偽膜性腸炎（抗生剤使用後の菌交代現象）。C.tetani→破傷風、C.perfringens→ガス壊疽、C.botulinum→ボツリヌス症もクロストリジウム属。" },
    { type:"match", question:"淋菌を分類上正確に表すものはどれか。", choices:["①急性糸球体腎炎","②ベロ毒素","③グラム陰性球菌","④偽膜性腸炎"], answer:2, explanation:"淋菌（Neisseria gonorrhoeae）はグラム陰性球菌（双球菌）。性感染症（淋病）の原因菌で、尿道・子宮頸部などの粘膜に化膿性炎症を起こす。髄膜炎菌（N.meningitidis）も同属のグラム陰性双球菌。" },
    { type:"match", question:"大腸菌と最も関連の深い毒素はどれか。", choices:["①急性糸球体腎炎","②ベロ毒素","③グラム陰性球菌","④偽膜性腸炎"], answer:1, explanation:"腸管出血性大腸菌（O157:H7など）はベロ毒素（志賀毒素）を産生→血管内皮傷害→出血性腸炎・溶血性尿毒症症候群（HUS：溶血性貧血・血小板減少・急性腎不全）。" },
    { type:"truefalse", question:"プリオンは一本鎖RNAを有し、感染性タンパク質が脳や脊髄に分布する。", answer:false, explanation:"×。プリオンは核酸（DNAもRNAも）を持たない感染性タンパク質（PrPSc）のみで構成される。「一本鎖RNA」を有するという記述が誤り。異常型プリオン（PrPSc）が正常型（PrPc）を異常型に変換して蓄積し脳を傷害する。" },
    { type:"truefalse", question:"糞線虫は虫卵を経口的に摂取することにより感染し、九州と沖縄は侵淫地である。", answer:false, explanation:"×。糞線虫（Strongyloides stercoralis）は皮膚から幼虫が侵入する経皮感染（経口ではない）が主な感染経路。土壌中の幼虫が素足などから皮膚を貫通して感染する。九州・沖縄が侵淫地である部分は正しい。" },
    { type:"truefalse", question:"T細胞欠損の場合、ヘルペスウイルスやサイトメガロウイルスなどのウイルス感染症のリスクが最も高まる。", answer:true, explanation:"◯。T細胞欠損→ウイルス感染（ヘルペス・CMV・EBV）のリスク増大。B細胞欠損→化膿性細菌感染（MRSA・緑膿菌・大腸菌）。マクロファージ欠損→真菌（カンジダ・ニューモシスチス）・抗酸菌。" },
    { type:"truefalse", question:"結核（Mycobacterium tuberculosis）の組織像として乾酪壊死を伴う類上皮細胞性肉芽腫が特徴的で、Langhans型多核巨細胞を含む。", answer:true, explanation:"◯。結核の組織像は①乾酪壊死（caseous necrosis）②類上皮細胞性肉芽腫③Langhans型多核巨細胞（核が馬蹄形〜弧状に配列）が三大特徴。抗酸菌染色（Ziehl-Neelsen染色）で菌を確認。" },
    { type:"truefalse", question:"アスペルギルスは組織中で中隔のある菌糸を形成し、Y字型（45度前後）に分岐するのに対し、ムーコルは中隔なし・90度以上の大きな分岐・血管親和性を示す。", answer:true, explanation:"◯。アスペルギルス：中隔あり・45度前後のY字分岐。ムーコル（接合菌）：中隔なし（non-septate）・90度以上の大きな分岐・血管内侵入（血栓性梗塞）。この2点の鑑別が試験に頻出。" },
    { type:"truefalse", question:"梅毒（Treponema pallidum）は主に性的接触と経胎盤感染で伝播し、先天性梅毒のHutchinson三徴はHutchinson歯・実質性角膜炎・内耳性難聴である。", answer:true, explanation:"◯。梅毒はスピロヘータ（T.pallidum）によるSTD。先天性梅毒のHutchinson三徴：①Hutchinson歯（切歯の先端が三日月型）②実質性角膜炎③内耳性難聴。第1〜4期の病期進行が重要。" },
    { type:"truefalse", question:"黄色ブドウ球菌のエンテロトキシンは100℃・30分の加熱で失活するため、加熱食品での食中毒は起こりにくい。", answer:false, explanation:"×。黄色ブドウ球菌のエンテロトキシンは「耐熱性」外毒素で、100℃・30分の加熱でも分解されない。このため加熱調理後も毒素が残存し食中毒の原因となる。潜伏期間が1-6時間と短い。" },
    { type:"truefalse", question:"B型肝炎ウイルス（HBV）表面抗原（HBsAg）を含む「すりガラス細胞」はVictoria Blue染色で検出できる。", answer:true, explanation:"◯。HBVキャリアの肝細胞はHBsAgが小胞体に蓄積→「すりガラス細胞（ground-glass hepatocyte）」を形成。Victoria Blue染色（またはオルセイン染色）でHBsAgを含む細胞質が染色される。" },
    { type:"truefalse", question:"ニューモシスチス（Pneumocystis jirovecii）肺炎はT細胞欠損患者（特にAIDS）に多く、グロコット染色で嚢子（cyst）を検出できる。", answer:true, explanation:"◯。ニューモシスチス肺炎（PCP）はCD4+T細胞数が200/μL未満のAIDS患者などで発症する日和見感染症。グロコット染色（または蛍光抗体法）で嚢子・栄養体を検出。ST合剤（トリメトプリム-スルファメトキサゾール）が治療・予防薬。" },
    { type:"truefalse", question:"腸管出血性大腸菌（O157）のベロ毒素は血管内皮細胞を傷害し、溶血性尿毒症症候群（HUS）を引き起こす。", answer:true, explanation:"◯。ベロ毒素（志賀毒素）は腸管・腎の血管内皮細胞のリボソームを傷害（蛋白合成阻害）→微小血管内血栓→HUS（微小血管障害性溶血性貧血＋血小板減少＋急性腎不全）。" },
    { type:"truefalse", question:"H.pylori（ヘリコバクター・ピロリ）感染は、慢性胃炎・消化性潰瘍の原因となるだけでなく、胃癌やMALTリンパ腫の発生にも関与する。", answer:true, explanation:"◯。H.pyloriはWHOが指定する発癌物質Group Ⅰ（ヒトに対する確実な発癌物質）。慢性胃炎→腸上皮化生→胃癌（特に腸型胃癌）、MALTリンパ腫（胃の粘膜関連リンパ組織型B細胞リンパ腫）の原因。除菌でMALTリンパ腫は治癒可能な場合も。" },
  ],
  s5: [
    // 先天異常・遺伝 - I セクション
    { type:"truefalse", question:"形成異常とは出生時に既に存在し、肉眼的に確認されうる形態異常と定義される。", answer:false, explanation:"×。「形成異常（malformation）」は器官形成過程の異常による構造的欠陥。問題文の「出生時に存在し肉眼的に確認できうる形態異常」は「奇形（congenital anomaly）」に近い定義。形成異常は出生前から存在するが、肉眼的に確認できないものも含む。" },
    { type:"truefalse", question:"モザイクとは異なる配偶子由来の2種類以上の胚細胞が分化し、混在して1個の個体を形成している場合のことを言う。", answer:false, explanation:"×。問題文の説明は「キメラ（chimera）」。モザイク（mosaic）は同一受精卵に由来するが発生途中の細胞分裂時に生じた変異により、異なる遺伝子型をもつ細胞が混在する状態。" },
    { type:"truefalse", question:"親が21番染色体のロバートソン転座を有する場合、家族性ダウン症が起こる。", answer:true, explanation:"◯。ダウン症候群の多く（95%）は21トリソミー（染色体不分離）だが、約5%はロバートソン転座（14番と21番の融合など）による。家族性ダウン症の場合、転座保因者の親から受け継ぐ。" },
    { type:"truefalse", question:"サイレント変異とは変異の結果として当該コドンが終止コドンとなり、通常よりも短いタンパク質合成をきたす異常である。", answer:false, explanation:"×。問題文は「ナンセンス変異（nonsense mutation）」の説明。サイレント変異（silent mutation）はコドンが変化しても同じアミノ酸をコードする変異（同義変異）で、アミノ酸配列・タンパク質機能に影響しない。" },
    // 遺伝形式の関連選択
    { type:"match", question:"常染色体顕性遺伝（優性遺伝）の疾患として関連する2つを選ぶとしたら正しい組み合わせはどれか。", choices:["①酵素欠損・フェニルケトン尿症","②ハンチントン病・構造タンパク質や受容体異常","③色覚異常・筋ジストロフィー","④ミトコンドリア脳筋症・母系遺伝"], answer:1, explanation:"常染色体顕性（優性）遺伝：ハンチントン病・マルファン症候群（FBN1）・神経線維腫症1型・家族性高コレステロール血症など。構造蛋白・受容体・調節蛋白の異常が多い。酵素欠損は劣性遺伝が多い。" },
    { type:"match", question:"常染色体潜性遺伝（劣性遺伝）の疾患として関連する2つを選ぶとしたら正しい組み合わせはどれか。", choices:["①ハンチントン病・構造タンパク質異常","②酵素欠損・フェニルケトン尿症","③色覚異常・男性に発症","④母系遺伝・ミトコンドリア脳筋症"], answer:1, explanation:"常染色体潜性（劣性）遺伝：フェニルケトン尿症・Tay-Sachs病・Wilson病・嚢胞性線維症など。多くは酵素欠損による代謝異常症。両アレルが変異している場合のみ発症。" },
    { type:"match", question:"伴性潜性遺伝（X連鎖劣性遺伝）の疾患として関連する2つを選ぶとしたら正しい組み合わせはどれか。", choices:["①ハンチントン病・フェニルケトン尿症","②母系遺伝・ミトコンドリア脳筋症","③色覚異常・筋ジストロフィー（男性に発症）","④エピゲノム・Prader-Willi症候群"], answer:2, explanation:"X連鎖劣性遺伝（伴性潜性遺伝）：血友病A・B・Duchenne型筋ジストロフィー・色覚異常・レッシュ-ナイハン症候群など。女性はX染色体2本あるため保因者（carrier）となり、男性（X1本）が発症しやすい。" },
    { type:"match", question:"ミトコンドリア遺伝子の変異に関連する疾患として正しい組み合わせはどれか。", choices:["①色覚異常・男性に発症","②ハンチントン病・3塩基繰り返し変異","③ミトコンドリア脳筋症・母系遺伝","④Prader-Willi症候群・エピゲノム"], answer:2, explanation:"ミトコンドリア遺伝子変異疾患：ミトコンドリア脳筋症（MELAS・MERRF）。母系遺伝（ミトコンドリアはほぼ母方由来）が特徴。MELAS（ミトコンドリア脳筋症・乳酸アシドーシス・脳卒中様発作）。" },
    { type:"match", question:"ゲノムインプリンティングに関連する遺伝性疾患として正しい組み合わせはどれか。", choices:["①色覚異常・筋ジストロフィー","②ミトコンドリア脳筋症・母系遺伝","③フェニルケトン尿症・酵素欠損","④Prader-Willi症候群・エピゲノム"], answer:3, explanation:"ゲノムインプリンティング：同じ染色体の欠失でも父方由来か母方由来かで異なる表現型をきたす。Prader-Willi症候群（15q11-13父方欠失）・Angelman症候群（同領域母方欠失）が代表例。エピゲノム（DNAメチル化）が関与。" },
    { type:"match", question:"3塩基繰り返し部分の変異に関連する遺伝子疾患として正しい組み合わせはどれか。", choices:["①フェニルケトン尿症・酵素欠損","②ハンチントン病・色覚異常","③ハンチントン病（CAG繰り返し）・筋強直性ジストロフィー","④Prader-Willi症候群・エピゲノム"], answer:2, explanation:"トリプレットリピート病（3塩基繰り返し変異）：ハンチントン病（CAG繰り返し→ポリグルタミン病）・筋強直性ジストロフィー（CTG繰り返し）・脆弱X症候群（CGG繰り返し）・フリードライヒ失調症（GAA繰り返し）。" },
    { type:"truefalse", question:"ダウン症候群の多くは21番染色体のトリソミーによるが、約5%はロバートソン転座による家族性ダウン症である。", answer:true, explanation:"◯。ダウン症候群：95%は染色体不分離による21トリソミー（47本）、4-5%はロバートソン転座（14;21転座など）、1%はモザイク型。転座型は親が保因者の場合に家族性に発生しうる。" },
    { type:"truefalse", question:"常染色体顕性（優性）遺伝では、罹患した親から子への伝達率は50%であり、男女ともに同程度の頻度で発症する。", answer:true, explanation:"◯。常染色体顕性遺伝：①罹患した親の50%の確率で子に伝達②男女同頻度③世代を超えて発症（世代を越えない場合は浸透率不完全）④罹患者は通常ヘテロ接合体。" },
    { type:"truefalse", question:"フェニルケトン尿症はフェニルアラニン水酸化酵素の欠損による常染色体潜性遺伝疾患で、新生児マス・スクリーニングで早期発見される。", answer:true, explanation:"◯。PKU（フェニルケトン尿症）は常染色体潜性遺伝。フェニルアラニン→チロシンへの変換が障害→フェニルアラニン蓄積→知能障害。フェニルアラニン制限食で予防。新生児マス・スクリーニングで発見。" },
    { type:"truefalse", question:"Duchenne型筋ジストロフィーはジストロフィン遺伝子の変異によるX連鎖劣性遺伝疾患で、女性はほぼ発症しない。", answer:true, explanation:"◯。Duchenne型筋ジストロフィー（DMD）はX染色体上のジストロフィン遺伝子変異。X連鎖劣性遺伝のため男性が発症（女性はキャリアのみ）。進行性の筋力低下、10歳前後で歩行不能、20〜30代で死亡（呼吸不全・心不全）。" },
    { type:"truefalse", question:"ゲノムインプリンティングとは、同一の遺伝子変異でも父方由来か母方由来かによって表現型が異なる現象で、エピゲノム（DNAメチル化）が関与する。", answer:true, explanation:"◯。ゲノムインプリンティング：父方・母方のどちらの染色体由来かによって遺伝子の発現が異なる。DNAメチル化・ヒストン修飾などのエピゲノム制御が関与。Prader-Willi症候群・Angelman症候群が代表。" },
    { type:"truefalse", question:"Marfan症候群はフィブリリン-1（FBN1）遺伝子変異による常染色体潜性遺伝疾患で、四肢の細長化・大動脈解離・水晶体脱臼が特徴である。", answer:false, explanation:"×。Marfan症候群は常染色体「顕性（優性）」遺伝疾患（常染色体潜性ではない）。FBN1（フィブリリン-1）遺伝子変異→結合組織の脆弱化→高身長・蜘蛛指・大動脈解離・水晶体脱臼・漏斗胸。" },
    { type:"truefalse", question:"X連鎖劣性遺伝では母親がキャリアの場合、息子の50%が発症し、娘の50%がキャリアとなる。", answer:true, explanation:"◯。X連鎖劣性遺伝でキャリア母（XᴬX）×正常父（XY）の場合：息子（XY）の50%が発症（Xᴬを受け取った場合）、娘（XX）の50%がキャリア（XᴬXを受け取った場合）。" },
    { type:"truefalse", question:"ハンチントン病はCAGの3塩基繰り返し配列の伸長による常染色体顕性遺伝疾患で、35歳以上で発症することが多い。", answer:true, explanation:"◯。ハンチントン病（HD）：4番染色体上のHTT遺伝子のCAGリピート伸長→異常ポリグルタミン蛋白（ハンチンチン）→線条体・大脳皮質ニューロン変性。常染色体顕性遺伝。通常35-44歳で発症。不随意運動（舞踏運動）・認知症・精神症状。" },
  ],
  s6: [
    { type:"truefalse", question:"HE染色においてヘマトキシリンは核（DNA）を青紫色に、エオジンは細胞質を赤〜ピンク色に染める。", answer:true, explanation:"◯。ヘマトキシリン（塩基性色素）→核のDNA（酸性）に結合→青紫色。エオジン（酸性色素）→細胞質の塩基性蛋白質に結合→赤〜ピンク色。HE染色は病理診断の標準染色。" },
    { type:"truefalse", question:"PAS（過ヨウ素酸シッフ）染色で赤紫色に染まる成分は糖原（グリコーゲン）・粘液・基底膜などである。", answer:true, explanation:"◯。PAS染色：過ヨウ素酸→アルデヒド基生成→シッフ試薬と反応→赤紫色。糖原（グリコーゲン）・中性ムコ多糖（粘液）・基底膜・真菌細胞壁が陽性。糖原病・腺癌の粘液・腎糸球体基底膜の評価に使用。" },
    { type:"truefalse", question:"Masson trichrome染色では膠原線維（コラーゲン）が青色、筋線維が赤色に染まり、肝硬変などの線維化評価に用いられる。", answer:true, explanation:"◯。Masson trichrome染色：膠原線維（コラーゲン）→青色（または緑色）、筋線維→赤色、核→黒色。肝硬変・心筋線維化・腎臓の間質線維化の評価に広く用いられる。" },
    { type:"truefalse", question:"Congo-red染色はアミロイドを橙赤色に染め、偏光顕微鏡で緑色の複屈折（apple-green birefringence）を示す。", answer:true, explanation:"◯。Congo-red染色はアミロイドの確定診断に用いられる。偏光顕微鏡での緑色複屈折（apple-green birefringence）がアミロイドに特異的。ALアミロイドーシス・AAアミロイドーシスの診断に使用。" },
    { type:"truefalse", question:"グロコット染色は真菌の細胞壁（グルカン・キチン）を黒〜茶褐色に染め、アスペルギルス・ムーコル・カンジダの検出に用いられる。", answer:true, explanation:"◯。グロコット染色（Grocott メテナミン銀染色）は真菌の検出に最もよく使われる特殊染色。細菌の一部（ニューモシスチスを含む）も染色可能。HE染色では見えにくい真菌を明瞭に描出できる。" },
    { type:"truefalse", question:"Berlin blue染色（Perls染色）は鉄（Fe3+）を青色に染め、ヘモジデリン沈着の評価に用いられる。", answer:true, explanation:"◯。Berlin blue（Perls染色）：鉄（Fe3+、第二鉄イオン）をヘキサシアノ鉄酸カリウムと反応させて青色のベルリン青を形成。ヘモクロマトーシス・輸血ヘモジデリン症・溶血性貧血の鉄沈着評価に使用。" },
    { type:"truefalse", question:"免疫組織化学染色（IHC）においてKi-67は細胞増殖能の評価に用いられ、高いKi-67指数は高い悪性度・予後不良と相関する。", answer:true, explanation:"◯。Ki-67は細胞周期のG1・S・G2・M期に発現する核抗原（G0期は陰性）で、増殖指数（PI：proliferative index）の評価に広く使用される。乳癌・神経内分泌腫瘍のグレード評価などに重要。" },
    { type:"truefalse", question:"HER2陽性乳癌の判定はIHC（蛋白発現）とFISH（遺伝子増幅）で行い、陽性の場合トラスツズマブ（Herceptin）の適応となるコンパニオン診断の代表例である。", answer:true, explanation:"◯。HER2陽性の判定：IHCで3+（強陽性）→直接陽性判定。IHCで2+（境界）→FISHでHER2遺伝子増幅を確認。HER2陽性→トラスツズマブ・ペルツズマブ・T-DM1などの抗HER2療法の適応。" },
    { type:"truefalse", question:"サイトケラチン（CK）は上皮細胞の中間径フィラメントマーカーであり、癌腫（carcinoma）の診断に陽性を示す。ビメンチン（Vimentin）は間葉系細胞のマーカーで肉腫に陽性を示す。", answer:true, explanation:"◯。中間径フィラメントによる細胞系統判別：サイトケラチン→上皮系（癌腫）、ビメンチン→間葉系（肉腫・一部リンパ腫）、デスミン→筋原性、GFAP→グリア系、NFP→神経系。" },
    { type:"truefalse", question:"肉芽腫（granuloma）と肉芽組織（granulation tissue）は同義語である。", answer:false, explanation:"×。全く異なる概念。肉芽腫（granuloma）：特異性炎・類上皮細胞性肉芽腫（結核・サルコイドーシス）。肉芽組織（granulation tissue）：創傷治癒の過程で形成される炎症細胞＋線維芽細胞＋新生血管からなる修復組織。" },
    { type:"truefalse", question:"サルコイドーシスは乾酪壊死を伴わない非乾酪性類上皮細胞性肉芽腫が特徴で、この点で結核（乾酪壊死を伴う）と鑑別される。", answer:true, explanation:"◯。サルコイドーシスvs結核の鑑別点：乾酪壊死の有無。サルコイドーシス→非乾酪性肉芽腫（壊死なし）。結核→乾酪壊死を伴う肉芽腫。両者とも類上皮細胞・多核巨細胞・リンパ球からなる肉芽腫を形成。" },
    { type:"truefalse", question:"コンパニオン診断とは、特定の分子標的薬の適応患者を選別するための体外診断のことで、HER2検査（トラスツズマブ）・EGFR変異（ゲフィチニブ）・BRAF V600E（ベムラフェニブ）が代表例である。", answer:true, explanation:"◯。コンパニオン診断（companion diagnostics）：特定薬剤と対になって使用される体外診断。①HER2/トラスツズマブ②EGFR変異/ゲフィチニブ③BRAF V600E/ベムラフェニブ④ALK融合/クリゾチニブが代表。" },
    { type:"truefalse", question:"Alcian blue染色は酸性ムコ多糖（硫酸化グリコサミノグリカン）を青色に染め、腸上皮化生の杯細胞・間葉系腫瘍の基質評価に用いられる。", answer:true, explanation:"◯。Alcian blue染色：酸性ムコ多糖（ヒアルロン酸・ヘパラン硫酸・デルマタン硫酸など）を青色に染色。胃の腸上皮化生（杯細胞に陽性）・軟部腫瘍の基質評価に使用。PASと組み合わせて使用されることも多い。" },
    { type:"truefalse", question:"病理組織の固定（fixation）はホルマリン（ホルムアルデヒド）などで蛋白質を架橋・変性させ、組織の自己融解を防いで形態を保存する工程である。", answer:true, explanation:"◯。固定の目的：①組織の自己融解・腐敗防止②形態保存③染色性の確保④感染防止。10%中性緩衝ホルマリン（NBF）が標準的固定液。固定不十分→免疫染色・分子病理診断に影響。" },
    { type:"truefalse", question:"次世代シーケンシング（NGS）を用いたがんゲノム検査は複数の遺伝子変異・融合遺伝子を一度に解析し、分子標的薬の適応探索（コンパニオン診断）に用いられる。", answer:true, explanation:"◯。NGSによるがんゲノム検査（Foundation One・NCCオンコパネルなど）：数百遺伝子を一度に解析し、ドライバー変異・融合遺伝子・コピー数変化を検出→分子標的薬の適応決定・臨床試験への登録に活用。" },
    { type:"truefalse", question:"エストロゲン受容体（ER）・プロゲステロン受容体（PgR）のIHC検査は乳癌においてホルモン療法（タモキシフェン・アロマターゼ阻害薬）の適応決定に用いられる。", answer:true, explanation:"◯。ER/PgR陽性乳癌はホルモン療法の適応。閉経前：タモキシフェン（ERアンタゴニスト）。閉経後：アロマターゼ阻害薬（レトロゾール・アナストロゾール）。HER2陽性とは独立した治療標的として評価。" },
    { type:"truefalse", question:"S100蛋白は悪性黒色腫・神経系腫瘍（神経鞘腫・グリオーマなど）・軟骨肉腫などが陽性を示す免疫組織化学マーカーである。", answer:true, explanation:"◯。S100蛋白は神経・グリア・メラノサイト・軟骨・脂肪などに発現。陽性腫瘍：悪性黒色腫・神経鞘腫・グリオーマ・軟骨肉腫・脂肪肉腫（一部）。悪性黒色腫ではHMB45・Melan-A・S100の組み合わせで診断。" },
    { type:"truefalse", question:"リウマトイド結節の病理組織像は中央の類線維素壊死（フィブリノイド壊死）を囲む柵状配列した組織球（マクロファージ）と外層の線維芽細胞・リンパ球からなる肉芽腫である。", answer:true, explanation:"◯。リウマトイド結節（rheumatoid nodule）：①中央部：フィブリノイド壊死（類線維素壊死）②中間層：柵状配列した類上皮細胞（活性化マクロファージ）③外層：線維芽細胞・リンパ球・形質細胞。関節リウマチ患者の皮下・肺に生じる。" },
    { type:"truefalse", question:"Victoria Blue染色はB型肝炎ウイルス表面抗原（HBsAg）を含むすりガラス細胞を同定するために使用される特殊染色である。", answer:true, explanation:"◯。Victoria Blue（VB）染色はHBVキャリアの肝細胞に蓄積したHBsAg（すりガラス細胞）を染色する。オルセイン染色も同様の目的で使用される。現在は免疫染色（抗HBs抗体）が主流だが、特殊染色としても重要。" },
    { type:"truefalse", question:"病理診断における細胞異型の評価項目には、核の大小不同・形の不規則性・クロマチン増加・核小体の著明化・核細胞質比の増大・核分裂像が含まれる。", answer:true, explanation:"◯。細胞異型（cellular atypia）の評価：①核の大小不同（N/C比増大）②核形の不規則性③クロマチン（核染色質）の増加・粗大化④核小体の著明化・多数化⑤異常核分裂像。これらが腫瘍の悪性度評価の根拠となる。" },
  ],
};

const SECTIONS = [
  { id:"s1", name:"病理学の歴史と概論", icon:"🔬", color:"#6366f1" },
  { id:"s2", name:"代謝障害１：変性・壊死・老化", icon:"⚗️", color:"#f59e0b" },
  { id:"s3", name:"炎症と免疫１", icon:"🔥", color:"#ef4444" },
  { id:"s4", name:"感染症の病理", icon:"🦠", color:"#10b981" },
  { id:"s5", name:"先天異常・遺伝", icon:"🧬", color:"#8b5cf6" },
  { id:"s6", name:"外科病理学（診断病理学）", icon:"🏥", color:"#0ea5e9" },
];

function getAllQuestions() {
  return SECTIONS.flatMap(s => (QUESTION_BANK[s.id]||[]).map(q=>({...q,sectionId:s.id})));
}
function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

// ○×ラベル
function TFLabel({val}) {
  return <span style={{display:"inline-block",padding:"2px 10px",borderRadius:20,fontWeight:800,fontSize:16,
    background:val?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)",
    color:val?"#34d399":"#f87171",border:`1px solid ${val?"#10b981":"#ef4444"}`}}>
    {val?"◯":"✕"}
  </span>;
}

const STORAGE_KEY = "pathology2_quiz_state";

function getSaved<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed[key] !== undefined ? parsed[key] : fallback;
  } catch {
    return fallback;
  }
}

export default function Quiz() {
  const [view, setView] = useState(() => getSaved("view", "home"));
  const [queue, setQueue] = useState<any[]>(() => getSaved("queue", []));
  const [qIdx, setQIdx] = useState(() => getSaved("qIdx", 0));
  const [sel, setSel] = useState<number | null>(() => getSaved("sel", null));
  const [done, setDone] = useState(() => getSaved("done", false));
  const [score, setScore] = useState(() => getSaved("score", {correct:0,total:0}));
  const [secId, setSecId] = useState<string | null>(() => getSaved("secId", null));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ view, queue, qIdx, sel, done, score, secId }));
    } catch {
      // localStorage が利用できない環境では無視する
    }
  }, [view, queue, qIdx, sel, done, score, secId]);

  function startSection(sid){
    setQueue(shuffle(QUESTION_BANK[sid]||[]));
    setQIdx(0);setSel(null);setDone(false);
    setScore({correct:0,total:0});setSecId(sid);setView("quiz");
  }
  function startAll(){
    setQueue(shuffle(getAllQuestions()));
    setQIdx(0);setSel(null);setDone(false);
    setScore({correct:0,total:0});setSecId(null);setView("quiz");
  }
  function answer(i){
    if(done)return;
    setSel(i);setDone(true);
    const q=queue[qIdx];
    const correct = q.type==="truefalse"
      ? (i===0)===q.answer
      : i===q.answer;
    setScore(s=>({correct:s.correct+(correct?1:0),total:s.total+1}));
  }
  function next(){
    if(qIdx+1>=queue.length){setView("result");return;}
    setQIdx(i=>i+1);setSel(null);setDone(false);
  }
  function home(){setView("home");}

  const q=queue[qIdx];
  const sec=SECTIONS.find(s=>s.id===(q?.sectionId??secId));
  const accent=sec?.color??"#10b981";
  const bg="#0b1120",sf="rgba(255,255,255,0.04)",bd="rgba(255,255,255,0.09)";
  const totalQ=queue.length;

  // ホーム
  if(view==="home") return (
    <div style={{minHeight:"100vh",background:bg,color:"#e2e8f0",padding:"24px 16px",fontFamily:"system-ui,sans-serif"}}>
      <div style={{maxWidth:580,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:40}}>🧬</div>
          <h1 style={{margin:"8px 0 4px",fontSize:19,fontWeight:800,color:"#f1f5f9"}}>病理学2 学習ツール</h1>
          <p style={{margin:"4px 0 0",fontSize:12,color:"#475569"}}>過去問形式（○×・選択・関連選択）全117問収録</p>
        </div>

        {/* 形式の凡例 */}
        <div style={{background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.3)",borderRadius:10,padding:"12px 14px",marginBottom:20,fontSize:12,color:"#a5b4fc",lineHeight:1.8}}>
          <div style={{fontWeight:700,marginBottom:6,color:"#c7d2fe"}}>📋 出題形式</div>
          <div>◯× ：正誤判定問題（過去問H・M・E・K形式）</div>
          <div>選択 ：選択肢から正解を1つ選ぶ（過去問の人物選択・用語定義）</div>
          <div>関連 ：項目と選択肢を1対1でマッチング（過去問H-8〜10形式）</div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:22}}>
          <button onClick={()=>setView("pick")} style={{background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.4)",borderRadius:12,padding:"16px 12px",cursor:"pointer",textAlign:"left",color:"#e2e8f0"}}>
            <div style={{fontSize:22,marginBottom:5}}>📖</div>
            <div style={{fontSize:13,fontWeight:700,color:"#a5b4fc"}}>セクション別演習</div>
            <div style={{fontSize:11,color:"#64748b",marginTop:2}}>1講義に集中</div>
          </button>
          <button onClick={startAll} style={{background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.4)",borderRadius:12,padding:"16px 12px",cursor:"pointer",textAlign:"left",color:"#e2e8f0"}}>
            <div style={{fontSize:22,marginBottom:5}}>🎯</div>
            <div style={{fontSize:13,fontWeight:700,color:"#6ee7b7"}}>全範囲演習</div>
            <div style={{fontSize:11,color:"#64748b",marginTop:2}}>シャッフル出題</div>
          </button>
        </div>

        <div style={{fontSize:11,color:"#475569",marginBottom:10,letterSpacing:1,fontWeight:600}}>収録セクション</div>
        {SECTIONS.map(s=>(
          <div key={s.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 14px",background:sf,border:`1px solid ${bd}`,borderLeft:`3px solid ${s.color}`,borderRadius:"0 8px 8px 0",marginBottom:5}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <span>{s.icon}</span><span style={{fontSize:13,color:"#cbd5e1"}}>{s.name}</span>
            </div>
            <span style={{fontSize:11,color:"#475569"}}>{(QUESTION_BANK[s.id]||[]).length}問</span>
          </div>
        ))}
      </div>
    </div>
  );

  // セクション選択
  if(view==="pick") return (
    <div style={{minHeight:"100vh",background:bg,color:"#e2e8f0",padding:"22px 16px",fontFamily:"system-ui,sans-serif"}}>
      <div style={{maxWidth:580,margin:"0 auto"}}>
        <button onClick={home} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:13,marginBottom:16}}>← 戻る</button>
        <div style={{fontSize:11,color:"#475569",marginBottom:11,letterSpacing:1,fontWeight:600}}>セクション選択</div>
        {SECTIONS.map(s=>(
          <button key={s.id} onClick={()=>startSection(s.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:11,padding:"14px 16px",background:sf,border:`1px solid ${bd}`,borderLeft:`4px solid ${s.color}`,borderRadius:"0 10px 10px 0",marginBottom:7,cursor:"pointer",color:"#e2e8f0",textAlign:"left"}}>
            <span style={{fontSize:19}}>{s.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600}}>{s.name}</div>
              <div style={{fontSize:11,color:"#475569",marginTop:1}}>{(QUESTION_BANK[s.id]||[]).length}問</div>
            </div>
            <span style={{color:"#475569"}}>›</span>
          </button>
        ))}
      </div>
    </div>
  );

  // 結果
  if(view==="result"){
    const pct=Math.round((score.correct/score.total)*100);
    const col=pct>=80?"#34d399":pct>=60?"#fbbf24":"#f87171";
    return (
      <div style={{minHeight:"100vh",background:bg,color:"#e2e8f0",padding:"40px 16px",fontFamily:"system-ui,sans-serif"}}>
        <div style={{maxWidth:560,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:50,marginBottom:10}}>{pct>=80?"🎉":pct>=60?"👍":"📚"}</div>
          <h2 style={{fontSize:17,fontWeight:800,color:"#f1f5f9",margin:"0 0 8px"}}>演習終了</h2>
          <div style={{fontSize:50,fontWeight:900,color:col,margin:"14px 0 4px"}}>{pct}%</div>
          <div style={{fontSize:13,color:"#94a3b8",marginBottom:28}}>{score.correct} / {score.total} 問正解</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <button onClick={secId?()=>startSection(secId):startAll} style={{background:"rgba(99,102,241,0.2)",border:"1px solid rgba(99,102,241,0.4)",borderRadius:10,padding:"13px",color:"#a5b4fc",cursor:"pointer",fontSize:13,fontWeight:600}}>もう一度</button>
            <button onClick={home} style={{background:sf,border:`1px solid ${bd}`,borderRadius:10,padding:"13px",color:"#94a3b8",cursor:"pointer",fontSize:13,fontWeight:600}}>ホームへ</button>
          </div>
        </div>
      </div>
    );
  }

  if(!q)return null;
  const progress=((qIdx+1)/totalQ)*100;

  // 問題タイプラベル
  const typeLabel = q.type==="truefalse"?"◯×問題":q.type==="match"?"関連選択":"選択問題";
  const typeColor = q.type==="truefalse"?"#fbbf24":q.type==="match"?"#a78bfa":"#60a5fa";

  // ○×の選択肢
  const choices = q.type==="truefalse"
    ? ["◯　正しい","✕　誤り"]
    : q.choices;

  // 正解判定
  function isCorrect(i) {
    if(q.type==="truefalse") return (i===0)===q.answer;
    return i===q.answer;
  }

  return (
    <div style={{minHeight:"100vh",background:bg,color:"#e2e8f0",padding:"18px 16px",fontFamily:"system-ui,sans-serif"}}>
      <div style={{maxWidth:580,margin:"0 auto"}}>
        {/* トップバー */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <button onClick={home} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:13}}>← ホーム</button>
          <span style={{fontSize:12,color:"#64748b"}}>
            <span style={{color:"#34d399",fontWeight:700}}>{score.correct}</span> / {score.total} 正解
          </span>
        </div>

        {/* プログレスバー */}
        <div style={{background:"rgba(255,255,255,0.06)",borderRadius:99,height:3,marginBottom:12,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:accent,borderRadius:99,transition:"width 0.3s"}}/>
        </div>

        {/* セクション＋問題タイプ */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 12px",background:sf,borderRadius:7,borderLeft:`3px solid ${accent}`,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <span>{sec?.icon??"🎯"}</span>
            <span style={{fontSize:11,color:"#94a3b8"}}>{sec?.name??"全範囲"}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:10,fontWeight:700,color:typeColor,background:`${typeColor}22`,padding:"2px 8px",borderRadius:10}}>{typeLabel}</span>
            <span style={{fontSize:11,color:"#475569"}}>{qIdx+1}/{totalQ}</span>
          </div>
        </div>

        {/* 問題文 */}
        <div style={{background:sf,border:`1px solid ${bd}`,borderRadius:12,padding:"16px 18px",marginBottom:12}}>
          <div style={{fontSize:10,color:accent,fontWeight:600,letterSpacing:1,marginBottom:8}}>Q{qIdx+1}</div>
          <p style={{margin:0,fontSize:14,lineHeight:1.8,color:"#f1f5f9",whiteSpace:"pre-wrap"}}>{q.question}</p>
        </div>

        {/* 選択肢 */}
        <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
          {choices.map((ch,i)=>{
            let bg2=sf,bc=bd,tc="#cbd5e1";
            if(done){
              if(isCorrect(i)){bg2="rgba(16,185,129,0.15)";bc="#10b981";tc="#6ee7b7";}
              else if(i===sel){bg2="rgba(239,68,68,0.15)";bc="#ef4444";tc="#fca5a5";}
            }
            return (
              <button key={i} onClick={()=>answer(i)} style={{background:bg2,border:`1px solid ${bc}`,borderRadius:10,padding:"12px 15px",cursor:done?"default":"pointer",textAlign:"left",color:tc,fontSize:13,lineHeight:1.5,display:"flex",gap:10,transition:"all 0.12s"}}>
                <span style={{fontWeight:700,flexShrink:0,fontSize:15}}>
                  {done&&isCorrect(i)?"✓":done&&i===sel?"✗":["①","②","③","④","⑤"][i]}
                </span>
                <span>{ch}</span>
              </button>
            );
          })}
        </div>

        {/* 解説 */}
        {done&&(
          <>
            <div style={{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:11,padding:16,marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{fontSize:10,color:"#818cf8",fontWeight:600,letterSpacing:1}}>解説</div>
                {q.type==="truefalse"&&<TFLabel val={q.answer}/>}
              </div>
              <p style={{margin:0,fontSize:13,color:"#c7d2fe",lineHeight:1.8}}>{q.explanation}</p>
            </div>
            <button onClick={next} style={{width:"100%",background:`linear-gradient(135deg,${accent},${accent}88)`,border:"none",borderRadius:11,padding:14,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>
              {qIdx+1>=totalQ?"結果を見る 📊":"次の問題へ →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
