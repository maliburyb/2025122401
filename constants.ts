import { Game, PartyDetails, ScheduleItem } from './types';

export const PARTY_DETAILS: PartyDetails = {
  date: "2025年12月24日 (週三)",
  time: "17:30 開放入場",
  location: "新北市三重區正義南路37巷37號",
  address: "新北市三重區正義南路37巷37號",
  mapLink: "https://www.google.com/maps/search/?api=1&query=新北市三重區正義南路37巷37號"
};

export const GAMES: Game[] = [
  {
    id: 'camel',
    name: "賽駱駝",
    enName: "Camel Up",
    description: "考驗運氣與眼光的瘋狂賽跑！",
    iconType: 'camel',
    color: "bg-yellow-100 border-yellow-400 text-yellow-800"
  },
  {
    id: 'modern',
    name: "現代藝術",
    enName: "Modern Art",
    description: "拍賣場上的爾虞我詐，誰是真正的藝術大亨？",
    iconType: 'art',
    color: "bg-purple-100 border-purple-400 text-purple-800"
  },
  {
    id: 'citadels',
    name: "富饒之城",
    enName: "Citadels",
    description: "心機與策略的建設之戰。",
    iconType: 'castle',
    color: "bg-blue-100 border-blue-400 text-blue-800"
  }
];

export const SCHEDULE: ScheduleItem[] = [
  {
    id: 'potluck',
    title: "饗宴時光 (Potluck)",
    description: "請準備一道你喜歡的料理來分享（一人一道菜），可以是巷口最強小吃，也可以是親手做的拿手菜。",
    iconType: 'food'
  },
  {
    id: 'chat',
    title: "暖心時刻",
    description: "吃飽喝足，我們一起聊聊這一年，分享彼此的感恩與近況。",
    iconType: 'chat'
  },
  {
    id: 'games',
    title: "桌遊競技場",
    description: "準備好你的腦袋與演技，今晚精選三大經典遊戲！",
    iconType: 'game'
  }
];

export const WELCOME_MESSAGE = `雖然這裡空間不大（真的是麻雀雖小），但有了你們的加入，溫暖、美食、與歡笑絕對會讓這裡「五臟俱全」！
我們不吃昂貴的餐廳，我們吃的是彼此的心意；
我們不滑手機冷場，我們要來場智力與運氣的對決！`;