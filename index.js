export default {
  async fetch(request, env, ctx) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Nightingale Landing Test</title>
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
    border-radius: 6px;
    border: 1px solid #333;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
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

  <button class="btn" onclick="alert('Go to Clinician Journey')">Clinician Journey</button>
  <button class="btn" onclick="alert('Go to Patient Journey')">Patient Journey</button>
  <button class="btn" onclick="alert('Go to Administrator Journey')">Administrator Journey</button>
</div>

</body>
</html>
`;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    });
  }
};
