import assert from "node:assert";
import { fetchUniversities } from "./fetchUniversities.js";

test("fetchUniversities follows type specification", () => {
  const promise = fetchUniversities("University of Massachusetts Amherst");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(Array.isArray(result)); // Assert the result in an array
    assert(result.every((x) => typeof x === "string")); // Assert each element in the array is a string
    assert(result.length === 1);
    assert(result[0] === "University of Massachusetts Amherst")
  });
});

test("fetchUniversities returns empty array", () => {
  const promise = fetchUniversities("No Uni");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(Array.isArray(result));
    assert(result.length === 0);
  });
});

test("fetchUniversities maps correctly", () => {
  const promise = fetchUniversities("University of Massachusetts");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(Array.isArray(result)); // Assert the result in an array
    assert(result.every((x) => typeof x === "string")); // Assert each element in the array is a string
    assert(result.length === 4);
    assert(result[0] === "University of Massachusetts Boston");
  });
});
