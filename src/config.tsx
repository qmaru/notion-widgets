import Calendar from './components/Calendar'
import Countdown from './components/Countdown'
import CountdownTimer from './components/CountdownTimer'
import DailyProgress from './components/DailyProgress'

export var WidgetInfos: any = [
  {
    "name": "Calendar",
    "url": "/notion/calendar",
    "path": "/calendar",
    "element": <Calendar />
  },
  {
    "name": "DailyProgress",
    "url": "/notion/dailyprogress",
    "path": "/dailyprogress",
    "element": <DailyProgress />
  },
  {
    "name": "Countdown",
    "url": "/notion/countdown",
    "path": "/countdown",
    "element": <Countdown />
  },
  {
    "name": "",
    "url": "",
    "path": "/countdown/timer",
    "element": <CountdownTimer />
  }
]
