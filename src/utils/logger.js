import VueLogger from 'vuejs-logger';

export default {
  logger: VueLogger,
  options: {
    isEnabled: true,
    logLevel: (process.env.NODE_ENV === 'production') ? 'error' : 'debug',
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '·',
    showConsoleColors: true,
  },
};
