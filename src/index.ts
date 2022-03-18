import { parse } from "./parse";

export function parseArgs(options, args) {
  const argsList = args.split(" ");

  const result = Object.keys(options).reduce((value, flag) => {
    value[flag] = parse(options, flag, argsList);
    return value;
  }, {});

  return result;
}
