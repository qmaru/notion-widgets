import Calendar from './components/Calendar'
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
  }
]
