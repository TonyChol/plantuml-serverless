export const OS = Object.freeze({
  WINDOWS: Symbol("Window"),
  MAC: Symbol("macOS"),
  UNIX: Symbol("X11"),
  LINUX: Symbol("Linux"),
  UNKNOWN: Symbol("Unknown")
});

export const runningOS = () => {
  let OSName = OS.UNKNOWN;
  if (navigator.appVersion.indexOf("Win") != -1) OSName = OS.WINDOWS;
  if (navigator.appVersion.indexOf("Mac") != -1) OSName = OS.MAC;
  if (navigator.appVersion.indexOf("X11") != -1) OSName = OS.UNIX;
  if (navigator.appVersion.indexOf("Linux") != -1) OSName = OS.LINUX;
  return OSName;
};
