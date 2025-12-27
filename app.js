const { createApp } = Vue;

createApp({
    data() {
        return {
            currentPage: 'home',
            isLoggedIn: false,
            currentUser: null,
            showLoginModal: false,
            searchQuery: '',
            selectedDestination: null,
            activeTab: 'info',
            favorites: [],
            loginForm: {
                username: '',
                password: ''
            },
            // 评论和评分相关数据
            comments: [],
            newComment: {
                rating: 5,
                content: ''
            },
            showShareModal: false,
            shareUrl: '',
            // 分类过滤相关数据
            selectedCategory: 'all',
            destinations: [
                {
                    id: 1,
                    name: '故宫',
                    location: '北京',
                    type: '历史文化',
                    rating: '4.9',
                    image: 'image/故宫.jpg',
                    shortDescription: '明清两代的皇家宫殿，世界文化遗产',
                    fullDescription: '故宫是中国明清两代的皇家宫殿，旧称紫禁城，位于北京中轴线的中心。故宫以三大殿为中心，占地面积约72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。是世界上现存规模最大、保存最为完整的木质结构古建筑之一。',
                    attractions: ['太和殿', '乾清宫', '御花园', '午门', '珍宝馆'],
                    bestTime: '春秋两季，气候宜人，游客相对较少',
                    routes: [
                        {
                            name: '经典一日游',
                            description: '游览故宫核心区域，感受皇家气派',
                            schedule: '上午：午门→太和殿→中和殿→保和殿；下午：乾清宫→交泰殿→坤宁宫→御花园',
                            cost: '门票60元，导游费100-200元'
                        },
                        {
                            name: '深度两日游',
                            description: '全面了解故宫历史文化，参观珍宝馆和钟表馆',
                            schedule: '第一天：主要宫殿建筑群；第二天：珍宝馆、钟表馆、书画馆等专题展览',
                            cost: '门票60元+专题馆门票，住宿300-500元'
                        }
                    ],
                    tips: [
                        {
                            title: '购票建议',
                            content: '建议提前在官网预约购票，避开节假日高峰期。每年4月1日-10月31日为旺季，门票60元；11月1日-3月31日为淡季，门票40元。'
                        },
                        {
                            title: '游览路线',
                            content: '推荐从午门进入，沿中轴线游览，最后从神武门出。全程步行约需3-4小时，建议穿舒适的鞋子。'
                        },
                        {
                            title: '注意事项',
                            content: '殿内禁止拍照，部分区域需要脱鞋进入。建议携带身份证件，注意保管好贵重物品。'
                        }
                    ]
                },
                {
                    id: 2,
                    name: '长城',
                    location: '北京',
                    type: '历史遗迹',
                    rating: '4.8',
                    image: 'image/长城.jpg',
                    shortDescription: '世界七大奇迹之一，中华民族的象征',
                    fullDescription: '长城是中国古代的军事防御工事，是一道高大、坚固而连绵不断的长垣，用以限隔敌骑的行动。长城不是一道单纯孤立的城墙，而是以城墙为主体，同大量的城、障、亭、标相结合的防御体系。',
                    attractions: ['八达岭长城', '慕田峪长城', '金山岭长城', '司马台长城', '居庸关'],
                    bestTime: '春秋两季，天气适宜，风景优美',
                    routes: [
                        {
                            name: '八达岭长城一日游',
                            description: '游览最著名的长城段落，体验"不到长城非好汉"',
                            schedule: '上午：缆车上山→北一楼→北八楼；下午：南一楼→南四楼→缆车下山',
                            cost: '门票40元，缆车60元，交通费50-100元'
                        },
                        {
                            name: '慕田峪长城体验游',
                            description: '人少景美，可以体验滑道下山',
                            schedule: '上午：乘缆车上山→正关台→敌楼；下午：徒步下山或乘坐滑道',
                            cost: '门票45元，缆车/滑道120元'
                        }
                    ],
                    tips: [
                        {
                            title: '准备物品',
                            content: '建议穿运动鞋，带防晒用品和足够的水。夏季注意防晒，冬季注意保暖。'
                        },
                        {
                            title: '体力分配',
                            content: '长城台阶较高且陡峭，建议量力而行，老人和小孩可选择缆车上下。'
                        },
                        {
                            title: '最佳拍摄点',
                            content: '八达岭的北八楼是最高点，视野最好；慕田峪的正关台是最佳拍照点。'
                        }
                    ]
                },
                {
                    id: 3,
                    name: '西湖',
                    location: '杭州',
                    type: '自然风光',
                    rating: '4.7',
                    image: 'image/西湖.jpg',
                    shortDescription: '人间天堂，江南园林的典型代表',
                    fullDescription: '西湖位于浙江省杭州市西湖区龙井路1号，杭州市区西部，景区总面积49平方千米，湖面面积6.38平方千米，西湖南、西、北三面环山，湖中白堤、苏堤、杨公堤、赵公堤将湖面分割成若干水面。',
                    attractions: ['断桥残雪', '雷峰塔', '三潭印月', '苏堤春晓', '花港观鱼'],
                    bestTime: '春季（3-5月）和秋季（9-11月）',
                    routes: [
                        {
                            name: '西湖经典一日游',
                            description: '环湖游览，体验西湖十景精华',
                            schedule: '上午：断桥→白堤→平湖秋月；下午：苏堤→花港观鱼→雷峰塔',
                            cost: '大部分景点免费，雷峰塔门票40元'
                        },
                        {
                            name: '西湖文化深度游',
                            description: '了解西湖文化历史，参观博物馆',
                            schedule: '上午：西湖博物馆→岳王庙；下午：灵隐寺→龙井问茶',
                            cost: '各景点门票总计约200元'
                        }
                    ],
                    tips: [
                        {
                            title: '游览方式',
                            content: '可选择步行、骑行或乘坐游船。骑行环湖约需2小时，游船约1小时。'
                        },
                        {
                            title: '最佳观赏时间',
                            content: '清晨和傍晚光线最美，游客较少。三潭印月建议傍晚时分观赏。'
                        },
                        {
                            title: '美食推荐',
                            content: '楼外楼的西湖醋鱼、知味观的点心、张生记的老鸭煲都是当地特色。'
                        }
                    ]
                },
                {
                    id: 4,
                    name: '黄山',
                    location: '安徽',
                    type: '自然风光',
                    rating: '4.9',
                    image: 'image/黄山.jpg',
                    shortDescription: '天下第一奇山，以奇松、怪石、云海、温泉闻名',
                    fullDescription: '黄山位于安徽省南部黄山市境内，是世界文化与自然双重遗产，世界地质公园，国家5A级旅游景区，国家级风景名胜区，全国文明风景旅游区示范点，中华十大名山，天下第一奇山。',
                    attractions: ['迎客松', '莲花峰', '天都峰', '光明顶', '西海大峡谷'],
                    bestTime: '四季皆宜，春观百花、夏观飞瀑、秋观红叶、冬观雪景',
                    routes: [
                        {
                            name: '黄山经典两日游',
                            description: '观赏黄山日出日落，体验云海奇观',
                            schedule: '第一天：慈光阁→玉屏楼→迎客松→光明顶看日落；第二天：光明顶看日出→西海大峡谷→云谷寺',
                            cost: '门票190元，缆车80-90元，住宿300-800元'
                        },
                        {
                            name: '黄山轻松游',
                            description: '适合老人和小孩，以缆车为主',
                            schedule: '云谷寺缆车上山→始信峰→狮子峰→云谷缆车下山',
                            cost: '门票190元，缆车170元'
                        }
                    ],
                    tips: [
                        {
                            title: '登山装备',
                            content: '建议穿防滑登山鞋，带雨衣（山上天气多变）、手电筒（看日出）、登山杖。'
                        },
                        {
                            title: '住宿安排',
                            content: '山上住宿条件有限且价格较高，建议提前预订。山顶看日出需早起4-5点。'
                        },
                        {
                            title: '体力分配',
                            content: '登山强度较大，建议根据体力选择路线。山上食物价格较高，可自带干粮。'
                        }
                    ]
                },
                {
                    id: 5,
                    name: '九寨沟',
                    location: '四川',
                    type: '自然风光',
                    rating: '4.8',
                    image: 'image/九寨沟.jpg',
                    shortDescription: '人间仙境，以彩池、雪峰、森林、瀑布著称',
                    fullDescription: '九寨沟位于四川省阿坝藏族羌族自治州九寨沟县境内，是国家AAAAA级旅游景区，世界自然遗产，世界生物圈保护区。九寨沟以原始的生态环境，一尘不染的清新空气和雪山、森林、湖泊组合成神妙、奇幻、幽美的自然风光。',
                    attractions: ['五花海', '镜海', '长海', '珍珠滩瀑布', '诺日朗瀑布'],
                    bestTime: '秋季（9-11月）色彩最丰富，春季（4-5月）山花烂漫',
                    routes: [
                        {
                            name: '九寨沟全景一日游',
                            description: '游览主要景点，感受童话世界',
                            schedule: '上午：树正沟→日则沟；下午：则查洼沟→出沟',
                            cost: '门票169元，观光车90元'
                        },
                        {
                            name: '九寨沟深度两日游',
                            description: '充分感受九寨沟不同时段的美',
                            schedule: '第一天：日则沟深度游；第二天：树正沟+则查洼沟+周边藏寨',
                            cost: '门票169元，住宿200-400元'
                        }
                    ],
                    tips: [
                        {
                            title: '高原反应',
                            content: '九寨沟海拔2000-4000米，可能有高原反应。建议慢行，多喝水，可提前服用红景天。'
                        },
                        {
                            title: '防晒保暖',
                            content: '高原紫外线强，需防晒；早晚温差大，需带外套。'
                        },
                        {
                            title: '环境保护',
                            content: '九寨沟是环保重点景区，请勿乱丢垃圾，禁止在湖泊中洗涤物品。'
                        }
                    ]
                },
                {
                    id: 6,
                    name: '泰山',
                    location: '山东',
                    type: '自然文化',
                    rating: '4.6',
                    image: 'image/泰山.jpg',
                    shortDescription: '五岳之首，历代帝王封禅之地',
                    fullDescription: '泰山，世界文化与自然双重遗产，世界地质公园，全国重点文物保护单位，国家重点风景名胜区，国家AAAAA级旅游景区。泰山位于山东省中部，隶属于泰安市，绵亘于泰安、济南、淄博三市之间。',
                    attractions: ['南天门', '玉皇顶', '十八盘', '日观峰', '天街'],
                    bestTime: '4-11月，避开7-8月雨季',
                    routes: [
                        {
                            name: '泰山经典登山游',
                            description: '体验"登泰山而小天下"的豪情',
                            schedule: '红门→中天门→十八盘→南天门→玉皇顶（看日出）',
                            cost: '门票115元，索道100元'
                        },
                        {
                            name: '泰山文化游',
                            description: '了解泰山文化历史',
                            schedule: '岱庙→红门→孔子登临处→玉皇顶→碧霞祠',
                            cost: '门票115元+岱庙20元'
                        }
                    ],
                    tips: [
                        {
                            title: '登山时间',
                            content: '徒步登山约需4-6小时，建议下午开始，晚上在山顶住宿看日出。'
                        },
                        {
                            title: '体力分配',
                            content: '十八盘是最陡峭的路段，建议量力而行。体力不佳者可乘坐索道。'
                        },
                        {
                            title: '住宿选择',
                            content: '山顶住宿条件简单价格高，山下选择多。看日出需凌晨4点左右起床。'
                        }
                    ]
                },
                {
                    id: 7,
                    name: '莫高窟',
                    location: '甘肃',
                    type: '历史文化',
                    rating: '4.8',
                    image: 'image/莫高窟.jpg',
                    shortDescription: '丝路明珠，世界佛教艺术宝库',
                    fullDescription: '莫高窟，俗称千佛洞，坐落在河西走廊西端的敦煌。它始建于十六国的前秦时期，历经十六国、北朝、隋、唐、五代、西夏、元等历代的兴建，形成巨大的规模，有洞窟735个，壁画4.5万平方米、泥质彩塑2415尊。',
                    attractions: ['藏经洞', '九层楼', '飞天壁画', '卧佛', '千手观音'],
                    bestTime: '5-10月，气候适宜，避免夏季高温',
                    routes: [
                        {
                            name: '莫高窟精品游',
                            description: '参观精华洞窟，了解敦煌艺术',
                            schedule: '上午：数字展示中心→实体洞窟参观；下午：敦煌博物馆',
                            cost: 'A类门票238元，B类门票100元'
                        },
                        {
                            name: '敦煌文化深度游',
                            description: '全面了解敦煌历史文化',
                            schedule: '第一天：莫高窟；第二天：鸣沙山月牙泉→阳关→玉门关',
                            cost: '总计约500元'
                        }
                    ],
                    tips: [
                        {
                            title: '预约参观',
                            content: '莫高窟需提前在官网预约，每日限流。A类票可参观8个洞窟，B类票4个洞窟。'
                        },
                        {
                            title: '文物保护',
                            content: '洞窟内禁止拍照摄像，不能用手触摸壁画。建议先参观数字展示中心了解背景。'
                        },
                        {
                            title: '气候适应',
                            content: '敦煌干燥少雨，温差大。带防晒用品、润唇膏、保湿用品。'
                        }
                    ]
                },
                {
                    id: 8,
                    name: '赛里木湖',
                    location: '新疆',
                    type: '自然风光',
                    rating: '4.9',
                    image: 'image/赛里木湖.jpg',
                    shortDescription: '大西洋的最后一滴眼泪，新疆海拔最高、面积最大的高山湖泊',
                    fullDescription: '赛里木湖古称"净海"，位于新疆博尔塔拉州博乐市境内北天山山脉中，紧邻伊犁霍城县，湖面海拔2071米，东西长30公里，南北宽25公里，面积458平方公里，蓄水量达210亿立方米，湖水清澈透底，透明度达12米。',
                    attractions: ['湖心岛', '西海草原', '点将台', '成吉思汗点将台', '天鹅栖息地'],
                    bestTime: '6-7月湖畔草原野花盛开，是最佳旅游季节',
                    routes: [
                        {
                            name: '赛里木湖环湖游',
                            description: '环湖欣赏不同角度的湖光山色',
                            schedule: '全天环湖，约90公里，沿途停靠多个观景点，适合摄影',
                            cost: '门票70元，区间车75元'
                        },
                        {
                            name: '赛里木湖深度游',
                            description: '体验哈萨克族风情，欣赏湖边草原',
                            schedule: '第一天：环湖游览；第二天：草原骑马，体验牧民生活',
                            cost: '门票+住宿+活动，总计约500-800元'
                        }
                    ],
                    tips: [
                        {
                            title: '高原气候',
                            content: '赛里木湖海拔较高，昼夜温差大，需带保暖衣物。夏季紫外线强，注意防晒。'
                        },
                        {
                            title: '交通方式',
                            content: '建议自驾或包车前往，环湖公路路况良好。从乌鲁木齐出发约需5-6小时车程。'
                        },
                        {
                            title: '住宿选择',
                            content: '湖边有蒙古包和木屋可供住宿，体验独特但条件简单。也可返回博乐市住宿。'
                        }
                    ]
                },
                {
                    id: 9,
                    name: '呼伦贝尔',
                    location: '内蒙古',
                    type: '自然风光',
                    rating: '4.8',
                    image: 'image/呼伦贝尔.jpg',
                    shortDescription: '世界四大草原之一，中国最美的草原',
                    fullDescription: '呼伦贝尔草原位于内蒙古自治区东北部，因境内的呼伦湖和贝尔湖而得名，是世界著名的天然牧场，总面积达10万平方公里，天然草场面积占80%，是世界上著名的三大草原之一，这里地域辽阔，3000多条纵横交错的河流，500多个星罗棋布的湖泊，一直延伸至松涛激荡的大兴安岭。',
                    attractions: ['呼伦湖', '贝尔湖', '莫日格勒河', '额尔古纳湿地', '满洲里'],
                    bestTime: '6-8月是草原最美的季节，绿草如茵，野花遍地',
                    routes: [
                        {
                            name: '呼伦贝尔草原经典游',
                            description: '体验草原风光和蒙古族文化',
                            schedule: '海拉尔→莫日格勒河→额尔古纳→黑山头→满洲里→呼伦湖→海拉尔',
                            cost: '包车5-7天约3000-5000元，住宿200-500元/晚'
                        },
                        {
                            name: '呼伦贝尔深度游',
                            description: '深入草原腹地，体验牧民生活',
                            schedule: '海拉尔→草原深处→牧民家访→骑马体验→那达慕表演→篝火晚会',
                            cost: '全程7-10天，费用约5000-8000元'
                        }
                    ],
                    tips: [
                        {
                            title: '最佳季节',
                            content: '6-8月草原最美，但也是旅游旺季，需提前预订。9月秋色迷人，游客较少。'
                        },
                        {
                            title: '必备物品',
                            content: '防晒霜、墨镜、帽子、防蚊液、保暖衣物。昼夜温差大，即使夏季也需带外套。'
                        },
                        {
                            title: '文化体验',
                            content: '可体验蒙古包住宿、骑马、摔跤、射箭等活动，参加那达慕大会（7-8月）。尊重当地习俗。'
                        }
                    ]
                },
                {
                    id: 10,
                    name: '桂林',
                    location: '广西',
                    type: '自然风光',
                    rating: '4.9',
                    image: 'image/桂林.jpg',
                    shortDescription: '山水甲天下，典型的喀斯特地貌',
                    fullDescription: '桂林地处广西壮族自治区东北部，是世界著名的风景游览城市，有着举世无双的喀斯特地貌。这里的山，平地拔起，千姿百态；漓江的水，蜿蜒曲折，明洁如镜；山多有洞，洞幽景奇，瑰丽壮观；洞中怪石，鬼斧神工，琳琅满目。',
                    attractions: ['漓江', '阳朔', '象鼻山', '芦笛岩', '七星公园'],
                    bestTime: '4-10月，其中4-5月和9-10月最佳',
                    routes: [
                        {
                            name: '桂林山水精华游',
                            description: '游览桂林山水精华，感受"桂林山水甲天下"',
                            schedule: '桂林市区→象鼻山→芦笛岩→漓江竹筏→阳朔西街',
                            cost: '门票总计约300元，竹筏漂流约200元'
                        },
                        {
                            name: '漓江阳朔深度游',
                            description: '深度体验漓江风光和阳朔风情',
                            schedule: '第一天：桂林市区景点；第二天：漓江游船→阳朔→遇龙河竹筏；第三天：十里画廊→银子岩',
                            cost: '全程3天，费用约800-1200元'
                        }
                    ],
                    tips: [
                        {
                            title: '游览方式',
                            content: '漓江可选择游船或竹筏，游船舒适但竹筏更贴近水面。阳朔可租自行车或电动车游览。'
                        },
                        {
                            title: '天气情况',
                            content: '桂林多雨，建议带雨具。雨后云雾缭绕，山水如画，是摄影的好时机。'
                        },
                        {
                            title: '美食推荐',
                            content: '桂林米粉、啤酒鱼、荔浦芋头扣肉、阳朔啤酒鱼、竹筒饭都是当地特色美食。'
                        }
                    ]
                },
                {
                    id: 11,
                    name: '黄果树瀑布',
                    location: '贵州',
                    type: '自然风光',
                    rating: '4.8',
                    image: 'image/黄果树瀑布.jpg',
                    shortDescription: '中国最大的瀑布，世界著名大瀑布之一',
                    fullDescription: '黄果树瀑布位于贵州省安顺市镇宁布依族苗族自治县，属珠江水系西江干流南盘江支流北盘江支流打帮河的支流可布河下游白水河段水系，为黄果树瀑布群中规模最大的一级瀑布，是世界著名大瀑布之一。以水势浩大著称。瀑布高度为77.8米，其中主瀑高67米；瀑布宽101米，其中主瀑顶宽83.3米。',
                    attractions: ['大瀑布', '水帘洞', '天星桥', '陡坡塘瀑布', '石头寨'],
                    bestTime: '6-8月水量充沛，是观赏瀑布的最佳时期',
                    routes: [
                        {
                            name: '黄果树瀑布经典游',
                            description: '游览黄果树瀑布群主要景点',
                            schedule: '黄果树大瀑布→水帘洞→天星桥景区→陡坡塘瀑布',
                            cost: '门票160元，景区环保车50元'
                        },
                        {
                            name: '黄果树深度游',
                            description: '全面体验瀑布群及周边民族文化',
                            schedule: '第一天：黄果树瀑布群；第二天：石头寨→龙宫→天龙屯堡',
                            cost: '门票总计约300元，住宿200-400元'
                        }
                    ],
                    tips: [
                        {
                            title: '观赏时机',
                            content: '雨季（6-8月）水量最大，最为壮观。上午光线较好，适合拍照。避开节假日人流高峰。'
                        },
                        {
                            title: '游览准备',
                            content: '瀑布水汽大，建议穿防滑鞋，带雨衣或雨伞。夏季防晒，冬季保暖。'
                        },
                        {
                            title: '特色体验',
                            content: '水帘洞可穿行其中，体验"湿身"乐趣。天星桥有水上石林、银链坠潭瀑布等奇观。'
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        filteredDestinations() {
            let result = this.destinations;

            // 应用分类过滤
            if (this.selectedCategory !== 'all') {
                result = result.filter(dest => dest.type === this.selectedCategory);
            }

            // 应用搜索过滤
            if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
                result = result.filter(dest => 
                    dest.name.toLowerCase().includes(query) ||
                    dest.location.toLowerCase().includes(query) ||
                    dest.shortDescription.toLowerCase().includes(query) ||
                    dest.type.toLowerCase().includes(query)
                );
            }

            return result;
        }
    },
    methods: {
        filterCategory(category) {
            this.selectedCategory = category;
        },
        showPage(page) {
            this.currentPage = page;
            this.selectedDestination = null;
        },
        
        login() {
            if (this.loginForm.username && this.loginForm.password) {
                this.isLoggedIn = true;
                this.currentUser = {
                    username: this.loginForm.username
                };
                this.showLoginModal = false;
                this.loginForm = { username: '', password: '' };
                
                // 保存登录状态到localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
        },
        
        logout() {
            this.isLoggedIn = false;
            this.currentUser = null;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('favorites');
        },
        
        showDestinationDetail(destination) {
            this.selectedDestination = destination;
            this.activeTab = 'info';
        },
        
        closeDetail() {
            this.selectedDestination = null;
        },
        
        scrollToDestinations() {
            document.getElementById('destinations').scrollIntoView({ 
                behavior: 'smooth' 
            });
        },
        
        showRandomDestination() {
            const randomIndex = Math.floor(Math.random() * this.destinations.length);
            this.showDestinationDetail(this.destinations[randomIndex]);
        },
        
        searchDestinations() {
            // 搜索结果会在computed属性中自动更新
            this.scrollToDestinations();
        },
        
        toggleFavorite(destination) {
            if (!this.isLoggedIn) {
                this.showLoginModal = true;
                return;
            }
            
            const index = this.favorites.findIndex(fav => fav.id === destination.id);
            if (index > -1) {
                this.favorites.splice(index, 1);
            } else {
                this.favorites.push(destination);
            }
            
            // 保存到localStorage
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
        
        isFavorite(destinationId) {
            return this.favorites.some(fav => fav.id === destinationId);
        },
        
        removeFavorite(destinationId) {
            const index = this.favorites.findIndex(fav => fav.id === destinationId);
            if (index > -1) {
                this.favorites.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(this.favorites));
            }
        },

        // 评论和评分功能
        getDestinationComments(destinationId) {
            return this.comments.filter(comment => comment.destinationId === destinationId);
        },

        submitComment() {
            if (!this.isLoggedIn) {
                this.showLoginModal = true;
                return;
            }

            if (!this.newComment.content.trim()) {
                alert('请输入评论内容');
                return;
            }

            const comment = {
                id: Date.now(),
                destinationId: this.selectedDestination.id,
                username: this.currentUser.username,
                rating: this.newComment.rating,
                content: this.newComment.content,
                date: new Date().toLocaleDateString('zh-CN')
            };

            this.comments.push(comment);

            // 保存到localStorage
            localStorage.setItem('comments', JSON.stringify(this.comments));

            // 重置评论表单
            this.newComment = {
                rating: 5,
                content: ''
            };

            // 切换到评论标签
            this.activeTab = 'comments';
        },

        deleteComment(commentId) {
            const index = this.comments.findIndex(comment => comment.id === commentId);
            if (index > -1) {
                this.comments.splice(index, 1);
                localStorage.setItem('comments', JSON.stringify(this.comments));
            }
        },

        // 社交分享功能
        shareDestination(destination) {
            this.shareUrl = window.location.href + '#destination-' + destination.id;
            this.showShareModal = true;
        },

        closeShareModal() {
            this.showShareModal = false;
        },

        shareToWeChat() {
            alert('请使用微信扫描二维码分享');
        },

        shareToWeibo() {
            const text = `我发现了一个很棒的旅游景点：${this.selectedDestination.name}，${this.selectedDestination.shortDescription}`;
            const url = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(text)}&url=${encodeURIComponent(this.shareUrl)}`;
            window.open(url, '_blank');
        },

        copyShareUrl() {
            navigator.clipboard.writeText(this.shareUrl).then(() => {
                alert('链接已复制到剪贴板');
            }).catch(() => {
                alert('复制失败，请手动复制');
            });
        }
    },
    
    mounted() {
        // 从localStorage恢复登录状态和收藏
        const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const savedCurrentUser = localStorage.getItem('currentUser');
        const savedFavorites = localStorage.getItem('favorites');
        
        if (savedIsLoggedIn === 'true' && savedCurrentUser) {
            this.isLoggedIn = true;
            this.currentUser = JSON.parse(savedCurrentUser);
        }
        
        if (savedFavorites) {
            this.favorites = JSON.parse(savedFavorites);
        }

        // 从localStorage加载评论数据
        const savedComments = localStorage.getItem('comments');
        if (savedComments) {
            this.comments = JSON.parse(savedComments);
        }
        
        // 添加键盘事件监听
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.selectedDestination) {
                this.closeDetail();
            }
            if (e.key === 'Escape' && this.showLoginModal) {
                this.showLoginModal = false;
            }
        });
        
        // 添加滚动动画
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // 延迟观察，确保DOM已经渲染
        setTimeout(() => {
            document.querySelectorAll('.destination-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }, 100);
    }
}).mount('#app');