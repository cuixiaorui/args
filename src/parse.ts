const map = new Map();
map.set(Boolean, parseBoolean());
map.set(Number, parseNumber());
map.set(String, parseString());

function parseBoolean() {
  return {
    existCallback() {
      return true;
    },
    defaultValue: false,
  };
}

function parseNumber() {
  return {
    existCallback(argsList, flag) {
      return Number(getNextValByFlag(argsList, flag));
    },
    defaultValue: 0,
  };
}

function parseString() {
  return {
    existCallback(argsList, flag) {
      return String(getNextValByFlag(argsList, flag));
    },
    defaultValue: "",
  };
}

function getNextValByFlag(argsList, flag) {
  const valIndex = argsList.indexOf("-" + flag) + 1;
  return argsList[valIndex];
}

export function parse(options: any, flag: string, argsList: any) {
  const { existCallback, defaultValue } = map.get(options[flag]);
  // 多态的实现
  return parseHandler(argsList, flag, existCallback, defaultValue);
}

function parseHandler(argsList, flag, existCallback, defaultVal) {
  if (existFlag(argsList, flag)) {
    return existCallback(argsList, flag);
  } else {
    return defaultVal;
  }
}

function existFlag(argsList: any, flag: string) {
  return argsList.includes("-" + flag);
}
