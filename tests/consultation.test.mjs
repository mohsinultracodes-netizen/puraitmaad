import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
const originalLoad = Module._load;
Module._load = function (name,...args) { if(name === "server-only") return {}; return originalLoad.call(this,name,...args); };
const load = createRequire(import.meta.url), root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
for(const extension of [".ts",".tsx"])load.extensions[extension] = (module,filename) => {
  const source=fs.readFileSync(filename,"utf8").replace(/(["'])@\/([^"']+)\1/g,(_,quote,target)=>JSON.stringify(path.resolve(root,target)));
  module._compile(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,filename);
};
load.extensions[".css"] = () => {};
const {validateServiceRequest,validateFullName,getLahoreDate,requestSuccess,requestFailure}=load("../lib/consultation/validation.ts");
const {requestService}=load("../app/contact/actions.ts");
const {deliverServiceRequest}=load("../lib/consultation/delivery.ts");
const {serviceRequestEmail}=load("../lib/consultation/email.ts");
const {getRequestService,serviceRequestHref,getRequestPlan,planRequestHref}=load("../lib/request-context.ts");
const {membershipPlans}=load("../content/membership.ts");
const {ServiceRequestForm}=load("../components/forms/service-request-form.tsx");
const {RequestFeedback}=load("../components/forms/request-feedback.tsx");
const {siteConfig}=load("../content/site.ts");
const {getContactLinks,submittedRequestWhatsappHref}=load("../lib/contact-links.ts");
const fixedNow=new Date("2026-10-06T20:00:00Z");
function validForm(contact={email:" owner@example.com "}){const form=new FormData();for(const [key,value]of Object.entries({fullName:" Test Owner ",location:" Lahore ",message:"Please arrange a repair.\nThe kitchen tap is leaking.",...contact}))form.append(key,value);return form;}
test("Name preserves Unicode, combining marks, hyphens and apostrophes",()=>{
  for(const name of ["Mohsin Iqbal","Ali Raza","Maryam","Anne-Marie","O'Connor","O’Connor","علی","José","Jose\u0301","  Mohsin Iqbal  "])assert.equal(validateFullName(name),undefined,name);
});
test("Name rejects numbers, special characters, controls and excessive length",async()=>{
  for(const name of ["Mohsin123","12345","Mohsin@Iqbal","Test!","@@@","M0hsin","--","Ali\tRaza","Ali\u0000Raza"]){assert.ok(validateFullName(name),name);const form=validForm();form.set("fullName",name);assert.equal((await requestService({},form)).status,"invalid");}
  assert.equal(validateFullName(""),"Name is required.");assert.equal(validateFullName("A"),"Please enter at least 2 characters.");assert.equal(validateFullName("a".repeat(121)),"Please use 120 characters or fewer.");
});
test("phone-only, email-only and both-contact requests are valid",()=>{
  for(const contact of [{phone:"0300 1234567"},{email:"owner@example.com"},{phone:"+92 (300) 123-4567",email:"owner@example.com"}])assert.deepEqual(validateServiceRequest(validForm(contact)).errors,{});
});
test("neither contact method is rejected and malformed optional contacts stay invalid",()=>{
  const neither=validateServiceRequest(validForm({}));assert.ok(neither.errors.phone&&neither.errors.email);
  for(const email of ["owner@invalid","a..b@example.com","a@example.com\r\nBcc:other@example.com","a@-bad.com"]){assert.ok(validateServiceRequest(validForm({phone:"03001234567",email})).errors.email);}
  for(const phone of ["letters","123","00000000000","+92+3001234567","1234567890123456"]){assert.ok(validateServiceRequest(validForm({email:"owner@example.com",phone})).errors.phone);}
});
test("realistic international formats, trimming and email-domain normalization work",()=>{
  for(const phone of ["+44 (20) 7946-0123","001 (415) 555-0123","042 34567890"]){assert.deepEqual(validateServiceRequest(validForm({phone})).errors,{});}
  const result=validateServiceRequest(validForm({email:" Owner@EXAMPLE.COM "}));assert.equal(result.values.email,"Owner@example.com");assert.equal(result.values.fullName,"Test Owner");assert.equal(result.values.location,"Lahore");
});
test("required location and request remain free text with sensible bounds",()=>{
  const form=validForm();form.set("location","");form.set("message","");const missing=validateServiceRequest(form);assert.ok(missing.errors.location&&missing.errors.message);
  for(const field of ["location","message"]){form.set(field,"abc\u0000def");assert.ok(validateServiceRequest(form).errors[field]);}
  const long=validForm();long.set("location","a".repeat(161));long.set("message","a".repeat(4001));assert.ok(validateServiceRequest(long).errors.location&&validateServiceRequest(long).errors.message);
  const human=validForm();human.set("location","Township, Lahore — near the park");human.set("message","Tap leaking (again)! Can you help?\nAvailable after 4pm; thanks.");assert.deepEqual(validateServiceRequest(human).errors,{});
});
test("duplicate scalar entries and uploaded files are rejected",()=>{
  for(const field of ["fullName","phone","email","location","message","preferredDate","preferredTime"]){const form=validForm();form.append(field,"duplicate");form.append(field,"again");assert.ok(validateServiceRequest(form).errors[field],field);const file=validForm();file.set(field,new Blob(["data"]),"test.txt");assert.ok(validateServiceRequest(file).errors[field],field);}
});
test("optional preferences and real calendar dates use Lahore local midnight",()=>{
  assert.equal(getLahoreDate(fixedNow),"2026-10-07");assert.deepEqual(validateServiceRequest(validForm(),fixedNow).errors,{});
  for(const date of ["2026-10-07","2026-10-08","2028-02-29"]){const form=validForm();form.set("preferredDate",date);form.set("preferredTime","23:59");assert.deepEqual(validateServiceRequest(form,fixedNow).errors,{});}
  for(const date of ["2026-10-06","2026-02-30","2027-02-29","2026-13-01","not-a-date"]){const form=validForm();form.set("preferredDate",date);assert.ok(validateServiceRequest(form,fixedNow).errors.preferredDate,date);}
  assert.equal(getLahoreDate(new Date("2026-10-06T18:59:59Z")),"2026-10-06");
});
test("malformed times are rejected while time-only preferences are allowed",()=>{
  for(const time of ["24:00","12:60","9:30","noon","12:30:00"]){const form=validForm();form.set("preferredTime",time);assert.ok(validateServiceRequest(form).errors.preferredTime,time);}
  const form=validForm();form.set("preferredTime","09:30");assert.deepEqual(validateServiceRequest(form).errors,{});
});
test("server action independently validates and ignores untrusted previous success",async()=>{
  const result=await requestService({status:"success",message:"untrusted",errors:{}},new FormData());assert.equal(result.status,"invalid");for(const field of ["fullName","phone","email","location","message"])assert.ok(result.errors[field]);assert.equal("values" in result,false);
});
test("honeypot, duplicate identity/context and malformed UUID never deliver",async()=>{
  for(const value of ["spam",new Blob(["spam"])]){const form=validForm();form.set("website",value);assert.equal((await requestService({},form)).status,"error");}
  for(const field of ["website","submissionId","serviceId","planId"]){const form=validForm();form.append(field,"");form.append(field,"");assert.equal((await requestService({},form)).status,"error");}
  const form=validForm();form.set("submissionId","injected-key");assert.equal((await requestService({},form)).status,"error");
});
test("notifications escape HTML, include request/preferences and retain optional timestamp utility",()=>{
  const values=validateServiceRequest(validForm()).values;values.message='<script>alert("test")</script>\nSecond line & details';values.preferredDate="2030-01-02";values.preferredTime="09:30";
  const mail=serviceRequestEmail(values,"gardening",new Date("2026-10-07T10:00:00Z"));assert.equal(mail.subject,"New Puraitmaad Service Request");assert.ok(!mail.html.includes("<script>"));assert.ok(mail.html.includes("&lt;script&gt;"));assert.ok(mail.html.includes("<br>Second line &amp; details"));assert.ok(mail.text.includes("2026-10-07T10:00:00.000Z"));
  for(const label of ["Name","Email","Location / Area","Request","Preferred date","Preferred time","not confirmed appointments","Gardening & Outdoor Care"])assert.ok(mail.text.includes(label),label);
  assert.deepEqual(serviceRequestEmail(values),serviceRequestEmail(values));assert.ok(!serviceRequestEmail(values).text.includes("Phone / WhatsApp:"));
});
test("known service context is editable, unknown/array values safely fall back",()=>{
  assert.equal(getRequestService("gardening").name,"Gardening & Outdoor Care");for(const value of ["unknown","<script>",["gardening"],null,undefined])assert.equal(getRequestService(value),undefined);
  assert.equal(serviceRequestHref("gardening"),"/contact?service=gardening#request-service");assert.equal(serviceRequestHref("unknown"),"/contact#request-service");
  const html=renderToStaticMarkup(createElement(ServiceRequestForm,{serviceId:"gardening"}));assert.ok(html.includes("Gardening &amp; Outdoor Care"));assert.match(html,/name="serviceId" value="gardening"/);assert.doesNotMatch(renderToStaticMarkup(createElement(ServiceRequestForm,{serviceId:"unknown"})),/name="serviceId"/);
});
test("shared form has seven public fields, correct controls, anchor-safe labels and no retired wording",()=>{
  const html=renderToStaticMarkup(createElement(ServiceRequestForm));for(const name of ["fullName","phone","email","location","message","preferredDate","preferredTime"])assert.ok(html.includes(`name="${name}"`));for(const type of ["tel","email","date","time"])assert.ok(html.includes(`type="${type}"`));assert.match(html,/autoComplete="name"/i);assert.match(html,/autoComplete="tel"/i);assert.match(html,/autoComplete="email"/i);assert.match(html,/Send Request/);assert.doesNotMatch(html,/Property Type|Stewardship enquiry|Request Consultation|name="help"/);
});

test("plan enquiries resolve catalog tiers, prefill editable messages and keep validated hidden context",()=>{
  for(const plan of membershipPlans){
    assert.equal(getRequestPlan(plan.id),plan);
    const queryId={essential:"essential",premium:"signature",private:"bespoke"}[plan.id];
    assert.equal(planRequestHref(plan.id),`/contact?plan=${queryId}`);
    const html=renderToStaticMarkup(createElement(ServiceRequestForm,{planId:plan.id}));
    assert.ok(html.includes(`name="planId" value="${plan.id}"`));
    assert.ok(html.includes(`information about the ${plan.name} plan.`));
    assert.match(html,/Plan enquiry:/);
    const mail=serviceRequestEmail(validateServiceRequest(validForm()).values,undefined,undefined,plan.id);
    assert.ok(mail.text.includes(`Plan enquiry (optional): ${plan.name}`));
  }
  assert.equal(getRequestPlan("signature").id,"premium");assert.equal(getRequestPlan("bespoke").id,"private");
  for(const raw of ["unknown","<script>","__proto__",["essential"],null,undefined])assert.equal(getRequestPlan(raw),undefined);
  const html=renderToStaticMarkup(createElement(ServiceRequestForm,{planId:"unknown"}));assert.doesNotMatch(html,/name="planId"|Plan enquiry:/);
  assert.ok(!serviceRequestEmail(validateServiceRequest(validForm()).values,undefined,undefined,"unknown").text.includes("Plan enquiry"));
});

test("server plan context survives edited request text and participates in delivery idempotency",async()=>{
  const fetchBefore=globalThis.fetch,keys=["RESEND_API_KEY","RESEND_FROM","RESEND_TO"],previous=Object.fromEntries(keys.map(k=>[k,process.env[k]])),captures=[];
  process.env.RESEND_API_KEY="test-key-only";process.env.RESEND_FROM="Puraitmaad <requests@example.com>";process.env.RESEND_TO="owner@example.com";
  globalThis.fetch=async(_url,options)=>{captures.push({body:JSON.parse(options.body),headers:new Headers(options.headers)});return Response.json({id:"accepted-plan-fixture"});};
  try{
    const form=validForm();form.set("message","Please contact me to discuss my household needs.");form.set("submissionId","12345678-1234-4234-8234-123456789abc");
    for(const plan of membershipPlans){form.set("planId",plan.id);assert.equal((await requestService({},form)).status,"success");assert.ok(captures.at(-1).body.text.includes(`Plan enquiry (optional): ${plan.name}`));assert.ok(captures.at(-1).body.text.includes("Please contact me"));}
    assert.equal(new Set(captures.map(c=>c.headers.get("idempotency-key"))).size,3);
    const id=captures.at(-1).headers.get("idempotency-key");await requestService({},form);assert.equal(captures.at(-1).headers.get("idempotency-key"),id);
    form.set("planId","unknown");assert.equal((await requestService({},form)).status,"success");assert.ok(!captures.at(-1).body.text.includes("Plan enquiry"));
    const before=captures.length;form.set("planId",new Blob(["private"]));assert.equal((await requestService({},form)).status,"error");assert.equal(captures.length,before);
  }finally{globalThis.fetch=fetchBefore;for(const key of keys){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}}
});
test("success, error and pending copy is truthful and WhatsApp-aware",()=>{
  const render=(status,message,whatsappHref,pending=false)=>renderToStaticMarkup(createElement(RequestFeedback,{state:{status,message,errors:{}},pending,whatsappHref}));assert.match(render("success",requestSuccess),/Request received<\/h3>/);assert.match(render("error",requestFailure),/Something went wrong\./);assert.doesNotMatch(render("error",requestFailure),/WhatsApp|wa.me/);assert.match(render("error",requestFailure,"https://wa.me/923001234567"),/contact us directly on WhatsApp/);assert.equal(render("idle","",null,true),"<p>Sending...</p>");
});

test("Continue on WhatsApp is offered only after success, never on errors or while sending",()=>{
  const href="https://wa.me/923001234567?text=request-draft";
  const render=(status,pending=false)=>renderToStaticMarkup(createElement(RequestFeedback,{state:{status,message:requestSuccess,errors:{}},pending,submittedWhatsappHref:href}));
  assert.match(render("success"),/Continue on WhatsApp/);
  assert.match(render("success"),/Review the draft in WhatsApp, then press Send/);
  assert.match(render("success"),/We&#x27;ll review the details and get back to you\./);
  for(const status of ["idle","invalid","error"]) assert.doesNotMatch(render(status),/Continue on WhatsApp|request-draft/);
  assert.doesNotMatch(render("success",true),/Continue on WhatsApp|request-draft/);
});
test("missing and invalid server configuration never claims delivery",async()=>{
  const previous={...process.env};try{delete process.env.RESEND_API_KEY;assert.equal((await requestService({},validForm())).status,"error");process.env.RESEND_API_KEY="re_mock_only";delete process.env.RESEND_TO;delete process.env.RESEND_FROM;assert.equal((await requestService({},validForm())).message,requestFailure);}finally{for(const key of ["RESEND_API_KEY","RESEND_FROM","RESEND_TO"]){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}}
});

test("missing or invalid WhatsApp hides follow-up links without blocking Resend lead capture", async () => {
  const previousNumber = siteConfig.WHATSAPP, fetchBefore = globalThis.fetch;
  const keys = ["RESEND_API_KEY", "RESEND_FROM", "RESEND_TO"];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  const deliveries = [];
  Object.assign(process.env, { RESEND_API_KEY: "re_mock_only", RESEND_FROM: "Puraitmaad <requests@example.com>", RESEND_TO: "team@example.com" });
  globalThis.fetch = async (_url, options) => { deliveries.push(JSON.parse(options.body)); return Response.json({ id: "accepted-without-whatsapp" }); };
  try {
    for (const number of ["", "javascript:alert(1)"]) {
      siteConfig.WHATSAPP = number;
      const links = getContactLinks(), form = validForm();
      assert.equal(links.whatsapp, null);
      const formHtml = renderToStaticMarkup(createElement(ServiceRequestForm, { whatsappHref: links.whatsapp }));
      assert.match(formHtml, /Send Request/);
      assert.match(formHtml, /name="message"/);
      assert.doesNotMatch(formHtml, /wa\.me|href="#"/);
      const state = await requestService({}, form);
      assert.equal(state.status, "success");
      assert.equal(state.message, requestSuccess);
      const followUp = submittedRequestWhatsappHref(validateServiceRequest(form).values);
      assert.equal(followUp, null);
      const feedback = renderToStaticMarkup(createElement(RequestFeedback, { state, pending: false, submittedWhatsappHref: followUp }));
      assert.match(feedback, /Request received/);
      assert.doesNotMatch(feedback, /Continue on WhatsApp|wa\.me|href="#"/);
    }
    assert.equal(deliveries.length, 2);
    for (const delivery of deliveries) {
      assert.equal(delivery.reply_to, "owner@example.com");
      assert.ok(delivery.text.includes("The kitchen tap is leaking."));
    }
  } finally {
    siteConfig.WHATSAPP = previousNumber;
    globalThis.fetch = fetchBefore;
    for (const key of keys) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key]; }
  }
});
test("Resend requires acceptance, separates server config, conditional Reply-To and stable idempotency",async()=>{
  const previous={...process.env}, fetchBefore=globalThis.fetch;
  Object.assign(process.env,{RESEND_API_KEY:"re_test_mock_only",RESEND_FROM:"Puraitmaad <sender@example.com>",RESEND_TO:"team@example.com"});const captures=[];
  try{
    globalThis.fetch=async(_url,options)=>{captures.push({body:JSON.parse(options.body),headers:new Headers(options.headers),signal:options.signal});return Response.json({id:"accepted-test-id"});};
    const form=validForm();form.set("submissionId","12345678-1234-4123-8123-123456789abc");form.set("serviceId","gardening");assert.equal((await requestService({},form)).status,"success");await requestService({},form);
    assert.equal(captures[0].body.from,process.env.RESEND_FROM);assert.equal(captures[0].body.to,process.env.RESEND_TO);assert.equal(captures[0].body.reply_to,"owner@example.com");assert.ok(captures[0].signal instanceof AbortSignal);assert.deepEqual(captures[0].body,captures[1].body);
    const id=captures[0].headers.get("idempotency-key");assert.match(id,/^service-request\/[a-f0-9]{64}$/);assert.equal(id,captures[1].headers.get("idempotency-key"));assert.ok(!id.includes("owner"));
    const phone=validForm({phone:"03001234567"});assert.equal((await requestService({},phone)).status,"success");assert.ok(!("reply_to"in captures.at(-1).body));
    form.set("message","Different request");await requestService({},form);assert.notEqual(id,captures.at(-1).headers.get("idempotency-key"));form.set("serviceId","unknown");await requestService({},form);assert.ok(!captures.at(-1).body.text.includes("Service context"));
    let count=0;globalThis.fetch=async()=>++count===1?Response.json({name:"internal_server_error",message:"provider detail"},{status:500}):Response.json({id:"retry-accepted"});assert.equal((await requestService({},validForm())).status,"success");assert.equal(count,2);
    for(const response of [()=>Response.json({name:"validation_error",message:"private provider detail"},{status:403}),()=>Response.json({})]){globalThis.fetch=async()=>response();const result=await deliverServiceRequest(validateServiceRequest(validForm()).values);assert.equal(result.status,"error");assert.equal(result.message,requestFailure);}
    for(const exception of [new Error("private network detail"),new DOMException("Timed out","TimeoutError")]){globalThis.fetch=async()=>{throw exception;};assert.equal((await requestService({},validForm())).message,requestFailure);}
  }finally{globalThis.fetch=fetchBefore;for(const key of ["RESEND_API_KEY","RESEND_FROM","RESEND_TO"]){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}}
});
