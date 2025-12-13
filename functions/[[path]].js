export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const path = url.pathname;

  const SUPABASE_URL =
    context.env.SUPABASE_URL || "https://jovvyyomvzpeupvwdoqt.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY =
    context.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_P4OS7_BlhWo_wPA9zpTUzQ_6HhMUyMn";

  if (path === "/login") {
    return html(loginHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY));
  }

  if (path === "/auth/callback") {
    return html(callbackHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY));
  }

  if (path === "/logout") {
    return html(logoutHtml(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY));
  }

  return html(landingHtml());
}

function html(body) {
  return new Response(body, {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}

function landingHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Nightingale Landing Test</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { margin: 0; font-family: Arial, sans-serif; background-color: #ffffff; }
  .container { padding: 60px 40px; max-width: 900px; margin: 0 auto; text-align: center; }
  .title { font-size: 32px; font-weight: 700; margin-bottom: 20px; }
  .sub { font-size: 18px; line-height: 1.6; margin-bottom: 32px; color: #444; }
  .btn { padding: 12px 20px; margin-right: 12px; margin-bottom: 12px; border-radius: 6px; border: 1px solid #333; background-color: #fff; cursor: pointer; font-size: 14px; }
</style>
</head>
<body>
<div class="container">
  <h1 class="title">Clinical conversations, warm and rapid service empowered by AI.</h1>
  <p class="sub">
    Nightingale transforms real patient–clinician conversations into structured, longitudinal
    clinical memory—delivering clarity for clinicians, continuity for patients, and insights for teams.
  </p>

  <div style="margin-bottom: 18px;">
    <button class="btn" onclick="location.href='/login'">Login</button>
    <button class="btn" onclick="location.href='/logout'">Logout</button>
  </div>

  <button class="btn" onclick="location.href='https://provider.ntngale.com'">Clinician Journey</button>
  <button class="btn" onclick="location.href='https://patient.ntngale.com'">Patient Journey</button>
  <button class="btn" onclick="alert('Administrator Journey (coming soon)')">Administrator Journey</button>
</div>
</body>
</html>`;
}

function loginHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Login</title>
</head>
<body style="font-family:Arial;padding:40px;max-width:520px;margin:auto">
  <h2>Sign in</h2>

  <label style="display:block;margin-bottom:8px;">Email</label>
  <input id="email" type="email" placeholder="you@domain.com"
    style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;" />

  <button id="send" style="margin-top:12px;padding:10px 14px;">
    Send magic link
  </button>

  <p id="msg" style="color:#b00;margin-top:14px;"></p>
  <p style="color:#666;margin-top:10px;font-size:13px;">
    We'll email you a sign-in link.
  </p>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script>
    const supabase = window.supabase.createClient(
      ${JSON.stringify(SUPABASE_URL)},
      ${JSON.stringify(SUPABASE_KEY)}
    );

    document.getElementById("send").onclick = async () => {
      const email = document.getElementById("email").value.trim();
      document.getElementById("msg").style.color = "#b00";
      document.getElementById("msg").textContent = "";

      if (!email) {
        document.getElementById("msg").textContent = "Please enter an email.";
        return;
      }

      const emailRedirectTo = location.origin + "/auth/callback";

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo }
      });

      if (error) {
        document.getElementById("msg").textContent = error.message;
        return;
      }

      document.getElementById("msg").style.color = "#0a0";
      document.getElementById("msg").textContent =
        "Check your inbox for the sign-in link.";
    };
  </script>

  <p style="margin-top:18px;"><a href="/">Back</a></p>
</body>
</html>`;
}

function callbackHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Auth Callback</title>
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
      if (error) { document.getElementById("msg").textContent = error.message; return; }
      location.replace("/");
    })();
  </script>
</body>
</html>`;
}

function logoutHtml(SUPABASE_URL, SUPABASE_KEY) {
  return `<!doctype html>
<html><head><meta charset="utf-8" /><title>Logout</title></head>
<body style="font-family:Arial;padding:40px">
  <p>Logging out...</p>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script>
    const supabase = window.supabase.createClient(
      ${JSON.stringify(SUPABASE_URL)},
      ${JSON.stringify(SUPABASE_KEY)}
    );
    (async () => { await supabase.auth.signOut(); location.replace("/"); })();
  </script>
</body></html>`;
}
