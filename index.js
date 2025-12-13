export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    const SUPABASE_URL =
      env?.SUPABASE_URL || "https://<YOUR-PROJECT-REF>.supabase.co";

    const SUPABASE_PUBLISHABLE_KEY =
      env?.SUPABASE_PUBLISHABLE_KEY ||
      "sb_publishable_P4OS7_BlhWo_wPA9zpTUzQ_6HhMUyMn";

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

    // ✅ your original landing page (slightly enhanced: add Login button + real links)
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Nightingale Landing Test</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #ffffff;
  }
  .container {
    padding: 60px 40px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  .title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .sub {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 32px;
    color: #444;
  }
  .btn {
    padding: 12px 20px;
    margin-right: 12px;
    margin-bottom: 12px;
    border-radius: 6px;
    border: 1px solid #333;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
  }
  .btnPrimary {
    border: 1px solid #111;
    background: #111;
    color: #fff;
  }
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
    <button class="btn btnPrimary" onclick="location.href='/login'">Login</button>
    <button class="btn" onclick="location.href='/logout'">Logout</button>
  </div>

  <button class="btn" onclick="location.href='https://provider.mingle.com'">Clinician Journey</button>
  <button class="btn" onclick="location.href='https://patient.mingle.com'">Patient Journey</button>
  <button class="btn" onclick="alert('Administrator Journey (coming soon)')">Administrator Journey</button>

  <p style="color:#666;margin-top:22px;font-size:13px;">
    Note: provider.mingle.com and patient.mingle.com are not live yet.
  </p>
</div>

</body>
</html>
`;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};

// --------- Pages for auth flow ---------

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
