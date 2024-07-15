// Adapted from `node-pg-types` (https://github.com/brianc/node-pg-types/blob/master/lib/textParsers.js)
import array from "postgres-array";
import parseTimestampTz from "postgres-date";
import parseInterval from "postgres-interval";
// @ts-ignore
import parseByteA from "postgres-bytea";
import range from "postgres-range";

export function parseBool(value: string) {
  return (
    value === "TRUE" ||
    value === "t" ||
    value === "true" ||
    value === "y" ||
    value === "yes" ||
    value === "on" ||
    value === "1"
  );
}

export function parseBoolArray(value: string) {
  return array.parse(value, parseBool);
}

export function parseIntegerArray(value: string) {
  return array.parse(value, Number);
}

export function parseBigIntegerArray(value: string) {
  return array.parse(value, function (entry) {
    return parseBigInteger(entry).trim();
  });
}

export const parsePointArray = function (value: string) {
  return array.parse(value, parsePoint);
};

export const parseFloatArray = function (value: string) {
  return array.parse(value, parseFloat);
};

export const parseStringArray = function (value: string) {
  return array.parse(value);
};

export const parseTimestamp = function (value: string) {
  const utc = value.endsWith(" BC") ? value.slice(0, -3) + "Z BC" : value + "Z";

  return parseTimestampTz(utc);
};

export const parseTimestampArray = function (value: string) {
  return array.parse(value, parseTimestamp);
};

export const parseTimestampTzArray = function (value: string) {
  return array.parse(value, (val: string) => parseTimestampTz(val));
};

export const parseIntervalArray = function (value: string) {
  return array.parse(value, parseInterval);
};

export const parseByteAArray = function (value: string) {
  return array.parse(value, parseByteA);
};

export const parseBigInteger = function (value: string) {
  const valStr = String(value);
  if (/^\d+$/.test(valStr)) {
    return valStr;
  }
  return value;
};

export const parseJsonArray = function (value: string) {
  return array.parse(value, JSON.parse);
};

export const parsePoint = function (value: string) {
  if (value[0] !== "(") {
    return null;
  }

  const [x, y] = value.substring(1, value.length - 1).split(",");

  return {
    x: parseFloat(x),
    y: parseFloat(y),
  };
};

export const parseCircle = function (value: string) {
  if (value[0] !== "<" && value[1] !== "(") {
    return null;
  }

  let point = "(";
  let radius = "";
  let pointParsed = false;
  for (let i = 2; i < value.length - 1; i++) {
    if (!pointParsed) {
      point += value[i];
    }

    if (value[i] === ")") {
      pointParsed = true;
      continue;
    } else if (!pointParsed) {
      continue;
    }

    if (value[i] === ",") {
      continue;
    }

    radius += value[i];
  }
  const result = parsePoint(point);

  return { ...result, radius: parseFloat(radius) };
};

export function parseInt4Range(raw: string) {
  return range.parse(raw, Number);
}

export function parseNumRange(raw: string) {
  return range.parse(raw, parseFloat);
}

export function parseInt8Range(raw: string) {
  return range.parse(raw, parseBigInteger);
}

export function parseTimestampRange(raw: string) {
  return range.parse(raw, parseTimestamp);
}

export function parseTimestampTzRange(raw: string) {
  return range.parse(raw, (val: string) => parseTimestampTz(val));
}

export const parseNumber = Number;

export const parseJson = JSON.parse;

export const parseRange = range.parse;

export const oidToParser = {
  20: parseBigInteger, // int8
  21: parseNumber, // int2
  23: parseNumber, // int4
  26: parseNumber, // oid
  700: parseFloat, // float4/real
  701: parseFloat, // float8/double
  16: parseBool,
  1114: parseTimestamp, // timestamp without time zone
  1184: parseTimestampTz, // timestamp with time zone
  600: parsePoint, // point
  651: parseStringArray, // cidr[]
  718: parseCircle, // circle
  1000: parseBoolArray,
  1001: parseByteAArray,
  1005: parseIntegerArray, // _int2
  1007: parseIntegerArray, // _int4
  1028: parseIntegerArray, // oid[]
  1016: parseBigIntegerArray, // _int8
  1017: parsePointArray, // point[]
  1021: parseFloatArray, // _float4
  1022: parseFloatArray, // _float8
  1231: parseStringArray, // _numeric
  1014: parseStringArray, // char
  1015: parseStringArray, // varchar
  1008: parseStringArray,
  1009: parseStringArray,
  1040: parseStringArray, // macaddr[]
  1041: parseStringArray, // inet[]
  1115: parseTimestampArray, // timestamp without time zone[]
  1182: parseStringArray, // date[]
  1185: parseTimestampTzArray, // timestamp with time zone[]
  1186: parseInterval,
  1187: parseIntervalArray,
  17: parseByteA,
  114: parseJson, // json
  3802: parseJson, // jsonb
  199: parseJsonArray, // json[]
  3807: parseJsonArray, // jsonb[]
  3904: parseInt4Range, // int4range
  3906: parseNumRange, // numrange
  3907: parseStringArray, // numrange[]
  3908: parseTimestampRange, // tsrange
  3910: parseTimestampTzRange, // tstzrange
  3912: parseRange, // daterange
  3926: parseInt8Range, // int8range
  2951: parseStringArray, // uuid[]
  791: parseStringArray, // money[]
  1183: parseStringArray, // time[]
  1270: parseStringArray, // timetz[]
};
