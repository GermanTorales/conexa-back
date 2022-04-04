import winston from 'winston';
import config from './config.js';
import { format } from 'date-fns';

const enumerateErrorFormat = winston.format(info => {
  if (info instanceof Error) Object.assign(info, { message: info.stack });

  return info;
});

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const logger = winston.createLogger({
  level: config.env === 'develop' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'develop' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${timezone} | ${format(new Date(), 'dd/MM/yyyy | HH:mm')} | ${level} | ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
