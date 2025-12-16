// Version 3.0 - Force Update
export async function onRequest(context) {
  // ... 下面是其他代码
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // 1. 环境变量配置
  const SUPABASE_URL = env.SUPABASE_URL || "https://jovvyyomvzpeupvwdoqt.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_P4OS7_BlhWo_wPA9zpTUzQ_6HhMUyMn";

  // 2. 路由处理
  if (path === "/login") return html(loginHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY));
  if (path === "/auth/callback") return html(callbackHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY));
  if (path === "/logout") return html(logoutHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY));

  // 3. 默认返回新版 Landing Page
  return html(landingHtml());
}

// 辅助函数：生成 HTML Response
function html(body) {
  return new Response(body, { headers: { "content-type": "text/html;charset=UTF-8" } });
}

// ==========================================
//  核心页面代码 (象牙白 V2)
// ==========================================
function landingHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Nightingale V2 - Live Check</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>
  :root { --bg-color: #FDFBF7; --text-main: #1A1A1A; --text-sub: #555555; --accent: #2F4F4F; --border: #E0E0E0; --link-color: #0056b3; }
  body { margin: 0; font-family: 'Inter', sans-serif; background-color: var(--bg-color); color: var(--text-main); line-height: 1.6; }
  .container { max-width: 900px; margin: 0 auto; padding: 0 30px; }
  
  /* 导航栏 */
  nav { padding: 30px 0; display: flex; justify-content: space-between; align-items: center; }
  .logo { font-family: 'Lora', serif; font-weight: 600; font-size: 24px; color: #000; text-decoration: none; }
  .nav-right { display: flex; gap: 20px; }
  .nav-link { text-decoration: none; color: var(--text-main); font-size: 14px; font-weight: 500; cursor: pointer; }
  
  /* Hero */
  .hero { padding: 60px 0 80px; text-align: left; }
  .hero h1 { font-size: 42px; font-weight: 700; margin-bottom: 24px; line-height: 1.2; color: #111; font-family: 'Lora', serif; }
  .hero p { font-size: 18px; color: var(--text-sub); max-width: 700px; margin-bottom: 40px; font-weight: 300; }

  /* 板块 */
  .section-block { padding: 60px 0; border-top: 1px solid var(--border); }
  .section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; flex-wrap: wrap; }
  .section-title { font-size: 28px; font-weight: 600; color: var(--text-main); font-family: 'Lora', serif; }
  .explore-link { font-size: 14px; font-weight: 600; color: var(--text-main); text-decoration: none; border-bottom: 1px solid var(--text-main); padding-bottom: 2px; }
  .explore-link:hover { color: var(--link-color); border-bottom-color: var(--link-color); }
  .section-content { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .main-desc { font-size: 18px; color: var(--text-sub); line-height: 1.6; }
  .detail-list { list-style: none; padding: 0; margin: 0; }
  .detail-list li { margin-bottom: 12px; font-size: 15px; color: #666; display: flex; }
  .detail-list li::before { content: "•"; color: var(--text-main); margin-right: 10px; font-weight: bold; }
  
  /* 移动端 */
  @media (max-width: 768px) { 
    .hero h1 { font-size: 32px; } 
    .section-content { grid-template-columns: 1fr; gap: 20px; } 
    .section-header { flex-direction: column; gap: 10px; }
  }
</style>
</head>
<body>
  <div class="container">
    <nav>
      <a href="/" class="logo">Nightingale</a>
      <div class="nav-right">
        <a href="/login" class="nav-link">Login</a>
        <a href="/logout" class="nav-link">Logout</a>
      </div>
    </nav>
  </div>

  <div class="container hero">
    <h1>Clinical conversations,<br>warm and rapid service empowered by AI.</h1>
    <p>Nightingale transforms real patient–clinician conversations into structured, longitudinal clinical memory—delivering clarity for clinicians, continuity for patients, and insights for teams.</p>
  </div>

  <div class="container section-block">
    <div class="section-header">
      <div class="section-title">The Clinician Journey</div>
      <a href="https://provider.ntngale.com" class="explore-link">Explore More →</a>
    </div>
    <div class="section-content">
      <div class="main-desc">Focus on the patient rather than the act of documentation. Enter consultations with clear context and leave with structured summaries automatically generated.</div>
      <ul class="detail-list">
        <li>Highlights recurring concerns and symptom changes.</li>
        <li>Quietly captures real-time conversation in background.</li>
        <li>Instantly generates problem lists and plans.</li>
      </ul>
    </div>
  </div>

  <div class="container section-block">
    <div class="section-header">
      <div class="section-title">The Patient Journey</div>
      <a href="https://patient.ntngale.com" class="explore-link">Explore More →</a>
    </div>
    <div class="section-content">
      <div class="main-desc">Experience true continuity of care. No need to retell your entire story at every appointment. Feel heard, understood, and supported.</div>
      <ul class="detail-list">
        <li>Historical context is brought forward automatically.</li>
        <li>Speak naturally—emotions reflected accurately.</li>
        <li>Receive clear, readable summaries of next steps.</li>
      </ul>
    </div>
  </div>

  <div class="container section-block" style="border-bottom: 1px solid var(--border);">
    <div class="section-header">
      <div class="section-title">The Administrator Journey <span style="font-size:12px;background:#eee;padding:4px 8px;border-radius:4px;color:#666;margin-left:10px;">Coming Soon</span></div>
      <a href="#" onclick="alert('Coming soon');return false;" class="explore-link" style="color:#999;border-color:#ddd;">Explore More →</a>
    </div>
    <div class="section-content">
      <div class="main-desc">Gain immediate visibility into trends. Transform clinical conversations into operational insights.</div>
      <ul class="detail-list">
        <li>Reveal operational friction points.</li>
        <li>Understand where processes break down.</li>
        <li>Allocate resources effectively.</li>
      </ul>
    </div>
  </div>

  <div class="container" style="padding: 80px 0 40px; border-top: 1px solid #E0E0E0; margin-top: 20px; color: #999; font-size: 13px;">
    <footer><p>&copy; 2025 Nightingale. All rights reserved.</p></footer>
  </div>
</body>
</html>`;
}

// 登录/登出页面 (保持原样)
function loginHtml(url, key) {
  return `<!doctype html><html><head><meta charset="utf-8"/><title>Login</title><meta name="viewport" content="width=device-width,initial-scale=1"/><style>body{font-family:sans-serif;padding:40px;background:#FAFAF5;display:flex;justify-content:center;height:100vh;align-items:center;}</style></head><body><div style="background:#fff;padding:40px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.05);text-align:center;width:100%;max-width:320px;"><h2 style="margin-top:0;">Sign in</h2><button id="google" style="padding:12px 20px;background:#1A1A1A;color:#fff;border:none;border-radius:6px;cursor:pointer;width:100%;">Continue with Google</button><p id="msg" style="color:#b00;margin-top:14px;font-size:13px;"></p><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script>const supabase=window.supabase.createClient(${JSON.stringify(url)},${JSON.stringify(key)});document.getElementById("google").onclick=async()=>{document.getElementById("msg").textContent="";const{error}=await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+"/auth/callback"}});if(error)document.getElementById("msg").textContent=error.message;};</script><p style="margin-top:20px;font-size:13px;"><a href="/" style="color:#666;text-decoration:none;">← Back</a></p></div></body></html>`;
}
function callbackHtml(url, key) {
  return `<!doctype html><html><head><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script>const supabase=window.supabase.createClient(${JSON.stringify(url)},${JSON.stringify(key)});(async()=>{const{error}=await supabase.auth.exchangeCodeForSession(window.location.href);if(!error)location.replace("/");})();</script></head><body>Signing in...</body></html>`;
}
function logoutHtml(url, key) {
  return `<!doctype html><html><head><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script>const supabase=window.supabase.createClient(${JSON.stringify(url)},${JSON.stringify(key)});(async()=>{await supabase.auth.signOut();location.replace("/");})();</script></head><body>Logging out...</body></html>`;
}
