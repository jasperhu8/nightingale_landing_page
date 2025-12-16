export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 保留你原本的环境变量处理逻辑
    const SUPABASE_URL =
      env?.SUPABASE_URL || "https://<YOUR-PROJECT-REF>.supabase.co";

    const SUPABASE_PUBLISHABLE_KEY =
      env?.SUPABASE_PUBLISHABLE_KEY ||
      "sb_publishable_P4OS7_BlhWo_wPA9zpTUzQ_6HhMUyMn";

    // 路由逻辑保持不变
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

    // ✅ 这里调用新的页面生成函数
    // 我把HTML代码提取到了下面的 landingHtml() 函数中，这样你的 fetch 逻辑会很干净
    return new Response(landingHtml(), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};

// ==========================================
//  新的 Landing Page (根据 PDF 内容扩充)
// ==========================================
function landingHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Nightingale - Clinical Memory</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-color: #FAFAF5;     /* 你要求的米白色背景 */
    --card-bg: #FFFFFF;      /* 纯白卡片背景 */
    --text-main: #1F2937;    /* 深灰主文字 */
    --text-sub: #4B5563;     /* 浅灰副文字 */
    --accent: #111827;       /* 黑色强调 */
    --border: #E5E7EB;
  }

  body { margin: 0; font-family: 'Inter', sans-serif; background-color: var(--bg-color); color: var(--text-main); line-height: 1.6; }
  
  /* 布局容器 */
  .container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
  
  /* 导航栏 */
  nav { padding: 24px 0; display: flex; justify-content: space-between; align-items: center; }
  .logo { font-weight: 700; font-size: 22px; letter-spacing: -0.5px; color: #000; text-decoration: none; }
  .nav-actions button { margin-left: 12px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s; }
  
  /* 按钮样式 */
  .btn { padding: 10px 18px; border-radius: 6px; border: 1px solid var(--border); background: #fff; color: var(--text-main); }
  .btn:hover { background-color: #f3f4f6; }
  .btn-primary { background-color: var(--accent); color: #fff; border: 1px solid var(--accent); }
  .btn-primary:hover { opacity: 0.9; background-color: var(--accent); }
  .btn-text { background: none; border: none; padding: 0; text-decoration: underline; color: var(--text-sub); }

  /* Hero Section */
  .hero { padding: 80px 0 60px; text-align: center; }
  .hero h1 { font-size: 48px; font-weight: 700; margin-bottom: 24px; letter-spacing: -1.5px; line-height: 1.1; color: #111; }
  .hero p { font-size: 20px; color: var(--text-sub); max-width: 720px; margin: 0 auto 40px; font-weight: 300; }
  .hero-ctas { margin-bottom: 60px; }
  .hero-ctas .btn { padding: 14px 28px; font-size: 16px; margin: 0 6px; }

  /* Mockup Representation (CSS画的示意图 - 对应PDF第10点) */
  .mockup-wrapper { padding: 20px; background: #fff; border-radius: 16px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08); max-width: 900px; margin: 0 auto; border: 1px solid rgba(0,0,0,0.05); }
  .mockup-container { display: flex; height: 400px; text-align: left; background: #fafafa; border-radius: 8px; overflow: hidden; border: 1px solid #eee; }
  .mockup-left { flex: 1; border-right: 1px solid #eee; padding: 30px; background: #fff; }
  .mockup-right { flex: 1; padding: 30px; background: #f9fafb; }
  .mockup-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 20px; display: block; font-weight: 600; }
  
  /* 骨架屏线条 */
  .skeleton { height: 10px; background: #f3f4f6; border-radius: 4px; margin-bottom: 12px; }
  .skeleton.dark { background: #e5e7eb; }
  .skeleton.w-full { width: 100%; }
  .skeleton.w-80 { width: 80%; }
  .skeleton.w-60 { width: 60%; }
  .skeleton.w-40 { width: 40%; }

  /* Section 通用 */
  .section { padding: 100px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
  .section-title { font-size: 32px; font-weight: 700; margin-bottom: 16px; text-align: center; color: #111; }
  .section-sub { font-size: 18px; color: var(--text-sub); text-align: center; max-width: 600px; margin: 0 auto 60px; }
  
  /* Journey Grid */
  .journey-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
  .journey-card { padding: 30px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; transition: transform 0.2s; }
  .journey-card:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.03); }
  .journey-card h3 { margin-top: 0; font-size: 18px; color: var(--text-main); font-weight: 600; }
  .journey-card p { font-size: 15px; color: var(--text-sub); margin-bottom: 0; line-height: 1.6; }
  .phase-badge { display: inline-block; padding: 4px 10px; background: #f3f4f6; color: #666; font-size: 11px; border-radius: 20px; margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

  /* How it Works */
  .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; text-align: center; }
  .step-number { font-size: 50px; color: #e5e7eb; font-weight: 700; margin-bottom: 10px; line-height: 1; }
  .step-item h3 { font-size: 20px; font-weight: 600; margin-bottom: 12px; }

  /* Footer */
  footer { padding: 80px 0; text-align: center; background: #fff; }
  .footer-cta { margin-bottom: 40px; }

  /* Mobile */
  @media (max-width: 768px) {
    .hero h1 { font-size: 32px; }
    .mockup-container { flex-direction: column; height: auto; }
    .mockup-left, .mockup-right { height: 200px; }
    .steps-grid { grid-template-columns: 1fr; }
    .hero-ctas .btn { width: 100%; margin: 6px 0; display: block; box-sizing: border-box; }
  }
</style>
</head>
<body>

  <div class="container">
    <nav>
      <a href="/" class="logo">Nightingale</a>
      <div class="nav-actions">
        <button class="btn" onclick="location.href='/login'">Log in</button>
        <button class="btn btn-primary" onclick="location.href='/login'">Get Started</button>
      </div>
    </nav>
  </div>

  <div class="container hero">
    <h1>Clinical conversations,<br>warm and rapid service empowered by AI.</h1>
    <p>
      Nightingale transforms real patient–clinician conversations into structured, longitudinal clinical memory—delivering clarity for clinicians, continuity for patients, and insights for teams.
    </p>
    
    <div class="hero-ctas">
      <button class="btn btn-primary" onclick="location.href='https://provider.mingle.com'">Clinician Journey</button>
      <button class="btn" onclick="location.href='https://patient.mingle.com'">Patient Journey</button>
    </div>

    <div class="mockup-wrapper">
      <div class="mockup-container">
        <div class="mockup-left">
          <span class="mockup-label">Real-time Transcript</span>
          <div class="skeleton w-80"></div>
          <div class="skeleton w-60"></div>
          <div class="skeleton w-full"></div>
          <div class="skeleton w-40" style="margin-top:20px;"></div>
          <div class="skeleton w-80"></div>
        </div>
        <div class="mockup-right">
          <span class="mockup-label">Structured Clinical Memory</span>
          <div class="skeleton dark w-40"></div>
          <div class="skeleton w-full"></div>
          <div class="skeleton w-full"></div>
          <div class="skeleton dark w-40" style="margin-top:20px;"></div>
          <div class="skeleton w-full"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="section" style="background-color: #fff;">
    <div class="container">
      <h2 class="section-title">Why Conversations Matter</h2>
      <p class="section-sub">
        Every clinical interaction starts with a conversation rich in nuance, context, and signals that often vanish once the visit ends.
        <br><br>
        Nightingale preserves and structures these conversations into <strong>living clinical memory</strong>, so every role in the healthcare system can make better decisions, faster.
      </p>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2 class="section-title">The Clinician Journey</h2>
      <p class="section-sub">Focus on the patient rather than the act of documentation.</p>
      
      <div class="journey-grid">
        <div class="journey-card">
          <span class="phase-badge">Before the Visit</span>
          <h3>Clear Context</h3>
          <p>Highlights key info from previous interactions—recurring concerns, unresolved issues, and symptom changes—so you start with a coherent picture.</p>
        </div>
        <div class="journey-card">
          <span class="phase-badge">During the Visit</span>
          <h3>Quiet Capture</h3>
          <p>Nightingale captures real-time conversation in the background. Medical terms and concerns are identified automatically.</p>
        </div>
        <div class="journey-card">
          <span class="phase-badge">After the Visit</span>
          <h3>Structured Summary</h3>
          <p>Documentation is generated instantly, including problem lists, assessments, and plans. Continuity is reinforced.</p>
        </div>
      </div>
      <div style="text-align:center; margin-top:30px;">
        <button class="btn" onclick="location.href='https://provider.mingle.com'">Explore Clinician Journey →</button>
      </div>
    </div>
  </div>

  <div class="section" style="background-color: #fff;">
    <div class="container">
      <h2 class="section-title">The Patient Journey</h2>
      <p class="section-sub">Continuity of care and enhanced trust.</p>
      
      <div class="journey-grid">
        <div class="journey-card">
          <span class="phase-badge">Before the Visit</span>
          <h3>Historical Context</h3>
          <p>No need to retell your entire story. Nightingale brings history forward so clinicians start from what matters to you.</p>
        </div>
        <div class="journey-card">
          <span class="phase-badge">During the Visit</span>
          <h3>Natural Speech</h3>
          <p>Speak naturally. Your emotions, questions, and concerns are accurately reflected without forms or questionnaires.</p>
        </div>
        <div class="journey-card">
          <span class="phase-badge">After the Visit</span>
          <h3>Clarity</h3>
          <p>Receive clear summaries of what was discussed, what the clinician understood, and what steps to take next.</p>
        </div>
      </div>
      <div style="text-align:center; margin-top:30px;">
        <button class="btn" onclick="location.href='https://patient.mingle.com'">Explore Patient Journey →</button>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2 class="section-title">The Administrator Journey</h2>
      <p class="section-sub">Operational insights grounded in real interactions.</p>
      
      <div class="journey-grid">
        <div class="journey-card">
          <h3>Visibility</h3>
          <p>Gain immediate visibility into trends. Reveal operational friction points and patient comprehension gaps.</p>
        </div>
        <div class="journey-card">
          <h3>Insights</h3>
          <p>Understand where processes break down and where improvement efforts would have the greatest impact.</p>
        </div>
        <div class="journey-card">
          <h3>Action</h3>
          <p>Allocate resources effectively, strengthen quality metrics, and identify risks earlier.</p>
        </div>
      </div>
      <div style="text-align:center; margin-top:30px;">
        <button class="btn" onclick="alert('Administrator Journey (Coming Soon)')">Explore Administrator Journey →</button>
      </div>
    </div>
  </div>

  <div class="container" style="padding: 100px 24px;">
    <h2 class="section-title">How Nightingale Works</h2>
    <div class="steps-grid" style="margin-top: 50px;">
      <div class="step-item">
        <div class="step-number">01</div>
        <h3>Capture</h3>
        <p>Real patient-clinician conversations are recorded and transcribed using models tailored to clinical environments.</p>
      </div>
      <div class="step-item">
        <div class="step-number">02</div>
        <h3>Memory</h3>
        <p>Transformed into structured, longitudinal memory including problems, plans, medications, and timeline events.</p>
      </div>
      <div class="step-item">
        <div class="step-number">03</div>
        <h3>Delivery</h3>
        <p>Delivers the right information to the right role: summaries for clinicians, clarity for patients, insights for admins.</p>
      </div>
    </div>
  </div>

  <footer>
    <div class="container">
      <h3>Ready to explore the journeys?</h3>
      <p style="color:#666; margin-bottom: 30px;">Choose the journey that reflects your day-to-day experience.</p>
      <div class="footer-cta">
        <button class="btn btn-primary" onclick="location.href='https://provider.mingle.com'">Clinician</button>
        <button class="btn" onclick="location.href='https://patient.mingle.com'">Patient</button>
        <button class="btn" onclick="location.href='/logout'">Logout</button>
      </div>
      <p style="font-size: 13px; color: #999;">&copy; 2025 Nightingale. All rights reserved.</p>
    </div>
  </footer>

</body>
</html>`;
}

// ==========================================
//  Auth Flow Pages (保持原样，未修改)
// ==========================================

function loginHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Login</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="font-family:Arial;padding:40px;max-width:520px;margin:auto">
  <h2>Sign in</h2>

  <button id="google" style="padding:10px 14px;">Continue with Google</button>
  <p id="msg" style="color:#b00;margin-top:14px;"></p>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script>
    const supabase = window.supabase.createClient(
      ${JSON.stringify(SUPABASE_URL)},
      ${JSON.stringify(SUPABASE_KEY)}
    );

    document.getElementById("google").onclick = async () => {
      document.getElementById("msg").textContent = "";

      // redirect back to THIS domain's callback
      const redirectTo = location.origin + "/auth/callback";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo }
      });

      if (error) document.getElementById("msg").textContent = error.message;
    };
  </script>

  <p style="margin-top:18px;">
    <a href="/">Back to home</a>
  </p>
</body>
</html>`;
}

function callbackHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Auth Callback</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="font-family:Arial;padding:40px">
  <p>Signing you in...</p>
  <p id="msg" style="color:#b00;"></p>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script>
    const supabase = window.supabase.createClient(
      ${JSON.stringify(SUPABASE_URL)},
      ${JSON.stringify(SUPABASE_KEY)}
    );

    (async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        document.getElementById("msg").textContent = error.message;
        return;
      }

      // after login: go back to landing (or change to /app)
      location.replace("/");
    })();
  </script>
</body>
</html>`;
}

function logoutHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html>
<html>
<head><meta charset="utf-8" /><title>Logout</title></head>
<body style="font-family:Arial;padding:40px">
  <p>Logging out...</p>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script>
    const supabase = window.supabase.createClient(
      ${JSON.stringify(SUPABASE_URL)},
      ${JSON.stringify(SUPABASE_KEY)}
    );
    (async () => {
      await supabase.auth.signOut();
      location.replace("/");
    })();
  </script>
</body>
</html>`;
}
