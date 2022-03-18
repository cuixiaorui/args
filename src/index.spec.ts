import { describe, it, expect } from "vitest";
import { parseArgs } from "./index";

describe("Args", () => {
    it("happy path", () => {
      const options = {
        l: Boolean,
	p: Number,
        d: String,
      };

      const args = parseArgs(options, "-l -p 8080 -d /usr/logs");

      expect(args).toEqual({
        l: true,
        p: 8080,
        d: "/usr/logs",
      });
    });

  describe("boolean", () => {
    it("l 的值应该等于 true", () => {
      const options = {
        l: Boolean,
      };
      const args = parseArgs(options, "-l");
      expect(args).toEqual({
        l: true,
      });
    });

    it("布尔类型的值默认是 false", () => {
      const options = {
        l: Boolean,
      };
      const args = parseArgs(options, "");
      expect(args).toEqual({
        l: false,
      });
    });
  });

  describe("number", () => {
    it("p 的值应该等于 8080 当有 p 这个 flag 的时候", () => {
      const options = {
        p: Number,
      };
      const args = parseArgs(options, "-p 8080");
      expect(args).toEqual({
        p: 8080,
      });
    });

    it("当没有 p 的时候 ， p 的默认值应该为 0", () => {
      const options = {
        p: Number,
      };
      const args = parseArgs(options, "");
      expect(args).toEqual({
        p: 0,
      });
    });
  });

  describe("string", () => {
    it("当 d 有值的时候， 应该可以得到值", () => {
      const options = {
        d: String,
      };
      const args = parseArgs(options, "-d /usr/logs");
      expect(args).toEqual({
        d: "/usr/logs",
      });
    });

    it("当 d 没有值的时候， 默认值应该为 ''", () => {
      const options = {
        d: String,
      };
      const args = parseArgs(options, "");
      expect(args).toEqual({
        d: '',
      });
    });
  });
});

// happy path
// 1. boolean l -> false
// 2. number p -> 8080
// 3. string d -> /usr/logs

// 支持