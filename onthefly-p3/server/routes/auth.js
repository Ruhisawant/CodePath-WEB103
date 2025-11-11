import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    return res.status(200).json({ success: true, user: req.user });
  }

  // Always return a response so client fetches don't hang when not authenticated
  return res.status(401).json({ success: false, user: null });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({ success: false, message: "failure" });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie("connect.sid");

      return res.json({ status: "logout", user: {} });
    });
  });
});

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  router.get(
    "/github",
    passport.authenticate("github", {
      scope: ["read:user"],
    })
  );

  router.get(
    "/github/callback",
    passport.authenticate("github", {
      successRedirect: process.env.CLIENT_HOME_URL || "http://localhost:5173/",
      failureRedirect: "/destinations",
    })
  );
} else if (process.env.NODE_ENV === 'development') {

  router.get('/github', (req, res, next) => {
    const devUser = {
      id: 1,
      githubid: 'dev',
      username: process.env.DEV_GITHUB_USERNAME || 'devuser',
      avatarurl: process.env.DEV_GITHUB_AVATAR || '/avatar.png',
      accesstoken: null,
    };

    req.login(devUser, (err) => {
      if (err) return next(err);
      // Redirect developer to the client app so the UI loads with the session cookie set
      return res.redirect(process.env.CLIENT_HOME_URL || 'http://localhost:5173/');
    });
  });

  router.get('/github/callback', (req, res) => {
    return res.redirect(process.env.CLIENT_HOME_URL || 'http://localhost:5173/');
  });
} else {
  router.get('/github', (req, res) => {
    return res.status(501).json({
      success: false,
      message: 'GitHub OAuth is not configured on the server.'
    })
  })

  router.get('/github/callback', (req, res) => {
    return res.status(501).json({
      success: false,
      message: 'GitHub OAuth is not configured on the server.'
    })
  })
}

export default router;