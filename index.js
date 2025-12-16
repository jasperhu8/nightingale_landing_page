export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 环境变量 (保持你原有的设置)
    const SUPABASE_URL =
      env?.SUPABASE_URL || "https://<YOUR-PROJECT-REF>.supabase.co";
    const SUPABASE_PUBLISHABLE_KEY =
      env?.SUPABASE_PUBLISHABLE_KEY ||
      "sb_publishable_P4OS7_BlhWo_wPA9zpTUzQ_6HhMUyMn";

    // 路由逻辑
    if (path === "/login") {
      return new Response(loginHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY), {
        headers: { "content-type": "text/html;charset=UTF-8" },
      });
    }

    if (path === "/auth/callback") {
      return new Response(callbackHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY), {
        headers: { "content-type": "text/html;charset=UTF-8" },
      });
    }

    if (path === "/logout") {
      return new Response(logoutHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY), {
        headers: { "content-type": "text/html;charset=UTF-8" },
      });
    }

    // ✅ 调用新的 Landing Page 生成函数
    return new Response(landingHtml(), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};

// ==========================================
//  新的 Landing Page (象牙白、垂直板块布局)
// ==========================================
function landingHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Nightingale - Clinical Memory</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-color: #FDFBF7;     /* 象牙白背景 */
    --text-main: #1A1A1A;    /* 近乎黑色的深灰 */
    --text-sub: #555555;     /* 副文本灰色 */
    --accent: #2F4F4F;       /* 深岩灰色 (用于强调) */
    --border: #E0E0E0;       /* 分割线颜色 */
    --link-color: #0056b3;   /* 链接颜色 */
  }

  body { margin: 0; font-family: 'Inter', sans-serif; background-color: var(--bg-color); color: var(--text-main); line-height: 1.6; }
  
  /* 布局容器 */
  .container { max-width: 900px; margin: 0 auto; padding: 0 30px; }
  
  /* 1. 顶部导航 (Login/Logout 在右上角) */
  nav { 
    padding: 30px 0; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
  }
  .logo { 
    font-family: 'Lora', serif; /* Logo使用衬线体，更有医学人文感 */
    font-weight: 600; 
    font-size: 24px; 
    letter-spacing: -0.5px; 
    color: #000; 
    text-decoration: none; 
  }
  .nav-right { display: flex; gap: 20px; }
  .nav-link { 
    text-decoration: none; 
    color: var(--text-main); 
    font-size: 14px; 
    font-weight: 500; 
    cursor: pointer;
  }
  .nav-link:hover { text-decoration: underline; }

  /* 2. Hero 区域 (Slogan) */
  .hero { padding: 60px 0 80px; text-align: left; }
  .hero h1 { 
    font-size: 42px; 
    font-weight: 700; 
    margin-bottom: 24px; 
    line-height: 1.2; 
    color: #111; 
    font-family: 'Lora', serif; 
  }
  .hero p { 
    font-size: 18px; 
    color: var(--text-sub); 
    max-width: 700px; 
    margin-bottom: 40px; 
    font-weight: 300; 
  }

  /* 3. 三个垂直板块布局 */
  .section-block {
    padding: 60px 0;
    border-top: 1px solid var(--border); /* 分割线 */
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .section-title {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-main);
    font-family: 'Lora', serif;
  }

  .explore-link {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-main);
    text-decoration: none;
    border-bottom: 1px solid var(--text-main);
    padding-bottom: 2px;
    transition: all 0.2s;
  }
  .explore-link:hover {
    color: var(--link-color);
    border-bottom-color: var(--link-color);
  }
  .coming-soon {
    font-size: 12px;
    background: #eee;
    padding: 4px 8px;
    border-radius: 4px;
    color: #666;
    margin-left: 10px;
  }

  .section-content {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 两列布局：左边描述，右边细节 */
    gap: 40px;
  }
  
  .main-desc {
    font-size: 18px;
    color: var(--text-sub);
    line-height: 1.6;
  }

  .detail-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .detail-list li {
    margin-bottom: 12px;
    font-size: 15px;
    color: #666;
    display: flex;
    align-items: start;
  }
  .detail-list li::before {
    content: "•";
    color: var(--text-main);
    margin-right: 10px;
    font-weight: bold;
  }

  /* Footer */
  footer { 
    padding: 80px 0 40px; 
    border-top: 1px solid var(--border); 
    margin-top: 20px;
    color: #999;
    font-size: 13px;
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    .hero h1 { font-size: 32px; }
    .section-content { grid-template-columns: 1fr; gap: 20px; }
    .section-header { flex-direction: column; gap: 10px; }
    .explore-link { align-self: flex-start; }
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
    <p>
      Nightingale transforms real patient–clinician conversations into structured, longitudinal clinical memory—delivering clarity for clinicians, continuity for patients, and insights for teams.
    </p>
  </div>

  <div class="container section-block">
    <div class="section-header">
      <div class="section-title">The Clinician Journey</div>
      <a href="https://provider.ntngale.com" class="explore-link">Explore More →</a>
    </div>
    <div class="section-content">
      <div class="main-desc">
        Focus on the patient rather than the act of documentation. Enter consultations with clear context and leave with structured summaries automatically generated.
      </div>
      <ul class="detail-list">
        <li>Highlights recurring concerns and symptom changes before the visit.</li>
        <li>Quietly captures real-time conversation in the background.</li>
        <li>Instantly generates problem lists, assessments, and plans.</li>
      </ul>
    </div>
  </div>

  <div class="container section-block">
    <div class="section-header">
      <div class="section-title">The Patient Journey</div>
      <a href="https://patient.ntngale.com" class="explore-link">Explore More →</a>
    </div>
    <div class="section-content">
      <div class="main-desc">
        Experience true continuity of care. No need to retell your entire story at every appointment. Feel heard, understood, and supported.
      </div>
      <ul class="detail-list">
        <li>Historical context is brought forward automatically.</li>
        <li>Speak naturally—emotions and concerns are accurately reflected.</li>
        <li>Receive clear, readable summaries of next steps.</li>
      </ul>
    </div>
  </div>

  <div class="container section-block" style="border-bottom: 1px solid var(--border);">
    <div class="section-header">
      <div class="section-title">The Administrator Journey <span class="coming-soon">Coming Soon</span></div>
      <a href="#" onclick="alert('Administrator Portal is currently under development.'); return false;" class="explore-link" style="color: #999; border-bottom-color: #ddd;">Explore More →</a>
    </div>
    <div class="section-content">
      <div class="main-desc">
        Gain immediate visibility into trends that once depended on manual reporting. Transform clinical conversations into operational insights.
      </div>
      <ul class="detail-list">
        <li>Reveal operational friction points and communication gaps.</li>
        <li>Understand where processes break down.</li>
        <li>Allocate resources effectively and identify risks earlier.</li>
      </ul>
    </div>
  </div>

  <div class="container">
    <footer>
      <p>&copy; 2025 Nightingale. All rights reserved.</p>
    </footer>
  </div>

</body>
</html>`;
}

// -----------------------------------------------------------
// 以下保持不变，用于处理登录/登出逻辑
// -----------------------------------------------------------

function loginHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Login</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>body{font-family:sans-serif;padding:40px;background:#FAFAF5;display:flex;justify-content:center;height:100vh;align-items:center;}</style>
</head>
<body>
  <div style="background:#fff;padding:40px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.05);text-align:center;width:100%;max-width:320px;">
    <h2 style="margin-top:0;">Sign in</h2>
    <p style="color:#666;font-size:14px;margin-bottom:24px;">Access your Nightingale account</p>

    <button id="google" style="padding:12px 20px;background:#1A1A1A;color:#fff;border:none;border-radius:6px;cursor:pointer;width:100%;font-size:14px;">Continue with Google</button>
    <p id="msg" style="color:#b00;margin-top:14px;font-size:13px;"></p>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script>
      const supabase = window.supabase.createClient(
        ${JSON.stringify(SUPABASE_URL)},
        ${JSON.stringify(SUPABASE_KEY)}
      );

      document.getElementById("google").onclick = async () => {
        document.getElementById("msg").textContent = "";
        const redirectTo = location.origin + "/auth/callback";
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo }
        });
        if (error) document.getElementById("msg").textContent = error.message;
      };
    </script>
    <p style="margin-top:20px;font-size:13px;"><a href="/" style="color:#666;text-decoration:none;">← Back to home</a></p>
  </div>
</body>
</html>`;
}

function callbackHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html><html><head><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script>const supabase=window.supabase.createClient(${JSON.stringify(SUPABASE_URL)},${JSON.stringify(SUPABASE_KEY)});(async()=>{const{error}=await supabase.auth.exchangeCodeForSession(window.location.href);if(!error)location.replace("/");})();</script></head><body>Signing in...</body></html>`;
}

function logoutHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html><html><head><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script>const supabase=window.supabase.createClient(${JSON.stringify(SUPABASE_URL)},${JSON.stringify(SUPABASE_KEY)});(async()=>{await supabase.auth.signOut();location.replace("/");})();</script></head><body>Logging out...</body></html>`;
}
