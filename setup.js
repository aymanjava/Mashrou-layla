const fs = require("fs");
const { execSync } = require("child_process");

console.log("🚀 Starting Layla Bot Setup...");

// 1️⃣ إنشاء مجلدات AppState و Temp
if (!fs.existsSync("./appstate")) fs.mkdirSync("./appstate");
if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp");

console.log("✅ Folders created (appstate, tmp)");

// 2️⃣ إنشاء ملف AppState placeholder
const appstatePath = "./appstate/appstate.json";
if (!fs.existsSync(appstatePath)) {
  fs.writeFileSync(appstatePath, "{}");
  console.log("✅ AppState placeholder created");
} else {
  console.log("⚠️ AppState already exists");
}

// 3️⃣ إنشاء ملف .env
const envPath = "./.env";
if (!fs.existsSync(envPath)) {
  const envContent = `# Facebook login
APPSTATE_PATH=./appstate/appstate.json

# Owner ID
OWNER_ID=YOUR_FACEBOOK_ID

# OpenAI API key
OPENAI_KEY=sk-REPLACE_ME
`;
  fs.writeFileSync(envPath, envContent);
  console.log("✅ .env file created");
} else {
  console.log("⚠️ .env already exists");
}

// 4️⃣ تثبيت الاعتمادات
console.log("⏳ Installing npm packages...");
execSync("npm install", { stdio: "inherit" });
console.log("✅ Packages installed");

// 5️⃣ رسالة جاهزية
console.log("\n🎉 Layla Bot setup complete!");
console.log("📌 Edit .env with your OWNER_ID and OPENAI_KEY");
console.log("📌 Add your AppState JSON to appstate/appstate.json");
console.log("📌 Then run: node index.js");
