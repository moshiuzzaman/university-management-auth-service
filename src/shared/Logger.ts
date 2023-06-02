import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
import path from 'path'

const { combine, timestamp, label, prettyPrint, printf } = format

// Formate my logger
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`
})

// create logger for reuse
const winstonCreateLoger = (loggerName: string) => {
  return createLogger({
    level: loggerName,
    format: combine(
      label({ label: loggerName }),
      timestamp(),
      prettyPrint(),
      myFormat
    ),
    transports: [
      new transports.Console(),
      new transports.DailyRotateFile({
        filename: path.join(
          process.cwd(),
          'logs',
          'winston',
          `${loggerName === 'error' ? 'errors' : 'successes'}`,
          `UM-${loggerName}-%DATE%.log`
        ),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
  })
}

// Info / success loger create
const logger = winstonCreateLoger('info')

//Error logger create
const errorLogger = winstonCreateLoger('error')

export { logger, errorLogger }
