import Calendar from './components/Calendar'
import Countdown from './components/Countdown'
import CountdownTimer from './components/CountdownTimer'
import DailyProgress from './components/DailyProgress'
import Givemekeyword from './components/Givemekeyword'
import Givemephoto from './components/Givemephoto'

export const WidgetInfos: any = [
  {
    "name": "Calendar",
    "url": "/notion/calendar",
    "timestamp": true,
    "path": "/calendar",
    "element": <Calendar />
  },
  {
    "name": "DailyProgress",
    "url": "/notion/dailyprogress",
    "timestamp": true,
    "path": "/dailyprogress",
    "element": <DailyProgress />
  },
  {
    "name": "Countdown",
    "url": "/notion/countdown",
    "timestamp": false,
    "path": "/countdown",
    "element": <Countdown />
  },
  {
    "name": "",
    "url": "",
    "timestamp": false,
    "path": "/countdown/timer",
    "element": <CountdownTimer />
  },
  {
    "name": "Give me a photo",
    "url": "/notion/givemekeyword",
    "timestamp": false,
    "path": "/givemekeyword",
    "element": <Givemekeyword />
  },
  {
    "name": "",
    "url": "",
    "timestamp": false,
    "path": "/givemekeyword/photo",
    "element": <Givemephoto />
  }
]
