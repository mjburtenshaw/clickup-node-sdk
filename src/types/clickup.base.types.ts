export type Int32 = number;

export type Int64 = number;

export type Double = number;

export type DurationMs = Int32;

export type TimestampMs = Int64;

export type HexColor = `#${string}`;

export type Url = string;

export type Email = `${string}@${string}.${string}`;

export type SBool = "true" | "false";

export type SNull = "null";

/** Resembles a dobule
 * @see Double
 */
export type SDouble = string;

/** resembles an integer */
export type SInt = string;

/** resembles TimestampMs
 * @see TimestampMs
 */
export type STimestampMs = string;

/** resembles DurationMs
 * @see DurationMs
 */
export type SDurationMs = string;

/** resembles a float */
export type SFloat = string;
