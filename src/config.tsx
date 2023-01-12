import Calendar from './components/Calendar'
import Countdown from './components/Countdown'
import CountdownTimer from './components/CountdownTimer'
import DailyProgress from './components/DailyProgress'

export var WidgetInfos: any = [
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
  }
]
