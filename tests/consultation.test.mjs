import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const loadModule = createRequire(import.meta.url);
const testDirectory = path.dirname(fileURLToPath(import.meta.url));

// Exercise the actual TypeScript validator and Server Action using the installed compiler.
loadModule.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8").replace(/(["'])@\/([^"']+)\1/g, (_, _quote, target) => JSON.stringify(path.resolve(testDirectory, "..", target)));
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  module._compile(output.outputText, filename);
};
const { validateConsultation, validateFullName } = loadModule("../lib/consultation/validation.ts");
const { requestConsultation } = loadModule("../app/contact/actions.ts");

function validForm() {
  const form = new FormData();
  for (const [name, value] of Object.entries({ fullName: "  Test Owner  ", email: " owner@example.com ", location: " Lahore ", propertyType: "Estate", overseas: "Yes", help: "Not Sure Yet" })) form.append(name, value);
  return form;
}

test("Full Name accepts the requested examples and Unicode names", () => {
  for (const name of ["Mohsin Iqbal", "Ali Raza", "Maryam", "Anne-Marie", "O'Connor", "علی", "José", "Jose\u0301", "  Mohsin Iqbal  "]) {
    assert.equal(validateFullName(name), undefined, name);
    const form = validForm(); form.set("fullName", name);
    assert.equal(validateConsultation(form).errors.fullName, undefined, name);
  }
});
test("Full Name rejects numbers and special characters with the requested message", async () => {
  for (const name of ["Mohsin123", "12345", "Mohsin@Iqbal", "Test!", "@@@", "M0hsin", "--", "Ali\tRaza"]) {
    const message = "Please enter a valid name using letters only.";
    assert.equal(validateFullName(name), message, name);
    const form = validForm(); form.set("fullName", name);
    const response = await requestConsultation({}, form);
    assert.equal(response.status, "invalid");
    assert.equal(response.errors.fullName, message, name);
  }
});
test("Full Name distinguishes empty and too-short values", () => {
  for (const name of ["", "   "]) assert.equal(validateFullName(name), "Full name is required.");
  for (const name of ["A", "  A  ", "é"]) assert.equal(validateFullName(name), "Please enter at least 2 characters.");
});

test("valid values are trimmed and optional fields may be empty", () => {
  const result = validateConsultation(validForm());
  assert.deepEqual(result.errors, {});
  assert.equal(result.values.fullName, "Test Owner");
  assert.equal(result.values.email, "owner@example.com");
});
test("missing required values are rejected", () => {
  assert.equal(Object.keys(validateConsultation(new FormData()).errors).length, 6);
});
test("malformed email, excessive lengths and invalid phone are rejected", () => {
  const form = validForm();
  form.set("email", "owner@invalid"); form.set("fullName", "a".repeat(121)); form.set("phone", "letters");
  const { errors } = validateConsultation(form);
  assert.ok(errors.email && errors.fullName && errors.phone);
});
test("tampered select and multi-select values are rejected", () => {
  const form = validForm();
  form.set("propertyType", "tampered"); form.set("overseas", "Maybe"); form.set("occupancy", "tampered"); form.append("help", "tampered");
  const { errors } = validateConsultation(form);
  assert.ok(errors.propertyType && errors.overseas && errors.occupancy && errors.help);
});
test("duplicate scalar values, duplicate help values and files are rejected", () => {
  const form = validForm();
  form.append("email", "another@example.com"); form.append("help", "Not Sure Yet"); form.set("message", new Blob(["file"]), "test.txt");
  const { errors } = validateConsultation(form);
  assert.ok(errors.email && errors.help && errors.message);
});
test("unicode names, international phone numbers and multiple allowed selections work", () => {
  const form = validForm();
  form.set("fullName", "علی"); form.set("phone", "+92 (300) 123-4567"); form.append("help", "Arrival Ready");
  assert.deepEqual(validateConsultation(form).errors, {});
});
test("Server Action rejects invalid submissions independently of the browser", async () => {
  const response = await requestConsultation({ status: "success", errors: {}, message: "untrusted" }, new FormData());
  assert.equal(response.status, "invalid"); assert.ok(response.errors.email);
});
test("valid submissions never claim delivery success while delivery is unavailable", async () => {
  const response = await requestConsultation({ status: "idle", errors: {}, message: "" }, validForm());
  assert.equal(response.status, "unavailable");
  assert.equal(response.message, "Online enquiry delivery is being prepared. Please check back soon.");
  assert.deepEqual(response.errors, {});
  assert.equal("values" in response, false);
});
